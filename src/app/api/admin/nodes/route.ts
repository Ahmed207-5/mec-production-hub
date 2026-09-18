import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseFetch } from "@/lib/supabase-rest";
import type { HubNode, NodeType } from "@/lib/hub";

const NODE_TYPES: NodeType[] = ["department", "archive", "folder", "batch", "year", "term", "link", "button"];

function numberOrNull(value: unknown) {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function cleanPayload(body: Record<string, unknown>) {
  const type = String(body.type || "folder") as NodeType;
  if (!NODE_TYPES.includes(type)) throw new Error("نوع العنصر غير صالح");

  const batchYear = numberOrNull(body.batch_year);
  const yearNumber = numberOrNull(body.year_number);
  const semesterNumber = numberOrNull(body.semester_number);

  // Keep the database flexible, but never send a batch year (2025/2026/...) as
  // year_number. Year number is only the academic year 1..4.
  const normalizedYear = ["year", "term"].includes(type) ? yearNumber : null;
  const normalizedSemester = ["term"].includes(type) ? semesterNumber : null;
  const normalizedBatch = ["batch", "archive", "folder", "year", "term", "link", "button"].includes(type)
    ? batchYear
    : null;

  if (type === "year" && (normalizedYear === null || normalizedYear < 1 || normalizedYear > 4)) {
    throw new Error("السنة الدراسية يجب أن تكون من 1 إلى 4");
  }
  if (type === "term" && (normalizedSemester === null || normalizedSemester < 1)) {
    throw new Error("رقم الترم يجب أن يكون 1 أو أكثر");
  }

  return {
    parent_id: body.parent_id || null,
    type,
    title: String(body.title || "").trim(),
    title_ar: body.title_ar ? String(body.title_ar).trim() : null,
    department: body.department === "production" || body.department === "power" ? body.department : null,
    batch_year: normalizedBatch,
    year_number: normalizedYear,
    semester_number: normalizedSemester,
    url: body.url ? String(body.url).trim() : null,
    icon: body.icon ? String(body.icon).trim() : null,
    sort_order: Number(body.sort_order || 0),
    active: body.active !== false,
  };
}

async function inheritFromParent(payload: ReturnType<typeof cleanPayload>) {
  if (!payload.parent_id) return payload;
  const parents = await supabaseFetch<HubNode[]>(`hub_nodes?id=eq.${payload.parent_id}&select=*`, {}, true);
  const parent = parents[0];
  if (!parent) return payload;

  const inherited = {
    ...payload,
    department: payload.department || parent.department,
    batch_year: payload.batch_year ?? parent.batch_year,
    year_number: payload.year_number ?? (payload.type === "term" ? parent.year_number : null),
  };

  // A term placed directly inside a year inherits that year's number. A folder
  // never inherits a year number, which prevents the old 2025-as-year bug.
  if (payload.type !== "year" && payload.type !== "term") inherited.year_number = null;
  if (payload.type !== "term") inherited.semester_number = null;
  return inherited;
}

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const nodes = await supabaseFetch<HubNode[]>("hub_nodes?select=*&order=department.asc,batch_year.desc,sort_order.asc,created_at.asc", {}, true);
    return NextResponse.json(nodes, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر تحميل المحتوى" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const body = await request.json() as Record<string, unknown>;
    let payload = cleanPayload(body);
    payload = await inheritFromParent(payload);
    if (!payload.title) return NextResponse.json({ error: "اكتب عنوان العنصر" }, { status: 400 });
    const rows = await supabaseFetch<HubNode[]>("hub_nodes", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    }, true);
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر الإضافة" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const body = await request.json() as Record<string, unknown>;
    const id = String(body.id || "");
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });
    let payload = cleanPayload(body);
    payload = await inheritFromParent(payload);
    const rows = await supabaseFetch<HubNode[]>(`hub_nodes?id=eq.${id}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    }, true);
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر التعديل" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const body = await request.json() as Record<string, unknown>;
    const id = String(body.id || "");
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "معرف غير صالح" }, { status: 400 });
    await supabaseFetch(`hub_nodes?id=eq.${id}`, { method: "DELETE" }, true);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر الحذف" }, { status: 500 });
  }
}
