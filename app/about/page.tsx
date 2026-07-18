import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about GardenCalcs — a free collection of online gardening calculators built to help home gardeners make data-driven planting decisions.",
  alternates: { canonical: `${siteConfig.domain}/about` },
};

export default function AboutPage() {
  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-7 pb-24">
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7"
      >
        <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">About</span>
      </nav>

      <header className="pb-8 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
          Colophon · About the Almanac
        </p>
        <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-4">
          About GardenCalcs
        </h1>
        <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil">
          A reference publication of extension-cited garden calculators — free, no sign-up, and quietly rigorous.
        </p>
      </header>

      <div className="almanac-prose font-serif text-[17px] leading-[1.75] text-ink">
        <p>
          GardenCalcs is a free collection of online calculators designed to help home gardeners make better, data-driven decisions — from calculating fertilizer dosage to finding the right soil pH for their crops.
        </p>
        <p>
          The goal is simple: take the guesswork out of gardening. Whether you are a first-time grower or a seasoned backyard farmer, GardenCalcs provides the numbers you need without requiring an account, a subscription, or sitting through ads.
        </p>

        <section>
          <h2>Our data sources</h2>
          <p>
            All calculation formulas and reference data are based on publicly available agricultural extension resources from leading university programs, including Penn State Extension, Clemson Cooperative Extension, Oregon State University Extension, and Cornell Cooperative Extension. Where multiple sources differ, GardenCalcs uses the most widely cited recommendation.
          </p>
          <p>
            We review and update our data periodically. If you spot an error or have a suggestion for improvement, please reach out via the <Link href="/contact">contact page</Link>.
          </p>
        </section>

        <section>
          <h2>Free, forever</h2>
          <p>
            GardenCalcs is free to use and does not require an account. Calculator inputs and results stay in your browser, and there are no paywalls.
          </p>
          <p>
            Developers and bloggers are welcome to embed any tool on their own sites using the embed widget available on each tool page.
          </p>
        </section>

        <section className="!mt-14 pt-10 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-terracotta !mt-0 mb-4">Start here</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/tools" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">Browse the calculators</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Every tool, grouped by topic.</p>
            </Link>
            <Link href="/guides" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">Read the guides</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Long-form explainers pairing with each tool.</p>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
