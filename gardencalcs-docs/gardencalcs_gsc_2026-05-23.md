# gardencalcs Google Search Console 现状（30 天）

日期：2026-05-23
数据窗口：2026-04-23 → 2026-05-22（GSC 实际可用到昨天）
对照窗口：2026-03-24 → 2026-04-22（前 30 天）
来源：`~/.hermes/scripts/gardencalcs_gsc_daily.py` + 站点服务账号 `avian-silicon-474508-h0`
站点：`https://gardencalcs.com/`

---

## 0. 一句话定性

过去 30 天**曝光翻了 2.5 倍、点击翻倍、平均排名从 ~19 推到 14**，但**绝对体量仍极小**（21 clicks / 3201 imp），CTR 几乎没动；同时**项目内"seed-spacing 已经 #1"的叙事在 GSC 数据里并没有体现**，需要确认那次 #1 的口径。

---

## 1. 总量对照

| 指标 | 近 30 天 | 前 30 天 | 变化 |
|---|---|---|---|
| Clicks | **21** | 9 | **+12（+133 %）** |
| Impressions | **3 201** | 1 261 | **+1 940（+154 %）** |
| CTR | **0.66 %** | 0.71 % | **−0.05 pp（基本持平）** |
| Avg position | **14.41** | 19.40 | **−4.99（排名前进约 5 位）** |

➜ **健康曲线**：曝光和排名同步走好，CTR 没掉。
➜ **隐忧**：CTR 在 0.66 % 这个水位，对 14 名的平均位置来说**偏低**——通常 pos 10–15 的合理 CTR 在 1.5–3 %。说明**标题/描述还没把曝光转化成点击**。

最近 14 天逐日（5/19 起明显走弱，可能是 GSC 延迟，也可能是真信号，需要再观察 2-3 天）：

```
2026-05-08  imp=129  pos=12.89   ← 高位
2026-05-09  imp=116  pos=12.89
2026-05-10  imp= 94  pos=12.49   ← 1 click
2026-05-11  imp=129  pos=14.26
2026-05-12  imp=114  pos=20.32
2026-05-13  imp=106  pos=14.55   ← 1 click
2026-05-14  imp= 74  pos=16.76   ← 1 click
2026-05-15  imp= 97  pos=22.62   ← 1 click
2026-05-16  imp=107  pos=14.63   ← 1 click
2026-05-17  imp=127  pos=16.54   ← 1 click
2026-05-18  imp= 93  pos=22.04   ← 1 click
2026-05-19  imp= 52  pos=19.54   ← 跌
2026-05-20  imp= 57  pos=24.40   ← 2 clicks (好转)
2026-05-21  imp= 51  pos=23.43   ← 仍低
```

---

## 2. 页面层面：谁在跑

| 页面 | clicks | imp | CTR | pos | 解读 |
|---|---|---|---|---|---|
| `/tools/soil-ph-calculator` | 6 | **972** | 0.62 % | **9.32** | 真正的主力页，已上 pos 10，但 CTR 拉胯 |
| `/tools/compost-calculator` | 6 | 500 | 1.20 % | 20.29 | 卡在第二页门口，需要再前推一档 |
| `/tools/seed-spacing-calculator` | 1 | 407 | 0.25 % | 10.38 | 曝光大但 CTR 异常低 — 标题/描述疑点 |
| `/tools/seed-spacing/carrot` | 3 | 266 | 1.13 % | 14.35 | 程序化作物子页中表现最好 |
| `/tools/seed-spacing/potato` | 1 | 217 | 0.46 % | 14.74 | 第二好的作物子页 |
| `/tools/seed-spacing/tomato` | 1 | 69 | 1.45 % | 12.55 | 体量小但 CTR 健康 |
| `/data/npk-rates-by-crop` | 0 | 72 | 0 | 26.24 | 新数据页（4/23 上线）已进入索引 |
| `/data/compost-cn-ratios` | 1 | 47 | 2.13 % | 14.15 | 数据资产开始拿点击 |
| `/guides/how-to-fertilize-vegetable-garden` | 0 | 29 | 0 | 50.17 | 还在第五页 |
| `/` | 2 | 10 | 20.00 % | 18.30 | 品牌词流量入口 |

### 关键观察

1. **`soil-ph-calculator` 才是真正接近 top10 的页（pos 9.32）**，但 972 曝光只换来 6 点击。这是单点改造 ROI 最高的位置——把标题/描述往 CTR 上调一档，预计能拿到 2-3× 点击。
2. **`seed-spacing-calculator` 主计算器页 pos 10.38、CTR 0.25 %**——这个 CTR 在十位上是**异常低**。要么是标题没吸引力，要么是被 SERP 上的 People Also Ask / 知识面板压制。值得人工 SERP 复核。
3. **程序化作物子页**（carrot/potato/tomato）已经在拿真实点击，证明 4/18 那批 15 个子页的策略**确实有效**——是站内 click 增长的主要来源。

---

## 3. 查询层面：用户在搜什么

**Top 15 查询（30 天）**：

| 查询 | clicks | imp | pos | 备注 |
|---|---|---|---|---|
| seed spacing calculator | **1** | 10 | **26.90** | ⚠ 见 §6 |
| 400 rows carrots 300 plants per row | 0 | 10 | 9.40 | 长尾计算意图 |
| calculate bushes for 48 zucchinis | 0 | **80** | 5.53 | **第一大长尾**，pos 5 但 0 点击 |
| carrot seed spacing | 0 | 3 | 47.67 | |
| carrot spacing | 0 | 4 | 50.50 | |
| ag lime calculator | 0 | 1 | 89.00 | |
| best garden fertilizer for vegetables | 0 | 1 | 20.00 | |
| c n ratio | 0 | 1 | 84.00 | |
| carrot soil ph extension 5.5 7.0 | 0 | 2 | 9.50 | 第三方引用回链信号 |

➜ **`calculate bushes for 48 zucchinis` 拿了 80 次曝光、pos 5、0 点击**——这是单查询里最大的转化漏斗失败。可能原因：snippet 没明示"我能直接算 N 株作物"。这条查询模式（"calculate X for N plants"）值得做一个落地页或调 quickAnswer。

**前 30 天对比**：当时主力查询是 "soil ph calculator"（2 clicks, pos 16.95）、"how much lime per square foot garden calculator"（1 click, pos 2.53），"compost calculator" 还在 pos 59；现在 compost-calculator 页已进入 pos 20，**搜索关键词正在向 calculator 主类目集中**。

---

## 4. 地理与设备

**国家**（按曝光）：

| 国 | clicks | imp | pos |
|---|---|---|---|
| 🇺🇸 USA | 15 | 2 131 | 13.91 |
| 🇨🇦 CAN | 2 | 120 | 11.29 |
| 🇯🇵 JPN | 2 | 17 | 5.94 |
| 其它（IRN/ROU/...) | ≤1 | ≤4 | – |

➜ USA 占 ~67 % 曝光、~71 % 点击——站点的"美国家庭园艺"定位**搜索意图侧已经对上了**。

**设备**：

| 设备 | clicks | imp | CTR | pos |
|---|---|---|---|---|
| Mobile | **11** | 785 | **1.40 %** | 8.49 |
| Desktop | 8 | **2 403** | **0.33 %** | 16.39 |
| Tablet | 2 | 13 | 15.38 % | 6.85 |

➜ **Desktop 拿了 75 % 曝光但只贡献 38 % 点击**——Desktop SERP 上**几乎所有 calculator 类查询都被零点击 SERP（Featured Snippet/计算面板/People Also Ask）抢走**。这是宏观层面的问题，不是单页能完全解的。Mobile SERP 因为屏幕窄、富功能少，蓝链点击更高（CTR 1.40 %）。

---

## 5. 与项目叙事的对比

| 项目内说法（来自 4/24 status 和 4/29 提交） | GSC 30 天实际 | 一致？ |
|---|---|---|
| "seed-spacing 拿到了 #1" | "seed spacing calculator" 查询：pos **26.90**；`seed-spacing-calculator` 页：pos **10.38** | ❌ 对不上 |
| "compost 想推进 top10" | `compost-calculator`：pos **20.29** | ✅ 还在路上 |
| "外链 0" | 引用页面 = 0（GSC 没显式数据但 SERP 没出现第三方引用） | 大概率仍为 0 |
| "Phase 3 把 compost LCP 从 11.8s → 1.87s" | 排名从 prev30 的 pos 59 → 当前 pos 20 | ✅ 性能改善后大幅前移 |
| "5/7 expert-audit 修了 fertilizer 的 Math.max(N,P,K)" | 这 3 个提交**未推送**，未上线，GSC 看不到效果 | ⚠ 待推送 |

---

## 6. ⚠ 需要确认：seed-spacing "#1" 的口径

`gardencalcs_seo_geo_status_2026-04-24.md` 和 commit `4951a0c`（4/29）都明确说 **seed-spacing-calculator 拿到 #1，需要守位**。

GSC 30 天数据：

- 查询 "seed spacing calculator"：**pos 26.90**（10 曝光、1 点击）
- 页面 `/tools/seed-spacing-calculator`：**pos 10.38**（407 曝光、1 点击）

两种可能：

1. **#1 是手动 SERP 截图看到的**（无痕浏览器 / 特定地理 / 特定时间窗），但 GSC 加权平均上不是 #1。GSC 的 position 是按 impression 加权的平均位次，单次出现 #1 在 30 天分布里会被其他位次拉平。
2. **#1 出现过但已经丢了**。4/29 commit message 说"locked in #1 ranking"，5/23 已经 24 天，期间被其他域名挤回去也合理。

**建议下一步**：手动用无痕、清 cookie，在桌面 + Mobile 模拟器各打一次 "seed spacing calculator" 看真实当前 SERP，把结果记到本地。如果确认掉位，需要把 #1 守位这条叙事更新。

---

## 7. 三个优先级最高的可执行项（基于数据）

按 **ROI = 改造成本 / 预期点击增量** 排序：

### P0 — 给 `soil-ph-calculator` 重写 title + meta description（最高 ROI）

- 现状：pos **9.32**、imp **972**、clicks **6**、CTR **0.62 %**
- 目标 CTR：2 %（top10 的下限合理值）
- 预期点击增量：~14 clicks/30d（相当于当前全站 21 → 35，+67 %）
- 工作量：单文件改 title + description + 验证 SERP 抓取

### P1 — 给 `seed-spacing-calculator` 做 SERP 复核 + CTR 调优

- 现状：pos **10.38**、imp **407**、clicks **1**、CTR **0.25 %**（异常低）
- 先确认 SERP 上是不是被 Featured Snippet / PAA 压制
- 如果是，调整 H1 + quickAnswer 抢 Featured Snippet
- 如果不是，把 title 重写得更"工具/计算器"感更强（家庭园艺信号已经堆了）

### P2 — 把 `calculate bushes for 48 zucchinis` 这类长尾"任意数量"查询做成可索引模式

- 现状：单查询 **80 曝光、pos 5.53、0 点击**
- 这是用户在用 Google 当计算器问"我有 N 株，要算 X"的典型
- 给计算器加可深链的 URL 参数（如 `?qty=48&crop=zucchini`），SSR 渲染 quickAnswer，让长尾查询能直接抓到答案 snippet

---

## 8. 数据获取方式（备忘）

```bash
# 日常报告（每日总览 + 昨天 top 5 页面）
python3 /Users/budalord/.hermes/scripts/gardencalcs_gsc_daily.py
# 注意：脚本里 CRED_PATH 硬编码为 /Users/budalord/app/avian-silicon-...json
# 实际凭据现在在 /Users/budalord/app/.secrets/avian-silicon-...json
# 跑前需要 patch CRED_PATH 或者把脚本里的路径改掉
```

修脚本路径或者建个软链是个 1 分钟的小活，建议顺手改了。
