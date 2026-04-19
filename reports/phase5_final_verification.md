# Phase 5 Final Verification — Cloudflare Edge Cache Fix

验证时间：2026-04-19 CST

说明：本清单只记录**正式域名线上实测**与 **Cloudflare GraphQL** 结果，作为 Phase 5 关单凭据。

| 命令 | 实际输出 | PASS-WARN |
|---|---|---|
| `curl -sI https://gardencalcs.com/_next/static/css/a99bcab7e9c49810.css \| grep -iE 'cache-control\|cf-cache-status\|age'` | `cache-control: public, max-age=31536000, immutable, public, max-age=31536000, immutable`  \| `age: 66153` \| `cf-cache-status: HIT` | **WARN** — 命中已成立，但 `Cache-Control` 头仍重复一遍；功能上已缓存成功，header 仍不够干净。 |
| `curl -sI https://gardencalcs.com/_next/static/chunks/webpack-04c090bf27c652c8.js \| grep -iE 'cache-control\|cf-cache-status\|age'` | `cache-control: public, max-age=31536000, immutable, public, max-age=31536000, immutable` \| `age: 65898` \| `cf-cache-status: HIT` | **WARN** — JS 与 CSS 相同，命中成立，但 `Cache-Control` 头重复。 |
| `curl -sI https://gardencalcs.com/ \| grep -iE 'cache-control\|cf-cache-status\|age'` | `cache-control: public, max-age=0, s-maxage=3600, must-revalidate` \| `cf-cache-status: HIT` \| `age: 19` | **PASS** |
| `curl -sI https://gardencalcs.com/tools/fertilizer-calculator \| grep -iE 'cache-control\|cf-cache-status\|age'` | `cache-control: public, max-age=0, s-maxage=3600, must-revalidate` \| `cf-cache-status: HIT` \| `age: 19` | **PASS** |
| `curl -sI https://gardencalcs.com/tools/seed-spacing/tomato \| grep -iE 'cache-control\|cf-cache-status\|age'` | `cache-control: public, max-age=0, s-maxage=3600, must-revalidate` \| `cf-cache-status: HIT` \| `age: 19` | **PASS** |
| `curl -sI https://gardencalcs.com/sitemap.xml \| grep -iE 'cache-control\|cf-cache-status\|age'` | `cache-control: public, max-age=0, s-maxage=300, must-revalidate` \| `cf-cache-status: HIT` \| `age: 20` | **PASS** |
| `curl -sI https://gardencalcs.com/robots.txt \| grep -iE 'cache-control\|cf-cache-status\|age'` | `cache-control: public, max-age=0, s-maxage=300, must-revalidate` \| `cf-cache-status: HIT` \| `age: 21` | **PASS** |
| `curl -s https://api.cloudflare.com/client/v4/graphql -H 'Authorization: Bearer $CLOUDFLARE_API_TOKEN' -H 'Content-Type: application/json' --data '{...httpRequests1dGroups...}'` | `2026-04-17: requests=1106, cachedRequests=0, cachedBytes=7000633` \| `2026-04-18: requests=843, cachedRequests=49, cachedBytes=3170100` \| `2026-04-19: requests=175, cachedRequests=38, cachedBytes=240621` | **PASS** — 最近 2 天 `cachedRequests` 已持续 > 0，已脱离长期为 0 的旧状态。 |

## 结论

- **HTML 页面缓存：PASS**
  - 首页、工具页、作物子页都已返回 `s-maxage`，并且线上实测 `cf-cache-status: HIT`。
- **sitemap / robots：PASS**
  - 两者都已返回 `s-maxage=300`，并且线上实测 `HIT`。
- **Cloudflare GraphQL：PASS**
  - `cachedRequests` 已从历史长期 0 抬升到最近 2 天持续 > 0。
- **静态资源长缓存：功能通过，但 header 仍有清理空间**
  - CSS / JS 均已 `HIT`，且 TTL/immutable 正确；
  - 但当前线上 `Cache-Control` 仍重复一遍，因此在本清单里记为 **WARN** 而不是 PASS。

## Phase 5 关单判断

**建议：Phase 5 可以关单。**

理由：本阶段核心目标——让 HTML、静态资源、sitemap/robots 在 Cloudflare 边缘真正开始命中缓存，并让 GraphQL 的 `cachedRequests` 不再长期为 0——已经在线上成立。
