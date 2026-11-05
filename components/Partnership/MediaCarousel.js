'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

/*
 * ref the partnership pages' `.mySwiperWorld` image swiper: spaceBetween 10, loop, autoplay 2500,
 * pagination + prev/next nav, slidesPerView 1 / 2 (>=640) / 3 (>=1024). Reproduced as a scroll-snap
 * carousel (slides are flex-none at w-full / ~1/2 / ~1/3 via the project's n640/n1024 screens) with
 * JS autoplay (advance every 2500ms, wrap at the end), prev/next buttons and clickable bullets.
 * The controls are Swiper's defaults as production renders them (corrected 2026-10-31 — the first
 * version drew 40px white circles hidden below 640): `pagination={false}` where a carousel has none
 * (collaborative-projects' S1), `arrowColor` for a band that recolours them.
 */
export default function MediaCarousel({
  children,
  slides,
  accent = '#342b7c', // kept for callers; production's bullets ignore the band colour
  pagination = true,
  arrowColor = '#000',
  slideClassName = 'w-full flex-none snap-start n640:w-[calc((100%-10px)/2)] n1024:w-[calc((100%-20px)/3)]',
}) {
  const items = slides || children;
  const trackRef = useRef(null);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = trackRef.current;
    if (t) setCount(t.children.length);
  }, [items]);

  const go = useCallback((dir) => {
    const t = trackRef.current;
    if (!t || !t.children.length) return;
    const slide = t.children[0];
    const step = slide.getBoundingClientRect().width + 10; // spaceBetween 10
    const atEnd = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
    if (dir > 0 && atEnd) t.scrollTo({ left: 0, behavior: 'smooth' });
    else t.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const id = setInterval(() => go(1), 2500);
    return () => clearInterval(id);
  }, [go]);

  const onScroll = () => {
    const t = trackRef.current;
    if (!t || !t.children.length) return;
    const step = t.children[0].getBoundingClientRect().width + 10;
    setActive(Math.round(t.scrollLeft / step));
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-[10px] overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {(items || []).map((child, i) => (
          <div key={i} className={slideClassName}>
            {child}
          </div>
        ))}
      </div>
      {count > 1 && (
        <>
          {/* ref `.swiper-pagination` — Swiper's default bullets: an absolute 24px row 8px above the
              slider's bottom edge, 8px dots 4px apart, black at .2 / active #007aff (measured on
              collaborative-projects at 1440 and 390, including on the navy bands) */}
          {pagination && (
            <div className="pointer-events-none absolute inset-x-0 bottom-[8px] z-[1] h-6 text-center leading-6">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    const t = trackRef.current;
                    const step = t.children[0].getBoundingClientRect().width + 10;
                    t.scrollTo({ left: i * step, behavior: 'smooth' });
                  }}
                  className={`pointer-events-auto mx-1 inline-block h-2 w-2 rounded-full align-middle ${i === active ? 'bg-[#007aff]' : 'bg-black opacity-20'}`}
                />
              ))}
            </div>
          )}
          {/* ref `.swiper-button-prev/-next` — Swiper's 27x44 chevrons, black (`text-black` /
              the band's own colour), 10px inside the slider, vertically centred, at every width */}
          {['prev', 'next'].map((side) => (
            <button
              key={side}
              type="button"
              aria-label={side === 'prev' ? 'Previous' : 'Next'}
              onClick={() => go(side === 'prev' ? -1 : 1)}
              className={`absolute top-1/2 z-10 -mt-[22px] flex h-[44px] w-[27px] items-center justify-center ${side === 'prev' ? 'left-[10px]' : 'right-[10px]'}`}
              style={{ color: arrowColor }}
            >
              <svg viewBox="0 0 27 44" aria-hidden="true" className={`h-[44px] w-[27px] ${side === 'next' ? 'rotate-180' : ''}`} fill="currentColor">
                <path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" />
              </svg>
            </button>
          ))}
        </>
      )}
    </div>
  );
}
