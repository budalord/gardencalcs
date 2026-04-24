# Fertilizer Calculator Pos 72 Audit

Date: 2026-04-24  
Page: `https://gardencalcs.com/tools/fertilizer-calculator`  
Scope: diagnosis only. No calculator logic, canonical, redirect, or content changes.

## 1. GSC signal

30-day GSC window from `/tmp/gsc_30d_audit.*`:

| Metric | Value |
|---|---:|
| Page impressions | 109 |
| Clicks | 0 |
| CTR | 0.00% |
| Avg position | 72.04 |

Top fertilizer-related queries pulling this page:

| Query | Impr | Clicks | Position |
|---|---:|---:|---:|
| `fertilizer calculator` | 12 | 0 | 81.75 |
| `npk calculation` | 6 | 0 | 76.67 |
| `ppm fertilizer calculator` | 4 | 0 | 83.00 |
| `dry fertilizer calculator` | 3 | 0 | 82.00 |
| `fertilizer blend calculator` | 3 | 0 | 80.33 |
| `fertilizer npk calculator` | 3 | 0 | 67.33 |
| `fertilizer recommendation calculator` | 3 | 0 | 89.33 |
| `n-p-k fertilizer calculation formula` | 3 | 0 | 76.67 |
| `npk calculator` | 3 | 0 | 77.00 |

## 2. Current on-page state

Fetched live on 2026-04-24:

| Asset | Current value |
|---|---|
| Title | `Fertilizer NPK Calculator — 20 Crops, Any Bag Grade` |
| Meta description | `Free NPK fertilizer calculator. Convert any bag (10-10-10, 46-0-0, 5-10-15) to pounds or grams for your bed. 20 crops, side-dress timing, extension-cited. No signup.` |
| H1 | `Fertilizer Calculator` |
| Canonical | `https://gardencalcs.com/tools/fertilizer-calculator` |
| JSON-LD | `SoftwareApplication`, `FAQPage`, `HowTo`, `BreadcrumbList`, `Offer` |

H2 sequence:

1. What an NPK fertilizer calculator actually solves
2. NPK basics: what the three numbers really mean
3. Application-rate conversions: lb/acre, lb/100 sq ft, and g/m²
4. How much fertilizer does this bed need?
5. Fertilizer recommendations for common vegetable crops
6. Slow-release vs quick-release fertilizer: when to use each
7. Risks of overapplication and salt injury
8. How to read a fertilizer label before using the calculator
9. Worked examples for home beds and small plots
10. Helpful next steps

## 3. Live SERP shape

Observed public SERP examples for `fertilizer calculator`, `fertilizer calculator garden NPK calculator`, and `npk fertilizer calculator garden`:

| Result type | Example |
|---|---|
| University / extension calculator | Purdue Turf Fertilizer Calculator |
| Established standalone tool | NPK Calculator (`npkcalc.com`) |
| Newer gardening calculator sites | RGardening, GigaTools, GardenCalcu |
| Professional landscaping/lawn calculators | LandscapioAI, Simply Lawn |
| Houseplant/hydroponic calculators | PlantCalculators, hydroponic/nutrient calculators |
| Fertilizer math explainers | GardeningWithSal and other guide-style pages |

SERP interpretation:

- The broad head term is not a single intent. It splits across lawn, turf, hydroponics, liquid fertilizer, dry fertilizer, blend optimization, crop recommendations, and home garden NPK conversion.
- University/extension tools and older calculator domains satisfy trust faster than a young 0-backlink domain.
- Some competitors surface a more obvious formula/result-first calculator on the first screen.

## 4. Diagnosis

Most likely root causes:

1. **Competition and authority are the primary issue.** The page is technically valid, source-cited, and schema-rich, but the head query is occupied by university, turf, and established calculator results. With 0 external links, broad `fertilizer calculator` is a poor first target.
2. **Intent is too broad for one page.** GSC is testing the page against unrelated fertilizer intents: `ppm`, `blend`, `dry`, `recommendation`, and generic `npk`. The page is best suited to home-garden bag-grade conversion, not every fertilizer use case.
3. **Title is decent but not enough to disambiguate.** `Fertilizer NPK Calculator — 20 Crops, Any Bag Grade` is aligned with home-garden NPK conversion, but it does not win SERP trust against universities and exact-purpose tools.
4. **No evidence of canonical/schema breakage.** Live canonical and JSON-LD are correct.
5. **No evidence yet that Phase 2 should be rolled back.** The page gained impressions versus the previous period; the issue is poor rank, not disappearance.

## 5. Recommendation

Do not roll back or add more general content yet.

Next actions:

1. Build supporting data/entity assets first:
   - publish `NPK Fertilizer Rates by Vegetable Crop` externally
   - link it back to the calculator
   - create citation-oriented fertilizer formula snippets
2. Retarget the page around narrower terms:
   - `NPK fertilizer calculator for vegetable garden`
   - `10-10-10 fertilizer calculator`
   - `how much fertilizer for 100 sq ft garden`
   - `fertilizer calculator by crop`
3. Consider future supporting answer pages rather than stuffing this page:
   - `/answers/how-to-calculate-fertilizer-from-npk`
   - `/answers/how-much-10-10-10-fertilizer-per-100-sq-ft`
4. Re-check after the embed/data/link campaign; if position remains >60 with increased links, then revisit title/H1 and content structure.

