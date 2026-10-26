# CF-38: GTA backdrop (Phases 1 + 2)
Done
- Added `frontend/src/components/story/worlds/gta.jsx`: Skyline (CN Tower, Rogers Centre, bank towers), LakeHaze, Semi, Bungalow, Maple, HydroPole, SuburbRow. Re-exported from `art.jsx`.
- `worlds/home.jsx`: `far` layer = lake haze + skyline (depth .3); new `mid` layer = two suburb rows + hydro poles (depth .6). Old `Hills` removed from home.
Pending
- Phase 3: outdoors/about/services/contact worlds still use `Hills`; check light.jsx time-of-day tints (skyline tint is fixed `#9DB4C8`, needs per-TONES values).
- Phase 4: build check (`yarn build`), zip.
Decisions: flat SVG silhouettes, no external library. Visual check done via static render of home layers (no in-browser scroll test).
