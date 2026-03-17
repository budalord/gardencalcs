import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Understanding Soil pH for Beginners",
  description:
    "Learn what soil pH is, why it matters for plant growth, how to test it, and how to adjust it with lime or sulfur. Includes a soil pH chart for common plants.",
  keywords: [
    "soil ph for beginners",
    "what is soil ph",
    "soil ph chart",
    "how to test soil ph",
    "how to adjust soil ph",
    "lime vs sulfur soil",
  ],
  alternates: {
    canonical: `${siteConfig.domain}/guides/understanding-soil-ph`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Understanding Soil pH for Beginners",
  description:
    "Learn what soil pH is, why it matters for plant growth, how to test it, and how to adjust it with lime or sulfur.",
  url: `${siteConfig.domain}/guides/understanding-soil-ph`,
  author: { "@type": "Organization", name: siteConfig.name },
  publisher: { "@type": "Organization", name: siteConfig.name },
};

const phChart = [
  ["Blueberry", "4.5–5.5", "Strongly acidic"],
  ["Potato", "4.8–5.5", "Acidic"],
  ["Azalea / Rhododendron", "4.5–5.5", "Strongly acidic"],
  ["Strawberry", "5.5–6.5", "Slightly acidic"],
  ["Tomato", "6.0–6.8", "Slightly acidic"],
  ["Pepper", "6.0–6.8", "Slightly acidic"],
  ["Carrot", "6.0–6.8", "Slightly acidic"],
  ["Cucumber", "6.0–7.0", "Neutral-acidic"],
  ["Lettuce", "6.0–7.0", "Neutral-acidic"],
  ["Spinach", "6.0–7.0", "Neutral-acidic"],
  ["Rose", "6.0–6.5", "Slightly acidic"],
  ["Lawn Grass", "6.0–7.0", "Neutral-acidic"],
];

export default function SoilPhGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/guides" className="text-sm text-green-700 hover:underline">← All Guides</Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Understanding Soil pH for Beginners</h1>
        <p className="text-gray-500 text-sm mb-8">What it is, why it matters, and how to fix it — without a chemistry degree.</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What Is Soil pH?</h2>
            <p>Soil pH is a measure of how acidic or alkaline your soil is, on a scale from 0 to 14. A pH of 7.0 is neutral. Values below 7.0 are acidic; values above 7.0 are alkaline (also called basic). Most garden soils fall between 5.0 and 8.0.</p>
            <p className="mt-3">The pH scale is logarithmic, which means each whole number represents a tenfold difference. A soil with pH 5.0 is ten times more acidic than pH 6.0, and one hundred times more acidic than pH 7.0. This is why small pH changes can have large effects on plant health.</p>
            <div className="mt-4 flex items-center gap-0 rounded-lg overflow-hidden text-xs font-medium text-center">
              {[["4.0","Strongly\nAcidic","bg-red-200"],["5.0","Acidic","bg-orange-200"],["6.0","Slightly\nAcidic","bg-yellow-200"],["7.0","Neutral","bg-green-200"],["8.0","Alkaline","bg-blue-200"],["9.0","Strongly\nAlkaline","bg-purple-200"]].map(([val, label, color]) => (
                <div key={val} className={`flex-1 py-3 ${color}`}>
                  <div className="font-bold">{val}</div>
                  <div className="text-gray-600 whitespace-pre-line leading-tight mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Why Does Soil pH Matter?</h2>
            <p>Soil pH controls nutrient availability. Even if your soil is rich in nutrients, plants cannot absorb them if the pH is wrong. Here is why:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Nitrogen, phosphorus, and potassium</strong> are most available between pH 6.0 and 7.0. Outside this range, they become chemically bound to soil particles and unavailable to roots.</li>
              <li><strong>Iron and manganese</strong> become more soluble in acidic soils (below 5.5), sometimes reaching toxic levels.</li>
              <li><strong>Phosphorus</strong> is particularly sensitive — it locks up in both very acidic and very alkaline soils, causing deficiency even when plenty is present.</li>
              <li><strong>Soil microbes</strong> that break down organic matter and fix nitrogen thrive in the 6.0–7.0 range. Extreme pH suppresses microbial activity.</li>
            </ul>
            <p className="mt-3">The practical result: a plant growing in soil with the wrong pH will show nutrient deficiency symptoms (yellowing, stunted growth, poor fruiting) even if you fertilize heavily. Fixing the pH is often more effective than adding more fertilizer.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Test Your Soil pH</h2>
            <p>There are three main ways to test soil pH, ranging from quick estimates to lab-accurate results:</p>
            <ol className="list-decimal pl-6 mt-3 space-y-3">
              <li>
                <strong>Home test kit ($5–$15):</strong> Mix a soil sample with the provided solution and compare the color to a chart. Fast and cheap, but accuracy is ±0.5 pH units. Good for a rough baseline.
              </li>
              <li>
                <strong>Digital pH meter ($15–$50):</strong> Insert the probe into moist soil for a digital reading. More accurate than test kits (±0.1–0.2 pH units) and reusable. Calibrate regularly with buffer solution.
              </li>
              <li>
                <strong>Lab soil test ($15–$30):</strong> Send a sample to your local Cooperative Extension lab. Most accurate, and usually includes nutrient levels and amendment recommendations. Best for new gardens or persistent problems.
              </li>
            </ol>
            <p className="mt-3">For best results, collect samples from 3–5 spots in your garden, mix them together, and test the combined sample. Test in spring before planting or in fall after harvest.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Soil pH Chart for Common Plants</h2>
            <p>Most vegetables and flowers prefer a slightly acidic to neutral pH (6.0–7.0). A few plants, like blueberries and azaleas, require strongly acidic conditions.</p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-800 text-white">
                    <th className="text-left px-4 py-2">Plant</th>
                    <th className="text-left px-4 py-2">Ideal pH Range</th>
                    <th className="text-left px-4 py-2">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {phChart.map(([plant, range, cat]) => (
                    <tr key={plant} className="even:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{plant}</td>
                      <td className="px-4 py-2">{range}</td>
                      <td className="px-4 py-2 text-gray-500">{cat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
              Know your current pH and target plant? Use our <Link href="/tools/soil-ph-calculator" className="text-green-700 font-medium hover:underline">Soil pH Calculator</Link> to find exactly how much lime or sulfur to apply.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Raise Soil pH (Too Acidic)</h2>
            <p>If your soil pH is below your target, you need to add lime. The most common form is <strong>garden lime (calcium carbonate, CaCO₃)</strong>, also called agricultural lime or ground limestone.</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Apply in fall for best results — lime reacts slowly and needs time to work into the soil.</li>
              <li>Typical rates: 3–8 lbs per 100 sq ft per pH unit, depending on soil type (clay needs more, sandy needs less).</li>
              <li>Till or rake into the top 6 inches of soil, then water thoroughly.</li>
              <li>Retest after 2–3 months before applying more — overliming is difficult to reverse.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Lower Soil pH (Too Alkaline)</h2>
            <p>If your soil pH is above your target, you need to acidify it. The most effective amendment is <strong>elemental sulfur</strong>, which soil bacteria convert to sulfuric acid over several weeks.</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Apply in spring or fall when soil is moist and microbial activity is high.</li>
              <li>Typical rates: 1–2 lbs per 100 sq ft per pH unit (sandy soils need less, clay needs more).</li>
              <li>Do not apply more than 2 lbs per 100 sq ft at once — split large applications over several months.</li>
              <li>Acidification is slow — retest after 2–3 months.</li>
            </ul>
            <p className="mt-3">For blueberries and other acid-loving plants, also consider using acidic mulches like pine bark or pine needles, and watering with slightly acidified water in alkaline regions.</p>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
              Not sure how much lime or sulfur to use? Our <Link href="/tools/soil-ph-calculator" className="text-green-700 font-medium hover:underline">Soil pH Calculator</Link> calculates the exact amount based on your soil type, current pH, target pH, and garden area.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Common Mistakes to Avoid</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Overliming:</strong> Raising pH too high locks out iron and manganese, causing yellowing (chlorosis). Always retest before applying more lime.</li>
              <li><strong>Expecting instant results:</strong> Both lime and sulfur work slowly. Allow 2–3 months before retesting.</li>
              <li><strong>Ignoring soil type:</strong> Clay soils have higher buffering capacity and need more amendment than sandy soils to achieve the same pH change.</li>
              <li><strong>Testing only once:</strong> Soil pH changes over time due to rainfall, fertilizer use, and organic matter decomposition. Test every 2–3 years.</li>
            </ul>
          </section>

        </div>

        <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-xl">
          <h2 className="text-lg font-semibold text-green-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/tools/soil-ph-calculator" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200 hover:border-green-500 transition-colors">
              <span className="text-2xl">🧪</span>
              <div>
                <p className="font-medium text-sm text-gray-900">Soil pH Calculator</p>
                <p className="text-xs text-gray-500">Calculate lime or sulfur needed to adjust pH</p>
              </div>
            </Link>
            <Link href="/tools/fertilizer-calculator" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200 hover:border-green-500 transition-colors">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="font-medium text-sm text-gray-900">Fertilizer Calculator</p>
                <p className="text-xs text-gray-500">Calculate exact fertilizer amounts by area</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
