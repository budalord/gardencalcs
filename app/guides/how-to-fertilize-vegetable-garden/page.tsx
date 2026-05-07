import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import GuideLayout from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: "How to Fertilize Your Vegetable Garden",
  description:
    "A complete guide to fertilizing vegetable gardens — when to fertilize, NPK basics, recommended rates for common vegetables, and organic vs synthetic fertilizer comparison.",
  keywords: [
    "how to fertilize vegetable garden",
    "vegetable garden fertilizer guide",
    "NPK fertilizer explained",
    "when to fertilize vegetables",
    "organic vs synthetic fertilizer",
  ],
  alternates: {
    canonical: `${siteConfig.domain}/guides/how-to-fertilize-vegetable-garden`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Fertilize Your Vegetable Garden",
  description:
    "A complete guide to fertilizing vegetable gardens — when to fertilize, NPK basics, recommended rates for common vegetables, and organic vs synthetic fertilizer comparison.",
  url: `${siteConfig.domain}/guides/how-to-fertilize-vegetable-garden`,
  author: { "@type": "Organization", name: siteConfig.name },
  publisher: { "@type": "Organization", name: siteConfig.name },
};

// Whole-season pre-plant N rates, expressed as lb N per 1,000 ft² to match
// /data/npk-rates-by-crop. Values aggregated from UMass NEVMG, Rutgers FS129,
// UGA C1027, UMaine 2276, Cornell home-veg, and UMN nutrient management.
const rateRows: [string, string, string, string][] = [
  ["Tomato",            "3–4",     "Heavy",          "½ pre-plant, ½ side-dress at fruit set"],
  ["Sweet Corn",        "3–4",     "Heavy",          "Side-dress at knee high (V6–V8)"],
  ["Lettuce",           "1–2",     "Light",          "All pre-plant; one top-dress if leaves pale"],
  ["Pepper",            "2–3",     "Moderate",       "⅔ pre-plant, ⅓ at first bloom; avoid excess N"],
  ["Squash / Zucchini", "2–3",     "Moderate",       "Side-dress at first flower"],
  ["Carrot",            "1–2",     "Light",          "All pre-plant; excess N causes forked roots"],
  ["Bean (bush/pole)",  "0.5–1",   "Light",          "Fixes own N; minimal fertilizer needed"],
  ["Cucumber",          "2–3",     "Moderate",       "⅔ pre-plant, ⅓ at vining"],
];

export default function FertilizeGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideLayout
        title="How to Fertilize Your Vegetable Garden"
        dek="A practical guide for home gardeners — from NPK basics to application timing."
        topic="Fertilizing"
        readTime="11 min"
      >
        <section>
          <h2>Why fertilizing matters</h2>
          <p>Vegetables are heavy feeders. Unlike ornamental plants that can survive on minimal nutrients, crops like tomatoes, corn, and squash pull large amounts of nitrogen, phosphorus, and potassium from the soil every season. Without replenishment, soil fertility declines year after year, leading to smaller harvests, weaker plants, and increased pest pressure.</p>
          <p>Fertilizing is not about dumping chemicals on your garden — it is about understanding what your plants need and delivering it at the right time in the right amount. Over-fertilizing is just as harmful as under-fertilizing: too much nitrogen produces lush foliage but few fruits, while excess phosphorus can lock out other nutrients.</p>
        </section>

        <section>
          <h2>Understanding NPK: the three core nutrients</h2>
          <p>Every fertilizer label shows three numbers — the NPK ratio. These represent the percentage by weight of nitrogen (N), phosphorus (P₂O₅), and potassium (K₂O) in the product.</p>
          <ul>
            <li><strong>Nitrogen (N)</strong> — drives leafy, vegetative growth. Essential for lettuce, spinach, and other greens. Too much delays fruiting in tomatoes and peppers.</li>
            <li><strong>Phosphorus (P)</strong> — supports root development, flowering, and fruit set. Critical during transplanting and early growth stages.</li>
            <li><strong>Potassium (K)</strong> — regulates water uptake, disease resistance, and overall plant vigour. Important throughout the growing season.</li>
          </ul>
          <p>A balanced fertilizer like 10-10-10 provides equal amounts of all three. A high-nitrogen formula like 46-0-0 (urea) is suited for leafy crops or early-season soil preparation.</p>
          <aside className="almanac-callout">
            Use our <Link href="/tools/fertilizer-calculator">Fertilizer Calculator</Link> to find the exact amount of fertilizer needed for your garden area based on your chosen NPK product.
          </aside>
        </section>

        <section>
          <h2>When to fertilize</h2>
          <p>Timing is as important as the fertilizer itself. Applying nutrients when plants cannot use them leads to runoff, waste, and potential groundwater contamination.</p>
          <ul>
            <li><strong>Before planting (pre-plant):</strong> Work a balanced granular fertilizer or compost into the top 6 inches of soil 1–2 weeks before transplanting. This builds a nutrient reserve for seedlings.</li>
            <li><strong>At transplanting:</strong> Use a phosphorus-rich starter fertilizer (e.g., 5-10-5) to encourage root establishment. Avoid high-nitrogen formulas at this stage.</li>
            <li><strong>Side-dressing (mid-season):</strong> Apply nitrogen-rich fertilizer alongside heavy feeders like corn, tomatoes, and squash when they begin to flower. Sprinkle granules 4–6 inches from the stem and water in.</li>
            <li><strong>Avoid late-season nitrogen:</strong> Applying nitrogen in late summer or fall encourages soft new growth that is vulnerable to frost damage.</li>
          </ul>
        </section>

        <section>
          <h2>Recommended rates for common vegetables</h2>
          <p>The following rates are general guidelines based on University Extension recommendations. Always start with a soil test if possible — it is the most accurate way to know what your garden actually needs.</p>
          <table>
            <thead>
              <tr>
                <th>Vegetable</th>
                <th>N (lb / 1,000 ft²)</th>
                <th>Feeder class</th>
                <th>Timing notes</th>
              </tr>
            </thead>
            <tbody>
              {rateRows.map(([veg, n, type, note]) => (
                <tr key={veg}>
                  <td>{veg}</td>
                  <td className="tabular">{n}</td>
                  <td>{type}</td>
                  <td style={{ color: "var(--soil)" }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Organic vs synthetic fertilizers</h2>
          <p>Both organic and synthetic fertilizers can produce excellent results. The right choice depends on your goals, budget, and soil health philosophy.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-5">
            <div className="bg-paper border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep mb-2">Organic</p>
              <ul className="list-none m-0 p-0 font-serif text-[14px] leading-[1.55] text-ink space-y-1">
                <li>— Improve soil structure over time</li>
                <li>— Slow-release; lower burn risk</li>
                <li>— Feed soil microbiome</li>
                <li className="text-soil">— Lower nutrient concentration</li>
                <li className="text-soil">— Slower to show results</li>
                <li className="text-soil">— More expensive per unit of N</li>
              </ul>
              <p className="font-serif italic text-[13px] text-soil mt-2">Compost, blood meal, bone meal, fish emulsion.</p>
            </div>
            <div className="bg-paper border border-[color-mix(in_oklch,var(--terracotta)_35%,transparent)] border-l-[4px] border-l-terracotta rounded-md p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-terracotta mb-2">Synthetic</p>
              <ul className="list-none m-0 p-0 font-serif text-[14px] leading-[1.55] text-ink space-y-1">
                <li>— Precise, predictable nutrient ratios</li>
                <li>— Fast-acting</li>
                <li>— Cost-effective per unit of N</li>
                <li className="text-soil">— Can burn plants if over-applied</li>
                <li className="text-soil">— No benefit to soil biology</li>
                <li className="text-soil">— Runoff risk if misapplied</li>
              </ul>
              <p className="font-serif italic text-[13px] text-soil mt-2">Urea (46-0-0), DAP (18-46-0), 10-10-10.</p>
            </div>
          </div>
          <p>Many experienced gardeners use a combination: organic matter (compost) to build long-term soil health, and targeted synthetic fertilizers to address specific deficiencies during the season.</p>
        </section>

        <section>
          <h2>Application tips</h2>
          <ul>
            <li>Always water after applying granular fertilizer to activate it and prevent burn.</li>
            <li>Never apply fertilizer to dry, stressed plants — water first, then fertilize.</li>
            <li>Keep granules off leaves and stems to avoid chemical burn.</li>
            <li>Split large applications into two smaller ones, 2–3 weeks apart, for better uptake.</li>
            <li>Get a soil test every 2–3 years from your local Cooperative Extension office — it costs around $15–$25 and tells you exactly what your soil needs.</li>
          </ul>
        </section>

        <section className="!mt-14 pt-10 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-terracotta !mt-0 mb-4">Related tools</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/tools/fertilizer-calculator" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">NPK fertilizer calculator for vegetable beds</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Turn an NPK label into pounds or grams of product for the garden area you actually have.</p>
            </Link>
            <Link href="/tools/soil-ph-calculator" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">Soil pH calculator — lime &amp; sulfur rate</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Confirm pH is in range before fertilizing; nutrients lock up at the wrong pH no matter the rate.</p>
            </Link>
            <Link href="/tools/seed-spacing-calculator" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">Vegetable seed spacing calculator</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Decide bed layout and plant count first, since fertilizer rate scales with the planting area.</p>
            </Link>
            <Link href="/tools/compost-calculator" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">How much compost do I need? Compost calculator</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Plan compost as a fertility input alongside synthetic NPK; cubic yards, bag count, and C:N ratios.</p>
            </Link>
          </div>
        </section>
      </GuideLayout>
    </>
  );
}
