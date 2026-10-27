import { Townhouses, Street } from './gta-street';
// Greater Toronto Area backdrop kit: skyline silhouette (CN Tower, Rogers Centre, bank towers), lake haze, and urban-residential pieces (brick semis, bungalows, hydro poles, maples).
// Same conventions as art.jsx: world units, (x, y) is the bottom centre. Decorative only.
const rnd = (seed) => { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };

// Skyline. `base` is the waterline y; `tint` is the hazy silhouette colour, `lit` the highlight edge. Width w; CN Tower sits at tx (fraction of w).
export function Skyline({ x = 0, y, w = 3000, tint = '#8FA9C0', lit = '#B5C9DB', tx = 0.62, seed = 3, glow = null }) {
  const r = rnd(seed); const cx = w * tx;
  const filler = [];
  for (let px = 0; px < w; px += 38 + r() * 30) {
    const d = Math.abs(px - cx); const near = d < 520;
    const h = 40 + r() * (near ? 190 : 80); const bw = 30 + r() * 34;
    filler.push(<rect key={px} x={px} y={-h} width={bw} height={h + 4} fill={tint} />);
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <g>{filler}</g>
      {/* First Canadian Place: tallest bank tower, plain slab */}
      <rect x={cx - 330} y={-300} width="58" height="304" fill={tint} /><rect x={cx - 330} y={-300} width="6" height="304" fill={lit} />
      {/* Scotia Plaza: stepped, angled top */}
      <path d={`M${cx - 240} 4V-230l14-18h46l14 18V4Z`} fill={tint} />
      {/* TD Centre: low dark boxes with a taller tower */}
      <rect x={cx - 170} y={-200} width="46" height="204" fill={tint} /><rect x={cx - 120} y={-130} width="64" height="134" fill={tint} /><rect x={cx - 220} y={-110} width="40" height="114" fill={tint} />
      {/* Commerce Court / Brookfield Place glassy slab */}
      <path d={`M${cx + 110} 4V-170l36 -14l36 14V4Z`} fill={tint} />
      <rect x={cx + 190} y={-120} width="44" height="124" fill={tint} /><rect x={cx + 240} y={-150} width="30" height="154" fill={tint} />
      {/* Rogers Centre dome, right of the tower */}
      <path d={`M${cx + 280} 4V-12C${cx + 290} -70 ${cx + 440} -70 ${cx + 450} -12V4Z`} fill={tint} /><rect x={cx + 276} y={-14} width="178" height="18" fill={tint} />
      {/* CN Tower: tapering shaft, main pod, sky pod, antenna */}
      <g transform={`translate(${cx} 4) scale(1.2 0.85)`}>
        <path d="M-11 0 L-3.2 -380 L3.2 -380 L11 0Z" fill={tint} />
        <path d="M-3.2 -380 L-1.4 -520 L1.4 -520 L3.2 -380Z" fill={tint} />
        <ellipse cx="0" cy="-352" rx="23" ry="9" fill={tint} /><rect x="-18" y="-364" width="36" height="12" rx="3" fill={tint} /><path d="M-18 -364 L-10 -376 L10 -376 L18 -364Z" fill={tint} />
        <ellipse cx="0" cy="-432" rx="7" ry="4" fill={tint} />
        <rect x="-2" y="-352" width="2" height="8" fill={lit} opacity=".8" />
      </g>
      {glow && Array.from({ length: 70 }, (_, i) => { const px = r() * w; const hh = 20 + r() * 150; return <rect key={`g${i}`} x={px} y={-hh} width="4" height="6" fill={glow} opacity=".85" />; })}
      {/* Islands / lakefront strip */}
      <rect x="-200" y="2" width={w + 400} height="10" fill={tint} />
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
      <ellipse cx="0" cy="-122" rx="52" ry="46" fill={dark} />
      <ellipse cx={-26 + r() * 6} cy="-108" rx="34" ry="30" fill={crown} /><ellipse cx={24 - r() * 6} cy="-112" rx="36" ry="32" fill={crown} /><ellipse cx="0" cy="-146" rx="34" ry="28" fill={crown} />
    </g>
  );
};

// Brick semi-detached (two mirrored units), the GTA workhorse. Footprint ~ 260 x 190 at s=1.
export const Semi = ({ x, y, s = 1, brick = '#B4573E', roof = '#4A4F5A', trim = '#F4EBDD', door = '#1F5BA8' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-130" y="-118" width="260" height="118" fill={brick} />
    <path d="M-142 -118 L-65 -176 L0 -118Z M0 -118 L65 -176 L142 -118Z" fill={roof} />
    <path d="M-65 -176 L0 -118 L65 -176Z" fill={roof} opacity=".7" />
    <rect x="-92" y="-176" width="14" height="40" fill="#8E3F2B" /><rect x="78" y="-176" width="14" height="40" fill="#8E3F2B" />
    {[-1, 1].map((m) => (
      <g key={m} transform={`scale(${m} 1)`}>
        <rect x="26" y="-96" width="34" height="38" fill={trim} /><rect x="30" y="-92" width="26" height="30" fill="#7FA6C4" />
        <rect x="76" y="-96" width="34" height="38" fill={trim} /><rect x="80" y="-92" width="26" height="30" fill="#7FA6C4" />
        <rect x="26" y="-52" width="22" height="52" fill={door} /><rect x="14" y="-8" width="46" height="8" fill="#C9CED6" />
        <rect x="66" y="-44" width="46" height="26" fill={trim} /><rect x="70" y="-40" width="38" height="18" fill="#7FA6C4" />
      </g>
    ))}
    <rect x="-2" y="-118" width="4" height="118" fill="#7A3626" opacity=".6" />
    <rect x="-52" y="0" width="22" height="24" fill="#C9C5BB" /><rect x="30" y="0" width="22" height="24" fill="#C9C5BB" />
    <rect x="-52" y="-12" width="0" height="0" />
  </g>
);

// Single-storey bungalow with attached garage and a hip roof.
export const Bungalow = ({ x, y, s = 1, brick = '#C9A27A', roof = '#59606B', door = '#B23A3A' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-130" y="-74" width="260" height="74" fill={brick} />
    <path d="M-146 -74 L-100 -118 H100 L146 -74Z" fill={roof} />
    <rect x="30" y="-66" width="90" height="66" fill="#E8E1D4" /><rect x="38" y="-58" width="74" height="58" fill="#D8D3C8" />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={40} y={-52 + i * 13} width="70" height="2" fill="#C2BCB0" />)}
    <rect x="-96" y="-60" width="50" height="34" fill="#F4EBDD" /><rect x="-91" y="-55" width="40" height="24" fill="#7FA6C4" />
    <rect x="-24" y="-52" width="22" height="52" fill={door} />
    <path d="M30 0 H120 L128 24 H22Z" fill="#B8B4AA" /><rect x="-24" y="0" width="22" height="24" fill="#C9C5BB" />
    <rect x="-120" y="-30" width="34" height="30" rx="14" fill="#5B8A4A" opacity=".9" />
  </g>
);

// Hydro pole with crossarm; wires run to the next pole at (x + span).
export const HydroPole = ({ x, y, h = 300, span = 520, color = '#5A4632', wire = '#3A3F48' }) => (
  <g>
    <rect x={x - 5} y={y - h} width="10" height={h} fill={color} /><rect x={x - 46} y={y - h + 20} width="92" height="7" fill={color} /><rect x={x - 38} y={y - h + 60} width="76" height="6" fill={color} />
    {[-40, -14, 14, 40].map((o) => <path key={o} d={`M${x + o} ${y - h + 20} Q${x + o + span / 2} ${y - h + 70} ${x + o + span} ${y - h + 20}`} stroke={wire} strokeWidth="2" fill="none" />)}
    {[-40, -14, 14, 40].map((o) => <rect key={`i${o}`} x={x + o - 2} y={y - h + 14} width="4" height="8" fill="#D8D3C8" />)}
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
      {lit && <g fill={lit}>{items.map((_, n) => (n % 2 ? null : <rect key={`w${n}`} x={x0 + n * 180 * s + 20} y={y - 70 * s} width={14 * s} height={16 * s} />))}</g>}
      {dim > 0 && <rect x={x0 - 400} y={top} width={x1 - x0 + 800} height={bot - top} fill="#0B2038" opacity={dim} />}
      {haze > 0 && <rect x={x0 - 400} y={top} width={x1 - x0 + 800} height={bot - top} fill={hazeColor} opacity={haze} />}
    </g>
  );
}
