# CF-37: Story v6, Phase 1 (camera engine)

Done
- lib/camera.js: keys tied to page sections ({sec: 'top' | index | 'end', x, y, z}), eased between stops (pure functions, tested in node).
- components/story/WorldCamera.jsx: draws a page's layered SVG world and moves/zooms it with scroll; far layers (depth < 1) stay nearer the camera.
- components/story/worlds/index.js (WORLDS by page id; empty until Phase 3) and worlds/debug.jsx (grid + stations A-E for QA, only when window.__SN_DEBUG_WORLD is set).
- RouteStory: uses WorldCamera when a page has a world, else the old backdrop.
- Reduced motion: camera frozen at first key.

Checks (debug world, Chromium)
- Camera follows scroll at 5 points, desktop and phone; 0 sideways scroll; no console errors.
- Station B sits behind section 1 when it is centred.

Pending
- Phase 2: see-through panels (veil is still .28-.6 and hides the world; hard-edged divider strip between hero and services needs the same treatment); contrast audit.
- Phase 3: Home world (tree, nest, house, PSW) + hero logo text shrink/fade.
- Phase 4: other pages' worlds; Services sideways pan.
- docs/ not rebuilt yet.
