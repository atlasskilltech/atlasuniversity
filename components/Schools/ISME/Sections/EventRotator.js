'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2 } from '@/components/Home/SectionHead';

/**
 * "Signature Experiences. High-Impact Outcomes." — the flagship events page's opener:
 * `section.section.extraspace-1 > .container > (.page-name-title, h2.h2-tag,
 * .event-swiper-container > (#custom-swiper > N x .event-swiper-cards, .prev, .next, #dotsContainer))`.
 *
 * Not a Swiper: the page's own footer script (`#custom-swiper`) places every card absolutely and
 * moves it between five states by its distance from the current card, wrapping around:
 *   -1        translateX(-600px) translateZ(-200px) rotateY(-25deg) scale(.85), opacity 0
 *    0        identity, opacity 1, the only card that takes pointer events
 *    1        translateX(350px)  translateZ(-200px) rotateY(-50deg), opacity 1
 *    2        translateX(550px)  translateZ(-200px) rotateY(-50deg), opacity 1
 *   other     translateZ(-400px) scale(.7), opacity 0
 * with z-index 10 - |distance|, over a 0.8s transition (and an 800ms lock between moves). Arrows,
 * dots, a 100px swipe and the ArrowLeft / ArrowRight keys move it; the autoplay is commented out
 * upstream, so there is none here.
 *
 * Rules, from the page's sheet and its own <style>:
 *   section.extraspace-1    pt250 (140 at <=767), pb60 (40)
 *   .page-name-title        24px/1 500 black, pb12
 *   .event-swiper-container perspective 2000, 100% x 478, relative
 *   .event-swiper-cards     absolute 800 x 483 (100% x auto at <=767), white, clipped,
 *                           backdrop blur 10, transform-origin centre
 *     .image-container      100% x 100%; 2:3 at 450 tall at <=767; the 55% scrim (90% at <=767)
 *     .swiper-content       absolute, 45px from the bottom, mx40, z20
 *       .swiper-title       32px/32px 600 (24px/1.4 at <=767); .swiper-subtitle mt9 300
 *       .swiper-event-detail  flex, gap 8, mt13; each 13px with its icon, gap 6
 *       .ev-btn-wrap        mt18 — the mint `.button-tertiary`: h44 px24 r24, 14px/1.2, inverted arrow
 *   .prev / .next           absolute, vertically centred, 24px outside the container's edges:
 *                           48px mint circles (32 at <=767)
 *   #dotsContainer          absolute, 40px below, centred, gap 6: 12px #d9d9d9 dots, mint when current
 */
const STATES = {
  '-1': { rotate: -25, x: -600, z: -200, opacity: 0, scale: 0.85 },
  0: { rotate: 0, x: 0, z: 0, opacity: 1, scale: 1 },
  1: { rotate: -50, x: 350, z: -200, opacity: 1, scale: 1 },
  2: { rotate: -50, x: 550, z: -200, opacity: 1, scale: 1 },
};
const OTHER = { rotate: 0, x: 0, z: -400, opacity: 0, scale: 0.7 };
const LOCK_MS = 800;
const SWIPE = 100;

export default function EventRotator({ data, block = 'rotator' }) {
  const n = data.cards.length;
  const [current, setCurrent] = useState(0);
  const lock = useRef(false);
  const startX = useRef(null);

  const goTo = useCallback(
    (i) => {
      if (lock.current) return;
      lock.current = true;
      setCurrent(((i % n) + n) % n);
      setTimeout(() => {
        lock.current = false;
      }, LOCK_MS);
    },
    [n]
  );

  /* ref `document.addEventListener('keydown', …)` — page-wide, as authored */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  const end = (x) => {
    if (startX.current == null) return;
    const d = x - startX.current;
    if (Math.abs(d) > SWIPE) goTo(d > 0 ? current - 1 : current + 1);
    startX.current = null;
  };

  return (
    /* ref section.section.extraspace-1 */
    <section data-block={block} className="block overflow-hidden pb-[60px] pt-[250px] max-md:pb-10 max-md:pt-[140px]">
      <div className={CONTAINER}>
        <div className="pb-3 text-[24px] font-medium leading-none text-black">{data.pageName}</div>
        <h2 className={cx(H2, 'mb-14 max-md:mb-8')}>{withBreaks(data.heading)}</h2>

        {/* ref .event-swiper-container.mrgtp0 */}
        <div className="relative h-[478px] w-full [perspective:2000px]">
          {/* ref #custom-swiper.custom-swiper-slides */}
          <div
            className="absolute h-full w-full [transform-style:preserve-3d]"
            onTouchStart={(e) => {
              startX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => end(e.changedTouches[0].clientX)}
            onMouseDown={(e) => {
              startX.current = e.clientX;
            }}
            onMouseUp={(e) => end(e.clientX)}
            onMouseLeave={(e) => end(e.clientX)}
          >
            {data.cards.map((card, i) => {
              let pos = i - current;
              if (pos > Math.floor(n / 2)) pos -= n;
              if (pos < -Math.floor(n / 2)) pos += n;
              const s = STATES[pos] ?? OTHER;
              return (
                /* ref .event-swiper-cards */
                <div
                  key={`${i}-${card.title}`}
                  aria-hidden={pos !== 0}
                  className="absolute h-[483px] w-[800px] origin-center overflow-hidden text-white backdrop-blur-[10px] transition-all duration-[800ms] [backface-visibility:hidden] max-md:h-auto max-md:w-full"
                  style={{
                    transform: `translateX(${s.x}px) translateZ(${s.z}px) rotateY(${s.rotate}deg) scale(${s.scale})`,
                    opacity: s.opacity,
                    zIndex: 10 - Math.abs(pos),
                    pointerEvents: pos === 0 ? 'auto' : 'none',
                  }}
                >
                  {/* ref .swiper-content */}
                  <div className="absolute bottom-[45px] left-0 z-20 mx-10">
                    <div className="text-[32px] font-semibold leading-8 text-white max-md:text-[24px] max-md:leading-[1.4]">{withBreaks(card.title)}</div>
                    {card.subtitle && <div className="mt-[9px] font-light">{withBreaks(card.subtitle)}</div>}
                    {card.details?.length > 0 && (
                      <div className="mx-auto mt-[13px] flex gap-2">
                        {card.details.map((d, j) => (
                          <div key={j} className="flex items-center justify-center gap-1.5 text-[13px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {d.icon && <img src={d.icon} alt="" className="inline-block max-w-full align-middle" />}
                            <div>{d.text}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {card.button && (
                      /* ref .ev-btn-wrap > a.button-tertiary (mint) — authored `href="#"` */
                      <div className="mt-[18px] flex">
                        <a href={card.button.href || '#'} className="flex h-11 flex-row items-center justify-center gap-[5px] rounded-3xl bg-atlas-mint px-6 text-left text-[14px] leading-[1.5] text-black no-underline">
                          <div className="leading-[1.2]">{card.button.label}</div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {card.button.icon && <img src={card.button.icon} alt="" className="inline-block max-w-full align-middle invert" />}
                        </a>
                      </div>
                    )}
                  </div>
                  {/* ref .image-container */}
                  <div className="relative h-full w-full max-md:block max-md:h-[450px] max-md:[aspect-ratio:2/3]">
                    <div aria-hidden className="absolute inset-x-0 bottom-0 z-0 h-[55%] bg-[linear-gradient(rgba(0,38,55,0),rgba(0,38,55,0)_6%,rgba(0,0,0,0.9)_86%)] max-md:h-[90%]" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image.src}
                      srcSet={card.image.srcSet}
                      sizes={card.image.sizes}
                      alt={card.image.alt}
                      loading="lazy"
                      decoding="async"
                      className="static block h-full w-full max-w-full rounded-none object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ref .prev / .next > a.circular-button-prev (mint) */}
          {[
            ['prev', 'left-[-24px]', data.prevIcon, -1, 'Previous event'],
            ['next', 'right-[-24px]', data.nextIcon, 1, 'Next event'],
          ].map(([k, side, icon, d, label]) => (
            <div key={k} className={cx('absolute top-1/2 z-[30] -translate-y-1/2', side)}>
              <button
                type="button"
                aria-label={label}
                onClick={() => goTo(current + d)}
                className="flex h-12 w-12 items-center justify-center rounded-3xl bg-atlas-mint max-md:h-8 max-md:w-8"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon} alt="" className="inline-block max-w-full align-middle" />
              </button>
            </div>
          ))}

          {/* ref #dotsContainer */}
          <div className="absolute inset-x-0 bottom-[-40px] z-10 flex w-full items-center justify-center gap-1.5">
            {data.cards.map((c, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to event ${i + 1}`}
                aria-current={i === current}
                onClick={() => goTo(i)}
                className={cx('h-3 w-3 rounded-md', i === current ? 'bg-atlas-mint' : 'bg-[#d9d9d9]')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
