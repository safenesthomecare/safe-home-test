# Carry-forward 11
Done: frontend/src/components/story/StoryScene.jsx — SCENES registry (8 scenes: id, clock, day 0-1, src, title, text, service, alt) + <StoryScene scene progress/> component. Inlines SVG into a Shadow DOM (isolates class/keyframe/id collisions between scenes), parallax via CSS `translate` driven by --p and each layer's data-depth (travel 80px). Reduced-motion disables parallax. Fetch cached per src.
Pending: scroll-pinned section (uses `progress`), `--day` lighting from SCENES[].day, day-clock + scene index UI, page wiring (not imported anywhere yet).
Decisions: Shadow DOM over <img> (parallax needs layer access) and over plain inline (keyframe name clashes between scenes). `translate` property used so it composes with SVG transform attrs.
Next: Phase 3 Task 2 — StoryPinned.jsx (scroll progress -> active scene, per-scene progress, --day).
