'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { useMediaQuery } from '@/lib/useMediaQuery';

/**
 * ISDI awards band — port of reference/schools/isdi/index.php:461-499
 * (`.awards > .swiper.mobile-swiper-cm.over-visi`), initialised by footer.php:
 *
 *   new Swiper('.mobile-swiper-cm', { slidesPerView: 'auto', spaceBetween: 0,
 *     loop: true, pagination: { el: '.swiper-pagination-white', clickable: true } })
 *
 * Measured:
 *   >=768   four 300px `.aw-card`s centred with a 40px gap on #193e90, 22px
 *           band padding. The row is 1320px wide, so below 1320 it overflows
 *           and is clipped on both sides — that is what production paints, and
 *           Swiper has nothing to slide there (the row is laid out statically).
 *   <=767   a looping slider with white bullets. Cards are content-width (222px,
 *           the two laurels) between 569 and 767, and a full slide at <=568
 *           (header.php's `.mobile-swiper-cm .swiper-slide { width: 100% }`).
 *
 * The laurel image is the same file mirrored (`.aw-img.flip` = rotateY 180deg),
 * with the title and press line laid over it, centred.
 *
 * Deviation: at 569-767 Swiper's loop mode starts the track ~121px in, a side
 * effect of how it re-orders duplicated slides. The port starts on the first
 * card; slides, sizes, bullets, loop and swipe are otherwise the same.
 */

const SPEED = 300;

function Card({ award }) {
  return (
    /* ref .aw-card (variant isdi) */
    <div className="relative flex w-[300px] items-center justify-between text-center max-md:w-full">
      {/* eslint-disable-next-line @next/next/no-img-element -- a 2KB laurel at its natural size */}
      <img src={award.image} alt="" width={111} height={137} loading="lazy" className="block flex-none" />
      {/* ref .aw-text — absolutely positioned at its static position, i.e. vertically centred */}
      <div className="absolute left-0 top-1/2 w-full -translate-y-1/2">
        <div className="text-base font-semibold text-white">{withBreaks(award.title)}</div>
        <div className="pt-2 text-xs text-[#abaaaa]">{withBreaks(award.press)}</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={award.image} alt="" width={111} height={137} loading="lazy" className="block flex-none [transform:rotateY(180deg)]" />
    </div>
  );
}

export default function Awards({ data }) {
  const items = data.items;
  const count = items.length;
  const mobile = useMediaQuery('(max-width: 767px)');

  /* loop track: [clones][real][clones]; `pos` indexes into it */
  const [pos, setPos] = useState(count);
  const [animate, setAnimate] = useState(false);
  const [drag, setDrag] = useState(0);
  const [offsets, setOffsets] = useState([]);
  const trackRef = useRef(null);
  const pointer = useRef(null);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0]?.getBoundingClientRect().left ?? 0;
    setOffsets([...track.children].map((el) => el.getBoundingClientRect().left - first));
  }, []);

  useLayoutEffect(() => {
    if (!mobile) return undefined;
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [mobile, measure]);

  /* after a transition lands on a clone, jump to the matching real slide */
  useEffect(() => {
    if (!animate) return undefined;
    const t = setTimeout(() => {
      setAnimate(false);
      setPos((p) => (p < count ? p + count : p >= 2 * count ? p - count : p));
    }, SPEED);
    return () => clearTimeout(t);
  }, [pos, animate, count]);

  const go = (next) => {
    setAnimate(true);
    setPos(next);
  };

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    pointer.current = { id: e.pointerId, x: e.clientX, moved: false };
  };
  const onPointerMove = (e) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.x;
    if (!p.moved && Math.abs(dx) > 5) {
      p.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setAnimate(false);
    }
    if (p.moved) setDrag(dx);
  };
  const onPointerEnd = (e) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    pointer.current = null;
    if (p.moved && Math.abs(drag) > 30) go(pos + (drag < 0 ? 1 : -1));
    setDrag(0);
  };

  const real = ((pos % count) + count) % count;
  const x = (offsets[pos] ?? 0) - drag;

  if (!mobile) {
    return (
      /* ref .awards */
      <div data-block="awards" className="block overflow-hidden bg-[#193e90] py-[22px]">
        {/* ref .swiper.mobile-swiper-cm */}
        <div className="relative z-[1] overflow-hidden">
          {/* ref section.swiper-wrapper.center */}
          <div className="relative z-[1] flex items-center justify-center gap-10">
            {items.map((award) => (
              <div key={award.title} className="relative flex-none overflow-clip">
                <Card award={award} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const loop = [...items, ...items, ...items];
  return (
    <div data-block="awards" className="block overflow-hidden bg-[#193e90] py-[22px]">
      <div
        className="relative z-[1] block touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div
          ref={trackRef}
          className="relative z-[1] flex items-center justify-start"
          style={{
            transform: `translate3d(${-x}px, 0, 0)`,
            transition: animate ? `transform ${SPEED}ms ease` : 'none',
          }}
        >
          {loop.map((award, i) => (
            <div
              key={`${i}-${award.title}`}
              className="relative flex-none overflow-clip max-mcm:w-full"
              aria-hidden={i < count || i >= 2 * count}
            >
              <Card award={award} />
            </div>
          ))}
        </div>

        {/* ref .swiper-pagination-white */}
        <div className="flex items-center justify-center">
          {items.map((award, i) => (
            <button
              key={award.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === real}
              onClick={() => go(count + i)}
              className={cx(
                'relative mx-2 block rounded-full p-0',
                "before:absolute before:-inset-2.5 before:content-['']",
                i === real ? 'h-2.5 w-2.5 bg-white' : 'h-2 w-2 bg-[#eee] opacity-60',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
