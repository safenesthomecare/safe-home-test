# Phase 1 / Goal 1.1 / Tasks 1.1.1 + 1.1.2 — Mobile baseline (CF-64)

Scope rule: NO background changes (worlds/*, WorldCamera, lib/camera.js, StoryScene, header height). `RouteStory.jsx` measures the header into `--sn-hdr` and the scene is sized from it, so the header stays as is.
User decisions: keep Nunito (brand). Phone text range 8px to 12px.
No code changed in Phase 1. Baseline = test-main + updates from CF-53..63.

## 1.1.1 Phone rules that affect the foreground
- `story.css` panel (`main.sn-content section > .container`, `.hero-content`): bg rgba(255,249,242,.94), radius 28px, padding clamp(1.4rem,4vw,3rem) x clamp(1rem,3vw,2.5rem), shadow 0 12px 44px. `backdrop-filter` only from 900px up (none on phones).
- `story.css` spacing: section padding clamp(1.5rem,4vw,3rem); `section + section` padding-top clamp(64px,16vw,110px) (<=999px); indoor pages (about/services/testimonials/faq) <=699px: second section padding-top clamp(250px,66vw,290px).
- `App.css` <=767px: `.hero-section` padding 6rem 1rem 2rem, min-height 80vh; buttons min-height 3rem; `.heading-hero` clamp(1.75rem,8vw,2.25rem); `.hero-stats` numbers 1.6rem and labels .65rem (!important); `.portal-prompt` pinned bottom (already uses safe-area).
- `brand-tokens.css`: --sn-text-caption .8125rem, body 1rem, lead 1.25, h3 1.5, h2 2, h1 3, display 4.5 (rem). Fonts: Fredoka (display), Nunito (body), Satisfy (script).
- `public/index.html`: viewport `width=device-width, initial-scale=1` (no `viewport-fit=cover`); Google Fonts link loads Fredoka x4, Nunito x4, Satisfy.
- Sizes also come from outside the tokens: Tailwind classes text-sm x48, text-xs x9, text-lg x4, text-base x2 (jsx), and inline `fontSize` (e.g. '0.875rem' x23, '1rem' x9, '1.125rem' x7, '1.4rem'/'1.6rem'). So tokens alone will NOT reach everything.
- Other foreground items on phones: solid cream header, "DEMO · UI PREVIEW" badge (demo build only), portal prompt toast at the bottom.

## 1.1.2 Baseline measurements (build: `craco build`, REACT_APP_DEMO=true, Chromium, 6 routes x 3 sizes)
- Panel coverage of the screen while scrolling: average 65-79%, peak 85-91% (390x844: home 78/90, about 69/85, services 68/90, testimonials 72/90, faq 65/90, contact 66/90). The scene is hidden behind panels most of the time.
- Computed text sizes at 390x844 (share of characters): 16px 43%, 14px 31%, 20.8px 5.8%, 18px 5.5%, 12px 3.8%, 13px 1.9%; smallest 10.4px (0.5%), largest 40px. 96% of text is above 12px today.
- Files: `mobile-baseline/<page>-<w>x<h>-<n>.jpg` (390x844 every scroll step; 360x640 and 412x915 first screen) and `metrics.json` (per scroll step: coverage %, panel colour, size histogram).

## Findings for Phase 2
1. Putting all text in 8-12px is a drop of up to 4-8px for most text. Needs a role map (e.g. headings 12px bold, body 11-12px, labels 8-10px) applied to token vars AND to Tailwind/inline sizes via one phone-only rule set (`!important` or a root font-size scale).
2. Caveat on readability (research: body >=16px, Apple 17pt, Material 16sp; WCAG sets no px floor). 8-10px is the risky end; this audience includes older readers. Suggest keeping 10px as the floor for anything the visitor must read and using 8-9px only for decorative labels. Decide in Task 2.1.1.
3. Sandbox could not reach Google Fonts, so Nunito did not load: the screenshots show the fallback sans (wider than Nunito). Layout/coverage numbers are close but not exact. Re-run on a connected machine for final QA (Phase 5).
4. `.hero-stats` label .65rem (10.4px) is the only text under 12px today.

## Pending
- Phase 2: font tokens + phone size scale (8-12px), Nunito weights trimmed, compact panels.
- Phase 3: translucent panels. Phase 4: peek button, scroll fade, svh gaps, safe-area. Phase 5: QA.
