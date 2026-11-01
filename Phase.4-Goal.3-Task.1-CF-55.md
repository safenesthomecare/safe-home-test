# Phase 4 / Goal 4.3 / Task 4.3.1 — indoors.jsx single-path parts (CF-55)

## Done (file: frontend/src/components/story/worlds/indoors.jsx)
- Now imports `rrectP` (added in CF-54, outdoors.jsx). Same winding as `dotP`/`ovalP`, so joined shapes show as their union.
- Merged into one path per part (same colour, same role):
  - Win: outer frame + outline, both curtains, both rod ends.
  - Table legs; Chair legs; Bed legs; Bed headboard + footboard.
  - Sofa: back cushions, seat cushions, arms, arm highlights.
  - Counter: doors (blue one + others), inner outlines, handles.
  - FruitBowl: highlights (kept in the original draw order, so the front fruit still covers one). Pillbox: closed lids per colour, lid highlights, open compartments. Books: page edges, spine highlights.
- Shapes (rect/circle/ellipse) in the whole kit: 85 -> 58. Same exports; outdoors.jsx / props-care.jsx imports unchanged.
- Verified: all 19 indoor pieces rendered old vs new in Chromium with the app's `flattenGradients`. Only 161 px differ above threshold, all at rounded corners (Q-curve vs circle arc); nothing moved, no holes.

## Left as is (different colours / roles, or already single)
- Wall layers, Rug rings, Frame, Cushion, Mug, Kettle, Plate, Lamp, Plant, Clock.

## Pending (not in this zip)
- P3 wiring: home.jsx l.36 / contact.jsx l.47 `<Patient ... wave>` -> `<Relative ...>`; remove `top="#3E6AA5"` on contact.
- Goal 4.1 (gta-street.jsx, gta.jsx).
- 4.4 props.jsx, props-care.jsx, brick-house.jsx, other worlds -> P5 build + screenshots.
