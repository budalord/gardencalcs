import { siteConfig } from "@/config/site";
import { seedSpacingCrops } from "@/config/seedSpacingCrops";
import { tools } from "@/config/tools";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${base}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guides = [
    "how-to-fertilize-vegetable-garden",
    "understanding-soil-ph",
    "composting-guide",
  ];

  const staticPages = ["/about", "/privacy", "/contact"].map((p) => ({
    url: `${siteConfig.domain}${p}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const seedSpacingCropRoutes: MetadataRoute.Sitemap = seedSpacingCrops.map((crop) => ({
    url: `${base}/tools/seed-spacing/${crop.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes, ...seedSpacingCropRoutes, ...guideRoutes, ...staticPages];
}
