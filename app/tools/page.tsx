import type { Metadata } from "next";
import Link from "next/link";
import { tools, getToolsByCategory } from "@/config/tools";
import { resolveTools } from "@/config/phase1Overrides";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "All Garden Calculators — Free, No Signup",
  description: `Every free garden calculator on ${siteConfig.name} — fertilizer NPK, compost volume, soil pH, seed spacing, and watering. Extension-cited, no signup.`,
  alternates: { canonical: `${siteConfig.domain}/tools` },
};

export default function ToolsPage() {
  const resolvedTools = resolveTools(tools);
  const byCategory = getToolsByCategory(resolvedTools);

  return (
    <article className="max-w-[1024px] mx-auto px-6 md:px-8 pt-7 pb-24">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7"
      >
        <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">Tools</span>
      </nav>

      {/* Page head */}
      <header className="pb-7 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10 max-w-[720px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
          The reference shelf
        </p>
        <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-3">
          All calculators
        </h1>
        <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil">
          {resolvedTools.length} free tools, no sign-up — each one cites its extension-service sources and shows its working.
        </p>
      </header>

      {Object.entries(byCategory).map(([category, categoryTools]) => (
        <section key={category} className="mb-14">
          <div className="flex items-center gap-5 mb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta">
              {category}
            </p>
            <span className="flex-1 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)]" />
            <p className="font-mono text-[11px] tabular text-soil">
              {String(categoryTools.length).padStart(2, "0")} tools
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-5 transition-colors duration-fast"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-soil mb-2">
                  {tool.category}
                </p>
                <p className="font-serif font-semibold text-[18px] leading-[1.25] text-ink group-hover:text-moss-deep transition-colors duration-fast mb-2">
                  {tool.name}
                </p>
                <p className="font-serif text-[14px] leading-[1.55] text-soil">
                  {tool.tagline}
                </p>
                <p className="mt-4 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_25%,transparent)] font-mono text-[11px] uppercase tracking-[0.12em] text-moss-deep">
                  Open calculator →
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
