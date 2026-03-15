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

      {/* FAQ */}
      {tool.faqs.length > 0 && <FAQSection faqs={tool.faqs} />}

      {/* Embed widget */}
      <EmbedWidget slug={tool.slug} />

      {/* Related tools */}
      <RelatedTools currentSlug={tool.slug} category={tool.category} />
    </div>
  );
}
