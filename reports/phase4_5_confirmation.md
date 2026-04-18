# Phase 4.5 Confirmation — Programmatic Seed Spacing Crop Pages

## 1. 目标复述（≤25字）
做 15 个 seed spacing 作物子页并避免薄内容。

## 2. 15 个作物 slug 列表 + extension 来源 URL 预检状态

本阶段目标 slug 固定为：
- tomato
- lettuce
- carrot
- pepper
- cucumber
- broccoli
- bush-bean
- sweet-corn
- spinach
- kale
- onion
- radish
- beet
- zucchini
- potato

下表记录本轮用于 Phase 4 正式写作的数据来源候选 URL，以及 `curl -I -L` 预检状态。状态必须是 200 才允许进入正式编码。

| Crop slug | 计划来源 URL | 预检状态 | 备注 |
|---|---|---|---|
| tomato | https://extension.umn.edu/vegetables/growing-tomatoes | HTTP 200 | UMN vegetable guide |
| lettuce | https://extension.usu.edu/vegetableguide/leafy-greens/planting-spacing | HTTP 200 | USU leafy greens spacing page |
| carrot | https://extension.uga.edu/content/dam/extension-county-offices/gwinnett-county/anr/homeshow-resources/Vegetable%20Planting%20Chart.pdf | HTTP 200 | UGA planting chart PDF |
| pepper | https://extension.umn.edu/vegetables/growing-peppers | HTTP 200 | UMN vegetable guide |
| cucumber | https://extension.umn.edu/vegetables/growing-cucumbers | HTTP 200 | UMN vegetable guide |
| broccoli | https://extension.umn.edu/vegetables/growing-broccoli | HTTP 200 | UMN vegetable guide |
| bush-bean | https://extension.umn.edu/vegetables/growing-beans | HTTP 200 | UMN bean guide |
| sweet-corn | https://extension.umn.edu/vegetables/growing-sweet-corn | HTTP 200 | UMN guide |
| spinach | https://extension.usu.edu/vegetableguide/leafy-greens/planting-spacing | HTTP 200 | USU leafy greens spacing page |
| kale | https://extension.usu.edu/vegetableguide/leafy-greens/planting-spacing | HTTP 200 | USU leafy greens spacing page |
| onion | https://extension.umn.edu/vegetables/growing-onions | HTTP 200 | UMN guide |
| radish | https://extension.umn.edu/vegetables/growing-radishes | HTTP 200 | UMN guide |
| beet | https://extension.usu.edu/vegetableguide/root-crops/beets-and-turnips | HTTP 200 | USU root crop page |
| zucchini | https://extension.uga.edu/content/dam/extension-county-offices/gwinnett-county/anr/homeshow-resources/Vegetable%20Planting%20Chart.pdf | HTTP 200 | UGA planting chart PDF |
| potato | https://extension.umn.edu/vegetables/growing-potatoes | HTTP 200 | UMN guide |

当前判断：
- Phase 4 需要的 15 个作物来源 URL 已全部找到可用版本。
- 最终正式页里，如果某个作物页面还需要补“种植深度 / 到成熟天数 / transplant vs direct sow”之类字段，优先沿着同一 extension 体系补同类来源，尽量不混乱扩散。

## 3. 模板结构设计（统一 H2 骨架 + 作物专属数据字段）

### 统一页面骨架
所有 `/tools/seed-spacing/<crop-slug>` 页面使用统一框架，但不只替换作物名。计划骨架如下：

1. H1: `<Crop> Seed Spacing Guide`
2. Quick answer 区块（紧跟 H1）
3. H2: `<Crop> row spacing and plant spacing at a glance`
4. H2: `How deep to plant <crop> seeds or transplants`
5. H2: `How spacing changes as <crop> reaches maturity`
6. H2: `Raised bed, in-ground row, and intensive spacing tradeoffs for <crop>`
7. H2: `Common spacing mistakes when planting <crop>`
8. FAQ
9. 母页工具与相关作物页内链

### 每页必须有的作物专属数据字段
为了避免 15 页只换名字，模板数据对象至少包含：
- `cropName`
- `slug`
- `botanical / crop-type note`（可选，但能帮助差异化）
- `rowSpacingInches`
- `rowSpacingCm`
- `plantSpacingInches`
- `plantSpacingCm`
- `seedDepthInches`
- `seedDepthCm`
- `daysToMaturityRange`
- `directSowOrTransplant`
- `spacingAdjustmentNoteAtMaturity`
- `raisedBedNote`
- `airflowOrDiseaseNote`
- `extensionSources[]`
- `faq[]`

也就是说，正式实现必须是“统一骨架 + 高差异度数据字段”，而不是“统一 600 词作文模板 + 15 次替换 cropName”。

## 4. 反 thin-content 策略：每页至少要有哪些独特字段，避免「只有名字换了」

Programmatic SEO 最大风险不是页数不够，而是字段不够独特，导致所有页面像 doorway / thin page。我的反 thin-content 策略如下：

1. **Quick answer 表必须是作物专属值**  
   每页第一屏就要出现该作物的行距、株距、种植深度、成熟期数据。这个表不能共享默认值。

2. **每页正文至少写 4 类独特说明**  
   - 该作物对拥挤的反应（如通风、病害、球茎/根膨大、结果量下降）
   - 该作物在 raised bed 与 field row 的 spacing 差异
   - 该作物 mature stage 为什么要留这个空间
   - 该作物常见错误（移栽过密、幼苗不间苗、行距过窄等）

3. **FAQ 不能 15 页完全复用**  
   每页 FAQ 至少 3 条，但题目要围绕该作物真实问题：例如 tomato 会偏 prune/cage/airflow，carrot 会偏 thinning/root straightness，lettuce 会偏 head size/bolt risk。

4. **页脚来源也要作物对应**  
   不是整站统一给一个 planting chart。若某页主数据来自 UMN，就让页脚展示 UMN；若某页关键字段来自 USU 或 UGA，就直列对应 URL。

5. **把母页工具作为应用工具，不把子页伪装成重复工具**  
   子页是 guide / answer layer，不是复制 15 个同质计算器。这样结构上更像“一个工具 + 15 个 crop-specific guides”，而不是 15 个 doorway 工具壳。

## 5. LCP 控制方案（programmatic 页特别容易踩性能坑）

### 当前代码结构给出的风险
当前母页 `seed-spacing-calculator` 仍走通用 `ToolLayout`，而 `ToolLayout` 默认会：
- 输出 Quick Answer
- 输出工具交互区
- 输出 HowTo / content sections / worked examples / FAQ / internal links
- 始终挂上 `EmbedWidget`

这套结构如果直接复用到 15 个 programmatic 页，性能风险很大：
- 首屏 DOM 过重
- `EmbedWidget` 这种无价值 client 组件会被 15 页重复带上
- LCP 容易落到非必要模块，而不是 quick-answer 表格

### Phase 4 的 LCP 方案
1. **15 个子页不用通用 ToolLayout 全套壳子**  
   直接做专用 route + 专用页面模板，避免把 `EmbedWidget` 和无关模块带进去。

2. **LCP 明确锁给 quick-answer 表的第一行 cell 或其首段说明**  
   第一屏只保留：breadcrumb、H1、一句定义、quick-answer 表。这样 Lighthouse 的 LCP 更容易稳定落在服务端文本或表格单元格上。

3. **SoftwareApplication schema 指向母页，不在子页重复塞交互工具块到首屏**  
   子页只承担答案页角色，真正 calculator 作为上下文内链回母页 `/tools/seed-spacing-calculator`。

4. **避免图片 / iframe / embed / 重 client-only 组件**  
   Programmatic 页如果加图、图标网格、嵌入组件，很容易把 15 页全部拖慢。首版应坚持纯文本 + 表格 + FAQ。

5. **正式验收只抽测 3 页，但模板必须天生可复用**  
   tomato / lettuce / carrot 只是抽样，不能靠单独手工调 3 页。模板设计必须让其余 12 页天然吃到同样的轻首屏结构。

### 我的预期 LCP 元素
理想情况下，Lighthouse 报告里的 LCP element 应该是以下二选一：
- quick-answer 第一段 `<p>`
- quick-answer 表第一行的 `<td>` / `<th>` 组合中的可视文本单元格

只要 LCP 还落到复杂交互组件、embed、小组件容器，就说明模板没有减负成功。

## 6. 母页如何内链到 15 个子页

母页 `/tools/seed-spacing-calculator` 需要新增固定区块：
- H2 标题：`Crop-specific spacing guides`
- 15 个链接全部可见，不藏在折叠区里
- 每个链接用具象锚文本，而不是只写 crop 名称

建议链接形式：
- Tomato spacing guide
- Lettuce spacing guide
- Carrot spacing guide
- Pepper spacing guide
- Cucumber spacing guide
- Broccoli spacing guide
- Bush bean spacing guide
- Sweet corn spacing guide
- Spinach spacing guide
- Kale spacing guide
- Onion spacing guide
- Radish spacing guide
- Beet spacing guide
- Zucchini spacing guide
- Potato spacing guide

实现上，我倾向：
- 在母页 quick-answer / calculator 下方、正文内容前或相关资源区之前插入该模块
- 同时每个子页反向内链回母页 `/tools/seed-spacing-calculator`
- 面包屑固定为：Home → Tools → Seed Spacing Calculator → Crop Page

这样母页负责“总入口”，子页负责“长尾精确答案页”，结构上更像 cluster，不像孤立 doorway 页。

## 7. 自查风险点（必须正面回答 doorway / thin 风险）

1. **最大风险：15 页模板化过强，被 Google 判 thin / duplicate / doorway**  
   应对：每页必须有独特 spacing 数值、种植深度、成熟期说明、作物专属错误与 FAQ，不能只换标题和 quick-answer 表。

2. **风险：为了省事继续复用 ToolLayout，导致 15 页都带上 EmbedWidget 和重模块**  
   应对：Phase 4 正式实现应优先做专用页面模板，不让 programmatic 页继承通用工具壳的性能包袱。

3. **风险：来源虽然来自 extension，但有的页只能提供 spacing，无法同时覆盖 seed depth / maturity nuance**  
   应对：正式写代码时按作物补第二来源，但仍保持 `.edu extension` 优先，并在 `phase4_changes.md` 中汇总按 extension 分类的来源清单。

4. **风险：FAQ 机械复用，导致 15 页语义差异度不够**  
   应对：FAQ 至少按作物分组设计：果菜类、叶菜类、根菜类、豆类、玉米类，不允许全站同一套问答复制 15 遍。

5. **风险：sitemap 和母页内链漏掉部分子页，影响发现效率**  
   应对：正式实现后必须对 `out/sitemap.xml` 和母页 HTML 同时校验，确保 15 个 URL 全进 sitemap，母页也有 15 条可爬内链。

## 结论

Phase 4.5 现在已经具备开工条件：
- 15 个 slug 已锁定
- 每个作物已找到至少 1 个可用 extension 来源 URL
- 模板与反薄内容策略已明确
- 性能策略明确偏向“轻首屏 + quick-answer 承担 LCP + 不复用 EmbedWidget”
- 风险最大项（doorway / thin content）已正面识别

下一步在你批准后执行的正式实现重点会是：
1. 建 15 个静态 crop pages
2. 母页加 crop guide 内链区块
3. sitemap 验证
4. 抽测 3 页 Lighthouse 中位数
5. 输出 `reports/phase4_changes.md`
