import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

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

export default function FertilizeGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/guides" className="text-sm text-green-700 hover:underline">← All Guides</Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">How to Fertilize Your Vegetable Garden</h1>
        <p className="text-gray-500 text-sm mb-8">A practical guide for home gardeners — from NPK basics to application timing.</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Why Fertilizing Matters</h2>
            <p>Vegetables are heavy feeders. Unlike ornamental plants that can survive on minimal nutrients, crops like tomatoes, corn, and squash pull large amounts of nitrogen, phosphorus, and potassium from the soil every season. Without replenishment, soil fertility declines year after year, leading to smaller harvests, weaker plants, and increased pest pressure.</p>
            <p className="mt-3">Fertilizing is not about dumping chemicals on your garden — it is about understanding what your plants need and delivering it at the right time in the right amount. Over-fertilizing is just as harmful as under-fertilizing: too much nitrogen produces lush foliage but few fruits, while excess phosphorus can lock out other nutrients.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Understanding NPK: The Three Core Nutrients</h2>
            <p>Every fertilizer label shows three numbers — the NPK ratio. These represent the percentage by weight of nitrogen (N), phosphorus (P₂O₅), and potassium (K₂O) in the product.</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Nitrogen (N)</strong> — drives leafy, vegetative growth. Essential for lettuce, spinach, and other greens. Too much delays fruiting in tomatoes and peppers.</li>
              <li><strong>Phosphorus (P)</strong> — supports root development, flowering, and fruit set. Critical during transplanting and early growth stages.</li>
              <li><strong>Potassium (K)</strong> — regulates water uptake, disease resistance, and overall plant vigor. Important throughout the growing season.</li>
            </ul>
            <p className="mt-3">A balanced fertilizer like 10-10-10 provides equal amounts of all three. A high-nitrogen formula like 46-0-0 (urea) is suited for leafy crops or early-season soil preparation.</p>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
              Use our <Link href="/tools/fertilizer-calculator" className="text-green-700 font-medium hover:underline">Fertilizer Calculator</Link> to find the exact amount of fertilizer needed for your garden area based on your chosen NPK product.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">When to Fertilize</h2>
            <p>Timing is as important as the fertilizer itself. Applying nutrients when plants cannot use them leads to runoff, waste, and potential groundwater contamination.</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Before planting (pre-plant):</strong> Work a balanced granular fertilizer or compost into the top 6 inches of soil 1–2 weeks before transplanting. This builds a nutrient reserve for seedlings.</li>
              <li><strong>At transplanting:</strong> Use a phosphorus-rich starter fertilizer (e.g., 5-10-5) to encourage root establishment. Avoid high-nitrogen formulas at this stage.</li>
              <li><strong>Side-dressing (mid-season):</strong> Apply nitrogen-rich fertilizer alongside heavy feeders like corn, tomatoes, and squash when they begin to flower. Sprinkle granules 4–6 inches from the stem and water in.</li>
              <li><strong>Avoid late-season nitrogen:</strong> Applying nitrogen in late summer or fall encourages soft new growth that is vulnerable to frost damage.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Recommended Fertilizer Rates for Common Vegetables</h2>
            <p>The following rates are general guidelines based on University Extension recommendations. Always start with a soil test if possible — it is the most accurate way to know what your garden actually needs.</p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-800 text-white">
                    <th className="text-left px-4 py-2">Vegetable</th>
                    <th className="text-left px-4 py-2">N (lbs/100 sq ft)</th>
                    <th className="text-left px-4 py-2">Feeding Type</th>
                    <th className="text-left px-4 py-2">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    ["Tomato", "0.2–0.3", "Moderate", "Side-dress when flowering begins"],
                    ["Corn", "0.3–0.4", "Heavy", "Side-dress at knee height"],
                    ["Lettuce", "0.2–0.3", "Moderate", "High N for leafy growth"],
                    ["Pepper", "0.15–0.25", "Light-Moderate", "Avoid excess N before fruiting"],
                    ["Squash / Zucchini", "0.2–0.3", "Moderate", "Side-dress at first flower"],
                    ["Carrot", "0.1–0.15", "Light", "Excess N causes forked roots"],
                    ["Bean", "0.05–0.1", "Light", "Fixes own N; minimal fertilizer needed"],
                    ["Cucumber", "0.2–0.3", "Moderate", "Side-dress when vines run"],
                  ].map(([veg, n, type, note]) => (
                    <tr key={veg as string} className="even:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{veg}</td>
                      <td className="px-4 py-2">{n}</td>
                      <td className="px-4 py-2">{type}</td>
                      <td className="px-4 py-2 text-gray-500">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Organic vs Synthetic Fertilizers</h2>
            <p>Both organic and synthetic fertilizers can produce excellent results. The right choice depends on your goals, budget, and soil health philosophy.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Organic Fertilizers</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Improve soil structure over time</li>
                  <li>✓ Slow-release — lower burn risk</li>
                  <li>✓ Feed soil microbiome</li>
                  <li>✗ Lower nutrient concentration</li>
                  <li>✗ Slower to show results</li>
                  <li>✗ More expensive per unit of N</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">Examples: compost, blood meal, bone meal, fish emulsion</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Synthetic Fertilizers</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Precise, predictable nutrient ratios</li>
                  <li>✓ Fast-acting</li>
                  <li>✓ Cost-effective per unit of N</li>
                  <li>✗ Can burn plants if over-applied</li>
                  <li>✗ No benefit to soil biology</li>
                  <li>✗ Runoff risk if misapplied</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">Examples: urea (46-0-0), DAP (18-46-0), 10-10-10</p>
              </div>
            </div>
            <p className="mt-4">Many experienced gardeners use a combination: organic matter (compost) to build long-term soil health, and targeted synthetic fertilizers to address specific deficiencies during the season.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Application Tips</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Always water after applying granular fertilizer to activate it and prevent burn.</li>
              <li>Never apply fertilizer to dry, stressed plants — water first, then fertilize.</li>
              <li>Keep granules off leaves and stems to avoid chemical burn.</li>
              <li>Split large applications into two smaller ones, 2–3 weeks apart, for better uptake.</li>
              <li>Get a soil test every 2–3 years from your local Cooperative Extension office — it costs around $15–$25 and tells you exactly what your soil needs.</li>
            </ul>
          </section>

        </div>

        <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-xl">
          <h2 className="text-lg font-semibold text-green-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/tools/fertilizer-calculator" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200 hover:border-green-500 transition-colors">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="font-medium text-sm text-gray-900">Fertilizer Calculator</p>
                <p className="text-xs text-gray-500">Calculate exact fertilizer amounts by area</p>
              </div>
            </Link>
            <Link href="/tools/soil-ph-calculator" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200 hover:border-green-500 transition-colors">
              <span className="text-2xl">🧪</span>
              <div>
                <p className="font-medium text-sm text-gray-900">Soil pH Calculator</p>
                <p className="text-xs text-gray-500">Find lime or sulfur needed to adjust pH</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
