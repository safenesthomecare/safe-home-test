# Phase 4 / Goal 4.1 / Task 4.1.1 — Peek-scene button (CF-67)

Scope rule kept: no background/camera changes (the button only toggles a body class).

## Done
- NEW `frontend/src/components/PeekScene.jsx`: 44px round eye button, bottom-left (safe-area aware). Tap -> panels fade to 10% (taps pass through) for 4s, or tap again to bring them back; changing page ends it. `aria-pressed` + label.
- `frontend/src/mobile-type.css`: button + fade styles (phone-only; hidden on desktop and when the story scene is off; no transition with reduced motion).
- `frontend/src/App.js`: renders `<PeekScene />`.

## Checked (Chromium)
Button 44x44; panel opacity 1 -> 0.1 on tap -> back to 1 after 4s; hidden at 1280px. Build compiles clean.

## Notes
- The "portal" toast (z 1000, full width) covers the button while it is on screen.
- Duration is `PEEK_MS` in PeekScene.jsx.

## Pending
- 4.2 scroll fade (also limits blur to visible panel), 4.3 svh gaps, 4.4 viewport-fit + safe-area. Phase 5 QA.
