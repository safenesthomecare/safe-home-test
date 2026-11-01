# Phase 4 / Goal 4.1 / Task 4.1.2 — gta.jsx single-path parts (CF-59) — closes Goal 4.1

## Done (file: frontend/src/components/story/worlds/gta.jsx)
- Local helpers `rP` (rounded rect), `oP` (ellipse), `pP` (polygon, auto-wound like rP). All shapes share one winding, so joined shapes show as their union. No new imports; same exports.
- Skyline: all tinted buildings (filler blocks, bank towers, Scotia, TD, Commerce Court, Rogers Centre dome, lakefront strip) = 1 path; CN Tower = 1 path; window glow = 1 path. Random call order unchanged, so the skyline is identical.
- Maple: 3 crown ellipses -> 1 path; dark crown -> path.
- Semi: both mirrored units drawn into the same paths: trim, glass, doors, steps, chimneys, foundations = 1 path each.
- Bungalow: 4 garage lines -> 1 path.
- HydroPole: pole + 2 crossarms = 1, 4 wires = 1, 4 insulators = 1.
- SuburbRow: lit windows = 1 path.
- Shapes (rect/circle/ellipse) in a test scene (with gta-street from CF-58): 332 -> 48.
- Verified: old vs new rendered in Chromium (skyline + glow, maple, semi, bungalow, pole, suburb row with lit windows): 33 px differ above threshold, 1385 faint.

## Left as is
- LakeHaze (4 layers differ in opacity), SimpleHouse, brick/roof/shrub rects (one shape, own colour).

## Goal 4.1 status: complete (CF-58 gta-street.jsx + CF-59 gta.jsx).

## Pending (not in this zip)
- 4.4 remaining, one file per turn: props-care.jsx (146 lines), brick-house.jsx (67), then worlds: about, services, living, light, art, debug.
- P5 build + before/after screenshots.
