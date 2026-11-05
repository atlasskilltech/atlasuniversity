'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import MintTabStrip from '@/components/Schools/ISDI/Home/MintTabStrip';
import { CONTAINER, H2, SECTION, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Where concepts meet execution, in and beyond the classroom." — `section.section > .container >
 * (h2.h2-tag.mrg16, .sub-heading.mrgbtm32, .rounded-tabs-mint > (.tabs-menu-mint,
 * .tab-content-mint.mrgtp32 > 2 x pane > .swiper.common-swiper-full.mrgtp0 > 6 x .career-sup-card))`.
 *
 * The ISME `.career-sup-card` is the bare class — square, no `.ugdx` / `.isdi` modifier — so it
 * is drawn here rather than through the ATLAS or ISDI cards, which differ in radius and type.
 *
 * Rules, from the page's sheet:
 *   .sub-heading.mrgbtm32     24px/1.4 400, pb32 -> py20 16px/1.5 (<=767) -> pb16 (<=479)
 *   .tabs-menu-mint           the plain strip: gap 48, -73 bleed, px70 (MintTabStrip `wide`)
 *   .tab-content-mint.mrgtp32 pt32 at every width above 479 (the compound beats the <=767 pt40),
 *                             pt16 at <=479
 *   .career-sup-card          398 x 622 column (full width, auto height at <=767)
 *     .career-sup-img         340 tall (240 at <=767); img cover, 101% tall, 50% 76% at <=767
 *     .css-content-wrapper    flex 1, p20/35/8 (pb20 at <=767); bg1 #132d68 under incub-bg-1,
 *                             bg2 #092053 under class-rm-bg-2, bg3 #04153c under class-rm-bg-3,
 *                             all cover / no-repeat
 *     .cr-title               32px/1.3 500 mint -> 24 (<=767)
 *     .cr-sub-desc.mt16       16px/1.3 white, mt16 -> 14px (<=991) -> 16px/1.4 (<=767)
 *
 * Deviation, shared with every card carousel in this rebuild: between 568 and 767 the reference's
 * `width: 100%` card sits in an auto-width slide and blows out past the viewport; it is held to the
 * container width here.
 */
const TONE = {
  bg1: { backgroundColor: '#132d68', backgroundImage: 'url(/assets/images/advantages/partnership/cdn/incub-bg-1.png)', backgroundPosition: '50% 50%' },
  bg2: { backgroundColor: '#092053', backgroundImage: 'url(/assets/images/schools/isme/bba/class-rm-bg-2.png)' },
  bg3: { backgroundColor: '#04153c', backgroundImage: 'url(/assets/images/schools/isme/bba/class-rm-bg-3.png)' },
};

/*
 * Two pages (MBA – Financial Planning & Applied Finance, PG Diploma in AI-Driven Digital Branding)
 * end their own <style> with `.career-sup-card { height: 492px }`: unconditional and later than the
 * sheet, so it replaces 622 AND the <=767 `height: auto`. The extractor records it as `cardHeight`.
 */
const CARD_H = {
  default: 'h-[622px] max-md:h-auto',
  492: 'h-[492px]',
  /* B.Sc (Hons.) Finance: `.career-sup-card { height: 640px }` in a w-embed <style>, page-wide */
  640: 'h-[640px]',
};

export function Card({ card, height }) {
  return (
    /* ref .career-sup-card */
    <div className={cx('flex w-[398px] flex-[0_1_auto] flex-col items-stretch gap-0 max-md:w-[calc(100vw-44px)]', CARD_H[height] ?? CARD_H.default)}>
      {/* ref .career-sup-img */}
      <div className="h-[340px] w-auto max-md:h-[240px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.image.src}
          srcSet={card.image.srcSet}
          sizes={card.image.sizes}
          alt={card.image.alt}
          loading="lazy"
          decoding="async"
          className="block h-[101%] max-h-none w-full max-w-none object-cover max-md:object-[50%_76%]"
        />
      </div>
      {/* ref .css-content-wrapper.bgN */}
      <div className="h-auto flex-1 basis-0 bg-cover bg-no-repeat px-[35px] pb-2 pt-5 max-md:pb-5" style={TONE[card.tone] ?? { backgroundColor: '#0b2b73' }}>
        <div className="text-[32px] font-medium leading-[1.3] text-atlas-mint max-md:text-[24px]">{withBreaks(card.title)}</div>
        {/* ref .cr-sub-desc.mt16 — commented out upstream on some pages, so absent rather than empty */}
        {card.text != null && (
          <div className="mt-4 text-[16px] leading-[1.3] text-white max-lg:text-[14px] max-md:text-[16px] max-md:leading-[1.4]">
            {withBreaks(card.text)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Execution({ data }) {
  const [active, setActive] = useState(0);
  return (
    <section data-block="execution" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, 'mb-4 max-md:mb-2')}>{withBreaks(data.heading)}</h2>
        {data.sub != null && <div className={cx(SUB_INNER, 'pb-8 font-normal max-md:pb-5 max-sm:pb-4')}>{withBreaks(data.sub)}</div>}
        {/* B.Sc Finance's "Why ATLAS is the Right Choice" authors the tab widget with no menu and one pane */}
        {data.tabs.length > 0 && (
        <div className="relative">
          <MintTabStrip
            tabs={data.tabs}
            active={active}
            onChange={setActive}
            spacing="wide"
            skin="isme"
            label="Where concepts meet execution"
            idPrefix="bba-execution"
          />
        </div>
        )}
      </div>
      {/* ref .tab-content-mint.mrgtp32 */}
      <div
        {...(data.tabs.length > 0
          ? { role: 'tabpanel', id: `bba-execution-panel-${active}`, 'aria-labelledby': `bba-execution-tab-${active}` }
          : {})}
        className="relative pt-8 max-sm:pt-4"
      >
        <Carousel key={active} autoplay={false} arrowStyle="isme" bullets="inline-overlay" align="center">
          {data.panes[active].map((card, i) => (
            <Card key={`${i}-${card.title}`} card={card} height={data.cardHeight} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
