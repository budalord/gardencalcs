import type { Metadata } from "next";
import Link from "next/link";
import EmbedCodeOptions from "@/components/EmbedCodeOptions";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";

const pageUrl = `${siteConfig.domain}/embed`;

const featuredSlugs = [
  "soil-ph-calculator",
  "compost-calculator",
  "fertilizer-calculator",
  "seed-spacing-calculator",
  "watering-schedule-calculator",
];

const featuredTools = featuredSlugs
  .map((slug) => tools.find((tool) => tool.slug === slug))
  .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

export const metadata: Metadata = {
  title: "Embed Free Garden Calculators on Your Site",
  description:
    "Free iframe embed codes for garden calculators: soil pH, compost, fertilizer NPK, seed spacing, and watering schedules. No signup, source-cited, iframe-safe.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Embed Free Garden Calculators",
    description:
      "Add source-cited gardening calculators to a blog, YouTube resource page, school garden site, or community garden website.",
    url: pageUrl,
    type: "website",
  },
};

export default function EmbedPage() {
  return (
    <article className="max-w-[1040px] mx-auto px-6 md:px-8 pt-7 pb-24">
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7"
      >
        <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">Embed</span>
      </nav>

      <header className="pb-8 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10 max-w-[760px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
          Free embeds · No signup · Source-cited
        </p>
        <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-4">
          Embed garden calculators on your site
        </h1>
        <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil">
          Add practical calculators to a vegetable-gardening blog, school garden page, community garden resource list, or YouTube companion article. The embeds are plain iframes and do not require an account.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          ["No signup", "Copy an iframe code and paste it into your CMS."],
          ["Source-cited", "Calculator pages include extension references and methodology notes."],
          ["Attribution included", "Keep the powered-by link so readers can inspect the original tool."],
        ].map(([title, body]) => (
          <div key={title} className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md p-5">
            <p className="font-serif font-semibold text-[18px] text-ink mb-2">{title}</p>
            <p className="font-serif text-[14.5px] leading-[1.55] text-soil">{body}</p>
          </div>
        ))}
      </section>

      <section className="space-y-10">
        {featuredTools.map((tool) => (
          <section key={tool.slug} className="pt-8 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)]">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-soil mb-2">
                  {tool.category}
                </p>
                <h2 className="font-serif font-semibold text-[27px] md:text-[31px] leading-[1.12] text-ink">
                  {tool.name}
                </h2>
                <p className="font-serif italic text-[15.5px] leading-[1.55] text-soil max-w-[620px] mt-2">
                  {tool.tagline}
                </p>
              </div>
              <Link
                href={`/tools/${tool.slug}`}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-moss-deep hover:text-moss"
              >
                View original calculator →
              </Link>
            </div>
            <EmbedCodeOptions slug={tool.slug} label={tool.name} />
          </section>
        ))}
      </section>
    </article>
  );
}
