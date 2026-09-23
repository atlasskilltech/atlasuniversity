'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * `.swiper.swiperprogress` with its `.custom-pagination` rings — the hero carousel
 * every ISDI programmes page ships in its own `.progress-swiper-code` embed:
 *
 *   new Swiper('.swiperprogress', { spaceBetween: 0, centeredSlides: true,
 *     autoplay: { delay: 10000, disableOnInteraction: false },
 *     on: { init: build one .progress-circle per slide (click -> slideTo),
 *           autoplayTimeLeft: active ring's dashoffset = 62.8 * progress } })
 *
 * Each slide holds 10s while its ring fills; after the last it rewinds to the
 * first. Swiper's defaults are kept: 300ms transition, touch/mouse swipe. The
 * embed is byte-identical on /programs/undergraduate and on the B.Des pages, so
 * only the slide markup differs — the caller supplies it.
 *
 * Measured (both pages, 1440 -> 390):
 *   stage      100vh, clipped
 *   rings      68px circles, 20px apart, in a column 80px from the right,
 *              centred; a centred row 2% above the bottom at <=768. The 8px
 *              white dot is `::before`; the track is `#FFFFFF66` (active ring
 *              only) and the 2px white arc runs `stroke-dashoffset: 62.8 -> 0`.
 */

const SPEED = 300;
const RING = 62.8;

export default function RingSwiper({ slides, delay = 10000, label = 'Hero' }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

  const stageRef = useRef(null);
  const ringRefs = useRef([]);
  const startRef = useRef(0);
  const pointerRef = useRef(null);

  const goTo = useCallback((next) => setIndex(((next % count) + count) % count), [count]);

  /* autoplay + the active ring's progress, restarted on every slide change */
  useEffect(() => {
    startRef.current = performance.now();
    let pausedAt = null;
    let raf = 0;

    const onVisibility = () => {
      if (document.hidden) pausedAt = performance.now();
      else if (pausedAt !== null) {
        startRef.current += performance.now() - pausedAt;
        pausedAt = null;
      }
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden || pausedAt !== null) return;
      const progress = Math.min(1, (now - startRef.current) / delay);
      const ring = ringRefs.current[index];
      if (ring) ring.style.strokeDashoffset = String(RING * (1 - progress));
      if (progress >= 1) {
        startRef.current = now;
        setIndex((i) => (i + 1) % count);
      }
    };

    raf = requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [index, count, delay]);

  /* pointer drag — Swiper's own touch/mouse swipe */
  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerRef.current = { id: event.pointerId, x: event.clientX };
    setDragging(true);
  };

  const onPointerMove = (event) => {
    const start = pointerRef.current;
    if (!start || event.pointerId !== start.id) return;
    setDrag(event.clientX - start.x);
  };

  const onPointerEnd = (event) => {
    const start = pointerRef.current;
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const width = stageRef.current?.clientWidth ?? 1;
    pointerRef.current = null;
    setDragging(false);
    setDrag(0);
    if (Math.abs(dx) > Math.min(80, width * 0.1)) goTo(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      ref={stageRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      className="relative h-screen w-full touch-pan-y overflow-hidden"
    >
      {/* ref .swiper-wrapper */}
      <div
        className={cx('flex h-full w-full', !dragging && 'transition-transform ease-[ease]')}
        style={{
          transform: `translate3d(calc(${-index * 100}% + ${drag}px), 0, 0)`,
          transitionDuration: dragging ? '0ms' : `${SPEED}ms`,
        }}
      >
        {slides.map((slide, i) => (
          /* ref .swiper-slide */
          <div key={i} className="relative h-full w-full flex-none overflow-clip">
            {slide}
          </div>
        ))}
      </div>

      {/* ref .custom-pagination */}
      <div className="absolute right-20 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-5 [@media(max-width:768px)]:bottom-[2%] [@media(max-width:768px)]:left-1/2 [@media(max-width:768px)]:right-auto [@media(max-width:768px)]:top-auto [@media(max-width:768px)]:-translate-x-1/2 [@media(max-width:768px)]:translate-y-0 [@media(max-width:768px)]:flex-row">
        {slides.map((slide, i) => (
          /* ref .progress-circle */
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${label}: show slide ${i + 1}`}
            aria-current={i === index}
            className="relative flex h-[68px] w-[68px] cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 before:absolute before:h-2 before:w-2 before:rounded-full before:bg-white before:content-['']"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute h-full w-full -rotate-90">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="1"
                className={i === index ? 'stroke-[#FFFFFF66]' : 'stroke-none'}
              />
              <circle
                ref={(el) => {
                  ringRefs.current[i] = el;
                }}
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="2"
                className="stroke-white transition-[stroke-dashoffset] duration-100 ease-linear"
                style={{ strokeDasharray: RING, strokeDashoffset: i === index ? 0 : RING }}
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
