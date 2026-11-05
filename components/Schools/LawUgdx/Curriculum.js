'use client';

import { useState } from 'react';
import { CONTAINER, SECTION, SUB_INNER } from '@/components/Home/SectionHead';
import withBreaks from '@/lib/withBreaks';
import RichText from '@/components/Statutory/RichText';
import { cx } from '@/lib/cx';
import { H2_MRG16 } from './Sections';

/**
 * The year-by-year curriculum — `.custom-tabs-wrapper.low-pad > .quaternary-tabs` (School of Law
 * BBA LL.B., uGDX B.Tech). Measured on production at 1440 / 991 / 767 / 479 / 390, values from the
 * page's sheet:
 *
 *   .custom-tabs-wrapper.low-pad   margin-top 56; at <=767 margin 0 and padding-top 40 (the `.low-pad`
 *                                  compound beats the sheet's later <=479 `margin-top: 70`)
 *   .quaternary-tabs-menu          flex, gap 32, start; z 1; at <=767 gap 18 and a horizontal
 *                                  scroller; at <=479 it bleeds 41px and pads 40 back in
 *   tab link                       32px 400 #2b2b2b; current: the tone's colour, 600, line-height 1.5,
 *                                  an 8px bottom rule in the same colour. `.qt-title` pads 0 20 20
 *                                  (22px, pb 12 at <=767; 18px at <=479)
 *   .quaternary-tabs-content-ugdx  a 1px black top rule, padding-top 32 (40 at <=767), lifted 4px
 *                                  (`position: relative; top: -4px`) so the current tab's rule sits on it
 *   .semist-content                space-between row, start-aligned, weight 300 #2b2b2b; a column at
 *                                  <=767; consecutive semesters 56px apart (the page's own <style>)
 *   .sem-content-wrap              418 wide (100% at <=767); `.sem-hd-cont.no-bg` padding 0 32 32 0
 *                                  (0 22 22 0 at <=767): `h4.h4-thin-ugdx` 24px/1 600 mb 8,
 *                                  `.h4-subtext` 600 pb 16, `.sem-desc-text` 16px — all at 18px base
 *   .rt-content.no-bg              flex 1 1 0 (none and full width at <=767), no padding; the list's
 *                                  min-height 200 from 991 down; `.portions` pb 22, `h5.h5-thin`
 *                                  18px/1.2 700 #2b2b2b, `.desc-text-1` 14px
 *   .hr-line.ugdx                  #706f6e, 2px, mt 30, after the first semester's list only
 *
 * Only the current year is mounted — Webflow's `display: none` on the other panes.
 */
const TAB_ON = { law: 'text-[#cb5827] border-[#cb5827]', ugdx: 'text-[#eb1f3c] border-[#eb1f3c]' };

export default function Curriculum({ data, tone = 'law', block = 'curriculum' }) {
  const [active, setActive] = useState(0);
  const year = data.years[active];
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MRG16}>{withBreaks(data.heading)}</h2>
        {/* a run list where the lead authors <strong>s (the integrated page) — bold is wider, so it wraps */}
        <div className={SUB_INNER}>{Array.isArray(data.sub) ? <RichText runs={data.sub} /> : withBreaks(data.sub)}</div>
        <div className="relative mt-14 block max-md:mt-0 max-md:pt-10">
          <div
            role="tablist"
            aria-label={data.heading}
            className="relative z-[1] flex items-start justify-start gap-8 text-[32px] font-medium max-md:gap-[18px] max-md:overflow-auto max-sm:-mx-[41px] max-sm:px-10"
          >
            {data.years.map((y, i) => (
              <button
                key={y.label}
                type="button"
                role="tab"
                id={`${block}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${block}-panel-${i}`}
                onClick={() => setActive(i)}
                className={cx(
                  'flex flex-none items-start bg-transparent p-0 text-[32px]',
                  i === active ? cx('border-0 border-b-8 border-solid font-semibold leading-[1.5]', TAB_ON[tone]) : 'font-normal text-[#2b2b2b]',
                )}
              >
                {/* the integrated page authors its "Year 5" label as a bare <div>, not `.qt-title`, so it keeps
                    the link's 32px / 48 with no padding — 48 tall, 1px more than the current tab at <=479 */}
                <div className={y.bareLabel ? undefined : 'px-5 pb-5 max-md:pb-3 max-md:text-[22px] max-sm:text-lg'}>{y.label}</div>
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id={`${block}-panel-${active}`}
            aria-labelledby={`${block}-tab-${active}`}
            className="relative -top-1 border-0 border-t border-solid border-black pt-8 max-md:pt-10"
          >
            {year.semesters.map((sem, si) => (
              <div key={sem.title} className={cx('flex items-start justify-between font-light text-[#2b2b2b] max-md:flex-col', si > 0 && 'mt-14')}>
                <div className="w-auto text-lg">
                  <div className="w-[418px] max-md:w-full">
                    <div className="pb-8 pr-8 max-md:pb-[22px] max-md:pr-[22px]">
                      <h4 className="mb-2 mt-0 text-2xl font-semibold leading-none">{sem.title}</h4>
                      {/* the uGDX summer school comments its `.h4-subtext` out — no box at all */}
                      {sem.subtitle !== null && <div className="pb-4 font-semibold">{withBreaks(sem.subtitle)}</div>}
                      <div className="text-base">{withBreaks(sem.text)}</div>
                    </div>
                  </div>
                </div>
                <div className="w-auto flex-[1_1_0] max-md:w-full max-md:flex-none">
                  <div className="min-h-0 max-lg:min-h-[200px]">
                    {sem.subjects.map((s, k) => (
                      <div key={k} className="pb-[22px]">
                        {/* Webflow's base `h5 { margin: 10px 0 }` — `.h5-thin` resets only the top */}
                        {/* an EMPTY `.portions` (uGDX authors one at the end of some lists) has no h5 or text —
                            rendering an empty h5 would let its 10px margin collapse out and push the row */}
                        {s.title != null && <h5 className="mb-2.5 mt-0 text-lg font-bold leading-[1.2] text-[#2b2b2b]">{withBreaks(s.title)}</h5>}
                        {s.text != null && <div className="text-[14px]">{withBreaks(s.text)}</div>}
                        {/* the summer school's days: a `.desc-text-1` holding a <ul> — Webflow's base list
                            (padding-left 40, margin-bottom 10, disc), all of which Preflight zeroes */}
                        {s.items && (
                          <div className="text-[14px]">
                            <ul className="mb-2.5 mt-0 list-disc pl-10">
                              {s.items.map((it, n) => <li key={n}>{withBreaks(it)}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                    {sem.hr && <div className="mt-[30px] h-0.5 w-full bg-[#706f6e]" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
