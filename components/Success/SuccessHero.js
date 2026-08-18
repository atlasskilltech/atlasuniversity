import { successContent } from '@/lib/successContent';
import withBreaks from '@/lib/withBreaks';

/**
 * /success-stories-atlas hero — port of `success-stories-atlas.php:14-21`
 * (`.inner-header-wrapper.full-ht > (.inner-header-cover > .container.btm-flext
 *   > (h1.h1-tag, .inner-cover-text), img.header-image-inner)`).
 *
 * A full-viewport photograph with a scrim over its lower half; the title and
 * the lead sit on one baseline inside it, and stack below 768px.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=992px            768-991px      <=767px
 *   .inner-header-wrapper    100vh, clipped     same           same
 *   .header-image-inner      100% x 100%, cover
 *   .inner-header-cover      bottom half, transparent -> #000e6,
 *                            flex align-end, padding-bottom 56
 *                                               same           height 100%
 *   .container.btm-flext     row, space-between, align-end, gap 100
 *                                               same           column, start,
 *                                                              gap 22
 *   .h1-tag                  56px/1.2, 400      44px           28px/1.5, 600
 *   .inner-cover-text        430px, 18px/1.6, 300              width 100%
 */

export default function SuccessHero() {
  const { hero } = successContent;

  return (
    /* ref .inner-header-wrapper.full-ht */
    <div className="relative h-screen w-full overflow-hidden">
      {/* ref img.header-image-inner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.image.src}
        srcSet={hero.image.srcSet}
        sizes="(max-width: 1439px) 100vw, 1364.953125px"
        alt={hero.image.alt}
        className="block h-full w-full object-cover"
      />

      {/* ref .inner-header-cover */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end bg-gradient-to-b from-[#00000000] to-[#000000e6] pb-14 max-md:h-full">
        {/* ref .container.btm-flext */}
        <div
          className="mx-auto flex w-full max-w-[1366px] flex-1 items-end justify-between gap-[100px] px-[62px]
                     max-lg:px-[30px]
                     max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-[22px] max-md:px-[22px]"
        >
          {/* ref h1.h1-tag */}
          <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
            {withBreaks(hero.title)}
          </h1>

          {/* ref .inner-cover-text */}
          <div className="w-[430px] text-lg font-light leading-[1.6] text-white max-md:w-full">
            {hero.text}
          </div>
        </div>
      </div>
    </div>
  );
}
