import { cx } from '@/lib/cx';

/**
 * `.career-sup-card.ugdx` — a photograph over an indigo caption block, laid out
 * in a centred wrapping row (`.common-flex-26-wrap`, gap 24).
 *
 * Two instances, measured identical in every property of the card, the image
 * frame and the caption block:
 *   /success-stories-atlas  "Our Career Support Services"  (9 cards)
 *   /advantages/atlas-…     "Learning Without Borders"     (3 cards)
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                 <=767px
 *   .career-sup-card.ugdx      398 x 622, column,      width 100%,
 *                              radius 36px top-left,   height auto
 *                              clipped
 *   .career-sup-img            height 340              240
 *   .csservice-card-main-img   cover, height 101%      object-position 50% 76%
 *   .css-content-wrapper       flex 1, padding         padding-bottom 20
 *     .atlas-bg-1/2            20 35 8, radius
 *                              bottom-right 36
 *   .cr-sub-desc.mt16          16px/1.3, margin-top    14px/1.3 at 768-991,
 *                              16                      16px/1.4 below 768
 *
 * ── Two differences, both carried as props ────────────────────────────────
 *   title font  `.cr-title.white` on /success-stories is Manrope 32/500;
 *               `.cr-title.isdi` on /advantages is Poppins 20/600. The weight
 *               is declared 600 and stays 600 in the computed style, but with
 *               no 600 face loaded it *renders* the 700 face — see the Poppins
 *               note in app/globals.css.
 *   badge       /advantages pins a `.btn-wrap-circular` to the photograph's
 *               top-right; /success-stories has none.
 *
 * The indigo and its vector wash are painted by the stylesheet, so both travel
 * as data rather than as classes.
 */
export default function CareerSupportCard({ card, titleVariant = 'manrope' }) {
  return (
    /* ref .career-sup-card.ugdx */
    <div
      className="flex h-[622px] w-[398px] flex-none flex-col items-stretch gap-0 overflow-hidden rounded-tl-[36px]
                 max-md:h-auto max-md:w-full"
    >
      {/* ref .career-sup-img.atlas-link */}
      <div className="relative h-[340px] w-auto max-md:h-[240px]">
        {/* ref img.csservice-card-main-img */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.image.src}
          alt={card.image.alt}
          loading="lazy"
          className="block h-[101%] w-full max-w-none object-cover max-md:object-[50%_76%]"
        />

        {card.badge && (
          /* ref .btn-wrap-circular > a.circular-button-prev > img.sl-arrow-lt —
             an `<a href="#">` in the reference that goes nowhere and has no
             handler, so it is rendered as the decoration it is */
          <div className="absolute right-5 top-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-atlas-cyan max-md:h-8 max-md:w-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.badge.src}
                alt={card.badge.alt}
                loading="lazy"
                className="w-[27px] invert max-md:w-[18px]"
              />
            </div>
          </div>
        )}
      </div>

      {/* ref .css-content-wrapper.atlas-bg-* */}
      <div
        className="flex-1 rounded-br-[36px] px-[35px] pb-2 pt-5 max-md:pb-5"
        style={{
          backgroundColor: card.background,
          backgroundImage: `url(${card.backgroundImage})`,
          backgroundPosition: card.backgroundPosition,
        }}
      >
        {/* ref .cr-title.white / .cr-title.isdi */}
        <div
          className={cx(
            'text-white',
            titleVariant === 'poppins'
              ? 'font-poppins text-[20px] font-semibold leading-[1.3] max-lg:text-[18px]'
              : 'text-[32px] font-medium leading-[1.3] max-md:text-[24px]',
          )}
        >
          {card.title}
        </div>

        {/* ref .cr-sub-desc.mt16 */}
        <div className="mt-4 text-[16px] leading-[1.3] text-white max-lg:text-[14px] max-lg:leading-[1.3] max-md:text-[16px] max-md:leading-[1.4]">
          {card.text}
        </div>
      </div>
    </div>
  );
}

/* ref .common-flex-26-wrap — the centred wrapping row both pages put these in */
export const CAREER_CARD_ROW = 'flex flex-wrap items-start justify-center gap-6';
