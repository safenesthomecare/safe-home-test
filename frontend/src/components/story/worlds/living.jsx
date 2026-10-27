import { C, Sky, Wall, Win, Sofa, Armchair, Table, Mug, Frame, Lamp, Plant, Chair, PSW, Patient, Rug, Cushion, Books, Clock, FruitBowl } from './art';
import { TONES, LightShaft, SilLamp, SilPlant } from './light';

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
        <LightShaft x={1060} y={690} w={240} h={420} skew={-420} color="#FFE9A8" o={0.55} />
        <Sofa x={560} y={F + 10} w={520} color={C.plum} />
        <Cushion x={400} y={F - 56} color={C.orange} />
        <Patient view="f34" x={650} y={F - 14} s={1.1} face={1} pose="sit" />
        <Table x={850} y={F + 30} w={190} h={70} color={C.brownL} /><Mug x={810} y={F - 40} c={C.blue} /><Mug x={890} y={F - 40} c={C.orange} />
        <Armchair x={1060} y={F + 10} face={-1} color={C.rose} />
        <PSW view="f34" x={1060} y={F - 14} s={1.15} face={-1} pose="sit" />
        <Books x={1600} y={F - 4} s={0.9} />
      </g>
    ) },
    // Foreground (depth 1.3): dark lamp and plant in the bottom-right corner. Nothing important in it.
    { id: 'fg', depth: 1.3, node: (
      <g>
        <SilPlant x={2090} y={1620} h={300} color={TONES.tea.dark} /><SilLamp x={1975} y={1620} h={380} color={TONES.tea.dark} />
      </g>
    ) },
  ],
  // One still frame: tea and conversation.
  shot: { x: 1420, y: 905, z: 0.88, xN: 1150 },

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
        <LightShaft x={120} y={670} w={280} h={430} skew={380} color="#FFE2A8" o={0.5} />
        <Chair x={1160} y={F + 40} face={-1} />
        <Patient view="f34" x={1160} y={F + 40} s={1.2} face={-1} pose="sit" />
        <PSW view="b34" x={400} y={F + 130} s={1.7} face={1} pose="point" />
        <Lamp x={1470} y={F} lit /><Plant x={130} y={F} s={1.4} />
      </g>
    ) },
    // Foreground (depth 1.3): the near table edge as a dark band across the bottom of the frame. Nothing important in it.
    { id: 'fg', depth: 1.3, node: (
      <g><rect x="700" y="1560" width="1900" height="260" fill={TONES.afternoon.dark} /></g>
    ) },
  ],
  // One still frame: the care plan at the kitchen table.
  shot: { x: 1000, y: 1000, z: 0.92, xN: 1330 },

};
