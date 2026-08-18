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
 * ── Autoplay ──────────────────────────────────────────────────────────────
 * Fixed at 4000ms on request, overriding the reference's 5000ms. The
 * transition stays the browser's native smooth scroll — short and direct, not
 * a long eased animation.
 */

const AUTOPLAY_MS = 4000;

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
export default function Carousel({ children, className }) {
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

  /* ref autoplay — 4000ms, resumes after a drag. Skipped under
   * prefers-reduced-motion; every card stays reachable by drag, wheel,
   * keyboard and bullet. */
  useEffect(() => {
    if (reduceMotion || snaps.length < 2) return undefined;

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
  }, [reduceMotion, snaps]);

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

  return (
    <>
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
          SNAP_INSET,
          HIDE_SCROLLBAR,
          className,
        )}
      >
        {/* ref .swiper-wrapper */}
        <ul ref={trackRef} className={cx('flex w-max list-none items-stretch gap-6', TRACK_INSET)}>
          {Children.map(children, (child) => (
            /* ref .swiper-slide */
            <li className="flex-none snap-start">{child}</li>
          ))}
        </ul>
      </div>

      {/* ref `.common-swiper .swiper-pagination-bullets` — hidden above 568px,
          `display: block; text-align: center; margin-top: 20px` below it. */}
      {snaps.length > 1 && (
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
