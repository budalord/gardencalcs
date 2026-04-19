# GEO Phase 1 P0 PR-2 Verification — gardencalcs

验证时间：2026-04-19 CST
PR 范围：`app/robots.ts` 显式 allow 4 个 AI 爬虫（additive，不触碰现有 `User-agent: *` 和 Sitemap）
执行者：Opus（Hermes codex 额度用尽后接手）

---

## 1. 文件变更

| 文件 | 动作 |
|---|---|
| `app/robots.ts` | 修改：`rules` 从单对象扩成 5 元素数组 |
| `reports/phase_geo_1_pr2_verification.md` | 新增 |

未新建 `/public/robots.txt`（规避双源冲突）。未动任何其他文件。

## 2. Diff

```diff
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

## 3. Build 验证（改进 2：out/robots.txt 顺序确认）

`npm run build` 成功。

`out/robots.txt` 全文：

```
User-Agent: *
Allow: /

User-Agent: GPTBot
Allow: /

User-Agent: ClaudeBot
Allow: /

User-Agent: PerplexityBot
Allow: /

User-Agent: Google-Extended
Allow: /

Sitemap: https://gardencalcs.com/sitemap.xml
```

- 5 段 `User-Agent` 按数组顺序排列（`*` 在首 ✓）
- `Sitemap:` 出现在最后一行 ✓
- 原 `User-agent: *` / `Allow: /` 段保留 ✓
- 无 `Disallow` ✓

## 4. SEO 面保护验证

- `grep -RhoE '"@type":"[^"]+"' out | sort -u` 输出 11 类，与 Phase 0 基线完全一致
- JSON-LD / H2 / canonical / meta / sitemap / 页面字数均未改动
- Googlebot 抓取面未变化（仍然隐式继承 `User-agent: *` → `Allow: /`）

## 5. Lighthouse

robots.txt 与 llms.txt 同类：**不被任何 HTML 加载，物理上不影响页面性能**。按已持久化的方法论（`project_gardencalcs_lighthouse_methodology.md` 第 3 条"纯新增静态资源可跳过 Lighthouse 硬 gate"），本 PR 跳过 Lighthouse 环节。

## 6. 部署日志

待 deploy 完成后填充。
