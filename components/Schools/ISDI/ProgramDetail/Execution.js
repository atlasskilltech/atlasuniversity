'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import CareerCard from '../CareerCard';
import MintTabStrip from '../Home/MintTabStrip';
import { CONTAINER, H2, H2_MB, SECTION, SUB_MRGBTM32 } from '../Home/ui';

/**
 * "Where concepts meet execution, in and beyond the classroom." —
 * b-des/accessory-design-&-craft.php:2631-2825.
 *
 *   section.section > .container > h2.h2-tag.mrg16.isdi + .sub-heading.mrgbtm32
 *                                > .rounded-tabs-mint > .tabs-menu-mint (2 links)
 *                                  > .tab-content-mint.mrgtp32 > 2 x pane
 *                                      > .swiper.common-swiper-full.mrgtp0
 *                                        > 9 x .career-sup-card
 *
 * The strip is the bare `.tabs-menu-mint` again (gap 48 / -73 bleed / 70 padding),
 * so `spacing="wide"`; `.tab-content-mint.mrgtp32` is 32px of top padding, 16 at
 * <=479. Both carousels bleed past `.container`, as every `.common-swiper-full`
 * does, and ISDI's initialiser gives them no autoplay.
 *
 * The card is `.career-sup-card` — the same shape as ATLAS's
 * `components/ui/CareerSupportCard`, on ISDI's skin, which differs in enough
 * measured properties to be its own card rather than a variant:
 *
 *                            ATLAS (`.ugdx`)            here
 *   card                     398 x 622, r36 top-left    398 x 622, square
 *   photo frame              340 tall                   340 tall (image 101%)
 *   caption radius           36 bottom-right            16 bottom pair
 *   image radius             none                       16 top pair
 *   caption padding          20/35/8                    20/35/8 -> 20/35/20 at
 *                                                       <=767 -> 20 at <=479
 *   title                    `.cr-title.white` 32/1.3   `.cr-title.isdi` 20px/1.3
 *                                                       600, 18px from 991 down
 *   text                     16/1.3 -> 14 -> 16/1.4     the same ladder
 *   paint                    `.atlas-bg-*`              #173a87 under one of two
 *                                                       stylesheet vectors
 *
 * ── One reference defect, not reproduced ────────────────────────────────────
 * `.career-sup-card` is `width: 100%` inside a `slidesPerView: 'auto'` slide, so
 * between 568 and 767px the reference's card measures up to 2412px at a 767px
 * viewport and the row runs far past the viewport. The container width is used
 * there instead — the same fix `TestimonialCard` and `ZoomSliderLg` already carry.
 */
export default function Execution({ data }) {
  const [active, setActive] = useState(0);

  return (
    <section data-block="execution" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB_MRGBTM32}>{data.sub}</div>

        {/* ref .rounded-tabs-mint.w-tabs */}
        <div className="relative">
          <MintTabStrip
            tabs={data.tabs}
            active={active}
            onChange={setActive}
            spacing="wide"
            label="Where concepts meet execution"
            idPrefix="bdes-execution"
          />
        </div>
      </div>

      {/* ref .tab-content-mint.mrgtp32 — the carousel has to be a sibling of
          `.container` to bleed, so the panel lives out here */}
      <div
        role="tabpanel"
        id={`bdes-execution-panel-${active}`}
        aria-labelledby={`bdes-execution-tab-${active}`}
        className="relative pt-8 max-sm:pt-4"
      >
        {/* the cards are content-height and their copy differs, so the track holds
            slides of several heights — the sheet's `.swiper-wrapper { align-items:
            center }` centres the short ones against the tallest */}
        <Carousel key={active} autoplay={false} bullets="isdi-overlay" align="center">
          {data.panes[active].map((card, i) => (
            <CareerCard key={`${i}-${card.title}`} card={card} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
