import { getAllNodes, type HubNode } from "./hub";

export interface SearchResult {
  id: string;
  title: string;
  department: "production" | "power" | null;
  batch: number | null;
  year: number | null;
  semester: number | null;
  url: string | null;
  type: string;
}

export async function getSearchIndex(): Promise<SearchResult[]> {
  const nodes = await getAllNodes();
  return nodes
    .filter((node) => node.active)
    .map((node) => ({
      id: node.id,
      title: [node.title_ar, node.title].filter(Boolean).join(" | "),
      department: node.department,
      batch: node.batch_year,
      year: node.year_number,
      semester: node.semester_number,
      url: node.url,
      type: node.type,
    }));
}

export function searchNodes(nodes: SearchResult[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return nodes.filter((item) => {
    const haystack = [item.title, item.department, item.batch, item.year, item.semester, item.type]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  }).slice(0, 12);
}
