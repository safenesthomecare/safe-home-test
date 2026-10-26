import { asset } from '../../../lib/asset';
import { C, Skyline, LakeHaze, SuburbRow, HydroPole, Tree, House, PSW, Patient, Grass, Flowers, SteppingStones, Fence } from './art';
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
      <rect x="-3000" y="-1500" width={W + 6000} height="1200" fill="#2B3A6B" />
      <rect x="-3000" y="-300" width={W + 6000} height="360" fill="#B4527F" />
      <rect x="-3000" y="60" width={W + 6000} height="2200" fill="#F7A55B" />
      {[[-800, -620], [-450, -520], [-100, -640], [300, -560], [700, -610], [-600, -380], [1000, -450], [1250, -340], [150, -420]].map(([sx, sy]) => <circle key={`${sx}${sy}`} cx={sx} cy={sy} r="3" fill="#fff" />)}
    </g>) },
    { id: 'far', depth: 0.3, node: (<g transform="translate(-1200 0)"><LakeHaze y={470} color="#E58F6A" /><Skyline y={560} w={5700} tint="#2A3F66" lit="#5A6F9A" tx={0.64} seed={3} glow="#FFC83D" /><rect x="0" y="562" width="5700" height="600" fill="#2F4F5F" /></g>) },
    { id: 'mid', depth: 0.6, node: (<g transform="translate(-1200 0)"><SuburbRow x0={0} x1={5700} y={760} s={0.55} seed={4} haze={0.3} hazeColor="#B4527F" lawn="#2F5A47" dim={0.45} lit="#FFC83D" /><SuburbRow x0={100} x1={5700} y={880} s={0.8} seed={9} haze={0.1} hazeColor="#B4527F" lawn="#2E5A45" dim={0.35} lit="#FFC83D" /><HydroPole x={900} y={940} h={260} span={900} color="#1E2B3A" wire="#0B2038" /><HydroPole x={1800} y={940} h={260} span={900} color="#1E2B3A" wire="#0B2038" /><HydroPole x={2700} y={940} h={260} span={900} color="#1E2B3A" wire="#0B2038" /><HydroPole x={3600} y={940} h={260} span={900} color="#1E2B3A" wire="#0B2038" /></g>) },
    { id: 'plane', depth: 1, node: (
      <g>
        <rect x="-400" y={G} width={W + 800} height="800" fill="#2E5A45" />
        <path d={`M1420 ${G + 4} C1520 ${G + 30} 1650 ${G + 2} 1840 ${G + 6} L1880 ${G + 6} L1900 ${G + 70} C1650 ${G + 90} 1500 ${G + 120} 1400 ${G + 90}Z`} fill="#8E7C66" />
        <SteppingStones x={1700} y={G + 52} w={440} n={5} seed={4} color="#A89A86" />
        <Grass x={1000} y={G + 10} w={500} seed={11} color="#244A38" /><Grass x={1500} y={G + 118} w={500} seed={13} h={26} color="#244A38" /><Grass x={2980} y={G + 12} w={300} seed={17} color="#244A38" />
        <Flowers x={1050} y={G + 78} w={420} n={10} seed={31} /><Flowers x={1700} y={G + 130} w={460} n={9} seed={33} />
        <Tree x={1280} y={G + 20} s={0.9} leaf="#2E6B3F" leafL="#4F9D5A" trunk="#6B4423" />
        <image href={asset('/brand/symbol.svg')} x="1382" y="566" width="216" height="173" />
        <Tree x={3080} y={G + 14} s={0.9} leaf="#2E6B3F" leafL="#4F9D5A" trunk="#6B4423" />
        <Fence x={1500} y={G + 12} w={260} h={70} color="#E8DCCB" />
        <House x={1960} y={G + 6} s={1.25} lit wall="#27549A" door="#E56E12" />
        {/* hard-edged spill of door light on the path */}
        <LightShaft x={1950} y={G + 8} w={90} h={90} skew={-70} color={T.key} o={0.7} />
        <Flowers x={1960} y={G + 22} w={360} n={9} seed={35} />
        <Patient view="f34" x={1990} y={G + 6} s={0.9} face={-1} pose="wave" dusk />
        <g className="sw-walk" style={{ '--wx': -560, '--wy': 8 }}>
          <PSW view="b34" x={1840} y={G + 66} s={0.82} face={-1} pose="stand" walk dusk />
          <rect x="1810" y={G - 6} width="32" height="38" rx="8" fill={C.navy} />
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
    { sec: 'top', xN: 1960, x: 2153, y: 985, z: 0.85 },
    { sec: 1, xN: 1960, x: 2170, y: 975, z: 0.8 },
    { sec: 'end', xN: 1700, x: 2080, y: 1040, yN: 800, z: 0.6 },
  ],
};
