import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import { siteConfig } from "@/config/site";
import type { ToolFAQ } from "@/config/tools";

const CompostCalculator = dynamic(() => import("@/components/CompostCalculator"), {
  loading: () => (
    <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-lg p-6 font-mono text-[12px] uppercase tracking-[0.12em] text-soil">
      Loading compost calculator…
    </div>
  ),
});

const answerUrl = `${siteConfig.domain}/answers/how-much-compost-for-raised-bed`;
const extensionSourceUrl = "https://extension.umn.edu/managing-soil-and-nutrients/composting-home-gardens";
const pageTitle = "How Much Compost for a Raised Bed? 4×8 Example";
const pageDescription =
  "Calculate compost volume and bag count for a raised bed. Follow a math-derived 4×8 example, then enter your own area, depth, and bag size.";

const example = {
  lengthFeet: 4,
  widthFeet: 8,
  depthInches: 1,
  bagSizeCubicFeet: 1.5,
};
const exampleArea = example.lengthFeet * example.widthFeet;
const exampleCubicFeet = exampleArea * (example.depthInches / 12);
const exampleCubicYards = exampleCubicFeet / 27;
const exampleCubicMeters = exampleCubicFeet / 35.3146667;
const exampleExactBags = exampleCubicFeet / example.bagSizeCubicFeet;
const exampleWholeBags = Math.ceil(exampleExactBags);

const bagRows = [1, 1.5, 2].map((capacity) => ({
  capacity,
  exact: exampleCubicFeet / capacity,
  whole: Math.ceil(exampleCubicFeet / capacity),
}));

const faqs: ToolFAQ[] = [
  {
    q: "What is the formula for compost volume in a raised bed?",
    a: "Multiply the bed's surface area in square feet by the chosen layer depth in inches, then divide by 12 to get cubic feet. Divide cubic feet by 27 to get cubic yards. These are geometry conversions, not a recommendation for how deep to apply compost.",
    displayHtml: "Multiply the bed's surface area in square feet by the chosen layer depth in inches, then divide by <strong>12</strong> to get cubic feet. Divide cubic feet by <strong>27</strong> to get cubic yards. These are geometry conversions, not a recommendation for how deep to apply compost.",
  },
  {
    q: "How many bags does a 4 × 8 raised bed need?",
    a: "It depends on the layer depth and the bag capacity. With the worked-example assumptions on this page—a 1-inch layer and 1.5-cubic-foot bags—the math is 2.67 ÷ 1.5 = 1.78, which rounds up to 2 whole bags.",
    displayHtml: "It depends on the layer depth and the bag capacity. With the worked-example assumptions on this page—a <strong>1-inch layer</strong> and <strong>1.5-cubic-foot bags</strong>—the math is 2.67 ÷ 1.5 = 1.78, which rounds up to <strong>2 whole bags</strong>.",
  },
  {
    q: "Is the 1-inch depth in this example a recommendation?",
    a: "No. One inch is only an input chosen to make the worked calculation concrete. Choose an application depth for your soil, crop, and purpose using a soil test, product directions, or local extension guidance, then enter that depth in the calculator.",
    displayHtml: "No. <strong>One inch is only an example input</strong> chosen to make the calculation concrete. Choose an application depth for your soil, crop, and purpose using a soil test, product directions, or local extension guidance, then enter that depth in the calculator.",
  },
  {
    q: "Can I calculate with metric bags sold in liters?",
    a: "Yes. Choose Metric in the calculator, enter area in square meters, depth in centimeters, and the bag capacity in liters. The calculator converts the result to cubic meters, cubic feet, cubic yards, and a whole bag count.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: answerUrl,
  mainEntityOfPage: answerUrl,
  author: { "@type": "Organization", name: siteConfig.name },
  publisher: { "@type": "Organization", name: siteConfig.name },
  isBasedOn: {
    "@type": "CreativeWork",
    name: "University of Minnesota Extension — Composting in home gardens",
    url: extensionSourceUrl,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
    { "@type": "ListItem", position: 2, name: "Compost Calculator", item: `${siteConfig.domain}/tools/compost-calculator` },
    { "@type": "ListItem", position: 3, name: "How Much Compost for a Raised Bed?", item: answerUrl },
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

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: answerUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "article",
    url: answerUrl,
  },
};

function decimal(value: number, digits: number) {
  return value.toFixed(digits).replace(/\.0+$/, "");
}

export default function RaisedBedCompostAnswerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-7 pb-24">
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7">
          <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
          <span className="mx-2 opacity-50">/</span>
          <Link href="/tools/compost-calculator" className="hover:text-moss-deep transition-colors duration-fast">Compost calculator</Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-ink">Raised-bed compost amount</span>
        </nav>

        <header className="pb-7 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">
            Worked answer · Math-derived
          </p>
          <h1 className="font-serif font-semibold text-[36px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-3">
            How much compost for a raised bed?
          </h1>
          <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil max-w-[640px]">
            Convert bed area and your chosen layer depth into cubic feet, cubic yards, cubic meters, and whole bags.
          </p>
        </header>

        <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] border-l-[4px] border-l-terracotta rounded-md px-5 sm:px-6 py-5 mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-terracotta mb-3">Direct answer</p>
          <p className="font-serif text-[16px] leading-[1.7] text-ink">
            Multiply the bed&apos;s surface area by the compost depth you have chosen. In a worked 4 × 8 ft example, the area is 32 sq ft. At an <strong>example depth of 1 inch</strong>, the bed needs <strong>{decimal(exampleCubicFeet, 2)} cubic feet</strong>, {decimal(exampleCubicYards, 3)} cubic yards, or {decimal(exampleCubicMeters, 3)} cubic meters. With example 1.5-cu-ft bags, {decimal(exampleExactBags, 2)} rounds up to <strong>{exampleWholeBags} whole bags</strong>.
          </p>
          <p className="mt-3 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)] font-mono text-[10px] uppercase tracking-[0.1em] leading-[1.6] text-soil">
            The 1-inch layer and 1.5-cu-ft bag are example inputs, not application recommendations. Choose a real application depth from a soil test, product directions, or local guidance such as the <a href={extensionSourceUrl} className="text-moss-deep underline underline-offset-2">University of Minnesota Extension compost guide</a>.
          </p>
        </section>

        <div className="almanac-prose font-serif text-[17px] leading-[1.75] text-ink mb-12">
          <section>
            <h2>The raised-bed compost formula</h2>
            <ol>
              <li>Surface area: length × width.</li>
              <li>Cubic feet: area in square feet × depth in inches ÷ 12.</li>
              <li>Cubic yards: cubic feet ÷ 27.</li>
              <li>Whole bags: round up (cubic feet ÷ capacity of one bag).</li>
            </ol>
            <p>Choose the depth for your actual soil and purpose first. The formulas only convert that decision into purchase quantities.</p>
          </section>

          <section>
            <h2>Worked example: a 4 × 8 raised bed</h2>
            <div className="not-prose my-5 overflow-hidden rounded-md border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] bg-paper">
              <dl className="divide-y divide-dashed divide-[color-mix(in_oklch,var(--soil)_30%,transparent)] font-sans text-[14px]">
                {[
                  ["Area", `${example.lengthFeet} ft × ${example.widthFeet} ft = ${exampleArea} sq ft`],
                  ["Cubic feet", `${exampleArea} × ${example.depthInches} ÷ 12 = ${decimal(exampleCubicFeet, 2)} ft³`],
                  ["Cubic yards", `${decimal(exampleCubicFeet, 2)} ÷ 27 = ${decimal(exampleCubicYards, 3)} yd³`],
                  ["Cubic meters", `${decimal(exampleCubicFeet, 2)} ÷ 35.3147 = ${decimal(exampleCubicMeters, 3)} m³`],
                  ["1.5-cu-ft bags", `${decimal(exampleCubicFeet, 2)} ÷ 1.5 = ${decimal(exampleExactBags, 2)} → ${exampleWholeBags} bags`],
                ].map(([label, calculation]) => (
                  <div key={label} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-1 sm:gap-4 px-4 py-3">
                    <dt className="font-medium text-soil">{label}</dt>
                    <dd className="m-0 font-mono tabular text-[13px] text-ink">{calculation}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section>
            <h2>Convert the same example into bag counts</h2>
            <p>Bag capacity changes the shopping count even when the bed volume stays the same. Always round the division result up to a whole bag.</p>
            <div className="not-prose my-5 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse font-sans text-[14px]">
                <thead>
                  <tr className="border-b border-[color-mix(in_oklch,var(--soil)_35%,transparent)] text-left font-mono text-[10px] uppercase tracking-[0.1em] text-soil">
                    <th className="px-3 py-3">Bag capacity</th>
                    <th className="px-3 py-3">Division</th>
                    <th className="px-3 py-3 text-right">Whole bags</th>
                  </tr>
                </thead>
                <tbody>
                  {bagRows.map((row) => (
                    <tr key={row.capacity} className="border-b border-dashed border-[color-mix(in_oklch,var(--soil)_25%,transparent)] last:border-0">
                      <td className="px-3 py-3 tabular text-ink">{row.capacity} cu ft</td>
                      <td className="px-3 py-3 font-mono text-[13px] tabular text-soil">{decimal(exampleCubicFeet, 2)} ÷ {row.capacity} = {decimal(row.exact, 2)}</td>
                      <td className="px-3 py-3 text-right font-semibold tabular text-moss-deep">{row.whole}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="mb-14" aria-labelledby="calculate-your-bed">
          <div className="mb-5">
            <h2 id="calculate-your-bed" className="font-serif font-semibold text-[27px] leading-[1.2] tracking-tight text-ink">
              Calculate your own raised bed
            </h2>
            <p className="mt-2 font-serif text-[15px] leading-[1.65] text-soil">
              Enter your actual area, chosen depth, and bag size below. The same tool also has a separate equal-volume pile-mix screen. <Link href="/tools/compost-calculator" className="text-moss-deep underline underline-offset-2">Open the full compost calculator page</Link> for methodology and sources.
            </p>
          </div>
          <CompostCalculator />
        </section>

        <FAQSection faqs={faqs} />

        <section className="pt-8 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)]">
          <h2 className="font-serif font-semibold text-[20px] tracking-tight text-moss-deep mb-4">Continue planning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/tools/compost-calculator" className="group block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-5 transition-colors duration-fast">
              <p className="font-serif font-semibold text-[16px] text-ink group-hover:text-moss-deep transition-colors duration-fast">Compost calculator methodology</p>
              <p className="mt-1 font-serif text-[14px] leading-[1.6] text-soil">Review volume formulas, C:N material data, and the full reference table.</p>
            </Link>
            <Link href="/guides/composting-guide" className="group block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-5 transition-colors duration-fast">
              <p className="font-serif font-semibold text-[16px] text-ink group-hover:text-moss-deep transition-colors duration-fast">Build and manage a compost pile</p>
              <p className="mt-1 font-serif text-[14px] leading-[1.6] text-soil">Move from purchase math to feedstocks, moisture, turning, and curing.</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
