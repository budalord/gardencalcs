import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.domain}/data/compost-cn-ratios`;

export const metadata: Metadata = {
  title: { absolute: "Compost Carbon to Nitrogen Ratio Table by Material" },
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
    title: "Compost Carbon to Nitrogen Ratio Table",
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
  { material: "Grass clippings", type: "Green", ratio: "12-25:1", moistureNote: "Wet and compacting", bestUse: "Mix thinly with dry leaves or straw", source: "CSU-Compost" },
  { material: "Vegetable wastes (vegetable scraps)", type: "Green", ratio: "12-20:1", moistureNote: "Moist", bestUse: "Bury inside pile to reduce pests", source: "CSU-Compost" },
  { material: "Fruit wastes (fruit scraps)", type: "Green", ratio: "20-49:1", moistureNote: "Moist and sugary", bestUse: "Mix with browns, avoid exposed layers", source: "Cornell-CWMI" },
  { material: "Coffee grounds", type: "Green", ratio: "20:1", moistureNote: "Moist and dense", bestUse: "Blend with leaves, not as a thick mat", source: "Cornell-CWMI" },
  { material: "Tea leaves (listed with coffee grounds)", type: "Green", ratio: "20:1", moistureNote: "Moist", bestUse: "Small nitrogen boost in kitchen-scrap layer", source: "Montana-HomeComposting" },
  { material: "Hay – legume (incl. alfalfa hay)", type: "Green", ratio: "15-19:1", moistureNote: "Moist to semi-dry", bestUse: "Nitrogen-rich layer for slow piles", source: "Cornell-CWMI" },
  { material: "Poultry manure (laying hens)", type: "Green", ratio: "3-10:1", moistureNote: "Wet and strong", bestUse: "Use sparingly; hot compost only", source: "Cornell-CWMI" },
  { material: "Horse manure (general)", type: "Green", ratio: "25:1", moistureNote: "Moist with bedding", bestUse: "Good activator if bedding is not excessive", source: "CSU-Compost" },
  { material: "Cow manure", type: "Green", ratio: "20:1", moistureNote: "Wet", bestUse: "Blend well and compost before garden use", source: "CSU-Compost" },
  { material: "Dry leaves", type: "Brown", ratio: "30-80:1", moistureNote: "Dry and fluffy", bestUse: "Main brown material for kitchen scraps", source: "CSU-Compost" },
  { material: "Leaves (fresh leaves)", type: "Neutral", ratio: "40-80:1", moistureNote: "Moist", bestUse: "Good bulk material, shred if possible", source: "Cornell-CWMI" },
  { material: "Straw", type: "Brown", ratio: "40-100:1", moistureNote: "Dry and airy", bestUse: "Add structure and oxygen channels", source: "CSU-Compost" },
  { material: "Hay – general", type: "Brown", ratio: "15-32:1", moistureNote: "Variable", bestUse: "Use seed-free hay; mix evenly", source: "Cornell-CWMI" },
  { material: "Corn stalks", type: "Brown", ratio: "60-73:1", moistureNote: "Dry and coarse", bestUse: "Chop before adding", source: "Cornell-CWMI" },
  { material: "Wood chips", type: "Brown", ratio: "100-500:1", moistureNote: "Dry and slow", bestUse: "Use as structure, not main feedstock", source: "CSU-Compost" },
  { material: "Sawdust", type: "Brown", ratio: "100-500:1", moistureNote: "Dry and compacting", bestUse: "Use thinly; mix with wet greens", source: "CSU-Compost" },
  { material: "Newsprint (newspaper)", type: "Brown", ratio: "398-852:1", moistureNote: "Dry", bestUse: "Shred and wet before adding", source: "Cornell-CWMI" },
  { material: "Corrugated cardboard", type: "Brown", ratio: "563:1", moistureNote: "Dry", bestUse: "Shred; pair with grass or food scraps", source: "Cornell-CWMI" },
  { material: "Pine needles", type: "Brown", ratio: "60-110:1", moistureNote: "Dry and waxy", bestUse: "Use modestly; slow to break down", source: "Arizona-az1632" },
  { material: "Wood shavings (hardwood)", type: "Brown", ratio: "451-818:1", moistureNote: "Dry", bestUse: "Use thinly as a bulking agent", source: "Cornell-CWMI" },
  { material: "Wood shavings (softwood)", type: "Brown", ratio: "212-1,313:1", moistureNote: "Dry", bestUse: "Use thinly as a bulking agent", source: "Cornell-CWMI" },
  { material: "Bark (hardwoods)", type: "Brown", ratio: "100-130:1", moistureNote: "Dry and coarse", bestUse: "Slow bulking material, better as mulch", source: "CSU-Compost" },
  { material: "Peanut hulls (peanut shells)", type: "Brown", ratio: "50:1", moistureNote: "Dry", bestUse: "Use with care: the source notes peanut hulls can carry Southern blight and nematodes", source: "Arkansas-FSA2087R" },
  { material: "Rice hulls", type: "Brown", ratio: "113-1,120:1", moistureNote: "Dry and airy", bestUse: "Adds structure to wet piles", source: "Cornell-CWMI" },
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
  "Arizona-az1632": {
    title: "Small Scale Composting in the Low Desert of Arizona",
    publisher: "University of Arizona Cooperative Extension",
    url: "https://extension.arizona.edu/sites/extension.arizona.edu/files/pubs/az1632-2014.pdf",
  },
  "Arkansas-FSA2087R": {
    title: "Composting",
    publisher: "University of Arkansas System Division of Agriculture",
    url: "https://www.uaex.uada.edu/publications/pdf/FSA-2087.pdf",
  },
  "Montana-HomeComposting": {
    title: "Home Composting",
    publisher: "Montana State University Extension",
    url: "https://extension-store.montana.edu/assets/publications/montguidepdfs/mt199203ag-composting.pdf",
  },
  "Cornell-Compost-Chemistry": {
    title: "Compost Chemistry",
    publisher: "Cornell Composting",
    url: "https://compost.css.cornell.edu/chemistry.html",
  },
  "US-EPA-Composting": {
    title: "Approaches to Composting",
    publisher: "US Environmental Protection Agency",
    url: "https://www.epa.gov/sustainable-management-food/approaches-composting",
  },
};

const csv = [
  ["Material", "Type", "Typical C:N ratio", "Moisture note", "Best use", "Source"],
  ...rows.map((row) => [row.material, row.type, row.ratio, row.moistureNote, row.bestUse, SOURCES[row.source].url]),
]
  .map((line) => line.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
  .join("\n");

function escapeHtml(value: string): string {
  const escaped: Record<string, string> = { "<": "&lt;", "&": "&amp;", '"': "&quot;" };
  return value.replace(/[<&"]/g, (character) => escaped[character] ?? character);
}

const htmlTable = [
  "<table>",
  "  <thead><tr><th>Material</th><th>Type</th><th>Typical C:N ratio</th><th>Moisture note</th><th>Best use</th><th>Source</th></tr></thead>",
  "  <tbody>",
  ...rows.map((row) => {
    const source = SOURCES[row.source];
    return `    <tr><td>${escapeHtml(row.material)}</td><td>${escapeHtml(row.type)}</td><td>${escapeHtml(row.ratio)}</td><td>${escapeHtml(row.moistureNote)}</td><td>${escapeHtml(row.bestUse)}</td><td><a href="${escapeHtml(source.url)}">${escapeHtml(source.publisher)}</a></td></tr>`;
  }),
  "  </tbody>",
  "</table>",
  `<p>Source: <a href="${escapeHtml(pageUrl)}">GardenCalcs — Compost Carbon to Nitrogen Ratio (C:N) by Material</a></p>`,
].join("\n");

const bibtex = `@misc{gardencalcs_compost_cn_ratios,
  author       = {{GardenCalcs}},
  title        = {Compost Carbon to Nitrogen Ratio (C:N) by Material},
  year         = {2026},
  howpublished = {\\url{${pageUrl}}},
  note         = {Compiled from cited US cooperative extension sources; see the Source column}
}`;

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
            Compost Carbon to Nitrogen Ratio (C:N) by Material
          </h1>
          <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil max-w-[680px] mb-5">
            A reference table for common compost greens, browns, and neutral materials. Use it to understand why grass clippings heat a pile quickly, why sawdust slows one down, and how to balance a home compost mix before it smells or stalls.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-soil">
            <span>Target pile ratio: about 30:1 by weight</span>
            <span className="opacity-50">·</span>
            <span>{Object.keys(SOURCES).length} cited sources</span>
            <span className="opacity-50">·</span>
            <span>CSV-ready table</span>
          </div>
        </header>

        <section className="mb-10 bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep mb-2">Cite this table</p>
          <p className="font-serif text-[15px] leading-[1.65] text-ink mb-4">
            If you use this table, please credit GardenCalcs and link to this page: <a href={pageUrl} className="underline decoration-dotted underline-offset-2">{pageUrl}</a>
          </p>
          <details className="mb-3">
            <summary className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep cursor-pointer">Copy the HTML table</summary>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-[12px] leading-[1.5]"><code>{htmlTable}</code></pre>
          </details>
          <details>
            <summary className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep cursor-pointer">BibTeX</summary>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-[12px] leading-[1.5]"><code>{bibtex}</code></pre>
          </details>
          <p className="font-serif text-[13px] leading-[1.6] text-soil mt-4">
            Data values belong to the cited extension sources; the compilation and layout are © GardenCalcs. Free to reuse with attribution and a link.
          </p>
        </section>

        <section className="mb-10 bg-paper border border-[color-mix(in_oklch,var(--moss)_25%,transparent)] border-l-[4px] border-l-terracotta rounded-md p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep mb-2">Method</p>
          <ul className="font-serif text-[15.5px] leading-[1.6] text-ink list-disc pl-5 space-y-1.5">
            <li>Ratios are typical ranges, not lab guarantees. Moisture, age, bedding, and particle size can shift a material substantially.</li>
            <li>Greens are nitrogen-rich inputs that usually heat or activate a pile. Browns are carbon-rich inputs that add structure and reduce odor.</li>
            <li>The practical starting target for an active home pile is <a href={SOURCES["Cornell-Compost-Chemistry"].url}>about 30:1 by weight</a>. A <a href={SOURCES["US-EPA-Composting"].url}>3:1 browns-to-greens ratio by volume</a> and a 30:1 C:N ratio by weight describe the same target: browns are loose and far less dense than greens, so by volume they have to make up most of the pile. Use the table as a planning reference, then adjust by smell, moisture, and pile temperature.</li>
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

        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[24px] text-ink mb-3">Sources &amp; variation</h2>
          <div className="font-serif text-[15px] leading-[1.65] text-soil space-y-3">
            <p>Each row shows one value from one extension source so it can be checked directly. Published C:N values for the same material differ between sources because samples differ in moisture, particle size, and plant variety.</p>
            <p><strong className="text-ink">Pine needles:</strong> the table uses the 60-110:1 range from <a className="underline decoration-dotted underline-offset-2 hover:text-moss-deep" href="https://extension.arizona.edu/sites/extension.arizona.edu/files/pubs/az1632-2014.pdf" target="_blank" rel="noopener nofollow">University of Arizona Cooperative Extension (az1632)</a>. Other extension sources list 70:1 (<a className="underline decoration-dotted underline-offset-2 hover:text-moss-deep" href="https://cals.cornell.edu/school-integrative-plant-science/school-sections/horticulture-section/outreach-and-extension/pandemic-vegetable-gardening/pandemic-vegetable-gardening-2021-archive/dos-and-donts-of-composting" target="_blank" rel="noopener nofollow">Cornell CALS</a>), 80:1 (<a className="underline decoration-dotted underline-offset-2 hover:text-moss-deep" href="https://extensionpubs.unl.edu/publication/g2222/2013/pdf/view/g2222-2013.pdf" target="_blank" rel="noopener nofollow">Nebraska Extension G2222</a>), 70:1 (<a className="underline decoration-dotted underline-offset-2 hover:text-moss-deep" href="https://www.ucanr.edu/sites/default/files/2011-08/118306.PDF" target="_blank" rel="noopener nofollow">UC Cooperative Extension Placer &amp; Nevada Counties</a>), and 90:1 (<a className="underline decoration-dotted underline-offset-2 hover:text-moss-deep" href="https://www.uaex.uada.edu/publications/pdf/FSA-2087.pdf" target="_blank" rel="noopener nofollow">University of Arkansas FSA-2087</a>). All of these fall inside the Arizona range.</p>
            <p><strong className="text-ink">Tea leaves:</strong> <a className="underline decoration-dotted underline-offset-2 hover:text-moss-deep" href="https://extension-store.montana.edu/assets/publications/montguidepdfs/mt199203ag-composting.pdf" target="_blank" rel="noopener nofollow">Montana State University Extension</a> lists coffee grounds and tea leaves together in a single entry at 20:1. It is not a separate measurement for tea leaves.</p>
            <p><strong className="text-ink">Peanut hulls:</strong> <a className="underline decoration-dotted underline-offset-2 hover:text-moss-deep" href="https://www.uaex.uada.edu/publications/pdf/FSA-2087.pdf" target="_blank" rel="noopener nofollow">University of Arkansas FSA-2087</a> gives 50:1 and marks peanut hulls &ldquo;Yes, but,&rdquo; noting they can carry Southern blight and nematodes.</p>
            <p><strong className="text-ink">Wood:</strong> Cornell CWMI groups hardwood and softwood &ldquo;chips, shavings, etc.&rdquo; together (451-818:1 and 212-1,313:1); the wood chips row uses Colorado State&apos;s separate 100-500:1 entry.</p>
            <p><strong className="text-ink">Alfalfa hay:</strong> <a className="underline decoration-dotted underline-offset-2 hover:text-moss-deep" href="https://extension.arizona.edu/sites/extension.arizona.edu/files/pubs/az1632-2014.pdf" target="_blank" rel="noopener nofollow">Arizona az1632</a> also lists alfalfa hay at 15-19:1, the same range Cornell CWMI gives for legume hay.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[24px] text-ink mb-3">Materials without a standalone value in these tables</h2>
          <p className="font-serif text-[15px] leading-[1.65] text-soil">Fresh garden weeds, alfalfa meal, paper towels, spent potting mix, finished compost, garden soil, eggshells, and wood ash are common in home gardens, but the two reference tables checked for this page, Cornell Waste Management Institute Appendix A and Colorado State Extension&apos;s Making Compost Table 1, give no standalone value for them; use product labeling or measured values. Blood meal is a high-nitrogen material with a C:N ratio far below 20:1; no specific value is given here.</p>
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
