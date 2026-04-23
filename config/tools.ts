// AGENT: 每次建新站只需修改这个文件
// 新增工具步骤：
//   1. 在下方 tools 数组加一条记录（slug、name、tagline、category、keywords、params、howToSteps、faqs）
//   2. 在 tools/<slug>/<SlugTool>.tsx 实现交互组件（Client Component，接收 params 输入，展示结果）
//   3. 在 app/tools/[slug]/page.tsx 的 toolComponents 里注册：{ "your-slug": YourToolComponent }
// 注意：所有 UI 文本必须使用英文（English only）

export interface ToolParam {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  placeholder?: string;
  options?: { label: string; value: string }[]; // type=select 时使用
  required?: boolean;
}

export interface ToolContentSection {
  heading: string;
  paragraphs: string[];
}

export interface ToolWorkedExample {
  title: string;
  summary: string;
}

export interface ToolQuickAnswer {
  definition: string;
  recommendation: string;
  columns: string[];
  rows: string[][];
  sourceHtml?: string;
}

export interface ToolInternalLink {
  href: string;
  anchor: string;
  description: string;
}

export interface ToolFAQ {
  q: string;
  a: string;
  displayHtml?: string;
  sourceQuery?: string;
  sourceUrl?: string;
}

export interface Tool {
  slug: string;           // URL slug，如 "json-formatter"
  name: string;           // 显示名，如 "JSON Formatter"
  tagline: string;        // 页面顶部一句话描述
  metaTitle?: string;     // SEO title override
  metaDescription?: string; // SEO meta description override
  category: string;       // 分类，用于导航分组
  keywords: string[];     // SEO 关键词
  params: ToolParam[];    // 输入参数定义（供工具组件参考）
  howToSteps: string[];   // HowTo schema 步骤（英文）
  faqs: ToolFAQ[]; // FAQ schema + 页面展示（英文，至少 4 条）
  quickAnswer?: ToolQuickAnswer;
  internalLinks?: ToolInternalLink[];
  contentSections?: ToolContentSection[];
  workedExamples?: ToolWorkedExample[];
}

// AGENT: 替换下方占位工具，填入实际工具列表
// 每个工具需要：slug、name、tagline、category、keywords、params、howToSteps、faqs
// 工具交互组件写在 tools/<slug>/<SlugTool>.tsx，然后在 app/tools/[slug]/page.tsx 里 import 并注册
export const tools: Tool[] = [
  {
    slug: "compost-calculator",
    name: "Compost Calculator",
    tagline: "Calculate your compost C:N ratio, bin volume, and get balancing recommendations.",
    category: "Garden",
    keywords: [
      "compost calculator",
      "compost carbon nitrogen ratio calculator",
      "how much compost do I need",
      "composting ratio green brown",
      "compost bin calculator",
      "carbon to nitrogen ratio compost",
    ],
    params: [
      { id: "length", label: "Bin Length (ft)", type: "number", placeholder: "e.g. 3", required: true },
      { id: "width",  label: "Bin Width (ft)",  type: "number", placeholder: "e.g. 3", required: true },
      { id: "height", label: "Bin Height (ft)", type: "number", placeholder: "e.g. 3", required: true },
    ],
    howToSteps: [
      "Enter your compost bin dimensions (length, width, height).",
      "Add your compost materials using the material selector — choose from greens (nitrogen-rich) and browns (carbon-rich).",
      "Enter the weight or volume of each material you plan to add.",
      "Click Calculate to see your current C:N ratio and whether you need more greens or browns.",
      "Follow the balancing recommendation to reach the ideal 25:1–30:1 ratio for fast composting.",
    ],
    faqs: [
      {
        q: "What is the ideal carbon to nitrogen ratio for compost?",
        a: "The ideal C:N ratio for active composting is between 25:1 and 30:1. Below 20:1 (too much nitrogen), your pile may smell like ammonia. Above 40:1 (too much carbon), decomposition slows significantly. Achieving the right balance is the single most important factor for fast, odor-free composting.",
      },
      {
        q: "What can I put in my compost bin?",
        a: "Greens (nitrogen sources): grass clippings, vegetable scraps, coffee grounds, fresh manure, and green leaves. Browns (carbon sources): dry leaves, straw, cardboard, wood chips, sawdust, and newspaper. Avoid meat, dairy, oily foods, diseased plants, and pet waste, as these attract pests or introduce pathogens.",
      },
      {
        q: "How long does composting take?",
        a: "Hot composting (actively managed, turned regularly, correct C:N ratio) takes 4–8 weeks. Cold composting (passive, minimal turning) takes 3–6 months or longer. The key factors are C:N ratio, moisture (should feel like a wrung-out sponge), aeration (turn every 1–2 weeks), and particle size (smaller pieces decompose faster).",
      },
      {
        q: "Why does my compost smell bad?",
        a: "A rotten egg smell usually means the pile is too wet and anaerobic — turn it and add dry browns. An ammonia smell means too much nitrogen (greens) — add more carbon-rich browns like dry leaves or cardboard. A well-balanced, properly aerated compost pile should smell earthy, not unpleasant.",
      },
    ],
    contentSections: [
      {
        heading: "What the compost calculator actually solves",
        paragraphs: [
          "A compost pile works best when three basics are in balance: carbon, nitrogen, and air. Browns such as dry leaves, straw, cardboard, and sawdust supply carbon. Greens such as grass clippings, food scraps, coffee grounds, and fresh manure supply nitrogen. The job of a compost calculator is to turn those materials into a practical number you can work with before you build the pile. Instead of guessing, you can estimate your bin volume, compare your ingredient mix, and see whether you are close to the target carbon-to-nitrogen ratio that supports fast decomposition.",
          "That matters because many home compost problems start with a ratio mistake. A pile that is too green heats up fast but can smell sour or release ammonia. A pile that is too brown stays cool and seems to sit there for weeks. When you know your dimensions and the rough weights of what you are adding, you can correct the mix early. This saves time, reduces odor, and gives you a more predictable path to finished compost that is crumbly, dark, and safe to spread on beds.",
        ],
      },
      {
        heading: "How to interpret your ratio and bin size",
        paragraphs: [
          "Most gardeners aim for an initial C:N ratio between 25:1 and 30:1. Think of that range as the sweet spot where microbes have enough energy from carbon and enough protein-building nitrogen to multiply quickly. If your result is below that range, the pile is nitrogen-heavy. You usually fix that by mixing in dry leaves, shredded paper, or cardboard. If your result is above the range, the pile is carbon-heavy. In that case, add fresh grass clippings, kitchen scraps, or other moist green materials and then turn the pile so the new material is distributed evenly.",
          "Volume matters too. A pile that is too small often cannot hold heat, even with a good ratio. Many gardeners find that a bin around 3 ft by 3 ft by 3 ft is a practical minimum for hot composting. Larger piles hold temperature better, but they still need oxygen and moisture. Use the calculator's volume output as a planning number. If your bin is large enough but decomposition is still slow, the culprit is usually moisture or aeration rather than size alone.",
        ],
      },
      {
        heading: "How to use the result in the real garden",
        paragraphs: [
          "Use the recommendation as a starting point, not as a rigid lab formula. Material weights vary by moisture level, and a bag of leaves in autumn is not exactly the same as a pile of partly wet leaves after rain. The best workflow is to build the pile in layers, compare the live texture to the calculator output, and then adjust. A good pile should feel about as damp as a wrung-out sponge. If it is slimy or compacted, add dry browns and turn. If it is dusty and cool, add greens and a little water.",
          "After setup, check the pile every few days in the first two weeks. Hot piles often peak in temperature quickly, then need turning as oxygen drops. If your ratio is in range and your pile is at least moderately large, you can expect visible shrinkage within a week or two. Once the material looks more uniform and no longer resembles the original scraps, shift from chasing speed to letting the compost cure. Finished compost should smell earthy and no longer show obvious food waste, grass clumps, or intact cardboard pieces.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Example: a balanced backyard pile",
        summary: "A gardener builds a 3 ft × 3 ft × 3 ft bin, which is 27 cubic feet. They add 20 lbs of grass clippings, 10 lbs of food scraps, and 25 lbs of dry leaves. The weighted ratio lands close to the ideal range, so the pile should heat up quickly if moisture and aeration are correct.",
      },
      {
        title: "Example: fixing a pile that smells like ammonia",
        summary: "Suppose your current mix is 30 lbs of grass clippings and 10 lbs of coffee grounds. That is heavy on nitrogen. If the calculator reports a low C:N ratio, adding roughly 20 to 25 lbs of dry leaves or shredded cardboard brings the pile back toward a safer and faster-composting balance.",
      },
      {
        title: "Example: waking up a slow carbon-heavy pile",
        summary: "If you fill a bin with 40 lbs of straw and 20 lbs of dry leaves, the ratio will usually be too high. Adding 15 to 20 lbs of fresh green material such as grass clippings lowers the ratio, adds moisture, and gives microbes the nitrogen they need to restart active decomposition.",
      },
    ],
  },
  {
    slug: "watering-schedule-calculator",
    name: "Watering Schedule Calculator",
    tagline: "Get a personalized watering schedule based on your plant, soil, season, and growing method.",
    category: "Garden",
    keywords: [
      "watering schedule calculator",
      "how often to water vegetable garden",
      "plant watering calculator",
      "garden watering guide by plant",
      "watering frequency vegetables",
      "how much to water plants",
    ],
    params: [
      {
        id: "plant",
        label: "Plant Type",
        type: "select",
        options: [
          { label: "Tomato", value: "tomato" },
          { label: "Pepper", value: "pepper" },
          { label: "Cucumber", value: "cucumber" },
          { label: "Lettuce", value: "lettuce" },
          { label: "Carrot", value: "carrot" },
          { label: "Zucchini", value: "zucchini" },
          { label: "Basil", value: "basil" },
          { label: "Rose", value: "rose" },
          { label: "Lavender", value: "lavender" },
          { label: "Sunflower", value: "sunflower" },
          { label: "Strawberry", value: "strawberry" },
          { label: "Blueberry", value: "blueberry" },
        ],
        required: true,
      },
      {
        id: "soilType",
        label: "Soil Type",
        type: "select",
        options: [
          { label: "Sandy", value: "sandy" },
          { label: "Loamy", value: "loamy" },
          { label: "Clay", value: "clay" },
        ],
        required: true,
      },
      {
        id: "season",
        label: "Season",
        type: "select",
        options: [
          { label: "Spring", value: "spring" },
          { label: "Summer", value: "summer" },
          { label: "Fall", value: "fall" },
          { label: "Winter", value: "winter" },
        ],
        required: true,
      },
      {
        id: "method",
        label: "Growing Method",
        type: "select",
        options: [
          { label: "In-Ground", value: "in-ground" },
          { label: "Raised Bed", value: "raised-bed" },
          { label: "Container", value: "container" },
        ],
        required: true,
      },
    ],
    howToSteps: [
      "Select your plant type from the dropdown list.",
      "Choose your soil type — sandy soils drain faster and need more frequent watering.",
      "Select the current season to account for temperature and evaporation differences.",
      "Choose your growing method — containers dry out faster than in-ground beds.",
      "Click Calculate to get your personalized weekly watering schedule.",
    ],
    faqs: [
      {
        q: "How often should I water my vegetable garden?",
        a: "Most vegetable gardens need about 1–2 inches of water per week, either from rain or irrigation. Frequency depends on your soil type, season, and plant variety. Sandy soils may need watering every 2–3 days in summer, while clay soils can go 5–7 days between waterings.",
      },
      {
        q: "What is the best time of day to water plants?",
        a: "Early morning (6–10 AM) is ideal. Watering in the morning allows foliage to dry during the day, reducing the risk of fungal diseases. Evening watering is acceptable but leaves wet overnight, which can promote mold and mildew. Avoid watering in the midday heat — water evaporates quickly and can stress plants.",
      },
      {
        q: "How do I know if I am overwatering?",
        a: "Signs of overwatering include yellowing leaves, wilting despite wet soil, root rot, and a musty smell from the soil. The best test is to stick your finger 2 inches into the soil — if it feels wet, wait before watering again. Overwatering is one of the most common causes of plant death in home gardens.",
      },
      {
        q: "Does soil type affect watering frequency?",
        a: "Yes, significantly. Sandy soil drains quickly and needs more frequent watering (up to 30% more). Clay soil retains moisture longer and needs less frequent watering (up to 30% less), but is prone to waterlogging. Loamy soil is the ideal balance and is used as the baseline for most watering recommendations.",
      },
      {
        q: "Do container plants need more water than in-ground plants?",
        a: "Yes. Containers have limited soil volume and no connection to groundwater, so they dry out much faster — especially in summer heat. Container plants may need watering daily in hot weather, compared to every 2–3 days for in-ground plants.",
      },
    ],
  },
  {
    slug: "soil-ph-calculator",
    name: "Soil pH Calculator",
    tagline: "Calculate how much lime or sulfur you need to reach your target soil pH.",
    category: "Garden",
    keywords: [
      "soil ph calculator",
      "garden soil ph adjuster",
      "how much lime to raise soil ph",
      "how much sulfur to lower soil ph",
      "soil ph for vegetables",
      "lime calculator garden",
    ],
    params: [
      { id: "currentPH", label: "Current Soil pH", type: "number", placeholder: "e.g. 5.5", required: true },
      { id: "targetPH", label: "Target pH", type: "number", placeholder: "e.g. 6.5", required: true },
      {
        id: "soilType",
        label: "Soil Type",
        type: "select",
        options: [
          { label: "Sandy", value: "sandy" },
          { label: "Loamy", value: "loamy" },
          { label: "Clay", value: "clay" },
        ],
        required: true,
      },
      { id: "area", label: "Area (sq ft)", type: "number", placeholder: "e.g. 100", required: true },
    ],
    howToSteps: [
      "Test your current soil pH using a home test kit or send a sample to your local extension office.",
      "Select your plant type from the dropdown to auto-fill the recommended target pH, or enter a custom target.",
      "Choose your soil type — clay soils require more amendment than sandy soils.",
      "Enter your garden area and click Calculate to see the recommended lime or sulfur amount.",
      "Apply the amendment evenly and water in well. Retest your soil pH after 2–3 months.",
    ],
    faqs: [
      {
        q: "Why does soil pH matter for plants?",
        a: "Soil pH controls nutrient availability. Most nutrients are most accessible to plants between pH 6.0 and 7.0. Outside this range, essential nutrients like iron, manganese, and phosphorus become locked in the soil, causing deficiencies even when fertilizer is applied.",
      },
      {
        q: "How do I test my soil pH?",
        a: "You can use an inexpensive home test kit (strips or a digital meter) for a quick reading. For more accurate results, send a soil sample to your local university extension service — they typically charge $10–$20 and provide detailed amendment recommendations.",
      },
      {
        q: "How long does it take for lime or sulfur to change soil pH?",
        a: "Garden lime (calcium carbonate) works slowly — expect 2–6 months for a noticeable shift, depending on soil moisture and temperature. Elemental sulfur is also slow, taking 2–4 months. Faster-acting forms like hydrated lime or sulfur-coated urea can show results in weeks but require careful application to avoid burning plants.",
      },
      {
        q: "Can I change soil pH in containers or raised beds?",
        a: "Yes, but it is easier than in-ground soil. Start with a quality potting mix at the correct pH for your plants. To lower pH, mix in acidic amendments like peat moss or pine bark. To raise pH, add garden lime. Retest every season as container soil pH can drift over time.",
      },
      {
        q: "What is the difference between garden lime and agricultural lime?",
        a: "Garden lime (calcium carbonate, CaCO₃) and agricultural lime are essentially the same product — finely ground limestone. The finer the grind, the faster it reacts. Dolomitic lime also contains magnesium and is a good choice if your soil is magnesium-deficient.",
      },
    ],
    contentSections: [
      {
        heading: "Why a soil pH calculator is more useful than guessing",
        paragraphs: [
          "Soil pH affects how easily plant roots can take up nutrients that are already present in the soil. Two gardens can receive the same fertilizer and still perform very differently if one bed is too acidic or too alkaline. A soil pH calculator helps you move from a vague reading like 5.4 or 7.3 to a practical amendment plan. Instead of applying lime or sulfur by feel, you can estimate the amount needed based on the pH gap, the bed size, and the soil texture. That is important because heavy clay needs more amendment than light sandy soil to shift the same pH amount.",
          "This tool is most useful when you already have a test result from a meter, strip test, or extension lab. Once you know your current pH and your crop target, the calculator gives you an amendment amount that is realistic for a home garden. It will not replace a full soil analysis, but it does answer the question most gardeners actually ask: how much lime or sulfur should I spread on this bed before I plant?",
        ],
      },
      {
        heading: "How to choose a realistic target pH",
        paragraphs: [
          "Most vegetables perform well in slightly acidic to neutral soil, usually around pH 6.0 to 7.0. That range keeps phosphorus, potassium, calcium, and most micronutrients available without creating major lockout issues. Some crops want narrower ranges. Blueberries and azaleas prefer acidic soil around 4.5 to 5.5, while tomatoes, peppers, lettuce, and cucumbers usually do best around the mid-sixes. The target pH should match the crop you are actually growing, not a generic garden average.",
          "It is also better to make moderate moves than extreme ones. For example, if your loamy garden bed tests at pH 5.2 and you want tomatoes, moving toward 6.2 or 6.4 is sensible. Trying to jump all the way to 7.0 in one pass is slower, less predictable, and easier to overshoot. Likewise, if your soil is slightly alkaline and you are growing blueberries, lowering pH may take multiple rounds over a season rather than one huge sulfur application.",
        ],
      },
      {
        heading: "Practical application and retesting advice",
        paragraphs: [
          "Apply amendments evenly and treat the calculator result as a total application amount for the stated area. Spread the material across the whole bed rather than concentrating it in one spot, then water it in or work it lightly into the top few inches. Lime and sulfur are not instant fixes. They need moisture, time, and soil contact to react. That means planning ahead matters. Lime is often applied in fall or several weeks before planting, while sulfur also benefits from an early application window.",
          "Retesting is part of the process. If you are adjusting a large pH gap, use the first application to move in the right direction, then test again after a couple of months. This is especially important in raised beds and containers, where mixes can shift faster than in-ground soil. If your crop is already planted, make smaller corrections and avoid dramatic changes around roots. The best result is not the largest application. It is reaching the crop-friendly range steadily without stressing the soil ecosystem.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Example: raising pH for tomatoes in a 100 sq ft bed",
        summary: "A loamy bed tests at pH 5.5 and the gardener wants pH 6.5 for tomatoes. The difference is 1.0 pH unit. Using a loam factor of 5 lbs of lime per 100 sq ft per pH unit, the calculator recommends about 5 lbs of garden lime for the bed.",
      },
      {
        title: "Example: lowering pH for blueberries in sandy soil",
        summary: "A sandy bed is at pH 6.5 and the target for blueberries is pH 5.0. The difference is 1.5 units. With a sulfur rate of 1 lb per 100 sq ft per pH unit in sandy soil, a 100 sq ft bed needs about 1.5 lbs of elemental sulfur, applied evenly and followed by retesting later in the season.",
      },
      {
        title: "Example: converting metric area",
        summary: "If a raised bed is 12 square meters and you want to raise pH by 0.8 in loamy soil, the tool first converts 12 m² to about 129 sq ft. It then applies the same extension-style rate to estimate the total lime required, giving you a result in both pounds and kilograms.",
      },
    ],
    internalLinks: [
      {
        href: "/tools/compost-calculator",
        anchor: "Compost calculator",
        description: "Once pH is on target, estimate how much finished compost your bed, lawn, or topdress layer needs.",
      },
      {
        href: "/tools/fertilizer-calculator",
        anchor: "NPK fertilizer calculator",
        description: "Convert an NPK label (10-10-10, 5-10-15, urea 46-0-0) to pounds or grams of actual product for the same bed.",
      },
      {
        href: "/tools/seed-spacing-calculator",
        anchor: "Seed spacing calculator",
        description: "Plan row spacing, plant spacing, and total seed count for the bed you just amended.",
      },
    ],
  },
  {
    slug: "seed-spacing-calculator",
    name: "Seed Spacing Calculator",
    tagline: "Calculate recommended row spacing, plant spacing, and total seed count for your garden.",
    category: "Garden",
    keywords: [
      "seed spacing calculator",
      "plant spacing calculator",
      "row spacing garden",
      "vegetable spacing guide",
      "how far apart to plant seeds",
      "garden planting calculator",
    ],
    params: [
      {
        id: "plant",
        label: "Plant / Vegetable",
        type: "select",
        options: [
          { label: "Tomato", value: "tomato" },
          { label: "Cucumber", value: "cucumber" },
          { label: "Lettuce", value: "lettuce" },
          { label: "Carrot", value: "carrot" },
          { label: "Pepper (Bell)", value: "pepper" },
          { label: "Zucchini / Courgette", value: "zucchini" },
          { label: "Spinach", value: "spinach" },
          { label: "Kale", value: "kale" },
          { label: "Radish", value: "radish" },
          { label: "Beet / Beetroot", value: "beet" },
          { label: "Onion", value: "onion" },
          { label: "Garlic", value: "garlic" },
          { label: "Pea", value: "pea" },
          { label: "Bean (Bush)", value: "bean" },
          { label: "Broccoli", value: "broccoli" },
        ],
        required: true,
      },
      { id: "area", label: "Garden Area (sq ft)", type: "number", placeholder: "e.g. 100", required: true },
    ],
    howToSteps: [
      "Select the vegetable or plant you want to grow from the dropdown list.",
      "Enter your garden area in square feet.",
      "Click Calculate to see the recommended row spacing, plant spacing, and total seed count.",
      "Use the results to lay out your rows and mark planting spots before sowing.",
    ],
    faqs: [
      {
        q: "Why does plant spacing matter?",
        a: "Proper spacing ensures each plant gets enough sunlight, water, and nutrients. Overcrowding leads to poor yields, increased disease risk, and competition for resources.",
      },
      {
        q: "What is the difference between row spacing and plant spacing?",
        a: "Row spacing is the distance between parallel rows of plants, while plant spacing (also called in-row spacing) is the distance between individual plants within the same row. Both are needed to calculate total seed count.",
      },
      {
        q: "How do I calculate how many seeds I need?",
        a: "Divide your garden length by the plant spacing to get plants per row, then divide the garden width by the row spacing to get the number of rows. Multiply these two numbers to get the total plant count. Add 10–20% extra seeds to account for germination failures.",
      },
      {
        q: "Can I use this calculator for raised beds?",
        a: "Yes. Enter the total surface area of your raised bed in square feet. The spacing recommendations apply equally to raised beds and in-ground gardens.",
      },
      {
        q: "What if I want to use square-foot gardening?",
        a: "Square-foot gardening uses a fixed 1 ft × 1 ft grid. The number of plants per square foot varies by plant size — for example, 1 tomato per square foot vs. 16 carrots per square foot. This calculator uses traditional row spacing, which is compatible with most garden layouts.",
      },
    ],
    contentSections: [
      {
        heading: "What a seed spacing calculator helps you avoid",
        paragraphs: [
          "Planting too close is one of the easiest ways to reduce yield without noticing it until mid-season. Seedlings may germinate well, look healthy for a while, and then start competing for light, airflow, and root space once they size up. A seed spacing calculator helps you turn a bed size into a layout plan before you sow. That means you can estimate how many rows fit, how many plants belong in each row, and how many seeds to buy with a realistic germination buffer built in.",
          "Spacing is not just about maximizing the number of plants. It is about matching plant size to the conditions the crop needs later. Tomatoes and zucchini need room for canopy growth and airflow. Lettuce and spinach can be grown more tightly, but still benefit from enough distance to reduce mildew and bolting stress. When spacing is correct, plants fill the bed at maturity instead of fighting each other halfway through the season.",
        ],
      },
      {
        heading: "How to use row spacing and plant spacing together",
        paragraphs: [
          "Row spacing and plant spacing answer two different questions. Row spacing controls how many lines of a crop you can fit across the bed. Plant spacing controls how many individual plants fit within each line. If a crop needs 24 inches between rows and 18 inches between plants, you need both numbers to estimate total plant count. Gardeners often remember one and forget the other, which is why their shopping list or transplant tray count ends up wrong.",
          "This calculator assumes a simple square or rectangular planning approach, which is ideal for quick layout work. Use the row spacing result to mark parallel lines first. Then use the plant spacing result to mark holes or seed stations along each row. Once you have the total plant count, add around 10 to 20 percent extra seed for normal germination losses. That buffer is especially useful for direct-sown crops like carrots, beets, spinach, and radishes.",
        ],
      },
      {
        heading: "Using spacing rules in raised beds and intensive gardens",
        paragraphs: [
          "Raised beds and intensive systems can sometimes tighten spacing slightly, but the safe starting point is still the standard row and in-row spacing shown by the calculator. If you are gardening in a small space, treat the output as a baseline and only reduce spacing when you know the crop tolerates it. Leafy crops can often handle more density than fruiting crops. Large plants such as zucchini, tomatoes, and broccoli usually need the full recommendation to avoid disease pressure and disappointing yields.",
          "The best way to use the result is to compare your available area with your harvest goal. If the calculator says your 100 sq ft bed fits only 50 broccoli plants, that may sound low, but each plant needs room to make a proper head. Overpacking the bed rarely increases the final harvest. It usually just creates smaller plants, more thinning work, and less airflow. Good spacing feels conservative at planting time and smart at harvest time.",
        ],
      },
    ],
    workedExamples: [
      {
        title: "Example: tomatoes in a 100 sq ft bed",
        summary: "A 100 sq ft bed is roughly 10 ft by 10 ft. With tomatoes spaced 36 inches between rows and 24 inches between plants, the calculator estimates 3 rows with 5 plants per row, or about 15 tomato plants total. Adding a 15% buffer suggests starting with 18 seeds or transplants.",
      },
      {
        title: "Example: carrots for a dense sowing plan",
        summary: "In the same 100 sq ft bed, carrots at 12 inches between rows and 3 inches between plants fit many more stations. The calculator estimates 10 rows and around 40 planting positions per row, giving roughly 400 plants. A germination buffer pushes the recommended seed count to about 460 seeds.",
      },
      {
        title: "Example: raised-bed lettuce planning",
        summary: "If a raised bed has 32 sq ft of growing space and lettuce needs 12 inches between rows with 8 inches between plants, the tool helps you see that you can grow multiple short rows without crowding. That lets you stagger sowings and still maintain airflow for cleaner heads.",
      },
    ],
    internalLinks: [
      {
        href: "/tools/compost-calculator",
        anchor: "Compost calculator",
        description: "Estimate how much finished compost the bed needs before you sow — in cubic yards or bags.",
      },
      {
        href: "/tools/fertilizer-calculator",
        anchor: "NPK fertilizer calculator",
        description: "Turn a fertilizer label into pounds or grams of actual product for the seedlings you just planned.",
      },
      {
        href: "/tools/soil-ph-calculator",
        anchor: "Soil pH calculator",
        description: "Check lime or sulfur rate for the target crop before you commit to a layout.",
      },
    ],
  },
  {
    slug: "fertilizer-calculator",
    name: "Fertilizer Calculator",
    tagline: "Calculate NPK fertilizer dosage for any crop or garden area.",
    category: "Garden",
    keywords: ["fertilizer calculator", "NPK calculator", "garden fertilizer", "fertilizer dosage", "urea calculator"],
    params: [
      { id: "preset", label: "Fertilizer Type", type: "select", options: [
        { label: "Urea (46-0-0)", value: "urea" },
        { label: "Compound (15-15-15)", value: "compound" },
        { label: "DAP (18-46-0)", value: "dap" },
        { label: "Custom", value: "custom" },
      ]},
      { id: "area", label: "Area (m²)", type: "number", placeholder: "e.g. 100", required: true },
    ],
    howToSteps: [
      "Select your fertilizer type from the dropdown (Urea, Compound, DAP, or Custom).",
      "If using Custom, enter the N, P₂O₅, and K₂O percentages from your fertilizer label.",
      "Enter your garden area in square meters.",
      "Click Calculate to see the recommended fertilizer amount and nutrient breakdown.",
    ],
    faqs: [
      { q: "What do N, P, and K mean on a fertilizer label?", a: "N is nitrogen (promotes leafy growth), P is phosphorus expressed as P₂O₅ (supports roots and flowering), and K is potassium expressed as K₂O (improves overall plant health and disease resistance)." },
      { q: "Why does this calculator use P₂O₅ instead of elemental phosphorus?", a: "Commercial fertilizer labels report phosphorus as P₂O₅ (phosphorus pentoxide), which is the industry standard. To convert to elemental P, multiply the P₂O₅ value by 0.436." },
      { q: "How much fertilizer do I need for 100 m²?", a: "It depends on the fertilizer type and NPK ratio. For example, Urea (46-0-0) requires about 0.65 kg per 100 m² to supply the recommended nitrogen dose. Use this calculator to get an exact figure for your specific fertilizer." },
      { q: "Can I use this calculator for any fertilizer brand?", a: "Yes. Select Custom and enter the N, P₂O₅, and K₂O percentages printed on your fertilizer bag. The calculator will compute the required amount based on standard nutrient application rates." },
    ],
  },
];

// 按 category 分组，供导航使用
export function getToolsByCategory(): Record<string, Tool[]> {
  return tools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);
}
