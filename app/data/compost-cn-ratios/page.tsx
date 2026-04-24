import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.domain}/data/compost-cn-ratios`;

export const metadata: Metadata = {
  title: "Compost C:N Ratios by Material — Extension Reference Table",
  description:
    "Source-cited compost carbon-to-nitrogen ratios for common greens and browns: leaves, grass clippings, coffee grounds, food scraps, straw, sawdust, cardboard, manure, and more.",
  keywords: [
    "compost carbon nitrogen ratio table",
    "compost C:N ratios",
    "greens and browns compost chart",
    "compost materials carbon nitrogen",
    "extension compost ratio table",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Compost C:N Ratios by Material",
    description:
      "A source-cited reference table for greens, browns, and common compost materials, built for home compost planning and calculator references.",
    url: pageUrl,
    type: "article",
  },
};

type CompostType = "Green" | "Brown" | "Neutral";

type Row = {
  material: string;
  type: CompostType;
  ratio: string;
  moistureNote: string;
  bestUse: string;
  source: string;
};

const rows: Row[] = [
  { material: "Grass clippings", type: "Green", ratio: "9-25:1", moistureNote: "Wet and compacting", bestUse: "Mix thinly with dry leaves or straw", source: "Cornell-CWMI" },
  { material: "Vegetable scraps", type: "Green", ratio: "12-20:1", moistureNote: "Moist", bestUse: "Bury inside pile to reduce pests", source: "CSU-Compost" },
  { material: "Fruit scraps", type: "Green", ratio: "20-35:1", moistureNote: "Moist and sugary", bestUse: "Mix with browns, avoid exposed layers", source: "UMN-Home" },
  { material: "Coffee grounds", type: "Green", ratio: "20:1", moistureNote: "Moist and dense", bestUse: "Blend with leaves, not as a thick mat", source: "Cornell-CWMI" },
  { material: "Tea leaves", type: "Green", ratio: "25:1", moistureNote: "Moist", bestUse: "Small nitrogen boost in kitchen-scrap layer", source: "OSU-Ask" },
  { material: "Fresh garden weeds", type: "Green", ratio: "20-30:1", moistureNote: "Moist", bestUse: "Use before seed set; mix with browns", source: "UIUC-Trouble" },
  { material: "Fresh legume hay", type: "Green", ratio: "12-25:1", moistureNote: "Moist to semi-dry", bestUse: "Nitrogen-rich layer for slow piles", source: "Cornell-CWMI" },
  { material: "Fresh poultry manure", type: "Green", ratio: "6-15:1", moistureNote: "Wet and strong", bestUse: "Use sparingly; hot compost only", source: "Cornell-CWMI" },
  { material: "Fresh horse manure", type: "Green", ratio: "22-50:1", moistureNote: "Moist with bedding", bestUse: "Good activator if bedding is not excessive", source: "Cornell-CWMI" },
  { material: "Fresh cow manure", type: "Green", ratio: "18-25:1", moistureNote: "Wet", bestUse: "Blend well and compost before garden use", source: "Cornell-CWMI" },
  { material: "Alfalfa meal", type: "Green", ratio: "12-15:1", moistureNote: "Dry", bestUse: "Small activator dose for carbon-heavy piles", source: "Cornell-CWMI" },
  { material: "Blood meal", type: "Green", ratio: "3-5:1", moistureNote: "Dry", bestUse: "Very small activator dose only", source: "CSU-Compost" },
  { material: "Dry leaves", type: "Brown", ratio: "40-80:1", moistureNote: "Dry and fluffy", bestUse: "Main brown material for kitchen scraps", source: "Cornell-CWMI" },
  { material: "Fresh leaves", type: "Neutral", ratio: "30-45:1", moistureNote: "Moist", bestUse: "Good bulk material, shred if possible", source: "Cornell-CWMI" },
  { material: "Straw", type: "Brown", ratio: "48-150:1", moistureNote: "Dry and airy", bestUse: "Add structure and oxygen channels", source: "Cornell-CWMI" },
  { material: "Hay", type: "Brown", ratio: "15-32:1", moistureNote: "Variable", bestUse: "Use seed-free hay; mix evenly", source: "Cornell-CWMI" },
  { material: "Corn stalks", type: "Brown", ratio: "60-75:1", moistureNote: "Dry and coarse", bestUse: "Chop before adding", source: "Cornell-CWMI" },
  { material: "Wood chips", type: "Brown", ratio: "100-500:1", moistureNote: "Dry and slow", bestUse: "Use as structure, not main feedstock", source: "CSU-Compost" },
  { material: "Sawdust", type: "Brown", ratio: "200-750:1", moistureNote: "Dry and compacting", bestUse: "Use thinly; mix with wet greens", source: "Cornell-CWMI" },
  { material: "Wood shavings", type: "Brown", ratio: "100-400:1", moistureNote: "Dry", bestUse: "Useful for manure-heavy piles", source: "Cornell-CWMI" },
  { material: "Shredded newspaper", type: "Brown", ratio: "150-200:1", moistureNote: "Dry", bestUse: "Shred and wet before adding", source: "UMN-Home" },
  { material: "Corrugated cardboard", type: "Brown", ratio: "350-563:1", moistureNote: "Dry", bestUse: "Shred; pair with grass or food scraps", source: "Cornell-CWMI" },
  { material: "Paper towels", type: "Brown", ratio: "110-160:1", moistureNote: "Variable", bestUse: "Only if not oily or chemical-soaked", source: "UMN-Home" },
  { material: "Pine needles", type: "Brown", ratio: "60-110:1", moistureNote: "Dry and waxy", bestUse: "Use modestly; slow to break down", source: "OSU-Ask" },
  { material: "Bark mulch", type: "Brown", ratio: "100-130:1", moistureNote: "Dry and coarse", bestUse: "Slow bulking material, better as mulch", source: "CSU-Compost" },
  { material: "Peanut shells", type: "Brown", ratio: "35-60:1", moistureNote: "Dry", bestUse: "Crush or mix into active pile", source: "Cornell-CWMI" },
  { material: "Rice hulls", type: "Brown", ratio: "70-120:1", moistureNote: "Dry and airy", bestUse: "Adds structure to wet piles", source: "Cornell-CWMI" },
  { material: "Spent potting mix", type: "Neutral", ratio: "30-50:1", moistureNote: "Variable", bestUse: "Small amounts for bulk, not nutrition", source: "UIUC-Trouble" },
  { material: "Finished compost", type: "Neutral", ratio: "10-20:1", moistureNote: "Moist and stable", bestUse: "Use as inoculant or curing material", source: "UIUC-Questions" },
  { material: "Garden soil", type: "Neutral", ratio: "Not feedstock", moistureNote: "Variable", bestUse: "Small inoculant dose only; avoid heavy layers", source: "CSU-Compost" },
  { material: "Eggshells", type: "Neutral", ratio: "Not meaningful", moistureNote: "Dry", bestUse: "Mineral addition; crush before adding", source: "UMN-Home" },
  { material: "Wood ash", type: "Neutral", ratio: "Not feedstock", moistureNote: "Dry and alkaline", bestUse: "Avoid or use very sparingly", source: "OSU-Ask" },
];

const SOURCES: Record<string, { title: string; publisher: string; url: string }> = {
  "Cornell-CWMI": {
    title: "Appendix A: Carbon/Nitrogen Ratios of Common Organic Materials",
    publisher: "Cornell Waste Management Institute",
    url: "https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf",
  },
  "CSU-Compost": {
    title: "Making Compost",
    publisher: "Colorado State University Extension",
    url: "https://extension.colostate.edu/resource/making-compost/",
  },
  "UIUC-Trouble": {
    title: "Troubleshooting Composting Problems",
    publisher: "University of Illinois Extension",
    url: "https://extension.illinois.edu/composting/troubleshooting-composting-problems",
  },
  "UIUC-Questions": {
    title: "Questions About Composting",
    publisher: "University of Illinois Extension",
    url: "https://extension.illinois.edu/composting/questions-about-composting",
  },
  "UMN-Home": {
    title: "Composting in Home Gardens",
    publisher: "University of Minnesota Extension",
    url: "https://extension.umn.edu/managing-soil-and-nutrients/composting-home-gardens",
  },
  "OSU-Ask": {
    title: "Composting: Should I Turn, Cover, or Both?",
    publisher: "Oregon State University Extension",
    url: "https://extension.oregonstate.edu/ask-extension/featured/composting-should-i-turn-cover-or-both",
  },
};

const csv = [
  ["Material", "Type", "Typical C:N ratio", "Moisture note", "Best use", "Source"],
  ...rows.map((row) => [row.material, row.type, row.ratio, row.moistureNote, row.bestUse, SOURCES[row.source].url]),
]
  .map((line) => line.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
  .join("\n");

const datasetJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Compost Carbon-to-Nitrogen Ratios by Material",
  description:
    "Carbon-to-nitrogen ratio reference table for common compost greens, browns, and neutral materials used in home compost piles.",
  url: pageUrl,
  creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.domain },
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "Material" },
    { "@type": "PropertyValue", name: "Compost material type" },
    { "@type": "PropertyValue", name: "Typical carbon-to-nitrogen ratio", unitText: "C:N" },
  ],
  citation: Object.values(SOURCES).map((source) => ({
    "@type": "CreativeWork",
    name: source.title,
    publisher: { "@type": "Organization", name: source.publisher },
    url: source.url,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
    { "@type": "ListItem", position: 2, name: "Data", item: `${siteConfig.domain}/data/compost-cn-ratios` },
    { "@type": "ListItem", position: 3, name: "Compost C:N Ratios", item: pageUrl },
  ],
};

export default function CompostCnRatiosPage() {
  const typeColor: Record<CompostType, string> = {
    Green: "color-mix(in oklch, var(--leaf) 60%, transparent)",
    Brown: "color-mix(in oklch, var(--soil) 55%, transparent)",
    Neutral: "color-mix(in oklch, var(--moss) 40%, transparent)",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="max-w-[980px] mx-auto px-6 md:px-8 pt-7 pb-24">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7"
        >
          <Link href="/" className="hover:text-moss-deep">Home</Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-ink">Data</span>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-ink">Compost C:N Ratios</span>
        </nav>

        <header className="pb-8 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
            Data · Source-cited · {rows.length} materials
          </p>
          <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-4">
            Compost C:N Ratios by Material
          </h1>
          <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil max-w-[680px] mb-5">
            A reference table for common compost greens, browns, and neutral materials. Use it to understand why grass clippings heat a pile quickly, why sawdust slows one down, and how to balance a home compost mix before it smells or stalls.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-soil">
            <span>Target pile range: 25:1-30:1</span>
            <span className="opacity-50">·</span>
            <span>6 extension sources</span>
            <span className="opacity-50">·</span>
            <span>CSV-ready table</span>
          </div>
        </header>

        <section className="mb-10 bg-paper border border-[color-mix(in_oklch,var(--moss)_25%,transparent)] border-l-[4px] border-l-terracotta rounded-md p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep mb-2">Method</p>
          <ul className="font-serif text-[15.5px] leading-[1.6] text-ink list-disc pl-5 space-y-1.5">
            <li>Ratios are typical ranges, not lab guarantees. Moisture, age, bedding, and particle size can shift a material substantially.</li>
            <li>Greens are nitrogen-rich inputs that usually heat or activate a pile. Browns are carbon-rich inputs that add structure and reduce odor.</li>
            <li>The practical starting target for an active home pile is around 25:1 to 30:1. Use the table as a planning reference, then adjust by smell, moisture, and pile temperature.</li>
          </ul>
        </section>

        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
            <h2 className="font-serif font-semibold text-[28px] md:text-[32px] text-ink">
              Material C:N ratio table
            </h2>
            <a
              href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
              download="gardencalcs-compost-cn-ratios.csv"
              className="inline-flex justify-center bg-moss-deep hover:bg-moss text-cream font-mono text-[11px] uppercase tracking-[0.12em] px-4 py-3 rounded-md transition-colors duration-fast"
            >
              Download CSV
            </a>
          </div>

          <div className="overflow-x-auto border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] rounded-md">
            <table className="w-full text-[13.5px]">
              <thead className="bg-paper text-soil font-mono text-[10.5px] uppercase tracking-[0.1em]">
                <tr>
                  <th className="text-left px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">Material</th>
                  <th className="text-left px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">Type</th>
                  <th className="text-left px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">Typical C:N ratio</th>
                  <th className="text-left px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">Moisture note</th>
                  <th className="text-left px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">Best use</th>
                  <th className="text-left px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">Source</th>
                </tr>
              </thead>
              <tbody className="bg-cream">
                {rows.map((row, index) => (
                  <tr key={row.material} className={index % 2 === 0 ? "" : "bg-paper/50"}>
                    <td className="px-3 py-2.5 font-serif font-medium text-ink border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">{row.material}</td>
                    <td className="px-3 py-2.5 border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">
                      <span className="inline-block px-2 py-0.5 rounded-sm font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink" style={{ backgroundColor: typeColor[row.type] }}>
                        {row.type}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[12px] text-ink border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">{row.ratio}</td>
                    <td className="px-3 py-2.5 font-serif text-[13px] text-soil border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">{row.moistureNote}</td>
                    <td className="px-3 py-2.5 font-serif text-[13px] text-ink border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">{row.bestUse}</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-soil border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">
                      <a href={SOURCES[row.source].url} target="_blank" rel="noopener nofollow" className="hover:text-moss-deep underline decoration-dotted underline-offset-2">
                        {row.source}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md p-5">
            <h2 className="font-serif font-semibold text-[24px] text-ink mb-3">How to cite this table</h2>
            <p className="font-serif text-[15px] leading-[1.65] text-soil mb-4">
              Use the canonical URL so readers and AI systems can inspect the current source list and any future corrections.
            </p>
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep">APA</p>
              <p className="font-serif text-[14px] leading-[1.55] text-ink">
                gardencalcs.com. (2026). <em>Compost C:N ratios by material</em>. Retrieved from {pageUrl}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep">Chicago</p>
              <p className="font-serif text-[14px] leading-[1.55] text-ink">
                gardencalcs.com. "Compost C:N Ratios by Material." Accessed 2026. {pageUrl}.
              </p>
            </div>
          </div>

          <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md p-5">
            <h2 className="font-serif font-semibold text-[24px] text-ink mb-3">Use it with the calculator</h2>
            <p className="font-serif text-[15px] leading-[1.65] text-soil mb-5">
              The table explains material behavior. The calculator turns your bin size and ingredient mix into a practical balancing recommendation.
            </p>
            <Link
              href="/tools/compost-calculator"
              className="inline-flex bg-moss-deep hover:bg-moss text-cream font-mono text-[11px] uppercase tracking-[0.12em] px-4 py-3 rounded-md transition-colors duration-fast"
            >
              Open compost calculator
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[28px] md:text-[32px] text-ink mb-5">Sources</h2>
          <ol className="font-serif text-[15px] leading-[1.6] text-ink list-decimal pl-5 space-y-2.5 max-w-[760px]">
            {Object.entries(SOURCES).map(([key, source]) => (
              <li key={key}>
                <a href={source.url} target="_blank" rel="noopener nofollow" className="text-moss-deep underline decoration-dotted underline-offset-2 hover:text-moss">
                  {source.title}
                </a>
                <span className="block font-mono text-[11.5px] uppercase tracking-[0.08em] text-soil mt-0.5">
                  {source.publisher} · cited as {key}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </>
  );
}
