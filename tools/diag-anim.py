import re
src=open('fps.py').read()
JS=re.search(r'JS="""(.*?)"""',src,re.S).group(1)
from playwright.sync_api import sync_playwright
CSS={'normal':'', 'no-anim':'*{animation:none!important}', 'no-anim+nocontain':'*{animation:none!important}'}
with sync_playwright() as p:
    b=p.chromium.launch()
    for port,label in [(5055,'new'),(5056,'old')]:
        for r in ['/about','/services']:
            for mode in ['normal','no-anim']:
                pg=b.new_page(viewport={'width':1440,'height':900}); pg.goto(f'http://localhost:{port}{r}',wait_until='networkidle')
                if CSS[mode]: pg.add_style_tag(content=CSS[mode])
                pg.wait_for_timeout(1000); m=pg.evaluate(JS); print(label,r,mode,m['fps'],'fps p95',m['p95'],flush=True); pg.close()
    b.close()
