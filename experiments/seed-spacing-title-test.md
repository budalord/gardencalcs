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
