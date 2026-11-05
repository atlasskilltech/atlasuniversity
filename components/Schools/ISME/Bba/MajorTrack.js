'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import IconHeading from '@/components/Schools/ISDI/IconHeading';
import Runs from './Runs';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import { MAJOR_LINKS } from './links';

/**
 * Step 1 — "Major Track (Choose One)": `section.section#<major>-section > .icon-heading +
 * .common-wrapper > (.custom-tab-wrap, .rounded-tabs-mint > (.tabs-menu-mint.patch,
 * .tab-content-mint > 4 x pane > .container))`.
 *
 * The six majors are not tabs on this page: each `.custom-tab` is a link to that major's own
 * page, wired by the footer's `navigationMap` (`window.location.href = …` on click). They are
 * rendered as the links they behave as. The four mint pills below them are a real Webflow tab
 * set — Overview, Curriculum Highlights, Learning Outcomes, Career Pathways.
 *
 * Rules, from the page's sheet (the later of two declarations wins where they disagree):
 *   .common-wrapper        pt56 -> 40 (<=767)
 *   .custom-tab-wrap       flex, space-around, centred, px62, 1px black rule below, scrolls;
 *                          gap 60 + stretch (<=767); gap 40, px20 (<=479)
 *   .active-custom-tab     flex 1, centred, gap 24 (10 at <=479), pb16, 5px #18429f rule
 *                          (the later 5px beats the earlier 8px and the <=479 6px)
 *     .icon-button         mint circle, p10 (the later `width/height: auto` beats the 44/40/32
 *                          sizes); tick 22px wide, 18 at <=767
 *     text                 19px/1.5 700 #18429f (the later 19px beats 24 and the <=479 20)
 *   .custom-tab            flex 1 (none at <=767), centred; text 19px 500 #333
 *   .tabs-menu-mint.patch  #eee band, 1px black rule above, py28, gap 48, -73 / 70 bleed,
 *                          centred -> start (<=991); gap 24, ml0 mr-73, px40, py14 (<=767);
 *                          mx0 px20 (<=479)
 *   pill                   h40 px20, 18px/1.2 Manrope black, current mint r20 500; 16px <=767
 *   .tab-content-mint      pt56 (40 at <=767), 18px; the numbered panes drop to 16px at <=767
 *   .tab-text-block        max-width 850
 *   .cards-lc              396 x 400, #193e90 under the cool-shape vector, p46/32, a column
 *                          spaced between (around at <=767); 350 tall, px20 at <=479
 *   .card-type-el          270 x 370 r16 (full width at <=767), photo under a bottom-half
 *                          #fff0 -> #000 scrim, 24px/1.2 500 white at 32/32/32
 */

const PILL = 'flex h-10 flex-none items-center px-5 text-[18px] leading-[1.2] text-black max-md:text-[16px]';

export function LcCard({ card }) {
  return (
    /* ref .cards-lc */
    <div className="flex max-h-[400px] min-h-[400px] w-full max-w-[396px] flex-col items-start justify-between bg-[#193e90] bg-[url('/assets/images/advantages/css/cool-shape-vector.png')] bg-[position:50%_0px] bg-no-repeat px-8 py-[46px] max-md:justify-around max-sm:max-h-[350px] max-sm:min-h-[350px] max-sm:max-w-[391px] max-sm:px-5">
      {/* ref .mint-number-lc */}
      <div className="text-[56px] font-medium leading-[64px] text-atlas-mint max-md:text-[38px]">{card.num}</div>
      {/* ref .core-content */}
      <div className="sticky z-[1] flex flex-col items-start justify-end pl-[35px] pr-[25px] max-md:pl-5">
        {/* ref .lc-title */}
        <div className="pb-6 pt-[60px] text-[28px] font-normal leading-[1.2] text-white max-md:pt-[30px] max-md:text-[20px] max-md:font-semibold max-sm:flex-[0_1_auto] max-sm:pt-5">
          {withBreaks(card.title)}
        </div>
      </div>
    </div>
  );
}

export function CareerCard({ card }) {
  return (
    /* ref .card-type-el — r16 with nothing clipped, so the photo keeps square corners */
    <div className="relative h-[370px] w-[270px] flex-none rounded-2xl max-md:w-full">
      {/* ref .cd-ty-el-cont */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end justify-start bg-[linear-gradient(#fff0,#000)] px-8 pb-8">
        <div className="text-[24px] font-medium leading-[1.2] text-white">{card.title}</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} alt={card.image.alt} loading="lazy" decoding="async" className="block h-full w-full max-w-full object-cover align-middle" />
    </div>
  );
}

export default function MajorTrack({ data }) {
  const [active, setActive] = useState(data.current ?? 0);
  const pane = data.panes[active];
  /* `.tab-pane-tab-1/2/3` drop to 16px at <=767; the bare fourth pane keeps 18 */
  const paneSize = pane.paneClass ? 'text-[18px] leading-[1.5] max-md:text-[16px]' : 'text-[18px] leading-[1.5]';

  return (
    <section data-block="major" id={data.id} className={SECTION}>
      {data.heading && <IconHeading num={data.heading.num} title={data.heading.title} size="lg" tone="isme" />}

      {/* ref .common-wrapper */}
      <div className="pt-14 max-md:pt-10">
        {/* ref .custom-tab-wrap — the `bba-hons/*` pages author none, and its 1px rule with it */}
        {data.tabs.length > 0 && (
        <nav
          aria-label="Choose a major"
          className="mx-auto flex max-w-full items-center justify-around overflow-auto border-0 border-b border-solid border-black px-[62px] [scrollbar-width:none] max-md:items-stretch max-md:gap-[60px] max-sm:gap-10 max-sm:px-5"
        >
          {data.tabs.map((tab) => {
            /* `tabSize: 'lg'` — bba-hons-marketing-finance-business-analytics' sheet sizes this row as the
               MBA pages do: 24px labels (20 at <=479), a 44px icon (32), an 8px rule (6) */
            const lg = data.tabSize === 'lg';
            const href = MAJOR_LINKS[tab.id];
            return tab.active ? (
              /* ref .active-custom-tab */
              <a
                key={tab.id}
                href={href ?? `#${data.id}`}
                aria-current="page"
                className={cx(
                  'flex flex-1 basis-0 items-center justify-center gap-6 border-0 border-solid border-[#18429f] pb-4 no-underline max-md:flex-none max-sm:gap-2.5',
                  lg ? 'border-b-8 max-sm:border-b-[6px]' : 'border-b-[5px]'
                )}
              >
                {/* ref .icon-button (mint-normal-mid) */}
                <span className={cx('flex items-center justify-center rounded-full bg-atlas-mint', lg ? 'h-11 w-11 max-sm:h-8 max-sm:w-8' : 'p-2.5')}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.tick} alt="" width={22} height={17} className="block w-[22px] max-w-full bg-transparent leading-none max-md:w-[18px]" />
                </span>
                <span className={cx('block text-center font-bold leading-[1.5] text-[#18429f]', lg ? 'text-[24px] max-sm:text-[20px]' : 'text-[19px]')}>{tab.label}</span>
              </a>
            ) : (
              /* ref .custom-tab */
              <a key={tab.id} href={href} className="flex-1 basis-0 text-center text-[#333] no-underline max-md:flex-none">
                <span className={cx('block text-center font-medium leading-[1.5] text-[#333]', lg ? 'text-[24px] max-sm:text-[20px]' : 'text-[19px]')}>{tab.label}</span>
              </a>
            );
          })}
        </nav>
        )}

        {/* ref .rounded-tabs-mint */}
        <div className="relative">
          {/* ref .tabs-menu-mint.patch */}
          <div
            role="tablist"
            aria-label={data.heading?.title}
            className="relative -mx-[73px] flex items-center justify-center gap-12 overflow-auto border-0 border-t border-solid border-black bg-[#eee] px-[70px] py-7 [scrollbar-width:none] max-lg:justify-start max-md:ml-0 max-md:gap-6 max-md:px-10 max-md:py-3.5 max-sm:mx-0 max-sm:px-5"
          >
            {data.panes.map((p, i) => (
              <button
                key={p.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cx(PILL, i === active ? 'rounded-[20px] bg-atlas-mint font-medium' : 'bg-transparent font-normal')}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* ref .tab-content-mint */}
          <div role="tabpanel" aria-label={pane.label} className={cx('relative pt-14 max-md:pt-10', paneSize)}>
            {pane.kind === 'text' && (
              <div className={CONTAINER}>
                {/* ref .tab-text-block */}
                <div className="max-w-[850px] max-md:text-[16px]"><Runs runs={pane.text} /></div>
              </div>
            )}

            {pane.kind === 'cards' && (
              /* ref .swiper.common-swiper-full.mrgtp0 — inside the pane's `.container` upstream,
                 where `overflow: visible` lets it run past the container's right edge; a sibling
                 of the container here, which is how `Carousel` reproduces that bleed */
              <Carousel key={active} autoplay={false} arrowStyle="isme" bullets="inline-overlay">
                {pane.cards.map((card, i) => (
                  <LcCard key={`${i}-${card.num}`} card={card} />
                ))}
              </Carousel>
            )}

            {pane.kind === 'careers' && (
              <div className={CONTAINER}>
                {/* ref .common-flex-16-wrap */}
                <div className="flex flex-wrap items-start justify-start gap-4 max-md:items-center max-md:justify-center">
                  {pane.cards.map((card, i) => (
                    <CareerCard key={`${i}-${card.title}`} card={card} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
