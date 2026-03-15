import Link from "next/link";
import { tools, getToolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const byCategory = getToolsByCategory();
  const featured = tools.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{siteConfig.name}</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">{siteConfig.description}</p>
        <Link href="/tools"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Browse All Tools →
        </Link>
      </section>

      {/* Featured tools */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Popular Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}
                className="block p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
                <p className="font-semibold text-gray-900">{tool.name}</p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tool.tagline}</p>
                <span className="inline-block mt-3 text-xs text-blue-600 font-medium">Use tool →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {Object.keys(byCategory).length > 1 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(byCategory).map(([cat, catTools]) => (
              <Link key={cat} href={`/tools?category=${encodeURIComponent(cat)}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors">
                {cat} <span className="text-gray-400">({catTools.length})</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
