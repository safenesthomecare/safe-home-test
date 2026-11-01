import { asset } from '../../../lib/asset';

// Contact: dusk, "Reach out any time". Point-by-point vector trace of the Contact reference painting
// (public/scenes/contact-trace.svg: colour-stepped shapes traced from the reference, so the brick colonial, shutters, garage, fences, trees, CN Tower skyline and both figures follow the original).
// Dusk light needs extra passes: a finer trace over the whole picture (public/scenes/contact-soft.svg, traced with the shadows lifted so dark steps are not merged) and contrast-stretched
// traces of the glowing areas, feathered (public/scenes/contact-glow.svg: lit windows, open door, horizon glow, sky clouds, house number).
// Both faces (the relative at the door, on the phone, and the PSW leaving with her bags) are faceless: only the skin inside each traced face outline (hairline, cheek, chin, jaw) was replaced
// with flat skin before tracing; hair, ears, hand and necks are untouched.
// Text panel sits on the right; the house, door and both figures are on the left of the painting.
const W = 1364; const H = 768;

export const CONTACT_WORLD = {
  w: W, h: H, side: 'right', soft: true,
  layers: [
    // Sky-and-path colours match the painting edges so the phone framing never shows an empty band.
    { id: 'back', depth: 0.12, node: (
      <g>
        <rect x={-1500} y={-1500} width={W + 3000} height={2085} fill="#252C69" />
        <rect x={-1500} y={585} width={W + 3000} height={H + 3000} fill="#2C2E3F" />
      </g>
    ) },
    { id: 'plane', depth: 1, node: (
      <g>
        <image href={asset('/scenes/contact-trace.svg')} x="0" y="0" width={W} height={H} />
        <image href={asset('/scenes/contact-soft.svg')} x="0" y="0" width={W} height={H} />
        <image href={asset('/scenes/contact-glow.svg')} x="0" y="0" width={W} height={H} />
      </g>
    ) },
  ],
  // One still frame: the whole painting, house and both figures on the left (text on the right). Phone: zoomed so the scene fills the screen, framing the door, the relative and the PSW.
  shot: { x: 620, y: 384, z: 0.92, xN: 420, yN: 384, zN: 1.5 },
};
