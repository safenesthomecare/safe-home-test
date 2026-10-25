import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StoryScene, { SCENES } from './StoryScene';
import ArtifactIcon from './ArtifactIcon';
import { pageFor, tintAt } from '../../lib/pageStory';
import { TONES } from '../../lib/storyTokens';

// One site-wide story layer, driven by the current page.
//   back   : the page's scene, parallax by scroll (layers move at different speeds)
//   veil   : light cream wash that softens the scene a little more as you scroll (text itself sits on frosted panels)
//   wash   : time-of-day tint for this page
//   props  : kit icons drifting in the foreground (faster than the page), kept behind the content
// Everything is decorative (aria-hidden). Only the time badge carries text.

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
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const narrow = useMedia('(max-width: 899px)');
  const root = useRef(null);
  const propEls = useRef([]);
  const badge = useRef(null);

  const names = narrow ? page.props.slice(0, 2) : page.props;
  const layout = names.map((name, i) => ({ name, side: i % 2 ? 'r' : 'l', y0: (i + 0.5) / names.length, speed: 1.25 + (i % 3) * 0.15, phase: i * 1.7 }));

  // The class is also set in public/index.html so the panels exist from first paint (no layout jump).
  useEffect(() => {
    document.body.classList.add('sn-story-on');
    return () => document.body.classList.remove('sn-story-on');
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    let raf = 0;
    // text sits on frosted panels (story.css), so the veil only softens the scene in the gaps
    const base = 0.28 + 0.12 * Math.pow(page.day, 1.5);
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const sy = window.scrollY || 0;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = reduced ? 0.5 : clamp(sy / max);
      el.style.setProperty('--p', p.toFixed(4));
      if (badge.current) { if (sy > 40) badge.current.setAttribute('data-compact', ''); else badge.current.removeAttribute('data-compact'); }
      el.style.setProperty('--veil', (reduced ? 0.55 : base + (0.6 - base) * clamp(sy / (vh * 0.7))).toFixed(3));
      el.style.setProperty('--tint', tintAt(clamp(page.day + (p - 0.5) * 0.06)));
      const range = vh + 160;
      layout.forEach((it, i) => {
        const node = propEls.current[i];
        if (!node) return;
        const y = reduced ? it.y0 * vh : ((((it.y0 * range - sy * it.speed) % range) + range) % range) - 80;
        const x = reduced ? 0 : Math.sin(sy / 220 + it.phase) * 12;
        node.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
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
  const size = narrow ? 44 : 64;
  return (
    <>
      <div ref={root} className="sn-story" aria-hidden="true" data-page={page.id}>
        <div className="sn-story-back" key={page.id}>
          <StoryScene scene={scene} inheritProgress bleed shift={90} style={{ position: 'absolute', inset: 0, aspectRatio: 'auto', width: '100%', height: '100%' }} />
        </div>
        <div className="sn-story-veil" />
        <div className="sn-story-wash" />
        <div className="sn-story-props" data-narrow={narrow || undefined}>
          {layout.map((it, i) => (
            <span key={`${page.id}-${it.name}`} ref={(n) => { propEls.current[i] = n; }} className="sn-story-prop" data-side={it.side}>
              <ArtifactIcon name={it.name} size={size * 0.55} tile style={{ boxShadow: '0 4px 14px rgba(0,38,63,.14)' }} />
            </span>
          ))}
        </div>
      </div>
      <p ref={badge} className="sn-time-badge" style={{ '--accent': tone.fill }}>
        <ArtifactIcon name="sun-badge" size={16} />
        <span><strong>{page.time}</strong><span className="sn-time-task"> · {page.task}</span></span>
      </p>
    </>
  );
}
