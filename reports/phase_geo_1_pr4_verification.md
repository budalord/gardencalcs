# GEO Phase 1 P1 PR-4 Verification — gardencalcs

验证时间：2026-04-20 CST
PR 范围：15 crop 页第一个 H2 之下插入一段 chunk-extractable 数值直答句
执行者：Opus

---

## 1. 文件变更

| 文件 | 动作 |
|---|---|
| `app/tools/seed-spacing/[crop]/page.tsx` | 修改：第一个 H2 下插入 `<p className="font-semibold text-gray-900">` 数值直答句 |
| `reports/phase_geo_1_pr4_verification.md` | 新增 |
| `reports/lighthouse-phase-geo-1-pr4/*.json` | 新增：pre/post Lighthouse 原始 JSON |

不动现有 H2 原文 / JSON-LD / canonical / meta / sitemap / robots / primary+secondary+tertiary 源。

## 2. Diff

```diff
 <h2 className="text-xl font-semibold text-gray-900">{crop.titleName} row spacing and plant spacing at a glance</h2>
 <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
+  <p className="font-semibold text-gray-900">
+    {crop.titleName} rows should be {crop.rowSpacingInches} inches apart, plants {crop.plantSpacingInches} inches in-row, seeded at {crop.seedDepthInches}, with {crop.maturityDays} to maturity.
+  </p>
   <p>
     The starting layout for {crop.name.toLowerCase()} should assume the mature crop, ...
```

## 3. Rendered 验证

以 tomato 为例，生产 HTML 包含：
> "Tomato rows should be 36 inches apart, plants 24 inches in-row, seeded at 1/4 inch, with 70-85 days to maturity."

（React 在插值边界会插入 `<!-- -->` 注释作为标记，AI 引擎和爬虫都会忽略 HTML 注释，不影响 chunk 抽取。）

## 4. Build 验证

- `npm run build` 成功
- `grep -RhoE '"@type":"[^"]+"' out | sort -u` 输出 11 类，与 Phase 0 基线 **完全一致**

## 5. Lighthouse 验收（vs-baseline，Phase 4 本地方法）

| Crop | Pre P | Post P | ΔP | Pre LCP | Post LCP | ΔLCP | ΔCLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| tomato | 85 | 84 | -1.0 | 4372 | 4517 | +145 | 0 |
| lettuce | 84 | 84 | 0.0 | 4514 | 4516 | +2 | 0 |
| carrot | 84 | 84 | 0.0 | 4515 | 4514 | -1 | 0 |

全部容差内（ΔPerf ≤1 / ΔLCP ≤145ms）。判定：无回退，放行。

## 6. SEO 面保护

- JSON-LD @type 11 类未变
- H2 原文未动（仅在其下新增 `<p>`）
- canonical / meta / URL / sitemap / robots 不变
- 新增内容是纯静态 `<p>` 节点，无 JS / fetch / 第三方资源

## 7. GEO 收益（定性）

直答句把页面的四个核心数值（row/plant/depth/maturity）浓缩到一行，位于第一个 H2 紧下方，AI 引擎（Perplexity、AI Overviews、ChatGPT search）在 chunk 抽取时更容易拿到完整结构化回答而不是散落到三段长段落里。

---

## 部署日志

提交：`3d60b33` on `master` + `main` (ff)
Push：`052a866..3d60b33` 成功推至 origin 双分支。

Wrangler deploy：
- master：`✨ Deployment complete! https://e87d9230.gardencalcs-3f7.pages.dev`
- main：`✨ Deployment complete! https://97036f9d.gardencalcs-3f7.pages.dev`

远程 curl 验证（strip `<!-- -->` 注释后）：
```
Tomato rows should be 36 inches apart, plants 24 inches in-row, seeded at 1/4 inch, with 70-85 days to maturity.
```

PR-4 全部绿灯。下一步：PR-5（Dataset schema，RRT 严格 gate）。
