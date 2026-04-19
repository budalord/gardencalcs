# GEO Phase 1 P0 Confirmation — gardencalcs

> 本文件是 0.5 确认预览，只描述拟执行方式与验证计划，不执行任何代码改动。

## 1. robots.txt 生成源定位

### 1.1 当前生成源
当前 `out/robots.txt` 的生成源是：
- `app/robots.ts`

不是：
- `public/robots.txt`（当前仓库中不存在该文件）
- `next.config.js`（未承担 robots 文本生成）

### 1.2 生成源现有完整代码（原样贴出）
```ts
import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
```

### 1.3 计划插入 AI 爬虫 allow 段的实现方式（代码 diff 预览，不执行）
思路：**只修改 `app/robots.ts`**，保留现有 `userAgent: "*" / allow: "/"` 与 `sitemap` 原样，再把 `rules` 从单对象扩成数组，追加 4 个 AI crawler allow 段。

预览 diff：
```diff
 import { siteConfig } from "@/config/site";
 import type { MetadataRoute } from "next";
 
 export default function robots(): MetadataRoute.Robots {
   return {
-    rules: { userAgent: "*", allow: "/" },
+    rules: [
+      { userAgent: "*", allow: "/" },
+      { userAgent: "GPTBot", allow: "/" },
+      { userAgent: "ClaudeBot", allow: "/" },
+      { userAgent: "PerplexityBot", allow: "/" },
+      { userAgent: "Google-Extended", allow: "/" },
+    ],
     sitemap: `${siteConfig.domain}/sitemap.xml`,
   };
 }
```

说明：
- 这是 **additive** 方案；
- 不新增 `/public/robots.txt`；
- 不覆盖现有 `User-agent: *` 规则；
- `Sitemap` 行保持原样。

---

## 2. llms.txt 内容骨架（预览，不写入文件）

放置位置预案：
- `public/llms.txt`

这样在 Next.js 静态导出后，预期应出现在：
- `out/llms.txt`

内容骨架预览：

```txt
# gardencalcs.com
> Free online gardening calculators and practical garden guides for home growers.

## About
> gardencalcs.com provides free gardening calculators and reference-style guides for common home-garden tasks.
> Current core coverage includes fertilizer planning, soil pH adjustment, composting, watering schedules, and seed spacing.
> Content is grounded in public university extension and .edu/.gov source material where available, with calculator pages and crop pages structured for clear, reusable answers.

## Core Tools
- Compost Calculator — https://gardencalcs.com/tools/compost-calculator — Calculate compost C:N ratio, bin volume, and balancing recommendations.
- Watering Schedule Calculator — https://gardencalcs.com/tools/watering-schedule-calculator — Estimate watering frequency based on plant, soil, season, and growing method.
- Soil pH Calculator — https://gardencalcs.com/tools/soil-ph-calculator — Estimate lime or sulfur needed to move soil toward a target pH.
- Seed Spacing Calculator — https://gardencalcs.com/tools/seed-spacing-calculator — Calculate row spacing, plant spacing, and total seed count.
- Fertilizer Calculator — https://gardencalcs.com/tools/fertilizer-calculator — Estimate NPK fertilizer dosage for a garden area.

## Core Guides
- How to Fertilize Your Vegetable Garden — https://gardencalcs.com/guides/how-to-fertilize-vegetable-garden — Fertilizer timing, NPK basics, and practical application guidance.
- Understanding Soil pH for Beginners — https://gardencalcs.com/guides/understanding-soil-ph — Soil pH basics, testing, and amendment planning.
- Complete Guide to Composting at Home — https://gardencalcs.com/guides/composting-guide — Greens vs browns, C:N ratio, and compost troubleshooting.

## Citation
> Public pages may be cited and summarized.
> Prefer the page canonical URL when referencing a tool or guide.
> If quoting numeric guidance, retain the original unit context and page URL.
> Content may be updated as calculators, crop pages, and guide coverage expand.

## Last updated
> 2026-04-19
```

说明：
- 该骨架只列站内现有核心工具与指南；
- 不新增不存在的 URL；
- 站点描述与质量声明保持保守，不夸大“权威性”，只写可验证的 `.edu/.gov/extension` 事实。

---

## 3. AI 爬虫 robots 段草案（预览，不写入）

预期追加结果（顺序上放在现有 `User-agent: *` 规则之后，`Sitemap` 之前或之后均可，但确认执行时将保持输出稳定）：

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://gardencalcs.com/sitemap.xml
```

说明：
- 现有 `User-agent: * / Allow: /` 段原样保留
- `Sitemap` 行原样保留
- 不添加 `Disallow`
- 不添加任何 Googlebot 专属规则

---

## 4. 每 PR 合并前的验证计划

### PR-1：新增 `llms.txt`
将执行：
1. `npm run build`
2. 确认 `out/llms.txt` 存在：
   ```bash
   test -f out/llms.txt && echo OK
   ```
3. 读取 `out/llms.txt` 校验内容与预览一致：
   ```bash
   python3 - <<'PY'
   from pathlib import Path
   print(Path('out/llms.txt').read_text())
   PY
   ```
4. 对比 `@type` 集合前后一致：
   ```bash
   grep -RhoE '"@type":"[^"]+"' out | sort -u
   ```
5. 对比字数 / H2 数 / FAQ 数不减少（首页 + tomato）：
   - 复用 Phase 0 的同一提取脚本
6. Lighthouse mobile：首页 + tomato 子页
   - `Perf ≥ 85`
   - `LCP ≤ 2.5s`
   - `CLS ≤ 0.1`

### PR-2：robots.txt 显式 allow AI 爬虫
将执行：
1. `npm run build`
2. 读取 `out/robots.txt`，确认：
   - 原 `User-agent: * / Allow: /` 仍在
   - `Sitemap` 行仍在
   - 新增 4 个 AI crawler allow 段
3. 对比 `@type` 集合前后一致：
   ```bash
   grep -RhoE '"@type":"[^"]+"' out | sort -u
   ```
4. 对比字数 / H2 数 / FAQ 数不减少（首页 + tomato）
5. Lighthouse mobile：首页 + tomato 子页
   - `Perf ≥ 85`
   - `LCP ≤ 2.5s`
   - `CLS ≤ 0.1`

### 回滚方式
- 两个 PR 分开提交、分开 squash merge
- 如需回滚，按 PR 粒度用单独 revert commit 回滚：
  - 回滚 `llms.txt` 只删除该新增文件
  - 回滚 `robots` 只恢复 `app/robots.ts` 到前一版本
- 不做混合提交，确保回滚边界清晰

---

## 5. 风险点自述

### 5.1 Next.js robots 路由与 `/public/robots.txt` 冲突风险
存在风险：
- 如果同时新增 `/public/robots.txt`，而站内又保留 `app/robots.ts`，会形成两个来源争抢同一路径语义，后续维护会变得不透明。

避免方式：
- **PR-2 只改 `app/robots.ts`**
- **不新建 `/public/robots.txt` 覆盖**
- 保持 robots 始终由 MetadataRoute 单点生成

### 5.2 `llms.txt` 是否会在静态导出时漏到 `out/`
存在风险，但可直接验证：
- 由于本项目使用 `output: "export"`，理论上 `public/` 中的静态文件会复制到 `out/`
- 但本 PR 必须以构建后的 `out/llms.txt` 实际存在为验收条件，不能只靠理论判断

确认方式：
- PR-1 build 后必须执行：
  ```bash
  test -f out/llms.txt && echo OK
  ```
- 并实际读取 `out/llms.txt` 内容核对

### 5.3 本阶段与硬约束的一致性
本 P0 批保持：
- 只做 additive
- 不改任何 JSON-LD
- 不改任何 H2 原文与顺序
- 不改 canonical/meta/sitemap
- 不改 Googlebot 当前抓取面
- 两个 PR 完全独立，便于回滚

---

## 6. 拟执行文件边界（供 Opus 审）

### PR-1 预期仅变更
- 新增：`public/llms.txt`
- 新增：`reports/phase_geo_1_pr1_verification.md`

### PR-2 预期仅变更
- 修改：`app/robots.ts`
- 新增：`reports/phase_geo_1_pr2_verification.md`

### 本阶段 0.5 当前仅新增
- `reports/phase_geo_1_p0_confirmation.md`
