"use client";

import { useState } from "react";

const PLANT_BASE: Record<string, { name: string; baseInches: number }> = {
  tomato:     { name: "Tomato",      baseInches: 1.5 },
  pepper:     { name: "Pepper",      baseInches: 1.0 },
  cucumber:   { name: "Cucumber",    baseInches: 1.5 },
  lettuce:    { name: "Lettuce",     baseInches: 1.0 },
  carrot:     { name: "Carrot",      baseInches: 1.0 },
  zucchini:   { name: "Zucchini",    baseInches: 1.5 },
  basil:      { name: "Basil",       baseInches: 1.0 },
  rose:       { name: "Rose",        baseInches: 1.5 },
  lavender:   { name: "Lavender",    baseInches: 0.5 },
  sunflower:  { name: "Sunflower",   baseInches: 1.0 },
  strawberry: { name: "Strawberry",  baseInches: 1.5 },
  blueberry:  { name: "Blueberry",   baseInches: 1.5 },
};

const SOIL_FACTOR: Record<string, number> = { sandy: 1.3, loamy: 1.0, clay: 0.7 };
const SEASON_FACTOR: Record<string, number> = { spring: 1.0, summer: 1.5, fall: 0.8, winter: 0.4 };
const METHOD_FACTOR: Record<string, number> = { "in-ground": 1.0, "raised-bed": 1.2, container: 1.4 };

const SOIL_NOTE: Record<string, string> = {
  sandy: "Sandy soil drains quickly — check moisture daily and water before the soil dries out completely.",
  loamy: "Loamy soil retains moisture well. Check 2 inches deep before watering.",
  clay: "Clay soil drains slowly. Let the top 2 inches dry between sessions to prevent root rot.",
};

const METHOD_NOTE: Record<string, string> = {
  "in-ground": "In-ground beds benefit from deep, infrequent watering to encourage deep root growth.",
  "raised-bed": "Raised beds drain faster than in-ground. Mulching the surface helps retain moisture.",
  container: "Containers dry out quickly, especially in summer heat. Check daily; water when the top inch feels dry.",
};

interface Result {
  weeklyInches: number;
  weeklyCm: number;
  timesPerWeek: number;
  perSessionInches: number;
  perSessionCm: number;
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
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const base = PLANT_BASE[plant].baseInches;
    const weekly = base * SOIL_FACTOR[soilType] * SEASON_FACTOR[season] * METHOD_FACTOR[method];
    const sessions = Math.min(7, Math.max(1, Math.round(weekly)));
    const perSession = weekly / sessions;
    const bestTime =
      season === "summer"
        ? "Early morning (6–9 AM) — avoids heat stress and leaf scorch"
        : "Morning or early evening — morning preferred to reduce fungal risk";

    setResult({
      weeklyInches: Math.round(weekly * 10) / 10,
      weeklyCm: Math.round(weekly * 2.54 * 10) / 10,
      timesPerWeek: sessions,
      perSessionInches: Math.round(perSession * 100) / 100,
      perSessionCm: Math.round(perSession * 2.54 * 100) / 100,
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
        Four variables — crop, soil, season, method — turn into a weekly depth and session rhythm.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className={fieldLabel}>Plant</label>
          <select value={plant} onChange={(e) => { setPlant(e.target.value); setResult(null); }} className={fieldSelect}>
            {Object.entries(PLANT_BASE).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>
        <div>
          <label className={fieldLabel}>Soil</label>
          <select value={soilType} onChange={(e) => { setSoilType(e.target.value); setResult(null); }} className={fieldSelect}>
            <option value="sandy">Sandy (light)</option>
            <option value="loamy">Loam (medium)</option>
            <option value="clay">Clay (heavy)</option>
          </select>
        </div>
        <div>
          <label className={fieldLabel}>Season</label>
          <select value={season} onChange={(e) => { setSeason(e.target.value); setResult(null); }} className={fieldSelect}>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
        </div>
        <div>
          <label className={fieldLabel}>Growing method</label>
          <select value={method} onChange={(e) => { setMethod(e.target.value); setResult(null); }} className={fieldSelect}>
            <option value="in-ground">In-ground</option>
            <option value="raised-bed">Raised bed</option>
            <option value="container">Container</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-moss-deep hover:bg-moss text-cream font-sans text-sm font-medium py-3 rounded-md transition-colors duration-fast"
      >
        Build the schedule
      </button>

      {result && (
        <div className="mt-6 bg-cream border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md px-6 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-1">
            Weekly rhythm · {PLANT_BASE[plant].name}
          </p>
          <p className="font-serif font-semibold text-[34px] leading-[1] text-moss-deep tabular">
            {result.timesPerWeek}×
            <span className="font-sans font-medium text-[14px] text-soil ml-1.5">per week</span>
          </p>
          <p className="font-serif text-[14px] text-soil mt-1.5">
            About {result.perSessionInches}&quot; per session ({result.weeklyInches}&quot; / {result.weeklyCm}&nbsp;cm total weekly).
          </p>

          <dl className="mt-4 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_30%,transparent)] grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-sans text-[14px]">
            <dt className="text-soil">Best time</dt>
            <dd className="m-0 text-ink">{result.bestTime}</dd>
            <dt className="text-soil">Soil note</dt>
            <dd className="m-0 text-ink font-serif text-[14px]">{result.soilNote}</dd>
            <dt className="text-soil">Method note</dt>
            <dd className="m-0 text-ink font-serif text-[14px]">{result.methodNote}</dd>
          </dl>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-soil">
            Adjust for local rainfall · check soil moisture before every session.
          </p>
        </div>
      )}
    </section>
  );
}
