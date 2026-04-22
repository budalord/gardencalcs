import json, os, re, ssl, urllib.request
from html import unescape

repo='/Users/budalord/app/gardencalcs'
serp_dir=f'{repo}/reports/phase0_serp'
queries=[
 ('soil ph calculator','soil-ph-calculator'),
 ('seed spacing calculator','seed-spacing-calculator'),
 ('watering schedule calculator','watering-schedule-calculator'),
 ('fertilizer calculator','fertilizer-calculator'),
 ('compost calculator','compost-calculator'),
]
ctx=ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE

def clean(s):
    s=unescape(re.sub(r'<[^>]+>', ' ', s or ''))
    return re.sub(r'\s+', ' ', s).strip()

def fetch_html(url):
    req=urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
        return r.read().decode('utf-8', 'ignore')

def parse_page(url):
    try:
        html=fetch_html(url)
        title_match=re.search(r'<title>(.*?)</title>', html, re.I|re.S)
        title=clean(title_match.group(1)) if title_match else ''
        h1_match=re.search(r'<h1[^>]*>(.*?)</h1>', html, re.I|re.S)
        h1=clean(h1_match.group(1)) if h1_match else ''
        h2s=[clean(x) for x in re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.I|re.S)]
        h2s=[h for h in h2s if h and not h.startswith('.css-')][:12]
        return {'url': url, 'title': title, 'h1': h1, 'h2_list': h2s}
    except Exception as e:
        return {'url': url, 'title': f'[fetch error] {e}', 'h1': '', 'h2_list': []}

meta=[]
meta_path=f'{serp_dir}/_meta.json'
if os.path.exists(meta_path):
    meta=json.load(open(meta_path))

lines=['# Phase 0 SERP Snapshot', '', 'Data source: Google via Serper.dev (`gl=us`, `hl=en`, `num=10`).']
if meta:
    stamps='; '.join(f"{m['query']} {m['fetched_at_utc']}" for m in meta)
    lines.append(f'Fetch timestamps (UTC): {stamps}.')
lines.append('')
for query, slug in queries:
    data=json.load(open(f'{serp_dir}/{slug}.json'))
    organic=data.get('organic', [])[:5]
    lines.append(f'## {query}')
    lines.append('')
    lines.append('| 排名 | URL | title | H1 | H2 骨架（用 / 分隔）|')
    lines.append('|---|---|---|---|---|')
    for idx, item in enumerate(organic, start=1):
        p=parse_page(item.get('link', ''))
        title=(p['title'] or '').replace('|', '/').replace('\n', ' ')
        h1=(p['h1'] or '').replace('|', '/').replace('\n', ' ')
        h2=' / '.join(p['h2_list']).replace('|', '/').replace('\n', ' ')
        lines.append(f"| {idx} | {p['url']} | {title} | {h1} | {h2} |")
    lines.append('')
with open(f'{repo}/reports/phase0_serp.md', 'w') as f:
    f.write('\n'.join(lines)+'\n')
print('DONE')
