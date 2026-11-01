import { asset } from '../../../lib/asset';

// Testimonials: 2:00 PM, "Checking temperature" (living room). Point-by-point vector trace of the Testimonials reference painting
// (public/scenes/testimonials-trace.svg: colour-stepped shapes traced from the reference, so the sofa, rug, table, lamp, PSW and client follow the original).
// A second, finer trace (public/scenes/testimonials-soft.svg) is laid over the wall and floor so the window sunbeam, wall texture and plank lines survive.
// The reference figures are already faceless, so no face mask was needed. Text panel sits on the right; the pair on the sofa is on the left.
const W = 1376; const H = 768;

export const TESTIMONIALS_WORLD = {
  w: W, h: H, side: 'right', soft: true,
  layers: [
    // Wall-and-floor colours match the painting edges so the phone framing never shows an empty band.
    { id: 'back', depth: 0.12, node: (
      <g>
        <rect x={-1500} y={-1500} width={W + 3000} height={2105} fill="#BDA78F" />
        <rect x={-1500} y={605} width={W + 3000} height={H + 3000} fill="#865C3E" />
      </g>
    ) },
    { id: 'plane', depth: 1, node: (
      <g>
        <image href={asset('/scenes/testimonials-trace.svg')} x="0" y="0" width={W} height={H} />
        <image href={asset('/scenes/testimonials-soft.svg')} x="0" y="0" width={W} height={H} />
      </g>
    ) },
  ],
  // One still frame: the whole painting, pair on the sofa on the left (text on the right). Phone: zoomed so the scene fills the screen, framing the pair on the sofa.
  shot: { x: 688, y: 384, z: 0.92, xN: 430, yN: 384, zN: 1.5 },
};
