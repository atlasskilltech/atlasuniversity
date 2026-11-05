import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import CardTypeF from '@/components/ui/CardTypeF';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';
import IconHeading from '../IconHeading';
import { BLUE_DESC_WRAP, COMMON_WRAPPER_LG, HEAD_WRAP, LogoStrip, SUB_BLUE_TEXT, TT_WRAP } from './ui';

/**
 * #4 "Global Exposure" (`atlas-isdi-advantage/the-isdi-advantage/index.php:687-846`).
 *
 *   section#global-exposure-isdi.section >
 *     .icon-heading
 *     .container > (.blue-desc-wrap > .sub-heading.isdi-blue-text,
 *                   .center-image-full-wrap.mrgtp.isdi > .w-embed-youtubevideo > iframe)
 *     .container > 2 x .common-wrapper-lg (heading + lead + .swiper.common-swiper)
 *     .slide-wrap.custom-paddning > 10 x img
 *
 * The second group wraps its heading in `.head-wrap > .tt-wrap` where the first
 * authors the heading and lead directly — a difference that shows at <=767, where
 * `.head-wrap` becomes a stretched column and `.tt-wrap` takes mr20 mb20. Hence
 * `group.wrapped`.
 *
 * Measured at 1440 / 768 / 390:
 *   .blue-desc-wrap          row, space-between, top-aligned, pt56; column,
 *                            gap 8, pt40 at <=767
 *   .sub-heading.isdi-blue-text  18px/1.7 #011136 — the modifier changes the SIZE
 *                            and the ratio, not just the colour, and being a
 *                            compound selector it holds at every width
 *   .common-wrapper-lg       pt100
 *   .common-swiper           pt56 (40 at <=767), 24px between cards
 *
 * **The video here is a direct YouTube embed**, unlike #1's embedly wrapper: the
 * reference authors `youtube.com/embed/zzX0vtHhOg8?rel=1&controls=0&autoplay=1&mute=1&start=0`
 * in a `.w-embed-youtubevideo` whose inline `padding-top` sets the frame's height.
 * It is given `loading="lazy"`, which the reference does not have — the deviation
 * the About page already records for its own embed.
 */
function Group({ group }) {
  const head = (
    <>
      {/* ref h2.h2-tag.mrg16.isdi */}
      <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(group.heading)}</h2>
      {/* ref .sub-heading */}
      <div className={SUB}>{withBreaks(group.sub)}</div>
    </>
  );

  return (
    /* ref .common-wrapper-lg */
    <div className={COMMON_WRAPPER_LG}>
      {/* the heading sits in `.container`; the slider must NOT — `Carousel` pads its
          own track by the container inset to reproduce the reference's
          `overflow: visible` bleed, so nesting it inside `.container` applies the
          inset twice and starts the first card 62px right (measured 161 against the
          reference's 99). The same trap the homepage testimonials record. */}
      <div className={CONTAINER}>
        {group.wrapped ? (
          /* ref .head-wrap > .tt-wrap */
          <div className={HEAD_WRAP}>
            <div className={TT_WRAP}>{head}</div>
          </div>
        ) : (
          head
        )}
      </div>

      <Carousel autoplay={false} bullets="isdi" className="pt-14 max-md:pt-10">
        {group.cards.map((card, i) => (
          <CardTypeF key={`${i}-${card.image.src}`} card={card} variant="base" />
        ))}
      </Carousel>
    </div>
  );
}

export default function GlobalExposure({ data }) {
  return (
    /* ref section#global-exposure-isdi.section — the section id and its own
       `.icon-main-title` id are the SAME string upstream, so only the section keeps it */
    <section id="global-exposure-isdi" data-block="global" className={SECTION}>
      <IconHeading num={data.icon.num} title={data.icon.title} size="lg" />

      <div className={CONTAINER}>
        {/* ref .blue-desc-wrap */}
        <div className={BLUE_DESC_WRAP}>
          {/* ref .sub-heading.isdi-blue-text */}
          <div className={SUB_BLUE_TEXT}>{withBreaks(data.lead)}</div>
        </div>

        {/* ref .center-image-full-wrap.mrgtp.isdi > .w-embed-youtubevideo */}
        <div className="relative mb-[5px] mt-14 overflow-hidden rounded-2xl max-md:mt-10">
          <div className="relative w-full" style={{ paddingTop: `${data.video.paddingTop}%` }}>
            <iframe
              src={data.video.src}
              title={data.video.title || 'Global exposure at ISDI'}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
              frameBorder="0"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>

      {data.groups.map((group, i) => (
        <Group key={`${i}-${group.heading}`} group={group} />
      ))}

      {/* ref .slide-wrap.custom-paddning — this section has no figures band, only the
          marquee, and its padding differs from Industry Connect's (pt56/pb0 against
          pt40/pb20), so it is the local `LogoStrip` rather than `Home/StatsStrip` */}
      <LogoStrip logos={data.logos} pad="custom" />
    </section>
  );
}
