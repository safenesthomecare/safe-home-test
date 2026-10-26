# CF-28: Phase 4.1 camera check (static only)
**Done:** every world file (home, about, services, living x2, contact, art, light) parses. Every key list starts at `top`, ends at `end`, numeric sections ascend, and phone values (`xN`/`yN`) exist wherever a world has a phone-specific shot. Reduced motion uses key 0 with walkers at offset 0, so Contact shows PSW beside the patient at the door. No key edits were needed.
**Not done (needs the real app):** the running app and `lib/camera.js` were not available, so these were not seen: each key landing on the right section; PSW ending on the left third (Home 1230 + 440, About 330 + 170); Contact pair on the left-centre third and nest visible at the end key; phone framing for all six pages.
**Decision:** no camera numbers were changed from guesses. Adjust only after the live check.
**Files:** this file, PLAN-CARRY-ON.md, APPLY.txt.
**Next:** Task 5.1 screenshots in the running app (run `tools/preview-world.js` or the live deployment, then fix any key from the list above).
