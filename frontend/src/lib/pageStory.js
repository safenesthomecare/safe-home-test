import { TONES } from './storyTokens';

// One moment of the caregiver's day per page. `scene` = id from SCENES, `day` = 0..1 position on the lighting arc,
// Times are unique per page.
export const PAGES = {
  home:         { id: 'home',         path: '/',             time: '8:00 AM',  task: 'Caregiver arrives',               scene: 'knock',   day: 0,    tone: 'home',         icon: 'home',         beats: [{ at: 0, time: '8:00 AM', text: 'Morning at the nest' }, { at: 0.34, time: '8:10 AM', text: 'Across the field' }, { at: 0.67, time: '8:20 AM', text: 'Nearly at the door' }] },
  about:        { id: 'about',        path: '/about',        time: '8:20 AM',  task: 'Welcomed at the door',    scene: 'morning', day: 0.08, tone: 'about',        icon: 'about',        beats: [{ at: 0, time: '8:20 AM', text: 'A warm welcome' }, { at: 0.34, time: '8:25 AM', text: 'Up the path' }, { at: 0.67, time: '8:30 AM', text: 'Come on in' }] },
  services:     { id: 'services',     path: '/services',     time: '9:00 AM', task: 'Medication reminders and meals, at your pace',                   scene: 'care',    day: 0.4, tone: 'services',     icon: 'services',     beats: [{ at: 0, time: '9:00 AM', text: 'Morning routine, at your pace' }, { at: 0.34, time: '10:30 AM', text: 'Medication reminder' }, { at: 0.67, time: '12:15 PM', text: 'Lunch made your way' }] },
  faq:          { id: 'faq',          path: '/faq',          time: '4:00 PM',  task: 'Your care plan, at the kitchen table', scene: 'walk',    day: 0.8,  tone: 'faq',          icon: 'faq',          beats: [{ at: 0, time: '4:00 PM', text: 'The care plan comes out' }, { at: 0.34, time: '4:15 PM', text: 'Questions, answered' }, { at: 0.67, time: '4:30 PM', text: 'Everyone on the same page' }] },
  testimonials: { id: 'testimonials', path: '/testimonials', time: '2:00 PM',  task: 'Tea and good company',  scene: 'tea',     day: 0.65,  tone: 'testimonials', icon: 'testimonials', beats: [{ at: 0, time: '2:00 PM', text: 'Tea is poured' }, { at: 0.34, time: '2:20 PM', text: 'Stories from the family' }, { at: 0.67, time: '2:40 PM', text: 'Notes of thanks' }] },
  contact:      { id: 'contact',      path: '/contact',      time: '5:30 PM',  task: 'Heading home at the end of the day',                scene: 'window',  day: 0.95,    tone: 'contact',      icon: 'contact',      beats: [{ at: 0, time: '5:30 PM', text: 'Handover at the door' }, { at: 0.34, time: '5:40 PM', text: 'Waving goodbye' }, { at: 0.67, time: '5:50 PM', text: 'The nest at dusk' }] },
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
