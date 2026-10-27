# CF-49 — Fit every page's background between header and footer
Done: story layer is now exactly the space between header bottom and footer top (CSS inset uses --sn-hdr / --sn-clip). WorldCamera scales the scene down by the same ratio when the footer scrolls in, so nothing is cropped. Home world gets padR 800 and a wider ground/street so the house stays left when zoomed out. Checked home + services at 1440x900.
Pending: phone sizes not visually checked.
Files: frontend/src/story.css, components/story/WorldCamera.jsx, components/story/worlds/home.jsx
