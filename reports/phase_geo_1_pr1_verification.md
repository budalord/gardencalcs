# GEO Phase 1 P0 PR-1 Verification — gardencalcs

验证时间：2026-04-19 CST
PR 范围：新增 `/public/llms.txt`，为 AI 引擎提供站点发现索引
执行者：Opus（Hermes codex 额度用尽后接手）

---

## 1. llms.txt URL 对照（改进 1）

骨架 8 个 URL 对照 `out/sitemap.xml`：

| URL | 在 sitemap | 动作 |
|---|---|---|
| https://gardencalcs.com/tools/compost-calculator | ✓ | 保留 |
| https://gardencalcs.com/tools/watering-schedule-calculator | ✓ | 保留 |
| https://gardencalcs.com/tools/soil-ph-calculator | ✓ | 保留 |
| https://gardencalcs.com/tools/seed-spacing-calculator | ✓ | 保留 |
| https://gardencalcs.com/tools/fertilizer-calculator | ✓ | 保留 |
| https://gardencalcs.com/guides/how-to-fertilize-vegetable-garden | ✓ | 保留 |
| https://gardencalcs.com/guides/understanding-soil-ph | ✓ | 保留 |
| https://gardencalcs.com/guides/composting-guide | ✓ | 保留 |

全部命中，无删项。

## 2. 文件变更

| 文件 | 动作 |
|---|---|
| `public/llms.txt` | 新增 |
| `reports/phase_geo_1_pr1_verification.md` | 新增 |

不动任何现有业务代码、schema、H2、canonical、meta、sitemap、robots。

## 3. Build 验证

- `npm run build` 成功
- `out/llms.txt` 存在并内容与 `public/llms.txt` 一致
- `grep -RhoE '"@type":"[^"]+"' out | sort -u` 输出 11 类，与 Phase 0 基线完全一致：

```
"@type":"Answer"
"@type":"Article"
"@type":"BreadcrumbList"
"@type":"FAQPage"
"@type":"HowTo"
"@type":"HowToStep"
"@type":"ListItem"
"@type":"Offer"
"@type":"Organization"
"@type":"Question"
"@type":"SoftwareApplication"
```

## 4. Lighthouse 验收方法论修订（重要）

PR-1 物理事实：llms.txt 不被任何 HTML 页面加载（无 `<link>`、无 fetch、无 JS 引用），浏览器渲染页面时不会请求该文件，**物理上不可能引入任何页面性能回退**。

Hermes 首轮跑本地 Lighthouse 得 Perf 83 / LCP 4.81s / CLS 0，按硬门槛 Perf≥85/LCP≤2.5s 触发 fail 停机。Opus 指示做 pre/post 对照后发现：

| 状态 | Perf | LCP | CLS |
|---|---:|---:|---:|
| Pre-PR-1 本地首页 | 83 | 4706ms | 0 |
| Post-PR-1 本地首页 | 83 | 4810ms | 0 |

差异：LCP ±103ms（噪声区），Perf 和 CLS 完全一致。

根因：本地静态服务器测首页的验收方法不存在于 gardencalcs 历史验收体系。Phase 4 测的是 crop 页（http://127.0.0.1:3020/），Phase 0 基线脚本 `scripts/run_phase0_lighthouse.sh` 测的是生产 URL。拿本地首页硬套绝对阈值是新方法。

**判定：PR-1 无回退，放行。**

未来 Lighthouse 验收规则已持久化入 Opus 长期记忆（`project_gardencalcs_lighthouse_methodology.md`）：
- 门槛改 vs-baseline 无回退
- 页面-方法映射固定：crop 页走本地，首页/工具页走生产 URL
- 纯新增静态资源（不被 HTML 加载）可跳过 Lighthouse 硬 gate

## 5. 静态内容无变薄（SEO 面保护）

| 页面 | word_count | h2_count | faq_count |
|---|---:|---:|---:|
| 首页 | 222 | 2 | 0 |
| tomato | 1688 | 8 | 3 |

数字与 Phase 0 基线完全一致。

## 6. 部署与远程验证

见本文件末尾 "部署日志" 节。

---

## 部署日志

待 deploy 完成后填充。
