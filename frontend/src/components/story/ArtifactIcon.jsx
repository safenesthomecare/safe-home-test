import React from 'react';
import { TONES, ICON_TONE } from '../../lib/storyTokens';

// "Artifact" icons from the SafeNest Story UI Kit. 24px grid, stroke = the section's text-safe colour.
// An unknown name renders a dashed placeholder and is flagged (data-missing) so gaps are easy to find.
const PATHS = {
  home: ['M3 11l9-8 9 8', 'M5 9.5V20h14V9.5', 'M10 20v-6h4v6'],
  services: ['M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z'],
  about: ['M9 5a3 3 0 1 0 0 6a3 3 0 1 0 0-6z', 'M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6', 'M17 7a2.2 2.2 0 1 0 0 4.4a2.2 2.2 0 1 0 0-4.4z', 'M16.5 14.2c2.7.3 4.5 2.4 4.5 5.8'],
  testimonials: ['M4 5h16v11H9l-5 4z', 'M8.5 9h7', 'M8.5 12h4'],
  faq: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z', 'M9.6 9.6a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.2 1-1.2 1.8', 'M12 17.2h.01'],
  contact: ['M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17', 'M4 21h16', 'M15 12h.01'],
  'personal-care': ['M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z'],
  medication: ['M10.5 20.5a4 4 0 0 1-5.7-5.7l9.9-9.9a4 4 0 0 1 5.7 5.7z', 'M9.9 9.9l5.4 5.4'],
  meals: ['M3 11h18a9 9 0 0 1-18 0z', 'M9 3.5c0 1.5 1.5 1.5 1.5 3', 'M14 3.5c0 1.5 1.5 1.5 1.5 3'],
  walks: ['M5 19c0-8 5-14 15-14 0 10-6 15-14 15', 'M5 19c3-5 6-8 10-10'],
  companionship: ['M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z', 'M16 10h2a2 2 0 0 1 0 4h-2', 'M8 3v2', 'M12 3v2'],
  'home-safety': ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M8.5 12l2.5 2.5 5-5'],
  shoes: ['M3 17v-6l4-1.5 2.5 2.5H14l4 2.5c2 .6 3 1.2 3 3v.5', 'M3 17h18v2H3z', 'M9.5 12l1.5-2'],
  kettle: ['M5 11h11l-1 9H6z', 'M5 11a5.5 5.5 0 0 1 11 0', 'M16 13h2.5a2 2 0 0 1 0 4H15.5', 'M5 13l-2-2', 'M9 4h3'],
  'pill-box': ['M3 8h18v10H3z', 'M9 8v10', 'M15 8v10', 'M3 8l2-3h14l2 3'],
  shawl: ['M4 6c4 2 12 2 16 0v6c0 4-2 7-8 8-6-1-8-4-8-8z', 'M7 10c3 1.5 7 1.5 10 0'],
  hands: ['M3 15h4l5 4 7-4c1-.5 2 .5 1.5 1.5L18 19l-6 2-5-1.5H3z', 'M12 12.5s-4-2.2-4-5a2.2 2.2 0 0 1 4-1.2 2.2 2.2 0 0 1 4 1.2c0 2.8-4 5-4 5z'],
  plant: ['M12 21v-9', 'M12 12c0-4-3-6-7-6 0 4 3 6 7 6z', 'M12 15c0-3 2.5-5 6-5 0 3-2.5 5-6 5z', 'M8 21h8'],
  'handwritten-note': ['M5 3h10l4 4v14H5z', 'M15 3v4h4', 'M8.5 12c1-1 1.5 1 2.5 0s1.5 1 2.5 0', 'M8.5 16h6'],
  'question-mark': ['M9 9a3 3 0 1 1 4.5 2.6c-1 .6-1.5 1.2-1.5 2.4', 'M12 18h.01'],
  'door-knocker': ['M6 21V3h12v18', 'M12 7a3 3 0 1 0 0 6a3 3 0 1 0 0-6z', 'M12 13v3', 'M10.5 16h3'],
  'sun-badge': ['M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8z', 'M12 2v3', 'M12 19v3', 'M2 12h3', 'M19 12h3', 'M4.9 4.9l2.1 2.1', 'M17 17l2.1 2.1', 'M19.1 4.9L17 7', 'M7 17l-2.1 2.1'],
  phone: ['M6.5 3.5h3L11 8 8.8 9.4c1.1 2.3 3.5 4.7 5.8 5.8L16 13l4.5 1.5v3c0 1.5-1.2 2.7-2.7 2.7C10.5 19.8 4.2 13.5 3.8 6.2 3.8 4.7 5 3.5 6.5 3.5z'],
  mail: ['M3 6h18v12H3z', 'M3.5 7l8.5 6 8.5-6'],
  location: ['M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z', 'M12 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z'],
  'calendar-clock': ['M4 5h16v15H4z', 'M4 10h16', 'M8 3v4', 'M16 3v4', 'M12 13v3l2 1.5'],
  check: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z', 'M8 12.5l2.8 2.7 5.2-5.5'],
  star: ['M12 3.5l2.6 5.5 5.9.7-4.4 4.1 1.2 5.9-5.3-2.9-5.3 2.9 1.2-5.9L3.5 9.7 9.4 9z'],
};


export const ICON_NAMES = [...Object.keys(PATHS), 'window'];

export default function ArtifactIcon({ name, size = 24, tile = false, className = '', style }) {
  const tone = TONES[ICON_TONE[name]];
  const known = name === 'window' || PATHS[name];
  const ink = tone ? tone.ink : '#00263F';

  let glyph;
  if (name === 'window') {
    // The lit window from the logo: gold panes in a blue frame (fixed colours, not text-safe tone).
    glyph = (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#1F5BA8" />
        <rect x="5" y="5" width="14" height="14" rx="1.5" fill="#FFC72C" />
        <path d="M12 5v14M5 12h14" stroke="#1F5BA8" strokeWidth="1.5" />
      </svg>
    );
  } else {
    glyph = (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={ink} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        {known ? PATHS[name].map((d) => <path key={d} d={d} />) : <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />}
      </svg>
    );
  }

  if (!tile) {
    return <span className={`sn-ai ${className}`} data-missing={known ? undefined : name} style={{ display: 'inline-flex', ...style }}>{glyph}</span>;
  }
  const pad = Math.round(size * 0.45);
  return (
    <span
      className={`sn-ai sn-ai-tile ${className}`}
      data-missing={known ? undefined : name}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: pad, borderRadius: '50%',
        background: tone ? tone.tint : '#E3E9EF', border: `2px solid ${tone ? tone.fill : '#00263F'}`, ...style,
      }}
    >
      {glyph}
    </span>
  );
}
