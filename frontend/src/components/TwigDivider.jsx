import React, { useEffect, useRef, useState } from 'react';

// Hand-drawn twig that draws itself when it scrolls into view.
export default function TwigDivider() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') { setShow(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="twig-divider" aria-hidden="true">
      {show && <img src="/brand/twig-divider.svg" alt="" width="640" height="48" />}
    </div>
  );
}
