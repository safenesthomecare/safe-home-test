import { asset } from '../../../lib/asset';
import { C, Sky, Cloud, Sun, Hills, Tree, House, Person, SKIN, Grass, Flowers, SteppingStones, Fence } from './art';

// Home: 8:00 AM. The SafeNest nest sits on a tree branch. Scrolling pulls the camera back and across the field to a house; the caregiver walks up the path and a neighbour waves from the porch.
const W = 2400; const H = 1400; const G = 1040;

export const HOME_WORLD = {
  w: W, h: H, heroFade: true, side: 'left',
  layers: [
    { id: 'sky', depth: 0.12, node: (<g><Sky w={W} h={H} top="#BFE0F5" bot="#FFE3C2" id="hm-sky" /><Sun x={260} y={520} r={54} color="#FFC76B" /><Cloud x={900} y={170} s={1.3} /><Cloud x={1700} y={260} s={1} o={0.8} /><Cloud x={2150} y={140} s={0.9} /></g>) },
    { id: 'far', depth: 0.45, node: (<g><Hills y={540} w={W} color="#A9D39A" amp={70} phase={0.6} trees={9} /><Hills y={600} w={W} color="#86BF7A" amp={50} phase={2} trees={7} /></g>) },
    { id: 'plane', depth: 1, node: (
      <g>
        <rect x="-300" y={G} width={W + 600} height="500" fill="#6DB35F" />
        <path d={`M980 ${G + 4} C1200 ${G + 30} 1500 ${G + 2} 1840 ${G + 6} L1880 ${G + 6} L1900 ${G + 70} C1500 ${G + 90} 1150 ${G + 120} 900 ${G + 90}Z`} fill="#E9D3A8" />
        <SteppingStones x={1390} y={G + 52} w={900} n={9} seed={4} />
        <Grass x={300} y={G + 8} w={600} seed={2} /><Grass x={1100} y={G + 118} w={500} seed={5} h={26} /><Grass x={2260} y={G + 10} w={300} seed={7} />
        <Flowers x={420} y={G + 74} w={520} n={14} seed={3} /><Flowers x={1560} y={G + 128} w={560} n={12} seed={9} />
        <Tree x={760} y={G + 20} s={1.5} />
        <image href={asset('/brand/symbol.svg')} x="950" y="236" width="360" height="288" />
        <Tree x={2310} y={G + 14} s={0.8} />
        <Fence x={1560} y={G + 12} w={320} h={70} />
        <House x={1960} y={G + 6} s={1.25} lit />
        <Flowers x={1960} y={G + 22} w={360} n={10} seed={12} />
        <g className="sw-walk" style={{ '--wx': 520, '--wy': 0 }}>
          <Person x={1230} y={G + 62} s={0.82} walk skin={SKIN.b} hair="#2B2220" top={C.teal} bottom="#2B3A55" pose="stand" />
          <rect x="1198" y={G - 64} width="34" height="40" rx="8" fill={C.navy} transform="translate(-8 4)" />
        </g>
        <Person x={2112} y={G + 8} s={0.8} face={-1} elder outfit="cardigan" hairStyle="bun" skin={SKIN.a} hair="#E8E4DE" top={C.rose} bottom="#4A4A5A" pose="wave" />
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', x: 1110, y: 522, yN: 630, z: 0.92 },
    { sec: 1, x: 900, y: 790, z: 0.64 },
    { sec: 2, x: 1263, y: 800, z: 0.64 },
    { sec: 3, x: 1610, xN: 1800, y: 800, z: 0.8 },
    { sec: 'end', x: 1610, xN: 1920, y: 790, z: 0.8 },
  ],
};
