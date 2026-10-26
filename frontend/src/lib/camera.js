// Scroll-timeline camera. Pure functions, no DOM.
// A page's camera is a list of keys: { sec, x, y, z } (world units; z = zoom, 1 = closest).
//   sec: index of the page section that sits in the middle of the screen when the camera is at this key
//        ('top' = scroll 0, 'end' = bottom of page).
// xN / yN: optional centre used on phones (narrow screens); without yN phones use y - 190 so the ground stays in view.
// buildTrack turns keys + measured section positions into scroll stops; sample() eases between them.

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

// sections: [{ top, h }] in document pixels. vh: viewport height. max: max scrollY.
export function buildTrack(keys, sections, vh, max, narrow = false) {
  const stops = keys.map((k) => {
    let s = 0;
    if (k.sec === 'top') s = 0;
    else if (k.sec === 'end') s = max;
    else {
      const sec = sections[Math.min(sections.length - 1, Math.max(0, k.sec))];
      s = sec ? sec.top + sec.h / 2 - vh / 2 : 0;
    }
    return { s: clamp(s, 0, max), x: narrow && k.xN != null ? k.xN : k.x, y: narrow ? (k.yN != null ? k.yN : k.y - 190) : k.y, z: k.z == null ? 1 : k.z };
  });
  stops.sort((a, b) => a.s - b.s);
  // stops that land on the same scroll position (short pages) keep the later key
  return stops.filter((st, i) => i === stops.length - 1 || stops[i + 1].s - st.s > 1);
}

export function sample(track, s) {
  if (!track.length) return { x: 0, y: 0, z: 1 };
  if (s <= track[0].s) return track[0];
  const last = track[track.length - 1];
  if (s >= last.s) return last;
  let i = 0;
  while (track[i + 1].s < s) i += 1;
  const a = track[i]; const b = track[i + 1];
  const t = smooth((s - a.s) / (b.s - a.s));
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t };
}

// Where the world sits on screen. k = pixels per world unit at zoom 1.
// Returns the CSS transform for the world layer so that world point (x, y) is at the screen centre.
export function worldTransform(cam, k, vw, vh) {
  const kz = k * cam.z;
  return { tx: vw / 2 - cam.x * kz, ty: vh / 2 - cam.y * kz, scale: cam.z };
}

// World units per pixel scale: the world window is 1200 x 700 at zoom 1, covering the screen.
export const baseScale = (vw, vh) => Math.max(vw / 1200, vh / 700);

// Narrow screens see a slice of the world; pull the camera back a little so scenes still fit.
export const fitZoom = (vw) => Math.max(0.62, Math.min(1, vw / 1000));
