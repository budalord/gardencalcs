# Phase 3.5 Confirmation — Compost Calculator

## 1. 目标复述（≤25字）
把 compost calculator 的性能和双意图一起校准。

## 2. H2 列表
拟定 Phase 3 正式改造后的 H2 结构如下，保证主词只锁在 title / H1 的 `compost calculator`，`compost ratio` / `C:N ratio` 仅作为 H2 子话题出现：

1. What a compost calculator should help you estimate
2. How much compost do I need for beds, lawns, and topdressing
3. Compost volume conversions for cubic feet, cubic yards, and bag counts
4. What’s the right compost ratio for fast decomposition
5. Browns and greens: how to balance a compost pile by C:N ratio
6. Common compost materials and their carbon-to-nitrogen ratios
7. How to use finished compost without overapplying it
8. Slow pile, bad smell, or soggy compost: what to fix first

说明：
- H2 #2 明确覆盖 `how much compost do I need`（用量 / 体积 / 面积计算）
- H2 #4 / #5 明确覆盖 `what's the right compost ratio`（C:N ratio / browns and greens）
- 双意图都在 H2 层级出现，但不拆掉主词 `compost calculator`

## 3. C:N 表 8 种材料 + 来源 URL 预检状态
计划在 Phase 3 正式页中新增 C:N 参考表，最少 8 行。表头拟定：`Material / C:N ratio / Type (brown or green) / Source URL`。

本轮先确认来源可用性；具体最终数值在正式编码前再逐页摘录校对，不在这一步瞎填。

| 材料 | 分类 | 计划来源 URL | curl -I 预检状态 |
|---|---|---|---|
| Dry leaves | Brown | https://content.ces.ncsu.edu/backyard-composting-of-yard-garden-and-food-discards | HTTP 200 |
| Grass clippings | Green | https://extension.umn.edu/managing-soil-and-nutrients/composting-home-gardens | HTTP 200 |
| Coffee grounds | Green | https://extension.wvu.edu/natural-resources/soil-water/composting-for-beginners | HTTP 200 |
| Kitchen / food scraps | Green | https://extension.illinois.edu/composting/how-begin | HTTP 200 |
| Wood chips / sawdust | Brown | https://extension.arizona.edu/publication/small-scale-composting-low-desert-arizona | HTTP 200 |
| Straw | Brown | https://extension.usu.edu/smallfarms/files/CompostingInUtah.pdf | HTTP 200 |
| Manure | Green | https://extension.illinois.edu/composting/how-it-works | HTTP 200 |
| Newspaper / paper products | Brown | https://yardandgarden.extension.iastate.edu/faq/what-types-material-can-be-placed-compost-pile | HTTP 200 |

补充说明：
- 来源已刻意分散到 NCSU / UMN / WVU / Illinois / Arizona / USU / Iowa State，避免单点依赖。
- 这一步只做 URL 存活校验；正式页面里的每个材料 C:N 数值必须再按原文逐项复核后录入。
- 如果正式摘录时发现某个来源只适合作为“材料是否可堆肥”的说明、但没有清晰数值，则换成 Cornell / NCSU / USU 等已验证可用的后备来源补位。

## 4. 6 条 FAQ 题目 + 来源 URL 预检状态
FAQ 来源要求全部来自 `.edu extension`，本轮先锁题目和可用 URL，不允许 reddit / brainly。

| FAQ 题目 | 计划来源 URL | curl -I 预检状态 |
|---|---|---|
| What is the ideal carbon-to-nitrogen ratio for compost? | https://extension.colostate.edu/resource/making-compost/ | HTTP 200 |
| What should I avoid putting in a home compost pile? | https://extension.umn.edu/managing-soil-and-nutrients/composting-home-gardens | HTTP 200 |
| Why does compost smell bad or stay too wet? | https://extension.illinois.edu/composting/troubleshooting-composting-problems | HTTP 200 |
| How do I know when compost is finished and ready to use? | https://extension.illinois.edu/composting/questions-about-composting | HTTP 200 |
| Should I turn the pile, cover it, or both? | https://extension.oregonstate.edu/ask-extension/featured/composting-should-i-turn-cover-or-both | HTTP 200 |
| Can I compost diseased plants such as powdery mildew material? | https://extension.oregonstate.edu/ask-extension/featured/can-i-compost-plants-powdery-mildew | HTTP 200 |

执行时注意：
- 正式 FAQ 文案必须根据这些 extension 原文改写，不自编。
- 如果最终页面需要第 7 条 FAQ 以增强覆盖，可优先从 Colorado State / Minnesota / Illinois 这三家继续扩展，因为链接已稳定。

## 5. LCP 控制方案（重点）
Phase 0 基线里 compost-calculator 的 LCP 为 **11.8s**，这是本阶段最危险的问题。按当前代码结构看，导致 LCP 黑洞的风险不在“图片太大”，而在“通用页把很多非首屏模块和 client-only 交互一起塞给页面”。

### 当前页结构判断（基于代码）
当前 compost 页仍走通用路由 `app/tools/[slug]/page.tsx`，并通过 `ToolLayout` 统一渲染。对 compost 来说，这意味着：

1. **主计算器是 client component**  
   `components/CompostCalculator.tsx` 使用 `"use client"`，内部有多组 `useState`、动态材料行、结果面板和较多交互表单。首屏的主要交互块必须等客户端 JS 接管后才能完整激活，这对 mobile LCP 不友好。

2. **通用布局把很多非首屏内容一股脑输出**  
   `ToolLayout.tsx` 在同一页面里顺序渲染：breadcrumb、H1、quick answer、工具区、HowTo、content sections、worked examples、FAQ、internal links、embed widget、related tools。即使其中很多区域不是首屏必须，它们仍参与首屏 HTML 和样式布局，容易拖大首包和布局计算。

3. **EmbedWidget 是额外的 client component**  
   `components/EmbedWidget.tsx` 也是 `"use client"`，只为了复制 iframe 代码，却在工具页正文里常驻加载。这个模块对搜索意图没帮助，对 LCP 只有负担。

4. **当前 compost 内容本身意图混杂**  
   `config/tools.ts` 里的 compost 既讲 bin dimensions / C:N ratio，又讲 hot vs cold composting，还试图回答“如何在花园里使用结果”。这使得页面在首屏没有一个足够强的单一答案块，既不纯粹回答 “how much compost do I need”，也没有把 “what’s the right compost ratio” 做成清晰的第二意图模块。

5. **当前没有图片/iframe 大媒体风险，但有客户端和模块堆积风险**  
   这意味着 Phase 3 的 LCP 优化重点应放在：
   - 首屏 HTML 结构瘦身
   - client-only 组件减负
   - 把非关键模块下沉
   - 让最快出现的 LCP 元素变成稳定的文本/表格块，而不是依赖 hydration 的交互面板

### 把 11.8s 降到 2.5s 以内的具体方案
1. **给 compost 页做专用页面，不继续完全依赖通用 slug 模板**  
   仿照 fertilizer 页 Phase 2 的做法，为 compost 做可控的专页渲染，避免被通用配置页绑死。这样可以只保留真正需要的首屏模块。

2. **把首屏 LCP 元素改成纯服务端文本块 + 精简表格**  
   H1 后先放：
   - 一句定义
   - 一个 4–6 行的“Quick answer”表
   - 一段 how-much-compost 的直接回答
   这类元素几乎不依赖 JS，容易把 LCP 锁在文本节点或简单表格上。

3. **把交互计算器下移到首屏之后**  
   首屏优先交付答案，不让 calculator 卡住 LCP。交互区可以保留，但位置放在 quick answer / 首段说明之后，必要时进一步拆成更轻的组件。

4. **移除或延后 EmbedWidget**  
   这个模块对 SEO 无帮助，建议在 Phase 3 里至少从 compost 页首个可见屏剥离；若不影响全站策略，最好整页去掉。

5. **减少首屏模块数量和首屏 DOM 深度**  
   正文、FAQ、related tools、内链卡片等都可以保留，但不应与 calculator 一起压在前 1 屏。Phase 3 的第一屏只保留：breadcrumb、H1、one-sentence answer、quick answer table、少量说明、再进入 calculator。

6. **优先让“how much compost”成为首屏意图，“ratio”下沉到正文 H2**  
   因为 `compost calculator` 主查询更接近“我要多少堆肥/体积/袋数”，而 `compost ratio calculator` 是第二意图。这样能让首屏更像一个明确答案页，而不是把两个任务同时塞进 hero。

7. **正式改造时必须重跑 Lighthouse mobile 到稳定达标**  
   目标值不是“比之前好”，而是必须做到：
   - Performance ≥ 85
   - LCP ≤ 2.5s
   - CLS ≤ 0.1

结论：当前页最像“客户端交互工具 + 通用内容壳”，不像“为移动端搜索结果优化过的答案页”。要过 Phase 3，必须先把首屏变成轻、稳、服务端优先的答案块，再把交互和第二意图往下组织。

## 6. 双意图架构怎么在 H1/H2 里体现而不拆主词
本阶段我倾向于 **方案 A：一页承载双意图，但用主次顺序切开，而不是 title / H1 并列两个主词**。

### 标题层级原则
- **Title**：只锁 `compost calculator`
- **H1**：只出现 `Compost Calculator`
- **H2**：分别承接两个子意图
  - `How much compost do I need ...`
  - `What’s the right compost ratio ...`

### 页面信息架构
1. **H1 + 首屏 quick answer**：优先回答“how much compost do I need”  
   因为这更接近主词 `compost calculator` 的直觉 intent，也更适合形成快答案与体积换算表。

2. **第二屏开始进入 ratio intent**  
   用独立 H2 讲 `compost ratio` / `C:N ratio` / `browns and greens`，明确告诉搜索引擎和用户：这个页面也覆盖配比问题，但它是子话题，不是主词替代。

3. **正文中间用 C:N 表承担二级意图**  
   材料表比抽象解释更容易承接 `compost ratio calculator` 及相关长尾。

4. **FAQ 补齐边缘查询**  
   用 FAQ 吃掉 smell / moisture / turning / disease / readiness 这类问答型长尾，不和主词抢 title/H1。

### 为什么这次不建议先拆成两个 URL
虽然工作指令书的 Phase 3 原版允许考虑拆成 `/tools/compost-ratio-calculator`，但就这次 Phase 3.5 前置判断来说，我暂时更倾向先在一个页面里完成“主词不拆、双意图分层”——原因是：
- 当前站点整体冷启动，新增 URL 会增加发现与分发成本
- 现有 `compost calculator` 已有 impression，先把母页意图校准，比立刻分裂权重更稳
- 如果这一版做完后，14 天内 `compost ratio calculator` 仍明显不涨，再进入拆页方案 B 更合理

## 7. 自查风险点
1. **风险：双意图写成“两页拼盘”，导致主词更散**  
   应对：首屏只服务主词 `compost calculator` 的用量意图；ratio 内容从 H2 开始承接，不在 title/H1 并列扩词。

2. **风险：C:N 表来源虽然活着，但具体材料数值口径不一致**  
   应对：正式录表前逐项复核原文，优先选给出明确 ratio 的 extension / Cornell / USU 等来源；必要时在表下注明 range 或 approximate，而不是硬拼统一数值。

3. **风险：为了堆内容把 LCP 再次拖爆**  
   应对：先做结构减负，再写长内容。正文 1400 词不是问题，首屏过重才是问题；FAQ、related tools、embed 等都必须后置。

4. **风险：通用 `ToolLayout` 继续绑住 compost 页，难以把首屏做轻**  
   应对：Phase 3 正式实施时优先做 compost 专页，不继续完全依赖通用 slug 模板。

5. **风险：FAQ 来源合规，但题目与页面双意图关联不够强**  
   应对：FAQ 只补充用户决策链上的真实问题（ratio / smell / readiness / turning / disease / what to avoid），不塞离题问答。
