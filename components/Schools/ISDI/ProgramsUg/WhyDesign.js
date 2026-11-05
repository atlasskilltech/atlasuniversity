import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, H2, SECTION } from '../Home/ui';
import IconHeading from '../IconHeading';
import FacultyCard from '../FacultyCard';

/**
 * "Why Design At ISDI?" and, in the same `section.section`, #1 "ATLAS Students Learn
 * from Industry Leaders, not Just Lecturers" — port of
 * reference/schools/isdi/programs/undergraduate/index.php:197-370.
 *
 *   section.section > .container > .top-txt-wrapper (h2 + lead)
 *                   > .icon-heading (#1)
 *                   > .container > .white-desc-wrap > .black-desc-text.isdi
 *                                > .swiper.common-swiper.mrgtp32 > 8 x .port-card-m-wrap.isdi
 *
 * Measured:
 *                        >=768px                       <=767px
 *   h2.h2-tag.mrg32      44px/1.2 400 #1a1a1a, mb32    36px from 991 down
 *   .black-desc-text     24px/32px 300 black           18px/32px — but the first
 *                        lead keeps 24px at every width (see below)
 *   .white-desc-wrap     row, space-between, pt56      column, gap 10, pt20
 *                                                      (gap 8 at <=479)
 *   .common-swiper.mrgtp32  pt32, 24px between cards
 *
 * The card itself is `components/Schools/ISDI/FacultyCard`, which carries its own
 * measured cascade and is shared with /atlas-isdi-advantage.
 *
 */
export default function WhyDesign({ data }) {
  return (
    <section data-block="why" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .top-txt-wrapper */}
        <div>
          <div className={cx(H2, 'mb-8')}>{data.heading}</div>
          {/* ref .black-desc-text.mrgbtm.isdi — a compound selector (0,3,0), so its
              24px survives the <=767 media query that takes the plain
              `.black-desc-text` to 18px (as the lead under #1 below does) */}
          <div className="mb-14 max-w-full flex-1 text-[24px] font-light leading-[32px] text-black">{data.text}</div>
        </div>
      </div>

      <IconHeading num={data.num} title={data.title} />

      <div className={CONTAINER}>
        {/* ref .white-desc-wrap */}
        <div className="flex items-start justify-between pt-14 text-black max-md:flex-col max-md:gap-2.5 max-md:pt-5 max-sm:gap-2">
          <div className="max-w-full flex-1 text-[24px] font-light leading-[32px] max-md:text-[18px]">
            {withBreaks(data.lead)}
          </div>
        </div>
      </div>

      {/* ref .swiper.common-swiper.mrgtp32 */}
      <div className="pt-8">
        <Carousel autoplay={false} bullets="isdi">
          {data.cards.map((card) => (
            <FacultyCard key={card.name} card={card} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
