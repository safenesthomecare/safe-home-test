import { C, Sky, Wall, Win, Frame, Rug, Sofa, Cushion, Lamp, Plant, Walker, PSW, Patient } from './art';
import { TONES, LightShaft, SilPlant } from './light';

// About: 9:30 AM, "Helping you up safely" (indoors). Text panel on the right, so the pair sits on the left half: the client rises from the couch toward the walker, the PSW beside them steadies their arm. Both face the text (look room).
const W = 1800; const H = 1400; const F = 1060;
const T = TONES.midmorning;

export const ABOUT_WORLD = {
  w: W, h: H, side: 'right',
  layers: [
    { id: 'back', depth: 0.3, node: <Sky w={W} h={H} top="#FFF1DA" bot="#FFE0B8" id="ab-sky" /> },
    { id: 'room', depth: 1, node: (
      <g>
        <Wall x={-600} y={0} w={W + 1200} h={H} color="#FFF0DC" floorH={H - F} floor="#C9A27A" />
        <Win x={470} y={330} w={320} h={360} sky="#FFE9B8" sun curtain="#9CCBEA" />
        <Frame x={880} y={360} w={90} h={110} c={C.rose} /><Frame x={990} y={400} w={70} h={90} c={C.teal} />
        <Rug x={760} y={F + 90} w={860} h={50} color={C.teal} />
        <LightShaft x={560} y={690} w={240} h={400} skew={300} color={T.key} o={0.4} />
        <Sofa x={560} y={F + 10} w={520} color={C.plum} />
        <Cushion x={380} y={F - 56} color={C.orange} />
        <Lamp x={1140} y={F} lit /><Plant x={170} y={F} s={1.5} />
        <PSW view="f34" x={652} y={F + 56} s={1.5} face={1} pose="steady" />
        <Patient view="f34" x={730} y={F + 30} s={1.5} face={1} pose="rise" />
        <Walker x={880} y={F + 38} s={1.5} />
      </g>
    ) },
    // Foreground (depth 1.3): dark plant in the bottom-left corner. Nothing important in it.
    { id: 'fg', depth: 1.3, node: <g><SilPlant x={560} y={1700} h={330} color={T.dark} /></g> },
  ],
  // One still frame: helping up safely. Figures on the left, text on the right.
  shot: { x: 1000, y: 880, z: 0.85, xN: 700 },
};
