# gardencalcs 项目近况总结

日期：2026-05-23
覆盖窗口：2026-04-17 至 2026-05-07（上一次状态快照 `gardencalcs_seo_geo_status_2026-04-24.md` 之后的演进 + 本地未推送变更）
分支：`master`（领先 `origin/master` 3 个提交，尚未推送）

---

## 0. 一句话现状

过去一个月项目沿着「SEO / GEO 提速 → 设计系统重做 → 数据资产扩张 → 园艺专家审计加固」这条主线推进，最近一次提交是把 5 月初的横向专家审计沉淀成一份评审清单（rubric），未推送到远端；工作树本身基本干净，只有自动产物 `tsconfig.tsbuildinfo` 改动 + 一些未跟踪的报告/文档目录。

---

## 1. 最近一个月的提交脉络

按时间倒序，分阶段看：

### 1.1 园艺专家审计（5 月 7 日，最新两次提交，未推送）

- `a776f86` `docs: add expert-audit rubric` — 新增 `docs/expert-audit-rubric.md`（244 行）。把本次审计修掉的 11 个缺陷固化成「新计算器 / 新作物页合并前必须过」的红/黄旗清单，含安全门、数学完整性、数据完整性、植物学精度、合并前后验证步骤。
- `8dcfc52` `expert-audit: fix safety + accuracy issues across 5 calculators + 3 guides` — 横向修了一波硬伤，幅度不小（8 文件 / +340 / -89）：
  - **安全 S1**：CompostCalculator 把「生粪肥」拆成禽/牛/马/羊 4 类并接入 Cornell CWMI C:N，加上 USDA Produce Safety Rule 90/120 天等待期和 131 °F / 55 °C 热堆要求；FertilizerCalculator 把 `Math.max(N,P,K)` 这条会强迫用户超施 P 的逻辑改成以 N 驱动，超量 P/K 显式提示并链 USEPA 营养污染指南。
  - **准确性 S2**：SeedSpacingCalculator 改成接受长 × 宽，不再强制方形苗床；WateringScheduleCalculator 容器系数 1.4 → 3.0、沙土 1.3 → 1.5、薰衣草基线 0.5 → 0.25 in/wk；SoilPHCalculator 加石灰 > 10 lb/100 ft²、硫 > 2 lb/100 ft² 的分次提醒，石灰复测 3 个月 → 6 个月。
  - **一致性 S3**：堆肥 C:N 对齐 Cornell CWMI Appendix A.1 中位值；施肥指南 N 速率从 lb/100 ft² 改为 lb/1000 ft² 与 `/data/npk-rates-by-crop` 对齐。
  - **抛光 S4**：土壤 pH 指南修正 Fe/Mn 溶解阈值并补 P 固定机理；堆肥指南限定咖啡渣 ≤ 20–30 % 绿料（化感）并区分热/冷堆时间线。

  ➜ 这一批是已落本地的「质量底线」修复，对未来 SEO/GEO 收益的影响是降低 LLM/Extension 引用时被打脸的风险，而不是直接堆指标。

### 1.2 SEO 守位 + 数据资产扩张（4 月 24 – 29 日）

- `4951a0c` `seo: lock in seed-spacing #1 ranking and push compost into top10` — 已知 seed-spacing-calculator 拿到了 #1，这次为了挡住商业农业域名做的纵深：title/desc 强化「Vegetable / raised bed」家庭园艺信号；quickAnswer 从 10 作物扩到 15 + 加播种深度列；compost C:N 表 8 → 20 种材料（兑现 meta 里「20 materials」承诺）；新增 garlic / pea / cabbage / cauliflower / swiss-chard 5 个作物子页（各带 3 条 extension 引用 + uniqueFaq + 4 schemas）。Lighthouse 对照：cabbage 新页 0.94 ≈ tomato 旧页 0.94，无回归。
- `e41655a` `feat: add embed hub and compost data asset` — embed 中心 + 堆肥数据资产，配合外链 / 引用积累。
- `06766a1` `geo: expand llms.txt coverage + add ai.txt` — 扩 `llms.txt`、加 `ai.txt`，给 AI 抓取面进一步显式开放。

### 1.3 设计系统重做 + 元信息打磨（4 月 22 – 23 日）

- `b481ac1` 把全站迁到 Editorial Almanac 设计系统；
- `8761f00` 收紧 title、加内链权重，重建 P00 设计系统；
- `59cad03` 关键修复：阻止 root layout 把整站 canonical 广播为首页；
- `8035529` 上线带 source 引用的 `npk-rates-by-crop` 数据页；
- `a1feb3b` 重写全站 title / description 提升 CTR。

### 1.4 GEO 第一阶段（4 月 17 – 20 日，PR 流水线）

按 P0 → P1 推进，每个 PR 都配 verification 报告：

- P0：`/llms.txt`（PR-1）、robots.txt 显式放行 AI 爬虫（PR-2）。
- P1：15 个作物页加 `.edu` 引用（PR-3）、加可被切片提取的直答 H2 句（PR-4）、加 Dataset JSON-LD（PR-5）、首页加 Organization/WebSite/ItemList schema（PR-6）。

### 1.5 性能与早期 SEO（4 月 17 – 19 日）

- Phase 0–5 的 SEO + 性能改造（baseline → SERP → P0 优化 → fertilizer/compost 重建 → seed-spacing 程序化 15 个作物子页 → Cloudflare edge cache 修复）。
- 标志性数字：compost-calculator LCP **11.8 s → 1.87 s**（`6144e61` Phase 3）。

---

## 2. 工作树状态

```
On branch master
Your branch is ahead of 'origin/master' by 3 commits.
modified:   tsconfig.tsbuildinfo            ← 自动产物，可忽略
Untracked:
  .DS_Store                                 ← 系统垃圾
  .claude/                                  ← 本机 agent 配置
  design-mocks/P16-Promo-Images.html        ← 新 mock，未纳入
  gardencalcs-docs/                         ← 本目录（含 5/23 这份）
  gardencalcs.md                            ← 项目说明草稿
  reports/lighthouse-expert-audit/          ← 5/7 审计后跑的 6 份 Lighthouse JSON
```

未推送提交（3 个）：

```
a776f86 docs: add expert-audit rubric ...
8dcfc52 expert-audit: fix safety + accuracy issues ...
4951a0c seo: lock in seed-spacing #1 ranking ...
```

➜ 注意 `4951a0c` 已经是 4/29 的提交但仍未推送。如果生产部署依赖 master push，5 月 7 日做的安全修复目前**只在本地**。

---

## 3. 报告 / 数据资产盘点

`reports/` 下结构反映了演进顺序，每个阶段都有自己的 verification + Lighthouse JSON：

- `phase0_baseline.md` / `phase0_serp/` — 起点基线
- `phase{1..5}_changes.md` + `phase{1..5}_5_confirmation.md` — 5 个 SEO 阶段
- `phase5_final_verification.md` — Phase 5 收尾
- `phase_geo_0.5_confirmation.md`, `phase_geo_1_p0_confirmation.md`, `phase_geo_1_pr{1..6}_verification.md` — GEO 阶段
- `lighthouse-phase2/3/4/5/` + `lighthouse-phase-geo-1-pr{3..6}/` — 分阶段 Lighthouse 原始 JSON
- `lighthouse-post-2026-04-29/` — 4/29 seed-spacing 守位时的回归 baseline
- **`lighthouse-expert-audit/`（未提交）** — 5/7 审计后的 6 份 JSON：
  `compost-calculator.json` / `fertilizer-calculator.json` / `seed-spacing-calculator.json` / `soil-ph-calculator.json` / `tomato.json` / `watering-schedule-calculator.json`
- 单点审计：`fertilizer_pos72_audit.md`、`seed_spacing_crop_index_audit.md`、`geo_baseline.md`

`gardencalcs-docs/` 下沉淀的产品/运营资料（最新一次是 4/24）：

- `gardencalcs_seo_geo_status_2026-04-24.md` — 上一次的现状快照（23 K）
- `site-overview.md`、`embed-outreach-prospects.md`、`HANDOFF.md`、`gardencalcs_workorder.md`、`dormant_sites_*`、`site_selection_research.md`、`start.md`

---

## 4. 与 4/24 快照相比，发生了什么

`gardencalcs_seo_geo_status_2026-04-24.md` 那时候关注的是「seed-spacing 刚到 #1、compost 想推进 top10、外链 0」。这一个月里：

1. **守位动作做了**（`4951a0c`）：seed-spacing 加家庭园艺信号 + 5 个新作物子页；compost 数据表扩到 20 材料兑现 meta 承诺。
2. **GEO 表面继续扩**：`llms.txt` 扩面 + `ai.txt`、embed hub、compost 数据资产。
3. **质量底线被外部审计打过一遍**（5/7）：发现了 fertilizer 计算器的 `Math.max(N,P,K)` 会迫使超施 P 这种**真实硬伤**，已修。这条质量线现在以 rubric 形式写死，未来新计算器/作物页合并前要过。
4. **缺口仍在**：4/24 快照点名「没有 GSC、没有 GA、外链 0」——本仓代码侧看不到这三项被解决的迹象；本次也没有新的外链 / GSC 接入提交。

---

## 5. 接下来值得关注的几件事（仅观察，未行动）

- **3 个未推送的提交**：包括 5/7 的安全修复。要不要 push 取决于部署策略，至少要确认一下。
- **`reports/lighthouse-expert-audit/` 未跟踪**：6 份 JSON 体量不小（~5 MB），如果按之前阶段的惯例是要进库做 baseline 的，应决定 commit 还是加 `.gitignore`。
- **`gardencalcs.md` / `design-mocks/P16-Promo-Images.html`**：未跟踪，状态不明，需要决定归属。
- **rubric 已经写好但还没绑定流程**：`docs/expert-audit-rubric.md` 目前是文档，是否要加到 PR template / CI 检查里没看到信号。
- **外链 / GSC 接入仍是 4/24 留下来没动的洞**：站内动作已经做到很饱和，下一轮增长曲线主要靠站外。
