import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import FAQSection from "@/components/FAQSection";
import type { ToolFAQ } from "@/config/tools";

const CompostCalculator = dynamic(() => import("@/components/CompostCalculator"), {
  loading: () => (
    <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-lg p-6 font-mono text-[12px] uppercase tracking-[0.12em] text-soil">
      Loading compost calculator…
    </div>
  ),
});

const pageTitle = "Compost Calculator | Bag, Volume & Area Guide";
const pageDescription =
  "Compost calculator with cubic-yard formulas, raised-bed and lawn examples, Cornell C:N ratio table, and extension-based compost FAQ answers.";
const toolUrl = `${siteConfig.domain}/tools/compost-calculator`;

const materialRows = [
  { material: "Dry leaves",           ratio: "40-80:1",   type: "Brown", sourceUrl: "https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf" },
  { material: "Grass clippings",      ratio: "9-25:1",    type: "Green", sourceUrl: "https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf" },
  { material: "Coffee grounds",       ratio: "20:1",      type: "Green", sourceUrl: "https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf" },
  { material: "Food scraps",          ratio: "14-16:1",   type: "Green", sourceUrl: "https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf" },
  { material: "Sawdust",              ratio: "200-750:1", type: "Brown", sourceUrl: "https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf" },
  { material: "Straw",                ratio: "48-150:1",  type: "Brown", sourceUrl: "https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf" },
  { material: "Horse manure",         ratio: "22-50:1",   type: "Green", sourceUrl: "https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf" },
  { material: "Corrugated cardboard", ratio: "563:1",     type: "Brown", sourceUrl: "https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf" },
] as const;

const faqs: ToolFAQ[] = [
  {
    q: "What is the ideal carbon-to-nitrogen ratio for compost?",
    a: "A starting C:N ratio around 30:1 is the usual target for active composting. That range gives microbes enough carbon for energy and enough nitrogen for growth without pushing the pile into a smelly, ammonia-heavy state. Finished compost usually ends up much lower than the starting ratio because carbon is lost as carbon dioxide during decomposition.",
    sourceUrl: "https://extension.colostate.edu/resource/making-compost/",
    displayHtml: 'A starting <strong>C:N ratio around 30:1</strong> is the usual target for active composting. That range gives microbes enough carbon for energy and enough nitrogen for growth without pushing the pile into a smelly, ammonia-heavy state. Finished compost usually ends up much lower than the starting ratio because carbon is lost as carbon dioxide during decomposition. <a href="https://extension.colostate.edu/resource/making-compost/">Source</a>.',
  },
  {
    q: "What should I avoid putting in a home compost pile?",
    a: "Home compost piles should avoid meat, bones, grease, dairy products, pet feces, and diseased plant material unless your system is managed hot enough to kill pathogens reliably. Those materials either attract pests, create odor, or raise disease risk. A backyard pile is usually safest when it focuses on yard waste, fruit and vegetable scraps, coffee grounds, and similar plant-based feedstocks.",
    sourceUrl: "https://extension.umn.edu/managing-soil-and-nutrients/composting-home-gardens",
    displayHtml: 'Home compost piles should avoid <strong>meat, bones, grease, dairy products, pet feces, and diseased plant material</strong> unless your system is managed hot enough to kill pathogens reliably. Those materials either attract pests, create odor, or raise disease risk. A backyard pile is usually safest when it focuses on yard waste, fruit and vegetable scraps, coffee grounds, and similar plant-based feedstocks. <a href="https://extension.umn.edu/managing-soil-and-nutrients/composting-home-gardens">Source</a>.',
  },
  {
    q: "Why does compost smell bad or stay too wet?",
    a: "A sour or rotten smell usually means the pile is too wet, too compacted, or too nitrogen-heavy for the available air. The fix is usually to add dry browns, increase turning, and break up dense layers so oxygen can move back through the pile. Odor is often less of a “mystery problem” than a sign that the C:N balance, moisture level, or aeration slipped out of range.",
    sourceUrl: "https://extension.illinois.edu/composting/troubleshooting-composting-problems",
    displayHtml: 'A sour or rotten smell usually means the pile is <strong>too wet, too compacted, or too nitrogen-heavy for the available air</strong>. The fix is usually to add dry browns, increase turning, and break up dense layers so oxygen can move back through the pile. Odor is often less of a “mystery problem” than a sign that the C:N balance, moisture level, or aeration slipped out of range. <a href="https://extension.illinois.edu/composting/troubleshooting-composting-problems">Source</a>.',
  },
  {
    q: "How do I know when compost is finished and ready to use?",
    a: "Finished compost should look dark and crumbly, smell earthy instead of sour, and no longer show obvious pieces of the original feedstock. It may still cure after active heating stops, so many extension guides recommend giving it extra time before heavy use around sensitive roots. If the pile is still heating strongly or you can still identify many raw scraps, it is not finished yet.",
    sourceUrl: "https://extension.illinois.edu/composting/questions-about-composting",
    displayHtml: 'Finished compost should look <strong>dark and crumbly, smell earthy instead of sour, and no longer show obvious pieces of the original feedstock</strong>. It may still cure after active heating stops, so many extension guides recommend giving it extra time before heavy use around sensitive roots. If the pile is still heating strongly or you can still identify many raw scraps, it is not finished yet. <a href="https://extension.illinois.edu/composting/questions-about-composting">Source</a>.',
  },
  {
    q: "Should I turn the pile, cover it, or both?",
    a: "Turning and covering solve different problems. Turning restores oxygen and mixes wet and dry zones, while covering helps control excess rain and keeps moisture from swinging too far. In many backyard setups the best answer is both: turn when the pile compacts or cools, and cover when weather would otherwise soak the pile or leach nutrients out of it.",
    sourceUrl: "https://extension.oregonstate.edu/ask-extension/featured/composting-should-i-turn-cover-or-both",
    displayHtml: 'Turning and covering solve different problems. <strong>Turning restores oxygen and mixes wet and dry zones</strong>, while covering helps control excess rain and keeps moisture from swinging too far. In many backyard setups the best answer is both: turn when the pile compacts or cools, and cover when weather would otherwise soak the pile or leach nutrients out of it. <a href="https://extension.oregonstate.edu/ask-extension/featured/composting-should-i-turn-cover-or-both">Source</a>.',
  },
  {
    q: "Can I compost diseased plants such as powdery mildew material?",
    a: "You can compost some diseased plant material only if your system reliably reaches and holds temperatures high enough to suppress the disease. In cooler or loosely managed home piles, diseased material is riskier because pathogens may survive and move back into the garden later. If you cannot manage a hot pile consistently, it is safer to keep questionable material out of the finished compost stream.",
    sourceUrl: "https://extension.oregonstate.edu/ask-extension/featured/can-i-compost-plants-powdery-mildew",
    displayHtml: 'You can compost some diseased plant material only if your system reliably reaches and holds temperatures high enough to suppress the disease. In cooler or loosely managed home piles, diseased material is riskier because pathogens may survive and move back into the garden later. If you cannot manage a hot pile consistently, it is safer to keep questionable material out of the finished compost stream. <a href="https://extension.oregonstate.edu/ask-extension/featured/can-i-compost-plants-powdery-mildew">Source</a>.',
  },
];

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Compost Calculator",
  description: pageDescription,
  url: toolUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to use the Compost Calculator",
  step: [
    { "@type": "HowToStep", position: 1, text: "Start with the area or bin size you want to evaluate, then decide whether you are estimating finished compost volume or balancing a fresh pile." },
    { "@type": "HowToStep", position: 2, text: "Use the depth or bin-dimension inputs to estimate how many cubic feet or cubic yards of compost you need." },
    { "@type": "HowToStep", position: 3, text: "Add your greens and browns by material type to compare the current pile against the target C:N ratio." },
    { "@type": "HowToStep", position: 4, text: "Check the reference table and troubleshooting notes before adjusting moisture, aeration, or material mix." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: siteConfig.domain },
    { "@type": "ListItem", position: 2, name: "Tools",    item: `${siteConfig.domain}/tools` },
    { "@type": "ListItem", position: 3, name: "Compost Calculator", item: toolUrl },
  ],
};

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: toolUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: toolUrl,
    type: "website",
  },
};

export default function CompostCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-7 pb-24">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7">
          <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
          <span className="mx-2 opacity-50">/</span>
          <Link href="/tools" className="hover:text-moss-deep transition-colors duration-fast">Tools</Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-ink">Compost Calculator</span>
        </nav>

        {/* Page head */}
        <header className="pb-7 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
            Calculator · Composting
          </p>
          <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-3">
            Compost Calculator
          </h1>
          <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil max-w-[640px]">
            One page to estimate finished compost volume, translate depth into bag or cubic-yard needs, and check whether your browns and greens are close to a workable starting mix.
          </p>
        </header>

        {/* Quick answer — terracotta-left callout */}
        <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] border-l-[4px] border-l-terracotta rounded-md px-6 py-5 mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-terracotta mb-3">Quick Answer</p>
          <p className="font-serif text-[15px] leading-[1.7] text-ink mb-4">
            If your real question is <strong>how much compost do I need</strong>, start with area and depth, not bag marketing. For finished compost, cubic feet = square feet × depth in inches ÷ 12, and cubic yards = square feet × depth in inches ÷ 324. If your real question is the right starting pile blend, aim for roughly a 30:1 starting <strong>C:N ratio</strong> and adjust browns and greens from there.
          </p>
          <table className="w-full border-collapse tabular">
            <thead className="sr-only">
              <tr><th>Scenario</th><th>Formula</th><th>Meaning</th></tr>
            </thead>
            <tbody>
              {[
                ["Bed or lawn topdressing", "sq ft × depth (in) ÷ 12 = cubic feet",  "Best for raised-bed and lawn topdressing examples."],
                ["Bulk order estimate",      "sq ft × depth (in) ÷ 324 = cubic yards", "Use this when buying by the yard instead of the bag."],
                ["Bag count",                "cubic feet ÷ bag size (cu ft)",           "Turns the same volume into 1, 1.5, or 2-cu-ft bag counts."],
                ["Fast pile target",         "start near 30:1",                         "Keeps browns and greens near a practical starting ratio."],
              ].map(([label, formula, meaning]) => (
                <tr key={label} className="border-b border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)] last:border-0">
                  <td className="py-2.5 pr-5 font-serif italic text-soil text-[15px] w-[32%] align-top">{label}</td>
                  <td className="py-2.5 pr-5 font-mono text-[13px] text-ink w-[40%] align-top">{formula}</td>
                  <td className="py-2.5 font-serif text-[14px] text-soil align-top">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 font-serif text-[14px] leading-[1.7] text-ink">
            Example: a 4 × 8 raised bed is 32 sq ft. A 1-inch compost layer needs 32 × 1 ÷ 12 = 2.67 cubic feet, or about 1.78 bags if you buy 1.5-cu-ft bags. A 1,000-sq-ft lawn topdressed at 1/4 inch needs 1,000 × 0.25 ÷ 324 = 0.77 cubic yards.
          </p>
          <p className="mt-3 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)] font-mono text-[10px] uppercase tracking-[0.12em] text-soil [&_a]:text-moss-deep [&_a]:underline">
            Formula section is math-derived · compost ratio target supported by{" "}
            <a href="https://extension.colostate.edu/resource/making-compost/">Colorado State Extension</a>. Material C:N ratios quoted from{" "}
            <a href="https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf">Cornell Waste Management Institute Appendix A</a>.
          </p>
        </section>

        {/* Intro content */}
        <div className="almanac-prose font-serif text-[17px] leading-[1.75] text-ink mb-12">
          <section>
            <h2>What a compost calculator should help you estimate</h2>
            <p>A good compost calculator should solve two different problems that often get blurred together. The first problem is finished-compost demand: how much compost do I need for this bed, border, container refresh, or lawn topdressing job? That is a volume question. You already know your area and depth goal, and you need a clean conversion into cubic feet, cubic yards, or bag counts. The second problem is fresh-pile balance: what&apos;s the right compost ratio if I am building a pile from leaves, grass, food scraps, manure, and paper products? That is a recipe question built around browns and greens, moisture, and a workable C:N ratio.</p>
            <p>The current search landscape mixes those two intents under one phrase, which is why a single thin tool page usually underperforms. Some searchers want to buy compost and spread it. Others want to build compost from raw materials and need to know whether the pile is too wet, too dry, too carbon-heavy, or too nitrogen-heavy. This page is structured to keep those jobs separate enough to stay clear while still letting one <strong>compost calculator</strong> page answer both.</p>
          </section>

          <section>
            <h2>How much compost do I need for beds, lawns, and topdressing</h2>
            <p>The fastest way to estimate finished compost is to ignore the pile recipe for a moment and focus only on the application layer. One inch of compost over a bed is simply a thin volume spread across a flat area. That is why the key conversion is area multiplied by depth. Once you have cubic feet or cubic yards, you can decide whether a bagged product, a bulk delivery, or your own cured pile is the cheapest path.</p>
            <p>This matters for <strong>compost for raised bed</strong> planning because small beds can look modest but still consume several bags once you spread an even layer. It matters for <strong>compost for lawn</strong> topdressing because lawns multiply area so fast that a shallow fraction of an inch can still turn into a bulk order.</p>
          </section>

          <section>
            <h2>Compost volume conversions for cubic feet, cubic yards, and bag counts</h2>
            <p>Two conversions do nearly all the work on the volume side. First, cubic feet = square feet × depth in inches ÷ 12. Second, cubic yards = cubic feet ÷ 27, which is the same as square feet × depth in inches ÷ 324. Those formulas are enough to estimate a raised bed, a row block, a front-yard lawn strip, or any other rectangular planting area. If your shape is irregular, break it into rectangles, calculate each piece, and add them together.</p>
            <p>Bag counts are simply one more division problem. If your plan needs 5 cubic feet of compost and your local yard center sells 1.5-cubic-foot bags, then 5 ÷ 1.5 = 3.33, so you need 4 bags in practice. If you have a larger area, the cubic-yard number often reveals when bagged compost stops making sense.</p>
          </section>
        </div>

        {/* The widget (already styled) */}
        <div className="mb-14">
          <CompostCalculator />
        </div>

        {/* Post-widget content */}
        <div className="almanac-prose font-serif text-[17px] leading-[1.75] text-ink mb-12">
          <section>
            <h2>What&apos;s the right compost ratio for fast decomposition</h2>
            <p>Once the volume question is settled, the page can move into the second intent: what&apos;s the right compost ratio for the starting pile? Extension guidance usually points gardeners toward a starting <strong>C:N ratio</strong> around 30:1 because microbes need both carbon and nitrogen to work efficiently. If you drive the mixture too far toward nitrogen, the pile can smell like ammonia, mat down, and go short on oxygen. If you drive it too far toward carbon, decomposition slows and the pile can sit cool for weeks.</p>
            <p>This is why “greens versus browns” is a useful shortcut but not the whole story. Two brown materials can be very different from each other. Corrugated cardboard behaves very differently from leaves, and sawdust behaves very differently from straw. The same is true on the green side: coffee grounds, food scraps, and manures are not interchangeable once you look at their published C:N values.</p>
          </section>

          <section>
            <h2>Browns and greens: common compost materials and their C:N ratios</h2>
            <p>The table below is the anchor for the recipe side of this page. It turns vague ingredient labels into explicit ratio ranges you can compare. If your pile is heavy on leaves and cardboard, the carbon side will dominate and the pile may need more green material to wake up. If your pile is heavy on food scraps, grass clippings, or manure, it may need more dry structure to keep odor and moisture under control.</p>
            <table>
              <thead>
                <tr>
                  <th>Material</th>
                  <th>C:N ratio</th>
                  <th>Type</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {materialRows.map((row) => (
                  <tr key={row.material}>
                    <td>{row.material}</td>
                    <td className="tabular">{row.ratio}</td>
                    <td>
                      <span className={`font-mono text-[10px] uppercase tracking-[0.1em] ${row.type === "Green" ? "text-moss-deep" : "text-terracotta"}`}>
                        {row.type}
                      </span>
                    </td>
                    <td><a href={row.sourceUrl}>Cornell A.1</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="!text-[13px] !text-soil">All ratios above are quoted directly from Cornell Waste Management Institute Appendix A Table A.1. Ranges remain ranges; single values remain single values. No synthetic averaging was added for this page.</p>
          </section>

          <section>
            <h2>How to use finished compost without overapplying it</h2>
            <p>Finished compost is useful because it changes soil structure as much as it changes fertility. In a raised bed it can improve tilth, water holding, and root movement. In a lawn topdress it can soften surface compaction and add organic matter near the crown zone. Around established plantings it can act as a thin organic amendment layer without asking the gardener to till aggressively around roots. But none of that means “more is always better.”</p>
            <p>If you want a broader soil-building walkthrough after the math, the site&apos;s <Link href="/guides/composting-guide">composting guide</Link> is the next read. It is especially useful when you want to connect finished compost use back to pile-building strategy instead of treating them as separate chores.</p>
          </section>

          <section>
            <h2>Slow pile, bad smell, or soggy compost: what to fix first</h2>
            <p>Most backyard compost failures come from one of three imbalances: not enough oxygen, too much water, or a starting ingredient mix that swings too far toward one side of the C:N equation. A slow pile often points to too much carbon, not enough moisture, or not enough turning. A sour-smelling pile usually points to compaction, excess water, or too much nitrogen without enough structure.</p>
            <p>Start troubleshooting with the easiest observations. Does the pile smell earthy or unpleasant? Does it feel like a wrung-out sponge, or does water squeeze out easily? Are the materials fluffy enough for air to move, or are they matted together into a dense slab? For a longer breakdown of pile setup, curing, and feedstock selection, visit the <Link href="/guides/composting-guide">composting guide</Link>.</p>
          </section>
        </div>

        {/* FAQ */}
        <FAQSection faqs={faqs} />

        {/* Helpful next steps */}
        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[20px] tracking-tight text-moss-deep mb-5">
            Helpful next steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/guides/composting-guide" className="group block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-5 transition-colors duration-fast">
              <p className="font-serif font-semibold text-[16px] text-ink group-hover:text-moss-deep transition-colors duration-fast">Read the full composting guide</p>
              <p className="mt-1 font-serif text-[14px] leading-[1.6] text-soil">Step-by-step explanation of pile setup, turning, curing, and material selection.</p>
            </Link>
            <Link href="/tools/fertilizer-calculator" className="group block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-5 transition-colors duration-fast">
              <p className="font-serif font-semibold text-[16px] text-ink group-hover:text-moss-deep transition-colors duration-fast">Compare compost with fertilizer planning</p>
              <p className="mt-1 font-serif text-[14px] leading-[1.6] text-soil">Separate organic matter planning from nutrient-rate calculations in vegetable beds.</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
