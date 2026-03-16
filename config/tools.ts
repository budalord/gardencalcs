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
