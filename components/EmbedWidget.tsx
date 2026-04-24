import { tools } from "@/config/tools";
import EmbedCodeOptions from "./EmbedCodeOptions";

export default function EmbedWidget({ slug }: { slug: string }) {
  const tool = tools.find((item) => item.slug === slug);
  const label = tool?.name ?? slug;

  return (
    <section className="mt-10 p-5 bg-cream border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracotta mb-2">
        Embed this calculator
      </p>
      <p className="font-serif text-[15px] leading-[1.55] text-soil mb-4">
        Free, no signup, iframe-safe, and source-cited. Keep the powered-by link with the embed code so readers can inspect the original calculator and sources.
      </p>
      <EmbedCodeOptions slug={slug} label={label} compact />
    </section>
  );
}
