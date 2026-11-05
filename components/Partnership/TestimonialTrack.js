'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/*
 * ref global-immersions.php `.swiper.myGuideSlider3` — the track of PartnershipTestimonials'
 * `carousel` variant: a native scroll-snap row (Swiper's `overflow: hidden` box) with Swiper's
 * default navigation: `.swiper-button-prev/-next`, 27x44, `#007aff`, absolutely centred on the
 * slide row (`top: 50%; margin-top: -22px`) 10px inside its left / right edges — measured on
 * production at 1440 (x 72 / 1341) and 390 (x 32 / 331). The slider is `loop: true`, so "next"
 * at the end wraps to the first slide and "prev" at the start to the last. Swiper adds
 * `.swiper-button-lock` (display: none) when every slide already fits — global-pathways' three
 * cards from 768 up — and then the row neither shows arrows nor scrolls.
 */
const CHEVRON = 'M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z';

function Arrow({ side, onClick, hidden, disabled, color }) {
  const prev = side === 'prev';
  if (hidden) return null;
  return (
    <button
      type="button"
      aria-label={prev ? 'Previous testimonial' : 'Next testimonial'}
      onClick={onClick}
      disabled={disabled}
      style={{ color }}
      className={`absolute top-1/2 z-10 -mt-[22px] flex h-[44px] w-[27px] items-center justify-center disabled:pointer-events-none disabled:opacity-[0.35] ${prev ? 'left-[10px]' : 'right-[10px]'}`}
    >
      <svg viewBox="0 0 27 44" aria-hidden="true" className={`h-[44px] w-[27px] ${prev ? '' : 'rotate-180'}`} fill="currentColor">
        <path d={CHEVRON} />
      </svg>
    </button>
  );
}

/*
 * Options, defaulting to the `.myGuideSlider3` pages: `perView` — Swiper breakpoints as
 * [[minWidth, slidesPerView], …] (descending), used for the lock rule; `gap` — spaceBetween; `color` —
 * the arrow colour (Swiper's #007aff, or a page's own override); `arrowsBelow` — viewport width below
 * which a page hides the arrows (international-summerschool: 768). */
const DEFAULT_PER_VIEW = [[1024, 5], [768, 4], [640, 2], [0, 1]];

export default function TestimonialTrack({ children, className, loop = true, perView = DEFAULT_PER_VIEW, gap = 20, color = '#007aff', arrowsBelow = 0 }) {
  const ref = useRef(null);
  const [locked, setLocked] = useState(true);
  const [edge, setEdge] = useState({ start: true, end: false });
  const onScroll = () => {
    const t = ref.current;
    if (t) setEdge({ start: t.scrollLeft <= 4, end: t.scrollLeft >= t.scrollWidth - t.clientWidth - 4 });
  };
  useEffect(() => {
    const t = ref.current;
    if (!t) return undefined;
    // Swiper's own rule: locked when the slide count does not exceed `slidesPerView`
    // (1 / 2 / 4 / 5 at 0 / 640 / 768 / 1024) — NOT when the pixels fit. global-pathways' three
    // 300px cards overflow a 644px row at 768, and production still hides the arrows and clips them.
    const check = () => {
      const w = window.innerWidth;
      const pv = (perView.find(([min]) => w >= min) || [0, 1])[1];
      setLocked(t.children.length <= pv || w < arrowsBelow);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [perView, arrowsBelow]);
  const go = useCallback((dir) => {
    const t = ref.current;
    if (!t || !t.children.length) return;
    const step = t.children[0].getBoundingClientRect().width + gap;
    const max = t.scrollWidth - t.clientWidth;
    if (loop && dir > 0 && t.scrollLeft >= max - 4) t.scrollTo({ left: 0, behavior: 'smooth' });
    else if (loop && dir < 0 && t.scrollLeft <= 4) t.scrollTo({ left: max, behavior: 'smooth' });
    else t.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, [loop, gap]);
  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={onScroll}
        className={`${className} ${locked ? 'overflow-hidden' : 'overflow-x-auto'} scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {children}
      </div>
      <Arrow side="prev" color={color} hidden={locked} disabled={!loop && edge.start} onClick={() => go(-1)} />
      <Arrow side="next" color={color} hidden={locked} disabled={!loop && edge.end} onClick={() => go(1)} />
    </div>
  );
}
