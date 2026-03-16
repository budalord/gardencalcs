// P in NPK represents P₂O₅ (phosphorus pentoxide), the industry standard for commercial fertilizer labeling.

import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import FertilizerCalculator from './FertilizerCalculator'

export const metadata: Metadata = {
  title: 'Fertilizer Calculator – NPK Dosage for Any Crop or Garden',
  description:
    'Calculate exactly how much fertilizer you need based on NPK ratio and garden area. Supports urea, compound fertilizer, DAP, and custom blends.',
}

const toolUrl = `${siteConfig.domain}/tools/fertilizer-calculator`

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Fertilizer Calculator',
  description: 'Calculate NPK fertilizer dosage for any crop or garden area.',
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
    { '@type': 'HowToStep', position: 1, text: 'Select your fertilizer type from the dropdown (Urea, Compound, DAP, or Custom).' },
    { '@type': 'HowToStep', position: 2, text: 'If using Custom, enter the N, P₂O₅, and K₂O percentages from your fertilizer label.' },
    { '@type': 'HowToStep', position: 3, text: 'Enter your garden area in square meters.' },
    { '@type': 'HowToStep', position: 4, text: 'Click Calculate to see the recommended fertilizer amount and nutrient breakdown.' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What do N, P, and K mean on a fertilizer label?',
      acceptedAnswer: { '@type': 'Answer', text: 'N is nitrogen (promotes leafy growth), P is phosphorus expressed as P₂O₅ (supports roots and flowering), and K is potassium expressed as K₂O (improves overall plant health and disease resistance).' },
    },
    {
      '@type': 'Question',
      name: 'Why does this calculator use P₂O₅ instead of elemental phosphorus?',
      acceptedAnswer: { '@type': 'Answer', text: 'Commercial fertilizer labels report phosphorus as P₂O₅ (phosphorus pentoxide), which is the industry standard. To convert to elemental P, multiply the P₂O₅ value by 0.436.' },
    },
    {
      '@type': 'Question',
      name: 'How much fertilizer do I need for 100 m²?',
      acceptedAnswer: { '@type': 'Answer', text: 'It depends on the fertilizer type and NPK ratio. For example, Urea (46-0-0) requires about 0.65 kg per 100 m² to supply the recommended nitrogen dose. Use this calculator to get an exact figure for your specific fertilizer.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use this calculator for any fertilizer brand?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Select Custom and enter the N, P₂O₅, and K₂O percentages printed on your fertilizer bag. The calculator will compute the required amount based on standard nutrient application rates.' },
    },
  ],
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
    <main className="min-h-screen bg-green-50 py-10 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-green-800 mb-2">Fertilizer Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">
          P values represent P₂O₅ (phosphorus pentoxide) — the industry standard on fertilizer labels.
        </p>
        <FertilizerCalculator />
      </div>
    </main>
  )
}
