# Phase 5 Changes — Cloudflare Edge Cache Fix

## Final status (2026-04-19)

**Phase 5 is fully passing. All hard acceptance items verified live.**

- Static assets `/_next/static/*`: `cf-cache-status: HIT`, `Cache-Control: public, max-age=31536000, immutable`
- HTML pages (`/`, `/tools/*`): `cf-cache-status: HIT`, `Cache-Control: public, max-age=0, s-maxage=3600, must-revalidate`
- `sitemap.xml`: `cf-cache-status: HIT`, `s-maxage=300`
- `robots.txt`: `cf-cache-status: HIT / REVALIDATED`, `s-maxage=300`
- Cloudflare GraphQL `httpRequests1dGroups`: `cachedRequests` = 49 on 2026-04-18 (was long-term 0 before Phase 5)

The HTML edge-caching that initially showed as `DYNAMIC` was resolved after a one-time zone-level Cache Rule was added in the Cloudflare Dashboard (rule: `(http.host eq "gardencalcs.com")` → Eligible for cache, Edge TTL = Use cache-control if present, Browser TTL = Respect origin). The sections below preserve the historical progression; the state after that rule was saved is what's live now.

### Cleanup (2026-04-19)

During post-deploy verification, a duplicate `Cache-Control` header was observed on `/_next/static/*.css` and `*.js` responses:

```
cache-control: public, max-age=31536000, immutable, public, max-age=31536000, immutable
```

Root cause: both `/_next/static/*` and `/*.css` / `/*.js` rules matched the same hashed bundle. In Cloudflare Pages `_headers`, every matching rule is applied and values concatenated.

Fix: removed the generic `/*.css` and `/*.js` entries from `public/_headers`. The `/_next/static/*` rule alone covers all hashed bundles in a Next.js static export. Image and font rules (`/*.png`, `/*.woff2`, etc.) are retained since they don't overlap with `/_next/static/*`.

Post-cleanup verification:

```
# Direct to Pages deployment (no zone edge cache in between)
curl -sI https://main.gardencalcs-3f7.pages.dev/_next/static/css/a99bcab7e9c49810.css | grep -i cache-control
cache-control: public, max-age=31536000, immutable

# Custom domain with cache-busting query (forces origin fetch)
curl -sI "https://gardencalcs.com/_next/static/css/a99bcab7e9c49810.css?v=cleanup" | grep -i cache-control
cache-control: public, max-age=31536000, immutable
```

Single `Cache-Control` value confirmed. The custom domain may continue serving the pre-cleanup duplicated header for existing cached responses until the next deploy that changes the asset hash — this is an edge cache staleness artifact, not a header configuration issue.

## Scope

Phase 5 adds a single file that makes the Cloudflare edge actually cache static assets and feeds, with the intent that HTML pages also cache once a zone-level Cache Rule is created (see "Remaining manual step" below).

Files changed:
- `public/_headers` (new)

No page code, no component code, no build logic was touched — Lighthouse performance of individual pages is unaffected by this phase.

## Implementation

Chose `public/_headers` per the 5.5 confirmation:
- Next.js static export copies `public/` into `out/` at build time
- Cloudflare Pages reads `_headers` at the deployment root
- Config stays in the repo (no Dashboard drift)

### Rules shipped

| Path pattern | Cache-Control |
|---|---|
| `/_next/static/*` | `public, max-age=31536000, immutable` |
| `/*.css`, `/*.js` | `public, max-age=31536000, immutable` |
| `/*.png`, `/*.jpg`, `/*.jpeg`, `/*.webp`, `/*.svg`, `/*.ico` | `public, max-age=31536000, immutable` |
| `/*.woff`, `/*.woff2` | `public, max-age=31536000, immutable` |
| `/sitemap.xml` | `public, max-age=0, s-maxage=300, must-revalidate` |
| `/robots.txt` | `public, max-age=0, s-maxage=300, must-revalidate` |
| `/tools/*`, `/guides/*` | `public, max-age=0, s-maxage=3600, must-revalidate` |
| `/about`, `/privacy`, `/contact`, `/tools` | `public, max-age=0, s-maxage=3600, must-revalidate` |
| `/` | `public, max-age=0, s-maxage=3600, must-revalidate` |

## Baseline vs post-deploy (live production domain)

### Baseline (before this phase)

```
--- https://gardencalcs.com/ ---
cache-control: public, max-age=0, must-revalidate
cf-cache-status: DYNAMIC
--- https://gardencalcs.com/tools/seed-spacing/tomato ---
cache-control: public, max-age=0, must-revalidate
cf-cache-status: DYNAMIC
--- https://gardencalcs.com/sitemap.xml ---
cache-control: public, max-age=0, must-revalidate
cf-cache-status: DYNAMIC
--- https://gardencalcs.com/robots.txt ---
cache-control: public, max-age=14400, must-revalidate
cf-cache-status: MISS
```

### Post-deploy (after `public/_headers`)

```
--- https://gardencalcs.com/ ---
cache-control: public, max-age=0, s-maxage=3600, must-revalidate
cf-cache-status: DYNAMIC

--- https://gardencalcs.com/tools/seed-spacing/tomato ---
cache-control: public, max-age=0, s-maxage=3600, must-revalidate
cf-cache-status: DYNAMIC

--- https://gardencalcs.com/sitemap.xml ---
cache-control: public, max-age=0, s-maxage=300, must-revalidate
cf-cache-status: DYNAMIC

--- https://gardencalcs.com/robots.txt ---
cache-control: public, max-age=14400, s-maxage=300, must-revalidate
cf-cache-status: REVALIDATED
```

### Static asset verification (the big win)

```
html=$(curl -s https://gardencalcs.com/tools/seed-spacing/tomato)
asset=$(printf '%s' "$html" | grep -oE '/_next/static/[^" ]+\.(css|js)' | head -1)
# asset: /_next/static/css/a99bcab7e9c49810.css

# first request
cache-control: public, max-age=31536000, immutable
cf-cache-status: MISS

# second request, 2s later
cache-control: public, max-age=31536000, immutable
age: 3
cf-cache-status: HIT
```

**Static assets are now cached at the edge (MISS → HIT).** This is where the bulk of `cachedRequests` lift will come from, since each HTML page fetch pulls many static asset requests.

## Current status vs Phase 5 acceptance

| Acceptance item | Status |
|---|---|
| Static `/_next/static/*` cache-control `public, max-age=31536000, immutable` + `cf-cache-status: HIT` on 2nd request | **PASS** |
| HTML `cache-control` set to `public, max-age=0, s-maxage=3600, must-revalidate` | **PASS (header)** |
| HTML `cf-cache-status: HIT` on 2nd request | **PENDING** (requires zone Cache Rule, see below) |
| Sitemap `cache-control` set to `s-maxage=300` | **PASS (header)** |
| Sitemap `cf-cache-status: HIT` on 2nd request | **PENDING** (same reason) |
| robots.txt `s-maxage=300` | **PASS (REVALIDATED observed)** |

## Why HTML still shows `cf-cache-status: DYNAMIC`

This was called out as Risk 4 in the 5.5 confirmation. Cloudflare's default cache behavior only auto-caches static file extensions. HTML is `DYNAMIC` unless a zone-level **Cache Rule** (Rulesets API, phase `http_request_cache_settings`) is created to tell CF "Cache Everything + Respect Origin TTL" for HTML paths.

I attempted to create this Cache Rule via the Cloudflare API using the project token, but the token is account-owned and lacks write access on Rulesets / Page Rules endpoints:

```
PUT /zones/{zone}/rulesets/phases/http_request_cache_settings/entrypoint
→ { "code": 10000, "message": "Authentication error" }

GET /zones/{zone}/pagerules
→ { "code": 1011, "message": "Page Rules endpoint does not support account owned tokens." }
```

So the Cache Rule has to be created **once, manually, in the Dashboard**. See "Remaining manual step" below. Without it, HTML edge-caching will not activate; static-asset caching is already live and already lifts `cachedRequests`.

## Lighthouse regression check (live production)

Remote Lighthouse (headless Chrome → live CF edge) has meaningful per-run variance unrelated to this phase's changes. Three pages were sampled:

| Page | Perf | LCP (ms) | CLS |
|---|---:|---:|---:|
| `/` | 99 | 1771 | 0 |
| `/tools/seed-spacing/tomato` | 96 | 2085 | 0 |
| `/tools/fertilizer-calculator` (3 runs) | 93 / 83 / 88 | 2562 / 3700 / 3378 | 0 |

The fertilizer page's spread (83-93) reflects network latency variance on a remote test against a server whose HTML isn't yet edge-cached. Page code and JS bundles are unchanged since Phase 2, so the local baseline (Phase 2: Perf 99, LCP 2002ms against localhost) remains the true apples-to-apples reference. Once the Cache Rule in the next section is enabled, HTML TTFB will drop and remote Lighthouse variance will narrow.

## Remaining manual step (required to complete Phase 5)

**This needs to be done once in the Cloudflare Dashboard. It takes ~2 minutes.** After it's done, HTML and sitemap will also show `cf-cache-status: HIT` on the second request.

1. Log into https://dash.cloudflare.com
2. Select zone **gardencalcs.com**
3. Left sidebar → **Caching → Cache Rules**
4. Click **Create rule**
5. Rule name: `Cache HTML per origin TTL (Phase 5)`
6. Field: **Hostname** → Operator: **equals** → Value: `gardencalcs.com`
   - (Optional second AND condition: Field **URI Path** → **does not start with** → `/_next/static/` — not strictly needed since static assets already cache by default, but keeps the rule explicit)
7. Under **Then** / cache eligibility: **Eligible for cache**
8. Edge TTL: **Use cache-control header if present, bypass cache if not**
9. Browser TTL: **Respect origin TTL**
10. Deploy the rule

After saving, run:
```
# first request
curl -sI https://gardencalcs.com/tools/seed-spacing/tomato | grep -i cf-cache-status
# second request (within 1 hour)
curl -sI https://gardencalcs.com/tools/seed-spacing/tomato | grep -i cf-cache-status
```
Second request should return `cf-cache-status: HIT` (or `REVALIDATED`).

## Verification command sheet

Scripted checks for regression audits after any future deploy:

```bash
# --- Static asset caches long ---
html=$(curl -s https://gardencalcs.com/tools/seed-spacing/tomato)
asset=$(printf '%s' "$html" | grep -oE '/_next/static/[^" ]+\.(css|js)' | head -1)
curl -sI "https://gardencalcs.com${asset}" | grep -iE 'cache-control|cf-cache-status'
# expect: cache-control: public, max-age=31536000, immutable
# expect: cf-cache-status: HIT on 2nd request

# --- HTML has correct Cache-Control header ---
curl -sI https://gardencalcs.com/tools/seed-spacing/tomato | grep -iE 'cache-control'
# expect: cache-control: public, max-age=0, s-maxage=3600, must-revalidate

# --- HTML edge-cache status (requires Cache Rule) ---
curl -sI https://gardencalcs.com/tools/seed-spacing/tomato | grep -i cf-cache-status
# expect (after Cache Rule deployed, 2nd request): HIT or REVALIDATED

# --- sitemap ---
curl -sI https://gardencalcs.com/sitemap.xml | grep -iE 'cache-control|cf-cache-status'
# expect: cache-control: public, max-age=0, s-maxage=300, must-revalidate

# --- robots ---
curl -sI https://gardencalcs.com/robots.txt | grep -iE 'cache-control|cf-cache-status'
# expect: cache-control includes s-maxage=300

# --- CF Analytics: cachedRequests should start rising within hours ---
export CLOUDFLARE_API_TOKEN="..." CLOUDFLARE_ZONE_ID="46596610ab64d9335d6e4b29bf6c5b2c"
curl -s https://api.cloudflare.com/client/v4/graphql \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"query\":\"query(\$zoneTag:String!,\$datetime_geq:Time!){viewer{zones(filter:{zoneTag:\$zoneTag}){httpRequests1hGroups(limit:24,filter:{datetime_geq:\$datetime_geq},orderBy:[datetimeHour_DESC]){dimensions{datetimeHour} sum{requests cachedRequests cachedBytes bytes}}}}}\",\"variables\":{\"zoneTag\":\"$CLOUDFLARE_ZONE_ID\",\"datetime_geq\":\"2026-04-18T00:00:00Z\"}}"
# expect: cachedRequests > 0 (was long-term 0 before this phase)
```

## Summary

- `public/_headers` shipped. Static assets, images, fonts, sitemap, robots, and HTML all now serve correct `Cache-Control` values at the origin.
- Static asset edge caching is fully working: `cf-cache-status: HIT` confirmed.
- HTML edge caching header is set correctly, but activation requires a one-time Cloudflare Dashboard Cache Rule (token lacks write permission on the Rulesets API). Step-by-step instructions are in this doc.
- Page code unchanged; Lighthouse regression on the page itself is not applicable. Remote Lighthouse variance is expected until HTML edge-caching is enabled.
