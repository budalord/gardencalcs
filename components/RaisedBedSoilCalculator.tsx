"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type UnitSystem = "imperial" | "metric";
type Recipe = "single" | "mels" | "topsoil";
type Field = "beds" | "length" | "width" | "depth" | "bagSize";
type Inputs = Record<Field, string>;
type Errors = Partial<Record<Field | "total", string>>;

interface Result {
  cubicFeet: number;
  cubicYards: number;
  cubicMeters: number;
  exactBags: number;
}

interface RaisedBedSoilCalculatorProps {
  melsMixSource?: string;
  topsoilMixSource?: string;
}

const METERS_PER_FOOT = 0.3048;
const CENTIMETERS_PER_INCH = 2.54;
const CUBIC_METERS_PER_CUBIC_FOOT = 0.0283168;
const LITERS_PER_CUBIC_FOOT = METERS_PER_FOOT ** 3 * 1000;
const initialInputs: Inputs = { beds: "1", length: "", width: "", depth: "", bagSize: "1.5" };
const fieldLabel = "block font-sans text-[11px] uppercase tracking-[0.08em] text-soil mb-1.5";
const fieldBase = "w-full bg-cream border border-[color-mix(in_oklch,var(--soil)_35%,transparent)] rounded-md px-3 py-2.5 text-ink outline-none transition-colors duration-fast focus:border-moss focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--moss)_45%,transparent)]";
const buttonFocus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-paper";
const sourceLink = "text-moss-deep underline underline-offset-2";
const volumeFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const bagFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const wholeBagFormatter = new Intl.NumberFormat("en-US");

function convertInput(value: string, factor: number) {
  const converted = Number(value) * factor;
  return value === "" || !Number.isFinite(converted) ? value : String(Number(converted.toPrecision(15)));
}

function exactBagCount(value: number) {
  const nearest = Math.round(value);
  // Remove representation error at whole-bag boundaries before rounding up.
  return nearest > 0 && Math.abs(value - nearest) <= Number.EPSILON * value * 2 ? nearest : value;
}

function formatVolume(value: number) {
  return value > 0 && value < 0.01 ? "<0.01" : volumeFormatter.format(value);
}

export default function RaisedBedSoilCalculator({
  melsMixSource = "https://squarefootgardening.org/method/",
  topsoilMixSource = "https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/raised-bed-gardens",
}: RaisedBedSoilCalculatorProps) {
  const [system, setSystem] = useState<UnitSystem>("imperial");
  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  const [recipe, setRecipe] = useState<Recipe>("single");
  const [compostDenominator, setCompostDenominator] = useState(3);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<Result | null>(null);

  const imperial = system === "imperial";
  const horizontalUnit = imperial ? "ft" : "m";
  const depthUnit = imperial ? "in" : "cm";
  const bagUnit = imperial ? "cu ft" : "liters";
  const ingredients = recipe === "mels"
    ? [
      { name: "Coarse vermiculite", share: 1 / 3 },
      { name: "Sphagnum peat moss or coconut coir", share: 1 / 3 },
      { name: "Blended organic compost", share: 1 / 3 },
    ]
    : recipe === "topsoil"
      ? [
        { name: "Topsoil", share: (compostDenominator - 1) / compostDenominator },
        { name: "Plant-based compost", share: 1 / compostDenominator },
      ]
      : [];

  function changeSystem(next: UnitSystem) {
    if (next === system) return;

    const horizontalFactor = next === "metric" ? METERS_PER_FOOT : 1 / METERS_PER_FOOT;
    const depthFactor = next === "metric" ? CENTIMETERS_PER_INCH : 1 / CENTIMETERS_PER_INCH;
    const bagFactor = next === "metric" ? LITERS_PER_CUBIC_FOOT : 1 / LITERS_PER_CUBIC_FOOT;

    setInputs((current) => ({
      ...current,
      length: convertInput(current.length, horizontalFactor),
      width: convertInput(current.width, horizontalFactor),
      depth: convertInput(current.depth, depthFactor),
      bagSize: convertInput(current.bagSize, bagFactor),
    }));
    setSystem(next);
    setErrors({});
    setResult(null);
  }

  function changeField(field: Field, value: string) {
    setInputs((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, total: undefined }));
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    const beds = Number(inputs.beds);
    const length = Number(inputs.length);
    const width = Number(inputs.width);
    const depth = Number(inputs.depth);
    const bagSize = Number(inputs.bagSize);

    if (!Number.isSafeInteger(beds) || beds <= 0) nextErrors.beds = "Enter a positive whole number of beds.";
    if (!Number.isFinite(length) || length <= 0) nextErrors.length = "Enter a length greater than 0.";
    if (!Number.isFinite(width) || width <= 0) nextErrors.width = "Enter a width greater than 0.";
    if (!Number.isFinite(depth) || depth <= 0) nextErrors.depth = "Enter a fill depth greater than 0.";
    if (!Number.isFinite(bagSize) || bagSize <= 0) nextErrors.bagSize = "Enter a bag capacity greater than 0.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    const inputVolume = length * width * (depth / (imperial ? 12 : 100)) * beds;
    const cubicFeet = imperial ? inputVolume : inputVolume / CUBIC_METERS_PER_CUBIC_FOOT;
    const cubicMeters = cubicFeet * CUBIC_METERS_PER_CUBIC_FOOT;
    const exactBags = exactBagCount((imperial ? inputVolume : inputVolume * 1000) / bagSize);

    if (!(cubicMeters > 0) || !(exactBags > 0) || !Number.isSafeInteger(Math.ceil(exactBags))) {
      setErrors({ total: "These measurements or the bag capacity are outside the range this calculator can handle." });
      setResult(null);
      return;
    }

    setErrors({});
    setResult({ cubicFeet, cubicYards: cubicFeet / 27, cubicMeters, exactBags });
  }

  function numberField(field: Field, label: string) {
    const id = `raised-bed-${field}`;
    const error = errors[field];
    return (
      <div>
        <label htmlFor={id} className={fieldLabel}>{label}</label>
        <input
          id={id}
          type="number"
          inputMode={field === "beds" ? "numeric" : "decimal"}
          min={field === "beds" ? 1 : 0}
          step={field === "beds" ? 1 : "any"}
          value={inputs[field]}
          onChange={(event) => changeField(field, event.target.value)}
          className={`${fieldBase} font-mono tabular text-[15px]`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && <p id={`${id}-error`} role="alert" className="mt-1 font-mono text-[11px] text-terracotta">{error}</p>}
      </div>
    );
  }

  return (
    <section className="bg-paper border border-[color-mix(in_oklch,var(--soil)_25%,transparent)] rounded-lg p-5 sm:p-7">
      <h2 className="font-serif font-semibold text-[22px] leading-[1.2] text-moss-deep mb-1">Calculate raised bed soil volume and bags</h2>
      <p className="font-serif italic text-[14px] leading-[1.55] text-soil mb-6">Enter the inside dimensions for beds of the same size and the depth you want to fill.</p>
      <form onSubmit={calculate} noValidate>
        <fieldset className="mb-5">
          <legend className={fieldLabel}>Measurement system</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["imperial", "metric"] as const).map((unit) => (
              <button
                key={unit}
                type="button"
                aria-pressed={system === unit}
                onClick={() => changeSystem(unit)}
                className={`min-h-10 rounded-md border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em] ${buttonFocus} ${system === unit ? "border-moss-deep bg-moss-deep text-cream" : "border-[color-mix(in_oklch,var(--soil)_35%,transparent)] bg-cream text-soil"}`}
              >
                {unit === "imperial" ? "US · ft / in" : "Metric · m / cm"}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {numberField("beds", "Number of beds")}
          {numberField("depth", `Fill depth (${depthUnit})`)}
          {numberField("length", `Inside length (${horizontalUnit})`)}
          {numberField("width", `Inside width (${horizontalUnit})`)}
          <div>
            {numberField("bagSize", `Bag capacity (${bagUnit})`)}
            <p className="mt-1.5 font-serif text-[12px] leading-[1.45] text-soil">The starting capacity is illustrative. Use the volume printed on your bag.</p>
          </div>
          <div>
            <label htmlFor="raised-bed-recipe" className={fieldLabel}>Soil mix</label>
            <select id="raised-bed-recipe" className={fieldBase} value={recipe} onChange={(event) => setRecipe(event.target.value as Recipe)}>
              <option value="single">Single material</option>
              <option value="mels">Mel&apos;s Mix</option>
              <option value="topsoil">Topsoil + compost</option>
            </select>
          </div>
          {recipe === "mels" && (
            <p className="sm:col-span-2 font-serif text-[13px] leading-[1.5] text-soil"><a href={melsMixSource} className={sourceLink}>Square Foot Gardening Foundation</a> measures coarse vermiculite, sphagnum peat moss or coconut coir, and blended organic compost in equal volumes.</p>
          )}
          {recipe === "topsoil" && (
            <div className="sm:col-span-2">
              <label htmlFor="raised-bed-compost-share" className={fieldLabel}>Plant-based compost share by volume</label>
              <select id="raised-bed-compost-share" className={`${fieldBase} sm:max-w-[240px]`} value={compostDenominator} onChange={(event) => setCompostDenominator(Number(event.target.value))} aria-describedby="raised-bed-compost-source">
                <option value={3}>1/3 compost</option>
                <option value={2}>1/2 compost</option>
              </select>
              <p id="raised-bed-compost-source" className="mt-1.5 font-serif text-[13px] leading-[1.5] text-soil"><a href={topsoilMixSource} className={sourceLink}>University of Minnesota Extension</a> gives about 1/3 to 1/2 plant-based compost without specifying a measurement basis. This calculator treats those shares as volumes.</p>
            </div>
          )}
        </div>
        <button type="submit" className={`w-full min-h-11 bg-moss-deep hover:bg-moss active:translate-y-px text-cream font-sans text-sm font-medium py-3 rounded-md transition duration-fast ${buttonFocus}`}>Calculate soil amount</button>
        {errors.total && <p role="alert" className="mt-2 font-mono text-[11px] text-terracotta">{errors.total}</p>}
      </form>

      <div aria-live="polite">
        {result && (
          <div className="mt-6 bg-cream border border-[color-mix(in_oklch,var(--moss)_35%,transparent)] border-l-[4px] border-l-moss rounded-md px-4 sm:px-6 py-5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-2">Total for all beds</h3>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Cubic feet", value: formatVolume(result.cubicFeet) },
                { label: "Cubic yards", value: formatVolume(result.cubicYards) },
                { label: "Cubic meters", value: formatVolume(result.cubicMeters) },
                { label: "Whole bags", value: wholeBagFormatter.format(Math.ceil(result.exactBags)) },
              ].map(({ label, value }) => (
                <div key={label} className="min-w-0">
                  <dt className="font-mono text-[10px] uppercase text-soil">{label}</dt>
                  <dd className="font-serif font-semibold text-[24px] tabular text-moss-deep break-words">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="font-serif text-[13px] leading-[1.55] text-soil mt-3">Before rounding up: {bagFormatter.format(result.exactBags)} bags.</p>
            {ingredients.length > 0 && (
              <div className="mt-4 pt-4 border-t border-dashed border-[color-mix(in_oklch,var(--soil)_35%,transparent)]">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.08em] text-soil mb-2">Amounts by ingredient</h4>
                <ul className="space-y-2.5 font-serif text-[14px] leading-[1.5] text-ink">
                  {ingredients.map(({ name, share }) => {
                    const ingredientBags = exactBagCount(result.exactBags * share);
                    return (
                      <li key={name}>
                        <p><strong>{name}</strong></p>
                        <p>{formatVolume(result.cubicFeet * share)} cu ft · {formatVolume(result.cubicYards * share)} cu yd · {formatVolume(result.cubicMeters * share)} m³</p>
                        <p>{wholeBagFormatter.format(Math.ceil(ingredientBags))} whole bags ({bagFormatter.format(ingredientBags)} before rounding up)</p>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 font-serif text-[13px] leading-[1.55] text-soil">Each ingredient is rounded up on its own using the entered bag capacity. If capacities differ, divide each ingredient&apos;s volume by its own bag&apos;s capacity.</p>
              </div>
            )}
            <p className="mt-4 font-serif text-[13px] leading-[1.55] text-soil">Results are volume math; plan to top up after settling.</p>
          </div>
        )}
      </div>
    </section>
  );
}
