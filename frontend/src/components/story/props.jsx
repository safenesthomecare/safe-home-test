import React, { useEffect, useRef, useState } from 'react';

// Illustrated foreground props (flat, soft, logo colours). 120x120 grid, decorative only.
// Animations live in story.css and start when the wrapper gets `.is-in` (scrolled into view).
const C = { navy: '#00263F', blue: '#1F5BA8', orange: '#F47C20', darkOrange: '#D9650F', gold: '#FFC72C', green: '#4CAF2D', darkGreen: '#2F7D1E', brown: '#8B5A2B', cream: '#FFF1DC', white: '#FFFFFF', teal: '#14A89B', violet: '#8B6CD6', rose: '#E0577F', sky: '#9FC4E6' };
const shadow = <ellipse cx="60" cy="108" rx="40" ry="5" fill={C.navy} opacity=".12" />;
const shoe = (fill) => (
  <g>
    <path d="M2 40V16c0-3 2-5 5-5h10c5 0 7 7 12 9l17 5c8 2 14 5 14 14v1z" fill={fill} />
    <path d="M2 40h62v5H2z" fill={C.cream} />
    <path d="M24 17l7 8M31 15l7 8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
  </g>
);

const ART = {
  shoes: (
    <>
      <ellipse cx="60" cy="104" rx="52" ry="5" fill={C.navy} opacity=".12" />
      <g transform="translate(4 58) scale(.8)"><g className="p-a">{shoe(C.blue)}</g></g>
      <g transform="translate(58 64) scale(.8)"><g className="p-b">{shoe(C.orange)}</g></g>
    </>
  ),
  kettle: (
    <>
      {shadow}
      <path className="st" d="M52 30c-5-6 5-9 0-17" stroke={C.sky} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path className="st st2" d="M64 30c-5-6 5-9 0-17" stroke={C.sky} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M30 56l-14-12 6-5 14 10" fill={C.darkOrange} />
      <path d="M82 60h8a13 13 0 0 1 0 26H78" stroke={C.navy} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M30 52h52l-4 52H34z" fill={C.orange} />
      <path d="M33 52c0-14 11-20 23-20s23 6 23 20z" fill={C.darkOrange} />
      <circle cx="56" cy="30" r="5" fill={C.navy} />
      <path d="M40 66v26" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".35" />
    </>
  ),
  pillbox: (
    <>
      {shadow}
      <rect x="12" y="56" width="96" height="46" rx="9" fill={C.violet} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => <rect key={i} x={17 + i * 13} y="64" width="10" height="30" rx="4" fill="#EFEAFA" />)}
      <circle cx="22" cy="74" r="3.4" fill={C.gold} /><circle cx="48" cy="80" r="3.4" fill={C.rose} /><circle cx="74" cy="72" r="3.4" fill={C.gold} /><circle cx="100" cy="82" r="3.4" fill={C.teal} />
      <g className="lid"><rect x="12" y="44" width="96" height="16" rx="7" fill="#6B46C1" /><rect x="22" y="48" width="76" height="3" rx="1.5" fill="#fff" opacity=".4" /></g>
    </>
  ),
  shawl: (
    <>
      {shadow}
      <path className="p-a" d="M14 28c18 12 74 12 92 0l-6 52c-2 16-18 26-40 26S22 96 20 80z" fill={C.rose} />
      <path d="M24 44c12 8 60 8 72 0M28 62c10 7 54 7 64 0" stroke="#fff" strokeWidth="3" fill="none" opacity=".45" strokeLinecap="round" />
      {[28, 40, 52, 64, 76, 88].map((x) => <path key={x} d={`M${x} 104v8`} stroke={C.rose} strokeWidth="3" strokeLinecap="round" />)}
    </>
  ),
  plant: (
    <>
      {shadow}
      <g className="leaf"><path d="M60 78C56 52 36 40 18 44c2 22 18 36 42 34z" fill={C.green} /></g>
      <g className="leaf l2"><path d="M60 78C64 48 84 34 104 38c-2 24-20 40-44 40z" fill={C.darkGreen} /></g>
      <g className="leaf l3"><path d="M60 80C58 58 60 38 60 18c10 14 12 36 0 62z" fill="#6CC24A" /></g>
      <path d="M32 80h56l-6 28H38z" fill="#C2653A" /><rect x="28" y="74" width="64" height="9" rx="4" fill="#D9774A" />
    </>
  ),
  note: (
    <>
      {shadow}
      <g className="paper">
        <path d="M24 12h72v92H24z" fill="#fff" stroke="#E4D6C2" strokeWidth="2" />
        {[34, 46, 58, 70].map((y) => <path key={y} d={`M32 ${y}h56`} stroke={C.sky} strokeWidth="1.6" opacity=".7" />)}
        <path d="M34 30c4-5 6 4 10-1s6 4 10-1 6 4 10-1" stroke={C.navy} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M60 80c-8-5-12-9-12-14a6 6 0 0 1 12-1 6 6 0 0 1 12 1c0 5-4 9-12 14z" fill={C.rose} />
        <rect x="42" y="6" width="36" height="14" rx="2" fill={C.gold} opacity=".9" transform="rotate(-4 60 13)" />
      </g>
    </>
  ),
  knocker: (
    <>
      {shadow}
      <rect x="30" y="8" width="60" height="96" rx="12" fill={C.brown} />
      <rect x="38" y="16" width="44" height="80" rx="8" fill="#A06A38" />
      <circle cx="60" cy="34" r="6" fill={C.gold} />
      <g className="ring"><circle cx="60" cy="62" r="17" fill="none" stroke={C.gold} strokeWidth="6" /><rect x="53" y="38" width="14" height="12" rx="3" fill="#E0A800" /></g>
      <circle cx="60" cy="88" r="4" fill="#E0A800" />
    </>
  ),
  teacup: (
    <>
      {shadow}
      <path className="st" d="M48 40c-5-6 5-9 0-17" stroke={C.sky} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path className="st st2" d="M66 40c-5-6 5-9 0-17" stroke={C.sky} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M86 56h6a11 11 0 0 1 0 22H84" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M86 56h6a11 11 0 0 1 0 22H84" stroke={C.sky} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M26 50h62v22c0 14-12 24-31 24S26 86 26 72z" fill="#fff" stroke={C.sky} strokeWidth="2" />
      <path d="M26 62h62" stroke={C.blue} strokeWidth="5" />
      <ellipse cx="57" cy="102" rx="38" ry="7" fill="#fff" stroke={C.sky} strokeWidth="2" />
    </>
  ),
  photoframe: (
    <>
      {shadow}
      <g className="p-a">
        <rect x="14" y="14" width="92" height="82" rx="8" fill={C.brown} />
        <rect x="24" y="24" width="72" height="62" rx="3" fill={C.sky} />
        <circle cx="82" cy="40" r="8" fill={C.gold} />
        <path d="M24 86V70c14-12 24-4 36-10 12-6 24 0 36 8v18z" fill={C.green} />
        <circle cx="48" cy="54" r="6" fill={C.orange} /><path d="M40 78c0-12 4-16 8-16s8 4 8 16z" fill={C.orange} />
        <circle cx="68" cy="56" r="5" fill={C.blue} /><path d="M61 78c0-10 3-14 7-14s7 4 7 14z" fill={C.blue} />
      </g>
    </>
  ),
  cane: (
    <>
      {shadow}
      <g className="p-a">
        <path d="M70 100V36c0-16-6-24-20-24S28 22 30 36" stroke={C.brown} strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M70 100V36c0-16-6-24-20-24S28 22 30 36" stroke="#A06A38" strokeWidth="3" fill="none" strokeLinecap="round" transform="translate(-2 0)" opacity=".7" />
        <rect x="64" y="96" width="12" height="10" rx="3" fill={C.gold} />
      </g>
    </>
  ),
  lamp: (
    <>
      <circle className="glow" cx="60" cy="48" r="44" fill={C.gold} opacity=".28" />
      {shadow}
      <path d="M40 24h40l14 40H26z" fill={C.gold} />
      <path d="M40 24h40l3 8H37z" fill="#E0A800" />
      <rect x="56" y="64" width="8" height="34" fill={C.navy} />
      <path d="M38 102h44l-4 6H42z" fill={C.navy} />
    </>
  ),
  bowl: (
    <>
      {shadow}
      <path className="st" d="M46 46c-5-6 5-9 0-17" stroke={C.sky} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path className="st st2" d="M62 46c-5-6 5-9 0-17" stroke={C.sky} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path className="st st3" d="M78 46c-5-6 5-9 0-17" stroke={C.sky} strokeWidth="4" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="58" rx="42" ry="10" fill="#F5B55C" />
      <path d="M18 58h84c0 26-18 44-42 44S18 84 18 58z" fill={C.teal} />
      <path d="M30 74c8 8 52 8 60 0" stroke="#fff" strokeWidth="3" fill="none" opacity=".4" strokeLinecap="round" />
      <path d="M92 40l8-10" stroke={C.brown} strokeWidth="5" strokeLinecap="round" />
    </>
  ),
};

export const CAPTIONS = {
  shoes: 'Shoes by the door. We always take ours off.',
  kettle: 'Kettle on. Your tea, your way.',
  pillbox: 'Every dose, on time.',
  shawl: 'A warm shawl within reach.',
  plant: 'Watered on every visit.',
  note: 'Notes from families keep us honest.',
  knocker: "Knock, knock. We're always glad to hear from you.",
  teacup: 'Tea and a good chat.',
  photoframe: 'Every home has a story.',
  cane: 'A steady arm for every step.',
  lamp: 'The light stays on.',
  bowl: 'Meals made the way you like them.',
};

export const PROP_NAMES = Object.keys(ART);

export function PropArt({ name, size = 96, className = '' }) {
  const art = ART[name];
  return (
    <svg className={`sn-prop sn-prop-${name} ${className}`} viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" focusable="false" data-missing={art ? undefined : name}>
      {art || <circle cx="60" cy="60" r="30" fill="none" stroke={C.navy} strokeDasharray="6 6" />}
    </svg>
  );
}

// Perches on the top edge of a content panel (put it inside a section's .container). Animates in when scrolled into view.
export function StoryProp({ name, side = 'r', size, offset, inset = false }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const timer = useRef(0);
  const show = () => { setOpen(true); clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 3400); };
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { el.classList.add('is-in'); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('is-in'); else el.classList.remove('is-in'); }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className="sn-perch" data-side={side} data-inset={inset || undefined} data-open={open || undefined} aria-hidden="true" onClick={show} onMouseEnter={show} style={{ '--size': size ? `${size}px` : undefined, '--off': offset }}>
      <PropArt name={name} size="100%" />
      <span className="sn-cap">{CAPTIONS[name]}</span>
    </span>
  );
}
