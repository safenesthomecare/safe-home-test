# CF-19: Phase 1.2 cast reduced to two
**Done:** every `Person` in `about`, `home`, `contact`, `services`, `living` is now `PSW` or `Patient` (position, size, facing and pose kept). Removed extras: contact second wave figure; living child wave, standing elder, second-scene standing elder; replaced all strangers and walkers with PSW. Contact uses `dusk`. Unused imports (SKIN etc.) dropped. Syntax checked per file (esbuild).
**Pending:** not built or screenshot yet (Phase 5). Positions are old layouts; Phase 3 re-lays them on the grid. `Person` is still exported from `art.jsx` and `figure.jsx` is still the base.
**Files:** worlds/about.jsx, home.jsx, contact.jsx, services.jsx, living.jsx, this file.
**Next:** Phase 2.1 `light.jsx`.
