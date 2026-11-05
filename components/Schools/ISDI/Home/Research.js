import { cx } from '@/lib/cx';
import Carousel from '@/components/Carousel/Carousel';
import CardA from '../CardA';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from './ui';

/**
 * "Research & Reflections" — port of reference/schools/isdi/index.php:3828-4038.
 *
 *   section.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading,
 *     .swiper.common-swiper > 8 x .card (card-a, isdi variant))
 *
 * The card is `../CardA` (`isdi` variant, 295 x 500), which the About page's
 * "Thought Leadership" and "ATLAS Times" share.
 *
 * The slider is `.common-swiper` (no `.mrgtp0`): pt56, pt40 below 768, with the
 * in-flow bullet row below 569. No autoplay (ISDI's `initCommonSwiper`).
 */
export default function Research({ data }) {
  return (
    <section data-block="research" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB}>{data.sub}</div>
      </div>
      {/* ref .swiper.common-swiper */}
      <div className="pt-14 max-md:pt-10">
        <Carousel autoplay={false} bullets="isdi">
          {data.cards.map((card) => (
            <CardA key={card.href} card={card} cta={data.cta} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
