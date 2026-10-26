// Lighting kit (SHOTS.md). Flat, hard-edged solid shapes only: no gradients, blur or filters.
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
