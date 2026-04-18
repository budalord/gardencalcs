import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import type { ToolFAQ } from '@/config/tools'

const CompostCalculator = dynamic(() => import('@/components/CompostCalculator'), {
  loading: () => (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
      Loading compost calculator…
    </div>
  ),
})

const pageTitle = 'Compost Calculator | Bag, Volume & Area Guide'
const pageDescription = 'Compost calculator with cubic-yard formulas, raised-bed and lawn examples, Cornell C:N ratio table, and extension-based compost FAQ answers.'
const toolUrl = `${siteConfig.domain}/tools/compost-calculator`

const materialRows = [
  {
    material: 'Dry leaves',
    ratio: '40-80:1',
    type: 'Brown',
    sourceUrl: 'https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf',
    sourceNote: 'Cornell Appendix A Table A.1: Leaves, loose and dry — range 40-80',
  },
  {
    material: 'Grass clippings',
    ratio: '9-25:1',
    type: 'Green',
    sourceUrl: 'https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf',
    sourceNote: 'Cornell Appendix A Table A.1: Grass clippings — range 9-25',
  },
  {
    material: 'Coffee grounds',
    ratio: '20:1',
    type: 'Green',
    sourceUrl: 'https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf',
    sourceNote: 'Cornell Appendix A Table A.1: Coffee grounds — typical 20',
  },
  {
    material: 'Food scraps',
    ratio: '14-16:1',
    type: 'Green',
    sourceUrl: 'https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf',
    sourceNote: 'Cornell Appendix A Table A.1: Garbage (food waste) — typical 14-16',
  },
  {
    material: 'Sawdust',
    ratio: '200-750:1',
    type: 'Brown',
    sourceUrl: 'https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf',
    sourceNote: 'Cornell Appendix A Table A.1: Sawdust — range 200-750',
  },
  {
    material: 'Straw',
    ratio: '48-150:1',
    type: 'Brown',
    sourceUrl: 'https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf',
    sourceNote: 'Cornell Appendix A Table A.1: Straw, general — range 48-150',
  },
  {
    material: 'Horse manure',
    ratio: '22-50:1',
    type: 'Green',
    sourceUrl: 'https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf',
    sourceNote: 'Cornell Appendix A Table A.1: Horse, general — range 22-50',
  },
  {
    material: 'Corrugated cardboard',
    ratio: '563:1',
    type: 'Brown',
    sourceUrl: 'https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf',
    sourceNote: 'Cornell Appendix A Table A.1: Corrugated cardboard — typical 563',
  },
] as const

const faqs: ToolFAQ[] = [
  {
    q: 'What is the ideal carbon-to-nitrogen ratio for compost?',
    a: 'A starting C:N ratio around 30:1 is the usual target for active composting. That range gives microbes enough carbon for energy and enough nitrogen for growth without pushing the pile into a smelly, ammonia-heavy state. Finished compost usually ends up much lower than the starting ratio because carbon is lost as carbon dioxide during decomposition.',
    sourceUrl: 'https://extension.colostate.edu/resource/making-compost/',
    displayHtml: 'A starting <strong>C:N ratio around 30:1</strong> is the usual target for active composting. That range gives microbes enough carbon for energy and enough nitrogen for growth without pushing the pile into a smelly, ammonia-heavy state. Finished compost usually ends up much lower than the starting ratio because carbon is lost as carbon dioxide during decomposition. <a href="https://extension.colostate.edu/resource/making-compost/">Source</a>.',
  },
  {
    q: 'What should I avoid putting in a home compost pile?',
    a: 'Home compost piles should avoid meat, bones, grease, dairy products, pet feces, and diseased plant material unless your system is managed hot enough to kill pathogens reliably. Those materials either attract pests, create odor, or raise disease risk. A backyard pile is usually safest when it focuses on yard waste, fruit and vegetable scraps, coffee grounds, and similar plant-based feedstocks.',
    sourceUrl: 'https://extension.umn.edu/managing-soil-and-nutrients/composting-home-gardens',
    displayHtml: 'Home compost piles should avoid <strong>meat, bones, grease, dairy products, pet feces, and diseased plant material</strong> unless your system is managed hot enough to kill pathogens reliably. Those materials either attract pests, create odor, or raise disease risk. A backyard pile is usually safest when it focuses on yard waste, fruit and vegetable scraps, coffee grounds, and similar plant-based feedstocks. <a href="https://extension.umn.edu/managing-soil-and-nutrients/composting-home-gardens">Source</a>.',
  },
  {
    q: 'Why does compost smell bad or stay too wet?',
    a: 'A sour or rotten smell usually means the pile is too wet, too compacted, or too nitrogen-heavy for the available air. The fix is usually to add dry browns, increase turning, and break up dense layers so oxygen can move back through the pile. Odor is often less of a “mystery problem” than a sign that the C:N balance, moisture level, or aeration slipped out of range.',
    sourceUrl: 'https://extension.illinois.edu/composting/troubleshooting-composting-problems',
    displayHtml: 'A sour or rotten smell usually means the pile is <strong>too wet, too compacted, or too nitrogen-heavy for the available air</strong>. The fix is usually to add dry browns, increase turning, and break up dense layers so oxygen can move back through the pile. Odor is often less of a “mystery problem” than a sign that the C:N balance, moisture level, or aeration slipped out of range. <a href="https://extension.illinois.edu/composting/troubleshooting-composting-problems">Source</a>.',
  },
  {
    q: 'How do I know when compost is finished and ready to use?',
    a: 'Finished compost should look dark and crumbly, smell earthy instead of sour, and no longer show obvious pieces of the original feedstock. It may still cure after active heating stops, so many extension guides recommend giving it extra time before heavy use around sensitive roots. If the pile is still heating strongly or you can still identify many raw scraps, it is not finished yet.',
    sourceUrl: 'https://extension.illinois.edu/composting/questions-about-composting',
    displayHtml: 'Finished compost should look <strong>dark and crumbly, smell earthy instead of sour, and no longer show obvious pieces of the original feedstock</strong>. It may still cure after active heating stops, so many extension guides recommend giving it extra time before heavy use around sensitive roots. If the pile is still heating strongly or you can still identify many raw scraps, it is not finished yet. <a href="https://extension.illinois.edu/composting/questions-about-composting">Source</a>.',
  },
  {
    q: 'Should I turn the pile, cover it, or both?',
    a: 'Turning and covering solve different problems. Turning restores oxygen and mixes wet and dry zones, while covering helps control excess rain and keeps moisture from swinging too far. In many backyard setups the best answer is both: turn when the pile compacts or cools, and cover when weather would otherwise soak the pile or leach nutrients out of it.',
    sourceUrl: 'https://extension.oregonstate.edu/ask-extension/featured/composting-should-i-turn-cover-or-both',
    displayHtml: 'Turning and covering solve different problems. <strong>Turning restores oxygen and mixes wet and dry zones</strong>, while covering helps control excess rain and keeps moisture from swinging too far. In many backyard setups the best answer is both: turn when the pile compacts or cools, and cover when weather would otherwise soak the pile or leach nutrients out of it. <a href="https://extension.oregonstate.edu/ask-extension/featured/composting-should-i-turn-cover-or-both">Source</a>.',
  },
  {
    q: 'Can I compost diseased plants such as powdery mildew material?',
    a: 'You can compost some diseased plant material only if your system reliably reaches and holds temperatures high enough to suppress the disease. In cooler or loosely managed home piles, diseased material is riskier because pathogens may survive and move back into the garden later. If you cannot manage a hot pile consistently, it is safer to keep questionable material out of the finished compost stream.',
    sourceUrl: 'https://extension.oregonstate.edu/ask-extension/featured/can-i-compost-plants-powdery-mildew',
    displayHtml: 'You can compost some diseased plant material only if your system reliably reaches and holds temperatures high enough to suppress the disease. In cooler or loosely managed home piles, diseased material is riskier because pathogens may survive and move back into the garden later. If you cannot manage a hot pile consistently, it is safer to keep questionable material out of the finished compost stream. <a href="https://extension.oregonstate.edu/ask-extension/featured/can-i-compost-plants-powdery-mildew">Source</a>.',
  },
]

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Compost Calculator',
  description: pageDescription,
  url: toolUrl,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to use the Compost Calculator',
  step: [
    { '@type': 'HowToStep', position: 1, text: 'Start with the area or bin size you want to evaluate, then decide whether you are estimating finished compost volume or balancing a fresh pile.' },
    { '@type': 'HowToStep', position: 2, text: 'Use the depth or bin-dimension inputs to estimate how many cubic feet or cubic yards of compost you need.' },
    { '@type': 'HowToStep', position: 3, text: 'Add your greens and browns by material type to compare the current pile against the target C:N ratio.' },
    { '@type': 'HowToStep', position: 4, text: 'Check the reference table and troubleshooting notes before adjusting moisture, aeration, or material mix.' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteConfig.domain}/tools` },
    { '@type': 'ListItem', position: 3, name: 'Compost Calculator', item: toolUrl },
  ],
}

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: toolUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: toolUrl,
    type: 'website',
  },
}

export default function CompostCalculatorPage() {
  return (
    <main className="bg-gray-50 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-5xl mx-auto px-4">
        <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-green-700">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Compost Calculator</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900">Compost Calculator</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-gray-600">
          Use one page to estimate finished compost volume, translate depth into bag or cubic-yard needs, and check whether your browns and greens are close to a workable starting mix.
        </p>

        <section className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-800">Quick answer</p>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            If your real question is <strong>how much compost do I need</strong>, start with area and depth, not bag marketing. For finished compost, cubic feet = square feet × depth in inches ÷ 12, and cubic yards = square feet × depth in inches ÷ 324. If your real question is the right starting pile blend, aim for roughly a 30:1 starting <strong>C:N ratio</strong> and adjust browns and greens from there.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-green-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Scenario</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Formula</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">What it tells you</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Bed or lawn topdressing</td>
                  <td className="px-3 py-3 text-gray-700">sq ft × depth (in) ÷ 12 = cubic feet</td>
                  <td className="px-3 py-3 text-gray-700">Best for compost for raised bed or compost for lawn examples.</td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Bulk order estimate</td>
                  <td className="px-3 py-3 text-gray-700">sq ft × depth (in) ÷ 324 = cubic yards</td>
                  <td className="px-3 py-3 text-gray-700">Use this when buying by the yard instead of by the bag.</td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Bag count</td>
                  <td className="px-3 py-3 text-gray-700">cubic feet needed ÷ bag size (cu ft)</td>
                  <td className="px-3 py-3 text-gray-700">Turns the same volume into 1-cu-ft, 1.5-cu-ft, or 2-cu-ft bag counts.</td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Fast pile target</td>
                  <td className="px-3 py-3 text-gray-700">start near 30:1</td>
                  <td className="px-3 py-3 text-gray-700">Keeps browns and greens close to a practical starting compost ratio.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-7 text-gray-700">
            Example: a 4 × 8 raised bed is 32 sq ft. A 1-inch compost layer needs 32 × 1 ÷ 12 = 2.67 cubic feet, or about 1.78 bags if you buy 1.5-cu-ft bags. A 1,000-sq-ft lawn topdressed at 1/4 inch needs 1,000 × 0.25 ÷ 324 = 0.77 cubic yards.
          </p>
          <p className="mt-3 text-xs leading-6 text-gray-500">
            Formula section is math-derived. Compost ratio target is supported by <a className="text-green-700 underline" href="https://extension.colostate.edu/resource/making-compost/">Colorado State Extension</a>. Material C:N values below are quoted from <a className="text-green-700 underline" href="https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf">Cornell Waste Management Institute Appendix A</a> so the ranges stay exactly as published.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">What a compost calculator should help you estimate</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A good compost calculator should solve two different problems that often get blurred together. The first problem is finished-compost demand: how much compost do I need for this bed, border, container refresh, or lawn topdressing job? That is a volume question. You already know your area and depth goal, and you need a clean conversion into cubic feet, cubic yards, or bag counts. The second problem is fresh-pile balance: what&apos;s the right compost ratio if I am building a pile from leaves, grass, food scraps, manure, and paper products? That is a recipe question built around browns and greens, moisture, and a workable C:N ratio.
            </p>
            <p>
              The current search landscape mixes those two intents under one phrase, which is why a single thin tool page usually underperforms. Some searchers want to buy compost and spread it. Others want to build compost from raw materials and need to know whether the pile is too wet, too dry, too carbon-heavy, or too nitrogen-heavy. This page is structured to keep those jobs separate enough to stay clear while still letting one <strong>compost calculator</strong> page answer both.
            </p>
            <p>
              That separation also protects performance. The first screen should not force a visitor to decode a full interactive tool before they get an answer. If the fastest answer is volume math, the page should show that immediately in server-rendered text. If the next task is pile balancing, the page should move into <strong>browns and greens</strong>, material ratios, and troubleshooting after the quick answer. That is better for humans and better for mobile LCP than leading with a heavy client-only block.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">How much compost do I need for beds, lawns, and topdressing</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              The fastest way to estimate finished compost is to ignore the pile recipe for a moment and focus only on the application layer. One inch of compost over a bed is simply a thin volume spread across a flat area. That is why the key conversion is area multiplied by depth. Once you have cubic feet or cubic yards, you can decide whether a bagged product, a bulk delivery, or your own cured pile is the cheapest path.
            </p>
            <p>
              This matters for <strong>compost for raised bed</strong> planning because small beds can look modest but still consume several bags once you spread an even layer. It matters for <strong>compost for lawn</strong> topdressing because lawns multiply area so fast that a shallow fraction of an inch can still turn into a bulk order. It also matters for side jobs like refreshing container mix, backfilling tree-planting zones, or blending compost into new garden soil before a planting season.
            </p>
            <p>
              Keep one distinction clear: this calculator can tell you the physical amount you need, but not every project needs the same finished depth. Your job is to choose the depth you want to model, then let the math turn it into cubic footage. That means the examples on this page are examples, not universal prescriptions. If you want to test a 1-inch layer, use 1 inch. If you want to model a shallower 1/4-inch topdress on turf, use 1/4 inch and compare the resulting yardage before you buy or spread material.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Compost volume conversions for cubic feet, cubic yards, and bag counts</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Two conversions do nearly all the work on the volume side. First, cubic feet = square feet × depth in inches ÷ 12. Second, cubic yards = cubic feet ÷ 27, which is the same as square feet × depth in inches ÷ 324. Those formulas are enough to estimate a raised bed, a row block, a front-yard lawn strip, or any other rectangular planting area. If your shape is irregular, break it into rectangles, calculate each piece, and add them together.
            </p>
            <p>
              Bag counts are simply one more division problem. If your plan needs 5 cubic feet of compost and your local yard center sells 1.5-cubic-foot bags, then 5 ÷ 1.5 = 3.33, so you need 4 bags in practice. If you have a larger area, the cubic-yard number often reveals when bagged compost stops making sense. That is why the “how much compost” side of this page belongs ahead of the pile-ratio discussion: it gives a direct shopping and spreading answer before the user even touches the recipe side.
            </p>
            <p>
              If you are also building your own pile, these same conversions still help. A compost bin that looks full may not yield the same finished volume after decomposition because carbon is lost as carbon dioxide and the pile settles as large particles collapse. So when you compare bin size, pile size, and finished application needs, plan for shrinkage rather than assuming one cubic yard of fresh ingredients becomes one cubic yard of finished compost.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <CompostCalculator />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">What’s the right compost ratio for fast decomposition</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Once the volume question is settled, the page can move into the second intent: what&apos;s the right compost ratio for the starting pile? Extension guidance usually points gardeners toward a starting <strong>C:N ratio</strong> around 30:1 because microbes need both carbon and nitrogen to work efficiently. Carbon-rich material provides energy and structure. Nitrogen-rich material supports microbial growth. If you drive the mixture too far toward nitrogen, the pile can smell like ammonia, mat down, and go short on oxygen. If you drive it too far toward carbon, decomposition slows and the pile can sit cool for weeks.
            </p>
            <p>
              This is why “greens versus browns” is a useful shortcut but not the whole story. Two brown materials can be very different from each other. Corrugated cardboard behaves very differently from leaves, and sawdust behaves very differently from straw. The same is true on the green side: coffee grounds, food scraps, and manures are not interchangeable once you look at their published C:N values. A good compost calculator therefore should not just say “add more brown” or “add more green.” It should help the user see which brown or green changes the pile fastest and by how much.
            </p>
            <p>
              The safest way to present that information is to keep the original published values exactly as they appear in the source. Where Cornell Appendix A gives a range, the table below preserves the range. Where it gives a single typical value, the table preserves that number. That prevents the page from smearing several data points into one made-up average and keeps the ratio table honest about real-world variability.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Browns and greens: common compost materials and their C:N ratios</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              The table below is the anchor for the recipe side of this page. It turns vague ingredient labels into explicit ratio ranges you can compare. If your pile is heavy on leaves and cardboard, the carbon side will dominate and the pile may need more green material to wake up. If your pile is heavy on food scraps, grass clippings, or manure, it may need more dry structure to keep odor and moisture under control.
            </p>
            <p>
              Keep in mind that the numbers represent raw-material characteristics, not guarantees about the finished pile. Moisture, particle size, turning frequency, and compaction still matter. But getting within the right neighborhood with material ratios saves a huge amount of troubleshooting later.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Material</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">C:N ratio</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Type</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Source URL</th>
                </tr>
              </thead>
              <tbody>
                {materialRows.map((row) => (
                  <tr key={row.material} className="border-t border-gray-200 align-top">
                    <td className="px-3 py-3 font-medium text-gray-900">{row.material}</td>
                    <td className="px-3 py-3 text-gray-700">{row.ratio}</td>
                    <td className="px-3 py-3 text-gray-700">{row.type}</td>
                    <td className="px-3 py-3 text-gray-700">
                      <a className="text-green-700 underline break-all" href={row.sourceUrl}>{row.sourceUrl}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-6 text-gray-500">
            All ratios above are quoted directly from Cornell Waste Management Institute Appendix A Table A.1. Ranges remain ranges; single values remain single values. No synthetic averaging was added for this page.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">How to use finished compost without overapplying it</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Finished compost is useful because it changes soil structure as much as it changes fertility. In a raised bed it can improve tilth, water holding, and root movement. In a lawn topdress it can soften surface compaction and add organic matter near the crown zone. Around established plantings it can act as a thin organic amendment layer without asking the gardener to till aggressively around roots. But none of that means “more is always better.”
            </p>
            <p>
              The volume formulas on this page help prevent overapplication by forcing the physical amount into the open. If a spreading plan turns into a surprisingly large cubic-yard order, that is often a sign to revisit the target depth before the material arrives. This is also the place to pair the calculator with your own management goals. If you are mostly refreshing soil structure in a vegetable plot, you may model one thin layer. If you are comparing bag counts for a decorative border, you may model a different depth. The right number is the one tied to your job, not a generic marketing phrase on the compost bag.
            </p>
            <p>
              If you want a broader soil-building walkthrough after the math, the site&apos;s <Link className="text-green-700 underline" href="/guides/composting-guide">composting guide</Link> is the next read. It is especially useful when you want to connect finished compost use back to pile-building strategy instead of treating them as separate chores.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Slow pile, bad smell, or soggy compost: what to fix first</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Most backyard compost failures come from one of three imbalances: not enough oxygen, too much water, or a starting ingredient mix that swings too far toward one side of the C:N equation. A slow pile often points to too much carbon, not enough moisture, or not enough turning. A sour-smelling pile usually points to compaction, excess water, or too much nitrogen without enough structure. A pile that heats hard and then collapses into odor can still be a ratio problem; it is just revealing the imbalance later in the process instead of immediately.
            </p>
            <p>
              Start troubleshooting with the easiest observations. Does the pile smell earthy or unpleasant? Does it feel like a wrung-out sponge, or does water squeeze out easily? Are the materials fluffy enough for air to move, or are they matted together into a dense slab? Once you answer those questions, use the material table to decide whether the next adjustment should be more leaves, more cardboard, more grass, more food scraps, or simply more turning. Troubleshooting gets faster when you know what each ingredient is doing instead of treating all browns and all greens as equal.
            </p>
            <p>
              For a longer breakdown of pile setup, curing, and feedstock selection, visit the <Link className="text-green-700 underline" href="/guides/composting-guide">composting guide</Link>. It complements this calculator by explaining why the numbers matter once the pile is on the ground and weather starts working against your plan.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <summary className="cursor-pointer text-base font-semibold text-gray-900">{faq.q}</summary>
                <div className="mt-3 text-sm leading-7 text-gray-600 [&_a]:text-green-700 [&_a]:underline" dangerouslySetInnerHTML={{ __html: faq.displayHtml ?? faq.a }} />
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Helpful next steps</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/guides/composting-guide" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Read the full composting guide</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use this after the calculator if you want a slower, step-by-step explanation of pile setup, turning, curing, and material selection.</p>
            </Link>
            <Link href="/tools/fertilizer-calculator" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Compare compost with fertilizer planning</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Helpful when you want to separate organic matter planning from nutrient-rate calculations in vegetable beds.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
