import { C, Sky, Wall, Win, Bed, Counter, Mug, Pillbox, Table, Chair, Plate, PSW, Patient, Plant, Frame, Lamp, Rug, Cushion, Kettle, FruitBowl, Clock, Books, WaterGlass } from './art';
import { TONES, LightShaft, SilPlant, SilChair, SilLamp } from './light';

// Services (SHOTS.md #3): three rooms side by side. The still frame is the dining table: "Medication with a glass of water" (client seated, PSW standing with the glass, pillbox on the table, no lunch plate). Pair on the two thirds in every room, window light as hard-edged shafts, one dark silhouette in the bottom-right corner of each room (panel stays left). The last beat pans past the table to an empty corner.
const W = 4400; const H = 1400; const F = 1080; // floor line
const T = TONES.room;

const Doorway = ({ x, c }) => (
  <g><rect x={x - 70} y={360} width={140} height={F - 360} fill={c} /><rect x={x - 70} y={360} width={140} height={F - 360} fill="#000" opacity=".08" /><rect x={x - 84} y={340} width={168} height={28} rx="6" fill="#B98F62" /><rect x={x - 84} y={360} width={16} height={F - 360} fill="#B98F62" /><rect x={x + 68} y={360} width={16} height={F - 360} fill="#B98F62" /></g>
);

export const SERVICES_WORLD = {
  w: W, h: H, side: 'left',
  layers: [
    { id: 'back', depth: 0.3, node: <Sky w={W} h={H} top="#E6F1FA" bot="#FFF1DE" id="sv-sky" /> },
    { id: 'rooms', depth: 1, node: (
      <g>
        <Wall x={0} y={0} w={1200} h={H} color="#CFE3F7" floorH={H - F} floor="#CFAE86" />
        <Wall x={1200} y={0} w={1200} h={H} color="#FFE0B8" floorH={H - F} floor="#C9A27A" paper="dots" />
        <Wall x={2400} y={0} w={2000} h={H} color="#EBD9F2" floorH={H - F} floor="#CFAE86" />
        <rect x="-1500" y="0" width="1500" height={H} fill="#CFE3F7" /><rect x="4400" y="0" width="1500" height={H} fill="#EBD9F2" />
        <Doorway x={1200} c="#FFE0B8" /><Doorway x={2400} c="#EBD9F2" />
        {/* 9:00 bedroom: morning routine */}
        <Rug x={760} y={F + 70} w={520} h={46} color={C.rose} />
        <Win x={640} y={400} w={240} h={280} sky="#CFE8F7" sun />
        <Bed x={1010} y={F} w={360} color={C.blue} />
        <Cushion x={1130} y={F - 96} color={C.orange} />
        <Frame x={250} y={420} c={C.rose} /><Plant x={400} y={F} s={1.3} />
        <Table x={500} y={F + 4} w={130} h={96} color={C.brownL} /><Lamp x={500} y={F - 92} lit />
        <Books x={455} y={F - 92} />
        <LightShaft x={540} y={680} w={200} h={400} skew={300} color={T.key} o={0.4} />
        <PSW view="f34" x={593} y={F + 40} s={1.35} face={1} pose="hold" />
        <Patient view="f34" x={967} y={F + 40} s={1.25} face={-1} pose="stand" />
        {/* 10:30 kitchen: medication reminder */}
        <Rug x={1900} y={F + 70} w={500} h={46} color={C.teal} />
        <Win x={1700} y={400} w={240} h={260} sky="#D6ECFA" sun />
        <Clock x={2150} y={470} r={38} />
        <Counter x={2150} y={F} w={460} /><Pillbox x={2100} y={F - 176} /><Mug x={2200} y={F - 176} /><Kettle x={2290} y={F - 176} s={0.9} />
        <FruitBowl x={1990} y={F - 176} s={0.9} />
        <Table x={1330} y={F + 4} w={130} h={96} color={C.brownL} /><Lamp x={1330} y={F - 92} lit={false} />
        <LightShaft x={1580} y={660} w={240} h={420} skew={300} color={T.key} o={0.4} />
        <PSW view="f34" x={1753} y={F + 40} s={1.35} face={1} pose="hold" />
        <Patient view="f34" x={2127} y={F + 40} s={1.25} face={-1} pose="stand" />
        <Frame x={2050} y={430} c={C.orange} />
        {/* 12:15 dining: lunch */}
        <Rug x={3000} y={F + 80} w={640} h={46} color={C.blue} />
        <Win x={2520} y={400} w={220} h={260} sky="#CFE8F7" sun />
        <Table x={3000} y={F + 20} w={420} h={130} color={C.brownL} />
        <Pillbox x={2990} y={F - 108} />
        <LightShaft x={2410} y={660} w={220} h={420} skew={300} color={T.key} o={0.4} />
        <Chair x={2800} y={F + 20} />
        <Patient view="f34" x={2800} y={F + 20} s={1.2} face={1} pose="sit" />
        <PSW view="f34" x={3180} y={F + 20} s={1.3} face={-1} pose="give" item={<WaterGlass x={2} y={14} s={0.6} />} />
        <Plant x={3440} y={F} s={1.4} /><Frame x={3300} y={420} c={C.teal} />
        <Win x={3900} y={400} w={240} h={280} sky="#CFE8F7" sun /><LightShaft x={3780} y={680} w={240} h={400} skew={300} color={T.key} o={0.4} /><Frame x={4200} y={430} c={C.orange} />
      </g>
    ) },
    // Foreground (depth 1.3): one dark silhouette per room in the bottom-right corner (plant, chair, lamp). Nothing important in it.
    { id: 'fg', depth: 1.3, node: (
      <g>
        <SilPlant x={1480} y={1700} h={330} color={T.dark} />
        <SilChair x={4040} y={1650} w={190} h={290} color={T.dark} face={-1} />
        <SilPlant x={4380} y={1700} h={300} color={T.dark} />
        <SilLamp x={5184} y={1700} h={400} color={T.dark} />
      </g>
    ) },
  ],
  // One still frame: medication with a glass of water at the dining table. Figures on the right, text on the left.
  shot: { x: 2745, y: 960, z: 1.25, xN: 2990, zN: 0.95 },

};
