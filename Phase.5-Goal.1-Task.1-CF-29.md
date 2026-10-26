# CF-29: Phase 5.1 screenshots in the built app
**Done:** overlaid Phases 0 to 4.1 on the live repo (`safe-home-test-main`), `npm install --legacy-peer-deps` plus `ajv@8` (needed for the build here), `craco build` compiled with no errors (main bundle 138.7 kB gzip). Screenshotted all 6 pages at 1440x900 and 390x844 at scroll 0, 50% and 100%.
**Fixed (Contact only):** first render showed the pair at 10-24% of frame width (too far left) and the nest off-frame at the end. Measured scale is about 1190/z world units wide on desktop; the last frame is half covered by the footer. Changes in `worlds/contact.jsx`: keys now top (x 2153, y 985, z 0.85), 1 (2170, 975, 0.8), end (2080, 1040, z 0.6; phone 1700/800); tree moved to x 1280 at s 0.9 and nest resized and placed on it at (1382, 566, 216x173) so it shows above the house at the end; path and stones shifted right; foreground steps and hedge re-placed so they show in the bottom-left at the first frame.
**Checked and fine (desktop):** Home, About, Services, Testimonials, FAQ look as designed at all three scroll points; Services last room is empty as planned.
**Open items:**
- Phone: the last scroll frame of every page is fully covered by the footer, so end-key shots are never seen on phone. Mid frames are mostly covered by text panels. Options: shorten the phone footer, or move the last key earlier. Not changed.
- Contact first frame: dark foreground reads as one large dark blob in the bottom-left (about 25% height); trim if it feels heavy.
- `lib/pageStory.js` still labels Contact `5:30 PM` ("5:30, 5:40, 5:50"), but SHOTS.md and the dusk look say 7:30 PM. Copy not changed.
- Earlier 'Not checked' items from CF-27/28 are now seen on desktop only; phone Contact not judged beyond the above.
**Files:** worlds/contact.jsx, this file, PLAN-CARRY-ON.md, APPLY.txt.
**Next:** 5.2 contrast audit (text panels over the new flat tones), then 5.3 budget, 5.4 scroll speed.
