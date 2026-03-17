"use client";

import { useState } from "react";

// Ideal pH ranges for common plants (University Extension references)
const PLANT_PH: Record<string, { name: string; min: number; max: number }> = {
  tomato:      { name: "Tomato",           min: 6.0, max: 6.8 },
  blueberry:   { name: "Blueberry",        min: 4.5, max: 5.5 },
  lettuce:     { name: "Lettuce",          min: 6.0, max: 7.0 },
  potato:      { name: "Potato",           min: 4.8, max: 5.5 },
  carrot:      { name: "Carrot",           min: 6.0, max: 6.8 },
  pepper:      { name: "Pepper",           min: 6.0, max: 6.8 },
  cucumber:    { name: "Cucumber",         min: 6.0, max: 7.0 },
  spinach:     { name: "Spinach",          min: 6.0, max: 7.0 },
  strawberry:  { name: "Strawberry",       min: 5.5, max: 6.5 },
  rose:        { name: "Rose",             min: 6.0, max: 6.5 },
  azalea:      { name: "Azalea / Rhododendron", min: 4.5, max: 5.5 },
  lawn:        { name: "Lawn Grass",       min: 6.0, max: 7.0 },
};

// Lime/sulfur rates per 1 pH unit per 100 sq ft (lbs) — University Extension standard
// Source: Penn State Extension & Clemson Cooperative Extension
const SOIL_FACTORS: Record<string, { lime: number; sulfur: number }> = {
  sandy: { lime: 3.0,  sulfur: 1.0 },
  loamy: { lime: 5.0,  sulfur: 1.5 },
  clay:  { lime: 8.0,  sulfur: 2.0 },
};

interface Result {
  direction: "raise" | "lower" | "none";
  material: string;
  amountLbs: number;
  amountKg: number;
  amountPerSqM: number;
  phDiff: number;
}

export default function SoilPHCalculator() {
  const [currentPH, setCurrentPH] = useState("");
  const [targetPH, setTargetPH] = useState("");
  const [soilType, setSoilType] = useState("loamy");
  const [area, setArea] = useState("");
  const [areaUnit, setAreaUnit] = useState<"sqft" | "sqm">("sqft");
  const [resultUnit, setResultUnit] = useState<"lbs" | "kg">("lbs");
  const [selectedPlant, setSelectedPlant] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handlePlantSelect(val: string) {
    setSelectedPlant(val);
    if (val && PLANT_PH[val]) {
      const mid = ((PLANT_PH[val].min + PLANT_PH[val].max) / 2).toFixed(1);
      setTargetPH(mid);
    }
    setResult(null);
  }

  function validate() {
    const errs: Record<string, string> = {};
    const cur = parseFloat(currentPH);
    const tgt = parseFloat(targetPH);
    const ar = parseFloat(area);
    if (!currentPH || isNaN(cur) || cur < 3 || cur > 10) errs.currentPH = "Enter a pH between 3.0 and 10.0";
    if (!targetPH || isNaN(tgt) || tgt < 3 || tgt > 10) errs.targetPH = "Enter a pH between 3.0 and 10.0";
    if (!area || isNaN(ar) || ar <= 0) errs.area = "Enter a valid area greater than 0";
    return errs;
  }

  function calculate() {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) { setResult(null); return; }

    const cur = parseFloat(currentPH);
    const tgt = parseFloat(targetPH);
    let areaSqFt = parseFloat(area);
    if (areaUnit === "sqm") areaSqFt = areaSqFt * 10.7639;

    const phDiff = Math.abs(tgt - cur);

    if (phDiff <= 0.05) {
      setResult({ direction: "none", material: "", amountLbs: 0, amountKg: 0, amountPerSqM: 0, phDiff: 0 });
      return;
    }

    const factors = SOIL_FACTORS[soilType];
    const direction = tgt > cur ? "raise" : "lower";
    const ratePerUnit = direction === "raise" ? factors.lime : factors.sulfur;
    // rate is lbs per 1 pH unit per 100 sq ft
    const amountLbs = ratePerUnit * phDiff * (areaSqFt / 100);
    const amountKg = amountLbs * 0.453592;
    const amountPerSqM = (amountLbs / areaSqFt) * 10.7639 * 0.453592; // kg/m²

    setResult({
      direction,
      material: direction === "raise" ? "Garden Lime (CaCO₃)" : "Elemental Sulfur",
      amountLbs,
      amountKg,
      amountPerSqM,
      phDiff,
    });
  }

  const inputClass = (field: string) =>
    `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors ${
      errors[field] ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-green-700"
    }`;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Plant selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Plant Type <span className="text-gray-400 font-normal">(optional — auto-fills target pH)</span>
        </label>
        <select
          value={selectedPlant}
          onChange={(e) => handlePlantSelect(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-700 transition-colors"
        >
          <option value="">— Select a plant —</option>
          {Object.entries(PLANT_PH).map(([key, val]) => (
            <option key={key} value={key}>
              {val.name} (pH {val.min}–{val.max})
            </option>
          ))}
        </select>
      </div>

      {/* pH inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Soil pH</label>
          <input
            type="number" inputMode="decimal" min="3" max="10" step="0.1"
            value={currentPH}
            onChange={(e) => { setCurrentPH(e.target.value); setResult(null); }}
            placeholder="e.g. 5.5"
            className={inputClass("currentPH")}
          />
          {errors.currentPH && <p className="mt-1 text-xs text-red-500">{errors.currentPH}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target pH</label>
          <input
            type="number" inputMode="decimal" min="3" max="10" step="0.1"
            value={targetPH}
            onChange={(e) => { setTargetPH(e.target.value); setResult(null); }}
            placeholder="e.g. 6.5"
            className={inputClass("targetPH")}
          />
          {errors.targetPH && <p className="mt-1 text-xs text-red-500">{errors.targetPH}</p>}
        </div>
      </div>

      {/* Soil type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
        <div className="grid grid-cols-3 gap-2">
          {(["sandy", "loamy", "clay"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setSoilType(t); setResult(null); }}
              className={`py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${
                soilType === t
                  ? "bg-green-800 text-white border-green-800"
                  : "bg-white text-gray-600 border-gray-300 hover:border-green-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Area */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Garden Area</label>
        <div className="flex gap-2">
          <input
            type="number" inputMode="decimal" min="1"
            value={area}
            onChange={(e) => { setArea(e.target.value); setResult(null); }}
            placeholder="e.g. 100"
            className={inputClass("area") + " flex-1"}
          />
          <div className="flex border border-gray-300 rounded-lg overflow-hidden text-sm">
            {(["sqft", "sqm"] as const).map((u) => (
              <button
                key={u}
                onClick={() => { setAreaUnit(u); setResult(null); }}
                className={`px-3 py-2 transition-colors ${
                  areaUnit === u ? "bg-green-800 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {u === "sqft" ? "sq ft" : "sq m"}
              </button>
            ))}
          </div>
        </div>
        {errors.area && <p className="mt-1 text-xs text-red-500">{errors.area}</p>}
      </div>

      <button
        onClick={calculate}
        className="w-full bg-green-800 hover:bg-green-900 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
      >
        Calculate
      </button>

      {/* Results */}
      {result && result.direction === "none" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <p className="text-green-800 font-semibold text-lg">✓ Your soil pH is already on target</p>
          <p className="text-sm text-gray-500 mt-1">No amendment needed. Retest in 6–12 months.</p>
        </div>
      )}

      {result && result.direction !== "none" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-green-900 text-sm uppercase tracking-wide">
            {result.direction === "raise" ? "↑ Raise pH" : "↓ Lower pH"} — {result.phDiff.toFixed(1)} unit{result.phDiff !== 1 ? "s" : ""}
          </h3>

          <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amendment</span>
              <span className="text-sm font-semibold text-green-800">{result.material}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-sm text-gray-600">Amount needed</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-800">
                  {resultUnit === "lbs"
                    ? result.amountLbs.toFixed(1)
                    : result.amountKg.toFixed(1)}
                </span>
                <div className="flex border border-gray-200 rounded overflow-hidden text-xs">
                  {(["lbs", "kg"] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => setResultUnit(u)}
                      className={`px-2 py-1 transition-colors ${
                        resultUnit === u ? "bg-green-800 text-white" : "bg-white text-gray-500"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm text-sm text-gray-600 space-y-1.5">
            <p className="font-medium text-gray-700">Application tips</p>
            {result.direction === "raise" ? (
              <>
                <p>• Apply lime in fall for best results — it needs time to react with soil moisture.</p>
                <p>• Split large applications: apply half now, half in 2–3 months.</p>
                <p>• Till or rake into the top 6 inches of soil, then water thoroughly.</p>
                <p>• Retest pH after 2–3 months before applying more.</p>
              </>
            ) : (
              <>
                <p>• Apply elemental sulfur in spring or fall when soil is moist.</p>
                <p>• Work into the top 6 inches of soil and water in well.</p>
                <p>• Do not exceed 2 lbs per 100 sq ft per application — split if needed.</p>
                <p>• Retest pH after 2–3 months; sulfur acidification is slow.</p>
              </>
            )}
          </div>

          <p className="text-xs text-gray-400">
            Rates based on Penn State Extension & Clemson Cooperative Extension guidelines.
          </p>
        </div>
      )}
    </div>
  );
}
