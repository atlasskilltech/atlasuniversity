import Carousel from '@/components/Carousel/Carousel';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION } from '../Home/ui';

/**
 * "Your Creative Journey at ISDI" —
 *
 *   section.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading-1.mrgbtm,
 *     .swiper.common-swiper.mrgtp0 > 4 x .creative-jor-card)
 *
 * The lead is `.sub-heading-1`, NOT `.sub-heading`: 18px/1.8 rather than 24px/1.4, and it
 * drops to 1.5 at <=767 where `.sub-heading` drops to 16px. Only this section uses it.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   lead              18px/1.8 300, pr50, pb56 (`.mrgbtm`) line-height 1.5, pr0
 *   slider            `.mrgtp0` — no top padding, unlike every other `.common-swiper`
 *   card              292 x 184, r16, #193e90, pt16 pb33, its vector contained at
 *                     170% 100% (so only the left edge of the artwork shows)
 *   row               flex, gap 8, centred
 *   number            #df287b, p 8/16, 700 — a solid pink chip
 *   title             18px/1.5 500 white
 *   description       pt8, px16, 16px/1.5 white, with authored `<br>`s
 */
const SUB_1 = 'pb-14 pr-[50px] text-[18px] font-light leading-[1.8] max-md:pr-0 max-md:leading-[1.5]';

export default function CreativeJourney({ data }) {
  return (
    <section data-block="journey" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        {/* ref .sub-heading-1.mrgbtm */}
        <div className={SUB_1}>{data.sub}</div>
      </div>

      {/* ref .swiper.common-swiper.mrgtp0 */}
      <Carousel autoplay={false} bullets="isdi">
        {data.cards.map((card) => (
          /* ref .creative-jor-card */
          <div
            key={card.title}
            className="h-[184px] w-[292px] rounded-2xl bg-[#193e90] bg-contain bg-[position:170%_100%] bg-no-repeat pb-[33px] pt-4"
            style={{ backgroundImage: `url(${data.cardImage})` }}
          >
            {/* ref .div-block-44 */}
            <div className="flex items-center justify-start gap-2">
              {/* ref .creative-jor-num */}
              <div className="bg-[#df287b] px-4 py-2 font-bold text-white">{card.number}</div>
              {/* ref .creative-jor-title */}
              <div className="text-[18px] font-medium text-white">{card.title}</div>
            </div>
            {/* ref .creative-jor-subs */}
            <div className="px-4 pt-2 text-white">{withBreaks(card.text)}</div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
