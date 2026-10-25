import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StoryScene, { SCENES } from './StoryScene';
import ArtifactIcon from './ArtifactIcon';
import { PropArt } from './props';
import { pageFor, tintAt } from '../../lib/pageStory';
import { TONES } from '../../lib/storyTokens';

// One site-wide story layer, driven by the current page.
//   back   : the page's scene, parallax by scroll; moves through 3 beats (data-beat) as you scroll
//   veil   : light cream wash that softens the scene a little more as you scroll
//   wash   : time-of-day tint for this page
//   props  : illustrated props drifting past the edges (faster than the page); the previous page's props leave as the new ones arrive
// Props perched on content panels live in props.jsx (StoryProp). Everything here is decorative (aria-hidden)
// except the time badge, which names the current beat.

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

const toMin = (t) => { const m = t.match(/(\d+):(\d+) (AM|PM)/); return ((+m[1] % 12) + (m[3] === 'PM' ? 12 : 0)) * 60 + +m[2]; };
const fmt = (min) => { const h = Math.floor(min / 60) % 24; const m = Math.round(min % 60); return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };

const layoutFor = (page, narrow) => {
  const names = narrow ? page.drift.slice(0, 2) : page.drift;
  return names.map((name, i) => ({ name, side: i % 2 ? 'r' : 'l', y0: (i + 0.5) / names.length, speed: 1.25 + (i % 3) * 0.15, phase: i * 1.7 }));
};

export default function RouteStory() {
  const { pathname } = useLocation();
  const page = pageFor(pathname);
  const scene = SCENES.find((s) => s.id === page.scene);
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const narrow = useMedia('(max-width: 899px)');
  const root = useRef(null);
  const propEls = useRef([]);
  const lastPos = useRef([]);
  const badge = useRef(null);
  const [beat, setBeat] = useState(0);
  const [leaving, setLeaving] = useState(null);
  const [lapse, setLapse] = useState(null);
  const [tick, setTick] = useState(null);
  const curTime = useRef(page.beats[0].time);
  const prev = useRef({ id: page.id, page, layout: layoutFor(page, narrow) });

  const layout = layoutFor(page, narrow);

  // When the page changes, keep the old props on screen for a moment so they leave instead of vanishing.
  useEffect(() => {
    if (prev.current.id !== page.id) {
      const old = prev.current.layout.map((it, i) => ({ ...it, pos: lastPos.current[i] || '0px 0px' }));
      setLeaving({ id: prev.current.id, items: old });
      setBeat(0);
      const t = setTimeout(() => setLeaving(null), 750);
      // Time-lapse: a light sweep from the old page's colour to the new one, and the badge clock ticks to the new time.
      let iv = 0; let t2 = 0;
      if (!reduced) {
        setLapse({ key: page.id, a: TONES[prev.current.page.tone].fill, b: TONES[page.tone].fill });
        const from = toMin(curTime.current); const to = toMin(page.beats[0].time); const t0 = Date.now();
        iv = setInterval(() => { const k = Math.min(1, (Date.now() - t0) / 700); setTick(fmt(from + (to - from) * k)); if (k >= 1) { clearInterval(iv); setTick(null); } }, 40);
        t2 = setTimeout(() => setLapse(null), 900);
      }
      prev.current = { id: page.id, page, layout };
      return () => { clearTimeout(t); clearTimeout(t2); clearInterval(iv); setTick(null); };
    }
    prev.current = { id: page.id, page, layout };
    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.id]);

  // The class is also set in public/index.html so the panels exist from first paint (no layout jump).
  useEffect(() => {
    document.body.classList.add('sn-story-on');
    return () => document.body.classList.remove('sn-story-on');
  }, []);

  // Pointer tilt (desktop only, no permission prompt): layers shift a little with the pointer, deeper layers more.
  useEffect(() => {
    const el = root.current;
    if (!el || reduced || !window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    let tx = 0; let ty = 0; let cx = 0; let cy = 0; let raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      el.style.setProperty('--tx', cx.toFixed(3)); el.style.setProperty('--ty', cy.toFixed(3));
      raf = (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => { tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2; if (!raf) raf = requestAnimationFrame(loop); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); if (raf) cancelAnimationFrame(raf); };
  }, [reduced]);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    let raf = 0;
    // text sits on feathered panels (story.css), so the veil only softens the scene in the gaps
    const base = 0.28 + 0.12 * Math.pow(page.day, 1.5);
    let lastBeat = -1;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const sy = window.scrollY || 0;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = clamp(sy / max);
      const pp = reduced ? 0.5 : p;
      el.style.setProperty('--p', pp.toFixed(4));
      if (badge.current) { if (sy > 40) badge.current.setAttribute('data-compact', ''); else badge.current.removeAttribute('data-compact'); }
      el.style.setProperty('--veil', (reduced ? 0.55 : base + (0.6 - base) * clamp(sy / (vh * 0.7))).toFixed(3));
      el.style.setProperty('--tint', tintAt(clamp(page.day + (pp - 0.5) * 0.06)));
      let b = 0;
      page.beats.forEach((bt, i) => { if (p >= bt.at) b = i; });
      if (b !== lastBeat) { lastBeat = b; setBeat(b); }
      const range = vh + 160;
      layout.forEach((it, i) => {
        const node = propEls.current[i];
        if (!node) return;
        const y = reduced ? it.y0 * vh : ((((it.y0 * range - sy * it.speed) % range) + range) % range) - 80;
        const x = reduced ? 0 : Math.sin(sy / 220 + it.phase) * 12;
        const v = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
        node.style.translate = v;
        lastPos.current[i] = v;
      });
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
  // layout is derived from page + narrow, both listed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.id, narrow, reduced]);

  const tone = TONES[page.tone];
  const size = narrow ? 56 : 76;
  const bt = page.beats[Math.min(beat, page.beats.length - 1)];
  // recorded after commit, so the page-change effect above still sees the previous page's time
  useEffect(() => { curTime.current = tick || bt.time; });
  return (
    <>
      <div ref={root} className="sn-story" aria-hidden="true" data-page={page.id}>
        <div className="sn-story-back" key={page.id}>
          <StoryScene scene={scene} beat={beat} inheritProgress bleed shift={90} style={{ position: 'absolute', inset: 0, aspectRatio: 'auto', width: '100%', height: '100%' }} />
        </div>
        <div className="sn-story-veil" />
        <div className="sn-story-wash" />
        {lapse && <div key={lapse.key} className="sn-story-lapse" style={{ '--a': lapse.a, '--b': lapse.b }} />}
        <div className="sn-story-props" data-narrow={narrow || undefined}>
          {leaving && leaving.items.map((it) => (
            <span key={`out-${leaving.id}-${it.name}`} className="sn-story-prop sn-out" data-side={it.side} style={{ translate: it.pos }}>
              <PropArt name={it.name} size={size} />
            </span>
          ))}
          {layout.map((it, i) => (
            <span key={`${page.id}-${it.name}`} ref={(n) => { propEls.current[i] = n; }} className="sn-story-prop sn-in" data-side={it.side}>
              <PropArt name={it.name} size={size} />
            </span>
          ))}
        </div>
      </div>
      <p ref={badge} className="sn-time-badge" style={{ '--accent': tone.fill }}>
        <ArtifactIcon name="sun-badge" size={16} />
        <span><strong>{tick || bt.time}</strong>{!tick && <span className="sn-time-task"> · {bt.text}</span>}</span>
      </p>
    </>
  );
}
