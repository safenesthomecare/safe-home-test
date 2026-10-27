# Carry-forward 29 (GitHub Pages UI demo, Phase 3 of 3 - complete)
Done:
- .github/workflows/demo-pages.yml: on push to main / manual run; Node 20, yarn cache, `yarn install --frozen-lockfile`, `yarn build` with CI=false, REACT_APP_DEMO=true, PUBLIC_URL=/<repo-name>; copies index.html to 404.html; uploads frontend/build; deploy job with actions/deploy-pages@v4. YAML validated.
- README.md rewritten for the preview: what it is, one-time Pages setup + URL pattern, UI test checklist, what the demo uses/doesn't use, local preview command, story-system docs, promote-to-live steps (delete workflow, remove 3 no-index items, real env vars, content/claims, license, deploy).
- docs/STATUS.md updated.
Verified: fresh copy of the repo -> `yarn install --frozen-lockfile` (OK) -> `yarn build` with the workflow's env (Compiled successfully; assets under /safe-home-test/). Secret scan on the whole tree: no keys, no connection strings with credentials, no .env files. Only emails present: dipali@safenesthomecare.com (already public on the website) and Resend's sample sender.
NOT verified here (needs GitHub): the Actions run itself and the Pages URL. If the first run fails, check Actions tab; common cause is Pages Source not set to "GitHub Actions".
Owner steps: push to a PUBLIC repo; Settings > Pages > Source = GitHub Actions; open https://<username>.github.io/<repo-name>/ (hash addresses like #/services are expected). Note: a repo named <username>.github.io would need PUBLIC_URL empty - not the case for safe-home-test.
