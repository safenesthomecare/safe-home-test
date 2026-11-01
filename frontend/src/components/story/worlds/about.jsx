import { asset } from '../../../lib/asset';

// About: 9:30 AM, "Helping you up safely" (indoors). Point-by-point vector trace of the About reference painting
// (public/scenes/about-trace.svg: colour-stepped shapes traced from the reference, so sofa, rug, walker, curtains and both figures follow the original).
// A second, finer trace (public/scenes/about-soft.svg) is laid over the wall and floor so the soft stripes, sunbeam, lamp glow and plank lines survive.
// The reference figures are already faceless, so no face mask was needed. Text panel sits on the right; the pair and the walker are on the left.
const W = 1364; const H = 768;

export const ABOUT_WORLD = {
  w: W, h: H, side: 'right', soft: true,
  layers: [
    { id: 'back', depth: 0.12, node: <rect x={-1500} y={-1500} width={W + 3000} height={H + 3000} fill="#DDC9AE" /> },
    { id: 'plane', depth: 1, node: (
      <g>
        <image href={asset('/scenes/about-trace.svg')} x="0" y="0" width={W} height={H} />
        <image href={asset('/scenes/about-soft.svg')} x="0" y="0" width={W} height={H} />
      </g>
    ) },
  ],
  // One still frame: the whole painting. Figures on the left, text on the right.
  shot: { x: 682, y: 384, z: 0.92, xN: 430, yN: 384, zN: 1.5 },
};
