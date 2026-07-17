import Link from "next/link";
import { type Tool, type ToolQuickAnswer } from "@/config/tools";
import FAQSection from "./FAQSection";
import RelatedTools from "./RelatedTools";
import EmbedWidget from "./EmbedWidget";

type LinkedQuickAnswer = ToolQuickAnswer & {
  rowHrefs?: Array<string | undefined>;
};

type LayoutTool = Tool & {
  quickAnswer?: LinkedQuickAnswer;
  deferredQuickAnswer?: LinkedQuickAnswer;
};

interface ToolLayoutProps {
  tool: LayoutTool;
  children: React.ReactNode;
}

function QuickAnswerCard({
  answer,
  placement,
}: {
  answer: LinkedQuickAnswer;
  placement: "top" | "after-tool";
}) {
  const isFullChart = placement === "after-tool";
  const headingId = isFullChart ? "full-spacing-chart-heading" : undefined;
  const hasThreeColumns = answer.columns.length > 2;

  return (
    <section
      aria-labelledby={headingId}
      className={`bg-paper border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] border-l-[4px] border-l-terracotta rounded-md px-6 py-5 ${
        isFullChart ? "mb-12" : "mb-10"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-terracotta mb-3">
        {isFullChart ? "Spacing reference" : "Quick Answer"}
      </p>
      {isFullChart && (
        <h2 id={headingId} className="font-serif font-semibold text-[24px] leading-[1.25] text-ink mb-3">
          Plant &amp; row spacing chart
        </h2>
      )}
      <p className="font-serif text-[15px] leading-[1.7] text-ink mb-4">
        {answer.definition}
      </p>
      <div className="overflow-x-auto">
        <table className={`w-full border-collapse tabular ${hasThreeColumns ? "min-w-[440px]" : ""}`}>
          <thead className={isFullChart ? "" : "sr-only"}>
            <tr className={isFullChart ? "border-b border-[color-mix(in_oklch,var(--soil)_45%,transparent)]" : ""}>
              {answer.columns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={isFullChart
                    ? `pb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-soil ${index === 0 ? "text-left" : "text-right pl-4"}`
                    : undefined}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {answer.rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`} className="border-b border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)] last:border-0">
                {row.map((cell, cellIndex) => {
                  const href = cellIndex === 0 ? answer.rowHrefs?.[rowIndex] : undefined;
                  return (
                    <td
                      key={`${cell}-${cellIndex}`}
                      className={
                        cellIndex === 0
                          ? `py-2.5 pr-5 font-serif italic text-soil text-[15px] ${hasThreeColumns ? "w-[42%]" : "w-[58%]"}`
                          : "py-2.5 pl-4 font-sans font-medium text-ink text-[15px] text-right"
                      }
                    >
                      {href ? (
                        <Link href={href} className="text-moss-deep underline decoration-dotted underline-offset-2 hover:text-moss focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss rounded-sm">
                          {cell}
                        </Link>
                      ) : cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-serif text-[14px] leading-[1.7] text-ink">
        {answer.recommendation}
      </p>
      {answer.sourceHtml && (
        <p
          className="mt-3 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)] font-mono text-[10px] uppercase tracking-[0.12em] text-soil [&_a]:text-moss-deep [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: answer.sourceHtml }}
        />
      )}
    </section>
  );
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
        <QuickAnswerCard answer={tool.quickAnswer} placement="top" />
      )}

      {/* Tool interactive area */}
      <div className="mb-14">{children}</div>

      {tool.deferredQuickAnswer && (
        <QuickAnswerCard answer={tool.deferredQuickAnswer} placement="after-tool" />
      )}

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
