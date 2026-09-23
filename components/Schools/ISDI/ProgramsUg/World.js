import withBreaks from '@/lib/withBreaks';
import ButtonRegular from '@/components/ui/ButtonRegular';
import PhotoGallery from '../PhotoGallery';
import { CONTAINER, SECTION } from '../Home/ui';
import IconHeading from './IconHeading';

/**
 * #4 "ATLAS Students Have The World at their Fingertips" — port of
 * reference/schools/isdi/programs/undergraduate/index.php:455-503.
 *
 *   section#start-up-section.section > (.icon-heading,
 *     .blue-wrapper.isdi-blue-5 > .container > (.blue-desc-wrap >
 *       (.blue-desc-text.wid80, a.button-regular), .instagram-wrapper…mar-0))
 *
 * The same band as #2 with the photo wall in place of the map: `.blue-desc-wrap`
 * is py56 (pt40 at <=767, a column with 8px gap at <=479), the lead is 24px/1.5
 * white capped at 80% (100% below 768), and the gallery's own top margin is
 * cancelled by `.mar-0`. Each card is a visiting professor's portrait with the
 * partner university's logo pinned 20px from its bottom-left corner.
 *
 * The reference repeats `id="start-up-section"` here (it is already on #2); the
 * duplicate is not reproduced.
 */
export default function World({ data }) {
  return (
    <section data-block="world" className={SECTION}>
      <IconHeading num={data.num} title={data.title} wrapped={false} />

      {/* ref .blue-wrapper.isdi-blue-5 */}
      <div className="bg-[#173a87] pb-14 font-light text-white max-md:pb-10">
        <div className={CONTAINER}>
          {/* ref .blue-desc-wrap */}
          <div className="flex items-start justify-between py-14 max-md:pt-10 max-sm:flex-col max-sm:gap-2">
            {/* ref .blue-desc-text.wid80 */}
            <div className="max-w-[80%] flex-1 text-[24px] leading-[1.5] max-md:max-w-full max-md:text-[18px] max-md:leading-[1.5]">
              {withBreaks(data.text)}
            </div>
            <ButtonRegular href={data.button.href} variant="pink-cta">
              {data.button.label}
            </ButtonRegular>
          </div>

          {/* ref .instagram-wrapper.mobile-vert-scroll.mar-0 */}
          <PhotoGallery columns={data.columns} />
        </div>
      </div>
    </section>
  );
}
