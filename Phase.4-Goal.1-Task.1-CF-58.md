# Phase 4 / Goal 4.1 / Task 4.1.1 — gta-street.jsx single-path parts (CF-58)

## Done (file: frontend/src/components/story/worlds/gta-street.jsx)
- Local helpers `rP` (rounded rect), `dP` (circle), `oP` (ellipse, optional rotation). Same winding, so joined shapes show as their union (nonzero fill). Self-contained, no new imports, same exports.
- Merged into one path per part (same colour, same role):
  - Hydrant body+collar; Mailbox 9 cells; BusStop bench legs; all four now `<path>` only.
  - Townhouses: walls per brick colour, cornice, windows, garage surround, garage doors, door lines, entry doors per colour (was ~12 rects per unit).
  - FrontWalk: all joint lines 1 path.
  - GardenBed: stone blocks 1, hostas 3 (one per tone, rotated leaves), grass blades 1, iris stems 1, iris heads 1.
  - SideFence: boards 1, lattice 1, rails 1.
  - Neighbour: course lines 1, brick-base lines 1, cream trim (fascia + window frame + base cap) 1, downspout 1, meter boxes 1, pipes 1.
  - Woodlot: trunks 1, dark crowns 1, light crowns 1.
- Shapes (rect/circle/ellipse) in a test scene: 191 -> 13. Random sequences kept in the same call order, so layouts are identical.
- Verified: old vs new rendered in Chromium (1600x700 test scene with every changed piece). Only 387 px differ above threshold.

## Small look changes
- Woodlot: light crowns now sit over all dark crowns (was tree by tree), so the canopy reads flatter. This is the only visible change.
- Townhouse cornice 2px overhang no longer hidden by the next unit's wall; fence/garden rounded corners differ by a pixel.
- Overlapping semi-transparent strokes (FrontWalk joints, light crowns) no longer double-darken at crossings.

## Left as is
- Street, Driveway, NearStreet (already one path per layer, different colours), NearStreetProps (uses components).

## Pending (not in this zip)
- Goal 4.1 Task 4.1.2: gta.jsx (132 lines).
- 4.4 remaining, one file per turn: props-care.jsx, brick-house.jsx, then worlds: about, services, living, light, art, debug.
- P5 build + before/after screenshots.
