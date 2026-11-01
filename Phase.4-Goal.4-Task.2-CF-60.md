# Phase 4 / Goal 4.4 / Task 4.4.2 — props-care.jsx single-path parts (CF-60)

## Done (file: frontend/src/components/story/worlds/props-care.jsx)
- Imports `rrectP` (as `rP`) from outdoors.jsx (added in CF-54, in this zip). New local `pP` polygon helper, wound like `rP`/`dotP`/`ovalP`, so joined shapes show as their union.
- Merged into one path per part (same colour, same role):
  - Walker: legs + top bar = 1 stroke path; foot + wheel rubber = 1 path (per side).
  - Wheelchair: three frame tubes (caster fork, seat rail, back post) = 1 path; backrest fabric + seat cushion = 1 path.
  - CPAP: tank cap + hose connector = 1 path.
  - BedsideTable: both legs = 1 path; lamp base + stem = 1 path.
- Shapes (rect/circle/ellipse) in a test scene: 59 -> 47. Draw order kept; gradients, clip paths and animation-free structure untouched.
- Verified: all 6 props (walker both facings, glass, thermometer, wheelchair, CPAP, bedside table with and without lamp/CPAP) rendered old vs new in Chromium with gradients flattened: 5 px differ above threshold, 78 faint.

## Left as is
- WaterGlass, Thermometer (every part a different colour/opacity); CPAP hose and mask (stroke and fill versions differ); table drawers and top shading (different opacities).

## Pending (not in this zip)
- 4.4: brick-house.jsx (67 lines), then worlds: about, services, living, light, art, debug.
- P5 build + before/after screenshots.
