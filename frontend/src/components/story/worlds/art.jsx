// Flat drawing kit for the story worlds. Every helper draws in world units; (x, y) is the bottom centre unless noted.
export const C = {
  blue: '#1F5BA8', blueD: '#164580', blueL: '#BFE0F5', orange: '#F47C20', orangeD: '#C85E10', cream: '#FFF9F2', sand: '#F3E3CC',
  brown: '#8A5A2B', brownD: '#5A3213', brownL: '#B98350', leaf: '#4F9D3A', leafD: '#2E7D32', leafL: '#8BD450', yellow: '#FFC72C', glow: '#FFD66B',
  navy: '#00263F', teal: '#14A89B', tealD: '#0F766E', rose: '#E0577F', plum: '#6B46C1', grey: '#C9CED6', white: '#FFFFFF',
};
export const SKIN = { a: '#F6D3B3', b: '#D9A67C', c: '#A9744F', d: '#7B4F34' };

let gid = 0;
export function Sky({ w, h, top, mid, bot, id }) {
  const k = id || `sk${gid++}`;
  return (
    <g>
      <defs><linearGradient id={k} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} />{mid && <stop offset=".55" stopColor={mid} />}<stop offset="1" stopColor={bot} /></linearGradient></defs>
      <rect x="-1500" y="-1500" width={w + 3000} height={h + 3000} fill={`url(#${k})`} />
    </g>
  );
}

export const Cloud = ({ x, y, s = 1, o = 0.9 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity={o}>
    <ellipse cx="0" cy="0" rx="90" ry="26" /><ellipse cx="-34" cy="-18" rx="40" ry="26" /><ellipse cx="22" cy="-26" rx="48" ry="32" />
  </g>
);

export const Sun = ({ x, y, r = 60, color = '#FFD66B' }) => (
  <g><circle cx={x} cy={y} r={r * 2.2} fill={color} opacity=".22" /><circle cx={x} cy={y} r={r * 1.5} fill={color} opacity=".3" /><circle cx={x} cy={y} r={r} fill={color} /></g>
);

// Outdoor pieces (bark tree, twig nest, detailed house, hills with tree lines, grass, flowers, stones, fence) live in outdoors.jsx. Same props and footprints as the old flat ones.
export { Tree, Nest, House, Hills, Grass, Flowers, SteppingStones, Fence } from './outdoors';

// People now come from the figure builder (joint-angle poses, hair, outfits). Same props as before, plus outfit / hairStyle / glasses / cane / elder / item.
export { Figure as Person, PSW, Patient } from './figure';

// Interior pieces (wallpaper room shell, windows with curtains, wood furniture, kitchen, food, pill organiser, frames, lamps) live in indoors.jsx. Same props and footprints as the old flat ones.
export { Wall, Win, Frame, Rug, Table, Chair, Sofa, Armchair, Bed, Counter, Cushion, Mug, Kettle, FruitBowl, Plate, Pillbox, Lamp, Plant, Clock, Books } from './indoors';
