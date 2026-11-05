import { careerServicesContent } from '@/lib/careerServicesContent';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import SpeakerSlideCard from '@/components/ui/SpeakerSlideCard';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Pre-Placement Talks" — port of `atlas-career-services.php:458-551`
 * (`section.section > .container > (h2.h2-tag.mrg16, h2.sub-heading.mrgbtm,
 *   .swiper.zoom-slider-lg.mrg-lft > 7 x .slider-card-e-ugdx)`).
 *
 * The carousel is the shared `ZoomSliderLg` — the 0.6 / 0.65 / 1 scale ladder,
 * the next card's -100px pull, 2s autoplay, loop and bullets below 568px — with
 * `.mrg-lft`'s `margin-left: 20%`, cancelled below 768px, exactly as
 * /campus-atlas "Studios, Labs, and Classrooms" uses it.
 *
 * The card is `components/ui/SpeakerSlideCard`, shared with
 * /advantages/atlas-industry-centric-approach "Industry Expert-Led
 * Masterclasses"; it carries the measurements. It is NOT /campus-atlas's card:
 * that one wraps the same `.slider-card-e-ugdx` around a cyan chip label
 * (`.slider-card-e-atlas-2` + `.slide-cd-atlas-2`, padding `0 40 50 0`), which
 * is `components/ui/ChipSlideCard`.
 */
export default function PrePlacement() {
  const { prePlacement } = careerServicesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{prePlacement.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm — a lead, not a heading */}
        <div className={SUB_H2_MRGBTM}>{prePlacement.subheading}</div>

        {/* ref .swiper.zoom-slider-lg.mrg-lft */}
        <ZoomSliderLg className="ml-[20%] max-md:ml-0" label={prePlacement.heading}>
          {prePlacement.slides.map((slide) => (
            <SpeakerSlideCard key={slide.title} slide={slide} />
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}
