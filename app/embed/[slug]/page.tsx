import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { resolveTool } from "@/config/phase1Overrides";
import { siteConfig } from "@/config/site";

import FertilizerCalculator from "@/components/FertilizerCalculator";
import SeedSpacingCalculator from "@/components/SeedSpacingCalculator";
import SoilPHCalculator from "@/components/SoilPHCalculator";
import WateringScheduleCalculator from "@/components/WateringScheduleCalculator";
import CompostCalculator from "@/components/CompostCalculator";

// Bare, chromeless calculator surface for <iframe> embeds on third-party sites.
// Renders ONLY the interactive widget + a slim powered-by bar — no site header,
// footer, breadcrumb, or article copy. The global <Header>/<Footer> come from the
// root layout, so we hide them with server-rendered CSS (present at first paint =
// no flash) rather than restructuring every route into a layout group.

const embedComponents: Record<string, React.ComponentType> = {
  "fertilizer-calculator": FertilizerCalculator,
  "seed-spacing-calculator": SeedSpacingCalculator,
  "soil-ph-calculator": SoilPHCalculator,
  "watering-schedule-calculator": WateringScheduleCalculator,
  "compost-calculator": CompostCalculator,
};

export function generateStaticParams() {
  return Object.keys(embedComponents).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const baseTool = tools.find((t) => t.slug === params.slug);
  const tool = baseTool ? resolveTool(baseTool) : undefined;
  const name = tool?.name ?? "Garden Calculator";
  return {
    title: `${name} — embeddable widget`,
    // Bare embed surface must not compete with the real /tools/ page in the index.
    robots: { index: false, follow: false },
    alternates: { canonical: `${siteConfig.domain}/tools/${params.slug}` },
  };
}

export default function EmbedToolPage({ params }: { params: { slug: string } }) {
  const baseTool = tools.find((t) => t.slug === params.slug);
  const tool = baseTool ? resolveTool(baseTool) : undefined;
  const Calculator = embedComponents[params.slug];
  if (!tool || !Calculator) notFound();

  const toolUrl = `${siteConfig.domain}/tools/${tool.slug}`;

  return (
    <>
      {/* Strip the root-layout chrome for this route only. Server-rendered so the
          header/footer never paint inside the iframe. */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "body>header,body>footer{display:none!important}" +
            "body{min-height:0!important;background:var(--cream)}" +
            "main{flex:none!important}",
        }}
      />
      <div className="px-4 py-5 sm:px-6 sm:py-6 max-w-[720px] mx-auto">
        <Calculator />
        <p className="mt-4 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_28%,transparent)] font-mono text-[11px] tracking-[0.04em] text-soil">
          <a
            href={toolUrl}
            target="_blank"
            rel="noopener"
            className="text-moss-deep hover:text-moss underline underline-offset-2"
          >
            {tool.name} · Powered by {siteConfig.name}
          </a>
        </p>
      </div>
    </>
  );
}
