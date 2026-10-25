import { useEffect, useRef, useState } from 'react';
import { asset } from '../../lib/asset';

// "A Day at Home" — scene registry + renderer.
// Each scene is a layered SVG (public/story). Layers are <g id="layer-*" data-depth="0.2-1">.
// Scenes are inlined into a Shadow DOM so their internal CSS animations/ids never collide.

export const SCENES = [
  { id: 'knock', focus: 0.4, clock: '8:00 AM', day: 0, src: '/story/scene-1-knock.svg', title: 'Someone familiar at the door.', text: 'Your caregiver arrives on time, every visit, with a warm hello.', service: 'Why SafeNest', alt: 'A caregiver at the front door of a house at sunrise' },
  { id: 'morning', focus: 0.92, clock: '8:30 AM', day: 0.1, src: '/story/scene-2-morning.svg', title: 'Mornings start gently.', text: 'Curtains open, a kind check-in, and the day begins at your pace.', service: 'Personal Support & Assistance', alt: 'A caregiver opening the curtains in a sunlit bedroom' },
  { id: 'care', focus: 0.5, clock: '9:15 AM', day: 0.2, src: '/story/scene-3-care.svg', title: 'Care that keeps dignity.', text: 'Help getting ready, always respectful and always at your comfort level.', service: 'Personal Support & Assistance', alt: 'A caregiver helping a resident at a dresser mirror' },
  { id: 'breakfast', focus: 0.5, clock: '10:30 AM', day: 0.3, src: '/story/scene-4-breakfast.svg', title: 'A meal, and good company.', text: 'Meals made the way you like them, shared with someone who listens.', service: 'Companion Care', alt: 'A caregiver and resident sharing breakfast' },
  { id: 'medication', focus: 0.68, clock: '11:30 AM', day: 0.45, src: '/story/scene-5-medication.svg', title: 'Every dose, on time.', text: 'Gentle reminders so medications are never missed.', service: 'Elderly & Disability Support', alt: 'A caregiver offering water beside a pill organiser' },
  { id: 'walk', focus: 0.5, clock: '2:00 PM', day: 0.6, src: '/story/scene-6-walk.svg', title: 'Fresh air, steady arm.', text: 'Safe walks and mobility support, one step at a time.', service: 'Post-Hospital & Recovery Care', alt: 'A caregiver and resident walking arm in arm in a park' },
  { id: 'tea', focus: 0.5, clock: '4:30 PM', day: 0.8, src: '/story/scene-7-tea.svg', title: 'Time for tea, and for family.', text: 'Conversation, comfort, and a well-earned rest for loved ones.', service: 'Respite Care for Families', alt: 'A caregiver and resident sharing tea and a photo album' },
  { id: 'window', focus: 0.74, clock: '7:30 PM', day: 1, src: '/story/scene-8-window.svg', title: 'Home, safe for the night.', text: 'The light stays on. You can rest easy.', service: 'Peace of Mind', alt: 'A house at dusk with a warm lit window' },
];

const SHIFT_PX = 80; // total parallax travel of the nearest layer
const cache = new Map();
const load = (src) => {
  if (!cache.has(src)) {
    cache.set(src, fetch(asset(src)).then((r) => { if (!r.ok) throw new Error(src); return r.text(); }).catch((e) => { cache.delete(src); throw e; }));
  }
  return cache.get(src);
};


// Story beats: each page scrolls through 3 moments (data-beat 0..2). Beat styles move/brighten existing layers with
// `transform` and `filter` only (the `translate` property is reserved for scroll parallax).
const BEAT_CSS = `
[data-depth]{transition:transform 900ms ease}
#layer-light,#layer-beam,#layer-glow{transform-box:fill-box;transform-origin:center}
svg{transition:filter 900ms ease}
:host([data-scene="knock"][data-beat="1"]) #layer-people{transform:translateX(26px)}
:host([data-scene="knock"][data-beat="1"]) #layer-light{transform:scale(1.1)}
:host([data-scene="knock"][data-beat="2"]) #layer-people{transform:translateX(52px)}
:host([data-scene="knock"][data-beat="2"]) #layer-light{transform:scale(1.2)}
:host([data-scene="knock"][data-beat="2"]) svg{filter:brightness(1.05) saturate(1.1)}
:host([data-scene="morning"][data-beat="1"]) #layer-beam{transform:scale(1.18)}
:host([data-scene="morning"][data-beat="1"]) svg{filter:brightness(1.04)}
:host([data-scene="morning"][data-beat="2"]) #layer-beam{transform:scale(1.3)}
:host([data-scene="morning"][data-beat="2"]) #layer-people{transform:translateX(20px)}
:host([data-scene="morning"][data-beat="2"]) svg{filter:brightness(1.08) saturate(1.08)}
:host([data-scene="care"][data-beat="1"]) #layer-light{transform:scale(1.15)}
:host([data-scene="care"][data-beat="1"]) #layer-people{transform:translateX(-14px)}
:host([data-scene="care"][data-beat="2"]) #layer-people{transform:translateX(14px)}
:host([data-scene="care"][data-beat="2"]) #layer-light{transform:scale(1.25)}
:host([data-scene="care"][data-beat="2"]) svg{filter:brightness(1.06) saturate(1.06)}
:host([data-scene="walk"][data-beat="1"]) #layer-people{transform:translateX(36px)}
:host([data-scene="walk"][data-beat="1"]) #layer-leaves{transform:translateY(-14px)}
:host([data-scene="walk"][data-beat="2"]) #layer-people{transform:translateX(72px)}
:host([data-scene="walk"][data-beat="2"]) #layer-leaves{transform:translateY(-28px)}
:host([data-scene="tea"][data-beat="1"]) #layer-people{transform:translateY(-4px)}
:host([data-scene="tea"][data-beat="1"]) #layer-light{transform:scale(1.1)}
:host([data-scene="tea"][data-beat="2"]) #layer-light{transform:scale(1.22)}
:host([data-scene="tea"][data-beat="2"]) svg{filter:brightness(1.05) saturate(1.1)}
:host([data-scene="window"][data-beat="1"]) #layer-glow{transform:scale(1.1)}
:host([data-scene="window"][data-beat="1"]) svg{filter:brightness(.93)}
:host([data-scene="window"][data-beat="2"]) #layer-glow{transform:scale(1.3)}
:host([data-scene="window"][data-beat="2"]) svg{filter:brightness(.86) saturate(1.1)}
@media (prefers-reduced-motion:reduce){[data-depth],svg{transition:none}}
`;

const SHADOW_CSS = `
:host{display:block;position:relative;overflow:hidden;line-height:0}
:host([data-paused]) *{animation-play-state:paused !important}
:host([data-bleed]) svg{scale:1.12}
svg{position:absolute;top:0;height:100%;width:auto;min-width:100%;aspect-ratio:12/7;left:calc(var(--fx,.5) * 100%);transform:translateX(calc(var(--fx,.5) * -100%))}
[data-depth]{translate:calc(var(--tx,0) * var(--d,.5) * -16px) calc((var(--p,.5) - .5) * var(--d,.5) * var(--shift,80) * -1px + var(--ty,0) * var(--d,.5) * -8px);will-change:translate}
@media (prefers-reduced-motion:reduce){[data-depth]{translate:none;will-change:auto}}
`;

/**
 * progress: 0..1 scroll progress through this scene (0.5 = centred, no offset).
 * Parent (Phase 3 scroll engine) supplies it; defaults to centred.
 */
export default function StoryScene({ scene, progress = 0.5, inheritProgress = false, shift = SHIFT_PX, bleed = false, beat = 0, className = '', style }) {
  const host = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || !scene) return undefined;
    let live = true;
    const root = el.shadowRoot || el.attachShadow({ mode: 'open' });
    setFailed(false);
    load(scene.src).then((svg) => {
      if (!live) return;
      root.innerHTML = `<style>${SHADOW_CSS}${BEAT_CSS}</style>${svg}`;
      root.querySelectorAll('[data-depth]').forEach((g) => g.style.setProperty('--d', g.getAttribute('data-depth')));
      const s = root.querySelector('svg');
      if (s) { s.setAttribute('aria-hidden', 'true'); s.setAttribute('preserveAspectRatio', 'xMidYMid slice'); }
    }).catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [scene]);

  // Pause the scene's looping animations while it is off-screen (saves battery on phones).
  useEffect(() => {
    const el = host.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.removeAttribute('data-paused'); else el.setAttribute('data-paused', '');
    }, { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const p = Math.min(1, Math.max(0, progress));
  return (
    <div
      ref={host}
      role="img"
      aria-label={scene ? scene.alt : undefined}
      className={`sn-story-scene ${className}`}
      data-failed={failed || undefined}
      data-bleed={bleed || undefined}
      data-scene={scene ? scene.id : undefined}
      data-beat={beat}
      style={{ ...(inheritProgress ? {} : { '--p': p }), '--shift': shift, '--fx': scene ? scene.focus : 0.5, aspectRatio: '12 / 7', background: 'var(--sn-sky-mist)', ...style }}
    />
  );
}
