'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import MintTabStrip from './MintTabStrip';
import InViewVideo from './InViewVideo';
import { CONTAINER, H2, H2_MB, SECTION, SUB_MRGBTM } from './ui';

/**
 * "Choose Your Minor" — port of reference/schools/isdi/index.php:1785-2516.
 *
 *   section.section > .container > h2.h2-tag.mrg16.isdi + .sub-heading.mrgbtm
 *     + .rounded-tabs-mint > .tabs-menu-mint.less-space (4 links)
 *                          > .tab-content-mint > .swiper.common-swiper.mrgtp0
 *                            > .card-type-electives.isdi (one per minor)
 *
 * The slider is `overflow: visible` and bleeds past `.container`, so it renders
 * as `Carousel` beside the container (inside it the inset would apply twice).
 * ISDI's `initCommonSwiper` sets no autoplay, hence `autoplay={false}`.
 *
 * Card, measured:
 *                  >=768px                            <=767px        <=479
 *   card           298 x 252, r16, clipped            325 wide (its video's width)
 *   caption        bottom half, #002637 0 -> .9, p24  p12
 *   title          20px/1.5                           18px/1.5       12px/1.5
 *   video frame    325 x 252, cover, on #193e90 — the card is 298 wide above
 *                  767, so the right 27px of the frame are clipped there
 *
 * Tab switches fade like the Webflow widget (out 100ms, then in 300ms).
 */

/* ref .card-type-electives.isdi > .testimonial-card.testimonial-cardv2 > .testimonial-video */
function MinorCard({ card }) {
  return (
    <div className="relative w-[298px] overflow-hidden rounded-2xl text-white max-md:w-auto">
      {/* ref .cd-txt-wrap-3.isme-149.cd-txt-wrap-3v2 */}
      <div className="absolute inset-x-0 bottom-0 z-[99] flex h-1/2 items-end bg-[linear-gradient(#00263700,#002637e6)] p-6 max-md:p-3">
        <div className="text-[20px] leading-[1.5] max-md:text-[18px] max-md:leading-[1.5] max-sm:text-[12px] max-sm:leading-[1.5]">
          {card.title}
        </div>
      </div>
      <div className="flex h-[252px] w-[620px] flex-none overflow-hidden rounded-2xl bg-[#193e90] max-md:w-[325px] max-md:flex-col">
        <div className="relative z-10 h-[252px] w-[325px] max-w-full flex-none overflow-clip">
          <InViewVideo src={card.video} poster={card.poster} className="absolute inset-0 -z-[100] h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export default function ChooseMinor({ data }) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [visible, setVisible] = useState(true);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const select = (i) => {
    if (i === active) return;
    setActive(i);
    setVisible(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(i);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, 100);
  };

  return (
    <div data-block="minors" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB_MRGBTM}>{withBreaks(data.sub)}</div>
        <MintTabStrip
          tabs={data.tabs.map((tab) => tab.label)}
          active={active}
          onChange={select}
          label={data.heading}
          idPrefix="isdi-minor"
        />
      </div>

      {/* ref .tab-content-mint */}
      <div className="relative pt-14 text-[18px] leading-[1.5] max-md:pt-10">
        {data.tabs.map((tab, i) =>
          i === shown ? (
            <div
              key={tab.label}
              role="tabpanel"
              id={`isdi-minor-panel-${i}`}
              aria-labelledby={`isdi-minor-tab-${i}`}
              className={cx(
                'transition-opacity ease-[ease]',
                visible ? 'opacity-100 duration-300' : 'opacity-0 duration-100'
              )}
            >
              <Carousel autoplay={false} bullets="isdi">
                {tab.cards.map((card) => (
                  <MinorCard key={card.title} card={card} />
                ))}
              </Carousel>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
