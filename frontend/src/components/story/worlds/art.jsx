// Flat drawing kit for the story worlds. Every helper draws in world units; (x, y) is the bottom centre unless noted.
export const C = {
  blue: '#1F5BA8', blueD: '#164580', blueL: '#BFE0F5', orange: '#F47C20', orangeD: '#C85E10', cream: '#FFF9F2', sand: '#F3E3CC',
  brown: '#8A5A2B', brownD: '#5A3213', brownL: '#B98350', leaf: '#4F9D3A', leafD: '#2E7D32', leafL: '#8BD450', yellow: '#FFC72C', glow: '#FFD66B',
  navy: '#00263F', teal: '#14A89B', tealD: '#0F766E', rose: '#E0577F', plum: '#6B46C1', grey: '#C9CED6', white: '#FFFFFF',
};
export const SKIN = { a: '#F6D3B3', b: '#D9A67C', c: '#A9744F', d: '#7B4F34' };

let gid = 0;
export function Sky({ w, h, top, bot, id }) {
  const k = id || `sk${gid++}`;
  return (
    <g>
      <defs><linearGradient id={k} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bot} /></linearGradient></defs>
      <rect x="-1500" y="-1500" width={w + 3000} height={h + 3000} fill={`url(#${k})`} />
    </g>
  );
}

export const Cloud = ({ x, y, s = 1, o = 0.9 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity={o}>
    <ellipse cx="0" cy="0" rx="90" ry="26" /><ellipse cx="-34" cy="-18" rx="40" ry="26" /><ellipse cx="22" cy="-26" rx="48" ry="32" />
  </g>
);

export const Sun = ({ x, y, r = 60, color = '#FFD66B' }) => (
  <g><circle cx={x} cy={y} r={r * 2.2} fill={color} opacity=".22" /><circle cx={x} cy={y} r={r * 1.5} fill={color} opacity=".3" /><circle cx={x} cy={y} r={r} fill={color} /></g>
);

export const Hills = ({ y, w, color, amp = 90, phase = 0 }) => {
  const pts = []; for (let i = 0; i <= 8; i++) pts.push(`${(w / 8) * i} ${y - Math.sin(i * 1.3 + phase) * amp}`);
  return <path d={`M-200 ${y + 600} L-200 ${y} ${pts.map((p) => `L${p}`).join(' ')} L${w + 1500} ${y} L${w + 1500} ${y + 900}Z`} fill={color} />;
};

export function Tree({ x, y, s = 1, leaf = C.leaf, leafL = C.leafL, trunk = C.brown }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-46 0 C-34 -190 -58 -300 -34 -430 L34 -430 C58 -300 34 -190 46 0Z" fill={trunk} />
      <path d="M-46 0 C-40 -60 -44 -90 -38 -130 L-12 -130 C-18 -80 -10 -40 -8 0Z" fill={C.brownD} opacity=".25" />
      <path d="M10 -300 C90 -330 170 -350 250 -360 L252 -338 C170 -322 100 -300 22 -262Z" fill={trunk} />
      <g fill={leaf}><circle cx="-110" cy="-470" r="120" /><circle cx="40" cy="-560" r="150" /><circle cx="190" cy="-470" r="115" /><circle cx="-10" cy="-440" r="120" /></g>
      <g fill={leafL} opacity=".55"><circle cx="-60" cy="-540" r="70" /><circle cx="110" cy="-590" r="60" /><circle cx="230" cy="-500" r="50" /></g>
      <g fill={leafL}><ellipse cx="170" cy="-330" rx="22" ry="10" transform="rotate(-30 170 -330)" /><ellipse cx="205" cy="-312" rx="20" ry="9" transform="rotate(20 205 -312)" /></g>
    </g>
  );
}

export function House({ x, y, s = 1, wall = '#2E6DB8', roof = C.orange, door = C.orange, lit = false, open = false, glass = C.blueL }) {
  const win = lit ? C.glow : glass;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-210" y="-200" width="420" height="200" fill={wall} />
      <rect x="-210" y="-30" width="420" height="30" fill="#000" opacity=".12" />
      <path d="M-250 -196 L0 -350 L250 -196Z" fill={roof} />
      <rect x="110" y="-330" width="40" height="90" fill={C.brownD} />
      {[-140, 70].map((wx) => (
        <g key={wx}>
          <rect x={wx - 6} y="-150" width="88" height="88" rx="6" fill="#fff" />
          <rect x={wx} y="-144" width="76" height="76" rx="3" fill={win} />
          <path d={`M${wx + 38} -144 V-68 M${wx} -106 H${wx + 76}`} stroke="#fff" strokeWidth="5" />
        </g>
      ))}
      <rect x="-42" y="-136" width="84" height="136" rx="8" fill="#fff" />
      {open
        ? <rect x="-34" y="-128" width="68" height="128" rx="5" fill="#FFE2A8" />
        : (<g><rect x="-34" y="-128" width="68" height="128" rx="5" fill={door} /><circle cx="18" cy="-62" r="5" fill={C.yellow} /></g>)}
      <rect x="-60" y="-8" width="120" height="10" rx="3" fill={C.grey} />
    </g>
  );
}

// People: origin at the feet (or the seat when sitting). face = 1 right, -1 left.
export function Person({ x, y, s = 1, face = 1, skin = SKIN.a, hair = '#4A3427', top = C.teal, bottom = '#2B3A55', pose = 'stand', walk = false, bald = false, scale = 1 }) {
  const sit = pose === 'sit';
  const dy = sit ? 40 : 0;
  const arm = (props) => <rect width="12" height="68" rx="6" fill={top} {...props} />;
  return (
    <g transform={`translate(${x} ${y}) scale(${face * s * scale} ${s * scale})`}>
      {sit ? (
        <g><rect x="-14" y="-46" width="64" height="18" rx="9" fill={bottom} /><rect x="38" y="-46" width="14" height="46" rx="6" fill={bottom} /><ellipse cx="50" cy="0" rx="14" ry="6" fill="#333" /></g>
      ) : (
        <g>
          <rect className={walk ? 'sw-leg sw-leg-a' : undefined} x="-17" y="-82" width="15" height="82" rx="7" fill={bottom} />
          <rect className={walk ? 'sw-leg sw-leg-b' : undefined} x="2" y="-82" width="15" height="82" rx="7" fill={bottom} />
          <ellipse cx="-8" cy="0" rx="12" ry="5" fill="#333" /><ellipse cx="11" cy="0" rx="12" ry="5" fill="#333" />
        </g>
      )}
      <g transform={`translate(0 ${dy})`}>
        {pose === 'stand' && <g>{arm({ x: -32, y: -156 })}{arm({ x: 20, y: -156 })}</g>}
        {pose === 'wave' && <g>{arm({ x: -32, y: -156 })}<g transform="rotate(-155 26 -150)">{arm({ x: 20, y: -156 })}</g><circle cx="46" cy="-228" r="9" fill={skin} /></g>}
        {pose === 'open' && <g><g transform="rotate(60 -26 -150)">{arm({ x: -32, y: -156 })}</g><g transform="rotate(-60 26 -150)">{arm({ x: 20, y: -156 })}</g></g>}
        {(pose === 'hold' || sit) && <g transform="rotate(-78 20 -148)">{arm({ x: 14, y: -152 })}</g>}
        <rect x="-24" y="-164" width="48" height="92" rx="18" fill={top} />
        <rect x="-8" y="-172" width="16" height="14" rx="6" fill={skin} />
        <circle cx="0" cy="-190" r="20" fill={skin} />
        {!bald && <path d="M-21 -192 a21 21 0 0 1 42 0 q-21 -12 -42 0z" fill={hair} />}
        <circle cx="7" cy="-189" r="1.8" fill="#3a2a22" /><circle cx="-4" cy="-189" r="1.8" fill="#3a2a22" />
        <path d="M-3 -181 q5 5 10 0" stroke="#7a3b2e" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

// Interior pieces
export const Wall = ({ x, y, w, h, color, floorH = 120, floor = C.brownL }) => (
  <g><rect x={x} y={y} width={w} height={h} fill={color} /><rect x={x} y={y + h - floorH} width={w} height={floorH} fill={floor} /><rect x={x} y={y + h - floorH - 10} width={w} height="10" fill="#000" opacity=".1" /></g>
);
export const Win = ({ x, y, w = 200, h = 220, sky = C.blueL, sun = false }) => (
  <g>
    <rect x={x - 10} y={y - 10} width={w + 20} height={h + 20} rx="8" fill="#fff" />
    <rect x={x} y={y} width={w} height={h} fill={sky} />
    {sun && <circle cx={x + w * 0.7} cy={y + h * 0.3} r="30" fill="#FFE59A" />}
    <path d={`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`} stroke="#fff" strokeWidth="8" />
  </g>
);
export const Frame = ({ x, y, w = 70, h = 90, c = C.rose }) => (
  <g><rect x={x} y={y} width={w} height={h} rx="4" fill={C.brownD} /><rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} fill={c} opacity=".75" /><circle cx={x + w / 2} cy={y + h * 0.42} r={w * 0.17} fill="#fff" opacity=".8" /></g>
);
export const Table = ({ x, y, w = 300, h = 120, color = C.brown }) => (
  <g><rect x={x - w / 2} y={y - h} width={w} height="18" rx="6" fill={color} /><rect x={x - w / 2 + 20} y={y - h + 18} width="16" height={h - 18} fill={C.brownD} /><rect x={x + w / 2 - 36} y={y - h + 18} width="16" height={h - 18} fill={C.brownD} /></g>
);
export const Chair = ({ x, y, face = 1, color = C.orangeD }) => (
  <g transform={`translate(${x} ${y}) scale(${face} 1)`}><rect x="-30" y="-60" width="60" height="14" rx="6" fill={color} /><rect x="-30" y="-130" width="12" height="74" rx="5" fill={color} /><rect x="-26" y="-46" width="10" height="46" fill={C.brownD} /><rect x="16" y="-46" width="10" height="46" fill={C.brownD} /></g>
);
export const Sofa = ({ x, y, w = 360, color = C.plum }) => (
  <g><rect x={x - w / 2} y={y - 110} width={w} height="96" rx="20" fill={color} /><rect x={x - w / 2 - 20} y={y - 90} width="40" height="86" rx="16" fill={color} /><rect x={x + w / 2 - 20} y={y - 90} width="40" height="86" rx="16" fill={color} /><rect x={x - w / 2 + 24} y={y - 70} width={w - 48} height="56" rx="12" fill="#fff" opacity=".18" /></g>
);
export const Armchair = ({ x, y, face = 1, color = C.rose }) => (
  <g transform={`translate(${x} ${y}) scale(${face} 1)`}><rect x="-60" y="-140" width="52" height="130" rx="22" fill={color} /><rect x="-60" y="-70" width="130" height="58" rx="18" fill={color} /><rect x="40" y="-100" width="32" height="90" rx="14" fill={color} opacity=".85" /></g>
);
export const Bed = ({ x, y, w = 420, color = C.blue }) => (
  <g><rect x={x - w / 2} y={y - 90} width={w} height="70" rx="10" fill={C.brownD} /><rect x={x - w / 2 + 10} y={y - 120} width={w - 20} height="50" rx="14" fill="#fff" /><rect x={x - w / 2 + 40} y={y - 100} width={w - 50} height="60" rx="12" fill={color} /><rect x={x - w / 2 - 6} y={y - 160} width="22" height="140" rx="8" fill={C.brownD} /></g>
);
export const Counter = ({ x, y, w = 420, color = C.sand }) => (
  <g><rect x={x - w / 2} y={y - 170} width={w} height="170" fill="#FFF" opacity=".92" /><rect x={x - w / 2} y={y - 176} width={w} height="16" rx="5" fill={color} /><rect x={x - w / 2 + 10} y={y - 160} width="130" height="146" fill={C.blueL} opacity=".5" /></g>
);
export const Mug = ({ x, y, c = C.orange }) => (<g><rect x={x - 12} y={y - 22} width="24" height="22" rx="4" fill={c} /><path d={`M${x + 12} ${y - 16} q12 0 0 12`} stroke={c} strokeWidth="4" fill="none" /></g>);
export const Lamp = ({ x, y, lit = true }) => (
  <g>{lit && <circle cx={x} cy={y - 150} r="110" fill={C.glow} opacity=".22" />}<rect x={x - 5} y={y - 130} width="10" height="130" fill={C.brownD} /><path d={`M${x - 36} ${y - 130} L${x - 22} ${y - 190} H${x + 22} L${x + 36} ${y - 130}Z`} fill={lit ? C.glow : C.sand} /></g>
);
export const Plant = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M-26 0 L-20 -50 H20 L26 0Z" fill={C.orangeD} /><g fill={C.leaf}><ellipse cx="-20" cy="-80" rx="12" ry="34" transform="rotate(-25 -20 -80)" /><ellipse cx="0" cy="-92" rx="12" ry="40" /><ellipse cx="20" cy="-80" rx="12" ry="34" transform="rotate(25 20 -80)" /></g></g>
);
export const Plate = ({ x, y }) => (<g><ellipse cx={x} cy={y} rx="34" ry="8" fill="#fff" /><ellipse cx={x - 8} cy={y - 5} rx="14" ry="6" fill={C.leafL} /><ellipse cx={x + 10} cy={y - 5} rx="12" ry="6" fill={C.orange} /></g>);
export const Pillbox = ({ x, y }) => (<g><rect x={x - 38} y={y - 22} width="76" height="22" rx="5" fill="#fff" />{[-30, -18, -6, 6, 18, 30].map((dx) => <rect key={dx} x={x + dx - 4.5} y={y - 18} width="9" height="14" rx="2" fill={dx % 12 ? C.blueL : C.plum} opacity=".8" />)}</g>);
