# 2026-05-23 SEO 迭代验证报告

基于 [GSC 30 天数据](../../gardencalcs-docs/gardencalcs_gsc_2026-05-23.md) 决定的本轮 on-site 优化。所有改动均已构建通过。

## 范围

| # | 项目 | 状态 |
|---|---|---|
| 1 | 推送积压的 3 个提交（5/7 expert-audit 修复 + 状态文档） | ✅ Done — push to origin/master |
| 2 | 重写 `soil-ph-calculator` 的 title + meta description | ✅ Done |
| 3 | 重写 `seed-spacing-calculator` 的 title + meta description | ✅ Done |
| 4 | scaffold `/tools/soil-ph/[crop]` 程序化子页 | ✅ Done — 10 作物 |
| 5 | scaffold `/tools/compost/[material]` 程序化子页 | ⏭ Deferred — 见 §6 |
| 6 | SeedSpacingCalculator 加 URL 参数 SSR | ⏭ Cancelled — 见 §6 |

## 1. Meta 改写

### soil-ph-calculator

| | Before | After |
|---|---|---|
| Title | "Soil pH Calculator — Lime & Sulfur Rate for Your Bed" (52 ch) | **"Soil pH Calculator — Lime & Sulfur Lb per 100 Sq Ft"** (51 ch) |
| Desc | "...40+ crops, extension-cited..." | **"Enter current pH, target pH, and bed size — get exact pounds of lime or sulfur per 100 sq ft. 12 crop pH targets, split-application warning, extension-cited. No signup."** |

修复点：
- 加入 "per 100 sq ft" 直接 hit "how much lime per square foot garden calculator" 这条长尾（prev 30d pos 2.53 → 现在可获更高 CTR）。
- "40+ crops" 是不实承诺（实际 12 种），改为 "12 crop pH targets"，避免 SERP 与现实落差导致用户跳出。
- "split-application warning" 暴露 5/7 expert-audit 修的安全特性。

### seed-spacing-calculator

| | Before | After |
|---|---|---|
| Title | "Vegetable Seed Spacing Calculator — Raised Bed Chart (15 Crops)" (64 ch，**超移动端截断阈值**) | **"Seed Spacing Calculator — Row × Plant + Depth (15 Crops)"** (55 ch) |
| Desc | "Free vegetable seed spacing calculator for home gardens. Row spacing, plant spacing, and seed depth for 15 crops..." | **"Free seed spacing calculator: row spacing, plant spacing, and seed depth for 15 vegetables. Home gardens, raised beds, square-foot layouts. Extension-cited. No signup."** |

修复点：
- 去掉前缀 "Vegetable"，让 "Seed Spacing Calculator" 拿到首位 exact match。这条页面 GSC 中 pos 10.38 / CTR 仅 0.25 % 的异常低，怀疑是 title 在移动端被截断 + 前缀稀释关键词。
- 加 "Row × Plant + Depth" 在标题里直接 surface 工具能力（不只是 "calculator"），增加 CTR 信号。

## 2. 新增 /tools/soil-ph/[crop] 程序化子页

仿 seed-spacing/[crop] 的成熟模式（GSC 数据已验证 carrot 子页 CTR 1.13 % vs 主计算器 0.25 %），构建 10 个作物子页：

**作物清单（覆盖 SoilPHCalculator 全部主作物 + cabbage 特例）**：

| Slug | 作物 | pH 范围 | 入选理由 |
|---|---|---|---|
| tomato | Tomato | 6.0–6.8 | 搜索量最高 |
| blueberry | Blueberry | 4.5–5.5 | 酸性特例，"how to acidify soil for blueberries" 高搜索量 |
| lettuce | Lettuce | 6.0–7.0 | 通用蔬菜 |
| potato | Potato | 4.8–5.5 | scab 控制场景，独特卖点 |
| carrot | Carrot | 6.0–6.8 | GSC 中 carrot 相关查询活跃 |
| pepper | Pepper | 6.0–6.8 | 与 tomato 互补 |
| cucumber | Cucumber | 6.0–7.0 | 通用 |
| spinach | Spinach | 6.0–7.0 | pH 敏感特例 |
| strawberry | Strawberry | 5.5–6.5 | 多年生 |
| cabbage | Cabbage | 6.0–7.5 | clubroot 管理特例（高 pH 作为管理工具） |

**每页含**：
- 1 个唯一 H1（含 pH 范围），1 句 chunk-extractable 直答
- Quick answer 区块 + 4-row 表格（target, category, low-pH, high-pH）
- 7 个 H2 section：pH 需求、酸性症状、碱性症状、改良指南、复测周期、常见错误、FAQ
- 4 个 schema.org JSON-LD：SoftwareApplication、FAQPage（4 questions）、BreadcrumbList、Dataset（含 3 个 extension source）
- 1 个独特的作物 FAQ（不复用模板）+ 3 个程序化派生的 FAQ
- 3 个 extension 引用（primary/secondary/tertiary）
- 2 个内链：回主计算器 + 到 understanding-soil-ph 指南

**每作物的独特字段**（避免 doorway clone，符合 5/7 expert-audit rubric）：
- `toleranceNote` — 这个作物 pH 容忍度的具体描述
- `lowPHSymptom` — 该作物在酸性环境下的具体症状
- `highPHSymptom` — 该作物在碱性环境下的具体症状
- `amendmentNote` — 针对该作物的特定改良建议
- `testingNote` — 复测周期建议
- `mistakeNote` — 常见错误
- `rotationNote` — 轮作建议
- `uniqueFaq` — 1 个该作物独有的 FAQ（非派生）

## 3. 内链与 sitemap

- `phase1Overrides.ts` 把 `soilPHCropLinks`（10 个）prepend 到 soil-ph-calculator 主页 internalLinks，原 5 条 cross-tool 链接保留。共 15 条 internalLinks。
- `app/sitemap.ts` 加 `soilPHCropRoutes`，10 条 URL 同步进 sitemap.xml（priority 0.7，changeFrequency monthly，对齐 seed-spacing 子页）。

## 4. 构建 / 渲染验证

```
$ npm run build
✓ Compiled successfully
✓ Generating static pages (52/52)
○  (Static)   /sitemap.xml
●  (SSG)      /tools/soil-ph/[crop]
              ├ /tools/soil-ph/tomato
              ├ /tools/soil-ph/blueberry
              ├ /tools/soil-ph/lettuce
              └ [+7 more paths]
```

**dev server fetch 验证**：

| 检查 | 结果 |
|---|---|
| `/tools/soil-ph-calculator` 新 title 在 HTML 中 | ✅ |
| `/tools/soil-ph-calculator` 新 desc 在 HTML 中 | ✅ |
| `/tools/seed-spacing-calculator` 新 title 在 HTML 中 | ✅ |
| `/tools/seed-spacing-calculator` 新 desc 在 HTML 中 | ✅ |
| `/tools/soil-ph/tomato` 渲染 200 + 含 Dataset/FAQ/Breadcrumb schemas | ✅ |
| `/tools/soil-ph/cabbage` 渲染 200 + 含 9 个 H2 + 4 个 FAQ + 3 引用 | ✅ |
| sitemap.xml 含 10 条 `/tools/soil-ph/*` 路径 | ✅ |
| `out/tools/soil-ph/` 含 10 个静态 HTML | ✅ |
| `/tools/soil-ph-calculator` 含 10 个唯一作物 internal links | ✅ |
| 视觉冒烟（Blueberry 页 desktop 截图） | ✅ |

**Dev mode 中两个非阻塞错误**（与本次改动无关）：
- `/sitemap.xml` 在 dev server 中返回 500：`output: "export"` 下 Next.js dev server 的已知 quirk；production build 已生成静态 sitemap.xml。
- 不存在的 crop slug（如 `/tools/soil-ph/zzz-bogus`）返回 500 而非 404：同样是 dev mode + `output:export` 限制；production build 中只生成已注册 slug。

## 5. 文件改动清单

```
Modified:
  app/sitemap.ts                  +9    加 soilPHCropRoutes
  config/phase1Overrides.ts       +3    soil-ph 主页加 10 条 crop 内链；改 2 个 meta
New:
  config/soilPHCrops.ts           +290  10 作物完整数据集
  app/tools/soil-ph/[crop]/page.tsx +260  dynamic route
  reports/seo-2026-05-23/verification.md (this file)
```

## 6. 推迟 / 取消的项

### compost/[material] 子页（推迟）

按 seed-spacing/[crop] 同等深度做 20 种材料 = 额外 ~1200 行研究型内容。本会话已经写了 ~600 行高质量内容，再叠一倍会牺牲质量。5/7 expert-audit rubric 明确警告 "doorway clone" 风险，薄内容会反向损害 SEO（参考 [docs/expert-audit-rubric.md](../../docs/expert-audit-rubric.md) §3）。

**下一轮**：先观察 soil-ph/[crop] 这批上线 2-4 周后的 GSC 表现（impressions/clicks/pos），如果模式继续验证有效（参考 carrot 子页 CTR 1.13%），再做 compost/[material] 第一批 8-10 个高搜索量材料。

### SeedSpacingCalculator URL 参数 SSR（取消）

发现 `next.config.js` 是 `output: "export"` 纯静态导出。这种模式下：
- 所有页面构建时预渲染
- 请求时的 `searchParams` 对 Google 抓取无效（Google 看到的是静态默认 HTML）
- 即使 client-side 处理 URL 参数，Featured Snippet 取决于 SSR HTML

正确的等价做法 = 预生成子页（即 §2 已经在做的事）。"calculate bushes for 48 zucchinis" 这条 80 imp / pos 5 / 0 click 的长尾，更合理的对策是在现有 `/tools/seed-spacing/zucchini` 子页里加 "common plant counts" 答案块，留到下一轮专项做。

## 7. 预期 KPI（在下次 GSC 拉数据时核对）

基于 seed-spacing/[crop] 的历史数据外推，**3-6 周后**期望看到：

| 指标 | 现状 (30d) | 期望 |
|---|---|---|
| soil-ph-calculator CTR | 0.62 % @ pos 9.32 | 1.5–2.5 %（meta 改写 + 内链增强） |
| 全站 clicks/30d | 21 | 35–50（CTR 上升 + 子页流入） |
| /tools/soil-ph/* 总曝光 | 0 | 200–500（参考 seed-spacing 子页爬升曲线） |
| 长尾"crop + soil ph"类查询数 | <5 | 20+ |

**否决信号**（如果出现需重新审视）：
- 4 周内 soil-ph-calculator 主页 CTR 持续 <1 %：meta 仍未对症，需 SERP 复核
- 子页大面积 pos > 30：内容深度不够或内链权重不足
- 主计算器页 pos 下降 >5：可能因子页内链稀释，需调整 sitemap priority

## 8. 部署说明

构建产物在 `out/`（静态导出），按现有 Cloudflare Pages 流程部署。推送到 master 后会触发自动构建。
