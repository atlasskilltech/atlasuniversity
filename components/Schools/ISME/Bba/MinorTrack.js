import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import IconHeading from '@/components/Schools/ISDI/IconHeading';
import { SECTION } from '@/components/Home/SectionHead';

/**
 * Step 2 — "Minor Track (Choose one)": `section#minors > .icon-heading + .container >
 * .minor-card-wrapper > .swiper.common-swiper > N x a.minor-track-links > .port-card-o-wrap.auto`.
 *
 * Every card is a link to the major+minor combination page (`…/majoring-in-<major>/<minor>#minors`);
 * the one this page IS carries `.cd-active` — mint panel, black copy and a mint tick badge.
 *
 * Rules, from the page's sheet:
 *   .swiper.common-swiper  pt56 (40 at <=767), overflow visible
 *   .port-card-o-wrap.auto 295 wide, auto height, a clipped column
 *   .port-card-o-image     295 x 300, cover
 *   .port-card-o-txt-wrap  #072058 (mint when active), min-height 290, p22, position static
 *     title                24px/1.4 400 mint (black when active)
 *     desc                 15px/1.6 white (black when active), pt14
 *     .port-card-o-arrow   a #072058 29x21 triangle at -20 / 30 — against the CARD, because
 *                          the panel is static, so it sits above the photo's top edge and the
 *                          card's `overflow: hidden` clips it away. It is kept for parity and
 *                          paints nothing, exactly as upstream.
 *   .cd-ico-wrap           absolute 24/24 from the card's top-right; `display: none` unless active
 *
 * The sheet gives `.swiper-wrapper` `align-items: center`, and the cards are content-height, so a
 * short card is centred against the tallest one rather than stretched.
 */
export default function MinorTrack({ data }) {
  const group = data.groups.find((g) => !g.hidden) ?? data.groups[0];
  return (
    <section data-block="minor" id="minors" className={SECTION}>
      {data.heading && <IconHeading num={data.heading.num} title={data.heading.title} size="lg" tone="isme" />}

      {/* ref .container#choose-card-prog > .minor-card-wrapper > .swiper.common-swiper — the
          carousel is a sibling of the container here so it can run past its right edge */}
      <Carousel autoplay={false} arrowStyle="isme" bullets="inline" align="center" className="pt-14 max-md:pt-10">
        {group.cards.map((card, i) => (
          /* ref a.minor-track-links */
          <a key={`${i}-${card.title}`} href={card.href} className="block max-w-full no-underline">
            {/* ref .port-card-o-wrap.auto */}
            <div className="relative flex w-[295px] cursor-pointer flex-col items-stretch justify-start overflow-hidden text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                alt={card.image.alt}
                loading="lazy"
                decoding="async"
                className="mx-auto mb-0 block h-[300px] w-full flex-[0_1_auto] cursor-pointer self-start object-cover"
              />
              {/* ref .port-card-o-txt-wrap(.cd-active) */}
              <div className={cx('block min-h-[290px] w-full flex-none p-[22px]', card.active ? 'bg-atlas-mint' : 'bg-[#072058]')}>
                <div className={cx('relative z-[2] text-[24px] font-normal leading-[1.4]', card.active ? 'text-black' : 'text-atlas-mint')}>
                  {withBreaks(card.title)}
                </div>
                <div className={cx('pt-3.5 text-[15px] font-normal leading-[1.6]', card.active ? 'text-black' : 'text-white')}>
                  {withBreaks(card.text)}
                </div>
                {/* ref .port-card-o-arrow — clipped by the card, see above */}
                <div aria-hidden className="absolute left-[30px] top-[-20px] text-[#072058]">
                  <svg width="29" height="21" viewBox="0 0 29 21" fill="none" className="block">
                    <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              {card.active && data.tick && (
                /* ref .cd-ico-wrap > .icon-button (mint-normal-mid) */
                <div className="absolute right-6 top-6 block">
                  <span className="flex items-center justify-center rounded-full bg-atlas-mint p-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.tick} alt="" width={22} height={17} className="block w-[22px] max-w-full max-md:w-[18px]" />
                  </span>
                </div>
              )}
            </div>
          </a>
        ))}
      </Carousel>
    </section>
  );
}
