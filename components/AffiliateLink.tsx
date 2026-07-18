import type { ReactNode } from "react";

export const AMAZON_ASSOCIATE_DISCLOSURE =
  "As an Amazon Associate I earn from qualifying purchases.";

export interface AffiliateLinkItem {
  href: string;
  label: string;
  description: ReactNode;
}

interface AffiliateLinkProps {
  title?: string;
  intro?: ReactNode;
  items: AffiliateLinkItem[];
}

/**
 * A complete, text-only affiliate recommendation module.
 * The disclosure and link relationship cannot be omitted by callers.
 */
export default function AffiliateLink({
  title = "Optional tools that may help",
  intro,
  items,
}: AffiliateLinkProps) {
  return (
    <aside
      aria-label={title}
      className="mt-6 rounded-md border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] bg-cream px-5 py-5"
    >
      <h3 className="font-serif font-semibold text-[18px] text-moss-deep">
        {title}
      </h3>
      <p className="mt-1 font-mono text-[10px] leading-[1.55] text-soil">
        {AMAZON_ASSOCIATE_DISCLOSURE}
      </p>
      {intro && <p className="mt-3 max-w-[600px] font-serif text-[13px] leading-[1.6] text-soil">{intro}</p>}
      <ul className="mt-4 space-y-3">
        {items.slice(0, 3).map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="sponsored nofollow"
              className="inline-flex items-center gap-1 whitespace-nowrap rounded-sm font-serif font-semibold text-[15px] text-ink underline decoration-[color-mix(in_oklch,var(--moss)_45%,transparent)] underline-offset-4 transition-colors duration-fast hover:text-moss-deep active:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              {item.label} <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-1 font-serif text-[13px] leading-[1.55] text-soil">{item.description}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
