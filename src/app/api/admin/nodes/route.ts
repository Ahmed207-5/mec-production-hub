import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseFetch } from "@/lib/supabase-rest";
import type { HubNode } from "@/lib/hub";

function cleanPayload(body: Record<string, unknown>) {
  return {
    parent_id: body.parent_id || null,
    type: body.type,
    title: String(body.title || "").trim(),
    title_ar: body.title_ar ? String(body.title_ar).trim() : null,
    department: body.department || null,
    batch_year: body.batch_year ? Number(body.batch_year) : null,
    year_number: body.year_number ? Number(body.year_number) : null,
    semester_number: body.semester_number ? Number(body.semester_number) : null,
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
  return {
    ...payload,
    department: payload.department || parent.department,
    batch_year: payload.batch_year ?? parent.batch_year,
    year_number: payload.year_number ?? parent.year_number,
  };
}

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const nodes = await supabaseFetch<HubNode[]>("hub_nodes?select=*&order=department.asc,batch_year.desc,sort_order.asc,created_at.asc", {}, true);
    return NextResponse.json(nodes);
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
    const rows = await supabaseFetch<HubNode[]>("hub_nodes", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(payload) }, true);
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
    const rows = await supabaseFetch<HubNode[]>(`hub_nodes?id=eq.${id}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(payload) }, true);
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
