# CF-33: Task 6.1 docs rebuild (+ time removal, requested before it)
**Done:** (a) removed the fixed time pill (`RouteStory.jsx`, `.sn-time-badge` CSS in `story.css`) and the time prefix in the page eyebrow (`PageMark.jsx` now shows only the task name). (b) rebuilt `docs/` per README recipe (`REACT_APP_DEMO=true PUBLIC_URL=/safe-home-test`), new bundle `main.f3ea6130.js` / `main.17a1a305.css`, `404.html` copied from `index.html`; old `docs/static` replaced, `.md` notes, kit, story, brand kept.
**Decisions:** time labels gone from the visible UI. Resolves open items 2 and 3 (pill overlap, 5:30 vs 7:30). `lib/pageStory.js` still holds unused time data; `StoryPinned`/`DayClock`/`StoryScene` clocks are not rendered anywhere. Items 1, 4, 5 await the user's visual review.
**Pending:** 6.2 kit page + FIGURE-STYLE.md; 6.3 progress note + updates zip. Not visually re-checked after removal (build compiles).
**Files:** frontend/src/components/story/{RouteStory,PageMark}.jsx, frontend/src/story.css, docs/ (static, index.html, 404.html, asset-manifest.json), this file, PLAN-CARRY-ON.md.
**Next:** 6.2.
