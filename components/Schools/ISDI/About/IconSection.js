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
 * `children` is the wrapper's content; `tone` picks the wrapper, and
 * `headingAfter` is an optional third child of the `.icon-heading` row.
 *
 * `tone="none"` renders NO wrapper at all. Two of
 * /atlas-isdi-advantage/internationalisation's five banded sections author their
 * content as direct siblings of the `.icon-heading` — `#summer-school`
 * (`.common-wrapper` + a bleeding carousel) and `#isdi-master-prog` (`.container` +
 * a full-bleed `.strip-container`). `.white-wrapper` is not that box: it carries
 * `overflow: hidden`, which would clip the strip.
 */
/* `skin="isme"` — the ISME pages' band: plate and `.blue-wrapper` #011136 (not #173a87) and a 500
   Manrope title (the ISDI one is Poppins 400). Measured on the ISME events pages. */
const SKIN = {
  isdi: { plate: 'bg-[#173a87]', title: 'font-normal', blue: 'bg-[#173a87] font-light' },
  /* the ISME `.blue-wrapper` declares no weight, so its copy stays 400 */
  isme: { plate: 'bg-[#011136]', title: 'font-medium', blue: 'bg-[#011136]', section: 'block overflow-hidden py-[60px] max-md:py-10' },
};

export default function IconSection({
  id, block, icon, num, title, tone = 'blue', children, after, headingAfter, skin = 'isdi', sectionClassName,
  /* `img.icon-hd` (ISME Internationalisation) in place of `.ico-simg`: a static 64px glyph centred in
     the plate, 40px at <=767 */
  iconHd = false,
  /* `before` — content authored ahead of the `.icon-heading` in the same section (the ISME programme
     overviews' `.container > .top-txt-wrapper`); `numSm` — `.icon-num-sm` in place of `.icon-num`:
     64px/1 500 in the ISME mint #07f6a0, 32px at <=767 */
  before = null,
  numSm = false,
  /* `.blue-wrapper.padbtm0` (ISME Success Snapshot): no bottom padding at any width */
  wrapPad = true,
  /* `bp768` — ISME imarticus29012026's own <style> restates the heading's mobile rules under
     `@media (max-width: 768px)`, so they apply at 768 itself (one pixel before the sheet's 767) */
  bp768 = false,
}) {
  const sk = SKIN[skin] ?? SKIN.isdi;
  return (
    <section id={id} data-block={block} className={sectionClassName ?? sk.section ?? SECTION}>
      {before}
      {/* ref .icon-heading */}
      <div className={bp768 ? 'flex items-center pr-10 max-768:pr-5' : 'flex items-center pr-10 max-md:pr-5'}>
        {/* ref .icon-image.isdi-blue-5 */}
        <div className={cx(bp768 ? 'relative flex h-[122px] w-[174px] max-w-none flex-none items-center justify-center self-end max-768:h-[74px] max-768:w-[68px]' : 'relative flex h-[122px] w-[174px] max-w-none flex-none items-center justify-center self-end max-md:h-[74px] max-md:w-[68px]', sk.plate)}>
          {num != null && !icon ? (
            /* `.icon-num` in place of the icon (ISME 9 Core Advantages): 96px/1 600 white, 48px at <=767 */
            numSm ? (
              <div className="text-[64px] font-medium leading-none text-[#07f6a0] max-md:text-[32px]">{num}</div>
            ) : (
              <div className={bp768 ? 'text-[96px] font-semibold leading-none text-white max-768:text-[48px]' : 'text-[96px] font-semibold leading-none text-white max-md:text-[48px]'}>{num}</div>
            )
          ) : (
            <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icon}
            alt=""
            loading="lazy"
            className={iconHd ? 'block h-16 w-16 max-w-full max-md:h-10 max-md:w-10' : bp768 ? 'absolute bottom-0 left-[55px] right-0 top-7 max-w-full max-768:static max-768:w-8' : 'absolute bottom-0 left-[55px] right-0 top-7 max-w-full max-md:static max-md:w-8'}
          />
            </>
          )}
        </div>
        {/* ref .icon-title-hd */}
        <div className="max-w-full flex-1 self-center">
          <div className={cx(bp768 ? 'ml-12 text-[44px] leading-[1.2] text-[#072058] max-lg:text-[34px] max-768:ml-[18px] max-768:text-[22px]' : 'ml-12 text-[44px] leading-[1.2] text-[#072058] max-lg:text-[34px] max-md:ml-[18px] max-md:text-[22px]', sk.title)}>
            {title}
          </div>
        </div>
        {/* two of /atlas-isdi-advantage/industry-centric-approach's headings close
            the row with an `a.button-regular`; every other instance has none */}
        {headingAfter}
      </div>

      {tone === 'none' ? (
        children
      ) : (
        /* ref .blue-wrapper.isdi-blue-5 / .white-wrapper */
        <div
          className={cx(
            tone === 'blue' ? cx(sk.blue, 'text-white', wrapPad && (bp768 ? 'pb-14 max-768:pb-10' : 'pb-14 max-md:pb-10')) : 'overflow-hidden text-black'
          )}
        >
          {children}
        </div>
      )}
      {after}
    </section>
  );
}
