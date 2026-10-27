# CF-41: Photo-referenced front yard (Phases 9-11)
Done
- New `worlds/brick-house.jsx`: BrickColonial (2-storey red brick, centre gable, white trim/shutters, door, lantern, number 24, attached garage). Same door footprint as old House so characters/camera keys hold.
- `gta-street.jsx`: FrontWalk (interlock brick), Driveway (curb cut), SUV, GardenBed (stone edge, hostas, cedar), SideFence, Neighbour, Woodlot; NearStreet now sits in FRONT of the lawn (sidewalk > boulevard > curb > road) with NearStreetProps (cars, poles, trees, hydrant, mailbox, bus stop) drawn last.
- home/about/contact plane layers rebuilt: picket fence, stepping stones, flowers, old House removed. PSW now walks the public sidewalk. Contact keeps dusk tones.
Pending
- In-browser scroll/parallax check (camera keys unchanged, bottom crop of road unverified); full `yarn build` not run (esbuild bundle + static renders only).
- `House` (outdoors.jsx) is still used elsewhere? Not removed; Hills/Fence/Flowers helpers untouched.
