import { TONES } from './storyTokens';

// One moment of the caregiver's day per page. `scene` = id from SCENES, `day` = 0..1 position on the lighting arc,
// `props` = kit icon names drifting in the foreground. Times are unique per page.
export const PAGES = {
  home:         { id: 'home',         path: '/',             time: '8:00 AM',  task: 'Caregiver arrives',               scene: 'knock',   day: 0,    tone: 'home',         icon: 'home',         drift: ['kettle', 'shawl', 'knocker'], beats: [{ at: 0, time: '8:00 AM', text: 'A knock at the door' }, { at: 0.34, time: '8:05 AM', text: 'The door opens, a warm hello' }, { at: 0.67, time: '8:10 AM', text: 'Shoes off, kettle on' }] },
  about:        { id: 'about',        path: '/about',        time: '9:30 AM',  task: 'Getting to know you over tea',    scene: 'morning', day: 0.12, tone: 'about',        icon: 'about',        drift: ['teacup', 'photoframe', 'shawl'], beats: [{ at: 0, time: '9:30 AM', text: 'Curtains open' }, { at: 0.34, time: '9:45 AM', text: 'Sunlight fills the room' }, { at: 0.67, time: '10:00 AM', text: 'Tea and a good chat' }] },
  services:     { id: 'services',     path: '/services',     time: '11:30 AM', task: 'Hands-on care',                   scene: 'care',    day: 0.45, tone: 'services',     icon: 'services',     drift: ['shoes', 'plant', 'teacup'], beats: [{ at: 0, time: '11:30 AM', text: 'Getting ready, with dignity' }, { at: 0.34, time: '11:45 AM', text: 'Medication reminder' }, { at: 0.67, time: '12:10 PM', text: 'Lunch made your way' }] },
  faq:          { id: 'faq',          path: '/faq',          time: '2:00 PM',  task: 'Questions on the afternoon walk', scene: 'walk',    day: 0.6,  tone: 'faq',          icon: 'faq',          drift: ['teacup', 'shoes', 'lamp'], beats: [{ at: 0, time: '2:00 PM', text: 'Setting out for a walk' }, { at: 0.34, time: '2:20 PM', text: 'Questions along the path' }, { at: 0.67, time: '2:40 PM', text: 'A rest on the bench' }] },
  testimonials: { id: 'testimonials', path: '/testimonials', time: '4:30 PM',  task: 'Afternoon tea and family notes',  scene: 'tea',     day: 0.8,  tone: 'testimonials', icon: 'testimonials', drift: ['plant', 'shawl', 'lamp'], beats: [{ at: 0, time: '4:30 PM', text: 'Tea is poured' }, { at: 0.34, time: '4:45 PM', text: 'The photo album opens' }, { at: 0.67, time: '5:00 PM', text: 'Notes from families' }] },
  contact:      { id: 'contact',      path: '/contact',      time: '7:30 PM',  task: 'Evening handover',                scene: 'window',  day: 1,    tone: 'contact',      icon: 'contact',      drift: ['shoes', 'shawl', 'plant'], beats: [{ at: 0, time: '7:30 PM', text: 'Handover at the door' }, { at: 0.34, time: '7:40 PM', text: 'Dusk settles in' }, { at: 0.67, time: '7:50 PM', text: 'The window lights up' }] },
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
