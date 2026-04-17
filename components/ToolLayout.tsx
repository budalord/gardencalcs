import Link from "next/link";
import { type Tool } from "@/config/tools";
import FAQSection from "./FAQSection";
import RelatedTools from "./RelatedTools";
import EmbedWidget from "./EmbedWidget";

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode; // 工具交互区（agent 实现）
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/tools" className="hover:text-blue-600">Tools</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{tool.name}</span>
      </nav>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{tool.name}</h1>
      <p className="text-gray-600 mb-6">{tool.tagline}</p>

      {tool.quickAnswer && (
        <section className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-800">Quick Answer</p>
            <p className="mt-2 text-sm leading-7 text-gray-700">{tool.quickAnswer.definition}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-green-200 bg-white text-sm">
              <thead>
                <tr>
                  {tool.quickAnswer.columns.map((column) => (
                    <th key={column} className="border-b border-green-200 px-3 py-2 text-left font-semibold text-gray-900">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tool.quickAnswer.rows.map((row, index) => (
                  <tr key={`${row[0]}-${index}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${cell}-${cellIndex}`} className="border-t border-green-100 px-3 py-2 align-top text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-7 text-gray-700">{tool.quickAnswer.recommendation}</p>
          {tool.quickAnswer.sourceHtml && (
            <p
              className="mt-3 text-xs leading-6 text-gray-500 [&_a]:text-green-700 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: tool.quickAnswer.sourceHtml }}
            />
          )}
        </section>
      )}

      {/* Tool interactive area */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        {children}
      </div>

      {/* How to use */}
      {tool.howToSteps.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
            {tool.howToSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      {tool.contentSections && tool.contentSections.length > 0 && (
        <section className="mb-8 space-y-6">
          {tool.contentSections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{section.heading}</h2>
              <div className="space-y-3 text-sm leading-7 text-gray-600">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {tool.workedExamples && tool.workedExamples.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Worked Examples</h2>
          <div className="space-y-3">
            {tool.workedExamples.map((example) => (
              <div key={example.title} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">{example.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{example.summary}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {tool.faqs.length > 0 && <FAQSection faqs={tool.faqs} />}

      {tool.internalLinks && tool.internalLinks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Helpful next steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.internalLinks.map((item) => (
              <Link key={`${tool.slug}-${item.href}-${item.anchor}`} href={item.href} className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-green-500 hover:shadow-sm transition-all">
                <p className="text-sm font-semibold text-gray-900">{item.anchor}</p>
                <p className="mt-1 text-sm text-gray-600 leading-6">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Embed widget */}
      <EmbedWidget slug={tool.slug} />

      {/* Related tools */}
      <RelatedTools currentSlug={tool.slug} category={tool.category} />
    </div>
  );
}
