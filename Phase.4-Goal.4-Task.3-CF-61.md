# Phase 4 / Goal 4.4 / Task 4.4.3 — brick-house.jsx single-path parts (CF-61)

## Done (file: frontend/src/components/story/worlds/brick-house.jsx)
- Local helpers `rP` (rounded rect) and `pP` (polygon, wound like rP). Self-contained, no new imports, same export (`BrickColonial`, same door footprint).
- Merged into one path per part (same colour, same role):
  - Each window: both side pilasters + frame = 1 trim path; lit blinds (6 slats) = 1 path.
  - Entry: pediment + lintel + door surround = 1 trim path; the two side shades = 1 path.
  - Closed door: both glass panes = 1 path; both lower panels = 1 path.
  - Front step joints = 1 path; garage door panel lines = 1 path.
- Shapes (rect/circle/ellipse) in a test scene (day house with garage, lit house with open door): 136 -> 60.
- Verified: both variants rendered old vs new in Chromium: 0 px differ above threshold, 768 faint (rounded corners, Q-curve vs arc).

## Left as is
- Brick + pattern overlays (pattern needs its own fill), roof/gable/outline strokes, arch glass, open-door layers (different colours/opacities), lantern, number plate, mail slot, garage door and handle.

## Pending (not in this zip)
- 4.4 worlds, one file per turn: about, services, living, light, art, debug (home and contact done in Phase 3).
- P5 build + before/after screenshots.
