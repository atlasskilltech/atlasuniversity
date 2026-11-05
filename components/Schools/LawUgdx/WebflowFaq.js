'use client';

import { useState } from 'react';
import { CONTAINER, H2, SECTION } from '@/components/Home/SectionHead';
import SearchQuestion from '@/components/About/SearchQuestion';
import RichText from '@/components/Statutory/RichText';
import { cx } from '@/lib/cx';

/**
 * "Questions? We can read your mind" as reference/ugdx/admissions/ugdx-admissions.php authors it inline —
 * NOT the shared Bootstrap `Home/FAQ` that every other Law / uGDX page includes, but a Webflow CMS list of
 * `.accordion-item.w-dropdown`s, followed in the same container by the `more-questions.php` panel:
 *
 *   section.section#faq > .container > (h2.h2-tag.mrg16,
 *     .faq-button-wrap   "All" / "For Parents" / "For Non-Mumbai Applicants" — display: none, not rendered
 *     .w-dyn-list > 15 x .accordion-item,
 *     .view-more-faq     display: none, not rendered
 *     .search-ques-wrap  padding-top 40, the panel in uGDX's `$chatBxVariant`)
 *
 * Measured on production at 1440 / 767 / 390:
 *   .accordion-item     80 tall closed, 2px #eee bottom rule, clipped
 *   .accordion-toggle   h80, space-between, items-center, #222
 *   .accordion-title    24px/1.2 rgba(43,43,43,.8), mr 50 (16px 600 at <=767)
 *   .accordion-icon     webflow-icons' chevron — the font is not loaded here, so an inline SVG of the same
 *                       24px box (18 at <=767) in #507fff, absolute, vertically centred, 2px from the right
 *                       edge; it turns 180deg open
 *   .content.w-richtext padding 0 24 24 0, 16px/24 #333 (14px/21 at <=767); <p> mb 10, <ul> pl 40 mb 10
 *
 * Webflow's dropdown closes every other open dropdown, so this is single-open.
 */
function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.list) {
      const L = b.list === 'ol' ? 'ol' : 'ul';
      return (
        <L key={i} className={cx('mb-2.5 mt-0 pl-10', L === 'ol' ? 'list-decimal' : 'list-disc')}>
          {b.items.map((it, k) => <li key={k}><RichText runs={it} /></li>)}
        </L>
      );
    }
    return <p key={i} className="mb-2.5 mt-0"><RichText runs={b.runs} /></p>;
  });
}

function Item({ item, open, onToggle, id }) {
  return (
    <div className={cx('relative block w-full overflow-hidden border-0 border-b-2 border-solid border-[#eee]', !open && 'h-20')}>
      <button
        type="button"
        id={`${id}-q`}
        aria-expanded={open}
        aria-controls={`${id}-a`}
        onClick={onToggle}
        className="relative flex h-20 w-full items-center justify-between border-0 bg-transparent p-0 text-left text-base leading-[1.2] text-[#222]"
      >
        <span className="mr-[50px] text-2xl font-normal leading-[1.2] text-[rgba(43,43,43,0.8)] max-md:text-base max-md:font-semibold max-md:leading-[1.2]">
          {item.q}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={cx('absolute right-0.5 top-1/2 h-6 w-6 -translate-y-1/2 text-[#507fff] transition-transform max-md:h-[18px] max-md:w-[18px]', open && 'rotate-180')}
        >
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" />
        </svg>
      </button>
      <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} hidden={!open} className="pb-6 pr-6 text-base text-[#333] max-md:text-[14px] max-md:leading-[1.5]">
        <Blocks blocks={item.blocks} />
      </div>
    </div>
  );
}

export default function WebflowFaq({ data, search, searchVariant = 'ugdx', block = 'faq' }) {
  const [open, setOpen] = useState(null);
  return (
    <section data-block={block} id="faq" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{data.heading}</h2>
        <div>
          {data.items.map((item, i) => (
            <Item key={i} id={`${block}-${i}`} item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
        {search && (
          <div className="pt-10">
            <SearchQuestion data={search} variant={searchVariant} />
          </div>
        )}
      </div>
    </section>
  );
}
