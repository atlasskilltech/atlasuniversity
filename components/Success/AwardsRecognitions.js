import { successContent } from '@/lib/successContent';
import GridGallery from '@/components/ui/GridGallery';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Awards & Recognitions" — port of `success-stories-atlas.php:1286-1344`
 * (`.section > .container > (h2.h2-tag.mrg32, .sub-heading, .grid-gallery >
 *   8 x .grid-card-atlas)`).
 *
 * The third masonry wall on the page, on the shared `GridGallery`'s `atlas`
 * card: the 32px corners sit on the card rather than on the image (these
 * images have no `.round`), and below 768px the card is a fixed 300px block of
 * automatic height rather than a two-column cell.
 *
 *   .grid-card-name-atlas   24px/24, 700, #5cbdca -> 20px below 768
 *   .title-txt-grid         18px/32, 500, #fff    -> 16px/24 below 768
 */
export default function AwardsRecognitions() {
  const { awards } = successContent;

  return (
    /* ref .section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg32 */}
        <h2 className={`mb-8 ${H2}`}>{awards.heading}</h2>

        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{awards.subheading}</div>

        {/* ref .grid-gallery */}
        <GridGallery
          cards={awards.cards}
          variant="atlas"
          name="z-[3] text-[24px] font-bold leading-6 text-atlas-cyan max-md:text-[20px]"
          caption="z-[3] text-[18px] font-medium leading-8 text-white max-md:text-[16px] max-md:leading-6"
        />
      </div>
    </div>
  );
}
