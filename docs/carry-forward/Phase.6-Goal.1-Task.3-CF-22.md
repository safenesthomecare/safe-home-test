# Carry-forward 22
Measured only; no code changes. Pinned story scrolled end to end (240 steps) on a 390x780 @2x touch profile in headless Chromium.
- Normal CPU: median frame 16.7 ms (60 fps), p95 16.8 ms, worst 33 ms, 0 frames >50 ms, 0 long tasks.
- CPU throttled 4x (mid-range phone proxy): median 16.7 ms, p95 33 ms, worst 50 ms, 1 frame >50 ms, 0 long tasks.
- Page weight in the story: 8 SVGs = 32 KB total; DOM small (~50 nodes in harness; only the two neighbouring scenes are mounted; the next scene is fetched one step ahead, so no loading flash).
Caveats: headless software rendering and a harness page, not the full app on a real phone; re-check on a real mid-range Android/iPhone after deploy (Lighthouse mobile, target LCP < 3 s).
Pending: 360px layout pass for every page; real `yarn start`/`yarn build`; Phase 5 optional sound + haptics (off by default); README note describing the story system (files, contract, how to add a scene).
Next: Phase 6 Task 4 — 360px layout pass of all pages with the real components (harness screenshots), fix any overflow.
