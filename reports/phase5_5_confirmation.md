# Phase 5.5 Confirmation — Cloudflare 边缘缓存修复

## 1. 目标复述（≤25字）
让 HTML 与静态资源在 CF 边缘真正命中缓存。

## 2. 当前现状（上线前基线）
我已先用线上 `curl -I` 抽查正式域名，当前缓存行为与 Phase 5 背景一致：

- `/` → `cache-control: public, max-age=0, must-revalidate`，`cf-cache-status: DYNAMIC`
- `/tools/seed-spacing/tomato` → `cache-control: public, max-age=0, must-revalidate`，`cf-cache-status: DYNAMIC`
- `/_next/static/...css/js` → 当前多为 `cache-control: public, max-age=14400, must-revalidate`，而不是 1 年 immutable
- `/sitemap.xml` → `cf-cache-status: DYNAMIC`
- `/robots.txt` → 当前可见 `cf-cache-status: REVALIDATED`，但缓存策略不统一，仍需纳入代码配置统一管理

这说明：
1. HTML 基本没有吃到边缘缓存；
2. `_next/static` 也没有达到“哈希文件 + 1 年 immutable”的理想策略；
3. sitemap / robots 规则不统一，不能继续依赖平台默认值。

## 3. 计划采用的实现机制
### 选型
**优先采用 `public/_headers`，不把规则放 Dashboard。**

### 原因
1. **进代码库**：符合本阶段“必须进仓库”的要求，可 review、可追溯、可回滚。
2. **适配静态导出**：项目当前是 `next.config.js` 中 `output: "export"`，Cloudflare Pages 部署 `out/`，`public/_headers` 会自然随构建产物进入站点根目录，最贴近当前架构。
3. **路径规则表达直观**：HTML、`/_next/static/*`、`sitemap.xml`、`robots.txt` 可以直接分路径写，不需要把缓存策略散落到应用代码或 Dashboard。
4. **比 Dashboard 规则更稳**：避免“线上有人手点过，但仓库里看不出来”的配置漂移。

### 备选但不优先
- `wrangler.toml` / `[[headers]]`：也能进代码库，但当前仓库没有现成 wrangler 配置入口，且 Pages 静态产物用 `_headers` 更直观。
- Dashboard Cache Rules / Page Rules：不推荐，因为配置会脱离仓库。

## 4. 计划的 header 规则表

| 路径模式 | 计划 Cache-Control | 理由 |
|---|---|---|
| `/_next/static/*` | `public, max-age=31536000, immutable` | Next 静态资源文件名自带 hash；新部署会生成新 URL，适合长缓存。 |
| `/*.css` / `/*.js` / 常见静态文件（若存在站点根静态文件） | `public, max-age=31536000, immutable` | 防止非 `_next/static` 资源继续吃平台默认 4 小时缓存。 |
| `/*.png` `/*.jpg` `/*.jpeg` `/*.webp` `/*.svg` `/*.ico` `/*.woff2` `/*.woff` | `public, max-age=31536000, immutable` | 图片/字体属于版本化静态资源，适合长缓存。 |
| `/` | `public, max-age=0, s-maxage=3600, must-revalidate` | 浏览器不缓存首页 HTML，但允许 Cloudflare 边缘缓存 1 小时。 |
| `/tools/*` | `public, max-age=0, s-maxage=3600, must-revalidate` | 工具页 HTML 边缘缓存 1 小时，兼顾性能与新版本刷新。 |
| `/guides/*` | `public, max-age=0, s-maxage=3600, must-revalidate` | 指南页也是 HTML，策略与工具页统一。 |
| `/about` `/privacy` `/contact` `/tools` | `public, max-age=0, s-maxage=3600, must-revalidate` | 静态内容页与聚合页一起纳入 HTML 缓存策略，避免规则缺口。 |
| `/sitemap.xml` | `public, max-age=0, s-maxage=300, must-revalidate` | 允许边缘缓存 5 分钟，避免过久影响新 URL 被抓取。 |
| `/robots.txt` | `public, max-age=0, s-maxage=300, must-revalidate` | 与 sitemap 同档，兼顾命中率和快速变更。 |

### 规则说明
- HTML 不上 `immutable`，因为 URL 不变、内容会更新。
- HTML 的浏览器缓存保持 `max-age=0`，避免用户本地长期看到旧页面。
- HTML 的边缘缓存交给 `s-maxage=3600`，把命中收益留给 Cloudflare，不把风险留给终端浏览器。
- `sitemap.xml` / `robots.txt` 不拉到 1 小时，而是 5 分钟，优先满足 SEO 发现效率。

## 5. 部署后缓存刷新策略（重点）
### 推荐路径
**先依赖 Cloudflare Pages 部署切换后的“新部署版本刷新”行为，不做手工 Dashboard 操作；验收必须实测。**

我的计划不是先假设它一定成功，而是把它做成可验证流程：

1. 先让页面进入边缘缓存（至少 HIT 一次）；
2. 部署一个新版本；
3. 立刻检查同一 HTML URL：预期出现 `MISS` 或 `EXPIRED`；
4. 再请求一次：预期回到 `HIT` 或 `REVALIDATED`。

### 我对刷新机制的判断
- `/_next/static/*`：依靠文件名 hash 自动刷新。新部署生成新文件名，旧资源即使长期缓存也不会污染新版本。
- HTML 页面：URL 不变，所以不能依靠文件名 hash；需要依靠 Cloudflare Pages 在生产别名切换新部署后触发重新取源/重新填充缓存。

### 如果自动刷新不成立，备用方案
如果验收时看不到“部署前 HIT → 部署后 MISS/EXPIRED → 再次 HIT”这个循环，我会把**定向 purge**纳入代码化部署步骤，而不是手工去 Dashboard 点按钮：

- 新增仓库内脚本（例如 `scripts/purge_cf_cache.py` 或 shell 脚本）
- 目标 URL 只包含：`/`、`/tools/*`、`/guides/*`、`/sitemap.xml`、`/robots.txt`
- 不 purge `/_next/static/*`，因为这些资源应依赖 hash + immutable，自然换新

也就是说：
- **优先验证 Pages 自带刷新是否够用**
- **如果不够，再把 purge 做成仓库脚本**
- **不会接受只在 Dashboard 手工点 purge 的做法**

## 6. 风险点
### 风险 1：HTML 过度缓存导致用户看到旧版本
会。

所以本阶段不会给 HTML 上浏览器长缓存，而是：
- 浏览器：`max-age=0`
- 边缘：`s-maxage=3600`

这样风险被限制在 Cloudflare 边缘层，且部署后应重新回源；如果这一点实测不稳定，就追加代码化 purge。

### 风险 2：`_next/static` 的 hash 文件名机制是否与 immutable 冲突
**不冲突，反而是标准搭配。**

原因：
- 文件名 hash 一变，就是新 URL；
- 老 URL 即使缓存 1 年，也只服务老部署引用；
- 新 HTML 会引用新 hash 文件，因此不会因 immutable 而拿到旧 JS/CSS。

真正有风险的是**对不带版本号的 HTML 设置 immutable**，这一点不会做。

### 风险 3：sitemap 缓存太长会不会影响 Google 抓新页
会。

所以我计划把：
- `/sitemap.xml`
- `/robots.txt`

都设为 `s-maxage=300`，不与 HTML 统一成 1 小时，更不做 1 天长缓存。

### 风险 4：Cloudflare 默认行为覆盖 `_headers`
存在可能。

因此正式验收不会只看仓库文件存在，而是以**线上 curl 响应头**为准；若平台默认头覆盖仓库规则，就继续修到线上结果达标为止。

### 风险 5：Cloudflare API 读规则权限可能有限
已观察到这个账号 token 对某些 REST 规则接口会返回未授权或 account-owned-token 限制，因此“Dashboard 规则排查”不一定能完全靠 REST 读出。

我的处理方式是：
- 以线上 `curl -I` 的实际头为第一真相；
- GraphQL 继续用于看 `cachedRequests` 是否从 0 提升；
- 若需要读取额外规则，再根据 token 能力选择可用接口，不会把验收建立在一个当前 token 读不到的 REST 端点上。

## 7. 验证计划（部署后必须执行）
下面是我计划写进 `reports/phase5_changes.md` 的验收命令清单雏形。最终正式报告里会扩成 `verification.sh` 风格，每条命令旁边标明预期关键词，便于你逐条复核。

### A. HTML 页面边缘缓存
```bash
curl -sI https://gardencalcs.com/tools/seed-spacing/tomato | grep -iE 'cache-control|cf-cache-status'
# 预期: cache-control: public, max-age=0, s-maxage=3600, must-revalidate
# 预期: 首次 MISS/EXPIRED，第二次 HIT 或 REVALIDATED
```

```bash
curl -sI https://gardencalcs.com/ | grep -iE 'cache-control|cf-cache-status'
# 预期: cache-control: public, max-age=0, s-maxage=3600, must-revalidate
# 预期: 第二次 HIT 或 REVALIDATED
```

### B. 静态资源长缓存
先从线上 HTML 解析出真实 `_next/static` 资源，再请求它：

```bash
html=$(curl -s https://gardencalcs.com/tools/seed-spacing/tomato)
asset=$(printf '%s' "$html" | grep -oE '/_next/static/[^" ]+\.(css|js)' | head -1)
curl -sI "https://gardencalcs.com${asset}" | grep -iE 'cache-control|cf-cache-status'
# 预期: cache-control: public, max-age=31536000, immutable
# 预期: 第二次 HIT
```

### C. sitemap / robots
```bash
curl -sI https://gardencalcs.com/sitemap.xml | grep -iE 'cache-control|cf-cache-status'
# 预期: cache-control: public, max-age=0, s-maxage=300, must-revalidate
# 预期: 第二次 HIT
```

```bash
curl -sI https://gardencalcs.com/robots.txt | grep -iE 'cache-control|cf-cache-status'
# 预期: cache-control: public, max-age=0, s-maxage=300, must-revalidate
# 预期: 第二次 HIT
```

### D. 部署刷新循环验证
```bash
curl -sI https://gardencalcs.com/tools/seed-spacing/tomato | grep -i 'cf-cache-status'
# 预期: 部署前先做到 HIT 或 REVALIDATED

# 执行部署
npm run build
npx wrangler pages deploy out --project-name=gardencalcs --branch=main
# 如正式域名仍跟 master，则同步 master 后再 deploy 一次

curl -sI https://gardencalcs.com/tools/seed-spacing/tomato | grep -i 'cf-cache-status'
# 预期: 部署后第一次 MISS 或 EXPIRED

curl -sI https://gardencalcs.com/tools/seed-spacing/tomato | grep -i 'cf-cache-status'
# 预期: 紧接着第二次 HIT 或 REVALIDATED
```

### E. GraphQL 观察
```bash
curl -s https://api.cloudflare.com/client/v4/graphql \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"query":"query($zoneTag:String!,$datetime_geq:Time!){viewer{zones(filter:{zoneTag:$zoneTag}){httpRequests1hGroups(limit:6,filter:{datetime_geq:$datetime_geq},orderBy:[datetimeHour_DESC]){dimensions{datetimeHour} sum{requests cachedRequests cachedBytes bytes}}}}}","variables":{"zoneTag":"'$CLOUDFLARE_ZONE_ID'","datetime_geq":"2026-04-18T00:00:00Z"}}'
# 预期: 部署观察窗口内 cachedRequests > 0
```

### F. Lighthouse 回归
```bash
# 首页 / fertilizer / tomato 各跑 1 次 mobile Lighthouse
# 预期: Performance 相比 Phase 0/2/4 基线不倒退超过 2 分
```

## 8. 这轮正式实现的推荐路径
如果你批准，我的正式实施顺序会是：

1. 新增 `public/_headers`
2. 写入 HTML / 静态资源 / sitemap / robots 的缓存规则
3. 本地 `npm run build`，确认 `_headers` 出现在 `out/` 根目录
4. 部署到 Cloudflare Pages
5. 用正式域名 `curl -I` 连续验证 HTML、静态资源、sitemap、robots 的命中状态
6. 再做一次新部署，演示 HTML 的 `HIT → MISS/EXPIRED → HIT`
7. 跑 3 个页面 Lighthouse
8. 用 GraphQL 做至少 1 小时窗口的 `cachedRequests` 抽样
9. 输出 `reports/phase5_changes.md`，附 `verification.sh` 风格命令清单

## 结论
Phase 5.5 已具备开工条件。

我推荐的正式实现方案是：
- **缓存配置进仓库：`public/_headers`**
- **静态资源：1 年 immutable**
- **HTML：`max-age=0` + `s-maxage=3600`**
- **sitemap/robots：`s-maxage=300`**
- **先验证 Pages 部署是否自带 HTML 刷新；若不稳定，再补代码化 purge 脚本**

等你审过这份确认文档，我再进入正式编码与部署。