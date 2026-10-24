'use client';

import { useEffect, useRef, useState } from 'react';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, H2, H2_MB, SECTION, SUB_MRGBTM } from '../Home/ui';
import IconHeading from '../IconHeading';
import MintTabStrip from '../Home/MintTabStrip';
import MinorCard from '../MinorCard';
import { ElectiveCard } from '../Home/Electives';
import { BLUE_DESC_WRAP, BLUE_WRAPPER, COMMON_WRAPPER } from './ui';

/**
 * #7 "Cross-Disciplinary Learning"
 * (`atlas-isdi-advantage/the-isdi-advantage/index.php:1162-1385`).
 *
 *   section#tailored-pathway.section >
 *     .icon-heading (its `.icon-main-title` carries id="graduate-attributes", which
 *                    is what the ISDI header menu's "Graduate Attributes" points at)
 *     .blue-wrapper.isdi-blue-5 > .container >
 *       .blue-desc-wrap > .blue-desc-text
 *       .common-wrapper > (h2.h2-tag.mrg16.isdi.white, .sub-heading.mrgbtm,
 *         .rounded-tabs-mint > (.tabs-menu-mint.less-space (4 links),
 *           .tab-content-mint > 4 x .swiper.common-swiper.mrgtp0 > 5 x
 *             .card-type-electives.isdi))
 *       section.common-wrapper > (h2, .sub-heading.mrgbtm,
 *         .why-isdi-wrapper > .swiper.common-swiper-full.mrgtp0 > 2 x .isdi-elective)
 *
 * It is NOT `ProgramsUg/Multidisciplinary`, even though the tab set and the twenty
 * cards are the same shape: that section sits on white with a `.black-desc-text`
 * lead and a bare `.common-wrapper.center` closing row, and this one is inside the
 * indigo `.blue-wrapper` with a white heading-and-lead pair above BOTH halves. The
 * pieces that do match are shared — `MintTabStrip`, `../MinorCard` and the
 * homepage's `ElectiveCard`.
 *
 * Tab switches fade like the Webflow widget (out 100ms, then in 300ms), and ISDI's
 * `initCommonSwiper` sets no autoplay.
 */
export default function CrossDisciplinary({ data }) {
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
    /* ref section#tailored-pathway.section */
    <section id="tailored-pathway" data-block="pathway" className={SECTION}>
      <IconHeading num={data.icon.num} title={data.icon.title} titleId={data.icon.titleId} size="lg" />

      {/* ref .blue-wrapper.isdi-blue-5 */}
      <div className={BLUE_WRAPPER}>
        <div className={CONTAINER}>
          {/* ref .blue-desc-wrap > .blue-desc-text */}
          <div className={BLUE_DESC_WRAP}>
            <div className="text-[24px] leading-[1.5] text-white max-md:text-[18px]">{withBreaks(data.lead)}</div>
          </div>

          {/* ref .common-wrapper — "Choose Your Minor" */}
          <div className={COMMON_WRAPPER}>
            <h2 className={cx(H2, H2_MB.mrg16, 'text-white')}>{withBreaks(data.heading)}</h2>
            <div className={cx(SUB_MRGBTM, 'text-white')}>{withBreaks(data.sub)}</div>
            <MintTabStrip
              tabs={data.tabs.map((tab) => tab.label)}
              active={active}
              onChange={select}
              label={data.heading}
              idPrefix="isdi-adv-minor"
            />
          </div>
        </div>

        {/* ref .tab-content-mint — outside `.container` so the carousel bleeds */}
        <div className="relative pt-14 text-[18px] leading-[1.5] max-md:pt-10 max-md:text-base max-md:leading-[1.5]">
          {data.tabs.map((tab, i) =>
            i === shown ? (
              <div
                key={tab.label}
                role="tabpanel"
                id={`isdi-adv-minor-panel-${i}`}
                aria-labelledby={`isdi-adv-minor-tab-${i}`}
                className={cx(
                  'transition-opacity ease-[ease]',
                  visible ? 'opacity-100 duration-300' : 'opacity-0 duration-100'
                )}
              >
                <Carousel autoplay={false} bullets="isdi-light">
                  {tab.cards.map((card, j) => (
                    <MinorCard key={`${j}-${card.text}`} card={{ title: card.text, image: card.image }} />
                  ))}
                </Carousel>
              </div>
            ) : null
          )}
        </div>

        {/* ref section.common-wrapper — "Multidisciplinary Learning". The heading
            pair sits in `.container`; the slider must not, or `Carousel`'s own bleed
            padding is applied on top of the container inset. */}
        <section className={COMMON_WRAPPER}>
          <div className={CONTAINER}>
            <h2 className={cx(H2, H2_MB.mrg16, 'text-white')}>{withBreaks(data.tail.heading)}</h2>
            <div className={cx(SUB_MRGBTM, 'text-white')}>{withBreaks(data.tail.sub)}</div>
          </div>

          {/* ref .why-isdi-wrapper > .swiper.common-swiper-full.mrgtp0 — a real
              carousel, as it is on the ISDI homepage; stacking the two cards in a
              column instead was +454px at 390 */}
          <Carousel autoplay={false} bullets="isdi-overlay-light">
            {data.tail.cards.map((card, i) => (
              <ElectiveCard key={`${i}-${card.title}`} card={card} />
            ))}
          </Carousel>
        </section>
      </div>
    </section>
  );
}
