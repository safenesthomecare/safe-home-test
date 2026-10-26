# Story art plan (updated after Phase 0)

Goal: replace the flat shapes in the 6 story worlds with storybook-quality vector art, in the logo's gradient-shaded style (style A).

## Reference material (attach both in chat as documents at the start of every session)
1. **Story UI Kit** (`Story_UI_Kit-html.zip`): the layout mockup. Read `Main.dc.html` (inline styles carry the exact colours, sizes, radii) and `assets/`.
2. **SafeNest Brand Guide** (claude.ai artifact "SafeNest Brand Guide", saved as HTML): logo layers (nest, two figures, house, window glow, leaves, heart), palette, type, motion, icons, environment backdrops, components, voice.
Rule: Claude reads these from the chat documents, not from links. If one is missing, Claude asks for it before starting a phase. Colours come from the guide (`src/styles/brand-tokens.css` mirrors it); blue = carer, orange = person cared for, warm window light is the accent.

## Working rules
- One task per turn. After each task, write `Phase.X-Goal.X-Task.X-CF-X.md` (done, pending, decisions, files).
- Per world: draw, screenshot at desktop and phone width, fix, then log.
- Budget: gradients shared, no blur filters, cap on drawn elements per world (set in Phase 3).

## Phases
| Phase | Goal | Tasks | Effort |
|---|---|---|---|
| 0 DONE | Figure builder | `figure.jsx`, hook into `Person`, style guide (`worlds/FIGURE-STYLE.md`) | ~70k |
| 1 | Environment kit in `art.jsx` | 1.1 Outdoors: bark tree, leaves, twig nest, house (siding, shingles, windows, door), grass, flowers, fence, hills. 1.2 Indoors: wallpaper, rugs, wood furniture, cushions, kitchen, food, pill organiser, frames, glowing lamps. 1.3 Test sheet screenshot | ~80k |
| 2 | Redraw worlds (6 turns) | 2.1 Home, 2.2 About, 2.3 Services, 2.4 Testimonials, 2.5 FAQ, 2.6 Contact. Each: use kit + figures, wave animation on raised hand, screenshots | ~50k each |
| 3 | Speed and readability | element cap per world, fps and load size, contrast audit rerun | ~40k |
| 4 | Package | kit page, README, logs, rebuilt `docs/`, updates-only zip | ~20k |

## Status
Phase 0-3 complete (caps, speed fixes, contrast audit, Contact camera and sky). Next: Phase 4 package (kit page, README, rebuilt docs/, updates-only zip). Optional: real-phone speed check, panel-edge fade.

## Zips
Every updates zip from now on is cumulative: it holds all changed files and all CF logs and test images from earlier tasks, so you can copy it over the Phase 0 repo in one step.
