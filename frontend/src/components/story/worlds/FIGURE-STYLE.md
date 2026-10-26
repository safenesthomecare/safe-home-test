# Figure style (minimal silhouette)
- Source: `figure.jsx`; `Person` in `art.jsx` points to it, so every world uses it.
- Look: faceless. One smooth head shape plus hair, flat tonal fills, one soft shade gradient per figure, no outlines, no blur filters. Back limbs are a shade darker for depth. Mitten hands, single-shape shoes.
- No animation: poses and the `walk` stride are fixed shapes. Nothing loops (the old `sw-leg`, `sw-arm`, `sw-wave` classes are gone).
- Props: x, y, s, face, skin, hair, top, bottom, shoe, pose, walk, outfit, hairStyle, cane, elder, item, lean. `glasses` is accepted but draws nothing (kept so worlds don't break).
- Poses: stand, walk, wave, open, hold, give, point, sit. Add a pose by adding one line (arm and leg angles) to POSES.
- Outfits: tee, scrubs, cardigan. Hair: short, bun, curly, wavy, long, bald. Identity comes from hair, outfit colour and size.
- Origin is the feet; sitting figures keep feet on the floor.
