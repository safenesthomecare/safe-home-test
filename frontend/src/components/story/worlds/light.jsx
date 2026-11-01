// Lighting kit (SHOTS.md). The first half is the original flat kit (solid shapes). The ADVANCED KIT at the bottom adds soft light, texture and
// depth adapted from the six reference paintings. Budget for the advanced kit: gradients/patterns count toward the 60-gradient cap, no blur or SVG filters.
// Compose a frame as: light key shape + mid-tone set + dark foreground (a separate solid shape, 15-25% brightness).

// Grid for a frame of w x h: vertical thirds, eye line, golden point, look room.
export const grid = (w, h) => ({
  t1: w / 3, t2: (2 * w) / 3, eye: h * 0.33, lowerThird: h * 0.67,
  golden: [w * 0.618, h * 0.382], look: w / 3,
  fg: { bottom: h * 0.85, left: w / 3, right: (2 * w) / 3 },
});

// Three tones per time of day: key (light shape), mid (set), dark (foreground), plus accent (lit windows, lamps).
export const TONES = {
  morning: { key: '#E6F1FA', mid: '#C4E2B4', dark: '#1E4A2A', accent: '#FFC83D' },
  midmorning: { key: '#FFF1C9', mid: '#E9D3A8', dark: '#2E4A2A', accent: '#FFC83D' },
  room: { key: '#FFF4D6', mid: '#E9D9BF', dark: '#3A2A22', accent: '#FFC83D' },
  tea: { key: '#FFF3D6', mid: '#E8D2B0', dark: '#3B2A20', accent: '#FFC83D' },
  afternoon: { key: '#FFE2A8', mid: '#EDD8B4', dark: '#33281F', accent: '#FFC83D' },
  dusk: { key: '#FFC83D', mid: '#3A5F8A', dark: '#00263F', accent: '#FFC83D' },
};

// Hard-edged light shaft (parallelogram). skew = horizontal shift of the far edge; o = opacity of the solid fill.
export const LightShaft = ({ x, y, w, h, skew = 0, color = '#FFF3D6', o = 0.55 }) => (
  <path d={`M${x} ${y} L${x + w} ${y} L${x + w + skew} ${y + h} L${x + skew} ${y + h}Z`} fill={color} opacity={o} />
);

// Flat window glow: lit pane with a dark cross frame. Use at dusk for house windows.
export const WindowGlow = ({ x, y, w = 70, h = 90, color = '#FFC83D', frame = '#00263F' }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={color} />
    <rect x={x + w / 2 - 2} y={y} width="4" height={h} fill={frame} opacity=".55" />
    <rect x={x} y={y + h / 2 - 2} width={w} height="4" fill={frame} opacity=".55" />
  </g>
);

// Dark silhouette helpers. (x, y) = base centre on the ground line.
export const SilBush = ({ x, y, w = 260, h = 110, color = '#1E4A2A' }) => (
  <g fill={color}>
    <ellipse cx={x - w * 0.25} cy={y - h * 0.35} rx={w * 0.3} ry={h * 0.4} />
    <ellipse cx={x + w * 0.2} cy={y - h * 0.4} rx={w * 0.32} ry={h * 0.5} />
    <ellipse cx={x} cy={y - h * 0.25} rx={w * 0.5} ry={h * 0.3} />
    <rect x={x - w / 2} y={y - 4} width={w} height="4" />
  </g>
);
export const SilPlant = ({ x, y, h = 220, color = '#1E4A2A' }) => (
  <g fill={color}>
    <rect x={x - 26} y={y - h * 0.22} width="52" height={h * 0.22} />
    {[-52, -26, 0, 26, 52].map((dx, i) => <path key={i} d={`M${x} ${y - h * 0.22} Q${x + dx * 1.6} ${y - h * (0.55 + (i % 2) * 0.2)} ${x + dx} ${y - h * (0.9 - Math.abs(dx) / 220)} Q${x + dx * 0.4} ${y - h * 0.5} ${x} ${y - h * 0.22}Z`} />)}
  </g>
);
export const SilChair = ({ x, y, w = 150, h = 200, color = '#3A2A22', face = 1 }) => (
  <g fill={color} transform={`translate(${x} ${y}) scale(${face} 1)`}>
    <rect x={-w / 2} y={-h * 0.5} width={w} height={h * 0.12} />
    <rect x={-w / 2} y={-h} width={w * 0.16} height={h * 0.62} />
    <rect x={-w / 2 + 6} y={-h * 0.38} width="12" height={h * 0.38} /><rect x={w / 2 - 18} y={-h * 0.38} width="12" height={h * 0.38} />
  </g>
);
export const SilLamp = ({ x, y, h = 260, color = '#3A2A22' }) => (
  <g fill={color}>
    <rect x={x - 3} y={y - h * 0.8} width="6" height={h * 0.8} />
    <ellipse cx={x} cy={y - 4} rx="34" ry="8" />
    <path d={`M${x - 36} ${y - h * 0.62} L${x - 22} ${y - h} L${x + 22} ${y - h} L${x + 36} ${y - h * 0.62}Z`} />
  </g>
);

// Dark foreground frame: a solid shape pinned to the outer third or the bottom edge of a w x h frame.
// where: 'left' | 'right' | 'bottom' | 'bl' | 'br'. amount 0-1 = share of the frame (0.25-0.35 total negative space; bottom band 0.12-0.18).
export function DarkFrame({ w, h, where = 'bottom', amount = 0.15, color = '#1E4A2A', top = 0 }) {
  const bw = w * amount; const bh = h * amount;
  const wob = (n) => Math.round(n); // hard, fixed edge; no randomness
  if (where === 'bottom') return <path d={`M0 ${h - bh} L${w * 0.35} ${h - bh * 0.92} L${w * 0.7} ${h - bh * 1.05} L${w} ${h - bh} L${w} ${h} L0 ${h}Z`} fill={color} />;
  if (where === 'left') return <path d={`M0 ${top} L${wob(bw)} ${top} Q${wob(bw * 1.25)} ${h * 0.5} ${wob(bw * 0.7)} ${h} L0 ${h}Z`} fill={color} />;
  if (where === 'right') return <path d={`M${w} ${top} L${w - wob(bw)} ${top} Q${w - wob(bw * 1.25)} ${h * 0.5} ${w - wob(bw * 0.7)} ${h} L${w} ${h}Z`} fill={color} />;
  const sx = where === 'bl' ? 1 : -1; const x0 = where === 'bl' ? 0 : w;
  return <path d={`M${x0} ${h - bh * 1.6} Q${x0 + sx * bw * 0.9} ${h - bh * 1.3} ${x0 + sx * bw * 1.4} ${h - bh * 0.5} L${x0 + sx * bw * 1.6} ${h} L${x0} ${h}Z`} fill={color} />;
}

/* =====================================================================================================================
   ADVANCED KIT (Phase 1). Soft light, texture and depth adapted from the six reference paintings.
   Rules: gradients and patterns only (no blur / SVG filters); every id is unique per use; all shapes are deterministic.
   CHARACTERS STAY FACELESS: PSW, patient and relative never get faces, whatever the reference painting shows (FACELESS flag below).
   ===================================================================================================================== */

export const FACELESS = true; // read by the figure builder in Phase 2+; reference faces are never copied.

let aid = 0;
const uid = (p) => `${p}${aid++}`;
const rng = (seed) => { let s = (seed >>> 0) || 1; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; };

// Palettes tuned by eye against each reference painting (page id -> colours). Used by the Phase 2-3 scene rebuilds.
export const REF = {
  home: { skyTop: '#C9D6DE', skyBot: '#E3E8E6', cloud: '#F4F6F5', brick: '#A8432F', brickD: '#7E2F22', trim: '#F2EAD8', door: '#1F2F57', roof: '#6E5646', lawn: '#4E8A35', lawnL: '#7FB04E', leaf: '#3E6B2A', leafD: '#1F3F1C', haze: '#AEB8BE', sun: '#FFF1C9' },
  contact: { skyTop: '#2B3040', skyMid: '#3E4B62', skyBot: '#E6A66C', glow: '#FFC66B', brick: '#7A2E26', brickD: '#4A1D1A', trim: '#E7DFCF', door: '#6B4A2B', roof: '#4A3A34', lawn: '#2F5A2E', lawnD: '#1B3A21', leaf: '#1E3A2A', haze: '#6B7A96', lamp: '#FFD27A' },
  about: { wall: '#E9D8BE', stripe: '#DCC7AE', mark: '#C9B397', floor: '#B8864F', floorD: '#8F6438', rug: '#2F9A94', rugD: '#237873', sofa: '#7B4FB0', sofaD: '#5B3A8A', curtain: '#8FB4D8', lamp: '#FFE3A0', shaft: '#FFF6DC' },
  services: { wall: '#CFC2DE', stripe: '#BDAED0', mark: '#A998C0', floor: '#C9A878', floorD: '#A4824F', rug: '#3E6FA8', rugD: '#2D5483', counter: '#EFE8E2', shaft: '#FFF6E6', kettle: '#B8742A' },
  faq: { wall: '#4A4568', wallD: '#2D2A44', wood: '#8A5A33', woodD: '#5C3A20', floor: '#9A6A3E', rug: '#C9758F', rugD: '#9F5870', moon: '#FFF0B8', curtain: '#9C8FD6', lamp: '#FFC65A', night: '#1B2340' },
  testimonials: { wall: '#D9C6AB', plaster: '#C5B39B', crack: '#A79078', floor: '#C79A62', floorD: '#9C7440', rug: '#2F9A94', sofa: '#8A55C4', sofaD: '#64399A', shaft: '#FFE9B8' },
};

// Soft pool of light (lamp glow, window spill, sun patch). Radial: full colour at the centre, transparent at the edge.
export function GlowPool({ x, y, r = 160, ry, color = '#FFE3A0', o = 0.6, id }) {
  const k = id || uid('gp');
  return (
    <g>
      <defs><radialGradient id={k}><stop offset="0" stopColor={color} stopOpacity={o} /><stop offset=".45" stopColor={color} stopOpacity={o * 0.45} /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient></defs>
      <ellipse cx={x} cy={y} rx={r} ry={ry || r} fill={`url(#${k})`} />
    </g>
  );
}

// Contact shadow under a person, chair or prop so it sits on the floor instead of floating.
export function ContactShadow({ x, y, rx = 70, ry = 12, o = 0.38, color = '#1A1020', id }) {
  const k = id || uid('cs');
  return (
    <g>
      <defs><radialGradient id={k}><stop offset="0" stopColor={color} stopOpacity={o} /><stop offset=".7" stopColor={color} stopOpacity={o * 0.4} /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient></defs>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={`url(#${k})`} />
    </g>
  );
}

// Soft sunbeam / moonbeam: fades along its length, with two brighter inner rays. Same footprint as LightShaft.
export function SoftBeam({ x, y, w, h, skew = 0, color = '#FFF3D6', o = 0.6, rays = true, id }) {
  const k = id || uid('sb');
  const P = (a, b) => `M${x + w * a} ${y} L${x + w * b} ${y} L${x + w * b + skew} ${y + h} L${x + w * a + skew} ${y + h}Z`;
  return (
    <g>
      <defs><linearGradient id={k} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity={o} /><stop offset=".6" stopColor={color} stopOpacity={o * 0.45} /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={P(0, 1)} fill={`url(#${k})`} />
      {rays && <path d={P(0.18, 0.3)} fill={`url(#${k})`} opacity=".7" />}
      {rays && <path d={P(0.56, 0.7)} fill={`url(#${k})`} opacity=".5" />}
    </g>
  );
}

// Floating dust motes inside a beam (deterministic).
export function DustMotes({ x, y, w, h, n = 22, color = '#FFFFFF', o = 0.55, seed = 3 }) {
  const r = rng(seed);
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => <circle key={i} cx={x + r() * w} cy={y + r() * h} r={1 + r() * 2.2} opacity={(0.25 + r() * 0.75) * o} />)}
    </g>
  );
}

// Striped wallpaper with tiny plus / star marks and a ceiling shade (About, Services, FAQ references).
export function WallPaper({ x = 0, y = 0, w, h, base = '#E9D8BE', stripe = '#DCC7AE', mark = '#C9B397', motif = 'plus', shade = 0.18, id }) {
  const k = id || uid('wp');
  const m = motif === 'star'
    ? <g fill={mark} opacity=".6"><path d="M30 20 l2.5 7.5 7.5 2.5 -7.5 2.5 -2.5 7.5 -2.5 -7.5 -7.5 -2.5 7.5 -2.5z" /><path d="M90 80 l2.5 7.5 7.5 2.5 -7.5 2.5 -2.5 7.5 -2.5 -7.5 -7.5 -2.5 7.5 -2.5z" /></g>
    : motif === 'plus' ? <g stroke={mark} strokeWidth="2.4" opacity=".6"><path d="M30 20v14M23 27h14" /><path d="M90 80v14M83 87h14" /></g> : null;
  return (
    <g>
      <defs>
        <pattern id={k} width="120" height="120" patternUnits="userSpaceOnUse"><rect width="120" height="120" fill={base} /><rect width="60" height="120" fill={stripe} opacity=".55" />{m}</pattern>
        <linearGradient id={`${k}s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A1020" stopOpacity={shade} /><stop offset=".35" stopColor="#1A1020" stopOpacity="0" /><stop offset="1" stopColor="#1A1020" stopOpacity={shade * 0.35} /></linearGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k})`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k}s)`} />
    </g>
  );
}

// Mottled plaster wall with speckle and faint hairline cracks (Testimonials reference).
export function Plaster({ x = 0, y = 0, w, h, base = '#D9C6AB', tone = '#C5B39B', crack = '#A79078', shade = 0.14, id }) {
  const k = id || uid('pl');
  const r = rng(11);
  const dots = Array.from({ length: 46 }, (_, i) => <circle key={i} cx={r() * 240} cy={r() * 240} r={1 + r() * 2.4} fill={tone} opacity={0.25 + r() * 0.4} />);
  return (
    <g>
      <defs>
        <pattern id={k} width="240" height="240" patternUnits="userSpaceOnUse">
          <rect width="240" height="240" fill={base} />{dots}
          <path d="M20 40 q30 -30 60 -6 t58 -14" fill="none" stroke={crack} strokeWidth="1.6" opacity=".35" />
          <path d="M150 150 q20 30 52 14 t30 22" fill="none" stroke={crack} strokeWidth="1.4" opacity=".3" />
          <path d="M60 190 q22 -20 46 -4" fill="none" stroke={crack} strokeWidth="1.2" opacity=".28" />
        </pattern>
        <linearGradient id={`${k}s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3A2A22" stopOpacity={shade} /><stop offset=".4" stopColor="#3A2A22" stopOpacity="0" /><stop offset="1" stopColor="#3A2A22" stopOpacity={shade * 0.5} /></linearGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k})`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k}s)`} />
    </g>
  );
}

// Hardwood floor: staggered planks, tone variation, grain, a darker wall edge and a lit sheen.
export function WoodFloor({ x = 0, y, w, h, base = '#B8864F', dark = '#8F6438', plank = 64, sheen = '#FFF3D6', sheenO = 0.22, id }) {
  const k = id || uid('wf');
  const tw = 420; const th = plank * 4;
  const joints = [0.0, 0.37, 0.71, 0.18]; const tint = [['#fff', 0.05], ['#000', 0.07], ['#fff', 0.02], ['#000', 0.03], ['#fff', 0.07], ['#000', 0.05], ['#fff', 0.03], ['#000', 0.08]];
  const rows = [];
  for (let i = 0; i < 4; i++) {
    const j = joints[i] * tw; const ry = i * plank;
    const parts = [[0, j], [j, tw]];
    parts.forEach(([a, b], n) => {
      const t = tint[(i * 2 + n) % tint.length];
      rows.push(<g key={`${i}${n}`}><rect x={a} y={ry} width={b - a} height={plank} fill={t[0]} opacity={t[1]} /><path d={`M${a + 14} ${ry + plank * 0.35} q60 -6 110 2 t90 -2`} stroke={dark} strokeWidth="1.2" fill="none" opacity=".18" /></g>);
    });
    rows.push(<rect key={`s${i}`} x="0" y={ry + plank - 1.5} width={tw} height="2.2" fill="#1A1020" opacity=".28" />);
    rows.push(<rect key={`j${i}`} x={j - 1} y={ry} width="2" height={plank} fill="#1A1020" opacity=".24" />);
  }
  return (
    <g>
      <defs>
        <pattern id={k} width={tw} height={th} patternUnits="userSpaceOnUse"><rect width={tw} height={th} fill={base} />{rows}</pattern>
        <linearGradient id={`${k}d`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A1020" stopOpacity=".35" /><stop offset=".18" stopColor="#1A1020" stopOpacity=".05" /><stop offset="1" stopColor="#1A1020" stopOpacity=".22" /></linearGradient>
        <radialGradient id={`${k}l`}><stop offset="0" stopColor={sheen} stopOpacity={sheenO} /><stop offset="1" stopColor={sheen} stopOpacity="0" /></radialGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k})`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k}d)`} />
      <ellipse cx={x + w * 0.5} cy={y + h * 0.35} rx={w * 0.42} ry={h * 0.5} fill={`url(#${k}l)`} />
    </g>
  );
}

// Oval rug with stitched border, inner oval and a soft shadow rim (all six references use one).
export function StitchedRug({ cx, cy, rx = 420, ry = 46, color = '#2F9A94', inner = '#3FB1AA', stitch = '#F4EBD8', id }) {
  const k = id || uid('sr');
  return (
    <g>
      <defs><radialGradient id={k}><stop offset="0" stopColor={inner} stopOpacity=".9" /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient></defs>
      <ellipse cx={cx + 4} cy={cy + ry * 0.18} rx={rx * 1.02} ry={ry * 1.06} fill="#1A1020" opacity=".22" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} />
      <ellipse cx={cx} cy={cy} rx={rx * 0.62} ry={ry * 0.56} fill={`url(#${k})`} />
      <ellipse cx={cx} cy={cy} rx={rx * 0.93} ry={ry * 0.86} fill="none" stroke={stitch} strokeWidth="2.4" strokeDasharray="12 9" opacity=".75" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.97} ry={ry * 0.93} fill="none" stroke="#1A1020" strokeWidth="1.6" strokeDasharray="2 5" opacity=".3" />
    </g>
  );
}

// Dark edge vignette (+ optional warm centre): the cinematic grade over a finished scene.
export function Vignette({ x = 0, y = 0, w, h, o = 0.45, color = '#0A0614', warm, warmO = 0.18, id }) {
  const k = id || uid('vg');
  return (
    <g pointerEvents="none">
      <defs>
        <radialGradient id={k} cx=".5" cy=".5" r=".75"><stop offset=".5" stopColor={color} stopOpacity="0" /><stop offset="1" stopColor={color} stopOpacity={o} /></radialGradient>
        {warm && <radialGradient id={`${k}w`} cx=".5" cy=".5" r=".6"><stop offset="0" stopColor={warm} stopOpacity={warmO} /><stop offset="1" stopColor={warm} stopOpacity="0" /></radialGradient>}
      </defs>
      {warm && <rect x={x} y={y} width={w} height={h} fill={`url(#${k}w)`} />}
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k})`} />
    </g>
  );
}

// Moon with halo and soft craters (FAQ night window).
export function MoonGlow({ x, y, r = 40, color = '#FFF0B8', halo = '#FFF0B8' }) {
  const k = uid('mg');
  return (
    <g>
      <defs><radialGradient id={k}><stop offset="0" stopColor={halo} stopOpacity=".55" /><stop offset=".4" stopColor={halo} stopOpacity=".2" /><stop offset="1" stopColor={halo} stopOpacity="0" /></radialGradient></defs>
      <circle cx={x} cy={y} r={r * 3.4} fill={`url(#${k})`} />
      <circle cx={x} cy={y} r={r} fill={color} />
      <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.22} fill="#E3CF8A" opacity=".55" />
      <circle cx={x + r * 0.35} cy={y + r * 0.3} r={r * 0.16} fill="#E3CF8A" opacity=".5" />
    </g>
  );
}

// Multi-stop sky with an optional horizon glow and stars. stops = [[offset 0-1, colour], ...]. Overscans like Sky.
export function GradientSky({ w, h, stops, glow, glowAt = [0.62, 0.9], glowR = 0.55, stars = 0, id }) {
  const k = id || uid('gs');
  const r = rng(5);
  return (
    <g>
      <defs>
        <linearGradient id={k} x1="0" y1="0" x2="0" y2="1">{stops.map(([o, c], i) => <stop key={i} offset={o} stopColor={c} />)}</linearGradient>
        {glow && <radialGradient id={`${k}g`}><stop offset="0" stopColor={glow} stopOpacity=".85" /><stop offset=".5" stopColor={glow} stopOpacity=".3" /><stop offset="1" stopColor={glow} stopOpacity="0" /></radialGradient>}
      </defs>
      <rect x="-1500" y="-1500" width={w + 3000} height={h + 3000} fill={`url(#${k})`} />
      {glow && <ellipse cx={w * glowAt[0]} cy={h * glowAt[1]} rx={w * glowR} ry={h * glowR * 0.55} fill={`url(#${k}g)`} />}
      {stars > 0 && Array.from({ length: stars }, (_, i) => <circle key={i} cx={r() * w} cy={r() * h * 0.5} r={0.8 + r() * 1.4} fill="#fff" opacity={0.3 + r() * 0.6} />)}
    </g>
  );
}

// Volumetric cloud: lit top, shaded belly. Same footprint as Cloud in art.jsx.
const ov = (cx, cy, rx, ry) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;
const SOFT_CLOUD = ov(0, 0, 90, 26) + ov(-34, -18, 40, 26) + ov(22, -26, 48, 32);
export function SoftCloud({ x, y, s = 1, lit = '#FFFFFF', shade = '#AEB8C8', o = 0.92 }) {
  const k = uid('sc');
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <defs><linearGradient id={k} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={lit} /><stop offset="1" stopColor={shade} /></linearGradient></defs>
      <path d={SOFT_CLOUD} fill={`url(#${k})`} />
    </g>
  );
}

// Running-bond brick wall with per-brick tone variation and mortar (Home and Contact exteriors).
export function BrickPattern({ x = 0, y = 0, w, h, brick = '#A8432F', dark = '#7E2F22', mortar = '#D9CDB8', bw = 46, bh = 20, shade = 0.22, id }) {
  const k = id || uid('bk');
  const tw = bw * 2; const th = bh * 2; const g = 1.6;
  const tones = [[brick, 1], [dark, 0.35], ['#fff', 0.06], [dark, 0.18]];
  const b = (bx, by, n) => <g key={`${bx}${by}`}><rect x={bx + g / 2} y={by + g / 2} width={bw - g} height={bh - g} fill={brick} /><rect x={bx + g / 2} y={by + g / 2} width={bw - g} height={bh - g} fill={tones[n % 4][0]} opacity={tones[n % 4][1] * 0.6} /></g>;
  return (
    <g>
      <defs>
        <pattern id={k} width={tw} height={th} patternUnits="userSpaceOnUse">
          <rect width={tw} height={th} fill={mortar} />
          {b(0, 0, 0)}{b(bw, 0, 1)}{b(-bw / 2, bh, 2)}{b(bw / 2, bh, 3)}{b(bw * 1.5, bh, 1)}
        </pattern>
        <linearGradient id={`${k}s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A1020" stopOpacity={shade} /><stop offset=".3" stopColor="#1A1020" stopOpacity="0" /><stop offset="1" stopColor="#1A1020" stopOpacity={shade * 0.7} /></linearGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k})`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k}s)`} />
    </g>
  );
}

// Mown lawn: diagonal light/dark mowing bands, short blade ticks and an edge shade (Home, Contact).
export function Lawn({ x = 0, y, w, h, base = '#4E8A35', light = '#7FB04E', dark = '#2F5A2E', id }) {
  const k = id || uid('lw');
  const r = rng(9);
  const ticks = Array.from({ length: 22 }, (_, i) => { const tx = r() * 60; const ty = r() * 40; return <path key={i} d={`M${tx} ${ty} l${-2 + r() * 4} -7`} stroke={r() > 0.5 ? light : dark} strokeWidth="1.4" opacity=".5" />; });
  return (
    <g>
      <defs>
        <pattern id={k} width="60" height="40" patternUnits="userSpaceOnUse">{ticks}</pattern>
        <pattern id={`${k}b`} width="220" height="10" patternUnits="userSpaceOnUse" patternTransform="skewX(-28)"><rect width="110" height="10" fill={light} opacity=".28" /></pattern>
        <linearGradient id={`${k}d`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={dark} stopOpacity=".35" /><stop offset=".25" stopColor={dark} stopOpacity="0" /><stop offset="1" stopColor={dark} stopOpacity=".3" /></linearGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={base} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k}b)`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k})`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k}d)`} />
    </g>
  );
}

// Street / porch lamp: halo, light cone to the ground and a warm ground pool (Contact dusk).
export function LampLight({ x, y, ground, r = 90, color = '#FFD27A', o = 0.7 }) {
  const k = uid('ll');
  const cw = r * 1.1;
  return (
    <g>
      <defs><linearGradient id={k} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity={o * 0.55} /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={`M${x - 8} ${y} L${x + 8} ${y} L${x + cw} ${ground} L${x - cw} ${ground}Z`} fill={`url(#${k})`} />
      <GlowPool x={x} y={y} r={r} color={color} o={o} />
      <GlowPool x={x} y={ground} r={r * 1.5} ry={r * 0.3} color={color} o={o * 0.7} />
    </g>
  );
}

// Large single-pane window with sky glow, rolling hills, white frame, sill and tied-back curtains (About reference; reusable for the other rooms).
export function ViewWindow({ x, y, w, h, skyTop = '#FFF6DC', skyBot = '#E7F2DE', hill = '#BBD9A2', hill2 = '#9DC986', curtain = '#8FB4D8', frame = '#FBF4E6', glow = '#FFFFFF' }) {
  const k = uid('vw'); const cw = w * 0.24;
  const panel = `M${x - cw * 0.5} ${y - 14} H${x + cw * 0.7} C${x + cw * 0.74} ${y + h * 0.3} ${x + cw * 0.46} ${y + h * 0.5} ${x + cw * 0.42} ${y + h * 0.66} C${x + cw * 0.78} ${y + h * 0.82} ${x + cw * 0.74} ${y + h * 1.0} ${x + cw * 0.68} ${y + h + 36} H${x - cw * 0.5} Z`;
  const folds = [0.12, 0.3, 0.5].map((f) => `M${x - cw * 0.5 + cw * f * 1.9} ${y - 10} C${x - cw * 0.5 + cw * f * 1.9 + 6} ${y + h * 0.4} ${x - cw * 0.5 + cw * f * 1.9 - 4} ${y + h * 0.7} ${x - cw * 0.5 + cw * f * 1.9 + 2} ${y + h + 30}`).join('');
  const side = (mirror) => (
    <g transform={mirror ? `translate(${2 * x + w} 0) scale(-1 1)` : undefined}>
      <path d={panel} fill={`url(#${k}c)`} />
      <path d={folds} stroke="#1A1020" strokeWidth="2" fill="none" opacity=".16" />
      <path d={folds} stroke="#fff" strokeWidth="1.4" fill="none" opacity=".22" transform="translate(5 0)" />
      <ellipse cx={x + cw * 0.42} cy={y + h * 0.68} rx={cw * 0.34} ry="7" fill="#1A1020" opacity=".18" />
    </g>
  );
  return (
    <g>
      <defs>
        <linearGradient id={`${k}s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={skyTop} /><stop offset="1" stopColor={skyBot} /></linearGradient>
        <radialGradient id={`${k}g`}><stop offset="0" stopColor={glow} stopOpacity=".85" /><stop offset="1" stopColor={glow} stopOpacity="0" /></radialGradient>
        <linearGradient id={`${k}c`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={curtain} /><stop offset="1" stopColor="#6E94BE" /></linearGradient>
        <linearGradient id={`${k}h`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={hill} /><stop offset="1" stopColor={hill2} /></linearGradient>
        <clipPath id={`${k}k`}><rect x={x} y={y} width={w} height={h} /></clipPath>
      </defs>
      <rect x={x - 16} y={y - 16} width={w + 32} height={h + 32} rx="6" fill={frame} />
      <rect x={x - 16} y={y - 16} width={w + 32} height={h + 32} rx="6" fill="none" stroke="#1A1020" strokeOpacity=".14" strokeWidth="2" />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${k}s)`} />
      <g clipPath={`url(#${k}k)`}>
        <ellipse cx={x + w * 0.3} cy={y + h * 0.32} rx={w * 0.7} ry={h * 0.5} fill={`url(#${k}g)`} />
        <path d={`M${x} ${y + h * 0.74} Q${x + w * 0.3} ${y + h * 0.56} ${x + w * 0.62} ${y + h * 0.7} T${x + w} ${y + h * 0.66} V${y + h} H${x}Z`} fill={hill} opacity=".85" />
        <path d={`M${x} ${y + h * 0.86} Q${x + w * 0.35} ${y + h * 0.74} ${x + w * 0.7} ${y + h * 0.84} T${x + w} ${y + h * 0.8} V${y + h} H${x}Z`} fill={`url(#${k}h)`} />
      </g>
      <path d={`M${x} ${y} h${w * 0.45} l${-w * 0.45} ${h * 0.35}Z`} fill="#fff" opacity=".16" />
      <rect x={x - 30} y={y + h + 14} width={w + 60} height="16" rx="4" fill={frame} />
      <rect x={x - 26} y={y + h + 30} width={w + 52} height="8" fill="#1A1020" opacity=".12" />
      <rect x={x - cw * 0.9} y={y - 34} width={w + cw * 1.8} height="8" rx="4" fill="#8A5A33" />
      {side(false)}{side(true)}
    </g>
  );
}
