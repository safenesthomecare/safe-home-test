# Phase 5 / Goal 5.1 / Tasks 5.1.1-5.1.3 — QA (CF-69)

No source changes in Phase 5 (all checks passed). Real Nunito/Fredoka loaded this time (npm font files served in place of Google Fonts); Satisfy not available, so the "before" tagline shows a fallback serif (phones after = Nunito anyway).

## Results
- Fonts on phones (after): Nunito 400/700/800 + Fredoka 600/700 loaded. No sideways scroll on 6 pages x 3 sizes (360x640, 390x844, 412x915).
- Text sizes (share of characters, same at all sizes): only 9-12px. home 9:3% 10:1% 11:52% 12:43%; about 10:2 11:23 12:76; services 10:2 11:20 12:78; testimonials 10:6 11:18 12:77; faq 10:3 12:97; contact 10:5 11:20 12:75.
- Contrast, worst-case (darkest 5% of scene under text, blur ignored): home 4.5, about 4.7, testimonials 4.6, faq 4.8, contact 4.5 (all at the panel strengths in use). Services "01-03" readings of 1.1 = white number on coloured badge (false alarm).
- Desktop (1280x800) and tablet (768x1024): pixel-identical to the original build on all 6 pages.
- Page length shorter on phones, e.g. home 390x844 4165px (was ~4157-4235 in Phase 1 baseline range with fallback font; panels are shorter, gaps now follow screen height).

## Files
`mobile-qa/<page>-<w>x<h>.png` (left = before, right = after, first screen), `contact_sheet_before_after_390.jpg`, `results.json`.

## Not covered (needs a real phone)
- Notch/home-bar spacing (insets are 0 in desktop Chromium), scroll-fade feel, blur performance on older phones, iOS tap-zoom on the 16px form fields.
- Blur 4px is on every panel but dropped at the faded ends; if an old phone stutters, set `--sn-m-panel-a` to .95 and remove the backdrop-filter lines.

## Status
Phases 1-5 complete. Changed files across the project: frontend/src/mobile-type.css (new), frontend/src/components/PeekScene.jsx (new), frontend/src/App.js (2 lines), frontend/public/index.html (fonts + viewport).
