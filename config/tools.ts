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
