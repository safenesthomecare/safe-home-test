# Carry-forward 20
Done: StoryScene.jsx now pauses a scene's looping animations while it is off-screen (IntersectionObserver, 80px margin; sets `data-paused` on the host, shadow CSS `:host([data-paused]) * {animation-play-state: paused}`). Skips gracefully if IntersectionObserver is missing.
Tested (harness, two scenes 2500px apart): top view -> scene A running / B paused; scrolled to bottom -> A paused / B running; no errors.
Asset budget: all 8 story SVGs total 32 KB (largest 4.7 KB) vs the 1.5 MB budget. Plenty of headroom.
Pending Phase 6: (b) keyboard/focus order incl. DayClock + caption contrast over bright scenes; (c) speed check on a mid-range phone profile (CPU throttle) for the pinned story; (d) full `yarn start`/build; (e) mobile layout pass of every page at 360px. Phase 5 optional: sound toggle + haptics.
Next: Phase 6 Task 2 — contrast + keyboard audit of StoryPinned/DayClock (caption over bright scenes 1-2; dot focus ring).
