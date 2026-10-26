# CF-13: Phase 3, Task 3.2b (speed fixes) done
Done in `components/story/WorldCamera.jsx` only: (1) limb and wave animations run only while on screen (IntersectionObserver, 120px margin); (2) the camera writes layer shifts and walker offsets straight onto those few elements instead of setting `--cx`, `--cy`, `--p` on the stage, which made the browser re-check every drawn element on each scroll step. Hidden tabs already pause CSS animation in browsers, so no extra code. CRA build compiles (+226 B JS). Real app checked: Contact renders with nest, tree, house and waving figure (`app-contact-end.png`).
Result: phone 20-50% faster, desktop roughly +10%. Still below the flat version in the no-GPU test. Real-device check still needed.
Tried and reverted: separate compositor layer per world layer (slower here).
Not done: item 3 (less detail on distant pieces). It would cut drawing cost further but changes the art; decide after a real-phone check.
Finding for Task 3.3 or a camera tweak: at the very end of Contact on a 1440x900 desktop, the "Prefer to Speak Directly" panel and the footer cover the house and the waving pair (see `app-contact-end.png`). The end camera key could move up or left.
Pending: 3.3 contrast audit and sky gradients; Contact end camera; Phase 4 package.
Files: frontend/src/components/story/WorldCamera.jsx, KIT-BUDGET.md, app-contact-end.png.
Next: Task 3.3. Attach the latest cumulative zip, Story UI Kit and Brand Guide HTML.
