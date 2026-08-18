'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { campusContent } from '@/lib/campusContent';
import { cx } from '@/lib/cx';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Studios, Labs, and Classrooms" — port of `campus-atlas.php:394-469`
 * (`section#campus-spaces.section > .container > (.h2-tag.mrg16,
 *   .sub-heading.mrgbtm, .swiper.zoom-slider-lg.mrg-lft > 6x .swiper-slide)`).
 *
 * The page's one "zoom" carousel: the current card is full size, its two
 * neighbours are scaled to 0.65 and everything else sits at 0.6 — so the strip
 * reads as one large card with a peek either side. Only the NEXT card is also
 * pulled 100px closer: the stylesheet asks for the same on the previous card,
 * but Swiper writes `margin-right: 24px` inline for its `spaceBetween`, and an
 * inline style beats a stylesheet rule, so upstream's `-prev` pull never
 * applies. Measured on the live page, not assumed.
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
 * plus `.swiper.zoom-slider-lg { overflow: visible }`, `.mrg-lft
 * { margin-left: 20% }` (0 below 768px) and, at <=568px, visible bullets.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .slider-card-e-ugdx      800 x 478, radius 32/0      width 100%
 *   .slider-card-e-atlas-2   bottom half, #00263700 14%  padding 0 16 24
 *                            -> #040404e6, padding
 *                            0 40 50 0
 *   .slide-cd-atlas-2        24px/1, 600, #072058 on     same
 *                            #5cbdca, padding 8 15
 *
 * ── Two reference behaviours not reproduced ───────────────────────────────
 *  - The `.swiper` box is a full viewport tall while its cards are 478px, so
 *    the reference leaves ~420px of blank space under this strip. That is the
 *    same stray `height: 100vh` already skipped elsewhere in this rebuild; the
 *    track here is as tall as its cards.
 *  - Swiper measures its slide grid before the `-100px` neighbour margins are
 *    applied, so its translate is ~48px out and the current card sits that far
 *    left of the 20% inset. The card is placed at the inset it is authored at.
 *
 * ── One reference bug fixed ───────────────────────────────────────────────
 * `.slider-card-e-ugdx` becomes `width: 100%` at <=767px, but the slide that
 * holds it only becomes `width: 100%` at <=568px — and `.swiper-slide` is
 * `width: auto`. Between 569 and 767px the slide therefore measures 0 and the
 * whole strip disappears (verified: the card's box is 0x478 at 700px wide).
 * Here the slide goes full width at the same 767px the card does, so the band
 * shows one full-width card, which is plainly what the CSS intends.
 */

const GAP = 24;
const AUTOPLAY_MS = 2000;

export default function StudiosLabs() {
  const { studios } = campusContent;
  const slides = studios.slides;

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
    /* ref section#campus-spaces.section — the id is kept only on the first of
       the four sections the reference gives it to */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{studios.heading}</h2>
        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{studios.subheading}</div>

        {/* ref .swiper.zoom-slider-lg.mrg-lft — overflow visible; the section's
            own `overflow: hidden` is what clips the bleed */}
        <div className="relative z-[1] ml-[20%] max-md:ml-0">
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
                  key={slide.title}
                  className={cx(
                    'w-[800px] flex-none transition-all duration-500 ease-[ease] max-md:w-full',
                    /* the scale ladder — exactly one of the three ever applies,
                       so no utility has to out-specify another */
                    isActive ? 'md:scale-100' : isPrev || isNext ? 'md:scale-[0.65]' : 'md:scale-[0.6]',
                    /* only the NEXT card's pull survives upstream — Swiper
                       writes `margin-right: 24px` inline for `spaceBetween`,
                       which beats the stylesheet's `-100px` on `-prev` */
                    isNext && 'md:-ml-[100px]',
                  )}
                >
                  {/* ref .slider-card-e-ugdx */}
                  <div className="relative block h-[478px] w-full items-end overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
                    {/* ref img.slide-card-e-image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image.src}
                      srcSet={slide.image.srcSet}
                      sizes="(max-width: 790px) 100vw, 790px"
                      alt={slide.image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />

                    {/* ref .slider-card-e-atlas-2 */}
                    <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 flex-col items-start justify-end bg-[linear-gradient(#00263700_14%,#040404e6)] pb-[50px] pr-10 max-md:px-4 max-md:pb-6">
                      {/* ref .slide-cd-e-flex */}
                      <div className="flex w-full items-center justify-between">
                        {/* ref .slide-cd-e-lt — a block, so as a flex item it
                            shrinks to its text */}
                        <div>
                          {/* ref .slide-cd-atlas-2 */}
                          <div className="bg-atlas-cyan px-[15px] py-2 text-[24px] font-semibold leading-none text-[#072058]">
                            {slide.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ref `.zoom-slider-lg .swiper-pagination-bullets` — hidden above
            568px, `display: block; text-align: center; margin-top: 20px` below */}
        <div className="mt-5 hidden justify-center gap-2 max-mcm:flex">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
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
      </div>
    </section>
  );
}
