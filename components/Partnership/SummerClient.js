'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import { CONTAINER, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';
import { PillTabStrip } from '@/components/ui/PillTabs';
import { WF_SECTION, H2_MRG16, HEAD_WRAP_TOP } from './ui';
import TestimonialTrack from './TestimonialTrack';

/* ─────────────────────────────────────────────────────────────────────────────
 * "Global Summer Student Experiences" — international-summerschool.php:989-1450.
 * `section.section[style=padding-top:0] > .container > (h2.h2-tag.mrg42, .rounded-tabs-mint
 * .custom-sidetab-con > (.tabs-menu-mint.less-space strip, .tab-content-mint.atlas > panes))`.
 * The page's <style> turns the "side-tab" container into a plain block, so this is a horizontal pill
 * strip over the pane. Each pane: `.common-wrapper` (pt 56, 0 at <=767) > `.instagram-wrapper
 * .mobile-vert-scroll` (overflow-x auto) > `.grid-gallery-flex` of 4 `.grid-column.sm` x 2
 * `.grid-card-atlas` (photo + `.grid-logo` badge). Measured on production, three layouts:
 *   >=768    row, nowrap, gap 24, items-start; columns shrink-to-fit (flex 0 1 auto) and are as wide
 *            as their widest photograph; photographs at natural size (max-width 100%), cards 32px 0,
 *            margin-bottom 24, columns gap 2
 *   541-767  the gallery wraps: each column is a full-width ROW of two fixed 80vw/max-340 x 230 cards
 *            (r16, mb16, gap 16) — so each row overflows and the wrapper scrolls
 *   <=540    one nowrap horizontal scroller: columns auto-width with margin-top 24, gap 24
 * Badge: absolute 16/16, white, padding 8 14, r12, 6px backdrop blur; logo 29px tall (or an authored
 * inline height, 50px on a few). Pane: padding-top 20 at <=767 (`.tab-content-mint.atlas`).
 * ──────────────────────────────────────────────────────────────────────────── */
export function SummerTabs({ heading, tabs }) {
  const [active, setActive] = useState(0);
  const pane = tabs[active];
  return (
    <section className="block overflow-hidden pb-[60px] max-md:pb-10">
      <div className={CONTAINER}>
        <h2 className="relative mb-[42px] mt-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a] max-md:text-[36px]">{heading}</h2>
        <PillTabStrip tabs={tabs.map((t) => t.label)} active={active} onChange={setActive} label={heading} idPrefix="summer-experiences" spacing="lessFlushMd" />
        <div role="tabpanel" id={`summer-experiences-panel-${active}`} aria-labelledby={`summer-experiences-tab-${active}`} className="text-[18px] max-md:pt-5">
          <div className="pt-14 max-md:pt-0">
            <div className="overflow-x-auto">
              <div className="flex flex-nowrap items-start gap-[24px] max-md:flex-wrap max-md:items-stretch max-md:justify-between max-md:gap-0 max-vsm:flex-nowrap max-vsm:gap-x-[24px]">
                {pane.columns.map((col, ci) => (
                  <div
                    key={ci}
                    className="flex flex-col items-start justify-between gap-[2px] max-md:w-full max-md:flex-row max-md:items-stretch max-md:gap-[16px] max-vsm:mt-[24px] max-vsm:w-auto"
                  >
                    {col.map((card, k) => (
                      <div
                        key={k}
                        className="relative mb-[24px] overflow-hidden rounded-br-[32px] rounded-tl-[32px] max-md:mb-[16px] max-md:w-[80vw] max-md:max-w-[340px] max-md:flex-none max-md:rounded-[16px]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={card.image} alt="" loading="lazy" className="block h-auto max-w-full object-cover max-md:h-[230px] max-md:w-full max-md:object-center" />
                        <div className="absolute bottom-[16px] left-[16px] flex items-center justify-center rounded-[12px] bg-white px-[14px] py-[8px] backdrop-blur-[6px]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={card.logo}
                            alt=""
                            loading="lazy"
                            className="block w-auto"
                            style={{ height: card.logoHeight ? `${card.logoHeight}px` : '29px' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * "Summer School Diaries" — international-summerschool.php:1452-1527 + its trailing <script>.
 * A coverflow of 7 reels (`.carousel-wrapper` padding 20 40 / 12 at <=767, `#carousel` flex gap 30
 * items-center, `.card` 260x420 / 200x340, r24). On `load` the row is translated so the 4th card is
 * centred — translateX(wrapper/2 − 3.5 x (card + 30)) — and classed active / near (scale .95,
 * opacity .95) / far (scale .85, opacity .6). The active card is `height: auto`, i.e. its video's own
 * aspect. It auto-advances every 3s (paused on hover and while a reel plays), the arrows move one
 * card (rotating the row), clicking a side card centres it, and the play button plays that reel
 * (unmuted) and stops every other. Reproduced with the same geometry; the rotation is done by
 * re-ordering the list rather than moving DOM nodes. The centring is re-measured whenever the
 * wrapper resizes (a ResizeObserver), since a mount-time measure can run before layout settles.
 * ──────────────────────────────────────────────────────────────────────────── */
export function SummerCoverflow({ heading, reels }) {
  const total = reels.length;
  const center = Math.floor(total / 2);
  const [start, setStart] = useState(0); // index of the reel in slot 0
  const [shift, setShift] = useState(0); // -1 / +1 while animating a step
  const [base, setBase] = useState(null);
  const [playing, setPlaying] = useState(null);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const hover = useRef(false);
  const busy = useRef(false);

  const measure = useCallback(() => {
    const w = wrapRef.current;
    const t = trackRef.current;
    if (!w || !t || !t.children.length) return;
    const card = t.children[0].offsetWidth;
    const full = card + 30;
    setBase({ x: w.clientWidth / 2 - (full * center + full / 2), full });
  }, [center]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const stopAll = () => {
    trackRef.current?.querySelectorAll('video').forEach((v) => { v.pause(); v.currentTime = 0; });
    setPlaying(null);
  };
  const step = useCallback((dir) => {
    if (busy.current) return;
    busy.current = true;
    setShift(dir);
  }, []);
  const onTransitionEnd = (e) => {
    if (e.target !== trackRef.current || shift === 0) return;
    setStart((s) => (s + shift + total) % total);
    setShift(0);
    busy.current = false;
  };

  useEffect(() => {
    if (playing !== null) return undefined;
    const id = setInterval(() => { if (!hover.current) step(1); }, 3000);
    return () => clearInterval(id);
  }, [playing, step]);

  const order = Array.from({ length: total }, (_, i) => (start + i) % total);
  const x = base ? base.x - shift * base.full : 0;

  return (
    <section className={WF_SECTION}>
      <div className={CONTAINER}>
        <div className={HEAD_WRAP_TOP}>
          <h2 className={H2_MRG16}>{heading}</h2>
        </div>
        <div
          ref={wrapRef}
          className="relative m-auto overflow-hidden px-10 py-5 max-md:p-3"
          onMouseEnter={() => { hover.current = true; }}
          onMouseLeave={() => { hover.current = false; }}
        >
          <button type="button" aria-label="Previous reel" onClick={() => { stopAll(); step(-1); }} className="absolute left-2 top-1/2 z-10 h-[50px] w-[50px] -translate-y-1/2 rounded-full bg-[#41418E] text-white max-md:h-[42px] max-md:w-[42px]">‹</button>
          <div
            ref={trackRef}
            onTransitionEnd={onTransitionEnd}
            className={cx('flex items-center gap-[30px] will-change-transform', shift !== 0 && 'transition-transform duration-[600ms] ease-in-out')}
            style={{ transform: `translateX(${x}px)` }}
          >
            {order.map((ri, slot) => {
              const reel = reels[ri];
              const rel = slot - center;
              const cls = rel === 0 ? 'active' : Math.abs(rel) === 1 ? 'near' : 'far';
              const isPlaying = playing === ri;
              return (
                <div
                  key={ri}
                  onClick={() => { if (rel !== 0 && shift === 0) { stopAll(); setStart((s) => (s + rel + total) % total); } }}
                  className={cx(
                    /* `.card` is also Bootstrap's `.card` (header.php loads Bootstrap): a 1px
                       rgba(0,0,0,.175) border, white ground and a flex column — so each video is 2px
                       shorter than its card, and the active card is its video's height + 2 */
                    'group relative flex w-[260px] flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[rgba(0,0,0,0.175)] bg-white transition-all duration-[450ms] ease-in-out max-md:w-[200px]',
                    "after:absolute after:inset-x-0 after:bottom-0 after:z-[2] after:h-[45%] after:bg-[linear-gradient(transparent,#41418E)] after:content-['']",
                    cls === 'active' ? 'z-[5] h-auto' : 'h-[420px] max-md:h-[340px]',
                    cls === 'near' && 'scale-[.95] opacity-95 hover:-translate-y-[15px]',
                    cls === 'far' && 'scale-[.85] opacity-60',
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={reel.poster} alt="" loading="lazy" className={cx('pointer-events-none absolute inset-0 z-[3] h-full w-full bg-black object-cover transition-opacity duration-[250ms]', isPlaying ? 'opacity-0' : 'opacity-100')} />
                  <video
                    muted={!isPlaying}
                    loop
                    playsInline
                    preload="metadata"
                    src={reel.video}
                    className="block h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    aria-label={isPlaying ? 'Pause reel' : 'Play reel'}
                    onClick={(e) => {
                      e.stopPropagation();
                      const v = e.currentTarget.parentElement.querySelector('video');
                      if (isPlaying) { v.pause(); v.currentTime = 0; setPlaying(null); return; }
                      stopAll();
                      v.muted = false;
                      v.play().catch(() => {});
                      setPlaying(ri);
                    }}
                    className={cx(
                      'absolute bottom-4 right-4 z-[4] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#41418E] text-[18px] text-white transition-opacity duration-300',
                      isPlaying && 'opacity-0 group-hover:opacity-100',
                    )}
                  >
                    {isPlaying ? '❚❚' : '▶'}
                  </button>
                </div>
              );
            })}
          </div>
          <button type="button" aria-label="Next reel" onClick={() => { stopAll(); step(1); }} className="absolute right-2 top-1/2 z-10 h-[50px] w-[50px] -translate-y-1/2 rounded-full bg-[#41418E] text-white max-md:h-[42px] max-md:w-[42px]">›</button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * "Experiences Beyond Borders" — international-summerschool.php:1545-1892.
 * `.swiper.customSliderContainer_X91` (slidesPerView 1 / 2 (>=600) / 3 (>=1024), spaceBetween 10,
 * no loop) of `.testimonial-custom-card.bgc1.atlas` — 320x500, #41418e, r 32px 0, clipped; full width
 * below 768 — each a cover video with a 55px rgba(0,0,0,.7) play button 20px in from the corner.
 * Swiper's default arrows in the page's #332d7e from 768 up; below 768 they are hidden and the
 * pagination dots show instead (`margin-top: 15px`).
 * ──────────────────────────────────────────────────────────────────────────── */
const BEYOND_PER_VIEW = [[1024, 3], [600, 2], [0, 1]];

export function SummerBeyond({ heading, lead, cards }) {
  const [playing, setPlaying] = useState(null);
  const [active, setActive] = useState(0);
  const holder = useRef(null);
  const track = () => holder.current?.querySelector('[data-slide]')?.parentElement;
  useEffect(() => {
    const t = holder.current?.querySelector('[data-slide]')?.parentElement;
    if (!t) return undefined;
    const onScroll = () => {
      if (!t.children.length) return;
      setActive(Math.round(t.scrollLeft / (t.children[0].getBoundingClientRect().width + 10)));
    };
    t.addEventListener('scroll', onScroll, { passive: true });
    return () => t.removeEventListener('scroll', onScroll);
  }, []);
  const toggle = (i, e) => {
    const v = e.currentTarget.parentElement.querySelector('video');
    holder.current.querySelectorAll('video').forEach((x) => { if (x !== v) { x.pause(); x.currentTime = 0; } });
    if (v.paused) { v.play().catch(() => {}); setPlaying(i); } else { v.pause(); setPlaying(null); }
  };
  return (
    <section className={WF_SECTION}>
      <div className={CONTAINER}>
        <div className={HEAD_WRAP_TOP}>
          <h2 className={H2_MRG16}>{heading}</h2>
        </div>
        <div className={SUB_INNER_MRGBTM}>{lead}</div>
        <div ref={holder} className="relative overflow-hidden">
          <TestimonialTrack
            loop={false}
            perView={BEYOND_PER_VIEW}
            gap={10}
            color="#332d7e"
            arrowsBelow={768}
            className="flex snap-x snap-mandatory gap-[10px]"
          >
            {cards.map((c, i) => (
              <div key={c.poster} data-slide className="w-full flex-none snap-start [@media(min-width:600px)]:w-[calc((100%-10px)/2)] n1024:w-[calc((100%-20px)/3)]">
                <div className="flex h-[500px] w-[320px] cursor-pointer overflow-hidden rounded-br-[32px] rounded-tl-[32px] bg-[#41418e] max-md:w-full">
                  <div className="relative max-md:w-full">
                    <video
                      loop
                      playsInline
                      preload="metadata"
                      poster={c.poster}
                      className="relative block h-[500px] w-[325px] max-w-full flex-none bg-[50%] object-cover max-md:max-h-[580px] max-md:w-full max-md:bg-black max-md:object-center"
                    >
                      {c.sources.map((s) => <source key={s} src={s} />)}
                    </video>
                    <button
                      type="button"
                      aria-label={playing === i ? 'Pause video' : 'Play video'}
                      onClick={(e) => toggle(i, e)}
                      className="absolute bottom-5 right-5 flex h-[55px] w-[55px] items-center justify-center rounded-full border-none bg-black/70 text-[22px] text-white"
                    >
                      {playing === i ? '❚❚' : '▶'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </TestimonialTrack>
          {/* ref .customPagination_X91 — <=767 only, in flow, 15px below the slides */}
          <div className="mt-[15px] hidden h-6 items-center justify-center gap-2 max-md:flex">
            {cards.map((c, i) => (
              <button
                key={c.poster}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => { const t = track(); t?.scrollTo({ left: i * (t.children[0].getBoundingClientRect().width + 10), behavior: 'smooth' }); }}
                className={cx('h-2 w-2 rounded-full', i === active ? 'bg-[#007aff]' : 'bg-black/20')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
