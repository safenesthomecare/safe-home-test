import { useEffect, useRef, useState } from 'react';
import StoryScene, { SCENES } from './StoryScene';
import DayClock from './DayClock';

// Scroll-pinned "A Day at Home" section.
// Scroll progress -> continuous scene position -> crossfade, per-scene parallax, and --day lighting.

const STEP_VH = 80; // scroll distance per scene
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Lighting arc (see docs/STORY-BIBLE.md 1.3): day 0..1 -> rgba tint over the scene.
const TINT = [
  [0, [255, 162, 77, 0.2]],    // dawn gold
  [0.25, [230, 241, 250, 0.0]], // morning, neutral
  [0.5, [255, 255, 255, 0.1]],  // midday, cool white
  [0.75, [255, 162, 77, 0.25]], // late-day amber
  [1, [0, 59, 102, 0.35]],      // evening blue
];
export function tintAt(day) {
  const d = clamp(day);
  for (let i = 1; i < TINT.length; i += 1) {
    if (d <= TINT[i][0]) {
      const [d0, c0] = TINT[i - 1];
      const [d1, c1] = TINT[i];
      const k = (d - d0) / (d1 - d0);
      const c = c0.map((v, j) => v + (c1[j] - v) * k);
      return `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${c[3].toFixed(3)})`;
    }
  }
  return 'rgba(0,59,102,.35)';
}

// Scene position (0..N-1, continuous) -> day value (0..1) via each scene's own `day`.
export function dayAt(pos) {
  const i = clamp(Math.floor(pos), 0, SCENES.length - 1);
  const j = Math.min(i + 1, SCENES.length - 1);
  return SCENES[i].day + (SCENES[j].day - SCENES[i].day) * clamp(pos - i);
}

// Solid-ish navy panel so text keeps >= 4.5:1 contrast over any scene (measured: gradient overlay failed).
const caption = {
  position: 'absolute', left: 'clamp(12px,3vw,32px)', right: 'clamp(12px,3vw,32px)', bottom: 'clamp(12px,3vw,32px)',
  padding: 'clamp(16px,3.5vw,32px)', borderRadius: 'var(--sn-radius-lg, 24px)',
  background: 'rgba(0,38,63,.88)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
  color: '#fff', fontFamily: 'var(--sn-font-body)', pointerEvents: 'none',
};

// Docked variant (narrow portrait screens): panel sits under the picture instead of covering the people.
const docked = {
  ...caption, position: 'relative', left: 'auto', right: 'auto', bottom: 'auto', flex: 'none',
  minHeight: '12.5rem', borderRadius: '20px 20px 0 0', background: 'rgb(0,38,63)', backdropFilter: 'none', WebkitBackdropFilter: 'none',
  padding: '16px 20px calc(16px + env(safe-area-inset-bottom))', pointerEvents: 'auto',
};

function Caption({ scene, dock = false }) {
  return (
    <div style={dock ? docked : caption}>
      <div style={{ fontFamily: 'var(--sn-font-script)', fontSize: '1.4rem', color: 'var(--sn-window-gold)' }}>{scene.clock}</div>
      <h2 style={{ fontFamily: 'var(--sn-font-display)', fontSize: 'clamp(1.6rem,5vw,2.75rem)', lineHeight: 1.1, margin: '4px 0 8px', color: '#fff' }}>{scene.title}</h2>
      <p style={{ maxWidth: '36rem', margin: 0, fontSize: 'clamp(1rem,2.4vw,1.2rem)', color: '#fff' }}>{scene.text}</p>
      <div style={{ marginTop: 10, fontSize: '.8125rem', letterSpacing: '.04em', color: '#E6F1FA' }}>{scene.service}</div>
    </div>
  );
}

function usePortrait() {
  const q = '(max-width: 900px) and (max-aspect-ratio: 1/1)';
  const [on, setOn] = useState(() => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(q).matches);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(q);
    const f = () => setOn(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return on;
}

function useReducedMotion() {
  const [rm, setRm] = useState(() => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setRm(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return rm;
}

export default function StoryPinned({ offset = 0 }) {  // offset: px of fixed header to sit below
  const ref = useRef(null);
  const [skipShown, setSkipShown] = useState(false);
  const [pos, setPos] = useState(0);
  const reduced = useReducedMotion();
  const portrait = usePortrait();
  const N = SCENES.length;

  useEffect(() => {
    if (reduced) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - (window.innerHeight - offset);
      const t = span > 0 ? clamp((offset - r.top) / span) : 0;
      const next = Math.round(t * (N - 1) * 1000) / 1000;
      setPos((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [reduced, N, offset]);

  // Calm static version: every scene as a captioned card, no pinning, no tint, no parallax.
  if (reduced) {
    return (
      <section aria-label="A day at home with SafeNest" className="sn-story sn-story--static" style={{ display: 'grid', gap: 24, padding: '24px 16px' }}>
        {SCENES.map((s) => (
          <figure key={s.id} style={{ position: 'relative', margin: 0, borderRadius: 'var(--sn-radius-lg)', overflow: 'hidden' }}>
            <StoryScene scene={s} />
            <Caption scene={s} />
          </figure>
        ))}
      </section>
    );
  }

  const go = (i) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    const span = el.offsetHeight - (window.innerHeight - offset);
    window.scrollTo({ top: top + (i / (N - 1)) * span, behavior: 'smooth' });
  };
  const active = clamp(Math.round(pos), 0, N - 1);
  const day = dayAt(pos);
  return (
    <>
    <section
      ref={ref}
      aria-label="A day at home with SafeNest"
      className="sn-story"
      style={{ position: 'relative', height: `calc(100svh - ${offset}px + ${(N - 1) * STEP_VH}vh)`, '--day': day }}
    >
      {/* Keyboard users can jump past the long scroll story */}
      <a
        href="#after-story"
        onFocus={() => setSkipShown(true)}
        onBlur={() => setSkipShown(false)}
        style={{
          position: 'absolute', top: offset + 8, left: 8, zIndex: 3, padding: '10px 16px', borderRadius: 999,
          background: '#fff', color: 'var(--sn-nest-navy, #003B66)', fontWeight: 700,
          ...(skipShown ? {} : { clipPath: 'inset(50%)', width: 1, height: 1, overflow: 'hidden', padding: 0 }),
        }}
      >
        Skip the story
      </a>
      <div style={{ position: 'sticky', top: offset, height: `calc(100svh - ${offset}px)`, overflow: 'hidden', background: 'var(--sn-night)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', flex: '1 1 0', minHeight: 0 }}>
        {SCENES.map((s, i) => {
          const base = Math.min(Math.floor(pos), N - 1);
          if (i !== base && i !== base + 1) return null; // only the two neighbouring scenes are mounted
          const d = pos - i;
          // Lower scene stays solid; the next one fades in over it between 42% and 58% of the way.
          const opacity = i === base ? 1 : clamp((pos - base - 0.42) / 0.16);
          return (
            <div key={s.id} style={{ position: 'absolute', inset: 0, opacity }}>
              <StoryScene scene={s} progress={0.5 + d / 2} style={{ height: '100%', aspectRatio: 'auto', background: 'transparent' }} />
            </div>
          );
        })}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: tintAt(day) }} />
        <DayClock pos={pos} onSelect={go} />
        {!portrait && <Caption scene={SCENES[active]} />}
        </div>
        {portrait && <Caption scene={SCENES[active]} dock />}
        <div aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          {`${SCENES[active].clock}. ${SCENES[active].title} ${SCENES[active].text}`}
        </div>
      </div>
    </section>
    <div id="after-story" tabIndex={-1} style={{ outline: 'none', scrollMarginTop: offset }} />
    </>
  );
}
