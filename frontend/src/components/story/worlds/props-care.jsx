// Care props (Phase 1, Task 1.1): walker, water glass, forehead thermometer.
// Same conventions as indoors.jsx: (x, y) = bottom centre, s = scale, soft shading, no filters, no animation.
// Walker is ~88 units tall at s=1 (about hip height on a standing figure).
import { darken, lighten } from './figure';
import { useUid, dotP, ovalP } from './outdoors';

const M = { alu: '#C9CED6', aluD: '#8C95A3', grip: '#3B3F47', rubber: '#2B2F36', glass: '#BFE0F5', water: '#7CC4EE', white: '#FFFFFF', body: '#F3F6FA', accent: '#14A89B', screen: '#BFEBD8' };

// Folding walker, side view with the far frame offset up and right for depth. face = -1 mirrors it.
export function Walker({ x, y, s = 1, face = 1 }) {
  const u = useUid();
  const side = (dx, dy, c, c2) => (
    <g transform={`translate(${dx} ${dy})`}>
      <path d="M-30 0L-27 -84M30 0L33 -84" stroke={c} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M-28 -44H31" stroke={c2} strokeWidth="4" strokeLinecap="round" />
      <path d="M-27 -84H33" stroke={c} strokeWidth="6" strokeLinecap="round" />
      <path d="M-36 -88H-14" stroke={M.grip} strokeWidth="9" strokeLinecap="round" />
      <path d="M-33 -90H-18" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".25" />
      <path d={ovalP(-30, -1, 6, 3)} fill={M.rubber} />
      <circle cx="30" cy="-6" r="6.5" fill={M.rubber} /><circle cx="30" cy="-6" r="2.4" fill={c2} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${face * s} ${s})`}>
      <defs><linearGradient id={`${u}a`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#B4BCC8" /><stop offset="1" stopColor="#8892A0" /></linearGradient></defs>
      <path d={ovalP(8, 3, 54, 4)} fill="#000" opacity=".14" />
      {side(16, -8, '#6B7482', '#5E6674')}
      <path d="M-14 -96L30 -92M-12 -52L32 -50" stroke={M.aluD} strokeWidth="4" strokeLinecap="round" />
      {side(0, 0, `url(#${u}a)`, M.aluD)}
      <path d="M-27 -84H33" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".45" />
    </g>
  );
}

// Tumbler of water, about 40 tall. Used by the PSW (held) or standing on a table.
export function WaterGlass({ x, y, s = 1, level = 0.7 }) {
  const u = useUid(); const h = 40; const wy = -h * level;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs><clipPath id={`${u}c`}><path d={`M-12 -${h}H12L10 -2Q10 0 8 0H-8Q-10 0 -10 -2Z`} /></clipPath></defs>
      <path d={ovalP(0, 0, 14, 2.6)} fill="#000" opacity=".13" />
      <path d={`M-12 -${h}H12L10 -2Q10 0 8 0H-8Q-10 0 -10 -2Z`} fill={M.glass} opacity=".55" />
      <g clipPath={`url(#${u}c)`}>
        <rect x="-14" y={wy} width="28" height={h} fill={M.water} opacity=".85" />
        <path d={`M-14 ${wy}H14`} stroke="#fff" strokeWidth="1.6" opacity=".7" />
        <path d={`M-14 -4H14`} stroke={darken(M.water, 0.15)} strokeWidth="7" opacity=".25" />
      </g>
      <path d={`M-12 -${h}H12L10 -2Q10 0 8 0H-8Q-10 0 -10 -2Z`} fill="none" stroke="#fff" strokeWidth="1.3" opacity=".8" />
      <path d={`M-7 -${h - 5}L-6 -10`} stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity=".6" />
    </g>
  );
}

// Handheld forehead (infrared) thermometer. (x, y) = sensor tip, so place it on the forehead. Body trails to the right; face = -1 mirrors.
export function Thermometer({ x, y, s = 1, face = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${face * s} ${s})`}>
      <path d="M0 -3H8L12 -6V6L8 3H0Z" fill={M.aluD} />
      <path d="M12 -9H48Q56 -9 56 -1V3Q56 8 48 8H12Z" fill={M.body} stroke="#CBD5DF" strokeWidth="1" />
      <path d="M12 3H56V6Q56 8 48 8H12Z" fill="#000" opacity=".07" />
      <rect x="20" y="-6" width="18" height="9" rx="2" fill={M.screen} />
      <path d="M23 -1.5h4M29 -1.5h4" stroke={darken(M.screen, 0.45)} strokeWidth="2" strokeLinecap="round" />
      <path d={dotP(46, -2, 3)} fill={M.accent} />
      <path d="M18 -7H44" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".8" />
    </g>
  );
}

// ---------------------------------------------------------------- Task 1.2
// Manual wheelchair, side view, facing right (face = -1 mirrors). Brakes ON: the lever is pushed forward and its pad touches the rear tyre. About 104 tall at s=1.
export function Wheelchair({ x, y, s = 1, face = 1 }) {
  const fr = '#3B4351', frD = '#252B35', up = '#2F4A7A', upD = '#223A62';
  const spokes = Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `M${(-14).toFixed(1)} -32L${(-14 + Math.cos(a) * 25).toFixed(1)} ${(-32 + Math.sin(a) * 25).toFixed(1)}`; }).join('');
  return (
    <g transform={`translate(${x} ${y}) scale(${face * s} ${s})`}>
      <path d={ovalP(6, 3, 66, 4)} fill="#000" opacity=".14" />
      <g opacity=".55"><circle cx="-6" cy="-36" r="30" fill="none" stroke={M.rubber} strokeWidth="5" /><circle cx="-6" cy="-36" r="25" fill="none" stroke={M.aluD} strokeWidth="1.6" /></g>
      <path d="M-14 -32L-8 -50" stroke={frD} strokeWidth="4" strokeLinecap="round" />
      <circle cx="-14" cy="-32" r="30" fill="none" stroke={M.rubber} strokeWidth="5" />
      <circle cx="-14" cy="-32" r="26" fill="none" stroke={M.aluD} strokeWidth="2" /><circle cx="-14" cy="-32" r="22" fill="none" stroke={M.alu} strokeWidth="1.6" />
      <path d={spokes} stroke={M.alu} strokeWidth="1" opacity=".8" /><circle cx="-14" cy="-32" r="4" fill={M.aluD} /><circle cx="-14" cy="-32" r="1.6" fill="#fff" opacity=".6" />
      <path d="M40 -52L46 -20" stroke={fr} strokeWidth="5" strokeLinecap="round" /><circle cx="46" cy="-9" r="9" fill={M.rubber} /><circle cx="46" cy="-9" r="3.2" fill={M.aluD} />
      <path d="M40 -46L58 -16" stroke={fr} strokeWidth="4.5" strokeLinecap="round" /><path d="M50 -15H73L71 -10H49Z" fill={frD} />
      <path d="M-22 -50H42" stroke={fr} strokeWidth="5" strokeLinecap="round" />
      <path d="M-22 -50L-29 -104" stroke={fr} strokeWidth="5" strokeLinecap="round" /><path d="M-29 -104H-42" stroke={M.grip} strokeWidth="7" strokeLinecap="round" />
      <path d="M-22 -58L-28 -102L-18 -102L-12 -58Z" fill={up} /><path d="M-26 -94L-24 -62" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".25" />
      <rect x="-22" y="-60" width="62" height="9" rx="3.5" fill={up} /><rect x="-22" y="-54" width="62" height="3.5" rx="1.7" fill={upD} />
      <path d="M-18 -78H30" stroke={fr} strokeWidth="4" strokeLinecap="round" /><rect x="-16" y="-84" width="40" height="7" rx="3.5" fill={M.grip} /><path d="M28 -78V-60" stroke={fr} strokeWidth="4" strokeLinecap="round" />
      <g transform="rotate(45 9 -54)"><rect x="4" y="-56" width="10" height="4.5" rx="1.5" fill={M.rubber} /></g>
      <path d="M9 -54L17 -76" stroke={M.aluD} strokeWidth="3.2" strokeLinecap="round" /><circle cx="17.5" cy="-77.5" r="3.6" fill="#F47C20" />
    </g>
  );
}

// CPAP machine with humidifier tank, ribbed hose and nasal mask lying on the surface. (x, y) = bottom centre of the machine; hose and mask trail to the right (face = -1 mirrors).
// Footprint about 64 wide for the machine, 120 wide with mask; machine 22 tall.
export function CPAP({ x, y, s = 1, face = 1 }) {
  const u = useUid();
  return (
    <g transform={`translate(${x} ${y}) scale(${face * s} ${s})`}>
      <defs><clipPath id={`${u}t`}><rect x="26" y="-23" width="16" height="23" rx="4" /></clipPath></defs>
      <path d={ovalP(30, 1, 62, 3.4)} fill="#000" opacity=".14" />
      <rect x="-26" y="-20" width="50" height="20" rx="5" fill={M.body} stroke="#CBD5DF" strokeWidth="1" /><rect x="-26" y="-5" width="50" height="5" rx="2.5" fill="#000" opacity=".07" />
      <rect x="-18" y="-15" width="16" height="9" rx="2" fill={M.screen} /><path d="M-15 -10.5h5M-8 -10.5h4" stroke={darken(M.screen, 0.45)} strokeWidth="2" strokeLinecap="round" />
      <path d={dotP(10, -10, 3.4)} fill={M.accent} /><path d="M-22 -18H18" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".8" />
      <rect x="26" y="-23" width="16" height="23" rx="4" fill={M.glass} opacity=".55" />
      <g clipPath={`url(#${u}t)`}><rect x="24" y="-12" width="20" height="14" fill={M.water} opacity=".85" /><path d="M24 -12H44" stroke="#fff" strokeWidth="1.2" opacity=".7" /></g>
      <rect x="26" y="-23" width="16" height="23" rx="4" fill="none" stroke="#fff" strokeWidth="1.2" opacity=".8" /><rect x="29" y="-26" width="10" height="4" rx="1.6" fill={M.aluD} />
      <path d="M42 -12C58 -16 66 -6 58 -1S66 3 76 -1" stroke={M.accent} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M42 -12C58 -16 66 -6 58 -1S66 3 76 -1" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="1.6 3.4" opacity=".4" />
      <path d="M96 -9Q106 -9 112 -2M96 -4Q106 0 112 2" stroke={M.grip} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M74 -3H82V1H73Z" fill={M.aluD} />
      <path d={ovalP(90, -7, 13, 9)} fill={M.glass} opacity=".75" /><path d={ovalP(90, -7, 13, 9)} fill="none" stroke="#fff" strokeWidth="1.2" opacity=".8" />
      <path d="M80 -2Q90 3 100 -2" stroke="#7CB6DC" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M84 -12Q90 -15 95 -12" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity=".7" />
    </g>
  );
}

// Bedside table with optional lit table lamp and CPAP on top. (x, y) = bottom centre. 150 wide, 64 tall at s=1 (top surface at y - 64).
export const BEDSIDE_TOP = 64;
export function BedsideTable({ x, y, s = 1, lamp = true, cpap = false, lit = true }) {
  const u = useUid(); const wood = '#B98350', woodD = '#5A3213', woodL = '#D1A06B';
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <radialGradient id={`${u}g`}><stop offset="0" stopColor="#FFD66B" stopOpacity=".55" /><stop offset=".6" stopColor="#FFD66B" stopOpacity=".2" /><stop offset="1" stopColor="#FFD66B" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${u}s`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={lit ? '#FFF3C4' : '#F3E3CC'} /><stop offset="1" stopColor={lit ? '#FFC95A' : '#D9C5A8'} /></linearGradient>
      </defs>
      <path d={ovalP(0, 2, 82, 4.4)} fill="#000" opacity=".16" />
      <rect x="-66" y="-14" width="7" height="14" rx="2" fill={woodD} /><rect x="59" y="-14" width="7" height="14" rx="2" fill={woodD} />
      <rect x="-68" y="-60" width="136" height="48" rx="3" fill={wood} />
      <rect x="-62" y="-34" width="124" height="18" rx="2" fill={darken(woodD, 0.25)} /><path d="M-62 -34H62" stroke="#000" strokeWidth="5" opacity=".18" />
      <rect x="-62" y="-56" width="124" height="19" rx="2.5" fill={woodL} /><rect x="-62" y="-41" width="124" height="4" rx="2" fill="#000" opacity=".1" /><path d={dotP(0, -47, 3)} fill={woodD} />
      <rect x="-75" y="-64" width="150" height="7" rx="3" fill={lighten(wood, 0.18)} /><rect x="-75" y="-59" width="150" height="2.4" rx="1.2" fill="#000" opacity=".14" />
      {lamp && (
        <g transform="translate(-10 0)">
          {lit && <circle cx="-46" cy="-92" r="110" fill={`url(#${u}g)`} />}
          <path d={ovalP(-46, -64, 14, 3)} fill="#000" opacity=".14" />
          <path d="M-58 -64q2 -9 12 -9t12 9Z" fill={woodD} /><rect x="-48" y="-92" width="4" height="26" rx="1.6" fill={woodD} />
          <path d="M-62 -90L-54 -116H-38L-30 -90Z" fill={`url(#${u}s)`} stroke={darken('#F3E3CC', 0.3)} strokeWidth="1" strokeOpacity=".5" /><path d={ovalP(-46, -90, 16, 2.6)} fill={lit ? '#FFE9A0' : '#D9C5A8'} />
        </g>
      )}
      {cpap && <CPAP x={-18} y={-64} s={0.72} />}
    </g>
  );
}
