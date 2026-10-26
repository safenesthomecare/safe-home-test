import json
from playwright.sync_api import sync_playwright
JS="""async()=>{const H=document.documentElement.scrollHeight-innerHeight;const ts=[];let on=true;
const loop=t=>{ts.push(t);if(on)requestAnimationFrame(loop)};requestAnimationFrame(loop);
const dur=6000,t0=performance.now();
await new Promise(r=>{const step=()=>{const p=Math.min(1,(performance.now()-t0)/dur);scrollTo(0,H*p);if(p<1)requestAnimationFrame(step);else r()};step()});
on=false;await new Promise(r=>setTimeout(r,100));
const d=ts.slice(1).map((t,i)=>t-ts[i]).sort((a,b)=>a-b);
return {H,frames:ts.length,fps:+(ts.length/(dur/1000)).toFixed(1),p95:+d[Math.floor(d.length*.95)].toFixed(1),worst:+d[d.length-1].toFixed(1),dom:document.querySelectorAll('*').length}}"""
res={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,(w,h,mob) in {'desktop':(1440,900,False),'phone':(390,844,True)}.items():
        for r in ['/','/about','/services','/testimonials','/faq','/contact']:
            ctx=b.new_context(viewport={'width':w,'height':h},is_mobile=mob,has_touch=mob)
            pg=ctx.new_page(); errs=[]; bytes_=[0]
            pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
            pg.on('response',lambda rs: bytes_.__setitem__(0,bytes_[0]+len(rs.body()) if rs.ok else bytes_[0]))
            pg.goto('http://localhost:5055'+r,wait_until='networkidle'); pg.wait_for_timeout(1500)
            m=pg.evaluate(JS); m['kb']=round(bytes_[0]/1024); m['errs']=errs[:2]
            res[f'{name}{r}']=m; print(name,r,m,flush=True)
            ctx.close()
    b.close()
json.dump(res,open('fps.json','w'))
