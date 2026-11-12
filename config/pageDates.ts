// For each page, use the latest date from `git log -1 --format=%cs -- <rendering files>`.
// When page content changes in the future, manually update its date to the change date.
// When adding /tools/raised-bed-soil-calculator, /tools/soil-calculator, or /tools/mulch-calculator,
// register the new route here at the same time it is added to the sitemap.
const SEED_SPACING_CROP_PAGES_UPDATED_AT = "2026-07-17";
const SOIL_PH_CROP_PAGES_UPDATED_AT = "2026-07-17";

export const pageUpdatedAt: Record<string, string> = {
  "/": "2026-07-18",
  "/tools": "2026-07-17",
  "/guides": "2026-07-17",
  "/embed": "2026-07-17",
  "/answers/how-much-compost-for-raised-bed": "2026-07-17",

  "/tools/compost-calculator": "2026-11-11",
  "/tools/watering-schedule-calculator": "2026-11-11",
  "/tools/soil-calculator": "2026-11-11",
  "/tools/soil-ph-calculator": "2026-07-18",
  "/tools/seed-spacing-calculator": "2026-07-18",
  "/tools/fertilizer-calculator": "2026-07-17",

  "/tools/seed-spacing/tomato": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/lettuce": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/carrot": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/pepper": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/cucumber": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/broccoli": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/bush-bean": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/sweet-corn": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/spinach": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/kale": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/onion": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/radish": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/beet": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/zucchini": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/potato": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/garlic": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/pea": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/cabbage": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/cauliflower": SEED_SPACING_CROP_PAGES_UPDATED_AT,
  "/tools/seed-spacing/swiss-chard": SEED_SPACING_CROP_PAGES_UPDATED_AT,

  "/tools/soil-ph/tomato": SOIL_PH_CROP_PAGES_UPDATED_AT,
  "/tools/soil-ph/blueberry": SOIL_PH_CROP_PAGES_UPDATED_AT,
  "/tools/soil-ph/lettuce": SOIL_PH_CROP_PAGES_UPDATED_AT,
  "/tools/soil-ph/potato": SOIL_PH_CROP_PAGES_UPDATED_AT,
  "/tools/soil-ph/carrot": SOIL_PH_CROP_PAGES_UPDATED_AT,
  "/tools/soil-ph/pepper": SOIL_PH_CROP_PAGES_UPDATED_AT,
  "/tools/soil-ph/cucumber": SOIL_PH_CROP_PAGES_UPDATED_AT,
  "/tools/soil-ph/spinach": SOIL_PH_CROP_PAGES_UPDATED_AT,
  "/tools/soil-ph/strawberry": SOIL_PH_CROP_PAGES_UPDATED_AT,
  "/tools/soil-ph/cabbage": SOIL_PH_CROP_PAGES_UPDATED_AT,

  "/grow/tomato": "2026-07-17",
  "/guides/how-to-fertilize-vegetable-garden": "2026-05-07",
  "/guides/understanding-soil-ph": "2026-05-07",
  "/guides/composting-guide": "2026-11-11",
  "/data/npk-rates-by-crop": "2026-11-11",
  "/data/compost-cn-ratios": "2026-11-11",
  "/about": "2026-07-18",
  "/privacy": "2026-07-18",
  "/affiliate-disclosure": "2026-07-18",
  "/contact": "2026-05-23",
};
