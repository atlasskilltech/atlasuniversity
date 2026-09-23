import withBreaks from '@/lib/withBreaks';
import ButtonRegular from '@/components/ui/ButtonRegular';
import PhotoGallery from '../PhotoGallery';
import { CONTAINER, SECTION } from '../Home/ui';
import IconHeading from './IconHeading';

/**
 * #3 "ATLAS Students Launch Before They Graduate" — port of
 * reference/schools/isdi/programs/undergraduate/index.php:387-454.
 *
 *   div.section > (.icon-heading, .container > (.white-desc-wrap >
 *     (.black-desc-text.wid80.isdi, a.button-regular), .instagram-wrapper…))
 *
 * Measured:
 *                        >=768px                        <=767px
 *   .white-desc-wrap     row, space-between, pt56        column, gap 10, pt20
 *   .black-desc-text     24px/32px 300, max-w 80%        18px, max-w 100%
 *   button               `.button-regular` small-icon: 54px #d20158 pill,
 *                        r27, px20, 18px/1.5 label       44px, 14px
 *   gallery              `../PhotoGallery`, mt56         mt32
 *
 * The photographs are the homepage's "Your Future, In Action" set (the same local
 * files); here they carry no badge and the captions are authored in `<strong>`.
 */
export default function Launch({ data }) {
  return (
    <div data-block="launch" className={SECTION}>
      <IconHeading num={data.num} title={data.title} />

      <div className={CONTAINER}>
        {/* ref .white-desc-wrap */}
        <div className="flex items-start justify-between pt-14 text-black max-md:flex-col max-md:gap-2.5 max-md:pt-5 max-sm:gap-2">
          <div className="max-w-[80%] flex-1 text-[24px] font-light leading-[32px] max-md:max-w-full max-md:text-[18px]">
            {withBreaks(data.text)}
          </div>
          <ButtonRegular href={data.button.href} variant="pink-cta">
            {data.button.label}
          </ButtonRegular>
        </div>

        {/* ref .instagram-wrapper.mobile-vert-scroll */}
        <PhotoGallery columns={data.columns} className="mt-14 max-md:mt-8" />
      </div>
    </div>
  );
}
