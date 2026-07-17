import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import GuideLayout from "@/components/GuideLayout";

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

// C:N values updated to mid-range Cornell CWMI Appendix A.1 figures.
// Manure entry split off the table — see /tools/compost-calculator for the
// raw-manure food-safety advisory and per-source C:N values.
const materials = [
  { name: "Grass Clippings", type: "green", cn: "17:1", notes: "Add in thin layers to prevent matting" },
  { name: "Food Scraps (veg/fruit)", type: "green", cn: "16:1", notes: "Bury in centre to deter pests" },
  { name: "Coffee Grounds", type: "green", cn: "20:1", notes: "Cap at 20–30% of greens by volume; concentrated coffee can suppress some seedlings (allelopathy)" },
  { name: "Green Leaves", type: "green", cn: "25:1", notes: "Great balance of N and C" },
  { name: "Dry Leaves", type: "brown", cn: "60:1", notes: "Shred for faster breakdown" },
  { name: "Straw", type: "brown", cn: "100:1", notes: "Good bulking agent; improves aeration" },
  { name: "Corn Stalks", type: "brown", cn: "67:1", notes: "Chop into 2–3 inch pieces" },
  { name: "Newspaper", type: "brown", cn: "175:1", notes: "Shred; avoid glossy paper" },
  { name: "Wood Chips", type: "brown", cn: "300:1", notes: "Best for slow cold composting" },
  { name: "Sawdust", type: "brown", cn: "475:1", notes: "Use untreated wood only" },
  { name: "Cardboard", type: "brown", cn: "450:1", notes: "Remove tape; tear into pieces" },
];

const troubleshooting = [
  { problem: "Pile smells like rotten eggs",   cause: "Too wet and anaerobic (no oxygen).",                           fix: "Turn the pile to add air. Add dry browns (straw, dry leaves) to absorb excess moisture. Ensure the bin has drainage." },
  { problem: "Pile smells like ammonia",        cause: "Too much nitrogen (greens).",                                   fix: "Add carbon-rich browns — dry leaves, cardboard, or straw. Turn the pile to release the ammonia gas." },
  { problem: "Pile is not heating up",          cause: "Too much carbon, too dry, or pile is too small for thermal mass.", fix: "Add fresh greens (grass clippings, food scraps). Water until the pile feels like a wrung-out sponge. Hot composting wants roughly 1 yd³ (≈ 3×3×3 ft) of mass; smaller piles still compost as cold piles, just slower (6–12 months versus 4–8 weeks)." },
  { problem: "Pile is attracting pests",        cause: "Meat, dairy, or oily food scraps; food scraps on the surface.", fix: "Never add meat, dairy, or cooked food. Bury food scraps in the centre of the pile. Use a bin with a lid or hardware cloth base." },
  { problem: "Compost is taking too long",      cause: "Wrong C:N balance, too dry, not turned, or materials too large.",  fix: "Chop or shred materials into 2–3 inch pieces. Turn every 1–2 weeks. Check moisture. Use the material table and pile-mix screen to review browns and greens." },
];

export default function CompostingGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideLayout
        title="Complete Guide to Composting at Home"
        dek="Turn kitchen scraps and yard waste into rich garden soil — no special equipment required."
        topic="Composting"
        readTime="12 min"
      >
        <section>
          <h2>What is composting?</h2>
          <p>Composting is the controlled decomposition of organic matter — food scraps, yard waste, and other biodegradable materials — into a dark, crumbly, nutrient-rich soil amendment called compost. It is one of the most effective things a home gardener can do: it improves soil structure, feeds soil microbes, retains moisture, and reduces the need for synthetic fertilizers.</p>
          <p>The process is driven by microorganisms (bacteria and fungi) that break down organic matter. Your job is to give them the right conditions: the correct balance of carbon and nitrogen, adequate moisture, and enough oxygen.</p>
        </section>

        <section>
          <h2>Greens vs browns: the foundation</h2>
          <p>Every compost pile is built from two types of materials.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-5">
            <div className="bg-paper border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-moss-deep mb-2">Greens · N-rich</p>
              <p className="font-serif text-[15px] leading-[1.55] text-ink">Fresh, moist materials high in nitrogen. They provide protein for microbes and speed up decomposition.</p>
              <p className="font-serif italic text-[13px] text-soil mt-2">Grass clippings, food scraps, coffee grounds, fresh manure, green leaves.</p>
            </div>
            <div className="bg-paper border border-[color-mix(in_oklch,var(--terracotta)_35%,transparent)] border-l-[4px] border-l-terracotta rounded-md p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-terracotta mb-2">Browns · C-rich</p>
              <p className="font-serif text-[15px] leading-[1.55] text-ink">Dry, fibrous materials high in carbon. They provide energy for microbes and create air pockets that keep the pile from compacting.</p>
              <p className="font-serif italic text-[13px] text-soil mt-2">Dry leaves, straw, cardboard, wood chips, newspaper.</p>
            </div>
          </div>
          <p>A common rule of thumb is a 3:1 ratio of browns to greens by volume. However, the more precise measure is the carbon-to-nitrogen (C:N) ratio of the combined pile.</p>
        </section>

        <section>
          <h2>The C:N ratio explained</h2>
          <p>The carbon-to-nitrogen ratio is the single most important factor in composting speed and quality. The ideal range for active composting is <strong>25:1 to 30:1</strong> — meaning 25–30 parts carbon for every 1 part nitrogen by weight.</p>
          <ul>
            <li><strong>Too much nitrogen (C:N below 20:1):</strong> The pile heats up fast but smells like ammonia. Nitrogen is lost as gas. Add more browns.</li>
            <li><strong>Too much carbon (C:N above 40:1):</strong> Decomposition slows dramatically. The pile stays cool and takes months or years to break down. Add more greens.</li>
            <li><strong>Ideal range (25:1–30:1):</strong> The pile heats to 130–160°F (55–70°C), kills weed seeds and pathogens, and produces finished compost in 4–8 weeks.</li>
          </ul>
          <aside className="almanac-callout">
            Not sure whether the pile is skewed toward browns or greens? Use the <Link href="/tools/compost-calculator">Compost Calculator</Link> to screen equal-volume parts and compare each ingredient with the published C:N reference table. The tool does not claim a lab-grade combined C:N result from wet weights.
          </aside>
        </section>

        <section>
          <h2>C:N ratios of common materials</h2>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Type</th>
                <th>C:N</th>
                <th>Tips</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.name}>
                  <td>{m.name}</td>
                  <td>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.1em] ${m.type === "green" ? "text-moss-deep" : "text-terracotta"}`}>
                      {m.type === "green" ? "Green" : "Brown"}
                    </span>
                  </td>
                  <td className="tabular">{m.cn}</td>
                  <td style={{ color: "var(--soil)" }}>{m.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Hot vs cold composting</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-4">
            <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-terracotta mb-2">Hot composting</p>
              <p className="font-serif font-semibold text-[18px] text-ink mb-3">4–8 weeks · hands-on</p>
              <ul className="list-none m-0 p-0 font-serif text-[14px] leading-[1.55] text-ink space-y-1">
                <li>— Finished in 4–8 weeks</li>
                <li>— Kills weed seeds and pathogens</li>
                <li>— Higher quality compost</li>
                <li className="text-soil">— Requires turning every 1–2 weeks</li>
                <li className="text-soil">— Needs correct C:N ratio and moisture</li>
              </ul>
            </div>
            <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-md p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-moss-deep mb-2">Cold composting</p>
              <p className="font-serif font-semibold text-[18px] text-ink mb-3">3–6 months · hands-off</p>
              <ul className="list-none m-0 p-0 font-serif text-[14px] leading-[1.55] text-ink space-y-1">
                <li>— Minimal effort — just pile and wait</li>
                <li>— Good for small amounts of material</li>
                <li>— No turning required</li>
                <li className="text-soil">— Takes 3–6 months or longer</li>
                <li className="text-soil">— May not kill weed seeds</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2>Troubleshooting common problems</h2>
          <div className="not-prose space-y-4 my-4">
            {troubleshooting.map(({ problem, cause, fix }) => (
              <div key={problem} className="border-l-2 border-terracotta pl-4 py-1">
                <p className="font-serif font-semibold text-[16px] text-ink">{problem}</p>
                <p className="font-serif text-[14px] leading-[1.6] text-soil mt-1"><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-terracotta">Cause</span> — {cause}</p>
                <p className="font-serif text-[14px] leading-[1.6] text-ink mt-1"><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-moss-deep">Fix</span> — {fix}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>What NOT to compost</h2>
          <ul>
            <li>Meat, fish, and bones — attract rodents and create odours.</li>
            <li>Dairy products and oily foods — same issues as meat.</li>
            <li>Pet waste (dogs, cats) — may contain pathogens harmful to humans.</li>
            <li>Diseased plants — pathogens may survive cold composting.</li>
            <li>Treated wood or sawdust — may contain toxic preservatives.</li>
            <li>Invasive weeds that have gone to seed — seeds may survive and spread.</li>
            <li>Glossy or coated paper — does not break down well.</li>
          </ul>
        </section>

        <section>
          <h2>How to use finished compost</h2>
          <p>Finished compost is dark, crumbly, and smells earthy — like a forest floor. It should not smell like the original materials. Here is how to use it:</p>
          <ul>
            <li><strong>Soil amendment:</strong> Mix 2–4 inches into the top 6–8 inches of garden beds before planting.</li>
            <li><strong>Mulch:</strong> Apply 1–2 inches around plants to retain moisture and suppress weeds.</li>
            <li><strong>Potting mix:</strong> Blend up to 30% compost with potting soil for containers.</li>
            <li><strong>Lawn top-dressing:</strong> Spread a thin layer (¼ inch) over lawn in spring or fall to improve soil health.</li>
          </ul>
        </section>

        <section className="!mt-14 pt-10 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-terracotta !mt-0 mb-4">Related tools</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/tools/compost-calculator" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">How much compost do I need? Compost calculator</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Cubic yards, bag count, and depth for raised beds and lawns; plus C:N ratios for 20 materials.</p>
            </Link>
            <Link href="/tools/seed-spacing-calculator" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">Vegetable seed spacing calculator</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Estimate bed area and plant count before deciding how much finished compost to spread.</p>
            </Link>
            <Link href="/tools/soil-ph-calculator" className="block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-4 transition-colors duration-fast !border-b">
              <p className="font-serif font-semibold text-[16px] text-ink">Soil pH calculator for vegetable beds</p>
              <p className="font-serif text-[14px] leading-[1.5] text-soil mt-1">Check whether compost-amended beds still need lime or sulfur for the crop you want to grow.</p>
            </Link>
          </div>
        </section>
      </GuideLayout>
    </>
  );
}
