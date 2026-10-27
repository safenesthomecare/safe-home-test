# CF-51: Phase 1 / Task 1.1 (Walker, water glass, thermometer)

## Done
- New file `frontend/src/components/story/worlds/props-care.jsx` with three props: `Walker`, `WaterGlass`, `Thermometer`.
- Syntax checked (esbuild). Not yet rendered: the visual check is Task 1.3.

## Key decisions
- Same conventions as `indoors.jsx`: (x, y) = bottom centre, `s` = scale, imports `darken/lighten` from `./figure` and `useUid/dotP/ovalP` from `./outdoors`.
- `Walker`: about 88 units tall at s=1 (hip height). Side view, far frame offset for depth, front wheels, rear rubber tips. `face=-1` mirrors.
- `WaterGlass`: about 40 tall, `level` sets the water height (default 0.7).
- `Thermometer`: (x, y) is the sensor tip so it can sit on the forehead; body trails right; `face=-1` mirrors.
- `art.jsx` NOT edited yet. Re-export lands in Task 1.2 with the other props.

## Pending
- Task 1.2: wheelchair (brakes on), CPAP with mask and hose, bedside table with lamp.
- Task 1.3: render all props on one sheet and check the flat style.

## Files
- frontend/src/components/story/worlds/props-care.jsx (new)
- notes/carry-forward/Phase.1-Goal.1-Task.1-CF-51.md (new)
