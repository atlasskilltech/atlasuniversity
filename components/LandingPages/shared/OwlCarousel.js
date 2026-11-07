'use client';

import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * Owl Carousel 2.3.4, as the legacy landing pages (lp23/24/25, lp2022) configure it: `loop: true`,
 * `margin: 0`, `nav` with image arrows, `dots: false`, optional `autoplay` (Owl's defaults: 5000ms
 * timeout, 250ms `smartSpeed`), `responsive` item counts.
 *
 * Owl lays every `.owl-item` side by side at `stage-outer width / items`, clones `items` slides at
 * each end for the loop and slides the stage with a 250ms transform. The same is done here without
 * measuring anything: the per-breakpoint item count lives in a CSS custom property (`pvClass`, e.g.
 * `[--pv:1] [@media(min-width:1000px)]:[--pv:3]`), each slide is `flex: 0 0 calc(100% / var(--pv))`
 * of a track exactly as wide as the viewport box, and the track is translated by whole slides —
 * `translateX(calc(-100% * k / var(--pv)))`. The server render therefore already shows slide 1 in
 * place at every width (no hydration jump), and a resize simply re-resolves the variable.
 *
 * `CLONES` slides are cloned at each end (enough for the widest `items` used anywhere, 4), and a jump
 * past either end is snapped back without a transition once the slide has landed — Owl's loop.
 * Slides keep their natural height and the box takes the tallest, as `.owl-stage` floats do.
 * Pointer swipe (> 40px) moves one slide, standing in for Owl's mouse/touch drag. `margin` is
 * Owl's: an item is `(W - margin*(items-1)) / items` wide with `margin-right: margin`, and a step is
 * one item plus its margin. `dots` renders the `.owl-dots` row.
 */
const CLONES = 4;

export default function OwlCarousel({
  children,
  pvClass,
  autoplay = 0,
  speed = 250,
  className,
  itemClassName,
  prev,
  next,
  label,
  /* Owl's `margin` (px): items are `(W - margin*(items-1)) / items` wide with `margin-right: margin` */
  margin = 0,
  /* `dots: true` — `{ className, dotClassName, activeClassName }` for the `.owl-dots` row below */
  dots,
}) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const [pos, setPos] = useState(CLONES);
  const [animate, setAnimate] = useState(true);
  const busy = useRef(false);
  const drag = useRef(null);

  const posRef = useRef(CLONES);
  const timer = useRef(null);

  /* after the slide lands, snap a clone position back onto its real slide (Owl's loop) */
  const settle = useCallback(() => {
    clearTimeout(timer.current);
    busy.current = false;
    const p = posRef.current;
    const q = p >= CLONES + n ? p - n : p < CLONES ? p + n : p;
    if (q !== p) {
      posRef.current = q;
      setAnimate(false);
      setPos(q);
    }
  }, [n]);

  const go = useCallback(
    (dir) => {
      if (busy.current) return;
      busy.current = true;
      posRef.current += dir;
      setAnimate(true);
      setPos(posRef.current);
      /* transitionend can be skipped (hidden tab, reduced motion) — never leave the carousel locked */
      timer.current = setTimeout(settle, speed + 80);
    },
    [settle, speed],
  );

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(id);
    }
    return undefined;
  }, [animate]);

  useEffect(() => {
    if (!autoplay || n < 2) return undefined;
    const id = setInterval(() => go(1), autoplay);
    return () => clearInterval(id);
  }, [autoplay, go, n]);

  const render = (slide, key, clone) => (
    <div
      key={key}
      aria-hidden={clone || undefined}
      className={cx(
        'min-w-0 shrink-0 grow-0 basis-[calc((100%-(var(--pv)-1)*var(--om))/var(--pv))] mr-[var(--om)]',
        itemClassName,
      )}
    >
      {slide}
    </div>
  );

  const before = [];
  const after = [];
  for (let i = 0; i < CLONES; i += 1) {
    before.push(render(slides[(n - CLONES + (i % n) + n * CLONES) % n], `b${i}`, true));
    after.push(render(slides[i % n], `a${i}`, true));
  }

  return (
    <div
      className={cx('relative z-[1]', pvClass, className)}
      style={{ '--om': `${margin}px` }}
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        className="overflow-hidden"
        onPointerDown={(e) => {
          drag.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (drag.current == null) return;
          const dx = e.clientX - drag.current;
          drag.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div
          className={cx('flex w-full items-start', animate && 'transition-transform ease-[ease]')}
          style={{
            transform: `translate3d(calc(-1 * ${pos} * (100% + var(--om)) / var(--pv)), 0, 0)`,
            transitionDuration: animate ? `${speed}ms` : '0ms',
          }}
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget) settle();
          }}
        >
          {before}
          {slides.map((s, i) => render(s, `s${i}`, false))}
          {after}
        </div>
      </div>
      {prev && (
        <button type="button" aria-label="Previous" className={prev.className} onClick={() => go(-1)}>
          {prev.content}
        </button>
      )}
      {next && (
        <button type="button" aria-label="Next" className={next.className} onClick={() => go(1)}>
          {next.content}
        </button>
      )}
      {dots && n > 1 && (
        <div className={dots.className}>
          {slides.map((_, i) => {
            const active = (((pos - CLONES) % n) + n) % n === i;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                aria-current={active || undefined}
                className={dots.dotClassName}
                onClick={() => {
                  const cur = (((posRef.current - CLONES) % n) + n) % n;
                  if (i !== cur) go(i - cur);
                }}
              >
                <span className={active ? dots.activeClassName : dots.spanClassName} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
