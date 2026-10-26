// Figure builder: storybook-style people drawn from joint angles. Origin = feet (sitting: feet on the floor, seat ~50 up). face 1 = right, -1 = left.
// One shared soft-shade gradient per figure, thin ink line, no filters. Angles are degrees from "hanging straight down", positive = toward the front.
import { useId } from 'react';

const D = Math.PI / 180;
const INK = '#2B1B14';
const f1 = (n) => Math.round(n * 10) / 10;
const fk = (x, y, len, a) => [x + Math.sin(a * D) * len, y + Math.cos(a * D) * len];

function mix(hex, to, k) {
  const n = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = n(hex); const b = n(to);
  return `#${a.map((v, i) => Math.round(v + (b[i] - v) * k).toString(16).padStart(2, '0')).join('')}`;
}
export const darken = (c, k = 0.25) => mix(c, '#000000', k);
export const lighten = (c, k = 0.25) => mix(c, '#ffffff', k);

// Tapered, slightly bulging limb between two joints.
function limb(p0, p1, w0, w1, bulge = 0.14) {
  const dx = p1[0] - p0[0]; const dy = p1[1] - p0[1]; const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len; const ny = dx / len; const r0 = w0 / 2; const r1 = w1 / 2; const rc = ((r0 + r1) / 2) * (1 + bulge * 2);
  const mx = (p0[0] + p1[0]) / 2; const my = (p0[1] + p1[1]) / 2;
  const q = (x, y) => `${f1(x)} ${f1(y)}`;
  return `M${q(p0[0] + nx * r0, p0[1] + ny * r0)} Q${q(mx + nx * rc, my + ny * rc)} ${q(p1[0] + nx * r1, p1[1] + ny * r1)} A${r1} ${r1} 0 0 0 ${q(p1[0] - nx * r1, p1[1] - ny * r1)} Q${q(mx - nx * rc, my - ny * rc)} ${q(p0[0] - nx * r0, p0[1] - ny * r0)} A${r0} ${r0} 0 0 0 ${q(p0[0] + nx * r0, p0[1] + ny * r0)}Z`;
}

// Pose table: near/back arm = [upper, forearm] absolute angles; thigh/shin for the legs; lean tips the torso.
const POSES = {
  stand: { n: [7, 9], b: [-7, -5], legs: [[3, 0], [-3, 0]] },
  walk: { n: [10, 14], b: [-10, -8], legs: [[4, 0], [-4, 0]] },
  wave: { n: [152, 176], b: [-6, -4], legs: [[3, 0], [-3, 0]], wave: true },
  open: { n: [62, 44], b: [-46, -30], legs: [[4, 0], [-4, 0]], open: true },
  hold: { n: [34, 104], b: [14, 70], legs: [[3, 0], [-3, 0]] },
  give: { n: [76, 92], b: [10, 14], legs: [[5, 0], [-3, 0]], open: true },
  point: { n: [88, 90], b: [-6, -4], legs: [[3, 0], [-3, 0]] },
  sit: { n: [18, 78], b: [8, 40], legs: [[90, 2], [86, -3]], sit: true },
};

function Hand({ x, y, a, skin, open }) {
  const fan = open ? [-30, -11, 9, 27] : [-7, -2, 3, 8];
  const L = open ? 10.5 : 7.5;
  const thumbA = open ? 62 : 36;
  const strokes = (col, w) => (
    <g stroke={col} strokeWidth={w} strokeLinecap="round" fill="none">
      {fan.map((d, i) => <path key={i} d={`M${-4.2 + i * 2.8} 8 l${f1(Math.sin(d * D) * L)} ${f1(Math.cos(d * D) * L)}`} />)}
      <path d={`M4 3 l${f1(Math.sin(thumbA * D) * 8)} ${f1(Math.cos(thumbA * D) * 8)}`} />
    </g>
  );
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) rotate(${f1(-a)})`}>
      {strokes(INK, 4.8)}
      <ellipse cx="0" cy="4" rx="5.6" ry="6.4" fill={skin} stroke={INK} strokeOpacity=".5" strokeWidth="1.1" />
      {strokes(skin, 3.2)}
      <ellipse cx="0" cy="4" rx="5" ry="5.8" fill={skin} />
    </g>
  );
}

function Shoe({ x, y, shoe }) {
  return (
    <g transform={`translate(${f1(x)} ${f1(y)})`}>
      <path d="M-9 -8 L5 -8 Q9 -5 17 -2 Q19 0 17 3 L-10 3 Q-12 -2 -9 -8Z" fill={shoe} stroke={INK} strokeOpacity=".55" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M-10.5 1.6 L17.6 1.6" stroke="#F4EDE4" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M6 -5 q5 1 9 4" stroke="#fff" strokeOpacity=".35" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Hair({ style, hair, back }) {
  const hl = lighten(hair, 0.22); const stroke = { stroke: INK, strokeOpacity: 0.45, strokeWidth: 1.1, strokeLinejoin: 'round' };
  if (style === 'bald') return back ? null : <g fill={hair} {...stroke}><path d="M-17 -6 q-4 4 -2 10 q3 -2 5 -8z" /><path d="M-1 -26 q-6 0 0 0" opacity="0" /></g>;
  if (back) {
    if (style === 'long' || style === 'wavy') return <path d="M-19 -6 Q-27 18 -21 44 Q-8 50 6 44 Q10 22 8 -8Z" fill={darken(hair, 0.12)} {...stroke} />;
    if (style === 'bun') return <g><circle cx="-11" cy="-30" r="9.5" fill={hair} {...stroke} /><path d="M-17 -30 q6 -5 12 0" stroke={hl} strokeWidth="1.5" fill="none" /></g>;
    return null;
  }
  const cap = 'M-18.5 -2 C-22 -22 -10 -33 3 -32 C16 -32 21 -22 18.5 -10 C14 -19 5 -23 -3 -22 C-9 -21 -14 -14 -14 -2Z';
  if (style === 'curly') {
    return (
      <g fill={hair} {...stroke}>
        {[[-15, -8, 7], [-18, -17, 7.5], [-12, -27, 8], [-2, -31, 8.5], [9, -29, 8], [17, -20, 7.5], [19, -9, 6.5]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}
        <circle cx="-3" cy="-21" r="6" stroke="none" />
      </g>
    );
  }
  return (
    <g>
      <path d={cap} fill={hair} {...stroke} />
      <path d="M-8 -27 q8 -5 17 -1" stroke={hl} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".8" />
      {(style === 'long' || style === 'wavy') && <path d="M-18.5 -2 C-24 10 -20 24 -14 32 L-9 28 C-13 18 -12 6 -14 -2Z" fill={hair} {...stroke} />}
    </g>
  );
}

function Head({ skin, hair, hairStyle, glasses, elder, id }) {
  const sk = darken(skin, 0.28); const lip = mix(skin, '#B5483F', 0.5);
  const inkL = { stroke: INK, strokeOpacity: 0.5, strokeWidth: 1.1 };
  return (
    <g>
      <Hair style={hairStyle} hair={hair} back />
      <ellipse cx="-12" cy="-1" rx="3.6" ry="5.6" fill={skin} {...inkL} /><path d="M-13 -3 q2 1 1 4" stroke={sk} strokeWidth="1" fill="none" />
      <path d="M-16.5 -4 C-17 -22 -6 -30 4 -29 C15 -29 20 -20 18.5 -9 C18 -4 15 3 11 8 C6 13 -3 14 -9 10 C-14 6 -16 1 -16.5 -4Z" fill={skin} {...inkL} strokeLinejoin="round" />
      <path d="M-16.5 -4 C-17 -22 -6 -30 4 -29 C15 -29 20 -20 18.5 -9 C18 -4 15 3 11 8 C6 13 -3 14 -9 10 C-14 6 -16 1 -16.5 -4Z" fill={`url(#${id})`} />
      <path d="M18.5 -9 q4 3 1.5 6.5 q-1.5 1.5 -3.8 1" fill={skin} {...inkL} strokeLinecap="round" />
      <ellipse cx="9" cy="1.5" rx="4.2" ry="2.8" fill="#E8776F" opacity=".22" />
      {[[2, -9], [12, -9]].map(([cx, cy], i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx="2.5" ry="3" fill="#fff" stroke={INK} strokeOpacity=".45" strokeWidth=".8" />
          <circle cx={cx + 0.9} cy={cy + 0.2} r="1.7" fill="#4A2C1E" /><circle cx={cx + 0.9} cy={cy + 0.2} r=".8" fill="#1b1009" /><circle cx={cx + 1.6} cy={cy - 0.9} r=".8" fill="#fff" />
        </g>
      ))}
      <g stroke={darken(hair, 0.15)} strokeWidth="1.8" strokeLinecap="round" fill="none"><path d="M-1.5 -15.5 q4 -2.4 8 -.6" /><path d="M9 -16.2 q4 -2 7.4 .4" /></g>
      <path d="M13.5 -6 q3.5 5 .5 8 q-1 .6 -3 .4" stroke={sk} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M6.6 6 q4.4 3.6 9 -.4" stroke={lip} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M7.6 6.3 q3.6 2.2 7.2 -.2" stroke="#fff" strokeOpacity=".55" strokeWidth=".7" fill="none" />
      {elder && <g stroke={sk} strokeWidth="1" fill="none" strokeLinecap="round" opacity=".8"><path d="M-6 -22 q8 -2 16 0" /><path d="M-4 -19.5 q7 -1.4 13 0" /><path d="M16.5 -9 l3 -1.5 M16.8 -6.5 l3.2 .4" /><path d="M6 1 q-2 3 .5 5" /></g>}
      {glasses && <g stroke="#3B2A22" strokeWidth="1.7" fill="#BFE0F5" fillOpacity=".25"><circle cx="2" cy="-9" r="5.6" /><circle cx="12.4" cy="-9" r="5.6" /><path d="M7.6 -9.6 q1.4 -1 2 0 M-3.6 -10 L-14 -11" fill="none" /></g>}
      <Hair style={hairStyle} hair={hair} />
    </g>
  );
}

function Torso({ outfit, top, bottom, skin, id }) {
  const edge = { stroke: INK, strokeOpacity: 0.5, strokeWidth: 1.2, strokeLinejoin: 'round' };
  const body = 'M-22 -78 Q0 -86 22 -78 Q30 -72 27.5 -50 Q23.5 -30 25 3 Q0 9 -25 3 Q-23.5 -30 -27.5 -50 Q-30 -72 -22 -78Z';
  const dk = darken(top, 0.22);
  return (
    <g>
      <path d={body} fill={top} {...edge} />
      {outfit === 'cardigan' && (
        <g>
          <path d="M-9 -82 Q0 -74 9 -82 L8 3 Q0 6 -8 3Z" fill="#FFF3E0" />
          {[-58, -42, -26, -10].map((y) => <circle key={y} cx="0" cy={y} r="1.7" fill="#B98350" />)}
          <path d="M-9 -82 L-8 3 M9 -82 L8 3" stroke={dk} strokeWidth="1.6" fill="none" /><path d="M-23 -14 q8 -3 14 0 M23 -14 q-8 -3 -14 0" stroke={dk} strokeWidth="1.6" fill="none" />
          <path d="M-25 3 Q0 9 25 3" stroke={dk} strokeWidth="3.2" fill="none" />
        </g>
      )}
      {outfit === 'scrubs' && (
        <g>
          <path d="M-10 -83 L0 -62 L10 -83Z" fill={skin} stroke={dk} strokeWidth="2" strokeLinejoin="round" />
          <rect x="8" y="-50" width="13" height="15" rx="2.5" fill="none" stroke={dk} strokeWidth="1.6" /><path d="M-24 -4 q24 5 48 0" stroke={dk} strokeWidth="1.4" fill="none" opacity=".6" />
        </g>
      )}
      {outfit === 'tee' && <path d="M-10 -83 Q0 -70 10 -83" stroke={dk} strokeWidth="2.6" fill="none" strokeLinecap="round" />}
      <path d="M-15 -34 Q0 -29 14 -36 M-12 -22 q6 3 14 0" stroke="#000" strokeOpacity=".13" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d={body} fill={`url(#${id})`} />
    </g>
  );
}

// Props: pose, outfit (tee|scrubs|cardigan), hairStyle (short|bun|curly|wavy|long|bald), glasses, cane, elder, item (node drawn in the near hand, hand-local coordinates).
export function Figure({
  x = 0, y = 0, s = 1, scale = 1, face = 1, skin = '#F6D3B3', hair = '#4A3427', top = '#14A89B', bottom = '#2B3A55', shoe = '#3B2F2A',
  pose = 'stand', walk = false, bald = false, outfit = 'tee', hairStyle, glasses = false, cane = false, elder = false, item = null, lean,
}) {
  const uid = `fg${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const P = POSES[pose] || POSES.stand;
  const sit = !!P.sit; const hy = sit ? -50 : -90;
  const style = bald ? 'bald' : hairStyle || 'short';
  const longSleeve = outfit === 'cardigan';
  const tilt = lean ?? (elder ? 3.5 : 0) + (sit ? 1 : 0);

  const arm = (side, [ua, la]) => {
    const sh = [side * 19, hy - 76]; const el = fk(sh[0], sh[1], 31, ua); const wr = fk(el[0], el[1], 28, la);
    const sleeveLower = longSleeve;
    return {
      el, wr, la,
      node: (
        <g className={P.wave && side > 0 ? 'sw-wave' : (walk && !P.wave ? `sw-leg sw-arm ${side > 0 ? 'sw-leg-b' : 'sw-leg-a'}` : undefined)} style={P.wave && side > 0 ? { transformOrigin: `${f1(sh[0])}px ${f1(sh[1])}px`, transformBox: 'view-box' } : undefined}>
          <path d={limb(el, wr, 10.5, 8.5, 0.08)} fill={sleeveLower ? top : skin} stroke={INK} strokeOpacity=".5" strokeWidth="1.1" strokeLinejoin="round" />
          <path d={limb(el, wr, 10.5, 8.5, 0.08)} fill={`url(#${uid})`} />
          {sleeveLower && <path d={limb(fk(el[0], el[1], 22, la), wr, 9.4, 9.4, 0)} fill={darken(top, 0.18)} opacity=".5" />}
          <Hand x={wr[0]} y={wr[1]} a={la} skin={skin} open={P.open || P.wave} />
          <path d={limb(sh, el, 14, 11, 0.12)} fill={top} stroke={INK} strokeOpacity=".5" strokeWidth="1.1" strokeLinejoin="round" />
          <path d={limb(sh, el, 14, 11, 0.12)} fill={`url(#${uid})`} />
          <path d={`M${f1(el[0] - 6)} ${f1(el[1] - 3)} q6 5 12 0`} stroke="#000" strokeOpacity=".16" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
      ),
    };
  };
  const back = arm(-1, P.b); const near = arm(1, P.n);

  const leg = (hx, [ta, sa], dim) => {
    const hp = [hx, hy + 2]; const kn = fk(hp[0], hp[1], 44, ta); const an = fk(kn[0], kn[1], 41, sa);
    const c = dim ? darken(bottom, 0.12) : bottom;
    return (
      <g className={walk ? `sw-leg ${dim ? 'sw-leg-a' : 'sw-leg-b'}` : undefined}>
        <Shoe x={an[0] + 0.5} y={an[1] + 5} shoe={shoe} />
        <path d={limb(kn, an, 15, 11, 0.06)} fill={c} stroke={INK} strokeOpacity=".5" strokeWidth="1.1" strokeLinejoin="round" />
        <path d={limb(hp, kn, 21, 15.5, 0.1)} fill={c} stroke={INK} strokeOpacity=".5" strokeWidth="1.1" strokeLinejoin="round" />
        <path d={limb(hp, kn, 21, 15.5, 0.1)} fill={`url(#${uid})`} /><path d={limb(kn, an, 15, 11, 0.06)} fill={`url(#${uid})`} />
        <path d={`M${f1(kn[0] - 5)} ${f1(kn[1] - 4)} q5 3 10 -1`} stroke="#000" strokeOpacity=".18" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>
    );
  };

  const hand = near.wr;
  return (
    <g transform={`translate(${x} ${y}) scale(${face * s * scale} ${s * scale})`}>
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#fff" stopOpacity=".3" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".24" />
        </linearGradient>
      </defs>
      <ellipse cx="4" cy="2" rx="34" ry="5.5" fill="#000" opacity=".14" />
      {leg(-9, P.legs[1], true)}{leg(9, P.legs[0], false)}
      <g transform={`rotate(${tilt} 0 ${hy})`}>
        {back.node}
        <g transform={`translate(0 ${hy})`}>
          <path d="M-6.5 -92 L-6.5 -74 Q0 -69 6.5 -74 L6.5 -92Z" fill={darken(skin, 0.1)} stroke={INK} strokeOpacity=".4" strokeWidth="1" />
          <path d="M-6.5 -86 Q0 -80 6.5 -86 L6.5 -92 L-6.5 -92Z" fill="#000" opacity=".12" />
        </g>
        <g transform={`translate(0 ${hy}) scale(.86 1)`}><Torso outfit={outfit} top={top} bottom={bottom} skin={skin} id={uid} /></g>
        <g transform={`translate(1 ${hy - 104}) rotate(${elder ? 4 : 0})`}><Head skin={skin} hair={hair} hairStyle={style} glasses={glasses} elder={elder} id={uid} /></g>
        {near.node}
        {item && <g transform={`translate(${f1(hand[0])} ${f1(hand[1])})`}>{item}</g>}
      </g>
      {cane && (
        <g stroke={INK} strokeOpacity=".6" strokeWidth="1">
          <path d={`M${f1(hand[0] + 2)} ${f1(hand[1] + 6)} L${f1(hand[0] + 4)} 0`} stroke="#8A5A2B" strokeWidth="5" strokeLinecap="round" />
          <path d={`M${f1(hand[0] + 2)} ${f1(hand[1] + 6)} L${f1(hand[0] + 3)} ${f1(hand[1] - 2)} Q${f1(hand[0] + 3)} ${f1(hand[1] - 14)} ${f1(hand[0] - 9)} ${f1(hand[1] - 11)}`} stroke="#8A5A2B" strokeWidth="5" strokeLinecap="round" fill="none" />
          <rect x={f1(hand[0] + 0.5)} y="-6" width="7" height="6" rx="2" fill="#2B2B2B" />
        </g>
      )}
    </g>
  );
}
