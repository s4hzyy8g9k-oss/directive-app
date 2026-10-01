import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE, mailConfig, rateLimited, sendMail } from "@/lib/mail";
import { saveCharterApplication, supabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (clean(body.website, 100)) return NextResponse.json({ ok: true });

  const email = clean(body.email, 200);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a full email address, like you@email.com." }, { status: 400 });
  }

  const missionRaw = clean(body.mission, 200);
  const appFailureRaw = clean(body.appFailure, 200);
  const writeInRaw = typeof body.writeIn === "string" ? body.writeIn.trim().slice(0, 500) : "";
  const disruptors = Array.isArray(body.disruptors)
    ? body.disruptors.slice(0, 2).map((d) => clean(d, 200)).filter(Boolean)
    : [];

  const text = [
    "New Directive Charter application",
    "",
    `Email: ${email}`,
    "",
    `Primary mission: ${missionRaw || "(not answered)"}`,
    `What disrupts their flight plan: ${disruptors.length ? disruptors.join("; ") : "(not answered)"}`,
    `Biggest failure of current app: ${appFailureRaw || "(not answered)"}`,
    `In their own words: ${writeInRaw || "(none)"}`,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  // Save to the database and send the notification email independently,
  // so a hiccup in one never loses the application.
  const [saved, emailed] = await Promise.allSettled([
    supabaseConfigured()
      ? saveCharterApplication({
          email,
          mission: missionRaw || null,
          disruptors,
          app_failure: appFailureRaw || null,
          write_in: writeInRaw || null,
        })
      : Promise.reject(new Error("Supabase not configured")),
    sendMail({
      to: mailConfig.charterTo(),
      subject: `Charter application: ${email}`,
      text,
      replyTo: email,
    }),
  ]);

  if (saved.status === "rejected") console.error("Charter save failed:", saved.reason);
  if (emailed.status === "rejected") console.error("Charter email failed:", emailed.reason);

  if (saved.status === "fulfilled" || emailed.status === "fulfilled") {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json(
    { ok: false, error: "Something went wrong sending your application. Please try again." },
    { status: 500 }
  );
}
