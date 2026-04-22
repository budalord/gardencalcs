import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import GuideLayout from "@/components/GuideLayout";

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

const phChart: [string, string, string][] = [
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

const phBands: [string, string][] = [
  ["4.0", "Strongly acidic"],
  ["5.0", "Acidic"],
  ["6.0", "Slightly acidic"],
  ["7.0", "Neutral"],
  ["8.0", "Alkaline"],
  ["9.0", "Strongly alkaline"],
];

export default function SoilPhGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideLayout
        title="Understanding Soil pH for Beginners"
        dek="What it is, why it matters, and how to fix it — without a chemistry degree."
        topic="Soil"
        readTime="9 min"
      >
        <section>
          <h2>What is soil pH?</h2>
          <p>Soil pH is a measure of how acidic or alkaline your soil is, on a scale from 0 to 14. A pH of 7.0 is neutral. Values below 7.0 are acidic; values above 7.0 are alkaline (also called basic). Most garden soils fall between 5.0 and 8.0.</p>
          <p>The pH scale is logarithmic, which means each whole number represents a tenfold difference. A soil with pH 5.0 is ten times more acidic than pH 6.0, and one hundred times more acidic than pH 7.0. This is why small pH changes can have large effects on plant health.</p>

          {/* pH scale strip */}
          <div className="mt-5 rounded-md overflow-hidden border border-[color-mix(in_oklch,var(--soil)_25%,transparent)]"
               style={{ background: "linear-gradient(to right, oklch(0.65 0.18 25), oklch(0.72 0.15 55), oklch(0.78 0.14 85), oklch(0.72 0.16 145), oklch(0.6 0.14 230), oklch(0.5 0.17 260))" }}>
            <div className="grid grid-cols-6">
              {phBands.map(([n, label]) => (
                <div key={n} className="px-2 py-3 text-center border-r last:border-r-0 border-[color-mix(in_oklch,var(--cream)_50%,transparent)]">
                  <div className="font-mono font-semibold text-[13px] text-ink tabular">{n}</div>
                  <div className="font-sans text-[10px] uppercase tracking-[0.06em] text-ink/80 mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2>Why does soil pH matter?</h2>
          <p>Soil pH controls nutrient availability. Even if your soil is rich in nutrients, plants cannot absorb them if the pH is wrong. Here is why:</p>
          <ul>
            <li><strong>Nitrogen, phosphorus, and potassium</strong> are most available between pH 6.0 and 7.0. Outside this range, they become chemically bound to soil particles and unavailable to roots.</li>
            <li><strong>Iron and manganese</strong> become more soluble in acidic soils (below 5.5), sometimes reaching toxic levels.</li>
            <li><strong>Phosphorus</strong> is particularly sensitive — it locks up in both very acidic and very alkaline soils, causing deficiency even when plenty is present.</li>
            <li><strong>Soil microbes</strong> that break down organic matter and fix nitrogen thrive in the 6.0–7.0 range. Extreme pH suppresses microbial activity.</li>
          </ul>
          <p>The practical result: a plant growing in soil with the wrong pH will show nutrient deficiency symptoms (yellowing, stunted growth, poor fruiting) even if you fertilize heavily. Fixing the pH is often more effective than adding more fertilizer.</p>
        </section>

        <section>
          <h2>How to test your soil pH</h2>
          <p>There are three main ways to test soil pH, ranging from quick estimates to lab-accurate results:</p>
          <ol>
            <li><strong>Home test kit ($5–$15):</strong> Mix a soil sample with the provided solution and compare the color to a chart. Fast and cheap, but accuracy is ±0.5 pH units. Good for a rough baseline.</li>
            <li><strong>Digital pH meter ($15–$50):</strong> Insert the probe into moist soil for a digital reading. More accurate than test kits (±0.1–0.2 pH units) and reusable. Calibrate regularly with buffer solution.</li>
            <li><strong>Lab soil test ($15–$30):</strong> Send a sample to your local Cooperative Extension lab. Most accurate, and usually includes nutrient levels and amendment recommendations. Best for new gardens or persistent problems.</li>
          </ol>
          <p>For best results, collect samples from 3–5 spots in your garden, mix them together, and test the combined sample. Test in spring before planting or in fall after harvest.</p>
        </section>

        <section>
          <h2>Soil pH chart for common plants</h2>
          <p>Most vegetables and flowers prefer a slightly acidic to neutral pH (6.0–7.0). A few plants, like blueberries and azaleas, require strongly acidic conditions.</p>
          <table>
            <thead>
              <tr>
                <th>Plant</th>
                <th>Ideal pH range</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {phChart.map(([plant, range, cat]) => (
                <tr key={plant}>
                  <td>{plant}</td>
                  <td>{range}</td>
                  <td style={{ color: "var(--soil)" }}>{cat}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <aside className="almanac-callout">
            Know your current pH and target plant? Use our <Link href="/tools/soil-ph-calculator">Soil pH Calculator</Link> to find exactly how much lime or sulfur to apply.
          </aside>
        </section>

        <section>
          <h2>How to raise soil pH (too acidic)</h2>
          <p>If your soil pH is below your target, you need to add lime. The most common form is <strong>garden lime (calcium carbonate, CaCO₃)</strong>, also called agricultural lime or ground limestone.</p>
          <ul>
            <li>Apply in fall for best results — lime reacts slowly and needs time to work into the soil.</li>
            <li>Typical rates: 3–8 lbs per 100 sq ft per pH unit, depending on soil type (clay needs more, sandy needs less).</li>
            <li>Till or rake into the top 6 inches of soil, then water thoroughly.</li>
            <li>Retest after 2–3 months before applying more — overliming is difficult to reverse.</li>
          </ul>
        </section>

        <section>
          <h2>How to lower soil pH (too alkaline)</h2>
          <p>If your soil pH is above your target, you need to acidify it. The most effective amendment is <strong>elemental sulfur</strong>, which soil bacteria convert to sulfuric acid over several weeks.</p>
          <ul>
            <li>Apply in spring or fall when soil is moist and microbial activity is high.</li>
            <li>Typical rates: 1–2 lbs per 100 sq ft per pH unit (sandy soils need less, clay needs more).</li>
            <li>Do not apply more than 2 lbs per 100 sq ft at once — split large applications over several months.</li>
            <li>Acidification is slow — retest after 2–3 months.</li>
          </ul>
          <p>For blueberries and other acid-loving plants, also consider using acidic mulches like pine bark or pine needles, and watering with slightly acidified water in alkaline regions.</p>
          <aside className="almanac-callout">
            Not sure how much lime or sulfur to use? Our <Link href="/tools/soil-ph-calculator">Soil pH Calculator</Link> computes the exact amount based on your soil type, current pH, target pH, and garden area.
          </aside>
        </section>

        <section>
          <h2>Common mistakes to avoid</h2>
          <ul>
            <li><strong>Overliming:</strong> Raising pH too high locks out iron and manganese, causing yellowing (chlorosis). Always retest before applying more lime.</li>
            <li><strong>Expecting instant results:</strong> Both lime and sulfur work slowly. Allow 2–3 months before retesting.</li>
            <li><strong>Ignoring soil type:</strong> Clay soils have higher buffering capacity and need more amendment than sandy soils to achieve the same pH change.</li>
            <li><strong>Testing only once:</strong> Soil pH changes over time due to rainfall, fertilizer use, and organic matter decomposition. Test every 2–3 years.</li>
          </ul>
        </section>

        <section className="!mt-14 pt-10 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-terracotta !mt-0 mb-4">Related tools</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/tools/soil-ph-calculator" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">Soil pH Calculator</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Calculate lime or sulfur needed to adjust pH.</p>
            </Link>
            <Link href="/tools/fertilizer-calculator" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">Fertilizer Calculator</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Calculate exact fertilizer amounts by area.</p>
            </Link>
          </div>
        </section>
      </GuideLayout>
    </>
  );
}
