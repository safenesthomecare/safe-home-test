# CF-55: Phase 2 / Task 2.2 (Services: "Medication with a glass of water")

## Done
- `worlds/services.jsx`: dining room now shows medication, not lunch. Both plates and the mug are gone; a pillbox sits on the table. Client stays seated; the PSW now stands at the table end (pose `give`) holding a water glass out to them. The extra chair was removed.
- Still frame moved from the kitchen to the dining table. Figures on the right, text panel on the left.

## Key decisions
- `WaterGlass` is drawn at 0.6 scale in the PSW's hand (props draw large for legibility, like the mug).
- Shot: { x: 2830, y: 960, z: 1.25, xN: 3010 }.
- Dark chair silhouette moved to x=4040 so it lands bottom-right of this frame.
- Bedroom and kitchen rooms are unchanged (not in the frame).

## Pending
- Phone width: the seated client is cut off at the left edge in my 390px preview. Fix in Task 4.1 (pull the phone camera back or shift xN).
- Caption "Medication with a glass of water" (Task 4.2).

## Files
- worlds/services.jsx
