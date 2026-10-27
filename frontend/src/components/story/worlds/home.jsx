import { asset } from '../../../lib/asset';
import { C, Cloud, Skyline, LakeHaze, SuburbRow, NearStreet, Woodlot, Neighbour, SideFence, FrontWalk, Driveway, GardenBed, BrickColonial, Tree, PSW, Patient } from './art';
import { TONES, SilBush } from './light';

// Home: 8:00 AM (SHOTS.md #1). Opens low, looking up at the nest on the tree branch (nest at the golden point, tree on the left third, empty sky top-right, dark leaf mass as the left foreground).
// Then the camera cranes down and back across the field to the house: PSW on the left third, patient on the right third, dark hedge across the bottom.
const W = 2800; const H = 1560; const G = 1040;
const T = TONES.morning;

export const HOME_WORLD = {
  w: W, h: H, heroFade: true, side: 'right',
  layers: [
    { id: 'sky', depth: 0.12, node: (<g><rect x="-3000" y="-1500" width={W + 6000} height={H + 3000} fill={T.key} /><rect x="-3000" y="700" width={W + 6000} height="1500" fill="#F6E6D0" /><Cloud x={-40} y={-95} s={1.2} /><Cloud x={100} y={-195} s={1} o={0.8} /></g>) },
    { id: 'far', depth: 0.3, node: (<g transform="translate(-1200 0)"><LakeHaze y={330} /><Skyline y={420} w={3300} tint="#9DB4C8" lit="#C3D4E2" tx={0.657} /><rect x="-200" y="422" width="3800" height="800" fill="#B9D0C0" /></g>) },
    { id: 'mid', depth: 0.6, node: (<g transform="translate(-1200 0)"><SuburbRow x0={240} x1={3900} y={720} s={0.5} seed={4} haze={0.35} simple /><SuburbRow x0={240} x1={3900} y={850} s={0.75} seed={9} haze={0.12} /></g>) },
    { id: 'plane', depth: 1, node: (
      <g>
        <rect x="-400" y={G} width={W + 800} height={H - G + 400} fill="#6DB35F" />
        <NearStreet x0={-400} x1={W + 400} G={G} off={170} />
        <Woodlot x={1380} y={G - 120} w={520} seed={8} h={470} dark="#2A5E36" light="#4F9D4A" /><Woodlot x={2660} y={G - 110} w={700} seed={4} h={330} />
        <Tree x={760} y={G + 20} s={1.5} />
        <image href={asset('/brand/symbol.svg')} x="950" y="236" width="360" height="288" />
        <Neighbour x={1610} y={G + 6} w={420} side={-1} kind="siding" />
        <SideFence x={1664} y={G + 6} w={90} h={120} lattice />
        <Neighbour x={2560} y={G + 6} w={420} side={1} kind="brick" />
        <SideFence x={2510} y={G + 6} w={90} h={120} lattice />
        <FrontWalk x={1960} y={G + 18} y2={G + 170} w1={110} w2={190} />
        <Driveway x={2316} y={G + 6} y2={G + 232} w1={140} w2={260} />
        <BrickColonial x={1960} y={G + 6} s={1.25} />
        <GardenBed x={1790} y={G + 28} w={190} seed={1} cedar={false} />
        <GardenBed x={2134} y={G + 28} w={170} seed={2} />
        <g className="sw-walk" style={{ '--wx': 480, '--wy': -80 }}>
          <PSW view="b34" x={1480} y={G + 190} s={0.82} pose="stand" walk />
          <rect x="1448" y={G + 64} width="34" height="40" rx="8" fill={C.navy} transform="translate(-8 4)" />
        </g>
        <Patient view="f34" x={2050} y={G + 24} s={0.8} face={-1} pose="wave" />
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
    { sec: 'end', x: 1920, y: 865, yN: 840, z: 1 },
  ],
};
