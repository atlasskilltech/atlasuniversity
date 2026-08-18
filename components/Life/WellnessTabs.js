'use client';

import { useState } from 'react';
import { lifeContent } from '@/lib/lifeContent';
import { cx } from '@/lib/cx';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Wellness is success" — port of `life-at-atlas.php:672-712`
 * (`section.section > .container > (h2.h2-tag.mrg16, h2.sub-heading,
 *   .tertiary-tabs.mrgtp > (.tertiary-tabs-menu.mrg-tab,
 *   .tertiary-tabs-content > 3x .tr-cont-wrapper.atlas))`).
 *
 * A second, different Webflow tab widget: an underlined text strip rather than
 * the `.rounded-tabs-mint` pills, over a full-width photo panel with the copy
 * laid over its foot. Nothing else in the rebuild uses it, so it is not shared.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                   <=767px
 *   .tertiary-tabs.mrgtp       margin-top 56             same
 *   .tertiary-tabs-menu        row, space-between,       margin 0 -21,
 *     .mrg-tab                 align-start, mb 4,        padding 0 20
 *                              overflow auto,
 *                              border-bottom 1px #fff
 *   .tertiary-tabs-link-tab-1  flex, padding 9 30,       height 52
 *     .atlas                   24px/400, #000
 *     .w--current              #41418e, 600, and an      same
 *                              8px #41418e bottom rule
 *   .tr-tab-text               600, line-height 1,       20px
 *                              pb 10, mb -4, 24px
 *   .tertiary-tabs-content     top -4                    same
 *   .tr-cont-wrapper.atlas     radius 32/0, clipped      same
 *   .image-container           100% x 100%               aspect 2/3, height 450,
 *                                                        cover
 *   .content-container         pinned bottom-left,       padding 0 18 18
 *                              #fff0 -> #000,
 *                              padding 0 58 58
 *   .sw-title                  40px/1, 400, #fff         26px
 *   .sw-desc                   18px/1.5, pt 32           16px (pt 16 <=479)
 *
 * The menu's `border-bottom: 1px solid #fff` is white on a white page, so it
 * paints nothing; only the current tab's 8px indigo rule is visible.
 *
 * Webflow's own tab widget swaps `w--current` on click and shows one pane at a
 * time; that is reproduced with React state, and only the current pane is
 * mounted — matching `display: none` on the inactive `.w-tab-pane`s.
 */
export default function WellnessTabs() {
  const { wellness } = lifeContent;
  const [active, setActive] = useState(0);
  const pane = wellness.tabs[active];

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{wellness.heading}</h2>
        {/* ref h2.sub-heading — rendered as a <div>, it is not a heading */}
        <div className="mb-2.5 mt-5 pr-[50px] text-2xl font-light leading-[1.4] max-md:py-5 max-md:pr-0 max-md:text-base max-md:leading-[1.5]">
          {wellness.subheading}
        </div>

        {/* ref .tertiary-tabs.mrgtp */}
        <div className="relative mt-14">
          {/* ref .tertiary-tabs-menu.mrg-tab */}
          <div
            role="tablist"
            aria-label={wellness.heading}
            className="relative z-[1] mb-1 flex items-start justify-between overflow-x-auto
                       border-b border-white text-[32px] font-medium leading-[48px]
                       max-md:-mx-[21px] max-md:px-5
                       [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {wellness.tabs.map((tab, i) => (
              /* ref a.tertiary-tabs-link-tab-1.atlas (+ .w--current) */
              <button
                key={tab.label}
                type="button"
                role="tab"
                id={`wellness-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`wellness-panel-${i}`}
                onClick={() => setActive(i)}
                className={cx(
                  'relative z-10 flex max-w-full flex-none items-start bg-transparent px-[30px] py-[9px] text-left',
                  'text-[24px] leading-[1.5] transition-colors',
                  i === active
                    ? 'border-b-8 border-[#41418e] font-semibold text-[#41418e]'
                    : 'font-normal text-black',
                )}
              >
                {/* ref .tr-tab-text */}
                <div className="-mb-1 block pb-2.5 text-[24px] font-semibold leading-none max-md:text-[20px]">
                  {tab.label}
                </div>
              </button>
            ))}
          </div>

          {/* ref .tertiary-tabs-content */}
          <div className="relative -top-1">
            <div
              role="tabpanel"
              id={`wellness-panel-${active}`}
              aria-labelledby={`wellness-tab-${active}`}
            >
              {/* ref .tr-cont-wrapper.atlas */}
              <div className="relative overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
                {/* ref img.image-container (+ .img-2) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pane.image.src}
                  srcSet={pane.image.srcSet}
                  sizes="(max-width: 1279px) 100vw, 1238px"
                  alt={pane.image.alt}
                  loading="lazy"
                  className={cx(
                    'relative block h-full w-full',
                    'max-md:aspect-[2/3] max-md:h-[450px] max-md:object-cover',
                    pane.wide ? 'max-md:object-[10%_50%]' : 'max-md:object-center',
                  )}
                />

                {/* ref .content-container */}
                <div className="absolute bottom-0 left-0 bg-[linear-gradient(#fff0,#000)] px-[58px] pb-[58px] text-white max-md:px-[18px] max-md:pb-[18px]">
                  {/* ref h4.sw-title */}
                  <h4 className="m-0 text-[40px] font-normal leading-none text-white max-md:text-[26px]">
                    {pane.title}
                  </h4>
                  {/* ref p.sw-desc */}
                  <p className="mb-0 pt-8 text-[18px] leading-[1.5] max-md:text-[16px] max-sm:pt-4">
                    {pane.text.split('\n').map((line, i) => (
                      <span key={line}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
