"use client";

import { useState } from "react";

// Note: P values here refer to P₂O₅ (phosphorus pentoxide), not elemental phosphorus.
// To convert to elemental P: multiply by 0.436.

interface Preset {
  name: string;
  n: number;  // % N
  p: number;  // % P₂O₅
  k: number;  // % K₂O
}

interface Result {
  fertilizerKg: number;
  nKg: number;
  pKg: number;
  kKg: number;
}

const PRESETS: Preset[] = [
  { name: "Urea (46-0-0)",       n: 46, p: 0,  k: 0  },
  { name: "Compound (15-15-15)", n: 15, p: 15, k: 15 },
  { name: "DAP (18-46-0)",       n: 18, p: 46, k: 0  },
  { name: "Custom",              n: 0,  p: 0,  k: 0  },
];

// Target nutrient application rates (kg per 100 m²)
const NUTRIENT_RATE = { n: 0.3, p: 0.15, k: 0.2 };

function compute(n: number, p: number, k: number, areaSqm: number): Result | null {
  if (areaSqm <= 0) return null;
  const factor = areaSqm / 100;
  const candidates: number[] = [];
  if (n > 0) candidates.push((NUTRIENT_RATE.n * factor) / (n / 100));
  if (p > 0) candidates.push((NUTRIENT_RATE.p * factor) / (p / 100));
  if (k > 0) candidates.push((NUTRIENT_RATE.k * factor) / (k / 100));
  if (candidates.length === 0) return null;

  const fertilizerKg = Math.max(...candidates);
  return {
    fertilizerKg: +fertilizerKg.toFixed(2),
    nKg: +(fertilizerKg * n / 100).toFixed(2),
    pKg: +(fertilizerKg * p / 100).toFixed(2),
    kKg: +(fertilizerKg * k / 100).toFixed(2),
  };
}

const fieldLabel = "block font-sans text-[11px] uppercase tracking-[0.08em] text-soil mb-1.5";
const fieldBase =
  "w-full bg-cream border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md px-3 py-2.5 text-ink outline-none focus:border-moss transition-colors duration-fast";

export default function FertilizerCalculator() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [custom, setCustom] = useState({ n: "", p: "", k: "" });
  const [area, setArea] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const isCustom = presetIdx === PRESETS.length - 1;

  const getNPK = () => {
    if (isCustom) {
      return {
        n: parseFloat(custom.n) || 0,
        p: parseFloat(custom.p) || 0,
        k: parseFloat(custom.k) || 0,
      };
    }
    return { n: PRESETS[presetIdx].n, p: PRESETS[presetIdx].p, k: PRESETS[presetIdx].k };
  };

  const handleCalculate = () => {
    setError("");
    const areaSqm = parseFloat(area);
    if (!area || isNaN(areaSqm) || areaSqm <= 0) {
      setError("Enter a valid area in m².");
      setResult(null);
      return;
    }
    const { n, p, k } = getNPK();
    if (n === 0 && p === 0 && k === 0) {
      setError("Enter at least one NPK value greater than 0.");
      setResult(null);
      return;
    }
    if (n + p + k > 100) {
      setError("Total NPK percentage cannot exceed 100%.");
      setResult(null);
      return;
    }
    const res = compute(n, p, k, areaSqm);
    if (!res) { setError("Calculation failed. Check your inputs."); setResult(null); return; }
    setResult(res);
  };

  return (
    <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] rounded-lg p-6 md:p-7 max-w-[720px] mx-auto">
      <h2 className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-1">
        How much fertilizer does this bed need?
      </h2>
      <p className="font-serif italic text-[14px] text-soil mb-6">
        Pick a blend or enter a custom NPK, give us the bed area in m², and we&apos;ll work out the kilograms — sized by the limiting nutrient.
      </p>

      <div className="mb-5">
        <label className={fieldLabel}>Fertilizer type</label>
        <select
          value={presetIdx}
          onChange={(e) => { setPresetIdx(Number(e.target.value)); setResult(null); }}
          className={`${fieldBase} font-sans text-[15px]`}
        >
          {PRESETS.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}
        </select>
        {!isCustom && (
          <p className="mt-2 font-mono text-[12px] tabular text-soil">
            N {PRESETS[presetIdx].n}% · P₂O₅ {PRESETS[presetIdx].p}% · K₂O {PRESETS[presetIdx].k}%
          </p>
        )}
      </div>

      {isCustom && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          {(["n", "p", "k"] as const).map((key) => (
            <div key={key}>
              <label className={fieldLabel}>
                {key === "p" ? "P₂O₅ %" : key === "k" ? "K₂O %" : "N %"}
              </label>
              <input
                type="number" min="0" max="100" step="0.1"
                value={custom[key]}
                onChange={(e) => { setCustom(prev => ({ ...prev, [key]: e.target.value })); setResult(null); }}
                className={`${fieldBase} font-mono tabular text-[15px]`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mb-5">
        <label className={fieldLabel}>Area (m²)</label>
        <input
          type="number" min="1" step="1"
          value={area}
          onChange={(e) => { setArea(e.target.value); setResult(null); }}
          placeholder="e.g. 100"
          className={`${fieldBase} font-mono tabular text-[17px] font-medium`}
          aria-invalid={!!error}
        />
        {error && <p className="mt-1 font-mono text-[11px] text-terracotta">{error}</p>}
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-moss-deep hover:bg-moss text-cream font-sans text-sm font-medium py-3 rounded-md transition-colors duration-fast"
      >
        Work out the dose
      </button>

      {result && (
        <div className="mt-6 bg-cream border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md px-6 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-1">
            Recommended application · {isCustom ? "Custom blend" : PRESETS[presetIdx].name}
          </p>
          <p className="font-serif font-semibold text-[34px] leading-[1] text-moss-deep tabular">
            {result.fertilizerKg}
            <span className="font-sans font-medium text-[14px] text-soil ml-1.5">kg fertilizer</span>
          </p>

          <dl className="mt-4 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_30%,transparent)] grid grid-cols-2 gap-x-5 gap-y-2 font-sans text-[14px]">
            <dt className="text-soil">N supplied</dt>
            <dd className="m-0 tabular text-ink">{result.nKg} kg</dd>
            <dt className="text-soil">P₂O₅ supplied</dt>
            <dd className="m-0 tabular text-ink">{result.pKg} kg</dd>
            <dt className="text-soil">K₂O supplied</dt>
            <dd className="m-0 tabular text-ink">{result.kKg} kg</dd>
          </dl>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-soil">
            P values expressed as P₂O₅ · multiply by 0.436 for elemental P
          </p>
        </div>
      )}
    </section>
  );
}
