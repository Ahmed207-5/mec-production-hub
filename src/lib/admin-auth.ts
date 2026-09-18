import { getSupabaseUser } from "./supabase-rest";

export function getAccessToken(request: Request) {
  const header = request.headers.get("authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}

export async function requireAdmin(request: Request) {
  const token = getAccessToken(request);
  if (!token) return { ok: false as const, status: 401, message: "غير مصرح" };

  const user = await getSupabaseUser(token);
  if (!user) return { ok: false as const, status: 401, message: "جلسة الدخول غير صالحة" };

  const allowed = (process.env.MEC_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!user.email || !allowed.includes(user.email.toLowerCase())) {
    return { ok: false as const, status: 403, message: "هذا الحساب ليس ضمن حسابات الإدارة" };
  }

  return { ok: true as const, user };
}
