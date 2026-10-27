# Carry-forward 15
Done: Services.jsx — each of the 5 core service cards now has its "Day at Home" scene as a header image (bleeds to card edges, overflow hidden) with a clock chip: Personal Support->care 9:15, Companion->breakfast 10:30, Elderly & Disability->medication 11:30, Post-Hospital->walk 2:00, Respite->tea 4:30. Scene 1/2/8 (knock/morning/window) are used on Home only.
Tested (harness bundling the real Services.jsx, 1100px): 5/5 scenes render, no console errors. Syntax OK. Full CRA run still pending (run `yarn start`).
Notes: scenes animate in all cards at once; Phase 6 may add IntersectionObserver to pause offscreen loops. Card heights are uneven in the grid (pre-existing layout, card 4/5 wrap to a second row).
Pending: About, Testimonials, FAQ restyle (Task 3); Contact "knock on the door" (Task 4); Phase 6 QA; Phase 5 optional sound.
Next: Phase 4 Task 3 — Testimonials.jsx: handwritten-note style (Satisfy font). Read the file first.
