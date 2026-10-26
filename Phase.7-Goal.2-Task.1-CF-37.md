# CF-37: Figure rework Phase C (use the new views in the worlds)
**Done:** added `view` to 16 figure calls. Home: PSW `b34` (walks away toward the house), Patient `f34`. About: PSW `b34` (walking up to the door), Patient `f34` in the doorway. Contact: PSW `b34` (leaving), Patient `f34` (waving). FAQ: PSW `b34` (over-the-shoulder foreground, pointing), Patient `f34`. Testimonials: both `f34`. Services: all `f34` (hold and stand pairs, seated pair). Kit world captures regenerated, docs/ rebuilt.
**Verified:** all six opening frames viewed; build compiles. Element counts unchanged (view only changes projection).
**Not done:** Phase D: contrast audit and fps re-run on the new build (figures changed shape, small risk); phone-view check of the new poses; Services still has no over-the-shoulder kitchen close-up.
**Files:** worlds/{home,about,contact,living,services}.jsx, docs/ (new bundle), docs/kit/world-*.jpg, APPLY.txt, this file.
**Next:** Phase D.
