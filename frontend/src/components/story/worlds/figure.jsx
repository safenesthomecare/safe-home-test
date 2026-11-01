// Figure builder v2: faceless flat-colour people built from a small 3D skeleton, projected to 2D for five viewing angles.
// Body space: X = lateral (-1 = the figure's right, the arm nearest the camera when facing screen-right), Y = up, Z = forward.
// `view` = which way the figure is turned: front (faces camera), f34 (front three-quarter), side (profile, default), b34 (back three-quarter), back (back to camera).
// `face` (1 / -1) mirrors the whole figure left/right. Limb angles are degrees: f = swing forward, s = swing outward, both from "hanging straight down".
// Origin = feet (sole at y = 3). No animation, no outlines, no filters. `flat` removes the one soft shade gradient.
// v3 "single mesh" parts: every named part (head+neck, hair, shirt, each pair of trousers, each shoe, forearm+hand) is ONE <path>.
// Sub-shapes are joined into one `d` with identical winding, so the default nonzero fill renders their union; a trim (cardigan front, V-neck) is a reverse-wound hole over a same-position patch.
import { useId } from 'react';

const D = Math.PI / 180;
const f1 = (n) => Math.round(n * 10) / 10;
const FLOOR = 3; const ANKLE = 8; const THIGH = 43; const SHIN = 40; const UPPER = 31; const FORE = 28;

function mix(hex, to, k) {
  const n = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = n(hex); const b = n(to);
  return `#${a.map((v, i) => Math.round(v + (b[i] - v) * k).toString(16).padStart(2, '0')).join('')}`;
}
export const darken = (c, k = 0.25) => mix(c, '#000000', k);
export const lighten = (c, k = 0.25) => mix(c, '#ffffff', k);

export const VIEWS = { front: 0, f34: 45, side: 90, b34: 135, back: 180 };

// Direction of a segment from forward/outward angles. side: -1 = right limb (X<0), +1 = left limb.
const dirOf = (f, s, side) => {
  const F = f * D; const S = s * D;
  return [side * Math.sin(S) * Math.cos(F), -Math.cos(S) * Math.cos(F), Math.sin(F)];
};
// Project body-space vector v (X, Y up, Z forward) about origin o for body yaw psi. d = depth toward the camera.
const PITCH = 0.18; // camera sits slightly above the figure: nearer parts drop a little on screen
const proj = (psi, o, v) => {
  const dd = v[2] * Math.cos(psi) - v[0] * Math.sin(psi);
  return { x: o.x + v[0] * Math.cos(psi) + v[2] * Math.sin(psi), y: o.y - v[1] + PITCH * dd, d: o.d + dd, h: (o.h || 0) + v[1] };
};
const q = (p) => `${f1(p.x)} ${f1(p.y)}`;

// Tapered, slightly bulging limb between two screen points (round ends). Degenerate (foreshortened) limbs become a disc.
function limb(p0, p1, w0, w1, bulge = 0.12) {
  const dx = p1.x - p0.x; const dy = p1.y - p0.y; const len = Math.hypot(dx, dy);
  if (len < 1.5) {
    const r = (w0 + w1) / 4; const cx = (p0.x + p1.x) / 2; const cy = (p0.y + p1.y) / 2;
    return `M${f1(cx - r)} ${f1(cy)}a${r} ${r} 0 1 0 ${f1(2 * r)} 0a${r} ${r} 0 1 0 ${f1(-2 * r)} 0Z`;
  }
  const nx = -dy / len; const ny = dx / len; const r0 = w0 / 2; const r1 = w1 / 2; const rc = ((r0 + r1) / 2) * (1 + bulge * 2);
  const mx = (p0.x + p1.x) / 2; const my = (p0.y + p1.y) / 2;
  const P = (x, y) => `${f1(x)} ${f1(y)}`;
  return `M${P(p0.x + nx * r0, p0.y + ny * r0)} Q${P(mx + nx * rc, my + ny * rc)} ${P(p1.x + nx * r1, p1.y + ny * r1)} A${r1} ${r1} 0 0 0 ${P(p1.x - nx * r1, p1.y - ny * r1)} Q${P(mx - nx * rc, my - ny * rc)} ${P(p0.x - nx * r0, p0.y - ny * r0)} A${r0} ${r0} 0 0 0 ${P(p0.x + nx * r0, p0.y + ny * r0)}Z`;
}
// Closed rounded outline through the midpoints of a point ring.
function ring(pts) {
  const n = pts.length; const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  let d = `M${q(mid(pts[n - 1], pts[0]))}`;
  for (let i = 0; i < n; i += 1) d += `Q${q(pts[i])} ${q(mid(pts[i], pts[(i + 1) % n]))}`;
  return `${d}Z`;
}


// ---- Path toolkit: tiny parser for absolute M/L/Q/C/Z paths, used to give every sub-shape the same winding (counter-clockwise on screen) so joined sub-paths union.
const ARITY = { M: 2, L: 2, Q: 4, C: 6 };
function parse(d) {
  const ops = []; const re = /([MLQCZ])([^MLQCZ]*)/g; let m;
  while ((m = re.exec(d))) {
    const c = m[1]; if (c === 'Z') continue;
    const n = (m[2].match(/-?\d*\.?\d+/g) || []).map(Number); const k = ARITY[c];
    for (let i = 0; i < n.length; i += k) ops.push({ c: i && c === 'M' ? 'L' : c, p: n.slice(i, i + k) });
  }
  return ops;
}
const str = (ops) => `${ops.map((o) => o.c + o.p.map(f1).join(' ')).join('')}Z`;
const area = (ops) => {
  const pts = []; ops.forEach((o) => { for (let i = 0; i < o.p.length; i += 2) pts.push([o.p[i], o.p[i + 1]]); });
  let s = 0; pts.forEach((a, i) => { const b = pts[(i + 1) % pts.length]; s += a[0] * b[1] - b[0] * a[1]; });
  return s;
};
const rev = (ops) => {
  const end = (o) => [o.p[o.p.length - 2], o.p[o.p.length - 1]];
  const out = [{ c: 'M', p: end(ops[ops.length - 1]) }];
  for (let i = ops.length - 1; i >= 1; i -= 1) {
    const o = ops[i]; const prev = end(ops[i - 1]);
    if (o.c === 'L') out.push({ c: 'L', p: prev });
    else if (o.c === 'Q') out.push({ c: 'Q', p: [o.p[0], o.p[1], ...prev] });
    else out.push({ c: 'C', p: [o.p[2], o.p[3], o.p[0], o.p[1], ...prev] });
  }
  return out;
};
const orient = (d, want) => { const ops = parse(d); const s = area(ops); return str((want === 'ccw' ? s > 0 : s < 0) ? rev(ops) : ops); };
const ccw = (d) => orient(d, 'ccw');
const cw = (d) => orient(d, 'cw'); // reverse winding = a hole inside a joined path
const join = (...ds) => ds.filter(Boolean).join('');
const ell = (cx, cy, rx, ry) => `M${f1(cx - rx)} ${f1(cy)}a${f1(rx)} ${f1(ry)} 0 1 0 ${f1(2 * rx)} 0a${f1(rx)} ${f1(ry)} 0 1 0 ${f1(-2 * rx)} 0Z`;
// Move + rotate a parsed shape (same as translate(x y) rotate(-a)).
const place = (d, x, y, aDeg) => {
  const t = -aDeg * D; const c = Math.cos(t); const s = Math.sin(t);
  return str(parse(d).map((o) => ({ c: o.c, p: o.p.map((v, i) => (i % 2 === 0 ? x + v * c - o.p[i + 1] * s : y + o.p[i - 1] * s + v * c)) })));
};

// ---- Poses (3D). a = right limbs (X<0), b = left limbs. Arms: u = upper arm [f, s], l = forearm [f, s] (absolute). Legs: t = thigh, sh = shin.
// lean = torso pitch forward, tw = torso yaw relative to pelvis (walk counter-rotation), hipZ = pelvis forward/back (sitting back onto a seat).
const POSES = {
  stand: { a: { u: [5, 6], l: [11, 5] }, b: { u: [-4, 6], l: [-1, 5] }, la: { t: [4, 3], sh: [1, 2] }, lb: { t: [-3, 3], sh: [0, 2] }, lean: 0, tw: 0 },
  walk: { a: { u: [-18, 6], l: [-6, 5] }, b: { u: [18, 6], l: [34, 5] }, la: { t: [20, 2], sh: [8, 2] }, lb: { t: [-18, 2], sh: [-38, 2] }, lean: 4, tw: -10 },
  wave: { a: { u: [35, 80], l: [12, 172] }, b: { u: [-4, 6], l: [-1, 5] }, la: { t: [4, 3], sh: [1, 2] }, lb: { t: [-3, 3], sh: [0, 2] }, lean: 0, tw: 0, wave: true },
  open: { a: { u: [28, 38], l: [64, 30] }, b: { u: [28, 38], l: [64, 30] }, la: { t: [5, 3], sh: [1, 2] }, lb: { t: [-3, 3], sh: [0, 2] }, lean: 0, tw: 0, open: true },
  hold: { a: { u: [26, 8], l: [96, 4] }, b: { u: [16, 8], l: [78, 6] }, la: { t: [4, 3], sh: [1, 2] }, lb: { t: [-3, 3], sh: [0, 2] }, lean: 1, tw: 0 },
  give: { a: { u: [38, 10], l: [86, 2] }, b: { u: [8, 6], l: [14, 4] }, la: { t: [6, 3], sh: [1, 2] }, lb: { t: [-3, 3], sh: [0, 2] }, lean: 2, tw: 0, open: true },
  point: { a: { u: [82, 12], l: [88, 10] }, b: { u: [-4, 6], l: [-1, 5] }, la: { t: [5, 3], sh: [1, 2] }, lb: { t: [-3, 3], sh: [0, 2] }, lean: 1, tw: 0 },
  rise: { a: { u: [34, 8], l: [52, 6] }, b: { u: [30, 8], l: [48, 6] }, la: { t: [42, 3], sh: [6, 2] }, lb: { t: [38, 3], sh: [4, 2] }, lean: 26, tw: 0, hipZ: -6 },
  steady: { a: { u: [48, 20], l: [78, 14] }, b: { u: [10, 6], l: [20, 5] }, la: { t: [7, 3], sh: [1, 2] }, lb: { t: [-6, 3], sh: [0, 2] }, lean: 6, tw: 0 },
  check: { a: { u: [86, 8], l: [115, 6] }, b: { u: [46, 18], l: [78, 10] }, la: { t: [6, 3], sh: [1, 2] }, lb: { t: [-5, 3], sh: [0, 2] }, lean: 14, tw: 0 },
  sit: { a: { u: [14, 8], l: [68, -14] }, b: { u: [8, 8], l: [60, -14] }, la: { t: [88, 3], sh: [1, 2] }, lb: { t: [86, 3], sh: [-6, 2] }, lean: 3, tw: 0, hipZ: -5, sit: true },
};

// ---- Hands (one path each; placed at the wrist by `place`)
const HAND_OPEN = ccw('M-5.5 2 Q-8 11 -2 15 Q4 17 7 10 L10 4 Q9 1 6 3 L4 1Z');
const HAND_FIST = ccw('M-5 2 Q-6.5 11 -1.5 14 Q4 15 5.5 9 Q6 4 4 1Z');

// ---- Head: five hand-drawn views. k: 0 front, 1 f34, 2 side, 3 b34, 4 back. Local origin = head centre (top -30, chin +13).
const SIL_FRONT = 'M-16 -8 C-16.5 -23 -8 -30 0 -30 C8 -30 16.5 -23 16 -8 C15.5 1 10 10 0 13 C-10 10 -15.5 1 -16 -8Z';
const SIL_34 = 'M-16.5 -6 C-17 -23 -7 -30 3 -30 C13 -30 18 -23 17.5 -10 C17 -4 13 4 8 9 C3 13 -4 13 -9 9 C-14 5 -16 0 -16.5 -6Z';
const SIL_SIDE = 'M-16.5 -4 C-17 -22 -6 -30 4 -29 C15 -29 20 -20 18.5 -9 C18 -4 15 3 11 8 C6 13 -3 14 -9 10 C-14 6 -16 1 -16.5 -4Z';
const SIL = [SIL_FRONT, SIL_34, SIL_SIDE, SIL_34, SIL_FRONT];
// Hair cap = the part of the scalp covered. Front: top and fringe, sides to the ears. Back views: the whole back of the head.
const CAP = [
  'M-17 -4 C-18 -25 -8 -32 0 -32 C8 -32 18 -25 17 -4 C15 -15 9 -21 0 -21 C-9 -21 -15 -15 -17 -4Z',
  'M-18 -3 C-21 -22 -9 -33 3 -32 C16 -32 21 -22 18.5 -11 C14 -19 5 -22 -2 -21 C-8 -20 -13 -14 -13.5 -3Z',
  'M-18.5 -2 C-22 -22 -10 -33 3 -32 C16 -32 21 -22 18.5 -10 C14 -19 5 -23 -3 -22 C-9 -21 -14 -14 -14 -2Z',
  'M-18 -4 C-19 -26 -8 -33 3 -32 C15 -32 20 -23 18.5 -9 C17.5 -3 15 2 11 4 C5 7 -4 8 -10 5 C-15 3 -17.5 0 -18 -4Z',
  'M-17.5 -4 C-18 -26 -8 -33 0 -33 C8 -33 18 -26 17.5 -4 C17 3 12 9 6 10 C2 11 -2 11 -6 10 C-12 9 -17 3 -17.5 -4Z',
];
const RING = [[-15, -8, 7], [-17, -17, 7.5], [-12, -27, 8], [0, -31, 8.5], [12, -27, 8], [17, -17, 7.5], [15, -8, 7]];
const RING_SIDE = [[-15, -8, 7], [-18, -17, 7.5], [-12, -27, 8], [-2, -31, 8.5], [9, -29, 8], [17, -20, 7.5], [19, -9, 6.5]];
const NAPE = [[-11, 3, 7], [0, 6, 7], [11, 3, 7]];
// Hair = ONE path: scalp cap + bun (or curls). Long / wavy styles were retired (everyone on screen wears the bun, short, curly or bald).
const SILS = SIL.map(ccw); const CAPS = CAP.map(ccw);
function headParts({ k, psi, style }) {
  const bald = style === 'bald'; const bun = style === 'bun'; const curly = style === 'curly';
  let hair = '';
  if (!bald) {
    hair = CAPS[k];
    if (bun) hair += ell(-12 * Math.sin(psi), -32, 9.5, 9.5);
    if (curly) {
      const rg = k === 1 || k === 2 || k === 3 ? RING_SIDE : RING;
      hair += rg.map(([cx, cy, r]) => ell(cx, cy, r, r)).join('');
      if (k >= 3) hair += NAPE.map(([cx, cy, r]) => ell(cx, cy, r, r)).join('');
      hair += ell(k === 0 ? 0 : -3, -21, 6, 6);
    }
  }
  return { skin: SILS[k], hair };
}

// Props: pose, view, face, outfit (tee|scrubs|cardigan), hairStyle (short|bun|curly|wavy|long|bald), cane, elder, item (node drawn at the right hand), lean, look (head turn in degrees, + toward the figure's forward-left), walk (shortcut for pose walk).
export function Figure({
  x = 0, y = 0, s = 1, scale = 1, face = 1, skin = '#F6D3B3', hair = '#4A3427', top = '#14A89B', bottom = '#2B3A55', shoe = '#3B2F2A',
  pose = 'stand', view = 'side', look = 0, flat = false, walk = false, bald = false, outfit = 'tee', hairStyle, cane = false, elder = false, item = null, lean,
}) {
  const uid = `fg${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const P0 = POSES[pose] || POSES.stand;
  const P = walk && !P0.wave && !P0.sit ? { ...POSES.walk, open: P0.open } : P0;
  const sit = !!P.sit;
  const style = bald ? 'bald' : hairStyle || 'short';
  const yaw = typeof view === 'number' ? view : (VIEWS[view] ?? 90);
  const L = ((lean ?? 0) + P.lean + (elder ? (sit ? 6 : 9) : 0)) * D;
  const tw = P.tw || 0;
  const psiP = (yaw - tw / 2) * D; const psiT = (yaw + tw / 2) * D;
  const psiH = Math.max(0, Math.min(180, yaw + tw / 2 + look)) * D;
  const hk = Math.round((psiH / D) / 45);

  // Legs (pelvis frame). Elder: soft knees.
  const legSpec = (l) => (elder && !sit ? { t: [l.t[0] + 6, l.t[1]], sh: [l.sh[0] - 7, l.sh[1]] } : l);
  const lg = { a: legSpec(P.la), b: legSpec(P.lb) };
  const dT = { a: dirOf(lg.a.t[0], lg.a.t[1], -1), b: dirOf(lg.b.t[0], lg.b.t[1], 1) };
  const dS = { a: dirOf(lg.a.sh[0], lg.a.sh[1], -1), b: dirOf(lg.b.sh[0], lg.b.sh[1], 1) };
  const drop = (k) => -dT[k][1] * THIGH - dS[k][1] * SHIN;
  const H = Math.max(drop('a'), drop('b')) + ANKLE; // pelvis height: the lower foot is planted
  const O = { x: 0, y: FLOOR, d: 0 };
  const Pp = proj(psiP, { x: 0, y: FLOOR - H, d: 0, h: H }, [0, 0, P.hipZ || 0]);

  const legGeo = (k) => {
    const side = k === 'a' ? -1 : 1;
    const hip = proj(psiP, Pp, [side * 9, 0, 0]);
    const knee = proj(psiP, hip, dT[k].map((v) => v * THIGH));
    const ank = proj(psiP, knee, dS[k].map((v) => v * SHIN));
    const Ah = ank.h; // ankle height above the floor
    const yh = Ah - 3.5; const yt = Math.max(4.5, yh > 14 ? yh - 10 : 4.5);
    const fwd = [side * 0.17, 0, 1];
    const heel = proj(psiP, ank, fwd.map((v) => v * -7)); const toe = proj(psiP, ank, fwd.map((v) => v * 17));
    heel.y = FLOOR - yh + PITCH * heel.d; toe.y = FLOOR - yt + PITCH * toe.d;
    return { hip, knee, ank, heel, toe, kd: knee.d - hip.d };
  };
  const LG = { a: legGeo('a'), b: legGeo('b') };
  const cp = Math.abs(Math.cos(psiP));
  const mesh = (key, d, fill) => (d ? <g key={key}><path d={d} fill={fill} />{!flat && <path d={d} fill={`url(#${uid})`} />}</g> : null);
  const legNode = (k) => {
    const g = LG[k]; const o = LG[k === 'a' ? 'b' : 'a'];
    const dim = g.hip.d < o.hip.d - 0.5;
    const c = dim ? darken(bottom, 0.12) : bottom;
    const sc = dim ? darken(shoe, 0.12) : shoe;
    const shoeD = join(limb(g.heel, g.toe, 11, 8, 0.1), cp > 0.25 ? ell((g.heel.x + g.toe.x) / 2, (g.heel.y + g.toe.y) / 2, 6.5 * cp + 1, 4.6) : '');
    return <g key={`leg${k}`}>{mesh('shoe', shoeD, sc)}{mesh('trou', join(limb(g.hip, g.knee, 21, 15.5, 0.1), limb(g.knee, g.ank, 15, 11, 0.06)), c)}</g>;
  };

  // Torso frame: lean about the lateral axis, then yaw psiT.
  const up = (h, z = 0) => [0, h * Math.cos(L) - z * Math.sin(L), h * Math.sin(L) + z * Math.cos(L)];
  const arm = (k) => {
    const side = k === 'a' ? -1 : 1; const sp = P[k];
    const sh = proj(psiT, Pp, [side * 19, ...up(74).slice(1)]);
    const el = proj(psiT, sh, dirOf(sp.u[0], sp.u[1], side).map((v) => v * UPPER));
    const wr = proj(psiT, el, dirOf(sp.l[0], sp.l[1], side).map((v) => v * FORE));
    const ang = Math.hypot(wr.x - el.x, wr.y - el.y) < 1 ? 0 : Math.atan2(wr.x - el.x, wr.y - el.y) / D;
    return { sh, el, wr, ang, depth: (sh.d + el.d + wr.d) / 3 };
  };
  const AR = { a: arm('a'), b: arm('b') };
  const cardi = outfit === 'cardigan';
  const dimOf = (k) => AR[k].depth < 0 && AR[k].sh.d < -1;
  // Sleeve = upper arm (+ forearm when the cardigan covers it). Skin = bare forearm + hand, ONE path.
  const sleeveD = (k) => join(limb(AR[k].sh, AR[k].el, 14, 11, 0.12), cardi ? limb(AR[k].el, AR[k].wr, 10.5, 8.5, 0.08) : '');
  const skinD = (k) => {
    const g = AR[k]; const len = Math.hypot(g.wr.x - g.el.x, g.wr.y - g.el.y); const t = len > 6 ? 3 / len : 0;
    const st = { x: g.el.x + (g.wr.x - g.el.x) * t, y: g.el.y + (g.wr.y - g.el.y) * t };
    return join(cardi ? '' : limb(st, g.wr, 10.5, 8.5, 0.08), place(P.open || P.wave ? HAND_OPEN : HAND_FIST, g.wr.x, g.wr.y, g.ang));
  };
  const dimArm = (k) => <g key={`arm${k}`}>{mesh('skin', skinD(k), darken(skin, 0.16))}{mesh('sleeve', sleeveD(k), darken(top, 0.16))}</g>;

  // Torso silhouette, width from yaw: lateral half-width * |cos| and depth half-thickness * |sin|.
  const spine = (h, psi) => proj(psi, Pp, up(h));
  const hw = (a, b, psi) => Math.hypot(a * Math.cos(psi), b * Math.sin(psi));
  const psiM = (psiP + psiT) / 2;
  const row = (h, a, b, psi, dy = 0) => { const c = spine(h, psi); c.y += dy; return [{ x: c.x - hw(a, b, psi), y: c.y }, { x: c.x + hw(a, b, psi), y: c.y }]; };
  const rows = [row(0, 20.5, 14.5, psiP), row(26, 17.5, 13, psiM), row(54, 20.5, elder ? 16 : 14.5, psiT), row(74, 22, 12, psiT, -1), row(82, 9, 6, psiT, -1)];
  const hemC = spine(-3, psiP); hemC.y += 2;
  const leftSide = rows.map((r) => r[0]); const rightSide = [...rows].reverse().map((r) => r[1]);
  const torsoPath = ccw(ring([...leftSide, ...rightSide, hemC]));
  const cfT = Math.cos(psiT); const sfT = Math.sin(psiT);
  const dk = darken(top, 0.22);
  // Trim (cardigan front / scrub V-neck): a patch drawn first, then cut out of the shirt path as a reverse-wound hole so arms still cover it.
  let trimD = ''; let trimFill = dk;
  if (outfit === 'cardigan' && cfT > 0.12) {
    const a0 = spine(78, psiT); const a1 = spine(2, psiP); const o = 11 * sfT; trimFill = '#FFF3E0';
    trimD = `M${f1(a0.x + o - 9 * cfT)} ${f1(a0.y)} Q${f1(a0.x + o)} ${f1(a0.y + 8)} ${f1(a0.x + o + 9 * cfT)} ${f1(a0.y)} L${f1(a1.x + o + 8 * cfT)} ${f1(a1.y)} Q${f1(a1.x + o)} ${f1(a1.y + 3)} ${f1(a1.x + o - 8 * cfT)} ${f1(a1.y)}Z`;
  } else if (outfit === 'scrubs' && cfT > 0.1) {
    const a0 = spine(79, psiT); const o = 11 * sfT;
    trimD = `M${f1(a0.x + o - 10 * cfT)} ${f1(a0.y)} L${f1(a0.x + o)} ${f1(a0.y + 21)} L${f1(a0.x + o + 10 * cfT)} ${f1(a0.y)}Z`;
  } else if (outfit === 'scrubs' && cfT < -0.1) {
    const a0 = spine(79, psiT);
    trimD = `M${f1(a0.x - 9 * -cfT)} ${f1(a0.y)} Q${f1(a0.x)} ${f1(a0.y + 5)} ${f1(a0.x + 9 * -cfT)} ${f1(a0.y)} L${f1(a0.x + 8 * -cfT)} ${f1(a0.y - 2)} L${f1(a0.x - 8 * -cfT)} ${f1(a0.y - 2)}Z`;
  }
  const trimNode = trimD ? <path d={ccw(trimD)} fill={trimFill} /> : null;
  const arms = ['a', 'b'].sort((m, n) => AR[m].depth - AR[n].depth);
  const armsBehind = arms.filter((k) => AR[k].sh.d < -1 && AR[k].depth < -1); const armsFront = arms.filter((k) => !armsBehind.includes(k));
  const shirtArms = armsFront.filter((k) => !dimOf(k)); const lateDim = armsFront.filter(dimOf);
  // THE shirt: torso + every near-side sleeve, one path (with the trim punched out).
  const shirtNode = mesh('shirt', join(torsoPath, ...shirtArms.map(sleeveD), trimD ? cw(trimD) : ''), top);

  // Head + neck = ONE skin path (neck drawn in head space); hair = ONE path.
  const hz = elder ? 6 : 0;
  const headAt = proj(psiT, Pp, [0, ...up(104, hz).slice(1)]);
  const neckBase = spine(79, psiT); const neckTop = proj(psiT, Pp, [0, ...up(95, hz).slice(1)]);
  const rot = elder ? 4 * Math.sin(psiH) : 0; const rr = rot * D;
  const toLocal = (p) => { const dx = p.x - headAt.x; const dy = p.y - headAt.y; return { x: dx * Math.cos(rr) + dy * Math.sin(rr), y: -dx * Math.sin(rr) + dy * Math.cos(rr) }; };
  const hp = headParts({ k: hk, psi: psiH, style });
  const headNode = (
    <g transform={`translate(${f1(headAt.x)} ${f1(headAt.y)}) rotate(${rot})`}>
      {mesh('skin', join(hp.skin, limb(toLocal(neckBase), toLocal(neckTop), 13, 12, 0)), skin)}
      {style !== 'bald' && <path d={hp.hair} fill={hair} />}
    </g>
  );

  const hand = AR.a.wr;
  const shadowRx = 24 + 10 * Math.abs(Math.sin(psiP));
  // Draw order by depth: legs reaching toward the camera and arms in front of the torso come after it.
  const order = ['a', 'b'].sort((m, n) => LG[m].hip.d - LG[n].hip.d);
  const legsBehind = order.filter((k) => LG[k].kd <= 6); const legsFront = order.filter((k) => LG[k].kd > 6);
  return (
    <g transform={`translate(${x} ${y}) scale(${face * s * scale} ${s * scale})`}>
      {!flat && (
        <defs>
          <linearGradient id={uid} x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0" stopColor="#fff" stopOpacity="0.26" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.22" />
          </linearGradient>
        </defs>
      )}
      <ellipse cx={f1(O.x + 3 * Math.sin(psiP))} cy="2" rx={f1(shadowRx)} ry="5.5" fill="#000" opacity=".14" />
      {legsBehind.map(legNode)}
      {armsBehind.map(dimArm)}
      {trimNode}
      {shirtNode}
      {headNode}
      {legsFront.map(legNode)}
      {lateDim.map(dimArm)}
      {shirtArms.map((k) => mesh(`hand${k}`, skinD(k), skin))}
      {item && <g transform={`translate(${f1(hand.x)} ${f1(hand.y)})`}>{item}</g>}
      {cane && (
        <g stroke="#8A5A2B" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d={`M${f1(hand.x + 2)} ${f1(hand.y + 6)} L${f1(hand.x + 4)} ${FLOOR}`} />
          <path d={`M${f1(hand.x + 2)} ${f1(hand.y + 6)} L${f1(hand.x + 3)} ${f1(hand.y - 2)} Q${f1(hand.x + 3)} ${f1(hand.y - 14)} ${f1(hand.x - 9)} ${f1(hand.y - 11)}`} />
        </g>
      )}
    </g>
  );
}

// Story cast (SHOTS.md). Flat solid fills, no shade gradient. dusk = darker tones for the Contact scene.
// PSW: blue scrubs, navy shoes, hair bun. Patient: orange cardigan, cream trousers, elder posture, SAME bun as the PSW (hair colour stays grey).
// Relative (Home + Contact, the welcoming person at the door): Contact's blue cardigan and stone trousers, the PSW bun in black, upright.
export const CAST = {
  psw: { top: '#0066B3', bottom: '#003B66', shoe: '#003B66', dusk: '#7FC1F5' },
  patient: { top: '#BC5509', bottom: '#FFF9F2', shoe: '#7B4A1E', dusk: '#FFA24D' },
  relative: { top: '#3E6AA5', bottom: '#C9BFB2', shoe: '#7B4A1E', hair: '#15110F' },
};
export function PSW({ dusk = false, ...p }) {
  const c = CAST.psw;
  return <Figure outfit="scrubs" hairStyle="bun" hair="#2B2220" flat top={dusk ? c.dusk : c.top} bottom={c.bottom} shoe={c.shoe} {...p} />;
}
export function Patient({ dusk = false, ...p }) {
  const c = CAST.patient;
  return <Figure outfit="cardigan" hairStyle="bun" hair="#DADDE3" elder flat top={dusk ? c.dusk : c.top} bottom={dusk ? '#C9BFB2' : c.bottom} shoe={c.shoe} {...p} />;
}
// `dusk` is accepted so it can replace <Patient dusk> in place; the Relative's colours are the same day and night.
export function Relative({ dusk = false, ...p }) {
  const c = CAST.relative; void dusk;
  return <Figure outfit="cardigan" hairStyle="bun" hair={c.hair} flat top={c.top} bottom={c.bottom} shoe={c.shoe} {...p} />;
}
