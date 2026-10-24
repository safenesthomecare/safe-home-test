# safe-home-test: UI preview of the new SafeNest Home Care website

A **UI-only test copy** of the redesigned site, published with GitHub Pages so you can see the real images, animations and scroll story without any server, database or Vercel.
It is **not** the live site (https://www.safenesthomecare.com). It is kept out of search engines (meta tag + `robots.txt`) and shows a small "DEMO · UI PREVIEW" tag. The contact form only pretends to send ("Demo only: nothing was sent.").

## See it (one-time setup)
1. Push this repo to GitHub as a **public** repository.
2. Repo **Settings > Pages > Build and deployment > Source = "GitHub Actions"**.
3. Push to `main` (or open the **Actions** tab > "Deploy UI preview" > **Run workflow**). The first run takes about 2 to 3 minutes.
4. Open `https://<your-username>.github.io/<repo-name>/`. If the run fails, the Actions tab shows the error.

The preview is rebuilt automatically on every push to `main`. Pages use `#/` addresses (for example `.../#/services`); that is normal for this preview.

## UI test checklist
- **Home story:** scroll through all 8 scenes on a real phone and a laptop; the day clock and dots work; tapping a dot jumps to that scene; "Skip the story" appears when you press Tab.
- **Reduced motion:** turn on "reduce motion" in the phone/OS settings; the story becomes 8 still cards with captions.
- **Phone (360px) and tablet (768px):** no sideways scrolling; below 1180px the menu is a hamburger and contains the phone number, Employee Portal and Get Started.
- **Every page:** Services (a scene on each card), About, Testimonials, FAQ (opens and closes with the keyboard), Contact.
- **Contact form:** fill it in and send; you should see "The door is open, <name>." with "Demo only: nothing was sent."
- **Speed:** run Lighthouse (mobile) on the preview address; target load under 3 seconds.
- **Content to confirm with the owner:** the placeholder testimonials in `frontend/src/data/mock.js`; claims ("100% satisfaction", "100+ / hundreds of families", "24/7", "certified" caregivers with background checks).

## What the demo does and does not use
- Uses: `frontend/` only (built with `REACT_APP_DEMO=true`, which turns on `#/` addresses, the demo tag and the fake contact form).
- Not used here (kept so promoting to live is easy): `backend/`, `api/`, `vercel.json`, `.env.example`.

## A Day at Home (scroll story)
The home page opens with a scroll-driven illustrated story: eight moments of a caregiver visit, from the knock at 8:00 AM to the lit window at 7:30 PM. The light shifts from dawn gold to evening blue as you scroll. The same scenes illustrate the Services, About, FAQ and Contact pages.

| File | Job |
|---|---|
| `frontend/public/story/scene-N-*.svg` | The 8 layered illustrations (32 KB total) |
| `frontend/src/components/story/StoryScene.jsx` | Scene list (`SCENES`: clock, headline, text, service, alt, crop focus) + the renderer |
| `frontend/src/components/story/StoryPinned.jsx` | Pinned scroll section, crossfade, lighting tint, captions, skip link |
| `frontend/src/components/story/DayClock.jsx` | Sun-arc clock + one dot per scene (click to jump) |
| `docs/STORY-BIBLE.md` | Script, art direction, lighting arc |

Design rules worth keeping:
- **Scene contract:** viewBox `0 0 1200 700`; layers are `<g id="layer-*" data-depth="0.2-1">` (higher depth moves more in the parallax); looping animation lives inside the SVG as CSS; every scene respects `prefers-reduced-motion`.
- Scenes render inside a Shadow DOM so their internal CSS and animation names cannot clash.
- **Accessibility:** reduced-motion visitors get all 8 scenes stacked as static captioned cards; screen readers get the caption text via a live region; keyboard users get a "Skip the story" link and labelled scene buttons; caption text is 10:1 or better against its panel.
- **Phones:** in narrow portrait the caption docks under the picture; each scene has a `focus` value (0 to 1) that aims the crop at the action.
- **Adding a scene:** draw an SVG to the contract, put it in `frontend/public/story/`, add an entry to `SCENES` (with `day` 0-1 for the lighting arc, plus `focus`) and a minutes value in `DayClock.jsx` (`MINUTES`). Nothing else changes.
- Header note: `body { overflow-x: clip }` (not `hidden`) in `App.css` is required for the pinned section to stay stuck.

## Local dev
- Preview mode (no server needed): `cd frontend && yarn && REACT_APP_DEMO=true yarn start` (Windows PowerShell: `$env:REACT_APP_DEMO="true"; yarn start`).
- Full mode (real contact form): backend `pip install -r requirements.txt && cd backend && uvicorn server:app --reload --port 8000` (needs `backend/.env` with MONGO_URL, DB_NAME), then `cd frontend && cp .env.local.example .env.local && yarn && yarn start`.

## Promote to live (only after the checklist passes)
The live site is the Vercel project (www.safenesthomecare.com). The demo-only pieces switch themselves off when `REACT_APP_DEMO` is not set, so the live build keeps normal addresses, no demo tag and the real contact form. To move this design to the live repo:
1. Copy the changes into the live repo (or merge this branch), **excluding demo-only items**: delete `.github/workflows/demo-pages.yml`.
2. **Remove the no-index items** (otherwise Google will not list the live site): the `<meta name="robots" ...>` line in `frontend/public/index.html`, `frontend/public/robots.txt` (delete, or replace with a normal one that allows crawling), and the `headers` block (`X-Robots-Tag`) in `vercel.json`.
3. In the **live** Vercel project set the real environment variables (live `MONGO_URL`, `DB_NAME=safenest`, `CORS_ORIGINS=https://www.safenesthomecare.com,https://safenesthomecare.com`, Resend values with `CONTACT_TO_EMAIL` set to the real inbox). Do not set `REACT_APP_DEMO`.
4. Replace the placeholder testimonials and verify the claims listed above.
5. Decide on the license: `LICENSE` is AGPL-3.0, which requires publishing the source of a modified network service. Keep it, or switch to a proprietary notice.
6. Deploy; confirm `www.safenesthomecare.com` and `safenesthomecare.com` stay attached in Vercel (DNS is unchanged). Then send one real contact-form message and confirm it arrives, and run Lighthouse on the live home page.

Project history and decisions: `docs/STATUS.md` and `docs/carry-forward/`.
