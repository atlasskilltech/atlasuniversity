'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import SearchQuestion from '@/components/About/SearchQuestion';
import { CONTAINER, H2, SECTION } from '@/components/Home/SectionHead';
import Runs from './Runs';

/**
 * "Questions? We can read your mind" on the ISME MBA pages — `section.section > .container >
 * (h2.h2-tag.mrg16, .faq-button-wrap, .w-dyn-list > N x .accordion-item.w-dropdown,
 * .view-more-faq, .search-ques-wrap)`.
 *
 * A Webflow CMS list of dropdowns, not the Bootstrap accordion the BBA pages include: every MBA
 * page dumps the site's whole FAQ collection (98 items across "Home Page", "Admissions", "BSC
 * Finance", "Isdi Global", "Campus" …) and production shows all of them — the filter buttons
 * and the "View More" row are `display: none`. Transcribed as production serves it.
 *
 * IX2 `a-6` / `a-7` animate the item between its authored `height: 80px` and auto; opening one
 * closes the other (verified on the ISDI Parents Corner page, the same widget). Measured:
 *   item     2px #eee bottom rule, clipped; 80 tall closed (78 toggle + the rule)
 *   toggle   flex, space-between, centred, line-height 1.2
 *   title    24px/1.2 400 rgba(43,43,43,.8), mr50, clamped to two lines; 16px 600 at <=767
 *   icon     the Webflow-icons chevron, #507fff, 24px (18 at <=767), absolutely centred with its
 *            right edge 2px inside the toggle (`right: -18px` + `margin-right: 20px`); drawn as an
 *            inline SVG because the icon font is not loaded here
 *   content  pr24 pb24, 16px/1.5 (14px at <=767); p mb10; lists keep the UA indent and discs
 *   search   the `more-questions.php` panel nested in the same container, pt40
 */
function Answer({ a }) {
  return a.map((b, i) =>
    b && typeof b === 'object' && !Array.isArray(b) && b.list ? (
      <ul key={i} className={cx('mb-2.5 overflow-hidden pl-10', b.list === 'ol' ? 'list-decimal' : 'list-disc')}>
        {b.items.map((li, j) => (
          <li key={j}>
            <Runs runs={li} />
          </li>
        ))}
      </ul>
    ) : (
      <p key={i} className="mb-2.5 mt-0">
        <Runs runs={b} />
      </p>
    )
  );
}

function Item({ item, open, onToggle }) {
  return (
    /* ref .accordion-item.w-dropdown */
    <div className="relative block w-full overflow-hidden border-0 border-b-2 border-solid border-[#eee] text-left">
      {/* ref .accordion-toggle.w-dropdown-toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="relative flex h-[78px] w-full cursor-pointer items-center justify-between bg-transparent p-0 text-left leading-[1.2] text-[#222]"
      >
        {/* ref .accordion-icon.blue.w-icon-dropdown-toggle */}
        <span
          aria-hidden
          className={cx(
            'absolute bottom-0 right-[-18px] top-0 my-auto mr-5 flex h-6 w-6 items-center justify-center text-[#507fff] transition-transform duration-500 max-md:h-[18px] max-md:w-[18px]',
            open && 'rotate-180'
          )}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {/* ref .accordion-title */}
        <span className="mr-[50px] line-clamp-2 overflow-hidden text-[24px] font-normal leading-[1.2] text-[rgba(43,43,43,0.8)] max-md:text-[16px] max-md:font-semibold">
          {item.q}
        </span>
      </button>
      {open && (
        /* ref nav.accordion-content > .content.w-richtext */
        <div className="block pb-6 pr-6 text-[16px] leading-[1.5] text-[#333] max-md:text-[14px]">
          <Answer a={item.a} />
        </div>
      )}
    </div>
  );
}

export default function CmsFaq({ data, search }) {
  const [open, setOpen] = useState(null);
  return (
    <section data-block="faq" id="faq" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, 'mb-4 max-md:mb-2')}>{data.heading}</h2>
        {/* ref .w-dyn-list > .w-dyn-items */}
        <div role="list">
          {data.items.map((item, i) => (
            <div role="listitem" key={i}>
              <Item item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </div>
          ))}
        </div>
        {search && (
          /* ref .search-ques-wrap — pt40 */
          <div className="pt-10">
            <SearchQuestion data={search} variant="blue" />
          </div>
        )}
      </div>
    </section>
  );
}
