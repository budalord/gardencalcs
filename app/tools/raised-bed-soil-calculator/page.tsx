import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import { siteConfig } from "@/config/site";
import type { ToolFAQ } from "@/config/tools";

const RaisedBedSoilCalculator = dynamic(() => import("@/components/RaisedBedSoilCalculator"), {
  loading: () => <div className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-lg p-6 font-mono text-[12px] uppercase tracking-[0.12em] text-soil">Loading raised bed soil calculator…</div>,
});

const pageName = "Raised Bed Soil Calculator";
const pageTitle = "Raised Bed Soil Calculator: Cubic Feet, Yards & Bags";
const pageDescription = "Use this raised bed soil calculator to find cubic feet, cubic yards, whole bags, and ingredient amounts for your soil mix.";
const toolUrl = `${siteConfig.domain}/tools/raised-bed-soil-calculator`;

const UMN_RAISED = "https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/raised-bed-gardens";
const USU_RAISED = "https://extension.usu.edu/yardandgarden/research/raised-bed-gardening";
const UCONN_RAISED = "https://homegarden.cahnr.uconn.edu/2026/04/14/raised-beds/";
const UMD_FILL = "https://extension.umd.edu/resource/soil-fill-raised-beds";
const SFG_MIX = "https://squarefootgardening.org/method/";
const OSU_COMPOST = "https://extension.oregonstate.edu/catalog/em-9308-how-use-compost-gardens-landscapes";
const IOWA_SOIL = "https://yardandgarden.extension.iastate.edu/faq/how-do-i-determine-amount-soil-needed-fill-container-or-raised-bed";
const WSU_DRAIN = "https://wpcdn.web.wsu.edu/wp-puyallup/uploads/sites/403/2015/03/container-drainage.pdf";
const WSU_CONTAINERS = "https://extension.wsu.edu/jefferson/mg-home/tip-sheet-6-container-gardening/";
const UMD_ORGANIC = "https://extension.umd.edu/resource/organic-matter-and-soil-amendments";
const ILLINOIS_REFRESH = "https://extension.illinois.edu/news-releases/refreshing-raised-bed-soil-generates-exceptional-results";
const OSU_RAISED = "https://extension.oregonstate.edu/catalog/fs-270-raised-bed-gardening";

const faqEntries = [
  {
    q: "How many bags of soil do I need for a 4 × 8 raised bed?",
    sourceUrl: IOWA_SOIL,
    displayHtml: `In an illustrative 4 ft × 8 ft bed filled 12 inches deep, you need 32 cubic feet, or about 1.19 cubic yards. With example bags holding 1.5 cubic feet each, that comes to 21.33 bags before rounding, so buy 22 whole bags. Use the fill depth you measured and the capacity on your own bag. <a href="${IOWA_SOIL}">Iowa State Extension describes potting soil sold in cubic-foot bags</a>.`,
  },
  {
    q: "What is Mel’s Mix?",
    sourceUrl: SFG_MIX,
    displayHtml: `The <a href="${SFG_MIX}">Square Foot Gardening Foundation</a> lists 1/3 coarse vermiculite, 1/3 sphagnum peat moss or coconut coir, and 1/3 blended organic compost. Measure the ingredients in equal volumes, with the same scoop or bucket for each. The ingredients can weigh different amounts even when they fill the same scoop.`,
  },
  {
    q: "Should I put rocks in the bottom of a raised bed?",
    sourceUrl: WSU_DRAIN,
    displayHtml: `Skip the gravel or other coarse drainage layer. <a href="${WSU_DRAIN}">Washington State University’s container guidance</a> explains that gravity-driven water stays in the fine layer until it saturates before moving into the coarser material below. The same principle applies where fine bed soil rests on coarse material. For a bed set on native soil, leave the bottom open so roots and water can reach the ground directly.`,
  },
  {
    q: "How deep should a raised bed be for vegetables?",
    sourceUrl: UCONN_RAISED,
    displayHtml: `<a href="${UCONN_RAISED}">UConn Extension</a> says most annual vegetables need 12–18 inches of soil, with more depth for root vegetables. For beds on hard surfaces, <a href="${UMD_FILL}">University of Maryland Extension</a> gives a minimum of 8 inches for leafy greens, beans, and cucumbers, and a range of 12–24 inches for peppers, tomatoes, and squash. Check what you plan to grow and whether the roots can enter the ground below.`,
  },
  {
    q: "How much does raised bed soil settle?",
    sourceUrl: OSU_COMPOST,
    displayHtml: `<a href="${OSU_COMPOST}">Oregon State University Extension</a> says new beds sink over time as the compost in the mix continues to decompose. <a href="${IOWA_SOIL}">Iowa State Extension</a> describes potting soil settling over a few days to weeks. These sources give no standard settling percentage or extra-fill amount. Fill close to the top, then measure the gap and add more mix after the surface settles.`,
  },
  {
    q: "How often should I add soil to a raised bed?",
    sourceUrl: ILLINOIS_REFRESH,
    displayHtml: `Check the surface each year. <a href="${ILLINOIS_REFRESH}">Illinois Extension</a> suggests an annual topdressing of a few inches of compost or high-quality topsoil to keep up with settling in raised beds. For an established vegetable bed, <a href="${OSU_COMPOST}">Oregon State University Extension</a> recommends a yearly surface layer of 1/4–1 inch of compost. Measure the depth you need to restore before calculating how much to buy.`,
  },
];

const faqs: ToolFAQ[] = faqEntries.map((faq) => ({ ...faq, a: faq.displayHtml.replace(/<[^>]+>/g, "") }));

// JSON-LD vocabulary identifier, separate from the article's source URLs.
const schemaContext = "https:" + "//schema.org";
const softwareAppSchema = {
  "@context": schemaContext,
  "@type": "SoftwareApplication",
  name: pageName,
  description: pageDescription,
  url: toolUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};
const howToSchema = {
  "@context": schemaContext,
  "@type": "HowTo",
  name: "How to use the Raised Bed Soil Calculator",
  step: [
    "Choose a measurement system and enter the number of beds that share the same dimensions.",
    "Measure the inside length and width and enter the depth you plan to fill.",
    "Enter the volume on the bag label and choose a soil mix.",
    "Calculate the total volume, whole bags, and any ingredient amounts.",
  ].map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })),
};
const faqSchema = {
  "@context": schemaContext,
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
};
const breadcrumbSchema = {
  "@context": schemaContext,
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.domain}/tools` },
    { "@type": "ListItem", position: 3, name: pageName, item: toolUrl },
  ],
};

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: toolUrl },
  openGraph: { title: pageTitle, description: pageDescription, url: toolUrl, type: "website" },
};

export default function RaisedBedSoilCalculatorPage() {
  return (
    <>
      {[softwareAppSchema, howToSchema, faqSchema, breadcrumbSchema].map((schema) => (
        <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <article className="max-w-[720px] mx-auto px-6 md:px-8 pt-7 pb-24">
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-soil mb-7">
          <Link href="/" className="hover:text-moss-deep transition-colors duration-fast">Home</Link>
          <span className="mx-2 opacity-50" aria-hidden="true">/</span>
          <Link href="/tools" className="hover:text-moss-deep transition-colors duration-fast">Tools</Link>
          <span className="mx-2 opacity-50" aria-hidden="true">/</span>
          <span className="text-ink" aria-current="page">{pageName}</span>
        </nav>
        <header className="pb-7 border-b border-dashed border-[color-mix(in_oklch,var(--soil)_45%,transparent)] mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta mb-3">Calculator · Garden</p>
          <h1 className="font-serif font-semibold text-[38px] md:text-[46px] leading-[1.08] tracking-[-0.01em] text-ink mb-3">{pageName}</h1>
          <p className="font-serif italic text-[18px] md:text-[19px] leading-[1.45] text-soil max-w-[640px]">Find out how much soil to buy for your raised beds and how much of each ingredient to measure if you mix your own.</p>
        </header>
        <section aria-label="Quick Answer" className="bg-paper border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] border-l-[4px] border-l-terracotta rounded-md px-6 py-5 mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-terracotta mb-3">Quick Answer</p>
          <p className="font-serif text-[15px] leading-[1.7] text-ink"><strong>Cubic feet = inside length (ft) × inside width (ft) × fill depth (in) ÷ 12 × number of matching beds.</strong> Divide by 27 for cubic yards. To find how many bags to buy, divide by the volume printed on each bag and round up.</p>
          <p className="mt-3 font-serif text-[14px] leading-[1.65] text-ink"><strong>Example:</strong> A 4 ft × 8 ft bed with 12 in of fill takes <strong>32.00 cubic feet</strong>, or about <strong>1.19 cubic yards</strong>. At an example bag capacity of 1.5 cubic feet, the total is 21.33 bags before rounding, so buy <strong>22 whole bags</strong>.</p>
        </section>
        <div className="mb-14"><RaisedBedSoilCalculator melsMixSource={SFG_MIX} topsoilMixSource={UMN_RAISED} /></div>
        <div className="almanac-prose font-serif text-[17px] leading-[1.75] text-ink mb-12">
          <section>
            <h2>How much soil for a raised bed? The formula</h2>
            <p>Measure the space the soil will actually occupy. For a rectangular raised bed, take the length and width between the inside faces of the walls. Lumber thickness, overlapping corners, and braces can make the planting space smaller than the footprint on the box. If you are working from a product listing, look for inside dimensions or measure the assembled frame before ordering. On a bed you have already built, take those measurements at the height where the soil will sit.</p>
            <p>Multiply the inside length and width to get the footprint. Multiply that area by the fill depth in the same units to get the volume. When length and width are in feet and depth is in inches, divide the depth by 12 because a foot contains 12 inches. With length and width in meters, divide the depth in centimeters by 100 to put all the dimensions in meters and get cubic meters. Keep the units beside the measurements on your notes so you can check the conversion later.</p>
            <p>Measure from the surface you are filling over up to the soil line you want. An empty frame on level ground starts at the bottom of the frame. When there is usable soil already in the bed, start from that existing surface. If you plan to leave space above the soil for mulch or watering, stop your depth measurement at the intended soil line. For an illustrative 12-inch frame with 2 inches of open space above the soil, use a 10-inch fill depth in the formula.</p>
            <p>Use the bed count for rectangles with the same inside dimensions and fill depth. When the beds differ, calculate the volume for each size and add the results in the same units. If you will fill them all from the same product, add the volumes before rounding to whole bags. An opened bag from the first bed can finish the next one. If different beds need different mixes, keep a subtotal for each mix so you can buy the right quantities.</p>
            <p>For a bed with a shaped footprint or varying depth, divide the space into sections you can measure and add their estimated volumes. When topping up an uneven bed, measure the gap to the target soil line in several places across the planting area. Use a representative depth for each section. For circles or other garden projects, use the <Link href="/tools/soil-calculator">general soil calculator for containers and garden areas</Link>.</p>
          </section>
          <section>
            <h2>How deep should raised bed soil be?</h2>
            <p>Start by looking at what is under the bed. A bottomless frame over garden soil can give roots access to the ground below the fill. A bed on paving has to provide the growing depth inside the bed itself. The guidance below describes several planting situations. Use the row that matches the bed you are building and the crops you plan to grow when you choose a fill depth.</p>
            <table>
              <thead>
                <tr><th scope="col">Bed or planting situation</th><th scope="col">Depth guidance</th></tr>
              </thead>
              <tbody>
                <tr><td>Unframed, flat-topped soil mound</td><td><a href={UMN_RAISED}>University of Minnesota Extension</a> describes mounds usually 6–8 inches high.</td></tr>
                <tr><td>Framed bed for most vegetables</td><td><a href={USU_RAISED}>Utah State University Extension</a> recommends a box at least 6–12 inches high to accommodate rooting.</td></tr>
                <tr><td>Shallow framed bed over existing soil</td><td><a href={USU_RAISED}>Utah State University Extension</a> recommends leaving beds shallower than 12 inches bottomless so roots can enter the soil below.</td></tr>
                <tr><td>Most annual vegetables</td><td><a href={UCONN_RAISED}>UConn Extension</a> gives 12–18 inches of soil depth and says root vegetables need more depth.</td></tr>
                <tr><td>Leafy greens, beans, and cucumbers on a hard surface</td><td><a href={UMD_FILL}>University of Maryland Extension</a> gives a minimum of 8 inches.</td></tr>
                <tr><td>Peppers, tomatoes, and squash on a hard surface</td><td><a href={UMD_FILL}>University of Maryland Extension</a> gives a range of 12–24 inches.</td></tr>
              </tbody>
            </table>
            <p>The University of Minnesota figure describes the height of a mound above the ground. Utah State gives a height for a frame and explains when roots need access to the soil below it. UConn gives a depth of soil available to the crop, and Maryland specifies beds on hard surfaces. Those measurements can lead to different shopping quantities even when the same vegetables are on the planting list. In a ground-connected bed, count only the depth of new material you are bringing in when you calculate the order.</p>
            <p>For beds on a patio, plan the finished soil line around the crop groups you expect to plant, including what might go in the bed after the first crop comes out. Check how much room remains inside the walls once you have allowed for any headroom above the soil. If you have a shallow bed and a deep bed, measuring and calculating each separately helps you assign crops and see how much soil each bed will use.</p>
          </section>
          <section>
            <h2>Raised bed soil mix ratios</h2>
            <p>Choose the fill before you turn the total volume into a shopping list. Use <strong>Single material</strong> for a premixed product or when the job calls for a single material. To make your own blend, divide the total into ingredient volumes. For example, a volume-based recipe can be scaled with the same bucket throughout the job. Use a consistent fill level in the bucket so the small batches add up to the intended mix.</p>
            <p><a href={SFG_MIX}>The Square Foot Gardening Foundation</a> describes <strong>Mel&apos;s Mix</strong> as 1/3 coarse vermiculite, 1/3 sphagnum peat moss or coconut coir, and 1/3 blended organic compost, measured by volume, with equal scoops even when they differ in weight. The calculator gives a volume for each of those ingredients. If each product comes in a different package size, check each label when turning the ingredient volumes into whole bags.</p>
            <p><a href={UMN_RAISED}>University of Minnesota Extension</a> describes a raised bed mixture of about 1/2–2/3 topsoil and 1/3–1/2 plant-based compost, without specifying whether those proportions are by weight or by volume. The calculator uses the compost endpoints from that guidance as volume options and assigns the remainder to topsoil. When you choose the smaller compost share, a larger portion of the same bed volume goes to topsoil. The total volume stays the same.</p>
            <p>For beds with poor existing soil, <a href={UMD_FILL}>University of Maryland Extension</a> gives a compost-to-purchased-topsoil ratio of 1:2 or 1:1 for the top of the bed, without stating a measurement basis. As an alternative, <a href={UMD_FILL}>Maryland Extension</a> gives a compost-to-soilless-growing-mix ratio of 1:1, also without stating a measurement basis. In its guidance for beds on hard surfaces, <a href={UMD_FILL}>Maryland Extension</a> says that beds at least 16 inches deep may include up to 20% topsoil by volume.</p>
            <p><a href={OSU_COMPOST}>Oregon State University Extension</a> gives a separate recommendation of up to 25% compost by volume when using existing soil to fill the bed. Keep the starting material in mind when comparing recipes. A blend you buy to fill an empty frame has a different starting point from a bed you fill with soil that is already on site. Use the amount of new material the project needs to work out what to buy, and keep a note of the mix you choose for later top-ups.</p>
          </section>
          <section>
            <h2>Bags vs. bulk: How many bags of soil for a raised bed?</h2>
            <p>Use the volume printed on the bag. <a href={IOWA_SOIL}>Iowa State Extension</a> describes potting soil sold in cubic-foot bags. Divide your total cubic feet by the cubic feet shown on the bag and round up to the next whole bag whenever there is a remainder. In metric, convert your cubic meters to liters and divide by the capacity in liters. A cubic meter contains 1,000 liters. Use the same unit for the bed volume and the package volume.</p>
            <p><strong>Illustrative bag calculation:</strong> A 4 ft × 8 ft bed with 12 in of fill takes 4 × 8 × 12 ÷ 12 = 32.00 cubic feet. One cubic yard equals 27 cubic feet, so 32 ÷ 27 is about 1.19 cubic yards. Divide 32 by the example capacity of 1.5 cubic feet per bag to get about 21.33 bags. Round up to 22 bags. Use the original volume when calculating bags, since rounding the volume first can change a count near a whole-bag boundary.</p>
            <p>If you are buying the ingredients separately, round each ingredient&apos;s quantity up after dividing by the capacity on its own bag. A partly used bag of vermiculite cannot cover a shortfall in compost. When you buy the same ingredient for several matching beds, total its volume across those beds before rounding. If all ingredients have the same bag capacity, the calculator can do that split directly. The overall whole-bag estimate applies to a single fill material sold in the entered bag size.</p>
            <p>Use the cubic-yard result when a landscape supplier quotes bulk material by the yard. Ask what increments the supplier sells and how it handles delivery or pickup. Compare that order with the number of bags you would actually buy. For several beds filled with the same mix, a bulk order gives you one pile to distribute. For a top-up or a blend with several separately purchased ingredients, bag labels let you match a small volume to the material you need.</p>
          </section>
          <section>
            <h2>Should you put gravel at the bottom of a raised bed?</h2>
            <p><strong>Skip the gravel or other coarse drainage layer.</strong> <a href={WSU_DRAIN}>Washington State University</a> explains that coarse drainage material hinders water movement in containers. Gravity-driven water stays in the fine-textured layer until it saturates before moving into the coarser material underneath. <a href={WSU_CONTAINERS}>WSU Jefferson County Extension</a> also advises against coarse material at the bottom of a container because it can inhibit drainage.</p>
            <p>The research cited by WSU concerns containers. The same water-movement principle applies where fine bed soil lies over a coarse layer. The gravel would also occupy part of the space you measured for growing soil. In a frame over native soil, leave direct contact with the ground so roots and water can move into the existing soil. <a href={USU_RAISED}>Utah State University Extension</a> specifically recommends an open bottom for shallow framed beds to give roots access to that soil.</p>
            <p>For a bed on a hard surface, check where water can leave the structure. If the bed has a built-in floor, look at the drain openings and keep the path to them clear. Then select a fill depth that fits the crop and measure the full space you intend to devote to growing medium.</p>
          </section>
          <section>
            <h2>Settling: How much extra soil to plan for</h2>
            <p><a href={OSU_COMPOST}>Oregon State University Extension</a> says newly filled beds sink over time as compost in the mix continues decomposing. <a href={IOWA_SOIL}>Iowa State Extension</a> says potting soil can settle over a few days to weeks. Iowa State&apos;s timing applies to potting soil. The extension guidance gives no universal settling percentage or amount to overfill.</p>
            <p>Fill close to the top at the intended soil line, allow the soil to settle, then add more if the level drops. To estimate that top-up, measure from the settled surface to your intended line. Take readings around the bed if the surface has fallen unevenly, and multiply the footprint by the average gap or calculate smaller sections separately. The new result is the volume needed at that point, based on the bed you have in front of you.</p>
            <p>Keep a record of the fill product or the ingredients you used so you can match a later top-up. If initial bag rounding leaves you with usable material, keep it for low spots or use it to finish another bed with the same mix. Recheck the soil line when the bed is easy to reach, such as after harvest or before the next planting.</p>
          </section>
          <section>
            <h2>Refreshing raised bed soil each year</h2>
            <p>Look at the surface of an established bed before deciding what to add. Restoring a settled bed uses the volume between the current and desired soil levels. A compost topdressing uses the thickness of the layer you plan to spread. If you decide to do both, work out how much room the topdressing will occupy before ordering extra fill.</p>
            <p>For an existing vegetable bed, <a href={OSU_COMPOST}>Oregon State University Extension</a> recommends applying 1/4–1 inch of compost to the surface each year. <a href={UMD_ORGANIC}>University of Maryland Extension</a> says adding 1 inch of compost per year can help maintain garden productivity. Use the stated depth for the purpose described by each source, then multiply it by the bed&apos;s inside area to find the volume of compost for that layer.</p>
            <p>To keep up with soil settling in raised beds, <a href={ILLINOIS_REFRESH}>Illinois Extension</a> describes an annual topdressing of a few inches of compost or high-quality topsoil. In separate guidance, <a href={OSU_RAISED}>Oregon State University Extension</a> recommends covering the bed each winter with 2 inches of leaves or other organic material. That winter covering recommendation is for leaves or comparable organic material. Use the compost guidance above for the depth of a finished compost layer.</p>
            <p>Write down what you applied and where. If the surface is already at your target level after the growing season, there may be little fill volume to replace. If the level has dropped, use the current measurements for your top-up. That also helps you avoid paying to fill the same measured space twice when you plan to add compost afterward.</p>
          </section>
          <section>
            <h2>How much compost vs. how much soil?</h2>
            <p>Use this page to size the entire fill or split a new mix into ingredients. When the bed is already filled and you want to add a surface layer, start with the thickness of that amendment. See <Link href="/answers/how-much-compost-for-raised-bed">how much compost to add to a raised bed</Link> for the compost-only calculation and a worked example.</p>
          </section>
        </div>
        <FAQSection faqs={faqs} />
        <section className="mb-12">
          <h2 className="font-serif font-semibold text-[20px] tracking-tight text-moss-deep mb-5">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/tools/soil-calculator" className="group block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-5 transition-colors duration-fast">
              <p className="font-serif font-semibold text-[16px] text-ink group-hover:text-moss-deep">Soil Calculator</p>
              <p className="mt-1 font-serif text-[14px] leading-[1.6] text-soil">Estimate soil for rectangular or circular garden areas and containers.</p>
            </Link>
            <Link href="/tools/compost-calculator" className="group block bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] hover:border-moss-deep rounded-md p-5 transition-colors duration-fast">
              <p className="font-serif font-semibold text-[16px] text-ink group-hover:text-moss-deep">Compost Calculator</p>
              <p className="mt-1 font-serif text-[14px] leading-[1.6] text-soil">Convert your planned compost layer into volume and bags.</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
