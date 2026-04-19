# GEO Phase 1 P1 PR-3 Verification — gardencalcs

验证时间：2026-04-19 CST
PR 范围：为 15 个 crop 页各补一个独立第三方 `.edu` extension 引用（tertiarySource 字段 + 模板渲染第 3 个 `<li>`）
执行者：Opus

---

## 1. 文件变更

| 文件 | 动作 |
|---|---|
| `config/seedSpacingCrops.ts` | 修改：`SeedSpacingCropSource.role` 联合新增 `'tertiary'`；`SeedSpacingCrop` 接口新增 `tertiarySource` 字段；15 条 crop 各补 `tertiarySource` 对象 |
| `app/tools/seed-spacing/[crop]/page.tsx` | 修改：Sources 区渲染新增一个 `<li>` 输出 tertiary |
| `reports/phase_geo_1_pr3_verification.md` | 新增 |
| `reports/lighthouse-phase-geo-1-pr3/*.json` | 新增：pre/post 原始 Lighthouse JSON |

不动 schema / H2 原文 / canonical / meta / URL / sitemap / robots / primary / secondary。

## 2. 15-crop tertiary 映射

每个 crop 现在都有 3 个独立 .edu extension 机构交叉验证。tertiary 机构分布：UMD×10、PSU×2（tomato、pepper 专题页）、ISU×2（cucumber、potato）。

| Crop | Primary | Secondary | Tertiary |
|---|---|---|---|
| tomato | UMN | UGA | PSU tomato-production |
| lettuce | USU | UGA | UMD growing-lettuce |
| carrot | UGA | USU | UMD growing-carrots |
| pepper | UMN | UGA | PSU pepper-production |
| cucumber | UMN | UGA | ISU growing-cucumbers |
| broccoli | UMN | UGA | UMD growing-broccoli |
| bush-bean | UMN | UGA | UMD growing-beans |
| sweet-corn | UMN | UGA | UMD growing-sweet-corn |
| spinach | USU | UGA | UMD growing-spinach |
| kale | USU | UGA | UMD growing-leafy-greens |
| onion | UMN | UGA | UMD growing-onions |
| radish | UMN | UGA | UMD growing-radishes |
| beet | USU | UGA | UMD growing-beets |
| zucchini | UGA | UMN | UMD summer-squash-zucchini |
| potato | UMN | UGA | ISU planting-potatoes-home-garden |

所有 URL 均经 WebSearch + WebFetch 校验，数值与页面现有 spacing 一致（非替换 primary，仅附加交叉验证）。

## 3. Build 验证

- `npm run build` 成功
- `grep -RhoE '"@type":"[^"]+"' out | sort -u` 输出 11 类，与 Phase 0 基线 **完全一致**：
```
"@type":"Answer" "@type":"Article" "@type":"BreadcrumbList" "@type":"FAQPage"
"@type":"HowTo" "@type":"HowToStep" "@type":"ListItem" "@type":"Offer"
"@type":"Organization" "@type":"Question" "@type":"SoftwareApplication"
```
- `out/tools/seed-spacing/tomato.html` 及 15 个 crop HTML 中均渲染出第 3 个 `Tertiary source (...)` 链接。

## 4. Lighthouse 验收（Phase 4 方法：crop 页本地 127.0.0.1:3020）

按已持久化的 `project_gardencalcs_lighthouse_methodology.md` 规则——vs-baseline 无回退（容差 Perf±2、LCP±200ms、CLS+0.01），当次基线现场跑：

| Crop | Pre Perf | Post Perf | ΔPerf | Pre LCP | Post LCP | ΔLCP | ΔCLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| tomato | 84 | 84 | 0.0 | 4523 | 4519 | -4 | 0 |
| lettuce | 85 | 84 | -1.0 | 4366 | 4516 | +150 | 0 |
| carrot | 84 | 88 | +4.0 | 4522 | 3926 | -596 | 0 |

全部容差内（lettuce LCP +150ms < 200ms 容差；tomato/carrot 无回退或优化）。**判定：无回退，放行。**

注：本地 http-server 绝对值 (P 84-88 / LCP 4.3-4.5s) 与 Phase 4 历史 raw JSON (P 98-99 / LCP 1.7-1.9s) 差异大，是本地 server 工具栈不同导致，按方法论规则 5 "本地静态 server 下绝对数字失真，不要直接比较"——本 PR 只看 vs-baseline 同 server 同方法的 delta。

## 5. SEO 面保护

- JSON-LD @type 11 类未变
- H2 原文 / 顺序 / canonical / meta / URL / sitemap 未动
- Googlebot 抓取面不变（仅新增一个 `<li>` 静态链接，无 script/fetch/JS）

## 6. 部署与远程验证

见本文件末尾 "部署日志" 节。

---

## 部署日志

提交：`3c2361e` on `master` + `main` (ff)
Push：`git push origin master` 和 `git push origin main` 均成功（`2f73843..3c2361e`）。

Wrangler deploy：
- master 分支：`✨ Deployment complete! https://df81090a.gardencalcs-3f7.pages.dev`（上传 68/98 新文件）
- main 分支：`✨ Deployment complete! https://ba6c89a5.gardencalcs-3f7.pages.dev`（0/98 新文件，复用缓存）

远程 curl 验证：
- `https://gardencalcs.com/tools/seed-spacing/tomato` 返回 `Tertiary source (...)` + `Penn State Extension — Tomato Production` 链接 ✓
- `https://gardencalcs.com/tools/seed-spacing/potato` 返回 `Iowa State University Extension — Planting Potatoes in the Home Garden` 链接 ✓

PR-3 全部绿灯。下一步：PR-4（H2 直答句）。
