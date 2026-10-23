import { SCENES } from './StoryScene';

// Minutes since midnight for each scene (same order as SCENES).
const MINUTES = [480, 510, 555, 630, 690, 840, 990, 1170];

export function timeAt(pos) {
  const i = Math.min(Math.max(Math.floor(pos), 0), MINUTES.length - 1);
  const j = Math.min(i + 1, MINUTES.length - 1);
  const m = MINUTES[i] + (MINUTES[j] - MINUTES[i]) * Math.min(Math.max(pos - i, 0), 1);
  const h24 = Math.floor(m / 60);
  const mm = String(Math.round(m % 60) % 60).padStart(2, '0');
  return `${((h24 + 11) % 12) + 1}:${mm} ${h24 < 12 ? 'AM' : 'PM'}`;
}

/**
 * Progress "day clock": sun travels an arc as the day passes, live time, and one dot per scene.
 * pos: continuous scene position 0..N-1. onSelect(i): jump to a scene.
 */
export default function DayClock({ pos, onSelect }) {
  const N = SCENES.length;
  const t = pos / (N - 1);                    // 0..1 across the day
  const ang = Math.PI * (1 - t);              // arc from left to right
  const x = 40 + Math.cos(ang) * 32;
  const y = 40 - Math.sin(ang) * 28;
  const active = Math.min(Math.max(Math.round(pos), 0), N - 1);
  const night = t > 0.88;
  return (
    <nav
      aria-label="Scenes of the day"
      style={{
        position: 'absolute', top: 'max(12px, env(safe-area-inset-top))', right: 12, zIndex: 2,
        display: 'grid', justifyItems: 'center', gap: 4, padding: '8px 12px 10px',
        borderRadius: 'var(--sn-radius-lg, 24px)', background: 'rgba(0,38,63,.55)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', color: '#fff',
        fontFamily: 'var(--sn-font-body)',
      }}
    >
      <svg viewBox="0 0 80 46" width="72" height="42" aria-hidden="true">
        <path d="M8 40A32 32 0 0 1 72 40" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeDasharray="2 4" />
        <line x1="4" y1="40" x2="76" y2="40" stroke="rgba(255,255,255,.5)" strokeWidth="2" />
        <circle cx={x} cy={y} r="7" fill={night ? '#FFF9F2' : '#FFC83D'} />
        {night && <circle cx={x + 3} cy={y - 2} r="6" fill="#00263F" />}
      </svg>
      <div aria-hidden="true" style={{ fontFamily: 'var(--sn-font-display)', fontSize: '1rem', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{timeAt(pos)}</div>
      <div style={{ display: 'flex', gap: 2 }}>
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect && onSelect(i)}
            aria-label={`Go to ${s.clock}: ${s.title}`}
            aria-current={i === active ? 'step' : undefined}
            style={{ width: 24, height: 24, display: 'grid', placeItems: 'center', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
          >
            <span style={{ width: i === active ? 10 : 6, height: i === active ? 10 : 6, borderRadius: 99, background: i === active ? 'var(--sn-window-gold, #FFC83D)' : 'rgba(255,255,255,.6)', transition: 'all 220ms var(--sn-ease-out, ease-out)' }} />
          </button>
        ))}
      </div>
    </nav>
  );
}
