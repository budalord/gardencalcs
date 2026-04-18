# Phase 3 Changes

## Scope

Phase 3 rebuilds only `/tools/compost-calculator` and updates the static route exclusion so compost uses a dedicated page instead of the generic `[slug]` renderer.

Files changed:
- `app/tools/[slug]/page.tsx`
- `app/tools/compost-calculator/page.tsx`

## Baseline vs current

- Baseline body word count (Phase 0): **1022**
- Current body word count (pre-FAQ content only): **2066**
- Net gain: **+1044 words**
- Baseline H2 count: **0 meaningful compost-specific H2 structure on the generic shell**
- Current H2 count: **9**
- Baseline title: `Compost Calculator / Garden Tools Hub`
- Current title: `Compost Calculator | Bag, Volume & Area Guide`
- Current H1: `Compost Calculator`

## New H2 list

1. What a compost calculator should help you estimate
2. How much compost do I need for beds, lawns, and topdressing
3. Compost volume conversions for cubic feet, cubic yards, and bag counts
4. What’s the right compost ratio for fast decomposition
5. Browns and greens: common compost materials and their C:N ratios
6. How to use finished compost without overapplying it
7. Slow pile, bad smell, or soggy compost: what to fix first
8. Frequently asked questions
9. Helpful next steps

## Intent coverage check

The page now covers the two required intents at H2 level without splitting the main keyword:

- **how much compost do I need** → `How much compost do I need for beds, lawns, and topdressing`
- **what's the right compost ratio** → `What’s the right compost ratio for fast decomposition`

The rendered HTML also includes the required entity phrases:
- `how much compost do I need`
- `C:N ratio`
- `compost for raised bed`
- `compost for lawn`
- `browns and greens`

## C:N table source log

Per your instruction, every ratio row now uses a value that appears explicitly in the source text. Where the extension pages were useful for composting guidance but did **not** provide per-material numeric C:N values, I switched the final table to **Cornell Waste Management Institute Appendix A Table A.1** so every row could preserve a real published value or range.

### Why the source changed

Original Phase 3.5 candidates from extension pages were kept for concept coverage and FAQ sourcing, but they were not reliable for row-by-row numeric C:N extraction. Rather than inventing numbers or smooth multiple sources into made-up averages, the final table uses Cornell Appendix A because it explicitly lists the published C:N values below.

Replacement reason recorded here per row group:
- NCSU / UMN / WVU / Illinois / Arizona / Iowa State extension pages → **replaced for the final C:N table** because they discussed compost inputs, greens, browns, or troubleshooting but did not consistently provide exact per-row numeric ratios for all 8 target materials.
- Cornell Appendix A PDF → **kept for final numeric table** because it provides explicit single values or ranges for each selected material.

### Final C:N table sources

| Material | C:N ratio used on page | Type | Source URL | Source evidence from original text |
|---|---|---|---|---|
| Dry leaves | `40-80:1` | Brown | https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf | `Leaves ... Loose and dry ... 40-80` |
| Grass clippings | `9-25:1` | Green | https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf | `Grass Clippings ... 9-25` |
| Coffee grounds | `20:1` | Green | https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf | `Coffee grounds ... 20` |
| Food scraps | `14-16:1` | Green | https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf | `Garbage (food waste) ... 14-16` |
| Sawdust | `200-750:1` | Brown | https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf | `Sawdust ... 200-750` |
| Straw | `48-150:1` | Brown | https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf | `Straw – general ... 48-150` |
| Horse manure | `22-50:1` | Green | https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf | `Horse – general ... 22-50` |
| Corrugated cardboard | `563:1` | Brown | https://cwmi.css.cornell.edu/AppendixATable1OFCH.pdf | `Corrugated cardboard ... 563` |

## FAQ source URL table

All FAQ source URLs are `.edu` extension sources.

| FAQ question | Source URL |
|---|---|
| What is the ideal carbon-to-nitrogen ratio for compost? | https://extension.colostate.edu/resource/making-compost/ |
| What should I avoid putting in a home compost pile? | https://extension.umn.edu/managing-soil-and-nutrients/composting-home-gardens |
| Why does compost smell bad or stay too wet? | https://extension.illinois.edu/composting/troubleshooting-composting-problems |
| How do I know when compost is finished and ready to use? | https://extension.illinois.edu/composting/questions-about-composting |
| Should I turn the pile, cover it, or both? | https://extension.oregonstate.edu/ask-extension/featured/composting-should-i-turn-cover-or-both |
| Can I compost diseased plants such as powdery mildew material? | https://extension.oregonstate.edu/ask-extension/featured/can-i-compost-plants-powdery-mildew |

## EmbedWidget removal

Per instruction, the compost dedicated page does **not** render `EmbedWidget` at all.

Validation snapshot:
- Exported HTML search for `Embed this tool on your site` → **not present**

## JSON-LD validation

The final HTML contains 4 JSON-LD blocks, all parse successfully as JSON:
- SoftwareApplication
- HowTo
- FAQPage
- BreadcrumbList

Local parse result: **4/4 valid JSON-LD blocks**

## Lighthouse mobile comparison

### Baseline (Phase 0 live snapshot)
- Performance: **55.0**
- LCP: **11768.9 ms**
- CLS: **0.000**

### Current (local export preview, mobile Lighthouse, 3 runs)

Test URL:
- `http://127.0.0.1:3010/tools/compost-calculator.html`

Raw run files:
- `reports/lighthouse-phase3/compost-run1.json`
- `reports/lighthouse-phase3/compost-run2.json`
- `reports/lighthouse-phase3/compost-run3.json`

| Run | Performance | LCP (ms) | CLS |
|---|---:|---:|---:|
| 1 | 97 | 2035.692 | 0 |
| 2 | 98 | 1868.007 | 0 |
| 3 | 99 | 1760.941 | 0 |
| **Median** | **98** | **1868.007** | **0** |

### Result vs Phase 3 threshold
- Performance ≥ 85: **PASS** (median **98**)
- LCP ≤ 2.5s: **PASS** (median **1868.007 ms**)
- CLS ≤ 0.1: **PASS** (median **0**)

## LCP element trace

Required explicit trace note:

- **LCP element is** the quick-answer paragraph directly under the `Quick answer` label.
- Lighthouse trace evidence (run 2):
  - selector: `main.bg-gray-50 > div.max-w-5xl > section.mt-8 > p.mt-3`
  - snippet: `<p class="mt-3 text-sm leading-7 text-gray-700">`
  - nodeLabel: `If your real question is how much compost do I need, start with area and depth,…`

Interpretation:
- This confirms the page is no longer asking the browser to paint a heavy client-only calculator block as the main above-the-fold element.
- The LCP is now carried by a server-rendered text paragraph inside the quick-answer section, which is exactly the intended Phase 3 performance design.

## Local HTML validation snapshot

- Final title: `Compost Calculator | Bag, Volume & Area Guide`
- H1: `Compost Calculator`
- Pre-FAQ body word count: **2066**
- H2 count: **9**
- FAQ items: **6**
- JSON-LD block count: **4**
- `how much compost do I need` appears: **4**
- `C:N ratio` appears: **24**
- `compost for raised bed` appears: **4**
- `compost for lawn` appears: **4**
- `browns and greens` appears: **10**

## Implementation notes

- Compost now has a dedicated page at `app/tools/compost-calculator/page.tsx`
- Generic static generation now excludes both `fertilizer-calculator` and `compost-calculator`
- The quick-answer block was moved ahead of the calculator so the first meaningful paint is text-based
- The calculator remains available on the page, but the initial LCP is no longer tied to an embed or a bulky first-screen client widget
