"use client";

import { useState } from "react";

const PLANT_DATA: Record<
  string,
  { rowSpacing: number; plantSpacing: number; name: string }
> = {
  tomato:    { name: "Tomato",              rowSpacing: 36, plantSpacing: 24 },
  cucumber:  { name: "Cucumber",            rowSpacing: 36, plantSpacing: 12 },
  lettuce:   { name: "Lettuce",             rowSpacing: 12, plantSpacing: 8  },
  carrot:    { name: "Carrot",              rowSpacing: 12, plantSpacing: 3  },
  pepper:    { name: "Pepper (Bell)",       rowSpacing: 24, plantSpacing: 18 },
  zucchini:  { name: "Zucchini / Courgette", rowSpacing: 48, plantSpacing: 36 },
  spinach:   { name: "Spinach",             rowSpacing: 12, plantSpacing: 6  },
  kale:      { name: "Kale",               rowSpacing: 18, plantSpacing: 12 },
  radish:    { name: "Radish",             rowSpacing: 6,  plantSpacing: 2  },
  beet:      { name: "Beet / Beetroot",    rowSpacing: 12, plantSpacing: 4  },
  onion:     { name: "Onion",              rowSpacing: 12, plantSpacing: 4  },
  garlic:    { name: "Garlic",             rowSpacing: 12, plantSpacing: 6  },
  pea:       { name: "Pea",               rowSpacing: 18, plantSpacing: 4  },
  bean:      { name: "Bean (Bush)",        rowSpacing: 18, plantSpacing: 6  },
  broccoli:  { name: "Broccoli",           rowSpacing: 24, plantSpacing: 18 },
};

interface Result {
  rowSpacing: number;
  plantSpacing: number;
  rows: number;
  plantsPerRow: number;
  totalPlants: number;
  recommendedSeeds: number;
}

export default function SeedSpacingCalculator() {
  const [plant, setPlant] = useState("tomato");
  const [area, setArea] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    const areaNum = parseFloat(area);
    if (!area || isNaN(areaNum) || areaNum <= 0) {
      setError("Please enter a valid garden area greater than 0.");
      setResult(null);
      return;
    }
    setError("");

    const data = PLANT_DATA[plant];
    // Convert inches to feet for calculation
    const rowSpacingFt = data.rowSpacing / 12;
    const plantSpacingFt = data.plantSpacing / 12;

    // Assume square garden for simplicity
    const side = Math.sqrt(areaNum);
    const rows = Math.max(1, Math.floor(side / rowSpacingFt));
    const plantsPerRow = Math.max(1, Math.floor(side / plantSpacingFt));
    const totalPlants = rows * plantsPerRow;
    const recommendedSeeds = Math.ceil(totalPlants * 1.15); // 15% buffer

    setResult({
      rowSpacing: data.rowSpacing,
      plantSpacing: data.plantSpacing,
      rows,
      plantsPerRow,
      totalPlants,
      recommendedSeeds,
    });
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plant / Vegetable
          </label>
          <select
            value={plant}
            onChange={(e) => { setPlant(e.target.value); setResult(null); }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-700 transition-colors"
          >
            {Object.entries(PLANT_DATA).map(([key, val]) => (
              <option key={key} value={key}>{val.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Garden Area (sq ft)
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="1"
            value={area}
            onChange={(e) => { setArea(e.target.value); setResult(null); }}
            placeholder="e.g. 100"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors ${
              error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-green-700"
            }`}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>

        <button
          onClick={calculate}
          className="w-full bg-green-800 hover:bg-green-900 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
        >
          Calculate
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 space-y-4 animate-fade-in">
          <h3 className="font-semibold text-green-900 text-sm uppercase tracking-wide">
            Results for {PLANT_DATA[plant].name}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-800">{result.rowSpacing}"</p>
              <p className="text-xs text-gray-500 mt-0.5">Row Spacing</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-800">{result.plantSpacing}"</p>
              <p className="text-xs text-gray-500 mt-0.5">Plant Spacing</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-800">{result.rows}</p>
              <p className="text-xs text-gray-500 mt-0.5">Rows</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-800">{result.plantsPerRow}</p>
              <p className="text-xs text-gray-500 mt-0.5">Plants per Row</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Plants</span>
              <span className="text-lg font-bold text-green-800">{result.totalPlants}</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
              <span className="text-sm text-gray-600">Recommended Seeds <span className="text-xs text-gray-400">(+15% buffer)</span></span>
              <span className="text-lg font-bold text-orange-600">{result.recommendedSeeds}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Spacing based on standard USDA extension guidelines. Assumes square garden layout.
          </p>
        </div>
      )}
    </div>
  );
}
