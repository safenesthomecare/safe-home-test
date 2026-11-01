# Phase 6 / Goal 6.1 / Task 6.1.1 — Smaller icons, menu tabs and sections to match the small text (CF-70)

Only `frontend/src/mobile-type.css` changed (Phase 6 block at the end). Phones only (<=699px); desktop/tablet untouched. Header bar height not touched (verified 80px before and after).

## Done
- Icons about 70%: 12->10, 16->12, 18->13, 20->14, 26->18, 28->20, 30->20px. Round icon badges: padding cut (about 61px -> ~35px). Contact icon circles 48->36px, Services step circles 80->56px, footer logo 84->56px. Hamburger icon 28->22px inside a 44px tap area.
- Menu tabs (dropdown under the header): text 12px, tighter padding and gaps, every row still 44px tall; phone/portal/Get Started buttons 12px, 44px tall. Menu height now follows the screen (svh). Accordion (FAQ) chevrons 12px.
- Sections: cards and gaps cut about 45% (inline margins 3rem->1.2, 2rem->.9, 1.2/1rem->.6-.65, padding 2rem->.9, 1.2->.7), panel bottom padding 1.5rem->1rem. Buttons keep 44px min height, slightly narrower side padding.

## Checked (390x844, real fonts, before vs after)
- Page height: home 4699->3530, about 4993->3489, services 5353->3762, testimonials 4523->3354, faq 3682->2473, contact 2943->2296.
- No sideways scroll; all buttons >=43px tall; menu rows 44px; hamburger 44x44.
- Screenshot: mobile-qa/phase6-check.png (contact before/after, menu open, services before/after).

## Note
- Text under 12px in the dropdown menu was 14px before; now 12px. Nothing else outside main/footer/menu was touched.
- Re-test on a real phone: tap comfort at 10px icons, menu feel.
