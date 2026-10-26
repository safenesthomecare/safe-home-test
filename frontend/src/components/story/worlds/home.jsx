import { asset } from '../../../lib/asset';
import { C, Cloud, Hills, Tree, House, PSW, Patient, Grass, Flowers, SteppingStones, Fence } from './art';
import { TONES, SilBush } from './light';

// Home: 8:00 AM (SHOTS.md #1). Opens low, looking up at the nest on the tree branch (nest at the golden point, tree on the left third, empty sky top-right, dark leaf mass as the left foreground).
// Then the camera cranes down and back across the field to the house: PSW on the left third, patient on the right third, dark hedge across the bottom.
const W = 2800; const H = 1560; const G = 1040;
const T = TONES.morning;

export const HOME_WORLD = {
  w: W, h: H, heroFade: true, side: 'right',
  layers: [
    { id: 'sky', depth: 0.12, node: (<g><rect x="-3000" y="-1500" width={W + 6000} height={H + 3000} fill={T.key} /><rect x="-3000" y="700" width={W + 6000} height="1500" fill="#F6E6D0" /><Cloud x={-40} y={-95} s={1.2} /><Cloud x={100} y={-195} s={1} o={0.8} /></g>) },
    { id: 'far', depth: 0.45, node: (<g transform="translate(-1200 0)"><Hills y={420} w={W + 2400} color="#C4E2B4" amp={70} phase={0.6} trees={14} /><Hills y={480} w={W + 2400} color="#9CCB8C" amp={50} phase={2} trees={10} /></g>) },
    { id: 'plane', depth: 1, node: (
      <g>
        <rect x="-400" y={G} width={W + 800} height={H - G + 400} fill="#6DB35F" />
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
        <g className="sw-walk" style={{ '--wx': 440, '--wy': 0 }}>
          <PSW x={1230} y={G + 62} s={0.82} pose="stand" walk />
          <rect x="1198" y={G - 64} width="34" height="40" rx="8" fill={C.navy} transform="translate(-8 4)" />
        </g>
        <Patient x={2150} y={G + 8} s={0.8} face={-1} pose="wave" />
      </g>
    ) },
    // Foreground (depth 1.3, nothing important in it): leaf mass on the left third at the opening shot, hedge band across the bottom at the closing shot.
    { id: 'fg', depth: 1.3, node: (
      <g fill={T.dark}>
        <ellipse cx="930" cy="330" rx="190" ry="250" /><ellipse cx="890" cy="590" rx="170" ry="220" /><ellipse cx="930" cy="840" rx="150" ry="190" /><ellipse cx="1010" cy="90" rx="150" ry="170" />
        <path d="M1090 380 q70 20 90 80 q-70 0 -100 -40Z M1080 640 q80 0 110 60 q-80 10 -120 -30Z M1060 200 q70 -10 100 40 q-70 20 -110 -10Z" />
        <rect x="1400" y="1690" width="2100" height="260" />
        <SilBush x={1800} y={1700} w={420} h={90} color={T.dark} /><SilBush x={2300} y={1700} w={380} h={80} color={T.dark} /><SilBush x={2800} y={1700} w={440} h={95} color={T.dark} /><SilBush x={3250} y={1700} w={360} h={70} color={T.dark} />
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', x: 1020, y: 449, yN: 630, xN: 1110, z: 1.2 },
    { sec: 1, x: 900, y: 790, z: 0.64 },
    { sec: 2, x: 1263, y: 800, z: 0.64 },
    { sec: 3, x: 1610, xN: 1800, y: 800, z: 0.8 },
    { sec: 'end', x: 1920, y: 1049, yN: 1020, z: 0.8 },
  ],
};
