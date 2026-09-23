import { CONTAINER, SECTION } from '../Home/ui';
import IconHeading from './IconHeading';

/**
 * #2 "ATLAS Students Study Where India Does Business" — port of
 * reference/schools/isdi/programs/undergraduate/index.php:371-386.
 *
 *   section#start-up-section.section > (.icon-heading,
 *     .blue-wrapper.isdi-blue-5 > .container > (.blue-desc-wrap > .blue-desc-text,
 *       .center-image-full-wrap.mrgtp > img.center-image-full.isdi))
 *
 * Measured:
 *                          >=768px                    <=767px
 *   .blue-wrapper          #173a87, 300, pb56         pb40
 *   .blue-desc-wrap        row, space-between, py56   pt40; column + gap 8 at <=479
 *   .blue-desc-text        24px/1.5 white             18px/1.5
 *   .center-image-full     full width, r16, mt56,     mt40; `object-fit: contain`
 *                          mb5                        from 768 down
 *
 * The section keeps the reference's `id="start-up-section"`, which this page
 * authors on two sections; it is kept on this, the first.
 */
export default function Location({ data }) {
  return (
    <section id="start-up-section" data-block="location" className={SECTION}>
      <IconHeading num={data.num} title={data.title} wrapped={false} />

      {/* ref .blue-wrapper.isdi-blue-5 */}
      <div className="bg-[#173a87] pb-14 font-light text-white max-md:pb-10">
        <div className={CONTAINER}>
          {/* ref .blue-desc-wrap */}
          <div className="flex items-start justify-between py-14 max-md:pt-10 max-sm:flex-col max-sm:gap-2">
            {/* ref .blue-desc-text */}
            <div className="max-w-full flex-1 text-[24px] leading-[1.5] max-md:text-[18px] max-md:leading-[1.5]">
              {data.text}
            </div>
          </div>

          {/* ref .center-image-full-wrap.mrgtp */}
          <div className="relative mb-[5px] mt-14 overflow-hidden max-md:mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image.src}
              srcSet={data.image.srcSet}
              sizes={data.image.sizes}
              width={data.image.width}
              height={data.image.height}
              alt={data.image.alt}
              loading="lazy"
              decoding="async"
              className="relative block w-full max-w-full overflow-hidden rounded-2xl align-middle max-md:object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
