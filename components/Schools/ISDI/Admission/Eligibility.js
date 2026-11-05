'use client';

import { Fragment, useState } from 'react';
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
 *                     `margin-bottom: 10px` (Webflow's own, which Preflight zeroes), and a
 *                     `<ul>`/`<ol>` is `margin-bottom: 10px; padding-left: 40px`,
 *                     disc/decimal outside, with `<li>`s that carry no margin and no inner
 *                     `<p>`. Measured on the B.Tech reference with every dropdown forced
 *                     open — all of it is zeroed by Preflight, so all of it is restated.
 *
 * The copy travels as an ordered list of blocks — a plain string is a paragraph,
 * `{ list, items }` is a list — never as raw HTML, the same shape `components/Home/FAQ`
 * uses for its answers. A page whose bodies are all paragraphs (B.Des) is unaffected.
 */
const CHEVRON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="h-6 w-6">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* a dropdown's contents: a plain string is a paragraph, `{ list, items }` is a list */
function Body({ blocks }) {
  return blocks.map((block, i) =>
    typeof block === 'string' ? (
      /* ref .content-blue-fill > p — Webflow's own `margin-bottom: 10px`, which
         Preflight zeroes, so it is restated */
      <p key={`${i}-p`} className="mb-2.5 last:mb-0">
        {withBreaks(block)}
      </p>
    ) : (
      /* ref .content-blue-fill > ul / ol — `margin-bottom: 10px; padding-left: 40px`,
         disc or decimal, outside. The `<li>`s carry no margin of their own. */
      <ListTag
        key={`${i}-${block.list}`}
        tag={block.list}
        className={cx(
          'mb-2.5 list-outside pl-10 last:mb-0',
          block.list === 'ol' ? 'list-decimal' : 'list-disc'
        )}
      >
        {block.items.map((li, j) => (
          <li key={`${j}-li`}>{withBreaks(li)}</li>
        ))}
      </ListTag>
    )
  );
}

function ListTag({ tag, children, ...rest }) {
  const Tag = tag === 'ol' ? 'ol' : 'ul';
  return <Tag {...rest}>{children}</Tag>;
}

/*
 * The second shape this block takes. B.Des and B.Tech author three dropdowns; the M.Des
 * Admissions page authors no dropdown at all — just two `.ln-bd-txt` paragraphs under the
 * same `.head-wrap.mrgbtm32`.
 *
 * `.ln-bd-txt` declares nothing of its own that differs from the page: measured 16px/24,
 * weight 400, Poppins, #333, no margin and no padding — the ISDI body type. Its `<strong>`
 * runs are bold, and it carries authored `<br>`s and `•` bullet characters.
 */
function RichText({ blocks }) {
  return blocks.map((runs, i) => (
    /* ref .ln-bd-txt */
    <div key={`${i}-t`}>
      {runs.map((run, j) =>
        typeof run === 'string' ? (
          <Fragment key={`${j}-s`}>{withBreaks(run)}</Fragment>
        ) : (
          /* the parent is 400, so Preflight's relative `bolder` would land on 700 anyway —
             stated explicitly, as every other `<strong>` in this project is */
          <strong key={`${j}-b`} className="font-bold">
            {withBreaks(run.strong)}
          </strong>
        )
      )}
    </div>
  ));
}

export default function Eligibility({ data }) {
  const [open, setOpen] = useState(null);

  if (data.text) {
    const body = (
      <div>
        <RichText blocks={data.text} />
      </div>
    );
    return (
      <section data-block="eligibility" id="eligibility" className={cx(SECTION, 'overflow-hidden')}>
        <div className={CONTAINER}>
          <HeadWrap heading={data.heading} button={data.button} align="mrgbtm32" />
          {/*
            ref .list-text-wrap — `display: flex; gap: 16px; justify-content: flex-start;
            align-items: center; margin-bottom: 32px`, around a single `<div>` that holds
            both `.ln-bd-txt` blocks. The MBA Admissions page authors it and the M.Des page
            does not, so it travels with the data — it is 32px of block height.
          */}
          {data.listWrap ? (
            <div className="mb-8 flex items-center justify-start gap-4">{body}</div>
          ) : (
            body
          )}
        </div>
      </section>
    );
  }

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
                  <Body blocks={item.body} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
