"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type System = "imperial" | "metric";
type Shape = "rectangle" | "circle";
type Field = "length" | "width" | "depth" | "bagSize" | "bulkPrice" | "bagPrice";
type Errors = Partial<Record<Field | "calculation", string>>;

interface Result {
  cubicFeet: number;
  cubicYards: number;
  cubicMeters: number;
  exactBags: number;
  wholeBags: number;
  coverage: number;
  bulkTotal: number | null;
  bagTotal: number | null;
  bagPricePerYard: number | null;
}

const METERS_PER_FOOT = 0.3048;
const CUBIC_METERS_PER_CUBIC_FOOT = METERS_PER_FOOT ** 3;
const LITERS_PER_CUBIC_FOOT = CUBIC_METERS_PER_CUBIC_FOOT * 1000;
const labelClass = "block font-sans text-[11px] uppercase tracking-[0.08em] text-soil mb-1.5";
const inputClass = "w-full bg-cream border border-[color-mix(in_oklch,var(--soil)_65%,transparent)] rounded-md px-3 py-2.5 text-ink font-mono tabular text-[15px] outline-none aria-[invalid=true]:border-soil focus:border-moss-deep focus-visible:ring-2 focus-visible:ring-moss-deep";
const buttonFocus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-paper";
const toggleClass = `min-h-11 rounded-md border px-2 py-2 font-mono text-[11px] uppercase tracking-[0.06em] ${buttonFocus}`;
const activeToggle = "border-moss-deep bg-moss-deep text-cream";
const idleToggle = "border-[color-mix(in_oklch,var(--soil)_65%,transparent)] bg-cream text-soil hover:border-moss-deep";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function formatNumber(value: number, maximumFractionDigits = 2) {
  if (value > 0 && value < 10 ** -maximumFractionDigits) return value.toExponential(2);
  return value.toLocaleString("en-US", { maximumFractionDigits });
}

export default function MulchCalculator() {
  const [system, setSystem] = useState<System>("imperial");
  const [shape, setShape] = useState<Shape>("rectangle");
  const [fields, setFields] = useState<Record<Field, string>>({
    length: "", width: "", depth: "", bagSize: "2", bulkPrice: "", bagPrice: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<Result | null>(null);
  const metric = system === "metric";

  function changeSystem(next: System) {
    if (next === system) return;
    const bagSize = Number(fields.bagSize);
    const convertedBagSize = next === "metric" ? bagSize * LITERS_PER_CUBIC_FOOT : bagSize / LITERS_PER_CUBIC_FOOT;
    setFields({
      ...fields,
      length: "",
      width: "",
      depth: "",
      bagSize: convertedBagSize > 0 && Number.isFinite(convertedBagSize)
        ? String(Number(convertedBagSize.toPrecision(15)))
        : fields.bagSize,
    });
    setSystem(next);
    setErrors({});
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    const length = Number(fields.length);
    const width = Number(fields.width);
    const depth = Number(fields.depth);
    const capacity = Number(fields.bagSize);
    const bulkPrice = fields.bulkPrice === "" ? null : Number(fields.bulkPrice);
    const bagPrice = fields.bagPrice === "" ? null : Number(fields.bagPrice);

    if (!Number.isFinite(length) || length <= 0) nextErrors.length = `Enter a ${shape === "circle" ? "diameter" : "length"} greater than 0.`;
    if (shape === "rectangle" && (!Number.isFinite(width) || width <= 0)) nextErrors.width = "Enter a width greater than 0.";
    if (!Number.isFinite(depth) || depth <= 0) nextErrors.depth = "Enter a depth greater than 0.";
    if (!Number.isFinite(capacity) || capacity <= 0) nextErrors.bagSize = "Enter a bag capacity greater than 0.";
    if (bulkPrice !== null && (!Number.isFinite(bulkPrice) || bulkPrice < 0)) nextErrors.bulkPrice = "Enter a price of 0 or more, or leave it blank.";
    if (bagPrice !== null && (!Number.isFinite(bagPrice) || bagPrice < 0)) nextErrors.bagPrice = "Enter a price of 0 or more, or leave it blank.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    const area = shape === "rectangle" ? length * width : Math.PI * (length / 2) ** 2;
    const cubicFeet = metric ? (area * depth / 100) / CUBIC_METERS_PER_CUBIC_FOOT : area * depth / 12;
    const cubicMeters = metric ? area * depth / 100 : cubicFeet * CUBIC_METERS_PER_CUBIC_FOOT;
    const cubicYards = cubicFeet / 27;
    const bagCubicFeet = metric ? capacity / LITERS_PER_CUBIC_FOOT : capacity;
    const exactBags = metric ? cubicMeters * 1000 / capacity : cubicFeet / bagCubicFeet;
    // Ignore floating-point noise near whole numbers before rounding up a purchase.
    const nearestBag = Math.round(exactBags);
    const wholeBags = nearestBag > 0 && Math.abs(exactBags - nearestBag) <= exactBags * Number.EPSILON * 4
      ? nearestBag
      : Math.ceil(exactBags);
    const coverage = metric ? 27 * CUBIC_METERS_PER_CUBIC_FOOT / (depth / 100) : 324 / depth;
    const bulkTotal = bulkPrice === null ? null : bulkPrice * cubicYards;
    const bagTotal = bagPrice === null ? null : bagPrice * wholeBags;
    const bagPricePerYard = bulkPrice === null || bagPrice === null ? null : bagPrice * (27 / bagCubicFeet);
    const volumeOutputs = [cubicFeet, cubicYards, cubicMeters, exactBags, coverage];
    const priceOutputs = [bulkTotal, bagTotal, bagPricePerYard];
    if (volumeOutputs.some((value) => !Number.isFinite(value) || value <= 0) || !Number.isSafeInteger(wholeBags)
      || priceOutputs.some((value) => value !== null && !Number.isFinite(value))) {
      setErrors({ calculation: "These values are outside the calculator’s range. Check the measurements and prices." });
      setResult(null);
      return;
    }

    setErrors({});
    setResult({ cubicFeet, cubicYards, cubicMeters, exactBags, wholeBags, coverage, bulkTotal, bagTotal, bagPricePerYard });
  }

  function renderField(field: Field, label: string, hint?: string) {
    const id = `mulch-${field}`;
    const error = errors[field];
    const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ");
    return (
      <div>
        <label htmlFor={id} className={labelClass}>{label}</label>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={fields[field]}
          onChange={(event) => {
            const { value } = event.currentTarget;
            setFields((current) => ({ ...current, [field]: value }));
            setErrors((current) => ({ ...current, [field]: undefined, calculation: undefined }));
            setResult(null);
          }}
          className={inputClass}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        />
        {hint && <p id={`${id}-hint`} className="mt-1.5 font-serif text-[13px] leading-[1.45] text-soil">{hint}</p>}
        {error && <p id={`${id}-error`} role="alert" className="mt-1 font-sans text-[12px] font-medium text-ink">{error}</p>}
      </div>
    );
  }

  const bulkTotal = result?.bulkTotal ?? null;
  const bagTotal = result?.bagTotal ?? null;
  const comparison = bulkTotal !== null && bagTotal !== null
    ? currency.format(bulkTotal) === currency.format(bagTotal)
      ? "Both options cost the same to the nearest cent."
      : bulkTotal < bagTotal ? "Bulk mulch costs less for this project." : "Bagged mulch costs less for this project."
    : null;

  return (
    <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-lg p-5 sm:p-7" aria-labelledby="mulch-calculator-heading">
      <h2 id="mulch-calculator-heading" className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-5">Calculate mulch volume and bags</h2>
      <form onSubmit={calculate} noValidate>
        <fieldset className="mb-5">
          <legend className={labelClass}>Measurement system</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["imperial", "metric"] as const).map((unit) => (
              <button key={unit} type="button" aria-pressed={system === unit} onClick={() => changeSystem(unit)} className={`${toggleClass} ${system === unit ? activeToggle : idleToggle}`}>
                {unit === "imperial" ? "US · ft / in" : "Metric · m / cm"}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mb-5">
          <legend className={labelClass}>Area shape</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["rectangle", "circle"] as const).map((kind) => (
              <button key={kind} type="button" aria-pressed={shape === kind} onClick={() => {
                if (shape === kind) return;
                setShape(kind);
                setErrors({});
                setResult(null);
              }} className={`${toggleClass} ${shape === kind ? activeToggle : idleToggle}`}>{kind}</button>
            ))}
          </div>
        </fieldset>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {renderField("length", `${shape === "circle" ? "Diameter" : "Length"} (${metric ? "m" : "ft"})`)}
          {shape === "rectangle" && renderField("width", `Width (${metric ? "m" : "ft"})`)}
          {renderField("depth", `Mulch depth (${metric ? "cm" : "in"})`)}
          {renderField("bagSize", `Bag capacity (${metric ? "liters" : "cu ft"})`, "The starting capacity is an example. Use the volume printed on your bag.")}
        </div>
        <fieldset className="mb-5" aria-describedby="mulch-price-hint">
          <legend className={labelClass}>Prices (optional)</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderField("bulkPrice", "Bulk price per cubic yard ($)")}
            {renderField("bagPrice", "Price per bag ($)")}
          </div>
          <p id="mulch-price-hint" className="mt-1.5 font-serif text-[13px] leading-[1.45] text-soil">Totals cover mulch only. Add delivery or other fees from your quote separately.</p>
        </fieldset>
        <button type="submit" className={`w-full min-h-11 bg-moss-deep hover:bg-ink active:translate-y-px motion-reduce:transform-none text-cream font-sans text-sm font-medium py-3 rounded-md transition-colors duration-fast ${buttonFocus}`}>Calculate mulch amount</button>
        {errors.calculation && <p role="alert" className="mt-2 font-sans text-[12px] font-medium text-ink">{errors.calculation}</p>}
      </form>
      <div aria-live="polite">
        {result && (
          <div className="mt-6 bg-cream border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md px-4 sm:px-6 py-5">
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Cubic feet", value: formatNumber(result.cubicFeet) },
                { label: "Cubic yards", value: formatNumber(result.cubicYards) },
                { label: "Cubic meters", value: formatNumber(result.cubicMeters) },
                { label: "Whole bags", value: formatNumber(result.wholeBags, 0) },
              ].map(({ label, value }) => (
                <div key={label} className="min-w-0">
                  <dt className="font-mono text-[10px] uppercase text-soil">{label}</dt>
                  <dd className="font-serif font-semibold text-[24px] tabular text-moss-deep [overflow-wrap:anywhere]">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-serif text-[14px] leading-[1.55] text-soil">Calculated bag count before rounding up: {formatNumber(result.exactBags, 2)}.</p>
            <p className="mt-1 font-serif text-[14px] leading-[1.55] text-soil">At this depth, one cubic yard covers <strong>{formatNumber(result.coverage)} {metric ? "square meters" : "square feet"}</strong>.</p>
            {(bulkTotal !== null || bagTotal !== null) && (
              <div className="mt-4 pt-4 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)] font-serif tabular text-[15px] leading-[1.55] text-ink [overflow-wrap:anywhere]">
                <dl className="space-y-1">
                  {bulkTotal !== null && <div className="flex flex-wrap justify-between gap-x-4"><dt>Bulk total for estimated volume</dt><dd>{currency.format(bulkTotal)}</dd></div>}
                  {bagTotal !== null && <div className="flex flex-wrap justify-between gap-x-4"><dt>Bagged total for whole bags</dt><dd>{currency.format(bagTotal)}</dd></div>}
                  {result.bagPricePerYard !== null && <div className="flex flex-wrap justify-between gap-x-4"><dt>Bagged price per cubic yard</dt><dd>{currency.format(result.bagPricePerYard)}</dd></div>}
                </dl>
                {comparison && <p className="mt-2 font-semibold text-moss-deep">{comparison}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
