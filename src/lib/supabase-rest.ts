const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export function supabaseHeaders(service = false) {
  const key = service ? SUPABASE_SERVICE_ROLE_KEY : SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !key) return null;
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export function supabaseRestUrl(path: string) {
  if (!SUPABASE_URL) return null;
  return `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${path.replace(/^\//, "")}`;
}

export async function supabaseFetch<T>(path: string, init: RequestInit = {}, service = false): Promise<T> {
  const url = supabaseRestUrl(path);
  const headers = supabaseHeaders(service);
  if (!url || !headers) throw new Error("Supabase is not configured");

  const response = await fetch(url, {
    ...init,
    headers: { ...headers, ...(init.headers || {}) },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase ${response.status}: ${body}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function getSupabaseUser(accessToken: string) {
  const base = SUPABASE_URL;
  const key = SUPABASE_ANON_KEY;
  if (!base || !key) return null;

  const response = await fetch(`${base.replace(/\/$/, "")}/auth/v1/user`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) return null;
  return response.json() as Promise<{ id: string; email?: string }>;
}
