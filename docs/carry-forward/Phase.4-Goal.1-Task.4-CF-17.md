# Carry-forward 17
Done: Contact.jsx "knock on the door". Form heading gets a script line ("Knock, knock. We are happy to hear from you."), button reads "Knock on Our Door". On successful POST the form is replaced by a success panel: scene 1 (door swings open as it mounts), "The door is open, <first name>.", 24-hour promise + phone link, "Send another message" button. Panel has role=status and takes focus for screen readers. Success toast kept; error path/toast unchanged.
Unchanged: API call, payload (name/email/phone/message), required fields, backend.
Tested (harness bundling real Contact.jsx, mocked /api/contact): payload posted exactly as before, success panel shows "The door is open, Anna.", focus lands on role=status, "Send another message" restores the form, no console errors. Site CSS not loaded in harness (plain fonts in screenshot). Full CRA run still pending.
Pending: About + FAQ restyle (Task 5); Phase 6 QA (pause offscreen loops, real-device speed, contrast, keyboard); Phase 5 optional sound; verify live POST to Mongo/Resend after deploy.
Next: Phase 4 Task 5 — AboutUs.jsx + FAQ.jsx warm layout (read each first; two files, so do About first).
