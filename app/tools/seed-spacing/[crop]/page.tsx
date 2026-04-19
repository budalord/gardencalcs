import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { seedSpacingCropMap, seedSpacingCrops } from '@/config/seedSpacingCrops'

export function generateStaticParams() {
  return seedSpacingCrops.map((crop) => ({ crop: crop.slug }))
}

export function generateMetadata({ params }: { params: { crop: string } }): Metadata {
  const crop = seedSpacingCropMap[params.crop]
  if (!crop) return {}

  const title = `${crop.titleName} Seed Spacing Guide | Row, Plant & Depth Chart`
  const description = `${crop.titleName} seed spacing guide with row spacing, plant spacing, seed depth, maturity notes, and extension-based FAQ answers for home gardens.`
  const url = `${siteConfig.domain}/tools/seed-spacing/${crop.slug}`

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
  }
}

export default function SeedSpacingCropPage({ params }: { params: { crop: string } }) {
  const crop = seedSpacingCropMap[params.crop]
  if (!crop) notFound()

  const url = `${siteConfig.domain}/tools/seed-spacing/${crop.slug}`
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Seed Spacing Calculator',
    applicationCategory: 'UtilityApplication',
    url: `${siteConfig.domain}/tools/seed-spacing-calculator`,
    operatingSystem: 'Web',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      crop.uniqueFaq,
      {
        q: `How deep should ${crop.name.toLowerCase()} seeds or starts be planted?`,
        a: `${crop.name} planting depth on this page is set at ${crop.seedDepthInches}. That depth is shallow enough to help emergence, but still deep enough to keep seed or transplant placement stable. Depth should always be read together with spacing because crowded plants and uneven depth create weak, uneven stands.`,
        sourceUrl: crop.secondarySource.url,
      },
      {
        q: `Can ${crop.name.toLowerCase()} be planted tighter in a raised bed than in a field row?`,
        a: `${crop.name} can sometimes be planted a little tighter in a raised bed than in a wide field row, but only if you still protect airflow, harvest access, and the mature spread of the crop. Raised beds save path space; they do not erase the plant's mature need for light and room.`,
        sourceUrl: crop.primarySource.url,
      },
    ].map((faq) => ({
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
      { '@type': 'ListItem', position: 3, name: 'Seed Spacing Calculator', item: `${siteConfig.domain}/tools/seed-spacing-calculator` },
      { '@type': 'ListItem', position: 4, name: `${crop.titleName} spacing guide`, item: url },
    ],
  }

  const preFaqWordyIntro = `${crop.titleName} spacing decisions look simple when the crop is still a seed or a small transplant, but the mature plant is the number that matters. This guide keeps the quick answer close to the top so you can see the row spacing, plant spacing, seed depth, and maturity window before you commit a bed. The goal is not just to fit as many plants as possible into a rectangle. The goal is to protect light, airflow, harvest access, and the final size of the part you actually want to harvest. ${crop.maturitySpacingNote}`

  return (
    <main className="bg-gray-50 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-5xl px-4">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-green-700">Tools</Link>
          <span className="mx-2">/</span>
          <Link href="/tools/seed-spacing-calculator" className="hover:text-green-700">Seed Spacing Calculator</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{crop.titleName} spacing guide</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900">{crop.titleName} Seed Spacing Guide</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-gray-600">
          Use this page to plan {crop.name.toLowerCase()} row spacing, plant spacing, seed depth, and maturity-stage room before you lay out beds or transplant rows.
        </p>

        <section className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-800">Quick answer</p>
          <p className="mt-3 text-sm leading-7 text-gray-700">{preFaqWordyIntro}</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-green-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Field</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Recommendation</th>
                  <th className="px-3 py-3 text-left font-semibold text-gray-900">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Row spacing</td>
                  <td className="px-3 py-3 text-gray-700">{crop.rowSpacingInches} in</td>
                  <td className="px-3 py-3 text-gray-700">Protects canopy airflow, weeding access, and the mature width of the crop.</td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Plant spacing</td>
                  <td className="px-3 py-3 text-gray-700">{crop.plantSpacingInches} in</td>
                  <td className="px-3 py-3 text-gray-700">Controls how much room each plant gets to size up before crowding starts.</td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Seed depth</td>
                  <td className="px-3 py-3 text-gray-700">{crop.seedDepthInches}</td>
                  <td className="px-3 py-3 text-gray-700">Helps emergence stay even and reduces weak, patchy stands.</td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Days to maturity</td>
                  <td className="px-3 py-3 text-gray-700">{crop.maturityDays}</td>
                  <td className="px-3 py-3 text-gray-700">Signals how long the crop will occupy the bed before you turn it over.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-7 text-gray-700">
            Planting method note: {crop.plantingMethod}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">{crop.titleName} row spacing and plant spacing at a glance</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              The starting layout for {crop.name.toLowerCase()} should assume the mature crop, not the seedling stage. A row spacing of {crop.rowSpacingInches} inches and an in-row spacing of {crop.plantSpacingInches} inches gives the crop room to intercept light without turning the bed into a management problem later. When gardeners crowd a crop early, the first thing they often lose is not yield but access: it becomes harder to weed, harder to irrigate cleanly, and harder to see disease or nutrient issues before they spread.
            </p>
            <p>
              That is why row spacing and plant spacing should be read together. Row spacing protects the lane between planting lines, while plant spacing protects the room each plant needs inside the row. For {crop.name.toLowerCase()}, both numbers matter because the crop still has to pass through a real maturity stage before you harvest it. {crop.airflowNote}
            </p>
            <p>
              If you are using the site&apos;s main <Link href="/tools/seed-spacing-calculator" className="text-green-700 underline">seed spacing calculator</Link>, use this crop page as the precision layer after the calculator gives you a count. The calculator helps with geometry. This page helps you decide whether the geometry still makes biological sense for {crop.name.toLowerCase()} as it matures.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">How deep to plant {crop.name.toLowerCase()} seeds or transplants</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Depth and spacing should be planned together because uneven emergence can ruin a good spacing map just as quickly as crowding can. For this crop, the working seed or set depth on this page is <strong>{crop.seedDepthInches}</strong>. That depth comes from the secondary source cross-check listed in the source block below when the primary page is UMN-led, or from the main extension source when the crop page itself is not UMN-led. The goal is to keep the stand even enough that later thinning or transplant spacing actually holds.
            </p>
            <p>
              Shallow planting can speed emergence, but only if the seed zone stays moist enough to support it. Plant too shallow and drying becomes the bigger risk. Plant too deep and emergence slows, which makes the row less uniform and can leave gaps you are tempted to overcorrect with extra seed or tight transplanting. That is why the seed-depth number belongs in the quick-answer table instead of being buried in a late paragraph.
            </p>
            <p>
              {crop.plantingMethod} If you are laying out multiple beds, it is often smarter to hold the recommended depth and adjust the sowing date or bed prep than to cheat depth and hope the crop sorts itself out later. Depth errors often show up as spacing errors because missing plants make the row look sparse while uneven clusters make the row look crowded.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">How spacing changes as {crop.name.toLowerCase()} reaches maturity</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              A good spacing guide should always answer the mature-stage question directly, because many crop pages fail by repeating seed packet numbers without explaining what changes later. For {crop.name.toLowerCase()}, the critical shift happens as the plant moves from establishment into its full canopy and harvest phase. {crop.maturitySpacingNote}
            </p>
            <p>
              This is where days to maturity becomes more than a planning convenience. A crop that matures in {crop.maturityDays} occupies the bed long enough for small spacing mistakes to compound. Light interception changes, weeds become harder to reach, and harvest lanes shrink. If the crop is crowded early and you wait to fix it later, your choices narrow fast because roots and branches are already committed to the space you gave them.
            </p>
            <p>
              The mature-stage view is also the reason crop-specific pages outperform generic spacing advice. A generic spacing chart can tell you the number. It usually cannot tell you why the number matters once {crop.name.toLowerCase()} is no longer a seedling. That explanation is what keeps this page from becoming a thin doorway clone of the mother page.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Raised bed, in-ground row, and intensive spacing tradeoffs for {crop.name.toLowerCase()}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Raised beds let gardeners reclaim path space, but they do not erase the mature size of the crop. {crop.raisedBedNote} That means the same crop can sometimes tolerate slightly tighter geometry in a raised bed than in a broad field row, but only because paths are organized differently—not because the plant suddenly needs less light or root room.
            </p>
            <p>
              In-ground rows offer more flexibility for long plantings and large tools, but they usually pay for that flexibility with wider walk lanes. Intensive spacing tries to capture that path space back inside the bed. {crop.intensiveNote}
            </p>
            <p>
              The right decision depends on your management style. If you can prune, trellis, thin, and harvest on schedule, you may be able to tighten the planting a little. If your garden is more intermittent, standard extension spacing is often the safer bet because it buys forgiveness. The more disciplined your management, the more room you have to experiment; the less disciplined your management, the more valuable conservative spacing becomes.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Common spacing mistakes when planting {crop.name.toLowerCase()}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>
              {crop.mistakeNote} In practice, this usually shows up because the crop looks small and manageable at planting time. The gardener then optimizes for immediate visual efficiency rather than the mature crop. That creates a bed that looks great for two weeks and then gets harder to manage every week after that.
            </p>
            <p>
              Another mistake is separating spacing from the rest of bed planning. A crop that is planted at the right in-row distance but in the wrong bed context can still perform poorly. Soil preparation, irrigation rhythm, mulching, and variety choice all interact with spacing. If you are prepping the bed with compost before planting, run the numbers through the <Link href="/tools/compost-calculator" className="text-green-700 underline">compost calculator</Link> first so bed prep and crop layout stay in sync.
            </p>
            <p>
              Finally, do not confuse “more plants” with “more harvest.” {crop.harvestNote} Often the best spacing decision is the one that makes the whole cycle—planting, weeding, watering, scouting, and harvest—work cleanly instead of the one that maximizes plant count on paper.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {[crop.uniqueFaq,
              {
                q: `How deep should ${crop.name.toLowerCase()} seeds or starts be planted?`,
                a: `${crop.name} planting depth on this page is set at ${crop.seedDepthInches}. That depth keeps emergence or transplant establishment more even while still matching the crop's need for stable placement. In practice, gardeners should hold the depth steady first, then adjust spacing with thinning or transplant layout if necessary.`,
                sourceUrl: crop.secondarySource.url,
              },
              {
                q: `Can ${crop.name.toLowerCase()} be planted tighter in a raised bed than in a field row?`,
                a: `${crop.name} can sometimes be planted a little tighter in a raised bed than in a broad field row because raised beds reduce wasted path space. But the crop still needs enough room for mature canopy spread, airflow, and harvest access. Raised beds improve layout efficiency; they do not cancel the biological need for spacing.`,
                sourceUrl: crop.primarySource.url,
              },
            ].map((faq) => (
              <details key={faq.q} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <summary className="cursor-pointer text-base font-semibold text-gray-900">{faq.q}</summary>
                <div className="mt-3 text-sm leading-7 text-gray-600">
                  <p>{faq.a}</p>
                  <p className="mt-2 text-xs text-gray-500">Source: <a className="text-green-700 underline break-all" href={faq.sourceUrl}>{faq.sourceUrl}</a></p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Sources</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600">
            <li>
              <strong>Primary source ({crop.primarySource.fieldUsed}):</strong>{' '}
              <a className="text-green-700 underline break-all" href={crop.primarySource.url}>{crop.primarySource.label}</a>
            </li>
            <li>
              <strong>Secondary source ({crop.secondarySource.fieldUsed}):</strong>{' '}
              <a className="text-green-700 underline break-all" href={crop.secondarySource.url}>{crop.secondarySource.label}</a>
            </li>
            <li>
              <strong>Tertiary source ({crop.tertiarySource.fieldUsed}):</strong>{' '}
              <a className="text-green-700 underline break-all" href={crop.tertiarySource.url}>{crop.tertiarySource.label}</a>
            </li>
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Helpful next steps</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/tools/seed-spacing-calculator" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Return to the seed spacing calculator</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use the mother page calculator to estimate plant counts, then come back here for crop-specific spacing judgment.</p>
            </Link>
            <Link href="/guides/how-to-fertilize-vegetable-garden" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Connect spacing with feeding plans</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Once the layout is locked, match planting density with a realistic fertilizer and watering plan.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
