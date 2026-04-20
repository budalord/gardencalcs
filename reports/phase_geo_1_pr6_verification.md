# GEO Phase 1 P1 PR-6 Verification — gardencalcs

验证时间：2026-04-20 CST
PR 范围：为首页 `app/page.tsx` 补齐 3 段 JSON-LD schema（`Organization` / `WebSite` / `ItemList`）
执行者：Codex

---

## 1. 文件变更

| 文件 | 动作 |
|---|---|
| `app/page.tsx` | 修改：在首页根容器内首行新增 3 个 `<script type="application/ld+json">` 标签 |
| `reports/phase_geo_1_pr6_verification.md` | 新增 |
| `reports/lighthouse-phase-geo-1-pr6/home-pre.json` | 新增：单次 baseline raw JSON |
| `reports/lighthouse-phase-geo-1-pr6/home-post.json` | 新增：单次 post raw JSON |
| `reports/lighthouse-phase-geo-1-pr6/home-pre-1.json` | 新增：median baseline raw JSON |
| `reports/lighthouse-phase-geo-1-pr6/home-pre-2.json` | 新增：median baseline raw JSON |
| `reports/lighthouse-phase-geo-1-pr6/home-pre-3.json` | 新增：median baseline raw JSON |
| `reports/lighthouse-phase-geo-1-pr6/home-post-1.json` | 新增：median post raw JSON |
| `reports/lighthouse-phase-geo-1-pr6/home-post-2.json` | 新增：median post raw JSON |
| `reports/lighthouse-phase-geo-1-pr6/home-post-3.json` | 新增：median post raw JSON |

不动：H1/H2 原文、hero 文案、Popular Tools / Browse by Category / Garden Guides 三个 section、canonical、meta、sitemap、robots、`app/layout.tsx`。

## 2. Schema 结构

### 2.1 Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Garden Tools Hub",
  "url": "https://gardencalcs.com",
  "description": "Free online gardening calculators. Calculate fertilizer NPK dosage, seed spacing, and more for your garden."
}
```

### 2.2 WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Garden Tools Hub",
  "url": "https://gardencalcs.com",
  "description": "Free online gardening calculators. Calculate fertilizer NPK dosage, seed spacing, and more for your garden.",
  "inLanguage": "en",
  "publisher": {
    "@type": "Organization",
    "name": "Garden Tools Hub",
    "url": "https://gardencalcs.com"
  }
}
```

### 2.3 ItemList

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Garden calculators",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Compost Calculator", "url": "https://gardencalcs.com/tools/compost-calculator", "description": "Calculate your compost C:N ratio, bin volume, and get balancing recommendations." },
    { "@type": "ListItem", "position": 2, "name": "Watering Schedule Calculator", "url": "https://gardencalcs.com/tools/watering-schedule-calculator", "description": "Get a personalized watering schedule based on your plant, soil, season, and growing method." },
    { "@type": "ListItem", "position": 3, "name": "Soil pH Calculator", "url": "https://gardencalcs.com/tools/soil-ph-calculator", "description": "Find out how much lime or sulfur to add to reach your target soil pH." },
    { "@type": "ListItem", "position": 4, "name": "Seed Spacing Calculator", "url": "https://gardencalcs.com/tools/seed-spacing-calculator", "description": "Plan plant spacing, row spacing, and total seed count for your garden beds." },
    { "@type": "ListItem", "position": 5, "name": "Fertilizer Calculator", "url": "https://gardencalcs.com/tools/fertilizer-calculator", "description": "Calculate fertilizer amounts based on NPK ratio and garden area." }
  ]
}
```

设计要点：
- `Organization` 提供站点级唯一身份与描述
- `WebSite` 补齐站点层 schema，不加 `SearchAction`（站内无 `/search` 端点）
- `ItemList` 直接以 `config/tools.ts` 的 `tools.map()` 顺序输出 5 个工具，避免手写漂移
- 不加 `logo`（当前 `public/` 无稳定 logo 资产）

## 3. Build 验证

- `npm run build` 成功
- `out/index.html` 含 3 段首页 JSON-LD `<script>`：`Organization` / `WebSite` / `ItemList`
- `grep -RhoE '"@type":"[^"]+"' out | sort -u` 输出 16 类：

```
"@type":"Answer"
"@type":"Article"
"@type":"BreadcrumbList"
"@type":"CreativeWork"
"@type":"Dataset"
"@type":"FAQPage"
"@type":"HowTo"
"@type":"HowToStep"
"@type":"ItemList"
"@type":"ListItem"
"@type":"Offer"
"@type":"Organization"
"@type":"PropertyValue"
"@type":"Question"
"@type":"SoftwareApplication"
"@type":"WebSite"
```

结论：PR-6 在原有集合上仅新增 `ItemList` / `WebSite`，未破坏既有类型。

## 4. validator.schema.org 严格 gate

### 4.1 Preview（`geo-p1-pr6-preview`）

预览 URL：`https://geo-p1-pr6-preview.gardencalcs-3f7.pages.dev`

| Schema | err | warn |
|---|---:|---:|
| Organization | 0 | 0 |
| ItemList | 0 | 0 |
| WebSite | 0 | 0 |

**结果：0 errors / 0 warnings，strict gate 通过。**

### 4.2 Production（`https://gardencalcs.com/`）

| Schema | err | warn |
|---|---:|---:|
| Organization | 0 | 0 |
| ItemList | 0 | 0 |
| WebSite | 0 | 0 |

生产远程首页同时确认存在 3 个 JSON-LD `<script>`，类型依次为：`Organization` / `WebSite` / `ItemList`。

## 5. Lighthouse 验收（首页，本地 3020，同 build 方法，取 3 次 median）

先做单次 pre/post 时出现：Pre `88 / 3964ms / 0`，Post `83 / 4815ms / 0`，与 JSON-LD 物理影响不符，判为单次本地抖动；按持久化方法论追加 pre/post 各 3 次并取中位数。

### 原始 3 次结果

| Run | Pre Perf | Post Perf | Pre LCP | Post LCP | Pre CLS | Post CLS |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 83 | 83 | 4816.16 | 4813.17 | 0 | 0 |
| 2 | 83 | 83 | 4813.53 | 4812.21 | 0 | 0 |
| 3 | 90 | 83 | 3602.59 | 4812.72 | 0 | 0 |

### Median 对照

| Metric | Pre median | Post median | Delta |
|---|---:|---:|---:|
| Perf | 83 | 83 | 0 |
| LCP | 4813.53 ms | 4812.72 ms | -0.80 ms |
| CLS | 0 | 0 | 0 |

结论：**ΔPerf = 0、ΔLCP = -0.80ms、ΔCLS = 0，全部在容差内，判定无回退，放行。**

## 6. SEO 面保护

- H1/H2 原文与顺序不变
- hero 文案不变
- Popular Tools / Browse by Category / Garden Guides 三个 section 不变
- canonical / meta / sitemap / robots / `app/layout.tsx` 不变
- 仅新增 3 段静态 `<script type="application/ld+json">`，无新 fetch、无执行逻辑、无第三方资源

---

## 部署日志

预览分支提交：`5bb2f5b` (`geo-p1-pr6-preview`)

Preview deploy：
- branch `geo-p1-pr6-preview` → `https://49f4e4e7.gardencalcs-3f7.pages.dev`
- alias → `https://geo-p1-pr6-preview.gardencalcs-3f7.pages.dev`

合并：
- `master` fast-forward 到 `5bb2f5b`
- `main` fast-forward 到 `5bb2f5b`
- `git push origin master` / `git push origin main` 成功

Wrangler 生产 deploy：
- `master` → `https://7da134d7.gardencalcs-3f7.pages.dev`
- `main` → `https://8cd74724.gardencalcs-3f7.pages.dev`
- `main` alias → `https://main.gardencalcs-3f7.pages.dev`

生产 validator 复验：
- `https://gardencalcs.com/` → `Organization / ItemList / WebSite` 全部 `err=0 warn=0`

PR-6 全部绿灯。GEO Phase 1 P1 首页 JSON-LD 补齐完成。
