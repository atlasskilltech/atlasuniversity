'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import SearchQuestion from '@/components/About/SearchQuestion';
import { CONTAINER, H2, SECTION } from '@/components/Home/SectionHead';
import { ismeSearch } from '@/lib/schools/isme/home/hero';

/**
 * The closing block of reference/schools/isme/programs/postgraduate/postgraduate-programs.php
 * (lines ~1140-1370) — the only ISME page that authors its FAQ as a Webflow CMS dropdown list rather
 * than the Bootstrap accordion every other ISME page uses:
 *
 *   section.section > .container > (h2.h2-tag.mrg16,
 *     .faq-button-wrap   (display: none — not rendered),
 *     .collection-list-wrapper-3 > .w-dyn-item > .accordion-item.w-dropdown,
 *     .view-more-faq     (display: none — not rendered),
 *     .search-ques-wrap  (more-questions.php, nested in this container))
 *
 * Measured on production at 1440 / 390:
 *   .accordion-item    80px closed (inline `height: 80px`), clipped, border-bottom 2px #eee
 *   .accordion-toggle  flex, space-between, centred, h80
 *   .accordion-title   Manrope 24px/1.2 400 rgba(43,43,43,.8), mr50; 16px/1.2 600 at <=767
 *   .accordion-icon    the webflow-icons chevron, 24px #507fff (18px at <=767), vertically centred,
 *                      2px inside the right edge. Drawn as an inline SVG: the project does not ship
 *                      the Webflow icon font.
 *   .content           padding 0 24 24 0; 16px/24 #333, 14px/21 at <=767
 *
 * The page loads the Tailwind Play CDN, whose Preflight wins over Webflow's richtext defaults: the
 * answers' paragraphs and lists have no margins, no indent and no markers (measured). That is exactly
 * this project's Preflight, so the nodes render with no list or paragraph styling at all.
 *
 * A Webflow dropdown closes when anything outside it is clicked, so opening one closes the other:
 * single-open.
 */
function Rich({ nodes }) {
  return nodes.map((n, i) => {
    if (typeof n === 'string') return n;
    if (n.t === 'br') return <br key={i} />;
    const kids = n.c ? <Rich nodes={n.c} /> : null;
    if (n.t === 'a')
      return (
        <a key={i} href={n.href} className="text-inherit">
          {kids}
        </a>
      );
    const Tag = n.t;
    return <Tag key={i}>{kids}</Tag>;
  });
}

function Chevron({ open }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'pointer-events-none mr-0.5 flex h-6 w-6 flex-none items-center justify-center text-[#507fff] transition-transform duration-200 max-md:h-[18px] max-md:w-[18px]',
        open && 'rotate-180'
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function WfFaq({ data, block = 'faq' }) {
  const [open, setOpen] = useState(null);
  return (
    <section data-block={block} id={data.id || undefined} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, 'mb-4 max-md:mb-2')}>{data.heading}</h2>
        <div role="list">
          {data.items.map((item, i) => {
            const isOpen = open === i;
            return (
              /* ref .w-dyn-item > .accordion-item */
              <div key={i} role="listitem" className="relative overflow-hidden border-0 border-b-2 border-solid border-[#eee]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex h-[78px] w-full cursor-pointer items-center justify-between border-0 bg-transparent p-0 text-left"
                >
                  <span className="mr-[50px] text-[24px] font-normal leading-[1.2] text-[rgba(43,43,43,0.8)] max-md:text-[16px] max-md:font-semibold">
                    {item.q}
                  </span>
                  <Chevron open={isOpen} />
                </button>
                {isOpen && (
                  /* ref nav.accordion-content > .content.w-richtext */
                  <div className="pb-6 pr-6 text-[16px] leading-[24px] text-[#333] max-md:text-[14px] max-md:leading-[21px]">
                    <Rich nodes={item.a} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* ref .search-ques-wrap — the more-questions panel, with its own 40px top padding */}
        <div className="pt-10">
          <SearchQuestion data={ismeSearch} variant="blue" />
        </div>
      </div>
    </section>
  );
}
