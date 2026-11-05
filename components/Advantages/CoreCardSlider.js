import Carousel from '@/components/Carousel/Carousel';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';

/**
 * `.core-cards.atlas` — an indigo card whose photograph fills it until the
 * pointer arrives, then fades out to reveal the description underneath.
 *
 * Used twice on /advantages/atlas-advantages, both inside a
 * `.swiper.common-swiper-full.mrgtp0`:
 *   "ATLAS's Core Advantages"      9 cards  (`atlas-advantages.php:44`)
 *   "The 4 Year Journey to Success" 4 cards, `.size-big`  (`:975`)
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                          >=768px              <=767px          <=479px
 *   .core-cards.atlas      396 x 500 fixed,     same             max-width
 *                          #41418e, radius                       391
 *                          32/0, clipped,
 *                          column, justify-end,
 *                          padding 46 0 14,
 *                          cool-shape vector at
 *                          50% 0, no-repeat
 *   .core-content          column, justify-end, padding-left 20  same
 *                          padding 0 25 0 35,
 *                          z 1
 *   .card-title-big        36px/1.2, 500        34px, 600        28px
 *     .size-big            54px                 34px, 600        28px
 *   .card-desc-big         16px/1.5, 400        16px, 600        14px
 *     .size-big            24px                 16px, 600        14px
 *   .image-bg-core         absolute inset 0, 100% x 100%, z 0
 *
 * ── The hover reveal ──────────────────────────────────────────────────────
 * A `<style>` embedded twice in the page (identically) drives it:
 *
 *     .card-desc-big, .card-desc-h        { max-height: 0; opacity: 0;
 *                                           overflow: hidden;
 *                                           transition: max-height .4s ease,
 *                                                       opacity .4s ease }
 *     .core-cards:hover .card-desc-big,
 *     .core-cards:hover .card-desc-h      { max-height: 300px; opacity: 1 }
 *     .core-cards:hover .card-desc-big    { padding-bottom: 20px }
 *     .core-cards:hover .image-bg-core    { max-height: 0; opacity: 0;
 *                                           transition: … }
 *
 * So at rest only the title shows over the photograph, and on hover the
 * description grows in while the photograph collapses to nothing — leaving the
 * indigo and its vector. Reproduced with `group-hover` utilities; the
 * transitions are the reference's own 0.4s ease on max-height and opacity.
 *
 * One of the nine cards replaces its paragraph with `.card-desc-h` — four
 * `.green-num-wrap` rows of a cyan figure beside a white label — so a card
 * carries either `text` or `rows`, never both.
 */
export default function CoreCardSlider({ cards, background, size = 'default' }) {
  const big = size === 'big';

  return (
    /* ref .swiper.common-swiper-full.mrgtp0 */
    <Carousel>
      {cards.map((card) => (
        /* ref .core-cards.atlas */
        <div
          key={card.title}
          className="group relative flex h-[500px] max-h-[500px] min-h-[500px] w-[396px] flex-col items-start justify-end overflow-hidden
                     rounded-tl-[32px] rounded-br-[32px] bg-[#41418e] bg-[length:auto] bg-[position:50%_0] bg-no-repeat
                     pb-[14px] pt-[46px] max-w-[396px] max-sm:max-w-[391px] max-mcm:w-[calc(100vw-44px)]"
          style={{ backgroundImage: `url(${background})` }}
        >
          {/* ref .core-content */}
          <div className="sticky z-[1] flex h-auto flex-col items-start justify-end pl-[35px] pr-[25px] max-md:pl-5">
            {/* ref .card-title-big (+ .size-big) */}
            <div
              className={cx(
                'pb-6 pt-5 font-medium leading-[1.2] text-white max-md:font-semibold',
                /* `.card-title-big.size-big` is 0,2,0 and the responsive rules
                   are 0,1,0 — media queries add no specificity — so the big
                   size survives every breakpoint while the weight still shifts */
                big ? 'text-[54px]' : 'text-[36px] max-md:text-[34px] max-sm:text-[28px]',
              )}
            >
              {withBreaks(card.title)}
            </div>

            {card.text && (
              /* ref .card-desc-big (+ .size-big) — hidden until hover */
              <div
                className={cx(
                  'max-h-0 overflow-hidden leading-[1.5] text-white opacity-0',
                  'transition-[max-height,opacity] duration-[400ms] ease-[ease]',
                  'group-hover:max-h-[300px] group-hover:pb-5 group-hover:opacity-100',
                  'max-md:font-semibold',
                  big ? 'text-[24px]' : 'text-[16px] max-md:text-[16px] max-sm:text-[14px]',
                )}
              >
                {withBreaks(card.text)}
              </div>
            )}

            {card.rows && (
              /* ref .card-desc-h — the one card that lists figures */
              <div
                className="block max-h-0 overflow-hidden text-left text-white opacity-0
                           transition-[max-height,opacity] duration-[400ms] ease-[ease]
                           group-hover:max-h-[300px] group-hover:opacity-100
                           max-md:pt-0 max-md:text-[12px] max-md:leading-[1.3]"
              >
                {card.rows.map((row) => (
                  /* ref .green-num-wrap */
                  <div key={row.label} className="flex items-center justify-start gap-2.5">
                    {row.value && (
                      /* ref .card-desc-green.atlas */
                      <div className="block p-0 text-right font-bold leading-none text-atlas-cyan max-md:text-[14px] max-md:leading-[1.3]">
                        {row.value}
                      </div>
                    )}
                    {/* ref .card-desc-white */}
                    <div className="block min-w-[46px] p-0 text-left leading-[1.5] max-md:text-[14px] max-md:leading-[1.3]">
                      {row.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ref img.image-bg-core — collapses away on hover */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image.src}
            alt={card.image.alt}
            loading="lazy"
            className="absolute inset-0 z-0 h-full w-full max-w-full align-baseline
                       transition-[max-height,opacity] duration-[400ms] ease-[ease]
                       group-hover:max-h-0 group-hover:opacity-0"
          />
        </div>
      ))}
    </Carousel>
  );
}
