import Carousel from '@/components/Carousel/Carousel';
import SmartLink from '@/components/SmartLink';
import IconSection from './IconSection';

/**
 * Press Coverage — port of about-us/index.php:1305-1484
 * (`section#press-coverage.section > (.icon-heading, .white-wrapper > .container >
 *   .swiper.common-swiper > 6 x .card-news.swiper-slide.isdi)`).
 *
 * The /about-us "ATLAS in the News" tile (`components/About/AtlasInTheNews`) on
 * ISDI's variant, which changes its corners, padding and button, so it is drawn here.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390 (the card never changes size):
 *   card              272 x 400, #f2f2f2, r16, clipped, p 8/12, column,
 *                     space-between
 *   logo              h32, auto width, centred, mb8
 *   photo             full width x 156, cover
 *   .cdnw-cont        px12; title 16px/1.5 500, 110 tall, p 14/23, clipped
 *   .cn-date          1px black top rule, mx23, mt12, py12, row space-between;
 *                     date 12px/1.5
 *   arrow button      40px #ec1376 circle, 25px icon    44px, 20px icon at <=767
 *
 * The slider is `.common-swiper` (pt56 / 40, no autoplay, dots below 569). Every
 * arrow button is authored `href="#"`; they are kept as authored.
 */
export default function PressCoverage({ data }) {
  return (
    <IconSection id="press-coverage" block="press" icon={data.icon} title={data.title} tone="white">
      {/* ref .swiper.common-swiper */}
      <div className="pt-14 max-md:pt-10">
        <Carousel autoplay={false} bullets="isdi">
          {data.cards.map((card) => (
            /* ref .card-news.swiper-slide.isdi */
            <div
              key={card.title}
              className="relative flex h-[400px] w-[272px] flex-none flex-col justify-between overflow-hidden rounded-2xl bg-[#f2f2f2] px-3 py-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.logo.src}
                width={card.logo.width}
                height={card.logo.height}
                alt={card.logo.alt}
                loading="lazy"
                decoding="async"
                className="mx-auto mb-2 block h-8 w-auto max-w-full"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                width={card.image.width}
                height={card.image.height}
                alt={card.image.alt}
                loading="lazy"
                decoding="async"
                className="h-[156px] w-full max-w-full object-cover align-middle"
              />
              {/* ref .cdnw-cont */}
              <div className="px-3">
                <div className="h-[110px] overflow-hidden px-[23px] py-3.5 font-medium">{card.title}</div>
              </div>
              {/* ref .cn-date */}
              <div className="mx-[23px] mt-3 flex items-center justify-between border-0 border-t border-solid border-black py-3">
                <div className="text-[12px] leading-[1.5]">{card.date}</div>
                {/* ref a.icon-button (pink-fill-small) */}
                <SmartLink
                  href={card.href}
                  aria-label={card.title}
                  className="flex h-10 w-10 max-w-full flex-none items-center justify-center rounded-[30px] bg-[#ec1376] max-md:h-11 max-md:w-11"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/icons/arrow-downward.svg"
                    width={27}
                    height={27}
                    alt=""
                    loading="lazy"
                    className="w-[25px] max-w-full align-middle leading-none max-md:w-5"
                  />
                </SmartLink>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </IconSection>
  );
}
