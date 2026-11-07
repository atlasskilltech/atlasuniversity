'use client';

/* back-to-top.js: a 45px ring fixed 50px from the bottom-right corner, shown once the page is
   scrolled past 50px, its stroke drawn in proportion to the scroll position; a click scrolls to
   the top. The arrow is flaticon f108 rotated 90deg. Hidden at 600px and below. */
import { useEffect, useRef, useState } from 'react';
import { Glyph } from './ui';

export default function ScrollTop() {
  const path = useRef(null);
  const [len, setLen] = useState(0);
  const [offset, setOffset] = useState(0);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const p = path.current;
    const t = p.getTotalLength();
    setLen(t);
    const upd = () => {
      const o = window.scrollY;
      const r = document.documentElement.scrollHeight - window.innerHeight;
      setOffset(r > 0 ? t - (o * t) / r : t);
      setOn(o > 50);
    };
    upd();
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    return () => {
      window.removeEventListener('scroll', upd);
      window.removeEventListener('resize', upd);
    };
  }, []);
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-[50px] right-[50px] z-[99] block h-[45px] w-[45px] cursor-pointer rounded-[50px] border-0 bg-transparent p-0 shadow-[inset_0_0_0_2px_rgba(252,9,124,.2)] transition-all duration-200 ease-linear [@media(max-width:600px)]:hidden ${
        on ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-[130%] opacity-0'
      }`}
    >
      <svg className="h-full w-full" viewBox="-1 -1 102 102" aria-hidden="true">
        <path
          ref={path}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          fill="none"
          stroke="#fc097c"
          strokeWidth="4"
          style={len ? { strokeDasharray: `${len} ${len}`, strokeDashoffset: offset, transition: 'stroke-dashoffset 10ms linear' } : undefined}
        />
      </svg>
      <span className="absolute left-0 top-0 block h-[46px] w-[46px] rotate-90 text-center text-[18px] leading-[45px] text-[#fc097c]">
        <Glyph name="arrowLeft" />
      </span>
    </button>
  );
}
