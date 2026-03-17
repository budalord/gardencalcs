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

export interface Tool {
  slug: string;           // URL slug，如 "json-formatter"
  name: string;           // 显示名，如 "JSON Formatter"
  tagline: string;        // 一句话描述，用于 meta description 和卡片
  category: string;       // 分类，用于导航分组
  keywords: string[];     // SEO 关键词
  params: ToolParam[];    // 输入参数定义（供工具组件参考）
  howToSteps: string[];   // HowTo schema 步骤（英文）
  faqs: { q: string; a: string }[]; // FAQ schema + 页面展示（英文，至少 4 条）
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
