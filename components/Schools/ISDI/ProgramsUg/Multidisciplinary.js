'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import MintTabStrip from '../Home/MintTabStrip';
import { ElectiveCard } from '../Home/Electives';
import { CONTAINER, SECTION } from '../Home/ui';
import IconHeading from './IconHeading';

/**
 * #5 "ATLAS Students Lead with a Multidisciplinary Approach" — port of
 * reference/schools/isdi/programs/undergraduate/index.php:504-721.
 *
 *   div.section > (.icon-heading,
 *     .container > (.white-desc-wrap > .black-desc-text.wid80.padd-32,
 *       .rounded-tabs-mint > (.tabs-menu-mint.less-space, .tab-content-mint >
 *         4 panes, each a .swiper.common-swiper.mrgtp0 of 5 .card-type-electives.isdi),
 *       .common-wrapper.center > .why-isdi-wrapper > .swiper.common-swiper.mrgtp0
 *         > 2 x .isdi-elective))
 *
 * The strip is the homepage's `MintTabStrip` and the two closing cards are its
 * `ElectiveCard` (measured identical here: 600 x 300 / 295, r24, same paddings and
 * breakpoints). The minor card is the *image* variant of `.card-type-electives`
 * — the homepage's "Choose Your Minor" uses the video variant of the same class —
 * so it is drawn here:
 *
 *                     >=768px                    <=767px          <=479px
 *   card              298 x 232, r16, clipped
 *   caption wrap      bottom half, flat #00000063, p24, centred    p12
 *   title             20px/1.5 white             18px/1.5         12px/1.5
 *
 * Tab switches fade like the Webflow widget (out 100ms, then in 300ms), and the
 * sliders are ISDI's `initCommonSwiper`, which sets no autoplay.
 */
function MinorCard({ card }) {
  return (
    /* ref .card-type-electives.isdi */
    <div className="relative w-[298px] overflow-hidden rounded-2xl text-white max-md:w-auto">
      {/* ref .cd-txt-wrap-3.isme-149 */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-center bg-[linear-gradient(#00000063,#00000063)] p-6 max-md:p-3">
        {/* ref .cd-ta-text.isme-34 */}
        <div className="text-[20px] leading-[1.5] max-md:text-[18px] max-md:leading-[1.5] max-sm:text-[12px] max-sm:leading-[1.5]">
          {withBreaks(card.title)}
        </div>
      </div>
      {/* ref img.cd-ta-image.isme-143 — the fifth card of "Human-Centered and Social
          Design" is authored without one, so the reference paints a 298 x 0 slide
          (its caption is `height: 50%` of nothing, clipped away); rendering the card
          imageless reproduces that */}
      {card.image && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={card.image.src}
          width={card.image.width}
          height={card.image.height}
          alt={card.image.alt}
          loading="lazy"
          decoding="async"
          className="inline-block h-full w-full max-w-full object-cover align-middle"
        />
      )}
    </div>
  );
}

export default function Multidisciplinary({ data }) {
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
      <IconHeading num={data.num} title={data.title} />

      <div className={CONTAINER}>
        {/* ref .white-desc-wrap */}
        <div className="flex items-start justify-between pt-14 text-black max-md:flex-col max-md:gap-2.5 max-md:pt-5 max-sm:gap-2">
          {/* ref .black-desc-text.wid80.padd-32 */}
          <div className="max-w-[80%] flex-1 pb-8 text-[24px] font-light leading-[1.5] max-md:max-w-full max-md:text-[18px] max-md:leading-[1.5]">
            {data.text}
          </div>
        </div>

        <MintTabStrip
          tabs={data.tabs.map((tab) => tab.label)}
          active={active}
          onChange={select}
          label={data.title}
          idPrefix="isdi-ug-minor"
        />
      </div>

      {/* ref .tab-content-mint */}
      <div className="relative pt-14 text-[18px] leading-[1.5] max-md:pt-10 max-md:text-base max-md:leading-[1.5]">
        {data.tabs.map((tab, i) =>
          i === shown ? (
            <div
              key={tab.label}
              role="tabpanel"
              id={`isdi-ug-minor-panel-${i}`}
              aria-labelledby={`isdi-ug-minor-tab-${i}`}
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

      {/* ref .common-wrapper.center > .why-isdi-wrapper > .swiper.common-swiper.mrgtp0 */}
      <div className="pt-[50px]">
        <Carousel autoplay={false} bullets="isdi">
          {data.electives.map((card) => (
            <ElectiveCard key={card.title} card={card} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
