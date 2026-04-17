# Phase 1 Changes

## Scope

Phase 1 updates the three P0 pages only:
- `/tools/soil-ph-calculator`
- `/tools/seed-spacing-calculator`
- `/tools/watering-schedule-calculator`

No calculator business logic was changed.

---

## /tools/soil-ph-calculator

- Old title: `Soil pH Calculator | Garden Tools Hub`
- New title: `Soil pH Calculator Free | Lime, Sulfur & pH Chart`
- Old meta: `Calculate how much lime or sulfur you need to reach your target soil pH.`
- New meta: `Soil pH calculator with vegetable pH chart, lime and sulfur estimates, plus FAQ answers that help you adjust beds with fewer mistakes`
- Quick answer sources:
  - https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf
  - https://extension.psu.edu/understanding-soil-ph/
  - https://extension.msstate.edu/lawn-and-garden/vegetable-gardens/test-soil-find-its-ph-value

### FAQ questions + PAA sources
1. `Do cheap soil pH testers work?`
   - source query: `soil ph calculator`
   - source URL: https://www.instrumentchoice.com.au/blogs/news/are-cheap-ph-testers-accurate
2. `What soil pH do most vegetables prefer?`
   - source query: `ideal soil ph for vegetables`
   - source URL: https://digitalcommons.unl.edu/cgi/viewcontent.cgi?article=2011&context=extensionhist
3. `Do tomatoes and cucumbers like acidic soil?`
   - source query: `ideal soil ph for vegetables`
   - source URL: https://westlandseed.com/soil-ph-growing-vegetables/
4. `Is 7.5 pH good for a vegetable garden?`
   - source query: `ideal soil ph for vegetables`
   - source URL: https://extension.msstate.edu/lawn-and-garden/vegetable-gardens/test-soil-find-its-ph-value
5. `What do you do if your soil pH is too low?`
   - source query: `how to raise soil ph`
   - source URL: https://rocklandcce.org/resources/correcting-soil-ph
6. `How much baking soda should I use to raise soil pH?`
   - source query: `how to raise soil ph`
   - source URL: https://kellogggarden.com/blog/soil/how-to-organically-raise-ph-in-soil/

---

## /tools/seed-spacing-calculator

- Old title: `Seed Spacing Calculator | Garden Tools Hub`
- New title: `Seed Spacing Calculator | By Crop, Chart & Examples`
- Old meta: `Calculate recommended row spacing, plant spacing, and total seed count for your garden.`
- New meta: `Seed spacing calculator with row spacing, plant spacing, raised-bed examples, and FAQ answers so you can plan vegetable beds with less crowding`
- Quick answer sources:
  - https://extension.uga.edu/content/dam/extension-county-offices/gwinnett-county/anr/homeshow-resources/Vegetable%20Planting%20Chart.pdf
  - https://cmg.extension.colostate.edu/Gardennotes/721.pdf
  - https://content.ces.ncsu.edu/extension-gardener-handbook/16-vegetable-gardening

### FAQ questions + PAA sources
1. `What is the difference between plant spacing and row spacing?`
   - source query: `row spacing vs plant spacing`
   - source URL: https://www.reddit.com/r/gardening/comments/ihltqr/why_are_there_different_values_for_row_spacing/
2. `What is row spacing in plants?`
   - source query: `row spacing vs plant spacing`
   - source URL: https://brainly.in/question/61288027
3. `How close can you plant vegetables to each other?`
   - source query: `how close together can you plant vegetables`
   - source URL: https://home.howstuffworks.com/vegetable-spacing-guide.htm
4. `What happens if I plant my vegetables too close together?`
   - source query: `how close together can you plant vegetables`
   - source URL: https://www.marthastewart.com/vegetables-to-never-plant-together-8425391
5. `Can I plant seeds directly in raised beds?`
   - source query: `seed spacing for raised beds`
   - source URL: https://www.almanac.com/direct-sowing-made-easy-beginners-guide-planting-seeds-outdoors
6. `How many plants can I fit in a raised bed?`
   - source query: `how many plants fit in a raised bed`
   - source URL: https://yardandgarden.extension.iastate.edu/how-to/how-determine-plant-quantity-planting-beds

---

## /tools/watering-schedule-calculator

- Old title: `Watering Schedule Calculator | Garden Tools Hub`
- New title: `Watering Schedule Calculator | Weekly Chart & FAQ`
- Old meta: `Get a personalized watering schedule based on your plant, soil, season, and growing method.`
- New meta: `Watering schedule calculator with weekly vegetable watering chart, frequency examples, and FAQ answers so you can water beds more consistently`
- Quick answer sources:
  - https://extension.umn.edu/how/watering-vegetable-garden
  - https://extension.usu.edu/yardandgarden/research/water-recommendations-for-vegetables
  - https://aggie-horticulture.tamu.edu/wp-content/uploads/sites/10/2013/09/eht_024_watering_your_vegetables.pdf

### FAQ questions + PAA sources
1. `Should you water your lawn in October?`
   - source query: `watering schedule calculator`
   - source URL: https://www.southernliving.com/when-should-you-stop-watering-your-yard-in-fall-11788029
2. `Is 4 a.m. too early to start a sprinkler for a lawn?`
   - source query: `watering schedule calculator`
   - source URL: https://www.neavegroup.com/blog/irrigation/when-is-the-best-time-to-water-your-lawn/
3. `What vegetables need to be watered every day?`
   - source query: `how often should i water my vegetable garden`
   - source URL: https://www.finegardening.com/article/how-much-water-does-my-vegetable-garden-need
4. `Do vegetables have to be watered every day?`
   - source query: `how often should i water my vegetable garden`
   - source URL: https://smartwateradvice.org/how-to-save-water/garden/when-to-water/
5. `Can vegetable plants get too much water?`
   - source query: `how often should i water my vegetable garden`
   - source URL: https://gardeningsolutions.ifas.ufl.edu/plants/edibles/vegetables/watering-the-vegetable-garden/
6. `How many times a week should I water my vegetables?`
   - source query: `how much water do vegetables need per week`
   - source URL: https://ucanr.edu/blog/over-fence-alameda-county/article/watering-vegetables-basics

---

## Local export validation

Validated against generated HTML in `out/tools/*.html`:

- soil-ph-calculator
  - title length: 53
  - meta length: 133
  - FAQ `<h3>` count: 9
  - `application/ld+json` count: 8
  - `FAQPage` present: yes
  - `<table>` after `<h1>`: yes
  - internal `/guides/` or `/tools/` links in HTML: 14
- seed-spacing-calculator
  - title length: 55
  - meta length: 143
  - FAQ `<h3>` count: 9
  - `application/ld+json` count: 8
  - `FAQPage` present: yes
  - `<table>` after `<h1>`: yes
  - internal `/guides/` or `/tools/` links in HTML: 14
- watering-schedule-calculator
  - title length: 53
  - meta length: 142
  - FAQ `<h3>` count: 6
  - `application/ld+json` count: 8
  - `FAQPage` present: yes
  - `<table>` after `<h1>`: yes
  - internal `/guides/` or `/tools/` links in HTML: 14
