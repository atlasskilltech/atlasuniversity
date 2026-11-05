import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * The Life@ATLAS ISDI hero — `div#life-at-isme.inner-header-wrapper.full-ht >
 * (.inner-header-cover > .center-hd-text, .images-carousel-wrapper > 4 x
 * .swiper.vertical-swiper|.vertical-swiper1)` (`life@atlas-isdi/index.php:76-137`).
 *
 * A full-viewport stage of four photo columns scrolling upward behind a centred
 * title.
 *
 * ── Why this is NOT `Life/LifeHero` ───────────────────────────────────────
 * /life-at-atlas renders the same four-column idea, and the two look alike — but
 * every value here comes from THIS PAGE'S OWN inline `<style>` (`:13-72`), while
 * that page's comes from the ATLAS sheet's `.images-carousel-wrapper.isme` and
 * `.inner-header-cover.g1`. Two unrelated cascades behind one silhouette: the
 * scrim is a different gradient over a different height, the wrapper has no
 * background, and the slides carry `.isdi-curve`. Sharing would mean one
 * component holding two sets of measured values keyed on a variant, for no
 * reuse of logic — so the row is authored here and /life-at-atlas is untouched.
 *
 * ── Measured on production at 1440 / 768 / 390 ────────────────────────────
 *                              >=768px                    <=767px
 *   .inner-header-wrapper      100vh, clipped             same
 *   .images-carousel-wrapper   flex, gap 24, clipped      gap 16
 *   .vertical-swiper           100vh, width 100%, clipped same
 *     .swiper-slide            height 300                 same
 *   .vertical-swiper1 slide    height 350                 same
 *   .swiper-slide.ht-auto      height auto                same
 *   .swiper-slide              line-height 0, width 100%  same
 *     img                      block, 100% x 100%, cover, `object-position: left top`
 *   .isdi-curve                border-radius 16, clipped  same
 *   .hide-mo-swiper            visible                    display: none
 *   .inner-header-cover        z1, bottom 0, height 50%,  height 100%
 *                              `linear-gradient(#0000, #000000e6)`, align-end, pb56
 *   .center-hd-text            text-align center, w100%   same
 *   .hd-title-txt              32px/1.5 600 #fff          22px
 *   .h1-tag.sm                 48px/1.2 600 #fff          38px/1.5 — `.sm` is a
 *                              compound selector, so it survives the <=767 rule
 *                              that takes a plain `.h1-tag` to 28px
 *
 * ── The columns are a CSS marquee, not a Swiper ───────────────────────────
 * The page initialises them `direction: 'vertical', slidesPerView: 'auto',
 * loop: true, allowTouchMove: false, autoplay: {delay: 0}, speed: 4000`, and its
 * own `<style>` gives the wrapper `transition-timing-function: linear !important`.
 * Delay 0 over a 4000ms linear transition is a constant-velocity marquee, and
 * `allowTouchMove: false` means there is nothing to drive by hand — so it is a CSS
 * animation here, as the awards, impact and logo bands already are.
 *
 * **Each column lists its four photographs TWICE in the reference**, and both
 * halves are rendered: the track travels -50%, which lands exactly on the repeat
 * and makes the loop seamless. `motion-reduce` stops it.
 */
export default function Hero({ data }) {
  return (
    /* ref div#life-at-isme.inner-header-wrapper.full-ht */
    <div id="life-at-isme" data-block="hero" className="relative h-screen w-full overflow-hidden">
      {/* ref .images-carousel-wrapper — the page's own <style>; it is the stage,
          so it fills the frame behind the scrim */}
      <div className="absolute inset-0 flex h-full w-full gap-6 overflow-hidden max-md:gap-4">
        {data.columns.map((column, ci) => (
          /* ref .swiper.vertical-swiper / .vertical-swiper1 */
          <div
            key={`${ci}-${column.slides[0].image.src}`}
            className={cx(
              'h-full w-full flex-1 overflow-hidden',
              column.hideOnMobile && 'max-md:hidden'
            )}
          >
            {/* ref .swiper-wrapper — the marquee track */}
            {/* `marquee-y-16` is translateY(0 -> -50%) over 16s linear — four
                slides at the reference's own `speed: 4000` with `delay: 0` */}
            <div className="flex animate-marquee-y-16 flex-col will-change-transform motion-reduce:animate-none">
              {column.slides.map((slide, si) => (
                /* ref .swiper-slide(.ht-auto).isdi-curve */
                <div
                  key={`${si}-${slide.image.src}`}
                  className={cx(
                    'w-full flex-none overflow-hidden rounded-2xl leading-[0]',
                    slide.auto ? 'h-auto' : column.tall ? 'h-[350px]' : 'h-[300px]'
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image.src}
                    alt={slide.image.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-full object-cover object-left-top"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ref .inner-header-cover */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end bg-[linear-gradient(#0000,#000000e6)] pb-14 max-md:h-full">
        {/* ref .center-hd-text */}
        <div className="w-full text-center">
          {/* ref .hd-title-txt */}
          <div className="text-[32px] font-semibold leading-[1.5] text-white max-md:text-[22px]">
            {data.eyebrow}
          </div>
          {/* ref h1.h1-tag.sm */}
          <h1 className="m-0 text-[48px] font-semibold leading-[1.2] text-white max-md:text-[38px] max-md:leading-[1.5]">
            {withBreaks(data.title)}
          </h1>
        </div>
      </div>
    </div>
  );
}
