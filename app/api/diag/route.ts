import { NextRequest, NextResponse } from "next/server";
import { rateLimited } from "@/lib/mail";

// TEMPORARY diagnostic page: /api/diag
// Shows which Supabase project the site is connected to and whether a test save works.
// It never shows keys or any applicant data. Remove this file once saving is confirmed.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function keyKind(key: string): string {
  if (key.startsWith("sb_secret_")) return "secret key (correct type)";
  if (key.startsWith("sb_publishable_")) return "PUBLISHABLE key (wrong type: needs the secret key)";
  if (key.startsWith("eyJ")) {
    try {
      const payload = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString());
      return `legacy key, role = ${payload.role}${payload.role === "service_role" ? " (ok)" : " (wrong: needs service_role)"}`;
    } catch {
      return "legacy-style key (could not read)";
    }
  }
  return "unrecognized key format";
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip, 6)) return NextResponse.json({ error: "Too many requests, try again in a few minutes." }, { status: 429 });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  const out: Record<string, unknown> = {
    SUPABASE_URL_is_set: Boolean(url),
    SUPABASE_SECRET_KEY_is_set: Boolean(key),
    RESEND_API_KEY_is_set: Boolean(process.env.RESEND_API_KEY),
  };
  if (!url || !key) {
    out.verdict = "A Supabase variable is missing on the live site. Add it in Vercel and redeploy.";
    return NextResponse.json(out, { status: 200 });
  }

  let host = "";
  try {
    host = new URL(url).host;
  } catch {
    out.verdict = "SUPABASE_URL is not a valid web address. It should look like https://abcdxyz.supabase.co";
    return NextResponse.json(out, { status: 200 });
  }
  out.site_is_connected_to_project = host.split(".")[0];
  out.supabase_host = host;
  out.url_format_ok = /^[a-z0-9]+\.supabase\.co$/.test(host) && !/\/rest\//.test(url);
  out.key_type = keyKind(key);

  const base = url.replace(/\/+$/, "");
  const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  const marker = "diag-test@example.invalid";
  const steps: Record<string, unknown> = {};

  const run = async (name: string, fn: () => Promise<Response>) => {
    try {
      const res = await fn();
      const text = await res.text().catch(() => "");
      steps[name] = { status: res.status, ok: res.ok, detail: res.ok ? undefined : text.slice(0, 300), body: res.ok ? text.slice(0, 120) : undefined };
      return { res, text };
    } catch (e) {
      steps[name] = { status: "network error", detail: String(e).slice(0, 200) };
      return null;
    }
  };

  const ins = await run("1_test_save", () =>
    fetch(`${base}/rest/v1/charter_applications?on_conflict=email`, {
      method: "POST",
      headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ email: marker, mission: "diagnostic", updated_at: new Date().toISOString() }),
    })
  );
  const read = await run("2_read_back", () =>
    fetch(`${base}/rest/v1/charter_applications?email=eq.${encodeURIComponent(marker)}&select=email`, { headers })
  );
  await run("3_cleanup", () =>
    fetch(`${base}/rest/v1/charter_applications?email=eq.${encodeURIComponent(marker)}`, { method: "DELETE", headers })
  );
  out.steps = steps;

  let found = 0;
  try {
    found = read ? JSON.parse(read.text).length : 0;
  } catch {
    found = 0;
  }
  if (ins?.res.ok && found > 0) {
    out.verdict = `WORKING. The site can save to project "${host.split(".")[0]}". Open that exact project in Supabase to see rows. If your Table Editor is in a different project, that is the mismatch.`;
  } else if (ins && !ins.res.ok) {
    out.verdict = `The save was refused (status ${ins.res.status}). See steps.1_test_save.detail for the reason.`;
  } else {
    out.verdict = "The test save did not complete. See the steps above.";
  }
  return NextResponse.json(out, { status: 200 });
}
