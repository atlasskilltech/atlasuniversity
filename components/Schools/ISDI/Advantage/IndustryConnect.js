'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION } from '../Home/ui';
import IconHeading from '../IconHeading';
import FacultyCard from '../FacultyCard';
import StatsStrip from '../Home/StatsStrip';
import { BLUE_WRAPPER, COMMON_WRAPPER } from './ui';

/**
 * #3 "Strongly Industry Oriented"
 * (`atlas-isdi-advantage/the-isdi-advantage/index.php:221-686`).
 *
 *   section#industry-connect-isdi.section >
 *     .icon-heading
 *     .blue-wrapper.isdi-blue-5 > .container > .common-wrapper >
 *       .tertiary-tabs.w-tabs > (.tertiary-tabs-menu > 3 x a > .tr-tab-text,
 *                                .tertiary-tabs-content > 3 x pane >
 *                                  .swiper.common-swiper.mrgtp32 > N x .port-card-m-wrap.isdi)
 *     .strip-container-isdi > .strip-content > 5 x .strip-text-isdi
 *     .slide-wrap.extra-padding > 12 x img
 *
 * This is NOT `components/ui/TertiaryTabs`: that component pairs the strip with a
 * full-width photo panel, and here each pane is a bleeding carousel. It is also not
 * `ui/TertiaryTabStrip` — measured on this page the menu is
 * `justify-content: space-between` over three links with a 1px bottom rule, where the
 * shared strip is a left-aligned row with a 48px gap. So the strip is local.
 *
 * Measured at 1440 / 768 / 390:
 *   .tertiary-tabs-menu   flex, space-between, top-aligned, 1px white rule, z1,
 *                         `overflow: auto` at <=767
 *   a.tertiary-green-…    `flex: none`, `display: flex`, 24px/400, and Webflow's
 *                         own `.w-tab-link { padding: 9px 30px }` — 48 tall, 56
 *                         when current
 *   .w--current           an 8px WHITE rule under the link (`.white.w--current`),
 *                         weight 600, line-height 1.5
 *   .tr-tab-text          24px/1 600, pb10, mb-4; 20px at <=767
 *
 * The figures band and the logo strip under it are the ISDI homepage's own pair and
 * paint the same two building photographs (SHA-1 identical), so `Home/StatsStrip`
 * renders them — in the `bare` form it grew for this page, because here they sit
 * inside this section rather than in a `.section` of their own.
 */
export default function IndustryConnect({ data }) {
  const [active, setActive] = useState(0);
  const pane = data.tabs[active];

  return (
    /* ref section#industry-connect-isdi.section */
    <section id="industry-connect-isdi" data-block="industry" className={SECTION}>
      <IconHeading num={data.icon.num} title={data.icon.title} titleId={data.icon.titleId} size="lg" />

      {/* ref .blue-wrapper.isdi-blue-5 */}
      <div className={BLUE_WRAPPER}>
        <div className={CONTAINER}>
          <div className={COMMON_WRAPPER}>
            {/* ref .tertiary-tabs.w-tabs */}
            <div className="relative">
              {/* ref .tertiary-tabs-menu */}
              <div
                role="tablist"
                aria-label={data.icon.title}
                /* ref .tertiary-tabs-menu — 1px white rule, space-between, and a
                   horizontal scroller at <=767 */
                className="relative z-[1] flex items-start justify-between overflow-x-visible overflow-y-hidden border-0 border-b border-solid border-white max-md:overflow-auto"
              >
                {data.tabs.map((tab, i) => (
                  <button
                    key={tab.label}
                    type="button"
                    role="tab"
                    id={`ind-tab-${i}`}
                    aria-selected={i === active}
                    aria-controls={`ind-pane-${i}`}
                    onClick={() => setActive(i)}
                    className={cx(
                      /* ref a.tertiary-green-tabs-link-tab-1.white — `flex: none`,
                         `display: flex`, and Webflow's own `.w-tab-link` padding of
                         9px 30px, which is the 18px the strip was short */
                      'flex flex-none cursor-pointer items-start border-0 bg-transparent px-[30px] py-[9px] text-left text-[24px] font-normal text-white',
                      /* ref .w--current — an 8px white rule under the LINK */
                      i === active && 'border-0 border-b-8 border-solid border-white font-semibold leading-[1.5]'
                    )}
                  >
                    {/* ref .tr-tab-text */}
                    <div className="-mb-1 pb-2.5 text-[24px] font-semibold leading-none max-md:text-[20px] max-md:leading-none">
                      {tab.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ref .tertiary-tabs-content > .w-tab-pane > .swiper.common-swiper.mrgtp32 */}
        <div role="tabpanel" id={`ind-pane-${active}`} aria-labelledby={`ind-tab-${active}`}>
          <Carousel autoplay={false} bullets="isdi-light" className="pt-8">
            {pane.cards.map((card, i) => (
              <FacultyCard
                key={`${i}-${card.text}`}
                card={{ name: card.text, role: card.posi, tone: card.tone,
                        logo: card.logo, photo: card.image }}
              />
            ))}
          </Carousel>
        </div>
      </div>

      {/* ref .strip-container-isdi + .slide-wrap.extra-padding — the ISDI homepage's
          own pair, down to the two building photographs, so `Home/StatsStrip` renders
          it in its `bare` form (this page puts it inside the section rather than in a
          `.section` of its own) */}
      <StatsStrip data={{ stats: data.strip, logos: data.logos }} bare />
    </section>
  );
}
