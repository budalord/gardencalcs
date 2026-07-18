import type { Metadata } from "next";
import Link from "next/link";
import { AMAZON_ASSOCIATE_DISCLOSURE } from "@/components/AffiliateLink";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "GardenCalcs affiliate disclosure, including how clearly marked Amazon Associates links may support the site at no additional cost to the reader.",
  alternates: { canonical: `${siteConfig.domain}/affiliate-disclosure` },
};

export default function AffiliateDisclosurePage() {
  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-7 pb-24">
      <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7">
        <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">Affiliate Disclosure</span>
      </nav>

      <header className="pb-8 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">Legal · Affiliate disclosure</p>
        <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-3">
          Affiliate disclosure
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soil tabular">Last updated · July 2026</p>
      </header>

      <div className="almanac-prose font-serif text-[17px] leading-[1.75] text-ink">
        <section>
          <h2>Amazon Associates disclosure</h2>
          <p><strong>{AMAZON_ASSOCIATE_DISCLOSURE}</strong></p>
          <p>
            Some GardenCalcs pages may contain clearly marked links to products on Amazon. If you follow one of those links and make a qualifying purchase, GardenCalcs may receive a commission. Your purchase price is not increased by that commission.
          </p>
        </section>

        <section>
          <h2>How recommendations are presented</h2>
          <p>
            Affiliate recommendations are optional and appear only where a tool may help complete the gardening task. GardenCalcs uses original explanatory text and text links; it does not reproduce Amazon prices, stock claims, customer ratings, or product images.
          </p>
          <p>
            Amazon does not sponsor or endorse GardenCalcs. Product availability, seller terms, and destination-site privacy practices are controlled by Amazon and the relevant seller.
          </p>
        </section>

        <section>
          <h2>Editorial independence</h2>
          <p>
            Calculator methods and gardening guidance remain based on cited extension sources. Affiliate relationships do not change calculation results or source selection.
          </p>
        </section>

        <section>
          <h2>Questions</h2>
          <p>
            For questions about this disclosure, use the <Link href="/contact">contact page</Link>. For information about calculator inputs and external links, read the <Link href="/privacy">privacy policy</Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
