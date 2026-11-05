'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import MintTabStrip from '../Home/MintTabStrip';
import { ElectiveCard } from '../Home/Electives';
import { CONTAINER, SECTION } from '../Home/ui';
import IconHeading from '../IconHeading';
import MinorCard from '../MinorCard';

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
 * The strip is the homepage's `MintTabStrip`, the two closing cards are its
 * `ElectiveCard` (measured identical here: 600 x 300 / 295, r24, same paddings and
 * breakpoints) and the minor card is `../MinorCard`, shared with
 * /atlas-isdi-advantage.
 *
 * Tab switches fade like the Webflow widget (out 100ms, then in 300ms), and the
 * sliders are ISDI's `initCommonSwiper`, which sets no autoplay.
 */
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

        {/* ref .skills-electives-wrapper — only the Postgraduate Overview wraps the tabs in
            it, and it is 56px of top padding (24 at <=767). The wrapper has no bottom
            padding and the panel is its last child, so carrying it on the strip is the
            same spacing. */}
        <div className={data.grid ? 'pt-14 max-md:pt-6' : undefined}>
          <MintTabStrip
            tabs={data.tabs.map((tab) => tab.label)}
            active={active}
            onChange={select}
            label={data.title}
            idPrefix="isdi-ug-minor"
          />
        </div>
      </div>

      {/* ref .tab-content-mint — the Undergraduate Overview leaves it OUTSIDE `.container`
          so its carousel can bleed; the Postgraduate Overview keeps it inside, and its
          `.padtp32` is 32px of top padding rather than 56. */}
      <div
        className={cx(
          'relative text-[18px] leading-[1.5] max-md:text-base max-md:leading-[1.5]',
          data.grid ? cx(CONTAINER, 'pt-8') : 'pt-14 max-md:pt-10'
        )}
      >
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
              {/* The Undergraduate Overview makes each pane a `.swiper.common-swiper`; the
                  Postgraduate Overview makes it a `.electives-card-wrapper` — a plain
                  wrapping row with a 16px gap and no slider at all, which becomes a
                  two-column grid at <=767. Same cards, different container, so the layout
                  travels as data. */}
              {data.grid ? (
                /* ref .electives-card-wrapper */
                <div className="flex flex-wrap gap-4 max-md:grid max-md:grid-cols-2">
                  {tab.cards.map((card) => (
                    <MinorCard key={card.title} card={card} />
                  ))}
                </div>
              ) : (
                <Carousel autoplay={false} bullets="isdi">
                  {tab.cards.map((card) => (
                    <MinorCard key={card.title} card={card} />
                  ))}
                </Carousel>
              )}
            </div>
          ) : null
        )}
      </div>

      {/* ref .common-wrapper.center > .why-isdi-wrapper > .swiper.common-swiper.mrgtp0 —
          the Postgraduate Overview closes the section with the tabs and authors no
          `.isdi-elective` cards at all */}
      {data.electives?.length > 0 && (
      <div className="pt-[50px]">
        <Carousel autoplay={false} bullets="isdi">
          {data.electives.map((card) => (
            <ElectiveCard key={card.title} card={card} />
          ))}
        </Carousel>
      </div>
      )}
    </div>
  );
}
