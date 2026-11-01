# Phase 1 / Goal 1.1 / Task 1.1.1 — Research: single-path "mesh" shapes (CF-51)

## Done
Web search for existing tools before building. Search returned thin results; usable findings:
- **paper.js** (`path.unite()` / `subtract()`): boolean-merge shapes into ONE compound path. Use at BUILD time in a script, output static `d` strings (no runtime cost, no new dependency in the app).
- **svgo `mergePaths`** (https://chromium.googlesource.com/devtools/devtools-frontend/+/HEAD/node_modules/svgo/plugins/mergePaths.js): merges adjacent same-fill paths and trims size. Useful as a final clean-up pass.
- **catmullrom2bezier** (https://github.com/nkoehring/catmullrom2bezier): points -> smooth closed Bezier. Matches existing `ring()` helper in figure.jsx, which can be upgraded to Catmull-Rom for more natural outlines.
- **raphael-boolean** (https://github.com/poilu/raphael-boolean): alternative boolean ops (not needed if paper.js is used).

## Decision
No new runtime dependency. Add dev-only script `tools/mesh-union.mjs` (paper.js) that unites part outlines into one path per named part; the generated `d` strings (or the generating functions) live in the .jsx files.

## Pending
Phase 1 Task 1.2 spec (see CF-52). Phase 2+ not started.
