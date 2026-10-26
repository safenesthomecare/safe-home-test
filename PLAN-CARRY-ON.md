# PLAN-CARRY-ON.md: cinematic scene rebuild (updated after Task 5.3)
Replaces the earlier plan. Numbering note: these Phases are the rebuild's own; older CF-1..16 logs in this repo belong to the earlier work. New logs continue at CF-17.

## Rules (unchanged, see SHOTS.md for the full shot bible)
Flat solid colours only (no gradients, blur, soft shadows). Pair on the two vertical thirds, eyes near the upper third line. Positive space = story and characters (65-75%); negative space (25-35%) = dark foreground shapes only, never anything important. Three tones per scene. Depth layers: foreground 1.3x (dark), midground 1.0 (pair), background 0.12-0.45. No camera rotation. Text panel on the side opposite the dark mass. One task per turn, one carry-forward log per task.

## Status
| Phase | Task | State |
|---|---|---|
| 0 Shot bible | 0.1 SHOTS.md | done (CF-17) |
| 1 Cast | 1.1 PSW and Patient figures | done (CF-18) |
| | 1.2 remove other cast | done (CF-19); Contact still on old layout |
| 2 Lighting kit | 2.1 light.jsx | done (CF-20) |
| | 2.2 palettes and contrast | done (CF-21) |
| 3 Worlds | 3.1 Home | done (CF-22) |
| | 3.2 About | done (CF-23) |
| | 3.3 Services | done (CF-24) |
| | 3.4 Testimonials | done (CF-25) |
| | 3.5 FAQ | done (CF-26) |
| | 3.6 Contact (dusk) | done (CF-27); not yet previewed |
| 4 Camera | 4.1 re-check each world's scroll path in the real app | static check done (CF-28); live check folds into 5.1 |
| 5 Verify | 5.1 screenshots in the running app: done (CF-29); 5.2 contrast audit: done (CF-30); 5.3 element and byte budget: done (CF-31); 5.4 scroll speed: done (CF-32); 6.1 done (CF-33, time pill + time labels removed); 6.2 done (CF-34); 6.3 done (CF-35); plan complete; figure rework A+B done (CF-36), Phase C done (CF-37), next Phase D |
| 6 Ship | 6.1 rebuild docs/; 6.2 kit page and FIGURE-STYLE.md; 6.3 progress note and updates zip | pending |

## Remaining tasks
**4.1 Camera, ~15k.** Worlds were re-keyed inside Phase 3. Check in the real app that: each key lands on the right section, `sw-walk` offsets end the PSW on the left third (Home, About), phone keys (`xN`/`yN`) keep the pair visible, reduced motion shows the first key.
**5.x Verify, ~25k.** Install deps and build with CRA (`npm ci && npm run build` in `frontend/`). Screenshot all 6 pages at 1440x900 and 390x844. Re-run the contrast audit (`python3 tools/contrast-audit-story.py frontend/build` (your existing tools/contrast-audit.py is left untouched)); text panels sit on calm mid-tones. Measure element count, gzip size, and scroll fps (CF-12 and KIT-BUDGET.md have the old numbers; the earlier proposal 3.2b, running animations only near the viewport, is mostly moot because figures no longer animate).
**6.x Ship, ~20k.** Rebuild `docs/`, update the kit page and `FIGURE-STYLE.md` (figures now `flat`, `PSW`/`Patient` presets), write the progress note, build an updates-only zip.

## Known caveats to settle
- Eye line sits near 0.4 on the Testimonials sofa shot (compromise with the lower-third sofa).
- Services: no over-the-shoulder kitchen close-up (a push-in stands in).
- FAQ phone view loses the cropped foreground PSW.
- The nest logo image (`/brand/symbol.svg`) keeps its own soft gradients (an image file, not flattened).
- `Tree`, `House`, `Hills` source still contains gradient code; it is flattened at runtime by `lib/flatten.js`. Optional clean-up: write flat versions at source.
- Preview tool shows static frames only (no scroll motion, no real fonts).

## Tools
`tools/preview-world.js`: render a world at each camera key. Needs react@18, react-dom@18, esbuild in a scratch folder plus global playwright:
`NODE_PATH=<deps>/node_modules:$(npm root -g) node tools/preview-world.js <home|about|services|testimonials|faq|contact> <outDir> [phone]`
Set `FLAT=0` to see unflattened gradients.

## Cast and colours
PSW: scrubs `#0066B3`, shoes/trousers `#003B66`, dusk `#7FC1F5`. Patient: cardigan `#BC5509`, trousers `#FFF9F2`, dusk `#FFA24D`.

## State for a new chat (after Task 5.3)
Phases 0 to 5.3 are done and verified in a real CRA build against the live repo (`safe-home-test-main`): build compiles, all 6 pages screenshotted (desktop and phone), contrast audit clean for scene text, budgets under caps. Source changes vs main are only: `WorldCamera.jsx`, `worlds/{about,art,contact,figure,home,living,services}.jsx`, new `worlds/light.jsx`, new `lib/flatten.js`, new `tools/preview-world.js` and `tools/contrast-audit-story.py`, and an appended section in `KIT-BUDGET.md`. Logs CF-17 to CF-31 and SHOTS.md are in this folder (not required in the repo).
**Remaining:** 5.4 scroll speed (`tools/measure-fps.py` from the repo, build served on localhost:5055; no GPU here, so compare only with KIT-BUDGET.md 3.2b numbers); 6.1 rebuild `docs/`; 6.2 kit page and `FIGURE-STYLE.md` (figures are now `flat`, `PSW`/`Patient` presets); 6.3 progress note and updates-only zip.
**Open items to decide (from CF-29/30):** (1) on phone the footer covers the last frame of every page, so end keys are never seen: shorten the phone footer or move the last key earlier; (2) the fixed time pill overlaps the footer copyright line at the end of phone pages and the phone/email lines at the first screen; (3) `lib/pageStory.js` labels Contact 5:30 / 5:40 / 5:50 PM but SHOTS.md says 7:30 PM; (4) Contact first frame: dark foreground is large (about 25% of height) in the bottom-left; (5) phone Contact frames not judged beyond the above.
**Environment recipe (this chat):** unzip the live repo; overlay this folder over it; in `frontend/`: `npm install --legacy-peer-deps`, then `npm i ajv@8 --no-save --legacy-peer-deps` (needed or the build fails), `CI=false npm run build`. Serve `build/` with an SPA fallback (any path that does not exist returns index.html). Screenshots and audits use python playwright. World counter: esbuild with `--jsx=automatic --loader:.js=jsx --define:process.env.PUBLIC_URL='""'` and `react-dom` at the same version as `react` (19.2.3).
**Measured scale (desktop 1440x900):** visible world width about 1190 / zoom; the last scroll frame is about half covered by the footer, so end keys must show their subject in the top ~480 px.

## How to continue
New chat: attach this zip AND the live repo zip, then say "continue the plan from PLAN-CARRY-ON.md, Task 5.4". Apply this folder over the repo (same paths) first.
