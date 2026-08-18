import { lifeContent } from '@/lib/lifeContent';
import { cx } from '@/lib/cx';

/**
 * /life-at-atlas hero — port of `life-at-atlas.php:78-135`
 * (`div#life-at-isme.inner-header-wrapper.full-ht >
 *   (.inner-header-cover.g1 > .center-hd-text, .images-carousel-wrapper.isme >
 *    4x .swiper.vertical-swiper|.vertical-swiper1)`).
 *
 * A full-viewport stage of four photo columns scrolling upward behind a
 * centred title, under a scrim that covers the lower three quarters.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                   <=767px
 *   .inner-header-wrapper      100vh, clipped            same
 *   .images-carousel-wrapper   inset 0, padding 0 5,     gap 16
 *     .isme                    #011136, flex, gap 24,
 *                              z 0
 *   .vertical-swiper slide     height 300                same
 *   .vertical-swiper1 slide    height 350                same
 *   .swiper-slide.ht-auto      height auto               same
 *   .hide-mo-swiper            visible                   display: none
 *   .inner-header-cover.g1     top 25%, height 75%,      same
 *                              #193e9000 -> #03144b,
 *                              flex align-end, pb 56,
 *                              z 1
 *   .hd-title-txt              32px/1.5, 600, #fff       22px
 *   .h1-tag.sm                 48px/1.2, 600, #fff       38px/1.5
 *
 * ── The columns ───────────────────────────────────────────────────────────
 * `life-at-atlas.php:1086-1111` initialises them as
 * `direction: 'vertical', slidesPerView: 'auto', spaceBetween: 20, loop: true,
 * allowTouchMove: false, autoplay: {delay: 0}, speed: 4000`, and the page's own
 * <style> gives the wrapper `transition-timing-function: linear !important`.
 * Delay 0 plus a 4000ms linear transition is a constant-velocity marquee that
 * advances one slide every 4s — the same mechanism the awards and impact bands
 * already use here, so it is the same CSS animation, vertically: each column
 * lists its four photographs twice and travels -50%, i.e. one whole set in 16s.
 * `allowTouchMove: false` means there is nothing to drive by hand, so nothing
 * is lost by not running Swiper.
 *
 * The middle two columns are `.hide-mo-swiper`, which the page's <style> sets
 * to `display: none` below 768px — so mobile shows columns 1 and 4 only.
 */
export default function LifeHero() {
  const { hero } = lifeContent;

  return (
    /* ref div#life-at-isme.inner-header-wrapper.full-ht */
    <div id="life-at-isme" className="relative h-screen w-full overflow-hidden">
      {/* ref .images-carousel-wrapper.isme */}
      <div className="absolute inset-0 z-0 flex h-full w-full gap-6 overflow-hidden bg-[#011136] px-[5px] max-md:gap-4">
        {hero.columns.map((column, index) => (
          /* ref .swiper.vertical-swiper / .vertical-swiper1 */
          <div
            key={column.slides[0].image.src}
            className={cx(
              'relative z-[1] h-full flex-1 overflow-hidden',
              column.hideOnMobile && 'max-md:hidden',
            )}
          >
            {/* ref .swiper-wrapper — one authored set twice over, travelling -50% */}
            <div className="flex animate-marquee-y-16 flex-col motion-reduce:animate-none">
              {column.slides.map((slide, i) => (
                /* ref .swiper-slide (+ .ht-auto) */
                <div
                  key={`${slide.image.src}-${i}`}
                  className={cx(
                    'mb-5 w-full flex-none leading-none',
                    slide.auto ? 'h-auto' : column.variant === 'vertical-swiper1' ? 'h-[350px]' : 'h-[300px]',
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image.src}
                    alt={slide.image.alt}
                    loading={index < 2 && i < 2 ? 'eager' : 'lazy'}
                    className="block h-full w-full object-cover object-left-top"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ref .inner-header-cover.g1 */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-3/4 items-end bg-[linear-gradient(#193e9000,#03144b)] pb-14">
        {/* ref .center-hd-text */}
        <div className="w-full text-center">
          {/* ref .hd-title-txt */}
          <div className="text-[32px] font-semibold leading-[1.5] text-white max-md:text-[22px]">
            {hero.eyebrow}
          </div>
          {/* ref h1.h1-tag.sm */}
          <h1 className="m-0 text-[48px] font-semibold leading-[1.2] text-white max-md:text-[38px] max-md:leading-[1.5]">
            {hero.title}
          </h1>
        </div>
      </div>
    </div>
  );
}
