'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * `.primary-tabs.w-tabs` under "Recognition that reflects our commitment"
 * (about-us/index.php:165-205). The panes are server-rendered and handed in; this
 * owns which one is showing, with Webflow's own transition for the widget
 * (`data-duration-out="100" data-duration-in="300" data-easing="ease"`).
 *
 * The same widget as the ISDI homepage's programme tabs, on its `isme-link`
 * classes — which differ in colour and type:
 *
 *                     >=768px                         <=767px
 *   menu              32px/1.5 500, row, scrolls      top-aligned
 *   link              px30 py9, #222 400;             px12, 22px/1.5; the
 *                     current #18429f with an 8px     MoU / UGC / AIU labels sit
 *                     #18429f bottom border, 500      in `.tab-text-isme` at 18px
 *                     (400 on the AIU tab, whose
 *                     `.isdi.w--current` rule sets
 *                     no weight)
 *   content           2px #1a1a1a top rule, pt40,     pt20
 *                     `top: -4px`, clipped
 *
 * Links are `<button>`s (they switch a pane); a flex column keeps the label at the
 * top of the stretched row as the reference's `<a>` does.
 */
export default function RecognitionTabs({ tabs, panes, initial = 0 }) {
  const [current, setCurrent] = useState(initial);
  const [shown, setShown] = useState(initial);
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
      {/* ref .primary-tabs-menu */}
      <div
        role="tablist"
        className="relative z-[1] flex overflow-auto text-[32px] font-medium leading-[1.5] max-md:items-start max-md:justify-start"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            id={`isdi-recognition-tab-${i}`}
            aria-selected={i === current}
            aria-controls={`isdi-recognition-pane-${i}`}
            onClick={() => select(i)}
            className={cx(
              'relative flex max-w-full flex-none cursor-pointer flex-col items-start justify-start bg-transparent px-[30px] py-[9px] text-left align-top',
              'max-md:px-3 max-md:text-[22px] max-md:leading-[1.5]',
              i === current
                ? cx(
                    'border-0 border-b-8 border-solid border-[#18429f] text-[#18429f]',
                    tab.currentWeight === 400 ? 'font-normal' : 'font-medium'
                  )
                : 'font-normal text-[#222]'
            )}
          >
            <div className={tab.smallText ? 'max-md:text-[18px] max-md:leading-[1.5]' : undefined}>{tab.label}</div>
          </button>
        ))}
      </div>

      {/* ref .primary-tabs-content */}
      <div className="relative -top-1 overflow-hidden border-0 border-t-2 border-solid border-[#1a1a1a] pt-10 max-md:pt-5">
        {panes.map((pane, i) => (
          <div
            key={tabs[i].label}
            role="tabpanel"
            id={`isdi-recognition-pane-${i}`}
            aria-labelledby={`isdi-recognition-tab-${i}`}
            hidden={i !== shown}
            className={cx(
              'relative transition-opacity',
              visible ? 'opacity-100 duration-300 ease-[ease]' : 'opacity-0 duration-100 ease-[ease]'
            )}
          >
            {pane}
          </div>
        ))}
      </div>
    </div>
  );
}
