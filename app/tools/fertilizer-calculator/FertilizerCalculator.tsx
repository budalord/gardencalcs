'use client'

import { useState } from 'react'

// Note: P values here refer to P₂O₅ (phosphorus pentoxide), not elemental phosphorus.
// To convert to elemental P: multiply by 0.436.

interface Preset {
  name: string
  n: number  // % N
  p: number  // % P₂O₅
  k: number  // % K₂O
}

interface Result {
  fertilizerKg: number
  nKg: number
  pKg: number
  kKg: number
}

const PRESETS: Preset[] = [
  { name: 'Urea (46-0-0)',            n: 46, p: 0,  k: 0  },
  { name: 'Compound (15-15-15)',       n: 15, p: 15, k: 15 },
  { name: 'DAP (18-46-0)',             n: 18, p: 46, k: 0  },
  { name: 'Custom',                    n: 0,  p: 0,  k: 0  },
]

// Target nutrient application rates (kg per 100 m²)
const NUTRIENT_RATE = { n: 0.3, p: 0.15, k: 0.2 }

function calculate(n: number, p: number, k: number, areaSqm: number): Result | null {
  if (areaSqm <= 0) return null
  const factor = areaSqm / 100

  // Determine limiting nutrient ratio and required fertilizer amount
  const candidates: number[] = []
  if (n > 0) candidates.push((NUTRIENT_RATE.n * factor) / (n / 100))
  if (p > 0) candidates.push((NUTRIENT_RATE.p * factor) / (p / 100))
  if (k > 0) candidates.push((NUTRIENT_RATE.k * factor) / (k / 100))
  if (candidates.length === 0) return null

  const fertilizerKg = Math.max(...candidates)
  return {
    fertilizerKg: +fertilizerKg.toFixed(2),
    nKg: +(fertilizerKg * n / 100).toFixed(2),
    pKg: +(fertilizerKg * p / 100).toFixed(2),
    kKg: +(fertilizerKg * k / 100).toFixed(2),
  }
}

export default function FertilizerCalculator() {
  const [presetIdx, setPresetIdx] = useState(0)
  const [custom, setCustom] = useState({ n: '', p: '', k: '' })
  const [area, setArea] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState('')

  const isCustom = presetIdx === PRESETS.length - 1

  const getNPK = () => {
    if (isCustom) {
      return {
        n: parseFloat(custom.n) || 0,
        p: parseFloat(custom.p) || 0,
        k: parseFloat(custom.k) || 0,
      }
    }
    return { n: PRESETS[presetIdx].n, p: PRESETS[presetIdx].p, k: PRESETS[presetIdx].k }
  }

  const handleCalculate = () => {
    setError('')
    const areaSqm = parseFloat(area)
    if (!area || isNaN(areaSqm) || areaSqm <= 0) {
      setError('Please enter a valid area (m²).')
      return
    }
    const { n, p, k } = getNPK()
    if (n === 0 && p === 0 && k === 0) {
      setError('Please enter at least one NPK value greater than 0.')
      return
    }
    if (n + p + k > 100) {
      setError('Total NPK percentage cannot exceed 100%.')
      return
    }
    const res = calculate(n, p, k, areaSqm)
    if (!res) { setError('Calculation failed. Check your inputs.'); return }
    setResult(res)
  }  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      {/* Preset selector */}
      <div>
        <label className="block text-sm font-medium mb-1">Fertilizer Type</label>
        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={presetIdx}
          onChange={e => { setPresetIdx(Number(e.target.value)); setResult(null) }}
        >
          {PRESETS.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}
        </select>
      </div>

      {/* Custom NPK inputs */}
      {isCustom && (
        <div className="grid grid-cols-3 gap-3">
          {(['n', 'p', 'k'] as const).map(key => (
            <div key={key}>
              <label className="block text-xs font-medium mb-1 uppercase">
                {key === 'p' ? 'P (P₂O₅ %)' : `${key.toUpperCase()} %`}
              </label>
              <input
                type="number" min="0" max="100" step="0.1"
                className="w-full border rounded px-2 py-1 text-sm"
                value={custom[key]}
                onChange={e => setCustom(prev => ({ ...prev, [key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      )}

      {/* Show selected preset NPK */}
      {!isCustom && (
        <p className="text-sm text-gray-500">
          N: {PRESETS[presetIdx].n}% &nbsp;|&nbsp;
          P₂O₅: {PRESETS[presetIdx].p}% &nbsp;|&nbsp;
          K₂O: {PRESETS[presetIdx].k}%
        </p>
      )}

      {/* Area input */}
      <div>
        <label className="block text-sm font-medium mb-1">Area (m²)</label>
        <input
          type="number" min="1" step="1"
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="e.g. 100"
          value={area}
          onChange={e => { setArea(e.target.value); setResult(null) }}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleCalculate}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition-colors"
      >
        Calculate
      </button>

      {/* Results */}
      {result && (
        <div className="bg-green-50 border border-green-200 rounded p-4 space-y-2">
          <p className="font-semibold text-green-800">Recommended Application</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-gray-600">Fertilizer needed:</span>
            <span className="font-medium">{result.fertilizerKg} kg</span>
            <span className="text-gray-600">N supplied:</span>
            <span>{result.nKg} kg</span>
            <span className="text-gray-600">P₂O₅ supplied:</span>
            <span>{result.pKg} kg</span>
            <span className="text-gray-600">K₂O supplied:</span>
            <span>{result.kKg} kg</span>
          </div>
          <p className="text-xs text-gray-400 pt-1">
            P values are expressed as P₂O₅. To convert to elemental P, multiply by 0.436.
          </p>
        </div>
      )}
    </div>
  )
}