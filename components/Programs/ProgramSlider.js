'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import { useMediaQuery } from '@/lib/useMediaQuery';
import ProgramCard from '@/components/Programs/ProgramCard';

/**
 * The programme carousel — port of `.swiper.common-swiper.mrgtp0`
 * (reference/index.php:256, initialised in assets/include/footer.php:354-378).
 *
 * ── What the reference Swiper actually does ───────────────────────────────
 *   slidesPerView: 'auto'      cards keep their fixed 295px width
 *   spaceBetween: 24
 *   autoplay: {delay: 5000, disableOnInteraction: false}
 *   mousewheel: {forceToAxis: true}
 *   pagination: {clickable: true}   hidden >568px, shown <=568px
 *   loop: false, no arrows, no `freeMode`
 * Swiper's default `stopOnLastSlide: false` means autoplay rewinds to the first
 * card once the track is fully scrolled rather than stopping.
 *
 * ── Why a native scroller instead of shipping Swiper ──────────────────────
 * `.swiper.common-swiper` sets `overflow: visible`, so the track is NOT clipped
 * at the centred `.container` — the cards bleed past its right padding all the
 * way to the viewport edge, where `.section {overflow: hidden}` finally cuts
 * them off. A scroll container reproduces that by spanning the full section
 * width while padding its track by the container's own inset:
 *
 *   inset  = (100% - min(100%, 1366px)) / 2 + 62px      ( = .container's inner
 *            left edge, from `max-width: 1366px; padding: 0 62px` )
 *   track  = 8 x 295 + 7 x 24 = 2528px of cards, inset on BOTH sides
 *   scroll = trackWidth + 2 x inset - sectionWidth = 2528 - containerInnerWidth
 *
 * That last identity is the point: the maximum scroll offset works out to
 * exactly Swiper's `maxTranslate()`, so the final resting position aligns the
 * last card's right edge with the container's right inset — pixel-identical to
 * the reference, while touch drag, momentum, horizontal wheel (Swiper's
 * `forceToAxis` is the native behaviour) and keyboard all come for free.
 *
 * Snap positions are derived the same way Swiper derives `snapGrid`: every
 * card offset that is actually reachable, plus the clamped end position. They
 * are read back off the laid-out cards rather than computed from a constant
 * pitch, so a card the reference hides at some widths (`belowDesktopOnly`)
 * drops out of the grid on its own. Bullet counts come out identical to the
 * reference at every width and in all four carousels.
 */

/*
 * `.container`'s inner left edge, mirrored on both sides of the track and used
 * as the scroll-snap padding. Written out as whole literal class strings — the
 * Tailwind scanner reads source text, so these cannot be composed at runtime.
 */
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

export default function ProgramSlider({
  programs,
  applyHref,
  accent,
  buttons,
}) {
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const [snaps, setSnaps] = useState([0]);
  const [active, setActive] = useState(0);

  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  /* Swiper's `snapGrid`, recomputed whenever the scrollport or track resizes. */
  const measure = useCallback(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    /* Zero-width entries are the cards the reference hides at this width. */
    const cards = [...track.children]
      .map((li) => li.getBoundingClientRect())
      .filter((box) => box.width > 0);
    if (!cards.length) return;

    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const grid = [];
    for (const box of cards) {
      const pos = Math.round(box.left - cards[0].left);
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

  /*
   * ref autoplay {delay: 5000, disableOnInteraction: false}: it pauses for the
   * duration of a drag and picks straight back up afterwards. Skipped outright
   * under `prefers-reduced-motion` — the reference has no such guard, but an
   * unattended 5s animation is exactly what that query asks us to suppress, and
   * every card stays reachable by drag, wheel, keyboard and bullet.
   */
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
    }, 5000);

    return () => clearInterval(id);
  }, [reduceMotion, snaps]);

  /*
   * Mouse drag. Touch and trackpads already pan a scroll container natively,
   * but a mouse does not — and grabbing a card and throwing it is how the
   * reference Swiper behaves, so it is reproduced by hand. Snapping is turned
   * off for the duration of the drag (otherwise the browser fights every
   * `scrollLeft` write) and restored once the release animation has landed on
   * a snap point, so nothing jumps.
   */
  const dragRef = useRef(null);
  const movedRef = useRef(false);

  const onPointerDown = useCallback((event) => {
    const el = scrollerRef.current;
    if (!el) return;

    pausedRef.current = true;
    movedRef.current = false;
    if (event.pointerType === 'touch' || event.button !== 0) return;

    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      left: el.scrollLeft,
    };
  }, []);

  const onPointerMove = useCallback((event) => {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag || !el || event.pointerId !== drag.id) return;

    const dx = event.clientX - drag.x;

    /*
     * Capture only once the pointer has actually travelled. While a capture is
     * active the browser retargets the synthesised click to the capturing
     * element, so capturing on `pointerdown` would swallow every click on the
     * Apply Now / Know More links.
     */
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
      el.scrollTo({
        left: snaps[nearest(el.scrollLeft, snaps)],
        behavior: 'smooth',
      });
    }
    /* long enough for the smooth scroll above to settle on the snap point */
    setTimeout(() => {
      if (el) el.style.scrollSnapType = '';
    }, 450);
  }, [snaps]);

  /* A drag that ends on top of a button must not also follow its link. */
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
        )}
      >
        {/* ref .swiper-wrapper */}
        <ul ref={trackRef} className={cx('flex w-max list-none gap-6', TRACK_INSET)}>
          {programs.map((program) => (
            /* ref .swiper-slide (+ Bootstrap `.d-block.d-lg-none` where the
               reference offers the programme as a banner on desktop instead) */
            <li
              key={program.name}
              className={cx(
                'flex-none snap-start',
                program.belowDesktopOnly && 'lg:hidden',
              )}
            >
              <ProgramCard
                program={program}
                applyHref={applyHref}
                accent={accent}
                buttons={buttons}
              />
            </li>
          ))}
        </ul>
      </div>

      {/*
        ref `.common-swiper .swiper-pagination-bullets` — `display: none` above
        568px, `display: block; text-align: center; margin-top: 20px` below it
        (assets/include/header.php:171-215). Bullets keep Swiper's own defaults:
        8px dots, black at 20% opacity, `--swiper-theme-color` when active.
      */}
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
