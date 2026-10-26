# CF-20: Phase 2.1 lighting kit
**Done:** `worlds/light.jsx` (3.9 KB): `grid(w,h)` helper (thirds, eye line, golden point), `TONES` (key/mid/dark/accent for morning, midmorning, room, tea, afternoon, dusk), `LightShaft`, `WindowGlow`, silhouettes `SilBush`, `SilPlant`, `SilChair`, `SilLamp`, and `DarkFrame` (left/right/bottom/corner solid shapes). All flat fills, no gradients or filters. Syntax checked only; not yet used or rendered.
**Pending:** Task 2.2 per-time-of-day palette tuning and contrast check on real scenes; Phase 3 worlds.
**Decisions:** tone values are starting points (brand colours); `o` opacity on shafts is a solid fill at partial opacity, still hard-edged.
**Files:** frontend/src/components/story/worlds/light.jsx, this file.
