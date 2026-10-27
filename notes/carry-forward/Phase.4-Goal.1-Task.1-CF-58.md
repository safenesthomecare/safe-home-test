# CF-58: Phase 4 / Task 4.1 (fit the frames)

## Done
- Desktop 1440x900: Services moved right (x 2830 -> 2745) so the seated client is no longer hidden behind the second panel. About, Testimonials and FAQ already cleared the panel.
- Phones: the four indoor pages now open with a tall window of scene under the first panel (`story.css`, max-width 699px), so both figures show in full instead of just their heads.
- New phone-only zoom `zN` in the camera (`WorldCamera.jsx`). Used by Services (0.95) and FAQ (0.72) so the pair, wheelchair and CPAP fit the width. Testimonials uses `yN: 785` to lift the pair clear of panel 2.
- Body now carries `data-sn-page`, so phone rules can target one page. Home and Contact are not touched.

## Key decisions
- Window height clamp(250px, 66vw, 290px), set only for About, Services, Testimonials, FAQ.
- Fixed the CF-57 pending item (wheelchair and CPAP cropped on phones).

## Files
- styles: story.css
- camera: components/story/WorldCamera.jsx, components/story/RouteStory.jsx
- shots: worlds/services.jsx, worlds/living.jsx
