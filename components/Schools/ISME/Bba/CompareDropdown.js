'use client';

import { useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.acc-wrapper > .accordion-item-mint-fill.w-dropdown` — "Why our semester N curriculum outpaces
 * every other business school", under a semester's course list on the single-programme BBA pages
 * and the MBA pages.
 *
 * A Webflow dropdown whose animation is IX2, read off the live page
 * (`Webflow.require('ix2').store.getState().ixData`):
 *   a-18 "Accordion-open-mint-1"   height 175 -> auto over 500ms, icon rotateZ(180deg)
 *   a-19 "Accordion-close-mint-1"  height -> 175 over 100ms, icon back to 0
 * The markup authors the closed state inline (`style="height: 175px"`); the list is static and
 * always in the DOM, clipped by the item's `overflow: hidden`.
 *
 * Rules, from the page's sheet (measured at 1440 / 390 closed and open):
 *   item     1px solid rgba(238,238,238,.5) bottom rule, clipped
 *   toggle   #07f6a0, h175, flex space-between centred, pl42 pr80 (pl22 pr40 at <=767)
 *   title    18px/1.4 700 #2b2b2b pre-wrap (line-height 1.2 at <=767)
 *   lead     14px/1.5 300 black, pt4, pre-wrap (line-height 1.3 at <=767)
 *   icon     the Webflow-icons chevron, 18px black, absolutely centred with its right edge 32px
 *            inside the toggle (17 at <=767: `right: -18px` + `margin-right: 50 / 35`). The icon
 *            font is not loaded here, so the chevron is an inline SVG in the same 18px box.
 *   list     #d7d7d7, p32/40 (px22 + scroll at <=767)
 *   grid     3 x `1fr` — `minmax(auto, 1fr)`, NOT Tailwind's `minmax(0, 1fr)`: the cells' min-content
 *            widens the whole course column at 991-768 (474px against a 290px share), as upstream —
 *            on white, 1px black top/left; every cell 14px with a 1px black right/bottom
 *            rule — head #c7c7c7 600 p18/12/18/18, row head 600 p18/10/18/18, cell 400 p18/12/18/18
 */
const CLOSED = 175;

export default function CompareDropdown({ data }) {
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);
  const [listHeight, setListHeight] = useState(0);

  const toggle = () => {
    setListHeight(listRef.current?.offsetHeight ?? 0);
    setOpen((o) => !o);
  };

  return (
    /* ref .accordion-item-mint-fill.w-dropdown */
    <div
      className={cx(
        'relative z-0 block w-full overflow-hidden border-0 border-b border-solid border-[rgba(238,238,238,0.5)] text-left ease-linear',
        open ? 'transition-[height] duration-500' : 'transition-[height] duration-100'
      )}
      style={{ height: `${open ? CLOSED + listHeight : CLOSED}px` }}
    >
      {/* ref .accordion-toggle-mint-fill.w-dropdown-toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="relative flex h-[175px] w-full cursor-pointer items-center justify-between bg-atlas-mint pl-[42px] pr-20 text-left align-top text-[#222] max-md:pl-[22px] max-md:pr-10"
      >
        {/* ref .accord-title-wrap */}
        <span className="block flex-1 basis-0 max-md:w-full max-md:flex-[0_1_auto]">
          <span className="block whitespace-pre-wrap text-[18px] font-bold leading-[1.4] text-[#2b2b2b] max-md:leading-[1.2]">
            {data.title}
          </span>
          <span className="block whitespace-pre-wrap pt-1 text-[14px] font-light leading-[1.5] text-black max-md:leading-[1.3]">
            {data.text}
          </span>
        </span>
        {/* ref .accordion-icon.black.w-icon-dropdown-toggle */}
        <span
          aria-hidden
          className={cx(
            'absolute bottom-0 right-[-18px] top-0 my-auto mr-[50px] flex h-[18px] w-[18px] items-center justify-center text-black ease-linear max-md:mr-[35px]',
            open ? 'rotate-180 transition-transform duration-500' : 'transition-transform duration-100'
          )}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6.5L9 11.5L14 6.5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </span>
      </button>

      {/* ref nav.accordion-content-mint-fill.w-dropdown-list — static, clipped above */}
      <nav ref={listRef} className="block min-w-full bg-[#d7d7d7] px-10 py-8 max-md:overflow-auto max-md:px-[22px]">
        {/* ref .w-layout-grid.table-grid */}
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-0 border-0 border-l border-t border-solid border-black bg-white max-sm:overflow-auto">
          {data.head.map((h, i) => (
            <div key={`h${i}`} className="border-0 border-b border-r border-solid border-black bg-[#c7c7c7] py-[18px] pl-[18px] pr-3 text-left text-[14px] font-semibold">
              {withBreaks(h)}
            </div>
          ))}
          {data.rows.map((row, r) =>
            row.map((c, i) => (
              <div
                key={`${r}-${i}`}
                className={cx(
                  'border-0 border-b border-r border-solid border-black py-[18px] pl-[18px] text-left text-[14px]',
                  i === 0 ? 'pr-2.5 font-semibold' : 'pr-3 font-normal'
                )}
              >
                {withBreaks(c)}
              </div>
            ))
          )}
        </div>
      </nav>
    </div>
  );
}
