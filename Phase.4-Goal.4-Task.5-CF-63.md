# Phase 4 / Goal 4.4 / Task 4.4.5 — art.jsx single-path parts (CF-63)

## Done (file: frontend/src/components/story/worlds/art.jsx)
- Cloud: 3 ellipses -> 1 path (local `ovalP`, same winding, so the ovals show as their union). Same props; opacity still applies to the whole cloud.
- Re-exports and palettes unchanged (C, SKIN, Sky, Sun, all `export { ... } from` lines).
- Verified: 2 clouds (different scale/opacity) + sun rendered old vs new in Chromium: 0 px differ above threshold, 2 faint.

## Left as is
- Sky (1 rect with gradient), Sun (3 circles with different opacities).

## Pending (not in this zip)
- 4.4, one file per turn: light.jsx (75 lines, 14 shapes + 7 paths), services.jsx (71), living.jsx (64), debug.jsx (25).
- P5 build + before/after screenshots.
