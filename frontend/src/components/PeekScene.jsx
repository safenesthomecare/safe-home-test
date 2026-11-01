import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

// Phone-only button: fades the text panels for a few seconds so the whole scene shows. CSS (mobile-type.css) does the fade via body.sn-peek.
const PEEK_MS = 4000;

export default function PeekScene() {
  const [on, setOn] = useState(false);
  const timer = useRef(null);
  const { pathname } = useLocation();

  const set = (next) => {
    clearTimeout(timer.current);
    setOn(next);
    if (next) timer.current = setTimeout(() => setOn(false), PEEK_MS);
  };

  useEffect(() => {
    document.body.classList.toggle("sn-peek", on);
    return () => document.body.classList.remove("sn-peek");
  }, [on]);

  // Leaving the page ends the peek
  useEffect(() => { set(false); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      className="sn-peek-btn"
      aria-pressed={on}
      aria-label={on ? "Show text again" : "Peek at the scene"}
      onClick={() => set(!on)}
    >
      {on ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
    </button>
  );
}
