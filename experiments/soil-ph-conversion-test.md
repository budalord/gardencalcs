# Soil pH Calculator — affiliate conversion experiment

## Experiment contract

- Experiment ID: `SOIL-PH-AFFILIATE-2026-07`
- Page: `https://gardencalcs.com/tools/soil-ph-calculator`
- Baseline captured: 2026-07-18 16:53:26 CST (UTC+08:00)
- Allowed intervention: one text-only affiliate recommendation module on this page
- Module title: `Optional tools that may help`
- Maximum links: 3
- Frozen pages: `/tools/seed-spacing-calculator` and `/tools/compost-calculator`
- Prohibited content: Amazon price, availability, rating, review count, or product image

## Pre-launch page structure

The live page was fetched before implementation and checked for shopping content:

- Page title: `Soil pH Calculator — Lime & Sulfur Lb per 100 Sq Ft`
- H1: `Soil pH Calculator`
- Existing Amazon mentions: 0
- Existing affiliate mentions: 0
- Existing `Optional tools that may help` modules: 0
- Existing shopping recommendation modules: 0
- Result card is followed by crop-specific guidance and the page method/content sections; no shopping recommendation is present.

## GSC baseline

- Source: Google Search Console Search Analytics API
- Property: `https://gardencalcs.com/`
- Window: 2026-06-19 through 2026-07-16, 28 final-data days
- Page filter: exact page URL above
- Page total: 34 clicks / 2,119 impressions / 1.6045% CTR / 7.1114 average position
- Privacy note: GSC exposes only a subset of page impressions at query level. Page totals and visible-query totals must not be mixed.

### Frozen conversion-relevant query cohort

| Query | Clicks | Impressions | CTR | Avg. position |
| --- | ---: | ---: | ---: | ---: |
| soil ph calculator | 1 | 38 | 2.6316% | 5.7895 |
| soil sulfur calculator | 1 | 3 | 33.3333% | 4.6667 |
| how much lime per square foot garden calculator | 0 | 1 | 0% | 1.0000 |
| how much lime to add to soil | 0 | 1 | 0% | 2.0000 |
| how much lime to raise ph 1 point | 0 | 1 | 0% | 1.0000 |
| how much lime to raise ph calculator | 0 | 8 | 0% | 4.5000 |
| how much sulfur to add to soil to lower ph | 0 | 1 | 0% | 3.0000 |
| how much sulfur to lower soil ph calculator | 0 | 22 | 0% | 8.7273 |
| how much sulfur to lower soil ph per square foot | 0 | 1 | 0% | 1.0000 |
| how to calculate soil ph | 0 | 2 | 0% | 21.5000 |
| how to lower soil ph | 0 | 1 | 0% | 6.0000 |
| lawn lime calculator | 0 | 7 | 0% | 56.5714 |
| lime application rate soil ph adjustment calculation | 0 | 1 | 0% | 22.0000 |
| reduce soil acidity | 0 | 1 | 0% | 6.0000 |
| soil ph adjustment calculator | 0 | 1 | 0% | 10.0000 |
| using sulfur to lower soil ph | 0 | 1 | 0% | 6.0000 |
| **Cohort total / weighted** | **2** | **90** | **2.2222%** | **10.6556** |

## Amazon compliance source check

- Amazon Associates Operating Agreement, section 5: requires `As an Amazon Associate I earn from qualifying purchases.` clearly and prominently on the site.
- Amazon Associates help: each affiliate link also needs a clear, conspicuous disclosure near the link.
- Associates Program Policies: Special Links must contain the Associate ID/tag assigned by Amazon; price and availability may be displayed only through Amazon-provided or approved API content.

## Launch record

- Associate ID/tag: `gardencalcs-20` (provided by the site owner on 2026-07-18)
- Tagged text-link destinations: Amazon search results for soil pH meters, garden lime, and elemental sulfur
- Production deployment: pending
- Custom-domain verification: pending

The experiment clock and outbound-click baseline do not start until tagged links render on the production custom domain.
