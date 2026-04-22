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
    dek: "When to fertilize, NPK basics, recommended rates for common vegetables, and organic vs synthetic comparison.",
    readTime: "11 min",
    topic: "Fertilizing",
    related: "/tools/fertilizer-calculator",
    relatedName: "Fertilizer Calculator",
  },
  {
    slug: "understanding-soil-ph",
    title: "Understanding Soil pH for Beginners",
    dek: "What soil pH is, why it matters, how to test it, a pH chart for common plants, and how to adjust with lime or sulfur.",
    readTime: "9 min",
    topic: "Soil",
    related: "/tools/soil-ph-calculator",
    relatedName: "Soil pH Calculator",
  },
  {
    slug: "composting-guide",
    title: "Complete Guide to Composting at Home",
    dek: "Greens vs browns, the C:N ratio explained, hot vs cold composting, and troubleshooting common problems.",
    readTime: "12 min",
    topic: "Composting",
    related: "/tools/compost-calculator",
    relatedName: "Compost Calculator",
  },
];

export default function GuidesIndex() {
  return (
    <article className="max-w-[1024px] mx-auto px-6 md:px-8 pt-7 pb-24">
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7"
      >
        <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">Guides</span>
      </nav>

      <header className="pb-7 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10 max-w-[720px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
          From the Almanac · long reads
        </p>
        <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-3">
          Garden guides
        </h1>
        <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil">
          Practical, extension-cited explainers paired with the calculators you&apos;ll need to act on them.
        </p>
      </header>

      <div className="divide-y divide-[color-mix(in_oklch,var(--soil)_25%,transparent)] border-t border-b border-[color-mix(in_oklch,var(--soil)_25%,transparent)]">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group block py-7 hover:bg-paper/60 transition-colors duration-fast px-2 -mx-2 rounded-sm"
          >
            <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 mb-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-terracotta">
                {g.topic}
              </p>
              <span className="border-t border-dashed border-[color-mix(in_oklch,var(--soil)_30%,transparent)] translate-y-[-4px]" />
              <p className="font-mono text-[11px] tabular text-soil">{g.readTime}</p>
            </div>
            <h2 className="font-serif font-semibold text-[26px] leading-[1.2] tracking-[-0.005em] text-ink group-hover:text-moss-deep transition-colors duration-fast mb-2">
              {g.title}
            </h2>
            <p className="font-serif text-[16px] leading-[1.6] text-soil max-w-[680px] mb-3">
              {g.dek}
            </p>
            <div className="flex items-center justify-between max-w-[680px]">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-moss-deep">
                Read the guide →
              </span>
              <span className="font-mono text-[11px] tabular text-soil">
                Pairs with · <span className="text-moss-deep">{g.relatedName}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
