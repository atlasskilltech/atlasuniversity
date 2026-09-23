'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';

/**
 * ISDI hero — port of reference/schools/isdi/index.php:35-460.
 *
 * Four full-viewport slides, each a background video under a bottom scrim with
 * a heading and three buttons, driven by the page's own `.progress-swiper-code`
 * embed:
 *
 *   new Swiper('.swiper-30', { spaceBetween: 0, centeredSlides: true,
 *     autoplay: { delay: 30000, disableOnInteraction: false },
 *     on: { init: build one .progress-circle per slide (click -> slideTo),
 *           autoplayTimeLeft: active ring's dashoffset = 62.8 * progress } })
 *
 * So each slide holds for 30s while its ring fills clockwise; after the last
 * slide Swiper's autoplay rewinds to the first. Swiper's defaults are kept:
 * 300ms slide transition, touch/mouse swipe.
 *
 * Measured (1440 / 991 / 767 / 479 / 390):
 *   stage        100vh (`.inner-header-wrapper.under-grad`)
 *   scrim        bottom 50%, #0000 -> #000000e6; 85% tall from 991 down;
 *                padding 0 62 56 -> 0 20 95 at <=767 (40% at exactly 768, the
 *                inline `max-width: 768px` rule beating the sheet's 56px)
 *   heading      56px/1.2 -> 44px at 991 -> 28px/600/1.5 at 767
 *   buttons      row, gap 16, pt 30 -> gap 8 at 991 -> column, pt 24 at 767 ->
 *                pt 14 at 479
 *   pagination   56px rings in a column 80px from the right, centred
 *                vertically; a row centred 2% above the bottom at <=768
 *
 * ── Deviations ──────────────────────────────────────────────────────────────
 * - Only the visible slide's video plays. Webflow autoplays all four background
 *   videos at once (~48MB of mp4); a slide that is off-screen shows nothing, so
 *   each video starts when its slide comes into view instead.
 * - The hidden `.upcoming-wrapper` ("What's Happening @ ISDI") is not ported:
 *   the sheet sets it `display: none` at every width and its three tabs hold
 *   the same placeholder event five times.
 */

const DELAY = 30000;
const SPEED = 300;
const RING = 62.8;

export default function Hero({ data }) {
  const { slides, buttons } = data;
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

  const stageRef = useRef(null);
  const videoRefs = useRef([]);
  const ringRefs = useRef([]);
  const startRef = useRef(0);
  const pointerRef = useRef(null);

  const goTo = useCallback((next) => setIndex(((next % count) + count) % count), [count]);

  /* autoplay + progress ring, restarted on every slide change */
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
    document.addEventListener('visibilitychange', onVisibility);

    const tick = (now) => {
      if (pausedAt === null && !pointerRef.current) {
        const progress = Math.max(0, 1 - (now - startRef.current) / DELAY);
        ringRefs.current.forEach((ring, i) => {
          if (ring) ring.style.strokeDashoffset = String(i === index ? RING * progress : RING);
        });
        if (progress === 0) {
          setIndex((i) => (i + 1) % count);
          return;
        }
      } else if (pointerRef.current) {
        startRef.current = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [index, count]);

  /* play the visible slide's video, pause the rest */
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        const p = video.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index]);

  /* swipe — follow the pointer, then settle on the nearest slide */
  const onPointerDown = (e) => {
    if (e.button !== 0 || e.target.closest('a,button')) return;
    pointerRef.current = { id: e.pointerId, x: e.clientX, moved: false };
    setDragging(true);
  };
  const onPointerMove = (e) => {
    const p = pointerRef.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.x;
    if (!p.moved && Math.abs(dx) > 5) {
      p.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (p.moved) setDrag(dx);
  };
  const onPointerEnd = (e) => {
    const p = pointerRef.current;
    if (!p || p.id !== e.pointerId) return;
    pointerRef.current = null;
    setDragging(false);
    const width = stageRef.current?.offsetWidth || 1;
    if (Math.abs(drag) > Math.min(50, width * 0.2)) {
      const next = index + (drag < 0 ? 1 : -1);
      if (next >= 0 && next < count) setIndex(next);
    }
    setDrag(0);
  };

  return (
    /* ref .section.nopad */
    <div data-block="hero" className="block overflow-hidden">
      {/* ref .swiper.swiperprogress.swiper-30 */}
      <div
        ref={stageRef}
        className="relative z-[1] touch-pan-y select-none overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {/* ref .swiper-wrapper */}
        <div
          className="relative z-[1] flex"
          style={{
            transform: `translate3d(calc(${-index * 100}% + ${drag}px), 0, 0)`,
            transitionProperty: 'transform',
            transitionDuration: dragging ? '0ms' : `${SPEED}ms`,
          }}
        >
          {slides.map((slide, i) => {
            const Heading = slide.headingTag || 'div';
            return (
              /* ref .swiper-slide */
              <div
                key={slide.video}
                className="relative w-full flex-none overflow-clip"
                aria-hidden={i !== index}
              >
                {/* ref .inner-header-wrapper.under-grad */}
                <div className="relative h-screen w-full">
                  {/* ref .inner-header-cover.padd */}
                  <div
                    className={
                      'absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end px-[62px] pb-14 ' +
                      'bg-[linear-gradient(#0000,#000000e6)] ' +
                      'max-lg:h-[85%] [@media(width:768px)]:pb-[40%] ' +
                      'max-md:px-5 max-md:pb-[95px]'
                    }
                  >
                    {/* ref .hero-text */}
                    <div className="max-w-[840px] max-sm:max-w-[704px]">
                      {/* ref .h1-tag */}
                      <Heading
                        className={
                          'm-0 text-[56px] font-normal leading-[1.2] text-white ' +
                          'max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]'
                        }
                      >
                        {withBreaks(slide.heading)}
                      </Heading>

                      {/* ref .buttons-wrapper */}
                      <div
                        className={
                          'flex items-center gap-4 pt-[30px] max-lg:gap-2 ' +
                          'max-md:flex-col max-md:items-start max-md:justify-start max-md:pt-6 max-sm:pt-[14px]'
                        }
                      >
                        {buttons.map((button) => (
                          <PrimaryButton
                            key={button.label}
                            href={button.href}
                            variant={button.variant}
                            tabIndex={i === index ? undefined : -1}
                          >
                            {button.label}
                          </PrimaryButton>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ref .swiper-bg-video — the poster is the video's background, as Webflow paints it */}
                  <div className="relative h-full w-full overflow-hidden text-white">
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      className="absolute inset-0 h-full w-full bg-cover bg-center object-cover"
                      style={{ backgroundImage: `url("${slide.poster}")` }}
                      muted
                      loop
                      playsInline
                      preload={i === 0 ? 'auto' : 'none'}
                      aria-hidden="true"
                    >
                      <source src={slide.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ref .custom-pagination — built by the Swiper `init` hook upstream */}
        <div
          className={
            'absolute right-20 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-5 ' +
            '[@media(max-width:768px)]:bottom-[2%] [@media(max-width:768px)]:left-1/2 [@media(max-width:768px)]:right-auto [@media(max-width:768px)]:top-auto ' +
            '[@media(max-width:768px)]:-translate-x-1/2 [@media(max-width:768px)]:translate-y-0 [@media(max-width:768px)]:flex-row'
          }
        >
          {slides.map((slide, i) => (
            /* ref .progress-circle — 56px ring with an 8px dot */
            <button
              key={slide.video}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={
                'relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 ' +
                "before:absolute before:h-2 before:w-2 before:rounded-full before:bg-white before:content-['']"
              }
            >
              <svg viewBox="0 0 24 24" className="absolute h-full w-full -rotate-90" aria-hidden="true">
                {/* ref .bg-ring — only drawn on the active circle */}
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  strokeWidth="1"
                  strokeDasharray={RING}
                  className={cx(i === index ? 'stroke-[#FFFFFF66]' : 'stroke-none')}
                />
                {/* ref .fg-ring — its dashoffset is written every frame */}
                <circle
                  ref={(el) => {
                    ringRefs.current[i] = el;
                  }}
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeDasharray={RING}
                  strokeDashoffset={RING}
                  className="transition-[stroke-dashoffset] duration-100 ease-linear"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
