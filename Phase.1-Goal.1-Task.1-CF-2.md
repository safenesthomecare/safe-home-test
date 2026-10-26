# CF-2: Phase 1, Task 1.1 (outdoors) done
Done: new `worlds/outdoors.jsx` with bark Tree (root flare, bark strokes, ~100 individual leaves, branch fork), woven twig Nest, detailed House (siding, stone footing, shingled roof, brick chimney, shuttered windows with curtains and flower boxes, panelled door, lantern, attic window, smoke when lit, ajar door when open), smooth Hills (`trees` prop adds a tree line), Grass, Flowers, SteppingStones, Fence. `art.jsx` re-exports them; old Tree/House/Hills removed.
Checked: test sheet rendered and inspected; all 5 world files still compile. Props and footprints unchanged, so no world edits needed. Not yet seen in the real page or at phone width (Phase 2).
Pending: Task 1.2 indoors (wallpaper, rugs, wood furniture, cushions, kitchen, food, pill organiser, frames, lamps); Task 1.3 combined test sheet; wave animation (Phase 2).
Decisions: kept new pieces in `outdoors.jsx` (art.jsx stays small); texture drawn as combined paths, no filters; `Hills trees={n}` is opt-in so existing hills look the same plus smoother.
Next: Phase 1 Task 1.2 (indoors) in a new `indoors.jsx`. Attach the Story UI Kit zip and Brand Guide HTML when resuming.
