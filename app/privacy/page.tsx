import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Garden Tools Hub",
  description:
    "Garden Tools Hub privacy policy — we do not collect personal information, use tracking cookies, or send your data to any server.",
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
          Last updated · March 2026
        </p>
      </header>

      <div className="almanac-prose font-serif text-[17px] leading-[1.75] text-ink">
        <section>
          <h2>No personal data collected</h2>
          <p>
            Garden Tools Hub does not require an account or login. We do not collect, store, or process any personally identifiable information (PII) such as your name, email address, or location.
          </p>
        </section>

        <section>
          <h2>No tracking cookies</h2>
          <p>
            This site does not use cookies to track your browsing behaviour. If analytics are added in the future, this policy will be updated before any tracking begins.
          </p>
        </section>

        <section>
          <h2>Client-side calculations</h2>
          <p>
            All calculator inputs and results are processed entirely within your browser. No form data, calculation inputs, or results are transmitted to Garden Tools Hub servers or any third party.
          </p>
        </section>

        <section>
          <h2>Embedded tools</h2>
          <p>
            Garden Tools Hub tools may be embedded on third-party websites via an iframe widget. When a tool is embedded, Garden Tools Hub does not track the embedding site, the referring URL, or the end user&apos;s identity.
          </p>
        </section>

        <section>
          <h2>External links</h2>
          <p>
            This site may contain links to external websites (e.g., university extension resources). Garden Tools Hub is not responsible for the privacy practices of those sites.
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
