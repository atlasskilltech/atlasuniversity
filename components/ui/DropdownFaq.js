'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import SearchQuestion from '@/components/About/SearchQuestion';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Questions? We can read your mind" — the Webflow-dropdown FAQ three ATLAS pages author in place
 * of the Bootstrap accordion `Home/FAQ` renders: /atlas-alumni-corner, /atlas-hei-relationship
 * and /atlas-industry-partnership.
 *
 *   section.section > .container > (h2.h2-tag.mrg16,
 *     .faq-button-wrap   (display: none — not rendered),
 *     .w-dyn-list > N x .accordion-item.w-dropdown,
 *     .view-more-faq     (display: none — not rendered),
 *     .search-ques-wrap  (padding-top 40) > more-questions.php)
 *
 * It is a different widget from `Home/FAQ`, not a reskin of it, so the "one FAQ design" rule does
 * not fold it in: the markup, the item box and the icon are all Webflow's.
 *
 * Measured on production (/atlas-alumni-corner) at 1440 / 767 / 390:
 *   .accordion-item     height 80 (an authored `style="height:80px"`, border-box) and clipped,
 *                       border-bottom 2px #eee; open, it is as tall as its contents
 *                       (80 + 82 + 2 = 164 for a two-line answer at 1440)
 *   .accordion-toggle   80 tall, space-between, items-center, no padding
 *   .accordion-title    24px/1.2 400 rgba(43,43,43,.8), margin-right 50, clamped to two
 *                       lines → 16px/1.2 600 at <=767
 *   .accordion-icon     webflow-icons U+E603 (a chevron) 24px #507fff, absolutely placed 2px in
 *                       from the right and centred → 18px at <=767; rotated 180deg when open.
 *                       The icon font is Webflow's own and is not loaded here, so the chevron
 *                       is an inline SVG at the same box.
 *   .content.w-richtext padding 0 24 24 0; p 16px/24 #333 margin-bottom 10 → 14px/21 at <=767
 * Single-open: opening an item closes the open one (verified on production).
 */

/* `.accordion-icon.blue` (/atlas-alumni-corner) is #507fff and drops to 18px at <=767;
   `.accordion-icon.ugdx-org` (/atlas-hei-relationship) is #cb5827 and stays 24px at every width. */
const ICON = {
  blue: 'text-[#507fff] max-md:h-[18px] max-md:w-[18px]',
  'ugdx-org': 'text-[#cb5827]',
};

function Chevron({ open, icon }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'pointer-events-none absolute right-[2px] top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center',
        ICON[icon],
        open && 'rotate-180',
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path d="M5 8.5l7 7 7-7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ref .content.w-richtext — a string is one paragraph, an array is several. */
function Answer({ a }) {
  return (Array.isArray(a) ? a : [a]).map((p, i) => (
    <p key={i} className="mb-2.5 text-[16px] leading-6 text-[#333] max-md:text-[14px] max-md:leading-[21px]">{p}</p>
  ));
}

function Item({ item, open, onToggle, icon }) {
  return (
    /* ref .accordion-item.w-dropdown */
    <div className={cx('relative overflow-hidden border-0 border-b-2 border-solid border-[#eee]', !open && 'h-20')}>
      {/* ref .accordion-toggle.w-dropdown-toggle */}
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="relative flex h-20 w-full items-center justify-between border-0 bg-transparent p-0 text-left"
      >
        <Chevron open={open} icon={icon} />
        {/* ref .accordion-title */}
        {/* `-webkit-line-clamp: 2` with overflow hidden — a three-line question ends in an
            ellipsis on its second line (visible below 768) */}
        <span className="mr-[50px] line-clamp-2 text-[24px] font-normal leading-[1.2] text-[rgba(43,43,43,0.8)] max-md:text-[16px] max-md:font-semibold">
          {item.q}
        </span>
      </button>
      {/* ref nav.accordion-content.w-dropdown-list */}
      {open && (
        <div className="pb-6 pr-6">
          <Answer a={item.a} />
        </div>
      )}
    </div>
  );
}

export default function DropdownFaq({ data, search, searchVariant = 'blue', icon = 'blue' }) {
  const [open, setOpen] = useState(null);
  return (
    /* ref section.section */
    <section id="faq" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{data.heading}</h2>
        {/* ref .w-dyn-list > .w-dyn-items */}
        <div>
          {data.items.map((item, i) => (
            <Item key={i} item={item} icon={icon} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
        {/* ref .search-ques-wrap */}
        {search !== null && (
          <div className="pt-10">
            <SearchQuestion data={search} variant={searchVariant} />
          </div>
        )}
      </div>
    </section>
  );
}
