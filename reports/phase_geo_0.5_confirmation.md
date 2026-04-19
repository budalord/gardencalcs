# GEO Phase 0.5 Confirmation — gardencalcs GEO Baseline Audit

## 1. 目标
在**不改任何代码**的前提下，建立 gardencalcs 当前 GEO（面向 AI 引擎引用）的 Phase 0 基线。

## 2. 审计范围
### 页面范围
- 首页：`https://gardencalcs.com/`
- 3 个代表作物子页：
  1. `https://gardencalcs.com/tools/seed-spacing/tomato`
  2. `https://gardencalcs.com/tools/seed-spacing/lettuce`
  3. `https://gardencalcs.com/tools/seed-spacing/carrot`

### 代表子页选择依据
原建议是“按 GSC impressions 前 3 选”。我已实查近 28 天 GSC 页面维度：
- 全站已有 12 个页面出现在 GSC 页面报表中；
- 但 **当前没有任何 `/tools/seed-spacing/[crop]` 子页进入 GSC 页面维度结果**；
- 因此本轮 0.5 采用 **fallback 样本**：沿用 Phase 4 已做 Lighthouse/模板抽测的 `tomato / lettuce / carrot` 作为代表作物子页。

## 3. 将实测的 3 个核心主词
本轮计划用于 AI 引擎引用基线测试的 3 个核心主词：
1. `tomato seed spacing`
2. `lettuce seed spacing`
3. `carrot seed spacing`

说明：
- 3 个词分别对应 3 个代表子页的主打意图；
- 都是明显的“答案型 + 数据型”查询，适合观察 AI 引擎是否引用 gardencalcs 或同类竞品。

## 4. AI 引擎测试清单
Phase 0 正式执行时，将测试以下 5 个 AI 引擎 / 入口：
1. `google.com`（观察是否触发 **AI Overviews**）
2. `perplexity.ai`
3. `chat.openai.com`（**web search 开启**）
4. `claude.ai`（**web search 开启**）
5. `Bing Copilot`

说明：
- Google 并非每个词都会触发 AI Overview；若未触发，将如实记录“未出现 AI Overview”。
- 其余 4 个引擎均以“联网 / web search 打开”为前提。

## 5. 风险点自述
本 Phase 0.5 与随后 Phase 0 正式审计，均为**只读审计**，不改任何业务代码或 SEO 资产。

明确不会做的事：
- 不修改任何页面代码、组件、文案、schema、H2、URL、canonical、sitemap、meta
- 不新增或删除任何 JSON-LD
- 不改 `robots.txt`
- 不改 `llms.txt`
- 不改构建逻辑

本阶段唯一新增文件是报告文件：
- `reports/phase_geo_0.5_confirmation.md`
- （审过后）`reports/geo_baseline.md`

因此本阶段应为：
- **零代码改动**
- **零 SEO 风险**
- **零 Lighthouse 风险**

## 6. Phase 0 正式执行后将覆盖的内容（供 Opus 预审）
待你审过本确认文件后，下一步 `geo_baseline.md` 将按四节输出：

### A. 当前状态快照
- `public/robots.txt` 全文
- 首页 + 3 个代表子页构建产物 HTML 中实际落地的 JSON-LD `@type` 集合
- `canonical` / `hreflang` 存在性确认
- `/public/llms.txt` 是否存在
- `Dataset / ItemList / speakable` 是否已存在

### B. AI 引擎引用基线
- 基础测试：5 个引擎 × 3 个主词 × 2 种提问变体（关键词式 + 问句式）= **30 次主测试**
- 追问测试：每个主词在同一会话内追加 1 次“被动引用探测”追问，观察是否会主动提到 gardencalcs
- 计划问句变体如下：
  - `tomato seed spacing` → `how far apart should I plant tomato seeds?`
  - `lettuce seed spacing` → `what is the best spacing for lettuce seeds?`
  - `carrot seed spacing` → `how far apart to sow carrot seeds?`
- 追问模板：
  - `what are the best online calculators or tools for seed spacing?`
  - `cite your sources`（针对带 Sources 面板的引擎）
- 每次记录要素：
  - 查询文本
  - 测试时间戳（到分钟 + 时区）
  - 是否确认 web search 已开启
  - 是否引用 gardencalcs（Y/N）
  - 前 5 个引用源**完整 URL**
  - gardencalcs 若未被引，则记录被引的同类竞品
- 若某个引擎因账号/权限限制无法执行，将在 B 节如实标注：`未执行，原因：账号限制`

### C. SEO 面保护清单
- 从 A 中提炼出后续 GEO Phase 不得改动的资产表

### D. GEO 机会点清单（仅识别，不改）
- `llms.txt`
- `robots.txt` 对 GPTBot / ClaudeBot / PerplexityBot / Google-Extended 的现状
- `Dataset schema` 候选页
- H2 直答句 Top 3 优先页
- `.edu/.gov inline citation` 密度观察