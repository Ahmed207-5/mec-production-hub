import { batches as productionBatches } from "@/data/production";
import { batches as powerBatches } from "@/data/power";
import { departments } from "@/data/departments";
import { hasSupabase, supabaseFetch } from "./supabase-rest";

export type NodeType = "department" | "archive" | "folder" | "batch" | "year" | "term" | "link" | "button";

export interface HubNode {
  id: string;
  parent_id: string | null;
  type: NodeType;
  title: string;
  title_ar: string | null;
  department: "production" | "power" | null;
  batch_year: number | null;
  year_number: number | null;
  semester_number: number | null;
  url: string | null;
  icon: string | null;
  sort_order: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

function staticNodes(): HubNode[] {
  const result: HubNode[] = [];
  const now = "2000-01-01T00:00:00.000Z";

  for (const department of departments) {
    const depId = `static-department-${department.id}`;
    result.push({
      id: depId,
      parent_id: null,
      type: "department",
      title: department.name,
      title_ar: department.nameAr,
      department: department.id as "production" | "power",
      batch_year: null,
      year_number: null,
      semester_number: null,
      url: null,
      icon: department.icon,
      sort_order: department.id === "production" ? 0 : 1,
      active: true,
      created_at: now,
      updated_at: now,
    });
  }

  const sourceMap = [
    ["production", productionBatches],
    ["power", powerBatches],
  ] as const;

  for (const [department, batches] of sourceMap) {
    const depId = `static-department-${department}`;
    batches.forEach((batch, bi) => {
      const batchId = `static-${department}-batch-${batch.year}`;
      result.push({
        id: batchId,
        parent_id: depId,
        type: "batch",
        title: batch.label,
        title_ar: batch.label,
        department,
        batch_year: batch.year,
        year_number: null,
        semester_number: null,
        url: null,
        icon: "📁",
        sort_order: bi,
        active: true,
        created_at: now,
        updated_at: now,
      });

      batch.years.forEach((year, yi) => {
        const yearId = `${batchId}-year-${year.yearNumber}`;
        result.push({
          id: yearId,
          parent_id: batchId,
          type: "year",
          title: `الفرقة ${year.yearNumber}`,
          title_ar: `الفرقة ${year.yearNumber}`,
          department,
          batch_year: batch.year,
          year_number: year.yearNumber,
          semester_number: null,
          url: null,
          icon: "📚",
          sort_order: yi,
          active: true,
          created_at: now,
          updated_at: now,
        });

        (["first", "second"] as const).forEach((semester, si) => {
          const url = year.semesters[semester];
          if (!url) return;
          result.push({
            id: `${yearId}-${semester}`,
            parent_id: yearId,
            type: "term",
            title: semester === "first" ? "الترم الأول" : "الترم الثاني",
            title_ar: semester === "first" ? "الترم الأول" : "الترم الثاني",
            department,
            batch_year: batch.year,
            year_number: year.yearNumber,
            semester_number: si + 1,
            url,
            icon: "🔗",
            sort_order: si,
            active: true,
            created_at: now,
            updated_at: now,
          });
        });
      });
    });
  }

  return result;
}

export async function getAllNodes(): Promise<HubNode[]> {
  if (!hasSupabase) return staticNodes();
  try {
    return await supabaseFetch<HubNode[]>("hub_nodes?select=*&active=eq.true&order=sort_order.asc,created_at.asc");
  } catch {
    return staticNodes();
  }
}

export async function getChildren(parentId: string): Promise<HubNode[]> {
  const nodes = await getAllNodes();
  return nodes.filter((node) => node.parent_id === parentId && node.active).sort((a, b) => a.sort_order - b.sort_order);
}

export async function getNode(id: string): Promise<HubNode | null> {
  const nodes = await getAllNodes();
  return nodes.find((node) => node.id === id) ?? null;
}

export async function getDepartmentNodes(department: "production" | "power") {
  const nodes = await getAllNodes();
  const departmentNode = nodes.find((node) => node.type === "department" && node.department === department);
  if (!departmentNode) return { departmentNode: null, children: [] as HubNode[] };
  return {
    departmentNode,
    children: nodes.filter((node) => node.parent_id === departmentNode.id && node.active).sort((a, b) => a.sort_order - b.sort_order),
  };
}

export async function getBatchNodes(department: "production" | "power", batchYear: number) {
  const nodes = await getAllNodes();
  return nodes.find((node) => node.type === "batch" && node.department === department && node.batch_year === batchYear) ?? null;
}

export async function getClickCounts(nodeIds: string[]) {
  if (!hasSupabase || nodeIds.length === 0) return new Map<string, number>();
  try {
    const safeIds = nodeIds.filter((id) => /^[0-9a-f-]{36}$/i.test(id));
    if (!safeIds.length) return new Map<string, number>();
    const rows = await supabaseFetch<Array<{ node_id: string; clicks: number }>>(
      `hub_clicks?select=node_id,clicks&node_id=in.(${safeIds.join(",")})`
    );
    return new Map(rows.map((row) => [row.node_id, Number(row.clicks)]));
  } catch {
    return new Map<string, number>();
  }
}
