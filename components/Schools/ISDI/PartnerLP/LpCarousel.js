'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cx } from '@/lib/cx';

/**
 * The Swiper carousels on the ATLAS ISDI Advantage partner-university landing pages
 * (`reference/schools/isdi/nyfa/index.php` and its five template siblings). The
 * reference loads `swiper@11` and initialises `.journey-swiper` / `.pathway-for-swiper`
 * with `slidesPerView: 1`, `loop: true`, pagination bullets and (for pathway-for)
 * prev/next arrows and a `breakpoints: { 640: {slidesPerView: 2}, 1024: {slidesPerView: 4} }`
 * ladder. This reproduces that with an index carousel: a flex track translated by index,
 * `perView` recomputed on resize at the reference's own 640 / 1024 breakpoints (which are
 * stock Tailwind defaults, NOT the project's 480 / 992), loop wrap, and the same bullet /
 * arrow chrome.
 *
 *   slides   array of nodes (each becomes one slide)
 *   perView  { base, sm, lg } slides visible below 640 / 640-1023 / >=1024
 *   gap      px gap between slides (spaceBetween: 16)
 *   arrows   render prev/next buttons (hidden below md, as the reference does)
 *   bullets  'mobile' (md:hidden) | 'always' | false
 */
export default function LpCarousel({
  slides,
  perView = { base: 1, sm: 1, lg: 1 },
  gap = 16,
  arrows = false,
  bullets = 'mobile',
  className,
}) {
  const [pv, setPv] = useState(perView.base);
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1024) setPv(perView.lg);
      else if (w >= 640) setPv(perView.sm);
      else setPv(perView.base);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [perView.base, perView.sm, perView.lg]);

  const pages = Math.max(1, slides.length - pv + 1);
  // clamp at render time (perView can shrink `pages` below the stored index)
  const active = Math.min(index, pages - 1);

  const go = useCallback(
    (dir) => {
      setIndex((i) => {
        const cur = Math.min(i, pages - 1);
        const next = cur + dir;
        if (next < 0) return pages - 1; // loop
        if (next > pages - 1) return 0;
        return next;
      });
    },
    [pages]
  );

  const slideBasis = `calc((100% - ${(pv - 1) * gap}px) / ${pv})`;

  return (
    <div className={cx('relative', className)}>
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-300 ease-out"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(-${active} * (${slideBasis} + ${gap}px)))`,
          }}
        >
          {slides.map((node, i) => (
            <div key={i} className="h-auto flex-shrink-0" style={{ width: slideBasis }}>
              {node}
            </div>
          ))}
        </div>
      </div>

      {bullets && (
        <div
          className={cx(
            'relative mt-6 flex items-center justify-center gap-[10px]',
            bullets === 'mobile' && 'md:hidden'
          )}
        >
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cx(
                'h-2 w-2 rounded-full transition-colors',
                i === active ? 'bg-[#1947b8]' : 'bg-[#cfd6e0]'
              )}
            />
          ))}
        </div>
      )}

      {arrows && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="absolute top-1/2 -left-4 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-isdi-blue text-white shadow-md transition hover:bg-isdi-pink md:flex n1024:-left-6"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="absolute top-1/2 -right-4 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-isdi-blue text-white shadow-md transition hover:bg-isdi-pink md:flex n1024:-right-6"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
