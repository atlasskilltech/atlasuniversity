'use client';

import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * Bootstrap 4's `.carousel.slide` (`data-ride="carousel"`) as the lp2022 pages use it: one item
 * visible, a 0.6s ease-in-out slide between items, a 5s interval that pauses while the pointer is
 * over the carousel, `.carousel-indicators` (30x3 bars with 10px transparent borders, 50% white,
 * the current one opaque) and the two `.carousel-control-prev/-next` strips (15% wide, 50% opacity,
 * 90% on hover) holding Bootstrap's own 20px chevron SVGs. Indicators wrap (no infinite strip), as
 * Bootstrap does: next from the last item goes to the first.
 *
 * Items keep their own heights; the box is the current item's height, as `.carousel-item` blocks do
 * (`display: none` except the active one).
 */
const PREV_ICON =
  "bg-[url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e\")]";
const NEXT_ICON =
  "bg-[url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e\")]";

export default function BsCarousel({ children, className, interval = 5000, label, indicatorsClassName }) {
  const items = Children.toArray(children);
  const n = items.length;
  const [cur, setCur] = useState(0);
  const [anim, setAnim] = useState(null); // {from, to, dir, phase}
  const hover = useRef(false);
  const busy = useRef(false);

  const curRef = useRef(0);
  const go = useCallback(
    (to, dirHint) => {
      const from = curRef.current;
      const target = ((to % n) + n) % n;
      if (busy.current || n < 2 || target === from) return;
      busy.current = true;
      const dir = dirHint ?? (target > from ? 1 : -1);
      curRef.current = target;
      setCur(target);
      setAnim({ from, to: target, dir, phase: 0 });
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim((a) => a && { ...a, phase: 1 })));
      setTimeout(() => {
        setAnim(null);
        busy.current = false;
      }, 620);
    },
    [n],
  );

  useEffect(() => {
    if (!interval || n < 2) return undefined;
    const id = setInterval(() => {
      if (!hover.current && !document.hidden) go(curRef.current + 1, 1);
    }, interval);
    return () => clearInterval(id);
  }, [interval, n, go]);

  const itemClass = (i) => {
    if (!anim) return i === cur ? 'relative block' : 'hidden';
    const { from, to, dir, phase } = anim;
    const base = 'w-full transition-transform duration-[600ms] ease-in-out';
    if (i === from) return cx('relative block', base, phase ? (dir > 0 ? '-translate-x-full' : 'translate-x-full') : 'translate-x-0');
    if (i === to)
      return cx(
        'absolute left-0 top-0 block',
        base,
        phase ? 'translate-x-0' : dir > 0 ? 'translate-x-full' : '-translate-x-full',
      );
    return 'hidden';
  };

  return (
    <div
      className={cx('relative', className)}
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => {
        hover.current = true;
      }}
      onMouseLeave={() => {
        hover.current = false;
      }}
    >
      <ul
        className={cx(
          'absolute inset-x-0 bottom-0 z-[15] mx-[15%] mb-[16px] flex list-none justify-center pl-0',
          indicatorsClassName,
        )}
      >
        {items.map((_, i) => (
          <li key={i} className="mx-[3px] box-content h-[3px] w-[30px] flex-[0_1_auto]">
            <button
              type="button"
              aria-label={`Slide ${i + 1}`}
              aria-current={i === cur || undefined}
              onClick={() => go(i)}
              className={cx(
                'box-content block h-[3px] w-[30px] cursor-pointer border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 transition-opacity duration-[600ms] ease-[ease]',
                i === cur ? 'opacity-100' : 'opacity-50',
              )}
            />
          </li>
        ))}
      </ul>
      <div className="relative w-full overflow-hidden">
        {items.map((it, i) => (
          <div key={i} className={itemClass(i)} aria-hidden={i !== cur || undefined}>
            {it}
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous"
        onClick={() => go(cur - 1, -1)}
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center p-0 text-center opacity-50 transition-opacity duration-150 hover:opacity-90"
      >
        <span className={cx('inline-block h-[20px] w-[20px] bg-[length:100%_100%] bg-no-repeat', PREV_ICON)} />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => go(cur + 1, 1)}
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center p-0 text-center opacity-50 transition-opacity duration-150 hover:opacity-90"
      >
        <span className={cx('inline-block h-[20px] w-[20px] bg-[length:100%_100%] bg-no-repeat', NEXT_ICON)} />
      </button>
    </div>
  );
}
