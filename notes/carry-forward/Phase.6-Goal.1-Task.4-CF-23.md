# Carry-forward 23
Built the REAL app (craco build, "Compiled successfully", main JS 118 kB, CSS 12 kB) in a scratch copy and audited it in Chromium with the real site CSS. (Scratch only needed `npm i ajv@8` for npm; your yarn.lock install should be unaffected.)
Findings + fixes:
1) Sideways overflow at 360px on /, /services, /about, /testimonials, /faq, /contact: NONE (scrollWidth = 360 everywhere). No console errors.
2) REAL BUG found only on the real site: story headline was dark blue on navy (global h2 colour overrode mine). Fixed: headline + body forced to #fff in StoryPinned Caption. Re-measured on real site at 360px: clock 10.1:1, headline 15.6:1, body 15.6:1, service 13.6:1.
3) Phone-portrait layout: caption panel covered the people. Now on narrow portrait screens (max-width 900px and portrait) the caption is DOCKED under the picture (min-height 12.5rem, solid navy); picture gets the rest of the screen. Desktop/landscape keeps the overlay panel. Scene focal points re-tuned (morning .92, medication .68, window .74).
4) Scene-to-scene dissolve narrowed to 42-58% of each step (was 35-65%) to reduce the ghostly double image.
5) PRE-EXISTING BUG (not mine) fixed: Header.jsx switched to the full desktop menu at 768px but needs ~1160px, so on tablets/small laptops (768-1179px) the phone number, Employee Portal and Get Started were cut off. Breakpoint now 1180px; below that the hamburger menu (which contains all 9 links incl. phone, Employee Portal, Get Started) is used. Verified at 360/768/1024/1179/1180/1280.
FLAG: PortalPrompt (team-portal pop-up) is fixed to the bottom on phones for ~27 s and covers the docked caption until closed; temporary by design, left alone.
Pending: Phase 5 optional sound toggle + haptics (off by default); README section for the story system (files, layer/data-depth contract, how to add a scene, a11y/reduced-motion behaviour); final zip hand-off; after deploy: real-phone Lighthouse + live contact-form test.
Next: Phase 5 Task 1 — decide whether to build sound at all (needs audio files/licensing) — or skip and write the README (Phase 6 Task 5).
