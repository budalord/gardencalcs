"use client";

import { useMemo, useState } from "react";

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

// Extension-standard lbs per 1 pH unit per 100 sq ft
const SOIL_FACTORS: Record<string, { label: string; lime: number; sulfur: number }> = {
  sandy: { label: "Sandy (light)", lime: 3.0, sulfur: 1.0 },
  loamy: { label: "Loam (medium)", lime: 5.0, sulfur: 1.5 },
  clay:  { label: "Clay (heavy)",  lime: 8.0, sulfur: 2.0 },
};

interface Result {
  direction: "raise" | "lower" | "none";
  material: string;
  amountLbs: number;
  amountKg: number;
  per1000SqFt: number;
  perSqM_grams: number;
  bags40: number;
  phDiff: number;
  areaSqFt: number;
  soilLabel: string;
}

const scalePct = (ph: number) => `${Math.max(0, Math.min(100, ((ph - 3) / 7) * 100))}%`;

/**
 * Soil pH Calculator — Editorial Almanac widget (per P06).
 * Paper bg, mono inputs, pH-scale gradient with current/target markers,
 * moss (raise) or terracotta (lower) bordered result card, tabular numerals.
 */
export default function SoilPHCalculator() {
  const [currentPH, setCurrentPH] = useState("5.2");
  const [targetPH, setTargetPH] = useState("6.5");
  const [soilType, setSoilType] = useState<keyof typeof SOIL_FACTORS>("loamy");
  const [area, setArea] = useState("100");
  const [areaUnit, setAreaUnit] = useState<"sqft" | "sqm">("sqft");
  const [selectedPlant, setSelectedPlant] = useState("");

  function handlePlantSelect(val: string) {
    setSelectedPlant(val);
    if (val && PLANT_PH[val]) {
      const mid = ((PLANT_PH[val].min + PLANT_PH[val].max) / 2).toFixed(1);
      setTargetPH(mid);
    }
  }

  const { result, liveErrors } = useMemo<{ result: Result | null; liveErrors: Record<string, string> }>(() => {
    const errs: Record<string, string> = {};
    const cur = parseFloat(currentPH);
    const tgt = parseFloat(targetPH);
    const ar = parseFloat(area);
    if (!currentPH || isNaN(cur) || cur < 3 || cur > 10) errs.currentPH = "pH must be 3.0–10.0";
    if (!targetPH || isNaN(tgt) || tgt < 3 || tgt > 10) errs.targetPH = "pH must be 3.0–10.0";
    if (!area || isNaN(ar) || ar <= 0) errs.area = "Enter an area > 0";
    if (Object.keys(errs).length > 0) return { result: null, liveErrors: errs };

    let areaSqFt = ar;
    if (areaUnit === "sqm") areaSqFt = ar * 10.7639;

    const delta = tgt - cur;
    const phDiff = Math.abs(delta);
    const factors = SOIL_FACTORS[soilType];

    if (phDiff <= 0.05) {
      return {
        liveErrors: errs,
        result: {
          direction: "none",
          material: "",
          amountLbs: 0,
          amountKg: 0,
          per1000SqFt: 0,
          perSqM_grams: 0,
          bags40: 0,
          phDiff: 0,
          areaSqFt,
          soilLabel: factors.label,
        },
      };
    }

    const raising = delta > 0;
    const ratePerUnit = raising ? factors.lime : factors.sulfur;
    const amountLbs = ratePerUnit * phDiff * (areaSqFt / 100);
    const amountKg = amountLbs * 0.453592;
    const per1000SqFt = ratePerUnit * phDiff * 10;
    const perSqM_grams = (amountLbs * 453.592) / (areaSqFt * 0.092903);
    const bags40 = Math.max(1, Math.ceil(amountLbs / 40));

    return {
      liveErrors: errs,
      result: {
        direction: raising ? "raise" : "lower",
        material: raising ? "Calcitic lime (CaCO₃)" : "Elemental sulfur (S⁰)",
        amountLbs,
        amountKg,
        per1000SqFt,
        perSqM_grams,
        bags40,
        phDiff,
        areaSqFt,
        soilLabel: factors.label,
      },
    };
  }, [currentPH, targetPH, soilType, area, areaUnit]);

  const errors = liveErrors;

  const cur = parseFloat(currentPH);
  const tgt = parseFloat(targetPH);
  const curValid = !isNaN(cur) && cur >= 3 && cur <= 10;
  const tgtValid = !isNaN(tgt) && tgt >= 3 && tgt <= 10;

  const isLower = result?.direction === "lower";
  const isRaise = result?.direction === "raise";

  const fieldLabel = "block font-sans text-[11px] uppercase tracking-[0.08em] text-soil mb-1.5";
  const fieldInput =
    "w-full font-mono tabular text-[17px] font-medium bg-cream border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md px-3 py-2.5 text-ink outline-none focus:border-moss transition-colors duration-fast";

  return (
    <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] rounded-lg p-6 md:p-7 max-w-[720px] mx-auto">
      <h2 className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-1">
        How much lime (or sulfur) do I need?
      </h2>
      <p className="font-serif italic text-[14px] text-soil mb-6">
        Enter your current and target pH. We&apos;ll tell you pounds per bed, per 1,000 ft², and 40&nbsp;lb bags to buy.
      </p>

      {/* pH scale visual */}
      <div className="bg-cream border border-[color-mix(in_oklch,var(--soil)_20%,transparent)] rounded-md pt-10 pb-4 mb-6">
        <div
          className="relative h-[14px] mx-7 rounded-full"
          style={{
            background:
              "linear-gradient(to right, oklch(0.65 0.18 25), oklch(0.72 0.15 55), oklch(0.82 0.14 95), oklch(0.78 0.14 135), oklch(0.55 0.13 150), oklch(0.6 0.13 200), oklch(0.5 0.17 260))",
          }}
        >
          {curValid && (
            <div
              className="absolute -top-1.5 w-[2px] h-[26px] bg-terracotta transition-[left] duration-fast"
              style={{ left: scalePct(cur) }}
              aria-label={`Current pH ${cur}`}
            >
              <span className="absolute -top-[22px] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] font-semibold text-terracotta bg-paper px-1.5 py-[1px] rounded-sm border border-terracotta">
                Now {cur.toFixed(1)}
              </span>
            </div>
          )}
          {tgtValid && (
            <div
              className="absolute -top-1.5 w-[2px] h-[26px] bg-moss transition-[left] duration-fast"
              style={{ left: scalePct(tgt) }}
              aria-label={`Target pH ${tgt}`}
            >
              <span className="absolute -top-[22px] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] font-semibold text-moss-deep bg-paper px-1.5 py-[1px] rounded-sm border border-moss">
                Target {tgt.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between mx-7 mt-1.5 font-mono text-[11px] tabular text-soil">
          {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>

      {/* Plant selector */}
      <div className="mb-4">
        <label className={fieldLabel}>
          Plant (optional — auto-fills target pH)
        </label>
        <select
          value={selectedPlant}
          onChange={(e) => handlePlantSelect(e.target.value)}
          className={fieldInput.replace("font-mono", "font-sans") + " !text-[15px] !font-normal"}
        >
          <option value="">— Select a plant —</option>
          {Object.entries(PLANT_PH).map(([key, val]) => (
            <option key={key} value={key}>
              {val.name} (pH {val.min}–{val.max})
            </option>
          ))}
        </select>
      </div>

      {/* Input grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className={fieldLabel}>Current pH</label>
          <input
            type="number" inputMode="decimal" min="3" max="10" step="0.1"
            value={currentPH}
            onChange={(e) => setCurrentPH(e.target.value)}
            className={fieldInput}
            aria-invalid={!!errors.currentPH}
          />
          {errors.currentPH && <p className="mt-1 font-mono text-[11px] text-terracotta">{errors.currentPH}</p>}
        </div>
        <div>
          <label className={fieldLabel}>Target pH</label>
          <input
            type="number" inputMode="decimal" min="3" max="10" step="0.1"
            value={targetPH}
            onChange={(e) => setTargetPH(e.target.value)}
            className={fieldInput}
            aria-invalid={!!errors.targetPH}
          />
          {errors.targetPH && <p className="mt-1 font-mono text-[11px] text-terracotta">{errors.targetPH}</p>}
        </div>
      </div>

      {/* Area with unit toggle */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className={fieldLabel}>
            Area ({areaUnit === "sqft" ? "ft²" : "m²"})
          </label>
          <div className="flex gap-2">
            <input
              type="number" inputMode="decimal" min="1"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={fieldInput + " flex-1"}
              aria-invalid={!!errors.area}
            />
            <div className="flex border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md overflow-hidden font-sans text-[12px]">
              {(["sqft", "sqm"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setAreaUnit(u)}
                  className={`px-2.5 transition-colors duration-fast ${
                    areaUnit === u
                      ? "bg-moss-deep text-cream"
                      : "bg-cream text-soil hover:text-moss-deep"
                  }`}
                >
                  {u === "sqft" ? "ft²" : "m²"}
                </button>
              ))}
            </div>
          </div>
          {errors.area && <p className="mt-1 font-mono text-[11px] text-terracotta">{errors.area}</p>}
        </div>
        <div>
          <label className={fieldLabel}>Soil type</label>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value as keyof typeof SOIL_FACTORS)}
            className={fieldInput.replace("font-mono", "font-sans") + " !text-[15px] !font-normal"}
          >
            {Object.entries(SOIL_FACTORS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result card */}
      {result && result.direction === "none" && (
        <div className="mt-5 bg-cream border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md px-6 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-1">You need</p>
          <p className="font-serif font-semibold text-[28px] leading-[1] text-moss-deep tabular">
            0 <span className="font-sans font-medium text-[14px] text-soil ml-1.5">already at target</span>
          </p>
          <p className="font-serif text-[14px] text-soil mt-2">
            Your pH is within the comfort zone for {result.soilLabel.toLowerCase()}. Retest in 6–12 months.
          </p>
        </div>
      )}

      {result && result.direction !== "none" && (
        <div
          className={`mt-5 bg-cream border border-l-[4px] rounded-md px-6 py-5 ${
            isLower
              ? "border-[color-mix(in_oklch,var(--terracotta)_35%,transparent)] border-l-terracotta"
              : "border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-moss"
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-1">You need</p>
          <p
            className={`font-serif font-semibold text-[34px] leading-[1] tabular ${
              isLower ? "text-terracotta" : "text-moss-deep"
            }`}
          >
            {result.amountLbs.toFixed(1)}
            <span className="font-sans font-medium text-[14px] text-soil ml-1.5">
              lb {result.material.toLowerCase().replace(/\s*\(.*\)/, "")}
            </span>
          </p>
          <p className="font-serif text-[14px] text-soil mt-1.5">
            To {isRaise ? "raise" : "lower"} pH by {result.phDiff.toFixed(1)} across{" "}
            {Math.round(result.areaSqFt).toLocaleString()} ft² of {result.soilLabel.toLowerCase()}.
          </p>

          <dl className="mt-4 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_30%,transparent)] grid grid-cols-2 gap-x-5 gap-y-2 font-sans text-[14px]">
            <dt className="text-soil">Per 1,000 ft²</dt>
            <dd className="m-0 tabular text-ink">{result.per1000SqFt.toFixed(1)} lb</dd>
            <dt className="text-soil">Per m²</dt>
            <dd className="m-0 tabular text-ink">{result.perSqM_grams.toFixed(0)} g</dd>
            <dt className="text-soil">In kg</dt>
            <dd className="m-0 tabular text-ink">{result.amountKg.toFixed(2)} kg</dd>
            <dt className="text-soil">Approx 40 lb bags</dt>
            <dd className="m-0 tabular text-ink">
              {result.bags40} bag{result.bags40 === 1 ? "" : "s"}
            </dd>
            <dt className="text-soil">Material</dt>
            <dd className="m-0 text-ink col-span-1">{result.material}</dd>
          </dl>

          <p className="mt-4 font-serif italic text-[13px] text-soil leading-[1.6]">
            {isRaise
              ? "Apply in fall; work into the top 6 in. of soil and water in. Retest after 3 months before re-applying."
              : "Sulfur works slowly — allow 6–9 months in cool soil. Don't exceed 2 lb per 100 ft² per application; split larger doses 60 days apart."}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-soil">
            Rates · Penn State Extension · Clemson Cooperative Extension · Cornell Cooperative Extension
          </p>
        </div>
      )}
    </section>
  );
}
