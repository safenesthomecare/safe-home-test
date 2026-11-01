// GTA street-level kit: road, curb, grass boulevard, sidewalk, street trees, hydro poles, hydrants, mailboxes, bus stops, parked cars, infill townhouses.
// Elevation view like the rest of the worlds: (x, y) is the bottom centre, y grows downward.
import { Maple, HydroPole } from './gta';

const rnd = (seed) => { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };

// Path helpers. All shapes share one winding (counter-clockwise), so shapes joined in one path render as their union (one path per part).
const f = (n) => +n.toFixed(2);
const rP = (x, y, w, h, r = 0) => `M${f(x)} ${f(y + r)}V${f(y + h - r)}${r ? `Q${f(x)} ${f(y + h)} ${f(x + r)} ${f(y + h)}` : ''}H${f(x + w - r)}${r ? `Q${f(x + w)} ${f(y + h)} ${f(x + w)} ${f(y + h - r)}` : ''}V${f(y + r)}${r ? `Q${f(x + w)} ${f(y)} ${f(x + w - r)} ${f(y)}` : ''}H${f(x + r)}${r ? `Q${f(x)} ${f(y)} ${f(x)} ${f(y + r)}` : ''}Z`;
const dP = (cx, cy, r) => `M${f(cx - r)} ${f(cy)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0Z`;
const oP = (cx, cy, rx, ry, rot = 0) => { const a = (rot * Math.PI) / 180; const c = Math.cos(a); const s = Math.sin(a); const dx = f(2 * rx * c); const dy = f(2 * rx * s); return `M${f(cx - rx * c)} ${f(cy - rx * s)}a${f(rx)} ${f(ry)} ${rot} 1 0 ${dx} ${dy}a${f(rx)} ${f(ry)} ${rot} 1 0 ${-dx} ${-dy}Z`; };

export const Hydrant = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><path d={rP(-6, -22, 12, 22, 2) + rP(-9, -16, 18, 5)} fill="#D93A2B" /><path d="M-6 -22q6-9 12 0Z" fill="#B82E20" /></g>
);

// Canada Post community mailbox: grey cluster of boxes on a post.
export const Mailbox = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><path d={rP(-3, -20, 6, 20)} fill="#5B6068" /><path d={rP(-22, -60, 44, 42, 3)} fill="#8A929C" /><path d={[0, 1, 2].map((r) => [0, 1, 2].map((c) => rP(-18 + c * 13, -55 + r * 12, 10, 9)).join('')).join('')} fill="#C7CDD4" /><path d={rP(-22, -62, 44, 5)} fill="#D93A2B" /></g>
);

// TTC-style bus stop: tall pole with a sign and a small shelter-free bench.
export const BusStop = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><path d={rP(-2, -120, 4, 120)} fill="#6B7078" /><path d={rP(-18, -130, 36, 26, 3)} fill="#D93A2B" /><path d={rP(-12, -124, 24, 5)} fill="#fff" /><path d={rP(-12, -114, 24, 4)} fill="#fff" opacity=".8" /><path d={rP(22, -24, 46, 5)} fill="#7A5A3A" /><path d={rP(26, -19, 4, 19) + rP(60, -19, 4, 19)} fill="#4A4F5A" /></g>
);

// Infill townhouse block (3-6 units): dark brick, flat roofs, integral garages, narrow windows. One path per part (walls per brick colour, cornice, windows, garage surround, garage doors, door lines, entry doors per colour).
export const Townhouses = ({ x, y, s = 1, n = 5, seed = 1 }) => {
  const r = rnd(seed); const bricks = ['#5B4A44', '#7A5A48', '#4A4A52', '#6B4A3C']; const uw = 70; const x0 = -(n * uw) / 2; const base = bricks[Math.floor(r() * 4)];
  const wall = {}; const door = {}; let cor = ''; let win = ''; let sur = ''; let gar = ''; let lin = '';
  for (let i = 0; i < n; i++) {
    const ux = x0 + i * uw; const col = i % 2 ? bricks[Math.floor(r() * 4)] : base; const dc = i % 2 ? '#1F5BA8' : '#2E6E4F';
    wall[col] = (wall[col] || '') + rP(ux, -150, uw, 150); cor += rP(ux - 2, -156, uw + 4, 8);
    win += rP(ux + 8, -124, 22, 30) + rP(ux + 40, -124, 22, 30) + rP(ux + 8, -80, 22, 26); sur += rP(ux + 6, -52, 58, 52); gar += rP(ux + 10, -48, 32, 48);
    for (let k = 0; k < 4; k++) lin += rP(ux + 10, -44 + k * 11, 32, 1.5);
    door[dc] = (door[dc] || '') + rP(ux + 46, -44, 14, 44);
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Object.entries(wall).map(([c, d]) => <path key={c} d={d} fill={c} />)}
      <path d={cor} fill="#2E3238" /><path d={win} fill="#9CC3DE" /><path d={sur} fill="#D8D3C8" /><path d={gar} fill="#8A929C" /><path d={lin} fill="#6B7078" />
      {Object.entries(door).map(([c, d]) => <path key={c} d={d} fill={c} />)}
    </g>
  );
};

// Street frontage for a house row: lawn edge, sidewalk, boulevard (street trees, poles, hydrants, mailbox, bus stop), curb, road with parked cars. y = house base; s = row scale.
export function Street({ x0, x1, y, s = 1, seed = 1, sidewalk = '#CFCBC2', boul = '#5FA350', road = '#4B515C', pole = '#5A4632', wire = '#3A3F48', poles = true }) {
  const r = rnd(seed + 40); const len = x1 - x0 + 800;
  const furn = []; let i = 0;
  for (let px = x0 + 120 * s; px < x1; px += 380 * s + r() * 160 * s) {
    const k = i++ % 6;
    if (k === 1 || k === 4) furn.push(<Maple key={`t${px}`} x={px} y={y + 56 * s} s={s * 0.8} seed={i} crown={r() < 0.2 ? '#D9772B' : '#4F9D3A'} />);
    else if (k === 2) furn.push(<Hydrant key={`h${px}`} x={px} y={y + 54 * s} s={s * 1.1} />);
    else if (k === 3) furn.push(<Mailbox key={`m${px}`} x={px} y={y + 54 * s} s={s * 1.1} />);
    else if (k === 5) furn.push(<BusStop key={`b${px}`} x={px} y={y + 54 * s} s={s} />);
  }
  const pl = [];
  if (poles) for (let px = x0 + 220 * s; px < x1; px += 900 * s) pl.push(<g key={`p${px}`} transform={`translate(${px} ${y + 56 * s}) scale(${s})`}><HydroPole x={0} y={0} h={300} span={900} color={pole} wire={wire} /></g>);
  let jd = ''; for (let px = x0 - 300; px < x1 + 300; px += 46 * s) jd += `M${px} ${y + 22 * s}v${18 * s}`;
  return (
    <g>
      <rect x={x0 - 400} y={y + 22 * s} width={len} height={18 * s} fill={sidewalk} /><path d={jd} stroke="#A9A59B" strokeWidth="2" />
      <rect x={x0 - 400} y={y + 40 * s} width={len} height={18 * s} fill={boul} />
      <rect x={x0 - 400} y={y + 58 * s} width={len} height={6 * s} fill="#A9A59B" />
      <rect x={x0 - 400} y={y + 64 * s} width={len} height={52 * s} fill={road} />
      <path d={`M${x0 - 400} ${y + 93.5 * s}H${x0 - 400 + len}`} stroke="#E8C547" strokeOpacity=".85" strokeWidth={3 * s} strokeDasharray={`${60 * s} ${60 * s}`} />
      {pl}{furn}
    </g>
  );
}

// ---- Front yard pieces (world units, bottom centre at x,y unless noted) ----

// Interlocking-brick front walk from the door landing (y) to the sidewalk (y2), widening toward the viewer. Joints = one path.
export const FrontWalk = ({ x, y, y2, w1 = 110, w2 = 190, color = '#A98B7C', joint = '#7E6457' }) => {
  let rd = ''; const n = Math.max(3, Math.round((y2 - y) / 22));
  for (let i = 1; i < n; i++) { const f = (i / n) ** 0.9; const yy = y + (y2 - y) * f; const hw = (w1 + (w2 - w1) * f) / 2; rd += `M${x - hw} ${yy}H${x + hw}` + [...Array(6)].map((_, k) => { const px = x - hw + ((k + (i % 2 ? 0.5 : 0)) * 2 * hw) / 6; return `M${px} ${yy}l${(hw / 6) * 0.5} ${(y2 - y) / n}`; }).join(''); }
  return (
    <g>
      <path d={`M${x - w1 / 2} ${y}H${x + w1 / 2}L${x + w2 / 2} ${y2}H${x - w2 / 2}Z`} fill={color} />
      <path d={rd} stroke={joint} strokeWidth="1.2" opacity=".5" /><path d={`M${x} ${y}L${x} ${y2}`} stroke={joint} strokeWidth="1.2" opacity=".35" />
      <path d={`M${x - w1 / 2} ${y}L${x - w2 / 2} ${y2}M${x + w1 / 2} ${y}L${x + w2 / 2} ${y2}`} stroke="#D9D2C6" strokeWidth="4" opacity=".8" />
    </g>
  );
};

// Asphalt driveway from the garage door (y) down across the sidewalk and boulevard to the road (y2), widening, with a curb cut.
export const Driveway = ({ x, y, y2, w1 = 140, w2 = 240, color = '#6A6B6E', dim = 0 }) => (
  <g>
    <path d={`M${x - w1 / 2} ${y}H${x + w1 / 2}L${x + w2 / 2} ${y2}H${x - w2 / 2}Z`} fill={color} />
    <path d={`M${x - w1 / 2 + 6} ${y + 6}L${x - w2 / 2 + 10} ${y2 - 4}M${x + w1 / 2 - 6} ${y + 6}L${x + w2 / 2 - 10} ${y2 - 4}`} stroke="#6D727B" strokeWidth="3" opacity=".5" />
    <path d={`M${x - w2 / 2} ${y2 - 22}H${x + w2 / 2}`} stroke="#8A8F98" strokeWidth="3" opacity=".7" />
    {dim > 0 && <path d={`M${x - w1 / 2} ${y}H${x + w1 / 2}L${x + w2 / 2} ${y2}H${x - w2 / 2}Z`} fill="#0B2038" opacity={dim} />}
  </g>
);

// Raised bed with a stone-block edge: hostas, ornamental grass, a rounded cedar, a few yellow irises. One path per part (stones, 3 hosta tones, grass blades, iris stems, iris heads).
export const GardenBed = ({ x, y, w = 170, seed = 1, cedar = true }) => {
  const r = rnd(seed + 11); let blocks = ''; for (let px = x - w / 2; px < x + w / 2; px += 26) blocks += rP(px, y, 25, 18, 2);
  let h0 = ''; let h1 = ''; let h2 = ''; let gr = ''; let st = ''; let ir = '';
  for (let i = 0; i < 5; i++) { const px = x - w / 2 + 18 + i * ((w - 36) / 4); const k = i % 3;
    if (k === 0) { h0 += oP(px, y - 10, 26, 14); h1 += oP(px - 8, y - 18, 14, 22, -20); h2 += oP(px + 9, y - 18, 14, 22, 20); }
    else if (k === 1) { for (const o of [-14, -7, 0, 7, 14]) gr += `M${px + o / 2} ${y}Q${px + o} ${y - 26} ${px + o * 1.8} ${y - 40 - r() * 10}`; }
    else { for (const o of [-8, 0, 8]) { st += `M${px + o} ${y}V${y - 34}`; ir += dP(px + o, y - 38, 5); } }
  }
  return (
    <g>
      <rect x={x - w / 2 - 4} y={y - 6} width={w + 8} height="10" fill="#4A3524" />
      <path d={h0} fill="#3E8E3A" /><path d={h1} fill="#4FA844" /><path d={h2} fill="#5DB84F" />
      <path d={gr} stroke="#4F9D3A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d={st} stroke="#3E8E3A" strokeWidth="3" strokeLinecap="round" fill="none" /><path d={ir} fill="#F2C61F" />
      {cedar && <g><ellipse cx={x + w / 2 - 22} cy={y - 48} rx="26" ry="54" fill="#2E6B3F" /><ellipse cx={x + w / 2 - 28} cy={y - 56} rx="15" ry="36" fill="#3E8A50" /></g>}
      <path d={blocks} fill="#A8A398" stroke="#7C776D" strokeWidth="1" />
    </g>
  );
};

// Wood privacy fence with a gate; lattice adds the diamond-lattice top rail common on GTA lots. Boards = one path, lattice = one path, rails = one path.
export const SideFence = ({ x, y, w = 160, h = 130, color = '#8A6A47', lattice = false }) => {
  let boards = ''; for (let px = x - w / 2; px < x + w / 2; px += 14) boards += rP(px, y - h, 13, h);
  let lat = ''; if (lattice) for (let px = x - w / 2; px < x + w / 2; px += 12) lat += `M${px} ${y - h - 28}l12 28M${px + 12} ${y - h - 28}l-12 28`;
  return (<g>{lattice && <rect x={x - w / 2} y={y - h - 28} width={w} height="28" fill="#2B2420" opacity=".35" />}{lattice && <path d={lat} stroke="#6E5236" strokeWidth="2" />}<path d={boards} fill={color} stroke="#6E5236" strokeWidth="1" /><path d={rP(x - w / 2, y - h - 6, w, 6) + rP(x - w / 4, y - h * 0.6, w / 2, 5)} fill="#6E5236" /><rect x={x - 3} y={y - h} width="3" height={h} fill="#4A3524" opacity=".6" /></g>);
};

// Neighbouring house wall (partial). kind 'siding' = vinyl siding over a brick base with downspout and gas meter; 'brick' = brick with a sloped roof. side +1 grows rightward from x, -1 leftward. One path per part (course lines, cream trim, downspout, meter boxes, pipes).
export const Neighbour = ({ x, y, w = 360, side = 1, kind = 'siding', roof = '#4F4A48', dim = 0 }) => {
  const x0 = side > 0 ? x : x - w; const siding = kind === 'siding'; const wall = siding ? '#CFCBC0' : '#8E4B3E'; const top = y - 270; let lines = '';
  for (let yy = -270; yy < (siding ? -86 : 0); yy += siding ? 13 : 14) lines += `M${x0} ${y + yy}h${w}`;
  const away = side > 0 ? x0 + w : x0; const near = side > 0 ? x0 : x0 + w;
  const gx = side > 0 ? x0 + 28 : x0 + w - 28 - 34; const wx = x0 + w * 0.34;
  return (
    <g>
      <rect x={x0} y={top} width={w} height="270" fill={wall} /><path d={lines} stroke={siding ? '#AFAB9F' : '#6E3224'} strokeWidth="1.4" opacity={siding ? 0.75 : 0.3} />
      {siding && <g><rect x={x0} y={y - 86} width={w} height="86" fill="#9A5B3C" /><path d={[0, 1, 2, 3, 4, 5].map((k) => `M${x0} ${y - 80 + k * 14}h${w}`).join('')} stroke="#6E3224" strokeWidth="1" opacity=".3" /></g>}
      {/* roof: sloped wedge rising away from the hero house, with fascia */}
      <path d={`M${near} ${top} L${side > 0 ? near + w * 0.55 : near - w * 0.55} ${top - 86} L${away + (side > 0 ? 12 : -12)} ${top - 86} L${away + (side > 0 ? 12 : -12)} ${top}Z`} fill={roof} />
      {/* cream trim: fascia + window frame (+ brick-base cap on siding) = one path */}
      <path d={rP(x0 - 12, top - 6, w + 24, 11) + rP(wx, y - 215, 70, 78) + (siding ? rP(x0, y - 90, w, 5) : '')} fill="#F6F1E7" />
      <rect x={wx + 5} y={y - 210} width="60" height="68" fill="#A9C4D8" /><path d={`M${wx + 35} ${y - 210}V${y - 142}M${wx + 5} ${y - 176}H${wx + 65}`} stroke="#F6F1E7" strokeWidth="3" />
      {/* downspout */}
      <path d={rP(near + (side > 0 ? 8 : -20), top, 12, 270) + rP(near + (side > 0 ? 6 : -22), y - 10, 16, 10)} fill="#C9C5BB" />
      {siding && <g><path d={rP(near + (side > 0 ? 70 : -86), top - 36, 9, 40)} fill="#8A8F96" /><path d={rP(near + (side > 0 ? 66 : -90), top - 40, 17, 7)} fill="#6B7078" /><path d={rP(gx + 44, y - 70, 20, 26, 2) + rP(gx, y - 150, 34, 40, 3)} fill="#8A929C" /><path d={rP(gx + 6, y - 144, 22, 14)} fill="#C7CDD4" /><path d={rP(gx + 14, y - 110, 6, 104) + rP(gx + 14, y - 30, 26, 6)} fill="#5B6068" /></g>}
      {dim > 0 && <rect x={x0 - 12} y={top - 86} width={w + 24} height="356" fill="#0B2038" opacity={dim} />}
    </g>
  );
};

// Tall deciduous woodlot behind the houses. One path per layer (trunks, dark crowns, light crowns).
export const Woodlot = ({ x, y, w = 600, seed = 1, h = 300, dark = '#2F6B3A', light = '#4F9D4A' }) => {
  const r = rnd(seed + 3); let tr = ''; let dk = ''; let lt = '';
  for (let px = x; px < x + w; px += 70 + r() * 40) { const hh = h * (0.6 + r() * 0.5); tr += rP(px - 6, y - hh * 0.6, 12, hh * 0.6); dk += oP(px, y - hh * 0.8, 70 + r() * 25, hh * 0.45); lt += oP(px - 18, y - hh * 0.9, 46, hh * 0.28); }
  return <g><path d={tr} fill="#4A3524" /><path d={dk} fill={dark} /><path d={lt} fill={light} opacity=".8" /></g>;
};

// ---- Street in FRONT of the lawn (nearest the viewer): sidewalk, boulevard, curb, road. Draw the strips first, the props last. ----
// off = distance from the ground line G down to the sidewalk's top edge.
export function NearStreet({ x0 = -400, x1, G, off = 170, dim = 0, boul = '#5FA350', road = '#4B515C', sidewalk = '#CFCBC2' }) {
  const y = G + off; const len = x1 - x0; let jd = ''; for (let px = x0; px < x1; px += 60) jd += `M${px} ${y}v26`;
  return (
    <g>
      <rect x={x0} y={y} width={len} height="26" fill={sidewalk} /><path d={jd} stroke="#A9A59B" strokeWidth="2" />
      <rect x={x0} y={y + 26} width={len} height="26" fill={boul} />
      <rect x={x0} y={y + 52} width={len} height="8" fill="#A9A59B" />
      <rect x={x0} y={y + 60} width={len} height="700" fill={road} />
      <path d={`M${x0} ${y + 114.5}H${x1}`} stroke="#E8C547" strokeOpacity=".85" strokeWidth="5" strokeDasharray="80 70" />
      {dim > 0 && <rect x={x0} y={y} width={len} height="760" fill="#0B2038" opacity={dim} />}
    </g>
  );
}

// Props standing on the boulevard and road: parked cars, street trees, hydrants, mailboxes, bus stop, hydro poles. gaps = x ranges to keep clear (driveway mouth, walk). poleXs = pole positions.
export function NearStreetProps({ x0 = -400, x1, G, off = 170, seed = 2, gaps = [], poleXs = [], splitX = 1960, pole = '#5A4632', wire = '#3A3F48', dim = 0 }) {
  const y = G + off; const r = rnd(seed + 7);
  const free = (px, pad = 70) => !gaps.some(([a, b]) => px > a - pad && px < b + pad);
  const furn = []; let i = 0;
  for (let px = x0 + 140; px < x1; px += 380 + r() * 160) {
    const k = i++ % 6;
    if (!free(px)) continue;
    if (k === 1 || k === 4) furn.push(<Maple key={`t${px}`} x={px} y={y + 50} s={1.1} seed={i} crown={r() < 0.2 ? '#D9772B' : '#4F9D3A'} />);
    else if (k === 2) furn.push(<Hydrant key={`h${px}`} x={px} y={y + 48} s={1.5} />);
    else if (k === 3) furn.push(<Mailbox key={`m${px}`} x={px} y={y + 48} s={1.5} />);
    else if (k === 5) furn.push(<BusStop key={`b${px}`} x={px} y={y + 48} s={1.3} />);
  }
  const poles = poleXs.map((px) => <HydroPole key={`p${px}`} x={px} y={y + 46} h={420} span={px < splitX ? -900 : 900} color={pole} wire={wire} />);
  return (
    <g>
      {poles}{furn}
      {dim > 0 && <rect x={x0} y={G - 400} width={x1 - x0} height="1400" fill="#0B2038" opacity={dim * 0.6} />}
    </g>
  );
}
