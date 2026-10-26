import { asset } from '../../../lib/asset';
import { C, Sky, Hills, Tree, House, Person, SKIN } from './art';

// Contact: 5:30 PM. Handover at the door at dusk. The caregiver waves goodbye and walks off; the camera pulls back to the house and the nest.
const W = 2800; const H = 1400; const G = 1040;

export const CONTACT_WORLD = {
  w: W, h: H, side: 'right',
  layers: [
    { id: 'sky', depth: 0.12, node: (<g><Sky w={W} h={H} top="#2B3A6B" bot="#F4A261" id="ct-sky" /><circle cx="260" cy="760" r="110" fill="#FFB85C" opacity=".35" /><circle cx="260" cy="760" r="60" fill="#FFD28A" />
      {[[500, 120], [900, 220], [1300, 90], [1800, 180], [2200, 110], [700, 320], [2000, 340]].map(([sx, sy]) => <circle key={`${sx}${sy}`} cx={sx} cy={sy} r="3" fill="#fff" opacity=".8" />)}</g>) },
    { id: 'far', depth: 0.45, node: (<g><Hills y="880" w={W} color="#5A7BA0" amp="60" phase="0.3" /><Hills y="940" w={W} color="#3F6A62" amp="40" phase="2.2" /></g>) },
    { id: 'plane', depth: 1, node: (
      <g>
        <rect x="-300" y={G} width={W + 600} height="500" fill="#3E7A52" />
        <path d={`M980 ${G + 4} C1200 ${G + 30} 1500 ${G + 2} 1840 ${G + 6} L1880 ${G + 6} L1900 ${G + 70} C1500 ${G + 90} 1150 ${G + 120} 900 ${G + 90}Z`} fill="#C9A87C" />
        <Tree x="760" y={G + 20} s="1.5" leaf="#2E6B3F" leafL="#4F9D5A" trunk="#6B4423" />
        <image href={asset('/brand/symbol.svg')} x="930" y="236" width="360" height="288" />
        <circle cx="1110" cy="400" r="190" fill={C.glow} opacity=".12" />
        <House x="1960" y={G + 6} s="1.25" lit wall="#27549A" door="#E56E12" />
        <circle cx="1960" cy={G - 120} r="260" fill={C.glow} opacity=".12" />
        <Person x="1990" y={G + 6} s="0.9" face={-1} skin={SKIN.a} hair="#3A2A22" top={C.orange} bottom="#3B4A63" pose="wave" />
        <Person x="1930" y={G + 6} s="0.76" face={-1} skin={SKIN.b} hair="#DADDE3" top="#7A4A9E" bottom="#4A4A6A" pose="wave" />
        <g className="sw-walk" style={{ '--wx': -560, '--wy': 8 }}>
          <Person x="1780" y={G + 66} s="0.82" face={-1} walk skin={SKIN.b} hair="#2B2220" top={C.teal} bottom="#2B3A55" pose="stand" />
        </g>
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', x: 2210, y: 830, z: 1 },
    { sec: 1, x: 2100, y: 820, z: 0.8 },
    { sec: 'end', x: 1687, y: 800, z: 0.64 },
  ],
};
