// Minimal email sender using Resend's REST API (no extra npm package needed).
// Required environment variables (set them in Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  – your Resend API key
// Optional:
//   MAIL_FROM       – sender, default "Directive <noreply@directivefitness.com>"
//   CHARTER_TO      – where Charter applications go, default support@directivefitness.com
//   SUPPORT_TO      – where support inquiries go, default support@directivefitness.com

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const mailConfig = {
  from: () => process.env.MAIL_FROM || "Directive <noreply@directivefitness.com>",
  charterTo: () => process.env.CHARTER_TO || "support@directivefitness.com",
  supportTo: () => process.env.SUPPORT_TO || "support@directivefitness.com",
};

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: mailConfig.from(),
      to: [opts.to],
      subject: opts.subject,
      text: opts.text,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend error ${res.status}: ${detail.slice(0, 300)}`);
  }
}

// Best-effort per-IP rate limit (in memory; resets when the serverless
// instance recycles). Enough to blunt casual abuse.
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, max = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > max;
}
