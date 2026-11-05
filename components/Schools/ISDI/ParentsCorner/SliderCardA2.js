import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.slider-card-wrapper-2` — the photographic card inside the `zoom-slider-lg`
 * carousels on reference/schools/isdi/parents-corner.php ("Corporate & Design
 * District", "Culture & Heritage", "Connected & Convenient").
 *
 *   .slider-card-wrapper-2   800 x 475 (100% <=767), r24, relative, clipped
 *     .slide-content-a-2     absolute inset-0, gradient #00263700 -> #040404cc,
 *                            flex column, items-start, justify-end, pb50/pl40
 *                            (pb20/pl20/pr20 <=767)
 *       .slide-title-a-2     32px/0.5 500 white, border-bottom 12px #ec1376
 *                            (24px <=767; .extra-space -> line-height 1.1 at <=479)
 *       .slide-description-a-2  18px/1.5 white, max-w 70%, pt16 (14px pt8 <=767) — empty here
 *     img.slide-image-a      cover, 100% x 100%
 *
 * The dead `data-slider-card-a-bg` script (targets `.slider-card-a`, a class none
 * of these carry) is not reproduced.
 */
export default function SliderCardA2({ card }) {
  return (
    /* ref .slider-card-wrapper-2 */
    <div className="relative block h-[475px] w-[800px] flex-none items-end overflow-hidden rounded-3xl max-md:w-full">
      {/* ref img.slide-image-a */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes={card.image.sizes}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover align-middle"
      />
      {/* ref .slide-content-a-2 */}
      <div className="absolute inset-0 z-[1] flex flex-col items-start justify-end bg-[linear-gradient(#00263700,#040404cc)] pb-[50px] pl-10 max-md:px-5 max-md:pb-5">
        {/* ref .slide-title-a-2 */}
        <div
          className={cx(
            'w-fit border-b-[12px] border-solid border-[#ec1376] text-[32px] font-medium leading-[0.5] text-white max-md:text-[24px]',
            card.extraSpace && 'max-sm:leading-[1.1]'
          )}
        >
          {withBreaks(card.title)}
        </div>
        {card.desc && (
          /* ref .slide-description-a-2 */
          <div className="max-w-[70%] pt-4 text-[18px] font-normal leading-[1.5] text-white max-md:pt-2 max-md:text-[14px]">
            {withBreaks(card.desc)}
          </div>
        )}
      </div>
    </div>
  );
}
