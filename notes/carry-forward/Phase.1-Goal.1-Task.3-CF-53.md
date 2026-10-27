# CF-53: Phase 1 / Task 1.3 (Drawing check)

## Done
- Rendered all six props beside the Patient and PSW on one sheet (`props-sheet.png`, throwaway harness kept outside the project) and viewed it.
- Fixes from the check: walker near frame was too pale on cream (now two mid greys, far frame darker); CPAP hose and mask overhung the bedside table (table widened to 150, CPAP scaled to 0.72, lamp shifted left).

## Result
- Scale reads right: walker at hip height, wheelchair about half a standing figure, bedside table below hip. Flat fills, no outlines, matches the figures and kit.
- Lamp glow reads on a dark evening backdrop.

## Pending / notes for later
- Props are not placed in any scene yet. Phase 2 starts with About ("Helping you up safely").
- Wheelchair faces right by default; mirror with `face={-1}` when the bed is on the left.

## Files
- frontend/src/components/story/worlds/props-care.jsx (tuned)
- notes/carry-forward/Phase.1-Goal.1-Task.3-CF-53.md
