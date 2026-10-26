import { C, Sky, Wall, Win, Sofa, Armchair, Table, Mug, Frame, Lamp, Plant, Chair, Plate, Person, SKIN } from './art';

// Testimonials 2:00 PM (tea in the living room) and FAQ 4:00 PM (care plan at the kitchen table). Both pull back from the group to the room.
const W = 2200; const H = 1400; const F = 1060;

export const TESTIMONIALS_WORLD = {
  w: W, h: H, side: 'right',
  layers: [
    { id: 'back', depth: 0.3, node: <Sky w={W} h={H} top="#FFF0D6" bot="#FFD9A8" id="ts-sky" /> },
    { id: 'room', depth: 1, node: (
      <g transform="translate(300 0)">
        <Wall x="-600" y="0" w={W + 1200} h={H} color="#F8E7D2" floorH={H - F} floor="#C9A27A" />
        <Win x="1180" y="330" w="320" h="360" sky="#FFE0A8" sun />
        <rect x="1140" y="320" width="400" height="30" rx="8" fill="#B8325A" opacity=".6" />
        <Frame x="250" y="360" w="90" h="110" c={C.rose} /><Frame x="360" y="400" w="70" h="90" c={C.blue} /><Frame x="480" y="350" w="80" h="100" c={C.teal} />
        <Lamp x="140" y={F} /><Plant x="1680" y={F} s="1.5" />
        <Sofa x="560" y={F + 10} w="520" color={C.plum} />
        <Person x="460" y={F - 14} s="1.15" face={1} pose="sit" skin={SKIN.a} hair="#2B2220" top={C.teal} />
        <Person x="610" y={F - 14} s="1.1" face={1} pose="sit" skin={SKIN.c} hair="#2B2220" top={C.orange} bottom="#3B4A63" />
        <Table x="900" y={F + 30} w="190" h="70" color={C.brownL} /><Mug x="860" y={F - 40} c={C.blue} /><Mug x="940" y={F - 40} c={C.orange} />
        <Armchair x="1100" y={F + 10} face={-1} color={C.rose} />
        <Person x="1090" y={F - 6} s="1.1" face={-1} pose="sit" skin={SKIN.b} hair="#DADDE3" top="#7A4A9E" bottom="#4A4A6A" />
        <Person x="780" y={F + 70} s="0.62" face={1} skin={SKIN.a} hair="#4A3427" top={C.blue} bottom="#3B4A63" pose="wave" />
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', x: 1360, y: 850, z: 1 },
    { sec: 2, x: 1391, y: 830, z: 0.9 },
    { sec: 'end', x: 1409, y: 820, z: 0.85 },
  ],
};

export const FAQ_WORLD = {
  w: W, h: H, side: 'left',
  layers: [
    { id: 'back', depth: 0.3, node: <Sky w={W} h={H} top="#FFE6C9" bot="#FFC48A" id="fq-sky" /> },
    { id: 'room', depth: 1, node: (
      <g transform="translate(300 0)">
        <Wall x="-600" y="0" w={W + 1200} h={H} color="#FFF2DE" floorH={H - F} floor="#C9A27A" />
        <Win x="260" y="330" w="300" h="340" sky="#FFC98F" sun />
        <g><circle cx="1420" cy="440" r="80" fill="#fff" stroke={C.brownD} strokeWidth="10" /><path d="M1420 440 V390 M1420 440 L1455 460" stroke={C.navy} strokeWidth="8" strokeLinecap="round" /></g>
        <rect x="1560" y="360" width="150" height="700" rx="10" fill="#fff" opacity=".9" />
        <Table x="900" y={F + 40} w="560" h="140" color={C.brownL} />
        <rect x="810" y={F - 112} width="150" height="12" rx="3" fill="#fff" /><rect x="820" y={F - 122} width="130" height="12" rx="3" fill={C.blueL} />
        <g><rect x="1010" y={F - 140} width="40" height="38" rx="8" fill={C.rose} /><path d={`M1050 ${F - 130} q18 0 0 18`} stroke={C.rose} strokeWidth="5" fill="none" /></g>
        <Chair x="640" y={F + 40} /><Chair x="1160" y={F + 40} face={-1} />
        <Person x="640" y={F + 40} s="1.2" face={1} pose="sit" skin={SKIN.a} hair="#3A2A22" top={C.orange} bottom="#3B4A63" />
        <Person x="1160" y={F + 40} s="1.2" face={-1} pose="sit" skin={SKIN.b} hair="#2B2220" top={C.teal} />
        <Person x="900" y={F - 20} s="1.1" face={1} pose="stand" skin={SKIN.b} hair="#DADDE3" top="#7A4A9E" bottom="#4A4A6A" scale={1} />
        <Plant x="130" y={F} s="1.4" />
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', x: 900, y: 850, z: 1 },
    { sec: 2, x: 880, y: 830, z: 0.9 },
    { sec: 'end', x: 870, y: 820, z: 0.85 },
  ],
};
