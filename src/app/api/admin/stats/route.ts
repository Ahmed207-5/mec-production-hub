import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseFetch } from "@/lib/supabase-rest";

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const rows = await supabaseFetch<Array<{
      node_id: string;
      clicks: number;
      last_clicked: string | null;
      node: { title: string; title_ar: string | null; department: string | null; batch_year: number | null; year_number: number | null; semester_number: number | null; url: string | null } | null;
    }>>("hub_clicks?select=node_id,clicks,last_clicked,node:hub_nodes(title,title_ar,department,batch_year,year_number,semester_number,url)&order=clicks.desc&limit=50", {}, true);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "تعذر تحميل الإحصائيات" }, { status: 500 });
  }
}
