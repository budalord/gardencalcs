# GEO Baseline — gardencalcs Phase 0

审计时间：2026-04-19 CST

说明：本文件按修订版要求，仅做**代码库只读审计**。本 Phase：
- 不做任何 AI 引擎/浏览器实测
- 不修改任何代码、schema、robots.txt、业务文件
- 唯一新增文件：`reports/geo_baseline.md`

---

## A. 当前状态快照

### A1. `/public/robots.txt` 状态 + 当前 robots 规则

结论：
- `/public/robots.txt` **不存在**
- 当前站点的 robots 来自构建产物路由：`out/robots.txt`

当前实际输出全文：

```txt
User-Agent: *
Allow: /

Sitemap: https://gardencalcs.com/sitemap.xml
```

### A2. 构建后首页 + 3 个代表子页的实际落地 `@type` 集合

已执行：`npm run build`

代表页面：
- 首页：`out/index.html`
- tomato：`out/tools/seed-spacing/tomato.html`
- lettuce：`out/tools/seed-spacing/lettuce.html`
- carrot：`out/tools/seed-spacing/carrot.html`

#### 各页面实际落地 `@type`

| 页面 | 实际 `@type` 集合 |
|---|---|
| 首页 | 无 JSON-LD `@type` 输出 |
| tomato | `Answer`, `BreadcrumbList`, `FAQPage`, `ListItem`, `Question`, `SoftwareApplication` |
| lettuce | `Answer`, `BreadcrumbList`, `FAQPage`, `ListItem`, `Question`, `SoftwareApplication` |
| carrot | `Answer`, `BreadcrumbList`, `FAQPage`, `ListItem`, `Question`, `SoftwareApplication` |

#### 全站 `out/**/*.html` 实际出现过的 `@type` 总集合

```txt
Answer
Article
BreadcrumbList
FAQPage
HowTo
HowToStep
ListItem
Offer
Organization
Question
SoftwareApplication
```

### A3. canonical / hreflang / meta robots 静态验证

| 项目 | 结果 | 备注 |
|---|---|---|
| canonical | 存在 | 全站 30 个 HTML 文件均包含 `canonical` |
| hreflang | 不存在 | 全站 0 个 HTML 文件出现 `hreflang` |
| meta robots | 仅 404 页存在 | `out/404.html` 有 `meta robots`；首页和 3 个代表子页均无 |

#### 代表页面明细

| 页面 | canonical | hreflang | meta robots |
|---|---|---|---|
| 首页 | `https://gardencalcs.com` | 无 | 无 |
| tomato | `https://gardencalcs.com/tools/seed-spacing/tomato` | 无 | 无 |
| lettuce | `https://gardencalcs.com/tools/seed-spacing/lettuce` | 无 | 无 |
| carrot | `https://gardencalcs.com/tools/seed-spacing/carrot` | 无 | 无 |

### A4. `/public/llms.txt` 是否存在

| 检查项 | 结果 |
|---|---|
| `/public/llms.txt` | 不存在 |
| `out/llms.txt` | 不存在 |

### A5. 是否已有 `Dataset` / `ItemList` / `speakable` 类 schema

结论：**无**

| schema 类型 | 是否存在 |
|---|---|
| `Dataset` | 否 |
| `ItemList` | 否 |
| `Speakable` / `SpeakableSpecification` | 否 |

### A6. 首页 + 3 子页静态内容结构盘点

| 页面 | 字数 | H2 数量 | H2 文本 | `.edu/.gov/extension` 外链数量 | `.edu/.gov/extension` URL 列表 | `<table>` 数值表 | FAQ 条数 |
|---|---:|---:|---|---:|---|---:|---:|
| 首页 | 222 | 2 | `Popular Tools`；`Garden Guides` | 0 | 无 | 0 | 0 |
| tomato | 1688 | 8 | `Tomato row spacing and plant spacing at a glance`；`How deep to plant tomato seeds or transplants`；`How spacing changes as tomato reaches maturity`；`Raised bed, in-ground row, and intensive spacing tradeoffs for tomato`；`Common spacing mistakes when planting tomato`；`Frequently asked questions`；`Sources`；`Helpful next steps` | 2 | `https://extension.umn.edu/vegetables/growing-tomatoes`；`https://extension.uga.edu/content/dam/extension-county-offices/gwinnett-county/anr/homeshow-resources/Vegetable%20Planting%20Chart.pdf` | 1 | 3 |
| lettuce | 1691 | 8 | `Lettuce row spacing and plant spacing at a glance`；`How deep to plant lettuce seeds or transplants`；`How spacing changes as lettuce reaches maturity`；`Raised bed, in-ground row, and intensive spacing tradeoffs for lettuce`；`Common spacing mistakes when planting lettuce`；`Frequently asked questions`；`Sources`；`Helpful next steps` | 2 | `https://extension.usu.edu/vegetableguide/leafy-greens/planting-spacing`；`https://extension.uga.edu/content/dam/extension-county-offices/gwinnett-county/anr/homeshow-resources/Vegetable%20Planting%20Chart.pdf` | 1 | 3 |
| carrot | 1722 | 8 | `Carrot row spacing and plant spacing at a glance`；`How deep to plant carrot seeds or transplants`；`How spacing changes as carrot reaches maturity`；`Raised bed, in-ground row, and intensive spacing tradeoffs for carrot`；`Common spacing mistakes when planting carrot`；`Frequently asked questions`；`Sources`；`Helpful next steps` | 2 | `https://extension.uga.edu/content/dam/extension-county-offices/gwinnett-county/anr/homeshow-resources/Vegetable%20Planting%20Chart.pdf`；`https://extension.usu.edu/vegetableguide/root-crops/beets-and-turnips` | 1 | 3 |

### A7. 与 D 节直接相关的静态补充信号

#### 404 页 `meta robots`
- 全站唯一命中 `meta robots` 的文件：`out/404.html`

#### 3 个子页首个核心 H2 下首段是否为“直答句”
判断口径：检查首个核心 H2 下首段前 30 字，是否出现直接数值答案。

| 页面 | 首个核心 H2 | 首段前 30 字观察 | 是否属于直答型开头 |
|---|---|---|---|
| tomato | `Tomato row spacing and plant spacing at a glance` | 以 `The starting layout for tomato...` 开头 | 否 |
| lettuce | `Lettuce row spacing and plant spacing at a glance` | 以 `The starting layout for lettuce...` 开头 | 否 |
| carrot | `Carrot row spacing and plant spacing at a glance` | 以 `The starting layout for carrot...` 开头 | 否 |

#### sitemap 条目数

| 资产 | 当前值 |
|---|---|
| `out/sitemap.xml` `<url>` 条目数 | 28 |

---

## C. SEO 面保护清单

| 资产 | 当前值 | 后续 GEO Phase 不得改动的理由 |
|---|---|---|
| 首页 canonical | `https://gardencalcs.com` | 当前首页规范 URL 已稳定；变动会影响已建立的收录与引用一致性 |
| tomato canonical | `https://gardencalcs.com/tools/seed-spacing/tomato` | 代表子页已稳定上线；canonical 变动会扰动当前页面身份 |
| lettuce canonical | `https://gardencalcs.com/tools/seed-spacing/lettuce` | 同上 |
| carrot canonical | `https://gardencalcs.com/tools/seed-spacing/carrot` | 同上 |
| 首页 meta title | `Fertilizer Calculator & Seed Spacing Calculator – Free Garden Tools` | 当前 title 已服务现有 SEO 面，不允许 GEO 改造顺带改标题意图 |
| 首页 meta description | `Free online garden calculators. Calculate fertilizer NPK dosage, seed spacing, and more. Simple tools for home gardeners and small farms.` | 现有搜索摘要资产，不应在 GEO 阶段被顺带重写 |
| tomato meta title | `Tomato Seed Spacing Guide | Row, Plant & Depth Chart` | 代表页现有关键词面不可被 GEO 改造覆盖 |
| tomato meta description | `Tomato seed spacing guide with row spacing, plant spacing, seed depth, maturity notes, and extension-based FAQ answers for home gardens.` | 同上 |
| lettuce meta title | `Lettuce Seed Spacing Guide | Row, Plant & Depth Chart` | 同上 |
| lettuce meta description | `Lettuce seed spacing guide with row spacing, plant spacing, seed depth, maturity notes, and extension-based FAQ answers for home gardens.` | 同上 |
| carrot meta title | `Carrot Seed Spacing Guide | Row, Plant & Depth Chart` | 同上 |
| carrot meta description | `Carrot seed spacing guide with row spacing, plant spacing, seed depth, maturity notes, and extension-based FAQ answers for home gardens.` | 同上 |
| 首页 `@type` 集合 | 空 | 现状即首页未输出 JSON-LD；后续若加 GEO 资产也不能破坏现有空状态与已有页面结构的一致性 |
| 3 子页 `@type` 集合 | `Answer`, `BreadcrumbList`, `FAQPage`, `ListItem`, `Question`, `SoftwareApplication` | 硬约束要求后续 GEO Phase 不删不改现有 JSON-LD 体系，只能 additive |
| tomato H2 原文与顺序 | 共 8 个 H2，顺序如 A6 | 硬约束要求不改 H2 顺序与原文 |
| lettuce H2 原文与顺序 | 共 8 个 H2，顺序如 A6 | 同上 |
| carrot H2 原文与顺序 | 共 8 个 H2，顺序如 A6 | 同上 |
| robots 现有规则 | `User-Agent: *` / `Allow: /` / `Sitemap: https://gardencalcs.com/sitemap.xml` | 这是当前真实对搜索引擎的抓取面；后续任何 GEO 变更都不能误伤 Google 抓取 |
| robots 对 Googlebot 规则 | 当前无单独 `Googlebot` 段，等价于继承 `User-Agent: *` → `Allow: /` | 后续如增补 AI crawler 规则，不得破坏 Google 现有隐式放行状态 |
| sitemap 条目数 | 28 | 当前 sitemap 规模是既有 SEO 面；GEO Phase 不得删减或改 URL 结构 |
| 首页字数下限 | 222 | GEO 改造不能让首页主内容更薄 |
| tomato 字数下限 | 1688 | GEO 改造只能 additive，不能削薄正文 |
| lettuce 字数下限 | 1691 | 同上 |
| carrot 字数下限 | 1722 | 同上 |
| tomato FAQ 数 | 3 | 现有 FAQ 结构是既有 SEO 资产，不得减少 |
| lettuce FAQ 数 | 3 | 同上 |
| carrot FAQ 数 | 3 | 同上 |
| Lighthouse 保护门槛 | `Perf ≥ 85` / `LCP ≤ 2.5s` / `CLS ≤ 0.1` | GEO 后续 Phase 必须保持当前硬门槛，不得以新增块换取性能回退 |

---

## D. GEO 机会点清单（仅识别，不改）

### D1. `/llms.txt`

| 项目 | 当前状态 | 建议 | 建议内容骨架 |
|---|---|---|---|
| `/public/llms.txt` | 不存在 | 建议加 | 站点名；站点用途；优先抓取的工具/指南 URL；可引用页面清单；更新时间；爬取说明（允许引用公开页面、优先 canonical URL） |

### D2. robots.txt 对 AI 爬虫的当前态度

当前 robots 只有：
- `User-Agent: *`
- `Allow: /`

据此可得当前态度：

| 爬虫 | 当前状态 | 判断依据 | 建议方向 |
|---|---|---|---|
| GPTBot | 隐式 allow | 无专门规则，继承 `User-Agent: *` | 若后续要做 GEO 友好化，可考虑显式写出 allow |
| ClaudeBot | 隐式 allow | 同上 | 同上 |
| PerplexityBot | 隐式 allow | 同上 | 同上 |
| Google-Extended | 隐式 allow | 同上 | 同上 |

### D3. `Dataset schema` 候选页（仅基于 A 中 `<table>` + 数值型信号）

| 页面 | `<table>` | 数值型信号 | 是否为候选 |
|---|---:|---|---|
| tomato | 1 | 行距、株距、播种深度等数值表存在 | 是 |
| lettuce | 1 | 行距、株距、播种深度等数值表存在 | 是 |
| carrot | 1 | 行距、株距、播种深度等数值表存在 | 是 |

### D4. H2 直答句候选页 Top 3

筛选口径：
- 只基于 A 的静态数据
- 按“正文字数最高”优先
- 且首个核心 H2 下首段不是直答型开头（前 30 字未直接给出数值答案）

| 排名 | 页面 | 字数 | 首个核心 H2 | 当前观察 | 候选理由 |
|---|---|---:|---|---|---|
| 1 | carrot | 1722 | `Carrot row spacing and plant spacing at a glance` | 首段先讲原则，再讲数值 | 字数最高，且首段不是直接数值回答 |
| 2 | lettuce | 1691 | `Lettuce row spacing and plant spacing at a glance` | 首段先讲原则，再讲数值 | 同上 |
| 3 | tomato | 1688 | `Tomato row spacing and plant spacing at a glance` | 首段先讲原则，再讲数值 | 同上 |

### D5. `.edu/.gov inline citation` 密度

#### 当前密度

| 范围 | 当前平均值 |
|---|---:|
| 审计 4 页整体平均（首页 + 3 子页） | 1.5 / 页 |
| 3 个作物子页平均 | 2.0 / 页 |
| GEO 观察目标线 | 3 / 页 |

#### 缺口页

| 页面 | 当前 `.edu/.gov/extension` 数量 | 距离 3 的缺口 |
|---|---:|---:|
| 首页 | 0 | 3 |
| tomato | 2 | 1 |
| lettuce | 2 | 1 |
| carrot | 2 | 1 |

说明：
- 若只看 3 个作物子页，当前都低于 3 / 页；
- tomato / lettuce / carrot 都是可明确识别的“差 1 条引用”页面；
- 首页当前不属于数据型答案页，缺口虽最大，但优先级应与作物子页区分看待。
