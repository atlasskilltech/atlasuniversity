import { cx } from '@/lib/cx';
import MarqueeTrack from './MarqueeTrack';
import { CONTAINER, H2, H2_MB, SECTION } from './ui';

/**
 * "Our Halls attract the Remarkable" — port of
 * reference/schools/isdi/index.php:2557-3011.
 *
 *   div.section > .container > h2.h2-tag.isdi
 *               > .swiper.marquee-swiper (full bleed) > 24 x .slider-card-wrapper
 *
 * Measured:
 *                     >=768px                          <=767px
 *   card              800 x 475, r24                   475 tall, as wide as its
 *                                                      photo at that height (`width:
 *                                                      100%` of a content-sized slide)
 *   scrim             full card, #002637 0 -> #040404 .8, content bottom-left
 *                     pb50 pl40                        p0/20/20/20
 *   name              32px/500, line-height .5, white, 12px #ec1376 underline
 *                                                      24px
 *   role              18px/1.5, pt16, white,           14px/1.5, pt8
 *                     max-width 100% (index.php's inline override of the
 *                     sheet's 70%)
 *
 * The strip is a `MarqueeTrack` (Swiper `speed: 4000, delay: 0`, linear, pauses on
 * hover). Each card's `data-slider-card-a-bg="Paste image url"` feeds a script
 * that would paint `url(Paste image url)` — invalid, so it paints nothing and is
 * not ported.
 */

export default function Halls({ data }) {
  return (
    <div data-block="halls" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.base)}>{data.heading}</h2>
      </div>

      <MarqueeTrack>
        {data.cards.map((card) => (
          /* ref .slider-card-wrapper */
          <div
            key={card.name}
            className="relative block h-[475px] w-[800px] overflow-hidden rounded-3xl max-md:w-auto"
          >
            {/* ref .slide-content-a */}
            <div className="absolute inset-0 z-[1] flex flex-col items-start justify-end bg-[linear-gradient(#00263700,#040404cc)] pb-[50px] pl-10 max-md:px-5 max-md:pb-5">
              <div className="border-0 border-b-[12px] border-solid border-[#ec1376] text-[32px] font-medium leading-[.5] text-white max-md:text-[24px] max-md:leading-[.5]">
                {card.name}
              </div>
              <div className="max-w-full pt-4 text-[18px] leading-[1.5] text-white max-md:pt-2 max-md:text-[14px] max-md:leading-[1.5]">
                {card.role}
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.src}
              srcSet={card.image.srcSet}
              sizes={data.sizes}
              width={card.image.width}
              height={card.image.height}
              alt={card.image.alt}
              loading="lazy"
              decoding="async"
              className="inline-block h-full w-full max-w-full object-cover align-middle max-md:w-auto"
            />
          </div>
        ))}
      </MarqueeTrack>
    </div>
  );
}
