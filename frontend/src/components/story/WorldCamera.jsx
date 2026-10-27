import { useEffect, useRef } from 'react';
import { flattenGradients } from '../../lib/flatten';
import { buildTrack, sample, worldTransform, baseScale, fitZoom } from '../../lib/camera';

// Renders a page's world (layered SVG) and moves a camera through it as the page scrolls.
// Keys are tied to page sections, so the section in the middle of the screen always has the right part of the world behind it.
// Deeper layers (depth 1) move with the world; far layers (depth near 0) stay with the camera.
export default function WorldCamera({ world, reduced }) {
  const stage = useRef(null);
  const wrap = useRef(null);

  useEffect(() => {
    const st = stage.current; const wr = wrap.current;
    if (!st || !wr) return undefined;
    flattenGradients(wr);
    let raf = 0; let track = []; let vw = 0; let vh = 0; let k = 1; let hdrH = 80;
    // Cache the few moving elements once, and write to them directly. A custom property set on the stage would make the browser re-check every drawn element on each scroll step.
    const layers = Array.from(wr.querySelectorAll('.sw-layer')).map((el) => ({ el, d: parseFloat(el.style.getPropertyValue('--d')) }));
    const walkers = Array.from(wr.querySelectorAll('.sw-walk')).map((el) => ({ el, wx: parseFloat(el.style.getPropertyValue('--wx')) || 0, wy: parseFloat(el.style.getPropertyValue('--wy')) || 0 }));
    const measure = () => {
      vw = window.innerWidth; hdrH = Math.max(0, Math.round((document.querySelector('header.header-nav') || { getBoundingClientRect: () => ({ bottom: 80 }) }).getBoundingClientRect().bottom)); vh = window.innerHeight - hdrH; k = baseScale(vw, vh);
      const secs = Array.from(document.querySelectorAll('main.sn-content section')).map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top + window.scrollY, h: r.height };
      });
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      track = buildTrack(world.keys, secs, window.innerHeight, max, vw < 700);
    };
    const apply = () => {
      raf = 0;
      const sy = window.scrollY || 0;
      const cam = { ...(reduced ? { x: (vw < 700 && world.keys[0].xN != null) ? world.keys[0].xN : world.keys[0].x, y: vw < 700 ? (world.keys[0].yN != null ? world.keys[0].yN : world.keys[0].y - 190) : world.keys[0].y, z: world.keys[0].z == null ? 1 : world.keys[0].z } : sample(track, sy)) };
      cam.z *= fitZoom(vw);
      // the frame is exactly the space between the header and the footer: when the footer scrolls in, the frame gets shorter and the scene scales down with it, so nothing is cut off
      const ft = document.querySelector('footer');
      const clip = ft ? Math.max(0, window.innerHeight - ft.getBoundingClientRect().top) : 0;
      const fh = Math.max(120, vh - clip);
      cam.z *= fh / vh;
      // keep the camera window inside the world (no empty edges when zoomed out)
      const hw = vw / (2 * k * cam.z); const hh = fh / (2 * k * cam.z);
      const wr2 = world.w + (world.padR || 0);
      const cx = wr2 > 2 * hw ? Math.min(wr2 - hw, Math.max(hw, cam.x)) : wr2 / 2;
      const cy = world.h > 2 * hh ? Math.min(world.h - hh, Math.max(hh, cam.y)) : world.h / 2;
      cam.x = cx; cam.y = cy;
      const t = worldTransform(cam, k, vw, fh);
      wr.style.width = `${world.w * k}px`; wr.style.height = `${world.h * k}px`;
      wr.style.transform = `translate3d(${t.tx.toFixed(1)}px, ${t.ty.toFixed(1)}px, 0) scale(${t.scale.toFixed(4)})`;
      layers.forEach(({ el, d }) => { el.style.translate = `${(cam.x * (1 - d)).toFixed(1)}px ${(cam.y * (1 - d)).toFixed(1)}px`; });
      const maxS = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = reduced ? 0 : Math.min(1, sy / maxS);
      walkers.forEach(({ el, wx, wy }) => { el.style.transform = `translate(${(p * wx).toFixed(1)}px, ${(p * wy).toFixed(1)}px)`; });
      if (world.heroFade) document.documentElement.style.setProperty('--hero-t', (reduced ? 0 : Math.min(1, sy / (window.innerHeight * 0.55))).toFixed(3));
      st.setAttribute('data-cam', `${cam.x.toFixed(0)},${cam.y.toFixed(0)},${cam.z.toFixed(2)}`);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const remeasure = () => { measure(); queue(); };
    document.body.dataset.snSide = world.side || 'left';
    measure(); apply();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', remeasure);
    let ro;
    if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(remeasure); ro.observe(document.body); }
    const t = setTimeout(remeasure, 150);
    return () => {
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', remeasure);
      if (ro) ro.disconnect(); clearTimeout(t); if (raf) cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty('--hero-t'); delete document.body.dataset.snSide;
    };
  }, [world, reduced]);

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
