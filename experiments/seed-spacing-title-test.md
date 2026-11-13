---
kb_feed: 1
id: gardencalcs.exp.ss-title-2026-07-18
type: experiment
title: Seed spacing calculator HTML-title-only test (SS-TITLE-2026-07-18)
project: gardencalcs
pages: [/tools/seed-spacing-calculator]
hypothesis: A title phrased as the searcher's question ("How Far Apart to Plant Seeds?") raises CTR on the frozen query cohort
kb_points: [kp.title-change-judgement, kp.onpage-copy-one-keyword]
started: 2026-07-18
check_dates: [2026-08-01, 2026-08-15]
status: closed
result: inconclusive
closed_on: 2026-11-12
---

# Seed Spacing Calculator — title-only experiment

## Experiment contract

- Experiment ID: `SS-TITLE-2026-07-18`
- Page: `https://gardencalcs.com/tools/seed-spacing-calculator`
- Baseline captured: 2026-07-18 14:15:56 CST (UTC+08:00)
- Allowed intervention: HTML `<title>` only
- Frozen elements: H1, body copy, URL, internal links, meta description, and Open Graph title
- Evaluation hold: no effectiveness judgment, rollback, or additional change to this page before day 28
- Day-14 check: execution-rhythm audit only; it is not an experiment result check

## Rollback baseline

The following values were read from both the repository and the live page before this experiment change:

- HTML `<title>`: `Seed Spacing Calculator: Plant & Row Spacing Chart`
- Meta description: `Choose from 20 vegetables to see extension-cited plant and row spacing, then estimate rows, plants, and seed count for your garden bed.`
- Open Graph title: `Seed Spacing Calculator: Plant & Row Spacing Chart`
- Baseline title commit: `c1e6dde`, committed 2026-07-17 13:13:36 CST (UTC+08:00)
- Live baseline observed: 2026-07-18, before the experiment deployment

Rollback means removing the experiment-only `htmlTitle` override so the HTML title again resolves to the baseline `metaTitle`. Do not change any other field during rollback.

## GSC baseline

- Data source: Google Search Console Search Analytics API
- Property: `https://gardencalcs.com/`
- Window: 2026-06-19 through 2026-07-16, 28 final-data days
- Page filter: exact page URL above
- Page total: 6 clicks / 881 impressions / 0.6810% CTR / 7.5755 average position
- Privacy note: GSC exposed only 54 of the page's 881 impressions at query level. Page totals and visible-query totals therefore must not be mixed.

### Frozen relevant-query cohort

These are all semantically relevant query rows visible in the baseline export. Day 28 must query this exact cohort again.

| Query | Clicks | Impressions | CTR | Avg. position |
| --- | ---: | ---: | ---: | ---: |
| seed spacing calculator | 1 | 15 | 6.6667% | 7.5333 |
| corn plant spacing calculator | 0 | 5 | 0% | 34.4000 |
| corn planting spacing calculation | 0 | 3 | 0% | 10.3333 |
| corn seed spacing calculator | 0 | 2 | 0% | 6.0000 |
| row spacing calculator | 0 | 1 | 0% | 6.0000 |
| seed distance | 0 | 2 | 0% | 5.0000 |
| seed spacing | 0 | 3 | 0% | 17.6667 |
| seed spacing chart | 0 | 9 | 0% | 13.6667 |
| vegetable plant spacing calculator | 0 | 6 | 0% | 63.8333 |
| **Cohort total / weighted** | **1** | **46** | **2.1739%** | **19.6304** |

Visible rows excluded as noise: `da`, `garden cal`, `grow a garden calculator`, `grow garden calculator`, `oui`, `total seeds`, `what`, and `with control` (8 impressions total).

## Variant

- HTML `<title>`: `How Far Apart to Plant Seeds? Spacing Calculator (Inches)`
- Character count: 57
- Intent expressed: determine how far apart to plant seeds, in inches
- Meta description: unchanged
- H1/body/URL/internal links: unchanged
- Open Graph title: unchanged

## Attribution caveat recorded before launch

Commit `c1e6dde` changed this page on 2026-07-17, including its title, meta description, tagline, quick-reference content, crop count, calculator behavior, and internal content structure. Therefore the 2026-06-19 through 2026-07-16 GSC window does not describe the one-day baseline title in isolation. From this experiment's launch timestamp onward, the title is the only permitted additional change, but the day-28 report must retain this pre-existing confound and must not claim strict causality.

## Launch record

- Cloudflare `main` preview deployment completed: 2026-07-18 16:36:48 CST (UTC+08:00), deployment `29ff8cda-8724-4993-9c45-3f0eb90d1f53`
- Cloudflare `master` production deployment completed: 2026-07-18 16:37:05 CST (UTC+08:00), deployment `e6a9442e-06ef-4e24-a4f1-304f2cfc0a8b`
- Production Pages artifact verified: 2026-07-18 16:37:29 CST; HTTP 200 and variant HTML title present
- Custom-domain observation at 2026-07-18 16:38:12 CST: edge still served the prior cached HTML (`CF-Cache-Status: HIT`, `s-maxage=3600`). The API token lacks cache-purge permission. This is a delivery-cache delay, not a source or deployment failure; the experiment clock uses the production deployment completion above.
- Custom-domain production verified: 2026-07-19 03:33:20 CST (UTC+08:00); HTTP 200, variant HTML title present, and frozen meta description / Open Graph title unchanged (`CF-Cache-Status: EXPIRED`; `Age` absent).
- Day 0: 2026-07-18
- Day 14 rhythm check due: 2026-08-01 16:37 CST; automation `gardencalcs-14`
- Day 28 hold completes: 2026-08-15 16:37 CST
- GSC evaluation scheduled: 2026-08-18 10:00 CST; automation `gardencalcs-seed-spacing-28` (three-day allowance for GSC final-data lag)

## Day-28 decision rule

1. Use the 28 complete GSC days beginning on the production-verification date; if final GSC data is delayed, wait until all 28 dates are marked final.
2. Re-query the exact frozen cohort and report clicks, impressions, CTR, and impression-weighted position against the baseline table.
3. Separately report page-total clicks, impressions, CTR, and average position for context.
4. Answer only: CTR improved / did not improve. Also state whether impression or position movement makes the comparison less comparable.
5. If cohort CTR is not above 2.1739%, remove only `htmlTitle`, build, deploy, verify the baseline title, and record the rollback timestamp here. Do not stack another change.

> **Rule 5 voided on 2026-11-12; the variant title stays.** Reasons, from GSC 2026-06-01 to 2026-08-31: (1) CTR is driven by position, and this page's daily position moved between 4.9 and 17.8, so a before/after CTR comparison mostly compares two position periods; (2) the sample is too small: the page family had 3,582 impressions and 23 clicks in 92 days, and at roughly 59 cohort impressions per 28 days, 1.49% versus 2.17% is less than half a click; (3) commit `c1e6dde` changed the page body the day before launch; (4) the 2.17% threshold is above the normal CTR for this position range (about 0.5–1%), so the rule would trigger a rollback whatever the title. Future title tests require all four: a 28-day average position stable in the top 5, at least 1,000 impressions in that window, no body, internal-link or backlink changes during the window, and a parallel control page on the site instead of a before/after comparison on the same page.


## Day-28 result (evaluated late, 2026-11-12)

The day-28 check due 2026-08-15 was not run on time. It was run on 2026-11-12 18:35 PST from the GSC Search Analytics API (`dataState: final`, property `https://gardencalcs.com/`, exact page filter). Both windows are final data, so the ~2-day GSC lag does not apply.

- Before: 2026-06-19 to 2026-07-16 (28 days; the frozen baseline above).
- After: 2026-07-19 to 2026-08-15 (28 days from the production-verification date).

### Method

Compare the same query in the same country, before and after, on position, impressions and clicks. Use the week-to-week spread of the four pre-change weeks as the noise band:

- position, impressions and clicks all improve beyond the band → supported;
- all three stay within the band (click difference within weekly spread, average-position difference under 1) → inconclusive;
- a clear decline → not supported.

### Page totals (all countries)

| Window | Clicks | Impressions | CTR | Avg. position |
| --- | ---: | ---: | ---: | ---: |
| Before | 6 | 881 | 0.68% | 7.58 |
| After | 4 | 1,033 | 0.39% | 9.00 |

Weekly noise band (before, all countries):

| | Week 1 | Week 2 | Week 3 | Week 4 | Band |
| --- | --- | --- | --- | --- | --- |
| Clicks | 1 | 3 | 0 | 2 | 0–3 |
| Impressions | 145 | 246 | 241 | 249 | 145–249 |
| Avg. position | 8.34 | 8.38 | 7.10 | 6.80 | 6.80–8.38 |

After, weekly: clicks 1 / 2 / 0 / 1; impressions 228 / 239 / 323 / 243; position 7.36 / 8.74 / 9.57 / 10.01.

### Primary query, same country (USA)

| Query | Window | Clicks | Impressions | Avg. position |
| --- | --- | ---: | ---: | ---: |
| seed spacing calculator | Before | 1 | 12 | 8.50 |
| seed spacing calculator | After | 0 | 14 | 11.36 |

### Frozen cohort

- All countries: before 1 click / 46 impressions / weighted position 19.63 (CTR 2.17%); after 1 / 67 / 11.06 (CTR 1.49%).
- USA only: before 1 / 33 / 23.88; after 0 / 39 / 13.31.
- The cohort's position "improvement" is mostly a composition change: `vegetable plant spacing calculator` (position ~64) fell from 6 impressions to 2, and `corn planting spacing calculation` and `row spacing calculator` dropped out.

### Judgment: inconclusive

1. **Clicks:** a change of 2 over 28 days is inside the weekly spread of 0–3.
2. **Impressions:** rose 17%, but only one post week (323) is outside the band.
3. **Position:** page-level position worsened by 1.4 (7.58 → 9.00), and the last two post weeks fall outside the band. On the primary query in the USA it moved from 8.5 to 11.4, but on 12 and 14 impressions.
4. **Thin country data:** country-level rows cover only a small share of the page's impressions (USA 34 of 881 before, 50 of 1,033 after), so a same-query, same-country comparison rests on very few impressions.
5. **Low volume:** 881 impressions and 6 clicks in 28 days is far below the volume at which title changes can be judged reliably.
6. **Confound:** commit `c1e6dde` (2026-07-17) changed this page's meta description, body, crop count and calculator the day before launch, as recorded above and in the day-14 audit. The movement cannot be attributed to the title.

**Next step:** no further title work on this page. With impressions but few clicks at an average position around 8–9, the next lever is ranking, so this page moves to the backlink target list. Rule 5 would have called for removing `htmlTitle` (cohort CTR 1.49% is not above 2.1739%), but the rule was voided on 2026-11-12 (see the note under the decision rule). The variant title stays unchanged until backlink work begins in December.
