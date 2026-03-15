# Agent Guide — nextjs-seo-tool-starter

这是工具站通用模板。agent 建新站时，**只需修改以下 3 个地方**，其余 SEO、sitemap、JSON-LD、embed、相关工具推荐全部自动处理。

---

## Step 1：填写站点信息

编辑 `config/site.ts`：

```ts
export const siteConfig = {
  name: "YourSiteName",
  domain: "https://your-domain.com",
  description: "One sentence describing the site.",
  locale: "en",
  twitterHandle: "",           // 可选
  relatedSites: [              // 矩阵内链，填同系列其他站点
    { name: "Site B", url: "https://siteb.com", description: "..." },
  ],
};
```

---

## Step 2：填写工具列表

编辑 `config/tools.ts`，替换占位工具，填入实际工具：

```ts
export const tools: Tool[] = [
  {
    slug: "your-tool-slug",          // URL: /tools/your-tool-slug
    name: "Your Tool Name",
    tagline: "One sentence, include primary keyword. English only.",
    category: "Category Name",       // 同类工具用同一 category
    keywords: ["keyword1", "keyword2", "keyword3"],
    params: [
      { id: "input", label: "Input", type: "textarea", placeholder: "Paste here..." },
      { id: "mode", label: "Mode", type: "select", options: [
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
      ]},
    ],
    howToSteps: [                    // 3-5 步，英文，用于 HowTo schema
      "Step 1: ...",
      "Step 2: ...",
      "Step 3: ...",
    ],
    faqs: [                          // 至少 4 条，英文，用于 FAQPage schema
      { q: "What is ...?", a: "..." },
      { q: "How does ... work?", a: "..." },
      { q: "Is ... free?", a: "Yes, completely free." },
      { q: "Do I need to sign up?", a: "No sign-up required." },
    ],
  },
];
```

**重要：所有文本必须使用英文（English only）。**

---

## Step 3：实现工具交互组件

在 `tools/<slug>/<SlugTool>.tsx` 创建 Client Component：

```tsx
"use client";
import { useState } from "react";

export default function YourToolTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleRun = () => {
    // 工具逻辑
    setResult(/* 计算结果 */);
  };

  // URL 参数持久化（可选，让用户可分享结果）
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   if (params.get("input")) setInput(params.get("input")!);
  // }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your input here..."
        />
      </div>

      <button
        onClick={handleRun}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
      >
        Run
      </button>

      {result && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
          <pre className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
            {result}
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="mt-2 px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
          >
            Copy Result
          </button>
          {/* PDF 导出：直接调用 window.print()，print CSS 已内置 */}
          <button
            onClick={() => window.print()}
            className="mt-2 ml-2 px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 no-print"
          >
            Save as PDF
          </button>
        </div>
      )}
    </div>
  );
}
```

然后在 `app/tools/[slug]/page.tsx` 注册：

```ts
import YourToolTool from "@/tools/your-tool-slug/YourToolTool";

const toolComponents: Record<string, React.ComponentType> = {
  "your-tool-slug": YourToolTool,
};
```

---

## 自动处理（无需 agent 操作）

| 功能 | 实现位置 |
|------|---------|
| 每页独立 title/description/og | `app/tools/[slug]/page.tsx` generateMetadata |
| sitemap.xml | `app/sitemap.ts` |
| robots.txt | `app/robots.ts` |
| SoftwareApplication JSON-LD | `components/ToolJsonLd.tsx` |
| HowTo JSON-LD | `components/ToolJsonLd.tsx` |
| FAQPage JSON-LD | `components/ToolJsonLd.tsx` |
| BreadcrumbList JSON-LD | `components/ToolJsonLd.tsx` |
| 相关工具推荐 | `components/RelatedTools.tsx` |
| Embed widget | `components/EmbedWidget.tsx` |
| PDF 导出 print CSS | `app/globals.css` |
| 矩阵内链（Footer） | `components/Footer.tsx` |

---

## 部署到 Cloudflare Pages

```bash
npm run build
# 上传 out/ 目录到 Cloudflare Pages
# Build command: npm run build
# Build output directory: out
```
