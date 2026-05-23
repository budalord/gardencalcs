# gardencalcs.com — project notes for Claude sessions

This file auto-loads in Claude Code sessions opened from this directory.
Read once at session start; reference back when triggered.

---

## Project shape (one paragraph)

Next.js 14 App Router, `output: "export"` static site, deployed to Cloudflare Pages.
Home-garden calculators (`/tools/*-calculator`) plus programmatic crop subpages
(`/tools/seed-spacing/[crop]`, `/tools/soil-ph/[crop]`) plus longer "grow guides"
(`/grow/[crop]`). Sources cited from US extension services. Current branch:
`master` (also deployed as `main` on Cloudflare).

---

## Active strategy (as of 2026-05-23)

GSC pulled 2026-05-23 showed 30-day clicks 21 / impressions 3 201 / avg pos 14.4.
Calculator-query niche has TAM ceiling ~100–250 clicks/day even at #1 across all
queries. **Option C — keep calculator core, add "how to grow X" guides** that
hit higher-volume "how-to" intent (50k+/mo for "how to grow tomatoes") was
approved as the growth strategy.

Pilot page live: `https://gardencalcs.com/grow/tomato` (commit `6faad0c`).

**Do not add new crops to `/grow/[crop]` until tomato pilot has 2–3 weeks of
GSC signal.** Observation period = Phase A. See "Cadence rules" below.

---

## 4-Gate pipeline for `/grow/[crop]` pages

Every grow guide must pass all four gates **in order**. Do not skip Gate 1
even if the crop "feels" similar to a previous one.

### Gate 1 — Source approval (before any drafting)

1. List every extension URL the page will cite, grouped by tier:
   - **Tier A**: Full-spectrum home-garden guides (UMN Extension growing X,
     UMD Extension growing X home garden, etc.). Used freely.
   - **Tier B**: Topic-specific extensions (Penn State, UC IPM, USU, UGA, etc.).
     Used per-topic.
   - **Tier C**: Commercial / field-grown references (Cornell Vegetables).
     **Restricted to variety + disease qualitative reference only.** Never used
     for home-garden quantitative claims (spacing, fertilizer rate, watering).
2. WebFetch every URL before listing it. Confirm:
   - URL returns 200 (not 404/403)
   - Page actually covers the home-garden topic claimed
3. Write the source approval doc at
   `reports/seo-YYYY-MM-DD/grow-{crop}-sources-gate1.md`.
4. Per section, map every claim to a source ID.
5. Show user the doc. Wait for explicit approval. **Do not draft body copy
   before approval.**

### Gate 2 — Drafting + self-check

1. Draft the page mirroring `app/grow/tomato/page.tsx` structure:
   - Direct-answer H1 + chunk-extractable summary sentence
   - Quick reference card (table with Field / Recommendation / Source ID columns)
   - Section per intent: When to plant / Soil prep & pH / Spacing / Fertilizer /
     Watering / Pests & diseases / Harvest / FAQ / Sources
   - Inline `<Cite ids={["A1", "B5"]} />` superscripts on every numeric claim
   - Three JSON-LD schemas: Article, BreadcrumbList, FAQPage
   - Link out to relevant calculators and `/tools/{cat}/{crop}` subpages
2. Run the page against `docs/expert-audit-rubric.md` line by line. Target:
   **0 red + 0 yellow**. Document the self-check result.
3. Verify cross-page consistency:
   - Spacing must match `config/seedSpacingCrops.ts` if crop exists there
   - pH must match `config/soilPHCrops.ts` if crop exists there
   - NPK guidance must align with `/data/npk-rates-by-crop`
4. `npm run build` clean — every grow page must SSG into `out/grow/{crop}.html`.
5. Update `app/sitemap.ts` to include the new URL with priority `0.85`.

### Gate 3 — Human page review

1. Start preview server, screenshot hero + 2 mid-page sections.
2. Show user:
   - Diff summary
   - Schema verification (3 types present)
   - Citation count
   - Internal link count
   - Title length warning (if > 60 chars for desktop SERP)
3. **Do not commit until user explicitly says "通过" / "可以" / "ship it".**
4. If user requests changes, do them and re-run Gate 2 self-check.

**Gate 3 抽检 mode (only if user explicitly opts in):** every 3rd crop, user
reviews only source list + quick reference table (5 min) instead of full page.
Default mode is full review every time.

### Gate 4 — Real-search verification (post-merge)

1. After commit + Cloudflare deploy:
   - `curl -sI https://gardencalcs.com/grow/{crop}` → expect 200
   - Wait 24–72 hours for Google to crawl
2. Search target queries in incognito on Google desktop + mobile:
   - `how to grow {crop}`
   - `{crop} growing guide`
   - `{crop} planting`
3. Note SERP position and competition. If site is below pos 50 at 4 weeks,
   the model is not working for this crop — investigate before doing more.

---

## Red lines (apply to all grow guides)

Never write:

- Specific variety recommendations ("Better Boy", "Cherokee Purple"). Regional
  adaptation differs too much for a single-source-backed claim.
- Chemical pesticide product names or rates. State regulations vary; redirect
  users to local extension agent.
- Yield estimates ("N plants produce Y lbs"). Too many variables; no reliable
  single source.
- Medicinal / health claims about the crop. Out of scope.
- Organic-vs-conventional value judgments. Not our call.

---

## Cadence rules

**Phase A (currently active, 2026-05-23 → ~2026-06-13)**: Observation period.
- No new `/grow/[crop]` pages.
- Pull GSC weekly via `~/.hermes/scripts/gardencalcs_gsc_daily.py` (note:
  CRED_PATH inside script points to old path; the real credential is at
  `/Users/budalord/app/.secrets/avian-silicon-474508-h0-1a504a85de01.json`).
- Watch tomato page indexing + first impressions.
- Watch soil-ph/[crop] subpage scaling against carrot-subpage baseline.

**Phase B (Phase A + 3 weeks if tomato shows positive signal)**: 2 pages/week max.
- Mon/Thu cadence.
- Priority order by US monthly search volume:
  cucumber → lettuce → pepper → carrot → blueberry → potato → strawberry →
  zucchini → bean → onion.
- **Reason for 2/week not 1/day**: small site daily new content trips
  "content farm" classifiers in Helpful Content Update. SEO consensus for a
  site of this size is 1–3/week.

**Phase C (3–4 months in)**: Data-driven decision.
- If `/grow/*` traffic > calculator traffic: keep going, expand to combo pages
  ("raised bed garden layout").
- If `/grow/*` traffic ≪ calculator traffic: stop adding crops, refocus on
  calculator embedding and AI-citation niche.

**Never daily.** Daily new pages from a site at the current GSC scale (~107
impressions/day) looks like a content factory to Google.

---

## Deploy procedure

Cloudflare Pages does **not** auto-deploy on `git push`. Run manually after
push:

```bash
export CLOUDFLARE_API_TOKEN=$(grep -oE 'cfat_[a-zA-Z0-9]+' gardencalcs.md | head -1)
npm run build
npx wrangler pages deploy out --project-name=gardencalcs --branch=main
npx wrangler pages deploy out --project-name=gardencalcs --branch=master --commit-dirty=true
```

Both branches must be deployed (CF Pages production = `master`, but `main` is
also wired). Reference: `gardencalcs-docs/HANDOFF.md` and
`gardencalcs-docs/start.md`.

The `gardencalcs.md` file at repo root contains the CF API token in plaintext.
**Do not commit `gardencalcs.md` to the public repo.** It is currently
untracked and should stay that way.

---

## Source pool already validated (reusable)

These 14 URLs were WebFetch-verified during the tomato pilot and can be reused
without re-verification:

- UMN Extension — Growing Tomatoes (A1)
- UMD Extension — Growing Tomatoes in a Home Garden (A2)
- UMD Extension — Vegetable pH chart (B1)
- Penn State — Understanding Soil pH (B2)
- Penn State — Tomato Production (B3)
- UGA — Vegetable Planting Chart (B4)
- UMN — Watering the Vegetable Garden (B5)
- USU — Water Recommendations for Vegetables (B6)
- Texas A&M — Easy Gardening Watering (B7)
- UC IPM — Tomato (B8)
- Missouri Botanical Garden — Tomato Visual Guides (B9)
- UMN — Planting the Vegetable Garden (B10)
- USDA Plant Hardiness Zone Map (B11)
- Cornell Vegetables — Tomatoes (C1, restricted)

When making a new crop, swap A1/A2/B3/B8/B9/C1 for the crop-specific equivalents
(e.g. UMN Growing Cucumbers, UC IPM Cucumber). B1/B2/B5/B6/B7/B10/B11 are
generally crop-agnostic and reusable as-is.

---

## File map (where things live)

```
config/
  tools.ts                     # top-level calculator metadata
  phase1Overrides.ts           # per-tool overrides (meta + internalLinks)
  seedSpacingCrops.ts          # 18 crops for /tools/seed-spacing/[crop]
  soilPHCrops.ts               # 10 crops for /tools/soil-ph/[crop]
app/
  tools/[slug]/page.tsx        # calculator pages (uses tools + phase1Overrides)
  tools/seed-spacing/[crop]/page.tsx
  tools/soil-ph/[crop]/page.tsx
  grow/tomato/page.tsx         # pilot grow guide
  sitemap.ts                   # adds new routes here
docs/
  expert-audit-rubric.md       # the Gate 2 self-check checklist
reports/
  seo-YYYY-MM-DD/              # one folder per SEO iteration
gardencalcs-docs/              # untracked working docs (HANDOFF, status, GSC analyses)
```

---

## When in doubt

1. Don't ship more grow guides during Phase A.
2. Quote a number → cite a source. No source, no number.
3. Tier C (Cornell) only for variety / disease qualitative use, never quantitative.
4. Daily cadence is wrong even when the user asks for it. Push back with data.
