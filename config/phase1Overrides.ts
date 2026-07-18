import {
  popularSeedSpacingCropTableRows,
  seedSpacingCropLinks,
  seedSpacingCrops,
  seedSpacingCropTableRows,
} from "@/config/seedSpacingCrops";
import { soilPHCropLinks } from "@/config/soilPHCrops";
import type { Tool, ToolQuickAnswer } from "@/config/tools";

type LinkedQuickAnswer = ToolQuickAnswer & {
  rowHrefs?: Array<string | undefined>;
};

type ToolOverride = Omit<Partial<Tool>, "quickAnswer"> & {
  quickAnswer?: LinkedQuickAnswer;
  deferredQuickAnswer?: LinkedQuickAnswer;
};

const seedSpacingSourceHtml =
  'Sources: <a href="https://extension.uga.edu/content/dam/extension-county-offices/gwinnett-county/anr/homeshow-resources/Vegetable%20Planting%20Chart.pdf">UGA Cooperative Extension planting chart</a>; <a href="https://cmg.extension.colostate.edu/Gardennotes/721.pdf">Colorado State Extension raised-bed planting guide</a>; <a href="https://content.ces.ncsu.edu/extension-gardener-handbook/16-vegetable-gardening">NC State Extension vegetable gardening handbook</a>; <a href="https://extension.umn.edu/vegetables">University of Minnesota Extension vegetable guides</a>.';

export const phase1Overrides: Record<string, ToolOverride> = {
  "soil-ph-calculator": {
    tagline: "Check target garden pH, compare crop ranges, and estimate lime or sulfur with a quick chart.",
    metaTitle: "Soil pH Calculator — Lime & Sulfur Lb per 100 Sq Ft",
    metaDescription: "Enter current pH, target pH, and bed size — get exact pounds of lime or sulfur per 100 sq ft. 12 crop pH targets, split-application warning, extension-cited. No signup.",
    quickAnswer: {
      definition: "Use your soil test, crop target, and soil type to estimate lime or sulfur before planting.",
      recommendation: "Most vegetables grow best near pH 6.0–7.0; make moderate changes, spread amendments evenly, and retest after a few months.",
      columns: ["Crop", "Ideal pH range"],
      rows: [
        ["Tomato", "6.0–6.8"],
        ["Pepper", "6.0–6.8"],
        ["Lettuce", "6.0–7.0"],
        ["Carrot", "6.0–6.8"],
        ["Cucumber", "6.0–7.0"],
        ["Potato", "4.8–5.5"],
        ["Blueberry", "4.5–5.5"],
        ["Strawberry", "5.5–6.5"],
      ],
      rowHrefs: [
        "/tools/soil-ph/tomato",
        "/tools/soil-ph/pepper",
        "/tools/soil-ph/lettuce",
        "/tools/soil-ph/carrot",
        "/tools/soil-ph/cucumber",
        "/tools/soil-ph/potato",
        "/tools/soil-ph/blueberry",
        "/tools/soil-ph/strawberry",
      ],
      sourceHtml:
        'Sources: <a href="https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf">University of Maryland Extension vegetable pH table</a>; <a href="https://extension.psu.edu/understanding-soil-ph/">Penn State Extension soil pH guide</a>; <a href="https://extension.msstate.edu/lawn-and-garden/vegetable-gardens/test-soil-find-its-ph-value">Mississippi State Extension vegetable garden pH guide</a>.',
    },
    faqs: [
      {
        q: "Do cheap soil pH testers work?",
        a: "Basic soil pH meters and strips can tell you whether soil is generally acidic, neutral, or alkaline, but they are not as reliable as a university lab test. Use a cheap tester for quick checks between seasons, then confirm big lime or sulfur decisions with an extension soil report before making large corrections.",
        displayHtml: "Basic soil pH meters and strips can tell you whether soil is generally acidic, neutral, or alkaline, but they are not as reliable as a university lab test. Use a cheap tester for quick checks between seasons, then confirm big lime or sulfur decisions with an extension soil report before making large corrections. For a deeper walkthrough, read our <a href=\"/guides/understanding-soil-ph\">beginner soil pH guide</a> before applying amendments.",
        sourceQuery: "soil ph calculator",
        sourceUrl: "https://www.instrumentchoice.com.au/blogs/news/are-cheap-ph-testers-accurate",
      },
      {
        q: "What soil pH do most vegetables prefer?",
        a: "Most vegetables perform best in slightly acidic to neutral soil, usually around pH 6.0 to 7.0. That range keeps phosphorus and most micronutrients more available while avoiding strong acidity stress. Crops such as potatoes prefer a lower range, while blueberries need distinctly more acidic soil than a typical vegetable bed.",
        sourceQuery: "ideal soil ph for vegetables",
        sourceUrl: "https://digitalcommons.unl.edu/cgi/viewcontent.cgi?article=2011&context=extensionhist",
      },
      {
        q: "Do tomatoes and cucumbers like acidic soil?",
        a: "Tomatoes and cucumbers usually do well in slightly acidic soil, but not strongly acidic soil. A practical target is the mid-sixes, where nutrient uptake stays balanced and roots grow steadily. If your soil is below about 5.8, test first and correct gradually instead of dumping a large amount of lime at once.",
        sourceQuery: "ideal soil ph for vegetables",
        sourceUrl: "https://westlandseed.com/soil-ph-growing-vegetables/",
      },
      {
        q: "Is 7.5 pH good for a vegetable garden?",
        a: "A pH of 7.5 is slightly alkaline and can still grow vegetables, but some nutrients become less available as pH climbs. Iron and manganese shortages show up sooner in alkaline soils. If you are growing most vegetables, a somewhat lower target usually gives you a wider safety margin than leaving the bed at 7.5.",
        sourceQuery: "ideal soil ph for vegetables",
        sourceUrl: "https://extension.msstate.edu/lawn-and-garden/vegetable-gardens/test-soil-find-its-ph-value",
      },
      {
        q: "What do you do if your soil pH is too low?",
        a: "If soil pH is too low, the usual correction is agricultural lime or garden lime applied at a rate that matches the pH gap, soil texture, and bed size. Work it into the top layer if possible, water it in, and retest later. Large corrections are safer when split across more than one application.",
        sourceQuery: "how to raise soil ph",
        sourceUrl: "https://rocklandcce.org/resources/correcting-soil-ph",
      },
      {
        q: "How much baking soda should I use to raise soil pH?",
        a: "Baking soda is not the standard way to raise garden soil pH because sodium can accumulate and harm soil structure over time. For beds, extension guidance favors lime because it raises pH more predictably and does not create the same sodium problem. Use baking soda for a quick test only, not as your main amendment plan.",
        sourceQuery: "how to raise soil ph",
        sourceUrl: "https://kellogggarden.com/blog/soil/how-to-organically-raise-ph-in-soil/",
      },
      {
        q: "How much lime do I need per square foot?",
        a: "Lime is normally rated per 100 square feet, not per single square foot. As a home-garden guide, loam soil needs roughly 5 pounds of lime per 100 square feet to raise pH by one full point — about 0.05 pound per square foot. Sandy soil needs less (around 3 pounds per 100 square feet) and clay needs more (around 8 pounds). For a lawn, the same rates apply per 100 square feet, so a 1,000 square foot lawn needs roughly ten times those amounts. Enter your bed or lawn size above and the calculator converts the rate to a total for your exact area.",
        displayHtml: "Lime is normally rated per 100 square feet, not per single square foot. As a home-garden guide, loam soil needs roughly 5 pounds of lime per 100 square feet to raise pH by one full point — about 0.05 pound per square foot. Sandy soil needs less (around 3 pounds per 100 square feet) and clay needs more (around 8 pounds). For a lawn, the same rates apply per 100 square feet, so a 1,000 square foot lawn needs roughly ten times those amounts. Enter your bed or lawn size above and the calculator converts the rate to a total for your exact area.",
        sourceQuery: "how much lime per square foot",
        sourceUrl: "https://extension.psu.edu/understanding-soil-ph/",
      },
    ],
    internalLinks: [
      ...soilPHCropLinks,
      {
        href: "/guides/understanding-soil-ph",
        anchor: "See the beginner soil pH chart",
        description: "Review crop ranges, testing methods, and common amendment mistakes before you spread lime or sulfur.",
      },
      {
        href: "/tools/fertilizer-calculator",
        anchor: "Plan fertilizer after pH correction",
        description: "Check nutrient timing once the bed is back in a crop-friendly pH range.",
      },
      {
        href: "/guides/how-to-fertilize-vegetable-garden",
        anchor: "Match feeding to the new pH range",
        description: "Use a simple NPK plan after your soil test and pH adjustment are aligned.",
      },
      {
        href: "/tools/seed-spacing-calculator",
        anchor: "Lay out crops after fixing the bed",
        description: "Move from soil prep to row and plant spacing once the planting area is ready.",
      },
      {
        href: "/tools/compost-calculator",
        anchor: "Check compost balance before amending",
        description: "Estimate finished volume or screen equal-volume brown and green parts if compost is part of your soil improvement plan.",
      },
    ],
  },
  "seed-spacing-calculator": {
    tagline: "Plan rows and estimate plant and seed counts with extension-cited plant spacing, row spacing, and seed depth for 20 home-garden crops.",
    htmlTitle: "How Far Apart to Plant Seeds? Spacing Calculator (Inches)",
    metaTitle: "Seed Spacing Calculator: Plant & Row Spacing Chart",
    metaDescription: "Choose from 20 vegetables to see extension-cited plant and row spacing, then estimate rows, plants, and seed count for your garden bed.",
    quickAnswer: {
      definition: "Use row spacing, plant spacing, and seed depth together so each crop gets enough light, airflow, and root room as it matures.",
      recommendation: "These five popular crops are a quick reference. Choose any of the 20 crops in the calculator, then use the complete chart below it for seed depth and spacing.",
      columns: ["Crop", "Row × Plant", "Seed depth"],
      rows: popularSeedSpacingCropTableRows,
    },
    deferredQuickAnswer: {
      definition: "The calculator and all 20 crop guides use this same extension-cited spacing dataset, so the chart stays consistent with the selected crop and result.",
      recommendation: "Treat these as home-garden baselines. Variety, support method, harvest stage, and local disease pressure can justify more room; follow the linked crop guide when you need that context.",
      columns: ["Crop", "Row × Plant", "Seed depth"],
      rows: seedSpacingCropTableRows,
      rowHrefs: seedSpacingCrops.map((crop) => `/tools/seed-spacing/${crop.slug}`),
      sourceHtml: seedSpacingSourceHtml,
    },
    howToSteps: [
      "Select one of the 20 vegetables from the crop list.",
      "Use Length × Width for a real rectangular bed, or Total area for a square estimate when dimensions are unknown.",
      "Enter the bed dimensions and choose Plan the bed.",
      "Review the number of rows, plants per row, plant count, and 15% seed buffer.",
      "Check the complete plant and row spacing chart below the calculator before final planting.",
    ],
    faqs: [
      {
        q: "What is the difference between plant spacing and row spacing?",
        a: "Plant spacing is the distance between neighboring plants within a row, while row spacing is the distance between one planted row and the next. Growers use both numbers together because each one changes airflow, cultivation access, and the final plant population in a bed or field. Using only one of the two leads to crowding mistakes.",
        displayHtml: "Plant spacing is the distance between neighboring plants within a row, while row spacing is the distance between one planted row and the next. Growers use both numbers together because each one changes airflow, cultivation access, and the final plant population in a bed or field. Using only one of the two leads to crowding mistakes. If you are planning tomatoes or peppers next, pair this with our <a href=\"/tools/watering-schedule-calculator\">vegetable watering schedule calculator</a> so spacing and irrigation stay aligned.",
        sourceQuery: "site:.edu extension row spacing plant spacing vegetables",
        sourceUrl: "https://extension.usu.edu/vegetableguide/leafy-greens/planting-spacing",
      },
      {
        q: "What is row spacing in plants?",
        a: "Row spacing is the measured width from the center of one planted row to the center of the next row. It is set wide enough for light, airflow, cultivation, and harvest access, but narrow enough to use bed space efficiently. The right row spacing changes with crop size, planting method, and whether you need room for tools between rows.",
        sourceQuery: "site:.edu extension row spacing plant spacing vegetables",
        sourceUrl: "https://www.uvm.edu/vtvegandberry/factsheets/rowspacing.html",
      },
      {
        q: "How close can you plant vegetables to each other?",
        a: "Vegetables can be planted closer than field spacing in some raised beds, but only up to the point where leaf canopies still dry quickly and roots have enough room. Leafy crops tolerate tighter spacing better than fruiting crops. The safer baseline is still the extension row-and-plant chart, then adjust carefully from there.",
        sourceQuery: "how close together can you plant vegetables",
        sourceUrl: "https://home.howstuffworks.com/vegetable-spacing-guide.htm",
      },
      {
        q: "What happens if I plant my vegetables too close together?",
        a: "When vegetables are crowded, they compete sooner for light, water, and nutrients, and the bed stays wetter for longer after irrigation or rain. That often means smaller heads, fewer fruiting branches, and more disease pressure. Crowding can look efficient at planting time but usually lowers harvest quality by mid-season.",
        sourceQuery: "how close together can you plant vegetables",
        sourceUrl: "https://www.marthastewart.com/vegetables-to-never-plant-together-8425391",
      },
      {
        q: "Can I plant seeds directly in raised beds?",
        a: "Yes, direct sowing in raised beds works well for crops such as carrots, radishes, lettuce, spinach, and beans. The main caution is that raised beds often drain and warm faster than in-ground plots, so you should keep the seed zone evenly moist while germination is happening and avoid squeezing rows too close together.",
        sourceQuery: "seed spacing for raised beds",
        sourceUrl: "https://www.almanac.com/direct-sowing-made-easy-beginners-guide-planting-seeds-outdoors",
      },
      {
        q: "How many plants can I fit in a raised bed?",
        a: "That depends on the crop, bed dimensions, and whether the spacing is traditional or intensive. Count how many rows fit first, then how many plants fit inside each row using the in-row spacing. Beds almost always hold fewer large fruiting crops than gardeners expect, which is why a spacing chart saves so much rework.",
        sourceQuery: "how many plants fit in a raised bed",
        sourceUrl: "https://yardandgarden.extension.iastate.edu/how-to/how-determine-plant-quantity-planting-beds",
      },
      {
        q: "How far apart should I plant tomatoes in a raised bed?",
        a: "In a raised bed, space tomato plants about 24 inches apart within the row and keep rows about 36 inches apart — the same spacing used for in-ground beds. Crowding tomatoes is one of the most common raised-bed mistakes because it cuts airflow and raises disease pressure. In a 4 ft by 8 ft bed that usually means a single staggered row of roughly four plants rather than a dense grid. Staked or determinate types can sometimes go a little tighter, but airflow should still be the deciding factor.",
        displayHtml: "In a raised bed, space tomato plants about 24 inches apart within the row and keep rows about 36 inches apart — the same spacing used for in-ground beds. Crowding tomatoes is one of the most common raised-bed mistakes because it cuts airflow and raises disease pressure. In a 4 ft by 8 ft bed that usually means a single staggered row of roughly four plants rather than a dense grid. Staked or determinate types can sometimes go a little tighter, but airflow should still be the deciding factor. Pair this with our <a href=\"/tools/soil-ph-calculator\">soil pH calculator</a> to get the bed chemistry right before transplanting.",
        sourceQuery: "tomato spacing raised bed",
        sourceUrl: "https://extension.umn.edu/vegetables/growing-tomatoes",
      },
    ],
    internalLinks: seedSpacingCropLinks,
  },
  "watering-schedule-calculator": {
    tagline: "Estimate net weekly irrigation in inches and gallons by crop, soil, season, growing method, bed area, and recent rainfall.",
    metaTitle: "Watering Schedule Calculator — Weekly Gallons by Crop",
    metaDescription: "Estimate weekly garden irrigation in gallons using crop, soil, season, bed or container area, growing method, and recent rainfall.",
    quickAnswer: {
      definition: "Summer baseline for established crops in loamy, in-ground beds before rainfall. The calculator opens with these same soil, season, and growing-method settings.",
      recommendation: "Use the weekly depth as a starting target, subtract measured rainfall, and check soil moisture before running the remaining irrigation sessions.",
      columns: ["Crop", "Summer frequency", "Weekly target"],
      rows: [
        ["Tomato", "2× / week", "1.0 in"],
        ["Pepper", "2× / week", "1.0 in"],
        ["Cucumber", "2× / week", "1.0 in"],
        ["Lettuce", "2× / week", "1.0 in"],
        ["Carrot", "2× / week", "1.0 in"],
        ["Basil", "2× / week", "1.0 in"],
        ["Strawberry", "2× / week", "1.0 in"],
        ["Blueberry", "2× / week", "1.0 in"],
      ],
      sourceHtml:
        'Sources: <a href="https://extension.umn.edu/how/watering-vegetable-garden">UMN Extension watering the vegetable garden</a>; <a href="https://extension.usu.edu/yardandgarden/research/water-recommendations-for-vegetables">USU Extension water recommendations for vegetables</a>; <a href="https://aggie-horticulture.tamu.edu/wp-content/uploads/sites/10/2013/09/eht_024_watering_your_vegetables.pdf">Texas A&M Easy Gardening watering guide</a>.',
    },
    howToSteps: [
      "Select the crop, soil type, season, and growing method.",
      "Enter the bed or container surface area that receives water.",
      "Enter rainfall already received during the current week.",
      "Choose Build the schedule to subtract rainfall from the weekly target and convert the remaining depth to US gallons.",
      "Use the suggested sessions as a starting rhythm, then check soil moisture before irrigating.",
    ],
    faqs: [
      {
        q: "Should you water your lawn in October?",
        a: "Sometimes, yes, but only if the soil is dry and the weather is still warm enough for active growth. For vegetable beds, the better lesson is seasonal adjustment: watering needs drop as temperatures and evapotranspiration fall. A fixed summer schedule usually becomes too aggressive in cool autumn weather.",
        sourceQuery: "watering schedule calculator",
        sourceUrl: "https://www.southernliving.com/when-should-you-stop-watering-your-yard-in-fall-11788029",
      },
      {
        q: "Is 4 a.m. too early to start a sprinkler for a lawn?",
        a: "No—very early morning is usually the best watering window because wind is lower and leaves can dry after sunrise. The same principle applies to vegetable beds: early watering reduces evaporation and lowers disease pressure compared with evening irrigation. What matters most is watering before heat builds, not waiting for midday.",
        sourceQuery: "watering schedule calculator",
        sourceUrl: "https://www.neavegroup.com/blog/irrigation/when-is-the-best-time-to-water-your-lawn/",
      },
      {
        q: "What vegetables need to be watered every day?",
        a: "Very few in-ground vegetables need daily watering once established. Daily checks are common in containers, seedling trays, and very sandy beds, but most mature vegetables do better with deeper, less frequent watering. If the surface dries quickly, confirm moisture a bit deeper before assuming the crop needs another full irrigation cycle.",
        sourceQuery: "how often should i water my vegetable garden",
        sourceUrl: "https://www.finegardening.com/article/how-much-water-does-my-vegetable-garden-need",
      },
      {
        q: "Do vegetables have to be watered every day?",
        a: "No. Most vegetable gardens are managed by total weekly water, usually around one to two inches from rain plus irrigation, not by a daily rule. The right schedule depends on soil texture, heat, and rooting depth. Daily watering can leave roots shallow and keep foliage damp longer than necessary.",
        displayHtml: "No. Most vegetable gardens are managed by total weekly water, usually around one to two inches from rain plus irrigation, not by a daily rule. The right schedule depends on soil texture, heat, and rooting depth. Daily watering can leave roots shallow and keep foliage damp longer than necessary. If your bed is also due for planting, pair this with our <a href=\"/tools/seed-spacing-calculator\">row and plant spacing guide</a> so crowded beds do not stay wet after each session.",
        sourceQuery: "how often should i water my vegetable garden",
        sourceUrl: "https://smartwateradvice.org/how-to-save-water/garden/when-to-water/",
      },
      {
        q: "Can vegetable plants get too much water?",
        a: "Yes. Overwatering drives oxygen out of the root zone, encourages root problems, and can cause yellow leaves, slow growth, or split fruit. Plants that are watered too often may also become more disease-prone because leaves, mulch, and the soil surface stay wet for too long between sun and airflow cycles.",
        sourceQuery: "how often should i water my vegetable garden",
        sourceUrl: "https://gardeningsolutions.ifas.ufl.edu/plants/edibles/vegetables/watering-the-vegetable-garden/",
      },
      {
        q: "How many times a week should I water my vegetables?",
        a: "That depends on the crop and soil, but many established beds land somewhere between one and three deep sessions per week. Sandy soils often need the higher end, while heavier soils can hold moisture longer. A weekly target plus a soil-moisture check is more dependable than copying the same number of sessions for every bed.",
        sourceQuery: "how much water do vegetables need per week",
        sourceUrl: "https://ucanr.edu/blog/over-fence-alameda-county/article/watering-vegetables-basics",
      },
    ],
    internalLinks: [
      {
        href: "/grow/tomato",
        anchor: "Use the full tomato watering context",
        description: "See how watering fits with tomato planting, soil preparation, spacing, feeding, disease prevention, and harvest timing.",
      },
      {
        href: "/guides/understanding-soil-ph",
        anchor: "Check soil conditions before irrigating harder",
        description: "A pH problem can look like drought stress, so confirm chemistry before you add more water.",
      },
      {
        href: "/tools/soil-ph-calculator",
        anchor: "Rule out pH stress before more watering",
        description: "Use a soil test and pH estimate if leaves stay off-color even with steady irrigation.",
      },
      {
        href: "/tools/seed-spacing-calculator",
        anchor: "Use spacing to improve airflow",
        description: "Overcrowded beds stay wet longer, so row spacing and irrigation belong in the same planning pass.",
      },
      {
        href: "/guides/how-to-fertilize-vegetable-garden",
        anchor: "Coordinate feeding with watering",
        description: "Keep irrigation, fertilizer timing, and crop growth stages working together.",
      },
      {
        href: "/tools/compost-calculator",
        anchor: "Improve moisture retention with compost",
        description: "Balanced compost can help sandy beds hold water more evenly between sessions.",
      },
    ],
  },
};

/**
 * Return the single, public-facing representation of a tool.
 * Listing pages, embeds, metadata, and calculator pages should all resolve
 * through this helper so their claims cannot drift apart.
 */
export function resolveTool(tool: Tool): Tool {
  return { ...tool, ...(phase1Overrides[tool.slug] ?? {}) };
}

export function resolveTools(toolList: Tool[]): Tool[] {
  return toolList.map(resolveTool);
}
