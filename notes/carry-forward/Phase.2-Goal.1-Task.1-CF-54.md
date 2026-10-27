# CF-54: Phase 2 / Task 2.1 (About: "Helping you up safely")

## Done
- `worlds/about.jsx` rewritten as an indoor living room (was the outdoor doorstep): client rising from the couch toward a walker, PSW beside them with a hand on their arm. Text panel stays on the right, pair sits on the left half.
- `worlds/figure.jsx`: two new poses in POSES: `rise` (mid-stand, forward lean, arms reaching down-forward) and `steady` (one arm reaching out to support someone). `FIGURE-STYLE.md` pose list updated.

## Key decisions
- Same kit as the other rooms (Wall, Win with curtain, Sofa, Rug, Lamp, Plant, Frame, LightShaft). Midmorning tones.
- Fixed order: PSW (nearer camera, y+56) then Patient then Walker, so the PSW's hand reaches the client's arm and the client's hands land on the walker grips.
- Shot: { x: 1000, y: 880, z: 0.85, xN: 700 }. Fits at 1440x900 and 390x844 in my preview render.
- Dark foreground silhouette (plant) in the bottom-left corner.

## Pending
- Caption "Helping you up safely" (Task 4.2).
- Final fit check in the real site (Task 4.1, 4.3). My preview does not run the runtime gradient flattening.

## Files
- worlds/about.jsx, worlds/figure.jsx, worlds/FIGURE-STYLE.md
