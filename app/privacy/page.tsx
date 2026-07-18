import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "GardenCalcs privacy policy — calculator inputs stay in your browser, no account is required, and external links follow their destination site's privacy terms.",
  alternates: { canonical: `${siteConfig.domain}/privacy` },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-7 pb-24">
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7"
      >
        <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">Privacy</span>
      </nav>

      <header className="pb-8 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
          Legal · Privacy policy
        </p>
        <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-3">
          Privacy policy
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-soil tabular">
          Last updated · July 2026
        </p>
      </header>

      <div className="almanac-prose font-serif text-[17px] leading-[1.75] text-ink">
        <section>
          <h2>No personal data collected</h2>
          <p>
            GardenCalcs does not require an account or login. We do not collect, store, or process any personally identifiable information (PII) such as your name, email address, or location.
          </p>
        </section>

        <section>
          <h2>Cookies and hosting data</h2>
          <p>
            GardenCalcs does not currently set first-party advertising or analytics cookies. Our hosting provider may process standard request data, such as an IP address and browser details, to deliver and protect the site. If our analytics or cookie practices change, this policy will be updated.
          </p>
        </section>

        <section>
          <h2>Client-side calculations</h2>
          <p>
            Calculator inputs and results are processed within your browser. The calculators do not submit those values to GardenCalcs or to a third party.
          </p>
        </section>

        <section>
          <h2>Embedded tools</h2>
          <p>
            GardenCalcs tools may be embedded on third-party websites via an iframe widget. Calculator inputs still stay in the visitor&apos;s browser, but the embedding website may have its own analytics, cookies, and privacy practices.
          </p>
        </section>

        <section>
          <h2>External links</h2>
          <p>
            This site contains links to external websites, including university extension resources and, on clearly disclosed pages, Amazon. A destination site may receive standard referral information and apply its own cookies or tracking after you follow a link. GardenCalcs is not responsible for those sites&apos; privacy practices.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have questions about this privacy policy, please visit our <Link href="/contact">contact page</Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
