'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION } from '../Home/ui';
import HeadWrap from './HeadWrap';

/**
 * "Eligibility" — `.head-wrap.mrgbtm32.isdi` over three
 * `.accordion-item-blue-fill.w-dropdown`s.
 *
 * These are Webflow **dropdowns**, the same widget the B.Des pages' elective lists use, not
 * Bootstrap accordions: the markup renders them open and `webflow.js` collapses each to its
 * toggle on load. Unlike the elective dropdowns there is no IX2 action list pinning a closed
 * height — the toggle is simply the whole item when the list is closed — so they open and
 * close cleanly and all three start closed.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   item              relative, clipped, stacked flush — 80px apart, no gap
 *   toggle            #193e90, r16, h80, p 20/0/20/42,     pl12
 *                     space-between, centred
 *   title             18px/1.5 700 white, pr40             16px
 *   icon              absolute, 24px white, inset 28/20
 *   body              `.content-blue-fill` p24; its `<p>`s are 16px/1.5 with
 *                     `margin-bottom: 10px` (Webflow's own, which Preflight zeroes). The
 *                     copy travels as an array of paragraphs, as every other rich block in
 *                     this project does — never as raw HTML.
 */
const CHEVRON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="h-6 w-6">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Eligibility({ data }) {
  const [open, setOpen] = useState(null);

  return (
    <section data-block="eligibility" id="eligibility" className={cx(SECTION, 'overflow-hidden')}>
      <div className={CONTAINER}>
        <HeadWrap heading={data.heading} button={data.button} align="mrgbtm32" />

        {/* the items stack with NO gap — they are 80px apart on the reference */}
        <div className="flex flex-col">
          {data.items.map((item, i) => (
            /* ref .accordion-item-blue-fill.w-dropdown */
            <div key={item.title} className="relative overflow-hidden">
              {/* ref .accordion-toggle-blue-fill.isdi */}
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
                className="relative flex h-20 w-full max-w-full items-center justify-between rounded-2xl bg-[#193e90] py-5 pl-[42px] pr-0 text-left text-[#222] max-md:pl-3"
              >
                {/* ref .accordion-title-blue-fill */}
                <span className="pr-10 text-[18px] font-bold leading-[1.5] text-white max-md:text-base">
                  {item.title}
                </span>
                {/* ref .accordion-icon.white */}
                <span
                  className={cx(
                    'absolute right-5 top-7 text-[24px] font-bold text-white transition-transform',
                    open === i && 'rotate-180'
                  )}
                >
                  {CHEVRON}
                </span>
              </button>

              {open === i && (
                /* ref nav.accordion-content-blue-fill > .content-blue-fill.w-richtext */
                <div className="p-6">
                  {item.body.map((para, j) => (
                    /* ref .content-blue-fill > p — Webflow's own `margin-bottom: 10px`,
                       which Preflight zeroes, so it is restated */
                    <p key={`${j}-p`} className="mb-2.5 last:mb-0">
                      {withBreaks(para)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
