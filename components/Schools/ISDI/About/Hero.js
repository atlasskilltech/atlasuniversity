import withBreaks from '@/lib/withBreaks';
import InViewVideo from '../Home/InViewVideo';
import { CONTAINER } from '../Home/ui';

/**
 * About hero — port of reference/schools/isdi/about-us/index.php:12-22.
 *
 *   .inner-header-wrapper.full-ht > (.inner-header-cover > .container.btm-flext >
 *     (h1.h1-tag, .inner-cover-text), .backgorund-header.w-background-video)
 *
 * Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                            <=767px
 *   wrapper           100vh, clipped                     same
 *   cover             bottom 50%, transparent -> #000    the whole frame
 *                     at 90%, pb56, content at the bottom
 *   container         row, space-between, bottom-        column, top-aligned,
 *                     aligned, gap 100                   gap 22
 *   h1                56px/1.2 400 white (44px <=991)    28px/1.5 600
 *   text              430 wide, 18px/1.6 300 white       full width
 *   video             fills the frame, cover             `aspect-ratio: 2/3` on the
 *                                                        box, which `height: 100%`
 *                                                        overrides — no change
 *
 * The video autoplays muted and looped as authored; it starts once it is on
 * screen (it always is on load) with the poster painted until then.
 */
export default function Hero({ data }) {
  return (
    <div data-block="hero" className="relative h-screen w-full overflow-hidden">
      {/* ref .inner-header-cover */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end bg-[linear-gradient(#0000,#000000e6)] pb-14 max-md:h-full">
        {/* ref .container.btm-flext */}
        <div
          className={`${CONTAINER} flex w-full flex-1 items-end justify-between gap-[100px] max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-[22px]`}
        >
          {/* ref h1.h1-tag */}
          <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
            {withBreaks(data.title)}
          </h1>
          {/* ref .inner-cover-text */}
          <div className="w-[430px] text-[18px] font-light leading-[1.6] text-white max-md:w-full">{data.text}</div>
        </div>
      </div>

      {/* ref .backgorund-header.w-background-video */}
      <div className="relative h-full w-full overflow-hidden text-white">
        <InViewVideo
          sources={data.video.sources}
          poster={data.video.poster}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
