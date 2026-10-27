# CF-44: Live site showed old graphics because docs/ (GitHub Pages bundle) was not rebuilt
Cause: source in frontend/src had the GTA scenes, but docs/index.html still loaded the old bundle main.c9c934c9.js.
Fix: rebuilt with `cd frontend && REACT_APP_DEMO=true PUBLIC_URL=/safe-home-test yarn build` (compiled successfully), copied build/* into docs/, copied docs/index.html to docs/404.html, removed old docs/static/js/main.* and docs/static/css/main.* except the new ones.
Now loads: docs/static/js/main.60e44328.js + docs/static/css/main.8577527d.css. Verified in Chromium: new brick house and neighbour render.
Pending: delete the old hashed files listed in DELETE-OLD-DOCS-FILES.txt from your repo (a zip cannot delete files). Hard-refresh the browser after deploy (Ctrl+Shift+R) to bypass the cached bundle.
