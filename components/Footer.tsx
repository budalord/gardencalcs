import Link from "next/link";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="font-bold text-gray-900 mb-2">{siteConfig.name}</p>
            <p className="text-sm text-gray-500">{siteConfig.description}</p>
          </div>

          {/* Tools */}
          <div>
            <p className="font-semibold text-gray-700 mb-3 text-sm">Tools</p>
            <ul className="space-y-2">
              {tools.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="text-sm text-gray-500 hover:text-blue-600">
                    {t.name}
                  </Link>
                </li>
              ))}
              {tools.length > 6 && (
                <li><Link href="/tools" className="text-sm text-blue-600">View all →</Link></li>
              )}
            </ul>
          </div>

          {/* Related sites */}
          {siteConfig.relatedSites.length > 0 && (
            <div>
              <p className="font-semibold text-gray-700 mb-3 text-sm">Related Sites</p>
              <ul className="space-y-2">
                {siteConfig.relatedSites.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-blue-600">{s.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
