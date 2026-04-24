# Seed Spacing Crop Page Index Audit

Date: 2026-04-24  
Scope: tomato, lettuce, potato, carrot. No URL Inspection API used; this is a static/live-surface audit only.

## 1. GSC signal

30-day GSC data shows only one crop page with any exposure:

| Page | Impressions | Clicks | Avg position |
|---|---:|---:|---:|
| `/tools/seed-spacing/carrot` | 2 | 0 | 8.0 |
| `/tools/seed-spacing/tomato` | 0 | 0 | N/A |
| `/tools/seed-spacing/lettuce` | 0 | 0 | N/A |
| `/tools/seed-spacing/potato` | 0 | 0 | N/A |

Interpretation: this does not prove non-indexing. It proves Google Search Console has not recorded impressions for most crop pages in the 30-day window. URL Inspection is still required to distinguish `indexed but no queries` from `discovered/crawled but not indexed`.

## 2. Live checks

All four sampled pages returned live HTML and have stable canonical URLs.

| Page | Live URL | Canonical | JSON-LD types |
|---|---|---|---|
| Tomato | `/tools/seed-spacing/tomato` | `https://gardencalcs.com/tools/seed-spacing/tomato` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList`, `Dataset` |
| Lettuce | `/tools/seed-spacing/lettuce` | `https://gardencalcs.com/tools/seed-spacing/lettuce` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList`, `Dataset` |
| Potato | `/tools/seed-spacing/potato` | `https://gardencalcs.com/tools/seed-spacing/potato` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList`, `Dataset` |
| Carrot | `/tools/seed-spacing/carrot` | `https://gardencalcs.com/tools/seed-spacing/carrot` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList`, `Dataset` |

## 3. H1/title state

| Page | Title | H1 |
|---|---|---|
| Tomato | `Tomato Seed Spacing Guide \| Row, Plant & Depth Chart` | `Tomato Seed Spacing Guide` |
| Lettuce | `Lettuce Seed Spacing Guide \| Row, Plant & Depth Chart` | `Lettuce Seed Spacing Guide` |
| Potato | `Potato Seed Spacing Guide \| Row, Plant & Depth Chart` | `Potato Seed Spacing Guide` |
| Carrot | `Carrot Seed Spacing Guide \| Row, Plant & Depth Chart` | `Carrot Seed Spacing Guide` |

## 4. Diagnosis

Most likely causes:

1. **Low authority and shallow discovery depth.** Crop pages are valid, but the young domain has 0 backlinks and no strong external signals to force broad crawl/index prioritization.
2. **Template similarity may slow indexing.** Pages are high-quality enough for Dataset/FAQ, but all crop pages share the same structure and titles. Google may sample a few first.
3. **Internal link pressure is still thin.** The seed-spacing calculator links to crop context, but these pages need stronger hub/data links and external references.
4. **No obvious technical blocker found in this audit.** Canonicals and structured data are present.

## 5. Recommendation

1. In GSC URL Inspection, manually test:
   - `https://gardencalcs.com/tools/seed-spacing/tomato`
   - `https://gardencalcs.com/tools/seed-spacing/lettuce`
   - `https://gardencalcs.com/tools/seed-spacing/potato`
   - `https://gardencalcs.com/data/npk-rates-by-crop`
2. If status is `Discovered - currently not indexed`, strengthen internal links from:
   - `/tools/seed-spacing-calculator`
   - `/data/compost-cn-ratios` when relevant
   - future `/data/seed-spacing-by-crop`
3. If status is `Crawled - currently not indexed`, add more unique crop-specific sections before requesting indexing.
4. If status is indexed but no impressions, treat as demand/authority problem and prioritize backlinks/embeds over more template pages.

