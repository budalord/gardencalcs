import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * /data/npk-rates-by-crop — Editorial Almanac "data asset" page.
 *
 * Purpose: a source-cited reference table of typical pre-plant N-P₂O₅-K₂O
 * rates for common home-garden vegetables, aggregated from US cooperative
 * extension publications. Exists to be linked to and cited as a standalone
 * data asset — NOT a calculator, NOT a long-form guide.
 *
 * All numbers are conservative mid-ranges commonly published across state
 * extensions (UMass, Rutgers, UGA, Penn State, UMaine, UMN). A real soil
 * test should always override these defaults — this page says so loudly.
 */

const pageUrl = `${siteConfig.domain}/data/npk-rates-by-crop`;

export const metadata: Metadata = {
  title: "NPK Fertilizer Rates by Vegetable Crop — Extension Reference Table",
  description:
    "Source-cited pre-plant N, P₂O₅ and K₂O fertilizer rates for 20 common home-garden vegetables, in lb/1000 ft² and g/m². Aggregated from US cooperative extension bulletins.",
  keywords: [
    "npk rates by crop",
    "vegetable fertilizer rates",
    "pre-plant fertilizer recommendations",
    "n p k lb per 1000 sqft",
    "extension fertilizer table",
    "home garden fertilizer rates",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "NPK Fertilizer Rates by Vegetable Crop — Reference Table",
    description:
      "Pre-plant N, P₂O₅ and K₂O rates for 20 home-garden vegetables in lb/1000 ft² and g/m², aggregated from US cooperative extension sources.",
    url: pageUrl,
    type: "article",
  },
};

// --- Data ---------------------------------------------------------------
// Pre-plant whole-season rates, in lb per 1000 ft², typical for
// moderate-fertility soil before soil-test adjustment. Mid-range of
// commonly-published extension recommendations.
// g/m² = lb/1000 ft² × 4.88
type Row = {
  crop: string;
  feeder: "Light" | "Moderate" | "Heavy";
  n: string;      // lb N / 1000 sqft
  p: string;      // lb P₂O₅ / 1000 sqft
  k: string;      // lb K₂O / 1000 sqft
  timing: string;
  source: string; // short citation key matching SOURCES below
};

const rows: Row[] = [
  { crop: "Tomato",         feeder: "Heavy",    n: "3–4",   p: "2–3",   k: "3–4",   timing: "½ pre-plant, ½ side-dress at fruit set",     source: "UMass-VegGuide" },
  { crop: "Pepper",         feeder: "Moderate", n: "2–3",   p: "2–3",   k: "2–3",   timing: "⅔ pre-plant, ⅓ side-dress 4 weeks after set", source: "UMass-VegGuide" },
  { crop: "Eggplant",       feeder: "Moderate", n: "2–3",   p: "2–3",   k: "2–3",   timing: "½ pre-plant, ½ side-dress at first bloom",     source: "UMass-VegGuide" },
  { crop: "Sweet Corn",     feeder: "Heavy",    n: "3–4",   p: "2",     k: "2–3",   timing: "½ pre-plant, ½ at knee-high (V6–V8)",          source: "PSU-AG-32" },
  { crop: "Cucumber",       feeder: "Moderate", n: "2–3",   p: "2",     k: "2",     timing: "⅔ pre-plant, ⅓ at vining",                     source: "Rutgers-FS129" },
  { crop: "Summer Squash",  feeder: "Moderate", n: "2–3",   p: "2",     k: "2",     timing: "⅔ pre-plant, ⅓ at first bloom",                source: "Rutgers-FS129" },
  { crop: "Winter Squash",  feeder: "Moderate", n: "2–3",   p: "2",     k: "2–3",   timing: "⅔ pre-plant, ⅓ at vining",                     source: "UGA-C1027" },
  { crop: "Watermelon",     feeder: "Moderate", n: "2–3",   p: "2",     k: "2–3",   timing: "½ pre-plant, split side-dress through vining", source: "UGA-C1027" },
  { crop: "Cabbage",        feeder: "Heavy",    n: "3–4",   p: "2",     k: "2",     timing: "⅔ pre-plant, ⅓ 3–4 weeks after transplant",    source: "UMaine-2276" },
  { crop: "Broccoli",       feeder: "Heavy",    n: "3–4",   p: "2",     k: "2",     timing: "⅔ pre-plant, ⅓ 3–4 weeks after transplant",    source: "UMaine-2276" },
  { crop: "Cauliflower",    feeder: "Heavy",    n: "3–4",   p: "2",     k: "2",     timing: "⅔ pre-plant, ⅓ at head formation",             source: "UMaine-2276" },
  { crop: "Lettuce",        feeder: "Light",    n: "1–2",   p: "1–2",   k: "1–2",   timing: "All pre-plant; one top-dress if leaves pale",   source: "Cornell-HomeVeg" },
  { crop: "Spinach",        feeder: "Moderate", n: "2–3",   p: "1–2",   k: "1–2",   timing: "All pre-plant; top-dress at 4 true leaves",     source: "Cornell-HomeVeg" },
  { crop: "Kale / Chard",   feeder: "Moderate", n: "2–3",   p: "1–2",   k: "1–2",   timing: "Pre-plant; side-dress every 4 weeks of harvest", source: "Cornell-HomeVeg" },
  { crop: "Carrot",         feeder: "Light",    n: "1–2",   p: "2",     k: "2–3",   timing: "All pre-plant; avoid excess N (forked roots)",   source: "UMN-VegN" },
  { crop: "Beet",           feeder: "Light",    n: "1–2",   p: "2",     k: "2",     timing: "All pre-plant",                                 source: "UMN-VegN" },
  { crop: "Onion / Garlic", feeder: "Moderate", n: "2–3",   p: "2",     k: "2",     timing: "½ pre-plant, ½ in split side-dresses through bulking", source: "UGA-C1027" },
  { crop: "Potato",         feeder: "Moderate", n: "2–3",   p: "2",     k: "3–4",   timing: "½ pre-plant, ½ at hilling",                     source: "UMaine-2276" },
  { crop: "Bean (bush/pole)", feeder: "Light",  n: "0.5–1", p: "1–2",   k: "1–2",   timing: "All pre-plant; avoid excess N (reduces pods)",  source: "Rutgers-FS129" },
  { crop: "Pea",            feeder: "Light",    n: "0.5–1", p: "1–2",   k: "1–2",   timing: "All pre-plant; inoculate seed with rhizobia",    source: "Rutgers-FS129" },
];

const SOURCES: Record<string, { title: string; publisher: string; url: string }> = {
  "UMass-VegGuide":  { title: "New England Vegetable Management Guide — Nutrient Management",      publisher: "UMass Extension / New England Cooperative Extensions", url: "https://nevegetable.org/cultural-practices/nutrient-management" },
  "PSU-AG-32":       { title: "Sweet Corn — Soil Fertility (AG-32)",                               publisher: "Penn State Extension",                                   url: "https://extension.psu.edu/sweet-corn-production" },
  "Rutgers-FS129":   { title: "Fertilizing the Home Vegetable Garden (FS129)",                     publisher: "Rutgers NJAES Cooperative Extension",                    url: "https://njaes.rutgers.edu/fs129/" },
  "UGA-C1027":       { title: "Home Garden Fertilization (Circular 1027)",                         publisher: "UGA Cooperative Extension",                              url: "https://extension.uga.edu/publications/detail.html?number=C1027" },
  "UMaine-2276":     { title: "Maine Home Garden News — Fertilizing Vegetables (Bulletin 2276)",   publisher: "University of Maine Cooperative Extension",              url: "https://extension.umaine.edu/gardening/manual/soils/soil-testing-fertilizer-for-home-gardens/" },
  "Cornell-HomeVeg": { title: "Home Vegetable Gardening — Soil & Fertility",                       publisher: "Cornell Cooperative Extension",                          url: "https://cals.cornell.edu/school-integrative-plant-science/school-sections/horticulture-section/extension-outreach-0/home-gardening" },
  "UMN-VegN":        { title: "Nutrient Management for Commercial Vegetable Crops — Home-garden Equivalents", publisher: "University of Minnesota Extension",           url: "https://extension.umn.edu/nutrient-management/nutrient-management-vegetable-crops-minnesota" },
};

// g/m² conversion: lb/1000 sqft × 4.88
function toGperM2(range: string): string {
  const nums = range.match(/[\d.]+/g);
  if (!nums) return "";
  if (nums.length === 1) return `${(parseFloat(nums[0]) * 4.88).toFixed(1)}`;
  const [lo, hi] = nums;
  return `${(parseFloat(lo) * 4.88).toFixed(1)}–${(parseFloat(hi) * 4.88).toFixed(1)}`;
}

// --- Structured data ----------------------------------------------------
const datasetJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "NPK Fertilizer Rates by Vegetable Crop (Home Garden)",
  description:
    "Pre-plant nitrogen (N), phosphate (P₂O₅) and potash (K₂O) application rates for 20 common home-garden vegetables, in pounds per 1000 square feet, aggregated from US cooperative extension publications.",
  url: pageUrl,
  creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.domain },
  license: "https://creativecommons.org/licenses/by/4.0/",
  variableMeasured: [
    { "@type": "PropertyValue", name: "N rate",   unitText: "lb/1000 ft²" },
    { "@type": "PropertyValue", name: "P₂O₅ rate", unitText: "lb/1000 ft²" },
    { "@type": "PropertyValue", name: "K₂O rate",  unitText: "lb/1000 ft²" },
  ],
  citation: Object.values(SOURCES).map((s) => ({
    "@type": "CreativeWork",
    name: s.title,
    publisher: { "@type": "Organization", name: s.publisher },
    url: s.url,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
    { "@type": "ListItem", position: 2, name: "Data", item: `${siteConfig.domain}/data/npk-rates-by-crop` },
    { "@type": "ListItem", position: 3, name: "NPK Rates by Crop", item: pageUrl },
  ],
};

// --- Page ----------------------------------------------------------------
export default function NpkRatesByCropPage() {
  const feederColor: Record<Row["feeder"], string> = {
    Light:    "color-mix(in oklch, var(--leaf) 60%, transparent)",
    Moderate: "color-mix(in oklch, var(--moss) 60%, transparent)",
    Heavy:    "color-mix(in oklch, var(--terracotta) 60%, transparent)",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="max-w-[960px] mx-auto px-6 md:px-8 pt-7 pb-24">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7"
        >
          <Link href="/" className="hover:text-moss-deep">Home</Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-ink">Data</span>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-ink">NPK Rates by Crop</span>
        </nav>

        {/* Masthead */}
        <header className="pb-8 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
            Data · Source-cited · 20 crops
          </p>
          <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-4">
            NPK Fertilizer Rates by Vegetable Crop
          </h1>
          <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil max-w-[640px] mb-5">
            Typical pre-plant N, P₂O₅ and K₂O rates for common home-garden vegetables, aggregated from US cooperative extension publications. A real soil test always overrides these defaults — we list them as a starting point when a test is unavailable.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-soil">
            <span>Units: lb per 1000 ft² &amp; g per m²</span>
            <span className="opacity-50">·</span>
            <span>Pre-plant + split side-dress</span>
            <span className="opacity-50">·</span>
            <span>7 extension sources</span>
          </div>
        </header>

        {/* How to read */}
        <section className="mb-10 bg-paper border border-[color-mix(in_oklch,var(--moss)_25%,transparent)] border-l-[4px] border-l-terracotta rounded-md p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep mb-2">How to read this table</p>
          <ul className="font-serif text-[15.5px] leading-[1.6] text-ink list-disc pl-5 space-y-1.5">
            <li><strong>N, P₂O₅, K₂O</strong> are the nutrients on a fertilizer bag label — a 10-10-10 bag is 10% of each by weight.</li>
            <li>Rates are given <strong>per 1000 ft²</strong> (≈ a 25 × 40 ft garden). To convert to <strong>g per m²</strong>, multiply by 4.88.</li>
            <li><strong>Heavy feeders</strong> (tomato, corn, brassicas) need a second side-dress mid-season; <strong>light feeders</strong> (legumes, carrot) do not.</li>
            <li>These are <strong>total season rates</strong> — split them per the Timing column.</li>
            <li>Always <strong>soil-test first</strong>. These rates assume moderate-fertility soil; very low-P or very high-K soils need adjustment.</li>
          </ul>
        </section>

        {/* Main table */}
        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[28px] md:text-[32px] text-ink mb-5">Season rates, by crop</h2>

          <div className="overflow-x-auto border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] rounded-md">
            <table className="w-full text-[13.5px] tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
              <thead className="bg-paper text-soil font-mono text-[10.5px] uppercase tracking-[0.1em]">
                <tr>
                  <th className="text-left px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">Crop</th>
                  <th className="text-left px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">Feeder</th>
                  <th className="text-right px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">N<br/><span className="normal-case font-serif italic text-[10px] text-soil">lb/1000 ft² · g/m²</span></th>
                  <th className="text-right px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">P₂O₅<br/><span className="normal-case font-serif italic text-[10px] text-soil">lb/1000 ft² · g/m²</span></th>
                  <th className="text-right px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">K₂O<br/><span className="normal-case font-serif italic text-[10px] text-soil">lb/1000 ft² · g/m²</span></th>
                  <th className="text-left px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">Timing</th>
                  <th className="text-left px-3 py-3 border-b border-[color-mix(in_oklch,var(--soil)_30%,transparent)]">Source</th>
                </tr>
              </thead>
              <tbody className="bg-cream">
                {rows.map((r, i) => (
                  <tr key={r.crop} className={i % 2 === 0 ? "" : "bg-paper/50"}>
                    <td className="px-3 py-2.5 font-serif font-medium text-ink border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">{r.crop}</td>
                    <td className="px-3 py-2.5 border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">
                      <span className="inline-block px-2 py-0.5 rounded-sm font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink" style={{ backgroundColor: feederColor[r.feeder] }}>
                        {r.feeder}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right text-ink border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">
                      <span className="font-sans">{r.n}</span>
                      <span className="block font-serif italic text-[11.5px] text-soil">{toGperM2(r.n)}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right text-ink border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">
                      <span className="font-sans">{r.p}</span>
                      <span className="block font-serif italic text-[11.5px] text-soil">{toGperM2(r.p)}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right text-ink border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">
                      <span className="font-sans">{r.k}</span>
                      <span className="block font-serif italic text-[11.5px] text-soil">{toGperM2(r.k)}</span>
                    </td>
                    <td className="px-3 py-2.5 font-serif text-[13px] text-ink border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">{r.timing}</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-soil border-b border-[color-mix(in_oklch,var(--soil)_15%,transparent)]">
                      <a href={SOURCES[r.source].url} target="_blank" rel="noopener nofollow" className="hover:text-moss-deep underline decoration-dotted underline-offset-2">
                        {r.source}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-serif italic text-[13.5px] text-soil mt-4 max-w-[640px]">
            Rates shown are mid-range of values typically published across state cooperative extensions for home gardens on moderate-fertility soil. Individual state recommendations vary by ±25% depending on regional soil types and climate.
          </p>
        </section>

        {/* Converting to a bag of fertilizer */}
        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[28px] md:text-[32px] text-ink mb-5">
            Converting a rate to bag weight
          </h2>
          <p className="font-serif text-[16.5px] leading-[1.7] text-ink mb-4 max-w-[680px]">
            The table tells you <em>pounds of nutrient</em>, not pounds of fertilizer. To translate, divide the nutrient rate by the bag’s analysis percentage:
          </p>

          <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md p-5 mb-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep mb-2">Formula</p>
            <p className="font-mono text-[14px] leading-[1.6] text-ink">
              bag_lbs = (nutrient_lbs_per_1000_sqft × area_sqft ÷ 1000) ÷ (bag_analysis_% ÷ 100)
            </p>
          </div>

          <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] border-l-[4px] border-l-moss rounded-md p-5 mb-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep mb-2">Worked example</p>
            <p className="font-serif italic text-[15.5px] leading-[1.6] text-ink">
              A 200 ft² tomato bed, targeting 3 lb N / 1000 ft² pre-plant, using 10-10-10:
              <br/>
              <span className="not-italic font-mono text-[13.5px] text-ink">
                (3 × 200 ÷ 1000) ÷ (10 ÷ 100) = <strong>6 lb of 10-10-10</strong>
              </span>
            </p>
          </div>

          <p className="font-serif text-[15.5px] leading-[1.65] text-soil max-w-[680px]">
            Our <Link href="/tools/fertilizer-calculator" className="text-moss-deep underline decoration-dotted underline-offset-2 hover:text-moss">Fertilizer NPK Calculator</Link> does this math for you, including split applications and non-10-10-10 bags like urea (46-0-0) or 5-10-15.
          </p>
        </section>

        {/* Caveats */}
        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[28px] md:text-[32px] text-ink mb-5">When these numbers are wrong</h2>
          <ul className="font-serif text-[16px] leading-[1.7] text-ink list-disc pl-5 space-y-2 max-w-[680px]">
            <li>
              <strong>You have a soil test.</strong> Always follow the test’s P and K recommendations — this table is only a starting point for unknown soils.
            </li>
            <li>
              <strong>Very acidic or very alkaline soil.</strong> Nutrient availability drops sharply outside pH 6.0–7.0. Fix pH first with our <Link href="/tools/soil-ph-calculator" className="text-moss-deep underline decoration-dotted underline-offset-2">Soil pH Calculator</Link>, then fertilize.
            </li>
            <li>
              <strong>Heavy organic matter (≥ 5%).</strong> Rich, well-composted soil supplies substantial N through mineralization — reduce synthetic N by 25–50%.
            </li>
            <li>
              <strong>High-tunnel or container growing.</strong> Confined root zones and frequent irrigation leach nutrients faster; split more heavily and feed more often.
            </li>
            <li>
              <strong>Organic fertilizers (compost, manure, blood meal).</strong> Nutrient release is slower and temperature-dependent. A 3 lb N / 1000 ft² target from compost may require 20–30 lb of finished compost per 100 ft² — estimate with our <Link href="/tools/compost-calculator" className="text-moss-deep underline decoration-dotted underline-offset-2">Compost Calculator</Link>.
            </li>
          </ul>
        </section>

        {/* Sources */}
        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[28px] md:text-[32px] text-ink mb-5">Sources</h2>
          <p className="font-serif text-[15.5px] leading-[1.65] text-soil mb-5 max-w-[680px]">
            The rates above are aggregated from the following cooperative extension publications. Where sources disagree, we list the mid-range; where they agree closely, we list the common value.
          </p>
          <ol className="font-serif text-[15px] leading-[1.6] text-ink list-decimal pl-5 space-y-2.5 max-w-[720px]">
            {Object.entries(SOURCES).map(([key, s]) => (
              <li key={key}>
                <a href={s.url} target="_blank" rel="noopener nofollow" className="text-moss-deep underline decoration-dotted underline-offset-2 hover:text-moss">
                  {s.title}
                </a>
                <span className="block font-mono text-[11.5px] uppercase tracking-[0.08em] text-soil mt-0.5">
                  {s.publisher} · cited as {key}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Related */}
        <section className="pt-8 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)]">
          <h2 className="font-serif font-semibold text-[22px] text-ink mb-4">Related tools</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <li>
              <Link href="/tools/fertilizer-calculator" className="block p-4 bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md hover:border-moss transition-colors duration-150">
                <span className="block font-serif font-medium text-[17px] text-ink">Fertilizer NPK Calculator</span>
                <span className="block font-serif italic text-[13.5px] text-soil mt-1">Convert any bag analysis to pounds for a given area.</span>
              </Link>
            </li>
            <li>
              <Link href="/tools/soil-ph-calculator" className="block p-4 bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md hover:border-moss transition-colors duration-150">
                <span className="block font-serif font-medium text-[17px] text-ink">Soil pH Calculator</span>
                <span className="block font-serif italic text-[13.5px] text-soil mt-1">Lime or sulfur to hit target pH, by soil texture.</span>
              </Link>
            </li>
            <li>
              <Link href="/tools/compost-calculator" className="block p-4 bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md hover:border-moss transition-colors duration-150">
                <span className="block font-serif font-medium text-[17px] text-ink">Compost Calculator</span>
                <span className="block font-serif italic text-[13.5px] text-soil mt-1">How much finished compost for a bed of given size.</span>
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
