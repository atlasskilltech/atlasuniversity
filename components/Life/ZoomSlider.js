'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import { useMediaQuery } from '@/lib/useMediaQuery';

/**
 * `.swiper.zoom-slider` — the smaller of the two zoom carousels: a full-bleed
 * strip of portrait cards, centred on the current one, which alone is at full
 * size while its neighbours sit at 0.88 and the rest at 0.8.
 *
 * Two instances, both on /life-at-atlas:
 *   "Vibes that go viral"      `life-at-atlas.php:237-327`  (10 cards)
 *   "Service learning and SSR" `life-at-atlas.php:800-877`  (11 cards)
 *
 * ── Reference definition ──────────────────────────────────────────────────
 * `footer.php:414-438`:
 *
 *     new Swiper(".zoom-slider", {
 *       slidesPerView: "auto", loop: true, mousewheel: {forceToAxis: true},
 *       autoplay: {delay: 2000, disableOnInteraction: false},
 *       initialSlide: 3, centeredSlides: true,
 *       breakpoints: {0: {spaceBetween: 16}, 768: {spaceBetween: 0}},
 *     });
 *
 * over `header.php:241-264`:
 *
 *     @media (min-width: 568px) {
 *       .zoom-slider .swiper-slide            { transition: ease all .5s;
 *                                               transform: scale(.8) }
 *       .zoom-slider .swiper-slide-prev,
 *       .zoom-slider .swiper-slide-next       { transform: scale(.88) }
 *       .zoom-slider .swiper-slide-prev       { margin-right: 20px }
 *       .zoom-slider .swiper-slide-next       { margin-left: 20px }
 *       .zoom-slider .swiper-slide-active     { transform: scale(1) }
 *     }
 *
 * Below 568px nothing is scaled and every card shows at full size. Both
 * `.zoom-slider` instances sit outside `.container`, so the strip spans the
 * viewport and the section's own `overflow: hidden` clips it.
 *
 * Above 767px `spaceBetween` is 0, so Swiper writes no inline margin and BOTH
 * neighbour pulls apply; at and below 767px it writes `margin-right: 16px` on
 * every slide, which beats the stylesheet's 20px on `-prev` and leaves only the
 * `-next` pull. Measured on the live page, not assumed.
 *
 * The one reference behaviour not reproduced is the wrapper's fixed
 * `height: 480px` on a 480px card: harmless here, but its `height: auto` twin
 * below 768px is what the track actually needs, so the track is content-height
 * at every width.
 */

const AUTOPLAY_MS = 2000;
const INITIAL_SLIDE = 3;

export default function ZoomSlider({ children, label }) {
  const slides = Array.isArray(children) ? children : [children];
  const trackRef = useRef(null);
  const [active, setActive] = useState(Math.min(INITIAL_SLIDE, slides.length - 1));
  const [offset, setOffset] = useState(0);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  /* `centeredSlides: true` — put the middle of the current slide in the middle
     of the strip. Read off the laid-out track so the ±20px neighbour pulls and
     the breakpoint's spaceBetween are already accounted for. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const el = track?.children[active];
    if (!track || !el) return;
    setOffset(track.parentElement.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2));
  }, [active]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [measure]);

  /* ref autoplay {delay: 2000} + loop: true */
  useEffect(() => {
    if (reduceMotion || slides.length < 2) return undefined;
    const id = setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduceMotion, slides.length]);

  const last = slides.length - 1;

  return (
    /* ref .swiper.zoom-slider — full-bleed, overflow visible; the section clips */
    <div className="relative" aria-label={label} role="group">
      <div
        ref={trackRef}
        className="flex items-start transition-transform duration-500 ease-[ease]"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {slides.map((slide, i) => {
          const isActive = i === active;
          const isPrev = i === (active === 0 ? last : active - 1);
          const isNext = i === (active === last ? 0 : active + 1);

          return (
            /* ref .swiper-slide — `spaceBetween` 0 above 767px, 16 below */
            <div
              key={slide.key ?? i}
              className={cx(
                'flex-none transition-all duration-500 ease-[ease] max-md:mr-4',
                /* the scale ladder — exactly one of the three ever applies */
                isActive ? 'mcm:scale-100' : isPrev || isNext ? 'mcm:scale-[0.88]' : 'mcm:scale-[0.8]',
                /* only the next card is pulled in below 768px: Swiper's inline
                   16px margin-right beats the stylesheet's 20px on -prev */
                isNext && 'mcm:ml-5',
                isPrev && 'md:mr-5',
              )}
            >
              {slide}
            </div>
          );
        })}
      </div>
    </div>
  );
}
