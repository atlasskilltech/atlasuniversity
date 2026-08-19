import { entrepreneurshipContent } from '@/lib/entrepreneurshipContent';
import GridGallery from '@/components/ui/GridGallery';
import { COMMON_WRAPPER } from '@/components/ui/ContentCardB';
import { CONTAINER, SECTION, H2, SUB_H2 } from '@/components/Home/SectionHead';

/**
 * "From Campus to Company - Student Startup Founders" — port of
 * `atlas-enterprenurship.php:591-648` (`section.section > .container >
 * (h2.h2-tag.mrg16, h2.sub-heading,
 *  .instagram-wrapper.mobile-vert-scroll.mar-0 > .grid-gallery >
 *  8 x .grid-card-atlas)`).
 *
 * The masonry wall is the shared `GridGallery` on its `atlas` card.
 *
 * The reference repeats the heading verbatim as the lead — both the
 * `h2.h2-tag.mrg16` and the `h2.sub-heading` read "From Campus to Company -
 * Student Startup Founders". That is the reference's own copy and it is
 * transcribed rather than tidied.
 *
 * `.instagram-wrapper.mobile-vert-scroll.mar-0` contributes only its zeroed
 * top margin here; its `overflow: scroll` exists for the reference's
 * full-viewport-tall box, which is not reproduced.
 */
export default function Founders() {
  const { founders } = entrepreneurshipContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{founders.heading}</h2>

        {/* ref h2.sub-heading — the same line again, as the reference has it */}
        <div className={SUB_H2}>{founders.subheading}</div>

        {/* ref .instagram-wrapper.mobile-vert-scroll.mar-0 > .grid-gallery */}
        <div className={COMMON_WRAPPER}>
          <GridGallery
            cards={founders.gallery}
            variant="atlas"
            className="mt-0"
            name="z-[3] text-[24px] font-bold leading-6 text-atlas-cyan max-md:text-[20px]"
            caption="z-[3] text-[18px] font-medium leading-8 text-white max-md:text-[16px] max-md:leading-6"
          />
        </div>
      </div>
    </section>
  );
}
