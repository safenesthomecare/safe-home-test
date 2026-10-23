# safenest-www: SafeNest Home Care public website

Live at https://www.safenesthomecare.com (root domain redirects to www).

React (CRA + Tailwind + shadcn) frontend in `frontend/`, FastAPI + MongoDB backend in `backend/`,
served from one Vercel project (`api/index.py` exposes the backend at `/api/*`).

## Deploy
1. `frontend/public/logo.jpeg` and the favicon/app icons are already included.
2. Push to GitHub, import the repo in Vercel (root directory = repo root; settings come from `vercel.json`).
3. Add the environment variables from `.env.example` in Vercel (MONGO_URL is required; the Resend ones are optional).
4. Vercel > Settings > Domains > add `www.safenesthomecare.com` and `safenesthomecare.com` (set root to redirect to www).
5. Namecheap > Advanced DNS: CNAME, host `www`, value = the target Vercel shows (usually `cname.vercel-dns.com`); A record, host `@`, value = the IP Vercel shows. Delete old Emergent/`home` records.

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

## Domain naming (one Vercel project + one GitHub repo per site)
| Audience | Subdomain | Repo |
|---|---|---|
| Public | www (and root) | safenest-www |
| Clients/families | clients | safenest-clients |
| Employees | team | safenest-team |
| Admin | admin | safenest-admin |
| Careers | careers | safenest-careers |
| Shared API (optional) | api | safenest-api |

New site: create repo `safenest-<type>` > import in Vercel > add `<type>.safenesthomecare.com` > Namecheap CNAME host `<type>`.
Client/employee portals hold health data: plan for PHIPA (access control, audit logs, Canadian regions).

## Before going live
- Replace the placeholder testimonials in `frontend/src/data/mock.js` with real, consented ones, and confirm the claims on the site ("100% satisfaction", "100+ / hundreds of families", "24/7", caregivers "certified" with background checks).
- `LICENSE` is AGPL-3.0, which requires publishing the source of a modified network service. Confirm that is what you want for a business site (or switch to a proprietary notice).
- Send one real test message through the contact form and confirm it reaches MongoDB (and email, if Resend is set).
- Run Lighthouse (mobile) on the deployed home page; target load under 3 seconds.
- Project history and decisions: `docs/STATUS.md` and `docs/carry-forward/`.
