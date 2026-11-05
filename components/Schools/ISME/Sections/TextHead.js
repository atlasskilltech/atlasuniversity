'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import { SECTION } from '@/components/Home/SectionHead';

/*
 * `section > .common-text-head` (/schools/isme/life@atlas-isme) — a 391 x 398 photograph beside three
 * words, measured at 1440 / 390:
 *   .common-text-head   flex, start, centred, gap 48; at <=767 wraps, centred, pr16, relative
 *   img.comm-hd-image   intrinsic (391 x 398); at <=767 `flex: 1`, max-width 100%
 *   .div-block-37       block; at <=767 `position: absolute` with no offsets, so it sits at its
 *                       static position — centred over the photograph by the wrapping flex row
 *   .comm-hd-text       64px/1.2 500 #0b2b73; 42px at <=767 and 32px at <=479 (`.big-com-txt`)
 *
 * Each word is a Webflow SCROLL_INTO_VIEW interaction (30% offset): it starts at opacity 0 and 100px
 * down, and rises to place over 1000ms `outQuart`, after 80 / 120 / 40ms. Reproduced with an
 * IntersectionObserver; with reduced motion the words are simply shown (`motion-reduce:`).
 */
const DELAYS = [80, 120, 40];

export default function TextHead({ data }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -30% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section data-block="text-head" className={SECTION}>
      <div className="flex items-center justify-start gap-12 max-md:relative max-md:flex-wrap max-md:justify-center max-md:pr-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.image.src} alt={data.image.alt || ''} loading="lazy" className="block max-w-full max-md:flex-1" />
        <div ref={ref} className="max-md:absolute">
          {data.words.map((w, i) => (
            <div
              key={i}
              className={cx(
                'text-[64px] font-medium leading-[1.2] text-[#0b2b73] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.165,0.84,0.44,1)] max-md:text-[42px] max-sm:text-[32px] motion-reduce:transition-none',
                shown ? 'translate-y-0 opacity-100' : 'translate-y-[100px] opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
              )}
              style={{ transitionDelay: `${DELAYS[i] ?? 0}ms` }}
            >
              {w}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
