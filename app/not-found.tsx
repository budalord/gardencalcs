import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found · Garden Tools Hub",
  description: "The page you were looking for wasn't in this issue of the almanac.",
  robots: { index: false, follow: false },
};

/**
 * 404 — Editorial Almanac "out of print" page (per P15).
 * Serif H1, botanical SVG vignette, two clear routes back into the site.
 */
export default function NotFound() {
  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-16 pb-24 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-terracotta mb-5">
        Errata · Page not found
      </p>

      {/* Botanical vignette: a fallen leaf line-drawing */}
      <svg
        viewBox="0 0 160 120"
        width="160"
        height="120"
        role="img"
        aria-label="A single fallen leaf, drawn in ink line"
        className="mx-auto mb-8 text-soil"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Leaf outline */}
        <path
          d="M30 92 C 36 58, 66 32, 118 28 C 122 54, 104 88, 70 96 C 54 99, 40 98, 30 92 Z"
          fill="color-mix(in oklch, var(--leaf) 25%, transparent)"
        />
        {/* Midrib */}
        <path d="M30 92 C 60 76, 94 54, 118 28" />
        {/* Veins */}
        <path d="M47 84 L 58 70" />
        <path d="M58 78 L 72 60" />
        <path d="M72 72 L 86 54" />
        <path d="M86 64 L 100 46" />
        {/* Dashed soil line */}
        <path d="M12 108 L 148 108" strokeDasharray="2 5" />
      </svg>

      <h1 className="font-serif font-semibold text-[56px] md:text-[72px] leading-[1] tracking-[-0.02em] text-ink mb-4 tabular">
        404
      </h1>
      <p className="font-serif italic text-[20px] leading-[1.45] text-soil max-w-[520px] mx-auto mb-10">
        This page isn&apos;t in the current issue. It may have been re-filed, renamed, or never printed at all.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-[480px] mx-auto">
        <Link
          href="/"
          className="flex-1 bg-moss-deep hover:bg-moss text-cream font-sans text-sm font-medium py-3 px-5 rounded-md transition-colors duration-fast"
        >
          Back to the front page
        </Link>
        <Link
          href="/tools"
          className="flex-1 bg-cream border border-ink/70 hover:border-moss-deep hover:text-moss-deep text-ink font-sans text-sm font-medium py-3 px-5 rounded-md transition-colors duration-fast"
        >
          Browse the calculators
        </Link>
      </div>

      <div className="mt-14 pt-8 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)] text-left max-w-[520px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-soil mb-4">
          Popular stops
        </p>
        <ul className="divide-y divide-[color-mix(in_oklch,var(--soil)_20%,transparent)]">
          {[
            { href: "/tools/soil-ph-calculator", label: "Soil pH Calculator", meta: "Garden" },
            { href: "/tools/compost-calculator", label: "Compost Calculator", meta: "Garden" },
            { href: "/tools/fertilizer-calculator", label: "Fertilizer Calculator", meta: "Garden" },
            { href: "/guides", label: "Guides index", meta: "Almanac" },
          ].map((row) => (
            <li key={row.href}>
              <Link
                href={row.href}
                className="flex justify-between items-baseline py-3 group transition-colors duration-fast"
              >
                <span className="font-serif text-[16px] text-ink group-hover:text-moss-deep transition-colors duration-fast">
                  {row.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-soil">
                  {row.meta}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
