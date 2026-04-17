import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import FAQSection from '@/components/FAQSection'
import type { ToolFAQ } from '@/config/tools'
import FertilizerCalculator from './FertilizerCalculator'

const pageTitle = 'Fertilizer Calculator | Crop Guide & Rate Chart'
const pageDescription = 'Fertilizer calculator with rate conversions, crop feeding chart, side-dress timing, and extension-based FAQ answers for home gardens'
const toolUrl = `${siteConfig.domain}/tools/fertilizer-calculator`

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

const cropRows = [
  {
    crop: 'Tomato',
    recommendation: 'N 0.30 / P soil-test based / K soil-test based',
    frequency: 'Pre-plant, then side-dress when first fruits form',
    sources: [
      'https://extension.umd.edu/resource/fertilizing-vegetables/',
      'https://extension.unr.edu/publication.aspx?PubID=3167',
    ],
  },
  {
    crop: 'Pepper',
    recommendation: 'N 0.30 / P soil-test based / K soil-test based',
    frequency: 'Pre-plant, then side-dress when first fruits form',
    sources: [
      'https://extension.umd.edu/resource/fertilizing-vegetables/',
      'https://extension.unr.edu/publication.aspx?PubID=3167',
    ],
  },
  {
    crop: 'Potato',
    recommendation: 'N 0.30 / P soil-test based / K soil-test based',
    frequency: 'Pre-plant, then side-dress when tubers first form',
    sources: ['https://extension.umd.edu/resource/fertilizing-vegetables/'],
  },
  {
    crop: 'Broccoli',
    recommendation: 'N 0.30 / P soil-test based / K soil-test based',
    frequency: 'Pre-plant, then side-dress 3 weeks after transplanting',
    sources: ['https://extension.umd.edu/resource/fertilizing-vegetables/'],
  },
  {
    crop: 'Onion',
    recommendation: 'N 0.30 / P soil-test based / K soil-test based',
    frequency: 'Pre-plant, then side-dress once as bulbs enlarge',
    sources: ['https://extension.umd.edu/resource/fertilizing-vegetables/'],
  },
  {
    crop: 'Garlic',
    recommendation: 'N 0.30 / P soil-test based / K soil-test based',
    frequency: 'Pre-plant, then side-dress twice during active spring growth',
    sources: ['https://extension.umd.edu/resource/fertilizing-vegetables/'],
  },
  {
    crop: 'Sweet corn',
    recommendation: 'N 0.30 / P soil-test based / K soil-test based',
    frequency: 'Pre-plant, then side-dress at 12–18 in and again near tasseling',
    sources: [
      'https://extension.umd.edu/resource/fertilizing-vegetables/',
      'https://extension.unr.edu/publication.aspx?PubID=3167',
    ],
  },
  {
    crop: 'Beet',
    recommendation: 'N 0.30 / P soil-test based / K soil-test based',
    frequency: 'Heavy-feeder profile; feed before planting and monitor vigor mid-season',
    sources: ['https://extension.umd.edu/resource/fertilizing-vegetables/'],
  },
  {
    crop: 'Lettuce',
    recommendation: 'N 0.25 / P 0.25 / K 0.25',
    frequency: 'Balanced pre-plant feed; side-dress romaine and crisphead if growth slows',
    sources: [
      'https://extension.unh.edu/resource/fertilizing-vegetable-gardens-fact-sheet',
      'https://extension.umd.edu/resource/fertilizing-vegetables/',
    ],
  },
  {
    crop: 'Cucumber',
    recommendation: 'N 0.20 / P soil-test based / K soil-test based',
    frequency: 'Pre-plant, then side-dress when fruits start to form',
    sources: ['https://extension.umd.edu/resource/fertilizing-vegetables/'],
  },
] as const

const faqs: ToolFAQ[] = [
  {
    q: 'How do you calculate how much fertilizer you need?',
    a: 'Start with the nutrient you actually need, not the product weight printed on the bag. If a recommendation calls for 0.20 lb of actual nitrogen per 100 square feet and your fertilizer is 10% nitrogen, divide 0.20 by 0.10 to get 2.0 lb of product for the same area. That same logic works for phosphorus and potassium products too.',
    sourceQuery: 'fertilizer calculator',
    sourceUrl: 'https://njaes.rutgers.edu/FS839/',
  },
  {
    q: 'How much fertilizer should I use on my vegetable garden?',
    a: 'The best answer comes from a soil test, but a common home-garden fallback is to work from a known recommendation instead of guessing. Extension guidance often uses a pre-plant complete fertilizer or an actual-nitrogen target per 100 square feet, then adjusts timing and side-dressing by crop. The key is matching the nutrient basis and the area unit before you spread anything.',
    sourceQuery: 'how much fertilizer vegetable garden',
    sourceUrl: 'https://extension.unh.edu/resource/fertilizing-vegetable-gardens-fact-sheet',
  },
  {
    q: 'When should I fertilize vegetables in a home garden?',
    a: 'Most vegetables need some nutrients before planting, then a second pass only if the crop is a heavier feeder or shows a real need during growth. Pre-plant fertilizer is usually mixed into the rooting zone, while sidedress applications are timed around rapid growth, bulb expansion, or fruit set. Applying too early or too late wastes nutrients and can reduce yield quality.',
    sourceQuery: 'when should i fertilize vegetables',
    sourceUrl: 'https://www.pubs.ext.vt.edu/426/426-323/426-323.html',
  },
  {
    q: 'Can you over-fertilize a vegetable garden?',
    a: 'Yes. Too much fertilizer can burn roots, push soft leafy growth, reduce flowering and fruiting, and increase nutrient losses to runoff or groundwater. Nitrogen is especially easy to overapply because it is often added repeatedly without checking the original soil test or the crop’s stage. More product is not the same as better nutrition.',
    sourceQuery: 'can you over fertilize a vegetable garden',
    sourceUrl: 'https://extension.oregonstate.edu/catalog/ec-1503-fertilizing-your-garden-vegetables-fruits-ornamentals',
  },
  {
    q: 'What do the three numbers on fertilizer mean?',
    a: 'The three numbers are always fertilizer grade in this order: nitrogen, phosphorus as P₂O₅, and potassium as K₂O. A label such as 5-10-15 means 5% nitrogen, 10% phosphate, and 15% potash by weight. Those percentages tell you how much actual nutrient is inside a given amount of product, which is why they matter more than the brand name on the bag.',
    sourceQuery: 'what do the 3 numbers on fertilizer mean',
    sourceUrl: 'https://extension.unr.edu/publication.aspx?PubID=3167',
  },
  {
    q: 'Is slow-release fertilizer better than quick-release fertilizer?',
    a: 'Neither is universally better. Quick-release fertilizer acts fast and is useful when plants clearly need nitrogen soon, but it is easier to leach or overapply. Slow-release products spread feeding across a longer window and are often easier to manage in home beds, especially when you want steadier growth and fewer repeated applications.',
    sourceQuery: 'slow-release vs quick-release fertilizer extension',
    sourceUrl: 'https://extension.illinois.edu/blogs/good-growing/2020-04-15-starting-garden-fertilization',
  },
  {
    q: 'Do I need a soil test before adding fertilizer?',
    a: 'A soil test is the safest starting point because it tells you whether phosphorus, potassium, pH correction, or organic matter are already adequate. Without that test, gardeners often add nutrients that are not limiting growth and miss the one that is. Extension guidance generally treats soil testing as the first step for accurate, efficient fertilizer planning.',
    sourceQuery: 'soil test before fertilizer extension',
    sourceUrl: 'https://extensionpubs.unl.edu/publication/g945/2007/html/view',
  },
]

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Fertilizer Calculator',
  description: pageDescription,
  url: toolUrl,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to use the Fertilizer Calculator',
  step: [
    { '@type': 'HowToStep', position: 1, text: 'Choose a preset fertilizer analysis or enter a custom N-P₂O₅-K₂O grade from your bag.' },
    { '@type': 'HowToStep', position: 2, text: 'Enter the garden area in square meters.' },
    { '@type': 'HowToStep', position: 3, text: 'Run the calculator to estimate fertilizer product weight and nutrient delivery.' },
    { '@type': 'HowToStep', position: 4, text: 'Compare the result with the crop table and side-dress timing guidance before applying.' },
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
    { '@type': 'ListItem', position: 3, name: 'Fertilizer Calculator', item: toolUrl },
  ],
}

export default function FertilizerCalculatorPage() {
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
          <span className="text-gray-900">Fertilizer Calculator</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900">Fertilizer Calculator</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-gray-600">
          Use one page to estimate fertilizer product weight, compare crop feeding profiles, and convert the same recommendation across home-garden units before you spread anything.
        </p>

        <section className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-800">Quick answer</p>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            A good fertilizer plan starts with actual nutrient need, then converts that target into product weight using the grade on the bag. For most home beds, nitrogen drives the first estimate; phosphorus and potassium should usually follow soil-test guidance rather than guesswork.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border border-green-200 bg-white text-sm">
              <thead>
                <tr>
                  <th className="border-b border-green-200 px-3 py-2 text-left font-semibold text-gray-900">Conversion</th>
                  <th className="border-b border-green-200 px-3 py-2 text-left font-semibold text-gray-900">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-t border-green-100 px-3 py-2 text-gray-700">1 acre = 43,560 sq ft</td>
                  <td className="border-t border-green-100 px-3 py-2 text-gray-700">Use this to move field recommendations into home-garden units.</td>
                </tr>
                <tr>
                  <td className="border-t border-green-100 px-3 py-2 text-gray-700">1 lb/acre = 0.00230 lb/100 sq ft</td>
                  <td className="border-t border-green-100 px-3 py-2 text-gray-700">Divide any lb/acre value by 435.6.</td>
                </tr>
                <tr>
                  <td className="border-t border-green-100 px-3 py-2 text-gray-700">1 lb/acre = 0.112 g/m²</td>
                  <td className="border-t border-green-100 px-3 py-2 text-gray-700">Useful when extension recommendations are in field units but your bed is metric.</td>
                </tr>
                <tr>
                  <td className="border-t border-green-100 px-3 py-2 text-gray-700">0.20 lb/100 sq ft = 9.76 g/m²</td>
                  <td className="border-t border-green-100 px-3 py-2 text-gray-700">A common home-garden nitrogen baseline for many vegetable beds.</td>
                </tr>
                <tr>
                  <td className="border-t border-green-100 px-3 py-2 text-gray-700">0.30 lb/100 sq ft = 14.65 g/m²</td>
                  <td className="border-t border-green-100 px-3 py-2 text-gray-700">A practical heavy-feeder nitrogen target used by some extension guides.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-7 text-gray-700">
            Full derivation once, in plain math: because 1 acre is 43,560 sq ft, one field pound per acre becomes 1 ÷ 435.6 = 0.00230 lb per 100 sq ft. To move from lb/100 sq ft to g/m², multiply pounds by 453.592 grams and divide by 9.2903 m², so 0.20 lb/100 sq ft becomes (0.20 × 453.592) ÷ 9.2903 = 9.76 g/m².
          </p>
          <p className="mt-3 text-xs leading-6 text-gray-500">
            Sources: <a className="text-green-700 underline" href="https://extension.umd.edu/resource/fertilizing-vegetables/">University of Maryland Extension</a>, <a className="text-green-700 underline" href="https://extension.unh.edu/resource/fertilizing-vegetable-gardens-fact-sheet">UNH Extension</a>, <a className="text-green-700 underline" href="https://njaes.rutgers.edu/FS839/">Rutgers NJAES</a>.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <FertilizerCalculator />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">What an NPK fertilizer calculator actually solves</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Most gardeners do not struggle with reading a fertilizer bag—they struggle with turning that bag into the right amount for a real bed. A fertilizer calculator bridges that gap. Instead of starting with a brand name or a catchy vegetable blend, it starts with nutrient concentration and area. That matters because a 10-10-10, a 15-15-15, and a 46-0-0 product can all be “fertilizer,” but each one delivers nutrients at a completely different rate per pound.
            </p>
            <p>
              The second problem it solves is unit mismatch. Extension recommendations may be written in pounds per acre, pounds per 1,000 square feet, pounds per 100 square feet, ounces per row, or grams per square meter. Home gardeners often use a 4×8 bed, a few containers, or one short row, so copying a field number directly almost always creates overapplication. This page brings those units into one place so the calculation is transparent before product ever hits the soil.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">NPK basics: what the three numbers really mean</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Fertilizer grade is always listed as nitrogen, phosphorus, and potassium in that order. Commercial labels express phosphorus as P₂O₅ and potassium as K₂O, which is why the label numbers are not the same thing as elemental P and elemental K. A 5-10-15 fertilizer is 5% nitrogen, 10% phosphate, and 15% potash by weight. If you buy 10 pounds of it, you are not buying 10 pounds of each nutrient—you are buying 0.5 pound of N, 1 pound of P₂O₅, and 1.5 pounds of K₂O.
            </p>
            <p>
              That distinction matters when you compare products. A complete fertilizer supplies all three macronutrients, while an incomplete fertilizer such as 46-0-0 or 15-0-0 is really being used as a delivery tool for one main nutrient. Gardeners usually run into trouble when they chase a product instead of the actual nutrient target. The better workflow is to ask: how much actual N, P₂O₅, and K₂O does the bed need, then which product meets that target with the least guesswork?
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Application-rate conversions: lb/acre, lb/100 sq ft, and g/m²</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Many extension nutrient guides were written for growers managing rows or field acreage, but home-garden beds are much smaller. The safest way to scale a recommendation down is to preserve the nutrient basis, then convert the area. If a crop guide recommends 90 lb of actual nitrogen per acre, divide 90 by 435.6 to get 0.207 lb of actual nitrogen per 100 square feet. Then, if you garden in metric, multiply by 453.592 and divide by 9.2903 to get about 10.1 g/m².
            </p>
            <p>
              The product conversion happens after the area conversion. Suppose your target is 0.20 lb of actual N per 100 square feet and your product is 10% nitrogen. Divide 0.20 by 0.10 and you get 2.0 lb of fertilizer product for that 100-square-foot space. If the same target is met with a 20% nitrogen product, the product weight is cut in half. That is why product grade is a math input, not a shortcut to the recommendation itself.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Fertilizer recommendations for common vegetable crops</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              The quick-reference table below is designed for home-garden planning, not for commercial nutrient prescriptions. It intentionally lists actual nutrient targets instead of product weight so you can plug them into the calculator no matter which fertilizer analysis you buy. Where extension guidance emphasizes nitrogen management and treats phosphorus and potassium as soil-test-driven, the table says that explicitly instead of pretending there is one universal P and K number for every bed.
            </p>
            <p>
              The frequency column matters as much as the nutrient line. Some crops need only a pre-plant application, while others perform better when part of the nitrogen is held back for side-dressing at head set, bulb expansion, tasseling, or first fruit. If you ignore timing, even the right nutrient amount can be delivered at the wrong biological moment.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Crop</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">N-P-K recommendation (actual nutrient, lb/100 sq ft)</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Frequency</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Source URL</th>
                </tr>
              </thead>
              <tbody>
                {cropRows.map((row) => (
                  <tr key={row.crop} className="border-t border-gray-200 align-top">
                    <td className="px-3 py-3 font-medium text-gray-900">{row.crop}</td>
                    <td className="px-3 py-3 text-gray-700">{row.recommendation}</td>
                    <td className="px-3 py-3 text-gray-700">{row.frequency}</td>
                    <td className="px-3 py-3 text-gray-700">
                      <div className="space-y-2">
                        {row.sources.map((source) => (
                          <div key={source}>
                            <a className="text-green-700 underline break-all" href={source}>{source}</a>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-6 text-gray-500">
            Note: home-garden quick reference, actual nutrient basis, not product weight. Where a source gives nitrogen management and leaves phosphorus or potassium to soil-test guidance, this table preserves that wording instead of inventing bag-rate numbers.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Slow-release vs quick-release fertilizer: when to use each</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Quick-release fertilizer acts fast because nutrients dissolve and move into the root zone quickly. That makes it useful when plants are pale, recently transplanted, or clearly short on nitrogen during active growth. The tradeoff is that nutrients are easier to leach beyond the root zone, especially with frequent irrigation, sandy soil, or heavy rain. Quick-release products therefore require better timing discipline than many gardeners expect.
            </p>
            <p>
              Slow-release fertilizer is usually easier to manage on a home scale because it spreads nutrient release over time. That can reduce peaks and valleys in feeding, lower the odds of burn, and cut the number of repeat applications in beds that are already mulched and irrigated well. It is not magic, though: if the nutrient program itself is wrong, a slow-release product simply releases the wrong program more gradually. The calculator still helps because the nutrient basis has to be correct before the release style matters.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Risks of overapplication and salt injury</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Overfertilizing is not just a waste problem; it is a plant stress problem. Excess nitrogen can push lush foliage and weak stems, delay flowering, or reduce fruit quality in crops such as tomatoes and cucumbers. Too much total fertilizer can also raise salt concentration around roots, making it harder for plants to take up water even when soil appears moist. In containers and raised beds, that problem shows up even faster because the root zone is smaller.
            </p>
            <p>
              The easiest way to avoid fertilizer burn is to keep three distinctions clear: actual nutrient versus product weight, pre-plant application versus side-dress timing, and crop need versus generic bag directions. If a label rate looks high, check whether it assumes a much larger field area or a different nutrient target than your bed. When in doubt, use the lower end of the supported recommendation and re-evaluate growth before feeding again.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">How to read a fertilizer label before using the calculator</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Before you enter anything into the calculator, read the label for the guaranteed analysis and confirm whether the product is complete or incomplete. Record the N, P₂O₅, and K₂O percentages exactly as printed. If the bag is marketed as a vegetable fertilizer, do not assume the brand already matches your crop’s needs. Many specialty blends are still just ordinary nutrient ratios sold under a more expensive label.
            </p>
            <p>
              Then check whether the label is meant for pre-plant broadcasting, banding, or side-dressing. The same nutrient ratio can be used in several ways, but placement changes how roots encounter it. Broadcasting spreads nutrients through the whole rooting area, while side-dressing targets the phase when the plant starts using more nitrogen. The more closely you match the label method and the crop timing, the less likely you are to waste product.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Worked examples for home beds and small plots</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">Example 1: 10-10-10 on a 100 sq ft lettuce bed</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                If you use the UNH no-soil-test baseline of 25 lb of 10-10-10 per 1,000 square feet, that becomes 2.5 lb of product per 100 square feet. Because 10-10-10 is 10% each nutrient, that is 0.25 lb actual N, 0.25 lb actual P₂O₅, and 0.25 lb actual K₂O per 100 square feet before any side-dress is considered.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">Example 2: heavy-feeder nitrogen target with calcium nitrate</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Suppose a tomato bed uses a 0.30 lb actual-N target per 100 square feet and you want to supply it with a 15.5-0-0 calcium nitrate product. Divide 0.30 by 0.155 to get about 1.94 lb of product for that 100-square-foot space. The nutrient target stays the same even though the bag grade changes.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">Example 3: field recommendation scaled to a raised bed</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                If an agronomic guide recommends 90 lb N per acre, divide by 435.6 to get 0.207 lb N per 100 square feet. That same target is about 10.1 g/m². Once the nutrient basis is scaled, the calculator can convert it into the actual pounds or kilograms of the product you have on hand.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">Example 4: why product weight and nutrient weight are not the same</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Two gardeners can apply the same 2 lb of fertilizer product and deliver very different nutrient totals. One using 10-10-10 gives 0.20 lb N, P₂O₅, and K₂O. Another using 20-20-20 gives double that nutrient load. The calculator protects against that mistake by forcing the nutrient math first.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Frequently asked questions</h2>
          <div className="mt-4">
            <FAQSection faqs={faqs} />
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Helpful next steps</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Link href="/guides/how-to-fertilize-vegetable-garden" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm transition-all">
              <p className="text-sm font-semibold text-gray-900">Read the full vegetable fertilizing guide</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use a practical guide to timing, feeding stages, and label interpretation before changing your fertilizer plan.</p>
            </Link>
            <Link href="/tools/soil-ph-calculator" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm transition-all">
              <p className="text-sm font-semibold text-gray-900">Check soil pH before changing nutrients</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">A pH mismatch can block nutrient uptake even when fertilizer numbers look correct on paper.</p>
            </Link>
            <Link href="/tools/compost-calculator" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm transition-all">
              <p className="text-sm font-semibold text-gray-900">Balance compost before using it as a feed source</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use compost strategically as a slower nutrient source instead of assuming it replaces every fertilizer need.</p>
            </Link>
            <Link href="/tools/watering-schedule-calculator" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm transition-all">
              <p className="text-sm font-semibold text-gray-900">Coordinate feeding with watering</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Irrigation changes nutrient movement, so fertilizer timing works better when watering timing is planned alongside it.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
