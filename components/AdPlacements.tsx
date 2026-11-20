"use client";

import { usePathname } from "next/navigation";
import AdSlot from "@/components/AdSlot";

/**
 * Site-wide ad positions, rendered by the root layout between <main> and the footer:
 *   1. after the page content (on calculator pages this is after the result,
 *      FAQ and source citations, which all live inside <main>);
 *   2. a second unit below it, only on pages with long content.
 *
 * No ads on the chromeless /embed widgets that run inside third-party iframes.
 * Each unit renders nothing until its env vars are set (see AdSlot).
 */

// Short pages get the first unit only.
const SHORT_PAGES = new Set(["/about", "/contact", "/privacy", "/affiliate-disclosure", "/tools", "/guides"]);

export default function AdPlacements() {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/embed")) return null;

  const isShort = SHORT_PAGES.has(pathname.replace(/\/$/, "") || "/");

  return (
    <>
      <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTER_CONTENT} format="large-rectangle" />
      {!isShort && <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BEFORE_FOOTER} format="banner" />}
    </>
  );
}
