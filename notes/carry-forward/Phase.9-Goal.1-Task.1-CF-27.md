# Carry-forward 27 (GitHub Pages UI demo, Phase 1 of 3)
Context: owner wants a separate PUBLIC GitHub repo (safe-home-test) with no Vercel/DB, only for UI testing. A repo page shows README text only, so the site must be built and hosted (GitHub Pages). Under a Pages sub-path, root-relative URLs (/story, /brand) would be missing, which is why only text appeared.
Done (Phase 1):
- New frontend/src/lib/asset.js: asset(path) prefixes process.env.PUBLIC_URL.
- Address-proof image/scene URLs: StoryScene.jsx (fetch), Header, Footer (2), TwigDivider, Home, Contact (loader).
- App.js: HashRouter when REACT_APP_DEMO=true, BrowserRouter otherwise (live behaviour unchanged).
- FAQ.jsx + Testimonials.jsx: "Contact" buttons are now <Link> (plain <a href="/contact"> breaks under a sub-path/hash).
Tested (real craco build, PUBLIC_URL=/safe-home-test, REACT_APP_DEMO=true, plain static server with no rewrites, like GitHub Pages): all logos/graphics load, story SVG inlined, Services shows 5 scenes, About/FAQ 1, all 6 routes render via #/route, FAQ->Contact link works, deep-link reload works, 0 HTTP errors, 0 page errors.
Not yet re-tested: normal root build (PUBLIC_URL empty, BrowserRouter) - logically identical; will be rebuilt in Phase 3.
Pending: Phase 2 (contact form demo mode + "DEMO - UI preview" strip); Phase 3 (.github/workflows/demo-pages.yml, README for Pages, secret scan, full zip). Owner step after push: repo Settings > Pages > Source = GitHub Actions.
