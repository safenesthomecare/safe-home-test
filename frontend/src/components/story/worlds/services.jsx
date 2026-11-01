import { asset } from '../../../lib/asset';

// Services: morning visit, "Care that fits your day". Point-by-point vector trace of the Services reference painting
// (public/scenes/services-trace.svg: colour-stepped shapes traced from the reference, so the sunbeam, kitchen, chair, rug and both figures follow the original).
// A second, finer trace (public/scenes/services-soft.svg) is laid over the wall and floor so the wallpaper stripes, beam and plank lines survive.
// Both faces (the seated client and the standing PSW) are faceless: only the skin inside each traced face outline (hairline, cheek, chin, jaw) was replaced with flat skin before tracing;
// hair, ears and necks are untouched. Text panel sits on the left; the two figures are on the right half of the painting.
const W = 1376; const H = 768;

export const SERVICES_WORLD = {
  w: W, h: H, side: 'left', soft: true,
  layers: [
    // Wall-and-floor colours match the painting edges so the phone framing never shows an empty band.
    { id: 'back', depth: 0.12, node: (
      <g>
        <rect x={-1500} y={-1500} width={W + 3000} height={2055} fill="#A69AA4" />
        <rect x={-1500} y={555} width={W + 3000} height={H + 3000} fill="#B1916E" />
      </g>
    ) },
    { id: 'plane', depth: 1, node: (
      <g>
        <image href={asset('/scenes/services-trace.svg')} x="0" y="0" width={W} height={H} />
        <image href={asset('/scenes/services-soft.svg')} x="0" y="0" width={W} height={H} />
      </g>
    ) },
  ],
  // One still frame: the whole painting, figures on the right (text on the left). Phone: zoomed so the scene fills the screen, framing the seated client, chair and pill organiser (the PSW is cropped out at phone width).
  shot: { x: 768, y: 384, z: 0.92, xN: 880, yN: 384, zN: 1.5 },
};
