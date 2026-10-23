# Carry-forward 16
Done: Testimonials.jsx — testimonial cards are now handwritten notes: ruled paper (white/sand alternating), tape strip, slight tilt via CSS `rotate` (composes with hover-lift's transform), quote in Satisfy script (1.3-1.5rem, 1.9rem line-height), signature in ember script, role caption + stars (stars now role=img with "N out of 5 stars" label; icons aria-hidden). Semantic <figure>/<blockquote>/<figcaption>.
Tested (harness bundling the real file, 1100px + 390px, no errors). Sandbox could not load Google Fonts so screenshot shows fallback serif; Satisfy loads in production if index.html links it (checked below).
FLAG for owner: the 4 testimonials in data/mock.js (Margaret Thompson, Robert Chen, Sarah Williams, James Patterson) look like placeholder text. Publish only real, consented testimonials; also verify "100% satisfaction" / "100+ families" / "24/7" claims on this page.
Pending: About + FAQ restyle (Task 4); Contact "knock on the door" flow (Task 5); Phase 6 QA; Phase 5 optional sound.
Next: Phase 4 Task 4 — Contact.jsx "knock on the door". Read Contact.jsx first (largest, has the API form).
