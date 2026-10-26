// Figure builder: minimal silhouette people (no faces, no animation, flat tones with one soft shade) drawn from joint angles. Origin = feet (sitting: feet on the floor, seat ~50 up). face 1 = right, -1 = left.
// One shared soft-shade gradient per figure, no outlines, no filters. Angles are degrees from "hanging straight down", positive = toward the front.
import { useId } from 'react';

const D = Math.PI / 180;
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
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) rotate(${f1(-a)})`}>
      <path d={open ? 'M-5.5 2 Q-8 11 -2 15 Q4 17 7 10 L10 4 Q9 1 6 3 L4 1Z' : 'M-5 2 Q-6.5 11 -1.5 14 Q4 15 5.5 9 Q6 4 4 1Z'} fill={skin} />
    </g>
  );
}

function Shoe({ x, y, shoe }) {
  return <path transform={`translate(${f1(x)} ${f1(y)})`} d="M-9 -8 L5 -8 Q9 -5 17 -2 Q19 0 17 3 L-10 3 Q-12 -2 -9 -8Z" fill={shoe} />;
}

function Hair({ style, hair, back }) {
  if (style === 'bald') return null;
  if (back) {
    if (style === 'long' || style === 'wavy') return <path d="M-19 -6 Q-27 18 -21 44 Q-8 50 6 44 Q10 22 8 -8Z" fill={darken(hair, 0.12)} />;
    if (style === 'bun') return <circle cx="-11" cy="-30" r="9.5" fill={hair} />;
    return null;
  }
  const cap = 'M-18.5 -2 C-22 -22 -10 -33 3 -32 C16 -32 21 -22 18.5 -10 C14 -19 5 -23 -3 -22 C-9 -21 -14 -14 -14 -2Z';
  if (style === 'curly') {
    return (
      <g fill={hair}>
        {[[-15, -8, 7], [-18, -17, 7.5], [-12, -27, 8], [-2, -31, 8.5], [9, -29, 8], [17, -20, 7.5], [19, -9, 6.5]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}
        <circle cx="-3" cy="-21" r="6" />
      </g>
    );
  }
  return (
    <g fill={hair}>
      <path d={cap} />
      {(style === 'long' || style === 'wavy') && <path d="M-18.5 -2 C-24 10 -20 24 -14 32 L-9 28 C-13 18 -12 6 -14 -2Z" />}
    </g>
  );
}

// Head: one smooth shape with a slightly forward jaw. No face, no ear.
function Head({ skin, hair, hairStyle, id }) {
  const shape = 'M-16.5 -4 C-17 -22 -6 -30 4 -29 C15 -29 20 -20 18.5 -9 C18 -4 15 3 11 8 C6 13 -3 14 -9 10 C-14 6 -16 1 -16.5 -4Z';
  return (
    <g>
      <Hair style={hairStyle} hair={hair} back />
      <path d={shape} fill={skin} />
      <path d={shape} fill={`url(#${id})`} />
      <Hair style={hairStyle} hair={hair} />
    </g>
  );
}

function Torso({ outfit, top, id }) {
  const body = 'M-22 -78 Q0 -86 22 -78 Q30 -72 27.5 -50 Q23.5 -30 25 3 Q0 9 -25 3 Q-23.5 -30 -27.5 -50 Q-30 -72 -22 -78Z';
  const dk = darken(top, 0.22);
  return (
    <g>
      <path d={body} fill={top} />
      {outfit === 'cardigan' && <path d="M-9 -82 Q0 -74 9 -82 L8 3 Q0 6 -8 3Z" fill="#FFF3E0" />}
      {outfit === 'scrubs' && <path d="M-10 -83 L0 -62 L10 -83Z" fill={dk} />}
      <path d={body} fill={`url(#${id})`} />
    </g>
  );
}

// Props: pose, outfit (tee|scrubs|cardigan), hairStyle (short|bun|curly|wavy|long|bald), glasses, cane, elder, item (node drawn in the near hand, hand-local coordinates). walk = fixed stride pose. Nothing animates.
export function Figure({
  x = 0, y = 0, s = 1, scale = 1, face = 1, skin = '#F6D3B3', hair = '#4A3427', top = '#14A89B', bottom = '#2B3A55', shoe = '#3B2F2A',
  pose = 'stand', walk = false, bald = false, outfit = 'tee', hairStyle, glasses = false, cane = false, elder = false, item = null, lean,
}) {
  const uid = `fg${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const P0 = POSES[pose] || POSES.stand;
  const P = walk && !P0.wave && !P0.sit ? { ...P0, n: [-16, -8], b: [18, 24], legs: [[16, 0], [-15, -8]] } : P0;
  const sit = !!P.sit; const hy = sit ? -50 : -90;
  const style = bald ? 'bald' : hairStyle || 'short';
  const sleeve = outfit === 'cardigan' ? top : skin;
  const tilt = lean ?? (elder ? 3.5 : 0) + (sit ? 1 : 0);

  const arm = (side, [ua, la], dim) => {
    const sh = [side * 19, hy - 76]; const el = fk(sh[0], sh[1], 31, ua); const wr = fk(el[0], el[1], 28, la);
    const c = dim ? darken(top, 0.16) : top; const fa = dim ? darken(sleeve, 0.16) : sleeve;
    return {
      wr,
      node: (
        <g>
          <path d={limb(el, wr, 10.5, 8.5, 0.08)} fill={fa} />
          <path d={limb(el, wr, 10.5, 8.5, 0.08)} fill={`url(#${uid})`} />
          <Hand x={wr[0]} y={wr[1]} a={la} skin={dim ? darken(skin, 0.16) : skin} open={P.open || P.wave} />
          <path d={limb(sh, el, 14, 11, 0.12)} fill={c} />
          <path d={limb(sh, el, 14, 11, 0.12)} fill={`url(#${uid})`} />
        </g>
      ),
    };
  };
  const back = arm(-1, P.b, true); const near = arm(1, P.n, false);

  const leg = (hx, [ta, sa], dim) => {
    const hp = [hx, hy + 2]; const kn = fk(hp[0], hp[1], 44, ta); const an = fk(kn[0], kn[1], 41, sa);
    const c = dim ? darken(bottom, 0.16) : bottom;
    return (
      <g>
        <Shoe x={an[0] + 0.5} y={an[1] + 5} shoe={dim ? darken(shoe, 0.16) : shoe} />
        <path d={limb(kn, an, 15, 11, 0.06)} fill={c} />
        <path d={limb(hp, kn, 21, 15.5, 0.1)} fill={c} />
        <path d={limb(hp, kn, 21, 15.5, 0.1)} fill={`url(#${uid})`} /><path d={limb(kn, an, 15, 11, 0.06)} fill={`url(#${uid})`} />
      </g>
    );
  };

  const hand = near.wr;
  return (
    <g transform={`translate(${x} ${y}) scale(${face * s * scale} ${s * scale})`}>
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#fff" stopOpacity=".26" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
      </defs>
      <ellipse cx="4" cy="2" rx="34" ry="5.5" fill="#000" opacity=".14" />
      {leg(-9, P.legs[1], true)}{leg(9, P.legs[0], false)}
      <g transform={`rotate(${tilt} 0 ${hy})`}>
        {back.node}
        <path transform={`translate(0 ${hy})`} d="M-6.5 -92 L-6.5 -74 Q0 -69 6.5 -74 L6.5 -92Z" fill={darken(skin, 0.1)} />
        <g transform={`translate(0 ${hy}) scale(.86 1)`}><Torso outfit={outfit} top={top} id={uid} /></g>
        <g transform={`translate(1 ${hy - 104}) rotate(${elder ? 4 : 0})`}><Head skin={skin} hair={hair} hairStyle={style} id={uid} /></g>
        {near.node}
        {item && <g transform={`translate(${f1(hand[0])} ${f1(hand[1])})`}>{item}</g>}
      </g>
      {cane && (
        <g stroke="#8A5A2B" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d={`M${f1(hand[0] + 2)} ${f1(hand[1] + 6)} L${f1(hand[0] + 4)} 0`} />
          <path d={`M${f1(hand[0] + 2)} ${f1(hand[1] + 6)} L${f1(hand[0] + 3)} ${f1(hand[1] - 2)} Q${f1(hand[0] + 3)} ${f1(hand[1] - 14)} ${f1(hand[0] - 9)} ${f1(hand[1] - 11)}`} />
        </g>
      )}
    </g>
  );
}
