// P in NPK represents P₂O₅ (phosphorus pentoxide), the industry standard for commercial fertilizer labeling.
// Calculation basis: recommended N application = 0.15 kg per 100 m²

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fertilizer Calculator – NPK Dosage for Any Crop or Garden',
  description:
    'Calculate exactly how much fertilizer you need based on NPK ratio and garden area. Supports urea, compound fertilizer, DAP, and custom blends.',
}

// Preset definitions: N / P₂O₅ / K₂O percentages
const PRESETS = {
  urea:     { label: 'Urea (46-0-0)',            n: 46, p: 0,  k: 0  },
  compound: { label: 'Compound (15-15-15)',       n: 15, p: 15, k: 15 },
  dap:      { label: 'DAP (18-46-0)',             n: 18, p: 46, k: 0  },
  custom:   { label: 'Custom',                    n: 0,  p: 0,  k: 0  },
} as const

type PresetKey = keyof typeof PRESETS

interface CalcResult {
  totalKg: number
  nKg: number
  pKg: number
  kKg: number
}

function calculate(n: number, p: number, k: number, area: number): CalcResult | null {
  if (n <= 0 || area <= 0) return null
  // N recommendation: 0.15 kg per 100 m²
  const nNeeded = (area / 100) * 0.15
  const totalKg = nNeeded / (n / 100)
  return {
    totalKg: +totalKg.toFixed(3),
    nKg:     +nNeeded.toFixed(3),
    pKg:     +(totalKg * (p / 100)).toFixed(3),
    kKg:     +(totalKg * (k / 100)).toFixed(3),
  }
}

interface PageProps {
  searchParams: { preset?: string; n?: string; p?: string; k?: string; area?: string }
}

export default function FertilizerCalculatorPage({ searchParams }: PageProps) {
  const presetKey = (searchParams.preset ?? 'compound') as PresetKey
  const preset    = PRESETS[presetKey] ?? PRESETS.compound
  const isCustom  = presetKey === 'custom'

  const n    = isCustom ? Number(searchParams.n ?? 0)  : preset.n
  const p    = isCustom ? Number(searchParams.p ?? 0)  : preset.p
  const k    = isCustom ? Number(searchParams.k ?? 0)  : preset.k
  const area = Number(searchParams.area ?? 0)

  const result = area > 0 ? calculate(n, p, k, area) : null

  return (
    <main className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-green-800 mb-2">Fertilizer Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">
          P values represent P₂O₅ (phosphorus pentoxide) — the industry standard on fertilizer labels.
        </p>

        <form method="GET" className="space-y-5">
          {/* Preset selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fertilizer Type</label>
            <select name="preset" defaultValue={presetKey}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
              {(Object.keys(PRESETS) as PresetKey[]).map(key => (
                <option key={key} value={key}>{PRESETS[key].label}</option>
              ))}
            </select>
          </div>

          {/* NPK inputs — always rendered, disabled unless custom */}
          <div className="grid grid-cols-3 gap-3">
            {(['n', 'p', 'k'] as const).map(nutrient => (
              <div key={nutrient}>
                <label className="block text-xs font-medium text-gray-600 mb-1 uppercase">
                  {nutrient === 'p' ? 'P (P₂O₅) %' : `${nutrient.toUpperCase()} %`}
                </label>
                <input type="number" name={nutrient} min="0" max="100" step="0.1"
                  defaultValue={nutrient === 'n' ? n : nutrient === 'p' ? p : k}
                  disabled={!isCustom}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
            ))}
          </div>

          {/* Area input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Garden Area (m²)</label>
            <input type="number" name="area" min="1" step="1" defaultValue={area || ''}
              placeholder="e.g. 50"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>

          <button type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors">
            Calculate
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-6 bg-green-50 rounded-xl p-5 space-y-2">
            <p className="text-sm font-semibold text-green-800 mb-3">Results for {area} m²</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-600">Total fertilizer needed</span>
              <span className="font-bold text-green-700">{result.totalKg} kg</span>
              <span className="text-gray-600">Nitrogen (N)</span>
              <span className="font-medium">{result.nKg} kg</span>
              <span className="text-gray-600">Phosphorus (P₂O₅)</span>
              <span className="font-medium">{result.pKg} kg</span>
              <span className="text-gray-600">Potassium (K₂O)</span>
              <span className="font-medium">{result.kKg} kg</span>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}