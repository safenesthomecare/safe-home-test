import { asset } from '../../../lib/asset';
import { C, Skyline, LakeHaze, SuburbRow, NearStreet, Woodlot, Neighbour, SideFence, FrontWalk, Driveway, GardenBed, BrickColonial, Tree, PSW, Patient } from './art';
import { TONES, SilBush, LightShaft } from './light';

// Contact: 7:30 PM (SHOTS.md #6). Low-angle wide on the house at dusk, then the camera pulls out to the nest.
// House is the main positive shape (flat lit windows on a dark wall). Pair on the left-centre third at the door: the caregiver says goodbye and walks off left, the patient waves from the doorway.
// Flat dusk sky bands, dark foreground (steps and hedge, bottom-left corner only, depth 1.3), text panel on the right.
const W = 3300; const H = 1600; const G = 1040;
const T = TONES.dusk;

export const CONTACT_WORLD = {
  w: W, h: H, side: 'right',
  layers: [
    // Sky: three flat bands (positions are camera-relative at this depth) plus a few stars in the dark top band.
    { id: 'sky', depth: 0.12, node: (<g>
      <rect x="-3000" y="-1500" width={W + 6000} height="1400" fill="#27447A" />
      <rect x="-3000" y="-100" width={W + 6000} height="80" fill="#3F5F9A" />
      <rect x="-3000" y="-20" width={W + 6000} height="80" fill="#6F86B8" />
      <rect x="-3000" y="60" width={W + 6000} height="80" fill="#A99AB8" />
      <rect x="-3000" y="140" width={W + 6000} height="70" fill="#E8A58E" />
      <rect x="-3000" y="210" width={W + 6000} height="2050" fill="#F5A664" />
      {[[-800, -620], [-450, -520], [-100, -640], [300, -560], [700, -610], [-600, -380], [1000, -450], [1250, -340], [150, -420]].map(([sx, sy]) => <circle key={`${sx}${sy}`} cx={sx} cy={sy} r="3" fill="#fff" />)}
    </g>) },
    { id: 'far', depth: 0.3, node: (<g transform="translate(-1200 0)"><LakeHaze y={470} color="#E58F6A" /><Skyline y={560} w={5700} tint="#4F688C" lit="#9DB1CC" tx={0.386} seed={3} glow="#FFC070" /><rect x="0" y="562" width="5700" height="600" fill="#2F4F5F" /></g>) },
    { id: 'mid', depth: 0.6, node: (<g transform="translate(-1200 0)"><SuburbRow x0={0} x1={5700} y={720} s={0.5} seed={4} haze={0.3} hazeColor="#B4527F" lawn="#2F5A47" dim={0.45} lit="#FFC83D" /><SuburbRow x0={100} x1={5700} y={850} s={0.75} seed={9} haze={0.1} hazeColor="#B4527F" lawn="#2E5A45" dim={0.35} lit="#FFC83D" /></g>) },
    { id: 'plane', depth: 1, node: (
      <g>
        <rect x="-400" y={G} width={W + 800} height="800" fill="#3D7A34" />
        <NearStreet x0={-400} x1={W + 400} G={G} off={170} boul="#3A6A35" road="#2B3140" sidewalk="#6E7380" dim={0.35} />
        <Woodlot x={1380} y={G - 120} w={520} seed={8} h={470} dark="#1F4A2E" light="#8CA64A" /><Woodlot x={2660} y={G - 110} w={900} seed={4} h={330} dark="#1F4A2E" light="#8CA64A" />
        <Tree x={1280} y={G + 20} s={0.9} leaf="#2E6B3F" leafL="#4F9D5A" trunk="#6B4423" />
        <image href={asset('/brand/symbol.svg')} x="1382" y="566" width="216" height="173" />
        <Tree x={3080} y={G + 14} s={0.9} leaf="#2E6B3F" leafL="#4F9D5A" trunk="#6B4423" />
        <Neighbour x={1610} y={G + 6} w={420} side={-1} kind="siding" dim={0.35} />
        <SideFence x={1664} y={G + 6} w={90} h={120} color="#5E4A34" lattice />
        <Neighbour x={2560} y={G + 6} w={420} side={1} kind="brick" dim={0.35} />
        <SideFence x={2510} y={G + 6} w={90} h={120} color="#5E4A34" lattice />
        <FrontWalk x={1960} y={G + 18} y2={G + 170} w1={110} w2={190} color="#7C6A5E" joint="#55463D" />
        <Driveway x={2316} y={G + 6} y2={G + 232} w1={140} w2={260} color="#3E434C" />
        <BrickColonial x={1960} y={G + 6} s={1.25} lit open />
        {/* window light spilling on the lawn */}
        <LightShaft x={1740} y={G + 40} w={110} h={110} skew={-40} color={T.accent} o={0.16} /><LightShaft x={2080} y={G + 40} w={110} h={110} skew={40} color={T.accent} o={0.16} />
        {/* hard-edged spill of door light on the walk */}
        <LightShaft x={1930} y={G + 22} w={70} h={120} skew={-40} color={T.key} o={0.55} />
        <GardenBed x={1790} y={G + 28} w={190} seed={1} cedar={false} />
        <GardenBed x={2134} y={G + 28} w={170} seed={2} />
        <Patient top="#3E6AA5" view="f34" x={1962} y={G + 8} s={0.85} face={-1} pose="wave" dusk />
        <g className="sw-walk" style={{ '--wx': -200, '--wy': 50 }}>
          <PSW top="#16305A" bottom="#16305A" view="f34" x={1935} y={G + 110} s={0.85} face={-1} pose="stand" walk dusk item={<rect x="-12" y="-4" width="24" height="30" rx="6" fill={C.navy} />} />
          <rect x="1888" y={G + 56} width="24" height="30" rx="6" fill={C.navy} />
        </g>
      </g>
    ) },
    // Foreground (depth 1.3, nothing important in it): steps and hedge in the bottom-left corner only.
    { id: 'fg', depth: 1.3, node: (
      <g fill={T.dark}>
        <rect x="1900" y="1590" width="640" height="340" />
        <rect x="2100" y="1545" width="200" height="50" /><rect x="2100" y="1500" width="100" height="50" />
        <SilBush x={2200} y={1600} w={340} h={70} color={T.dark} /><SilBush x={2430} y={1600} w={300} h={60} color={T.dark} />
      </g>
    ) },
  ],
  keys: [
    { sec: 'top', xN: 1960, x: 2153, y: 865, z: 1 },
    { sec: 1, xN: 1960, x: 2170, y: 865, z: 1 },
    { sec: 'end', xN: 1700, x: 2080, y: 865, yN: 800, z: 0.9 },
  ],
};
