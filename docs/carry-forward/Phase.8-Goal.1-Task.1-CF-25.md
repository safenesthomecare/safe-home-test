# Carry-forward 25 (demo repo, Phase 1 of 3)
Plan (owner-approved): make `safe-home-test` a safe demo of the new site before replacing the live www.safenesthomecare.com.
Done (Goals 1.1 + 1.2): demo marked no-index in three places (meta robots in frontend/public/index.html, X-Robots-Tag header in vercel.json, frontend/public/robots.txt Disallow /); .env.example now uses DB_NAME=safenest_demo, CONTACT_TO_EMAIL blank (no email to live inbox), CORS_ORIGINS=https://<your-demo-project>.vercel.app.
Pending: Phase 2 - rewrite README for demo (Vercel test URL only, no live domain/DNS steps, test checklist) + "Promote to live" checklist (remove the 3 no-index items, real env, domains/DNS); Phase 3 - package zip.
Note for promotion: the three no-index items MUST be removed or Google will not index the live site.
