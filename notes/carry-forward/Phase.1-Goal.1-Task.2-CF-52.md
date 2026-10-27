# CF-52: Phase 1 / Task 1.2 (Wheelchair, CPAP, bedside table with lamp)

## Done
- Added to `worlds/props-care.jsx`: `Wheelchair`, `CPAP`, `BedsideTable` (plus const `BEDSIDE_TOP = 64`).
- `worlds/art.jsx`: one re-export line, so scenes import all six care props from `./art`.

## Key decisions
- `Wheelchair`: side view facing right, about 104 tall, brakes ON (orange-tipped lever pushed forward, pad touching the rear tyre). `face=-1` mirrors.
- `CPAP`: machine + water tank + ribbed hose + nasal mask lying on the surface. (x, y) = machine bottom centre; hose and mask trail right.
- `BedsideTable`: 150 wide, 64 tall, props `lamp`, `cpap`, `lit`. Lit lamp draws a soft warm glow. CPAP sits on top at 0.72 scale so hose and mask stay on the table. Top surface is at `y - 64*s`.

## Pending
- Task 1.3 (done next, see CF-53). Phases 2 to 5 untouched.

## Files
- frontend/src/components/story/worlds/props-care.jsx
- frontend/src/components/story/worlds/art.jsx
