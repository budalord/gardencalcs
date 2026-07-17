"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import type { FormEvent } from "react";

interface Material {
  id: string;
  name: string;
  type: "green" | "brown";
  rawManure?: boolean;
}

// The pile screen only needs the material's broad brown/green role. Published
// C:N values vary by feedstock and do not participate in this equal-volume
// calculation, so they live in the cited reference table below the widget.
const MATERIALS: Material[] = [
  { id: "grass", name: "Grass Clippings", type: "green" },
  { id: "food", name: "Food Scraps", type: "green" },
  { id: "coffee", name: "Coffee Grounds", type: "green" },
  { id: "gleaves", name: "Green Leaves", type: "green" },
  { id: "veg", name: "Vegetable Scraps", type: "green" },
  { id: "poultry", name: "Poultry Manure (raw)", type: "green", rawManure: true },
  { id: "cow", name: "Cow Manure (raw)", type: "green", rawManure: true },
  { id: "horse", name: "Horse Manure (raw)", type: "green", rawManure: true },
  { id: "sheep", name: "Sheep Manure (raw)", type: "green", rawManure: true },
  { id: "dleaves", name: "Dry Leaves", type: "brown" },
  { id: "corn", name: "Corn Stalks", type: "brown" },
  { id: "straw", name: "Straw", type: "brown" },
  { id: "newspaper", name: "Newspaper", type: "brown" },
  { id: "woodchips", name: "Wood Chips", type: "brown" },
  { id: "sawdust", name: "Sawdust", type: "brown" },
  { id: "cardboard", name: "Cardboard", type: "brown" },
];

interface Entry {
  materialId: string;
  parts: string;
}

interface FinishedResult {
  cubicFeet: number;
  cubicYards: number;
  cubicMeters: number;
  exactBags: number;
  bagCount: number;
}

interface PileResult {
  volumeCuFt: number;
  volumeCuM: number;
  brownParts: number;
  greenParts: number;
  brownToGreen: number | null;
  status: "ideal" | "too-high" | "too-low";
  suggestion: string;
  hasRawManure: boolean;
}

const CUBIC_FEET_PER_CUBIC_METER = 35.3146667;
const MIX_TARGET = 3;
const MIX_LOW = 2;
const MIX_HIGH = 4;

const fieldLabel = "block font-sans text-[11px] uppercase tracking-[0.08em] text-soil mb-1.5";
const fieldBase =
  "w-full bg-cream border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md px-3 py-2.5 text-ink outline-none transition-colors duration-fast focus:border-moss focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--moss)_45%,transparent)]";
const buttonFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

function formatNumber(value: number, maximumFractionDigits = 2) {
  const threshold = 10 ** -maximumFractionDigits;
  if (value > 0 && value < threshold) return `<${threshold.toFixed(maximumFractionDigits)}`;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: value > 0 && value < 0.01 ? maximumFractionDigits : 0,
  }).format(value);
}

export default function CompostCalculator() {
  const [measurementSystem, setMeasurementSystem] = useState<"imperial" | "metric">("imperial");
  const [area, setArea] = useState("");
  const [depth, setDepth] = useState("");
  const [bagSize, setBagSize] = useState("1.5");
  const [finishedResult, setFinishedResult] = useState<FinishedResult | null>(null);
  const [finishedErrors, setFinishedErrors] = useState<Record<string, string>>({});

  const [dimUnit, setDimUnit] = useState<"ft" | "m">("ft");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [entries, setEntries] = useState<Entry[]>([{ materialId: "grass", parts: "" }]);
  const [pileResult, setPileResult] = useState<PileResult | null>(null);
  const [pileErrors, setPileErrors] = useState<Record<string, string>>({});

  function changeMeasurementSystem(next: "imperial" | "metric") {
    if (next === measurementSystem) return;
    setMeasurementSystem(next);
    setArea("");
    setDepth("");
    setBagSize(next === "imperial" ? "1.5" : "40");
    setFinishedErrors({});
    setFinishedResult(null);
  }

  function calculateFinished(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors: Record<string, string> = {};
    const parsedArea = Number.parseFloat(area);
    const parsedDepth = Number.parseFloat(depth);
    const parsedBagSize = Number.parseFloat(bagSize);

    if (!Number.isFinite(parsedArea) || parsedArea <= 0) errors.area = "Enter an area greater than 0.";
    if (!Number.isFinite(parsedDepth) || parsedDepth <= 0) errors.depth = "Enter a depth greater than 0.";
    if (!Number.isFinite(parsedBagSize) || parsedBagSize <= 0) errors.bagSize = "Enter a bag size greater than 0.";

    setFinishedErrors(errors);
    if (Object.keys(errors).length > 0) {
      setFinishedResult(null);
      return;
    }

    const cubicFeet = measurementSystem === "imperial"
      ? parsedArea * (parsedDepth / 12)
      : parsedArea * (parsedDepth / 100) * CUBIC_FEET_PER_CUBIC_METER;
    const bagVolumeCubicFeet = measurementSystem === "imperial"
      ? parsedBagSize
      : (parsedBagSize / 1000) * CUBIC_FEET_PER_CUBIC_METER;
    const exactBags = cubicFeet / bagVolumeCubicFeet;

    setFinishedResult({
      cubicFeet,
      cubicYards: cubicFeet / 27,
      cubicMeters: cubicFeet / CUBIC_FEET_PER_CUBIC_METER,
      exactBags,
      bagCount: Math.ceil(exactBags),
    });
  }

  function clearFinishedResult() {
    setFinishedResult(null);
  }

  function clearFinishedError(field: string) {
    setFinishedErrors((current) => ({ ...current, [field]: "" }));
  }

  function changeDimUnit(next: "ft" | "m") {
    if (next === dimUnit) return;
    const factor = next === "m" ? 0.3048 : 3.280839895;
    const convert = (value: string) => {
      const parsed = Number.parseFloat(value);
      if (!Number.isFinite(parsed)) return value;
      return String(Number((parsed * factor).toFixed(3)));
    };
    setLength(convert(length));
    setWidth(convert(width));
    setHeight(convert(height));
    setDimUnit(next);
    setPileErrors({});
    setPileResult(null);
  }

  function addEntry() {
    setEntries([...entries, { materialId: "dleaves", parts: "" }]);
    setPileErrors({});
    setPileResult(null);
  }

  function removeEntry(index: number) {
    setEntries(entries.filter((_, entryIndex) => entryIndex !== index));
    setPileErrors({});
    setPileResult(null);
  }

  function updateEntry(index: number, field: keyof Entry, value: string) {
    const next = [...entries];
    next[index] = { ...next[index], [field]: value };
    setEntries(next);
    setPileErrors({});
    setPileResult(null);
  }

  function calculatePile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors: Record<string, string> = {};
    const parsedLength = Number.parseFloat(length);
    const parsedWidth = Number.parseFloat(width);
    const parsedHeight = Number.parseFloat(height);

    if (!Number.isFinite(parsedLength) || parsedLength <= 0) errors.length = "Enter a value greater than 0.";
    if (!Number.isFinite(parsedWidth) || parsedWidth <= 0) errors.width = "Enter a value greater than 0.";
    if (!Number.isFinite(parsedHeight) || parsedHeight <= 0) errors.height = "Enter a value greater than 0.";

    entries.forEach((entry, index) => {
      const parsedParts = Number.parseFloat(entry.parts);
      if (!Number.isFinite(parsedParts) || parsedParts <= 0) {
        errors[`entry-${index}`] = "Enter volume parts greater than 0.";
      }
    });
    if (entries.length === 0) errors.materials = "Add at least one compost material.";

    setPileErrors(errors);
    if (Object.keys(errors).length > 0) {
      setPileResult(null);
      return;
    }

    let volumeCuFt = parsedLength * parsedWidth * parsedHeight;
    if (dimUnit === "m") volumeCuFt *= CUBIC_FEET_PER_CUBIC_METER;

    let brownParts = 0;
    let greenParts = 0;
    let hasRawManure = false;

    for (const entry of entries) {
      const material = MATERIALS.find((item) => item.id === entry.materialId);
      if (!material) continue;
      const parts = Number.parseFloat(entry.parts);
      if (material.type === "brown") brownParts += parts;
      else greenParts += parts;
      if (material.rawManure) hasRawManure = true;
    }

    const brownToGreen = greenParts > 0 ? brownParts / greenParts : null;
    let status: PileResult["status"];
    let suggestion: string;

    if (brownParts === 0) {
      status = "too-low";
      suggestion = `This list contains only greens. Add about ${formatNumber(greenParts * MIX_TARGET, 1)} equal-volume parts of dry browns as a starting point, then check moisture and aeration.`;
    } else if (greenParts === 0) {
      status = "too-high";
      suggestion = `This list contains only browns. Add about ${formatNumber(brownParts / MIX_TARGET, 1)} equal-volume parts of greens as a starting point, then check moisture and aeration.`;
    } else if ((brownToGreen ?? 0) < MIX_LOW) {
      status = "too-low";
      const addParts = Math.max(0, greenParts * MIX_TARGET - brownParts);
      suggestion = `Green-heavy starting mix. Add about ${formatNumber(addParts, 1)} equal-volume parts of dry browns to move toward the common 3:1 rule of thumb.`;
    } else if ((brownToGreen ?? 0) > MIX_HIGH) {
      status = "too-high";
      const addParts = Math.max(0, brownParts / MIX_TARGET - greenParts);
      suggestion = `Brown-heavy starting mix. Add about ${formatNumber(addParts, 1)} equal-volume parts of greens to move toward the common 3:1 rule of thumb.`;
    } else {
      status = "ideal";
      suggestion = "The entered mix falls inside a broad 2:1–4:1 brown-to-green starting band. Treat that as a field rule, then adjust for moisture, odor, temperature, and the actual materials.";
    }

    setPileResult({
      volumeCuFt,
      volumeCuM: volumeCuFt / CUBIC_FEET_PER_CUBIC_METER,
      brownParts,
      greenParts,
      brownToGreen,
      status,
      suggestion,
      hasRawManure,
    });
  }

  const isIdeal = pileResult?.status === "ideal";
  const accentBorder = isIdeal ? "border-l-moss" : "border-l-terracotta";
  const accentRing = isIdeal
    ? "border-[color-mix(in_oklch,var(--moss)_35%,transparent)]"
    : "border-[color-mix(in_oklch,var(--terracotta)_35%,transparent)]";
  const cnColor = isIdeal ? "text-moss-deep" : "text-terracotta";

  return (
    <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_30%,transparent)] rounded-lg p-4 sm:p-6 md:p-7 max-w-[720px] mx-auto">
      <Tabs.Root defaultValue="quantity">
        <Tabs.List
          aria-label="Choose a compost calculation"
          className="grid grid-cols-2 gap-1 rounded-md border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] bg-cream p-1"
        >
          <Tabs.Trigger
            value="quantity"
            aria-label="How much finished compost do I need?"
            className={`min-h-11 whitespace-nowrap rounded px-2 py-2 font-sans text-[12px] sm:text-[13px] font-medium leading-tight text-soil transition-colors duration-fast hover:text-ink data-[state=active]:bg-moss-deep data-[state=active]:text-cream ${buttonFocus}`}
          >
            Finished amount
          </Tabs.Trigger>
          <Tabs.Trigger
            value="balance"
            aria-label="Balance a compost pile"
            className={`min-h-11 whitespace-nowrap rounded px-2 py-2 font-sans text-[12px] sm:text-[13px] font-medium leading-tight text-soil transition-colors duration-fast hover:text-ink data-[state=active]:bg-moss-deep data-[state=active]:text-cream ${buttonFocus}`}
          >
            Pile mix
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="quantity" className="pt-6 focus-visible:outline-none">
          <h2 className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-1">
            How much finished compost do I need?
          </h2>
          <p className="font-serif italic text-[14px] leading-[1.55] text-soil mb-6">
            Enter the surface area, your chosen layer depth, and the capacity printed on one bag.
          </p>

          <form onSubmit={calculateFinished} noValidate>
            <fieldset className="mb-5">
              <legend className={fieldLabel}>Measurement system</legend>
              <div className="grid grid-cols-2 gap-2">
                {(["imperial", "metric"] as const).map((system) => (
                  <button
                    key={system}
                    type="button"
                    aria-label={system === "imperial" ? "Use imperial units, square feet and inches" : "Use metric units, square meters and centimeters"}
                    aria-pressed={measurementSystem === system}
                    onClick={() => changeMeasurementSystem(system)}
                    className={`min-h-10 whitespace-nowrap rounded-md border px-2 sm:px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors duration-fast ${buttonFocus} ${
                      measurementSystem === system
                        ? "border-moss-deep bg-moss-deep text-cream"
                        : "border-[color-mix(in_oklch,var(--soil)_35%,transparent)] bg-cream text-soil hover:text-ink"
                    }`}
                  >
                    {system === "imperial" ? "US · ft / in" : "Metric · m / cm"}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label htmlFor="compost-area" className={fieldLabel}>
                  Area ({measurementSystem === "imperial" ? "sq ft" : "m²"})
                </label>
                <input
                  id="compost-area"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={area}
                  onChange={(event) => { setArea(event.target.value); clearFinishedError("area"); clearFinishedResult(); }}
                  placeholder={measurementSystem === "imperial" ? "e.g. 32" : "e.g. 3"}
                  aria-describedby={`compost-area-help${finishedErrors.area ? " compost-area-error" : ""}`}
                  aria-invalid={Boolean(finishedErrors.area)}
                  className={`${fieldBase} font-mono tabular text-[15px]`}
                />
                <p id="compost-area-help" className="mt-1.5 font-serif text-[12px] leading-[1.45] text-soil">
                  {measurementSystem === "imperial" ? "A 4 × 8 ft bed has 32 sq ft of area." : "Use the total surface area in square meters."}
                </p>
                {finishedErrors.area && <p id="compost-area-error" role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{finishedErrors.area}</p>}
              </div>

              <div>
                <label htmlFor="compost-depth" className={fieldLabel}>
                  Layer depth ({measurementSystem === "imperial" ? "in" : "cm"})
                </label>
                <input
                  id="compost-depth"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={depth}
                  onChange={(event) => { setDepth(event.target.value); clearFinishedError("depth"); clearFinishedResult(); }}
                  placeholder={measurementSystem === "imperial" ? "e.g. 1" : "e.g. 2.5"}
                  aria-describedby={`compost-depth-help${finishedErrors.depth ? " compost-depth-error" : ""}`}
                  aria-invalid={Boolean(finishedErrors.depth)}
                  className={`${fieldBase} font-mono tabular text-[15px]`}
                />
                <p id="compost-depth-help" className="mt-1.5 font-serif text-[12px] leading-[1.45] text-soil">
                  Use the depth you have already chosen for your project.
                </p>
                {finishedErrors.depth && <p id="compost-depth-error" role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{finishedErrors.depth}</p>}
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="compost-bag-size" className={fieldLabel}>
                Bag size ({measurementSystem === "imperial" ? "cu ft" : "liters"})
              </label>
              <input
                id="compost-bag-size"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={bagSize}
                onChange={(event) => { setBagSize(event.target.value); clearFinishedError("bagSize"); clearFinishedResult(); }}
                aria-describedby={`compost-bag-help${finishedErrors.bagSize ? " compost-bag-error" : ""}`}
                aria-invalid={Boolean(finishedErrors.bagSize)}
                className={`${fieldBase} max-w-full sm:max-w-[240px] font-mono tabular text-[15px]`}
              />
              <p id="compost-bag-help" className="mt-1.5 font-serif text-[12px] leading-[1.45] text-soil">
                Enter the volume printed on the bag; the result always rounds up to a whole bag.
              </p>
              {finishedErrors.bagSize && <p id="compost-bag-error" role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{finishedErrors.bagSize}</p>}
            </div>

            <button
              type="submit"
              className={`w-full min-h-11 bg-moss-deep hover:bg-moss active:translate-y-px text-cream font-sans text-sm font-medium py-3 rounded-md transition duration-fast ${buttonFocus}`}
            >
              Calculate compost amount
            </button>
          </form>

          {finishedResult && (
            <div
              aria-live="polite"
              className="mt-6 bg-cream border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md px-4 sm:px-6 py-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-1">Whole bags to buy</p>
              <p className="font-serif font-semibold text-[38px] leading-none tabular text-moss-deep">
                {finishedResult.bagCount}
                <span className="font-sans font-medium text-[14px] text-soil ml-1.5">{finishedResult.bagCount === 1 ? "bag" : "bags"}</span>
              </p>
              <p className="font-serif text-[13px] leading-[1.55] text-soil mt-2">
                Rounded up from {formatNumber(finishedResult.exactBags, 2)} bags so the plan does not come up short.
              </p>

              <dl className="mt-4 pt-4 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_30%,transparent)] grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-[14px]">
                <div>
                  <dt className="text-soil">Cubic feet</dt>
                  <dd className="m-0 tabular font-medium text-ink">{formatNumber(finishedResult.cubicFeet, 2)} ft³</dd>
                </div>
                <div>
                  <dt className="text-soil">Cubic yards</dt>
                  <dd className="m-0 tabular font-medium text-ink">{formatNumber(finishedResult.cubicYards, 3)} yd³</dd>
                </div>
                <div>
                  <dt className="text-soil">Cubic meters</dt>
                  <dd className="m-0 tabular font-medium text-ink">{formatNumber(finishedResult.cubicMeters, 3)} m³</dd>
                </div>
              </dl>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] leading-[1.5] text-soil">
                Geometry only · area × depth · choose application depth for your own project
              </p>
            </div>
          )}
        </Tabs.Content>

        <Tabs.Content value="balance" className="pt-6 focus-visible:outline-none">
          <h2 className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-1">
            Plan a browns-and-greens starting mix
          </h2>
          <p className="font-serif italic text-[14px] leading-[1.55] text-soil mb-6">
            Use one consistent scoop or bucket as a volume part. This screens the ingredient mix without pretending wet weights can produce a lab-grade C:N result.
          </p>

          <form onSubmit={calculatePile} noValidate>
            <fieldset className="mb-5">
              <legend className="sr-only">Bin dimensions</legend>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-2">
                <span aria-hidden="true" className={fieldLabel.replace(" mb-1.5", "")}>Bin dimensions</span>
                <div className="inline-flex self-start border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md overflow-hidden text-[12px] font-mono">
                  {(["ft", "m"] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      aria-pressed={dimUnit === unit}
                      onClick={() => changeDimUnit(unit)}
                      className={`min-h-9 px-4 py-1 transition-colors duration-fast ${buttonFocus} ${
                        dimUnit === unit ? "bg-moss-deep text-cream" : "bg-cream text-soil hover:text-ink"
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {([
                  ["length", "Length", length, setLength],
                  ["width", "Width", width, setWidth],
                  ["height", "Height", height, setHeight],
                ] as const).map(([id, label, value, setter]) => (
                  <div key={id}>
                    <label htmlFor={`pile-${id}`} className={fieldLabel}>{label} ({dimUnit})</label>
                    <input
                      id={`pile-${id}`}
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      value={value}
                      onChange={(event) => { setter(event.target.value); setPileErrors((current) => ({ ...current, [id]: "" })); setPileResult(null); }}
                      placeholder="e.g. 3"
                      aria-describedby={pileErrors[id] ? `pile-${id}-error` : undefined}
                      aria-invalid={Boolean(pileErrors[id])}
                      className={`${fieldBase} font-mono tabular text-[15px]`}
                    />
                    {pileErrors[id] && <p id={`pile-${id}-error`} role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{pileErrors[id]}</p>}
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-5">
              <legend className={fieldLabel}>Materials</legend>
              <div className="space-y-3">
                {entries.map((entry, index) => (
                  <div key={index} className="grid grid-cols-[minmax(0,1fr)_88px_auto] sm:grid-cols-[minmax(0,1fr)_120px_auto] gap-2 items-end">
                    <div className="min-w-0">
                      <label htmlFor={`pile-material-${index}`} className="sr-only">Material {index + 1}</label>
                      <select
                        id={`pile-material-${index}`}
                        value={entry.materialId}
                        onChange={(event) => updateEntry(index, "materialId", event.target.value)}
                        className={`${fieldBase} min-w-0 font-sans text-[13px] sm:text-[14px]`}
                      >
                        <optgroup label="Greens (N-rich)">
                          {MATERIALS.filter((material) => material.type === "green").map((material) => (
                            <option key={material.id} value={material.id}>{material.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Browns (C-rich)">
                          {MATERIALS.filter((material) => material.type === "brown").map((material) => (
                            <option key={material.id} value={material.id}>{material.name}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`pile-parts-${index}`} className="sr-only">Equal-volume parts for material {index + 1}</label>
                      <div className="flex items-center gap-1">
                        <input
                          id={`pile-parts-${index}`}
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="any"
                          value={entry.parts}
                          placeholder="Parts"
                          onChange={(event) => updateEntry(index, "parts", event.target.value)}
                          aria-invalid={Boolean(pileErrors[`entry-${index}`])}
                          aria-describedby={pileErrors[`entry-${index}`] ? `pile-entry-${index}-error` : undefined}
                          className={`${fieldBase} min-w-0 font-mono tabular text-[13px] sm:text-[14px]`}
                        />
                        <span aria-hidden="true" className="font-mono text-[10px] uppercase text-soil">part</span>
                      </div>
                      {pileErrors[`entry-${index}`] && <p id={`pile-entry-${index}-error`} role="alert" className="mt-1 font-mono text-[10px] text-terracotta">{pileErrors[`entry-${index}`]}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeEntry(index)}
                      aria-label={`Remove material ${index + 1}`}
                      disabled={entries.length === 1}
                      className={`min-h-10 min-w-8 px-1 font-mono text-[20px] leading-none text-soil transition-colors duration-fast hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-30 ${buttonFocus}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {pileErrors.materials && <p role="alert" className="mt-2 font-mono text-[11px] text-terracotta">{pileErrors.materials}</p>}
              <button
                type="button"
                onClick={addEntry}
                className={`mt-3 min-h-9 font-mono text-[11px] uppercase tracking-[0.12em] text-moss-deep transition-colors duration-fast hover:text-moss ${buttonFocus}`}
              >
                + Add material
              </button>
            </fieldset>

            <button
              type="submit"
              className={`w-full min-h-11 bg-moss-deep hover:bg-moss active:translate-y-px text-cream font-sans text-sm font-medium py-3 rounded-md transition duration-fast ${buttonFocus}`}
            >
              Check the starting mix
            </button>
          </form>

          {pileResult && (
            <div aria-live="polite" className={`mt-6 bg-cream border ${accentRing} border-l-[4px] ${accentBorder} rounded-md px-4 sm:px-6 py-5`}>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-1">
                Field screen · {isIdeal ? "Starting band" : pileResult.status === "too-low" ? "Green-heavy" : "Brown-heavy"}
              </p>
              <p className={`font-serif font-semibold text-[34px] leading-none tabular ${cnColor}`}>
                {pileResult.brownParts === 0
                  ? "All green"
                  : pileResult.greenParts === 0
                    ? "All brown"
                    : `${formatNumber(pileResult.brownToGreen ?? 0, 1)}:1`}
                <span className="font-sans font-medium text-[14px] text-soil ml-1.5">browns : greens by volume</span>
              </p>
              <p className="font-serif text-[14px] leading-[1.6] text-ink mt-2">{pileResult.suggestion}</p>

              <dl className="mt-4 pt-3 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_30%,transparent)] grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 font-sans text-[14px]">
                <dt className="text-soil">Pile volume</dt>
                <dd className="m-0 tabular text-ink">{formatNumber(pileResult.volumeCuFt, 1)} ft³ · {formatNumber(pileResult.volumeCuM, 2)} m³</dd>
                <dt className="text-soil">Entered parts</dt>
                <dd className="m-0 tabular text-ink">{formatNumber(pileResult.brownParts, 1)} brown · {formatNumber(pileResult.greenParts, 1)} green</dd>
                <dt className="text-soil">Starting rule</dt>
                <dd className="m-0 tabular text-ink">about {MIX_TARGET}:1 by equal volume</dd>
              </dl>

              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] leading-[1.5] text-soil">
                Volume-parts screen, not a combined C:N test · see the cited material ranges below
              </p>

              {pileResult.hasRawManure && (
                <div className="mt-5 pt-4 border-t border-dashed border-[color-mix(in_oklch,var(--terracotta)_45%,transparent)]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-terracotta mb-2">Food-safety advisory · raw manure</p>
                  <p className="font-serif text-[14px] leading-[1.6] text-ink">
                    Raw animal manure can carry pathogens. Keep it away from harvestable crops and follow current local extension guidance for composting temperatures and pre-harvest intervals before using it in an edible garden.
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-soil">
                    Source · USDA FSMA Produce Safety Rule · UMN Extension manure-in-garden guidance
                  </p>
                </div>
              )}
            </div>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
