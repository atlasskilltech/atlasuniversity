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
/*
 * `variant="atlas"` — /atlas-alumni-corner's `.port-card-j-wrap.mob-width` (no `-2`, no `.isdi`):
 * the overlay form with square corners, a 32px title (28 at <=767) and a
 * `.port-card-j-text-1.white` subtitle that stays 24px/1.4 at every width. Measured at
 * 1440 / 991 / 767 / 390; the box, padding, gradient and description are the overlay form's.
 */
/* `subtitleTone="mint"` — the ISME sheet (Parents Corner, Non-Mumbai): the `.port-card-j-text-1(-2)` line
   is #07f6a0 (measured at 1440 / 390); everything else is the `atlas` form */
export default function PortCardJ({ card, variant = 'isdi', subtitleTone }) {
  const isdi = variant === 'isdi';
  const atlas = variant === 'atlas';
  return (
    /* ref .port-card-j-wrap-2.mob-width.isdi / .port-card-j-wrap.mob-width */
    <div className={cx('relative h-[622px] w-[398px] flex-none overflow-hidden text-white max-md:h-[522px] max-md:w-full', !atlas && 'rounded-2xl')}>
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
          <div className={cx('font-medium leading-[1.4] text-white max-md:text-[28px]', atlas ? 'text-[32px]' : 'text-[26px]')}>
            {withBreaks(card.title)}
          </div>
          {card.subtitle && (
            /* ref .port-card-j-text-1-2.white */
            <div className={cx('pt-4 text-[24px] font-normal leading-[1.4]', subtitleTone === 'mint' ? 'text-atlas-mint' : 'text-white', !atlas && 'max-md:text-[20px]')}>
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
