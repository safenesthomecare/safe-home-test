// Outdoor kit (Phase 1.1). Same style as figure.jsx: soft gradient shading, thin dark detail lines, no filters.
// Origin rule: (x, y) = bottom centre, world units. Tree / House / Hills keep their old footprints so existing worlds do not move.
// Texture is drawn as a few combined <path>s (never hundreds of tiny elements) to keep each world light.
import { useId } from 'react';
import { darken, lighten } from './figure';

const D = Math.PI / 180;
const f = (n) => Math.round(n * 10) / 10;
const mk = (seed) => { let s = (Math.imul(seed + 7, 2654435761) >>> 0) || 1; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; };
const useUid = () => `o${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// Pointed leaf from its base (x, y); a = degrees clockwise from straight up.
const leafP = (x, y, L, W, a) => {
  const dx = Math.sin(a * D); const dy = -Math.cos(a * D); const nx = Math.cos(a * D); const ny = Math.sin(a * D);
  const tx = x + dx * L; const ty = y + dy * L; const mx = x + dx * L * 0.46; const my = y + dy * L * 0.46;
  return `M${f(x)} ${f(y)}Q${f(mx + nx * W)} ${f(my + ny * W)} ${f(tx)} ${f(ty)}Q${f(mx - nx * W)} ${f(my - ny * W)} ${f(x)} ${f(y)}Z`;
};
const dotP = (cx, cy, r) => `M${f(cx - r)} ${f(cy)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0Z`;
const ovalP = (cx, cy, rx, ry) => `M${f(cx - rx)} ${f(cy)}a${f(rx)} ${f(ry)} 0 1 0 ${f(2 * rx)} 0a${f(rx)} ${f(ry)} 0 1 0 ${f(-2 * rx)} 0Z`;

const TRIM = '#FFF4E4';

// ---------------------------------------------------------------- Tree
// Bark-textured trunk with root flare and a side branch (the SafeNest nest sits on its tip), layered canopy of individual leaves.
export function Tree({ x, y, s = 1, leaf = '#4F9D3A', leafL = '#8BD450', trunk = '#8A5A2B' }) {
  const u = useUid(); const r = mk(7);
  const leafDk = darken(leaf, 0.3); const bark = darken(trunk, 0.5);
  let barkD = ''; let barkL = '';
  for (let i = 0; i < 20; i++) {
    const yb = -8 - r() * 340; const len = 46 + r() * 90; const hw = 46 - (-yb / 430) * 12 - 9;
    const xb = (r() * 2 - 1) * hw; const bend = (r() - 0.5) * 14;
    const seg = `M${f(xb)} ${f(yb)}q${f(bend)} ${f(-len / 2)} ${f(bend * 0.4)} ${f(-len)}`;
    if (xb < -8) barkL += seg; else barkD += seg;
  }
  const blobs = [[-110, -470, 120], [40, -560, 150], [190, -470, 115], [-10, -440, 120]];
  let lD = ''; let lM = ''; let lL = '';
  blobs.forEach((b, bi) => {
    for (let k = 0; k < 27; k++) {
      const ang = r() * Math.PI * 2; const rad = b[2] * (0.3 + 0.78 * Math.sqrt(r()));
      const px = b[0] + Math.cos(ang) * rad; const py = b[1] + Math.sin(ang) * rad;
      const a = ang / D + 90 + (r() - 0.5) * 100; const L = 26 + r() * 14; const W = 10 + r() * 6;
      const v = 0.5 + (40 - px) * 0.0011 + (-py - 480) * 0.0017 + (r() - 0.5) * 0.55 + (bi === 1 ? 0.05 : 0);
      const p = leafP(px, py, L, W, a);
      if (v > 0.64) lL += p; else if (v > 0.36) lM += p; else lD += p;
    }
  });
  // hanging leaves along the branch and a fork with a cluster at the tip (nest rests here)
  let bl = ''; let bl2 = '';
  for (let k = 0; k < 9; k++) { const t = r(); const bx = 40 + t * 200; const by = -296 - t * 62 + (r() - 0.5) * 8; bl += leafP(bx, by, 24 + r() * 10, 9 + r() * 4, 110 + r() * 110 + (r() > 0.5 ? 0 : -160)); }
  for (let k = 0; k < 7; k++) bl2 += leafP(212 + (r() - 0.5) * 16, -392 + (r() - 0.5) * 10, 24 + r() * 10, 10 + r() * 4, -60 + k * 22 + (r() - 0.5) * 14);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <linearGradient id={`${u}t`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={lighten(trunk, 0.22)} /><stop offset=".42" stopColor={trunk} /><stop offset="1" stopColor={darken(trunk, 0.4)} /></linearGradient>
        <linearGradient id={`${u}b`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={lighten(trunk, 0.12)} /><stop offset="1" stopColor={darken(trunk, 0.3)} /></linearGradient>
      </defs>
      <ellipse cx="20" cy="2" rx="128" ry="14" fill="#000" opacity=".1" />
      <path d="M-84 2 C-54 -4 -50 -40 -45 -120 C-40 -230 -57 -320 -35 -440 L35 -440 C57 -320 39 -230 47 -120 C52 -40 58 -6 90 2Z" fill={`url(#${u}t)`} />
      <path d="M-70 0 C-52 -10 -46 -36 -42 -70" fill="none" stroke={bark} strokeWidth="2.4" strokeLinecap="round" opacity=".5" />
      <path d="M66 0 C50 -10 46 -34 44 -66" fill="none" stroke={bark} strokeWidth="2.4" strokeLinecap="round" opacity=".5" />
      <path d={barkD} fill="none" stroke={bark} strokeWidth="2.6" strokeLinecap="round" opacity=".38" />
      <path d={barkL} fill="none" stroke={lighten(trunk, 0.45)} strokeWidth="2.2" strokeLinecap="round" opacity=".38" />
      <ellipse cx="-8" cy="-168" rx="9" ry="14" fill={darken(trunk, 0.5)} opacity=".55" /><ellipse cx="-8" cy="-170" rx="5" ry="9" fill={darken(trunk, 0.65)} opacity=".7" />
      <path d="M8 -296 C80 -330 170 -352 252 -362 L254 -340 C176 -322 100 -296 24 -250Z" fill={`url(#${u}b)`} />
      <path d="M40 -296 C100 -318 160 -332 226 -344" fill="none" stroke={bark} strokeWidth="2" strokeLinecap="round" opacity=".35" />
      <path d="M152 -336 C170 -362 190 -380 214 -394" fill="none" stroke={trunk} strokeWidth="7" strokeLinecap="round" />
      <g fill={leafDk}><circle cx="-96" cy="-454" r="126" /><circle cx="54" cy="-544" r="156" /><circle cx="204" cy="-454" r="121" /><circle cx="4" cy="-424" r="126" /></g>
      <g fill={leaf}>{blobs.map((b, i) => <circle key={i} cx={b[0]} cy={b[1]} r={b[2]} />)}</g>
      <g fill={leafL} opacity=".5"><circle cx="-60" cy="-540" r="70" /><circle cx="110" cy="-590" r="60" /><circle cx="230" cy="-500" r="50" /></g>
      <path d={lD} fill={leafDk} /><path d={lM} fill={leaf} /><path d={lL} fill={leafL} />
      <path d={bl} fill={leafDk} /><path d={bl2} fill={leaf} />
      <path d={leafP(250, -352, 26, 10, 70) + leafP(250, -352, 24, 9, 110)} fill={leafL} />
    </g>
  );
}

// ---------------------------------------------------------------- Nest
// Woven twig bowl, matching the logo (bowl, rim twigs sticking out, a leaf each side). (x, y) = bottom centre, about 260 wide.
export function Nest({ x, y, s = 1, color = '#8A5A2B' }) {
  const u = useUid(); const r = mk(3);
  const cls = [[darken(color, 0.55), 5.4, ''], [darken(color, 0.25), 4.2, ''], [lighten(color, 0.2), 3.2, ''], [lighten(color, 0.5), 1.8, '']];
  for (let k = 0; k < 30; k++) {
    const q = 0.04 + r() * 0.9; const yE = -78 + 78 * q; const hw = 130 * Math.sqrt(1 - q * q) + 2; const sag = 20 * (1 - q) + 5;
    const j = () => (r() - 0.5) * 16; const c = r() < 0.2 ? 3 : Math.floor(r() * 3);
    cls[c][2] += `M${f(-hw * (0.9 + r() * 0.1) + j())} ${f(yE + j() * 0.3)}Q${f(j())} ${f(yE + sag * 2)} ${f(hw * (0.9 + r() * 0.1) + j())} ${f(yE + j() * 0.3)}`;
  }
  let sticks = ''; for (let k = 0; k < 9; k++) { const left = k % 2 === 0; const bx = (left ? -1 : 1) * (96 + r() * 36); const a = (left ? -1 : 1) * (26 + r() * 50); sticks += `M${f(bx)} ${f(-72 + r() * 16)}l${f(Math.sin(a * D) * (22 + r() * 22))} ${f(-Math.cos(a * D) * (14 + r() * 16))}`; }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs><linearGradient id={`${u}n`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={lighten(color, 0.12)} /><stop offset=".55" stopColor={darken(color, 0.15)} /><stop offset="1" stopColor={darken(color, 0.5)} /></linearGradient></defs>
      <ellipse cx="0" cy="-78" rx="132" ry="21" fill={darken(color, 0.45)} />
      <ellipse cx="0" cy="-76" rx="112" ry="14" fill={darken(color, 0.7)} />
      <path d="M-130 -78 C-132 -22 -70 0 0 0 C70 0 132 -22 130 -78 C100 -62 60 -57 0 -57 C-60 -57 -100 -62 -130 -78Z" fill={`url(#${u}n)`} />
      <g fill="none" strokeLinecap="round">{cls.map((c, i) => <path key={i} d={c[2]} stroke={c[0]} strokeWidth={c[1]} opacity={i === 3 ? 0.7 : 1} />)}</g>
      <path d={sticks} fill="none" stroke={lighten(color, 0.1)} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M-130 -78 C-100 -62 -60 -57 0 -57 C60 -57 100 -62 130 -78" fill="none" stroke={lighten(color, 0.4)} strokeWidth="2.6" strokeLinecap="round" opacity=".6" />
      <path d={leafP(-118, -72, 40, 14, -78) + leafP(-112, -66, 34, 12, -40)} fill="#4F9D3A" /><path d={leafP(118, -72, 40, 14, 78) + leafP(112, -66, 34, 12, 40)} fill="#6DBB4A" />
    </g>
  );
}

// ---------------------------------------------------------------- House
// Siding, stone footing, shingled roof, brick chimney, shuttered windows with curtains and flower boxes, panelled door.
// lit: warm glow in the windows, lantern and chimney smoke. open: the door stands ajar on a warm hall.
export function House({ x, y, s = 1, wall = '#2E6DB8', roof = '#F47C20', door = '#F47C20', lit = false, open = false, glass = '#BFE0F5' }) {
  const u = useUid(); const roofD = darken(roof, 0.35);
  let sid = ''; let sidL = ''; for (let yy = -184; yy < -30; yy += 16) { sid += `M-210 ${yy}H210`; sidL += `M-210 ${yy + 1.8}H210`; }
  let stone = 'M-210 -15H210'; for (let row = 0; row < 2; row++) for (let xx = -210 + (row ? 18 : 0); xx < 210; xx += 36) stone += `M${xx} ${-30 + row * 15}v15`;
  let shing = ''; for (let j = 0; j < 10; j++) { const yy = -196 - j * 16; for (let xx = -276 + (j % 2 ? 13 : 0); xx < 276; xx += 26) shing += `M${xx} ${yy}a13 9 0 0 0 26 0`; }
  let brick = ''; for (let j = 0; j < 11; j++) { brick += `M110 ${-345 + j * 10}h40`; for (let xx = 110 + (j % 2 ? 7 : 14); xx < 150; xx += 14) brick += `M${xx} ${-345 + j * 10}v10`; }
  const glowCol = ['#FFF6D2', C_GLOW, '#F5A53A'];
  const Win = ({ wx }) => (
    <g>
      <g fill={darken(door, 0.05)}>
        <rect x={wx - 20} y="-150" width="12" height="88" rx="2" /><rect x={wx + 84} y="-150" width="12" height="88" rx="2" />
      </g>
      <path d={[...Array(10)].map((_, i) => `M${wx - 20} ${-144 + i * 8.6}h12M${wx + 84} ${-144 + i * 8.6}h12`).join('')} stroke={darken(door, 0.4)} strokeWidth="1.2" opacity=".55" />
      <rect x={wx - 6} y="-150" width="88" height="88" rx="6" fill={TRIM} />
      <rect x={wx} y="-144" width="76" height="76" rx="3" fill={`url(#${u}${lit ? 'gl' : 'gs'})`} />
      {lit && <circle cx={wx + 38} cy="-106" r="96" fill={`url(#${u}hl)`} />}
      {/* curtains */}
      <path d={`M${wx} -144h15q4 30 -2 74h-13Z M${wx + 76} -144h-15q-4 30 2 74h13Z`} fill={lit ? '#FFE9C0' : lighten(roof, 0.62)} opacity=".88" />
      <path d={`M${wx + 6} -142q2 34 0 70M${wx + 11} -142q2 34 -1 70M${wx + 70} -142q-2 34 0 70M${wx + 65} -142q-2 34 1 70`} stroke={darken(roof, 0.2)} strokeWidth="1" opacity=".3" fill="none" />
      {!lit && <path d={`M${wx + 6} -144h26l-26 34Z`} fill="#fff" opacity=".32" />}
      <path d={`M${wx + 38} -144V-68M${wx} -106H${wx + 76}`} stroke={TRIM} strokeWidth="5" />
      <rect x={wx - 10} y="-64" width="96" height="7" rx="3" fill={darken(TRIM, 0.08)} />
      <rect x={wx - 8} y="-57" width="92" height="19" rx="3" fill="#7A4A22" />
      <path d={`M${wx - 6} -57h88`} stroke="#A56C36" strokeWidth="2" />
      <path d={[...Array(7)].map((_, i) => ovalP(wx + 4 + i * 12.4, -60, 8, 7)).join('')} fill="#4F9D3A" />
      {[['#F47C20', 0], ['#FFD66B', 2], ['#F27BA0', 4], ['#fff', 6]].map(([c, i]) => <circle key={c} cx={wx + 10 + i * 12.4} cy={i % 4 ? -66 : -64} r="4.2" fill={c} />)}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <linearGradient id={`${u}w`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={lighten(wall, 0.1)} /><stop offset="1" stopColor={darken(wall, 0.12)} /></linearGradient>
        <linearGradient id={`${u}r`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={lighten(roof, 0.14)} /><stop offset="1" stopColor={darken(roof, 0.12)} /></linearGradient>
        <linearGradient id={`${u}d`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={lighten(door, 0.14)} /><stop offset="1" stopColor={darken(door, 0.2)} /></linearGradient>
        <linearGradient id={`${u}gs`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={lighten(glass, 0.35)} /><stop offset="1" stopColor={darken(glass, 0.06)} /></linearGradient>
        <radialGradient id={`${u}gl`} cx=".5" cy=".6" r=".75"><stop offset="0" stopColor={glowCol[0]} /><stop offset=".55" stopColor={glowCol[1]} /><stop offset="1" stopColor={glowCol[2]} /></radialGradient>
        <radialGradient id={`${u}hl`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor={C_GLOW} stopOpacity=".5" /><stop offset="1" stopColor={C_GLOW} stopOpacity="0" /></radialGradient>
        <linearGradient id={`${u}es`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity=".28" /><stop offset="1" stopColor="#000" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${u}br`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#C5634A" /><stop offset="1" stopColor="#8F3F2E" /></linearGradient>
        <linearGradient id={`${u}st`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B4ACA0" /><stop offset="1" stopColor="#8A8276" /></linearGradient>
        <linearGradient id={`${u}ho`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF0C8" /><stop offset="1" stopColor="#F2B65E" /></linearGradient>
        <clipPath id={`${u}c`}><path d="M-252 -194 L0 -352 L252 -194Z" /></clipPath>
      </defs>
      <ellipse cx="0" cy="4" rx="250" ry="11" fill="#000" opacity=".16" />
      {/* chimney (behind the roof so the roof covers its foot) */}
      <rect x="110" y="-345" width="40" height="115" fill={`url(#${u}br)`} />
      <path d={brick} stroke="#F2C8B0" strokeWidth="1.2" opacity=".5" fill="none" />
      <rect x="105" y="-353" width="50" height="10" rx="3" fill={darken(TRIM, 0.12)} />
      {lit && <g fill="#fff"><circle cx="128" cy="-372" r="9" opacity=".55" /><circle cx="140" cy="-394" r="12" opacity=".4" /><circle cx="134" cy="-422" r="15" opacity=".26" /></g>}
      {/* walls */}
      <rect x="-210" y="-200" width="420" height="200" fill={`url(#${u}w)`} />
      <path d={sid} stroke={darken(wall, 0.3)} strokeWidth="1.6" opacity=".55" /><path d={sidL} stroke={lighten(wall, 0.3)} strokeWidth="1.2" opacity=".3" />
      <rect x="-210" y="-30" width="420" height="30" fill={`url(#${u}st)`} />
      <path d={stone} stroke="#6F675C" strokeWidth="1.4" opacity=".6" fill="none" />
      <rect x="-210" y="-32" width="420" height="4" fill={darken(TRIM, 0.15)} />
      <rect x="-210" y="-200" width="9" height="170" fill={TRIM} /><rect x="201" y="-200" width="9" height="170" fill={TRIM} opacity=".92" />
      <rect x="-210" y="-200" width="420" height="22" fill={`url(#${u}es)`} />
      {/* roof */}
      <path d="M-252 -194 L0 -352 L252 -194Z" fill={`url(#${u}r)`} />
      <g clipPath={`url(#${u}c)`}>
        <path d={shing} fill="none" stroke={roofD} strokeWidth="1.6" opacity=".5" />
        <path d="M-252 -194 L0 -352 L0 -194Z" fill="#fff" opacity=".07" />
      </g>
      <path d="M-252 -194 L0 -352 L252 -194" fill="none" stroke={roofD} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="-256" y="-200" width="512" height="9" rx="4" fill={TRIM} /><rect x="-256" y="-192" width="512" height="3" fill="#000" opacity=".12" />
      {/* attic round window */}
      <circle cx="0" cy="-262" r="21" fill={TRIM} /><circle cx="0" cy="-262" r="15.5" fill={`url(#${u}${lit ? 'gl' : 'gs'})`} />
      <path d="M0 -277.5V-246.5M-15.5 -262H15.5" stroke={TRIM} strokeWidth="3" />
      {/* windows */}
      <Win wx={-140} /><Win wx={70} />
      {/* door */}
      <rect x="-42" y="-138" width="84" height="138" rx="8" fill={TRIM} />
      {open ? (
        <g>
          <rect x="-34" y="-128" width="68" height="128" rx="5" fill={`url(#${u}ho)`} />
          <rect x="-34" y="-30" width="68" height="30" fill="#D89A4A" opacity=".55" />
          <rect x="-14" y="-104" width="26" height="34" rx="2" fill="#B8864E" opacity=".5" /><rect x="-10" y="-100" width="18" height="26" fill="#FFE6A8" opacity=".8" />
          <path d="M-34 -128 L-34 0 L-10 -5 L-10 -120Z" fill={`url(#${u}d)`} /><path d="M-34 -128 L-10 -120" stroke={lighten(door, 0.3)} strokeWidth="1.5" />
        </g>
      ) : (
        <g>
          <rect x="-34" y="-128" width="68" height="128" rx="5" fill={`url(#${u}d)`} />
          {[[-26, -118], [2, -118]].map(([px, py]) => <g key={px}><rect x={px} y={py} width="24" height="42" rx="3" fill={darken(door, 0.14)} opacity=".4" /><rect x={px} y={py} width="24" height="42" rx="3" fill="none" stroke={lighten(door, 0.35)} strokeWidth="1.3" opacity=".7" /></g>)}
          {[[-26, -68], [2, -68]].map(([px, py]) => <g key={px}><rect x={px} y={py} width="24" height="54" rx="3" fill={darken(door, 0.14)} opacity=".4" /><rect x={px} y={py} width="24" height="54" rx="3" fill="none" stroke={lighten(door, 0.35)} strokeWidth="1.3" opacity=".7" /></g>)}
          <circle cx="20" cy="-62" r="5.5" fill="#C9951C" /><circle cx="20" cy="-62" r="4.6" fill="#FFC72C" /><circle cx="18.6" cy="-63.4" r="1.5" fill="#fff" opacity=".8" />
        </g>
      )}
      {/* lantern over the door */}
      <path d="M-8 -156 L0 -164 L8 -156Z" fill={darken(TRIM, 0.4)} /><rect x="-6" y="-156" width="12" height="15" rx="2" fill={lit ? C_GLOW : lighten(glass, 0.2)} stroke={darken(TRIM, 0.4)} strokeWidth="1.4" />
      {lit && <circle cx="0" cy="-149" r="40" fill={`url(#${u}hl)`} />}
      {/* steps */}
      <rect x="-76" y="-2" width="152" height="8" rx="3" fill={`url(#${u}st)`} /><rect x="-60" y="-9" width="120" height="9" rx="3" fill={`url(#${u}st)`} /><rect x="-60" y="-9" width="120" height="2.5" rx="1" fill="#fff" opacity=".35" />
    </g>
  );
}
const C_GLOW = '#FFD66B';

// ---------------------------------------------------------------- Hills
// Smooth rolling hills with a soft crest light. trees > 0 adds a line of small round and pointed trees along the crest.
export function Hills({ y: y0, w: w0, color, amp: amp0 = 90, phase: ph0 = 0, trees: tr0 = 0 }) {
  const y = Number(y0); const w = Number(w0); const amp = Number(amp0); const phase = Number(ph0); const trees = Number(tr0);
  const u = useUid(); const n = 8; const pts = [];
  for (let i = 0; i <= n; i++) pts.push([(w / n) * i, y - Math.sin(i * 1.3 + phase) * amp]);
  const mid = (a, b) => `${f((a[0] + b[0]) / 2)} ${f((a[1] + b[1]) / 2)}`;
  let crest = `M${f(-200)} ${f(pts[0][1])}L0 ${f(pts[0][1])}`;
  for (let i = 1; i < n; i++) crest += `Q${f(pts[i][0])} ${f(pts[i][1])} ${mid(pts[i], pts[i + 1])}`;
  crest += `L${f(w)} ${f(pts[n][1])}L${f(w + 1500)} ${f(pts[n][1])}`;
  const fill = `${crest}L${f(w + 1500)} ${f(y + 900)}L-200 ${f(y + 900)}Z`;
  const crestY = (px) => { const t = clamp(px / (w / n), 0, n - 0.001); const i = Math.floor(t); const k = t - i; const lin = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k; return lin + 3; };
  let rnd = ''; let rndL = ''; let con = ''; let tr = '';
  if (trees > 0) {
    const r = mk(Math.round(y + phase * 10));
    for (let k = 0; k < trees; k++) {
      const px = (w / trees) * (k + 0.2 + r() * 0.6); const py = crestY(px) + 8; const sz = 14 + r() * 14;
      if (k % 3 === 2) con += `M${f(px)} ${f(py - sz * 3.1)}L${f(px + sz * 0.9)} ${f(py - sz * 0.9)}H${f(px - sz * 0.9)}ZM${f(px)} ${f(py - sz * 2.2)}L${f(px + sz * 1.15)} ${f(py - sz * 0.1)}H${f(px - sz * 1.15)}Z`;
      else { rnd += dotP(px, py - sz * 1.6, sz) + dotP(px + sz * 0.5, py - sz * 1.1, sz * 0.8); rndL += dotP(px - sz * 0.3, py - sz * 1.95, sz * 0.52); }
      tr += `M${f(px - 1.6)} ${f(py)}v${f(-sz * 0.9)}h3.2v${f(sz * 0.9)}Z`;
    }
  }
  const tc = darken(color, 0.24);
  return (
    <g>
      <defs><linearGradient id={`${u}h`} gradientUnits="userSpaceOnUse" x1="0" y1={f(y - amp - 30)} x2="0" y2={f(y + 320)}><stop offset="0" stopColor={lighten(color, 0.16)} /><stop offset=".3" stopColor={color} /><stop offset="1" stopColor={darken(color, 0.1)} /></linearGradient></defs>
      <path d={fill} fill={`url(#${u}h)`} />
      <path d={crest} fill="none" stroke={lighten(color, 0.4)} strokeWidth="3.5" strokeLinecap="round" opacity=".45" transform="translate(0 3)" />
      {trees > 0 && <g><path d={tr} fill={darken(color, 0.5)} /><path d={rnd} fill={tc} /><path d={con} fill={darken(color, 0.34)} /><path d={rndL} fill={lighten(tc, 0.14)} opacity=".7" /></g>}
    </g>
  );
}

// ---------------------------------------------------------------- Ground dressing
// Grass tufts along the ground line. (x, y) = centre of the strip on the ground.
export function Grass({ x, y, w = 240, seed = 1, color = '#5FA64F', h = 30 }) {
  const r = mk(seed); const tufts = Math.max(2, Math.round(w / 20)); const p = ['', '', '']; const cols = [darken(color, 0.28), color, lighten(color, 0.3)];
  for (let t = 0; t < tufts; t++) {
    const bx = x - w / 2 + (w / tufts) * (t + r()); const by = y + (r() - 0.5) * 8; const hh = h * (0.6 + r() * 0.6);
    for (let b = 0; b < 5; b++) {
      const ox = bx + (b - 2) * 3.2; const lean = (b - 2) * 5 + (r() - 0.5) * 8; const bh = hh * (0.55 + r() * 0.45) * (b === 2 ? 1.1 : 1); const ci = b % 3;
      p[ci] += `M${f(ox - 2.2)} ${f(by)}Q${f(ox + lean * 0.3)} ${f(by - bh * 0.6)} ${f(ox + lean)} ${f(by - bh)}Q${f(ox + lean * 0.3 + 2.4)} ${f(by - bh * 0.55)} ${f(ox + 2.2)} ${f(by)}Z`;
    }
  }
  return <g>{p.map((d, i) => <path key={i} d={d} fill={cols[i]} />)}</g>;
}

// Wildflowers on curved stems. colors = petal colours cycled across the flowers.
export function Flowers({ x, y, w = 300, n = 10, seed = 1, colors = ['#F27BA0', '#FFD66B', '#FFFFFF', '#F47C20'], stem = '#3E8A3A' }) {
  const r = mk(seed + 40); let stems = ''; let lv = ''; let ctr = ''; const pet = colors.map(() => '');
  for (let k = 0; k < n; k++) {
    const fx = x - w / 2 + (w / n) * (k + 0.2 + r() * 0.6); const hh = 38 + r() * 40; const lean = (r() - 0.5) * 26; const tx = fx + lean; const ty = y - hh; const ci = k % colors.length; const pr = 4.2 + r() * 2.2;
    stems += `M${f(fx)} ${f(y)}Q${f(fx - lean * 0.3)} ${f(y - hh * 0.6)} ${f(tx)} ${f(ty)}`;
    lv += leafP(fx - lean * 0.1, y - hh * 0.3, 18, 6, -62) + leafP(fx - lean * 0.1, y - hh * 0.42, 16, 5.5, 62);
    for (let q = 0; q < 5; q++) { const a = q * 72 + r() * 20; pet[ci] += dotP(tx + Math.sin(a * D) * pr * 1.05, ty - Math.cos(a * D) * pr * 1.05, pr * 0.82); }
    ctr += dotP(tx, ty, pr * 0.62);
  }
  return (
    <g>
      <path d={stems} fill="none" stroke={stem} strokeWidth="2.4" strokeLinecap="round" /><path d={lv} fill={lighten(stem, 0.18)} />
      {pet.map((d, i) => <path key={i} d={d} fill={colors[i]} stroke={darken(colors[i], 0.28)} strokeWidth="0.8" strokeOpacity=".5" />)}
      <path d={ctr} fill="#F2A81D" />
    </g>
  );
}

// A row of flat stepping stones, lightly shaded. (x, y) = centre of the row; stones are squashed ovals (ground-plane view).
export function SteppingStones({ x, y, w = 400, n = 6, seed = 1, color = '#CFC4B2' }) {
  const r = mk(seed + 90); let sh = ''; let top1 = ''; let top2 = ''; let hi = ''; let moss = '';
  for (let k = 0; k < n; k++) {
    const cx = x - w / 2 + (w / n) * (k + 0.5) + (r() - 0.5) * 8; const cy = y + (r() - 0.5) * 12; const rx = (w / n) * (0.34 + r() * 0.1); const ry = rx * (0.24 + r() * 0.06);
    sh += ovalP(cx + 2, cy + 5, rx, ry); const t = ovalP(cx, cy, rx, ry); if (k % 2) top2 += t; else top1 += t;
    hi += ovalP(cx - rx * 0.25, cy - ry * 0.3, rx * 0.5, ry * 0.4); if (r() > 0.5) moss += ovalP(cx + rx * 0.5, cy + ry * 0.4, rx * 0.2, ry * 0.25);
  }
  return (
    <g>
      <path d={sh} fill={darken(color, 0.4)} opacity=".6" /><path d={top1} fill={color} /><path d={top2} fill={lighten(color, 0.08)} />
      <path d={hi} fill="#fff" opacity=".3" /><path d={moss} fill="#7DAA5C" opacity=".6" />
    </g>
  );
}

// White picket fence with two rails and capped end posts. (x, y) = bottom centre.
export function Fence({ x, y, w = 500, h = 84, color = '#FFF9F2' }) {
  const n = Math.max(2, Math.round(w / 26)); const step = w / n; const x0 = x - w / 2; let pk = ''; let sh = ''; let hi = '';
  for (let i = 0; i < n; i++) {
    const px = x0 + step * (i + 0.5);
    pk += `M${f(px - 8)} ${f(y)}V${f(y - h + 11)}L${f(px)} ${f(y - h)}L${f(px + 8)} ${f(y - h + 11)}V${f(y)}Z`;
    sh += `M${f(px + 3)} ${f(y)}V${f(y - h + 8)}L${f(px + 8)} ${f(y - h + 11)}V${f(y)}Z`;
    hi += `M${f(px - 6.5)} ${f(y - 2)}V${f(y - h + 12)}`;
  }
  const rail = (yy) => (<g key={yy}><rect x={x0 - 6} y={yy} width={w + 12} height="10" rx="3" fill={darken(color, 0.1)} /><rect x={x0 - 6} y={yy} width={w + 12} height="3" rx="1.5" fill="#fff" opacity=".7" /></g>);
  return (
    <g>
      <ellipse cx={x} cy={y + 1} rx={w / 2 + 10} ry="5" fill="#000" opacity=".12" />
      {rail(y - h * 0.68)}{rail(y - h * 0.26)}
      <path d={pk} fill={color} stroke={darken(color, 0.3)} strokeWidth="1.1" strokeLinejoin="round" />
      <path d={sh} fill={darken(color, 0.16)} opacity=".6" />
      <path d={hi} stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".8" fill="none" />
      {[x0 - 4, x0 + w + 4].map((px) => <g key={px}><rect x={px - 9} y={y - h - 12} width="18" height={h + 12} rx="2" fill={color} stroke={darken(color, 0.3)} strokeWidth="1.1" /><rect x={px - 12} y={y - h - 18} width="24" height="9" rx="3" fill={darken(color, 0.08)} stroke={darken(color, 0.3)} strokeWidth="1.1" /><rect x={px + 2} y={y - h - 10} width="7" height={h + 10} fill={darken(color, 0.16)} opacity=".5" /></g>)}
    </g>
  );
}

export { f, mk, useUid, leafP, dotP, ovalP, TRIM };
