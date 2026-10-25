import { TONES } from './storyTokens';

// One moment of the caregiver's day per page. `scene` = id from SCENES, `day` = 0..1 position on the lighting arc,
// `props` = kit icon names drifting in the foreground. Times are unique per page.
export const PAGES = {
  home:         { id: 'home',         path: '/',             time: '8:00 AM',  task: 'Caregiver arrives',               scene: 'knock',   day: 0,    tone: 'home',         icon: 'home',         props: ['shoes', 'contact', 'home-safety'] },
  about:        { id: 'about',        path: '/about',        time: '9:30 AM',  task: 'Getting to know you over tea',    scene: 'morning', day: 0.12, tone: 'about',        icon: 'about',        props: ['kettle', 'about', 'plant'] },
  services:     { id: 'services',     path: '/services',     time: '11:30 AM', task: 'Hands-on care',                   scene: 'care',    day: 0.45, tone: 'services',     icon: 'services',     props: ['personal-care', 'pill-box', 'meals', 'hands'] },
  faq:          { id: 'faq',          path: '/faq',          time: '2:00 PM',  task: 'Questions on the afternoon walk', scene: 'walk',    day: 0.6,  tone: 'faq',          icon: 'faq',          props: ['question-mark', 'walks', 'faq'] },
  testimonials: { id: 'testimonials', path: '/testimonials', time: '4:30 PM',  task: 'Afternoon tea and family notes',  scene: 'tea',     day: 0.8,  tone: 'testimonials', icon: 'testimonials', props: ['handwritten-note', 'companionship', 'shawl'] },
  contact:      { id: 'contact',      path: '/contact',      time: '7:30 PM',  task: 'Evening handover',                scene: 'window',  day: 1,    tone: 'contact',      icon: 'contact',      props: ['window', 'door-knocker', 'home-safety'] },
};

export const pageFor = (pathname) => {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/';
  return Object.values(PAGES).find((p) => p.path === clean) || PAGES.home;
};

// Everything the story uses is now drawn in the kit. Left on other icon sets by design: white check inside filled circles (Services list) and filled rating stars (lucide).
export const PENDING_PROPS = [];
export const PENDING_ICONS = [];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Lighting arc (docs/STORY-BIBLE.md 1.3): day 0..1 -> rgba tint.
const TINT = [
  [0, [255, 162, 77, 0.2]],
  [0.25, [230, 241, 250, 0.0]],
  [0.5, [255, 255, 255, 0.1]],
  [0.75, [255, 162, 77, 0.25]],
  [1, [0, 59, 102, 0.35]],
];
export function tintAt(day) {
  const d = clamp(day);
  for (let i = 1; i < TINT.length; i += 1) {
    if (d <= TINT[i][0]) {
      const [d0, c0] = TINT[i - 1];
      const [d1, c1] = TINT[i];
      const k = (d - d0) / (d1 - d0);
      const c = c0.map((v, j) => v + (c1[j] - v) * k);
      return `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${(c[3] * 0.8).toFixed(3)})`;
    }
  }
  return 'rgba(0,59,102,.28)';
}

export const toneOf = (page) => TONES[page.tone];
