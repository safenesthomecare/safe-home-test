import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGES, pageFor } from '../../lib/pageStory';
import { TONES } from '../../lib/storyTokens';

// The caregiver walks along the bottom edge of the header as you move through the site (one segment per page, in time order).
// Decorative (aria-hidden); the walking legs stop for reduced motion.
const ORDER = ['home', 'about', 'services', 'faq', 'testimonials', 'contact'];

export default function DayPath() {
  const page = pageFor(useLocation().pathname);
  const walker = useRef(null);
  const idx = ORDER.indexOf(page.id);

  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, (window.scrollY || 0) / max));
      const x = ((idx + p) / ORDER.length) * 100;
      if (walker.current) walker.current.style.left = `${x}%`;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    const t = setTimeout(queue, 150);
    return () => { window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue); clearTimeout(t); if (raf) cancelAnimationFrame(raf); };
  }, [idx]);

  return (
    <div className="sn-daypath" aria-hidden="true">
      <div className="sn-daypath-rail" />
      {ORDER.map((id, i) => (
        <span key={id} className="sn-daypath-dot" data-now={i === idx || undefined} style={{ left: `${(i / ORDER.length) * 100}%`, '--c': TONES[PAGES[id].tone].fill }} />
      ))}
      <span className="sn-daypath-dot sn-daypath-home" style={{ left: '100%', '--c': TONES.home.fill }} />
      <span ref={walker} className="sn-walker">
        <svg viewBox="0 0 24 32" width="15" height="20">
          <rect className="leg lb" x="9" y="21" width="3.4" height="10" rx="1.6" fill="#00263F" />
          <rect x="4" y="13" width="5.5" height="8" rx="2" fill="#F47C20" />
          <rect x="8" y="11" width="10" height="13" rx="4" fill="#1F5BA8" />
          <rect className="leg lf" x="12.4" y="21" width="3.4" height="10" rx="1.6" fill="#00263F" />
          <circle cx="13" cy="6" r="4.2" fill="#F2B58A" />
          <path d="M8.8 5.5c0-3 2.2-4.6 4.6-4.6s4 1.6 4 3.8c-2.4-1.6-6.4-1-8.6.8z" fill="#00263F" />
        </svg>
      </span>
    </div>
  );
}
