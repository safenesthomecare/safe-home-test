// Indoor kit (Phase 1.2). Same style as figure.jsx / outdoors.jsx: soft gradients, thin detail lines, no filters.
// Footprints and props match the old flat pieces, so the worlds do not move. (x, y) = bottom centre unless noted (Wall, Win, Frame: top-left).
import { darken, lighten } from './figure';
import { f, mk, useUid, leafP, dotP, ovalP, TRIM } from './outdoors';

const P = { wood: '#B98350', woodD: '#5A3213', glow: '#FFD66B', sand: '#F3E3CC', blueL: '#BFE0F5', leaf: '#4F9D3A', leafL: '#8BD450', orange: '#F47C20', blue: '#1F5BA8', plum: '#6B46C1', rose: '#E0577F', teal: '#14A89B' };
const grain = (x, y, w, h, n, seed) => { const r = mk(seed); let d = ''; for (let i = 0; i < n; i++) { const yy = y + ((i + 0.5) / n) * h + (r() - 0.5) * 2; d += `M${f(x + r() * w * 0.2)} ${f(yy)}q${f(w * 0.12)} ${f((r() - 0.5) * 3)} ${f(w * 0.25)} 0t${f(w * 0.25)} 0t${f(w * 0.25)} 0`; } return d; };
const Lin = ({ id, c0, c1, c2, v = true }) => (<linearGradient id={id} x1="0" y1="0" x2={v ? 0 : 1} y2={v ? 1 : 0}><stop offset="0" stopColor={c0} />{c2 && <stop offset=".5" stopColor={c1} />}<stop offset="1" stopColor={c2 || c1} /></linearGradient>);
const Shadow = ({ x, y, rx, o = 0.16 }) => <ellipse cx={x} cy={y} rx={rx} ry={Math.max(4, rx * 0.06)} fill="#000" opacity={o} />;

// ---------------------------------------------------------------- Room shell
// Wallpaper (soft stripe + tiny motif, or dots), baseboard, plank floor with a shadow where wall meets floor.
export function Wall({ x, y, w, h, color, floorH = 120, floor = P.wood, paper = 'stripe' }) {
  const u = useUid(); const fy = y + h - floorH;
  return (
    <g>
      <defs>
        <Lin id={`${u}w`} c0={lighten(color, 0.06)} c1={darken(color, 0.05)} />
        <pattern id={`${u}p`} width="84" height="84" patternUnits="userSpaceOnUse">
          {paper === 'stripe' ? (<g><rect width="42" height="84" fill="#fff" opacity=".22" /><path d={dotP(21, 21, 3.2) + dotP(21, 63, 3.2)} fill={darken(color, 0.1)} opacity=".35" /><path d="M21 12v18M12 21h18M21 54v18M12 63h18" stroke={darken(color, 0.1)} strokeWidth="1" opacity=".22" /></g>)
            : (<path d={dotP(21, 21, 4) + dotP(63, 63, 4)} fill={darken(color, 0.1)} opacity=".3" />)}
        </pattern>
        <pattern id={`${u}f`} width="240" height="60" patternUnits="userSpaceOnUse"><path d="M0 30H240M80 0V30M170 30V60M0 0H240" stroke={darken(floor, 0.32)} strokeWidth="1.6" opacity=".4" fill="none" /><path d="M10 14q40 -4 80 0M120 44q50 -4 100 0" stroke={lighten(floor, 0.25)} strokeWidth="1.4" opacity=".35" fill="none" /></pattern>
        
        <linearGradient id={`${u}fs`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity=".26" /><stop offset="1" stopColor="#000" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${u}fo`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity=".1" /><stop offset="1" stopColor="#fff" stopOpacity=".1" /></linearGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h - floorH} fill={`url(#${u}w)`} />
      {paper !== 'none' && <rect x={x} y={y} width={w} height={h - floorH} fill={`url(#${u}p)`} />}
      <rect x={x} y={fy} width={w} height={floorH} fill={floor} />
      <rect x={x} y={fy} width={w} height={floorH} fill={`url(#${u}f)`} />
      <rect x={x} y={fy} width={w} height={floorH} fill={`url(#${u}fo)`} />
      <rect x={x} y={fy} width={w} height="34" fill={`url(#${u}fs)`} />
      <rect x={x} y={fy - 24} width={w} height="24" fill={TRIM} /><rect x={x} y={fy - 24} width={w} height="3" fill="#fff" /><rect x={x} y={fy - 5} width={w} height="5" fill="#000" opacity=".1" />
    </g>
  );
}

// Window with sky, sun, hills, sill, curtain rod and tied-back curtains. (x, y) = top-left of the glass.
export function Win({ x, y, w = 200, h = 220, sky = P.blueL, sun = false, curtain = '#F6C79C' }) {
  const u = useUid(); const cw = Math.max(34, w * 0.2);
  const curt = (side) => { const x0 = side < 0 ? x - 14 : x + w + 14 - cw; const bow = side < 0 ? 1 : -1; return `M${f(x0)} ${y - 6}h${f(cw)}q${f(bow * 6)} ${f(h * 0.5)} ${f(-bow * 4)} ${f(h * 0.62)}q${f(-cw * 0.25)} 16 ${f(-cw * 0.5)} 6q${f(-cw * 0.25)} 12 ${f(-cw * 0.5)} 2Z`; };
  return (
    <g>
      <defs><Lin id={`${u}s`} c0={lighten(sky, 0.4)} c1={sky} /><Lin id={`${u}c`} c0={lighten(curtain, 0.25)} c1={darken(curtain, 0.2)} v={false} />
        <radialGradient id={`${u}g`}><stop offset="0" stopColor="#FFF3C0" stopOpacity=".9" /><stop offset="1" stopColor="#FFF3C0" stopOpacity="0" /></radialGradient></defs>
      <rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} rx="9" fill={TRIM} /><rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} rx="9" fill="none" stroke={darken(TRIM, 0.22)} strokeWidth="2" />
      <rect x={x - 5} y={y - 5} width={w + 10} height={h + 10} rx="4" fill={darken(TRIM, 0.14)} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${u}s)`} />
      {sun && <g><circle cx={x + w * 0.7} cy={y + h * 0.3} r={w * 0.28} fill={`url(#${u}g)`} /><circle cx={x + w * 0.7} cy={y + h * 0.3} r="26" fill="#FFE59A" /></g>}
      <path d={ovalP(x + w * 0.25, y + h * 0.22, 30, 9) + ovalP(x + w * 0.25 + 18, y + h * 0.22 - 7, 20, 9)} fill="#fff" opacity=".85" />
      <path d={`M${x} ${y + h}V${y + h * 0.78}Q${x + w * 0.3} ${y + h * 0.66} ${x + w * 0.55} ${y + h * 0.78}T${x + w} ${y + h * 0.74}V${y + h}Z`} fill={P.leaf} opacity=".55" />
      <path d={`M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}`} stroke={TRIM} strokeWidth="8" />
      <path d={`M${x} ${y}h${w * 0.4}l${-w * 0.4} ${h * 0.3}Z`} fill="#fff" opacity=".18" />
      <rect x={x - 26} y={y + h + 12} width={w + 52} height="13" rx="4" fill={TRIM} /><rect x={x - 22} y={y + h + 25} width={w + 44} height="6" fill="#000" opacity=".1" />
      <path d={curt(-1)} fill={`url(#${u}c)`} /><path d={curt(1)} fill={`url(#${u}c)`} />
      <path d={[0.3, 0.55, 0.78].map((k) => `M${f(x - 14 + cw * k)} ${y - 4}q-3 ${f(h * 0.3)} 0 ${f(h * 0.58)}M${f(x + w + 14 - cw + cw * k)} ${y - 4}q3 ${f(h * 0.3)} 0 ${f(h * 0.58)}`).join('')} stroke={darken(curtain, 0.3)} strokeWidth="1.3" opacity=".4" fill="none" />
      <rect x={x - 34} y={y - 26} width={w + 68} height="7" rx="3.5" fill={P.woodD} /><circle cx={x - 36} cy={y - 22} r="7" fill={P.wood} /><circle cx={x + w + 36} cy={y - 22} r="7" fill={P.wood} />
    </g>
  );
}

// Framed picture: landscape or a pair of figures under a heart (echoes the logo). (x, y) = top-left.
export function Frame({ x, y, w = 70, h = 90, c = P.rose }) {
  const u = useUid(); const fam = Math.round(x / 10) % 2 === 0; const ix = x + 11; const iy = y + 11; const iw = w - 22; const ih = h - 22;
  return (
    <g>
      <defs><Lin id={`${u}f`} c0={P.wood} c1={P.woodD} v={false} /></defs>
      <rect x={x + 3} y={y + 5} width={w} height={h} rx="4" fill="#000" opacity=".12" />
      <rect x={x} y={y} width={w} height={h} rx="4" fill={`url(#${u}f)`} /><rect x={x + 2} y={y + 2} width={w - 4} height={h - 4} rx="3" fill="none" stroke={lighten(P.wood, 0.4)} strokeWidth="1.2" opacity=".6" />
      <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} fill={TRIM} />
      <rect x={ix} y={iy} width={iw} height={ih} fill={lighten(c, 0.55)} />
      {fam ? (<g>
        <path d={dotP(ix + iw * 0.36, iy + ih * 0.34, iw * 0.1)} fill={P.blue} /><path d={dotP(ix + iw * 0.66, iy + ih * 0.34, iw * 0.1)} fill={P.orange} />
        <path d={`M${ix + iw * 0.14} ${iy + ih}q0 ${-ih * 0.42} ${iw * 0.22} ${-ih * 0.42}t${iw * 0.22} ${ih * 0.42}Z`} fill={P.blue} /><path d={`M${ix + iw * 0.44} ${iy + ih}q0 ${-ih * 0.42} ${iw * 0.22} ${-ih * 0.42}t${iw * 0.22} ${ih * 0.42}Z`} fill={P.orange} />
        <path d={dotP(ix + iw * 0.51, iy + ih * 0.14, iw * 0.055)} fill={P.orange} />
      </g>) : (<g>
        <circle cx={ix + iw * 0.72} cy={iy + ih * 0.28} r={iw * 0.12} fill="#FFE59A" />
        <path d={`M${ix} ${iy + ih}V${iy + ih * 0.66}Q${ix + iw * 0.3} ${iy + ih * 0.46} ${ix + iw * 0.6} ${iy + ih * 0.66}T${ix + iw} ${iy + ih * 0.6}V${iy + ih}Z`} fill={c} /><path d={`M${ix} ${iy + ih}V${iy + ih * 0.84}Q${ix + iw * 0.5} ${iy + ih * 0.66} ${ix + iw} ${iy + ih * 0.82}V${iy + ih}Z`} fill={P.leaf} opacity=".8" />
      </g>)}
      <path d={`M${ix} ${iy}h${iw * 0.5}l${-iw * 0.5} ${ih * 0.4}Z`} fill="#fff" opacity=".22" />
    </g>
  );
}

// Rug on the floor, seen at an angle. (x, y) = centre.
export function Rug({ x, y, w = 420, h = 44, color = P.rose }) {
  return (
    <g>
      <path d={ovalP(x, y + 4, w / 2 + 6, h / 2 + 2)} fill="#000" opacity=".12" />
      <path d={ovalP(x, y, w / 2, h / 2)} fill={darken(color, 0.12)} /><path d={ovalP(x, y, w / 2 - 12, h / 2 - 5)} fill={lighten(color, 0.55)} />
      <path d={ovalP(x, y, w / 2 - 20, h / 2 - 8)} fill={color} /><path d={ovalP(x, y, w / 2 - 44, h / 2 - 15)} fill="none" stroke={lighten(color, 0.5)} strokeWidth="2.4" strokeDasharray="8 7" />
      <path d={ovalP(x, y, w * 0.12, h * 0.15)} fill={lighten(color, 0.4)} opacity=".7" />
    </g>
  );
}

// ---------------------------------------------------------------- Furniture
export function Table({ x, y, w = 300, h = 120, color = P.wood }) {
  const u = useUid(); const x0 = x - w / 2;
  return (
    <g>
      <defs><Lin id={`${u}t`} c0={lighten(color, 0.18)} c1={darken(color, 0.1)} /><Lin id={`${u}l`} c0={darken(color, 0.25)} c1={darken(color, 0.55)} v={false} /></defs>
      <Shadow x={x} y={y + 2} rx={w / 2 + 10} />
      <rect x={x0 + 24} y={y - h + 18} width="14" height={h - 18} fill={`url(#${u}l)`} /><rect x={x0 + w - 38} y={y - h + 18} width="14" height={h - 18} fill={`url(#${u}l)`} />
      <path d={`M${x0 + 24} ${y - 5}h14v5h-14ZM${x0 + w - 38} ${y - 5}h14v5h-14Z`} fill="#000" opacity=".18" />
      <rect x={x0 + 36} y={y - h + 18} width={w - 72} height="15" fill={darken(color, 0.32)} />
      <rect x={x0} y={y - h} width={w} height="18" rx="6" fill={`url(#${u}t)`} />
      <path d={grain(x0 + 8, y - h + 2, w - 16, 14, 3, Math.round(x))} stroke={darken(color, 0.4)} strokeWidth="1.2" opacity=".35" fill="none" />
      <rect x={x0 + 4} y={y - h + 1.5} width={w - 8} height="2.6" rx="1.3" fill="#fff" opacity=".4" />
    </g>
  );
}

export function Chair({ x, y, face = 1, color = '#C85E10' }) {
  const u = useUid();
  return (
    <g transform={`translate(${x} ${y}) scale(${face} 1)`}>
      <defs><Lin id={`${u}w`} c0={lighten(P.wood, 0.1)} c1={P.woodD} v={false} /><Lin id={`${u}c`} c0={lighten(color, 0.2)} c1={darken(color, 0.18)} /></defs>
      <Shadow x={0} y={2} rx={42} o={0.14} />
      <rect x="16" y="-48" width="10" height="48" rx="2" fill={`url(#${u}w)`} /><rect x="-26" y="-48" width="10" height="48" rx="2" fill={`url(#${u}w)`} />
      <rect x="-24" y="-24" width="46" height="5" fill={P.woodD} opacity=".7" />
      <path d="M-30 -56 L-30 -132 Q-30 -138 -24 -138 H-20 Q-14 -138 -14 -132 L-14 -56Z" fill={`url(#${u}w)`} />
      <rect x="-30" y="-122" width="22" height="30" rx="8" fill={`url(#${u}c)`} />
      <rect x="-34" y="-62" width="68" height="16" rx="7" fill={darken(P.wood, 0.15)} /><rect x="-32" y="-74" width="64" height="16" rx="8" fill={`url(#${u}c)`} />
      <path d="M-24 -72 H24" stroke={lighten(color, 0.45)} strokeWidth="2" strokeLinecap="round" opacity=".7" />
    </g>
  );
}

export function Sofa({ x, y, w = 360, color = P.plum }) {
  const u = useUid(); const x0 = x - w / 2;
  return (
    <g>
      <defs><Lin id={`${u}b`} c0={lighten(color, 0.1)} c1={darken(color, 0.22)} /><Lin id={`${u}s`} c0={lighten(color, 0.22)} c1={color} /></defs>
      <Shadow x={x} y={y + 2} rx={w / 2 + 34} />
      <path d={`M${x0 + 8} ${y - 6}v6h14v-6ZM${x0 + w - 22} ${y - 6}v6h14v-6Z`} fill={P.woodD} />
      <rect x={x0} y={y - 118} width={w} height="104" rx="22" fill={`url(#${u}b)`} />
      {[0, 1, 2].map((i) => <rect key={i} x={x0 + 24 + (i * (w - 48)) / 3 + 3} y={y - 108} width={(w - 48) / 3 - 6} height="62" rx="16" fill={`url(#${u}s)`} stroke={darken(color, 0.25)} strokeWidth="1.2" strokeOpacity=".5" />)}
      <rect x={x0 + 10} y={y - 62} width={w - 20} height="46" rx="14" fill={darken(color, 0.12)} />
      {[0, 1].map((i) => <rect key={i} x={x0 + 26 + (i * (w - 52)) / 2 + 2} y={y - 78} width={(w - 52) / 2 - 4} height="34" rx="12" fill={`url(#${u}s)`} stroke={darken(color, 0.25)} strokeWidth="1.2" strokeOpacity=".5" />)}
      {[x0 - 20, x0 + w - 20].map((ax) => <g key={ax}><rect x={ax} y={y - 92} width="40" height="88" rx="16" fill={`url(#${u}b)`} /><rect x={ax + 4} y={y - 90} width="32" height="22" rx="11" fill={lighten(color, 0.3)} opacity=".6" /></g>)}
      <path d={`M${x0 + 28} ${y - 44}h${w - 56}`} stroke={lighten(color, 0.4)} strokeWidth="1.5" opacity=".5" />
    </g>
  );
}

export function Armchair({ x, y, face = 1, color = P.rose }) {
  const u = useUid();
  return (
    <g transform={`translate(${x} ${y}) scale(${face} 1)`}>
      <defs><Lin id={`${u}b`} c0={lighten(color, 0.12)} c1={darken(color, 0.22)} /><Lin id={`${u}s`} c0={lighten(color, 0.24)} c1={color} /></defs>
      <Shadow x={6} y={2} rx={84} />
      <path d="M-56 -4v6h12v-6ZM46 -4v6h12v-6Z" fill={P.woodD} />
      <rect x="-62" y="-146" width="56" height="140" rx="24" fill={`url(#${u}b)`} />
      <rect x="-54" y="-136" width="40" height="70" rx="18" fill={`url(#${u}s)`} stroke={darken(color, 0.25)} strokeWidth="1.2" strokeOpacity=".5" />
      <path d={dotP(-34, -118, 2.6) + dotP(-34, -96, 2.6) + dotP(-34, -74, 2.6)} fill={darken(color, 0.3)} />
      <rect x="-60" y="-70" width="132" height="60" rx="18" fill={darken(color, 0.12)} /><rect x="-44" y="-84" width="96" height="36" rx="14" fill={`url(#${u}s)`} stroke={darken(color, 0.25)} strokeWidth="1.2" strokeOpacity=".5" />
      <rect x="38" y="-104" width="34" height="94" rx="15" fill={`url(#${u}b)`} /><rect x="42" y="-102" width="26" height="24" rx="12" fill={lighten(color, 0.3)} opacity=".6" />
    </g>
  );
}

export function Bed({ x, y, w = 420, color = P.blue }) {
  const u = useUid(); const x0 = x - w / 2;
  return (
    <g>
      <defs><Lin id={`${u}h`} c0={lighten(P.wood, 0.1)} c1={P.woodD} v={false} /><Lin id={`${u}q`} c0={lighten(color, 0.2)} c1={darken(color, 0.15)} /></defs>
      <Shadow x={x} y={y - 16} rx={w / 2 + 16} />
      <rect x={x0 + 4} y={y - 36} width={w - 8} height="36" rx="4" fill={P.woodD} /><rect x={x0 + 10} y={y - 24} width="14" height="26" fill={darken(P.wood, 0.4)} /><rect x={x0 + w - 24} y={y - 24} width="14" height="26" fill={darken(P.wood, 0.4)} />
      <rect x={x0 - 6} y={y - 164} width="26" height="150" rx="9" fill={`url(#${u}h)`} /><rect x={x0 - 1} y={y - 150} width="16" height="100" rx="6" fill={darken(P.wood, 0.3)} opacity=".4" />
      <rect x={x0 + w - 20} y={y - 96} width="22" height="82" rx="8" fill={`url(#${u}h)`} />
      <rect x={x0 + 14} y={y - 100} width={w - 30} height="72" rx="12" fill="#fff" /><rect x={x0 + 14} y={y - 46} width={w - 30} height="12" fill="#000" opacity=".08" />
      <g><rect x={x0 + 26} y={y - 134} width="82" height="40" rx="18" fill="#fff" stroke={darken('#EDEDED', 0.1)} strokeWidth="1.5" /><path d={`M${x0 + 44} ${y - 114}q22 -12 48 -2`} stroke="#DDE3EA" strokeWidth="2" fill="none" strokeLinecap="round" /></g>
      <path d={`M${x0 + 84} ${y - 98}Q${x0 + 90} ${y - 112} ${x0 + 112} ${y - 112}H${x0 + w - 12}V${y - 34}H${x0 + 96}Q${x0 + 80} ${y - 40} ${x0 + 84} ${y - 98}Z`} fill={`url(#${u}q)`} />
      <path d={`M${x0 + 88} ${y - 86}H${x0 + w - 12}M${x0 + 90} ${y - 62}H${x0 + w - 12}`} stroke={lighten(color, 0.5)} strokeWidth="2" strokeDasharray="6 5" opacity=".7" />
      <path d={`M${x0 + 84} ${y - 98}Q${x0 + 100} ${y - 108} ${x0 + 112} ${y - 112}`} stroke={lighten(color, 0.55)} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

// Kitchen counter with cabinet doors, handles, worktop and a tap. Footprint: 170 tall.
export function Counter({ x, y, w = 420, color = P.sand }) {
  const u = useUid(); const x0 = x - w / 2; const n = Math.max(2, Math.round(w / 130)); const dw = w / n;
  return (
    <g>
      <defs><Lin id={`${u}t`} c0={lighten(color, 0.3)} c1={darken(color, 0.1)} /><Lin id={`${u}d`} c0="#FFFDF8" c1="#F1E6D4" /></defs>
      <Shadow x={x} y={y + 2} rx={w / 2 + 10} />
      <rect x={x0} y={y - 170} width={w} height="170" fill="#E4D6C0" /><rect x={x0} y={y - 14} width={w} height="14" fill={P.woodD} />
      {[...Array(n)].map((_, i) => (
        <g key={i}>
          <rect x={x0 + i * dw + 6} y={y - 156} width={dw - 12} height="134" rx="5" fill={i === 0 ? P.blueL : `url(#${u}d)`} opacity={i === 0 ? 0.75 : 1} stroke={darken('#E4D6C0', 0.2)} strokeWidth="1.4" />
          <rect x={x0 + i * dw + 16} y={y - 146} width={dw - 32} height="114" rx="3" fill="none" stroke={darken('#E4D6C0', 0.12)} strokeWidth="1.3" />
          <rect x={x0 + i * dw + dw / 2 - 14} y={y - 150} width="28" height="5" rx="2.5" fill="#9AA3AE" />
        </g>
      ))}
      <rect x={x0 - 6} y={y - 182} width={w + 12} height="22" rx="6" fill={`url(#${u}t)`} /><rect x={x0 - 4} y={y - 181} width={w + 8} height="3" rx="1.5" fill="#fff" opacity=".6" />
      <path d={`M${x0 + 70} ${y - 182}v-24q0 -12 14 -12h10`} stroke="#9AA3AE" strokeWidth="6" fill="none" strokeLinecap="round" /><path d={`M${x0 + 70} ${y - 182}v-22`} stroke="#fff" strokeWidth="1.5" opacity=".6" />
    </g>
  );
}

// ---------------------------------------------------------------- Small things
export const Cushion = ({ x, y, s = 1, color = P.orange }) => {
  const u = useUid();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs><Lin id={`${u}c`} c0={lighten(color, 0.3)} c1={darken(color, 0.12)} /></defs>
      <path d="M-30 -4 Q-34 -34 -28 -62 Q0 -70 28 -62 Q34 -34 30 -4 Q0 4 -30 -4Z" fill={`url(#${u}c)`} stroke={darken(color, 0.25)} strokeWidth="1.2" strokeOpacity=".5" />
      <path d="M-22 -50 Q0 -56 22 -50M-24 -14 Q0 -8 24 -14" stroke={lighten(color, 0.5)} strokeWidth="2" fill="none" opacity=".5" strokeLinecap="round" />
      <path d={dotP(0, -34, 3)} fill={darken(color, 0.3)} />
    </g>
  );
};

export function Mug({ x, y, c = P.orange }) {
  return (
    <g>
      <path d={ovalP(x, y, 15, 3)} fill="#000" opacity=".14" />
      <path d={`M${x + 12} ${y - 17}q14 0 14 8q0 8 -13 8`} stroke={darken(c, 0.12)} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d={`M${x - 13} ${y - 24}h26l-2 22q0 2 -3 2h-16q-3 0 -3 -2Z`} fill={c} /><path d={`M${x + 4} ${y - 24}h9l-2 22q0 2 -3 2h-3Z`} fill="#000" opacity=".14" />
      <path d={ovalP(x, y - 24, 13, 3.6)} fill={darken(c, 0.3)} /><path d={ovalP(x, y - 23.6, 11, 2.6)} fill="#6B3E1E" />
      <path d={`M${x - 8} ${y - 20}v12`} stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity=".45" />
      <path d={`M${x - 4} ${y - 30}q-5 -8 0 -14t0 -12M${x + 5} ${y - 30}q-5 -8 0 -14`} stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".55" />
    </g>
  );
}

export function Kettle({ x, y, s = 1, color = '#C85E10' }) {
  const u = useUid();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs><Lin id={`${u}k`} c0={lighten(color, 0.3)} c1={darken(color, 0.25)} v={false} /></defs>
      <path d={ovalP(0, 0, 34, 4)} fill="#000" opacity=".14" />
      <path d="M-30 0 Q-34 -34 -18 -48 H18 Q34 -34 30 0Z" fill={`url(#${u}k)`} /><path d="M26 -34 q22 -12 30 -30 q4 -4 8 -2 q2 6 -6 20 q-10 16 -30 24Z" fill={darken(color, 0.1)} />
      <path d="M-18 -46 Q-4 -92 22 -46" stroke={P.woodD} strokeWidth="8" fill="none" strokeLinecap="round" /><path d={dotP(0, -56, 5)} fill={P.woodD} />
      <rect x="-14" y="-52" width="28" height="7" rx="3" fill={darken(color, 0.3)} /><path d="M-20 -8 Q-24 -28 -14 -40" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".45" />
    </g>
  );
}

export function FruitBowl({ x, y, s = 1 }) {
  const u = useUid();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs><Lin id={`${u}b`} c0={lighten(P.blueL, 0.2)} c1={darken(P.blueL, 0.2)} /></defs>
      <path d={ovalP(0, 0, 40, 5)} fill="#000" opacity=".14" />
      {[[-18, -26, 14, '#D8402F'], [10, -28, 15, P.orange], [-2, -38, 13, '#E5C02E']].map(([cx, cy, r, c], i) => <g key={i}><circle cx={cx} cy={cy} r={r} fill={c} /><circle cx={cx - r * 0.35} cy={cy - r * 0.35} r={r * 0.28} fill="#fff" opacity=".4" /></g>)}
      <path d="M-18 -40 q2 -6 6 -6" stroke={P.woodD} strokeWidth="2" fill="none" /><path d={leafP(-12, -44, 12, 4, 50)} fill={P.leaf} />
      <path d="M-40 -28 Q-36 0 0 0 Q36 0 40 -28Z" fill={`url(#${u}b)`} /><path d="M-40 -28 H40" stroke="#fff" strokeWidth="3" opacity=".7" />
    </g>
  );
}

export const Plate = ({ x, y }) => (
  <g>
    <path d={ovalP(x + 2, y + 3, 36, 9)} fill="#000" opacity=".13" /><path d={ovalP(x, y, 35, 9)} fill="#fff" stroke="#C9D3DE" strokeWidth="1.4" />
    <path d={ovalP(x, y, 26, 6.4)} fill="#F3F6FA" stroke="#DCE4EC" strokeWidth="1" />
    <path d={leafP(x - 18, y - 2, 18, 6, -70) + leafP(x - 14, y - 2, 18, 6, -30) + leafP(x - 10, y, 16, 5, -100)} fill={P.leaf} />
    <path d={dotP(x + 2, y - 5, 7.5)} fill="#E7A66A" /><path d={dotP(x + 1, y - 6.2, 5)} fill="#F2C089" />
    <path d={ovalP(x + 18, y - 3.6, 6.4, 3.4) + ovalP(x + 24, y - 1, 5, 2.8) + ovalP(x + 11, y - 1, 5, 2.8)} fill={P.orange} /><path d={ovalP(x + 17, y - 4.4, 3, 1.2)} fill="#fff" opacity=".4" />
  </g>
);

// 7-day pill organiser: coloured lids, two open with pills inside.
export function Pillbox({ x, y }) {
  const cols = ['#9CCBEA', '#C7B4EE', '#F6B98A', '#9CCBEA', '#C7B4EE', '#F6B98A', '#9CCBEA']; const x0 = x - 38;
  return (
    <g>
      <path d={ovalP(x, y, 42, 3.6)} fill="#000" opacity=".14" />
      <rect x={x0} y={y - 22} width="76" height="22" rx="5" fill="#fff" stroke="#CBD5DF" strokeWidth="1.3" /><rect x={x0} y={y - 5} width="76" height="5" rx="2" fill="#000" opacity=".07" />
      {cols.map((c, i) => {
        const cx = x0 + 3 + i * 10.1; const open = i === 2 || i === 4;
        return open
          ? <g key={i}><rect x={cx} y={y - 19} width="8.6" height="14" rx="2" fill="#E6ECF2" /><path d={ovalP(cx + 4.3, y - 11, 3, 1.8)} fill={i === 2 ? P.orange : P.plum} /><path d={`M${cx} ${y - 19}l-1 -7h8.6l1 7Z`} fill={c} opacity=".9" /></g>
          : <g key={i}><rect x={cx} y={y - 19} width="8.6" height="14" rx="2" fill={c} /><rect x={cx} y={y - 19} width="8.6" height="3" rx="1.5" fill="#fff" opacity=".5" /></g>;
      })}
    </g>
  );
}

// Floor lamp with a shaded glow when lit (soft radial gradient, no blur).
export function Lamp({ x, y, lit = true }) {
  const u = useUid();
  return (
    <g>
      <defs>
        <radialGradient id={`${u}g`}><stop offset="0" stopColor={P.glow} stopOpacity=".5" /><stop offset=".6" stopColor={P.glow} stopOpacity=".2" /><stop offset="1" stopColor={P.glow} stopOpacity="0" /></radialGradient>
        <Lin id={`${u}s`} c0={lit ? '#FFF3C4' : lighten(P.sand, 0.3)} c1={lit ? '#FFC95A' : darken(P.sand, 0.12)} v={false} />
        <Lin id={`${u}p`} c0={lighten(P.woodD, 0.3)} c1={darken(P.woodD, 0.2)} v={false} />
      </defs>
      {lit && <circle cx={x} cy={y - 150} r="150" fill={`url(#${u}g)`} />}
      <Shadow x={x} y={y + 1} rx={34} o={0.15} />
      <path d={`M${x - 30} ${y}q2 -12 30 -12t30 12Z`} fill={P.woodD} /><rect x={x - 4} y={y - 132} width="8" height="122" rx="3" fill={`url(#${u}p)`} /><path d={dotP(x, y - 134, 6)} fill={P.wood} />
      <path d={`M${x - 38} ${y - 128} L${x - 22} ${y - 192} H${x + 22} L${x + 38} ${y - 128}Z`} fill={`url(#${u}s)`} stroke={darken(P.sand, 0.3)} strokeWidth="1.2" strokeOpacity=".5" />
      <path d={ovalP(x, y - 128, 38, 5)} fill={lit ? '#FFE9A0' : darken(P.sand, 0.15)} /><path d={`M${x - 14} ${y - 184}l-8 40`} stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".4" />
    </g>
  );
}

export function Plant({ x, y, s = 1 }) {
  const u = useUid(); const r = mk(Math.round(x));
  let a = ''; let b = ''; let mid = '';
  const L = [[-64, 84], [-40, 98], [-16, 108], [10, 112], [34, 100], [58, 88], [-82, 62], [76, 66], [-4, 74]];
  L.forEach(([ang, len], i) => { const l = len * (0.9 + r() * 0.2); const d = leafP(0, -48, l, 15, ang + (r() - 0.5) * 6); if (i % 2) a += d; else b += d; mid += `M0 -48l${f(Math.sin(ang * Math.PI / 180) * l * 0.85)} ${f(-Math.cos(ang * Math.PI / 180) * l * 0.85)}`; });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs><Lin id={`${u}p`} c0={lighten('#C85E10', 0.22)} c1={darken('#C85E10', 0.22)} v={false} /></defs>
      <path d={ovalP(0, 0, 30, 4)} fill="#000" opacity=".14" />
      <path d="M-24 -52 Q0 -44 24 -52Z" fill="#4A2C16" />
      <path d={b} fill={P.leaf} /><path d={a} fill={darken(P.leaf, 0.22)} /><path d={mid} stroke={darken(P.leaf, 0.4)} strokeWidth="1.2" opacity=".5" fill="none" />
      <path d="M-27 -54 H27 L22 0 H-22Z" fill={`url(#${u}p)`} /><rect x="-30" y="-58" width="60" height="10" rx="4" fill={lighten('#C85E10', 0.12)} />
      <path d="M-18 -42 L-15 -8" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".3" />
    </g>
  );
}

// Wall clock showing 10:10.
export function Clock({ x, y, r = 36 }) {
  const u = useUid(); let t = '';
  for (let i = 0; i < 12; i++) { const a = i * 30 * Math.PI / 180; t += `M${f(x + Math.sin(a) * r * 0.78)} ${f(y - Math.cos(a) * r * 0.78)}L${f(x + Math.sin(a) * r * 0.9)} ${f(y - Math.cos(a) * r * 0.9)}`; }
  return (
    <g>
      <defs><Lin id={`${u}r`} c0={lighten(P.wood, 0.2)} c1={P.woodD} /></defs>
      <circle cx={x + 2} cy={y + 4} r={r + 4} fill="#000" opacity=".12" /><circle cx={x} cy={y} r={r + 4} fill={`url(#${u}r)`} /><circle cx={x} cy={y} r={r} fill={TRIM} />
      <path d={t} stroke={P.woodD} strokeWidth="2.4" strokeLinecap="round" />
      <path d={`M${x} ${y}L${f(x - r * 0.42)} ${f(y - r * 0.38)}M${x} ${y}L${f(x + r * 0.2)} ${f(y - r * 0.64)}`} stroke={P.woodD} strokeWidth="3.4" strokeLinecap="round" /><circle cx={x} cy={y} r="3.4" fill={P.orange} />
    </g>
  );
}

// Short stack of books.
export const Books = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={ovalP(0, 0, 40, 4)} fill="#000" opacity=".13" />
    {[[-38, -14, 76, P.blue], [-32, -28, 66, P.orange], [-36, -42, 72, P.teal]].map(([bx, by, bw, c], i) => <g key={i}><rect x={bx} y={by} width={bw} height="14" rx="2" fill={c} /><rect x={bx + bw - 4} y={by + 2} width="3" height="10" fill="#fff" opacity=".75" /><rect x={bx + 6} y={by + 2} width="10" height="3" rx="1.5" fill="#fff" opacity=".5" /></g>)}
  </g>
);
