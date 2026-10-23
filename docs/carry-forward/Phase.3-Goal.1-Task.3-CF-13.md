# Carry-forward 13
Done: frontend/src/components/story/DayClock.jsx — top-right pill: sun travels an arc (moon after ~88%), live interpolated time (exports timeAt), 8 dot buttons (aria-label "Go to <clock>: <title>", aria-current="step", 24px touch targets), click -> smooth scroll to that scene.
Edited: StoryScene.jsx — per-scene `focus` (0..1 horizontal focal point) so portrait phones crop toward the action (svg positioned via --fx); StoryPinned.jsx — mounts DayClock + `go(i)`; crossfade changed: lower scene stays solid, next fades in over 35%-65% of each step (no muddy double-exposure).
Tested (Playwright, 390x780 + 1280x720): dots jump correctly (11:30 AM -> "Every dose, on time."), no console errors, reduced-motion static fallback still works.
Pending: wire <StoryPinned/> into Home.jsx + hide/replace existing hero as needed (Phase 4); page transitions (Goal 3.3 remainder); Phase 6 QA (real-device speed, contrast of caption over bright scenes, keyboard order).
Known: in portrait, scenes 2 and 4 have two subjects far apart; only one is fully visible per crop (accepted; caption carries the story).
Next: Phase 4 Task 1 — Home.jsx: insert StoryPinned section. (Needs a look at Home.jsx structure first.)
