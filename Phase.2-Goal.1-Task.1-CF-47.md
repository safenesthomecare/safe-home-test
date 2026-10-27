# CF-47 — Phase 2+3: background between header and footer, verified, zipped
Done: story layer starts below the fixed header (--sn-hdr, measured) and is clipped by the footer only when the footer scrolls into view (--sn-clip). WorldCamera sizes to the free area under the header and lifts the scene by half the footer overlap, so the house and characters stay visible above the footer. Home end key y 900. Checked at 1440x900: top / middle / end.
Pipeline: docs/ retired; .github/workflows/pages.yml builds+deploys on push. Notes moved to notes/, kit page to frontend/public/.
Pending: services page (several actions) untouched; phone layouts not visually checked.
Files: story.css, components/story/RouteStory.jsx, components/story/WorldCamera.jsx, components/story/worlds/home.jsx
