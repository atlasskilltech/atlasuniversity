import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import CardTypeF from '@/components/ui/CardTypeF';
import { CONTAINER, SECTION, SUB_MRGBTM32 } from '../Home/ui';
import IconHeading from '../IconHeading';
import StatsBand from '../StatsBand';
import { BLUE_WRAPPER, COMMON_WRAPPER, H3_TAG } from './ui';

/**
 * #1 "Redefining Design Education with Parsons School of Design"
 * (`atlas-isdi-advantage/the-isdi-advantage/index.php:123-200`).
 *
 *   section#parsons-collabrations.section >
 *     .icon-heading
 *     .blue-wrapper.isdi-blue-5 > .container > .common-wrapper >
 *       (.h3-tag, .sub-heading.mrgbtm32, .isdi-curve > .w-video.w-embed > iframe)
 *     .top-cards-wrapper.padbtm0 > 3 x .head-top-card
 *     .swiper.common-swiper > 6 x .card-type-f (base variant)
 *
 * **The video is an embedly wrapper, not a bare YouTube embed.** The reference
 * authors `//cdn.embedly.com/widgets/media.html?src=…youtube.com/embed/6yuryPyIra4`
 * inside a `.w-video.w-embed` whose inline `padding-top: 56.17%` is what gives the
 * frame its height — a ratio that is NOT 16:9, so it is transcribed rather than
 * rounded. `.isdi-curve` clips it to a 16px radius.
 *
 * The figure band is the shared `../StatsBand`: its `.sm-text-isme.isdi` label and
 * every box measured identical here. These three cards author **no `.large-text`**,
 * so the component's `value` is left unset and the figure is not rendered — the
 * reference has no second line in the card at all.
 */
export default function Parsons({ data }) {
  return (
    /* ref section#parsons-collabrations.section */
    <section id="parsons-collabrations" data-block="parsons" className={SECTION}>
      <IconHeading num={data.icon.num} title={data.icon.title} titleId={data.icon.titleId} size="lg" />

      {/* ref .blue-wrapper.isdi-blue-5 */}
      <div className={BLUE_WRAPPER}>
        <div className={CONTAINER}>
          {/* ref .common-wrapper */}
          <div className={COMMON_WRAPPER}>
            {/* ref .h3-tag */}
            <div className={H3_TAG}>{data.h3}</div>
            {/* ref .sub-heading.mrgbtm32 */}
            <div className={cx(SUB_MRGBTM32, 'text-white')}>
              {typeof data.sub === 'string'
                ? withBreaks(data.sub)
                : data.sub.map((run, i) =>
                    typeof run === 'string' ? run : <strong key={i} className="font-bold">{run.strong}</strong>
                  )}
            </div>

            {/* ref .isdi-curve > .w-video.w-embed */}
            <div className="overflow-hidden rounded-2xl">
              <div className="relative w-full" style={{ paddingTop: `${data.video.paddingTop}%` }}>
                <iframe
                  src={data.video.src}
                  title={data.video.title || 'ISDI x Parsons'}
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  scrolling="no"
                  frameBorder="0"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ref .top-cards-wrapper.padbtm0 */}
      <StatsBand data={data.stats} />

      {/* ref .swiper.common-swiper */}
      <Carousel autoplay={false} bullets="isdi" className="pt-14 max-md:pt-10">
        {data.gallery.map((card, i) => (
          <CardTypeF key={`${i}-${card.image.src}`} card={card} variant="base" />
        ))}
      </Carousel>
    </section>
  );
}
