import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Complete Guide to Composting at Home",
  description:
    "Learn how to compost at home — greens vs browns, the ideal C:N ratio, how to build a compost pile, and how to troubleshoot common problems like bad smells and slow decomposition.",
  keywords: [
    "composting guide for beginners",
    "how to compost at home",
    "compost carbon nitrogen ratio",
    "green and brown compost materials",
    "compost troubleshooting",
    "hot composting vs cold composting",
  ],
  alternates: {
    canonical: `${siteConfig.domain}/guides/composting-guide`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Complete Guide to Composting at Home",
  description:
    "Learn how to compost at home — greens vs browns, the ideal C:N ratio, how to build a compost pile, and how to troubleshoot common problems.",
  url: `${siteConfig.domain}/guides/composting-guide`,
  author: { "@type": "Organization", name: siteConfig.name },
  publisher: { "@type": "Organization", name: siteConfig.name },
};

const materials = [
  { name: "Grass Clippings", type: "green", cn: "20:1", notes: "Add in thin layers to prevent matting" },
  { name: "Food Scraps (veg/fruit)", type: "green", cn: "15:1", notes: "Bury in center to deter pests" },
  { name: "Coffee Grounds", type: "green", cn: "20:1", notes: "Excellent activator; use freely" },
  { name: "Fresh Manure", type: "green", cn: "15:1", notes: "Chicken, cow, horse — not pet waste" },
  { name: "Green Leaves", type: "green", cn: "25:1", notes: "Great balance of N and C" },
  { name: "Dry Leaves", type: "brown", cn: "60:1", notes: "Shred for faster breakdown" },
  { name: "Straw", type: "brown", cn: "80:1", notes: "Good bulking agent; improves aeration" },
  { name: "Cardboard", type: "brown", cn: "350:1", notes: "Remove tape; tear into pieces" },
  { name: "Wood Chips", type: "brown", cn: "400:1", notes: "Best for slow cold composting" },
  { name: "Sawdust", type: "brown", cn: "325:1", notes: "Use untreated wood only" },
  { name: "Newspaper", type: "brown", cn: "175:1", notes: "Shred; avoid glossy paper" },
  { name: "Corn Stalks", type: "brown", cn: "75:1", notes: "Chop into 2–3 inch pieces" },
];

export default function CompostingGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/guides" className="text-sm text-green-700 hover:underline">← All Guides</Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Guide to Composting at Home</h1>
        <p className="text-gray-500 text-sm mb-8">Turn kitchen scraps and yard waste into rich garden soil — no special equipment required.</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What Is Composting?</h2>
            <p>Composting is the controlled decomposition of organic matter — food scraps, yard waste, and other biodegradable materials — into a dark, crumbly, nutrient-rich soil amendment called compost. It is one of the most effective things a home gardener can do: it improves soil structure, feeds soil microbes, retains moisture, and reduces the need for synthetic fertilizers.</p>
            <p className="mt-3">The process is driven by microorganisms (bacteria and fungi) that break down organic matter. Your job is to give them the right conditions: the correct balance of carbon and nitrogen, adequate moisture, and enough oxygen.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Greens vs Browns: The Foundation of Composting</h2>
            <p>Every compost pile is built from two types of materials:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">🟢 Greens (Nitrogen-Rich)</h3>
                <p className="text-sm text-gray-700">Fresh, moist materials high in nitrogen. They provide protein for microbes and speed up decomposition.</p>
                <p className="text-xs text-gray-500 mt-2">Examples: grass clippings, food scraps, coffee grounds, fresh manure, green leaves</p>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-amber-900 mb-2">🟤 Browns (Carbon-Rich)</h3>
                <p className="text-sm text-gray-700">Dry, fibrous materials high in carbon. They provide energy for microbes and create air pockets that keep the pile from compacting.</p>
                <p className="text-xs text-gray-500 mt-2">Examples: dry leaves, straw, cardboard, wood chips, newspaper</p>
              </div>
            </div>
            <p className="mt-4">A common rule of thumb is a 3:1 ratio of browns to greens by volume. However, the more precise measure is the carbon-to-nitrogen (C:N) ratio of the combined pile.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The C:N Ratio Explained</h2>
            <p>The carbon-to-nitrogen ratio (C:N ratio) is the single most important factor in composting speed and quality. The ideal range for active composting is <strong>25:1 to 30:1</strong> — meaning 25–30 parts carbon for every 1 part nitrogen by weight.</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Too much nitrogen (C:N below 20:1):</strong> The pile heats up fast but smells like ammonia. Nitrogen is lost as gas. Add more browns.</li>
              <li><strong>Too much carbon (C:N above 40:1):</strong> Decomposition slows dramatically. The pile stays cool and takes months or years to break down. Add more greens.</li>
              <li><strong>Ideal range (25:1–30:1):</strong> The pile heats to 130–160°F (55–70°C), kills weed seeds and pathogens, and produces finished compost in 4–8 weeks.</li>
            </ul>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
              Not sure if your pile has the right ratio? Use our <Link href="/tools/compost-calculator" className="text-green-700 font-medium hover:underline">Compost Calculator</Link> to calculate your current C:N ratio and get a recommendation for how much to add to balance it.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">C:N Ratios of Common Materials</h2>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-800 text-white">
                    <th className="text-left px-4 py-2">Material</th>
                    <th className="text-left px-4 py-2">Type</th>
                    <th className="text-left px-4 py-2">C:N Ratio</th>
                    <th className="text-left px-4 py-2">Tips</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {materials.map((m) => (
                    <tr key={m.name} className="even:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{m.name}</td>
                      <td className="px-4 py-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.type === "green" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                          {m.type}
                        </span>
                      </td>
                      <td className="px-4 py-2">{m.cn}</td>
                      <td className="px-4 py-2 text-gray-500">{m.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Hot vs Cold Composting</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">🔥 Hot Composting</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Finished in 4–8 weeks</li>
                  <li>✓ Kills weed seeds and pathogens</li>
                  <li>✓ Higher quality compost</li>
                  <li>✗ Requires turning every 1–2 weeks</li>
                  <li>✗ Needs correct C:N ratio and moisture</li>
                  <li>✗ More active management</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">❄️ Cold Composting</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Minimal effort — just pile and wait</li>
                  <li>✓ Good for small amounts of material</li>
                  <li>✓ No turning required</li>
                  <li>✗ Takes 3–6 months or longer</li>
                  <li>✗ May not kill weed seeds</li>
                  <li>✗ Less predictable results</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Troubleshooting Common Compost Problems</h2>
            <div className="space-y-4 mt-2">
              {[
                {
                  problem: "Pile smells like rotten eggs",
                  cause: "Too wet and anaerobic (no oxygen)",
                  fix: "Turn the pile to add air. Add dry browns (straw, dry leaves) to absorb excess moisture. Ensure the bin has drainage.",
                },
                {
                  problem: "Pile smells like ammonia",
                  cause: "Too much nitrogen (greens)",
                  fix: "Add carbon-rich browns — dry leaves, cardboard, or straw. Turn the pile to release the ammonia gas.",
                },
                {
                  problem: "Pile is not heating up",
                  cause: "Too much carbon, too dry, or pile is too small",
                  fix: "Add fresh greens (grass clippings, food scraps). Water until the pile feels like a wrung-out sponge. Ensure the pile is at least 3×3×3 ft — smaller piles cannot retain heat.",
                },
                {
                  problem: "Pile is attracting pests",
                  cause: "Meat, dairy, or oily food scraps; food scraps on the surface",
                  fix: "Never add meat, dairy, or cooked food. Bury food scraps in the center of the pile. Use a bin with a lid or hardware cloth base.",
                },
                {
                  problem: "Compost is taking too long",
                  cause: "Wrong C:N ratio, too dry, not turned, or materials too large",
                  fix: "Chop or shred materials into 2–3 inch pieces. Turn every 1–2 weeks. Check moisture. Adjust C:N ratio using the Compost Calculator.",
                },
              ].map(({ problem, cause, fix }) => (
                <div key={problem} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="font-semibold text-gray-900 text-sm">⚠ {problem}</p>
                  <p className="text-sm text-gray-500 mt-1"><strong>Cause:</strong> {cause}</p>
                  <p className="text-sm text-gray-700 mt-1"><strong>Fix:</strong> {fix}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What NOT to Compost</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Meat, fish, and bones — attract rodents and create odors</li>
              <li>Dairy products and oily foods — same issues as meat</li>
              <li>Pet waste (dogs, cats) — may contain pathogens harmful to humans</li>
              <li>Diseased plants — pathogens may survive cold composting</li>
              <li>Treated wood or sawdust — may contain toxic preservatives</li>
              <li>Invasive weeds that have gone to seed — seeds may survive and spread</li>
              <li>Glossy or coated paper — does not break down well</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Use Finished Compost</h2>
            <p>Finished compost is dark, crumbly, and smells earthy — like a forest floor. It should not smell like the original materials. Here is how to use it:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Soil amendment:</strong> Mix 2–4 inches into the top 6–8 inches of garden beds before planting.</li>
              <li><strong>Mulch:</strong> Apply 1–2 inches around plants to retain moisture and suppress weeds.</li>
              <li><strong>Potting mix:</strong> Blend up to 30% compost with potting soil for containers.</li>
              <li><strong>Lawn top-dressing:</strong> Spread a thin layer (¼ inch) over lawn in spring or fall to improve soil health.</li>
            </ul>
          </section>

        </div>

        <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-xl">
          <h2 className="text-lg font-semibold text-green-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/tools/compost-calculator" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200 hover:border-green-500 transition-colors">
              <span className="text-2xl">♻️</span>
              <div>
                <p className="font-medium text-sm text-gray-900">Compost Calculator</p>
                <p className="text-xs text-gray-500">Calculate C:N ratio and get balancing tips</p>
              </div>
            </Link>
            <Link href="/tools/fertilizer-calculator" className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200 hover:border-green-500 transition-colors">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="font-medium text-sm text-gray-900">Fertilizer Calculator</p>
                <p className="text-xs text-gray-500">Calculate fertilizer amounts for your garden</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
