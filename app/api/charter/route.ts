import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE, mailConfig, rateLimited, sendMail } from "@/lib/mail";

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

  const mission = clean(body.mission, 200) || "(not answered)";
  const appFailure = clean(body.appFailure, 200) || "(not answered)";
  const disruptors = Array.isArray(body.disruptors)
    ? body.disruptors.slice(0, 2).map((d) => clean(d, 200)).filter(Boolean)
    : [];

  const text = [
    "New Directive Charter application",
    "",
    `Email: ${email}`,
    "",
    `Primary mission: ${mission}`,
    `What disrupts their flight plan: ${disruptors.length ? disruptors.join("; ") : "(not answered)"}`,
    `Biggest failure of current app: ${appFailure}`,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    await sendMail({
      to: mailConfig.charterTo(),
      subject: `Charter application: ${email}`,
      text,
      replyTo: email,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Charter email failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your application. Please try again." },
      { status: 500 }
    );
  }
}
