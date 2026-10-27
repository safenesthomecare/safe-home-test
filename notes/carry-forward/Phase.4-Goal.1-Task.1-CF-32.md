# CF-32 - Phase 4 QA, speed, docs, ship
QA: widths 360/768/1024/1280 x 6 pages: 0 sideways scroll; hamburger below 1180px; reduced motion: props static, veil fixed; props move faster than content, pointer-events none, links click through; tab order OK (header, content, footer); no scene edge leaks at top/bottom of any page checked (home, contact; desktop + phone).
Speed (emulated phone, 4x CPU, slow-4G): LCP 1.4-1.5 s, CLS 0 (was 0.11: body class now set in index.html), ~160 KB transferred (gzip), scroll 50-59 fps. Not a real-phone Lighthouse run.
Docs: README + STORY-BIBLE note updated; docs/ rebuilt (main.js hash changes each build).
Pending (additional, flagged): props/icons in docs/PENDING-ASSETS.md; real-phone check; owner items (testimonials, claims, licence, live form test).
