import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mecarchive.vercel.app";

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/production`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${base}/power`,
      lastModified: new Date(),
      priority: 0.9,
    },
  ];
}