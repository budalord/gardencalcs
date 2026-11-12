"use client";

import { useState } from "react";
import type { FormEvent } from "react";

interface Result { cubicFeet: number; cubicYards: number; cubicMeters: number; bags: number; exactBags: number }

const CUBIC_FEET_PER_CUBIC_METER = 35.3146667;
const LITERS_PER_CUBIC_FOOT = 28.3168466;
const fieldLabel = "block font-sans text-[11px] uppercase tracking-[0.08em] text-soil mb-1.5";
const fieldBase = "w-full bg-cream border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md px-3 py-2.5 text-ink outline-none transition-colors duration-fast focus:border-moss focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--moss)_45%,transparent)]";
const buttonFocus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export default function SoilCalculator() {
  const [system, setSystem] = useState<"imperial" | "metric">("imperial");
  const [shape, setShape] = useState<"rectangle" | "circle">("rectangle");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [bagSize, setBagSize] = useState("1.5");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);

  function changeSystem(next: "imperial" | "metric") {
    if (next === system) return;
    const currentBagSize = Number.parseFloat(bagSize);
    if (Number.isFinite(currentBagSize) && currentBagSize > 0) {
      const convertedBagSize = next === "metric"
        ? currentBagSize * LITERS_PER_CUBIC_FOOT
        : currentBagSize / LITERS_PER_CUBIC_FOOT;
      setBagSize(String(Number(convertedBagSize.toFixed(3))));
    }
    setSystem(next);
    setLength(""); setWidth(""); setDepth("");
    setErrors({}); setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    const a = Number.parseFloat(length), b = Number.parseFloat(width);
    const d = Number.parseFloat(depth), bag = Number.parseFloat(bagSize);
    if (!Number.isFinite(a) || a <= 0) nextErrors.length = `Enter a ${shape === "circle" ? "diameter" : "length"} greater than 0.`;
    if (shape === "rectangle" && (!Number.isFinite(b) || b <= 0)) nextErrors.width = "Enter a width greater than 0.";
    if (!Number.isFinite(d) || d <= 0) nextErrors.depth = "Enter a depth greater than 0.";
    if (!Number.isFinite(bag) || bag <= 0) nextErrors.bagSize = "Enter a bag capacity greater than 0.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setResult(null); return; }

    const area = shape === "rectangle" ? a * b : Math.PI * (a / 2) ** 2;
    const cubicFeet = system === "imperial"
      ? area * (d / 12)
      : area * (d / 100) * CUBIC_FEET_PER_CUBIC_METER;
    const bagCubicFeet = system === "imperial" ? bag : bag / 1000 * CUBIC_FEET_PER_CUBIC_METER;
    const exactBags = cubicFeet / bagCubicFeet;
    setResult({ cubicFeet, cubicYards: cubicFeet / 27, cubicMeters: cubicFeet / CUBIC_FEET_PER_CUBIC_METER, bags: Math.ceil(exactBags), exactBags });
  }

  const clear = (field: string) => { setErrors((old) => ({ ...old, [field]: "" })); setResult(null); };
  return (
    <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-lg p-5 sm:p-7">
      <h2 className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-1">Calculate soil volume and bags</h2>
      <p className="font-serif italic text-[14px] leading-[1.55] text-soil mb-6">Choose a footprint, enter the fill depth, and use the capacity printed on your bag.</p>
      <form onSubmit={calculate} noValidate>
        <fieldset className="mb-5"><legend className={fieldLabel}>Measurement system</legend><div className="grid grid-cols-2 gap-2">
          {(["imperial", "metric"] as const).map((unit) => <button key={unit} type="button" aria-pressed={system === unit} onClick={() => changeSystem(unit)} className={`min-h-10 rounded-md border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em] ${buttonFocus} ${system === unit ? "border-moss-deep bg-moss-deep text-cream" : "border-[color-mix(in_oklch,var(--soil)_35%,transparent)] bg-cream text-soil"}`}>{unit === "imperial" ? "US · ft / in" : "Metric · m / cm"}</button>)}
        </div></fieldset>
        <fieldset className="mb-5"><legend className={fieldLabel}>Area shape</legend><div className="grid grid-cols-2 gap-2">
          {(["rectangle", "circle"] as const).map((kind) => <button key={kind} type="button" aria-pressed={shape === kind} onClick={() => { setShape(kind); setErrors({}); setResult(null); }} className={`min-h-10 rounded-md border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em] ${buttonFocus} ${shape === kind ? "border-moss-deep bg-moss-deep text-cream" : "border-[color-mix(in_oklch,var(--soil)_35%,transparent)] bg-cream text-soil"}`}>{kind}</button>)}
        </div></fieldset>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div><label htmlFor="soil-length" className={fieldLabel}>{shape === "circle" ? "Diameter" : "Length"} ({system === "imperial" ? "ft" : "m"})</label><input id="soil-length" type="number" inputMode="decimal" min="0" step="any" value={length} onChange={(e) => { setLength(e.target.value); clear("length"); }} className={`${fieldBase} font-mono tabular text-[15px]`} aria-invalid={Boolean(errors.length)} />{errors.length && <p role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{errors.length}</p>}</div>
          {shape === "rectangle" && <div><label htmlFor="soil-width" className={fieldLabel}>Width ({system === "imperial" ? "ft" : "m"})</label><input id="soil-width" type="number" inputMode="decimal" min="0" step="any" value={width} onChange={(e) => { setWidth(e.target.value); clear("width"); }} className={`${fieldBase} font-mono tabular text-[15px]`} aria-invalid={Boolean(errors.width)} />{errors.width && <p role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{errors.width}</p>}</div>}
          <div><label htmlFor="soil-depth" className={fieldLabel}>Depth ({system === "imperial" ? "in" : "cm"})</label><input id="soil-depth" type="number" inputMode="decimal" min="0" step="any" value={depth} onChange={(e) => { setDepth(e.target.value); clear("depth"); }} className={`${fieldBase} font-mono tabular text-[15px]`} aria-invalid={Boolean(errors.depth)} />{errors.depth && <p role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{errors.depth}</p>}</div>
        </div>
        <div className="mb-5"><label htmlFor="soil-bag-size" className={fieldLabel}>Bag capacity ({system === "imperial" ? "cu ft" : "liters"})</label><input id="soil-bag-size" type="number" inputMode="decimal" min="0" step="any" value={bagSize} onChange={(e) => { setBagSize(e.target.value); clear("bagSize"); }} className={`${fieldBase} max-w-full sm:max-w-[240px] font-mono tabular text-[15px]`} aria-invalid={Boolean(errors.bagSize)} /><p className="mt-1.5 font-serif text-[12px] leading-[1.45] text-soil">Starting capacity is an example; unit switching is math-derived. Check the capacity printed on the product you buy.</p>{errors.bagSize && <p role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{errors.bagSize}</p>}</div>
        <button type="submit" className={`w-full min-h-11 bg-moss-deep hover:bg-moss active:translate-y-px text-cream font-sans text-sm font-medium py-3 rounded-md transition duration-fast ${buttonFocus}`}>Calculate soil amount</button>
      </form>
      {result && <div aria-live="polite" className="mt-6 bg-cream border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md px-4 sm:px-6 py-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-2">Volume estimate</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{[["Cubic feet", result.cubicFeet], ["Cubic yards", result.cubicYards], ["Cubic meters", result.cubicMeters], ["Whole bags", result.bags]].map(([label, value]) => <div key={String(label)}><p className="font-mono text-[10px] uppercase text-soil">{label}</p><p className="font-serif font-semibold text-[24px] tabular text-moss-deep">{typeof value === "number" && label !== "Whole bags" ? formatNumber(value) : value}</p></div>)}</div>
        <p className="font-serif text-[13px] leading-[1.55] text-soil mt-3">Bag count rounds up from {formatNumber(result.exactBags)}. Volume conversions are mathematical unit conversions.</p>
      </div>}
    </section>
  );
}
