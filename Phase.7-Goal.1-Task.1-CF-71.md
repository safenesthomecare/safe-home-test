# Phase 7 / Goal 1 / Task 1 — Smaller header on phones (CF-71)

Only `frontend/src/mobile-type.css` changed (Phase 7 block). Phones only (<=699px). This lifts the earlier "header height untouched" rule at the user's request.

## Done
- Header bar 80 -> 56px, side padding 1.2 -> .8rem, logo 52 -> 38px. Hamburger stays a 44px tap target (icon 22px).
- Everything that depends on the height follows it: scene top/height (RouteStory.jsx already measures the header into `--sn-hdr`), menu dropdown top and max-height, the 80px top padding on each page, and the DEMO badge (now 9px text, sits just under the header).
- No JS or component files changed.

## Checked (3 phone sizes x 6 pages, real fonts)
Header 56px everywhere; `--sn-hdr` 56px; scene starts at 56px (390x844 scene height 788px, was 764px); no sideways scroll; menu opens at 56px with 44px rows; first panel clears the header. Page heights barely moved (e.g. about 3465px). Screenshot: mobile-qa/phase7-header.png (home, menu open, about).

## Notes
- Desktop/tablet untouched. The Phase 5 desktop pixel check should still hold (rules are inside the 699px media query).
- Logo's "HOME CARE" tagline is tiny at 38px; raise `.header-nav .logo` height (and header height) together if it needs more presence.
