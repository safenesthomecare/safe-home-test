# Phase 3 / Goals 3.1 + 3.2 — Page wiring (CF-57)

## Done
- home.jsx: the person at the door is now `<Relative>` (black PSW-style bun, upright). It uses the Contact colours: blue cardigan #3E6AA5, stone trousers #C9BFB2 (the Relative defaults in figure.jsx). The orange cardigan is gone from Home. Header comment updated.
- contact.jsx: `<Patient top="#3E6AA5" ... dusk>` -> `<Relative ...>` (no `top` override or `dusk` prop needed). Header comment updated.
- Both import `Relative` from './figure' (art.jsx does not re-export it, so art.jsx is untouched). `Patient` import removed from both pages (unused there).
- Other pages (about, services, living, ...) not touched: the patient keeps its hair colour and the PSW hairstyle (done in CF-53).
- Verified: Home and Contact plane layers rendered old vs new in Chromium with `flattenGradients`; same pose, position and colours on both pages.

## Pending
- Goal 4.1 (gta-street.jsx, gta.jsx).
- 4.4 remaining, one file per turn: props-care.jsx (146 lines), brick-house.jsx (67), then the world files.
- P5 build + before/after screenshots (not run: no node_modules / build in the zips).
