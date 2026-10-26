# CF-12: Phase 3, Task 3.2 (fps and load size) measured
Done: installed deps, ran the full CRA build (compiles; closes the earlier "not run in CRA build" caveat), built the original flat version as a baseline, measured scroll fps and transfer on all 6 routes at 1440x900 and 390x844. Tables in `KIT-BUDGET.md`. Scripts: `tools/measure-fps.py`, `tools/diag-anim.py` (need a built app served on localhost:5055 / old on 5056).
Findings: load is fine (+11.9 kB gzip JS, +48 KB per page). Scroll speed is 2-3.5x slower than the flat version in this test (no GPU, so absolute numbers are pessimistic; the old version only reached 6-33 fps too). Causes: always-running limb/wave animations (about a third) and repainting the bigger scaled SVG every scroll frame (the rest). One external request fails in the sandbox (Google Fonts, offline); same in old version.
Not measured: real devices with a GPU. Needs a check on a real phone.
Pending (proposed Task 3.2b, not started): (1) run limb/wave animations only on figures near the viewport; (2) pause animations when the user prefers reduced motion (already) and when the tab is hidden; (3) drop detail on distant pieces (fewer leaves/shingles when scaled small); (4) re-measure. 3.3 contrast audit and sky gradients; Phase 4 package.
Decisions: no code changed this task; measurement only, so fixes are chosen with data.
Files: KIT-BUDGET.md, tools/measure-fps.py, tools/diag-anim.py.
Next: Task 3.2b (speed fixes) or skip to 3.3. Attach the latest cumulative zip, Story UI Kit and Brand Guide HTML.
