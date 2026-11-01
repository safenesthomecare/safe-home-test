import { asset } from '../../../lib/asset';

// Home: 8:00 AM. Point-by-point vector trace of the Home reference painting (public/scenes/home-trace.svg: ~1,600 colour-stepped shapes traced from the reference,
// so every brick course, shingle, leaf mass, shadow and cloud edge follows the original). The relative (woman at the door) is faceless: only the skin inside her traced face outline
// (hairline, cheek, chin, jaw) was replaced with flat skin before tracing; hair, ear and neck are untouched. The child already faces away from us.
const W = 1376; const H = 768;

export const HOME_WORLD = {
  w: W, h: H, side: 'right', soft: true,
  layers: [
    { id: 'sky', depth: 0.12, node: <rect x={-1500} y={-1500} width={W + 3000} height={H + 3000} fill="#DCE5EA" /> },
    { id: 'plane', depth: 1, node: (
      <g>
        <image href={asset('/scenes/home-trace.svg')} x="0" y="0" width={W} height={H} />
        {/* finer second trace of the open sky only (clouds and the sky tint), clipped to the sky area so buildings and trees keep the main trace */}
        <image href={asset('/scenes/home-sky.svg')} x="0" y="0" width={W} height={H} />
      </g>
    ) },
  ],
  // One still frame: the whole painting (slightly wider than the screen window), house and both figures on the left, text on the right.
  shot: { x: 688, y: 384, z: 0.92, xN: 430, yN: 400, zN: 1 },
};
