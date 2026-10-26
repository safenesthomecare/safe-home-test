import { C, Sky, Wall, Win, Sofa, Armchair, Table, Mug, Frame, Lamp, Plant, Chair, Plate, Person, Rug, Cushion, Kettle, Books, Clock, FruitBowl, SKIN } from './art';

// Testimonials 2:00 PM (tea in the living room) and FAQ 4:00 PM (care plan at the kitchen table). Both pull back from the group to the room.
const W = 2200; const H = 1400; const F = 1060;

export const TESTIMONIALS_WORLD = {
  w: W, h: H, side: 'right',
  layers: [
    { id: 'back', depth: 0.3, node: <Sky w={W} h={H} top="#FFF0D6" bot="#FFD9A8" id="ts-sky" /> },
    { id: 'room', depth: 1, node: (
      <g transform="translate(300 0)">
        <Wall x={-600} y={0} w={W + 1200} h={H} color="#F8E7D2" floorH={H - F} floor="#C9A27A" paper="dots" />
        <Win x={1180} y={330} w={320} h={360} sky="#FFE0A8" sun curtain="#E8A0B4" />
        <Frame x={250} y={360} w={90} h={110} c={C.rose} /><Frame x={360} y={400} w={70} h={90} c={C.blue} /><Frame x={480} y={350} w={80} h={100} c={C.teal} />
        <Clock x={760} y={420} r={40} />
        <Rug x={760} y={F + 78} w={820} h={50} color={C.teal} />
        <Lamp x={140} y={F} lit /><Plant x={1680} y={F} s={1.5} />
        <Sofa x={560} y={F + 10} w={520} color={C.plum} />
        <Cushion x={390} y={F - 56} color={C.orange} /><Cushion x={720} y={F - 56} color={C.rose} />
        <Person x={460} y={F - 14} s={1.15} face={1} pose="sit" skin={SKIN.a} hair="#2B2220" top={C.teal} outfit="scrubs" hairStyle="bun" />
        <Person x={610} y={F - 14} s={1.1} face={1} pose="sit" skin={SKIN.c} hair="#2B2220" top={C.orange} bottom="#3B4A63" hairStyle="curly" />
        <Table x={900} y={F + 30} w={190} h={70} color={C.brownL} /><Mug x={860} y={F - 40} c={C.blue} /><Mug x={940} y={F - 40} c={C.orange} />
        <Armchair x={1100} y={F + 10} face={-1} color={C.rose} />
        <Person x={1090} y={F - 6} s={1.1} face={-1} pose="sit" skin={SKIN.b} hair="#DADDE3" top="#7A4A9E" bottom="#4A4A6A" outfit="cardigan" hairStyle="wavy" elder glasses />
        <Person x={780} y={F + 70} s={0.62} face={1} skin={SKIN.a} hair="#4A3427" top={C.blue} bottom="#3B4A63" pose="wave" />
        <Books x={1600} y={F - 4} s={0.9} />
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', x: 1180, xN: 1100, y: 850, z: 1 },
    { sec: 2, x: 1210, xN: 1100, y: 830, z: 0.9 },
    { sec: 'end', x: 1230, xN: 1100, y: 820, z: 0.85 },
  ],
};

export const FAQ_WORLD = {
  w: W, h: H, side: 'left',
  layers: [
    { id: 'back', depth: 0.3, node: <Sky w={W} h={H} top="#FFE6C9" bot="#FFC48A" id="fq-sky" /> },
    { id: 'room', depth: 1, node: (
      <g transform="translate(300 0)">
        <Wall x={-600} y={0} w={W + 1200} h={H} color="#FFF2DE" floorH={H - F} floor="#C9A27A" />
        <Win x={260} y={330} w={300} h={340} sky="#FFC98F" sun curtain="#F6C79C" />
        <Clock x={1420} y={440} r={80} />
        <Frame x={700} y={330} w={90} h={110} c={C.teal} /><Frame x={820} y={360} w={70} h={90} c={C.rose} />
        <g>
          <rect x="1566" y="366" width="150" height="700" rx="12" fill="#000" opacity=".1" />
          <rect x="1560" y="360" width="150" height="700" rx="12" fill="#F4F6F8" stroke="#C9CED6" strokeWidth="3" />
          <rect x="1560" y="360" width="150" height="8" rx="4" fill="#fff" opacity=".8" />
          <path d="M1560 600 H1710" stroke="#C9CED6" strokeWidth="4" />
          <rect x="1576" y="450" width="8" height="90" rx="4" fill="#9AA3AE" /><rect x="1576" y="640" width="8" height="140" rx="4" fill="#9AA3AE" />
          <rect x="1620" y="400" width="34" height="42" rx="3" fill={C.yellow} transform="rotate(-4 1637 421)" /><rect x="1660" y="470" width="30" height="30" rx="3" fill={C.rose} /><circle cx="1650" cy="530" r="12" fill={C.blue} />
        </g>
        <Rug x={900} y={F + 100} w={900} h={52} color={C.rose} />
        <Table x={900} y={F + 40} w={560} h={140} color={C.brownL} />
        <g>
          <rect x="806" y={F - 108} width="154" height="12" rx="3" fill="#fff" stroke="#C9CED6" strokeWidth="1.2" /><rect x="818" y={F - 120} width="130" height="12" rx="3" fill={C.blueL} stroke="#9CC6E6" strokeWidth="1.2" />
          <path d={`M830 ${F - 114} h86 M830 ${F - 104} h60`} stroke="#9AA3AE" strokeWidth="2" strokeLinecap="round" />
        </g>
        <Mug x={1030} y={F - 100} c={C.rose} />
        <FruitBowl x={1100} y={F - 100} s={0.8} />
        <Books x={720} y={F - 100} s={0.8} />
        <Chair x={640} y={F + 40} /><Chair x={1160} y={F + 40} face={-1} />
        <Person x={640} y={F + 40} s={1.2} face={1} pose="sit" skin={SKIN.a} hair="#3A2A22" top={C.orange} bottom="#3B4A63" hairStyle="wavy" />
        <Person x={1160} y={F + 40} s={1.2} face={-1} pose="sit" skin={SKIN.b} hair="#2B2220" top={C.teal} outfit="scrubs" hairStyle="bun" />
        <Person x={900} y={F - 20} s={1.1} face={1} pose="stand" skin={SKIN.b} hair="#DADDE3" top="#7A4A9E" bottom="#4A4A6A" outfit="cardigan" hairStyle="wavy" elder glasses />
        <Lamp x={1470} y={F} lit /><Plant x={130} y={F} s={1.4} />
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', x: 1120, xN: 1200, y: 850, z: 1 },
    { sec: 2, x: 1100, xN: 1200, y: 830, z: 0.9 },
    { sec: 'end', x: 1090, xN: 1200, y: 820, z: 0.85 },
  ],
};
