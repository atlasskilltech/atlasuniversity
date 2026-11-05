import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.career-sup-card` on ISDI's skin — a photograph over an indigo caption panel.
 *
 * Extracted from `ProgramDetail/Execution` when
 * /atlas-isdi-advantage/industry-centric-approach turned out to build its Career
 * Services row from the same card. Measured identical on both at
 * 1440 / 768 / 390, and it is NOT `components/ui/CareerSupportCard` (the ATLAS
 * `.ugdx` card), which differs in enough properties to be its own shape:
 *
 *                            ATLAS (`.ugdx`)            ISDI
 *   card                     398 x 622, r36 top-left    398 x 622, 16px corners
 *   photo frame              340 tall                   340 tall (image 101%)
 *   caption radius           36 bottom-right            16 bottom pair
 *   caption padding          20/35/8                    20/35/8 -> 20/35/20 at
 *                                                       <=767 -> 20 at <=479
 *   title                    `.cr-title.white` 32/1.3   `.cr-title.isdi` 20px/1.3
 *                                                       600, 18px from 991 down
 *   text                     16/1.3 -> 14 -> 16/1.4     the same ladder
 *
 * **The panel's wash is not one value.** The twelve B.Des pages paint it
 * `contain` at `100% 100%`; industry-centric-approach's three tones measure
 * `auto`/`100% 100%`, `contain`/`100% 50%` and `contain`/`100% 50%`. Both the size
 * and the position therefore travel with the card, defaulting to the B.Des pair so
 * that page's data needs no change.
 *
 * `.career-sup-card.isdi` additionally declares `border-radius: 16px; overflow:
 * hidden`. On the twelve B.Des pages only ONE of the eighteen cards carries that
 * modifier; here all six do. The radius is therefore `rounded`, defaulting off.
 * (The `overflow: hidden` is in the base string as the first port of this card
 * had it — inert either way, since the photo frame clips its own image and the
 * panel is the card's last child.)
 *
 * ── One reference defect, not reproduced ────────────────────────────────────
 * Inside a `slidesPerView: 'auto'` slide the card is `width: 100%`, so between 568
 * and 767px the reference's B.Des card measures up to 2412px at a 767px viewport.
 * The container width is used there instead — the same fix `TestimonialCard` and
 * `ZoomSliderLg` already carry. On this page the card sits in a wrapping flex row
 * rather than a carousel, and the reference measures the container width anyway.
 */
export default function CareerCard({ card, narrowPad = true, rounded = false }) {
  const panel = card.panel ?? card.plate;
  return (
    /* ref .career-sup-card(.isdi) */
    <div
      className={cx(
        'flex h-[622px] w-[398px] flex-none flex-col items-stretch gap-0 overflow-hidden',
        'max-md:h-auto max-md:w-[calc(100vw-44px)]',
        /* `.career-sup-card.isdi` is the only one of the two that declares
           `border-radius: 16px`. All six cards here carry it and SEVENTEEN of the
           eighteen on the B.Des pages do not — the modifier is per card, not per
           page, so it travels as a prop rather than being baked in. Both render
           the same, because the photo frame and the caption panel carry their own
           16px corners. */
        rounded && 'rounded-2xl'
      )}
    >
      {/* ref .career-sup-img */}
      <div className="relative h-[340px] w-auto overflow-hidden max-md:h-[240px]">
        {/* ref img.csservice-card-main-img */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.image.src}
          width={card.image.width}
          height={card.image.height}
          alt={card.image.alt}
          loading="lazy"
          decoding="async"
          className="block h-[101%] w-full max-w-none rounded-t-2xl object-cover align-middle max-md:object-[50%_76%]"
        />
      </div>

      {/* ref .css-content-wrapper */}
      <div
        className={cx(
          'flex-1 rounded-b-2xl bg-no-repeat px-[35px] pb-2 pt-5 max-md:pb-5',
          /* the `<=479` 20px inset is declared on `.css-content-wrapper.bg1.isdi`
             / `.bg1.isdi-2` — the B.Des classes. industry-centric-approach's
             panels are `.isdi-bg1/2/3`, which that selector does not match, so
             the 35px holds at every width there. */
          narrowPad && 'max-sm:px-5'
        )}
        style={{
          backgroundColor: panel.background,
          backgroundImage: `url(${panel.image})`,
          backgroundSize: panel.size ?? 'contain',
          backgroundPosition: panel.position ?? '100% 100%',
        }}
      >
        {/* ref .cr-title.isdi */}
        <div className="text-[20px] font-semibold leading-[1.3] text-white max-lg:text-[18px] max-lg:leading-[1.3]">
          {withBreaks(card.title)}
        </div>
        {/* ref .cr-sub-desc.mt16 */}
        <div className="mt-4 text-base leading-[1.3] text-white max-lg:text-[14px] max-lg:leading-[1.3] max-md:text-base max-md:leading-[1.4]">
          {withBreaks(card.text)}
        </div>
      </div>
    </div>
  );
}
