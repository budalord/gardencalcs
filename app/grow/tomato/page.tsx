import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

const URL = `${siteConfig.domain}/grow/tomato`

export const metadata: Metadata = {
  title: { absolute: 'How to Grow Tomatoes — Home Garden Guide with Spacing, pH, Fertilizer & Watering' },
  description:
    'Home garden tomato guide with extension-cited planting time, spacing, soil pH, fertilizer rates, watering, common pests and diseases, and harvest indicators. Linked to calculators for each step.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'How to Grow Tomatoes — Home Garden Guide',
    description:
      'Plant timing, spacing, soil pH, fertilizer rates, watering, pests, diseases, and harvest indicators for home garden tomatoes, with extension sources for every number.',
    url: URL,
    type: 'article',
  },
}

// Source IDs map directly to the Gate-1 source pool. Every numerical or
// time-based claim in the body references one or more of these IDs.
const SOURCES = [
  {
    id: 'A1',
    label: 'University of Minnesota Extension — Growing Tomatoes',
    url: 'https://extension.umn.edu/vegetables/growing-tomatoes',
    tier: 'A',
  },
  {
    id: 'A2',
    label: 'University of Maryland Extension — Growing Tomatoes in a Home Garden',
    url: 'https://extension.umd.edu/resource/growing-tomatoes-home-garden',
    tier: 'A',
  },
  {
    id: 'B1',
    label: 'University of Maryland Extension — Vegetable pH chart',
    url: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
    tier: 'B',
  },
  {
    id: 'B2',
    label: 'Penn State Extension — Understanding Soil pH',
    url: 'https://extension.psu.edu/understanding-soil-ph/',
    tier: 'B',
  },
  {
    id: 'B3',
    label: 'Penn State Extension — Tomato Production',
    url: 'https://extension.psu.edu/tomato-production',
    tier: 'B',
  },
  {
    id: 'B4',
    label: 'UGA Cooperative Extension — Vegetable Planting Chart',
    url: 'https://extension.uga.edu/content/dam/extension-county-offices/gwinnett-county/anr/homeshow-resources/Vegetable%20Planting%20Chart.pdf',
    tier: 'B',
  },
  {
    id: 'B5',
    label: 'University of Minnesota Extension — Watering the Vegetable Garden',
    url: 'https://extension.umn.edu/how/watering-vegetable-garden',
    tier: 'B',
  },
  {
    id: 'B6',
    label: 'Utah State University Extension — Water Recommendations for Vegetables',
    url: 'https://extension.usu.edu/yardandgarden/research/water-recommendations-for-vegetables',
    tier: 'B',
  },
  {
    id: 'B7',
    label: 'Texas A&M AgriLife — Easy Gardening: Watering Your Vegetables',
    url: 'https://aggie-horticulture.tamu.edu/wp-content/uploads/sites/10/2013/09/eht_024_watering_your_vegetables.pdf',
    tier: 'B',
  },
  {
    id: 'B8',
    label: 'UC Statewide IPM — Tomato (Home and Garden)',
    url: 'https://ipm.ucanr.edu/PMG/GARDEN/VEGES/tomato.html',
    tier: 'B',
  },
  {
    id: 'B9',
    label: 'Missouri Botanical Garden — Tomato Visual Guides',
    url: 'https://www.missouribotanicalgarden.org/gardens-gardening/your-garden/help-for-the-home-gardener/advice-tips-resources/visual-guides/tomatoes',
    tier: 'B',
  },
  {
    id: 'B10',
    label: 'University of Minnesota Extension — Planting the Vegetable Garden',
    url: 'https://extension.umn.edu/planting-and-growing-guides/planting-vegetable-garden',
    tier: 'B',
  },
  {
    id: 'B11',
    label: 'USDA Plant Hardiness Zone Map',
    url: 'https://planthardiness.ars.usda.gov/',
    tier: 'B',
  },
  {
    id: 'C1',
    label: 'Cornell Vegetables — Tomatoes (field-grown / variety reference)',
    url: 'https://www.vegetables.cornell.edu/crops/tomatoes/',
    tier: 'C',
  },
] as const

function Cite({ ids }: { ids: string[] }) {
  return (
    <sup className="ml-0.5 text-[10px] font-mono text-green-700">
      [
      {ids.map((id, idx) => (
        <span key={id}>
          {idx > 0 && ', '}
          <a href={`#src-${id}`} className="underline">{id}</a>
        </span>
      ))}
      ]
    </sup>
  )
}

export default function GrowTomatoPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Grow Tomatoes — Home Garden Guide',
    description:
      'Extension-cited home garden tomato guide covering planting time, spacing, soil pH, fertilizer rates, watering, common pests and diseases, and harvest indicators.',
    url: URL,
    author: { '@type': 'Organization', name: 'gardencalcs.com', url: siteConfig.domain },
    publisher: { '@type': 'Organization', name: 'gardencalcs.com', url: siteConfig.domain },
    isBasedOn: SOURCES.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteConfig.domain}/guides` },
      { '@type': 'ListItem', position: 3, name: 'Tomato', item: URL },
    ],
  }

  const faqs = [
    {
      q: 'How long do tomato plants take to grow from transplant to harvest?',
      a: 'Most home garden tomato varieties take roughly 65 to 90 days from transplant to first ripe fruit. Early varieties trend toward the shorter end of that window and slicing or beefsteak varieties trend toward the longer end. The clock starts at transplant, not at indoor seeding, because transplants are already several weeks old when they go in the ground.',
      sourceIds: ['A2'],
    },
    {
      q: 'What is blossom-end rot and how do I fix it?',
      a: 'Blossom-end rot is a dark, sunken patch at the bottom of developing fruit, caused by uneven calcium delivery to the fruit during rapid growth. The root issue is usually inconsistent watering rather than a soil calcium shortage. Steady deep watering, mulch to even out moisture, and avoiding heavy nitrogen pushes during fruit set fix it more reliably than calcium sprays applied to leaves.',
      sourceIds: ['A1', 'B8'],
    },
    {
      q: 'Why do my tomato leaves have yellow or brown spots?',
      a: 'Brown or yellow spots on tomato leaves often point to a fungal leaf disease such as early blight or Septoria leaf spot, especially when spots start on lower leaves and move upward. Crowded plants, overhead watering, and damp foliage at night all increase risk. Improving spacing, watering at the soil line, and removing affected lower leaves slows disease spread; persistent outbreaks call for confirmed identification through a local extension diagnostic service.',
      sourceIds: ['A1', 'B8', 'B9'],
    },
    {
      q: 'When should I start tomato seeds indoors?',
      a: 'Indoor seed starting usually happens about 5 to 6 weeks before the planned outdoor transplant date, which itself should be after the last frost in your area. Earlier indoor starts often produce leggy, weak transplants that have to recover after planting out, which delays rather than speeds the harvest window.',
      sourceIds: ['A1'],
    },
    {
      q: 'When are tomatoes ripe enough to pick?',
      a: 'Harvest can begin as soon as the fruit color starts to change at the blossom end. Fruit will continue to ripen on the counter once color break has started, so picking slightly early protects the crop from cracking, sunscald, and animal damage. At the end of the season, all remaining fruit should be picked before the first frost and ripened indoors.',
      sourceIds: ['A1', 'A2'],
    },
    {
      q: 'How often should I water tomatoes in a home garden?',
      a: 'A typical home garden tomato bed needs about one inch of water per week from rain plus irrigation, applied in two deeper sessions rather than daily light watering. Sandy soils and containers may need more frequent passes. Consistent moisture during fruit set is more important than the exact schedule, because uneven watering is the most common driver of blossom-end rot and fruit cracking.',
      sourceIds: ['A1', 'B5', 'B6'],
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main className="bg-gray-50 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto max-w-5xl px-4">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-green-700">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Tomato</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900">How to Grow Tomatoes in a Home Garden</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-gray-600">
          Tomatoes grow best when planted after the last spring frost in soil with a pH between 6.0 and 6.8, spaced about 24 inches apart in rows roughly 36 inches apart, watered to about one inch per week, and side-dressed with fertilizer once fruit begins enlarging.
          <Cite ids={['A1', 'A2', 'B1']} />
          {' '}This guide walks each step with extension sources you can verify yourself.
        </p>

        {/* §1 — Quick reference card */}
        <section className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-800">Quick reference</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-green-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Field</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Recommendation</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Source</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Plant out</td>
                  <td className="px-3 py-3 text-gray-700">After last spring frost</td>
                  <td className="px-3 py-3 text-gray-700"><a href="#src-B10" className="text-green-700 underline">B10</a>, <a href="#src-A2" className="text-green-700 underline">A2</a></td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Soil pH</td>
                  <td className="px-3 py-3 text-gray-700">6.0–6.8</td>
                  <td className="px-3 py-3 text-gray-700"><a href="#src-B1" className="text-green-700 underline">B1</a>, <a href="#src-A1" className="text-green-700 underline">A1</a></td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Plant spacing</td>
                  <td className="px-3 py-3 text-gray-700">24 in in-row × 36 in between rows (2–3 ft in all directions)</td>
                  <td className="px-3 py-3 text-gray-700"><a href="#src-A1" className="text-green-700 underline">A1</a>, <a href="#src-A2" className="text-green-700 underline">A2</a>, <a href="#src-B4" className="text-green-700 underline">B4</a></td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Watering</td>
                  <td className="px-3 py-3 text-gray-700">≈ 1 in per week, two deep sessions</td>
                  <td className="px-3 py-3 text-gray-700"><a href="#src-A1" className="text-green-700 underline">A1</a>, <a href="#src-B5" className="text-green-700 underline">B5</a>, <a href="#src-B6" className="text-green-700 underline">B6</a></td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Side-dress fertilizer</td>
                  <td className="px-3 py-3 text-gray-700">When fruit begins enlarging; ½ cup 46-0-0 or 1 cup 27-3-3 per 100 ft of row</td>
                  <td className="px-3 py-3 text-gray-700"><a href="#src-A1" className="text-green-700 underline">A1</a></td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Days to maturity</td>
                  <td className="px-3 py-3 text-gray-700">65–90 days from transplant</td>
                  <td className="px-3 py-3 text-gray-700"><a href="#src-A2" className="text-green-700 underline">A2</a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Numbers above are extension-cited starting points. Bracketed IDs link to the full source list at the bottom of this page. Use the linked calculators in each section to adjust for your specific bed size and conditions.
          </p>
        </section>

        {/* §2 — When to plant */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">When to plant tomatoes</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700">
            <p>
              Tomatoes are warm-season crops and should be transplanted outdoors only after the last spring frost has passed.<Cite ids={['B10', 'A2']} /> In Minnesota that usually means mid-to-late May,<Cite ids={['B10']} /> but the exact safe date shifts widely with latitude and altitude. The most reliable way to set the date is to look up your USDA hardiness zone and the average last-frost date for your region rather than copying a calendar date from a different climate.<Cite ids={['B11']} />
            </p>
            <p>
              If you start tomatoes from seed indoors, sow about 5 to 6 weeks before the planned outdoor transplant date.<Cite ids={['A1']} /> Earlier indoor starts often produce tall, leggy transplants that take longer to recover after going outside, which can delay rather than speed up the first harvest. Cool-season crops such as peas and lettuce can be direct-seeded in the same garden much earlier, while tomatoes specifically need warm soil and warm air to establish.<Cite ids={['B10']} />
            </p>
            <p>
              Plan the transplant date and the indoor-start date together. Working backward from a target outdoor planting day produces a much more reliable seeding schedule than guessing from intuition or copying a generic "start tomatoes in March" suggestion.
            </p>
          </div>
        </section>

        {/* §3 — Soil prep & pH */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Soil preparation and pH for tomatoes</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700">
            <p>
              Tomatoes grow best in soil with a pH between 6.0 and 6.8.<Cite ids={['B1', 'A1']} /> Below about 5.8, calcium uptake becomes less reliable, which raises the risk of blossom-end rot during heavy fruit set.<Cite ids={['B1']} /> Above 7.2, iron and manganese availability drops enough to show up as interveinal yellowing on new growth before the rest of the plant looks stressed.<Cite ids={['B2']} />
            </p>
            <p>
              The right pH plan starts with a real soil test. A lab test from a state extension service is far more reliable than a quick probe meter, especially when the proposed correction involves several pounds of lime or sulfur per 100 square feet. Single-pass amendment caps protect against overshooting: roughly 10 pounds of lime per 100 sq ft to raise pH, and roughly 2 pounds of sulfur per 100 sq ft to lower pH, with retests at 6 months rather than 3.<Cite ids={['B2']} />
            </p>
            <p>
              Use the{' '}
              <Link href="/tools/soil-ph-calculator" className="text-green-700 underline">soil pH calculator</Link>{' '}
              to estimate the specific pounds of lime or sulfur for your bed, and the crop-specific{' '}
              <Link href="/tools/soil-ph/tomato" className="text-green-700 underline">tomato soil pH guide</Link>{' '}
              for symptom-by-symptom diagnostics if your bed has drifted outside the target range.
            </p>
          </div>
        </section>

        {/* §4 — Spacing & layout */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Spacing and bed layout</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700">
            <p>
              Vining tomato plants typically need two to three feet of clearance in all directions to support airflow, harvest access, and disease management once the canopy fills in.<Cite ids={['A1']} /> University of Maryland Extension lists the practical home-garden spacing as 18–36 inches in-row with 48–60 inches between rows.<Cite ids={['A2']} /> The UGA planting chart cross-references similar numbers across the southeast.<Cite ids={['B4']} />
            </p>
            <p>
              Caged tomatoes still need most of that mature spacing because the cage changes support style, not the final width of the loaded plant. Crowding becomes especially visible by mid-season, when foliage overlap restricts airflow and pruning lanes become hard to walk through.<Cite ids={['A1']} /> Tighter spacing only pays off when pruning, watering, and disease scouting are disciplined; otherwise the crowded bed loses yield to disease before saving any path space.
            </p>
            <p>
              For a specific bed, run the dimensions through the{' '}
              <Link href="/tools/seed-spacing-calculator" className="text-green-700 underline">seed spacing calculator</Link>{' '}
              to estimate plant count, and use the crop-specific{' '}
              <Link href="/tools/seed-spacing/tomato" className="text-green-700 underline">tomato spacing guide</Link>{' '}
              for the maturity-stage view of how spacing affects airflow and harvest later in the season.
            </p>
          </div>
        </section>

        {/* §5 — Fertilizer schedule */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Fertilizer schedule for tomatoes</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700">
            <p>
              UMN Extension recommends side-dressing tomatoes with nitrogen when fruits begin enlarging, at a rate of roughly half a cup of 46-0-0 or one cup of 27-3-3 per 100 feet of row.<Cite ids={['A1']} /> The exact rate should be adjusted for the actual soil test and prior compost or manure inputs, because heavy organic matter additions already supply meaningful nitrogen and an extra side-dress on top of that can push the plant into excess foliage at the expense of fruit set.
            </p>
            <p>
              The University of Maryland reference confirms that tomatoes have a high overall nutrient demand, with starter fertilizer for transplants and a side-dress after first fruits appear.<Cite ids={['A2']} /> A balanced bed plan avoids forcing excess phosphorus or potassium just to satisfy the nitrogen requirement, because over-application of P in particular runs off into surface water and is restricted by several state regulations.
            </p>
            <p>
              The{' '}
              <Link href="/tools/fertilizer-calculator" className="text-green-700 underline">fertilizer calculator</Link>{' '}
              uses N-driven logic so DAP and balanced blends do not silently over-apply phosphorus. The crop-specific{' '}
              <Link href="/data/npk-rates-by-crop" className="text-green-700 underline">NPK rates by crop</Link>{' '}
              reference cross-checks tomato rates against multiple extensions.
            </p>
          </div>
        </section>

        {/* §6 — Watering */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Watering tomatoes in a home garden</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700">
            <p>
              UMN Extension suggests that one inch of rainfall or irrigation per week is the practical baseline for a home garden tomato bed, with emphasis on soaking the soil thoroughly rather than light overhead watering.<Cite ids={['A1', 'B5']} /> Utah State University Extension puts the practical schedule at roughly two deeper sessions per week of about three-quarters of an inch each, depending on soil type.<Cite ids={['B6']} /> Sandy soils dry out faster and may need an additional pass, while heavy clay holds moisture longer between sessions.
            </p>
            <p>
              Consistency matters more than the exact schedule. Uneven watering is the single most common driver of blossom-end rot and fruit cracking, both of which are physiological problems rather than feeding shortages or disease.<Cite ids={['A1', 'B8']} /> Mulching the soil surface helps even out moisture between irrigation sessions, especially in hot weather. In warm climates such as Texas, the same one-inch-per-week guideline still applies but the sessions need to be timed earlier in the day to minimize evaporation loss.<Cite ids={['B7']} />
            </p>
            <p>
              Use the{' '}
              <Link href="/tools/watering-schedule-calculator" className="text-green-700 underline">watering schedule calculator</Link>{' '}
              to refine sessions for your soil type, season, and growing method. Container plantings always need more frequent watering than in-ground beds because the soil volume is smaller and dries faster.
            </p>
          </div>
        </section>

        {/* §7 — Pests & diseases */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Common tomato pests and diseases</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700">
            <p>
              UMN Extension and UC IPM both identify a similar core list of home garden tomato pests: aphids, cutworms, flea beetles, Colorado potato beetles, hornworms, and whiteflies, plus less common visitors such as stink bugs and leaf-footed bugs.<Cite ids={['A1', 'B8']} /> Most home garden infestations can be managed by handpicking, row covers on young plants, supporting beneficial insects, and prompt removal of damaged tissue. Specific chemical product recommendations vary by state regulation, and a local extension office is the right place to ask before applying anything stronger than insecticidal soap.
            </p>
            <p>
              Disease pressure is the larger long-term issue. Common diseases include early blight, late blight, Septoria leaf spot, bacterial spot, fusarium and verticillium wilts, and several mosaic viruses.<Cite ids={['A1', 'B8']} /> Foliar diseases typically start on lower leaves and move up as wet conditions persist, which is why airflow, spacing, watering at the soil line, and removal of affected lower leaves are the most reliable first-line responses. UC IPM provides comprehensive identification keys for each disease,<Cite ids={['B8']} /> and the Missouri Botanical Garden visual guides offer side-by-side images that help confirm a diagnosis before any control decision.<Cite ids={['B9']} />
            </p>
            <p>
              Physiological disorders deserve their own attention because they are commonly misdiagnosed as pest or disease problems. Blossom-end rot, cracking, sunscald, and catfacing are all driven by environmental and watering factors rather than by an organism that can be sprayed.<Cite ids={['A1', 'B8']} /> Addressing the underlying watering rhythm or shading problem solves these issues far more reliably than any product application.
            </p>
            <p>
              For variety selection with disease-resistance considerations, Cornell publishes evaluation results for resistant lines that home gardeners can use as a starting point, with the caveat that most Cornell guidance is geared toward field-grown commercial production rather than home beds.<Cite ids={['C1']} />
            </p>
          </div>
        </section>

        {/* §8 — Harvest */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">When and how to harvest tomatoes</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700">
            <p>
              University of Maryland Extension recommends harvesting as soon as fruit color begins to change.<Cite ids={['A2']} /> Tomatoes continue ripening after picking, so an early harvest at color break protects the fruit from cracking, sunscald, animal damage, and disease in the final ripening days. The trade-off in flavor is small compared to the protection gained.
            </p>
            <p>
              At the end of the season, UMN Extension recommends picking all remaining fruit before the first frost and ripening green tomatoes indoors.<Cite ids={['A1']} /> Fruit that is exposed to a hard frost rarely ripens cleanly afterward and often develops storage problems. Mature green tomatoes brought inside will continue to ripen at room temperature without direct sunlight, and the rate can be slowed by storing them in a cool room or accelerated by placing them in a paper bag with a ripe banana.
            </p>
          </div>
        </section>

        {/* §9 — FAQ */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Frequently asked questions about growing tomatoes</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <summary className="cursor-pointer text-base font-semibold text-gray-900">{faq.q}</summary>
                <div className="mt-3 text-sm leading-7 text-gray-700">
                  <p>
                    {faq.a}
                    <Cite ids={faq.sourceIds} />
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* §10 — Sources */}
        <section id="sources" className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Sources</h2>
          <p className="mt-2 text-sm text-gray-600">
            Every numeric claim, time window, and rate in this page is keyed to one of the sources below. Each source has been fetched and verified for relevance during page authoring.
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-700">
            {SOURCES.map((s) => (
              <li key={s.id} id={`src-${s.id}`}>
                <span className="font-mono text-xs text-green-700">[{s.id}]</span>{' '}
                <a className="text-green-700 underline break-all" href={s.url} target="_blank" rel="noopener">
                  {s.label}
                </a>
                {s.tier === 'C' && (
                  <span className="ml-2 inline-block rounded bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">
                    Tier C — restricted to variety / disease qualitative reference
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            Sources are categorized by tier: Tier A and B are home-garden extension references used freely; Tier C is restricted because the source primarily covers commercial field production and is not appropriate for home-garden quantitative claims such as spacing or fertilizer rates.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Plan the next bed</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/tools/seed-spacing/tomato" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Tomato spacing & layout guide</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Crop-specific row, plant, and seed-depth numbers with three extension cross-checks.</p>
            </Link>
            <Link href="/tools/soil-ph/tomato" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Tomato soil pH guide</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Target pH range, low-pH and high-pH symptoms, and common amendment mistakes.</p>
            </Link>
            <Link href="/tools/fertilizer-calculator" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Fertilizer calculator</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">N-driven calculator avoids silent phosphorus over-application with DAP or balanced blends.</p>
            </Link>
            <Link href="/tools/watering-schedule-calculator" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Watering schedule calculator</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Adjusts weekly inches by soil texture, season, and growing method.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
