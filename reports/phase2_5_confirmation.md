# Phase 2.5 Confirmation — Fertilizer Calculator

## 1. 目标复述（≤25字）
把 fertilizer 页面做成高相关、高厚度、可点击的施肥主入口页。

## 2. 打算新增的 H2 段落标题
1. What an NPK fertilizer calculator actually solves
2. NPK basics: what the three numbers really mean
3. Application-rate conversions: lb/acre, lb/100 sq ft, and g/m²
4. Fertilizer recommendations for common vegetable crops
5. Slow-release vs quick-release fertilizer: when to use each
6. Risks of overapplication and salt injury
7. How to read a fertilizer label before using the calculator
8. Worked examples for home beds and small plots
9. Frequently asked questions about fertilizer timing and rates

## 3. 打算放进速查表的 10 种作物 + 引用来源
> 说明：速查表会优先采用 extension 的作物施肥建议页或 extension 汇总作物表，至少 10 个作物；如果同一 extension 文档覆盖多作物，会在来源列逐行保留对应 URL，保证可追溯。

1. Tomato  
   - 计划来源：https://aesl.ces.uga.edu/publications/soil/cropsheets.pdf
2. Pepper  
   - 计划来源：https://aesl.ces.uga.edu/publications/soil/cropsheets.pdf
3. Cucumber  
   - 计划来源：https://aesl.ces.uga.edu/publications/soil/cropsheets.pdf
4. Lettuce  
   - 计划来源：https://extension.usu.edu/yardandgarden/fruits-vegetables-herbs
5. Broccoli  
   - 计划来源：https://aesl.ces.uga.edu/publications/soil/cropsheets.pdf
6. Onion  
   - 计划来源：https://aesl.ces.uga.edu/publications/soil/cropsheets.pdf
7. Potato  
   - 计划来源：https://aesl.ces.uga.edu/publications/soil/cropsheets.pdf
8. Sweet Corn  
   - 计划来源：https://aesl.ces.uga.edu/publications/soil/cropsheets.pdf
9. Bush Bean  
   - 计划来源：https://aesl.ces.uga.edu/publications/soil/cropsheets.pdf
10. Carrot  
   - 计划来源：https://extension.usu.edu/yardandgarden/fruits-vegetables-herbs

补充备选 extension 源：
- University of Maryland Extension — Fertilizing Vegetables  
  https://extension.umd.edu/resource/fertilizing-vegetables
- Washington State University vegetable fertilizer guide  
  https://s3.wp.wsu.edu/uploads/sites/2076/2024/07/C141-Vegetable-Fertilizer-Guide.pdf
- Cornell vegetable nutrient guidelines  
  http://nmsp.cals.cornell.edu/publications/files/VegetableGuidelines2019.pdf
- Michigan State fertilizer recommendations for vegetable crops  
  https://www.canr.msu.edu/uploads/files/AABI/E0550B.pdf

## 4. 打算采用的 6 条 FAQ 题目 + 对应来源
> 所有 FAQ 正式版本只会使用 `.edu` / extension 来源。

1. How much fertilizer does a vegetable garden need?  
   - 来源：https://extension.unh.edu/resource/fertilizing-vegetable-gardens-fact-sheet
2. When should I fertilize vegetables in a home garden?  
   - 来源：https://www.pubs.ext.vt.edu/426/426-323/426-323.html
3. Can you over-fertilize a vegetable garden?  
   - 来源：https://extension.oregonstate.edu/catalog/ec-1503-fertilizing-your-garden-vegetables-fruits-ornamentals
4. What do the three numbers on fertilizer mean?  
   - 来源：https://agrilifeextension.tamu.edu/library/gardening/fertilizing/
5. Is slow-release fertilizer better than quick-release fertilizer?  
   - 来源：https://extension.illinois.edu/blogs/good-growing/2020-04-15-starting-garden-fertilization
6. Do I need a soil test before adding fertilizer?  
   - 来源：https://extensionpubs.unl.edu/publication/g945/2007/html/view

补充备选 FAQ 来源：
- Utah State University — Fertilizing for a Successful Garden  
  https://extension.usu.edu/yardandgarden/files/HG_H_02.pdf
- University of Nevada Reno Extension — Fertilizing Your Vegetable Garden  
  https://extension.unr.edu/publication.aspx?PubID=3167
- UMN Extension — Quick guide to fertilizing plants  
  https://extension.umn.edu/manage-soil-nutrients/quick-guide-fertilizing-plants

## 5. 怎么控制 LCP（图片策略、schema 注入位置）
1. **不加首屏图片或装饰图**：Phase 0 基线里 fertilizer 页虽然正文几乎空，但性能中位数并不稳定（LCP 三次里有 16.38s 的长尾值）。Phase 2 会坚持用纯 HTML 文本、表格和极轻量样式，不引入 hero image、图表库或客户端图像组件。
2. **Quick Answer 和速查表都用服务端静态 HTML**：主要内容会放进静态导出 HTML，避免新增客户端 hydration 成本；交互计算器继续沿用现有组件，不额外叠加新的 client-only widgets。
3. **Schema 放在 head 的 JSON-LD script**：继续沿用 `ToolJsonLd`，把 SoftwareApplication / HowTo / FAQPage / BreadcrumbList 作为静态 `<script type="application/ld+json">` 注入，不在可视首屏渲染复杂 DOM。
4. **避免把 FAQ 做成重量级交互**：只保留当前轻量 FAQ 折叠结构，不引入第三方 accordion 包，不增加图片、图标雪碧图或远程 embeds。
5. **表格优先文本和简单边框**：作物施肥速查表和换算表都用原生 `<table>`，不接数据网格库，控制 CSS 和 JS 体积增长。

## 6. 自查风险点
1. **内容厚度和 LCP 会互相拉扯。** 这一页当前正文只有 38 词，但 Phase 2 验收要求正文 ≥ 1200 词、H2 ≥ 5、还要加 10 行以上作物表与 6 条 FAQ。如果实现方式不克制，很容易把首屏推胖，导致 LCP 再掉出 2.5s 线。
2. **施肥推荐值最容易写成“看起来像对，实际上不严谨”。** 不同 extension 文档会用 lb/acre、lb/100 sq ft、实际养分量、商品肥料量几种不同口径；如果不在文案里明确单位和换算逻辑，很容易把纯养分推荐误写成成品肥料推荐。
3. **作物速查表容易变成“拼盘”而不是统一口径。** 我计划用 UGA/WSU/Cornell/MSU/USU 这些 extension 资料，但如果不同作物来自不同州 extension，推荐频率和单位不完全一致，必须在表格里说明“这是 home-garden quick reference，不是统一处方”。
4. **JSON-LD 四件套齐全不等于 Rich Results 一定 0 error。** 当前 `ToolJsonLd` 已有几类 schema，但 Phase 2 会同时扩写 HowTo 和 FAQ 内容；若 FAQ 字段和页面展示脱节，或文本里包含未转义字符，Rich Results 很容易报格式错误。
5. **当前页面主题信号太弱，重构后可能被 Google 重新学习。** Phase 0 暴露的不是“薄内容”，而是几乎空壳页。大改后虽然相关性会显著提升，但也要注意 title/H1/H2 的主题一致性，避免一页里把 NPK、blend、application rate 写成三个互相抢主词的入口。

## 7. 当前执行边界
我会先等你确认这份 `phase2_5_confirmation.md`，通过后再开始实际改 `fertilizer-calculator` 页面、报告和部署验证。