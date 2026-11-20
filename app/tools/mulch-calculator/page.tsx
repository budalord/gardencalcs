import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import FAQSection from "@/components/FAQSection";
import type { ToolFAQ } from "@/config/tools";

const MulchCalculator = dynamic(() => import("@/components/MulchCalculator"), {
  loading: () => (
    <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-lg p-6 font-mono text-[12px] text-soil" role="status">
      Loading mulch calculator…
    </div>
  ),
});

const pageTitle = "Mulch Calculator: How Much Mulch Do I Need? Yards & Bags";
const pageDescription = "Use this mulch calculator to find out how much mulch you need in cubic yards or bags and compare the cost of bulk and bagged mulch.";
const toolUrl = `${siteConfig.domain}/tools/mulch-calculator`;
const UMN = "https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/mulching-for-soil-and-garden-health";
const PSU = "https://extension.psu.edu/mulching-landscape-trees";
const UMD = "https://extension.umd.edu/resource/mulching-trees-and-shrubs";
const MSU = "https://extension.msstate.edu/publications/mulches-for-the-landscape";
const ISU = "https://yardandgarden.extension.iastate.edu/how-to/using-mulch-garden";
const CSU = "https://extension.colostate.edu/resource/mulches-for-home-gardens/";
const USU = "https://extension.usu.edu/yardandgarden/research/using-mulches-in-utah-landscapes-and-gardens";
const CLEMSON = "https://hgic.clemson.edu/factsheet/mulch/";
const NCSU = "https://lee.ces.ncsu.edu/news/pine-needle-mulch-the-myths-and-legends/";

const faqs: ToolFAQ[] = [
  {
    q: "How many bags of mulch do I need?",
    sourceUrl: MSU,
    displayHtml: `Divide the cubic feet of mulch you need by the cubic feet printed on the bag, then round up. An illustrative bed requiring 50 cubic feet takes 25 bags at an example capacity of 2 cubic feet per bag. Use the volume on the actual label when comparing packages. The arithmetic also gives you a way to compare small packages against bulk, as <a href="${MSU}">Mississippi State Extension</a> suggests.`,
  },
  {
    q: "How much area does a yard of mulch cover?",
    sourceUrl: UMN,
    displayHtml: `A cubic yard covers 324 square feet at a depth of 1 inch, 162 square feet at 2 inches, and 108 square feet at 3 inches. These are arithmetic results: divide 324 by your depth in inches. Select a depth for your planting first. <a href="${UMN}">University of Minnesota Extension</a> discusses how to balance weed suppression with soil aeration.`,
  },
  {
    q: "How deep should mulch be?",
    sourceUrl: ISU,
    displayHtml: `The material and site determine which depth to use. <a href="${ISU}">Iowa State Extension</a> generally gives 2–4 inches, using the lower end for finer materials and the higher end for coarser ones. For finely textured or double-shredded mulch around trees, <a href="${PSU}">Penn State Extension</a> recommends 1–2 inches. Use the matching row in the depth table, then measure the gap between the existing layer and your target depth.`,
  },
  {
    q: "Is it bad to put mulch against a tree trunk?",
    sourceUrl: PSU,
    displayHtml: `Yes. Mulch covering the trunk and root flare keeps those tissues damp, according to <a href="${PSU}">Penn State Extension</a>. Pull the layer back from the trunk and leave the flare visible. When estimating how much mulch to buy for a tree ring, subtract the entire clear center, including the trunk, from the outer circle before multiplying by depth.`,
  },
  {
    q: "Should I mulch in spring or fall?",
    sourceUrl: ISU,
    displayHtml: `For spring mulching, <a href="${ISU}">Iowa State Extension</a> recommends waiting for the soil to warm and perennials to emerge. For its late-season application, wait for plants to go dormant. If your goal is to insulate a fall transplant right after planting, <a href="${CSU}">Colorado State Extension</a> gives separate guidance for that situation.`,
  },
  {
    q: "Is bagged or bulk mulch cheaper?",
    sourceUrl: MSU,
    displayHtml: `Multiply the bag price by 27 divided by the bag capacity in cubic feet to get the equivalent cost per cubic yard. Compare it with the bulk quote, as <a href="${MSU}">Mississippi State Extension</a> suggests. For your actual purchase, compare the number of whole bags times the bag price with the billable cubic yards times the bulk price per yard, plus delivery.`,
  },
].map((faq) => ({ ...faq, a: faq.displayHtml.replace(/<[^>]+>/g, "") }));

// The JSON-LD vocabulary identifier is machine-readable metadata, separate from source links.
const schemaContext = "https:" + "//schema.org";
const softwareAppSchema = {
  "@context": schemaContext,
  "@type": "SoftwareApplication",
  name: "Mulch Calculator",
  description: pageDescription,
  url: toolUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};
const howToSchema = {
  "@context": schemaContext,
  "@type": "HowTo",
  name: "How to calculate how much mulch you need",
  step: [
    "Choose the unit system and select the rectangular or circular footprint.",
    "Enter the footprint dimensions, mulch depth, and the capacity printed on the bag.",
    "Calculate the volume, coverage, and whole bags. Enter prices to compare material costs.",
  ].map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })),
};
const faqSchema = {
  "@context": schemaContext,
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};
const breadcrumbSchema = {
  "@context": schemaContext,
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.domain}/tools` },
    { "@type": "ListItem", position: 3, name: "Mulch Calculator", item: toolUrl },
  ],
};

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: toolUrl },
  openGraph: { title: pageTitle, description: pageDescription, url: toolUrl, type: "website" },
};

const relatedCard = "group block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-5 transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-deep";

export default function MulchCalculatorPage() {
  return (
    <>
      {[softwareAppSchema, howToSchema, faqSchema, breadcrumbSchema].map((schema) => (
        <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-7 pb-24">
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7">
          <Link href="/" className="hover:text-moss-deep">Home</Link>
          <span aria-hidden="true" className="mx-2 opacity-50">/</span>
          <Link href="/tools" className="hover:text-moss-deep">Tools</Link>
          <span aria-hidden="true" className="mx-2 opacity-50">/</span>
          <span aria-current="page" className="text-ink">Mulch Calculator</span>
        </nav>
        <header className="pb-7 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
          <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-3">Mulch Calculator</h1>
          <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil max-w-[640px]">Find how much mulch you need in cubic yards and whole bags, choose a depth for your garden, and compare bulk and bagged costs.</p>
        </header>
        <section aria-label="Quick Answer" className="bg-paper border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] border-l-[4px] border-l-terracotta rounded-md px-6 py-5 mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-soil mb-3">Quick Answer</p>
          <p className="font-serif text-[15px] leading-[1.7] text-ink"><strong>Cubic feet of mulch = area in square feet × depth in inches ÷ 12.</strong> Divide by 27 for cubic yards. For bags, divide the cubic feet by the volume per bag and round up.</p>
          <p className="mt-3 font-serif text-[14px] leading-[1.65] text-ink"><strong>Example.</strong> A 10 ft × 20 ft flower bed at an example depth of 3 inches needs 50 cubic feet, or about 1.85 cubic yards. At an example capacity of 2 cubic feet per bag, you need 25 bags.</p>
        </section>
        <div className="mb-14"><MulchCalculator /></div>

        <div className="almanac-prose font-serif text-[17px] leading-[1.75] text-ink mb-12">
          <section>
            <h2>How much mulch do I need? The formula</h2>
            <p>Measure the ground you actually intend to cover. Multiply that area by the thickness of the mulch you plan to add. If you measured the surface in square feet and the depth in inches, divide the depth by 12 to express it in feet. The result is cubic feet. Divide by 27 for cubic yards, keeping the unrounded result for any further calculations.</p>
            <h3>Rectangular and circular beds</h3>
            <p>For a rectangle, measure the length and width inside the edging and multiply them. Use the same units for both measurements. If a walkway breaks up the bed, measure the planting areas on either side separately or subtract the path from the full footprint. A sketch helps you mark what is included before you use the calculator.</p>
            <p>For a circle, measure the diameter through the center, from one edge of the area to the opposite edge. The radius is half the diameter. The area is <strong>π × (diameter ÷ 2)²</strong>. Multiply the area by the layer thickness in the same length unit. Enter the diameter in the calculator so it can do the halving for you. With metric measurements, multiply square meters by depth in centimeters divided by 100 to get cubic meters.</p>
            <h3>Tree rings and irregular borders</h3>
            <p>A tree ring has a circular outer boundary and an open center. Measure the outside diameter, then measure the diameter of the area you will leave clear, including the trunk. Take the outer circle’s area and subtract the clear circle’s area before multiplying by depth. If you use the calculator for both footprints, enter the same depth for both and subtract the smaller volume from the larger one. Round the bag count only after subtracting. For a trunk that sits off-center, the same subtraction works as long as the clear circle fits entirely inside the bed.</p>
            <p>For a curved or L-shaped border, sketch a few rectangles or circular sections that approximate the outline. A half-circle contributes half the volume of the full circle at the same depth. Mark where the pieces meet so their footprints do not overlap. If the mulch type or depth changes between pieces, calculate their volumes separately. Add together the unrounded volumes for sections that will use the same product, then convert each product total into yards or bags.</p>
            <p>For an existing bed, measure how much usable mulch is already present in several places. Use the difference between the existing layer and your target thickness as the depth to add. If there are bare spots next to areas that already meet the target, work out those patches separately. A uniform average would imply spreading fresh mulch over the whole footprint. If you are also filling a bed with soil, estimate that volume separately with the <Link href="/tools/soil-calculator">soil calculator</Link>.</p>
          </section>

          <section>
            <h2>Mulch coverage in cubic yards and bags</h2>
            <p>One cubic yard equals 27 cubic feet. At 1 inch deep, those 27 cubic feet occupy about 324 square feet, since the depth is 1/12 of a foot. At any depth measured in inches, <strong>square feet covered per cubic yard = 324 ÷ depth in inches</strong>. The area shrinks as the layer gets thicker. If you already know your bed’s square footage, divide it by the coverage at the depth you intend to add to get the cubic yards required.</p>
            <table aria-label="Arithmetic coverage per cubic yard of mulch">
              <thead><tr><th scope="col">Depth</th><th scope="col">Square feet per cubic yard</th></tr></thead>
              <tbody>
                <tr><td>1 inch</td><td>324</td></tr>
                <tr><td>2 inches</td><td>162</td></tr>
                <tr><td>3 inches</td><td>108</td></tr>
                <tr><td>4 inches</td><td>81</td></tr>
              </tbody>
            </table>
            <p>The table shows arithmetic coverage for an even layer. To find coverage for an individual bag, divide the labeled capacity in cubic feet by the depth in feet. For example, a bag with an illustrative capacity of 2 cubic feet covers 8 square feet at an example depth of 3 inches. To calculate a purchase, divide the total cubic feet required by the bag capacity or divide the area by the area covered per bag at that depth.</p>
            <p>Round the final bag count up, since you buy whole packages. For example, if the volume requires 12.2 bags, the purchase is 13 bags. When several beds take the same mulch, add their volumes before rounding so a partly used bag can go on the next bed. For metric bags, use liters throughout this division. Multiply cubic meters by 1,000 to find liters of mulch, then divide by the liters printed on the package.</p>
            <p>Keep the unit beside each number in your notes. Square feet describe the surface, cubic feet describe the amount of mulch, and a cubic yard is the unit the bulk quote uses. A useful order note includes the area, the depth you intend to add, and the resulting volume. If the bag label shows a coverage figure, check the depth that figure assumes before using it to plan your purchase.</p>
          </section>

          <section>
            <h2>How thick should mulch be? Recommended depth by material and use</h2>
            <p>Start with the row that matches the planting and the material you plan to spread. Coarse particles leave air spaces, while fine particles can form a denser layer. Tree guidance also accounts for air reaching roots and the drainage beneath the mulch. The table gives the original ranges and caps from each guide so you can see where the recommendations differ.</p>
            <table aria-label="Extension recommendations for mulch depth">
              <thead><tr><th scope="col">Material or use</th><th scope="col">Depth and source</th></tr></thead>
              <tbody>
                <tr><td>General garden mulching</td><td>2–4 inches to balance weed suppression and soil aeration, according to <a href={UMN}>University of Minnesota Extension</a>.</td></tr>
                <tr><td>Organic mulch around trees and shrubs</td><td>2–4 inches, with less on poorly drained soil, according to <a href={PSU}>Penn State Extension</a>.</td></tr>
                <tr><td>Trees and shrubs</td><td>1–3 inches, according to <a href={UMD}>University of Maryland Extension</a>.</td></tr>
                <tr><td>Landscape trees and shrubs</td><td><a href={MSU}>Mississippi State Extension</a> gives about 4–6 inches in the main text and 2–4 inches for wood chips in the table on the same page.</td></tr>
                <tr><td>General garden beds, including perennial beds</td><td>Generally 2–4 inches, toward the high end for coarse material such as wood chips and the low end for fine material such as grass clippings. <a href={ISU}>Iowa State Extension</a> gives this as general guidance.</td></tr>
                <tr><td>Straw, dried leaves, and similar materials</td><td>4–6 inches, according to <a href={CSU}>Colorado State Extension</a>.</td></tr>
                <tr><td>Wheat straw in vegetable gardens</td><td><a href={MSU}>Mississippi State Extension</a> lists 6–8 inches for wheat straw and identifies it as suitable for vegetable gardens.</td></tr>
                <tr><td>Whole and shredded leaves</td><td>6 inches for whole leaves and 2–3 inches for shredded leaves, according to <a href={MSU}>Mississippi State Extension</a>.</td></tr>
                <tr><td>Fine-textured or double-shredded mulch around trees</td><td>1–2 inches because it allows less oxygen through to the root zone, according to <a href={PSU}>Penn State Extension</a>.</td></tr>
                <tr><td>Fine, dense and coarse, fluffy mulch</td><td>1–2 inches deep for fine, dense particles under ½ inch in diameter and 3–6 inches deep for coarse, fluffy particles ½–3 inches in diameter, according to <a href={USU}>Utah State Extension</a>.</td></tr>
                <tr><td>Fine wood and bark mulch</td><td>No more than 2–3 inches, according to <a href={CLEMSON}>Clemson Extension</a>.</td></tr>
                <tr><td>Coarse mulch such as pine bark nuggets</td><td>Up to 4 inches, according to <a href={CLEMSON}>Clemson Extension</a>.</td></tr>
                <tr><td>Grass clippings and shredded leaves</td><td><a href={CLEMSON}>Clemson Extension</a> caps both at 2 inches in its application guidance because these materials can mat. The <a href={CLEMSON}>separate section on leaves</a> lists 2–3 inches.</td></tr>
              </tbody>
            </table>
            <p>Most home garden situations land in the 2–4 inch range, with the exact depth depending on particle size.</p>
            <p>Use the garden-bed range as a starting point, then read the more specific row if you have a fine mulch, a coarse loose material, or a tree planting with drainage concerns. The vegetable-garden guidance for wheat straw describes that material in that use. For a mixed landscape, work out separate depths for a vegetable patch with straw and a row of shrubs with bark so you order the right amount of each.</p>
            <p>At equal depth, the volume formula gives the same result for bark, straw, and wood chips. The product choice changes the calculation when it changes the target depth or the amount an individual bag contains. If you are choosing between products with different recommended depths, calculate each at its own depth before comparing the orders. A price per cubic yard alone will not capture that difference in volume.</p>
          </section>

          <section>
            <h2>Too much mulch: depth limits and keeping it off trunks</h2>
            <p>A deep blanket can restrict how much air reaches the soil. Around landscape trees, more than 4 inches may harm roots, and excessive mulch can keep air from penetrating the layer, depleting oxygen in the soil beneath it, according to <a href={PSU}>Penn State Extension</a>. That warning applies to its tree guidance. The separate depth recommendations for coarse, loose materials and vegetable-garden straw belong to their own conditions in the table above.</p>
            <p>A mound sloping inward toward a trunk creates a mulch volcano. Buried trunk tissue and the root flare, where the base of the trunk widens into the roots, stay wet when mulch covers them, according to <a href={PSU}>Penn State Extension</a>. Spread mulch over the surrounding ground and pull it away from the base so the flare is visible. When refreshing a tree ring, check the inner edge and existing thickness before adding material.</p>
            <ul>
              <li><a href={PSU}>Penn State Extension</a> recommends pulling mulch 3–5 inches away from young trees and 8–10 inches away from mature trees.</li>
              <li><a href={UMN}>University of Minnesota Extension</a> recommends a 6-inch mulch-free ring around the trunk.</li>
              <li><a href={UMD}>University of Maryland Extension</a> recommends leaving about 3 inches between mulch and the base of the trunk.</li>
            </ul>
            <p>The guidelines agree about keeping mulch off the trunk and give different distances. Measure the opening from the outside of the trunk to the edge of the mulch. For a centered circular ring, the diameter to subtract is the trunk’s diameter plus twice the chosen clear distance. This reflects the whole unmulched center in the volume estimate. It also gives you an inside edge to mark before you spread the load.</p>
          </section>

          <section>
            <h2>When to mulch: spring vs fall</h2>
            <p>In early spring, wait for the ground to warm and perennials to emerge, recommends <a href={ISU}>Iowa State Extension</a>. Emerging shoots also give you a visible guide to the places where you want to leave space. For most mulches, <a href={USU}>Utah State Extension</a> likewise advises waiting until temperatures have warmed, since applying an insulating layer over cool soil can keep it cool. Its spring guidance makes an exception for plastic mulches.</p>
            <p>For late-season mulching, wait until plants go dormant. Applying the layer too early can delay dormancy and increase the risk of cold injury, according to <a href={ISU}>Iowa State Extension</a>. For fall transplants where the aim is to keep soil from freezing so soon and give roots more time to grow, <a href={CSU}>Colorado State Extension</a> advises mulching immediately after planting.</p>
            <p>For reducing frost heave and delaying spring growth, <a href={CSU}>Colorado State Extension</a> advises waiting until the ground has frozen. <a href={MSU}>Mississippi State Extension</a> gives a different window for winter mulch, after the soil cools but before it freezes. Match the timing guidance to the task, whether you are mulching a spring perennial bed, protecting a new transplant, or preparing a bed for winter. When you measure for a seasonal top-up, use the depth you need at the time you plan to spread it.</p>
          </section>

          <section>
            <h2>Types of mulch compared: bark, pine needles, straw, and wood chips</h2>
            <p>Particle size affects both spreading depth and how often a layer needs replenishing. Finely shredded mulch breaks down faster and needs more frequent replenishment, according to <a href={PSU}>Penn State Extension</a>. A material name alone can cover both fine and coarse products. Look at the actual pieces when choosing a depth or comparing package labels.</p>
            <table aria-label="Bark, pine needles, straw, and wood chips compared">
              <thead><tr><th scope="col">Mulch</th><th scope="col">Breakdown, replenishment, and trade-offs</th></tr></thead>
              <tbody>
                <tr><td>Bark</td><td>Slow to break down, with cedar and cypress bark the slowest in <a href={ISU}>Iowa State Extension’s comparison</a>. Bark and pine needles typically need more material after about 2–4 years, according to <a href={CLEMSON}>Clemson Extension</a>.</td></tr>
                <tr><td>Pine needles (pine straw)</td><td>Light, airy, and slow to break down, according to <a href={ISU}>Iowa State Extension</a>. Pine needles typically need replenishment after about 2–4 years in <a href={CLEMSON}>Clemson Extension’s guidance</a>. Extension sources differ on the effect on soil pH.</td></tr>
                <tr><td>Straw</td><td>Breaks down quickly and can deplete nitrogen, according to <a href={MSU}>Mississippi State Extension</a>. <a href={ISU}>Iowa State Extension</a> suggests seed-free straw for short-term or overwintering cover. Check for weed and grain seeds.</td></tr>
                <tr><td>Wood chips</td><td>Arborist chips are long lasting in <a href={CSU}>Colorado State Extension’s guidance</a>. <a href={CLEMSON}>Clemson Extension</a> says wood chips are usually completely decomposed within 2 years. Nitrogen guidance varies with the size of the chips and how they are used.</td></tr>
              </tbody>
            </table>
            <h3>Wood mulch and nitrogen</h3>
            <p>When bark or wood chips sit on the surface, nitrogen tie-up usually occurs in the narrow zone where the mulch meets the soil and typically poses no problem for plant nutrition. When those materials are mixed into the soil, nitrogen can become unavailable to plants, according to <a href={CSU}>Colorado State Extension</a>. If you are preparing to dig or till a mulched bed, that distinction matters because some of the surface layer can end up in the root zone.</p>
            <p><a href={UMD}>University of Maryland Extension</a> describes nitrogen depletion when sawdust, and to a lesser extent wood chips, are worked into soil. <a href={USU}>Utah State Extension</a> warns more broadly that woody materials can tie up soil nitrogen and cause a deficiency. For small chips that decompose quickly, <a href={CLEMSON}>Clemson Extension</a> says the process uses nitrogen from the soil and recommends replacing it with nitrogen fertilizer. <a href={ISU}>Iowa State Extension</a> notes that herbaceous plants and newly transplanted woody plants are more affected than established trees and shrubs.</p>
            <h3>Seeds in straw and soil pH under pine needles</h3>
            <p>Look for seed-free wheat, oat, or soybean straw when you want a short-term cover or insulation for plants sensitive to cold, as recommended by <a href={ISU}>Iowa State Extension</a>. <a href={CSU}>Colorado State Extension</a> notes that straw often contains weed seeds. <a href={CLEMSON}>Clemson Extension</a> adds that oat, wheat, and rye straw can contain grain seed heads that may sprout. If seedlings appear in a straw-covered bed, the grain itself is one possible source.</p>
            <p><a href={NCSU}>NC State Extension in Lee County</a> says pine straw used as mulch does not acidify soil. <a href={ISU}>Iowa State Extension</a> describes its effect on soil pH as relatively minor. The materials table from <a href={MSU}>Mississippi State Extension</a> says pine needles lower soil pH. Those are three different descriptions of the effect. If you are choosing pine straw for surface coverage, use its texture and your intended depth to calculate the volume.</p>
            <p>The replenishment figures describe how materials break down in the cited guides. To estimate a top-up, inspect what remains in your own bed. Check exposed areas separately from spots that still have an even layer. If you switch to a different particle size or material, revisit the depth guidance before using the old order quantity as a shopping list.</p>
          </section>

          <section>
            <h2>Bulk vs bagged mulch: comparing cost</h2>
            <p><a href={MSU}>Mississippi State Extension</a> recommends comparing the cost of mulch sold in smaller packages with the cost of buying it by the cubic yard. Start by putting both quotes in the same unit. Calculate <strong>bagged price per cubic yard = price per bag × (27 ÷ cubic feet per bag)</strong>. Compare that with the bulk quote per cubic yard. Prices vary by region and supplier, so use the label and quotes for the materials you are actually considering.</p>
            <p>Then calculate what each order will cost. For bags, multiply the whole-bag count by the price per bag. For bulk, multiply the billable cubic yards by the per-yard price and add the delivery charge. If the supplier charges for a minimum quantity or sells only in certain increments, use that billable volume in the comparison. You can divide the delivered total by the billable cubic yards for a delivered price per yard. The calculator estimates the materials using the measured volume and whole bags. Add any fees from your quote when comparing the final bills.</p>
            <p><strong>Illustrative comparison.</strong> Use the example 10 ft × 20 ft bed with a 3-inch example layer. It needs 50 cubic feet, or about 1.85 cubic yards. At an example capacity of 2 cubic feet per bag and an example price of $5 per bag, the equivalent price is $67.50 per cubic yard (example price). The 25 whole bags cost $125 (example price), before any fees.</p>
            <p>Suppose the bulk quote has an example price of $45 per cubic yard and a delivery fee with an example price of $50. If the supplier charges for the exact estimated volume, the arithmetic is 50 ÷ 27 cubic yards times the example price per yard, plus delivery. That comes to $133.33 (example delivered price), including $83.33 for the mulch (example material price). For these two example quotes, the bag purchase has the lower total if you pick up the bags. The bulk quote has the lower material cost before delivery.</p>
            <p>For a small project, a fraction of a cubic yard on the estimate may turn into a larger billable order. For a larger project, you may be able to combine beds that use the same material in one delivery. Write down the quantity you will pay for under each quote, along with the fee or pickup terms. Recalculate the whole bags for each different package size. This gives you two costs for the actual order and makes it clear how much material you will have for each bed.</p>
          </section>
        </div>

        <div className="[&_.text-terracotta]:text-soil">
          <h2 className="sr-only">Frequently asked questions</h2>
          <FAQSection faqs={faqs} />
        </div>
        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[20px] tracking-tight text-moss-deep mb-5">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/tools/soil-calculator" className={relatedCard}>
              <p className="font-serif font-semibold text-[16px] text-ink group-hover:text-moss-deep">Soil Calculator</p>
              <p className="mt-1 font-serif text-[14px] leading-[1.6] text-soil">Estimate the soil needed to fill a bed or container.</p>
            </Link>
            <Link href="/tools/compost-calculator" className={relatedCard}>
              <p className="font-serif font-semibold text-[16px] text-ink group-hover:text-moss-deep">Compost Calculator</p>
              <p className="mt-1 font-serif text-[14px] leading-[1.6] text-soil">Convert an amendment depth into volume and bags.</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
