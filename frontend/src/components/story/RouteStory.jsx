import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StoryScene, { SCENES } from './StoryScene';
import WorldCamera from './WorldCamera';
import { DEBUG_WORLD } from './worlds/debug';
import { WORLDS } from './worlds';
import { pageFor, tintAt } from '../../lib/pageStory';

// One site-wide story layer, driven by the current page.
//   back   : the page's scene, parallax by scroll; moves through 3 beats (data-beat) as you scroll
//   veil   : light cream wash that softens the scene a little more as you scroll
//   wash   : time-of-day tint for this page
// Everything here is decorative (aria-hidden).

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function useMedia(query) {
  const [on, setOn] = useState(() => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false));
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    const h = () => setOn(mq.matches);
    h();
    if (mq.addEventListener) mq.addEventListener('change', h); else mq.addListener(h);
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', h); else mq.removeListener(h); };
  }, [query]);
  return on;
}

export default function RouteStory() {
  const { pathname } = useLocation();
  const page = pageFor(pathname);
  const scene = SCENES.find((s) => s.id === page.scene);
  // pages with a drawn world use the scroll-timeline camera; the rest keep the layered backdrop. window.__SN_DEBUG_WORLD is for QA only.
  const world = (typeof window !== 'undefined' && window.__SN_DEBUG_WORLD) ? DEBUG_WORLD : WORLDS[page.id];
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const root = useRef(null);
  const [beat, setBeat] = useState(0);

  // new page: restart at the first beat
  useEffect(() => { setBeat(0); }, [page.id]);

  // The class is also set in public/index.html so the panels exist from first paint (no layout jump).
  useEffect(() => {
    document.body.classList.add('sn-story-on');
    return () => document.body.classList.remove('sn-story-on');
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    let raf = 0;
    // text sits on feathered panels (story.css), so the veil only softens the scene in the gaps
    const base = world ? 0 : 0.28 + 0.12 * Math.pow(page.day, 1.5);
    let lastBeat = -1;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const sy = window.scrollY || 0;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = clamp(sy / max);
      const pp = reduced ? 0.5 : p;
      el.style.setProperty('--p', pp.toFixed(4));
      el.style.setProperty('--veil', (world ? 0 : reduced ? 0.55 : base + (0.6 - base) * clamp(sy / (vh * 0.7))).toFixed(3));
      el.style.setProperty('--tint', tintAt(clamp(page.day + (pp - 0.5) * 0.06)));
      let b = 0;
      page.beats.forEach((bt, i) => { if (p >= bt.at) b = i; });
      if (b !== lastBeat) { lastBeat = b; setBeat(b); }
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    let ro;
    if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(queue); ro.observe(document.body); }
    const t = setTimeout(queue, 120);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      if (ro) ro.disconnect();
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.id, reduced, world]);

  return (
    <>
      <div ref={root} className="sn-story" aria-hidden="true" data-page={page.id}>
        <div className="sn-story-back" key={page.id}>
          {world
            ? <WorldCamera world={world} reduced={reduced} />
            : <StoryScene scene={scene} beat={beat} inheritProgress bleed shift={90} style={{ position: 'absolute', inset: 0, aspectRatio: 'auto', width: '100%', height: '100%' }} />}
        </div>
        <div className="sn-story-veil" />
        <div className="sn-story-wash" />
      </div>
    </>
  );
}
