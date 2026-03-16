// P in NPK represents P₂O₅ (phosphorus pentoxide), the industry standard for commercial fertilizer labeling.

import type { Metadata } from 'next'
import FertilizerCalculator from './FertilizerCalculator'

export const metadata: Metadata = {
  title: 'Fertilizer Calculator – NPK Dosage for Any Crop or Garden',
  description:
    'Calculate exactly how much fertilizer you need based on NPK ratio and garden area. Supports urea, compound fertilizer, DAP, and custom blends.',
}

export default function FertilizerCalculatorPage() {
  return (
    <main className="min-h-screen bg-green-50 py-10 px-4">
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
