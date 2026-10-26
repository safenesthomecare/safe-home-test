# CF-18: Phase 1.1 cast figures
**Done:** `figure.jsx` gets a `flat` prop (no shade gradient) and two exported presets, `PSW` (blue scrubs, navy shoes, bun) and `Patient` (orange cardigan, cream trousers, elder posture), both with a `dusk` prop for darker tones. Re-exported from `art.jsx`. Syntax checked (esbuild); not yet rendered or used by any world.
**Pending:** Task 1.2 replace every other `Person` in worlds with these two and delete the rest of the cast; Phase 2+.
**Decisions:** colours from brand tokens; flat is opt-in so old scenes keep working until rebuilt.
**Files:** frontend/src/components/story/worlds/figure.jsx, art.jsx, this file.
