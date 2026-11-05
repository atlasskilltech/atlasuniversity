import Carousel from '@/components/Carousel/Carousel';
import withBreaks from '@/lib/withBreaks';
import PatentCard from '@/components/ui/PatentCard';
import { CONTAINER, SECTION } from '../Home/ui';
import IconHeading from '../IconHeading';
import { BLUE_DESC_WRAP, BLUE_WRAPPER } from './ui';

/**
 * #9 "Impact Driven Research & Innovation"
 * (`atlas-isdi-advantage/the-isdi-advantage/index.php:1402-1467`).
 *
 *   section#research-driven-isdi.section >
 *     .icon-heading
 *     .blue-wrapper.isdi-blue-5 > .container >
 *       (.blue-desc-wrap > .blue-desc-text,
 *        .swiper.common-swiper > 5 x .patent-card.isdi)
 *
 * The card is `components/ui/PatentCard` on its `isdi` variant — the same card
 * /success-stories-atlas draws in `.atlas` colours, with every inner part measured
 * identical and only the outer box differing (#00277d and a plain 16px radius here,
 * with the base class's `vector-patent.png` wash at `soft-light`, which `.atlas`
 * cancels).
 */
export default function Research({ data }) {
  return (
    /* ref section#research-driven-isdi.section */
    <section id="research-driven-isdi" data-block="research" className={SECTION}>
      <IconHeading num={data.icon.num} title={data.icon.title} titleId={data.icon.titleId} size="lg" />

      {/* ref .blue-wrapper.isdi-blue-5 */}
      <div className={BLUE_WRAPPER}>
        <div className={CONTAINER}>
          {/* ref .blue-desc-wrap > .blue-desc-text */}
          <div className={BLUE_DESC_WRAP}>
            <div className="text-[24px] leading-[1.5] text-white max-md:text-[18px]">{withBreaks(data.lead)}</div>
          </div>
        </div>

        {/* ref .swiper.common-swiper */}
        <Carousel autoplay={false} bullets="isdi-light" className="pt-14 max-md:pt-10">
          {data.cards.map((card, i) => (
            <PatentCard key={`${i}-${card.title}`} card={card} variant="isdi" wash={data.wash} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
