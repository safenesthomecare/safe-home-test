# CF-5: Phase 2, Task 2.1 (Home world) done
Done: `worlds/home.jsx` redrawn with the kit: far hills with tree lines, bark Tree with the SafeNest symbol on the branch tip, stepping-stone path, grass tufts, flower beds, picket fence, detailed lit House with porch flowers, second tree, walking caregiver, and a neighbour (elder, cardigan, bun) waving at the door.
Wave animation: `figure.jsx` near arm gets class `sw-wave` for the `wave` pose; `story.css` swings it about the shoulder (off under reduced motion). Verified the hand moves between frames.
Fixes: `Hills` now accepts text numbers (`amp="70"`), which About and Contact still pass (the new hills produced NaN). Home hills moved up (y 540/600) because the old values sat behind the ground and never showed. Phone camera on the last two stops pans right (`xN`) so the neighbour shows.
Checked: screenshots at 1440x900 and 390x844 at 4 scroll points (`home-screens-desktop.png`, `home-screens-phone.png`); no console errors; all 6 world files compile. Not run in the full CRA build.
Pending: Phase 2.2 About; Phase 3 counts for Home (about 4 figures-worth of detail now: 2 figures, house, 2 trees, 2 hills with trees); sky gradient looks greyish mid-screen (Sky rect is oversized), review in Phase 3; `docs/` not rebuilt (Phase 4).
Decisions: kept the brand symbol image on the branch (not redrawn); numbers passed as numbers in new world code.
Files: frontend/src/components/story/worlds/{home,figure,outdoors}.jsx, frontend/src/story.css.
Next: Phase 2.2 About. Attach the latest cumulative zip, Story UI Kit and Brand Guide HTML.
