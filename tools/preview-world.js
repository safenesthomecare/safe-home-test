// Renders a world at each camera key to PNG. Usage: NODE_PATH=<deps>/node_modules node preview-world.js <worldId> <outDir> [phone]
// Static approximation of WorldCamera (window 1200x700/z at 16:9-ish; phone uses xN/yN and fitZoom). Layers shifted by cam*(1-depth).
const path = require('path'); const fs = require('fs');
const esbuild = require('esbuild'); const React = require('react'); const { renderToStaticMarkup } = require('react-dom/server');
const { chromium } = require('playwright');
const flatSrc = fs.readFileSync(path.join(root0(), 'frontend/src/lib/flatten.js'), 'utf8').replace('export function', 'function');
function root0() { return path.resolve(__dirname, '..'); }
const [, , id, out, mode] = process.argv; const phone = mode === 'phone';
const root = path.resolve(__dirname, '..'); const pub = path.join(root, 'frontend/public');
fs.mkdirSync(out, { recursive: true });
const bundle = path.join(out, '_b.js');
esbuild.buildSync({ entryPoints: [path.join(root, 'frontend/src/components/story/worlds/index.js')], bundle: true, outfile: bundle, platform: 'node', format: 'cjs', loader: { '.js': 'jsx' }, jsx: 'automatic', define: { 'process.env.PUBLIC_URL': JSON.stringify('file://' + pub) }, external: ['react', 'react-dom'], logLevel: 'error' });
const world = require(bundle).WORLDS[id];
const vw = phone ? 390 : 1440; const vh = phone ? 844 : 900;
const k = Math.max(vw / 1200, vh / 700); const fz = Math.max(0.62, Math.min(1, vw / 1000));
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: vw, height: vh } });
  for (let i = 0; i < world.keys.length; i++) {
    const key = world.keys[i];
    let cam = { x: phone && key.xN != null ? key.xN : key.x, y: phone ? (key.yN != null ? key.yN : key.y - 190) : key.y, z: (key.z == null ? 1 : key.z) * fz };
    const hw = vw / (2 * k * cam.z); const hh = vh / (2 * k * cam.z);
    cam.x = world.w > 2 * hw ? Math.min(world.w - hw, Math.max(hw, cam.x)) : world.w / 2; cam.y = world.h > 2 * hh ? Math.min(world.h - hh, Math.max(hh, cam.y)) : world.h / 2;
    const layers = world.layers.map((l) => React.createElement('g', { key: l.id, transform: `translate(${cam.x * (1 - l.depth)} ${cam.y * (1 - l.depth)})` }, l.node));
    const svg = renderToStaticMarkup(React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: vw, height: vh, viewBox: `${cam.x - hw} ${cam.y - hh} ${2 * hw} ${2 * hh}`, preserveAspectRatio: 'xMidYMid slice' }, layers));
    const html = path.join(out, '_p.html'); fs.writeFileSync(html, `<body style="margin:0;background:#000">${svg}</body>`); await pg.goto('file://' + html);
    if (process.env.FLAT !== '0') await pg.evaluate(`${flatSrc}; flattenGradients(document);`);
    if (i === world.keys.length - 1) await pg.evaluate(() => document.querySelectorAll('.sw-walk').forEach((e) => { e.style.transform = `translate(${e.style.getPropertyValue('--wx')}px, ${e.style.getPropertyValue('--wy')}px)`; }));
    await pg.waitForTimeout(100);
    await pg.screenshot({ path: path.join(out, `${id}-${phone ? 'phone' : 'desk'}-${i}-${key.sec}.png`) });
  }
  await b.close(); fs.unlinkSync(bundle); fs.rmSync(path.join(out, '_p.html'), { force: true });
})();
