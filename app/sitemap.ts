import { siteConfig } from "@/config/site";
import { seedSpacingCrops } from "@/config/seedSpacingCrops";
import { soilPHCrops } from "@/config/soilPHCrops";
import { tools } from "@/config/tools";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/embed`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
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

  const dataRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/data/npk-rates-by-crop`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/data/compost-cn-ratios`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
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

  const soilPHCropRoutes: MetadataRoute.Sitemap = soilPHCrops.map((crop) => ({
    url: `${base}/tools/soil-ph/${crop.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const growRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/grow/tomato`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];

  return [...staticRoutes, ...toolRoutes, ...seedSpacingCropRoutes, ...soilPHCropRoutes, ...growRoutes, ...guideRoutes, ...dataRoutes, ...staticPages];
}
