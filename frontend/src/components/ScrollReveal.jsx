import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Gentle "settle" fade-up for cards and section content as they scroll into view.
// Progressive: elements are only hidden once JS has tagged them; reduced-motion users see everything at once.
const SELECTOR = 'section > .container > *, section .hover-lift, section .voice-card, .faq-item';

export default function ScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    const t = setTimeout(() => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.closest('.hero-section')) return;
        const sibs = el.parentElement ? Array.from(el.parentElement.children) : [];
        el.style.setProperty('--sn-i', Math.min(sibs.indexOf(el), 5));
        el.classList.add('sn-reveal');
        io.observe(el);
      });
    }, 30);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [pathname]);
  return null;
}
