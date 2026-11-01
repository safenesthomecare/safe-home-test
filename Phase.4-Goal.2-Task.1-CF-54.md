# Phase 4 / Goal 4.2 / Task 4.2.1 — outdoors.jsx single-path parts (CF-54)

## Done (file: frontend/src/components/story/worlds/outdoors.jsx)
- New helper `rrectP(x,y,w,h,r)` (exported). Same winding as `dotP`/`ovalP`, so joined shapes show as their union (nonzero fill). No new dependency.
- Tree: trunk + side branch = 1 path (was 2); canopy dark / mid / light layers = 1 path each (was 4 + 4 + 3 circles). Branch gradient removed; trunk gradient pinned to the trunk's old extent.
- House: shutters 2 rects -> 1 path per window; door panels (fill + outline, 4 rects x 2) -> 1 path; steps 2 -> 1; corner trims 2 -> 1; chimney smoke 3 circles -> 1.
- Fence: rails, rail highlights, posts, post caps, post shade = 1 path each (was 2 / 2 / 2 / 2 / 2 rects).
- Already single-path per part, left as is: Hills (+ crest and tree layers), Grass, Flowers (per colour), SteppingStones, Nest, leaf layers.
- Shapes (rect/circle/ellipse) in a test scene: 126 -> 78. Same exports as before (indoors.jsx and props-care.jsx still import fine).
- Verified: old vs new rendered in Chromium with the app's `flattenGradients`: 0 px differ above threshold (183 px faint, from the opacity merges below).

## Small look changes (all faint)
- Branch takes the trunk's colour (it had its own gradient).
- Left corner trim opacity .96 (was 1 left / .92 right); lit chimney smoke one opacity .4 (was .55 / .4 / .26).

## Pending (not in this zip)
- P3 wiring is still open: home.jsx l.36 / contact.jsx l.47 `<Patient ... wave>` -> `<Relative ...>`; remove `top="#3E6AA5"` on contact.
- Goal 4.1 (gta-street.jsx, gta.jsx) is not in the updates zip yet.
- 4.3 indoors.jsx -> 4.4 props.jsx, props-care.jsx, brick-house.jsx, other worlds -> P5 build + screenshots.

## Decisions
- Merge only parts that are the same colour and same role; different tones stay separate paths.
