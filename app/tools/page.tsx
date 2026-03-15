import type { Metadata } from "next";
import Link from "next/link";
import { tools, getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "All Tools",
  description: `Browse all free online tools on ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.domain}/tools` },
};

export default function ToolsPage() {
  const byCategory = getToolsByCategory();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">All Tools</h1>
      <p className="text-gray-500 mb-8">{tools.length} free tools, no sign-up required.</p>

      {Object.entries(byCategory).map(([category, categoryTools]) => (
        <section key={category} className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTools.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}
                className="block p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
                <p className="font-semibold text-gray-900">{tool.name}</p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tool.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
