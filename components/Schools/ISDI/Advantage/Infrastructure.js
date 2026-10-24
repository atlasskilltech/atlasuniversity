import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';
import IconHeading from '../IconHeading';
import InViewVideo from '../Home/InViewVideo';
import { BLUE_WRAPPER, COMMON_WRAPPER, COMMON_WRAPPER_LG, PortCardI } from './ui';

/**
 * #5 "New Age Tech-Led Infrastructure"
 * (`atlas-isdi-advantage/the-isdi-advantage/index.php:847-977`).
 *
 *   div#infra-isdi.section >
 *     .icon-heading (its `.icon-main-title` carries id="Infrastructure-isdi")
 *     .blue-wrapper.isdi-blue-5 > .container > .common-wrapper >
 *       (.sub-heading, .center-image-full-wrap.mrgtp > .w-background-video)
 *     .common-wrapper-lg > .container >
 *       (h3.h2-tag.mrgtbm0.isdi,
 *        .swiper.common-swiper > 5 x .port-card-i-wrap.isdi,
 *        .swiper.common-swiper > 2 x .isdi-lib-cards)
 *
 * **The media here is a Webflow `.w-background-video`, not a YouTube embed** — the
 * only self-hosted clip on the page, authored mp4 then webm with its poster on
 * `data-poster-url`. It is 1280x720 and 2m35s; the mp4 ships re-encoded (39.1 ->
 * 22.7MB at SSIM 0.988) and the webm byte-for-byte, because re-encoding it saved
 * only 15% and the gate is 40%.
 *
 * Measured at 1440 / 768 / 390:
 *   .center-image-full-wrap  mt56 (40 at <=767), mb5, r16, clipped
 *   h3.h2-tag.mrgtbm0.isdi   44px/1.2 400 (36 from 991), mb0 -> mb20 at <=767
 *   .isdi-lib-cards          606 x 215 at EVERY width, p32, r16, its own colour
 *                            and vector; `.lib-title` 24px/500 with a 28px bottom
 *                            margin AND an 8px bottom border, `.vision-subs` 16/1.5
 *
 * The second library card nests a `.marquee-swiper` strip of eight e-resource logos;
 * the first authors none, so the strip is conditional.
 */
function LibCard({ card }) {
  return (
    /* ref .isdi-lib-cards */
    <div
      className="h-[215px] w-[606px] flex-none overflow-hidden rounded-2xl bg-no-repeat p-8 text-white"
      style={{
        backgroundColor: card.background,
        backgroundImage: `url(${card.image})`,
        backgroundPosition: card.position,
      }}
    >
      {/* ref .lib-title */}
      <div className="mb-7 inline-block border-0 border-b-8 border-solid border-[#ec1376] text-[24px] font-medium leading-[0.7] text-white">
        {withBreaks(card.title)}
      </div>
      {/* ref .vision-subs */}
      <div className="text-base leading-[1.5] text-white">{withBreaks(card.text)}</div>

      {card.logos.length > 0 && (
        /* ref .stack-swip-wrap.big > .swiper.marquee-swiper — 500 wide, mt12 and
           clipped, becoming width auto with a 250px cap at <=767 */
        <div className="mt-3 w-[500px] min-w-[200px] overflow-hidden max-md:w-auto max-md:max-w-[250px]">
          <div className="flex items-center gap-6">
            {card.logos.map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${i}-${logo.src}`}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="max-w-full flex-none align-middle"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Infrastructure({ data }) {
  return (
    /* ref div#infra-isdi.section */
    <div id="infra-isdi" data-block="infra" className={SECTION}>
      <IconHeading num={data.icon.num} title={data.icon.title} titleId={data.icon.titleId} size="lg" />

      {/* ref .blue-wrapper.isdi-blue-5 */}
      <div className={BLUE_WRAPPER}>
        <div className={CONTAINER}>
          <div className={COMMON_WRAPPER}>
            {/* ref .sub-heading */}
            <div className={cx(SUB, 'text-white')}>{withBreaks(data.intro.sub)}</div>

            {/* ref .center-image-full-wrap.mrgtp (no `.isdi`, so radius 0) >
                .w-background-video, which is a FIXED `height: 500px` frame — letting
                the clip size itself from its 1280x720 ratio was +198.6px at 1440 */}
            <div className="relative mb-[5px] mt-14 overflow-hidden max-md:mt-10">
              <div className="relative h-[500px] overflow-hidden text-white">
                <InViewVideo
                  sources={data.intro.video.sources}
                  poster={data.intro.video.poster}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ref .common-wrapper-lg */}
      <div className={COMMON_WRAPPER_LG}>
        <div className={CONTAINER}>
          {/* ref h3.h2-tag.mrgtbm0.isdi */}
          <h3 className={cx(H2, H2_MB.mrgtbm0)}>{withBreaks(data.heading)}</h3>
        </div>

        {/* ref .swiper.common-swiper > .port-card-i-wrap.isdi */}
        <Carousel autoplay={false} bullets="isdi" className="pt-14 max-md:pt-10">
          {data.spaces.map((card, i) => (
            <PortCardI key={`${i}-${card.text}`} card={card} />
          ))}
        </Carousel>

        {/* ref .swiper.common-swiper > .isdi-lib-cards */}
        <Carousel autoplay={false} bullets="isdi" className="pt-14 max-md:pt-10">
          {data.lib.map((card, i) => (
            <LibCard key={`${i}-${card.title}`} card={card} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
