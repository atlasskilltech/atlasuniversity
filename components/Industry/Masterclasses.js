import { masterclasses } from '@/lib/industryContent';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import SpeakerSlideCard from '@/components/ui/SpeakerSlideCard';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Industry Expert-Led Masterclasses" — port of
 * `atlas-industry-centric-approach.php:330-459`
 * (`section.section > .container > (h2.h2-tag.mrg16, h2.sub-heading.mrgbtm,
 *   .swiper.zoom-slider-lg.mrg-lft > 10 x .slider-card-e-ugdx)`).
 *
 * Ten speakers on the shared `SpeakerSlideCard`, carried by the shared
 * `ZoomSliderLg` — the 0.6 / 0.65 / 1 scale ladder, the next card's -100px
 * pull, 2s autoplay, loop and bullets below 568px — with `.mrg-lft`'s
 * `margin-left: 20%`, cancelled below 768px.
 *
 * The same section /advantages/atlas-career-services builds as "Pre-Placement
 * Talks", with one addition: every card here carries an `img.comp-image`, the
 * speaker's employer logo pinned to the card's top-right.
 */
export default function Masterclasses() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{masterclasses.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm — a lead, not a heading */}
        <div className={SUB_H2_MRGBTM}>{masterclasses.subheading}</div>

        {/* ref .swiper.zoom-slider-lg.mrg-lft */}
        <ZoomSliderLg className="ml-[20%] max-md:ml-0" label={masterclasses.heading}>
          {masterclasses.slides.map((slide) => (
            <SpeakerSlideCard key={slide.title} slide={slide} />
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}
