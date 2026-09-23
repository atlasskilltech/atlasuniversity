'use client';

import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import { useMediaQuery } from '@/lib/useMediaQuery';

/**
 * The generic homepage carousel — the mechanism behind every
 * `.swiper.common-swiper` and `.swiper.common-swiper-full` on the page.
 *
 * Both classes are handed to the SAME initialiser in
 * reference/assets/include/footer.php:354-384:
 *
 *     initCommonSwiper(el, paginationEl) => new Swiper(el, {
 *       slidesPerView: 'auto', spaceBetween: 24,
 *       autoplay: {delay: 5000, disableOnInteraction: false},
 *       pagination: {el, clickable: true},
 *       mousewheel: {forceToAxis: true},
 *     })
 *
 * They differ only in which pagination class is attached, and in their own CSS
 * (`.common-swiper-full` keeps `padding-top: 56px` unless `.mrgtp0` is set).
 * Bullets are hidden above 568px and shown below it, for both.
 *
 * ── Why a native scroller ─────────────────────────────────────────────────
 * Same reasoning as the programme carousels: these sliders are
 * `overflow: visible`, so the track bleeds past the centred `.container` to
 * the viewport edge. A scroll container reproduces that by spanning the full
 * section width and padding its track by the container's own inset — which
 * also makes the maximum scroll offset come out exactly equal to Swiper's
 * `maxTranslate()`, so the last card lands on the container's right inset.
 * Touch drag, momentum, horizontal wheel and keyboard come for free; mouse
 * drag is added by hand because Swiper has it and a native scroller does not.
 *
 * Snap positions are read off the laid-out cards, so this works for any card
 * width without being told what it is.
 *
 * `bleed` is what pads the track by the container inset, and it assumes the
 * carousel is a **sibling** of `.container`. One section in the rebuild nests
 * its slider inside `.container` instead — "Office of International Affairs" on
 * /advantages/atlas-internationalisation puts it inside the `.tt-wrap`, beside
 * the heading — and there the inset would be applied twice. `bleed={false}`
 * turns it off, and replaces it with the 24px Swiper writes as `margin-right`
 * on *every* slide including the last: invisible where the track bleeds, but
 * part of the measured width where the slider sizes its own parent.
 *
 * ── Autoplay ──────────────────────────────────────────────────────────────
 * Fixed at 4000ms on request, overriding the reference's 5000ms. The
 * transition stays the browser's native smooth scroll — short and direct, not
 * a long eased animation.
 */

const AUTOPLAY_MS = 4000;

/**
 * `.common-swiper-full .swiper-button-prev/-next` as
 * /advantages/atlas-internationalisation's own `<style>` block draws them: a
 * 46px circle (38 at <=767) in `#41418E`, pinned `top: 50%` with Swiper's
 * `margin-top: -22px`, 6px in from the edge, `z-index: 20`.
 *
 * The glyph upstream is Swiper's `::after { content: 'prev' }` rendered in its
 * bundled `swiper-icons` font, which this project does not load — so the same
 * chevron is drawn as an inline SVG at the declared 18px/700.
 */
/* ref `left: 6px` / `right: 6px` — measured against `.swiper`, which spans the
   container's content box, not the viewport. Whole literal strings, because the
   Tailwind scanner reads source text. */
const ARROW_INSET = {
  prev: 'left-[calc((100%_-_min(100%,1366px))/2_+_68px)] max-lg:left-9 max-md:left-7',
  next: 'right-[calc((100%_-_min(100%,1366px))/2_+_68px)] max-lg:right-9 max-md:right-7',
  prevFlush: 'left-[6px]',
  nextFlush: 'right-[6px]',
};

function CarouselArrow({ side, label, onClick, bleed }) {
  const prev = side === 'prev';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label ?? (prev ? 'Previous' : 'Next')}
      className={cx(
        'absolute top-1/2 -mt-[22px] z-20 flex h-[46px] w-[46px] items-center justify-center',
        'rounded-full bg-[#41418E] text-white shadow-[0_6px_16px_rgba(0,0,0,0.2)]',
        'max-md:h-[38px] max-md:w-[38px]',
        bleed
          ? (prev ? ARROW_INSET.prev : ARROW_INSET.next)
          : (prev ? ARROW_INSET.prevFlush : ARROW_INSET.nextFlush),
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[18px] w-[18px] max-md:h-[15px] max-md:w-[15px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points={prev ? '15 4 7 12 15 20' : '9 4 17 12 9 20'} />
      </svg>
    </button>
  );
}

/* `.container`'s inner left edge, mirrored on both sides of the track and used
 * as the scroll-snap padding. Whole literal strings — the Tailwind scanner
 * reads source text, so these cannot be composed at runtime. */
const TRACK_INSET =
  'pl-[calc((100%_-_min(100%,1366px))/2_+_62px)] ' +
  'pr-[calc((100%_-_min(100%,1366px))/2_+_62px)] ' +
  'max-lg:pl-[30px] max-lg:pr-[30px] ' +
  'max-md:pl-[22px] max-md:pr-[22px]';

const SNAP_INSET =
  'scroll-pl-[calc((100%_-_min(100%,1366px))/2_+_62px)] ' +
  'max-lg:scroll-pl-[30px] max-md:scroll-pl-[22px]';

/* Swiper hides its own scrollbar; `overflow-x: auto` has to be told to. */
const HIDE_SCROLLBAR = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

function nearest(value, snaps) {
  let best = 0;
  for (let i = 1; i < snaps.length; i += 1) {
    if (Math.abs(snaps[i] - value) < Math.abs(snaps[best] - value)) best = i;
  }
  return best;
}

/*
 * Slides arrive as already-rendered `children` rather than as data plus a
 * render callback: the sections using this are server components, and a
 * function prop cannot cross the server/client boundary. Each child is wrapped
 * in the `.swiper-slide` <li> here.
 */
/*
 * `bullets="isdi"` — the ISDI homepage's Swiper paints its bullets as
 * `inline-block` 8px dots with `margin: 0 8px` in a `text-align: center` block
 * whose line box (the surrounding type) sets its height, so the dots sit on the
 * text baseline. That is `.common-swiper`'s in-flow row (`margin-top: 20px`).
 * `bullets="isdi-overlay"` is the same row as `.common-swiper-full` places it:
 * absolutely positioned 30px below the slider's bottom edge, taking no space.
 * `bullets="isdi-light"` is the in-flow row inside ISDI's `.blue-wrapper`, where
 * header.php paints every bullet white (`.blue-wrapper .swiper-pagination-bullet
 * { background: #fff; opacity: .4 }`, the active one at opacity 1).
 * All are opt-in; every existing caller keeps the default row.
 *
 * `align="center"` — the Webflow sheet declares `.swiper-wrapper { align-items:
 * center }` (over Swiper's own `display: flex`), so a slide shorter than the
 * tallest one in the track is centred against it rather than stretched. It is
 * invisible wherever the slides are the same height, which is every carousel in
 * this rebuild until the B.Des "Where concepts meet execution" cards, whose copy
 * differs enough to give slides of 521-566px. Opt-in so no finished page moves.
 */
export default function Carousel({
  children, className, autoplay = true, arrows, bleed = true, bullets = 'default', align = 'stretch',
}) {
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const dragRef = useRef(null);
  const movedRef = useRef(false);
  const [snaps, setSnaps] = useState([0]);
  const [active, setActive] = useState(0);

  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  /* Swiper's `snapGrid`, read off the laid-out cards. */
  const measure = useCallback(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const boxes = [...track.children]
      .map((li) => li.getBoundingClientRect())
      .filter((box) => box.width > 0);
    if (!boxes.length) return;

    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const grid = [];
    for (const box of boxes) {
      const pos = Math.round(box.left - boxes[0].left);
      if (pos >= max) break;
      grid.push(pos);
    }
    grid.push(max);

    setSnaps(grid);
    setActive((current) => Math.min(current, grid.length - 1));
  }, []);

  useEffect(() => {
    measure();
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (track) ro.observe(track);
    return () => ro.disconnect();
  }, [measure]);

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (el) setActive(nearest(el.scrollLeft, snaps));
  }, [snaps]);

  const goTo = useCallback((index) => {
    const el = scrollerRef.current;
    if (el) el.scrollTo({ left: snaps[index], behavior: 'smooth' });
  }, [snaps]);

  /* ref the page-level `setupArrows` on /advantages/atlas-internationalisation:
     one slide forward or back, exactly `swiper.slideNext()` / `slidePrev()`. */
  const step = useCallback((dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const at = nearest(el.scrollLeft, snaps);
    const next = Math.min(Math.max(at + dir, 0), snaps.length - 1);
    el.scrollTo({ left: snaps[next], behavior: 'smooth' });
  }, [snaps]);

  /* ref autoplay — 4000ms, resumes after a drag. Skipped under
   * prefers-reduced-motion; every card stays reachable by drag, wheel,
   * keyboard and bullet. */
  useEffect(() => {
    if (!autoplay || reduceMotion || snaps.length < 2) return undefined;

    const id = setInterval(() => {
      const el = scrollerRef.current;
      if (!el || pausedRef.current || document.hidden) return;

      const at = nearest(el.scrollLeft, snaps);
      el.scrollTo({
        left: at >= snaps.length - 1 ? 0 : snaps[at + 1],
        behavior: 'smooth',
      });
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [autoplay, reduceMotion, snaps]);

  const onPointerDown = useCallback((event) => {
    const el = scrollerRef.current;
    if (!el) return;
    pausedRef.current = true;
    movedRef.current = false;
    if (event.pointerType === 'touch' || event.button !== 0) return;
    dragRef.current = { id: event.pointerId, x: event.clientX, left: el.scrollLeft };
  }, []);

  const onPointerMove = useCallback((event) => {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag || !el || event.pointerId !== drag.id) return;

    const dx = event.clientX - drag.x;
    /* Capture only once the pointer has travelled: while a capture is active
     * the browser retargets the click, which would swallow card links. */
    if (!movedRef.current) {
      if (Math.abs(dx) <= 3) return;
      movedRef.current = true;
      el.style.scrollSnapType = 'none';
      el.setPointerCapture(drag.id);
    }
    el.scrollLeft = drag.left - dx;
  }, []);

  const onPointerEnd = useCallback(() => {
    pausedRef.current = false;
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag || !el) return;
    dragRef.current = null;

    if (movedRef.current) {
      el.scrollTo({ left: snaps[nearest(el.scrollLeft, snaps)], behavior: 'smooth' });
    }
    setTimeout(() => {
      if (el) el.style.scrollSnapType = '';
    }, 450);
  }, [snaps]);

  const onClickCapture = useCallback((event) => {
    if (!movedRef.current) return;
    movedRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const scroller = (
    <div
        ref={scrollerRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
        className={cx(
          'w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain',
          bleed && SNAP_INSET,
          HIDE_SCROLLBAR,
          className,
        )}
      >
      {/* ref .swiper-wrapper */}
      <ul
        ref={trackRef}
        className={cx(
          'flex w-max list-none gap-6',
          align === 'center' ? 'items-center' : 'items-stretch',
          bleed ? TRACK_INSET : 'pr-6',
        )}
      >
        {Children.map(children, (child) => (
          /* ref .swiper-slide */
          <li className="flex-none snap-start">{child}</li>
        ))}
      </ul>
    </div>
  );

  /* ref ISDI `.swiper-pagination-bullets` (see `bullets` above) */
  const isdiBullets = snaps.length > 1 && (
    <div
      className={cx(
        'hidden text-center max-mcm:block',
        bullets === 'isdi-overlay' ? 'absolute inset-x-0 -bottom-[30px] z-10' : 'mt-5',
      )}
    >
      {snaps.map((snap, i) => (
        <button
          key={snap}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === active}
          className={cx(
            'mx-2 inline-block h-2 w-2 rounded-full p-0 align-baseline',
            bullets === 'isdi-light'
              ? cx('bg-white', i !== active && 'opacity-40')
              : i === active ? 'bg-[#007aff]' : 'bg-black opacity-20',
          )}
        />
      ))}
    </div>
  );

  return (
    <>
      {bullets === 'isdi-overlay' ? (
        <div className="relative">
          {scroller}
          {isdiBullets}
        </div>
      ) : arrows ? (
        /* ref `.common-swiper-full .swiper-button-prev/-next` — the buttons are
           children of `.swiper` upstream, where it is `overflow: visible`;
           here the scroller really does scroll, so they sit in a wrapper
           beside it and drive it through the same snap grid. */
        <div className="relative">
          {scroller}
          <CarouselArrow side="prev" label={arrows.prev} onClick={() => step(-1)} bleed={bleed} />
          <CarouselArrow side="next" label={arrows.next} onClick={() => step(1)} bleed={bleed} />
        </div>
      ) : (
        scroller
      )}

      {/* ref `.common-swiper .swiper-pagination-bullets` — hidden above 568px,
          `display: block; text-align: center; margin-top: 20px` below it. */}
      {(bullets === 'isdi' || bullets === 'isdi-light') && isdiBullets}
      {snaps.length > 1 && !bullets.startsWith('isdi') && (
        <div className="mt-5 hidden justify-center gap-2 max-mcm:flex">
          {snaps.map((snap, i) => (
            <button
              key={snap}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className={cx(
                'h-2 w-2 rounded-full transition-opacity',
                i === active ? 'bg-[#007aff]' : 'bg-black/20',
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}
