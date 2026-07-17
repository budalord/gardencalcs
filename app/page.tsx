import type { Metadata } from "next";
import Link from "next/link";
import { tools, getToolsByCategory } from "@/config/tools";
import { resolveTools } from "@/config/phase1Overrides";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.domain },
};

/**
 * Homepage — Editorial Almanac cover.
 * Positions the site as a maintained reference publication, not a SaaS product.
 * Serif masthead + botanical SVG, spotlight callout, then featured tools + guides + trust strip.
 */
export default function HomePage() {
  const resolvedTools = resolveTools(tools);
  const byCategory = getToolsByCategory(resolvedTools);
  const featured = resolvedTools.slice(0, 6);
  const categoryCount = Object.keys(byCategory).length;

  const guides = [
    { slug: "tomato-growing-guide", href: "/grow/tomato", tag: "Almanac · Growing", title: "How to grow tomatoes in a home garden", excerpt: "Planting time, spacing, soil, feeding, watering, disease prevention, and harvest cues — with an extension source behind every number.", read: "Full guide" },
    { slug: "understanding-soil-ph", href: "/guides/understanding-soil-ph", tag: "Almanac · Soil", title: "Understanding soil pH for beginners", excerpt: "A field guide to reading your soil — what pH actually means for root uptake, and how to correct it over a season.", read: "12 min read" },
    { slug: "composting-guide", href: "/guides/composting-guide", tag: "Almanac · Composting", title: "The complete home-composting guide", excerpt: "Greens, browns, ratios, and the two-pile rhythm that actually works on a small lot.", read: "14 min read" },
    { slug: "how-to-fertilize-vegetable-garden", href: "/guides/how-to-fertilize-vegetable-garden", tag: "Almanac · Fertilizer", title: "How to fertilize a vegetable garden", excerpt: "NPK, side-dressing, and the three deficiency signs every small-plot grower should recognize.", read: "11 min read" },
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.domain },
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Garden calculators",
    itemListElement: resolvedTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${siteConfig.domain}/tools/${tool.slug}`,
      description: tool.tagline,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* ═══════ Almanac cover hero ═══════ */}
      <section className="border-b border-[color-mix(in_oklch,var(--soil)_25%,transparent)]">
        <div className="max-w-wide mx-auto px-7 pt-10 pb-16">
          {/* Masthead rule */}
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-10">
            <span className="flex-1 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_40%,transparent)]" />
            <span>The Garden Tools Almanac · Issue No. 042</span>
            <span className="flex-1 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_40%,transparent)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <p className="font-serif italic text-[15px] text-soil mb-4">
                Spring 2026 · Soil spotlight
              </p>
              <h1 className="font-serif font-semibold text-[52px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-moss-deep">
                Garden math, <span className="font-normal text-ink">answered.</span>
              </h1>
              <p className="font-serif text-[20px] leading-[1.55] text-ink mt-6 max-w-[560px]">
                {resolvedTools.length} free, source-cited calculators for growers who want a number, not a newsletter.
              </p>

              <div className="flex flex-wrap items-center gap-x-7 gap-y-2 mt-6 font-sans text-[13px] text-soil tabular">
                <span><strong className="text-ink">{resolvedTools.length}</strong> tools</span>
                <span><strong className="text-ink">{guides.length}</strong> long-reads</span>
                <span>Updated <strong className="text-ink">weekly</strong></span>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/tools"
                  className="inline-flex items-center px-6 py-3 bg-moss-deep text-cream font-sans text-sm font-medium rounded border border-moss-deep hover:bg-moss transition-colors duration-fast"
                >
                  Browse the tools
                </Link>
                <Link
                  href="/guides"
                  className="inline-flex items-center px-6 py-3 font-sans text-sm font-medium text-moss-deep border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded hover:border-moss-deep transition-colors duration-fast"
                >
                  Read this issue →
                </Link>
              </div>

              {/* Spotlight callout */}
              <div className="mt-10 border-l-2 border-terracotta pl-5 py-1 max-w-[520px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-1">In this issue</p>
                <p className="font-serif font-semibold text-[19px] text-moss-deep leading-tight">
                  A field guide to spring soil preparation
                </p>
                <p className="font-serif text-[14px] text-soil mt-1 italic">
                  pH, drainage, amendments — the three decisions to make before the last frost.
                </p>
              </div>
            </div>

            {/* Botanical illustration */}
            <div className="hidden md:block self-start">
              <svg width="240" height="300" viewBox="0 0 240 300" fill="none" className="text-moss-deep" aria-hidden="true">
                {/* Stem */}
                <path d="M120 290 L120 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Leaves alternating */}
                <g stroke="currentColor" strokeWidth="1.5" fill="none">
                  <path d="M120 240 C 90 230, 60 210, 50 180 C 80 180, 110 210, 120 240 Z" />
                  <path d="M120 200 C 150 190, 180 170, 190 140 C 160 140, 130 170, 120 200 Z" />
                  <path d="M120 160 C 90 150, 60 130, 50 100 C 80 100, 110 130, 120 160 Z" />
                  <path d="M120 120 C 150 110, 180 90, 190 60 C 160 60, 130 90, 120 120 Z" />
                </g>
                {/* Leaf veins */}
                <g stroke="currentColor" strokeWidth="0.8" opacity="0.55" fill="none">
                  <path d="M120 240 L 65 192" />
                  <path d="M120 200 L 175 152" />
                  <path d="M120 160 L 65 112" />
                  <path d="M120 120 L 175 72" />
                </g>
                {/* Top bud */}
                <circle cx="120" cy="55" r="4" fill="var(--leaf)" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.2" />
                {/* Soil line */}
                <path d="M30 290 L210 290" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ Featured calculators ═══════ */}
      {featured.length > 0 && (
        <section className="max-w-wide mx-auto px-7 py-16">
          <div className="flex items-end justify-between gap-6 mb-8 pb-4 border-b border-[color-mix(in_oklch,var(--soil)_20%,transparent)]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-2">Featured calculators</p>
              <h2 className="font-serif font-semibold text-[28px] tracking-tight text-moss-deep">
                Practical calculators for common garden jobs
              </h2>
              <p className="font-serif italic text-[14px] text-soil mt-1">
                Start with any tool below; each one shows its source basis and assumptions.
              </p>
            </div>
            <Link href="/tools" className="hidden sm:inline font-sans text-sm text-moss-deep hover:text-moss whitespace-nowrap">
              See all {resolvedTools.length} tools →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group block bg-paper border border-[color-mix(in_oklch,var(--soil)_20%,transparent)] rounded-md p-6 hover:border-moss-deep transition-colors duration-fast"
              >
                <div className="w-9 h-9 mb-4 text-moss-deep" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 28 C 8 26, 4 18, 4 10 C 12 10, 18 14, 20 22" />
                    <path d="M16 28 C 24 26, 28 18, 28 10 C 20 10, 14 14, 12 22" />
                    <path d="M16 28 L 16 18" />
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-[18px] text-moss-deep tracking-tight group-hover:underline decoration-[color-mix(in_oklch,var(--moss)_50%,transparent)] underline-offset-4">
                  {tool.name}
                </h3>
                <p className="font-serif text-[14px] text-ink leading-relaxed mt-2">
                  {tool.tagline}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-soil mt-4">
                  {tool.category}
                </p>
              </Link>
            ))}
          </div>

          {categoryCount > 1 && (
            <div className="flex flex-wrap gap-2 mt-10">
              {Object.entries(byCategory).map(([cat, catTools]) => (
                <Link
                  key={cat}
                  href={`/tools?category=${encodeURIComponent(cat)}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 font-sans text-[13px] text-ink border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-full hover:border-moss-deep hover:text-moss-deep transition-colors duration-fast"
                >
                  {cat}
                  <span className="text-soil tabular">({catTools.length})</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ═══════ From the Almanac (Guides) ═══════ */}
      <section className="border-t border-[color-mix(in_oklch,var(--soil)_20%,transparent)]">
        <div className="max-w-wide mx-auto px-7 py-16">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-2">From the Almanac</p>
              <h2 className="font-serif font-semibold text-[28px] tracking-tight text-moss-deep">
                Long-reads to go with the numbers
              </h2>
              <p className="font-serif italic text-[14px] text-soil mt-1">
                Each guide pairs with a calculator and cites its University Extension sources.
              </p>
            </div>
            <Link href="/guides" className="hidden sm:inline font-sans text-sm text-moss-deep hover:text-moss whitespace-nowrap">
              All guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={g.href}
                className="group block border-t-2 border-moss-deep pt-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soil mb-2">{g.tag}</p>
                <h3 className="font-serif font-semibold text-[20px] leading-[1.3] text-ink group-hover:text-moss-deep transition-colors duration-fast">
                  {g.title}
                </h3>
                <p className="font-serif text-[14px] text-soil leading-relaxed mt-2">{g.excerpt}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-soil mt-4">{g.read}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ Trust strip ═══════ */}
      <section className="border-t border-[color-mix(in_oklch,var(--soil)_20%,transparent)] bg-paper">
        <div className="max-w-wide mx-auto px-7 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { h: "Extension-sourced formulas", p: "Every calculator cites at least two .edu or .gov references — no Reddit, no Brainly." },
            { h: "Used by home growers", p: "Home gardeners, community plots, and master-gardener programs." },
            { h: "No signup, no tracking", p: "Client-side calculators. Nothing to register. Embed freely." },
          ].map((t) => (
            <div key={t.h} className="flex gap-4">
              <div className="w-px bg-moss-deep flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-serif font-semibold text-[16px] text-moss-deep tracking-tight">{t.h}</h3>
                <p className="font-serif text-[14px] text-ink leading-relaxed mt-1">{t.p}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
