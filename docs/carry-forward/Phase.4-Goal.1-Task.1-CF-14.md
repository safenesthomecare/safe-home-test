# Carry-forward 14
Done: Home.jsx now renders <StoryPinned offset={80}/> between the hero and Services Preview (TwigDivider before and after). StoryPinned gained `offset` (fixed-header px): sticky top = offset, stage height = 100svh - offset, scroll maths adjusted.
Edited: App.css — `html,body{overflow-x:hidden}` replaced by `html{overflow-x:hidden}` + `body{overflow-x:clip}`; hidden on body broke position:sticky. Still prevents horizontal scroll.
Tested (harness replicating fixed 80px header + App wrapper, 390x780): stage stays pinned at top=80 through whole scroll, --day 0 -> 0.98, headlines advance correctly, no errors. Home.jsx syntax-checked. Full CRA build/run NOT done (deps not installed here) — run `yarn start` once to confirm.
Pending: Services page (each service = scene), About/Testimonials/FAQ restyle, Contact "knock on the door" (Phase 4 tasks 2-5); Phase 6 QA; Phase 5 optional sound.
Next: Phase 4 Task 2 — Services.jsx: map each service to its scene (reuse StoryScene as a card header). Read Services.jsx first.
