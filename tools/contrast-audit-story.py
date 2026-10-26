#!/usr/bin/env python3
"""Contrast audit for the story pages (Phase 5.2).
Usage: python3 tools/contrast-audit-story.py <build_dir> [out.json]
Serves the CRA build with an SPA fallback, visits each page at scroll 0/50/100% on desktop and phone, hides all text, samples the real pixels behind each text box, and compares them with the text colour (WCAG 2 ratio; 4.5 normal, 3.0 large).
Needs: python3 playwright + chromium, pillow."""
import asyncio, json, os, subprocess, sys, time, io
from playwright.async_api import async_playwright
from PIL import Image
build = os.path.abspath(sys.argv[1]); out = sys.argv[2] if len(sys.argv) > 2 else None
PORT = 5057
srv = subprocess.Popen([sys.executable, '-c', f'''
import http.server, os
os.chdir({build!r})
class H(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        p = self.translate_path(self.path.split("?")[0])
        if not os.path.exists(p) or os.path.isdir(p): self.path = "/index.html"
        return super().do_GET()
    def log_message(self, *a): pass
http.server.ThreadingHTTPServer(("127.0.0.1", {PORT}), H).serve_forever()
'''])
time.sleep(1.2)
def lum(c):
    f = lambda v: (v/255)/12.92 if v/255 <= 0.03928 else (((v/255)+0.055)/1.055)**2.4
    return 0.2126*f(c[0]) + 0.7152*f(c[1]) + 0.0722*f(c[2])
def ratio(a, b):
    la, lb = lum(a), lum(b); hi, lo = max(la, lb), min(la, lb); return (hi+0.05)/(lo+0.05)
COLLECT = '''() => {
  const out = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (w.nextNode()) {
    const n = w.currentNode; if (!n.textContent.trim()) continue;
    const el = n.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const r = document.createRange(); r.selectNodeContents(n); const b = r.getBoundingClientRect();
    if (b.width < 4 || b.height < 4 || b.bottom < 0 || b.top > innerHeight || b.right < 0 || b.left > innerWidth) continue;
    const cx = Math.min(innerWidth-1, Math.max(0, b.left + b.width/2)), cy = Math.min(innerHeight-1, Math.max(0, b.top + b.height/2)); const top = document.elementFromPoint(cx, cy); if (top && !(el.contains(top) || top.contains(el))) continue; // covered by another element (header, badge, panel)
    let op = 1; for (let e = el; e; e = e.parentElement) op *= parseFloat(getComputedStyle(e).opacity);
    out.push({ t: n.textContent.trim().slice(0, 40), x: b.left, y: b.top, w: b.width, h: b.height, c: cs.color, fs: parseFloat(cs.fontSize), fw: parseInt(cs.fontWeight) || 400, op });
  }
  return out;
}'''
def parse(c):
    v = [float(x) for x in c[c.index('(')+1:c.index(')')].replace('/', ',').split(',')[:4] if x.strip()]
    return (v[0], v[1], v[2], v[3] if len(v) > 3 else 1.0)
pages = ['', 'about', 'services', 'testimonials', 'faq', 'contact']
results = []; skipped = []
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for tag, vp in [('desktop', dict(width=1440, height=900)), ('phone', dict(width=390, height=844))]:
            ctx = await b.new_context(viewport=vp); pg = await ctx.new_page()
            for name in pages:
                await pg.goto(f'http://127.0.0.1:{PORT}/{name}', wait_until='networkidle'); await pg.wait_for_timeout(500)
                mx = await pg.evaluate('document.documentElement.scrollHeight - innerHeight')
                for f in (0, 0.5, 1):
                    await pg.evaluate(f'scrollTo(0,{int(mx*f)})'); await pg.wait_for_timeout(1100)
                    items = await pg.evaluate(COLLECT)
                    await pg.add_style_tag(content='*{-webkit-text-fill-color:transparent !important;text-shadow:none !important} svg text{fill:transparent !important}')
                    await pg.wait_for_timeout(120)
                    im = Image.open(io.BytesIO(await pg.screenshot())).convert('RGB')
                    await pg.evaluate("document.querySelectorAll('style').forEach(s=>{if(s.textContent.startsWith('*{-webkit-text-fill'))s.remove()})")
                    for it in items:
                        x0, y0 = max(0, int(it['x'])), max(0, int(it['y'])); x1, y1 = min(im.width, int(it['x']+it['w'])), min(im.height, int(it['y']+it['h']))
                        if x1 - x0 < 2 or y1 - y0 < 2: continue
                        px = list(im.crop((x0, y0, x1, y1)).get_flattened_data())
                        # verdict uses the median background pixel behind the text (text is hidden in the screenshot); spread = contrast between the 10th and 90th percentile background pixels (high spread = text sits on a busy or split background, check by eye)
                        px.sort(key=lum); lo, hi, med = px[int(len(px)*0.1)], px[int(len(px)*0.9)], px[len(px)//2]
                        r, g, bl, a = parse(it['c']); a *= it['op']
                        if it['op'] < 0.5: skipped.append(it['t']); continue  # still fading in (scroll reveal)
                        res = []
                        for bg in (med,):
                            fg = tuple(round(a*c + (1-a)*bgc) for c, bgc in zip((r, g, bl), bg)); res.append(ratio(fg, bg))
                        need = 3.0 if (it['fs'] >= 24 or (it['fs'] >= 18.66 and it['fw'] >= 700)) else 4.5
                        worst = min(res); spread = round(ratio(lo, hi), 2)
                        results.append(dict(vp=tag, page=name or 'home', scroll=f, text=it['t'], fs=it['fs'], need=need, ratio=round(worst, 2), ok=worst >= need, bg=med, spread=spread, fg=it['c'], op=it['op']))
            await ctx.close()
        await b.close()
try: asyncio.run(main())
finally: srv.kill()
bad = [r for r in results if not r['ok']]
print(f'{len(results)} text boxes checked, {len(bad)} below target, {len(skipped)} skipped (still fading in)')
for r in sorted(bad, key=lambda r: r['ratio'])[:40]: print(f"{r['vp']:7} {r['page']:12} s={r['scroll']:<3} {r['ratio']:>5} need {r['need']}  {r['fs']:.0f}px  {r['text']!r}")
if out: json.dump(results, open(out, 'w'), indent=1)
