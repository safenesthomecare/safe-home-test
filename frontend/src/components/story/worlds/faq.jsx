import { asset } from '../../../lib/asset';

// FAQ: 4:00 PM page, evening scene "Settling in for the night" (bedroom lit by the bedside lamp, moon in the window). Point-by-point vector trace of the FAQ reference painting
// (public/scenes/faq-trace.svg: colour-stepped shapes traced from the reference, so the bed, nightstand, window, wainscot, wheelchair, rug and both figures follow the original).
// Night light needs extra passes: a finer trace over the wall and floor (public/scenes/faq-soft.svg, traced with the shadows lifted so dark steps are not merged) and a
// contrast-stretched trace of the lamp halo on the wall and panel (public/scenes/faq-glow.svg, feathered edges).
// Both faces (PSW and client) are faceless: only the skin inside each traced face outline (hairline, cheek, chin, jaw) was replaced with flat skin before tracing; hair, ears and necks are untouched.
// Text panel sits on the left; the bed and both figures are on the right of the painting.
const W = 1364; const H = 768;

export const FAQ_WORLD = {
  w: W, h: H, side: 'left', soft: true,
  layers: [
    // Wall-and-floor colours match the painting edges so the phone framing never shows an empty band.
    { id: 'back', depth: 0.12, node: (
      <g>
        <rect x={-1500} y={-1500} width={W + 3000} height={2005} fill="#3A374A" />
        <rect x={-1500} y={505} width={W + 3000} height={H + 3000} fill="#3D271E" />
      </g>
    ) },
    { id: 'plane', depth: 1, node: (
      <g>
        <image href={asset('/scenes/faq-trace.svg')} x="0" y="0" width={W} height={H} />
        <image href={asset('/scenes/faq-soft.svg')} x="0" y="0" width={W} height={H} />
        <image href={asset('/scenes/faq-glow.svg')} x="0" y="0" width={W} height={H} />
      </g>
    ) },
  ],
  // One still frame: the whole painting, bed and figures on the right (text on the left). Phone: zoomed so the scene fills the screen, framing the PSW, client and bed.
  shot: { x: 756, y: 384, z: 0.92, xN: 960, yN: 384, zN: 1.5 },
};
