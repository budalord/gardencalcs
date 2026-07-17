import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { soilPHCropMap, soilPHCrops } from '@/config/soilPHCrops'

export function generateStaticParams() {
  return soilPHCrops.map((crop) => ({ crop: crop.slug }))
}

export function generateMetadata({ params }: { params: { crop: string } }): Metadata {
  const crop = soilPHCropMap[params.crop]
  if (!crop) return {}

  const title = `${crop.titleName} Soil pH Target (${crop.phMin}–${crop.phMax}) | Lime & Sulfur Guide`
  const description = `${crop.titleName} soil pH target ${crop.phMin}–${crop.phMax}, with extension-cited lime and sulfur guidance, low-pH and high-pH symptoms, and common amendment mistakes for home gardens.`
  const url = `${siteConfig.domain}/tools/soil-ph/${crop.slug}`

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

export default function SoilPHCropPage({ params }: { params: { crop: string } }) {
  const crop = soilPHCropMap[params.crop]
  if (!crop) notFound()

  const url = `${siteConfig.domain}/tools/soil-ph/${crop.slug}`

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Soil pH Calculator',
    applicationCategory: 'UtilityApplication',
    url: `${siteConfig.domain}/tools/soil-ph-calculator`,
    operatingSystem: 'Web',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      crop.uniqueFaq,
      {
        q: `What soil pH does ${crop.name.toLowerCase()} prefer?`,
        a: `${crop.name} grows best in soil with a pH range of ${crop.phMin} to ${crop.phMax}. ${crop.toleranceNote}`,
        sourceUrl: crop.primarySource.url,
      },
      {
        q: `What happens to ${crop.name.toLowerCase()} when the soil is too acidic?`,
        a: crop.lowPHSymptom,
        sourceUrl: crop.secondarySource.url,
      },
      {
        q: `What happens to ${crop.name.toLowerCase()} when the soil is too alkaline?`,
        a: crop.highPHSymptom,
        sourceUrl: crop.tertiarySource.url,
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
      { '@type': 'ListItem', position: 3, name: 'Soil pH Calculator', item: `${siteConfig.domain}/tools/soil-ph-calculator` },
      { '@type': 'ListItem', position: 4, name: `${crop.titleName} soil pH guide`, item: url },
    ],
  }

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${crop.titleName} soil pH dataset`,
    description: `Target soil pH range, low-pH and high-pH symptoms, amendment guidance, and testing cadence for ${crop.name.toLowerCase()} grown in a home garden, cross-checked against three independent university extension sources.`,
    url,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    creator: { '@type': 'Organization', name: 'gardencalcs.com', url: siteConfig.domain },
    isBasedOn: [
      { '@type': 'CreativeWork', name: crop.primarySource.label, url: crop.primarySource.url },
      { '@type': 'CreativeWork', name: crop.secondarySource.label, url: crop.secondarySource.url },
      { '@type': 'CreativeWork', name: crop.tertiarySource.label, url: crop.tertiarySource.url },
    ],
    variableMeasured: [
      { '@type': 'PropertyValue', name: 'Target pH minimum', value: crop.phMin, unitText: 'pH' },
      { '@type': 'PropertyValue', name: 'Target pH maximum', value: crop.phMax, unitText: 'pH' },
      { '@type': 'PropertyValue', name: 'Crop category', value: crop.category },
    ],
  }

  const directAnswerSentence = `${crop.titleName} grows best in soil with a pH between ${crop.phMin} and ${crop.phMax}, with the upper end usually the safer working target in a home garden.`

  return (
    <main className="bg-gray-50 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <div className="mx-auto max-w-5xl px-4">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-green-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-green-700">Tools</Link>
          <span className="mx-2">/</span>
          <Link href="/tools/soil-ph-calculator" className="hover:text-green-700">Soil pH Calculator</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{crop.titleName} soil pH guide</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900">{crop.titleName} Soil pH Target ({crop.phMin}–{crop.phMax})</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-gray-600">
          {directAnswerSentence} Use this page to set the pH plan before you spread lime or sulfur, and to recognize the symptoms that show up when the bed has drifted outside the target range.
        </p>

        <section className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-800">Quick answer</p>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            {crop.toleranceNote} The right pH plan is a mix of choosing the correct range and confirming it with a real soil test before any large lime or sulfur pass.
          </p>
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
                  <td className="px-3 py-3 font-medium text-gray-900">Target pH range</td>
                  <td className="px-3 py-3 text-gray-700">{crop.phMin}–{crop.phMax}</td>
                  <td className="px-3 py-3 text-gray-700">Sets the working range before lime or sulfur decisions.</td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Category</td>
                  <td className="px-3 py-3 text-gray-700">{crop.category}</td>
                  <td className="px-3 py-3 text-gray-700">Crop family hints at related rotation and amendment guidance.</td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">Low-pH symptom</td>
                  <td className="px-3 py-3 text-gray-700">See section below</td>
                  <td className="px-3 py-3 text-gray-700">Recognize a drift below range before yield drops.</td>
                </tr>
                <tr className="border-t border-green-100 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">High-pH symptom</td>
                  <td className="px-3 py-3 text-gray-700">See section below</td>
                  <td className="px-3 py-3 text-gray-700">Catch alkaline drift before micronutrient lockout becomes chronic.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">What soil pH does {crop.name.toLowerCase()} actually need?</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p className="font-semibold text-gray-900">
              {crop.titleName} grows best in soil with a pH between {crop.phMin} and {crop.phMax}.
            </p>
            <p>
              {crop.toleranceNote}
            </p>
            <p>
              The target range is a working window rather than a fixed point. Most home gardeners do better aiming for the middle of the range than trying to land on a single decimal place. Soil pH naturally fluctuates with rainfall, irrigation, fertilizer, and organic matter inputs across the season, so a window-based plan is more robust than a single-number target.
            </p>
            <p>
              If you have not run a soil test in the past one to two seasons, do that before adjusting anything. A real lab test from your state extension service or a private agronomy lab is far more reliable than a quick probe meter, especially when the proposed correction involves several pounds of lime or sulfur.
            </p>
            {crop.slug === 'tomato' && (
              <p>
                Once the pH plan is set, use the <Link href="/grow/tomato" className="text-green-700 underline">complete tomato growing guide</Link> to coordinate soil preparation with spacing, transplant timing, fertilizer, watering, disease prevention, and harvest.
              </p>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Symptoms of acidic soil for {crop.name.toLowerCase()}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>{crop.lowPHSymptom}</p>
            <p>
              Acid stress symptoms can look like fertilizer deficiency in early stages, which is why gardeners often add more nitrogen, potassium, or magnesium before testing pH. If feeding the bed does not resolve the issue within a few weeks, an acid pH reading on a soil test usually explains the persistence.
            </p>
            <p>
              The correct response is rarely panic-liming. Confirm the reading on a second test, then plan a measured lime application using a calculator that accounts for soil texture and the size of the pH gap. Our <Link href="/tools/soil-ph-calculator" className="text-green-700 underline">soil pH calculator</Link> gives a starting estimate of pounds of lime or sulfur per 100 square feet for your bed.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Symptoms of alkaline soil for {crop.name.toLowerCase()}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>{crop.highPHSymptom}</p>
            <p>
              Alkaline drift in a home garden bed is often slow and quiet. It builds up over several seasons of compost passes, wood ash, or carry-over from lime applied to nearby beds. By the time symptoms are obvious in the crop, the pH may already be a full unit above the target range.
            </p>
            <p>
              Bringing pH back down uses elemental sulfur rather than lime, and the reaction depends on soil microbes that work slowly in cool soil. Plan corrections at least six months before the next planting if possible, and never apply more than about 2 lb of sulfur per 100 square feet in a single pass.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Amendment guidance for {crop.name.toLowerCase()}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>{crop.amendmentNote}</p>
            <p>
              The general rule across most home garden crops is to cap a single lime pass at 10 lb per 100 sq ft and a single sulfur pass at 2 lb per 100 sq ft. Larger corrections should be split across two seasons with a retest in between, because the reaction is slower than gardeners expect and overshooting in either direction creates a new problem.
            </p>
            <p>
              If you are still planning the bed layout, the same rules apply: prepare the bed, run a soil test, apply the first amendment pass, then come back to <Link href="/tools/seed-spacing-calculator" className="text-green-700 underline">work out row and plant spacing</Link> once the chemistry plan is in place.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">When to retest the {crop.name.toLowerCase()} bed</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>{crop.testingNote}</p>
            <p>
              Retesting too soon is a common waste of time. Lime can take six months to fully react in cool soil, and sulfur reacts even more slowly. A three-month retest of a recent lime application usually shows a reading that does not yet reflect the eventual change, which can lead to over-correction.
            </p>
            <p>
              Keep records of every amendment pass: date, rate, source, and a follow-up reading. Two or three seasons of notes turn pH management from guessing into a real plan that fits your specific bed.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Common pH mistakes when growing {crop.name.toLowerCase()}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
            <p>{crop.mistakeNote}</p>
            <p>
              {crop.rotationNote}
            </p>
            <p>
              The other mistake worth flagging is using cheap probe meters as the only data source for a big amendment decision. Probe meters are useful for quick comparisons between beds, but they are not reliable enough to set a lime or sulfur rate by themselves. Pair them with a lab test before any large pass.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {[crop.uniqueFaq,
              {
                q: `What soil pH does ${crop.name.toLowerCase()} prefer?`,
                a: `${crop.name} grows best in soil with a pH range of ${crop.phMin} to ${crop.phMax}. ${crop.toleranceNote}`,
                sourceUrl: crop.primarySource.url,
              },
              {
                q: `What happens to ${crop.name.toLowerCase()} when the soil is too acidic?`,
                a: crop.lowPHSymptom,
                sourceUrl: crop.secondarySource.url,
              },
              {
                q: `What happens to ${crop.name.toLowerCase()} when the soil is too alkaline?`,
                a: crop.highPHSymptom,
                sourceUrl: crop.tertiarySource.url,
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
            <Link href="/tools/soil-ph-calculator" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Return to the soil pH calculator</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use the main calculator to estimate pounds of lime or sulfur per 100 sq ft, then come back here for crop-specific judgment.</p>
            </Link>
            <Link href="/guides/understanding-soil-ph" className="rounded-lg border border-gray-200 p-4 hover:border-green-500 hover:shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Review the beginner soil pH guide</p>
              <p className="mt-1 text-sm leading-6 text-gray-600">Walk through testing methods, common amendment mistakes, and the chemistry behind pH before applying anything.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
