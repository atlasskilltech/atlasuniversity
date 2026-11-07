'use client';

/* Eona back-to-top (eona-core.js qodefBackToTop): fixed 39px from the right and 110px off the bottom,
 * the chevron polyline rotated 90deg, on once scrollY + innerHeight/2 >= 1000, scrolling to the top with
 * the theme's exponential ease and nudging 5px on hover. */
import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > 0 && window.scrollY + window.innerHeight / 2 >= 1000);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  const top = (e) => {
    e.preventDefault();
    const start = window.scrollY;
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / 700);
      const ease = t === 0 ? 0 : Math.pow(1024, t - 1);
      window.scrollTo(0, start - start * ease);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  return (
    <a
      href="#"
      onClick={top}
      aria-label="Back to top"
      className={`group fixed bottom-[110px] right-[39px] z-[1041] rotate-90 ${
        on ? 'visible opacity-100 transition-opacity duration-300 ease-[ease]' : 'invisible opacity-0 transition-[opacity,visibility] duration-150'
      }`}
    >
      <span className="flex h-full items-center justify-center">
        <svg viewBox="0 0 31.4 59.1" aria-hidden className="block h-[40.9px] w-[21.7px] transition-transform duration-[400ms] ease-[cubic-bezier(.59,.02,.17,.95)] group-hover:-translate-x-[5px]">
          <polyline points="30.8 0.6 0.6 29.6 30.8 58.6" fill="none" stroke="#4d4d4d" strokeWidth="2" />
        </svg>
      </span>
    </a>
  );
}
