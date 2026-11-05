'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import TestimonialTrack from './TestimonialTrack';

/* Shared head of master-progression's Tailwind-CDN sections: `section.py-20 > .max-w-7xl.mx-auto.px-6 >
   h2 (44px at every width, mb 16) + optional lead (24px/1.4 300, pr 50, mb 42)`. */
function Head({ heading, lead }) {
  return (
    <>
      <h2 className="relative mb-[16px] mt-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a]">{heading}</h2>
      {lead && <p className="mb-[42px] pb-0 pr-[50px] text-[24px] font-light leading-[1.4]">{lead}</p>}
    </>
  );
}

/*
 * "The Masters Progression Process" — `.swiper.myGuideSlider` (1 / 1.2 at 640 / 2 at 768 / 3 at
 * 1024, spaceBetween 20, no loop, Swiper's default #007aff arrows that dim at the ends) of five
 * #4b4a92 step cards: r 32px 0, padding 40, the number 24px/32 600 at 90% opacity beside a 48px icon,
 * the title 24px/33 600 24px below, the copy 14px/20 gray-200 24px below; equal-height slides.
 */
const PROCESS_PER_VIEW = [[1024, 3], [768, 2], [640, 1.2], [0, 1]];
export function MPProcess({ heading, lead, steps }) {
  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Head heading={heading} lead={lead} />
        <TestimonialTrack loop={false} perView={PROCESS_PER_VIEW} gap={20} className="flex snap-x snap-mandatory items-stretch gap-[20px]">
          {steps.map((s) => (
            <div
              key={s.number}
              className="flex w-full flex-none snap-start n640:w-[calc((100%-4px)/1.2)] md:w-[calc((100%-20px)/2)] n1024:w-[calc((100%-40px)/3)]"
            >
              <div className="flex h-full w-full flex-col rounded-br-[32px] rounded-tl-[32px] bg-[#4b4a92] p-[40px] text-white">
                <div className="flex items-center justify-between">
                  <p className="text-[24px] font-semibold leading-[32px] opacity-90">{s.number}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" className="inline-block h-12 w-12" />
                </div>
                <h3 className="mt-[24px] text-[24px] font-semibold leading-[33px]">{s.title}</h3>
                <p className="mt-[24px] text-[14px] leading-[20px] text-gray-200">{s.description}</p>
              </div>
            </div>
          ))}
        </TestimonialTrack>
      </div>
    </section>
  );
}

/*
 * "ATLAS Students, Global Destinations" — the 40 `$students` split into two `.swiper` rows of 20
 * (`slidesPerView: 'auto'`, 282px slides, spaceBetween 20, loop, autoplay 2500ms paused on hover; the
 * second row runs in reverse), 24px apart, then two 46px #41418E buttons (16px apart, 32px below)
 * that step row 1 forward / row 2 back and vice versa. Card: 282x388, r 32px 0, photo cover, a
 * 55%-tall gradient, and 25px in / 26px up: the name (24px/1 500), the programme (14px/1.1, 10/16
 * padding, white rule, 19px below) and a 50px white logo plate. Every logo is a dead upstream ref, so
 * the plate's 50px is kept as empty space (the name and programme sit where production puts them);
 * three photographs are dead too, leaving the card's dark ground.
 */
function StudentCard({ s }) {
  return (
    <div className="relative h-[388px] w-[282px] overflow-hidden rounded-br-[32px] rounded-tl-[32px] bg-[#1a1a1a]">
      {s.image && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
      )}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[55%] bg-[linear-gradient(#00263700,#00263700_6%,#000000e6_86%)]" />
      <div className="absolute inset-x-0 bottom-[26px] z-20 mx-[25px]">
        <div className="text-[24px] font-medium leading-none text-white">{s.name}</div>
        <div className="mb-[19px] border-b border-white pb-[16px] pt-[10px] text-[14px] font-normal leading-[1.1] text-white">{s.program}</div>
        <div className="h-[50px]" aria-hidden="true" />
      </div>
    </div>
  );
}

function useRow(count, reverse, paused) {
  const [offset, setOffset] = useState(0);
  const [anim, setAnim] = useState(0);
  const step = useCallback((dir) => setAnim(dir), []);
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => step(reverse ? -1 : 1), 2500);
    return () => clearInterval(id);
  }, [paused, reverse, step]);
  const done = () => { if (anim) { setOffset((o) => (o + anim + count) % count); setAnim(0); } };
  return { offset, anim, step, done };
}

function Row({ items, row, className }) {
  const order = Array.from({ length: items.length + 2 }, (_, i) => items[(row.offset - 1 + i + items.length) % items.length]);
  return (
    <div className={cx('overflow-hidden', className)}>
      <div
        className={cx('flex gap-[20px]', row.anim !== 0 && 'transition-transform duration-300 ease-out')}
        style={{ transform: `translateX(${-302 - row.anim * 302}px)` }}
        onTransitionEnd={row.done}
      >
        {order.map((s, i) => (
          /* the first and last are loop clones sitting off-screen for the wrap-around */
          <div key={`${row.offset}-${i}`} aria-hidden={i === 0 || i === order.length - 1 ? true : undefined} className="flex h-auto w-[282px] flex-none">
            <StudentCard s={s} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MPStudents({ heading, lead, students }) {
  const half = Math.ceil(students.length / 2);
  const r1 = students.slice(0, half);
  const r2 = students.slice(half);
  const [hover, setHover] = useState(false);
  const row1 = useRow(r1.length, false, hover);
  const row2 = useRow(r2.length, true, hover);
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Head heading={heading} lead={lead} />
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="-mx-0">
          <Row items={r1} row={row1} className="mb-6" />
          <Row items={r2} row={row2} />
        </div>
        <div className="mt-8 flex gap-[16px]">
          <button type="button" aria-label="Previous students" onClick={() => { row1.step(-1); row2.step(1); }} className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#41418E] text-xl text-white">‹</button>
          <button type="button" aria-label="Next students" onClick={() => { row1.step(1); row2.step(-1); }} className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#41418E] text-xl text-white">›</button>
        </div>
      </div>
    </section>
  );
}

/*
 * "Region Wise Master's Acceptances" (#region-acceptance, the hero button's target) — six pill tabs
 * over a 2 / 3 (640) / 4 (768) / 5 (1024) column grid, gap 24 / 32 / 40, of logo cells (80 / 90 /
 * 100px tall, 24px top and bottom margin, 24px side padding). A tab shows only the cells carrying its
 * key (USA on load). Bootstrap collisions measured on production: the tab row's gap is 24px at every
 * width (`.gap-4`), the pills' padding is 8 48 (`.px-5` = 3rem) except the first's authored 8 20.
 * Every logo is a dead `atlas-global/wp-content` ref, so the cells are rendered at their size, empty.
 */
export function MPRegions({ heading, tabs, cells }) {
  const [active, setActive] = useState(tabs[0].key);
  return (
    <section id="region-acceptance" className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Head heading={heading} />
        <div role="tablist" aria-label={heading} className="mb-6 flex items-center gap-[24px] overflow-x-auto whitespace-nowrap n640:mb-10">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active === t.key}
              onClick={() => setActive(t.key)}
              className={cx(
                'rounded-full py-[8px] font-medium hover:bg-[#5cbdca]',
                i === 0 ? 'px-[20px]' : 'px-[48px]',
                active === t.key ? 'bg-[#5cbdca] text-white' : 'text-gray-700',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 items-center gap-6 n640:grid-cols-3 n640:gap-8 md:grid-cols-4 md:gap-10 n1024:grid-cols-5">
          {cells.map((key, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={cx('my-6 h-[80px] w-full items-center justify-center px-6 n640:h-[90px] md:h-[100px]', key === active ? 'flex' : 'hidden')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
