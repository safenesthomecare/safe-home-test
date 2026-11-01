# CF-69: Phase 1 (shared advanced kit)
**Done:** Added ADVANCED KIT to `frontend/src/components/story/worlds/light.jsx` (old exports untouched, nothing else edited): GlowPool, ContactShadow, SoftBeam, DustMotes, WallPaper, Plaster, WoodFloor, StitchedRug, Vignette, MoonGlow, GradientSky, SoftCloud, BrickPattern, Lawn, LampLight, plus REF palettes per page and FACELESS=true.
**Verified:** all components bundled and rendered in a swatch sheet (indoor day, night, dusk exterior, day exterior). No blur/filters; each piece uses 1-3 gradients/patterns.
**Decisions:** characters (PSW, patient, relative) stay faceless; reference faces are never copied. Mapping: image1=Contact, 2=About, 3=FAQ, 4=Services, 5=Home (no nest in ref, flagged), 6=Testimonials.
**Pending:** Phase 2 indoor scenes (About, Services, Testimonials, FAQ), Phase 3 outdoor (Home, Contact), Phase 4 side-by-side comparisons + budget/contrast check. Watch the 60-gradient cap when composing scenes.
**Files:** worlds/light.jsx
