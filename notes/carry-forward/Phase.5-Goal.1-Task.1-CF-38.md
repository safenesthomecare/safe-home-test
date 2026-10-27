# CF-38: Story v6 (phases 2-5): worlds, glass panels, QA

Done
- Phase 2: panels are see-through cream glass (94% on phones, 90% + blur on desktop), one side of the screen at 1000px+, full width below. Veil removed on world pages. Twig divider transparent.
- Phase 3: Home world: nest (the brand symbol) on a tree branch, logo text shrinks and fades (--hero-t), camera pulls back to the house, caregiver walks the path (--p).
- Phase 4: worlds for About (door welcome), Services (3 rooms, sideways pan), Testimonials (tea), FAQ (kitchen table), Contact (dusk handover, pulls back to the nest). Times/tasks/beats rewritten in pageStory.js. Inline mini-scenes removed from About and Services (Contact keeps the post-submit door).
- Phase 5: kit artifact updated (version 5), README, docs/ rebuilt.

Checks (local, emulated Chromium)
- Contrast: 384 text runs, 2 flagged: "Our Vision" fixed afterwards (now #AD4A07); FAQ answer on phone at 4.0 looks like a screenshot-timing artefact (text is #353535 on white) - re-check on a real phone.
- Overflow 0 at 360/768/1024/1440/1920. No console errors. Reduced motion: 0 running animations, camera frozen, hero text visible. Nav works; nothing in the world is tabbable.
- Speed (4x CPU, slow 4G): transfer ~163 KB, LCP ~1.5-1.6 s, CLS 0, 27-29 fps (noisy).

Pending
- Real-phone check; real GitHub Pages check.
- Owner items: placeholder testimonials/claims, licence, live contact form.
- Art is flat, drawn here; swap in finished illustrations by editing worlds/*.jsx.
