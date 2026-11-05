'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ButtonRegular from '@/components/ui/ButtonRegular';
import IconHeading from '@/components/Schools/ISDI/IconHeading';
import BrochureButton from '@/components/Schools/ISDI/ProgramDetail/BrochureButton';
import CompareDropdown from './CompareDropdown';
import ElectiveDropdown from '@/components/Schools/ISDI/ProgramDetail/ElectiveDropdown';
import Runs from './Runs';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * Step 3 — "Review Your Curriculum": `section.section > .icon-heading + .container >
 * .common-wrapper > (.review-wrapper, .custom-tabs-wrapper > (.quaternary-tabs, .tab-btn-wrap))`.
 *
 * The review strip names the major and minor this page is (with "Choose Again" back to the
 * major's own page); below it, the four years as Webflow tabs, each a column of semesters
 * (`.semist-content`: a blue heading panel over a photograph beside a grey course list).
 *
 * Rules, from the page's sheet:
 *   .review-wrapper        row; a column at <=479
 *   .review-box            flex 1, #072058 under review-bg, pl68, centred column; py22 pl22 <=767
 *     .rew-text-1          18px mint pb4 (16 at <=767); .rew-text-2 26px/1.2 600 white (20)
 *   .review-choose         #193e90, mint 20px/1.5 600 centred, p50/36 — its two lines set the
 *                          strip's height (160); left-aligned py22 pl22 at <=767; 16px at <=479
 *   .custom-tabs-wrapper   mt56, relative; pt40 (<=767); mt70 (<=479)
 *   .quaternary-tabs-menu  gap 32, start; gap 18 + scroll (<=767); -41/40 bleed (<=479)
 *     link                 32px/1.5: current 600 #18429f over an 8px rule, the first link 400
 *                          and the rest 300 #2b2b2b when idle; .qt-title px20 pb20 -> pb12 22px
 *                          (<=767) -> 18px (<=479)
 *   .quaternary-tabs-content  1px black rule on top, pt56 (40), `top: -4px`, clipped
 *   .semist-content        space-between, top-aligned, 300 #2b2b2b; column at <=767
 *     .sem-content-wrap    418 wide (100% at <=767)
 *     .sem-hd-cont         #193e90 white, p32 (22); h4 36px/1 700 mb24 (24px); desc 16px
 *     .sem-arrow           the triangle at 48% / -20 from the right, rotated 90 and scaled .6,
 *                          #193e90; hidden at <=767
 *     .semister-image      100% wide, natural height; 200 tall cover at <=767
 *     .rt-content          #f6f6f6, flex 1
 *     .semister-lists      p32/30/0/40, min-height 200 at <=991, px22 at <=767
 *     .portions            pb22; h5 18px/1.2 700, no margin (Tailwind preflight over Bootstrap); desc 14px
 *   .tab-btn-wrap          absolute top-right of the tabs; top -50 (<=767); full width, top -25
 *                          (<=479) — the mint "Download Curriculum" pill, a brochure trigger
 */


function Semester({ sem }) {
  return (
    /* ref .semist-content */
    <div className="flex items-start justify-between font-light text-[#2b2b2b] max-md:flex-col [&+&]:mt-14">
      {/* ref .lt-content > .sem-content-wrap */}
      <div className="w-auto text-[18px] max-md:w-full">
        <div className="w-[418px] max-md:w-full">
          {/* ref .sem-hd-cont */}
          <div className="relative bg-[#193e90] p-8 text-white max-md:p-[22px]">
            <h4 className="mb-6 mt-0 text-[36px] font-bold leading-none max-md:text-[24px]">{sem.title}</h4>
            <div className="text-base leading-[1.5]">{withBreaks(sem.text)}</div>
            {/* ref .sem-arrow */}
            <div aria-hidden className="absolute right-[-20px] top-[48%] h-auto w-auto rotate-90 scale-[0.6] text-[10px] leading-none text-[#193e90] max-md:hidden">
              <svg width="29" height="21" viewBox="0 0 29 21" fill="none" className="block">
                <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
              </svg>
            </div>
          </div>
          {sem.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={sem.image.src}
              alt={sem.image.alt}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full max-w-full align-middle max-md:h-[200px] max-md:object-cover"
            />
          )}
        </div>
      </div>
      {/* ref .rt-content */}
      <div className="w-auto flex-1 basis-0 bg-[#f6f6f6] max-md:w-full max-md:flex-none max-sm:flex-1">
        {/* ref .semister-lists */}
        <div className="pb-0 pl-10 pr-[30px] pt-8 max-lg:min-h-[200px] max-md:px-[22px]">
          {sem.courses.map((c, i) => (
            /* ref .portions */
            <div key={i} className="pb-[22px]">
              <h5 className="m-0 text-[18px] font-bold leading-[1.2] text-[#2b2b2b]">
                <Runs runs={c.title} />
              </h5>
              <div className="text-[14px] leading-[1.5]">
                {withBreaks(c.text)}
                {c.list && (
                  /* ref .desc-text-1 > ul > li > (strong, p) — the PG Diploma's "Electives (Select
                     Any One)": preflight zeroes the list's bullets, padding and margins, and
                     `bolder` over the 300 description paints the course name at 400 */
                  <ul>
                    {c.list.map((li, j) => (
                      <li key={j}>
                        <strong>{li.title}</strong>
                        {li.text != null && <p>{li.text}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
          {sem.electives?.map((d, i) => (
            /* ref .acc-wrapper > .accordion-item-common — the MBA pages' elective lists, inside the
               course list; ISDI's ElectiveDropdown, measured identical on the ISME sheet (titles and
               course names are <strong>s here, which preflight's `bolder` paints at 900) */
            <div key={`el-${i}`}>
              <ElectiveDropdown
                dropdown={{
                  title: <Runs runs={d.title} />,
                  items: d.items.map((it) => ({ title: <Runs runs={it.title} />, text: it.text })),
                }}
              />
            </div>
          ))}
        </div>
        {sem.compare?.length > 0 && (
          /* ref .acc-wrapper — the single-programme and MBA pages only */
          <div>
            {sem.compare.map((c, i) => (
              <CompareDropdown key={`${i}-${c.title}`} data={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ref .custom-tabs-wrapper — the year tabs, also used by the single-programme pages' block */
/* `wrap`: `custom` is `.custom-tabs-wrapper` (mt56, pt40 at <=767, mt70 at <=479); `quaternary` is the
   MBA pages' `.quaternary-tabs-wrapper.padd-btm` (mt56, mt76 at <=767) */
const YEAR_WRAP = {
  custom: 'relative mt-14 pt-0 max-md:pt-10 max-sm:mt-[70px]',
  quaternary: 'relative mt-14 max-md:mt-[76px]',
};

/* `initial` — the year production opens on (Webflow's `w--current` tab); 0 everywhere but
   dual-specialisation/entrepreneurships-business-analytics, which opens on Year 2 */
export function YearTabs({ years, download, brochure, wrap = 'custom', initial = 0 }) {
  const [year, setYear] = useState(initial);
  const pane = years[year];
  return (
    <div className={YEAR_WRAP[wrap] ?? YEAR_WRAP.custom}>
      {/* ref .quaternary-tabs-menu — `position: static` (the sheet's later rule beats Webflow's
          `.w-tab-menu { position: relative }`), so its `z-index: 1` is inert and the absolutely
          positioned "Download Curriculum" button below paints above it and stays clickable */}
      <div
        role="tablist"
        aria-label="Curriculum by year"
        className="static flex items-start justify-start gap-8 text-[32px] font-medium max-md:gap-[18px] max-md:overflow-auto max-md:[scrollbar-width:none] max-sm:-mx-[41px] max-sm:px-10"
      >
        {years.map((y, i) => (
          <button
            key={y.label}
            type="button"
            role="tab"
            aria-selected={i === year}
            onClick={() => setYear(i)}
            className={cx(
              'flex h-auto flex-none cursor-pointer items-start bg-transparent p-0 align-top text-[32px] leading-[1.5]',
              i === year
                ? 'border-0 border-b-8 border-solid border-[#18429f] text-left font-semibold text-[#18429f]'
                : cx('text-center text-[#2b2b2b]', i === 0 ? 'font-normal' : 'font-light')
            )}
          >
            <div className="px-5 pb-5 max-md:pb-3 max-md:text-[22px] max-sm:text-[18px]">{y.label}</div>
          </button>
        ))}
      </div>

      {/* ref .quaternary-tabs-content */}
      <div role="tabpanel" aria-label={pane.label} className="relative -top-1 overflow-hidden border-0 border-t border-solid border-black pt-14 max-md:pt-10">
        {pane.semesters.map((sem) => (
          <Semester key={sem.title} sem={sem} />
        ))}
      </div>

      {download && (
        /* ref .tab-btn-wrap */
        <div className="absolute right-0 top-0 max-md:top-[-50px] max-sm:top-[-25px] max-sm:w-full">
          {download.brochure && brochure ? (
            <BrochureButton brochure={brochure} label={download.label} shape="button-regular" variant="mint" />
          ) : (
            <ButtonRegular href={download.href} variant="mint" labelSize={download.fontSize}>
              {download.label}
            </ButtonRegular>
          )}
        </div>
      )}
    </div>
  );
}

export default function Curriculum({ data, brochure }) {
  return (
    <section data-block="curriculum" className={SECTION}>
      {data.heading && <IconHeading num={data.heading.num} title={data.heading.title} size="lg" tone="isme" />}

      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className="pt-14 max-md:pt-10">
          {data.review && (
            /* ref .review-wrapper */
            <div className="flex justify-start max-sm:flex-col">
              {data.review.boxes.map((box) => (
                /* ref .review-box */
                <div
                  key={box.label}
                  className="flex flex-1 basis-0 flex-col items-start justify-center bg-[#072058] bg-[url('/assets/images/schools/isme/bba/review-bg.png')] bg-cover bg-[position:0px_0px] bg-repeat-x pl-[68px] max-md:py-[22px] max-md:pl-[22px]"
                >
                  <div className="pb-1 text-[18px] leading-[1.5] text-atlas-mint max-md:text-[16px]">{box.label}</div>
                  <div className="text-[26px] font-semibold leading-[1.2] text-white max-md:text-[20px]">{box.value}</div>
                </div>
              ))}
              {data.review.choose && (
                /* ref a.review-choose */
                <a
                  href={data.review.choose.href}
                  className="flex flex-[0_1_auto] items-center justify-center bg-[#193e90] px-9 py-[50px] text-center text-[20px] font-semibold leading-[1.5] text-atlas-mint no-underline max-md:justify-start max-md:py-[22px] max-md:pl-[22px] max-md:text-left"
                >
                  <div className="max-sm:text-[16px]">{withBreaks(data.review.choose.label)}</div>
                </a>
              )}
            </div>
          )}

          <YearTabs years={data.years} download={data.download} brochure={brochure} />
        </div>
      </div>
    </section>
  );
}
