'use client';

import { useRef, useState } from 'react';
import { cx } from '@/lib/cx';

/*
 * ref global-pathways.php:847-950 "Global Pathway Opportunities" — a Tailwind-CDN section
 * (`section.bg-gray-100 > .max-w-7xl.mx-auto.px-6`) holding a `.swiper.pathwaySwiper` of five
 * `.pathway-slide > .p-3.bg-gray-200.mb-5.h-full > .grid.grid-cols-1.lg:grid-cols-2.items-center
 * .pathway-inner > (.pathway-text, .lg:pl-5.pathway-img)`. The page's own <style> and a resize
 * script make it two different things, split at 767 (rewritten 2026-10-31 from production
 * measurements at 1440 / 900 / 390 — the first port was a static stack with invented type):
 *
 * >=768  NOT a slider: the wrapper is `display: block`, each slide full width with
 *        `margin-bottom: 20px`. The card's `.mb-5` and `.p-3` are BOOTSTRAP's (the header loads it,
 *        `!important`): 48px and 16px, not Tailwind's 20 / 12 — and the card's 48 collapses through
 *        the slide into the slide's own 20, so the pitch is 48 (the last one collapses into the
 *        `.swiper`'s overflow:hidden box). `.pathway-inner` gap 40, `.pathway-text` padding 20 0;
 *        two columns from 1024 (Play CDN `lg`), stacked below.
 * <=767  a Swiper (`slidesPerView: 'auto'`, spaceBetween 16) of 85%-wide slides, centred
 *        vertically (Webflow's `.swiper-wrapper { align-items: center }`), `padding-bottom: 10px`,
 *        with absolutely-positioned dots (active #5cbdca). The card loses its margin, the inner
 *        grid becomes a centred column with the image FIRST (12px corners) and the text 14px below.
 *
 * Two more Bootstrap collisions, both reproduced: `mb-2 lg:mb-[0.85em]` on the title resolves to
 * Bootstrap's 8px at every width, and `order-1 lg:order-2` on the alternate slides' image resolves
 * to Bootstrap's `!important` `.order-1` at every width — so on production Dual Degrees and Pathway
 * Programs show the image on the LEFT at desktop too (the authored alternation never happens).
 * Spacing is written in px because `.lp-bs` (globals.css) remaps the 0-5 utilities to Bootstrap's
 * scale at (0,2,0), which would also beat every `max-md:` reset here.
 * Type: title 2.5em (40px)/1.05 700 #2b2a29 → 1.5em (24px) + 4px top margin at <=767; copy
 * 16px/2 #2b2a29 at 60% opacity → .95em/1.6 at <=767; the first copy is `text-justify lg:text-left`.
 */
export default function Opportunities({ heading, items }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const t = trackRef.current;
    if (!t || !t.children.length) return;
    const step = t.children[0].getBoundingClientRect().width + 16;
    setActive(Math.min(items.length - 1, Math.round(t.scrollLeft / step)));
  };
  const goTo = (i) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollTo({ left: i * (t.children[0].getBoundingClientRect().width + 16), behavior: 'smooth' });
  };

  return (
    <section className="lp-bs bg-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="relative mb-[16px] mt-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a]">{heading}</h2>

        {/* ref .swiper.pathwaySwiper — a BFC at every width; pb 10 at <=767 */}
        <div className="relative overflow-hidden max-md:pb-[10px]">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="block max-md:flex max-md:snap-x max-md:snap-mandatory max-md:items-center max-md:gap-[16px] max-md:overflow-x-auto max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden"
          >
            {items.map((it, i) => {
              const imageFirst = i % 2 === 1;
              return (
                /* ref .swiper-slide.pathway-slide */
                <div key={it.title} className="mb-[20px] w-full max-md:mb-0 max-md:w-[85%] max-md:flex-none max-md:snap-start">
                  {/* ref .p-3.bg-gray-200.mb-5.h-full (Bootstrap p-3 / mb-5) */}
                  <div className="mb-[48px] h-full bg-gray-200 p-[16px] max-md:mb-0">
                    <div className="grid grid-cols-1 items-center gap-[40px] n1024:grid-cols-2 max-md:flex max-md:flex-col max-md:gap-0">
                      <div className={cx('py-[20px] max-md:order-2 max-md:mt-[14px] max-md:py-0', imageFirst && 'order-2')}>
                        <h3 className="mb-[8px] text-[40px] font-bold leading-[1.05] tracking-[0px] text-[#2b2a29] max-md:mt-[4px] max-md:text-[24px]">
                          {it.title}
                        </h3>
                        <p
                          className={cx(
                            'text-[16px] font-normal leading-[2] tracking-[0px] text-[#2b2a29] opacity-60 max-md:text-[15.2px] max-md:leading-[1.6]',
                            i === 0 && 'text-justify n1024:text-left',
                          )}
                        >
                          {it.text}
                        </p>
                      </div>
                      <div className={cx('n1024:pl-[20px] max-md:order-1 max-md:mt-0 max-md:pl-0', imageFirst && 'order-1')}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={it.image} alt={it.title} loading="lazy" className="h-auto w-full object-cover max-md:rounded-[12px]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* ref .swiper-pagination.pathway-pagination — <=767 only, Swiper's absolute bottom row */}
          <div className="absolute inset-x-0 bottom-[8px] z-10 hidden justify-center gap-[8px] max-md:flex">
            {items.map((it, i) => (
              <button
                key={it.title}
                type="button"
                aria-label={`Go to ${it.title}`}
                onClick={() => goTo(i)}
                className={cx('h-[8px] w-[8px] rounded-full', i === active ? 'bg-atlas-cyan' : 'bg-black/20')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
