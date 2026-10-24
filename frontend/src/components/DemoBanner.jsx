import { DEMO } from '../lib/demo';

// Small fixed tag so nobody mistakes the UI preview for the live site. Renders nothing outside demo builds.
export default function DemoBanner() {
  if (!DEMO) return null;
  return (
    <div
      role="note"
      style={{
        position: 'fixed', top: 88, left: 8, zIndex: 900, pointerEvents: 'none',
        padding: '4px 12px', borderRadius: 999, background: '#B85207', color: '#fff',
        fontFamily: 'var(--sn-font-body, sans-serif)', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.06em',
        boxShadow: '0 2px 8px rgba(0,0,0,.25)',
      }}
    >
      DEMO · UI PREVIEW
    </div>
  );
}
