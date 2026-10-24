import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.icon-heading` in its numbered form — the band the About page heads its sections
 * with, but the blue plate holds a figure instead of an icon. Two pages use it and
 * they disagree about one thing only, the figure:
 *
 *   size  class          figure                       pages
 *   sm    .icon-num-sm   64px/1 500, 32px at <=767    /programs/undergraduate ("#1"…"#5")
 *   lg    .icon-num      96px/1 600, 48px at <=767    /atlas-isdi-advantage ("1"…"9")
 *
 * Everything else measured identical on both at 1440 / 768 / 390: the row is pr40
 * (pr20 at <=767), the plate 174 x 122 #173a87 (68 x 74 at <=767) and the title
 * Poppins 44/34/22 400 #072058 at ml48 (ml18 at <=767).
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
const NUM = {
  sm: 'text-[64px] font-medium leading-none max-md:text-[32px] max-md:leading-none',
  lg: 'text-[96px] font-semibold leading-none max-md:text-[48px] max-md:leading-none',
};

export default function IconHeading({ num, title, titleId, wrapped = true, size = 'sm' }) {
  const heading = (
    /* several of this band's titles carry an `id` of their own, which is what the
       ISDI header menu's "Graduate Attributes" and "Tailored Pathways" entries point
       at; where that id duplicates the section's own, the page drops it */
    <div
      id={titleId || undefined}
      className="ml-12 text-[44px] font-normal leading-[1.2] text-[#072058] max-lg:text-[34px] max-md:ml-[18px] max-md:text-[22px]"
    >
      {withBreaks(title)}
    </div>
  );

  return (
    /* ref .icon-heading */
    <div className="flex items-center pr-10 max-md:pr-5">
      {/* ref .icon-image.isdi-blue-5 / .icon-image.isdi */}
      <div className="relative flex h-[122px] w-[174px] max-w-none flex-none items-center justify-center self-end bg-[#173a87] max-md:h-[74px] max-md:w-[68px]">
        {/* ref .icon-num-sm.isdi / .icon-num */}
        <div className={cx('text-white', NUM[size])}>{num}</div>
      </div>
      {wrapped ? <div className="max-w-full flex-1 self-center">{heading}</div> : heading}
    </div>
  );
}
