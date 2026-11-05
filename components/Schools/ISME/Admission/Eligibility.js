'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import ButtonRegular from '@/components/ui/ButtonRegular';
import Runs from '@/components/Schools/ISME/Bba/Runs';
import { CONTAINER, H2, SECTION } from '@/components/Home/SectionHead';

/**
 * ISME Admissions "Eligibility" — `section#eligibility(-bsc|-mba) > .container > (.head-wrap.mrgbtm32
 * | h2.h2-tag.mrg32 + .list-text-wrap) + N x .accordion-item-blue-fill.w-dropdown`.
 *
 * The same Webflow dropdown the ISDI Admissions pages use (`ISDI/Admission/Eligibility`), on the
 * ISME sheet, which differs in the toggle (square, not r16), the 1px rgba(238,238,238,.5) rule
 * under every item, the nowrap title above 479, the mint button and the section rhythm — so it is
 * drawn here rather than skinned there.
 *
 * Rules, from the page's sheet (measured at 1440 / 390, every dropdown forced open):
 *   .accordion-item-blue-fill   relative, clipped, 1px rgba(238,238,238,.5) bottom rule. The BBA
 *                               and MBA pages author `style="height:80px"` on each item (border
 *                               included); the B.Sc page authors neither (see the open state)
 *   .accordion-toggle-blue-fill #193e90, h80, p 20/0/20/42 (pl12 at <=767), space-between,
 *                               centred, `white-space: nowrap` (Webflow's toggle)
 *     title                     18px/1.5 700 white (16px at <=767); wraps with pr40 at <=479;
 *                               a `<strong>` inside it paints 900 (preflight's `bolder`)
 *     icon                      absolute, vertically centred, 24px white, right 22 + mr20
 *                               (right 0 at <=767)
 *   .content-blue-fill          p24; `<p>` and `<ul>` keep Webflow's 10px bottom margin (the last
 *                               one too), lists pl40 disc outside, `<li>` no margin; 16px/24 #333
 *   .list-text-wrap             (MBA) flex, gap 16, centred, mb32 — one `.ln-bd-txt` line
 */
const CHEVRON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="h-6 w-6">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* `bodyStyle`: 'webflow' (BBA — p / ul keep Webflow's 10px margin, lists pl40 disc) or 'preflight'
   (B.Sc, MBA — Tailwind's preflight wins: no margins, no indent, no markers). Measured per page. */
const BODY = {
  webflow: { p: 'mb-2.5', list: 'mb-2.5 list-outside pl-10', ul: 'list-disc', ol: 'list-decimal' },
  preflight: { p: 'mb-0', list: 'mb-0 pl-0', ul: 'list-none', ol: 'list-none' },
};

function Body({ blocks, style }) {
  const st = BODY[style] ?? BODY.webflow;
  return blocks.map((b, i) => {
    if (typeof b === 'string' || Array.isArray(b)) {
      return (
        <p key={i} className={st.p}>
          <Runs runs={b} />
        </p>
      );
    }
    const Tag = b.list === 'ol' ? 'ol' : 'ul';
    if (b.loose) {
      /* bare <li>s straight in the rich text (MBA): no list box around them, so no margin or
         indent — the marker hangs outside the 24px padding; `li.list-item-N` has none */
      return b.items.map((li, j) => (
        <li key={`${i}-${j}`} className={li.marker ? 'list-outside list-disc' : 'list-none'}>
          <Runs runs={li.runs} />
          {li.nested && (
            <ul className={cx(st.list, st.ul)}>
              {li.nested.map((n, k) => (
                <li key={k}>
                  <Runs runs={n} />
                </li>
              ))}
            </ul>
          )}
        </li>
      ));
    }
    return (
      <Tag key={i} className={cx(st.list, b.list === 'ol' ? st.ol : st.ul)}>
        {b.items.map((li, j) => (
          <li key={j}>
            <Runs runs={li} />
          </li>
        ))}
      </Tag>
    );
  });
}

/*
 * Open state. On the BBA and MBA pages each item carries `style="height:80px"` and an IX2
 * interaction animates it open and shut, so all start closed. The B.Sc page authors neither the
 * height nor a bound interaction: production renders every item OPEN and clicking does nothing
 * (verified — the toggles never change the height). The working dropdown the markup intends is
 * implemented here, starting from what production shows: unpinned items open.
 */
export default function Eligibility({ data }) {
  const [open, setOpen] = useState(() => new Set(data.items.flatMap((it, i) => (it.pinned ? [] : [i]))));
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <section data-block="eligibility" id={data.id ?? undefined} className={SECTION}>
      <div className={CONTAINER}>
        {data.headWrap ? (
          /* ref .head-wrap.mrgbtm32 — row, space-between, bottom-aligned; a stretched column at <=767 */
          <div className="mb-8 flex items-end justify-between max-md:flex-col max-md:items-stretch max-md:justify-start">
            {/* ref .tt-wrap */}
            <div className="max-md:mb-5 max-sm:mr-5">
              <h2 className={cx(H2, data.headingMods?.includes('mrg16') ? 'mb-4 max-md:mb-2' : 'mb-0')}>{data.heading}</h2>
            </div>
            {data.button && (
              <ButtonRegular href={data.button.href} variant="mint" newTab={data.button.newTab}>
                {data.button.label}
              </ButtonRegular>
            )}
          </div>
        ) : (
          <h2 className={cx(H2, data.headingMods?.includes('mrg32') ? 'mb-8' : 'mb-14 max-md:mb-8')}>{data.heading}</h2>
        )}
        {data.lead && (
          /* ref .list-text-wrap > .ln-bd-txt */
          <div className="mb-8 flex items-center justify-start gap-4">
            {data.lead.map((l, i) => (
              <div key={i}>
                <Runs runs={l} />
              </div>
            ))}
          </div>
        )}

        {data.items.map((item, i) => (
          /* ref .accordion-item-blue-fill.w-dropdown */
          <div
            key={i}
            className={cx(
              'relative overflow-hidden border-0 border-b border-solid border-[rgba(238,238,238,0.5)]',
              item.pinned && !open.has(i) && 'h-20'
            )}
          >
            {/* ref .accordion-toggle-blue-fill */}
            <button
              type="button"
              aria-expanded={open.has(i)}
              onClick={() => toggle(i)}
              className="relative flex h-20 w-full max-w-full items-center justify-between whitespace-nowrap bg-[#193e90] py-5 pl-[42px] pr-0 text-left max-md:pl-3"
            >
              {/* ref .accordion-title-blue-fill */}
              <span className="text-[18px] font-bold leading-[1.5] text-white max-md:text-base max-sm:flex-[0_1_auto] max-sm:whitespace-normal max-sm:pr-10">
                <Runs runs={item.title} />
              </span>
              {/* ref .accordion-icon.white */}
              <span
                className={cx(
                  'absolute bottom-0 right-[22px] top-0 my-auto mr-5 h-6 w-6 text-white transition-transform max-md:right-0',
                  open.has(i) && 'rotate-180'
                )}
              >
                {CHEVRON}
              </span>
            </button>
            {open.has(i) && (
              /* ref nav.accordion-content-blue-fill > .content-blue-fill.w-richtext */
              <div className="p-6 text-base leading-[1.5] text-[#333]">
                <Body blocks={item.body} style={data.bodyStyle} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

