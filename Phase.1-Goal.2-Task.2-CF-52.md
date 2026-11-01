# Phase 1 / Goal 1.2 / Task 1.2.2 — Spec (CF-52)

## Findings (current code)
- Characters: `frontend/src/components/story/worlds/figure.jsx` (`Figure`, `PSW`, `Patient`, `CAST`). Parts today are many shapes: limb() capsules x2 per limb, torso ring + cardigan/scrub overlays, head SIL + CAP + curly circles + bun circle + curtain/locks, separate neck.
- PSW: `hairStyle="bun"`, hair `#2B2220`, blue scrubs top `#0066B3`, bottom/shoe `#003B66`.
- Patient: `hairStyle="wavy"`, hair `#DADDE3` (grey), cardigan top `#BC5509`, bottom `#FFF9F2`, shoe `#7B4A1E`, `elder`.
- Usage (files to touch for characters): about.jsx (PSW+Patient), services.jsx (PSW+Patient x3 scenes), living.jsx (PSW+Patient x2), home.jsx, contact.jsx.
- **Home** (`home.jsx` l.33-36): PSW walking away (b34) + `<Patient ... pose="wave">` at the door = the welcoming person.
- **Contact** (`contact.jsx` l.47-49): `<Patient top="#3E6AA5" ... pose="wave" dusk>` = welcoming person; its colours: top `#3E6AA5`, bottom (dusk) `#C9BFB2`. PSW: top/bottom `#16305A`, dusk.

## Requirements (confirmed by user)
1. Every named part = ONE path (one fill region): head+neck (skin), full hair (cap+bun+locks), shirt/top (torso+sleeve masses where possible), trousers, shoes, hands. Environment: pavement, road, walls, roofs, fences etc. one path each.
2. Patient hair style -> PSW's `bun`; Patient hair colour stays `#DADDE3`; PSW hair stays `#2B2220`.
3. New `Relative` character (exported from figure.jsx) for Home (first) and Contact (last): PSW bun hairstyle, hair BLACK (`#15110F`, near-black like PSW's), shirt from Contact palette (`#3E6AA5`, trousers `#C9BFB2`). Replaces the `<Patient ... wave>` on Home and Contact only.
4. Home welcoming person shirt = blue (`#3E6AA5` from Contact). Other pages keep Patient unchanged (colours, elder posture) except new bun hair.

## Assumptions to flag
- Relative is NOT `elder` (younger, black hair). Say if you want elder posture.
- Home keeps daytime tones (no `dusk` flag) but uses Contact's top/bottom hexes.

## Technique
- Build-time union via paper.js script `tools/mesh-union.mjs` -> one `d` per part; runtime stays plain SVG paths.
- Keep depth ordering: single-path parts are per limb-side (near/far) so draw order still works.
- Smooth outlines via Catmull-Rom -> Bezier instead of polyline midpoints.

## Pending (next turns, one task per turn)
- P2: figure.jsx redesign (+Relative, bun for Patient) -> P3: home.jsx/contact.jsx wiring -> P4: gta-street, gta, outdoors, indoors, props*, brick-house, others -> P5: build + screenshots.

## Culminating zip
`safe-home-updates.zip` (root folder `safe-home-test-main/`, only changed/new files, same tree). Add each phase's changed files + its CF log, then re-zip.
