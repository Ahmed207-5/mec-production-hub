import { NextResponse } from "next/server";
import { hasSupabase, supabaseFetch } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nodeId = String(body?.nodeId || "");

    if (!/^[0-9a-f-]{36}$/i.test(nodeId)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (!hasSupabase) return NextResponse.json({ ok: true, configured: false });

    const rows = await supabaseFetch<Array<{ increment_hub_click: number }>>(
      "rpc/increment_hub_click",
      {
        method: "POST",
        body: JSON.stringify({ p_node_id: nodeId }),
      }
    );

    return NextResponse.json({ ok: true, clicks: Array.isArray(rows) ? rows[0]?.increment_hub_click : rows });
  } catch {
    return NextResponse.json({ ok: true, configured: false });
  }
}
