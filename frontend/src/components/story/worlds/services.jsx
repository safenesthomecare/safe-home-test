import { C, Sky, Wall, Win, Bed, Counter, Mug, Pillbox, Table, Chair, Plate, Person, Plant, Frame, Lamp, SKIN } from './art';

// Services: 9:00 AM to 12:15 PM. Three rooms side by side; the camera pans across as you scroll.
const W = 3600; const H = 1400; const F = 1080; // floor line

const Doorway = ({ x, c }) => (
  <g><rect x={x - 70} y="360" width="140" height={F - 360} fill={c} /><rect x={x - 70} y="360" width="140" height={F - 360} fill="#000" opacity=".08" /><rect x={x - 84} y="340" width="168" height="28" rx="6" fill="#B98F62" /><rect x={x - 84} y="360" width="16" height={F - 360} fill="#B98F62" /><rect x={x + 68} y="360" width="16" height={F - 360} fill="#B98F62" /></g>
);

export const SERVICES_WORLD = {
  w: W, h: H, side: 'left',
  layers: [
    { id: 'back', depth: 0.3, node: <Sky w={W} h={H} top="#E6F1FA" bot="#FFF1DE" id="sv-sky" /> },
    { id: 'rooms', depth: 1, node: (
      <g>
        <Wall x="0" y="0" w="1200" h={H} color="#CFE3F7" floorH={H - F} floor="#CFAE86" />
        <Wall x="1200" y="0" w="1200" h={H} color="#FFE0B8" floorH={H - F} floor="#C9A27A" />
        <Wall x="2400" y="0" w="1200" h={H} color="#EBD9F2" floorH={H - F} floor="#CFAE86" />
        <rect x="-1500" y="0" width="1500" height={H} fill="#CFE3F7" /><rect x="3600" y="0" width="1500" height={H} fill="#EBD9F2" />
        <Doorway x="1200" c="#FFE0B8" /><Doorway x="2400" c="#EBD9F2" />
        {/* 9:00 bedroom: morning routine */}
        <Win x="640" y="400" w="240" h="280" sky="#CFE8F7" sun />
        <Bed x="1010" y={F} w="360" color={C.blue} />
        <Frame x="250" y="420" c={C.rose} /><Plant x="400" y={F} s="1.3" />
        <Person x="700" y={F + 40} s="1.35" face={1} skin={SKIN.a} hair="#2B2220" top={C.teal} pose="hold" />
        <Person x="860" y={F + 40} s="1.25" face={-1} skin={SKIN.b} hair="#DADDE3" top={C.plum} bottom="#4A4A6A" pose="stand" />
        {/* 10:30 kitchen: medication reminder */}
        <Win x="1700" y="400" w="240" h="260" sky="#D6ECFA" sun />
        <Counter x="2150" y={F} w="460" /><Pillbox x="2100" y={F - 176} /><Mug x="2200" y={F - 176} />
        <Lamp x="1330" y={F - 176} lit={false} />
        <Person x="1700" y={F + 40} s="1.35" face={1} skin={SKIN.a} hair="#2B2220" top={C.teal} pose="hold" />
        <Person x="1870" y={F + 40} s="1.25" face={-1} skin={SKIN.b} hair="#DADDE3" top={C.plum} bottom="#4A4A6A" pose="stand" />
        <Frame x="2050" y="430" c={C.orange} />
        {/* 12:15 dining: lunch */}
        <Win x="2520" y="400" w="220" h="260" sky="#CFE8F7" sun />
        <Table x="3000" y={F + 20} w="420" h="130" color={C.brownL} />
        <Plate x="2900" y={F - 108} /><Plate x="3100" y={F - 108} /><Mug x="3000" y={F - 108} c={C.blue} />
        <Chair x="2800" y={F + 20} /><Chair x="3200" y={F + 20} face={-1} />
        <Person x="2800" y={F + 20} s="1.2" face={1} pose="sit" skin={SKIN.b} hair="#DADDE3" top={C.plum} bottom="#4A4A6A" />
        <Person x="3200" y={F + 20} s="1.2" face={-1} pose="sit" skin={SKIN.a} hair="#2B2220" top={C.teal} />
        <Plant x="3440" y={F} s="1.4" /><Frame x="3300" y="420" c={C.teal} />
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', x: 580, y: 840, z: 1 },
    { sec: 1, x: 640, y: 840, z: 1 },
    { sec: 2, x: 1700, y: 840, z: 1 },
    { sec: 3, x: 2720, y: 840, z: 1 },
    { sec: 'end', x: 2760, y: 840, z: 1 },
  ],
};
