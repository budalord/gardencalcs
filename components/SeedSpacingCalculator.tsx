"use client";

import { useState } from "react";
import { seedSpacingCropMap, seedSpacingCrops } from "@/config/seedSpacingCrops";

interface Result {
  rowSpacing: number;
  plantSpacing: number;
  rows: number;
  plantsPerRow: number;
  totalPlants: number;
  recommendedSeeds: number;
  bedLengthFt: number;
  bedWidthFt: number;
  isRectangular: boolean; // false when only area given (square fallback)
}

const fieldLabel = "block font-sans text-[11px] uppercase tracking-[0.08em] text-soil mb-1.5";
const fieldBase =
  "w-full bg-cream border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md px-3 py-2.5 text-ink outline-none focus:border-moss transition-colors duration-fast";

type Mode = "rect" | "area";

export default function SeedSpacingCalculator() {
  const [plant, setPlant] = useState("tomato");
  const [mode, setMode] = useState<Mode>("rect");
  const [length, setLength] = useState("8");
  const [width, setWidth] = useState("4");
  const [area, setArea] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function calculate() {
    const data = seedSpacingCropMap[plant];
    const rowSpacingFt = data.rowSpacingInches / 12;
    const plantSpacingFt = data.plantSpacingInches / 12;

    let bedLengthFt = 0;
    let bedWidthFt = 0;
    let isRectangular = false;
    const nextErrors: Record<string, string> = {};

    if (mode === "rect") {
      const l = parseFloat(length);
      const w = parseFloat(width);
      if (!length || !Number.isFinite(l) || l <= 0) nextErrors.length = "Enter a bed length greater than 0.";
      if (!width || !Number.isFinite(w) || w <= 0) nextErrors.width = "Enter a bed width greater than 0.";
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        setResult(null);
        return;
      }
      bedLengthFt = l;
      bedWidthFt = w;
      isRectangular = true;
    } else {
      const areaNum = parseFloat(area);
      if (!area || !Number.isFinite(areaNum) || areaNum <= 0) {
        setErrors({ area: "Enter a garden area greater than 0." });
        setResult(null);
        return;
      }
      // Square fallback only when bed dimensions are unknown.
      const side = Math.sqrt(areaNum);
      bedLengthFt = side;
      bedWidthFt = side;
      isRectangular = false;
    }
    setErrors({});

    // Lay rows along the long side; place plants along that direction so
    // the longer dimension hosts more plants than rows. Use floor without
    // a "+1" since real layouts leave half-spacing edge buffers, which keeps
    // the mature canopy from spilling into walkways or neighboring beds.
    const longSide = Math.max(bedLengthFt, bedWidthFt);
    const shortSide = Math.min(bedLengthFt, bedWidthFt);
    const rows = Math.floor(shortSide / rowSpacingFt);
    const plantsPerRow = Math.floor(longSide / plantSpacingFt);
    if (rows < 1 || plantsPerRow < 1) {
      setErrors({
        bed: `This bed is too small for one ${data.name.toLowerCase()} station using ${data.rowSpacingInches} in row spacing and ${data.plantSpacingInches} in plant spacing.`,
      });
      setResult(null);
      return;
    }
    const totalPlants = rows * plantsPerRow;
    const recommendedSeeds = Math.ceil(totalPlants * 1.15);

    setResult({
      rowSpacing: data.rowSpacingInches,
      plantSpacing: data.plantSpacingInches,
      rows,
      plantsPerRow,
      totalPlants,
      recommendedSeeds,
      bedLengthFt,
      bedWidthFt,
      isRectangular,
    });
  }

  return (
    <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] rounded-lg p-6 md:p-7 max-w-[720px] mx-auto">
      <h2 className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-1">
        How many seeds, how far apart?
      </h2>
      <p className="font-serif italic text-[14px] text-soil mb-6">
        Pick from 20 extension-cited crops, enter your bed size, and get a row-and-plant layout with a 15% germination buffer.
      </p>

      <div className="mb-5">
        <label htmlFor="seed-spacing-crop" className={fieldLabel}>Crop</label>
        <select
          id="seed-spacing-crop"
          value={plant}
          onChange={(e) => { setPlant(e.target.value); setResult(null); setErrors({}); }}
          className={`${fieldBase} font-sans text-[15px]`}
        >
          {seedSpacingCrops.map((crop) => (
            <option key={crop.slug} value={crop.slug}>{crop.name}</option>
          ))}
        </select>
      </div>

      {/* Mode toggle: rectangular bed (preferred) vs total area fallback */}
      <div className="mb-3">
        <div className="flex items-end justify-between">
          <span className={fieldLabel.replace(" mb-1.5", "")}>Bed shape</span>
          <div className="inline-flex border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md overflow-hidden text-[12px] font-mono">
            {(["rect", "area"] as const).map(m => (
              <button
                key={m}
                type="button"
                aria-label={m === "rect" ? "Use rectangular bed length and width" : "Use total area with a square-bed assumption"}
                onClick={() => { setMode(m); setResult(null); setErrors({}); }}
                aria-pressed={mode === m}
                className={`whitespace-nowrap px-3 py-1 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-inset ${
                  mode === m ? "bg-moss-deep text-cream" : "bg-cream text-soil hover:text-ink"
                }`}
              >
                {m === "rect" ? "Rectangle" : "Area only"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {mode === "rect" ? (
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label htmlFor="seed-spacing-length" className={fieldLabel}>Length (ft)</label>
            <input
              id="seed-spacing-length"
              type="number" inputMode="decimal" min="0.5" step="0.5"
              value={length}
              onChange={(e) => { setLength(e.target.value); setResult(null); setErrors((current) => ({ ...current, length: "", bed: "" })); }}
              placeholder="e.g. 8"
              className={`${fieldBase} font-mono tabular text-[17px] font-medium`}
              aria-invalid={Boolean(errors.length)}
              aria-describedby={errors.length ? "seed-spacing-length-error" : undefined}
            />
            {errors.length && <p id="seed-spacing-length-error" role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{errors.length}</p>}
          </div>
          <div>
            <label htmlFor="seed-spacing-width" className={fieldLabel}>Width (ft)</label>
            <input
              id="seed-spacing-width"
              type="number" inputMode="decimal" min="0.5" step="0.5"
              value={width}
              onChange={(e) => { setWidth(e.target.value); setResult(null); setErrors((current) => ({ ...current, width: "", bed: "" })); }}
              placeholder="e.g. 4"
              className={`${fieldBase} font-mono tabular text-[17px] font-medium`}
              aria-invalid={Boolean(errors.width)}
              aria-describedby={errors.width ? "seed-spacing-width-error" : undefined}
            />
            {errors.width && <p id="seed-spacing-width-error" role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{errors.width}</p>}
          </div>
        </div>
      ) : (
        <div className="mb-5">
          <label htmlFor="seed-spacing-area" className={fieldLabel}>Garden area (sq ft) — assumes square bed</label>
          <input
            id="seed-spacing-area"
            type="number" inputMode="decimal" min="1"
            value={area}
            onChange={(e) => { setArea(e.target.value); setResult(null); setErrors((current) => ({ ...current, area: "", bed: "" })); }}
            placeholder="e.g. 100"
            className={`${fieldBase} font-mono tabular text-[17px] font-medium`}
            aria-invalid={Boolean(errors.area)}
            aria-describedby={errors.area ? "seed-spacing-area-error" : undefined}
          />
          {errors.area && <p id="seed-spacing-area-error" role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{errors.area}</p>}
        </div>
      )}
      {errors.bed && <p role="alert" className="-mt-2 mb-4 font-mono text-[11px] leading-[1.5] text-terracotta">{errors.bed}</p>}

      <button
        type="button"
        onClick={calculate}
        className="w-full bg-moss-deep hover:bg-moss text-cream font-sans text-sm font-medium py-3 rounded-md transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        Plan the bed
      </button>

      {result && (
        <div aria-live="polite" className="mt-6 bg-cream border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md px-6 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-1">
            Layout · {seedSpacingCropMap[plant].name}
          </p>
          <p className="font-serif font-semibold text-[34px] leading-[1] text-moss-deep tabular">
            {result.totalPlants}
            <span className="font-sans font-medium text-[14px] text-soil ml-1.5">plants fit</span>
          </p>
          <p className="font-serif text-[14px] text-soil mt-1.5">
            {result.rows} row{result.rows === 1 ? "" : "s"} × {result.plantsPerRow} plants per row, spaced {result.rowSpacing}″ between rows and {result.plantSpacing}″ in-row.
            {result.isRectangular
              ? ` Layout fits a ${result.bedLengthFt} ft × ${result.bedWidthFt} ft bed.`
              : ` (Square layout assumed; for a true rectangular bed, switch to Length × Width.)`}
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
            Extension-cited crop spacing · rows run along the longest bed side
          </p>
        </div>
      )}
    </section>
  );
}
