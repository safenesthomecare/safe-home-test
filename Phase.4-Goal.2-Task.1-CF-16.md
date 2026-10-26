# CF-16: Faceless silhouette figures, no body loops
**Done:** `figure.jsx` rewritten: no eyes, brows, nose, mouth, cheek, ear, wrinkles or glasses; no outlines; mitten hands; single-shape shoes; flat fills with one soft shade; back limbs a shade darker. `walk` is now a fixed stride. Removed `sw-leg`, `sw-arm`, `sw-wave` keyframes from `story.css` and the offscreen-pause observer from `WorldCamera.jsx` (scroll walkers `.sw-walk` kept). `figure.jsx` 8.5 KB (was 14068 bytes). `docs/` rebuilt (JS 137.3 kB gzip). Style guide rewritten.
**Checked:** build compiles, no page errors on all 6 pages at desktop and phone width, zero running SVG animations.
**Pending:** `docs/kit/` screenshots and `KIT-BUDGET.md` still show the old figures; re-capture if wanted.
**Decisions:** `glasses` prop kept but draws nothing (it read as an eye mark).
**Files:** `frontend/src/components/story/worlds/figure.jsx`, `FIGURE-STYLE.md`, `frontend/src/components/story/WorldCamera.jsx`, `frontend/src/story.css`, `docs/*`, this file.
