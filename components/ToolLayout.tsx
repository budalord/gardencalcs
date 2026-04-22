import Link from "next/link";
import { type Tool } from "@/config/tools";
import FAQSection from "./FAQSection";
import RelatedTools from "./RelatedTools";
import EmbedWidget from "./EmbedWidget";

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

/**
 * Editorial Almanac tool-page shell (per P03).
 * Centered article column at max-width 720px; prose blocks clamp to 640px.
 * Breadcrumb in mono micro, serif H1 with terracotta eyebrow, italic tagline,
 * dashed-soil divider between sections, paper-bg widget card.
 */
export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-7 pb-24">
      {/* Breadcrumb — mono micro, uppercase */}
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7"
      >
        <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <Link href="/tools" className="hover:text-moss-deep transition-colors duration-fast">Tools</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">{tool.name}</span>
      </nav>

      {/* Page head */}
      <header className="pb-7 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
          Calculator · {tool.category}
        </p>
        <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-3">
          {tool.name}
        </h1>
        <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil max-w-[640px]">
          {tool.tagline}
        </p>
      </header>

      {/* Quick Answer callout */}
      {tool.quickAnswer && (
        <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] border-l-[4px] border-l-terracotta rounded-md px-6 py-5 mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-terracotta mb-3">
            Quick Answer
          </p>
          <p className="font-serif text-[15px] leading-[1.7] text-ink mb-4">
            {tool.quickAnswer.definition}
          </p>
          <table className="w-full border-collapse tabular">
            <thead className="sr-only">
              <tr>{tool.quickAnswer.columns.map((c) => <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {tool.quickAnswer.rows.map((row, index) => (
                <tr key={`${row[0]}-${index}`} className="border-b border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)] last:border-0">
                  {row.map((cell, ci) => (
                    <td
                      key={`${cell}-${ci}`}
                      className={
                        ci === 0
                          ? "py-2.5 pr-5 font-serif italic text-soil text-[15px] w-[58%]"
                          : "py-2.5 font-sans font-medium text-ink text-[15px] text-right"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 font-serif text-[14px] leading-[1.7] text-ink">
            {tool.quickAnswer.recommendation}
          </p>
          {tool.quickAnswer.sourceHtml && (
            <p
              className="mt-3 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)] font-mono text-[10px] uppercase tracking-[0.12em] text-soil [&_a]:text-moss-deep [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: tool.quickAnswer.sourceHtml }}
            />
          )}
        </section>
      )}

      {/* Tool interactive area */}
      <div className="mb-14">{children}</div>

      {/* How to use */}
      {tool.howToSteps.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-5 mb-6">
            <span className="flex-1 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] max-w-[80px]" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta">Method</p>
          </div>
          <h2 className="font-serif font-semibold text-[24px] tracking-tight text-ink mb-5">How to use this calculator</h2>
          <ol className="space-y-3 font-serif text-[15px] leading-[1.65] text-ink max-w-[640px]">
            {tool.howToSteps.map((step, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="font-mono text-[13px] text-terracotta tabular mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Content sections */}
      {tool.contentSections && tool.contentSections.length > 0 && (
        <section className="mb-12 max-w-[640px] space-y-8">
          {tool.contentSections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-serif font-semibold text-[22px] leading-[1.3] tracking-tight text-ink mb-3">
                {section.heading}
              </h2>
              <div className="space-y-4 font-serif text-[16px] leading-[1.7] text-ink">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Worked Examples */}
      {tool.workedExamples && tool.workedExamples.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-5 mb-6">
            <span className="flex-1 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] max-w-[80px]" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta">Worked examples</p>
          </div>
          <div className="space-y-4">
            {tool.workedExamples.map((example) => (
              <blockquote
                key={example.title}
                className="border-l-2 border-moss-deep pl-5 py-1"
              >
                <p className="font-serif font-semibold text-[17px] text-moss-deep mb-1.5">
                  {example.title}
                </p>
                <p className="font-serif italic text-[15px] leading-[1.65] text-soil">
                  {example.summary}
                </p>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {tool.faqs.length > 0 && <FAQSection faqs={tool.faqs} />}

      {/* Internal links */}
      {tool.internalLinks && tool.internalLinks.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[20px] tracking-tight text-moss-deep mb-5">
            Helpful next steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tool.internalLinks.map((item) => (
              <Link
                key={`${tool.slug}-${item.href}-${item.anchor}`}
                href={item.href}
                className="group block border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-5 transition-colors duration-fast"
              >
                <p className="font-serif font-semibold text-[16px] text-ink group-hover:text-moss-deep transition-colors duration-fast">
                  {item.anchor}
                </p>
                <p className="mt-1 font-serif text-[14px] leading-[1.6] text-soil">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <EmbedWidget slug={tool.slug} />
      <RelatedTools currentSlug={tool.slug} category={tool.category} />
    </article>
  );
}
