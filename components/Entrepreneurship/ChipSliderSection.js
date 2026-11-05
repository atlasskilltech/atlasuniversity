import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import withBreaks from '@/lib/withBreaks';
import ChipSlideCard from '@/components/ui/ChipSlideCard';
import StatBand from '@/components/ui/StatBand';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';

/**
 * The two `.swiper.zoom-slider-lg.mrg-lft` carousels on
 * /advantages/atlas-enterprenurship:
 *
 *   "Our Teaching Pedagogy: The 3H Approach"      `:147`  7 slides, `.mrgtp`,
 *                                                        with a three-card stat
 *                                                        band between the lead
 *                                                        and the carousel
 *   "Learning Through Entrepreneurial Action"     `:321`  4 slides
 *
 * Both are the shared `ZoomSliderLg` over the shared `ChipSlideCard`, exactly
 * as /campus-atlas "Studios, Labs, and Classrooms" uses them. `.mrg-lft` is
 * `margin-left: 20%`, cancelled below 768px; `.mrgtp` adds `margin-top: 56px`,
 * dropping to 20px below 992px.
 *
 * The 3H section is the one place on the site where a `.top-cards-wrapper`
 * appears mid-section rather than under the hero; it is the same `StatBand`,
 * and it breaks out of `.container` exactly as the hero's does.
 */
export default function ChipSliderSection({ data, stats, spacedTop }) {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{data.heading}</h2>

        {/* ref .sub-heading.mrgbtm / h2.sub-heading.mrgbtm32 */}
        <div className={stats ? SUB_H2_MRGBTM32 : SUB_INNER_MRGBTM}>
          {withBreaks(data.subheading)}
        </div>
      </div>

      {/* ref .top-cards-wrapper.padbtm0 — full-bleed, outside .container */}
      {stats && <StatBand data={stats} />}

      {/* ref .container > .swiper.zoom-slider-lg.mrg-lft(.mrgtp) */}
      <div className={CONTAINER}>
        <ZoomSliderLg
          className={`ml-[20%] max-md:ml-0 ${spacedTop ? 'mt-14 max-lg:mt-5' : ''}`}
          label={data.heading}
        >
          {data.slides.map((slide) => (
            <ChipSlideCard key={slide.title} slide={slide} />
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}
