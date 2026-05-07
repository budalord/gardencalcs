# Expert Audit Rubric — gardencalcs calculators & guides

Use this checklist before merging any new calculator, expanding crop data,
or rewriting a guide. Every item below comes from a real defect caught in
the May 2026 expert audit — they are failure modes that **a horticulturist
would call you out on in a heartbeat**, even if the build passes and the
copy reads well.

Run the rubric per page. A page must score **0 red flags + ≤ 1 yellow** to
ship to production.

---

## 1. Safety gates (red flags — must fix before merge)

### 1.1 Raw manure / biological pathogen risk
If the page mentions, accepts, or recommends animal manure:

- [ ] Raw manure entries are **flagged** in the data structure (e.g.
  `rawManure: true`) so the UI can branch on them.
- [ ] The result/output displays a **food-safety advisory** citing the
  USDA Produce Safety Rule: **120 days** before harvest of soil-contact
  crops (lettuce, carrots, radishes, strawberries on plastic), **90 days**
  for non-contact crops (sweet corn, staked tomatoes).
- [ ] Hot-composting requirements stated: **131 °F (55 °C) for 3 days,
  turned at least 5 times** before use on edibles.
- [ ] Pet/dog/cat waste, human waste, and meat/dairy are explicitly
  excluded — these carry pathogens that home compost cannot reliably kill.

### 1.2 Phosphorus over-application
If the page recommends NPK fertilizer rates:

- [ ] The math does **not** force the user to over-apply non-target
  nutrients. `Math.max(N_rate, P_rate, K_rate)` is the classic bug — it
  satisfies the most-needed nutrient by blasting the others.
- [ ] Excess P or K beyond target is **shown** to the user (not hidden).
- [ ] When excess > 0, an over-application warning fires citing the EPA
  nutrient-pollution issue and noting that several US states (FL, MN, NY)
  legally restrict P-containing fertilizer without a soil test.
- [ ] DAP (18-46-0), 10-10-10, and bone meal — the three most common
  P-heavy products — are tested manually and produce the warning.

### 1.3 Soil-amendment overshoot caps
For lime/sulfur/iron sulfate or any pH amendment:

- [ ] Single-application **caps** are enforced or warned:
  - **Lime: 10 lb / 100 ft²** per pass (above this triggers split warning).
  - **Sulfur: 2 lb / 100 ft²** per pass (Penn State / Clemson cap).
- [ ] Retest intervals match material reaction kinetics:
  - Lime: **6 months** before retest (lime reacts slowly; 3 months is too
    early and is a real defect we shipped before).
  - Sulfur: **6–9 months** in cool soil before retest.
- [ ] Wrong material warning: never recommend wood ash for general pH
  raising on vegetable beds (alkaline + variable + introduces K imbalance).

### 1.4 Heavy-metal / contamination flags
- [ ] No recommendation of pressure-treated wood, painted wood, or
  CCA-treated lumber for raised beds.
- [ ] No recommendation of biosolids / sewage sludge for edible gardens.
- [ ] No recommendation to compost diseased plant material in cold piles.

---

## 2. Calculator math integrity (yellow flags — fix or document)

### 2.1 No square-bed assumption
- [ ] If the calculator takes "area," it must offer a **rectangular bed
  mode (length × width)** as the default. Pure `Math.sqrt(area)` math is
  wrong for the 4×8, 4×10, 4×12 raised beds that 70 %+ of home gardeners
  actually have.
- [ ] When a square fallback is used, it is **labeled as such** in the
  output ("square layout assumed").
- [ ] Edge buffers are accounted for: use `floor(side / spacing)` without
  a `+1`, since real layouts leave half-spacing on each edge for path
  access and canopy spread.

### 2.2 Container vs in-ground multipliers
For watering, fertilizer, or any water/nutrient demand calculator:

- [ ] Container multiplier reflects reality: small pots in summer can
  need **3–5×** in-ground water demand, not 1.4×. A 6-inch pot can dry
  out in a single hot day.
- [ ] Output text warns about checking soil moisture daily for containers,
  not just "dries out faster."

### 2.3 Drought-tolerant species baseline
- [ ] Established Mediterranean herbs (lavender, rosemary, thyme,
  oregano) baseline at **0.25 in/wk or less**, not 0.5 in/wk. Excess water
  is the leading killer of these species, more than drought.
- [ ] Plant labels distinguish establishment phase from mature (e.g.
  "Lavender (established)") so seedling water needs aren't confused with
  adult drought tolerance.

### 2.4 C:N weighting
- [ ] Weighted-average C:N math uses **mass weights** (lbs or kg), not
  volume weights — material density varies 5× between dry leaves and food
  scraps.
- [ ] Suggestion math ("add X lbs of browns to balance") states the
  assumed C:N of the additive material so users can sub in something with
  a different ratio.

---

## 3. Data integrity (yellow flags)

### 3.1 Cite what you cite
- [ ] Every numeric range carries a `source` key linking to a real
  university extension publication (Cornell, Penn State, UMN, UMass,
  Rutgers, UGA, USU, etc.) — **not** a blog or seed-catalog page.
- [ ] Source URLs are **live** — run `curl -I` on any new source URL
  before merge. Dead extension PDFs are a credibility killer.
- [ ] When values are extension-aggregated rather than from one source,
  list **at least three** independent extension sources in the source
  block.

### 3.2 Single-point vs range honesty
- [ ] Materials with naturally wide variation (manure C:N, sawdust C:N,
  grass clippings C:N, soil texture water-holding capacity) are listed
  as **ranges**, not point values.
- [ ] Calculator-side single values are documented as the **range mid-point**
  in code comments, with the full range visible on the corresponding
  `/data/*` reference page.
- [ ] No "magical" precision (don't show "C:N = 22.7:1" when the
  underlying material varies 18–50:1 — round to two significant figures).

### 3.3 Manure source split
- [ ] Manure is **split by animal source** with separate C:N values:
  - Poultry: 6–15 (mid 10)
  - Cow: 18–25 (mid 22)
  - Horse: 22–50 (mid 30)
  - Sheep: 13–20 (mid 16)
- [ ] No generic "Fresh Manure" lumped at one value — the C:N spread is
  too wide to average sensibly.

### 3.4 Cross-page numeric consistency
- [ ] Any rate, ratio, or threshold that appears on **multiple pages**
  (calculator + data page + guide) uses **the same value** across all
  three. The classic failure: guide shows tomato N at "0.2 lb / 100 ft²"
  while the data page shows "3 lb / 1000 ft²" — same number, but units
  diverge confusingly.
- [ ] Units are consistent within a topic: pick one of `lb/1,000 ft²` or
  `g/m²` and use it everywhere. Mixing per-100-ft² and per-1,000-ft²
  forces users to do mental math.

---

## 4. Botanical / horticultural language (yellow flags)

### 4.1 Soil chemistry thresholds
- [ ] Manganese toxicity stated as starting at **pH 5.0–5.5** (sensitive
  crops), not "below 5.5" — the boundary depends on the crop.
- [ ] Iron toxicity stated as **rare unless pH < 4.5**, not just
  "in acidic soil."
- [ ] Phosphorus fixation mechanism stated correctly: **Fe/Al oxides at
  pH < 5.5**, **Ca precipitation at pH > 7.5**. Don't lump them as
  generic "lockup."

### 4.2 Hot vs cold composting
- [ ] Hot composting threshold stated as **~1 yd³ (3×3×3 ft) of mass**,
  not a smaller dimension.
- [ ] Cold composting is **acknowledged as valid** for smaller piles
  (6–12 months timeline), not dismissed as "won't work."
- [ ] Temperature targets cited correctly: **131 °F for pathogen kill**
  (USDA), 130–160 °F (55–70 °C) for active hot composting.

### 4.3 Allelopathy and concentration limits
- [ ] Coffee grounds capped at **20–30 % of greens by volume** — not "use
  freely." Caffeine and chlorogenic acids suppress some seedlings.
- [ ] Walnut leaf, eucalyptus mulch, and other juglone/allelopathic
  materials flagged or excluded.

### 4.4 Crop-specific N-aversion
- [ ] Carrots: "excess N causes forked roots."
- [ ] Beans / peas: "fixes own N; minimal fertilizer needed."
- [ ] Potatoes: "low pH (4.8–5.5) preferred to suppress scab."
- [ ] Brassicas: "boron-sensitive; check soil B before heavy fertilization."

---

## 5. UI honesty (informational)

### 5.1 Limitations stated
- [ ] Output card includes a one-line note that the result is a
  **starting estimate**, not a precision schedule. Mention real ETo,
  weather, plant stage, and soil moisture override the formula.
- [ ] Soil-moisture finger-test or 2-inch probe is recommended on every
  watering output.
- [ ] Soil-test recommendation appears on every fertilizer / pH output.

### 5.2 No false precision
- [ ] No 4+ decimal places on user-facing numbers.
- [ ] No `0.000 kg` style results — round to the precision the user can
  actually act on (g for small amounts, kg for large).

### 5.3 Source attribution visible
- [ ] Every result card includes a small footer line citing the
  **specific extensions** the rate is derived from (Penn State / Clemson
  / Cornell / UMN — not just "research-based").

---

## 6. Pre-merge verification (must pass)

- [ ] `npm run build` clean (TypeScript + lint + sitemap).
- [ ] At least **3 manual edge-case inputs** tested per calculator:
  - Smallest valid input (1 ft × 1 ft, pH 4.5 → 4.6, 1 sq ft area).
  - Realistic median (4 × 8 raised bed, pH 5.5 → 6.5, 100 sq ft).
  - Aggressive case (8 × 20 bed, pH 4.0 → 7.5, 1000 sq ft) — must
    trigger split-application or excess warnings if applicable.
- [ ] Lighthouse mobile **performance ≥ 0.90** on the changed page.
- [ ] All warnings render correctly in the JS bundle for conditional
  paths (raw manure → food-safety advisory; excess P → EPA warning;
  high lime/sulfur rate → split warning).
- [ ] At least **one independent source URL** in the result card returns
  HTTP 200 (run `curl -I` on each cited link).

---

## 7. After-deploy verification

- [ ] `curl https://gardencalcs.com/<page>` renders the new title /
  static text changes.
- [ ] JSON-LD schema set on the page is verified by `@type` (not just
  script-tag presence — a thin schema is worse than none).
- [ ] GSC sitemap covers the new URL.
- [ ] Page loaded in mobile Safari and rendered without layout breakage
  (the form-toggle / conditional-warning UI is the riskiest section).

---

## Notes on rubric provenance

This rubric was distilled from the May 2026 audit that found:

- **2 safety-grade issues** (lumped manure C:N + Math.max NPK driver).
- **3 calculator logic bugs** (square-bed assumption, container 1.4×
  underestimate, lime cap missing).
- **2 cross-page inconsistencies** (units, C:N values).
- **4 academic-precision issues** (Fe/Mn thresholds, coffee allelopathy,
  cold-composting dismissal, ET attribution).

Every check above corresponds to a real defect we shipped. The site
went from **B+ to A−** after fixing them. The rubric is here to keep us
from regressing.
