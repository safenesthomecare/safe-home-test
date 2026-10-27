# CF-42: Vehicles removed + eye-level photo composition (Phases 12-13)
Done
- Phase 12: removed Car and SUV components and all uses (road cars, driveway SUV, street-row cars). Removed NearStreetProps (poles, bus stop, mailbox) from the three scenes to match the reference (no road clutter). Sidewalk/boulevard/road strips kept as empty ground at the bottom edge.
- Phase 13: camera keys lowered to human eye height (ground line ~75% down the frame): home end {x1920,y865,z1}, about {y745,z.68}, contact {y865,z1; end z.9}. Verified with a camera simulation (window 1200x700/z, layers shifted by (1-depth)*cam), not just flat renders.
- Neighbour rebuilt: vinyl siding over brick base, downspout, gas meter, sloped roof, lattice-top SideFence; tall woodlot behind the left of the house; right trees pushed out so the CN Tower shows in the gap beside the garage (Skyline tx tuned per scene: home .417, about .48, contact .386).
- PSW now walks up the front walk toward the door (home) / down and away (contact).
Pending
- Phase 14: house details (door pediment arch, brick-bordered steps), dusk light polish, character poses (PSW with two bags facing viewer, patient in doorway).
- Phase 15: final check vs reference + delivery. In-browser scroll check and `yarn build` still not run.
