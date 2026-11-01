# Phase 3 / Goal 3.1 / Tasks 3.1.1-3.1.3 — See-through panels on phones (CF-66)

Scope rule kept: no background changes. Only `frontend/src/mobile-type.css` changed (Phase 3 block at the end). Phones only (<=699px).

## Done
- 3.1.1 Panel tint 94% -> 84% cream (variable `--sn-m-panel-a`), 4px blur on panels. Panel CSS is not scroll-aware, so blur is on every panel (4-6 per page); Phase 4.2 can limit it to the visible one.
- 3.1.2 Fallbacks: no backdrop-filter support -> 95%; "reduce transparency" or "more contrast" setting -> 97% and no blur.
- 3.1.3 Darker scenes (contact, faq) -> 90% cream.

## Contrast check (390x844, 6 pages, every ~700px of scroll)
Method: scene pixels under each text line (darkest 5%, blur ignored = conservative) blended with the panel cream, vs the text colour.
- Worst case at 84%: home 4.5, about 4.5, testimonials 4.6, faq 4.3, contact 4.1. At 90%: faq 4.8, contact 4.5. Final settings put every page at 4.5+ (faq/contact use 90%).
- Services "01" (1.0) is a false reading: white number on a gradient badge.
- Sandbox used fallback font (Nunito blocked); re-check in Phase 5 with real fonts.

## Pending
- Phase 4: peek button, scroll fade (also limits blur), svh gaps, safe-area. Phase 5: QA.
