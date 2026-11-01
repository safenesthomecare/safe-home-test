import { Townhouses, Street } from './gta-street';
// Greater Toronto Area backdrop kit: skyline silhouette (CN Tower, Rogers Centre, bank towers), lake haze, and urban-residential pieces (brick semis, bungalows, hydro poles, maples).
// Same conventions as art.jsx: world units, (x, y) is the bottom centre. Decorative only.
const rnd = (seed) => { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };

// Path helpers. Every shape is wound counter-clockwise, so shapes joined in one path render as their union (one path per part).
const f = (n) => +n.toFixed(2);
const rP = (x, y, w, h, r = 0) => `M${f(x)} ${f(y + r)}V${f(y + h - r)}${r ? `Q${f(x)} ${f(y + h)} ${f(x + r)} ${f(y + h)}` : ''}H${f(x + w - r)}${r ? `Q${f(x + w)} ${f(y + h)} ${f(x + w)} ${f(y + h - r)}` : ''}V${f(y + r)}${r ? `Q${f(x + w)} ${f(y)} ${f(x + w - r)} ${f(y)}` : ''}H${f(x + r)}${r ? `Q${f(x)} ${f(y)} ${f(x)} ${f(y + r)}` : ''}Z`;
const oP = (cx, cy, rx, ry) => `M${f(cx - rx)} ${f(cy)}a${f(rx)} ${f(ry)} 0 1 0 ${f(2 * rx)} 0a${f(rx)} ${f(ry)} 0 1 0 ${f(-2 * rx)} 0Z`;
// Polygon from [x, y] points; reversed if needed so it winds like rP.
const pP = (...p) => { let a = 0; p.forEach((q, i) => { const n = p[(i + 1) % p.length]; a += q[0] * n[1] - n[0] * q[1]; }); const pts = a > 0 ? [...p].reverse() : p; return 'M' + pts.map((q) => `${f(q[0])} ${f(q[1])}`).join('L') + 'Z'; };

// Skyline. `base` is the waterline y; `tint` is the hazy silhouette colour, `lit` the highlight edge. Width w; CN Tower sits at tx (fraction of w). One path for all tinted buildings + lakefront, one for the tower.
export function Skyline({ x = 0, y, w = 3000, tint = '#8FA9C0', lit = '#B5C9DB', tx = 0.62, seed = 3, glow = null }) {
  const r = rnd(seed); const cx = w * tx;
  let fill = '';
  for (let px = 0; px < w; px += 38 + r() * 30) {
    const d = Math.abs(px - cx); const near = d < 520;
    const h = 40 + r() * (near ? 190 : 80); const bw = 30 + r() * 34;
    fill += rP(px, -h, bw, h + 4);
  }
  // First Canadian Place, Scotia Plaza (stepped top), TD Centre boxes, Commerce Court slab, Brookfield boxes, Rogers Centre dome, lakefront strip
  const towers = rP(cx - 330, -300, 58, 304) + pP([cx - 240, 4], [cx - 240, -230], [cx - 226, -248], [cx - 180, -248], [cx - 166, -230], [cx - 166, 4])
    + rP(cx - 170, -200, 46, 204) + rP(cx - 120, -130, 64, 134) + rP(cx - 220, -110, 40, 114)
    + pP([cx + 110, 4], [cx + 110, -170], [cx + 146, -184], [cx + 182, -170], [cx + 182, 4]) + rP(cx + 190, -120, 44, 124) + rP(cx + 240, -150, 30, 154)
    + `M${cx + 450} 4V-12C${cx + 440} -70 ${cx + 290} -70 ${cx + 280} -12V4Z` + rP(cx + 276, -14, 178, 18) + rP(-200, 2, w + 400, 10);
  const tower = pP([-11, 0], [-3.2, -380], [3.2, -380], [11, 0]) + pP([-3.2, -380], [-1.4, -520], [1.4, -520], [3.2, -380]) + oP(0, -352, 23, 9) + rP(-18, -364, 36, 12, 3) + pP([-18, -364], [-10, -376], [10, -376], [18, -364]) + oP(0, -432, 7, 4);
  let gl = ''; if (glow) for (let i = 0; i < 70; i++) { const px = r() * w; const hh = 20 + r() * 150; gl += rP(px, -hh, 4, 6); }
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={fill + towers} fill={tint} /><path d={rP(cx - 330, -300, 6, 304)} fill={lit} />
      {/* CN Tower: tapering shaft, main pod, sky pod, antenna */}
      <g transform={`translate(${cx} 4) scale(1.2 0.85)`}><path d={tower} fill={tint} /><rect x="-2" y="-352" width="2" height="8" fill={lit} opacity=".8" /></g>
      {glow && <path d={gl} fill={glow} opacity=".85" />}
    </g>
  );
}

// Lake Ontario haze: soft band between sky and skyline.
export const LakeHaze = ({ x = -1200, y, w = 5200, h = 90, color = '#CFE0EE' }) => (
  <g>{[0.18, 0.36, 0.54, 0.72].map((o, i) => <rect key={i} x={x} y={y + (i * h) / 4} width={w} height={h - (i * h) / 4} fill={color} opacity={o} />)}<rect x={x} y={y + h - 12} width={w} height="12" fill="#9DB9D0" opacity=".5" /></g>
);

export const Maple = ({ x, y, s = 1, crown = '#4F9D3A', dark = '#2E7D32', seed = 1 }) => {
  const r = rnd(seed);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-5 0L-4 -60L-2 -90H2L4 -60L5 0Z" fill="#5A3213" />
      <path d={oP(0, -122, 52, 46)} fill={dark} />
      <path d={oP(-26 + r() * 6, -108, 34, 30) + oP(24 - r() * 6, -112, 36, 32) + oP(0, -146, 34, 28)} fill={crown} />
    </g>
  );
};

// Brick semi-detached (two mirrored units), the GTA workhorse. Footprint ~ 260 x 190 at s=1. One path per part; both mirrored units are drawn into the same path.
const both = (x, y, w, h, r = 0) => rP(x, y, w, h, r) + rP(-x - w, y, w, h, r);
export const Semi = ({ x, y, s = 1, brick = '#B4573E', roof = '#4A4F5A', trim = '#F4EBDD', door = '#1F5BA8' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-130" y="-118" width="260" height="118" fill={brick} />
    <path d="M-142 -118 L-65 -176 L0 -118Z M0 -118 L65 -176 L142 -118Z" fill={roof} />
    <path d="M-65 -176 L0 -118 L65 -176Z" fill={roof} opacity=".7" />
    <path d={rP(-92, -176, 14, 40) + rP(78, -176, 14, 40)} fill="#8E3F2B" />
    <path d={both(26, -96, 34, 38) + both(76, -96, 34, 38) + both(66, -44, 46, 26)} fill={trim} />
    <path d={both(30, -92, 26, 30) + both(80, -92, 26, 30) + both(70, -40, 38, 18)} fill="#7FA6C4" />
    <path d={both(26, -52, 22, 52)} fill={door} /><path d={both(14, -8, 46, 8)} fill="#C9CED6" />
    <rect x="-2" y="-118" width="4" height="118" fill="#7A3626" opacity=".6" />
    <path d={rP(-52, 0, 22, 24) + rP(30, 0, 22, 24)} fill="#C9C5BB" />
  </g>
);

// Single-storey bungalow with attached garage and a hip roof.
export const Bungalow = ({ x, y, s = 1, brick = '#C9A27A', roof = '#59606B', door = '#B23A3A' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-130" y="-74" width="260" height="74" fill={brick} />
    <path d="M-146 -74 L-100 -118 H100 L146 -74Z" fill={roof} />
    <rect x="30" y="-66" width="90" height="66" fill="#E8E1D4" /><rect x="38" y="-58" width="74" height="58" fill="#D8D3C8" />
    <path d={[0, 1, 2, 3].map((i) => rP(40, -52 + i * 13, 70, 2)).join('')} fill="#C2BCB0" />
    <rect x="-96" y="-60" width="50" height="34" fill="#F4EBDD" /><rect x="-91" y="-55" width="40" height="24" fill="#7FA6C4" />
    <rect x="-24" y="-52" width="22" height="52" fill={door} />
    <path d="M30 0 H120 L128 24 H22Z" fill="#B8B4AA" /><rect x="-24" y="0" width="22" height="24" fill="#C9C5BB" />
    <rect x="-120" y="-30" width="34" height="30" rx="14" fill="#5B8A4A" opacity=".9" />
  </g>
);

// Hydro pole with crossarm; wires run to the next pole at (x + span). Wood = one path, wires = one path, insulators = one path.
export const HydroPole = ({ x, y, h = 300, span = 520, color = '#5A4632', wire = '#3A3F48' }) => (
  <g>
    <path d={rP(x - 5, y - h, 10, h) + rP(x - 46, y - h + 20, 92, 7) + rP(x - 38, y - h + 60, 76, 6)} fill={color} />
    <path d={[-40, -14, 14, 40].map((o) => `M${x + o} ${y - h + 20} Q${x + o + span / 2} ${y - h + 70} ${x + o + span} ${y - h + 20}`).join('')} stroke={wire} strokeWidth="2" fill="none" />
    <path d={[-40, -14, 14, 40].map((o) => rP(x + o - 2, y - h + 14, 4, 8)).join('')} fill="#D8D3C8" />
  </g>
);

// A street of GTA houses between x0 and x1 (base y, scale s): semis, bungalows, infill townhouses, each with front walks/driveways, then the street frontage.
const SimpleHouse = ({ x, y, s, w, brick, roof = '#4A4F5A' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x={-w / 2} y="-110" width={w} height="110" fill={brick} /><path d={`M${-w / 2 - 10} -110 L${-w / 4} -170 H${w / 4} L${w / 2 + 10} -110Z`} fill={roof} /><rect x={-w / 2 + 20} y="-84" width={w - 40} height="22" fill="#F4EBDD" opacity=".85" /></g>
);

export function SuburbRow({ x0 = 0, x1 = 3000, y, s = 1, seed = 1, haze = 0, hazeColor = '#DCE8F2', lawn = '#8CBF7C', dim = 0, lit = null, street = true, simple = false }) {
  const r = rnd(seed); const items = []; const bricks = ['#B4573E', '#A24A35', '#C06A4A', '#9A5B3C']; const sidings = ['#C9A27A', '#D8C9AA', '#B9B3A2'];
  let i = 0; let px = x0;
  while (px < x1) {
    const k = r(); const w = k < 0.4 ? 290 : k < 0.7 ? 300 : 360; const cx = px + (w / 2) * s;
    if (simple) items.push(<SimpleHouse key={`h${i}`} x={cx} y={y} s={s} w={w - 40} brick={bricks[Math.floor(r() * 4)]} />);
    else if (k < 0.4) items.push(<Semi key={`h${i}`} x={cx} y={y} s={s} brick={bricks[Math.floor(r() * 4)]} door={r() < 0.5 ? '#1F5BA8' : '#2E6E4F'} />);
    else if (k < 0.7) items.push(<Bungalow key={`h${i}`} x={cx} y={y} s={s} brick={sidings[Math.floor(r() * 3)]} />);
    else items.push(<Townhouses key={`h${i}`} x={cx} y={y} s={s} n={5} seed={i + seed} />);
    if (r() < 0.45 && !simple) items.push(<Maple key={`m${i}`} x={px + w * s + 18 * s} y={y + 8 * s} s={s * (0.7 + r() * 0.4)} seed={i + seed} crown={r() < 0.2 ? '#D9772B' : '#4F9D3A'} />);
    px += (w + 36 + r() * 40) * s; i++;
  }
  const top = y - 260 * s; const bot = y + (street ? 116 : 0) * s;
  return (
    <g>
      <rect x={x0 - 400} y={y - 2} width={x1 - x0 + 800} height={400} fill={lawn} />
      <g>{items}</g>
      {street && <Street x0={x0} x1={x1} y={y} s={s} seed={seed} />}
      {lit && <path d={items.map((_, n) => (n % 2 ? '' : rP(x0 + n * 180 * s + 20, y - 70 * s, 14 * s, 16 * s))).join('')} fill={lit} />}
      {dim > 0 && <rect x={x0 - 400} y={top} width={x1 - x0 + 800} height={bot - top} fill="#0B2038" opacity={dim} />}
      {haze > 0 && <rect x={x0 - 400} y={top} width={x1 - x0 + 800} height={bot - top} fill={hazeColor} opacity={haze} />}
    </g>
  );
}
