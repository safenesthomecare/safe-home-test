# Carry-forward 1
Done: repo built at /home/claude/safenest-home-care (frontend, backend, api/index.py, vercel.json, env examples, README). Emergent scripts/PostHog/plugins removed. Logo now /logo.jpeg. New POST /api/contact (Mongo + optional Resend email).
Pending: user adds frontend/public/logo.jpeg; push to GitHub; Vercel import + env vars; Atlas cluster; Namecheap CNAME; contact-form live test.
Decisions: single Vercel project (same-origin /api, no CORS/Render); REACT_APP_BACKEND_URL left empty.

Update 2: switched domain plan to www.safenesthomecare.com (+root redirect); CORS_ORIGINS and README updated; naming table added. Repo name suggestion: safenest-www.

Update 3: mobile fit - grids use min(100%,Npx), hero buttons/stats stack on mobile, overflow-x hidden (App.css, Home.jsx, pages/components grids).
