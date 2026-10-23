import React from 'react';

// SafeNest brand icons (24px grid). Stroke = currentColor, accent = --sn-accent.
const ICONS = {
 "calendar": "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"15.5\" rx=\"3\"/><path d=\"M3.5 10h17M8 3v3.5M16 3v3.5\"/><rect class=\"sn-a\" x=\"7.5\" y=\"13\" width=\"3\" height=\"3\" rx=\".8\"/>",
 "care": "<path d=\"M12 20C5 15.5 3 11.5 3 8.8 3 6.5 4.8 5 6.9 5 9.2 5 11 6.4 12 8c1-1.6 2.8-3 5.1-3C19.2 5 21 6.5 21 8.8 21 11.5 19 15.5 12 20z\"/><path class=\"sn-a\" d=\"M7 12h2.5L11 9.5l2 5 1.5-2.5H17\"/>",
 "check": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path class=\"sn-a\" d=\"m8 12.300 2.800 2.700 5.200-5.500\"/>",
 "clock": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path class=\"sn-a\" d=\"M12 7v5l3.5 2\"/>",
 "companionship": "<circle cx=\"9\" cy=\"8\" r=\"3.2\"/><path d=\"M3 19c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5\"/><circle class=\"sn-a\" cx=\"17\" cy=\"9\" r=\"2.5\"/><path class=\"sn-a\" d=\"M16.5 14c2.5 0 4.5 1.6 4.5 4.5\"/>",
 "document": "<path d=\"M7 3.500h7L19 8.500v11c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1v-15c0-.6.4-1 1-1z\"/><path d=\"M14 3.500v5h5\"/><path class=\"sn-a\" d=\"M9 13h6.500M9 16.500h4\"/>",
 "home": "<path d=\"M3 11.5 12 4l9 7.5\"/><path d=\"M5.5 10v9.5h13V10\"/><rect class=\"sn-a\" x=\"10\" y=\"12.5\" width=\"4\" height=\"4\" rx=\"1\"/>",
 "leaf": "<path d=\"M5 19C5 10 10 5 20 4.500 20 14 15 19 5 19z\"/><path class=\"sn-a\" d=\"M5 19c4-5 7-7.500 11-10\"/>",
 "location": "<path d=\"M12 21S5 14.500 5 9.500a7 7 0 0 1 14 0C19 14.500 12 21 12 21z\"/><circle class=\"sn-a\" cx=\"12\" cy=\"9.500\" r=\"2.500\"/>",
 "lock": "<rect x=\"5\" y=\"10.500\" width=\"14\" height=\"10\" rx=\"3\"/><path d=\"M8 10.500V8a4 4 0 0 1 8 0v2.500\"/><circle class=\"sn-a\" cx=\"12\" cy=\"15.500\" r=\"1.500\"/>",
 "mail": "<rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"3\"/><path class=\"sn-a\" d=\"M4 8l8 5.500L20 8\"/>",
 "meal": "<path d=\"M4 12h16c0 4.4-3.6 7-8 7s-8-2.6-8-7z\"/><path class=\"sn-a\" d=\"M9 4.5c-1 1.5 1 2.5 0 4M13 3.5c-1 1.5 1 2.5 0 4\"/>",
 "medication": "<rect x=\"3\" y=\"9\" width=\"18\" height=\"6\" rx=\"3\" transform=\"rotate(-45 12 12)\"/><path class=\"sn-a\" d=\"m9.9 9.9 4.2 4.2\"/>",
 "message": "<path d=\"M4 5.500h16c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1h-9L6.500 20v-3.500H4c-.6 0-1-.4-1-1v-9c0-.6.4-1 1-1z\"/><path class=\"sn-a\" d=\"M8 10h.01M12 10h.01M16 10h.01\" stroke-width=\"2.4\"/>",
 "mobility": "<circle cx=\"9.5\" cy=\"16.5\" r=\"4\"/><path d=\"M8 4.5v8h6.5l3 5.5H20\"/><circle class=\"sn-a\" cx=\"8\" cy=\"3.2\" r=\"1.4\"/>",
 "nest": "<path d=\"M3.500 14c1 5 4.500 6.500 8.500 6.500s7.500-1.500 8.500-6.500\"/><path d=\"M5 15c4 3 10 3 14 0\"/><path d=\"M8.500 11 12 7.500l3.500 3.500v3\"/><rect class=\"sn-a\" x=\"11\" y=\"9.800\" width=\"2\" height=\"2\" rx=\".5\"/>",
 "overnight": "<path d=\"M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z\"/><circle class=\"sn-a\" cx=\"17\" cy=\"6\" r=\"1.2\"/>",
 "phone": "<path d=\"M6.5 3.5h3L11 8 8.8 9.4c1.1 2.3 3.5 4.7 5.8 5.8L16 13l4.5 1.5v3c0 1.5-1.2 2.7-2.7 2.7C10.500 19.800 4.200 13.500 3.800 6.200 3.800 4.700 5 3.500 6.500 3.500z\"/>",
 "shield": "<path d=\"M12 3l7.500 3v5.500c0 4.500-3 7.800-7.500 9.500-4.500-1.700-7.500-5-7.500-9.500V6z\"/><path class=\"sn-a\" d=\"m8.800 12 2.200 2.200 4.500-4.700\"/>",
 "staff": "<circle cx=\"10\" cy=\"8\" r=\"3.500\"/><path d=\"M3.500 20c0-3.800 2.900-6 6.500-6 1.500 0 2.900.4 4 1\"/><path class=\"sn-a\" d=\"m15 18 2 2 4-4.500\"/>",
 "star": "<path d=\"m12 3.500 2.600 5.500 5.900.7-4.400 4.100 1.200 5.900-5.300-2.900-5.300 2.900 1.200-5.900L3.500 9.700 9.400 9z\"/>",
 "transport": "<path d=\"M4 14v-3l2.5-4.5h11L20 11v3\"/><path d=\"M3 14h18v3.5H3z\"/><circle class=\"sn-a\" cx=\"7.5\" cy=\"17.5\" r=\"1.8\"/><circle class=\"sn-a\" cx=\"16.5\" cy=\"17.5\" r=\"1.8\"/>"
};

const BrandIcon = ({ name, size = 24, className = '', style }) => (
  <svg
    className={`sn-icon ${className}`}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    style={style}
    dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }}
  />
);

export default BrandIcon;
