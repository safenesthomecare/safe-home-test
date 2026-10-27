# CF-35: Story v5 (phases 4-6)

Done
- Time-lapse on page change: colour sweep + badge clock ticks old time to new (~0.7 s).
- Walking caregiver (DayPath, header): moves along the 6-page day rail with scroll.
- Pointer tilt: layers shift slightly with the mouse (desktop only; no phone-motion prompt).
- Tap/hover a perched prop: short caption.
- Reduced motion: all of the above off; static scene.
- docs/ rebuilt from latest build (main.c8941bdf.js, main.8d076225.css).

Checks (local, emulated)
- Contrast: 360 text runs, 1 at exactly 4.5 ("Our Vision", existing site colour).
- Sideways scroll 0 on all pages, desktop + phone widths. CLS 0-0.001. LCP ~1.5-1.7 s. Transfer ~165 KB.

Pending / not done
- Real-phone and real GitHub Pages check.
- Phone-motion tilt left out on purpose.
- Owner items: placeholder testimonials/claims, licence choice, live contact form.

Files
- frontend/src/components/story/{RouteStory,DayPath,props,StoryScene}.jsx, frontend/src/story.css, frontend/src/lib/pageStory.js, docs/
