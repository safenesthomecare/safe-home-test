import { useEffect, useRef } from 'react';
import { flattenGradients } from '../../lib/flatten';
import { worldTransform, baseScale, fitZoom } from '../../lib/camera';

// Renders a page's world (layered SVG) as ONE still frame (world.shot = { x, y, z, xN?, yN? }; xN / yN are the phone centre).
// Nothing moves with scroll. The frame is exactly the space between the bottom of the header and the top of the footer:
// when the footer scrolls into view the frame gets shorter and the picture scales down with it, so nothing is cropped.
export default function WorldCamera({ world }) {
  const stage = useRef(null);
  const wrap = useRef(null);

  useEffect(() => {
    const st = stage.current; const wr = wrap.current;
    if (!st || !wr) return undefined;
    flattenGradients(wr);
    const layers = Array.from(wr.querySelectorAll('.sw-layer')).map((el) => ({ el, d: parseFloat(el.style.getPropertyValue('--d')) }));
    const shot = world.shot || (world.keys && world.keys[0]) || { x: world.w / 2, y: world.h / 2, z: 1 };
    let raf = 0;
    const apply = () => {
      raf = 0;
      const vw = window.innerWidth;
      const hd = document.querySelector('header.header-nav');
      const hdrH = hd ? Math.max(0, Math.round(hd.getBoundingClientRect().bottom)) : 80;
      const vh = Math.max(1, window.innerHeight - hdrH);
      const ft = document.querySelector('footer');
      const clip = ft ? Math.max(0, window.innerHeight - ft.getBoundingClientRect().top) : 0;
      const fh = Math.max(120, vh - clip);
      const k = baseScale(vw, vh);
      const narrow = vw < 700;
      const cam = { x: narrow && shot.xN != null ? shot.xN : shot.x, y: narrow ? (shot.yN != null ? shot.yN : shot.y - 190) : shot.y, z: ((narrow && shot.zN != null ? shot.zN : shot.z) == null ? 1 : (narrow && shot.zN != null ? shot.zN : shot.z)) * fitZoom(vw) * (fh / vh) };
      // keep the frame inside the world (no empty edges)
      const hw = vw / (2 * k * cam.z); const hh = fh / (2 * k * cam.z);
      const wr2 = world.w + (world.padR || 0);
      cam.x = wr2 > 2 * hw ? Math.min(wr2 - hw, Math.max(hw, cam.x)) : wr2 / 2;
      cam.y = world.h > 2 * hh ? Math.min(world.h - hh, Math.max(hh, cam.y)) : world.h / 2;
      const t = worldTransform(cam, k, vw, fh);
      wr.style.width = `${world.w * k}px`; wr.style.height = `${world.h * k}px`;
      wr.style.transform = `translate3d(${t.tx.toFixed(1)}px, ${t.ty.toFixed(1)}px, 0) scale(${t.scale.toFixed(4)})`;
      layers.forEach(({ el, d }) => { el.style.translate = `${(cam.x * (1 - d)).toFixed(1)}px ${(cam.y * (1 - d)).toFixed(1)}px`; });
      st.setAttribute('data-cam', `${cam.x.toFixed(0)},${cam.y.toFixed(0)},${cam.z.toFixed(2)}`);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };
    document.body.dataset.snSide = world.side || 'left';
    apply();
    window.addEventListener('scroll', queue, { passive: true }); // only to follow the footer edge
    window.addEventListener('resize', queue);
    let ro;
    if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(queue); ro.observe(document.body); }
    const t = setTimeout(queue, 150);
    return () => {
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue);
      if (ro) ro.disconnect(); clearTimeout(t); if (raf) cancelAnimationFrame(raf);
      delete document.body.dataset.snSide;
    };
  }, [world]);

  return (
    <div ref={stage} className="sw-stage" data-world>
      <div ref={wrap} className="sw-world">
        <svg viewBox={`0 0 ${world.w} ${world.h}`} width="100%" height="100%" preserveAspectRatio="none" focusable="false">
          {world.layers.map((l) => (
            <g key={l.id} className="sw-layer" style={{ '--d': l.depth }}>{l.node}</g>
          ))}
        </svg>
      </div>
    </div>
  );
}
