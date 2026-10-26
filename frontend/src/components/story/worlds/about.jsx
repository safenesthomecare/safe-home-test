import { C, Cloud, Hills, House, PSW, Patient, Tree, Grass, Flowers, SteppingStones, Fence } from './art';
import { TONES, SilBush } from './light';

// About: 9:30 AM (SHOTS.md #2). Eye-level medium-wide with a slow push-in. PSW on the left third walks up to the doorway; the patient waits on the right third, facing her. Door interior is one flat warm shape; dark hedge fills the bottom-left corner.
const W = 1800; const H = 1400; const G = 1000;
const T = TONES.midmorning;

export const ABOUT_WORLD = {
  w: W, h: H, side: 'right',
  layers: [
    { id: 'sky', depth: 0.12, node: (<g><rect x="-3000" y="-1500" width={W + 6000} height={H + 3000} fill="#E6F1FA" /><rect x="-3000" y="600" width={W + 6000} height="1500" fill="#F6E6D0" /><Cloud x={400} y={-120} s={1.3} /><Cloud x={1350} y={-190} s={1} o={0.85} /></g>) },
    { id: 'far', depth: 0.4, node: (<g transform="translate(-1200 0)"><Hills y={440} w={W + 2400} color="#C4E2B4" amp={50} phase={1} trees={12} /><Hills y={500} w={W + 2400} color="#9CCB8C" amp={40} phase={3} trees={9} /></g>) },
    { id: 'plane', depth: 1, node: (
      <g>
        <rect x="-300" y={G} width={W + 600} height="600" fill="#6DB35F" />
        <path d={`M760 ${G + 6} L1040 ${G + 6} L1180 ${H + 40} L620 ${H + 40}Z`} fill="#E9D3A8" />
        <Tree x={170} y={G + 16} s={1.1} />
        <Tree x={1690} y={G + 12} s={0.9} />
        <Fence x={420} y={G + 10} w={300} h={72} />
        <Fence x={1390} y={G + 10} w={300} h={72} />
        <House x={900} y={G} s={2.4} open door={C.orange} />
        <rect x="690" y={G} width="420" height="26" rx="6" fill="#D9CDBA" /><rect x="740" y={G + 26} width="320" height="22" rx="6" fill="#CFC2AE" />
        <SteppingStones x={900} y={G + 160} w={260} n={4} seed={6} />
        <Flowers x={590} y={G + 20} w={200} n={9} seed={21} /><Flowers x={1210} y={G + 20} w={200} n={9} seed={22} />
        <Grass x={300} y={G + 80} w={500} seed={3} /><Grass x={1500} y={G + 84} w={500} seed={8} />
        <Flowers x={330} y={G + 120} w={420} n={10} seed={5} /><Flowers x={1480} y={G + 130} w={420} n={10} seed={15} />
        <rect x="878" y="706" width="104" height="276" rx="16" fill={T.accent} />
        <Patient view="f34" x={936} y={G} s={1.15} face={-1} pose="open" />
        <g className="sw-walk" style={{ '--wx': 170, '--wy': -50 }}>
          <PSW view="b34" x={330} y={G + 110} s={1.15} pose="stand" walk />
          <rect x="292" y={G - 20} width="36" height="44" rx="8" fill={C.navy} />
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
    { sec: 'top', xN: 718, x: 698, y: 944, z: 0.8 },
    { sec: 1, xN: 718, x: 712, y: 935, z: 0.85 },
    { sec: 'end', xN: 718, x: 725, y: 927, z: 0.9 },
  ],
};
