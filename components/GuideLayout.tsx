import Link from "next/link";

interface GuideLayoutProps {
  title: string;
  dek: string;
  topic: string;
  readTime: string;
  children: React.ReactNode;
}

/**
 * Editorial Almanac long-form article shell (per P10).
 * - Centered prose column at max-width 680px
 * - Breadcrumb in mono micro, terracotta eyebrow, 46px serif H1, italic dek
 * - Prose styles applied via `.almanac-prose` wrapper for h2/h3/p/ul/ol/table/blockquote
 */
export default function GuideLayout({ title, dek, topic, readTime, children }: GuideLayoutProps) {
  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-7 pb-24">
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7"
      >
        <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <Link href="/guides" className="hover:text-moss-deep transition-colors duration-fast">Guides</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">{topic}</span>
      </nav>

      <header className="pb-8 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
          Guide · The Almanac
        </p>
        <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-4">
          {title}
        </h1>
        <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil max-w-[640px] mb-5">
          {dek}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-soil tabular">
          <span>{topic}</span>
          <span className="opacity-50">·</span>
          <span>{readTime} read</span>
          <span className="opacity-50">·</span>
          <span>Extension-cited</span>
        </div>
      </header>

      <div className="almanac-prose font-serif text-[17px] leading-[1.75] text-ink">
        {children}
      </div>
    </article>
  );
}
