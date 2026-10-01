// Saves Charter applications to Supabase using its REST API (no extra npm package).
// Environment variables (set in Vercel → Settings → Environment Variables):
//   SUPABASE_URL         – your project URL, e.g. https://abcdxyz.supabase.co
//   SUPABASE_SECRET_KEY  – your project's SECRET key (server-only; never expose it in browser code)
// If either is missing, saving is skipped and the notification email still goes out.

export type CharterRow = {
  email: string;
  mission: string | null;
  disruptors: string[];
  app_failure: string | null;
  write_in: string | null;
};

export function supabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}

export async function saveCharterApplication(row: CharterRow): Promise<void> {
  const rawUrl = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!rawUrl || !key) throw new Error("Supabase is not configured");
  // Keep only the web address itself, so extra text such as /rest/v1/ on the end is ignored.
  let base: string;
  try {
    base = new URL(rawUrl).origin;
  } catch {
    throw new Error(`SUPABASE_URL is not a valid web address ("${rawUrl.slice(0, 60)}")`);
  }
  // Guard against pasting the wrong address (for example the dashboard address supabase.com).
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/i.test(base)) {
    throw new Error(`SUPABASE_URL looks wrong ("${base.slice(0, 60)}"). It must look like https://yourprojectcode.supabase.co`);
  }

  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    // One row per email: applying again updates the existing row.
    Prefer: "resolution=merge-duplicates,return=minimal",
  };
  // Legacy JWT-style keys also go in the Authorization header; new "sb_secret_" keys do not.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;

  const res = await fetch(`${base}/rest/v1/charter_applications?on_conflict=email`, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...row, email: row.email.toLowerCase(), updated_at: new Date().toISOString() }),
  });

  const contentType = res.headers?.get?.("content-type") || "";
  if (!res.ok || contentType.includes("text/html")) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Supabase error ${res.status}: ${detail.slice(0, 300)}`);
  }
}
