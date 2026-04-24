"use client";

import { useMemo, useState } from "react";
import { siteConfig } from "@/config/site";

type EmbedVariant = {
  id: string;
  label: string;
  description: string;
  width: string;
  height: string;
};

const variants: EmbedVariant[] = [
  {
    id: "full",
    label: "Full width",
    description: "Best for article bodies and resource pages.",
    width: "100%",
    height: "620",
  },
  {
    id: "compact",
    label: "Compact",
    description: "Best below a paragraph or short guide section.",
    width: "100%",
    height: "420",
  },
  {
    id: "sidebar",
    label: "Sidebar",
    description: "Best for a fixed sidebar or narrow page column.",
    width: "360",
    height: "560",
  },
];

function buildEmbedCode(slug: string, label: string, variant: EmbedVariant): string {
  const toolUrl = `${siteConfig.domain}/tools/${slug}`;
  return `<iframe src="${toolUrl}" width="${variant.width}" height="${variant.height}" frameborder="0" title="${label}" loading="lazy"></iframe>
<p><a href="${toolUrl}">Powered by gardencalcs.com</a></p>`;
}

export default function EmbedCodeOptions({
  slug,
  label,
  compact = false,
}: {
  slug: string;
  label: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const codes = useMemo(
    () => variants.map((variant) => ({ variant, code: buildEmbedCode(slug, label, variant) })),
    [slug, label],
  );

  const copy = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={compact ? "space-y-3" : "grid grid-cols-1 lg:grid-cols-3 gap-4"}>
      {codes.map(({ variant, code }) => (
        <div
          key={variant.id}
          className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md p-4"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="font-serif font-semibold text-[16px] text-ink">{variant.label}</p>
              <p className="font-serif italic text-[13px] leading-[1.4] text-soil mt-0.5">
                {variant.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => copy(variant.id, code)}
              className="shrink-0 px-3 py-2 bg-moss-deep hover:bg-moss text-cream rounded-md font-mono text-[10.5px] uppercase tracking-[0.1em] transition-colors duration-fast"
            >
              {copied === variant.id ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="max-h-[160px] overflow-auto bg-cream border border-[color-mix(in_oklch,var(--soil)_20%,transparent)] rounded-sm p-3 text-[11px] leading-[1.5] text-soil whitespace-pre-wrap">
            <code>{code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}
