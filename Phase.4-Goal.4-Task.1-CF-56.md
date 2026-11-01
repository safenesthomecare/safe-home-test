# Phase 4 / Goal 4.4 / Task 4.4.1 — props.jsx single-path parts (CF-56)

## Done (file: frontend/src/components/story/props.jsx — note: it lives in story/, not story/worlds/)
- Local helpers `dot` and `rr` (self-contained; no new imports).
- Merged into one path per part: pillbox compartments (7 rects -> 1) and gold pills (2 -> 1); shawl fringe (6 -> 1); note ruled lines (4 -> 1); photoframe orange and blue people (head + body -> 1 each).
- Shapes (rect/circle/ellipse): 30 -> 25. All animated groups/classes (`p-a`, `p-b`, `lid`, `leaf`, `paper`, `ring`, `glow`, `st`) left untouched.
- Verified: all 12 props rendered old vs new in Chromium: 0 px differ above threshold.
- Not verified: story.css is not in the zip, so I could not check it for selectors on child shapes. I merged only plain shapes with no class.

## Pending (not in this zip)
- 4.4 remaining, one file per turn: props-care.jsx (146 lines), brick-house.jsx (67), then worlds: home, contact, about, services, living, light, art, debug, gta*.
- P3 wiring: home.jsx l.36 / contact.jsx l.47 `<Patient ... wave>` -> `<Relative ...>`; remove `top="#3E6AA5"` on contact.
- Goal 4.1 (gta-street.jsx, gta.jsx). P5 build + screenshots.
