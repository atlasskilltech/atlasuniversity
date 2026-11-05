'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * The "mySwiper" module carousel of reference/ugdx/ugdxsummerschool.php — Swiper 11 with
 * `spaceBetween: 30, centeredSlides: true, autoplay { delay: 2500, disableOnInteraction: false }`,
 * clickable pagination, navigation and an `autoplayTimeLeft` countdown ring. Reproduced without the
 * library, measured on production at 1440 / 767 / 390:
 *
 *   slides        one per view, each the slider's full width, 30px apart (Swiper's margin-right), equal
 *                 height (the tallest), content centred; 300ms slide (Swiper's default speed)
 *   autoplay      2.5s; no `loop`, so at the last slide it rewinds to the first, as Swiper's autoplay does
 *   arrows        27 x 44, 10px in, vertically centred; Swiper's 44px chevron glyph in #ed1a3b over the
 *                 page's orange chevron SVG (a repeating background, dropped at <=576 where the glyph
 *                 shrinks to 1.5rem/900). The arrow at an end is disabled (opacity .35), as Swiper does.
 *   pagination    40 x 4 bars (10 x 2 at <=576), 4px apart, 8px from the bottom, #ed1a3b at 20% / 100%
 *   countdown     48 x 48 ring, 16px from the bottom-right corner, "Ns" in 16px/700 Figtree
 */
const DELAY = 2500;
const SPEED = 300;

function Chevron({ prev }) {
  return (
    <svg viewBox="0 0 25 44" aria-hidden="true" className="h-[44px] w-[25px] max-lp:h-6 max-lp:w-[14px]" fill="#ed1a3b">
      <path d={prev ? 'M0 22L22 0l2.1 2.1L4.2 22l19.9 19.9L22 44 0 22z' : 'M25 22L3 44l-2.1-2.1L20.8 22 .9 2.1 3 0l22 22z'} />
    </svg>
  );
}

export default function ModuleSlider({ slides, arrows }) {
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(DELAY);
  const started = useRef(0);
  const last = slides.length - 1;

  const go = useCallback((i) => {
    setIndex(Math.max(0, Math.min(last, i)));
    started.current = performance.now();
  }, [last]);

  /* one animation frame loop drives both the countdown and the advance; `disableOnInteraction: false`,
     so a click only restarts the timer */
  useEffect(() => {
    started.current = performance.now();
    let raf;
    const tick = (now) => {
      const remaining = DELAY - (now - started.current);
      if (remaining <= 0) {
        setIndex((i) => (i >= last ? 0 : i + 1));
        started.current = now;
        setLeft(DELAY);
      } else {
        setLeft(remaining);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [last]);

  const arrow = (prev) => {
    const disabled = prev ? index === 0 : index === last;
    return (
      <button
        type="button"
        aria-label={prev ? 'Previous slide' : 'Next slide'}
        aria-disabled={disabled}
        onClick={() => !disabled && go(index + (prev ? -1 : 1))}
        className={cx(
          'absolute top-1/2 z-10 -mt-[22px] flex h-[44px] w-[27px] cursor-pointer items-center justify-center border-0 bg-transparent p-0 max-lp:bg-none',
          prev ? 'left-[10px]' : 'right-[10px]',
          disabled && 'pointer-events-none opacity-[.35]',
        )}
        style={{ backgroundImage: `url(${prev ? arrows.prev : arrows.next})` }}
      >
        <Chevron prev={prev} />
      </button>
    );
  };

  return (
    <div className="relative z-[1] w-full overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Summer school modules">
      <div
        className="flex w-full"
        style={{ transform: `translateX(calc(${-index} * (100% + 30px)))`, transition: `transform ${SPEED}ms ease` }}
      >
        {slides.map((s, i) => (
          <div
            key={s.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
            aria-hidden={i !== index}
            className="mr-[30px] flex w-full flex-none items-center justify-center bg-white text-center text-lg"
          >
            {/* ref .container-fluid > .row.d-flex.justify-content-center.align-items-center */}
            <div className="w-full px-3">
              <div className="-mx-3 flex flex-wrap items-center justify-center">
                <div className="w-full flex-none px-3 text-start n576:w-1/2">
                  <h3 className="mb-6 mt-0 font-figtree text-[2rem] font-extrabold uppercase leading-[1.2] text-[#ed1a3b] max-lp:mb-4 max-lp:text-base max-lp:leading-[1.2]">{s.title}</h3>
                  {s.paragraphs.map((p, k) => (
                    <p key={k} className="mb-[.8rem] mt-0 font-figtree text-base font-normal leading-[1.5] text-[#222] max-lp:mb-[.4rem] max-lp:text-[.9rem] max-lp:leading-[1.5]">{p}</p>
                  ))}
                </div>
                <div className="w-full flex-none px-3 pb-6 n576:w-1/2 n576:pb-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt="..." loading="lazy" className="block h-auto w-full max-w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {arrow(true)}
      {arrow(false)}
      <div className="absolute bottom-2 left-0 z-10 w-full text-center leading-none">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={cx('mx-1 inline-block h-1 w-10 cursor-pointer rounded-none border-0 bg-[#ed1a3b] p-0 align-middle max-lp:h-0.5 max-lp:w-2.5', i === index ? 'opacity-100' : 'opacity-20')}
          />
        ))}
      </div>
      <div className="absolute bottom-4 right-4 z-10 flex h-12 w-12 items-center justify-center font-figtree text-base font-bold text-[#ed1a3b]" aria-hidden="true">
        <svg viewBox="0 0 48 48" className="absolute left-0 top-0 z-10 h-full w-full -rotate-90 fill-none stroke-[#ed1a3b] [stroke-dasharray:125.6] [stroke-width:4px]" style={{ strokeDashoffset: 125.6 * (left / DELAY) }}>
          <circle cx="24" cy="24" r="20" />
        </svg>
        <span>{`${Math.ceil(left / 1000)}s`}</span>
      </div>
    </div>
  );
}
