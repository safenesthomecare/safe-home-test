#!/usr/bin/env python3
"""Reusable scene tracer (Phase A1). Usage:
  python3 -I trace-scene.py <ref.jpg> <out_dir> <name> [soft_masks.json] [face_masks.json]
face_masks.json: [[[x,y],...], ...]  polygons painted with flat skin (median colour of the polygon area) before tracing.
soft_masks.json: [{"name":"sky","poly":[[x,y],...]} | {"name":"glow","ellipse":[cx,cy,rx,ry]}, ...]
Writes <out_dir>/<name>-trace.svg (main, mean-shift smoothed, colour-stepped) and <name>-soft.svg (finer trace clipped to the soft masks)."""
import sys, json, os, re, cv2, numpy as np, vtracer
ref, out, name = sys.argv[1:4]
soft = json.load(open(sys.argv[4])) if len(sys.argv) > 4 else []
faces = json.load(open(sys.argv[5])) if len(sys.argv) > 5 else []
img = cv2.imread(ref); h, w = img.shape[:2]
for poly in faces:
    p = np.array(poly, np.int32); m = np.zeros((h, w), np.uint8); cv2.fillPoly(m, [p], 255)
    c = np.median(img[m > 0], axis=0).tolist(); img[m > 0] = c
# Night scenes: TRACE_GAMMA=0.5 lifts the shadows before tracing (so faint glow steps are not merged) and restores the colours in the SVG fills afterwards.
G = float(os.environ.get('TRACE_GAMMA', '1'))
if G != 1: img = (255 * (img / 255.0) ** G).astype(np.uint8)
def unlift(path):
    if G == 1: return
    f = lambda m: '#%02X%02X%02X' % tuple(int(round(255 * (int(m.group(1)[i:i+2], 16) / 255.0) ** (1 / G))) for i in (0, 2, 4))
    t = open(path).read(); open(path, 'w').write(re.sub(r'#([0-9A-Fa-f]{6})', f, t))
os.makedirs(out, exist_ok=True); tmp = os.path.join(out, '_t')
os.makedirs(tmp, exist_ok=True)
a = os.path.join(tmp, 'a.png'); b = os.path.join(tmp, 'b.png')
cv2.imwrite(a, cv2.pyrMeanShiftFiltering(img, 7, 16))
cv2.imwrite(b, cv2.pyrMeanShiftFiltering(img, 3, 4))
vtracer.convert_image_to_svg_py(a, os.path.join(out, f'{name}-trace.svg'), colormode='color', hierarchical='stacked', mode='spline',
    filter_speckle=4, color_precision=6, layer_difference=10, corner_threshold=60, length_threshold=4.0, splice_threshold=45, path_precision=1)
unlift(os.path.join(out, f'{name}-trace.svg'))
if soft:
    m = np.zeros((h, w), np.uint8)
    for s in soft:
        if 'crop' in s: continue
        if 'poly' in s: cv2.fillPoly(m, [np.array(s['poly'], np.int32)], 255)
        else:
            cx, cy, rx, ry = s['ellipse']; cv2.ellipse(m, (cx, cy), (rx, ry), 0, 0, 360, 255, -1)
    m = (m > 127).astype(np.uint8) * 255
    vtracer.convert_image_to_svg_py(b, os.path.join(tmp, 'f.svg'), colormode='color', hierarchical='stacked', mode='spline',
        filter_speckle=12, color_precision=8, layer_difference=2, corner_threshold=60, length_threshold=4.0, splice_threshold=45, path_precision=1)
    cs, _ = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    d = ''.join('M' + ' L'.join(f'{x} {y}' for x, y in c[:, 0]) + 'Z' for c in cs if len(c) > 2)
    body = open(os.path.join(tmp, 'f.svg')).read(); body = body[body.index('<svg'):].split('>', 1)[1].rsplit('</svg>', 1)[0]
    open(os.path.join(out, f'{name}-soft.svg'), 'w').write(
        f'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><defs><clipPath id="softclip"><path clip-rule="evenodd" d="{d}"/></clipPath></defs><g clip-path="url(#softclip)">{body}</g></svg>')
    unlift(os.path.join(out, f'{name}-soft.svg'))
import shutil; shutil.rmtree(tmp)

# Glow areas: soft entries with "crop":[x0,y0,x1,y1] (plus optional "ellipse"-shaped clip) are traced on their own with the contrast stretched to the full range,
# so faint light steps (lamp halo, moon haze) survive; colours are restored in the fills afterwards. Result: <name>-glow.svg, laid over the soft trace.
glows = [s for s in soft if 'crop' in s]
if glows:
    src = cv2.imread(ref)
    for poly in faces:
        pp = np.array(poly, np.int32); mm = np.zeros((h, w), np.uint8); cv2.fillPoly(mm, [pp], 255); src[mm > 0] = np.median(src[mm > 0], axis=0)
    parts = []; defs = []
    for i, g in enumerate(glows):
        x0, y0, x1, y1 = g['crop']; c = src[y0:y1, x0:x1].astype(np.float32)
        lo = np.percentile(c.reshape(-1, 3), 1, axis=0); hi = np.percentile(c.reshape(-1, 3), 99, axis=0); hi = np.maximum(hi, lo + 8)
        st = np.clip((c - lo) / (hi - lo) * 255, 0, 255).astype(np.uint8)
        st = cv2.pyrMeanShiftFiltering(st, 3, 5)
        a_, b_ = os.path.join(out, f'_g{i}.png'), os.path.join(out, f'_g{i}.svg'); cv2.imwrite(a_, st)
        vtracer.convert_image_to_svg_py(a_, b_, colormode='color', hierarchical='stacked', mode='spline', filter_speckle=8, color_precision=8, layer_difference=6,
            corner_threshold=60, length_threshold=4.0, splice_threshold=45, path_precision=1)
        t = open(b_).read(); t = t[t.index('<svg'):].split('>', 1)[1].rsplit('</svg>', 1)[0]
        # bgr order: hex is RGB, lo/hi arrays are BGR
        def back(m, lo=lo, hi=hi):
            r, gg, bb = (int(m.group(1)[j:j+2], 16) for j in (0, 2, 4)); v = (r, gg, bb)
            rgb = [lo[2] + v[0] / 255 * (hi[2] - lo[2]), lo[1] + v[1] / 255 * (hi[1] - lo[1]), lo[0] + v[2] / 255 * (hi[0] - lo[0])]
            return '#%02X%02X%02X' % tuple(int(round(min(255, max(0, q)))) for q in rgb)
        t = re.sub(r'#([0-9A-Fa-f]{6})', back, t)
        cx, cy, rx, ry = (x0 + x1) // 2, (y0 + y1) // 2, (x1 - x0) // 2, (y1 - y0) // 2
        # feathered edge: radial mask (full strength inside 55% of the ellipse, fading to nothing at its rim) so the glow blends into the soft trace
        defs.append(f'<radialGradient id="gr{i}"><stop offset="0.55" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>'
                    f'<mask id="gm{i}" maskUnits="userSpaceOnUse" x="{x0}" y="{y0}" width="{x1-x0}" height="{y1-y0}"><ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="url(#gr{i})"/></mask>')
        parts.append(f'<g mask="url(#gm{i})"><g transform="translate({x0},{y0})">{t}</g></g>')
        os.remove(a_); os.remove(b_)
    open(os.path.join(out, f'{name}-glow.svg'), 'w').write(f'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><defs>{"".join(defs)}</defs>{"".join(parts)}</svg>')
