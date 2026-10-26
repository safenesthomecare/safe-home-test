# CF-39: GTA backdrop (Phases 3 + 4)
Done
- `about.jsx`: far = lake haze + skyline, mid = suburb rows (midmorning tones).
- `contact.jsx`: dusk skyline (lit windows), dim suburb rows with lit windows, dark hydro poles.
- `gta.jsx`: added `glow` (Skyline) and `lawn`, `hazeColor`, `dim`, `lit` (SuburbRow) for time-of-day tints.
- Syntax/bundle check via esbuild on home/about/contact; static renders reviewed. Full `yarn build` not run (no node_modules).
Pending
- Indoor worlds (services, living) untouched by design (no outdoor backdrop).
- In-browser scroll/parallax test; adjust CN Tower x via `tx` if the camera crops it.
