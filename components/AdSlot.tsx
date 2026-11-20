"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A single Google AdSense unit.
 *
 * Renders nothing unless both the publisher ID (NEXT_PUBLIC_ADSENSE_CLIENT)
 * and this unit's slot ID are set at build time, so a build without those
 * variables produces exactly the same HTML as before ads existed.
 *
 * Units are responsive (data-ad-format="auto"). The container reserves a
 * fixed min-height for its format, so an unfilled
 * or late-filling unit does not shift the layout. The AdSense script is only
 * requested once the unit comes within 300px of the viewport.
 */

export type AdFormat = "banner" | "rectangle" | "large-rectangle";

const MIN_HEIGHT: Record<AdFormat, number> = {
  banner: 90,
  rectangle: 250,
  "large-rectangle": 280,
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({ slot, format }: { slot: string | undefined; format: AdFormat }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !slot || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [client, slot]);

  useEffect(() => {
    if (!inView || pushed.current) return;
    pushed.current = true;
    // Load the AdSense library once per page, unless the site-wide head tag already did.
    if (client && !document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // A failed fill leaves the reserved space empty; nothing else depends on it.
    }
  }, [inView, client]);

  if (!client || !slot) return null;

  const height = MIN_HEIGHT[format];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="w-full max-w-[720px] mx-auto px-6 md:px-8 mt-12"
      style={{ minHeight: height + 20 }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soil opacity-70 mb-1.5 text-center">
        Advertisement
      </p>
      <div style={{ minHeight: height }}>
        {inView && (
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%" }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
}
