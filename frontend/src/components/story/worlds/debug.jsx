// Test world: a coordinate grid with labelled stations. Only shown when window.__SN_DEBUG_WORLD is set (QA).
const stations = [[600, 350, 'A'], [600, 1100, 'B'], [1500, 1800, 'C'], [2400, 2500, 'D'], [1200, 3200, 'E']];
export const DEBUG_WORLD = {
  w: 3000, h: 3800,
  layers: [
    { id: 'sky', depth: 0.2, node: <rect x="-200" y="-200" width="3400" height="4200" fill="#BFE0F5" /> },
    { id: 'hills', depth: 0.6, node: <g fill="#7FB77E"><circle cx="500" cy="900" r="500" /><circle cx="2200" cy="2200" r="600" /></g> },
    { id: 'plane', depth: 1, node: (
      <g>
        {Array.from({ length: 16 }, (_, i) => <line key={`v${i}`} x1={i * 200} y1="0" x2={i * 200} y2="3800" stroke="#00263F" strokeOpacity=".12" />)}
        {Array.from({ length: 20 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 200} x2="3000" y2={i * 200} stroke="#00263F" strokeOpacity=".12" />)}
        {stations.map(([x, y, l]) => (
          <g key={l}><circle cx={x} cy={y} r="120" fill="#FFC72C" /><text x={x} y={y + 40} fontSize="120" fontWeight="800" textAnchor="middle" fill="#00263F">{l}</text></g>
        ))}
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', x: 600, y: 350, z: 1 },
    { sec: 1, x: 600, y: 1100, z: 1 },
    { sec: 2, x: 1500, y: 1800, z: 0.8 },
    { sec: 3, x: 2400, y: 2500, z: 1 },
    { sec: 'end', x: 1200, y: 3200, z: 0.6 },
  ],
};
