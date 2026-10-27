# CF-34 - Story v4: beats, illustrated props, seamless panels (plan Phases 1-3)
T0: stayed with the CSS + rAF engine (no GSAP; not needed, saves ~30 KB).
Phase 1 (beats): each page has 3 beats (pageStory.js `beats`); RouteStory sets data-beat on the scene; StoryScene BEAT_CSS moves/brightens layers per scene (transform + filter only); time badge shows the current beat ("11:45 AM · Medication reminder").
Phase 2 (props): components/story/props.jsx = 12 illustrated props (shoes, kettle, pillbox, shawl, plant, note, knocker, teacup, photoframe, cane, lamp, bowl) + StoryProp perched on panel edges, animating when scrolled into view (steam, lid opens, knocker taps, leaves sway, lamp glows). Drifting layer now uses these props, and the previous page's props leave as the new ones arrive.
Phase 3 (blend): panels feathered top/bottom with a soft glow edge (no hard card); hero panels have a taller feathered top so sky/roof show.
Checks: build OK; contrast 362 runs, 1 at 4.5 (existing ember); no overflow; click-through OK; CLS 0; LCP ~1.5 s; scroll 35-44 fps in a noisy emulated run, same as the previous build measured in the same session (27-41).
Fixes along the way: shoes lost their position (CSS transform overrode SVG attribute) -> nested groups; removed drop-shadow filters on moving props; fill-box origin only on 3 light layers.
Pending (plan Phases 4-6): page-to-page time-lapse + walking caregiver, tilt + tap-a-prop captions, reduced-motion pass, kit page + README refresh.
