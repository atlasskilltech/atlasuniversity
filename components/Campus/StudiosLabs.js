import { campusContent } from '@/lib/campusContent';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import ChipSlideCard from '@/components/ui/ChipSlideCard';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Studios, Labs, and Classrooms" — port of `campus-atlas.php:394-469`
 * (`section#campus-spaces.section > .container > (.h2-tag.mrg16,
 *   .sub-heading.mrgbtm, .swiper.zoom-slider-lg.mrg-lft > 6x .swiper-slide)`).
 *
 * The carousel mechanism — the 0.6 / 0.65 / 1 scale ladder, the next card's
 * -100px pull, 2s autoplay, loop and bullets below 568px — is the shared
 * `ZoomSliderLg`, which also drives the two instances on /life-at-atlas and
 * which carries the notes on what the reference does and does not do here.
 * Only `.mrg-lft` is this page's: `margin-left: 20%`, cancelled below 768px.
 *
 * The card is `components/ui/ChipSlideCard`, shared with
 * /advantages/atlas-enterprenurship, which uses it twice; it carries the
 * measurements.
 */
export default function StudiosLabs() {
  const { studios } = campusContent;

  return (
    /* ref section#campus-spaces.section — the id is kept only on the first of
       the four sections the reference gives it to */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{studios.heading}</h2>
        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{studios.subheading}</div>

        {/* ref .swiper.zoom-slider-lg.mrg-lft */}
        <ZoomSliderLg className="ml-[20%] max-md:ml-0" label={studios.heading}>
          {studios.slides.map((slide) => (
            <ChipSlideCard key={slide.title} slide={slide} />
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}
