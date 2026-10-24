# Project status

## UI preview (this repo: safe-home-test)
Published with GitHub Pages by `.github/workflows/demo-pages.yml` (demo mode: `#/` addresses, "DEMO · UI PREVIEW" tag, fake contact form, no-index). One-time owner step: Settings > Pages > Source = GitHub Actions. Verified: real build under a sub-path (all images/scenes/pages work, 0 errors), workflow steps run clean (`yarn install --frozen-lockfile`, `yarn build`), live-style build unchanged (no tag, real form POST, normal addresses), repo scanned for secrets (none).

**State:** feature-complete for the "A Day at Home" redesign. Optional sound/haptics layer (plan Phase 5) deliberately skipped.

## Done
- Phase 1: story script, art direction, lighting arc (`docs/STORY-BIBLE.md`)
- Phase 2: 8 layered SVG scenes (`frontend/public/story/`)
- Phase 3: scene renderer, pinned scroll engine, day clock + scene dots
- Phase 4: Home (story), Services (scene cards), Testimonials (handwritten notes), Contact ("knock on the door"), About, FAQ (accessible accordion)
- Phase 6: contrast and keyboard audit, offscreen animation pause, speed check, 360px pass on the real build, header breakpoint fix

## Verified
- Production build compiles (`craco build`, main JS ~118 kB, CSS ~12 kB)
- No sideways overflow at 360px on any page; no console errors
- Story caption contrast 10:1 or better; keyboard order and skip link work
- Smooth scrolling in a throttled-CPU test (see carry-forward 22)

## Open items (owner)
1. Real, consented testimonials; verify marketing claims (see README "Before going live")
2. Decide on the AGPL-3.0 license
3. Live contact-form test after deploy; real-phone Lighthouse run
4. The temporary team-portal pop-up covers the story caption on phones for ~27 s unless closed
5. Optional: sound toggle + haptics (needs licensed audio)

Detailed per-task logs: `docs/carry-forward/` (Phase.X-Goal.X-Task.X-CF-N.md).
