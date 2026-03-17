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
    if (validEntries.length === 0) errs.materials = "Add at least one material with a weight > 0";

    setErrors(errs);
    if (Object.keys(errs).length > 0) { setResult(null); return; }

    // Volume
    let volCuFt = l * w * h;
    if (dimUnit === "m") volCuFt = volCuFt * 35.3147;

    // Weighted C:N ratio: sum(weight * cnRatio) / sum(weight)
    let totalWeight = 0, weightedCN = 0;
    for (const e of validEntries) {
      const mat = MATERIALS.find(m => m.id === e.materialId)!;
      const lbs = parseFloat(e.lbs);
      totalWeight += lbs;
      weightedCN += lbs * mat.cnRatio;
    }
    const cn = weightedCN / totalWeight;

    // Suggestion
    let status: Result["status"];
    let suggestion: string;
    if (cn < IDEAL_LOW) {
      status = "too-low";
      // Need to add browns: target CN=27.5 (midpoint)
      // (totalWeight * cn + addedLbs * 60) / (totalWeight + addedLbs) = 27.5
      // Using dry leaves (CN=60) as reference brown
      const target = 27.5;
      const addLbs = Math.ceil((totalWeight * (target - cn)) / (60 - target));
      suggestion = `Your pile has too much nitrogen (C:N ${cn.toFixed(0)}:1). Add about ${addLbs} lbs of dry leaves or cardboard to reach the ideal range.`;
    } else if (cn > IDEAL_HIGH) {
      status = "too-high";
      // Need to add greens: using grass clippings (CN=20) as reference
      const target = 27.5;
      const addLbs = Math.ceil((totalWeight * (cn - target)) / (target - 20));
      suggestion = `Your pile has too much carbon (C:N ${cn.toFixed(0)}:1). Add about ${addLbs} lbs of grass clippings or food scraps to reach the ideal range.`;
    } else {
      status = "ideal";
      suggestion = `Your C:N ratio is ${cn.toFixed(1)}:1 — right in the ideal range. Your pile is ready to compost efficiently.`;
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

  const inputBase = "border rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors";
  const inputOk   = `${inputBase} border-gray-300 focus:border-green-700`;
  const inputErr  = `${inputBase} border-red-500 focus:border-red-500`;

  const statusColor = result
    ? result.status === "ideal" ? "bg-green-50 border-green-200"
    : result.status === "too-low" ? "bg-orange-50 border-orange-200"
    : "bg-yellow-50 border-yellow-200"
    : "";

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Bin dimensions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Bin Dimensions</span>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden text-xs">
            {(["ft", "m"] as const).map(u => (
              <button key={u} onClick={() => { setDimUnit(u); setResult(null); }}
                className={`px-3 py-1.5 transition-colors ${dimUnit === u ? "bg-green-800 text-white" : "bg-white text-gray-500"}`}>
                {u}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[["length","Length",length,setLength],["width","Width",width,setWidth],["height","Height",height,setHeight]].map(
            ([id, label, val, setter]) => (
              <div key={id as string}>
                <label className="block text-xs text-gray-500 mb-1">{label as string} ({dimUnit})</label>
                <input type="number" inputMode="decimal" min="0.1" step="0.1"
                  value={val as string}
                  onChange={e => { (setter as (v:string)=>void)(e.target.value); setResult(null); }}
                  placeholder="e.g. 3"
                  className={`w-full ${errors[id as string] ? inputErr : inputOk}`} />
                {errors[id as string] && <p className="text-xs text-red-500 mt-0.5">{errors[id as string]}</p>}
              </div>
            )
          )}
        </div>
      </div>

      {/* Materials */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Materials</p>
        <div className="space-y-2">
          {entries.map((entry, i) => {
            const mat = MATERIALS.find(m => m.id === entry.materialId)!;
            return (
              <div key={i} className="flex gap-2 items-center">
                <select value={entry.materialId}
                  onChange={e => updateEntry(i, "materialId", e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-green-700">
                  <optgroup label="🟢 Greens (Nitrogen)">
                    {MATERIALS.filter(m => m.type === "green").map(m => (
                      <option key={m.id} value={m.id}>{m.name} (C:N {m.cnRatio}:1)</option>
                    ))}
                  </optgroup>
                  <optgroup label="🟤 Browns (Carbon)">
                    {MATERIALS.filter(m => m.type === "brown").map(m => (
                      <option key={m.id} value={m.id}>{m.name} (C:N {m.cnRatio}:1)</option>
                    ))}
                  </optgroup>
                </select>
                <div className="flex items-center gap-1">
                  <input type="number" inputMode="decimal" min="0" step="0.5"
                    value={entry.lbs} placeholder="lbs"
                    onChange={e => updateEntry(i, "lbs", e.target.value)}
                    className="w-20 border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-green-700" />
                  <span className="text-xs text-gray-400">lbs</span>
                </div>
                {entries.length > 1 && (
                  <button onClick={() => removeEntry(i)}
                    className="text-gray-400 hover:text-red-500 text-lg leading-none transition-colors">×</button>
                )}
              </div>
            );
          })}
        </div>
        {errors.materials && <p className="text-xs text-red-500 mt-1">{errors.materials}</p>}
        <button onClick={addEntry}
          className="mt-2 text-sm text-green-700 hover:text-green-900 font-medium transition-colors">
          + Add material
        </button>
      </div>

      <button onClick={calculate}
        className="w-full bg-green-800 hover:bg-green-900 text-white font-medium py-2.5 rounded-lg text-sm transition-colors">
        Calculate
      </button>

      {/* Results */}
      {result && (
        <div className={`border rounded-xl p-5 space-y-4 ${statusColor}`}>
          <h3 className="font-semibold text-green-900 text-sm uppercase tracking-wide">Results</h3>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-800">{result.volumeCuFt}</p>
              <p className="text-xs text-gray-500 mt-0.5">cu ft</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-800">{result.volumeCuM}</p>
              <p className="text-xs text-gray-500 mt-0.5">cu m</p>
            </div>
            <div className={`rounded-lg p-3 text-center shadow-sm ${
              result.status === "ideal" ? "bg-green-100" : "bg-orange-100"}`}>
              <p className={`text-2xl font-bold ${result.status === "ideal" ? "text-green-800" : "text-orange-700"}`}>
                {result.cnRatio}:1
              </p>
              <p className="text-xs text-gray-500 mt-0.5">C:N ratio</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
              {result.status === "ideal" ? "✓ Ratio is Ideal" : result.status === "too-low" ? "⚠ Too Much Nitrogen" : "⚠ Too Much Carbon"}
            </p>
            <p className="text-sm text-gray-700">{result.suggestion}</p>
            <p className="text-xs text-gray-400 mt-1">Ideal range: {IDEAL_LOW}:1 – {IDEAL_HIGH}:1</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 shadow-sm text-center">
              <p className="text-sm font-bold text-green-800">{result.hotWeeks}</p>
              <p className="text-xs text-gray-500">Hot composting</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm text-center">
              <p className="text-sm font-bold text-green-800">{result.coldMonths}</p>
              <p className="text-xs text-gray-500">Cold composting</p>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            C:N ratios based on Cornell Composting Science & Engineering guidelines.
          </p>
        </div>
      )}
    </div>
  );
}
