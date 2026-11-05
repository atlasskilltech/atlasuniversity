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

/*
 * `variant` is the award card's Webflow variant. ISDI's (`isdi`, the default) is
 * described above. The ISME homepage (reference/schools/isme/index.php) uses the
 * `base` card, measured on production at 1440 / 767 / 390: 355px wide, an 18/27
 * 600 title and a 14/21 press line with 12px above it, and its bullets only
 * appear at <=568 (4px apart, directly under the slide) — at 569-767 the
 * pagination is empty.
 */
const VARIANT = {
  isdi: {
    card: 'relative flex w-[300px] items-center justify-between text-center max-md:w-full',
    title: 'text-base font-semibold text-white',
    press: 'pt-2 text-xs text-[#abaaaa]',
    bullets: 'flex items-center justify-center',
    bullet: 'mx-2',
  },
  base: {
    card: 'relative flex w-[355px] items-center justify-between text-center max-md:w-full',
    title: 'text-[18px] font-semibold leading-[27px] text-white',
    press: 'pt-3 text-[14px] leading-[21px] text-[#abaaaa]',
    bullets: 'hidden items-center justify-center max-mcm:flex',
    bullet: 'mx-1',
  },
};

function Card({ award, v }) {
  return (
    /* ref .aw-card (variant isdi / base) */
    <div className={v.card}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a 2KB laurel at its natural size */}
      <img src={award.image} alt="" width={award.imageWidth || 111} height={137} loading="lazy" className="block flex-none" />
      {/* ref .aw-text — absolutely positioned at its static position, i.e. vertically centred */}
      <div className="absolute left-0 top-1/2 w-full -translate-y-1/2">
        <div className={v.title}>{withBreaks(award.title)}</div>
        <div className={v.press}>{withBreaks(award.press)}</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={award.image} alt="" width={award.imageWidth || 111} height={137} loading="lazy" className="block flex-none [transform:rotateY(180deg)]" />
    </div>
  );
}

/* one award card on its own, for the marquee version of the band (/schools/isme/dr-indu-shahani) */
export function AwardCard({ award, variant = 'base' }) {
  return <Card award={award} v={VARIANT[variant] ?? VARIANT.base} />;
}

/* `tone` — the band colour: #193e90 on ISDI and ISME, `.awards.ugdx` #011627 on the uGDX homepage */
const BAND = { blue: 'bg-[#193e90]', ugdx: 'bg-[#011627]' };

export default function Awards({ data, variant = 'isdi', tone = 'blue' }) {
  const v = VARIANT[variant];
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
      <div data-block="awards" className={`block overflow-hidden py-[22px] ${BAND[tone] ?? BAND.blue}`}>
        {/* ref .swiper.mobile-swiper-cm */}
        <div className="relative z-[1] overflow-hidden">
          {/* ref section.swiper-wrapper.center */}
          <div className="relative z-[1] flex items-center justify-center gap-10">
            {items.map((award) => (
              <div key={award.title} className="relative flex-none overflow-clip">
                <Card award={award} v={v} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const loop = [...items, ...items, ...items];
  return (
    <div data-block="awards" className={`block overflow-hidden py-[22px] ${BAND[tone] ?? BAND.blue}`}>
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
              <Card award={award} v={v} />
            </div>
          ))}
        </div>

        {/* ref .swiper-pagination-white — the uGDX homepage's is authored empty (its Swiper init never
            targets it), so that band paints no bullets and is 10px shorter below 568 */}
        {tone !== 'ugdx' && <div className={v.bullets}>
          {items.map((award, i) => (
            <button
              key={award.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === real}
              onClick={() => go(count + i)}
              className={cx(
                'relative block rounded-full p-0',
                v.bullet,
                "before:absolute before:-inset-2.5 before:content-['']",
                i === real ? 'h-2.5 w-2.5 bg-white' : 'h-2 w-2 bg-[#eee] opacity-60',
              )}
            />
          ))}
        </div>}
      </div>
    </div>
  );
}
