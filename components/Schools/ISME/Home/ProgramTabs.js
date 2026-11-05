'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import { CONTAINER } from '@/components/Home/SectionHead';

/**
 * ISME `.primary-tabs` — the Webflow tab widget under "Build Your Degree. Design Your Future."
 * (reference/schools/isme/index.php). The same widget as the ISDI homepage's
 * (`Schools/ISDI/Home/ProgramTabs`), with two measured differences and one structural one:
 *
 *   current link   #193e90 with an 8px #193e90 bottom border (`.primary-tabs-link-blue-*`);
 *                  idle links are #222 and keep weight 500 (ISDI's drop to 400)
 *   panes          each holds a `.swiper.common-swiper` whose slides run past `.container`
 *                  (`overflow: visible`), so the strip and the 2px rule sit in the container and
 *                  the panes are rendered beside it as full-width carousels — the same split the
 *                  ATLAS homepage testimonials make (`PillTabStrip` + `Carousel`)
 *
 *                     >=768px                         <=767px
 *   menu              32px/48, a stretched row         items start, label 16/24
 *   link              px30 py9                          the idle link is 42 tall
 *   content           2px #1a1a1a rule, pt40, top -4   pt20
 *
 * Switching reproduces Webflow's transition (`data-duration-out="100" data-duration-in="300"`).
 */
/* `contentPadFixed` — department-of-finance restates `.primary-tabs-content { padding-top: 40px }` after the
   sheet with no media query, so the content keeps 40 below 768 */
export default function ProgramTabs({ labels, panes, idBase = 'isme-programs', contentPadFixed = false }) {
  const [current, setCurrent] = useState(0);
  const [shown, setShown] = useState(0);
  const [visible, setVisible] = useState(true);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const select = (i) => {
    if (i === current) return;
    setCurrent(i);
    setVisible(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(i);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, 100);
  };

  return (
    <div className="relative">
      <div className={CONTAINER}>
        {/* ref .primary-tabs-menu */}
        <div
          role="tablist"
          className="relative z-[1] flex overflow-auto text-[32px] font-medium leading-[1.5] max-md:items-start max-md:justify-start"
        >
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              id={`${idBase}-tab-${i}`}
              aria-selected={i === current}
              aria-controls={`${idBase}-pane-${i}`}
              onClick={() => select(i)}
              className={cx(
                'relative flex max-w-full cursor-pointer flex-col items-start justify-start bg-transparent px-[30px] py-[9px] text-left align-top font-medium',
                i === current
                  ? 'border-0 border-b-8 border-solid border-[#193e90] text-[#193e90]'
                  : 'text-[#222]',
              )}
            >
              <div className="max-md:text-base">{label}</div>
            </button>
          ))}
        </div>
        {/* ref .primary-tabs-content — its rule and top padding; the panes follow, full width */}
        <div className={contentPadFixed ? 'relative -top-1 border-0 border-t-2 border-solid border-[#1a1a1a] pt-10' : 'relative -top-1 border-0 border-t-2 border-solid border-[#1a1a1a] pt-10 max-md:pt-5'} />
      </div>
      {panes.map((pane, i) => (
        <div
          key={labels[i]}
          role="tabpanel"
          id={`${idBase}-pane-${i}`}
          aria-labelledby={`${idBase}-tab-${i}`}
          hidden={i !== shown}
          className={cx(
            'relative -top-1 transition-opacity',
            visible ? 'opacity-100 duration-300 ease-[ease]' : 'opacity-0 duration-100 ease-[ease]',
          )}
        >
          {pane}
        </div>
      ))}
    </div>
  );
}
