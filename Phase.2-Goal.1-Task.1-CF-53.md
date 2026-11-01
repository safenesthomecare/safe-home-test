# Phase 2 / Goal 2.1 / Tasks 2.1.1-2.1.4 — Characters (CF-53)

## Done (file: frontend/src/components/story/worlds/figure.jsx)
- Single-path parts: head+neck (one skin path), hair (cap+bun/curls, one path), shirt (torso + near-side sleeves, one path; cardigan front / scrub V-neck punched out as a reverse-wound hole over a same-position patch so arms still cover it), trousers (thigh+shin, one path per leg), shoe (one path per foot), forearm+hand (one path).
- Technique: sub-shapes share counter-clockwise winding (tiny M/L/Q/C/Z parser `ccw`/`cw`) so the default nonzero fill shows their union. No new dependency, no build step (tools/mesh-union.mjs from CF-52 is NOT needed).
- Paths per figure ~18 -> ~10. Look unchanged except: neck is one skin tone (no darker neck).
- Patient now `hairStyle="bun"` (same as PSW); hair colours unchanged (Patient #DADDE3, PSW #2B2220).
- New export `Relative` (+ `CAST.relative`): bun, hair #15110F, cardigan #3E6AA5, trousers #C9BFB2, upright (not elder). Accepts `dusk` (ignored) so it drops in for `<Patient dusk>`.
- Retired hair styles `long` / `wavy` (no longer used anywhere). `short`, `bun`, `curly`, `bald` remain.
- Verified: rendered old vs new, 8 poses/views x PSW, Patient, Relative (esbuild + Chromium).

## Pending
- P3: in home.jsx (l.36) and contact.jsx (l.47) swap `<Patient ...wave>` -> `<Relative ...>` (import Relative); remove `top="#3E6AA5"` on contact. Other pages untouched.
- P4: environment meshes. P5: build + screenshots.

## Decisions
- Shirt trim = hole technique (keeps arm-over-chest correct).
- Relative not elder; Home uses same colours as Contact.
