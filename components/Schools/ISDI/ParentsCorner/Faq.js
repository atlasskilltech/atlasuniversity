'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import { CONTAINER, H2, H2_MB, SECTION } from '../Home/ui';
import MoreQuestions from '../About/MoreQuestions';

/**
 * "Questions? We can read your mind" — the FAQ on
 * reference/schools/isdi/parents-corner.php:965-end.
 *
 *   section.section > .container > (h2.h2-tag.mrg16.isdi,
 *     .faq-button-wrap  (display: none — NOT rendered),
 *     .w-dyn-list > 16 x .accordion-item.w-dropdown,
 *     .view-more-faq    (display: none — NOT rendered),
 *     .search-ques-wrap (the `more-questions.php` panel, nested here))
 *
 * A Webflow **single-open** dropdown accordion (verified on production: opening
 * one closes the other), NOT the shared Bootstrap `Home/FAQ`:
 *   .accordion-item     border-bottom 2px #eee, clipped
 *   .accordion-toggle   h80, space-between, items-center
 *   .accordion-title    24px/1.2 rgba(43,43,43,.8), mr50 (16px/600 <=767)
 *   .accordion-icon     webflow-icons chevron, 24px #ec1376 (not loaded here, drawn
 *                       as an inline SVG), rotates 180deg on open
 *   .accordion-content  block; .content.w-richtext padding 0 24 24 0
 *   p                   16px/24 #333, mb10
 *
 * The three `.faq-button-wrap` filter buttons ("All" / "For Parents" / "For
 * Non-Mumbai Applicants") and the "View More" row are both `display: none`
 * upstream, so neither is rendered.
 */
function Chevron({ open }) {
  return (
    <span
      className={cx(
        'pointer-events-none ml-2 shrink-0 text-[#ec1376] transition-transform duration-200',
        open && 'rotate-180'
      )}
      aria-hidden="true"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ref .content.w-richtext — a paragraph is `.text-[16px]/24 #333 mb10`; a list is
   `ul pl40 mb10` disc/outside with `li 16/24`. Preflight zeroes list styling, so
   it is restated. `a` is a plain string (one paragraph) or a block array. */
function Answer({ a }) {
  const blocks = typeof a === 'string' ? [a] : a;
  return blocks.map((b, i) =>
    typeof b === 'string' ? (
      <p key={i} className="mb-2.5 text-[16px] leading-[24px] text-[#333]">
        {b}
      </p>
    ) : (
      <ul key={i} className="mb-2.5 list-disc pl-10 text-[16px] leading-[24px] text-[#333]">
        {b.items.map((li, j) => (
          <li key={j}>{li}</li>
        ))}
      </ul>
    )
  );
}

function Item({ item, open, onToggle }) {
  return (
    /* ref .accordion-item */
    <div className="relative block w-full overflow-hidden border-0 border-b-2 border-solid border-[#eee]">
      {/* ref .accordion-toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex h-[78px] w-full items-center justify-between gap-2 border-0 bg-transparent p-0 text-left leading-[1.2]"
      >
        {/* ref .accordion-title */}
        <span className="text-[24px] font-normal leading-[1.2] text-[rgba(43,43,43,0.8)] max-md:text-[16px] max-md:font-semibold">
          {item.q}
        </span>
        <Chevron open={open} />
      </button>
      {/* ref nav.accordion-content > .content.w-richtext — a plain string is a single
          paragraph; two answers are `<p>` + `<ul>` + `<p>` (ul pl40, mb10, disc; li 16/24) */}
      {open && (
        <div className="block pb-6 pr-6">
          <Answer a={item.a} />
        </div>
      )}
    </div>
  );
}

export default function Faq({ data }) {
  const [open, setOpen] = useState(null);
  return (
    <section data-block="faq" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16.isdi */}
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        {/* ref .w-dyn-list > .accordion-item[] */}
        <div>
          {data.items.map((item, i) => (
            <Item key={i} item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
        {/* ref .search-ques-wrap — the more-questions panel, nested in this container */}
        <MoreQuestions data={data.moreQuestions} inline />
      </div>
    </section>
  );
}
