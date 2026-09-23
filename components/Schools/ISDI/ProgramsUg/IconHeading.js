import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.icon-heading` as the undergraduate-programmes page writes it — the numbered
 * variant of the band the About page heads its sections with: the blue plate holds
 * `.icon-num-sm.isdi` ("#1" … "#5") instead of an icon.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                         <=767px
 *   .icon-heading     flex, centred, pr40             pr20
 *   .icon-image       174 x 122 #173a87, bottom-      68 x 74
 *                     aligned (its cyan `::after` bar is `display: none`
 *                     under `.isdi-page`)
 *   .icon-num-sm      64px/1 500 white                32px/1
 *   .icon-main-title  Poppins 44px/1.2 400 #072058,   22px, ml18
 *                     ml48; 34px at <=991
 *
 * Sections #2 and #4 author the title directly in `.icon-heading`, where it is
 * sized by its own text; #1, #3 and #5 wrap it in `.icon-title-hd` (`flex: 1`),
 * which stretches it to the rest of the row — hence `wrapped`.
 */
export default function IconHeading({ num, title, wrapped = true }) {
  const heading = (
    <div className="ml-12 text-[44px] font-normal leading-[1.2] text-[#072058] max-lg:text-[34px] max-md:ml-[18px] max-md:text-[22px]">
      {withBreaks(title)}
    </div>
  );

  return (
    /* ref .icon-heading */
    <div className="flex items-center pr-10 max-md:pr-5">
      {/* ref .icon-image.isdi-blue-5 / .icon-image.isdi */}
      <div className="relative flex h-[122px] w-[174px] max-w-none flex-none items-center justify-center self-end bg-[#173a87] max-md:h-[74px] max-md:w-[68px]">
        {/* ref .icon-num-sm.isdi */}
        <div className={cx('text-[64px] font-medium leading-none text-white max-md:text-[32px] max-md:leading-none')}>
          {num}
        </div>
      </div>
      {wrapped ? <div className="max-w-full flex-1 self-center">{heading}</div> : heading}
    </div>
  );
}
