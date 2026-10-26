// Flat-colour rule: replace every SVG gradient inside `root` with one solid colour (the average of its stops).
// Radial gradients that fade out (glows, halos) are removed: lit windows already carry their own solid fill. Safe to call repeatedly.
export function flattenGradients(root) {
  const rgb = (h) => { if (!h || h[0] !== '#') return null; const s = h.length === 4 ? `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}` : h; return [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16)); };
  root.querySelectorAll('linearGradient,radialGradient').forEach((g) => {
    const stops = Array.from(g.querySelectorAll('stop')); if (!stops.length || g.dataset.flat) return;
    const op = (s) => { const v = s.getAttribute('stop-opacity'); return v == null ? 1 : parseFloat(v); };
    const cols = stops.map((s) => rgb(s.getAttribute('stop-color'))).filter(Boolean); if (!cols.length) return;
    const glow = g.tagName.toLowerCase() === 'radialgradient' && op(stops[stops.length - 1]) < 0.05;
    const use = glow ? [cols[0]] : cols;
    const c = [0, 1, 2].map((i) => Math.round(use.reduce((a, v) => a + v[i], 0) / use.length));
    const o = glow ? 0 : stops.reduce((a, s) => a + op(s), 0) / stops.length;
    const hex = `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
    stops.forEach((s, i) => { s.setAttribute('stop-color', hex); s.setAttribute('stop-opacity', String(o)); s.setAttribute('offset', i === 0 ? '0' : '1'); });
    g.dataset.flat = '1';
  });
}
