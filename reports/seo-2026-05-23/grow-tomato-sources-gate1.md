# Gate 1 — `/grow/tomato` 源审批清单

日期：2026-05-23
作者：Claude
状态：**等待用户审批**（请逐源 approve / reject / 补充）

---

## 0. 原则

- 每个具体数字 / 时间窗 / 比例都要追溯到下方列出的某一条 .edu 或 .gov 源。
- 不接受 blog / Pinterest / 商业种子商作为权威源（即便它们看起来权威）。
- 单一冲突源 = 不写该数字；多源一致 = 写并 cross-cite；单源未冲突 = 写并标注 "per [source]"。
- 商业农业 vs 家庭园艺：Cornell Vegetables 主要服务商业农场，仅用于品种/病害定性，**不**用于家庭间距、施肥率等定量。

---

## 1. 已验证源池（共 13 条，全部 WebFetch 真实抓取过）

### Tier A — 全谱权威（家庭园艺定量数据来源首选）

| ID | 源 | URL | 验证状态 |
|---|---|---|---|
| A1 | UMN Extension — Growing Tomatoes | https://extension.umn.edu/vegetables/growing-tomatoes | ✅ 含具体施肥率（"½ cup 46-0-0 or 1 cup 27-3-3 per 100 ft of row"）、间距（2-3 ft）、灌水（1 in/week）、病虫害、采收 |
| A2 | UMD Extension — Growing Tomatoes in a Home Garden | https://extension.umd.edu/resource/growing-tomatoes-home-garden | ✅ 间距 18-36 in × 48-60 in、days-to-maturity 65-90、采收指标 |

### Tier B — 专题权威（对应章节使用）

| ID | 源 | URL | 用于 |
|---|---|---|---|
| B1 | UMD Extension — Vegetable pH chart (PDF) | https://extension.umd.edu/sites/extension.umd.edu/files/2021-03/B-1.pdf | pH 范围（tomato 6.0–6.8）|
| B2 | Penn State — Understanding Soil pH | https://extension.psu.edu/understanding-soil-ph/ | pH 化学、石灰/硫反应动力学 |
| B3 | Penn State — Tomato Production | https://extension.psu.edu/tomato-production | 间距交叉验证、生产参考 |
| B4 | UGA — Vegetable Planting Chart (PDF) | https://extension.uga.edu/content/dam/extension-county-offices/gwinnett-county/anr/homeshow-resources/Vegetable%20Planting%20Chart.pdf | 间距交叉验证、播种深度 |
| B5 | UMN — Watering the Vegetable Garden | https://extension.umn.edu/how/watering-vegetable-garden | 浇水原则（1 in/week，沙土更频繁）|
| B6 | USU — Water Recommendations for Vegetables | https://extension.usu.edu/yardandgarden/research/water-recommendations-for-vegetables | 浇水定量（tomato 0.75 in × 2/wk）|
| B7 | Texas A&M Easy Gardening — Watering (PDF) | https://aggie-horticulture.tamu.edu/wp-content/uploads/sites/10/2013/09/eht_024_watering_your_vegetables.pdf | 暖气候浇水补充 |
| B8 | UC IPM — Tomato | https://ipm.ucanr.edu/PMG/GARDEN/VEGES/tomato.html | **病虫害主源**：含蚜虫/角虫/早晚疫病/萎蔫/blossom-end rot/cracking 等 30+ 条目 |
| B9 | Missouri Botanical Garden — Tomato Visual Guides | https://www.missouribotanicalgarden.org/gardens-gardening/your-garden/help-for-the-home-gardener/advice-tips-resources/visual-guides/tomatoes | 病害/果实/叶片问题视觉识别（仅作为视觉参考交叉验证 UC IPM）|
| B10 | UMN — Planting the Vegetable Garden | https://extension.umn.edu/planting-and-growing-guides/planting-vegetable-garden | 何时种植（"after last frost, mid-to-late May" + 区分暖/凉季作物）|
| B11 | USDA Plant Hardiness Zone Map | https://planthardiness.ars.usda.gov/ | 地区适应性 / 霜期查询入口 |

### Tier C — 限制性使用

| ID | 源 | URL | 限制 |
|---|---|---|---|
| C1 | Cornell Vegetables — Tomatoes | https://www.vegetables.cornell.edu/crops/tomatoes/ | **仅用于品种抗病性 / 病害定性**。页面自述"Most information pertains to field-grown plants"，**禁止**用于家庭定量（间距/施肥/浇水）|

### Tier D — 已尝试但作废

| 源 | 原因 |
|---|---|
| extension.umn.edu/vegetable-disease-list | 404 |
| extension.umn.edu/disease-management/tomato-diseases | 404 |
| almanac.com/plant/tomatoes | 403（且非 .edu/.gov，本就不符合 rubric）|

---

## 2. 章节 × 源映射（哪条数据来自哪条源）

> 每行：声明 → 源 ID。如果声明没有源 ID，**不写**或标 "general guidance"。

### §1 — Direct answer + Quick reference

| 声明 | 源 |
|---|---|
| "Tomatoes grow best in pH 6.0–6.8" | B1, A1 |
| "Spacing 24 in plant × 36 in row" | A1（2-3 ft）, A2（18-36 × 48-60）, B4 |
| "Days to maturity 65-90 days from transplant" | A2 |
| "Water 1 inch per week" | A1, B5 |
| "Side-dress fertilizer when fruits begin enlarging" | A1 |

### §2 — When to plant

| 声明 | 源 |
|---|---|
| "Transplant after last frost" | B10, A2 |
| "Start indoors 5-6 weeks before outdoor planting" | A1 |
| "Hardiness zone determines specific last-frost date" | B11 |
| **不写**："zone 5 last frost is May 15"（过具体，需地区性源；保留泛化）| — |

### §3 — Soil prep & pH

| 声明 | 源 |
|---|---|
| 全部内容沿用现有 `soilPHCrops.ts` tomato 条目 + B1, B2 | B1, B2, A1 |
| 嵌入 `/tools/soil-ph-calculator` | — |

### §4 — Spacing & layout

| 声明 | 源 |
|---|---|
| 全部内容沿用现有 `seedSpacingCrops.ts` tomato 条目 | A1, B3, B4 |
| 嵌入 `/tools/seed-spacing-calculator` | — |
| 笼栽 vs 支架的间距讨论 | A1（"two to three feet in all directions between vining plants"）|

### §5 — Fertilizer schedule

| 声明 | 源 |
|---|---|
| 全部内容沿用现有 `/data/npk-rates-by-crop` tomato 条目 | A1 + 已有数据 |
| 嵌入 `/tools/fertilizer-calculator` | — |
| "½ cup 46-0-0 or 1 cup 27-3-3 per 100 ft of row when fruits enlarge" | A1（**直接引用**）|

### §6 — Watering

| 声明 | 源 |
|---|---|
| "1 inch per week ideal" | A1, B5 |
| "Tomato watering frequency: ~2× per week, 0.75 in each time" | B6（项目内 WateringScheduleCalculator 已用）|
| "Soak deeply, avoid light overhead watering" | A1 |
| 暖气候补充指引 | B7 |
| 嵌入 `/tools/watering-schedule-calculator` | — |

### §7 — Common pests & diseases（最高风险章节）

| 声明 | 源 |
|---|---|
| 害虫列表（aphids, hornworms, cutworms, flea beetles, Colorado potato beetle, whiteflies）| A1, B8 |
| 病害列表（early blight, late blight, Septoria leaf spot, bacterial spot, fusarium/verticillium wilt, mosaic virus）| A1, B8, C1（仅定性）|
| 生理障碍（blossom-end rot, cracking, sunscald, catfacing）| A1, B8 |
| 视觉识别交叉验证 | B9 |
| **不写**：具体化学农药名称 / 复方推荐 — 仅写 "consult local extension" | — |

### §8 — Harvest

| 声明 | 源 |
|---|---|
| "Harvest as soon as fruit color begins to change" | A2 |
| "Pick all fruit before first frost; ripen green tomatoes indoors" | A1 |

### §9 — FAQ（6 问，对应真实搜索意图）

| 问题 | 源 |
|---|---|
| "How long do tomato plants take to grow?" | A2（65-90 days from transplant）|
| "What is blossom-end rot and how to fix it?" | A1, B8（钙吸收 + 浇水节奏，非纯钙喷雾）|
| "Why do my tomatoes have yellow leaves?" | B8（多病因列表，按颜色/位置区分）|
| "Should I prune tomato suckers?" | A1（不确定 UMN 是否覆盖；若不覆盖，**改问题**为有源支持的问题）|
| "When are tomatoes ripe?" | A2, A1 |
| "Do tomatoes need full sun?" | A1（如有；未确认引用强度）|

### §10 — Sources（页脚显式列出全部使用的源 + 标注 Tier）

---

## 3. 我**不会**写的事（红线）

- ❌ 具体品种推荐（"Better Boy"、"Cherokee Purple"等）— 各地区适应性差异大，单源不安全。需要地区性品种推荐时直接链到 Cornell C1 或 UMN A1 内部列表。
- ❌ 化学农药商品名 + 用量 — 各州法规不同，需要本地 extension agent。
- ❌ 任何"种 X 棵能产 Y 斤"的产量估算 — 变量太多，没有可靠单源。
- ❌ 番茄药用 / 健康声称 — 非园艺范畴。
- ❌ "organic vs conventional 哪个更好" — 价值判断，不归我们说。

---

## 4. 用户审批选项

请逐条 reply：

**4.1 源池整体**
- [ ] Tier A、B 全部接受
- [ ] Tier C（Cornell 限制使用）接受
- [ ] 修改：（说明）

**4.2 章节结构（§1–§10）**
- [ ] 章节顺序和内容范围 OK
- [ ] 加：（章节）
- [ ] 删：（章节）
- [ ] 改：（说明）

**4.3 红线清单**
- [ ] §3 红线清单 OK
- [ ] 加红线：（说明）

**4.4 字数规模**
- 预估总字数 2 500–3 500，按 10 章分布。每章 250–400 字。
- [ ] OK
- [ ] 改为：______ 字 / ______ 字以下

---

**审批后我才会**：
1. 创建 `app/grow/tomato/page.tsx`（不在 `[crop]` 路由下，先做单页防误扩张）
2. 仅引用上方批准的源，每段对应源 ID 标注（页面里以引用形式呈现）
3. 走完 Gate 2（自检 vs `docs/expert-audit-rubric.md`）
4. 提交 PR diff，等 Gate 3（你的人工审）后才合并
