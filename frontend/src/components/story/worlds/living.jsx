import { C, Sky, Wall, Win, Sofa, Armchair, Table, Mug, Frame, Lamp, Plant, Chair, PSW, Patient, Rug, Cushion, Books, Clock, FruitBowl, Thermometer, WaterGlass, Bed, Wheelchair, BedsideTable } from './art';
import { TONES, LightShaft, SilLamp, SilPlant } from './light';

// FAQ 4:00 PM page frame is now the evening scene "Settling in for the night" (below). Testimonials 2:00 PM, "Checking temperature" (living room; PSW holds the thermometer to the client's forehead, other hand on their shoulder) and FAQ 4:00 PM (care plan at the kitchen table). Both pull back from the group to the room.
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
        <Patient view="f34" x={650} y={F - 14} s={1.2} face={1} pose="sit" />
        <Table x={1010} y={F + 30} w={190} h={70} color={C.brownL} /><WaterGlass x={1010} y={F - 40} s={0.5} />
        <PSW view="f34" x={746} y={F + 6} s={1.25} face={-1} pose="check" item={<Thermometer x={0} y={0} s={0.9} face={-1} />} />
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
  // One still frame: checking temperature. Figures on the left, text on the right.
  shot: { x: 1200, y: 900, z: 1.2, xN: 1065, yN: 785 },

};

// FAQ, "Settling in for the night": a bedroom lit by the bedside lamp. Text panel on the left, so the scene sits on the right: client on the bed edge, PSW's hand on their back, wheelchair (brakes on) beside the bed, CPAP and lamp on the bedside table.
export const FAQ_WORLD = {
  w: W, h: H, side: 'left',
  layers: [
    { id: 'back', depth: 0.3, node: <Sky w={W} h={H} top="#1C2750" bot="#4A3F78" id="fq-sky" /> },
    { id: 'room', depth: 1, node: (
      <g>
        <Wall x={-600} y={0} w={W + 1200} h={H} color="#55689A" floorH={H - F} floor="#7B5E4B" paper="dots" />
        <Win x={1500} y={540} w={260} h={300} sky="#1B2A52" curtain="#7E8FC4" />
        <rect x="1514" y="548" width="232" height="284" fill="#1B2A52" opacity=".62" /><circle cx="1650" cy="630" r="22" fill="#FFF6D5" />
        <Frame x={1165} y={370} w={90} h={110} c={C.rose} />
        <Rug x={1520} y={F + 95} w={900} h={50} color="#8A4F6B" />
        <g transform={`translate(1500 ${F}) scale(0.65)`}><Bed x={0} y={0} w={560} color={C.teal} /></g>
        <BedsideTable x={1205} y={F + 4} s={1.1} lamp cpap lit />
        <Wheelchair x={1830} y={F + 30} s={1.25} face={-1} />
        <PSW view="f34" x={1450} y={F + 50} s={1.3} face={1} pose="steady" />
        <Patient view="f34" x={1545} y={F + 4} s={1.2} face={1} pose="sit" />
      </g>
    ) },
    // Foreground (depth 1.3): dark plant in the bottom-right corner. Nothing important in it.
    { id: 'fg', depth: 1.3, node: <g><SilPlant x={2230} y={1700} h={330} color={TONES.dusk.dark} /></g> },
  ],
  // One still frame: settling in for the night. Scene on the right, text on the left.
  shot: { x: 1223, y: 930, z: 0.85, xN: 1500, zN: 0.72 },
};
