import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Garden Guides",
  description: "Free gardening guides — fertilizing, soil pH, composting, and more for home gardeners.",
  alternates: { canonical: `${siteConfig.domain}/guides` },
};

const guides = [
  {
    slug: "how-to-fertilize-vegetable-garden",
    title: "How to Fertilize Your Vegetable Garden",
    desc: "When to fertilize, NPK basics, recommended rates for common vegetables, and organic vs synthetic fertilizer comparison.",
    related: "/tools/fertilizer-calculator",
    relatedName: "Fertilizer Calculator",
  },
  {
    slug: "understanding-soil-ph",
    title: "Understanding Soil pH for Beginners",
    desc: "What soil pH is, why it matters, how to test it, a pH chart for common plants, and how to adjust with lime or sulfur.",
    related: "/tools/soil-ph-calculator",
    relatedName: "Soil pH Calculator",
  },
  {
    slug: "composting-guide",
    title: "Complete Guide to Composting at Home",
    desc: "Greens vs browns, the C:N ratio explained, hot vs cold composting, and troubleshooting common problems.",
    related: "/tools/compost-calculator",
    relatedName: "Compost Calculator",
  },
];

export default function GuidesIndex() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Garden Guides</h1>
      <p className="text-gray-500 mb-10">Practical guides for home gardeners — backed by University Extension research.</p>
      <div className="space-y-4">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`}
            className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all">
            <h2 className="font-semibold text-gray-900">{g.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{g.desc}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-green-700 font-medium">Read guide →</span>
              <span className="text-xs text-gray-400">Related: <span className="text-green-700">{g.relatedName}</span></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
