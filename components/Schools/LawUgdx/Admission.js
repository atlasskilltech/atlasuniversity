'use client';

import { Fragment, useState } from 'react';
import { CONTAINER, H2, SECTION, SUB_INNER_MRGBTM32 } from '@/components/Home/SectionHead';
import { DateStrip, KeyDatesTable } from '@/components/Admissions/KeyDates';
import ButtonRegular from '@/components/ui/ButtonRegular';
import RichText from '@/components/Statutory/RichText';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';
import { H2_MRG32 } from './Sections';

/*
 * The School of Law / uGDX admissions pages (reference/law/law-admissions.php,
 * reference/ugdx/admissions/ugdx-admissions.php): key dates, eligibility dropdowns and the fee strip,
 * read off the pages' own sheets and measured on production at 1440 / 991 / 767 / 479 / 390.
 */

/* ---- "Key Dates & Deadlines" — `h2.h2-tag.mrg32` over `.dates-fees-container-atlas >
 * .df-container-atlas[style="border: none"] > .table-responsive > table` from
 * `keydates/keydates-static/law.php`. The table is `Admissions/KeyDates`' renderer, unchanged.
 * uGDX's is `keydates/btech.php` — the database-driven six-card `.df-container-atlas` strip — which is
 * that component's `DateStrip`, also unchanged (`kind: 'strip'`). */
export function AdmissionKeyDates({ data, block = 'key-dates' }) {
  return (
    <section data-block={block} id="key-dates" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MRG32}>{data.heading}</h2>
        {data.blocks.map((b, i) => (b.kind === 'strip' ? <DateStrip key={i} block={b} /> : <KeyDatesTable key={i} block={b} />))}
      </div>
    </section>
  );
}

/* ---- "Eligibility" — `.head-wrap.mrgbtm32` (the h2 and a `.button-regular`), `.list-text-wrap`
 * (`.ln-bd-txt`, a <strong> label then text; mb 32), then Webflow dropdowns:
 *   .accordion-item-blue-fill    authored `height: 80px`, clipped, 1px #eeeeee80 bottom rule; the
 *                                IX2 interaction opens it to its content height
 *   .accordion-toggle-blue-fill  80 tall, the tone's colour, padding-left 42 (12 at <=767), space-between
 *   .accordion-title-blue-fill   18px 700 white (16px at <=767; pr 40 at <=479)
 *   .w-icon-dropdown-toggle      the Webflow icon font's chevron (not loaded here, so an inline SVG of
 *                                the same 1em box), absolute, margin-right 20, `.white` right 22 (0 at
 *                                <=767); it turns 180deg when open
 *   .content-blue-fill           padding 24; <p> mb 10, <ul> padding-left 40 / mb 10, <strong> 700 */
const TOGGLE = { law: 'bg-[#322a3b]', ugdx: 'bg-[#011627]', blue: 'bg-[#193e90]' };

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

function Dropdown({ item, tone }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cx('relative z-0 block w-full overflow-hidden border-0 border-b border-solid border-[#eeeeee80]', !open && 'h-20')}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cx('relative flex h-20 w-full max-w-full items-center justify-between pl-[42px] pr-0 text-left max-md:pl-3', TOGGLE[tone])}
      >
        <div className="text-lg font-bold text-white max-md:text-base max-sm:pr-10">{item.title}</div>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={cx('absolute bottom-0 right-[22px] top-0 my-auto mr-5 h-6 w-6 text-white transition-transform max-md:right-0', open && 'rotate-180')}
        >
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" />
        </svg>
      </button>
      <div className="relative block bg-transparent">
        <div className="p-6 text-white">
          <Blocks blocks={item.blocks} />
        </div>
      </div>
    </div>
  );
}

export function AdmissionEligibility({ data, tone = 'law', block = 'eligibility' }) {
  return (
    <section data-block={block} id="eligibility" className={SECTION}>
      <div className={CONTAINER}>
        <div className="mb-8 flex items-end justify-between max-md:flex-col max-md:items-stretch max-md:justify-start">
          <div className="flex-[0_1_auto] max-md:mb-5 max-sm:mr-5">
            <h2 className={H2}>{data.heading}</h2>
          </div>
          {data.button && (
            <ButtonRegular href={data.button.href} newTab external variant={data.button.variant}>{data.button.label}</ButtonRegular>
          )}
        </div>
        {data.note && (
          <div className="mb-8 flex items-center justify-start gap-4">
            <div><RichText runs={data.note} /></div>
          </div>
        )}
        {/* uGDX authors a second, EMPTY `.list-text-wrap` — still a flex box with its 32px bottom margin */}
        {Array.from({ length: data.emptyWraps ?? 0 }, (unused, i) => <div key={`w${i}`} className="mb-8 flex" />)}
        {data.items.map((item) => <Dropdown key={item.title} item={item} tone={tone} />)}
      </div>
    </section>
  );
}

/* ---- "Fee Structure" — `h2.h2-tag.mrg16` + `.sub-heading.mrgbtm32` over a `.df-container-atlas` strip:
 * a 1px #18429f frame, radius 32px 0, clipped, a flex row (a column at <=767). Each `.df-card` is
 * flex 1, a start-aligned column, padding 25 (18 25 at <=767), a 1px #0000001a left rule,
 * `justify-content: space-around` until 1440, where the sheet flips it to flex-start. The lead card
 * is the tone's panel with white text: `.df-text-2.atlas` 18px 700, a `.df-txt-wrap` holding the
 * figure and a 14px note (pb 12), and the polygon notch (`img.image-8`, absolute 22px down, 16px past
 * the right edge; hidden at <=767). The other cards: `.df-text-2.f14` 14px pb 12 over a
 * `.df-text-1.f18` 18px/1.4 700 (mb 4) figure. */
const LEAD = { law: 'bg-[#322a3b]', ugdx: 'bg-[#011627]' };
const DF_CARD = 'flex flex-[1_1_0%] flex-col items-start justify-around border-0 border-l border-solid border-[#0000001a] p-[25px] 2xl:justify-start max-md:py-[18px]';

export function FeeStrip({ data, tone = 'law', block = 'fee-structure' }) {
  return (
    <section data-block={block} id="fee-structure" className={SECTION}>
      <div id={data.anchor} className={CONTAINER}>
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{data.heading}</h2>
        <div className={SUB_INNER_MRGBTM32}>{withBreaks(data.sub)}</div>
        <div className="flex h-auto w-full overflow-hidden rounded-tl-[32px] rounded-br-[32px] border border-solid border-[#18429f] max-md:relative max-md:flex-col max-md:overflow-auto">
          <div className={cx(DF_CARD, 'relative text-white', LEAD[tone])}>
            <div className="text-lg font-bold">{data.lead.title}</div>
            <div>
              <div className="text-lg font-bold">{data.lead.value}</div>
              <div className="pb-3 text-[14px]">{data.lead.note}</div>
            </div>
            {data.lead.arrow && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={data.lead.arrow} alt="" loading="lazy" className="absolute -right-4 top-[22px] flex-none max-md:hidden" />
            )}
          </div>
          {data.cards.map((c) => (
            <div key={c.label} className={DF_CARD}>
              <div className="pb-3 text-[14px]">{c.label}</div>
              <div className="mb-1 text-lg font-bold leading-[1.4]">
                {c.strong ? <strong className="font-bold">{c.value}</strong> : <Fragment>{c.value}</Fragment>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- uGDX "Here’s how to apply" — `section.section.extraspace#how-to-apply > .container >
 * (h2.h2-tag.mrg32, .guide-steps-wrapper-ugdx)`. Not Law's 394px rows: ONE wrapper of five content-height
 * `.gd-steps` (radius 32px 0, clipped; flex 1 1 0, padding 32, 24px white on #011627 / #0e2c45 /
 * #223b4e / #0b2439 by `.ugdx-bg-N`). `.tb-num-mt.white` 600; `.tb-title-mt` 600/1.5 pb 16 (18px 300 at
 * <=767); the step image absolute bottom-right at its own 248px, capped at the card width. At <=767 the
 * wrapper is a 32px-gap column 40px down, cards `flex: none`, over a 16px #193e90 `.mob-vert-line`
 * behind them at 49.5%. Measured on production at 1440 / 991 / 767 / 390. */
const UGDX_STEP = { 1: 'bg-[#011627]', 2: 'bg-[#0e2c45]', 3: 'bg-[#223b4e]', 4: 'bg-[#0b2439]' };

/* `extraspace` — the admissions page's `section.section.extraspace#how-to-apply` (padding-top 120); the
   programme pages' "Your guide to joining …" is a plain `.section` with the heading in a `.tt-wrap` */
export function UgdxSteps({ data, block = 'how-to-apply', id = 'how-to-apply', extraspace = true }) {
  return (
    <section data-block={block} id={id} className={extraspace ? 'block overflow-hidden pb-[60px] pt-[120px] max-md:pb-10 max-md:pt-10' : SECTION}>
      <div className={CONTAINER}>
        {extraspace ? (
          <h2 className={H2_MRG32}>{withBreaks(data.heading)}</h2>
        ) : data.headWrap ? (
          /* ref .head-wrap.top > .tt-wrap — six of the eight programme pages. The `.tt-wrap` is a flex
             item here, so the heading's 32px stays inside it; at <=767 the row turns into a stretched
             column with mb 16 and the `.tt-wrap` adds mb 20 (52px more than the bare form below) */
          <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around">
            <div className="flex-[0_1_auto] max-md:mb-5 max-sm:mr-5">
              <h2 className={H2_MRG32}>{withBreaks(data.heading)}</h2>
            </div>
          </div>
        ) : (
          /* ref .tt-wrap — 20px of right margin at <=479 */
          <div className="max-sm:mr-5">
            <h2 className={H2_MRG32}>{withBreaks(data.heading)}</h2>
          </div>
        )}
        <div className="relative flex overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:mt-10 max-md:flex-col max-md:gap-8">
          {data.steps.map((step) => (
            <div key={step.num} className={cx('relative flex-[1_1_0] overflow-hidden p-8 text-2xl text-white max-md:flex-none', UGDX_STEP[step.tone] ?? UGDX_STEP[1])}>
              <div className="relative z-[1] flex flex-col items-start">
                <div className="font-semibold">{step.num}</div>
                <div className="pb-4 font-semibold leading-[1.5] max-md:text-lg max-md:font-light">{withBreaks(step.title)}</div>
                {step.button && (
                  <ButtonRegular href={step.button.href} variant={step.button.variant} labelSize={step.button.labelSize}>{step.button.label}</ButtonRegular>
                )}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.image} alt="" loading="lazy" className="absolute bottom-0 right-0 z-0 m-0 block max-w-full" />
            </div>
          ))}
          <div className="absolute left-[49.5%] top-0 z-[-1] hidden h-full w-4 bg-[#193e90] max-md:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
