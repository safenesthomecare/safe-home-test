# Phase 2 / Goals 2.1 + 2.2 / Tasks 2.1.1, 2.1.2, 2.2.1 — Phone text, fonts, compact panels (CF-65)

Scope rule kept: no background changes (worlds/*, WorldCamera, lib/camera.js, StoryScene, header height). Phones only (<=699px); desktop/tablet unchanged.
User decisions: keep Nunito; phone text 8-12px.

## Done
- NEW `frontend/src/mobile-type.css` (imported last in `App.js`): phone size scale as 5 variables at the top (`--sn-m-title/body/small/caption/micro` = 12/12/11/10/9px). Covers tokens, headings, Tailwind text-* classes, inline fontSize, hero stats, FAQ.
- Headings are 12px too (range cap), separated by weight 700 + Fredoka.
- Fonts (`public/index.html`): two Google Fonts links split by media query. >=700px = original (unchanged). Phones = Fredoka 600/700 + Nunito 400/700/800, no Satisfy (script font var mapped to Nunito on phones).
- Compact panels: radius 28 -> 16px, padding ~.9rem/.85rem, lighter shadow, tighter paragraph/heading gaps; buttons and portal-close keep 44px min height.
- Deliberate exception: input/textarea/select stay 16px (iOS zooms the page on focus if smaller).

## Checked (390x844, built with REACT_APP_DEMO=true, Chromium, fonts blocked in sandbox so fallback sans)
- Text sizes by share of characters: 9-12px only. 12px 43-97%, 11px 0-52%, 10px 1-6%, 9px 3% (home stat labels). No sideways scroll on any of 6 pages.
- Page height dropped (home ~4157px; panels shorter, more scene visible).

## Pending
- Phase 3: translucent panels (tint 94% -> ~72-80%, blur on visible panel, fallbacks, dusk/night tint). Phase 4: peek button, scroll fade, svh gaps, safe-area. Phase 5: QA with real Nunito.
- Open risk: 12px headings flatten hierarchy; 10px floor for text visitors must read. Raise `--sn-m-title` if wanted.
