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
  const base = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!base || !key) throw new Error("Supabase is not configured");

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

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Supabase error ${res.status}: ${detail.slice(0, 300)}`);
  }
}
