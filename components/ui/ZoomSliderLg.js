'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import { useMediaQuery } from '@/lib/useMediaQuery';

/**
 * `.swiper.zoom-slider-lg` — the "zoom" carousel: the current card is full
 * size, its two neighbours are scaled to 0.65, everything else sits at 0.6, and
 * the next card is pulled 100px closer.
 *
 * Three instances across the rebuild, all on the same 800px card:
 *   /campus-atlas  "Studios, Labs, and Classrooms"   `campus-atlas.php:394-469`
 *   /life-at-atlas "Intercollegiate events"          `life-at-atlas.php:328-385`
 *   /life-at-atlas "Your Growth is Our Mission"      `life-at-atlas.php:600-671`
 *
 * ── Reference definition ──────────────────────────────────────────────────
 * `footer.php:387-412` — `slidesPerView: 'auto', spaceBetween: 24, loop: true,
 * autoplay {delay: 2000, disableOnInteraction: false}, mousewheel
 * {forceToAxis: true}, pagination {clickable: true}` — over
 * `header.php:266-289`:
 *
 *     @media (min-width: 767px) {
 *       .zoom-slider-lg .swiper-slide            { transform: scale(.6);
 *                                                  transition: ease all .5s }
 *       .zoom-slider-lg .swiper-slide-prev,
 *       .zoom-slider-lg .swiper-slide-next       { transform: scale(.65) }
 *       .zoom-slider-lg .swiper-slide-prev       { margin-right: -100px }
 *       .zoom-slider-lg .swiper-slide-next       { margin-left: -100px }
 *       .zoom-slider-lg .swiper-slide-active     { transform: scale(1) }
 *     }
 *
 * plus `overflow: visible` on the slider — the section's own
 * `overflow: hidden` is what clips the bleed — and, at <=568px, full-width
 * slides and visible bullets.
 *
 * Only the NEXT card's pull survives upstream: Swiper writes
 * `margin-right: 24px` inline for its `spaceBetween`, and an inline style beats
 * a stylesheet rule, so the `-prev` rule never applies. Measured on the live
 * page, not assumed.
 *
 * ── Two reference behaviours not reproduced ───────────────────────────────
 *  - The `.swiper` box is a full viewport tall while its cards are ~478px, so
 *    the reference leaves hundreds of pixels of blank space under every one of
 *    these strips. Same stray `height: 100vh` skipped elsewhere in this rebuild.
 *  - Swiper measures its slide grid before the `-100px` neighbour margin is
 *    applied, so its translate is a few tens of pixels out and the current card
 *    drifts left of where it is authored. The card is placed at its authored
 *    inset here; the gaps either side match the reference exactly.
 *
 * ── One reference bug fixed ───────────────────────────────────────────────
 * The card becomes `width: 100%` at <=767px but the slide holding it only does
 * at <=568px, and `.swiper-slide` is `width: auto` — so between 569 and 767px
 * the pair resolves against nothing and the strip either collapses or overruns
 * its container. Here the slide goes full width at the same 767px the card
 * does, which is plainly what the CSS intends.
 */

const GAP = 24;
const AUTOPLAY_MS = 2000;

export default function ZoomSliderLg({ children, className, label }) {
  const slides = Array.isArray(children) ? children : [children];
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  /* one slide plus the 24px `spaceBetween`, read off the laid-out track so the
     same code covers the 800px desktop card and the full-width mobile one */
  const measure = useCallback(() => {
    const first = trackRef.current?.children[0];
    if (first) setStep(first.offsetWidth + GAP);
  }, []);

  useEffect(() => {
    measure();
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
    <>
      {/* ref .swiper.zoom-slider-lg — overflow visible */}
      <div className={cx('relative z-[1]', className)} aria-label={label} role="group">
        <div
          ref={trackRef}
          className="flex items-start transition-transform duration-300 ease-[ease]"
          style={{ gap: `${GAP}px`, transform: `translateX(${-active * step}px)` }}
        >
          {slides.map((slide, i) => {
            const isActive = i === active;
            const isPrev = i === (active === 0 ? last : active - 1);
            const isNext = i === (active === last ? 0 : active + 1);

            return (
              /* ref .swiper-slide */
              <div
                key={slide.key ?? i}
                className={cx(
                  'w-[800px] flex-none transition-all duration-500 ease-[ease] max-md:w-full',
                  /* the scale ladder — exactly one of the three ever applies,
                     so no utility has to out-specify another */
                  isActive ? 'md:scale-100' : isPrev || isNext ? 'md:scale-[0.65]' : 'md:scale-[0.6]',
                  isNext && 'md:-ml-[100px]',
                )}
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>

      {/* ref `.zoom-slider-lg .swiper-pagination-bullets` — hidden above 568px,
          `display: block; text-align: center; margin-top: 20px` below */}
      <div className="mt-5 hidden justify-center gap-2 max-mcm:flex">
        {slides.map((slide, i) => (
          <button
            key={slide.key ?? i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
            className={cx(
              'h-2 w-2 rounded-full transition-opacity',
              i === active ? 'bg-[#007aff]' : 'bg-black/20',
            )}
          />
        ))}
      </div>
    </>
  );
}
