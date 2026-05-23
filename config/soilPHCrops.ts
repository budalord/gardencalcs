export interface SoilPHCropSource {
  label: string;
  url: string;
  role: 'primary' | 'secondary' | 'tertiary';
  fieldUsed: string;
}

export interface SoilPHCropFaq {
  q: string;
  a: string;
  sourceUrl: string;
}

export interface SoilPHCrop {
  slug: string;
  name: string;
  titleName: string;
  phMin: number;
  phMax: number;
  category: 'Vegetable' | 'Fruit' | 'Herb';
  toleranceNote: string;
  lowPHSymptom: string;
  highPHSymptom: string;
  amendmentNote: string;
  testingNote: string;
  mistakeNote: string;
  rotationNote: string;
  primarySource: SoilPHCropSource;
  secondarySource: SoilPHCropSource;
  tertiarySource: SoilPHCropSource;
  uniqueFaq: SoilPHCropFaq;
}

export const soilPHCrops: SoilPHCrop[] = [
  {
    slug: 'tomato',
    name: 'Tomato',
    titleName: 'Tomato',
    phMin: 6.0,
    phMax: 6.8,
    category: 'Vegetable',
    toleranceNote: 'Tomatoes tolerate a fairly wide pH band, but the practical sweet spot stays close to the mid sixes. Below about 5.8, calcium uptake starts to lag and blossom-end rot becomes more common during fruit set. Above 7.2, iron and manganese availability drops enough to show up as interveinal chlorosis on new growth before the plant is visibly stressed.',
    lowPHSymptom: 'Below the target range, expect uneven calcium uptake, more blossom-end rot during heavy fruit set, and slow root growth in cool soil. Magnesium deficiency on lower leaves is also more likely when the bed has been acid for several seasons.',
    highPHSymptom: 'Above pH 7.2, new growth often shows interveinal yellowing while veins stay green, which is the classic iron or manganese availability problem rather than a feeding shortage. Adding more fertilizer on alkaline soil rarely fixes this; correcting the pH does.',
    amendmentNote: 'For tomato beds, prefer agricultural lime over wood ash when raising pH because lime reacts more predictably and does not introduce extra potassium. Cap a single pass at about 10 lb per 100 sq ft and split larger corrections across two seasons to avoid overshooting and locking up phosphorus.',
    testingNote: 'Retest about six months after a lime application; lime reacts slowly and a three-month retest usually misreads the change. For sulfur applications meant to drop pH back toward six, allow at least six months in cool soil before the next round.',
    mistakeNote: 'A common mistake is treating blossom-end rot as a pure calcium feeding problem when the underlying issue is pH or watering. Foliar calcium sprays rarely fix the root cause if soil pH is sitting in the high sevens or if irrigation is uneven.',
    rotationNote: 'Tomatoes pull a steady nutrient load year after year, so pair the pH plan with a rotation that does not put nightshades on the same bed two years running. Cover crops with shallow roots, such as oats, can help stabilize the bed between tomato seasons.',
    primarySource: {
      label: 'University of Maryland Extension — vegetable pH chart',
      url: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
      role: 'primary',
      fieldUsed: 'crop pH range and amendment guidance',
    },
    secondarySource: {
      label: 'Penn State Extension — Understanding Soil pH',
      url: 'https://extension.psu.edu/understanding-soil-ph/',
      role: 'secondary',
      fieldUsed: 'lime and sulfur reaction kinetics',
    },
    tertiarySource: {
      label: 'University of Minnesota Extension — Growing Tomatoes',
      url: 'https://extension.umn.edu/vegetables/growing-tomatoes',
      role: 'tertiary',
      fieldUsed: 'tomato-specific pH and nutrient interaction',
    },
    uniqueFaq: {
      q: 'Does adding eggshells to tomato beds raise the pH enough to matter?',
      a: 'Crushed eggshells do contain calcium carbonate, but the particle size is large and they break down very slowly in garden soil. Eggshells almost never raise pH fast enough to correct a low reading during the same season. For a measurable pH change, agricultural lime is far more reliable, and a soil test should set the rate before any application.',
      sourceUrl: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
    },
  },
  {
    slug: 'blueberry',
    name: 'Blueberry',
    titleName: 'Blueberry',
    phMin: 4.5,
    phMax: 5.5,
    category: 'Fruit',
    toleranceNote: 'Blueberries are unusual among home garden crops because they need distinctly acidic soil. A pH above 5.8 stresses the plant even when other nutrients look fine on a test report. Most failed blueberry plantings in home gardens trace back to pH that was never low enough at the start.',
    lowPHSymptom: 'Below about pH 4.2, even blueberries struggle because aluminum becomes more soluble and can damage fine roots. Going more acidic than the target range does not improve growth; it just adds toxicity risk.',
    highPHSymptom: 'Above pH 5.5, blueberries usually show iron chlorosis: yellow leaves with green veins, especially on new growth. Adding fertilizer at this stage rarely helps because the issue is availability, not supply.',
    amendmentNote: 'Use elemental sulfur to lower pH gradually before planting, and re-test in the autumn before adjusting again. Never use aluminum sulfate on home blueberry beds in any quantity beyond a small starter dose, because the aluminum builds up over time and can become a long-term problem.',
    testingNote: 'Plan the pH correction at least a full season ahead of planting. Sulfur reacts through soil microbes, which means the change is slow in cool soil and faster in warm soil. Retest about six months after each sulfur pass before adding more.',
    mistakeNote: 'The most common mistake with blueberries is planting first and adjusting pH later. Sulfur applied around an established plant has to compete with established roots and existing buffering, which makes correction slow and uneven.',
    rotationNote: 'Blueberries are not rotated like vegetables, but the planting bed should be kept dedicated and mulched with acidic materials such as pine needles or aged conifer chips to maintain pH over the years.',
    primarySource: {
      label: 'University of Maine Cooperative Extension — Lowbush Blueberry Soil pH',
      url: 'https://extension.umaine.edu/blueberries/factsheets/production/250-fertilizing-with-manure/',
      role: 'primary',
      fieldUsed: 'crop pH target and sulfur guidance',
    },
    secondarySource: {
      label: 'Oregon State University Extension — Growing Blueberries in the Home Garden',
      url: 'https://catalog.extension.oregonstate.edu/ec1304/html',
      role: 'secondary',
      fieldUsed: 'amendment timing and mulch advice',
    },
    tertiarySource: {
      label: 'Penn State Extension — Understanding Soil pH',
      url: 'https://extension.psu.edu/understanding-soil-ph/',
      role: 'tertiary',
      fieldUsed: 'lime and sulfur reaction kinetics',
    },
    uniqueFaq: {
      q: 'How much sulfur do I need to drop pH to 5.0 for blueberries?',
      a: 'The exact rate depends on starting pH and soil texture, but a typical home garden bed at pH 6.5 in loam may need on the order of one to two pounds of elemental sulfur per 100 square feet to drop pH near 5.0, applied in split passes rather than all at once. Sandy soils respond faster, clay soils slower. Always start from a soil test reading and recheck after six months instead of estimating from intuition.',
      sourceUrl: 'https://catalog.extension.oregonstate.edu/ec1304/html',
    },
  },
  {
    slug: 'lettuce',
    name: 'Lettuce',
    titleName: 'Lettuce',
    phMin: 6.0,
    phMax: 7.0,
    category: 'Vegetable',
    toleranceNote: 'Lettuce is more flexible on pH than many gardeners assume. The crop performs well across most of the upper six range, and modest deviations rarely cause visible problems if other factors such as water and temperature are reasonable. The bigger risk for lettuce is uneven moisture rather than pH drift.',
    lowPHSymptom: 'Below about pH 5.6, lettuce growth slows and tipburn risk rises in some varieties. Calcium uptake under acid stress becomes less reliable, and that interacts with hot or dry conditions to make leaf margins look scorched.',
    highPHSymptom: 'Above pH 7.5, lettuce can show interveinal yellowing similar to iron chlorosis, especially when bed water sits too long after irrigation. The change is usually gradual rather than sudden.',
    amendmentNote: 'Most lettuce beds need only modest pH adjustments. Use lime sparingly and water in well so the surface does not crust before seedlings emerge. Avoid heavy sulfur passes mid-season when lettuce roots are already shallow.',
    testingNote: 'Lettuce turns over quickly, so retest every one to two years rather than every season. A long-term cool-season bed used for repeated lettuce crops can drift acid over time, which a regular soil test catches early.',
    mistakeNote: 'A common mistake is treating tipburn as a pH problem when the real driver is irrigation rhythm or air movement. Correcting pH alone will not fix tipburn if the watering schedule is the actual cause.',
    rotationNote: 'Rotate lettuce out of the same bed when planning back-to-back cool seasons; the same bed used repeatedly for leafy crops tends to drift in fertility and pH together.',
    primarySource: {
      label: 'University of Maryland Extension — vegetable pH chart',
      url: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
      role: 'primary',
      fieldUsed: 'crop pH range',
    },
    secondarySource: {
      label: 'Utah State University Extension — Planting and Spacing for Leafy Greens',
      url: 'https://extension.usu.edu/vegetableguide/leafy-greens/planting-spacing',
      role: 'secondary',
      fieldUsed: 'crop management context',
    },
    tertiarySource: {
      label: 'Mississippi State Extension — Test Soil to Find Its pH Value',
      url: 'https://extension.msstate.edu/lawn-and-garden/vegetable-gardens/test-soil-find-its-ph-value',
      role: 'tertiary',
      fieldUsed: 'home garden pH testing guidance',
    },
    uniqueFaq: {
      q: 'Does lettuce grow better in slightly acidic or neutral soil?',
      a: 'Lettuce performs about equally well across most of the slightly acidic to neutral range. The crop is not finicky on pH the way blueberries or potatoes are. The bigger drivers of lettuce quality in a home garden are steady moisture, cool conditions, and timely harvest before bolting, not fine adjustments to soil pH within the normal vegetable range.',
      sourceUrl: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
    },
  },
  {
    slug: 'potato',
    name: 'Potato',
    titleName: 'Potato',
    phMin: 4.8,
    phMax: 5.5,
    category: 'Vegetable',
    toleranceNote: 'Potatoes are one of the few common vegetable garden crops that actively prefer acidic soil. The acid range is a working management tool because it suppresses common scab, a disease that becomes more prevalent as pH climbs toward neutral. Keeping the bed in the upper four to mid five range is part of the disease strategy, not just an agronomic preference.',
    lowPHSymptom: 'Below about pH 4.5, even potatoes start to lose vigor as aluminum solubility increases. Going more acidic than the target range trades scab control for general nutrient lockout, which is a poor exchange.',
    highPHSymptom: 'Above pH 6.0, common scab incidence rises noticeably even when the rest of the garden plan looks correct. Tubers may show rough, corky lesions at harvest that lower storage quality.',
    amendmentNote: 'Do not add lime to a potato bed unless a soil test specifically calls for it. If the bed was recently limed for other crops, plant a different family for a year before returning to potatoes. To bring an alkaline bed down toward the potato target, use elemental sulfur in split passes the season before planting.',
    testingNote: 'Test the potato bed annually if it sits in a rotation with crops that needed lime. The pH can drift up between potato cycles, and the scab risk follows that drift.',
    mistakeNote: 'A common mistake is treating common scab as a watering problem only and ignoring pH. Even with good irrigation, a bed that has been limed into the sixes will produce more scab than a bed kept honestly below pH 5.5.',
    rotationNote: 'Plan the potato bed in a multi-year rotation that includes at least one non-host crop in between. Avoid following heavy lime applications with potatoes; the residual carbonate raises scab pressure for a full season afterward.',
    primarySource: {
      label: 'University of Minnesota Extension — Growing Potatoes',
      url: 'https://extension.umn.edu/vegetables/growing-potatoes',
      role: 'primary',
      fieldUsed: 'crop pH target and scab management',
    },
    secondarySource: {
      label: 'University of Maryland Extension — vegetable pH chart',
      url: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
      role: 'secondary',
      fieldUsed: 'crop pH range cross-check',
    },
    tertiarySource: {
      label: 'Penn State Extension — Understanding Soil pH',
      url: 'https://extension.psu.edu/understanding-soil-ph/',
      role: 'tertiary',
      fieldUsed: 'sulfur reaction kinetics',
    },
    uniqueFaq: {
      q: 'Should I add wood ash to a potato bed to fertilize the soil?',
      a: 'No. Wood ash raises pH meaningfully and also adds potassium, which is the opposite of what a potato bed needs from a disease-management standpoint. Common scab pressure rises with pH, so wood ash on a potato bed typically trades a small fertility gain for a notable jump in scab risk. Save wood ash, if you use it at all, for crops that prefer the upper six to seven range.',
      sourceUrl: 'https://extension.umn.edu/vegetables/growing-potatoes',
    },
  },
  {
    slug: 'carrot',
    name: 'Carrot',
    titleName: 'Carrot',
    phMin: 6.0,
    phMax: 6.8,
    category: 'Vegetable',
    toleranceNote: 'Carrots want a balanced slightly acidic soil and they punish poor bed prep faster than pH error. The crop is sensitive to soil texture and stones long before it is sensitive to a tenth of a pH unit. That said, the upper six range gives the most reliable shoulder color and the most predictable germination.',
    lowPHSymptom: 'Below about pH 5.7, carrots can show poor germination and slow early growth, particularly in cool spring soil. The stand looks patchy, and that uneven start becomes a thinning problem later.',
    highPHSymptom: 'Above pH 7.2, micronutrient lockout shows up before fertility shows up. Pale, slightly twisted tops with otherwise normal growth often point at pH rather than fertilizer.',
    amendmentNote: 'For carrots, avoid heavy raw amendment passes right before sowing. Lime, sulfur, or compost mixed deep into the bed weeks before planting works much better than surface dusting at sowing time, because carrots need a stone-free uniform seed zone.',
    testingNote: 'Retest the carrot bed every couple of seasons rather than every year. The crop does not extract pH-shifting volumes of nutrients, so drift is slow and predictable in most home gardens.',
    mistakeNote: 'The classic mistake is blaming pH for poor germination when the real cause is crusted surface or uneven moisture. Carrots demand a finely worked, evenly moist seed zone; even perfect pH will not save a crusted bed.',
    rotationNote: 'Rotate carrots away from any bed that just hosted a heavy compost or manure pass, because excess fresh nitrogen drives forked or hairy roots even when pH is correct.',
    primarySource: {
      label: 'University of Maryland Extension — vegetable pH chart',
      url: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
      role: 'primary',
      fieldUsed: 'crop pH range',
    },
    secondarySource: {
      label: 'University of Minnesota Extension — Growing Carrots',
      url: 'https://extension.umn.edu/vegetables/growing-carrots',
      role: 'secondary',
      fieldUsed: 'carrot bed prep and management',
    },
    tertiarySource: {
      label: 'Mississippi State Extension — Test Soil to Find Its pH Value',
      url: 'https://extension.msstate.edu/lawn-and-garden/vegetable-gardens/test-soil-find-its-ph-value',
      role: 'tertiary',
      fieldUsed: 'home garden pH testing context',
    },
    uniqueFaq: {
      q: 'Will adjusting soil pH actually fix forked or hairy carrots?',
      a: 'Probably not. Forking and hairy roots are usually caused by excess fresh nitrogen, recently incorporated raw amendments, or stony soil rather than pH. If the bed is in the slightly acidic to neutral range, the more productive correction is bed prep and amendment timing, not chasing the pH meter into a narrower band.',
      sourceUrl: 'https://extension.umn.edu/vegetables/growing-carrots',
    },
  },
  {
    slug: 'pepper',
    name: 'Pepper',
    titleName: 'Pepper',
    phMin: 6.0,
    phMax: 6.8,
    category: 'Vegetable',
    toleranceNote: 'Peppers share the slightly acidic vegetable pH window with tomatoes, and the management lessons rhyme. The crop sets fruit well across the upper six range and shows visible stress only when pH drifts well outside that window for several weeks in warm weather.',
    lowPHSymptom: 'Below pH 5.8, blossom drop can become more common during heat stress because calcium uptake is less reliable. The first symptom is usually flowers falling without setting fruit, not foliage damage.',
    highPHSymptom: 'Above pH 7.2, peppers can show interveinal yellowing on new leaves and slow growth during the warmest part of the season, both of which are availability problems rather than fertilizer shortages.',
    amendmentNote: 'Peppers respond well to balanced compost and modest pH correction made before transplanting. Avoid late-season pH adjustments because root systems are already established and the response is too slow to help the current crop.',
    testingNote: 'Retest the pepper bed every couple of seasons. Like tomatoes, peppers in a long-term bed can slowly draw the pH down across years of fertilizer and rainfall.',
    mistakeNote: 'A common mistake is treating blossom drop as purely a heat or watering problem and ignoring an alkaline pH reading. Both can drive the symptom; the pH side is the slower but more permanent fix.',
    rotationNote: 'Avoid planting peppers in the same bed as last year unless cover crops or a fallow rest broke the rotation. Pepper roots leave a residual nutrient draw that compounds across consecutive years.',
    primarySource: {
      label: 'University of Maryland Extension — vegetable pH chart',
      url: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
      role: 'primary',
      fieldUsed: 'crop pH range',
    },
    secondarySource: {
      label: 'University of Minnesota Extension — Growing Peppers',
      url: 'https://extension.umn.edu/vegetables/growing-peppers',
      role: 'secondary',
      fieldUsed: 'pepper management cross-check',
    },
    tertiarySource: {
      label: 'Penn State Extension — Understanding Soil pH',
      url: 'https://extension.psu.edu/understanding-soil-ph/',
      role: 'tertiary',
      fieldUsed: 'lime and sulfur reaction kinetics',
    },
    uniqueFaq: {
      q: 'Do peppers need a more acidic soil pH than tomatoes?',
      a: 'No, peppers and tomatoes share essentially the same slightly acidic vegetable pH window of about 6.0 to 6.8. There is no reason to chase a different target for peppers in a home garden. If both crops are in the same bed, manage the bed pH as one system rather than trying to tune each crop separately.',
      sourceUrl: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
    },
  },
  {
    slug: 'cucumber',
    name: 'Cucumber',
    titleName: 'Cucumber',
    phMin: 6.0,
    phMax: 7.0,
    category: 'Vegetable',
    toleranceNote: 'Cucumbers tolerate a slightly wider pH range than tomatoes or peppers and can perform well almost up to neutral. The crop is more sensitive to water management and disease pressure than to small pH differences within the normal vegetable range.',
    lowPHSymptom: 'Below about pH 5.6, cucumbers can show slow seedling growth and uneven germination, especially in cool spring soil. The early stand looks weak more than it looks chlorotic.',
    highPHSymptom: 'Above pH 7.5, micronutrient availability falls and new leaves may show interveinal yellowing while older foliage looks fine. Adding fertilizer rarely fixes this; correcting pH does.',
    amendmentNote: 'Most cucumber beds do not need aggressive pH correction. A modest lime pass when soil tests acidic is usually enough. Heavy sulfur applications late in the season offer little benefit because the crop matures quickly.',
    testingNote: 'Retest the cucumber bed every two seasons. Heavy compost users can drift the pH slightly each year, but the crop tolerates that drift better than many other vegetables.',
    mistakeNote: 'A common mistake is over-amending cucumber beds with wood ash hoping to boost potassium. Wood ash raises pH unpredictably and can push the bed into the high seven range, which causes more problems than it solves.',
    rotationNote: 'Rotate cucurbits out of the same bed for at least a year to break disease cycles. The pH plan is easier to maintain when the same bed is not used for cucumbers two years running.',
    primarySource: {
      label: 'University of Maryland Extension — vegetable pH chart',
      url: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
      role: 'primary',
      fieldUsed: 'crop pH range',
    },
    secondarySource: {
      label: 'University of Minnesota Extension — Growing Cucumbers',
      url: 'https://extension.umn.edu/vegetables/growing-cucumbers',
      role: 'secondary',
      fieldUsed: 'cucumber management cross-check',
    },
    tertiarySource: {
      label: 'Mississippi State Extension — Test Soil to Find Its pH Value',
      url: 'https://extension.msstate.edu/lawn-and-garden/vegetable-gardens/test-soil-find-its-ph-value',
      role: 'tertiary',
      fieldUsed: 'home garden pH testing context',
    },
    uniqueFaq: {
      q: 'Should I lower soil pH for cucumbers if my reading is 7.2?',
      a: 'Usually not in a meaningful way. Cucumbers handle the upper end of the neutral range well, and a modest reading of 7.2 is not a reason to aggressively add sulfur. Confirm with another soil test from a different spot in the bed before changing anything; small sampling differences often look like real pH drift.',
      sourceUrl: 'https://extension.umn.edu/vegetables/growing-cucumbers',
    },
  },
  {
    slug: 'spinach',
    name: 'Spinach',
    titleName: 'Spinach',
    phMin: 6.0,
    phMax: 7.0,
    category: 'Vegetable',
    toleranceNote: 'Spinach is one of the more pH-sensitive home garden crops. It will visibly struggle in beds that have drifted acidic, more so than lettuce or kale. The practical sweet spot sits closer to neutral than to the lower end of the vegetable pH range.',
    lowPHSymptom: 'Below about pH 6.0, spinach growth slows and the plant looks generally weak before any single nutrient deficiency becomes obvious. This is one of the clearer cases where a soil test before planting saves a full crop.',
    highPHSymptom: 'Above pH 7.5, spinach can show iron and manganese deficiency symptoms even when fertility is adequate. Yellowing on new leaves is the usual first sign.',
    amendmentNote: 'Spinach beds often benefit from a lime correction the season before sowing if the bed has been used heavily for acid-loving crops. Avoid trying to fix pH after the crop is planted; spinach grows too fast to respond.',
    testingNote: 'Test the spinach bed before each cool season planting if the same bed is reused. A spring and fall double crop can pull fertility down faster than other crops, which sometimes shifts pH along with it.',
    mistakeNote: 'A common mistake is blaming bolting or yellowing on heat alone when an acid pH made the crop weak going into warm weather. The two problems compound and are hard to separate after the fact.',
    rotationNote: 'Rotate spinach out of the same bed for a year between cool seasons; the crop responds well to following a heavier feeder rotation that left residual fertility but did not push pH too far acid.',
    primarySource: {
      label: 'University of Maryland Extension — vegetable pH chart',
      url: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
      role: 'primary',
      fieldUsed: 'crop pH range',
    },
    secondarySource: {
      label: 'University of Minnesota Extension — Growing Spinach',
      url: 'https://extension.umn.edu/vegetables/growing-spinach',
      role: 'secondary',
      fieldUsed: 'spinach management cross-check',
    },
    tertiarySource: {
      label: 'Penn State Extension — Understanding Soil pH',
      url: 'https://extension.psu.edu/understanding-soil-ph/',
      role: 'tertiary',
      fieldUsed: 'lime and sulfur reaction kinetics',
    },
    uniqueFaq: {
      q: 'Is spinach really more pH sensitive than other leafy greens?',
      a: 'Yes. Spinach is noticeably less tolerant of acidic soil than lettuce, kale, or chard. If the same bed grows all four crops, set the pH plan around the spinach requirement, because that is the crop most likely to fail in a bed that has drifted below pH 6.0.',
      sourceUrl: 'https://extension.umn.edu/vegetables/growing-spinach',
    },
  },
  {
    slug: 'strawberry',
    name: 'Strawberry',
    titleName: 'Strawberry',
    phMin: 5.5,
    phMax: 6.5,
    category: 'Fruit',
    toleranceNote: 'Strawberries prefer a slightly acidic soil somewhat lower than the typical vegetable range. The bed pH plan is more important for strawberries than for short-cycle crops because the planting stays in place for years, and small drift compounds.',
    lowPHSymptom: 'Below pH 5.2, strawberries can show weak growth and reduced fruit set, particularly in cool, wet springs. The whole bed looks tired rather than showing one specific deficiency.',
    highPHSymptom: 'Above pH 6.8, strawberries begin to show iron chlorosis on new growth. Yellow leaves with green veins on the youngest leaves is the classic signal that the bed pH has climbed too high.',
    amendmentNote: 'Adjust pH before planting, not after. Strawberries do not respond well to mid-season pH shifts because their roots are shallow and the crowns are sensitive to disruption. Use a modest sulfur pass the season before planting if the soil tests above 6.8.',
    testingNote: 'Test the strawberry bed every one to two years across its productive life. A bed that holds for three to four years can drift in either direction, and the management response is slower than in annual vegetable beds.',
    mistakeNote: 'A common mistake is reusing the same strawberry bed without retesting pH between productive cycles. The bed can drift alkaline due to lime applied for other crops in adjacent beds, or acidic due to long-term mulch use.',
    rotationNote: 'When the strawberry bed retires, rotate it into a vegetable that prefers the same slightly acidic range, such as carrots, rather than swinging the pH up sharply with lime for a different crop.',
    primarySource: {
      label: 'University of Maryland Extension — vegetable pH chart',
      url: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
      role: 'primary',
      fieldUsed: 'crop pH range',
    },
    secondarySource: {
      label: 'University of Minnesota Extension — Growing Strawberries',
      url: 'https://extension.umn.edu/fruit/growing-strawberries-home-garden',
      role: 'secondary',
      fieldUsed: 'strawberry management cross-check',
    },
    tertiarySource: {
      label: 'Penn State Extension — Understanding Soil pH',
      url: 'https://extension.psu.edu/understanding-soil-ph/',
      role: 'tertiary',
      fieldUsed: 'sulfur reaction kinetics',
    },
    uniqueFaq: {
      q: 'Can I plant strawberries in the same bed as blueberries?',
      a: 'Not really. Blueberries need pH below 5.5 and strawberries do best closer to 6.0 to 6.5. Sharing the bed forces a compromise that hurts one crop or the other, and usually both. Keep them in separate beds with separate pH plans so each crop sits in its working range.',
      sourceUrl: 'https://extension.umn.edu/fruit/growing-strawberries-home-garden',
    },
  },
  {
    slug: 'cabbage',
    name: 'Cabbage',
    titleName: 'Cabbage',
    phMin: 6.0,
    phMax: 7.5,
    category: 'Vegetable',
    toleranceNote: 'Cabbage tolerates a wider pH range than most vegetables, and gardeners deliberately push the pH toward the upper end of that range to suppress clubroot disease. This is a rare case where slightly alkaline soil is a management feature rather than a problem.',
    lowPHSymptom: 'Below pH 6.0, clubroot pressure rises sharply in many regions. Roots develop swollen, club-like growths, and the cabbage plant wilts during warm afternoons even when the soil is moist.',
    highPHSymptom: 'Above pH 7.5, cabbage can show micronutrient deficiency on new leaves, particularly boron deficiency in some soils. The hearts may develop hollow stems if boron drops too far.',
    amendmentNote: 'For clubroot-prone gardens, lime the cabbage bed in the fall before planting to bring pH near 7.0. Do not over-correct above 7.5, since that introduces a different set of problems. Split the lime across two seasons if a large adjustment is needed.',
    testingNote: 'Retest the cabbage bed every season if clubroot has appeared in the past. A pH that drifts back down even half a unit can let the disease return faster than the gardener expects.',
    mistakeNote: 'A common mistake is treating clubroot purely as a sanitation issue. Crop rotation and pH management together are what break the disease cycle; one without the other is rarely enough in heavily affected beds.',
    rotationNote: 'Rotate brassicas out of the cabbage bed for at least three years if clubroot has been confirmed. During those rest years, maintain pH near the upper range to keep clubroot suppressed when brassicas return.',
    primarySource: {
      label: 'University of Maryland Extension — vegetable pH chart',
      url: 'https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf',
      role: 'primary',
      fieldUsed: 'crop pH range',
    },
    secondarySource: {
      label: 'University of Minnesota Extension — Clubroot of Cole Crops',
      url: 'https://extension.umn.edu/disease-management/clubroot-cole-crops',
      role: 'secondary',
      fieldUsed: 'clubroot management and pH target',
    },
    tertiarySource: {
      label: 'Penn State Extension — Understanding Soil pH',
      url: 'https://extension.psu.edu/understanding-soil-ph/',
      role: 'tertiary',
      fieldUsed: 'lime reaction kinetics',
    },
    uniqueFaq: {
      q: 'Why do extension guides recommend a higher pH for cabbage than for most vegetables?',
      a: 'The higher pH target for cabbage is mainly about suppressing clubroot, a soil-borne disease that thrives in acidic soil and is one of the most damaging problems in home brassica beds. Liming the bed to near pH 7.0 reduces clubroot pressure even when pathogen levels are not zero. This is a deliberate management trade where slightly alkaline soil reduces disease risk more than it costs in nutrient availability.',
      sourceUrl: 'https://extension.umn.edu/disease-management/clubroot-cole-crops',
    },
  },
];

export const soilPHCropMap: Record<string, SoilPHCrop> = Object.fromEntries(
  soilPHCrops.map((c) => [c.slug, c])
);

export const soilPHCropLinks = soilPHCrops.map((c) => ({
  href: `/tools/soil-ph/${c.slug}`,
  anchor: `${c.titleName} soil pH target (${c.phMin}–${c.phMax})`,
  description: `Crop-specific pH range, lime or sulfur guidance, and common amendment mistakes for ${c.name.toLowerCase()}.`,
}));
