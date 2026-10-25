# CF-31 - Story moved from one section to the whole site (Phases 1-3)
Decisions: pinned Home story removed; each page has its own time + task; icons come from the kit, gaps flagged.
Done:
- Phase 1: story.css + lib/storyTokens.js (colour codes), components/story/ArtifactIcon.jsx (12 kit icons + lit window, placeholder for unknown), kit page updated.
- Phase 2: lib/pageStory.js (page -> time/task/scene/props, tint), components/story/RouteStory.jsx (one scroll engine: scene parallax, veil, time tint, drifting props, time badge, reduced-motion + phone modes). StoryScene got inheritProgress/shift/bleed. StoryPinned.jsx + DayClock.jsx deleted.
- Phase 3: App.js mounts RouteStory + <main class="sn-content">. Pages: Home (pinned story removed, tile icons), About (sticky figure only >=900px, fixes overlap on phones), Services (tile icons, clock chips removed), FAQ (inline scene removed), Testimonials, Contact (PageMark eyebrow). Header/Footer: colour-coded artifact icons per tab.
- Text sits on frosted cream panels (story.css) so contrast holds over any scene.
Checks: yarn build OK; 6 pages x desktop/phone, no sideways scroll, 0 app errors (only Google Fonts blocked in sandbox); 387 text runs measured against real screenshots, 1 at 4.5 (site's existing ember colour, "Our Vision").
Pending: Phase 4 (README + STORY-BIBLE update, Lighthouse), PENDING-ASSETS.md list, real-phone check.
