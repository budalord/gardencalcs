"use client";

import { useState } from "react";

// Base weekly water need in inches
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
  clay: "Clay soil drains slowly. Avoid overwatering — let the top 2 inches dry out between sessions to prevent root rot.",
};

const METHOD_NOTE: Record<string, string> = {
  "in-ground": "In-ground beds benefit from deep, infrequent watering to encourage deep root growth.",
  "raised-bed": "Raised beds drain faster than in-ground. Mulching the surface helps retain moisture.",
  container: "Containers dry out quickly, especially in summer heat. Check daily and water when the top inch feels dry.",
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

export default function WateringScheduleCalculator() {
  const [plant, setPlant] = useState("tomato");
  const [soilType, setSoilType] = useState("loamy");
  const [season, setSeason] = useState("summer");
  const [method, setMethod] = useState("in-ground");
  const [result, setResult] = useState<Result | null>(null);

  function calculate() {
    const base = PLANT_BASE[plant].baseInches;
    const weekly = base * SOIL_FACTOR[soilType] * SEASON_FACTOR[season] * METHOD_FACTOR[method];

    // Sessions per week: aim for ~1 inch per session, min 1, max 7
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

  const selectClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-700 transition-colors";

  return (
    <div className="max-w-lg mx-auto space-y-5">
      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plant Type</label>
          <select value={plant} onChange={(e) => { setPlant(e.target.value); setResult(null); }} className={selectClass}>
            {Object.entries(PLANT_BASE).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
          <select value={soilType} onChange={(e) => { setSoilType(e.target.value); setResult(null); }} className={selectClass}>
            <option value="sandy">Sandy</option>
            <option value="loamy">Loamy</option>
            <option value="clay">Clay</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
          <select value={season} onChange={(e) => { setSeason(e.target.value); setResult(null); }} className={selectClass}>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Growing Method</label>
          <select value={method} onChange={(e) => { setMethod(e.target.value); setResult(null); }} className={selectClass}>
            <option value="in-ground">In-Ground</option>
            <option value="raised-bed">Raised Bed</option>
            <option value="container">Container</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-green-800 hover:bg-green-900 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
      >
        Calculate
      </button>

      {/* Results */}
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-green-900 text-sm uppercase tracking-wide">
            Watering Schedule — {PLANT_BASE[plant].name}
          </h3>

          {/* Key metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-800">{result.timesPerWeek}×</p>
              <p className="text-xs text-gray-500 mt-0.5">per week</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-800">{result.perSessionInches}"</p>
              <p className="text-xs text-gray-500 mt-0.5">per session</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-800">{result.weeklyCm}</p>
              <p className="text-xs text-gray-500 mt-0.5">cm / week</p>
            </div>
          </div>

          {/* Best time */}
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Best Time to Water</p>
            <p className="text-sm text-gray-700">{result.bestTime}</p>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Soil Note</p>
              <p className="text-sm text-gray-600">{result.soilNote}</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Growing Method Note</p>
              <p className="text-sm text-gray-600">{result.methodNote}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Estimates based on standard horticultural guidelines. Adjust based on local rainfall and actual soil moisture.
          </p>
        </div>
      )}
    </div>
  );
}
