"use client";

import { useState } from "react";

// Base weekly water depth for established plants before the condition
// multipliers below. Drought-tolerant Mediterranean species (lavender,
// rosemary) use much less than fruiting vegetables — the previous 0.5"/wk for
// lavender was high enough to encourage root rot once mature.
const PLANT_BASE: Record<string, { name: string; baseInches: number }> = {
  tomato:     { name: "Tomato",      baseInches: 1.0 },
  pepper:     { name: "Pepper",      baseInches: 1.0 },
  cucumber:   { name: "Cucumber",    baseInches: 1.0 },
  lettuce:    { name: "Lettuce",     baseInches: 1.0 },
  carrot:     { name: "Carrot",      baseInches: 1.0 },
  zucchini:   { name: "Zucchini",    baseInches: 1.0 },
  basil:      { name: "Basil",       baseInches: 1.0 },
  rose:       { name: "Rose",        baseInches: 1.0 },
  lavender:   { name: "Lavender (established)", baseInches: 0.25 },
  sunflower:  { name: "Sunflower",   baseInches: 1.0 },
  strawberry: { name: "Strawberry",  baseInches: 1.0 },
  blueberry:  { name: "Blueberry",   baseInches: 1.0 },
};

// Sandy soil drains roughly 1.5–2× faster than loam; clay holds 1.3× more
// water but releases it slowly. Bumped sandy 1.3 → 1.5 to better match
// USU/UMass irrigation guidance.
const SOIL_FACTOR: Record<string, number> = { sandy: 1.5, loamy: 1.0, clay: 0.7 };
const SEASON_FACTOR: Record<string, number> = { spring: 0.9, summer: 1.0, fall: 0.75, winter: 0.4 };

// Container multiplier 1.4 was a major underestimate. A 6" container in
// summer heat can dry out in a single day, equivalent to 3–5× in-ground
// demand. Factor of 3.0 for containers is a conservative midpoint; users
// still need to check soil moisture daily in heat.
const METHOD_FACTOR: Record<string, number> = { "in-ground": 1.0, "raised-bed": 1.2, container: 3.0 };
const GALLONS_PER_INCH_SQ_FT = 0.623;

const SOIL_NOTE: Record<string, string> = {
  sandy: "Sandy soil drains quickly — check moisture daily and water before the soil dries out completely.",
  loamy: "Loamy soil retains moisture well. Check 2 inches deep before watering.",
  clay: "Clay soil drains slowly. Let the top 2 inches dry between sessions to prevent root rot.",
};

const METHOD_NOTE: Record<string, string> = {
  "in-ground": "In-ground beds benefit from deep, infrequent watering to encourage deep root growth.",
  "raised-bed": "Raised beds drain faster than in-ground. Mulching the surface helps retain moisture.",
  container: "Small containers (≤6 in) in summer heat may need water once or twice daily — check the top inch every morning. Larger pots (≥12 in) hold longer but still dry out faster than beds.",
};

interface Result {
  grossWeeklyInches: number;
  rainfallInches: number;
  netWeeklyInches: number;
  netWeeklyCm: number;
  netWeeklyGallons: number;
  timesPerWeek: number;
  perSessionInches: number;
  perSessionGallons: number;
  areaSqFt: number;
  bestTime: string;
  soilNote: string;
  methodNote: string;
}

const fieldLabel = "block font-sans text-[11px] uppercase tracking-[0.08em] text-soil mb-1.5";
const fieldSelect =
  "w-full font-sans text-[15px] bg-cream border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md px-3 py-2.5 text-ink outline-none focus:border-moss transition-colors duration-fast";

export default function WateringScheduleCalculator() {
  const [plant, setPlant] = useState("tomato");
  const [soilType, setSoilType] = useState("loamy");
  const [season, setSeason] = useState("summer");
  const [method, setMethod] = useState("in-ground");
  const [area, setArea] = useState("32");
  const [rainfall, setRainfall] = useState("0");
  const [result, setResult] = useState<Result | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function calculate() {
    const areaSqFt = Number.parseFloat(area);
    const rainfallInches = Number.parseFloat(rainfall);
    const nextErrors: Record<string, string> = {};

    if (!Number.isFinite(areaSqFt) || areaSqFt <= 0) nextErrors.area = "Enter a watered area greater than 0 sq ft.";
    if (!Number.isFinite(rainfallInches) || rainfallInches < 0) nextErrors.rainfall = "Recent rainfall must be 0 inches or more.";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    const base = PLANT_BASE[plant].baseInches;
    const grossWeeklyInches = base * SOIL_FACTOR[soilType] * SEASON_FACTOR[season] * METHOD_FACTOR[method];
    const netWeeklyInches = Math.max(0, grossWeeklyInches - rainfallInches);
    const sessions = netWeeklyInches <= 0.01
      ? 0
      : Math.min(7, Math.max(1, Math.ceil(netWeeklyInches / 0.75)));
    const perSessionInches = sessions > 0 ? netWeeklyInches / sessions : 0;
    const netWeeklyGallons = netWeeklyInches * areaSqFt * GALLONS_PER_INCH_SQ_FT;
    const bestTime =
      season === "summer"
        ? "Early morning (6–9 AM) — avoids heat stress and leaf scorch"
        : "Morning or early evening — morning preferred to reduce fungal risk";

    setErrors({});
    setResult({
      grossWeeklyInches,
      rainfallInches,
      netWeeklyInches,
      netWeeklyCm: netWeeklyInches * 2.54,
      netWeeklyGallons,
      timesPerWeek: sessions,
      perSessionInches,
      perSessionGallons: sessions > 0 ? netWeeklyGallons / sessions : 0,
      areaSqFt,
      bestTime,
      soilNote: SOIL_NOTE[soilType],
      methodNote: METHOD_NOTE[method],
    });
  }

  return (
    <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] rounded-lg p-6 md:p-7 max-w-[720px] mx-auto">
      <h2 className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-1">
        How often should I water?
      </h2>
      <p className="font-serif italic text-[14px] text-soil mb-6">
        Set the crop and conditions, then convert the rainfall-adjusted depth into gallons for the area you actually water.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label htmlFor="watering-plant" className={fieldLabel}>Plant</label>
          <select id="watering-plant" value={plant} onChange={(e) => { setPlant(e.target.value); setResult(null); setErrors({}); }} className={fieldSelect}>
            {Object.entries(PLANT_BASE).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="watering-soil" className={fieldLabel}>Soil</label>
          <select id="watering-soil" value={soilType} onChange={(e) => { setSoilType(e.target.value); setResult(null); setErrors({}); }} className={fieldSelect}>
            <option value="sandy">Sandy (light)</option>
            <option value="loamy">Loam (medium)</option>
            <option value="clay">Clay (heavy)</option>
          </select>
        </div>
        <div>
          <label htmlFor="watering-season" className={fieldLabel}>Season</label>
          <select id="watering-season" value={season} onChange={(e) => { setSeason(e.target.value); setResult(null); setErrors({}); }} className={fieldSelect}>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
        </div>
        <div>
          <label htmlFor="watering-method" className={fieldLabel}>Growing method</label>
          <select id="watering-method" value={method} onChange={(e) => { setMethod(e.target.value); setResult(null); setErrors({}); }} className={fieldSelect}>
            <option value="in-ground">In-ground</option>
            <option value="raised-bed">Raised bed</option>
            <option value="container">Container</option>
          </select>
        </div>
        <div>
          <label htmlFor="watering-area" className={fieldLabel}>
            {method === "container" ? "Container surface area" : "Watered bed area"} (sq ft)
          </label>
          <input
            id="watering-area"
            type="number"
            inputMode="decimal"
            min="0.1"
            step="0.1"
            value={area}
            onChange={(e) => { setArea(e.target.value); setResult(null); setErrors((current) => ({ ...current, area: "" })); }}
            aria-invalid={Boolean(errors.area)}
            aria-describedby={errors.area ? "watering-area-error" : undefined}
            className={`${fieldSelect} font-mono tabular text-[17px] font-medium`}
          />
          {errors.area && <p id="watering-area-error" role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{errors.area}</p>}
        </div>
        <div>
          <label htmlFor="watering-rainfall" className={fieldLabel}>Recent weekly rainfall (in)</label>
          <input
            id="watering-rainfall"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={rainfall}
            onChange={(e) => { setRainfall(e.target.value); setResult(null); setErrors((current) => ({ ...current, rainfall: "" })); }}
            aria-invalid={Boolean(errors.rainfall)}
            aria-describedby={`watering-rainfall-note${errors.rainfall ? " watering-rainfall-error" : ""}`}
            className={`${fieldSelect} font-mono tabular text-[17px] font-medium`}
          />
          <p id="watering-rainfall-note" className="mt-1.5 font-serif text-[12px] leading-[1.45] text-soil">
            Count only rain that reached the bed or container surface.
          </p>
          {errors.rainfall && <p id="watering-rainfall-error" role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{errors.rainfall}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={calculate}
        className="w-full bg-moss-deep hover:bg-moss text-cream font-sans text-sm font-medium py-3 rounded-md transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        Build the schedule
      </button>

      {result && (
        <div aria-live="polite" className="mt-6 bg-cream border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md px-6 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-1">
            Net weekly irrigation · {PLANT_BASE[plant].name}
          </p>
          <p className="font-serif font-semibold text-[34px] leading-[1] text-moss-deep tabular">
            {result.netWeeklyGallons.toFixed(1)}
            <span className="font-sans font-medium text-[14px] text-soil ml-1.5">US gal this week</span>
          </p>
          <p className="font-serif text-[14px] text-soil mt-1.5">
            {result.timesPerWeek === 0
              ? `Recent rainfall meets or exceeds the ${result.grossWeeklyInches.toFixed(1)} in baseline for this setup.`
              : `${result.netWeeklyInches.toFixed(2)} in (${result.netWeeklyCm.toFixed(1)} cm) of irrigation remains across ${result.areaSqFt.toLocaleString()} ft² after rainfall.`}
          </p>

          <dl className="mt-4 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_30%,transparent)] grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-5 gap-y-1 sm:gap-y-2 font-sans text-[14px]">
            <dt className="text-soil">Target before rain</dt>
            <dd className="m-0 mb-2 sm:mb-0 tabular text-ink">{result.grossWeeklyInches.toFixed(2)} in</dd>
            <dt className="text-soil">Recent rainfall</dt>
            <dd className="m-0 mb-2 sm:mb-0 tabular text-ink">− {result.rainfallInches.toFixed(2)} in</dd>
            <dt className="text-soil">Suggested rhythm</dt>
            <dd className="m-0 mb-2 sm:mb-0 tabular text-ink">
              {method === "container"
                ? "Check daily; water when the top 1 in is dry"
                : result.timesPerWeek === 0
                  ? "No irrigation this week"
                  : `${result.timesPerWeek}× this week`}
            </dd>
            <dt className="text-soil">Per session</dt>
            <dd className="m-0 mb-2 sm:mb-0 tabular text-ink">
              {method === "container"
                ? result.timesPerWeek === 0
                  ? "Rain met the baseline; keep checking moisture"
                  : "Apply slowly until excess begins to drain"
                : result.timesPerWeek === 0
                  ? "0 gal"
                  : `${result.perSessionGallons.toFixed(1)} gal · ${result.perSessionInches.toFixed(2)} in`}
            </dd>
            <dt className="text-soil">Best time</dt>
            <dd className="m-0 mb-2 sm:mb-0 text-ink">{result.bestTime}</dd>
            <dt className="text-soil">Soil note</dt>
            <dd className="m-0 mb-2 sm:mb-0 text-ink font-serif text-[14px]">{result.soilNote}</dd>
            <dt className="text-soil">Method note</dt>
            <dd className="m-0 text-ink font-serif text-[14px]">{result.methodNote}</dd>
          </dl>

          <p className="mt-4 font-serif italic text-[13px] text-soil leading-[1.6]">
            Gallons use 1 inch over 1 ft² ≈ 0.623 US gallon. This is a planning baseline, not a
            precision irrigation schedule: runoff, container cover, mulch, wind, humidity, plant
            stage, and local evapotranspiration all change what reaches roots. Check soil moisture
            2–3 inches deep before each session.
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-soil">
            Baseline · UMN Extension watering vegetable garden · USU Extension water recommendations · Texas A&amp;M Easy Gardening
          </p>
        </div>
      )}
    </section>
  );
}
