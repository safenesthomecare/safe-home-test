# safe-home-test: DEMO of the new SafeNest Home Care website

**This is a test copy.** It is not the live site (https://www.safenesthomecare.com) and must never be attached to the live domains.
It is kept out of search engines (meta tag, `X-Robots-Tag` header, `robots.txt`) and uses its own database (`DB_NAME=safenest_demo`), so test messages never mix with real ones.

React (CRA + Tailwind + shadcn) frontend in `frontend/`, FastAPI + MongoDB backend in `backend/`,
served from one Vercel project (`api/index.py` exposes the backend at `/api/*`).

## Deploy the demo
1. Push this repo to GitHub (`safe-home-test`) and import it in Vercel (root directory = repo root; settings come from `vercel.json`).
2. Add the environment variables from `.env.example` in Vercel. `MONGO_URL` is required (use a **test** cluster or a separate database). Leave `CONTACT_TO_EMAIL` blank so no email reaches the live inbox. Set `CORS_ORIGINS` to the demo's `https://<project>.vercel.app` address.
3. Open the `*.vercel.app` address Vercel gives you. **Do not add `www.safenesthomecare.com` or `safenesthomecare.com` and do not touch Namecheap DNS.**

## Test checklist (before promoting)
- **Home story:** scroll through all 8 scenes on a real phone and a laptop; the day clock and dots work; tapping a dot jumps to that scene; "Skip the story" appears when you press Tab.
- **Reduced motion:** turn on "reduce motion" in the phone/OS settings; the story becomes 8 still cards with captions.
- **Phone width (360px) and tablet (768px):** no sideways scrolling; the menu is a hamburger below 1180px and contains the phone number, Employee Portal and Get Started.
- **Every page:** Services (scene on each card), About, Testimonials, FAQ (opens/closes with keyboard), Contact.
- **Contact form:** send a test message; it shows "The door is open, <name>." and a new row appears in the `safenest_demo` database. Also try with the server offline to see the error message and phone number.
- **Speed:** run Lighthouse (mobile) on the demo address; target load under 3 seconds.
- **Content to confirm with the owner:** placeholder testimonials in `frontend/src/data/mock.js`; claims ("100% satisfaction", "100+ / hundreds of families", "24/7", "certified" caregivers with background checks).

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
- Backend: `pip install -r requirements.txt && cd backend && uvicorn server:app --reload --port 8000` (needs `backend/.env` with MONGO_URL, DB_NAME)
- Frontend: `cd frontend && cp .env.local.example .env.local && yarn && yarn start`

## Promote to live (only after the checklist passes)
1. **Remove the three no-index items** (otherwise Google will not list the live site):
   - the `<meta name="robots" ...>` line in `frontend/public/index.html`
   - `frontend/public/robots.txt` (delete it, or replace with a normal one that allows crawling)
   - the `headers` block (`X-Robots-Tag`) in `vercel.json`
2. Set the real environment variables in the **live** Vercel project: live `MONGO_URL`, `DB_NAME=safenest`, `CORS_ORIGINS=https://www.safenesthomecare.com,https://safenesthomecare.com`, and the Resend values with `CONTACT_TO_EMAIL` set to the real inbox.
3. Replace placeholder testimonials and verify the claims listed above.
4. Decide on the license: `LICENSE` is AGPL-3.0, which requires publishing the source of a modified network service. Keep it, or switch to a proprietary notice.
5. Deploy to the live project (push to the live repo or promote this one), then in Vercel > Settings > Domains make sure `www.safenesthomecare.com` and `safenesthomecare.com` are attached (root redirects to www). DNS stays as it is today unless the Vercel target changes (Namecheap: CNAME `www` to the value Vercel shows; A record `@` to the IP Vercel shows).
6. After going live: send one real contact-form message and confirm it arrives (MongoDB, and email if Resend is set); run Lighthouse on the live home page.

Project history and decisions: `docs/STATUS.md` and `docs/carry-forward/`.
