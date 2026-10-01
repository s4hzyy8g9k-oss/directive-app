import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE, mailConfig, rateLimited, sendMail } from "@/lib/mail";
import { supportTopics } from "@/app/content";

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

  // Honeypot for bots.
  if (clean(body.website, 100)) return NextResponse.json({ ok: true });

  const email = clean(body.email, 200);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a full email address." }, { status: 400 });
  }

  // Keep line breaks in the message, but cap its length.
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";
  if (!message) {
    return NextResponse.json({ ok: false, error: "Please enter a message." }, { status: 400 });
  }

  const requested = clean(body.topic, 100);
  const topic = (supportTopics as readonly string[]).includes(requested) ? requested : "Other";

  const text = [`From: ${email}`, `Topic: ${topic}`, "", message, "", `Submitted: ${new Date().toISOString()}`].join("\n");

  try {
    await sendMail({
      to: mailConfig.supportTo(),
      subject: `Support: ${topic}`,
      text,
      replyTo: email,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Support email failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again, or email support@directivefitness.com." },
      { status: 500 }
    );
  }
}
