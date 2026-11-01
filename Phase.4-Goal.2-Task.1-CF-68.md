# Phase 4 / Goals 4.2 + 4.3 + 4.4 — Scroll fade, screen-height gaps, notch spacing (CF-68)

Scope rule kept: no background/camera/header changes. Files: `frontend/src/mobile-type.css` (end of file), `frontend/public/index.html`.

## Done
- 4.2 Panels fade to 15% as they scroll out of view and are full strength in the middle of the screen (CSS scroll timeline `view()`, with a plain fallback where unsupported or reduced-motion is on). Blur is switched off at the faded ends, so only visible panels blur. Peek button still wins (10%).
  - Gotcha: written as longhand properties because the CRA minifier moved the `animation` shorthand after `animation-timeline` and wiped it.
- 4.3 Gaps use screen height (svh): between sections clamp(64px, 9svh, 110px); indoor pages' first gap clamp(210px, 32svh, 300px) (360x640: 210px, 390x844: 270px, 412x915: 293px). Hero min-height 80svh, app min-height 100svh.
- 4.4 `viewport-fit=cover` added to the viewport tag; footer and page sides pad by the notch/home-bar insets; peek button respects the left inset.

## Checked (Chromium, 360x640 / 390x844 / 412x915, about + home)
No sideways scroll. About at 390x844, panel opacity at scroll 0/300/600/900: 1.00/0.74/... then 0.26/1.00, 0.15/1.00/0.50, 0.15/0.97/1.00 (neighbours fade, focused panel full). Peek still 1 -> 0.1 -> 1. Notch insets are 0 in desktop Chromium; real devices untested.

## Pending
- Phase 5 QA: before/after screenshots, contrast with real Nunito, desktop unchanged check, test on a real phone (notch + fade).
