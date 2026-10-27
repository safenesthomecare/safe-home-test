# CF-56: Phase 3 / Task 3.1 (Testimonials: "Checking temperature")

## Done
- `worlds/living.jsx` TESTIMONIALS_WORLD: client stays seated on the couch; PSW now stands at the sofa end, bending in, thermometer at the client's forehead, other hand on their shoulder. Tea mugs and the empty armchair removed; small side table keeps a water glass.
- `worlds/figure.jsx`: new pose `check` (one hand raised to a forehead, other hand reaching to a shoulder). `FIGURE-STYLE.md` updated.

## Key decisions
- PSW is drawn at the sofa's depth (y = F+6), not nearer the camera, so her arm reaches forehead height. Thermometer is the `item` in her right hand, mirrored (`face={-1}`) so the nozzle points at the client.
- Shot: { x: 1200, y: 900, z: 1.2, xN: 1065 }. Figures on the left, text panel on the right.

## Pending
- Caption "Checking temperature" (Task 4.2). Fit check in real site (4.1, 4.3).

## Files
- worlds/living.jsx, worlds/figure.jsx, worlds/FIGURE-STYLE.md
