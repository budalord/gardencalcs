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
    slug: "placeholder",
    name: "Placeholder Tool",
    tagline: "Replace this with your actual tool.",
    category: "General",
    keywords: ["placeholder"],
    params: [{ id: "input", label: "Input", type: "text", placeholder: "Enter value..." }],
    howToSteps: ["Enter a value.", "See the result."],
    faqs: [{ q: "What does this tool do?", a: "This is a placeholder. Replace it with your actual tool." }],
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
