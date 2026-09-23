import { cx } from '@/lib/cx';
import { SECTION } from '../Home/ui';

/**
 * The About page's banded section — `section.section > (.icon-heading,
 * .blue-wrapper.isdi-blue-5 | .white-wrapper)`, used by Our Story, Leadership Team,
 * In The Heart of Mumbai, Thought Leadership, ATLAS Times and Press Coverage
 * (about-us/index.php:61, 211, 754, 770, 989, 1305).
 *
 * Measured on production (identical in all six):
 *                     >=768px                            <=767px
 *   .icon-heading     flex, centred, pr40                pr20
 *   .icon-image       174 x 122 #173a87, bottom-aligned  68 x 74
 *                     (its cyan `::after` bar is `display: none` under
 *                     `.isdi-page`)
 *   .ico-simg         natural size (64px; the star is     32px wide, in flow,
 *                     56 x 58), absolute at 28 / 55      centred
 *   .icon-title-hd    flex 1, centred
 *   .icon-main-title  Poppins 44px/1.2 400 #072058, ml48 34px (<=991); 22px, ml18
 *   .blue-wrapper     #173a87, white, 300, pb56          pb40
 *   .white-wrapper    black, clipped, no padding
 *
 * `children` is the wrapper's content; `tone` picks the wrapper.
 */
export default function IconSection({ id, block, icon, title, tone = 'blue', children, after }) {
  return (
    <section id={id} data-block={block} className={SECTION}>
      {/* ref .icon-heading */}
      <div className="flex items-center pr-10 max-md:pr-5">
        {/* ref .icon-image.isdi-blue-5 */}
        <div className="relative flex h-[122px] w-[174px] max-w-none flex-none items-center justify-center self-end bg-[#173a87] max-md:h-[74px] max-md:w-[68px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icon}
            alt=""
            loading="lazy"
            className="absolute bottom-0 left-[55px] right-0 top-7 max-w-full max-md:static max-md:w-8"
          />
        </div>
        {/* ref .icon-title-hd */}
        <div className="max-w-full flex-1 self-center">
          <div className="ml-12 text-[44px] font-normal leading-[1.2] text-[#072058] max-lg:text-[34px] max-md:ml-[18px] max-md:text-[22px]">
            {title}
          </div>
        </div>
      </div>

      {/* ref .blue-wrapper.isdi-blue-5 / .white-wrapper */}
      <div
        className={cx(
          tone === 'blue' ? 'bg-[#173a87] pb-14 font-light text-white max-md:pb-10' : 'overflow-hidden text-black'
        )}
      >
        {children}
      </div>
      {after}
    </section>
  );
}
