# Phase 8 / Goal 1 / Task 1 — Footer pushes the scene up instead of shrinking it (CF-72)

Applies to phones AND desktop, all pages. Lifts the earlier "no background changes" rule at the user's request.

## Before
When the footer scrolled in, `.sn-story` got shorter (bottom inset = footer overlap) and `WorldCamera` re-fitted the picture to the shorter frame, so the scene zoomed out (e.g. about page 0.85 -> 0.37 scale; on phones down to ~0.09).

## Done
- `frontend/src/story.css`: `.sn-story` is always the full frame (header to screen bottom). The footer overlap (`--sn-clip`, still set by RouteStory.jsx) now moves it with `transform: translate3d(0, -clip, 0)`. Its bottom edge meets the footer's top edge; the top slides up under the header.
- `frontend/src/components/story/WorldCamera.jsx`: frame height no longer subtracts the footer overlap (full frame always) and the scroll listener that followed the footer is removed (resize still handled).
- RouteStory.jsx, StoryScene, camera.js unchanged.

## Checked (6 pages x 390x844 and 1280x800, scroll top vs bottom, real fonts)
Scene height and world scale identical at top and bottom (e.g. 1280 about: 720px / 0.850 both; 390 home: 788px / 0.620 both); scene bottom = footer top on every page. Screenshots: mobile-qa/phase8-footer-390.png, phase8-footer-1280.png (left before, right after).

## Notes
- The Phase 5 "desktop pixel-identical" result no longer holds at the footer by design; top-of-page frames are unchanged (same scale and position at scroll 0).
- Phone footer is tall (about 700px at 390 wide), so the scene slides almost out of view at the very bottom. Compacting the phone footer would be a natural next step.
