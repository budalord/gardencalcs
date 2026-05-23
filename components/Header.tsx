"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Editorial Almanac site header.
 * Serif wordmark + italic tagline, moss-deep on cream, hairline border, sticky.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { href: "/tools", label: "Tools" },
    { href: "/guides", label: "Guides" },
    { href: "/about", label: "About" },
  ];

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">
      <div className="max-w-wide mx-auto px-7 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-2.5 leading-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            aria-hidden="true"
            width={28}
            height={34}
            className="block shrink-0"
          />
          <span className="block">
            <span className="block font-serif font-semibold text-[20px] text-moss-deep tracking-tight">
              {siteConfig.name}
            </span>
            <span className="block font-serif italic text-[11px] text-soil mt-0.5 tracking-wide">
              Garden math, answered.
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 font-sans text-sm font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isCurrent(item.href)
                  ? "text-moss-deep border-b border-moss pb-0.5"
                  : "text-ink hover:text-moss-deep transition-colors duration-fast"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="block w-5 h-[1.5px] bg-soil mb-1" />
          <span className="block w-5 h-[1.5px] bg-soil mb-1" />
          <span className="block w-5 h-[1.5px] bg-soil" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[color-mix(in_oklch,var(--soil)_22%,transparent)] bg-cream px-7 py-4 flex flex-col gap-3 text-sm font-sans">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={
                isCurrent(item.href) ? "text-moss-deep font-medium" : "text-ink"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
