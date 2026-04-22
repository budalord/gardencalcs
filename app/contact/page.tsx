import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us | Garden Tools Hub",
  description: "Get in touch with Garden Tools Hub — questions, suggestions, or partnership inquiries welcome.",
  alternates: { canonical: `${siteConfig.domain}/contact` },
};

export default function ContactPage() {
  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-7 pb-24">
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7"
      >
        <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">Contact</span>
      </nav>

      <header className="pb-8 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
          Letters to the editor
        </p>
        <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-3">
          Get in touch
        </h1>
        <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil">
          Spotted an error, got a question, or have a tool you&apos;d like us to build? We&apos;d love to hear from you.
        </p>
      </header>

      <dl className="grid grid-cols-1 gap-5">
        <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] border-l-[4px] border-l-moss rounded-md px-6 py-5">
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-moss-deep mb-2">
            Email
          </dt>
          <dd className="m-0">
            <a
              href="mailto:contact@gardencalcs.com"
              className="font-serif font-semibold text-[20px] text-ink hover:text-moss-deep transition-colors duration-fast"
            >
              contact@gardencalcs.com
            </a>
            <p className="font-serif italic text-[14px] text-soil mt-2">
              We typically respond within 2–3 business days.
            </p>
          </dd>
        </div>

        <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] border-l-[4px] border-l-terracotta rounded-md px-6 py-5">
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-terracotta mb-2">
            Source code · GitHub
          </dt>
          <dd className="m-0">
            <a
              href="https://github.com/budalord/gardencalcs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[15px] tabular text-ink hover:text-moss-deep transition-colors duration-fast border-b border-[color-mix(in_oklch,var(--moss)_40%,transparent)] hover:border-moss"
            >
              github.com/budalord/gardencalcs
            </a>
            <p className="font-serif italic text-[14px] text-soil mt-2">
              Found a bug? Open an issue or submit a pull request.
            </p>
          </dd>
        </div>
      </dl>

      <p className="mt-10 pt-6 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)] font-mono text-[11px] uppercase tracking-[0.12em] text-soil">
        Editorial office · {siteConfig.name}
      </p>
    </article>
  );
}
