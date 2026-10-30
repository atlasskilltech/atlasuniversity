import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.port-card-j-wrap-2.mob-width.isdi` — the tall portrait card used in two
 * sections of reference/schools/isdi/parents-corner.php:
 *   "Guiding Growth through Personalised Support" (:76-101) — the `.isdi` form
 *   "Upgrad Spaces, Student-Centric Living"       (:669-697) — the overlay form
 *
 *   .port-card-j-wrap-2.mob-width.isdi  398 x 622 (100% x 522 <=767), r16, relative, clipped
 *     .port-card-j-txt-wrap(.isdi)      absolute inset-0, flex items-end, pad 0/36/60 (18 <=767)
 *       .isdi   -> z-index -1, solid #173a87, NO gradient   (Guiding Growth)
 *       plain   -> z-index  1, gradient #fff0 22% -> #072058 51%  (Upgrad)
 *       .port-card-j-detail  z-10, relative, full width
 *         .port-card-j-text(.isdi-sm-text)  32px/1.4 500 (26px with .isdi-sm-text; 28px <=767)
 *         .port-card-j-text-1-2.white       24px/1.4 400 white, pt16 (20px <=767) — Upgrad only
 *         .port-card-j-desc                 14px/1.8 400 white, pt14
 *     img.port-card-j-image               z-0, absolute, width 100%, height auto, centered, cover
 *
 * The `.isdi` variant stacks the #173a87 panel behind (z -1), the photograph in
 * the middle (z 0, sized to its own height from the top) and the text on top
 * (z 10) — so the photo fills the upper part and the blue panel shows under it.
 * The overlay variant lets the photo fill the frame under a bottom-weighted
 * gradient with the text over it.
 */
export default function PortCardJ({ card, variant = 'isdi' }) {
  const isdi = variant === 'isdi';
  return (
    /* ref .port-card-j-wrap-2.mob-width.isdi */
    <div className="relative h-[622px] w-[398px] flex-none overflow-hidden rounded-2xl text-white max-md:h-[522px] max-md:w-full">
      {/* ref .port-card-j-txt-wrap(.isdi) */}
      <div
        className={cx(
          'absolute inset-0 flex items-end px-9 pb-[60px] pt-0 max-md:p-[18px]',
          isdi ? 'z-[-1] bg-[#173a87]' : 'z-[1] bg-[linear-gradient(#ffffff00_22%,#072058_51%)]'
        )}
      >
        {/* ref .port-card-j-detail */}
        <div className="relative z-10 w-full">
          {/* ref .port-card-j-text.isdi-sm-text */}
          <div className="text-[26px] font-medium leading-[1.4] text-white max-md:text-[28px]">
            {withBreaks(card.title)}
          </div>
          {card.subtitle && (
            /* ref .port-card-j-text-1-2.white */
            <div className="pt-4 text-[24px] font-normal leading-[1.4] text-white max-md:text-[20px]">
              {withBreaks(card.subtitle)}
            </div>
          )}
          {/* ref .port-card-j-desc */}
          <div className="pt-3.5 text-[14px] font-normal leading-[1.8] text-white">
            {withBreaks(card.desc)}
          </div>
        </div>
      </div>
      {/* ref img.port-card-j-image — absolute, width 100%, height auto, centered */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        alt={card.image.alt || ''}
        loading="lazy"
        className="absolute left-0 top-0 z-0 mx-auto block h-auto w-full object-cover align-middle"
      />
    </div>
  );
}
