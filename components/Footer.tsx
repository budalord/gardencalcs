import Link from "next/link";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";

/**
 * Editorial Almanac site footer.
 * Sparse, serif-mark anchored, 4-column layout collapsing to stack on mobile.
 * Borders only; no shadows.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[color-mix(in_oklch,var(--soil)_25%,transparent)]">
      <div className="max-w-wide mx-auto px-7 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-serif font-semibold text-[18px] text-moss-deep tracking-tight">
              {siteConfig.name}
            </p>
            <p className="font-serif italic text-[13px] text-soil mt-1 mb-3">
              Garden math, answered.
            </p>
            <p className="text-[13px] text-soil max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-moss-deep mb-3">
              Tools
            </p>
            <ul className="space-y-2">
              {tools.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="text-[13px] text-ink hover:text-moss-deep transition-colors duration-fast"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
              {tools.length > 6 && (
                <li>
                  <Link href="/tools" className="text-[13px] text-moss-deep font-medium">
                    View all →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Reference + site */}
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-moss-deep mb-3">
              Reference
            </p>
            <ul className="space-y-2">
              <li><Link href="/guides" className="text-[13px] text-ink hover:text-moss-deep transition-colors duration-fast">Guides</Link></li>
              <li><Link href="/about" className="text-[13px] text-ink hover:text-moss-deep transition-colors duration-fast">About &amp; method</Link></li>
              <li><Link href="/contact" className="text-[13px] text-ink hover:text-moss-deep transition-colors duration-fast">Contact</Link></li>
              <li><Link href="/privacy" className="text-[13px] text-ink hover:text-moss-deep transition-colors duration-fast">Privacy</Link></li>
              <li><Link href="/affiliate-disclosure" className="text-[13px] text-ink hover:text-moss-deep transition-colors duration-fast">Affiliate Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_28%,transparent)] flex flex-col md:flex-row justify-between gap-3 text-[12px] text-soil">
          <p className="font-serif italic">
            © {year} {siteConfig.name} · Free, no sign-up, source-cited.
          </p>
          {siteConfig.relatedSites.length > 0 && (
            <p className="font-sans">
              Sister sites:{" "}
              {siteConfig.relatedSites.map((s, i) => (
                <span key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-moss-deep transition-colors duration-fast"
                  >
                    {s.name}
                  </a>
                  {i < siteConfig.relatedSites.length - 1 && " · "}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
