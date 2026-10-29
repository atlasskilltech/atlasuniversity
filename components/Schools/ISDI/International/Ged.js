import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import CardTypeF from '@/components/ui/CardTypeF';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';
import { HEAD_WRAP, Runs, TT_WRAP } from './ui';

/**
 * "Global education fair at ATLAS ISDI"
 * (`atlas-isdi-advantage/internationalisation/index.php:965-1013`).
 *
 *   section#ged-isdi.section > .container >
 *     (.head-wrap > .tt-wrap > (h2.h2-tag.mrg16.isdi, .sub-heading),
 *      .swiper.common-swiper > 5 x .card-type-f (base variant, each with a logo))
 *
 * The carousel sits inside `.container` — 1242 wide at 1440 against 272px slides —
 * so it does not bleed. `.common-swiper` is pt56, 40 at <=767.
 *
 * These five `.card-type-f`s are the only ones on the page with a
 * `.cd-tyf-logo-img`; the Summer School carousel's nine leave `.cd-tyf-detail`
 * empty, which `CardTypeF` already renders as the box it is.
 */
export default function Ged({ data }) {
  return (
    /* ref section#ged-isdi.section */
    <section id="ged-isdi" data-block="ged" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap */}
        <div className={HEAD_WRAP}>
          {/* ref .tt-wrap */}
          <div className={TT_WRAP}>
            <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
            <div className={SUB}>
              <Runs value={data.sub} />
            </div>
          </div>
        </div>

        {/* ref .swiper.common-swiper */}
        <Carousel autoplay={false} bleed={false} bullets="isdi" className="pt-14 max-md:pt-10">
          {data.gallery.map((card, i) => (
            <CardTypeF key={`${i}-${card.image.src}`} card={card} variant="base" />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
