# Carry-forward 28 (GitHub Pages UI demo, Phase 2 of 3)
Done:
- frontend/src/lib/demo.js: DEMO flag (REACT_APP_DEMO === 'true'); App.js now imports it.
- frontend/src/components/DemoBanner.jsx: fixed "DEMO - UI PREVIEW" pill at top-left under the 80px header (88px from top, pointer-events none, z 900). Chosen over a full-width strip so the fixed header and pinned story offsets are untouched. Renders nothing when DEMO is false.
- Contact.jsx: in DEMO mode the form fakes a 700 ms send (no network), toast + success panel say "Demo only: nothing was sent."
Tested (real builds, browser): DEMO build: banner at y=88-114 (below header), 0 /api/contact requests, panel shows demo note, 0 broken images, 0 HTTP errors, 0 page errors. LIVE-STYLE build (no env, root path, SPA server): no banner, form POSTs to /api/contact once, normal success text, direct /services works, 0 broken images, 0 errors. (Closes the Phase 1 "root build not retested" item.)
