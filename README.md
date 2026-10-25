# safe-home-test: UI preview of the new SafeNest Home Care website

A **UI-only test copy** of the redesigned site, published with GitHub Pages so you can see the real images, animations and scroll story without any server, database or Vercel.
It is **not** the live site (https://www.safenesthomecare.com). It is kept out of search engines (meta tag + `robots.txt`) and shows a small "DEMO · UI PREVIEW" tag. The contact form only pretends to send ("Demo only: nothing was sent.").

## See it (one-time setup)
The built preview is committed in `docs/` (no hidden files or Actions needed).
1. Push this repo to GitHub as a **public** repository named `safe-home-test`.
2. **Settings > Pages > Source = "Deploy from a branch"**, Branch `main`, Folder **/docs** (not root).
3. Open `https://<your-username>.github.io/safe-home-test/` after about a minute.

After changing the code, rebuild `docs/`: `cd frontend && REACT_APP_DEMO=true PUBLIC_URL=/safe-home-test yarn build`, then copy `frontend/build/*` into `docs/` (keep the `.md` notes there) and add `404.html` as a copy of `index.html`.
Pages use `#/` addresses (for example `.../#/services`); that is normal for this preview.

## UI test checklist
- **Story on every page:** each page has its own scene behind it (scroll to see the layers shift), icons drifting at the edges, and a time badge (Home 8:00 AM, About 9:30, Services 11:30, FAQ 2:00 PM, Testimonials 4:30, Contact 7:30 PM).
- **Reduced motion:** turn on "reduce motion" in the phone/OS settings; the scenes and icons stay still.
- **Phone (360px) and tablet (768px):** no sideways scrolling; below 1180px the menu is a hamburger and contains the phone number, Employee Portal and Get Started.
- **Every page:** Services (a scene on each card), About, Testimonials, FAQ (opens and closes with the keyboard), Contact.
- **Contact form:** fill it in and send; you should see "The door is open, <name>." with "Demo only: nothing was sent."
- **Speed:** run Lighthouse (mobile) on the preview address; target load under 3 seconds.
- **Content to confirm with the owner:** the placeholder testimonials in `frontend/src/data/mock.js`; claims ("100% satisfaction", "100+ / hundreds of families", "24/7", "certified" caregivers with background checks).

## What the demo does and does not use
- Uses: `frontend/` only (built with `REACT_APP_DEMO=true`, which turns on `#/` addresses, the demo tag and the fake contact form).
- Not used here (kept so promoting to live is easy): `backend/`, `api/`, `vercel.json`, `.env.example`.

## The story, on every page
Each page is one moment of a caregiver's day. A site-wide layer (`frontend/src/components/story/RouteStory.jsx`) shows the page's illustrated scene behind the content, moves its layers at different speeds as you scroll, tints the light for that time, and drifts small icons past the edges. Text sits on frosted cream panels so it stays readable (4.5:1) over any scene.

| Page | Time | Task | Scene |
|---|---|---|---|
| Home | 8:00 AM | Caregiver arrives | knock |
| About | 9:30 AM | Getting to know you over tea | morning |
| Services | 11:30 AM | Hands-on care | care |
| FAQ | 2:00 PM | Questions on the afternoon walk | walk |
| Testimonials | 4:30 PM | Afternoon tea and family notes | tea |
| Contact | 7:30 PM | Evening handover | window |

| File | Job |
|---|---|
| `frontend/src/lib/pageStory.js` | Page map (time, task, scene, icons, colour code), light tint, pending-asset lists |
| `frontend/src/lib/storyTokens.js` + `src/story.css` | Logo colour codes and layer styles |
| `frontend/src/components/story/RouteStory.jsx` | The scroll engine, backdrop, props and time badge |
| `frontend/src/components/story/ArtifactIcon.jsx` | The icon set (from the SafeNest Story UI Kit artifact) |
| `frontend/src/components/story/StoryScene.jsx` | Scene registry and renderer (Shadow DOM) |
| `frontend/public/story/scene-N-*.svg` | The 8 layered illustrations |
| `docs/PENDING-ASSETS.md` | Icons and props not drawn yet |

Rules worth keeping: `body { overflow-x: clip }` (not hidden); a sticky figure only when it has its own column (`.sn-sticky-fig`, 900px up); scene contract is viewBox 0 0 1200 700 with `<g id="layer-*" data-depth="0.2-1">` layers and CSS animation inside the SVG. To add a page: add an entry to `PAGES` in `pageStory.js`.

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
