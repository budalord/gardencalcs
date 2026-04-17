# Phase 0 Baseline Snapshot

- Lighthouse version: `13.1.0`
- Method: production URLs fetched live, cached locally under `reports/page_cache/`; Lighthouse mobile run 3 times per page and medians reported below.
- INP note: Lighthouse JSON did not expose numeric INP in these runs, so INP is recorded as `N/A`.

## Baseline table

| URL | title 原文 | meta description 原文 | H1 原文 | 正文字数 | 内链数 | FAQ/HowTo/WebPage schema 存在？ | 首屏快答块存在？ | LCP / CLS / INP / Performance score（3 次中位数） |
|---|---|---|---|---:|---:|---|---|---|
| https://gardencalcs.com/ | Fertilizer Calculator & Seed Spacing Calculator – Free Garden Tools | Free online garden calculators. Calculate fertilizer NPK dosage, seed spacing, and more. Simple tools for home gardeners and small farms. | Garden Tools Hub | 172 | 22 | none | yes | LCP 2463.7 ms / CLS 0.000 / INP N/A / Perf 88.0 |
| https://gardencalcs.com/tools/soil-ph-calculator | Soil pH Calculator / Garden Tools Hub | Calculate how much lime or sulfur you need to reach your target soil pH. | Soil pH Calculator | 1041 | 18 | FAQPage, HowTo | yes | LCP 2416.3 ms / CLS 0.000 / INP N/A / Perf 88.0 |
| https://gardencalcs.com/tools/seed-spacing-calculator | Seed Spacing Calculator / Garden Tools Hub | Calculate recommended row spacing, plant spacing, and total seed count for your garden. | Seed Spacing Calculator | 885 | 18 | FAQPage, HowTo | yes | LCP 3294.6 ms / CLS 0.000 / INP N/A / Perf 78.0 |
| https://gardencalcs.com/tools/watering-schedule-calculator | Watering Schedule Calculator / Garden Tools Hub | Get a personalized watering schedule based on your plant, soil, season, and growing method. | Watering Schedule Calculator | 227 | 18 | FAQPage, HowTo | yes | LCP 5854.9 ms / CLS 0.000 / INP N/A / Perf 59.0 |
| https://gardencalcs.com/tools/fertilizer-calculator | Fertilizer Calculator – NPK Dosage for Any Crop or Garden / Garden Tools Hub | Calculate exactly how much fertilizer you need based on NPK ratio and garden area. Supports urea, compound fertilizer, DAP, and custom blends. | Fertilizer Calculator | 38 | 12 | FAQPage, HowTo | no | LCP 3114.2 ms / CLS 0.000 / INP N/A / Perf 87.0 |
| https://gardencalcs.com/tools/compost-calculator | Compost Calculator / Garden Tools Hub | Calculate your compost C:N ratio, bin volume, and get balancing recommendations. | Compost Calculator | 1022 | 18 | FAQPage, HowTo | yes | LCP 11768.9 ms / CLS 0.000 / INP N/A / Perf 55.0 |

## Lighthouse raw runs

### https://gardencalcs.com/

| run file | LCP (ms) | CLS | INP (ms) | Performance |
|---|---:|---:|---:|---:|
| home-run1.json | 1725.5 | 0.000 | N/A | 94.0 |
| home-run2.json | N/A | N/A | N/A | N/A |
| home-run3.json | 3201.9 | 0.000 | N/A | 82.0 |

### https://gardencalcs.com/tools/soil-ph-calculator

| run file | LCP (ms) | CLS | INP (ms) | Performance |
|---|---:|---:|---:|---:|
| soil-ph-calculator-run1.json | 2416.3 | 0.000 | N/A | 88.0 |
| soil-ph-calculator-run2.json | 3126.8 | 0.000 | N/A | 85.0 |
| soil-ph-calculator-run3.json | 1961.9 | 0.000 | N/A | 95.0 |

### https://gardencalcs.com/tools/seed-spacing-calculator

| run file | LCP (ms) | CLS | INP (ms) | Performance |
|---|---:|---:|---:|---:|
| seed-spacing-calculator-run1.json | 2591.0 | 0.000 | N/A | 94.0 |
| seed-spacing-calculator-run2.json | 5267.4 | 0.000 | N/A | 68.0 |
| seed-spacing-calculator-run3.json | 3294.6 | 0.000 | N/A | 78.0 |

### https://gardencalcs.com/tools/watering-schedule-calculator

| run file | LCP (ms) | CLS | INP (ms) | Performance |
|---|---:|---:|---:|---:|
| watering-schedule-calculator-run1.json | 12468.2 | 0.000 | N/A | 55.0 |
| watering-schedule-calculator-run2.json | 3778.6 | 0.000 | N/A | 81.0 |
| watering-schedule-calculator-run3.json | 5854.9 | 0.000 | N/A | 59.0 |

### https://gardencalcs.com/tools/fertilizer-calculator

| run file | LCP (ms) | CLS | INP (ms) | Performance |
|---|---:|---:|---:|---:|
| fertilizer-calculator-run1.json | 3114.2 | 0.000 | N/A | 87.0 |
| fertilizer-calculator-run2.json | 1901.3 | 0.000 | N/A | 99.0 |
| fertilizer-calculator-run3.json | 16384.7 | 0.000 | N/A | 55.0 |

### https://gardencalcs.com/tools/compost-calculator

| run file | LCP (ms) | CLS | INP (ms) | Performance |
|---|---:|---:|---:|---:|
| compost-calculator-run1.json | 11768.9 | 0.000 | N/A | 55.0 |
| compost-calculator-run2.json | 3419.8 | 0.000 | N/A | 86.0 |
| compost-calculator-run3.json | 16380.5 | 0.000 | N/A | 55.0 |

