# Phase 2 Changes

## Scope

Phase 2 rebuilds only `/tools/fertilizer-calculator`.

## Baseline vs current

- Baseline body word count (Phase 0): **38**
- Current body word count (pre-FAQ content only): **1847**
- Net gain: **+1809 words**
- Baseline H2 count: **0 meaningful content H2 on the live fertilizer page shell**
- Current H2 count: **11**

## New H2 list

1. What an NPK fertilizer calculator actually solves
2. NPK basics: what the three numbers really mean
3. Application-rate conversions: lb/acre, lb/100 sq ft, and g/m²
4. Fertilizer recommendations for common vegetable crops
5. Slow-release vs quick-release fertilizer: when to use each
6. Risks of overapplication and salt injury
7. How to read a fertilizer label before using the calculator
8. Worked examples for home beds and small plots
9. Frequently asked questions
10. Helpful next steps

## Source reachability precheck

These were prechecked before implementation with HEAD requests.

### Kept (HTTP 200)
- https://extension.umd.edu/resource/fertilizing-vegetables
- https://s3.wp.wsu.edu/uploads/sites/2076/2024/07/C141-Vegetable-Fertilizer-Guide.pdf
- http://nmsp.cals.cornell.edu/publications/files/VegetableGuidelines2019.pdf
- https://www.canr.msu.edu/uploads/files/AABI/E0550B.pdf
- https://extension.unh.edu/resource/fertilizing-vegetable-gardens-fact-sheet
- https://www.pubs.ext.vt.edu/426/426-323/426-323.html
- https://extension.oregonstate.edu/catalog/ec-1503-fertilizing-your-garden-vegetables-fruits-ornamentals
- https://extensionpubs.unl.edu/publication/g945/2007/html/view
- https://extension.illinois.edu/blogs/good-growing/2020-04-15-starting-garden-fertilization
- https://extension.unr.edu/publication.aspx?PubID=3167
- https://extension.umn.edu/manage-soil-nutrients/quick-guide-fertilizing-plants
- https://njaes.rutgers.edu/FS839/
- https://gardeningsolutions.ifas.ufl.edu/care/fertilizer/applying-fertilizer-to-vegetables/
- https://www.lsuagcenter.com/profiles/jmorgan/articles/page1650640626298

### Rejected / replaced
- https://aesl.ces.uga.edu/publications/soil/cropsheets.pdf — TLS/handshake timeout in precheck
- https://agrilifeextension.tamu.edu/library/gardening/fertilizing/ — HTTP 403 in precheck

## Crop quick-reference table sources

The final crop table spans **3 extension systems** in its source cells: University of Maryland Extension, University of Nevada Reno Extension, and UNH Extension.

| Crop | N-P-K recommendation (actual nutrient, lb/100 sq ft) | Frequency | Source URL(s) |
|---|---|---|---|
| Tomato | N 0.30 / P soil-test based / K soil-test based | Pre-plant, then side-dress when first fruits form | https://extension.umd.edu/resource/fertilizing-vegetables/ ; https://extension.unr.edu/publication.aspx?PubID=3167 |
| Pepper | N 0.30 / P soil-test based / K soil-test based | Pre-plant, then side-dress when first fruits form | https://extension.umd.edu/resource/fertilizing-vegetables/ ; https://extension.unr.edu/publication.aspx?PubID=3167 |
| Potato | N 0.30 / P soil-test based / K soil-test based | Pre-plant, then side-dress when tubers first form | https://extension.umd.edu/resource/fertilizing-vegetables/ |
| Broccoli | N 0.30 / P soil-test based / K soil-test based | Pre-plant, then side-dress 3 weeks after transplanting | https://extension.umd.edu/resource/fertilizing-vegetables/ |
| Onion | N 0.30 / P soil-test based / K soil-test based | Pre-plant, then side-dress once as bulbs enlarge | https://extension.umd.edu/resource/fertilizing-vegetables/ |
| Garlic | N 0.30 / P soil-test based / K soil-test based | Pre-plant, then side-dress twice during active spring growth | https://extension.umd.edu/resource/fertilizing-vegetables/ |
| Sweet corn | N 0.30 / P soil-test based / K soil-test based | Pre-plant, then side-dress at 12–18 in and again near tasseling | https://extension.umd.edu/resource/fertilizing-vegetables/ ; https://extension.unr.edu/publication.aspx?PubID=3167 |
| Beet | N 0.30 / P soil-test based / K soil-test based | Heavy-feeder profile; feed before planting and monitor vigor mid-season | https://extension.umd.edu/resource/fertilizing-vegetables/ |
| Lettuce | N 0.25 / P 0.25 / K 0.25 | Balanced pre-plant feed; side-dress romaine and crisphead if growth slows | https://extension.unh.edu/resource/fertilizing-vegetable-gardens-fact-sheet ; https://extension.umd.edu/resource/fertilizing-vegetables/ |
| Cucumber | N 0.20 / P soil-test based / K soil-test based | Pre-plant, then side-dress when fruits start to form | https://extension.umd.edu/resource/fertilizing-vegetables/ |

## FAQ source URL table

All FAQ source URLs are `.edu` extension sources.

| FAQ question | Source URL |
|---|---|
| How do you calculate how much fertilizer you need? | https://njaes.rutgers.edu/FS839/ |
| How much fertilizer should I use on my vegetable garden? | https://extension.unh.edu/resource/fertilizing-vegetable-gardens-fact-sheet |
| When should I fertilize vegetables in a home garden? | https://www.pubs.ext.vt.edu/426/426-323/426-323.html |
| Can you over-fertilize a vegetable garden? | https://extension.oregonstate.edu/catalog/ec-1503-fertilizing-your-garden-vegetables-fruits-ornamentals |
| What do the three numbers on fertilizer mean? | https://extension.unr.edu/publication.aspx?PubID=3167 |
| Is slow-release fertilizer better than quick-release fertilizer? | https://extension.illinois.edu/blogs/good-growing/2020-04-15-starting-garden-fertilization |
| Do I need a soil test before adding fertilizer? | https://extensionpubs.unl.edu/publication/g945/2007/html/view |

## JSON-LD validation

The final HTML contains 4 JSON-LD blocks, all parse successfully as JSON:
- SoftwareApplication
- HowTo
- FAQPage
- BreadcrumbList

Local parse result: **4/4 valid JSON-LD blocks**

## Lighthouse mobile comparison

### Baseline (Phase 0 live snapshot)
- Performance: **87.0**
- LCP: **3114.2 ms**
- CLS: **0.000**

### Current (local export preview, mobile Lighthouse)
- Performance: **99.0**
- LCP: **2002.9 ms**
- CLS: **0.000**
- INP: **N/A in current Lighthouse JSON output**

### Result vs Phase 2 threshold
- Performance ≥ 80: **PASS**
- LCP ≤ 2.5s: **PASS**
- CLS ≤ 0.1: **PASS**

## Rich Results check

### What was validated locally
- FAQPage present in HTML
- HowTo present in HTML
- JSON-LD parses successfully with no local JSON errors

### Google Rich Results UI check
Attempted URL:
- https://search.google.com/test/rich-results?url=https://gardencalcs.com/tools/fertilizer-calculator

Observed browser result in this environment:
- `Something went wrong`
- `Log in and try again`

Because the public Rich Results Test UI was blocked by a Google login requirement in this environment, there is no successful UI screenshot to attach from this run. The page does, however, ship the full 4-piece schema set and all 4 blocks parse correctly as JSON-LD.

## Local HTML validation snapshot

- Final title: `Fertilizer Calculator | Crop Guide & Rate Chart`
- Title length: **51**
- Meta description length: **132**
- Pre-FAQ body word count: **1847**
- H2 count: **11**
- FAQ items: **7**
- JSON-LD block count: **4**
- Crop table header present: **yes**
