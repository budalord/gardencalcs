"use client";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getToolsByCategory } from "@/config/tools";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const categories = Object.keys(getToolsByCategory());

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-blue-600 hover:text-blue-700">
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/tools" className="text-gray-600 hover:text-blue-600">All Tools</Link>
          {categories.slice(0, 4).map((cat) => (
            <Link key={cat} href={`/tools?category=${encodeURIComponent(cat)}`}
              className="text-gray-600 hover:text-blue-600">{cat}</Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
          <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
          <span className="block w-5 h-0.5 bg-gray-600" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3 text-sm">
          <Link href="/tools" className="text-gray-700" onClick={() => setOpen(false)}>All Tools</Link>
          {categories.map((cat) => (
            <Link key={cat} href={`/tools?category=${encodeURIComponent(cat)}`}
              className="text-gray-700" onClick={() => setOpen(false)}>{cat}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
