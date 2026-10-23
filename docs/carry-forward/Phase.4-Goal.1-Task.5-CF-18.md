# Carry-forward 18
Done: AboutUs.jsx warm upgrade. Our Story is now two columns (stacks on mobile): tea scene (sticky on desktop) with script caption "Tea, stories, and someone who listens." beside the text. Vision heading colour changed #FF8C42 -> --sn-ember (text contrast; the orange was ~2.5:1 on light). Value cards get a blue/orange/green top accent. Off-brand pink/purple gradient in the closing section replaced by --sn-gradient-warm.
Tested (harness bundling real AboutUs.jsx at 1100px + 390px, no console errors).
FLAG for owner: About says "hundreds of families", Testimonials says "100+ families" — make consistent and only claim what is true.
Pending: FAQ restyle (Task 6); Phase 6 QA (pause offscreen loops, real-device speed <3s, caption contrast, keyboard order, ensure story assets <1.5MB total); Phase 5 optional sound; run `yarn start` once for a full-app check.
Next: Phase 4 Task 6 — FAQ.jsx warm layout (read file first).
