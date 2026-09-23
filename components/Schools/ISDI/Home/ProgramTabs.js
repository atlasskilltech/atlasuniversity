'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * `.primary-tabs` — the Webflow tab widget under "Our Programs"
 * (index.php:1667-1675). The panes are server-rendered and handed in; this only
 * owns which one is showing.
 *
 *                     >=768px                         <=767px
 *   menu              32px/48, weight 500, a stretched  items start, so the
 *                     row (both links 74px tall)        un-bordered link is 42
 *   link              px30 py9, #222 at 400;            label 16px/24
 *                     current #ec1376 at 500 with an
 *                     8px #ec1376 bottom border
 *   content           2px #1a1a1a top rule, pt40,       pt20
 *                     `top: -4px` so the current
 *                     link's border overlaps the rule
 *
 * Switching reproduces Webflow's own transition for this widget
 * (`data-duration-out="100" data-duration-in="300" data-easing="ease"`): the
 * outgoing pane fades out over 100ms, then the incoming one fades in over 300ms.
 *
 * The links are `<button>`s here (they switch a pane, they do not navigate), laid
 * out as a flex column because a button otherwise centres its label vertically in
 * the stretched 74px row, 4px below where the reference's `<a>` puts it.
 */
export default function ProgramTabs({ labels, panes }) {
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
      // two frames: let the un-hidden pane paint at opacity 0 before fading in
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
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            id={`isdi-programs-tab-${i}`}
            aria-selected={i === current}
            aria-controls={`isdi-programs-pane-${i}`}
            onClick={() => select(i)}
            className={cx(
              'relative flex max-w-full cursor-pointer flex-col items-start justify-start bg-transparent px-[30px] py-[9px] text-left align-top',
              i === current
                ? 'border-0 border-b-8 border-solid border-[#ec1376] font-medium text-[#ec1376]'
                : 'font-normal text-[#222]'
            )}
          >
            <div className="max-md:text-base">{label}</div>
          </button>
        ))}
      </div>

      {/* ref .primary-tabs-content */}
      <div className="relative -top-1 overflow-hidden border-0 border-t-2 border-solid border-[#1a1a1a] pt-10 max-md:pt-5">
        {panes.map((pane, i) => (
          <div
            key={labels[i]}
            role="tabpanel"
            id={`isdi-programs-pane-${i}`}
            aria-labelledby={`isdi-programs-tab-${i}`}
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
