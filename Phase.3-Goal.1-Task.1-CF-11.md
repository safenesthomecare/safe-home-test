# CF-11: Phase 3, Task 3.1 (element caps) done
Done: counted elements, markup bytes, gradients and filters for all six worlds (static render); set caps; wrote the table to `KIT-BUDGET.md`; saved the counter as `tools/count-worlds.jsx` (bundle with esbuild, run with node; needs the worlds folder and a stub for `lib/asset`).
Result: all six pass. No blur filters anywhere. Tight ones: Testimonials 493/500 and Services 882/900 elements; Contact 119.8/125 KB.
Pending: 3.2 frames per second and load size (needs the full app running; the static render can't measure it); 3.3 contrast audit rerun and sky gradients; Phase 4 package.
Decisions: no trimming needed now; caps are guard rails, not targets. Note this measures SVG markup only, not the logo symbol image or page JS.
Files: KIT-BUDGET.md, tools/count-worlds.jsx.
Next: Task 3.2. Attach the latest cumulative zip, Story UI Kit and Brand Guide HTML. Needs the real app build (yarn install, then build) to measure properly.
