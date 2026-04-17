#!/usr/bin/env bash
set -euo pipefail
cd /Users/budalord/app/gardencalcs
mkdir -p reports/lighthouse
LIGHTHOUSE_VERSION=$(npx --yes lighthouse --version)
echo "LIGHTHOUSE_VERSION=$LIGHTHOUSE_VERSION"
urls=(
  "home|https://gardencalcs.com/"
  "soil-ph-calculator|https://gardencalcs.com/tools/soil-ph-calculator"
  "seed-spacing-calculator|https://gardencalcs.com/tools/seed-spacing-calculator"
  "watering-schedule-calculator|https://gardencalcs.com/tools/watering-schedule-calculator"
  "fertilizer-calculator|https://gardencalcs.com/tools/fertilizer-calculator"
  "compost-calculator|https://gardencalcs.com/tools/compost-calculator"
)
for item in "${urls[@]}"; do
  slug="${item%%|*}"
  url="${item#*|}"
  for i in 1 2 3; do
    out="reports/lighthouse/${slug}-run${i}.json"
    echo "RUN $slug $i $url"
    npx --yes lighthouse "$url" \
      --only-categories=performance \
      --form-factor=mobile \
      --throttling.cpuSlowdownMultiplier=4 \
      --output=json \
      --output-path="$out" \
      --chrome-flags="--headless --no-sandbox"
  done
done
python3 - <<'PY'
import json, statistics, glob, os
version=os.popen('npx --yes lighthouse --version').read().strip()
slugs=['home','soil-ph-calculator','seed-spacing-calculator','watering-schedule-calculator','fertilizer-calculator','compost-calculator']
urls={
 'home':'https://gardencalcs.com/',
 'soil-ph-calculator':'https://gardencalcs.com/tools/soil-ph-calculator',
 'seed-spacing-calculator':'https://gardencalcs.com/tools/seed-spacing-calculator',
 'watering-schedule-calculator':'https://gardencalcs.com/tools/watering-schedule-calculator',
 'fertilizer-calculator':'https://gardencalcs.com/tools/fertilizer-calculator',
 'compost-calculator':'https://gardencalcs.com/tools/compost-calculator',
}
res={'lighthouse_version':version,'pages':{}}
for slug in slugs:
    runs=[]
    for path in sorted(glob.glob(f'reports/lighthouse/{slug}-run*.json')):
        with open(path) as f: data=json.load(f)
        a=data['audits']
        inp=(a.get('interaction-to-next-paint') or a.get('experimental-interaction-to-next-paint') or {}).get('numericValue')
        runs.append({
            'file': path,
            'performance_score': round(data['categories']['performance']['score']*100,2),
            'lcp': a['largest-contentful-paint']['numericValue'],
            'cls': a['cumulative-layout-shift']['numericValue'],
            'inp': inp,
        })
    vals=lambda k:[r[k] for r in runs if r[k] is not None]
    res['pages'][slug]={
      'url': urls[slug],
      'runs': runs,
      'median': {
        'performance_score': statistics.median(vals('performance_score')) if vals('performance_score') else None,
        'lcp': statistics.median(vals('lcp')) if vals('lcp') else None,
        'cls': statistics.median(vals('cls')) if vals('cls') else None,
        'inp': statistics.median(vals('inp')) if vals('inp') else None,
      }
    }
print(json.dumps(res, ensure_ascii=False, indent=2))
PY > reports/lighthouse/summary.json
echo DONE
