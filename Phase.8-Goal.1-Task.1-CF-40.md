# CF-40: GTA street-level upgrade (Phases 5-8)
Done
- New `worlds/gta-street.jsx`: Car, Hydrant, Mailbox (Canada Post), BusStop, Townhouses (infill block), Street (lawn edge > sidewalk > boulevard > curb > road with parked cars, street trees, hydro poles), NearStreet (road/boulevard/sidewalk in front of the hero lawn).
- `gta.jsx`: SuburbRow now mixes semis, bungalows and townhouse blocks with front walks/driveways, plus Street frontage; dim/haze cover the street.
- `home/about/contact.jsx`: NearStreet added to the depth-1 plane; rows moved to y=720 (s .5) and y=850 (s .75); standalone HydroPoles removed (poles now live on boulevards). Contact uses dusk tones.
- `art.jsx`: re-exports the new pieces.
Pending
- In-browser scroll/parallax check; full `yarn build` (esbuild bundle + static renders only).
- Sourcing note: web search returned zoning/planning docs only; street cross-section is from general GTA knowledge, not measured.
