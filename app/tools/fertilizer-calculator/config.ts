// Fertilizer Calculator Configuration
// NOTE: P values represent P₂O₅ (phosphorus pentoxide), NOT elemental phosphorus.
// To convert P₂O₅ to elemental P, multiply by 0.436.

export interface FertilizerPreset {
  id: string;
  name: string;
  n: number; // Nitrogen (N) percentage
  p: number; // Phosphorus as P₂O₅ percentage
  k: number; // Potassium as K₂O percentage
}

export interface CalculationResult {
  fertilizerKg: number;
  nKg: number;
  pKg: number; // P₂O₅ kg
  kKg: number;
}

export const FERTILIZER_PRESETS: FertilizerPreset[] = [
  {
    id: "urea",
    name: "Urea (尿素)",
    n: 46,
    p: 0,
    k: 0,
  },
  {
    id: "compound",
    name: "Compound Fertilizer (复合肥 15-15-15)",
    n: 15,
    p: 15,
    k: 15,
  },
  {
    id: "dap",
    name: "DAP / Diammonium Phosphate (磷酸二铵)",
    n: 18,
    p: 46,
    k: 0,
  },
  {
    id: "custom",
    name: "Custom (自定义)",
    n: 0,
    p: 0,
    k: 0,
  },
];

// Default recommended application rate: 20 kg per 100 m²
export const DEFAULT_RATE_KG_PER_100SQM = 20;

export function calculate(
  areaM2: number,
  n: number,
  p: number,
  k: number,
  rateKgPer100sqm: number
): CalculationResult {
  const fertilizerKg = (areaM2 / 100) * rateKgPer100sqm;
  return {
    fertilizerKg: parseFloat(fertilizerKg.toFixed(2)),
    nKg: parseFloat(((fertilizerKg * n) / 100).toFixed(2)),
    pKg: parseFloat(((fertilizerKg * p) / 100).toFixed(2)),
    kKg: parseFloat(((fertilizerKg * k) / 100).toFixed(2)),
  };
}