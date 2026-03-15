import Link from "next/link";
import { tools } from "@/config/tools";

interface RelatedToolsProps {
  currentSlug: string;
  category: string;
}

export default function RelatedTools({ currentSlug, category }: RelatedToolsProps) {
  const related = tools
    .filter((t) => t.slug !== currentSlug && t.category === category)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((t) => (
          <Link key={t.slug} href={`/tools/${t.slug}`}
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all">
            <p className="font-medium text-gray-900 text-sm">{t.name}</p>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{t.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
