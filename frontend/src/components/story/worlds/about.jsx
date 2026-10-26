import { C, Sky, Cloud, Hills, House, Person, Tree, Grass, Flowers, SteppingStones, Fence, SKIN } from './art';

// About: 8:20 AM. At the front door. The caregiver walks up the path as you scroll and is welcomed by the client's daughter.
const W = 1800; const H = 1400; const G = 1000;

export const ABOUT_WORLD = {
  w: W, h: H, side: 'right',
  layers: [
    { id: 'sky', depth: 0.12, node: (<g><Sky w={W} h={H} top="#BFE0F5" bot="#FFEBD3" id="ab-sky" /><Cloud x={400} y={200} s={1.3} /><Cloud x={1350} y={140} s={1} o={0.85} /></g>) },
    { id: 'far', depth: 0.4, node: (<g><Hills y={470} w={W} color="#B6DBA4" amp={50} phase={1} trees={8} /><Hills y={530} w={W} color="#97C985" amp={40} phase={3} trees={6} /></g>) },
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
        <Person x={936} y={G} s={1.15} face={-1} skin={SKIN.a} hair="#3A2A22" top={C.orange} bottom="#3B4A63" pose="open" hairStyle="wavy" />
        <g className="sw-walk" style={{ '--wx': 150, '--wy': -50 }}>
          <Person x={560} y={G + 110} s={1.15} walk skin={SKIN.b} hair="#2B2220" top={C.teal} bottom="#2B3A55" pose="stand" />
          <rect x="522" y={G - 20} width="36" height="44" rx="8" fill={C.navy} />
        </g>
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', xN: 880, x: 1180, y: 720, z: 1 },
    { sec: 1, xN: 840, x: 1180, y: 770, z: 1 },
    { sec: 'end', xN: 800, x: 1180, y: 820, z: 1 },
  ],
};
