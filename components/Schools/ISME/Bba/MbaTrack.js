'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import Carousel from '@/components/Carousel/Carousel';
import IconHeading from '@/components/Schools/ISDI/IconHeading';
import MintTabStrip from '@/components/Schools/ISDI/Home/MintTabStrip';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import { CareerCard, LcCard } from './MajorTrack';
import { YearTabs } from './Curriculum';
import Runs from './Runs';
import { MAJOR_LINKS } from './links';

/**
 * The MBA dual- and hyper-specialisation pages' two numbered steps — a bare `<div>` holding
 * `section#dual-mba-selection` (or `#hyper-mba-selection`) and the curriculum section.
 *
 * Step 1 — "Choose Your Specialisation": `.custom-tab-wrap` with two tabs (Hyper / Dual), each a
 * link to that family's own page (the footer's `navigationMap`, `cards-hyper-mba` / `cards-dual-mba`),
 * then `.container > .swiper.common-swiper > N x a.port-card-o-wrap.mba` — a text-only card per
 * specialisation, the current one mint.
 *
 * Step 2/3 — "Review Your Curriculum": `.container > .custom-tabs-wrapper > (.rounded-tabs-mint
 * (the plain strip + Overview / Curriculum Highlights / Learning Outcomes),
 * .quaternary-tabs-wrapper.padd-btm (the year tabs + the brochure button))`.
 *
 * The MBA pages carry none of the BBA pages' inline `<style>` overrides, so the sheet's own values
 * stand here (measured on production):
 *   .custom-tab-text          24px 500 #333 (20 at <=479) — the active tab's label too
 *   .active-custom-tab        8px #18429f rule (6 at <=479)
 *   .icon-button (mint-normal-mid)  a 44px mint circle (40 at <=767, 32 at <=479), tick 22 / 18
 *   a.port-card-o-wrap.mba    295 x 290 column; panel #072058 p22 min-h 290 (mint when current)
 *     title                   24px/1.4 400 mint; 600 #18429f when current
 *     .cd-ico-wrap.icon-normal  static, pb4, only on the current card: a #193e90 32px circle
 *                             (44 at <=767) holding the mint tick
 *   .tab-cont-btn-wrap        flex, pt56 — authored empty, and still 56px of pane height
 *   .quaternary-tabs-wrapper.padd-btm  mt56 (76 at <=767), relative
 */
function Selection({ data }) {
  return (
    <section id={data.id} className={SECTION}>
      {data.heading && <IconHeading num={data.heading.num} title={data.heading.title} size="lg" tone="isme" />}

      {/* ref .common-wrapper */}
      <div className="pt-14 max-md:pt-10">
        {/* ref .custom-tab-wrap */}
        <nav
          aria-label="Choose a specialisation type"
          className="mx-auto flex max-w-full items-center justify-around overflow-auto border-0 border-b border-solid border-black px-[62px] [scrollbar-width:none] max-md:items-stretch max-md:gap-[60px] max-sm:gap-10 max-sm:px-5"
        >
          {data.tabs.map((tab) => {
            const href = MAJOR_LINKS[tab.id] ?? tab.href;
            const label = (
              <span className="block text-center text-[24px] font-medium leading-[1.5] text-[#333] max-sm:text-[20px]">{tab.label}</span>
            );
            return tab.active ? (
              /* ref .active-custom-tab */
              <a
                key={tab.id}
                href={href}
                aria-current="page"
                className="flex flex-1 basis-0 items-center justify-center gap-6 border-0 border-b-8 border-solid border-[#18429f] pb-4 no-underline max-md:flex-none max-sm:gap-2.5 max-sm:border-b-[6px]"
              >
                {/* ref .icon-button (mint-normal-mid) */}
                <span className="flex h-11 w-11 items-center justify-center rounded-[30px] bg-atlas-mint max-md:h-10 max-md:w-10 max-sm:h-8 max-sm:w-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.tabTick} alt="" width={22} height={17} className="block w-[22px] max-w-full max-md:w-[18px]" />
                </span>
                {label}
              </a>
            ) : (
              /* ref .custom-tab */
              <a key={tab.id} href={href} className="flex-1 basis-0 text-center no-underline max-md:flex-none">
                {label}
              </a>
            );
          })}
        </nav>

        {/* ref .container > .swiper.common-swiper (pt56 / 40); the hyper-specialisation pages add
            `.mrgtp32` — 32 at every width */}
        <Carousel autoplay={false} arrowStyle="isme" bullets="inline" align="center" className={data.swiperPt32 ? 'pt-8' : 'pt-14 max-md:pt-10'}>
          {data.cards.map((card, i) => (
            /* ref a.port-card-o-wrap.mba */
            <a
              key={`${i}-${card.title}`}
              href={card.href}
              className="relative flex h-[290px] w-[295px] flex-col items-stretch justify-start overflow-hidden text-white no-underline"
            >
              <div className={cx('block min-h-[290px] w-full flex-none p-[22px]', card.active ? 'bg-atlas-mint' : 'bg-[#072058]')}>
                {card.active && (
                  /* ref .cd-ico-wrap.icon-normal > .icon-button (mint-blue-fill) */
                  <div className="block pb-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-[30px] bg-[#193e90] max-md:h-11 max-md:w-11">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={data.cardTick} alt="" className="block w-10 max-w-full leading-none max-md:w-5" />
                    </span>
                  </div>
                )}
                <div className={cx('relative z-[2] text-[24px] leading-[1.4]', card.active ? 'font-semibold text-[#18429f]' : 'font-normal text-atlas-mint')}>
                  {card.title}
                </div>
              </div>
            </a>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function CurriculumSection({ data, brochure }) {
  const [active, setActive] = useState(data.current ?? 0);
  const pane = data.panes[active];
  const paneSize = pane.paneClass ? 'text-[18px] leading-[1.5] max-md:text-[16px]' : 'text-[18px] leading-[1.5]';
  return (
    <section className={SECTION}>
      {data.heading && <IconHeading num={data.heading.num} title={data.heading.title} size="lg" tone="isme" />}

      <div className={CONTAINER}>
        {/* ref .custom-tabs-wrapper */}
        <div className="relative mt-14 pt-0 max-md:pt-10 max-sm:mt-[70px]">
          <div className="relative">
            <MintTabStrip
              tabs={data.panes.map((p) => p.label)}
              active={active}
              onChange={setActive}
              spacing="wide"
              skin="isme"
              label="Curriculum"
              idPrefix="mba-curriculum"
            />
          </div>
        </div>
      </div>

      {/* ref .tab-content-mint */}
      <div role="tabpanel" id={`mba-curriculum-panel-${active}`} aria-labelledby={`mba-curriculum-tab-${active}`} className={cx('relative pt-14 max-md:pt-10', paneSize)}>
        {pane.kind === 'text' && (
          <div className={CONTAINER}>
            {pane.nested ? (
              /* two pages author a second `.container` inside the pane; its padding narrows the copy */
              <div className={CONTAINER}>
                <div className="max-w-[850px] max-md:text-[16px]"><Runs runs={pane.text} /></div>
              </div>
            ) : (
              <div className="max-w-[850px] max-md:text-[16px]"><Runs runs={pane.text} /></div>
            )}
            {pane.buttons && (
              /* ref .tab-cont-btn-wrap — authored empty, still 56px of padding */
              <div className="flex items-center justify-start pt-14" />
            )}
          </div>
        )}
        {pane.kind === 'cards' && (
          <Carousel key={active} autoplay={false} arrowStyle="isme" bullets="inline-overlay">
            {pane.cards.map((card, i) => (
              <LcCard key={`${i}-${card.num}`} card={card} />
            ))}
          </Carousel>
        )}
        {pane.kind === 'careers' && (
          <div className={CONTAINER}>
            <div className="flex flex-wrap items-start justify-start gap-4 max-md:items-center max-md:justify-center">
              {pane.cards.map((card, i) => (
                <CareerCard key={`${i}-${card.title}`} card={card} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={CONTAINER}>
        <YearTabs years={data.years} download={data.download} brochure={brochure} wrap="quaternary" initial={data.defaultYear ?? 0} />
      </div>
    </section>
  );
}

export default function MbaTrack({ data, brochure }) {
  return (
    /* ref the bare <div> around both sections — one top-level block upstream */
    <div data-block="specialisation">
      <Selection data={data.selection} />
      <CurriculumSection data={data.curriculum} brochure={brochure} />
    </div>
  );
}
