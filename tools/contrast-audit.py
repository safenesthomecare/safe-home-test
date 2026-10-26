import json,sys,io
from playwright.sync_api import sync_playwright
from PIL import Image
port=sys.argv[1]; out=sys.argv[2]
COLLECT="""()=>{const res=[];const vh=innerHeight,vw=innerWidth;
const op=e=>{let o=1;for(let n=e;n&&n.nodeType===1;n=n.parentElement){o*=parseFloat(getComputedStyle(n).opacity)}return o};
for(const e of document.querySelectorAll('body *')){
 if(e.closest('svg,script,style,noscript'))continue;
 const own=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>0);if(!own)continue;
 const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none')continue;
 const r=e.getBoundingClientRect();if(r.width<4||r.height<4||r.bottom<0||r.top>vh||r.right<0||r.left>vw)continue;
 if(cs.webkitBackgroundClip==='text'||cs.backgroundClip==='text')continue;
 const t=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ').slice(0,40);
 res.push({t,c:cs.color,fs:parseFloat(cs.fontSize),fw:parseInt(cs.fontWeight),o:op(e),x:Math.max(0,r.left),y:Math.max(0,r.top),w:Math.min(vw,r.right)-Math.max(0,r.left),h:Math.min(vh,r.bottom)-Math.max(0,r.top),tag:e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.split(' ')[0]:'')})}
return res}"""
def lum(c):
    f=lambda v:(v/255/12.92) if v/255<=0.03928 else (((v/255)+0.055)/1.055)**2.4
    return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2])
def cr(a,b):
    la,lb=lum(a),lum(b); 
    if la<lb: la,lb=lb,la
    return (la+0.05)/(lb+0.05)
import re
def parse(c):
    m=re.findall(r'[\d.]+',c); v=[float(x) for x in m]; return v[:3],(v[3] if len(v)>3 else 1.0)
fails={}; total=0
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,(w,h,mob) in {'desktop':(1440,900,False),'phone':(390,844,True)}.items():
        for r in ['/','/about','/services','/testimonials','/faq','/contact']:
            pg=b.new_page(viewport={'width':w,'height':h},is_mobile=mob,has_touch=mob)
            pg.goto(f'http://localhost:{port}{r}',wait_until='networkidle'); pg.wait_for_timeout(800)
            H=pg.evaluate("document.documentElement.scrollHeight-innerHeight"); ys=sorted(set([0]+[int(H*i/8) for i in range(1,9)]))
            for y in ys:
                pg.evaluate(f"scrollTo(0,{y})"); pg.wait_for_timeout(1400)
                items=[i for i in pg.evaluate(COLLECT) if i["o"]>=0.95]
                st=pg.add_style_tag(content="*{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;caret-color:transparent!important}")
                pg.wait_for_timeout(150); im=Image.open(io.BytesIO(pg.screenshot())).convert('RGB')
                st.evaluate('e=>e.remove()')
                for it in items:
                    box=(int(it['x']),int(it['y']),int(it['x']+it['w']),int(it['y']+it['h']))
                    if box[2]<=box[0] or box[3]<=box[1]: continue
                    px=list(im.crop(box).get_flattened_data() if hasattr(im,'get_flattened_data') else im.crop(box).getdata()); step=max(1,len(px)//400); px=px[::step]
                    col,al=parse(it['c']); a=al*it['o']
                    rs=sorted(cr([col[i]*a+q[i]*(1-a) for i in range(3)],q) for q in px)
                    worst=rs[int(len(rs)*0.10)]
                    large=it['fs']>=24 or (it['fs']>=18.66 and it['fw']>=700); need=3 if large else 4.5
                    total+=1
                    if worst<need:
                        k=(name,r,it['t'],it['tag']); 
                        if k not in fails or fails[k]['cr']>worst: fails[k]={'cr':round(worst,2),'need':need,'fs':it['fs'],'y':y}
            pg.close()
    b.close()
rows=[dict(dev=k[0],route=k[1],text=k[2],tag=k[3],**v) for k,v in fails.items()]
json.dump({'total':total,'fails':rows},open(out,'w'))
print('checked',total,'fails',len(rows))
for d in ['desktop','phone']:
    for r in ['/','/about','/services','/testimonials','/faq','/contact']:
        print(d,r,sum(1 for x in rows if x['dev']==d and x['route']==r))
