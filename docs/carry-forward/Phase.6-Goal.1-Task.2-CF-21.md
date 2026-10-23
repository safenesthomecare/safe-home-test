# Carry-forward 21
Audit result + fixes (StoryPinned.jsx only):
1) CONTRAST FAILED before: measured worst-case caption contrast over the 8 scenes was clock 1.0-1.5:1, headline ~1.8-2.5:1, body ~2.7-3.9:1 (needs 3:1 large / 4.5:1 body). Fix: caption is now a rounded navy panel (rgba(0,38,63,.88), blur) instead of a bottom gradient; "service" line colour set to #E6F1FA. Re-measured (pixel sampling, lightest 5% of background): clock 7.2-9.5:1, headline 11.1-14.8:1, body 11.1-15.0:1, service 11.4-15.0:1 at 390x780 and 1280x720. All pass AA/AAA.
2) KEYBOARD: tab order verified: before -> "Skip the story" -> 8 scene dots (aria-label "Go to <time>: <title>") -> next page element. Added a "Skip the story" link (visible on focus; jumps to #after-story, focus lands there, scroll-margin = header). Enter on dots already jumps to scenes (Task 3).
3) Static (reduced-motion) mode uses the same panel caption.
No console errors. Full-app run still pending.
Pending Phase 6: mobile 360px layout pass for every page; throttled-CPU speed check of pinned story; real `yarn start` / `yarn build`; Phase 5 optional sound + haptics (off by default); README note about the story system.
Next: Phase 6 Task 3 — speed check with CPU throttle (4x) and DOM/paint cost of StoryPinned; measure frames while scrolling.
