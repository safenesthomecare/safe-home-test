// GTA street-level kit: road, curb, grass boulevard, sidewalk, street trees, hydro poles, hydrants, mailboxes, bus stops, parked cars, infill townhouses.
// Elevation view like the rest of the worlds: (x, y) is the bottom centre, y grows downward.
import { Maple, HydroPole } from './gta';

const rnd = (seed) => { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };

export const Hydrant = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x="-6" y="-22" width="12" height="22" rx="2" fill="#D93A2B" /><rect x="-9" y="-16" width="18" height="5" fill="#D93A2B" /><path d="M-6 -22q6-9 12 0Z" fill="#B82E20" /></g>
);

// Canada Post community mailbox: grey cluster of boxes on a post.
export const Mailbox = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x="-3" y="-20" width="6" height="20" fill="#5B6068" /><rect x="-22" y="-60" width="44" height="42" rx="3" fill="#8A929C" />{[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-18 + c * 13} y={-55 + r * 12} width="10" height="9" fill="#C7CDD4" />))}<rect x="-22" y="-62" width="44" height="5" fill="#D93A2B" /></g>
);

// TTC-style bus stop: tall pole with a sign and a small shelter-free bench.
export const BusStop = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x="-2" y="-120" width="4" height="120" fill="#6B7078" /><rect x="-18" y="-130" width="36" height="26" rx="3" fill="#D93A2B" /><rect x="-12" y="-124" width="24" height="5" fill="#fff" /><rect x="-12" y="-114" width="24" height="4" fill="#fff" opacity=".8" /><rect x="22" y="-24" width="46" height="5" fill="#7A5A3A" /><rect x="26" y="-19" width="4" height="19" fill="#4A4F5A" /><rect x="60" y="-19" width="4" height="19" fill="#4A4F5A" /></g>
);

// Infill townhouse block (3-6 units): dark brick, flat roofs, integral garages, narrow windows.
export const Townhouses = ({ x, y, s = 1, n = 5, seed = 1 }) => {
  const r = rnd(seed); const bricks = ['#5B4A44', '#7A5A48', '#4A4A52', '#6B4A3C']; const uw = 70; const x0 = -(n * uw) / 2; const base = bricks[Math.floor(r() * 4)];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: n }, (_, i) => {
        const ux = x0 + i * uw; const col = i % 2 ? bricks[Math.floor(r() * 4)] : base;
        return (
          <g key={i}>
            <rect x={ux} y="-150" width={uw} height="150" fill={col} /><rect x={ux - 2} y="-156" width={uw + 4} height="8" fill="#2E3238" />
            <rect x={ux + 8} y="-124" width="22" height="30" fill="#9CC3DE" /><rect x={ux + 40} y="-124" width="22" height="30" fill="#9CC3DE" />
            <rect x={ux + 8} y="-80" width="22" height="26" fill="#9CC3DE" /><rect x={ux + 6} y="-52" width="58" height="52" fill="#D8D3C8" />
            <rect x={ux + 10} y="-48" width="32" height="48" fill="#8A929C" />{[0, 1, 2, 3].map((k) => <rect key={k} x={ux + 10} y={-44 + k * 11} width="32" height="1.5" fill="#6B7078" />)}
            <rect x={ux + 46} y="-44" width="14" height="44" fill={i % 2 ? '#1F5BA8' : '#2E6E4F'} />
          </g>
        );
      })}
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
  const joints = []; for (let px = x0 - 300; px < x1 + 300; px += 46 * s) joints.push(<rect key={px} x={px} y={y + 22 * s} width="2" height={18 * s} fill="#A9A59B" />);
  return (
    <g>
      <rect x={x0 - 400} y={y + 22 * s} width={len} height={18 * s} fill={sidewalk} />{joints}
      <rect x={x0 - 400} y={y + 40 * s} width={len} height={18 * s} fill={boul} />
      <rect x={x0 - 400} y={y + 58 * s} width={len} height={6 * s} fill="#A9A59B" />
      <rect x={x0 - 400} y={y + 64 * s} width={len} height={52 * s} fill={road} />
      {Array.from({ length: Math.ceil(len / (120 * s)) }, (_, k) => <rect key={k} x={x0 - 400 + k * 120 * s} y={y + 92 * s} width={60 * s} height={3 * s} fill="#E8C547" opacity=".85" />)}
      {pl}{furn}
    </g>
  );
}

// ---- Front yard pieces (world units, bottom centre at x,y unless noted) ----

// Interlocking-brick front walk from the door landing (y) to the sidewalk (y2), widening toward the viewer.
export const FrontWalk = ({ x, y, y2, w1 = 110, w2 = 190, color = '#A98B7C', joint = '#7E6457' }) => {
  const rows = []; const n = Math.max(3, Math.round((y2 - y) / 22));
  for (let i = 1; i < n; i++) { const f = (i / n) ** 0.9; const yy = y + (y2 - y) * f; const hw = (w1 + (w2 - w1) * f) / 2; rows.push(<path key={i} d={`M${x - hw} ${yy}H${x + hw}` + [...Array(6)].map((_, k) => { const px = x - hw + ((k + (i % 2 ? 0.5 : 0)) * 2 * hw) / 6; return `M${px} ${yy}l${(hw / 6) * 0.5} ${(y2 - y) / n}`; }).join('')} stroke={joint} strokeWidth="1.2" opacity=".5" />); }
  return (
    <g>
      <path d={`M${x - w1 / 2} ${y}H${x + w1 / 2}L${x + w2 / 2} ${y2}H${x - w2 / 2}Z`} fill={color} />
      {rows}<path d={`M${x} ${y}L${x} ${y2}`} stroke={joint} strokeWidth="1.2" opacity=".35" />
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

// Raised bed with a stone-block edge: hostas, ornamental grass, a rounded cedar, a few yellow irises.
export const GardenBed = ({ x, y, w = 170, seed = 1, cedar = true }) => {
  const r = rnd(seed + 11); const blocks = []; for (let px = x - w / 2; px < x + w / 2; px += 26) blocks.push(<rect key={px} x={px} y={y} width="25" height="18" rx="2" fill="#A8A398" stroke="#7C776D" strokeWidth="1" />);
  const plants = [];
  for (let i = 0; i < 5; i++) { const px = x - w / 2 + 18 + i * ((w - 36) / 4); const k = i % 3;
    if (k === 0) plants.push(<g key={i}><ellipse cx={px} cy={y - 10} rx="26" ry="14" fill="#3E8E3A" /><ellipse cx={px - 8} cy={y - 18} rx="14" ry="22" fill="#4FA844" transform={`rotate(-20 ${px - 8} ${y - 18})`} /><ellipse cx={px + 9} cy={y - 18} rx="14" ry="22" fill="#5DB84F" transform={`rotate(20 ${px + 9} ${y - 18})`} /></g>);
    else if (k === 1) plants.push(<g key={i} stroke="#4F9D3A" strokeWidth="3" strokeLinecap="round" fill="none">{[-14, -7, 0, 7, 14].map((o) => <path key={o} d={`M${px + o / 2} ${y} Q${px + o} ${y - 26} ${px + o * 1.8} ${y - 40 - r() * 10}`} />)}</g>);
    else plants.push(<g key={i}><g stroke="#3E8E3A" strokeWidth="3" strokeLinecap="round">{[-8, 0, 8].map((o) => <path key={o} d={`M${px + o} ${y} V${y - 34}`} />)}</g>{[-8, 0, 8].map((o) => <circle key={o} cx={px + o} cy={y - 38} r="5" fill="#F2C61F" />)}</g>);
  }
  return (
    <g>
      <rect x={x - w / 2 - 4} y={y - 6} width={w + 8} height="10" fill="#4A3524" />
      {plants}
      {cedar && <g><ellipse cx={x + w / 2 - 22} cy={y - 48} rx="26" ry="54" fill="#2E6B3F" /><ellipse cx={x + w / 2 - 28} cy={y - 56} rx="15" ry="36" fill="#3E8A50" /></g>}
      {blocks}
    </g>
  );
};

// Wood privacy fence with a gate; lattice adds the diamond-lattice top rail common on GTA lots.
export const SideFence = ({ x, y, w = 160, h = 130, color = '#8A6A47', lattice = false }) => {
  const boards = []; for (let px = x - w / 2; px < x + w / 2; px += 14) boards.push(<rect key={px} x={px} y={y - h} width="13" height={h} fill={color} stroke="#6E5236" strokeWidth="1" />);
  const lat = []; if (lattice) for (let px = x - w / 2; px < x + w / 2; px += 12) lat.push(<path key={px} d={`M${px} ${y - h - 28}l12 28M${px + 12} ${y - h - 28}l-12 28`} stroke="#6E5236" strokeWidth="2" />);
  return (<g>{lattice && <rect x={x - w / 2} y={y - h - 28} width={w} height="28" fill="#2B2420" opacity=".35" />}{lat}{boards}<rect x={x - w / 2} y={y - h - 6} width={w} height="6" fill="#6E5236" /><rect x={x - w / 4} y={y - h * 0.6} width={w / 2} height="5" fill="#6E5236" /><rect x={x - 3} y={y - h} width="3" height={h} fill="#4A3524" opacity=".6" /></g>);
};

// Neighbouring house wall (partial). kind 'siding' = vinyl siding over a brick base with downspout and gas meter; 'brick' = brick with a sloped roof. side +1 grows rightward from x, -1 leftward.
export const Neighbour = ({ x, y, w = 360, side = 1, kind = 'siding', roof = '#4F4A48', dim = 0 }) => {
  const x0 = side > 0 ? x : x - w; const siding = kind === 'siding'; const wall = siding ? '#CFCBC0' : '#8E4B3E'; const top = y - 270; const lines = [];
  for (let yy = -270; yy < (siding ? -86 : 0); yy += siding ? 13 : 14) lines.push(<path key={yy} d={`M${x0} ${y + yy}h${w}`} stroke={siding ? '#AFAB9F' : '#6E3224'} strokeWidth="1.4" opacity={siding ? 0.75 : 0.3} />);
  const away = side > 0 ? x0 + w : x0; const near = side > 0 ? x0 : x0 + w;
  const gx = side > 0 ? x0 + 28 : x0 + w - 28 - 34;
  return (
    <g>
      <rect x={x0} y={top} width={w} height="270" fill={wall} />{lines}
      {siding && <g><rect x={x0} y={y - 86} width={w} height="86" fill="#9A5B3C" /><rect x={x0} y={y - 90} width={w} height="5" fill="#F6F1E7" />{[0, 1, 2, 3, 4, 5].map((k) => <path key={k} d={`M${x0} ${y - 80 + k * 14}h${w}`} stroke="#6E3224" strokeWidth="1" opacity=".3" />)}</g>}
      {/* roof: sloped wedge rising away from the hero house, with fascia */}
      <path d={`M${near} ${top} L${side > 0 ? near + w * 0.55 : near - w * 0.55} ${top - 86} L${away + (side > 0 ? 12 : -12)} ${top - 86} L${away + (side > 0 ? 12 : -12)} ${top}Z`} fill={roof} />
      <rect x={x0 - 12} y={top - 6} width={w + 24} height="11" fill="#F6F1E7" />
      {/* window with trim */}
      <rect x={x0 + w * 0.34} y={y - 215} width="70" height="78" fill="#F6F1E7" /><rect x={x0 + w * 0.34 + 5} y={y - 210} width="60" height="68" fill="#A9C4D8" /><path d={`M${x0 + w * 0.34 + 35} ${y - 210}V${y - 142}M${x0 + w * 0.34 + 5} ${y - 176}H${x0 + w * 0.34 + 65}`} stroke="#F6F1E7" strokeWidth="3" />
      {/* downspout */}
      <rect x={near + (side > 0 ? 8 : -20)} y={top} width="12" height="270" fill="#C9C5BB" /><rect x={near + (side > 0 ? 6 : -22)} y={y - 10} width="16" height="10" fill="#C9C5BB" />
      {siding && <g><rect x={near + (side > 0 ? 70 : -86)} y={top - 36} width="9" height="40" fill="#8A8F96" /><rect x={near + (side > 0 ? 66 : -90)} y={top - 40} width="17" height="7" fill="#6B7078" /><rect x={gx + 44} y={y - 70} width="20" height="26" rx="2" fill="#8A929C" /><rect x={gx} y={y - 150} width="34" height="40" rx="3" fill="#8A929C" /><rect x={gx + 6} y={y - 144} width="22" height="14" fill="#C7CDD4" /><rect x={gx + 14} y={y - 110} width="6" height="104" fill="#5B6068" /><rect x={gx + 14} y={y - 30} width="26" height="6" fill="#5B6068" /></g>}
      {dim > 0 && <rect x={x0 - 12} y={top - 86} width={w + 24} height="356" fill="#0B2038" opacity={dim} />}
    </g>
  );
};

// Tall deciduous woodlot behind the houses.
export const Woodlot = ({ x, y, w = 600, seed = 1, h = 300, dark = '#2F6B3A', light = '#4F9D4A' }) => {
  const r = rnd(seed + 3); const crowns = [];
  for (let px = x; px < x + w; px += 70 + r() * 40) { const hh = h * (0.6 + r() * 0.5); crowns.push(<g key={px}><rect x={px - 6} y={y - hh * 0.6} width="12" height={hh * 0.6} fill="#4A3524" /><ellipse cx={px} cy={y - hh * 0.8} rx={70 + r() * 25} ry={hh * 0.45} fill={dark} /><ellipse cx={px - 18} cy={y - hh * 0.9} rx="46" ry={hh * 0.28} fill={light} opacity=".8" /></g>); }
  return <g>{crowns}</g>;
};

// ---- Street in FRONT of the lawn (nearest the viewer): sidewalk, boulevard, curb, road. Draw the strips first, the props last. ----
// off = distance from the ground line G down to the sidewalk's top edge.
export function NearStreet({ x0 = -400, x1, G, off = 170, dim = 0, boul = '#5FA350', road = '#4B515C', sidewalk = '#CFCBC2' }) {
  const y = G + off; const len = x1 - x0; const joints = []; for (let px = x0; px < x1; px += 60) joints.push(<rect key={px} x={px} y={y} width="2" height="26" fill="#A9A59B" />);
  return (
    <g>
      <rect x={x0} y={y} width={len} height="26" fill={sidewalk} />{joints}
      <rect x={x0} y={y + 26} width={len} height="26" fill={boul} />
      <rect x={x0} y={y + 52} width={len} height="8" fill="#A9A59B" />
      <rect x={x0} y={y + 60} width={len} height="700" fill={road} />
      {Array.from({ length: Math.ceil(len / 150) }, (_, k) => <rect key={k} x={x0 + k * 150} y={y + 112} width="80" height="5" fill="#E8C547" opacity=".85" />)}
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
