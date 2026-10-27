import { C, Cloud, Skyline, LakeHaze, SuburbRow, NearStreet, Woodlot, Neighbour, SideFence, FrontWalk, Driveway, GardenBed, BrickColonial, PSW, Patient, Tree } from './art';
import { TONES, SilBush } from './light';

// About: 9:30 AM (SHOTS.md #2). Eye-level medium-wide with a slow push-in. PSW on the left third walks up to the doorway; the patient waits on the right third, facing her. Door interior is one flat warm shape; dark hedge fills the bottom-left corner.
const W = 1800; const H = 1400; const G = 1000;
const T = TONES.midmorning;

export const ABOUT_WORLD = {
  w: W, h: H, side: 'right',
  layers: [
    { id: 'sky', depth: 0.12, node: (<g><rect x="-3000" y="-1500" width={W + 6000} height={H + 3000} fill="#E6F1FA" /><rect x="-3000" y="600" width={W + 6000} height="1500" fill="#F6E6D0" /><Cloud x={400} y={-120} s={1.3} /><Cloud x={1350} y={-190} s={1} o={0.85} /></g>) },
    { id: 'far', depth: 0.3, node: (<g transform="translate(-1200 0)"><LakeHaze y={470} /><Skyline y={560} w={4200} tint="#A3B8CB" lit="#C9D8E5" tx={0.48} seed={5} /><rect x="0" y="562" width="4200" height="600" fill="#BFD3C2" /></g>) },
    { id: 'mid', depth: 0.6, node: (<g transform="translate(-1200 0)"><SuburbRow x0={0} x1={4200} y={720} s={0.5} seed={7} haze={0.35} /><SuburbRow x0={100} x1={4200} y={850} s={0.75} seed={12} haze={0.12} /></g>) },
    { id: 'plane', depth: 1, node: (
      <g>
        <rect x="-300" y={G} width={W + 600} height="600" fill="#6DB35F" />
        <NearStreet x0={-300} x1={W + 300} G={G} off={150} />
        <Woodlot x={-100} y={G - 150} w={500} seed={6} h={230} />
        <Neighbour x={340} y={G + 6} w={340} side={-1} kind="siding" />
        <SideFence x={372} y={G + 6} w={60} h={120} lattice />
        <Tree x={170} y={G + 16} s={1.1} />
        <FrontWalk x={900} y={G + 43} y2={G + 150} w1={220} w2={320} />
        <Driveway x={1579} y={G + 6} y2={G + 210} w1={274} w2={400} />
        <BrickColonial x={900} y={G} s={2.4} open door={C.orange} />
        <g transform={`translate(590 ${G + 48}) scale(2)`}><GardenBed x={0} y={0} w={190} seed={3} cedar={false} /></g>
        <g transform={`translate(1230 ${G + 48}) scale(2)`}><GardenBed x={0} y={0} w={170} seed={4} /></g>
        <rect x="878" y="706" width="104" height="276" rx="16" fill={T.accent} />
        <Patient view="f34" x={936} y={G} s={1.15} face={-1} pose="open" />
        <g className="sw-walk" style={{ '--wx': 570, '--wy': -60 }}>
          <PSW view="b34" x={330} y={G + 168} s={1.15} pose="stand" walk />
          <rect x="292" y={G + 38} width="36" height="44" rx="8" fill={C.navy} />
        </g>
      </g>
    ) },
    // Foreground (depth 1.3): dark hedge in the bottom-left corner. Nothing important in it.
    { id: 'fg', depth: 1.3, node: (
      <g fill={T.dark}>
        <rect x="260" y="1575" width="560" height="260" />
        <SilBush x={400} y={1575} w={380} h={150} color={T.dark} /><SilBush x={700} y={1575} w={360} h={120} color={T.dark} /><SilBush x={940} y={1575} w={300} h={90} color={T.dark} />
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', xN: 718, x: 698, y: 745, z: 0.68 },
    { sec: 1, xN: 718, x: 712, y: 745, z: 0.68 },
    { sec: 'end', xN: 718, x: 725, y: 745, z: 0.68 },
  ],
};
