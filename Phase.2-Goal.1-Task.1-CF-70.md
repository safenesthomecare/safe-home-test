# CF-70: Phase 2, About page
**Done:** Rebuilt `worlds/about.jsx` from the About reference (image 2): plus-mark wallpaper, tall hill-view window with blue curtains (new `ViewWindow` in light.jsx), plank floor, stitched teal rug, soft sunbeam + dust, glowing floor lamp, contact shadows, vignette. Characters faceless; PSW blue scrubs/bun, patient orange sweater/grey bun.
**Key change:** `WorldCamera.jsx` flattened every gradient at runtime (flat-colour rule), which would erase all soft light. Now skipped when a world sets `soft: true`. Only About has it so far; other pages unchanged until rebuilt.
**Verified:** rendered frame side by side with reference (compare-About.png). Not yet verified: full CRA build, gradient count vs 60 cap (About uses existing furniture gradients + kit), phone framing.
**Pending:** Services, Testimonials, FAQ (Phase 2), Home, Contact (Phase 3), Phase 4 build/budget/contrast check.
**Files:** worlds/about.jsx, worlds/light.jsx (ViewWindow), WorldCamera.jsx
