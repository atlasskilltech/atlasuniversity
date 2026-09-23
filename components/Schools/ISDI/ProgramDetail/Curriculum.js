'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ButtonRegular from '@/components/ui/ButtonRegular';
import InViewVideo from '../Home/InViewVideo';
import { H2, H2_MB } from '../Home/ui';
import ElectiveDropdown from './ElectiveDropdown';
import BrochureButton from './BrochureButton';

/**
 * "Our Globally Benchmarked Curriculum" — b-des/accessory-design-&-craft.php:
 * 2014-2286, the second half of `section.section.extraspace > .container`:
 *
 *   .carriculum-section-wrapper > h2.h2-tag.isdi
 *     > .custom-tabs-wrapper.no-marg
 *       > .quaternary-tabs > .quaternary-tabs-menu (4 year links)
 *                          > .quaternary-tabs-content > 4 x pane
 *       > .tab-btn-wrap > a.button-regular          (absolutely placed)
 *
 * Each pane is its year's semesters (2, 2, 2 and 4) followed by one comparison
 * card. `.semist-content + .semist-content { margin-top: 56px }` comes from the
 * page's own trailing `<style>`, not from `$css`.
 *
 * ── Measured at 1440 / 1280 / 991 / 767 / 479 / 390 ─────────────────────────
 *   wrapper            margin-top 100
 *   h2.h2-tag.isdi     44px/1.2 (36 from 991), mb56 -> 32 at <=767
 *   tabs menu          flex, gap 32 -> 18 at <=767; a horizontal scroller with
 *                      the strip's -41 bleed / 40 padding at <=479
 *     link             18px title in a 20/20/20 box (12 bottom at <=767); the
 *                      current one is #18429f 600 over an 8px bottom border,
 *                      the rest #2b2b2b 300. 32px/1.5 -> 22px at 767 -> 18 at 479
 *   tabs content       1px black rule on top, 56px of padding (40 at <=767),
 *                      pulled up 4px by Webflow's own `top: -4px`
 *   semester row       flex, space-between, top-aligned; column at <=767
 *     .lt-content      418 wide (full width when stacked)
 *       .sem-hd-cont   #173a87, r16 on the top-left corner pair (top pair when
 *                      stacked), padding 32 -> 22
 *         h4.h4-thin   36px/1 500 -> 24px/1
 *         .sem-desc    16px/1.5
 *         .sem-arrow   a 29x21 triangle rotated to point right, scaled .6,
 *                      hanging 20px past the panel's right edge, #173a87 —
 *                      `display: none` below 768
 *       video          `.video-auto`, autoplay/loop/muted/playsinline
 *     .rt-content      #f6f6f6, radius on the other two corners, flex 1
 *       .semister-lists  padding 32/30/0/40 -> 32/22/0/22, min-height 200 at
 *                        <=991
 *         .portions      pb22; h5 18px/1.2 700 mb10 (its `<strong>` is rendered
 *                        `font-bold`, since Preflight's `bolder` would take a
 *                        700 parent to 900); .desc-text-1 14px/1.5
 *   comparison         mt75; see below
 *   Download button    `.tab-btn-wrap` is absolutely positioned against the tabs
 *                      wrapper: pinned to its top-right, moving to -50px above
 *                      the strip at <=767 and to a full-width button at <=479
 */

/* ref .quaternary-tabs-link-tab-N.isdi > .qt-title */
const YEAR_LINK =
  'relative flex max-w-full flex-none cursor-pointer items-start px-5 pb-5 pt-0 align-top '
  + 'text-[32px] leading-[1.5] max-md:pb-3 max-md:text-[22px] max-md:leading-[1.5] '
  + 'max-sm:text-[18px] max-sm:leading-[1.5]';
const YEAR_LINK_STATE = {
  on: 'border-0 border-b-8 border-solid border-[#18429f] text-left font-semibold text-[#18429f]',
  off: 'text-center font-light text-[#2b2b2b]',
};

/* ref .comp-left / .comp-right — no width of their own, so each is its own content
   clamped to 414 and then shrunk to fit the table */
const COMP_PANEL = 'max-w-[414px] bg-contain bg-[position:50%_50%] bg-no-repeat px-10 py-7';

/* ref .comp-table-wrap */
const COMP_TABLE =
  'flex w-full min-h-[382px] max-w-[855px] flex-[3_1_auto] max-md:flex-col '
  + 'max-sm:mt-2.5 max-sm:overflow-hidden max-sm:rounded-2xl';

function Comparison({ comparison }) {
  const { isdi, others } = comparison;
  return (
    /* ref .comparison-wrapper */
    <div className="mt-[75px] flex max-md:flex-col max-sm:mt-9">
      {/* ref .comp-control-wrap */}
      <div className="flex-auto max-sm:mr-0 md:mr-8 [@media(min-width:1920px)]:mr-[45px]">
        {/* ref .comp-header (`.h2-tag` on Year 4 — the same 40px/56 500) */}
        <div className="text-[40px] font-medium leading-[56px] max-md:mb-5 max-md:leading-[42px] max-sm:text-[36px] max-sm:leading-[42px]">
          {/* the authored <br>s are what cap this column's flex base, and with it the
              width of the two panels beside it */}
          {withBreaks(comparison.heading)}
        </div>
      </div>

      {/*
        ref .comp-table-wrap — `width: 100%` as well as `flex: 3 auto`, which is what
        makes the base 100% of the row and leaves the heading column its measured 400px
        rather than half the width. The reference authors it **twice**, one inside the
        other, and that is not inert: at <=479 each carries `margin-top: 10px`, so the
        pair really is 10px taller than a single wrapper. Both are reproduced.
      */}
      <div className={COMP_TABLE}>
        <div className={COMP_TABLE}>
          {/* ref .comp-left */}
          <div
            className={cx(COMP_PANEL, 'rounded-l-2xl bg-[#f6f6f6] max-sm:rounded-none')}
            style={{ backgroundImage: `url(${comparison.leftImage})` }}
          >
            {/* ref .comp-title */}
            <div className="text-[20px] font-semibold leading-[1.5] text-[#ec1376]">{isdi.title}</div>
            {isdi.points.map((point, i) => (
              <Point key={`${i}-${point.title}`} point={point} />
            ))}
          </div>

          {/* ref .comp-right — its wash is `cover`, the left one's is `contain` */}
          <div
            className={cx(COMP_PANEL, 'rounded-r-2xl bg-[#ededed] bg-cover max-sm:rounded-none')}
            style={{ backgroundImage: `url(${comparison.rightImage})` }}
          >
            {/* ref .comp-title-blue */}
            <div className="text-[20px] font-semibold leading-[1.5] text-[#173a87]">{others.title}</div>
            {others.points.map((point, i) => (
              <Point key={`${i}-${point.title}`} point={point} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Point({ point }) {
  return (
    /* ref .content-wrapper-comp — a declared 90px, auto only at <=479 */
    <div className="h-[90px] max-sm:h-auto">
      {/* ref .comp-subtitle */}
      <div className="mb-2 mt-6 text-base font-medium leading-[1.5]">{point.title}</div>
      {/* ref .comp-desc — one of the twenty-four carries an authored <br> */}
      <div className="text-[12px] leading-[1.5]">{withBreaks(point.text)}</div>
    </div>
  );
}

function Semester({ semester }) {
  return (
    /* ref .semist-content (+ the page's own `.semist-content + .semist-content` 56px) */
    <div className="flex items-start justify-between font-light text-[#2b2b2b] [&+&]:mt-14 max-md:flex-col">
      {/* ref .lt-content — 418 wide above 768; below it the row is a `flex-start`
          column, so the panel is its content's width (the clip's own 720px), not the
          container's */}
      <div className="w-[418px] text-[18px] leading-[1.5] max-md:w-auto">
        {/* ref .sem-content-wrap */}
        <div>
          {/* ref .sem-hd-cont.isdi */}
          <div className="relative rounded-tl-2xl bg-[#173a87] p-8 text-white max-md:rounded-tl-2xl max-md:rounded-tr-2xl max-md:p-[22px]">
            {/* ref h4.h4-thin.isdi */}
            <div className="mb-6 text-[36px] font-medium leading-none max-md:text-[24px] max-md:leading-none">
              {semester.title}
            </div>
            {/* ref .sem-desc-text */}
            <div className="text-base leading-[1.5]">{semester.desc}</div>

            {/* ref .sem-arrow.isdi > .svg-icon-triangle — a 29x21 triangle scaled .6
                and rotated a quarter turn, so it points out of the panel's right
                edge. Hidden below 768, where the panel stacks. */}
            <div
              aria-hidden
              className="absolute -right-5 top-[71px] inline-block rotate-90 scale-[.6] text-[#173a87] max-md:hidden"
            >
              <svg width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* ref .video-auto > video[autoplay loop muted playsinline] */}
          <div>
            <InViewVideo
              sources={semester.video.sources}
              poster={semester.video.poster}
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* ref .rt-content.isdi */}
      <div className="flex-1 rounded-br-2xl rounded-tr-2xl bg-[#f6f6f6] max-md:w-full max-md:flex-none max-md:rounded-bl-2xl max-md:rounded-tr-none max-sm:flex-1">
        {/* ref .semister-lists */}
        <div className="pb-0 pl-10 pr-[30px] pt-8 max-lg:min-h-[200px] max-md:px-[22px]">
          {semester.portions.map((portion, i) => (
            /* ref .portions — Year 4's Semester 8 authors the same course twice, so the
               key carries the index (as `Electives` and `GridGallery` already do) */
            <div key={`${i}-${portion.title}`} className="pb-[22px]">
              {/* ref h5.h5-thin > strong */}
              <div className="mb-2.5 text-[18px] font-bold leading-[1.2]">
                <strong className="font-bold">{portion.title}</strong>
              </div>
              {/* ref .desc-text-1 */}
              <div className="text-[14px] leading-[1.5]">{portion.text}</div>
            </div>
          ))}

          {semester.dropdowns.length > 0 && (
            /* ref .acc-wrapper.padbtm */
            <div className="pb-2.5">
              {semester.dropdowns.map((dropdown) => (
                <ElectiveDropdown key={dropdown.title} dropdown={dropdown} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Curriculum({ data, brochures }) {
  const [year, setYear] = useState(0);
  const active = data.years[year];

  return (
    /* ref .carriculum-section-wrapper */
    <div className="mt-[100px]">
      <h2 className={cx(H2, H2_MB.base)}>{data.heading}</h2>

      {/* ref .custom-tabs-wrapper.no-marg — the Download button is absolute against it */}
      <div className="relative max-md:pt-10">
        {/* ref .quaternary-tabs.w-tabs */}
        <div className="relative">
          {/* ref .quaternary-tabs-menu */}
          <div
            role="tablist"
            aria-label="Curriculum year"
            className="z-[1] flex items-start justify-start gap-8 max-md:gap-[18px] max-md:overflow-x-auto max-sm:-mx-[41px] max-sm:px-10 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden"
          >
            {data.years.map((y, i) => (
              <button
                key={y.label}
                type="button"
                role="tab"
                id={`bdes-year-tab-${i}`}
                aria-selected={i === year}
                aria-controls={`bdes-year-panel-${i}`}
                onClick={() => setYear(i)}
                className={cx(YEAR_LINK, i === year ? YEAR_LINK_STATE.on : YEAR_LINK_STATE.off)}
              >
                {y.label}
              </button>
            ))}
          </div>

          {/* ref .quaternary-tabs-content — a 1px black rule the menu's 8px current
              border sits on, pulled up 4px by Webflow's own offsets */}
          <div
            role="tabpanel"
            id={`bdes-year-panel-${year}`}
            aria-labelledby={`bdes-year-tab-${year}`}
            className="relative -top-1 overflow-hidden border-0 border-t border-solid border-black pt-14 max-md:pt-10"
          >
            {active.semesters.map((semester) => (
              <Semester key={semester.title} semester={semester} />
            ))}
            {active.comparison && <Comparison comparison={active.comparison} />}
          </div>
        </div>

        {/* ref .tab-btn-wrap — "Download Curriculum" is `href="#"` with a `data-id`,
            so it opens the page's brochure popup rather than navigating */}
        <div className="absolute right-0 top-0 max-md:-top-[50px] max-sm:inset-x-0 max-sm:-top-[25px]">
          {data.button.brochure && brochures?.[data.button.brochure] ? (
            <BrochureButton
              brochure={brochures[data.button.brochure]}
              label={data.button.label}
              shape="button-regular"
              variant="pink-cta"
              className="max-sm:w-full"
            />
          ) : (
            <ButtonRegular href={data.button.href} variant="pink-cta" className="max-sm:w-full">
              {data.button.label}
            </ButtonRegular>
          )}
        </div>
      </div>
    </div>
  );
}
