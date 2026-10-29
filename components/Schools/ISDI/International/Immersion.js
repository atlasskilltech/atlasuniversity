'use client';

import { useState } from 'react';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import IconSection from '../About/IconSection';
import MinorCard from '../MinorCard';
import MintTabStrip from '../Home/MintTabStrip';
import { CONTAINER } from '../Home/ui';
import { BLUE_DESC_TEXT, BLUE_DESC_WRAP_MRGBTM } from './ui';

/**
 * "World Class Design Education" / Global Immersion
 * (`atlas-isdi-advantage/internationalisation/index.php:740-841`).
 *
 *   section#global-immersion.section >
 *     .icon-heading
 *     .blue-wrapper.isdi-blue-5 > .container >
 *       (.blue-desc-wrap.mrgbtm > .blue-desc-text,
 *        .rounded-tabs-mint > (.tabs-menu-mint.less-space > 5 x
 *          a.tab-roundmint-tab-1.white.isdi,
 *          .tab-content-mint.mrgtp32 > 5 x .w-tab-pane > .swiper.common-swiper.mrgtp0))
 *
 * Its heading and its lead are **byte-identical to `#international-events`'** —
 * upstream repeats both, and the same `location.svg` plate. Transcribed as authored.
 *
 * Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390:
 *   .blue-desc-wrap.mrgbtm  the base wrap plus 42px of bottom padding
 *   .tabs-menu-mint.less-space  gap 24 (8 at <=479), -61 bleed, px60 — the default
 *   a.…white.isdi           WHITE idle, **#000 on #d20158** current (source order:
 *                           `.white.w--current` follows `.isdi.w--current`)
 *   .tab-content-mint.mrgtp32  pt32, 16 at <=479
 *   .swiper.common-swiper.mrgtp0  no top padding; 298px slides with a 24px gutter,
 *                           inside the container, so it does not bleed
 *
 * **Not one of the fourteen cards has a caption.** `.card-type-electives.isdi` holds
 * only its photograph here, where "Choose Your Minor" wraps a `.cd-txt-wrap-3` over
 * the lower half — so `MinorCard` renders the scrim only when a title is given.
 */
export default function Immersion({ data }) {
  const [active, setActive] = useState(0);

  return (
    <IconSection
      id="global-immersion"
      block="immersion"
      icon={data.icon.image}
      title={data.icon.title}
    >
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .blue-desc-wrap.mrgbtm */}
        <div className={BLUE_DESC_WRAP_MRGBTM}>
          {/* ref .blue-desc-text */}
          <div className={BLUE_DESC_TEXT}>{withBreaks(data.desc)}</div>
        </div>

        {/* ref .rounded-tabs-mint */}
        <div className="relative">
          <MintTabStrip
            tabs={data.tabs.map((tab) => tab.label)}
            active={active}
            onChange={setActive}
            label="Global Immersion"
            idPrefix="global-immersion"
            skin="white"
          />

          {/* ref .tab-content-mint.mrgtp32 — pt32 (16 at <=479) and 18px/1.5 */}
          <div className="relative pt-8 text-[18px] leading-[1.5] max-sm:pt-4">
            {data.tabs.map((tab, i) => (
              /* ref .w-tab-pane */
              <div
                key={tab.label}
                role="tabpanel"
                id={`global-immersion-panel-${i}`}
                aria-labelledby={`global-immersion-tab-${i}`}
                hidden={i !== active}
                /* ref .tab-pane-tab-1 / .tab-pane-tab-2 — Webflow numbers only the
                   first two panes, and the sheet gives those two `font-size: 16px`
                   at <=767 while the bare ones keep `.tab-content-mint`'s 18px.
                   That is 3px of pagination line box at 390, nothing above 768. */
                className={i < 2 ? 'max-md:text-base max-md:leading-[1.5]' : undefined}
              >
                {/* ref .swiper.common-swiper.mrgtp0 */}
                <Carousel autoplay={false} bleed={false} bullets="isdi-light">
                  {/* the third Shenzhen card is authored with no image at all, so
                      its key cannot come from one — the reference paints a 298 x 0
                      slide there and `MinorCard` reproduces that */}
                  {tab.cards.map((card, j) => (
                    <MinorCard key={`${j}-${card.image ? card.image.src : 'empty'}`} card={card} />
                  ))}
                </Carousel>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IconSection>
  );
}
