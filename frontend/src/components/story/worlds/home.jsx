import { asset } from '../../../lib/asset';
import { C, Sky, Cloud, Sun, Hills, Tree, House, Person, SKIN } from './art';

// Home: 8:00 AM. The SafeNest nest sits on a tree branch. Scrolling pulls the camera back and across the field to a house; the caregiver walks up the path.
const W = 2400; const H = 1400; const G = 1040;

export const HOME_WORLD = {
  w: W, h: H, heroFade: true, side: 'left',
  layers: [
    { id: 'sky', depth: 0.12, node: (<g><Sky w={W} h={H} top="#BFE0F5" bot="#FFE3C2" id="hm-sky" /><Sun x="260" y="520" r="54" color="#FFC76B" /><Cloud x="900" y="170" s="1.3" /><Cloud x="1700" y="260" s="1" o=".8" /><Cloud x="2150" y="140" s=".9" /></g>) },
    { id: 'far', depth: 0.45, node: (<g><Hills y="860" w={W} color="#A9D39A" amp="70" phase="0.6" /><Hills y="930" w={W} color="#86BF7A" amp="50" phase="2" /></g>) },
    { id: 'plane', depth: 1, node: (
      <g>
        <rect x="-300" y={G} width={W + 600} height="500" fill="#6DB35F" />
        <path d={`M980 ${G + 4} C1200 ${G + 30} 1500 ${G + 2} 1840 ${G + 6} L1880 ${G + 6} L1900 ${G + 70} C1500 ${G + 90} 1150 ${G + 120} 900 ${G + 90}Z`} fill="#E9D3A8" />
        <Tree x="760" y={G + 20} s="1.5" />
        <image href={asset('/brand/symbol.svg')} x="930" y="236" width="360" height="288" />
        <House x="1960" y={G + 6} s="1.25" lit />
        <g fill="#fff" opacity=".9">{[300, 520, 1500, 1620, 2240].map((fx, i) => <circle key={fx} cx={fx} cy={G + 60 + (i % 3) * 22} r="7" />)}</g>
        <g fill={C.orange} opacity=".9">{[380, 1560, 2140].map((fx, i) => <circle key={fx} cx={fx} cy={G + 100 + i * 12} r="6" />)}</g>
        <g className="sw-walk" style={{ '--wx': 520, '--wy': 0 }}>
          <Person x="1230" y={G + 62} s="0.82" walk skin={SKIN.b} hair="#2B2220" top={C.teal} bottom="#2B3A55" pose="stand" />
          <rect x="1198" y={G - 64} width="34" height="40" rx="8" fill={C.navy} transform="translate(-8 4)" />
        </g>
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', x: 1110, y: 522, yN: 630, z: 0.92 },
    { sec: 1, x: 900, y: 790, z: 0.64 },
    { sec: 2, x: 1263, y: 800, z: 0.64 },
    { sec: 3, x: 1610, y: 800, z: 0.8 },
    { sec: 'end', x: 1610, y: 790, z: 0.8 },
  ],
};
