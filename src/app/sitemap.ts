import type { MetadataRoute } from "next";
import { getAllNodes } from "@/lib/hub";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://mecarchive.vercel.app";
  const nodes = await getAllNodes();
  const batchUrls = nodes
    .filter((node) => node.type === "batch" && node.department && node.batch_year)
    .map((node) => ({
      url: `${base}/${node.department}/${node.batch_year}`,
      lastModified: node.updated_at ? new Date(node.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/production`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/power`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...batchUrls,
  ];
}
