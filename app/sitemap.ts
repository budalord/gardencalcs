import { siteConfig } from "@/config/site";
import { seedSpacingCrops } from "@/config/seedSpacingCrops";
import { soilPHCrops } from "@/config/soilPHCrops";
import { tools } from "@/config/tools";
import { pageUpdatedAt } from "@/config/pageDates";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;
  const lastModified = (path: string) => {
    const date = pageUpdatedAt[path];
    if (!date) throw new Error("missing pageUpdatedAt for " + path);
    return new Date(date);
  };

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: lastModified("/"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools`, lastModified: lastModified("/tools"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/guides`, lastModified: lastModified("/guides"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/embed`, lastModified: lastModified("/embed"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/answers/how-much-compost-for-raised-bed`, lastModified: lastModified("/answers/how-much-compost-for-raised-bed"), changeFrequency: "monthly", priority: 0.75 },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${base}/tools/${tool.slug}`,
    lastModified: lastModified(`/tools/${tool.slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guides = [
    "how-to-fertilize-vegetable-garden",
    "understanding-soil-ph",
    "composting-guide",
  ];

  const dataRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/data/npk-rates-by-crop`, lastModified: lastModified("/data/npk-rates-by-crop"), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/data/compost-cn-ratios`, lastModified: lastModified("/data/compost-cn-ratios"), changeFrequency: "monthly", priority: 0.75 },
  ];

  const staticPages = ["/about", "/privacy", "/affiliate-disclosure", "/contact"].map((p) => ({
    url: `${siteConfig.domain}${p}`,
    lastModified: lastModified(p),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: lastModified(`/guides/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const seedSpacingCropRoutes: MetadataRoute.Sitemap = seedSpacingCrops.map((crop) => ({
    url: `${base}/tools/seed-spacing/${crop.slug}`,
    lastModified: lastModified(`/tools/seed-spacing/${crop.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const soilPHCropRoutes: MetadataRoute.Sitemap = soilPHCrops.map((crop) => ({
    url: `${base}/tools/soil-ph/${crop.slug}`,
    lastModified: lastModified(`/tools/soil-ph/${crop.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const growRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/grow/tomato`, lastModified: lastModified("/grow/tomato"), changeFrequency: "monthly", priority: 0.85 },
  ];

  return [...staticRoutes, ...toolRoutes, ...seedSpacingCropRoutes, ...soilPHCropRoutes, ...growRoutes, ...guideRoutes, ...dataRoutes, ...staticPages];
}
