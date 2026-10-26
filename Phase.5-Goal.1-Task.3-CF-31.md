# CF-31: Phase 5.3 element and byte budget
**Done:** ran the repo's `tools/count-worlds.jsx` on the rebuilt worlds, measured the gzip size of the full CRA build, and counted DOM nodes per page. Results added to `KIT-BUDGET.md` (new section "Cinematic rebuild (Task 5.3)").
**Result:** every world is under its cap and well below the old numbers: elements 202-577 (caps 500, Services 900), markup 24.9-100.0 KB (cap 125), 0 filters, gradients in source 18-58 (cap 60; Services is at 58, flattened at load). Main JS 138.8 kB gzip (was 138.4), CSS 13.3 kB. DOM nodes per page 612-1216, down from 777-1585.
**Notes:** Services is still the tightest on gradients (58 of 60); no new gradient-heavy pieces there without removing one. To run the counter here it needs `esbuild` with `--jsx=automatic --loader:.js=jsx` and a `react-dom` of the same version as `react`.
**Not done:** scroll fps (5.4). No source edits.
**Files:** KIT-BUDGET.md (new section appended), this file, PLAN-CARRY-ON.md, APPLY.txt.
**Next:** 5.4 scroll speed with `tools/measure-fps.py` (needs the build served on localhost:5055; no GPU here, so compare against the 3.2b numbers only).
