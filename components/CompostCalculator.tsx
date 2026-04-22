"use client";

import { useState } from "react";

interface Material {
  id: string;
  name: string;
  type: "green" | "brown";
  cnRatio: number;
}

const MATERIALS: Material[] = [
  { id: "grass",    name: "Grass Clippings", type: "green", cnRatio: 20  },
  { id: "food",     name: "Food Scraps",     type: "green", cnRatio: 15  },
  { id: "coffee",   name: "Coffee Grounds",  type: "green", cnRatio: 20  },
  { id: "manure",   name: "Fresh Manure",    type: "green", cnRatio: 15  },
  { id: "gleaves",  name: "Green Leaves",    type: "green", cnRatio: 25  },
  { id: "dleaves",  name: "Dry Leaves",      type: "brown", cnRatio: 60  },
  { id: "straw",    name: "Straw",           type: "brown", cnRatio: 80  },
  { id: "cardboard",name: "Cardboard",       type: "brown", cnRatio: 350 },
  { id: "woodchips",name: "Wood Chips",      type: "brown", cnRatio: 400 },
  { id: "sawdust",  name: "Sawdust",         type: "brown", cnRatio: 325 },
  { id: "newspaper",name: "Newspaper",       type: "brown", cnRatio: 175 },
  { id: "corn",     name: "Corn Stalks",     type: "brown", cnRatio: 75  },
];

interface Entry { materialId: string; lbs: string }

interface Result {
  volumeCuFt: number;
  volumeCuM: number;
  cnRatio: number;
  status: "ideal" | "too-high" | "too-low";
  suggestion: string;
  hotWeeks: string;
  coldMonths: string;
}

const IDEAL_LOW = 25;
const IDEAL_HIGH = 30;

const fieldLabel = "block font-sans text-[11px] uppercase tracking-[0.08em] text-soil mb-1.5";
const fieldBase =
  "w-full bg-cream border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md px-3 py-2.5 text-ink outline-none focus:border-moss transition-colors duration-fast";

export default function CompostCalculator() {
  const [dimUnit, setDimUnit] = useState<"ft" | "m">("ft");
  const [length, setLength] = useState("");
  const [width, setWidth]   = useState("");
  const [height, setHeight] = useState("");
  const [entries, setEntries] = useState<Entry[]>([{ materialId: "grass", lbs: "" }]);
  const [result, setResult] = useState<Result | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function addEntry() {
    setEntries([...entries, { materialId: "dleaves", lbs: "" }]);
    setResult(null);
  }

  function removeEntry(i: number) {
    setEntries(entries.filter((_, idx) => idx !== i));
    setResult(null);
  }

  function updateEntry(i: number, field: keyof Entry, val: string) {
    const next = [...entries];
    next[i] = { ...next[i], [field]: val };
    setEntries(next);
    setResult(null);
  }

  function calculate() {
    const errs: Record<string, string> = {};
    const l = parseFloat(length), w = parseFloat(width), h = parseFloat(height);
    if (!length || isNaN(l) || l <= 0) errs.length = "Required";
    if (!width  || isNaN(w) || w <= 0) errs.width  = "Required";
    if (!height || isNaN(h) || h <= 0) errs.height = "Required";

    const validEntries = entries.filter(e => parseFloat(e.lbs) > 0);
    if (validEntries.length === 0) errs.materials = "Add at least one material with a weight > 0.";

    setErrors(errs);
    if (Object.keys(errs).length > 0) { setResult(null); return; }

    let volCuFt = l * w * h;
    if (dimUnit === "m") volCuFt = volCuFt * 35.3147;

    let totalWeight = 0, weightedCN = 0;
    for (const e of validEntries) {
      const mat = MATERIALS.find(m => m.id === e.materialId)!;
      const lbs = parseFloat(e.lbs);
      totalWeight += lbs;
      weightedCN += lbs * mat.cnRatio;
    }
    const cn = weightedCN / totalWeight;

    let status: Result["status"];
    let suggestion: string;
    if (cn < IDEAL_LOW) {
      status = "too-low";
      const target = 27.5;
      const addLbs = Math.ceil((totalWeight * (target - cn)) / (60 - target));
      suggestion = `Too much nitrogen (C:N ${cn.toFixed(0)}:1). Add about ${addLbs} lb of dry leaves or cardboard to reach the ideal range.`;
    } else if (cn > IDEAL_HIGH) {
      status = "too-high";
      const target = 27.5;
      const addLbs = Math.ceil((totalWeight * (cn - target)) / (target - 20));
      suggestion = `Too much carbon (C:N ${cn.toFixed(0)}:1). Add about ${addLbs} lb of grass clippings or food scraps to reach the ideal range.`;
    } else {
      status = "ideal";
      suggestion = `C:N ratio is ${cn.toFixed(1)}:1 — right in the ideal range. Your pile is ready to compost efficiently.`;
    }

    setResult({
      volumeCuFt: Math.round(volCuFt * 10) / 10,
      volumeCuM: Math.round(volCuFt / 35.3147 * 100) / 100,
      cnRatio: Math.round(cn * 10) / 10,
      status,
      suggestion,
      hotWeeks: "4–8 weeks",
      coldMonths: "3–6 months",
    });
  }

  const isIdeal = result?.status === "ideal";
  const accentBorder = isIdeal ? "border-l-moss" : "border-l-terracotta";
  const accentRing   = isIdeal ? "border-[color-mix(in_oklch,var(--moss)_35%,transparent)]"
                               : "border-[color-mix(in_oklch,var(--terracotta)_35%,transparent)]";
  const cnColor      = isIdeal ? "text-moss-deep" : "text-terracotta";

  return (
    <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] rounded-lg p-6 md:p-7 max-w-[720px] mx-auto">
      <h2 className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-1">
        Is my compost pile balanced?
      </h2>
      <p className="font-serif italic text-[14px] text-soil mb-6">
        Give us your bin dimensions and the materials going in — we&apos;ll weigh the carbon-to-nitrogen ratio and tell you what to top up.
      </p>

      {/* Bin dimensions */}
      <div className="mb-5">
        <div className="flex items-end justify-between mb-2">
          <span className={fieldLabel.replace(" mb-1.5", "")}>Bin dimensions</span>
          <div className="inline-flex border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md overflow-hidden text-[12px] font-mono">
            {(["ft", "m"] as const).map(u => (
              <button key={u} onClick={() => { setDimUnit(u); setResult(null); }}
                className={`px-3 py-1 transition-colors duration-fast ${
                  dimUnit === u ? "bg-moss-deep text-cream" : "bg-cream text-soil hover:text-ink"
                }`}>
                {u}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {([["length","Length",length,setLength],["width","Width",width,setWidth],["height","Height",height,setHeight]] as const).map(
            ([id, label, val, setter]) => (
              <div key={id}>
                <label className={fieldLabel}>{label} ({dimUnit})</label>
                <input type="number" inputMode="decimal" min="0.1" step="0.1"
                  value={val}
                  onChange={e => { setter(e.target.value); setResult(null); }}
                  placeholder="e.g. 3"
                  className={`${fieldBase} font-mono tabular text-[15px]`}
                  aria-invalid={!!errors[id]} />
                {errors[id] && <p className="mt-1 font-mono text-[11px] text-terracotta">{errors[id]}</p>}
              </div>
            )
          )}
        </div>
      </div>

      {/* Materials */}
      <div className="mb-5">
        <p className={fieldLabel}>Materials</p>
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <div key={i} className="flex gap-2 items-center">
              <select value={entry.materialId}
                onChange={e => updateEntry(i, "materialId", e.target.value)}
                className={`${fieldBase} flex-1 font-sans text-[14px]`}>
                <optgroup label="Greens (N-rich)">
                  {MATERIALS.filter(m => m.type === "green").map(m => (
                    <option key={m.id} value={m.id}>{m.name} · C:N {m.cnRatio}:1</option>
                  ))}
                </optgroup>
                <optgroup label="Browns (C-rich)">
                  {MATERIALS.filter(m => m.type === "brown").map(m => (
                    <option key={m.id} value={m.id}>{m.name} · C:N {m.cnRatio}:1</option>
                  ))}
                </optgroup>
              </select>
              <div className="flex items-center gap-1.5">
                <input type="number" inputMode="decimal" min="0" step="0.5"
                  value={entry.lbs} placeholder="lbs"
                  onChange={e => updateEntry(i, "lbs", e.target.value)}
                  className={`${fieldBase} w-24 font-mono tabular text-[14px]`} />
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil">lb</span>
              </div>
              {entries.length > 1 && (
                <button onClick={() => removeEntry(i)}
                  aria-label="Remove material"
                  className="font-mono text-[20px] leading-none text-soil hover:text-terracotta transition-colors duration-fast px-1">
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.materials && <p className="mt-1 font-mono text-[11px] text-terracotta">{errors.materials}</p>}
        <button onClick={addEntry}
          className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-moss-deep hover:text-moss transition-colors duration-fast">
          + Add material
        </button>
      </div>

      <button onClick={calculate}
        className="w-full bg-moss-deep hover:bg-moss text-cream font-sans text-sm font-medium py-3 rounded-md transition-colors duration-fast">
        Weigh the pile
      </button>

      {result && (
        <div className={`mt-6 bg-cream border ${accentRing} border-l-[4px] ${accentBorder} rounded-md px-6 py-5`}>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-1">
            Balance · {isIdeal ? "Ideal range" : result.status === "too-low" ? "Too much nitrogen" : "Too much carbon"}
          </p>
          <p className={`font-serif font-semibold text-[34px] leading-[1] tabular ${cnColor}`}>
            {result.cnRatio}:1
            <span className="font-sans font-medium text-[14px] text-soil ml-1.5">C:N ratio</span>
          </p>
          <p className="font-serif text-[14px] leading-[1.6] text-ink mt-2">
            {result.suggestion}
          </p>

          <dl className="mt-4 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_30%,transparent)] grid grid-cols-2 gap-x-5 gap-y-2 font-sans text-[14px]">
            <dt className="text-soil">Pile volume</dt>
            <dd className="m-0 tabular text-ink">{result.volumeCuFt} cu ft · {result.volumeCuM} m³</dd>
            <dt className="text-soil">Ideal range</dt>
            <dd className="m-0 tabular text-ink">{IDEAL_LOW}:1 – {IDEAL_HIGH}:1</dd>
            <dt className="text-soil">Hot composting</dt>
            <dd className="m-0 tabular text-ink">{result.hotWeeks}</dd>
            <dt className="text-soil">Cold composting</dt>
            <dd className="m-0 tabular text-ink">{result.coldMonths}</dd>
          </dl>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-soil">
            Rates · Cornell Composting Science &amp; Engineering guidelines
          </p>
        </div>
      )}
    </section>
  );
}
