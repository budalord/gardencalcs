# GEO Phase 1 P1 PR-5 Verification — gardencalcs

验证时间：2026-04-20 CST
PR 范围：15 crop 页新增第 4 个 JSON-LD schema（`Dataset` + 嵌套 `PropertyValue` / `CreativeWork`），并通过 validator.schema.org 严格 gate
执行者：Opus

---

## 1. 文件变更

| 文件 | 动作 |
|---|---|
| `app/tools/seed-spacing/[crop]/page.tsx` | 修改：新增 `datasetSchema` 对象 + 第 4 个 `<script type="application/ld+json">` 标签 |
| `reports/phase_geo_1_pr5_verification.md` | 新增 |
| `reports/lighthouse-phase-geo-1-pr5/*.json` | 新增：pre/post Lighthouse 原始 JSON |

不动：现有 3 个 schema（SoftwareApplication / FAQPage / BreadcrumbList）、H2 原文、canonical / meta / sitemap / robots / primary+secondary+tertiary 源 / PR-4 直答句。

## 2. Dataset schema 结构

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "{Crop} seed spacing dataset",
  "description": "Row spacing, plant spacing, seed depth, and days-to-maturity ... cross-checked against three independent university extension sources.",
  "url": "https://gardencalcs.com/tools/seed-spacing/{slug}",
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "creator": { "@type": "Organization", "name": "gardencalcs.com", "url": "https://gardencalcs.com" },
  "isBasedOn": [
    { "@type": "CreativeWork", "name": "{primary.label}", "url": "{primary.url}" },
    { "@type": "CreativeWork", "name": "{secondary.label}", "url": "{secondary.url}" },
    { "@type": "CreativeWork", "name": "{tertiary.label}", "url": "{tertiary.url}" }
  ],
  "variableMeasured": [
    { "@type": "PropertyValue", "name": "Row spacing", "value": {int}, "unitText": "inch" },
    { "@type": "PropertyValue", "name": "Plant spacing", "value": {int}, "unitText": "inch" },
    { "@type": "PropertyValue", "name": "Seed depth", "value": "{str}" },
    { "@type": "PropertyValue", "name": "Days to maturity", "value": "{str}" }
  ]
}
```

设计要点：
- `isBasedOn` 把 PR-3 的三个 extension 引用正式接入 schema，AI 引擎可直接追溯数据源
- `variableMeasured` 覆盖 PR-4 直答句的四个字段，与页面 table / 直答句数值完全一致
- `license` 声明 CC-BY-4.0 便于 AI 引擎引用

## 3. Build 验证

- `npm run build` 成功
- `@type` 集合新增 `Dataset`、`PropertyValue`、`CreativeWork` 3 类（11 → 14），全部为合法 schema.org 类型
- 每个 crop HTML 的 JSON-LD `<script>` 数从 3 个升至 4 个

## 4. RRT 严格 gate — validator.schema.org

先 deploy preview 分支：`https://aa953adf.gardencalcs-3f7.pages.dev`（branch alias `geo-p1-pr5-preview`）。

对 tomato / lettuce / carrot / potato 四个代表 crop 跑 `validator.schema.org/validate` API：

| Crop | SoftwareApplication | BreadcrumbList | Dataset | FAQPage |
|---|:---:|:---:|:---:|:---:|
| tomato | err=0 warn=0 | err=0 warn=0 | **err=0 warn=0** | err=0 warn=0 |
| lettuce | err=0 warn=0 | err=0 warn=0 | **err=0 warn=0** | err=0 warn=0 |
| carrot | err=0 warn=0 | err=0 warn=0 | **err=0 warn=0** | err=0 warn=0 |
| potato | err=0 warn=0 | err=0 warn=0 | **err=0 warn=0** | err=0 warn=0 |

**0 errors / 0 warnings**。严格 gate 通过。

## 5. Lighthouse 验收（vs-baseline，Phase 4 本地方法）

| Crop | Pre P | Post P | ΔP | Pre LCP | Post LCP | ΔLCP | ΔCLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| tomato | 84 | 84 | 0.0 | 4515 | 4524 | +9 | 0 |
| lettuce | 84 | 85 | +1.0 | 4518 | 4367 | -151 | 0 |
| carrot | 84 | 85 | +1.0 | 4516 | 4365 | -151 | 0 |

全部容差内（ΔPerf ≤1，ΔLCP ≤151ms）。lettuce/carrot 小幅改善（噪声）。**判定：无回退，放行。**

## 6. SEO 面保护

- 现有 3 个 schema 原样保留
- H2 原文 / 顺序不变
- canonical / meta / URL / sitemap / robots 不变
- PR-3 tertiary 链接、PR-4 直答句均保留

---

## 部署日志

Preview 分支：`geo-p1-pr5-preview` → `https://aa953adf.gardencalcs-3f7.pages.dev`（用于严格 gate 验证）。

通过 gate 后正式提交：`7db5d8a` on `master` + `main` (ff)。
Push：`026acf0..7db5d8a` 成功推至 origin 双分支。

Wrangler 生产 deploy：
- master：`✨ Deployment complete! https://fff50afb.gardencalcs-3f7.pages.dev`
- main：`✨ Deployment complete! https://514ad4c6.gardencalcs-3f7.pages.dev`

生产远程 curl + validator.schema.org 复验 `https://gardencalcs.com/tools/seed-spacing/tomato`：
```
SoftwareApplication: err=0 warn=0
BreadcrumbList: err=0 warn=0
Dataset: err=0 warn=0
FAQPage: err=0 warn=0
```

PR-5 全部绿灯。下一步：PR-6（首页 JSON-LD 补齐）。
