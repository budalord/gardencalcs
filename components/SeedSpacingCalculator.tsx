"use client";

import { useState } from "react";

const PLANT_DATA: Record<string, { rowSpacing: number; plantSpacing: number; name: string }> = {
  tomato:       { name: "Tomato",               rowSpacing: 36, plantSpacing: 24 },
  pepper:       { name: "Pepper (Bell)",        rowSpacing: 24, plantSpacing: 18 },
  cucumber:     { name: "Cucumber",             rowSpacing: 36, plantSpacing: 12 },
  zucchini:     { name: "Zucchini / Courgette", rowSpacing: 48, plantSpacing: 36 },
  bean:         { name: "Bean (Bush)",          rowSpacing: 18, plantSpacing: 6  },
  pea:          { name: "Pea",                  rowSpacing: 24, plantSpacing: 2  },
  broccoli:     { name: "Broccoli",             rowSpacing: 24, plantSpacing: 18 },
  cabbage:      { name: "Cabbage",              rowSpacing: 24, plantSpacing: 18 },
  cauliflower:  { name: "Cauliflower",          rowSpacing: 30, plantSpacing: 18 },
  kale:         { name: "Kale",                 rowSpacing: 18, plantSpacing: 12 },
  "swiss-chard":{ name: "Swiss Chard",          rowSpacing: 18, plantSpacing: 12 },
  lettuce:      { name: "Lettuce",              rowSpacing: 12, plantSpacing: 8  },
  spinach:      { name: "Spinach",              rowSpacing: 12, plantSpacing: 6  },
  onion:        { name: "Onion",                rowSpacing: 12, plantSpacing: 4  },
  garlic:       { name: "Garlic",               rowSpacing: 12, plantSpacing: 6  },
  beet:         { name: "Beet / Beetroot",      rowSpacing: 12, plantSpacing: 4  },
  carrot:       { name: "Carrot",               rowSpacing: 12, plantSpacing: 3  },
  radish:       { name: "Radish",               rowSpacing: 6,  plantSpacing: 2  },
};

interface Result {
  rowSpacing: number;
  plantSpacing: number;
  rows: number;
  plantsPerRow: number;
  totalPlants: number;
  recommendedSeeds: number;
}

const fieldLabel = "block font-sans text-[11px] uppercase tracking-[0.08em] text-soil mb-1.5";
const fieldBase =
  "w-full bg-cream border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md px-3 py-2.5 text-ink outline-none focus:border-moss transition-colors duration-fast";

export default function SeedSpacingCalculator() {
  const [plant, setPlant] = useState("tomato");
  const [area, setArea] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    const areaNum = parseFloat(area);
    if (!area || isNaN(areaNum) || areaNum <= 0) {
      setError("Enter a garden area greater than 0.");
      setResult(null);
      return;
    }
    setError("");

    const data = PLANT_DATA[plant];
    const rowSpacingFt = data.rowSpacing / 12;
    const plantSpacingFt = data.plantSpacing / 12;
    const side = Math.sqrt(areaNum);
    const rows = Math.max(1, Math.floor(side / rowSpacingFt));
    const plantsPerRow = Math.max(1, Math.floor(side / plantSpacingFt));
    const totalPlants = rows * plantsPerRow;
    const recommendedSeeds = Math.ceil(totalPlants * 1.15);

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
    <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] rounded-lg p-6 md:p-7 max-w-[720px] mx-auto">
      <h2 className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-1">
        How many seeds, how far apart?
      </h2>
      <p className="font-serif italic text-[14px] text-soil mb-6">
        Pick a crop, give us your bed area, and we&apos;ll return a row-and-plant layout with a 15% germination buffer.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className={fieldLabel}>Crop</label>
          <select
            value={plant}
            onChange={(e) => { setPlant(e.target.value); setResult(null); }}
            className={`${fieldBase} font-sans text-[15px]`}
          >
            {Object.entries(PLANT_DATA).map(([key, val]) => (
              <option key={key} value={key}>{val.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={fieldLabel}>Garden area (sq ft)</label>
          <input
            type="number" inputMode="decimal" min="1"
            value={area}
            onChange={(e) => { setArea(e.target.value); setResult(null); }}
            placeholder="e.g. 100"
            className={`${fieldBase} font-mono tabular text-[17px] font-medium`}
            aria-invalid={!!error}
          />
          {error && <p className="mt-1 font-mono text-[11px] text-terracotta">{error}</p>}
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-moss-deep hover:bg-moss text-cream font-sans text-sm font-medium py-3 rounded-md transition-colors duration-fast"
      >
        Plan the bed
      </button>

      {result && (
        <div className="mt-6 bg-cream border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md px-6 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-1">
            Layout · {PLANT_DATA[plant].name}
          </p>
          <p className="font-serif font-semibold text-[34px] leading-[1] text-moss-deep tabular">
            {result.totalPlants}
            <span className="font-sans font-medium text-[14px] text-soil ml-1.5">plants fit</span>
          </p>
          <p className="font-serif text-[14px] text-soil mt-1.5">
            {result.rows} rows × {result.plantsPerRow} plants per row, spaced {result.rowSpacing}″ between rows and {result.plantSpacing}″ in-row.
          </p>

          <dl className="mt-4 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_30%,transparent)] grid grid-cols-2 gap-x-5 gap-y-2 font-sans text-[14px]">
            <dt className="text-soil">Row spacing</dt>
            <dd className="m-0 tabular text-ink">{result.rowSpacing}″</dd>
            <dt className="text-soil">Plant spacing</dt>
            <dd className="m-0 tabular text-ink">{result.plantSpacing}″</dd>
            <dt className="text-soil">Rows</dt>
            <dd className="m-0 tabular text-ink">{result.rows}</dd>
            <dt className="text-soil">Plants per row</dt>
            <dd className="m-0 tabular text-ink">{result.plantsPerRow}</dd>
            <dt className="text-soil">Recommended seeds</dt>
            <dd className="m-0 tabular text-terracotta font-medium">
              {result.recommendedSeeds} <span className="text-soil font-normal">(+15% buffer)</span>
            </dd>
          </dl>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-soil">
            Rates · USDA extension spacing guidelines · assumes square plot
          </p>
        </div>
      )}
    </section>
  );
}
