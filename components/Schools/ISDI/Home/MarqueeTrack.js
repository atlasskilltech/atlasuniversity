import { Children } from 'react';
import { cx } from '@/lib/cx';

/**
 * A `.swiper.marquee-swiper` — every one on the ISDI homepage is initialised by
 * reference/schools/isdi/assets/include/footer.php:
 *
 *   new Swiper('.marquee-swiper', { slidesPerView: 'auto', spaceBetween: 20,
 *     allowTouchMove: false, loop: true, speed: 4000,
 *     autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true } })
 *
 * over `.marquee-swiper .swiper-wrapper { transition-timing-function: linear }`:
 * a constant-speed marquee moving one slide every 4s, paused while hovered, with
 * no drag. As on the ATLAS homepage it is a CSS keyframe (`impact-marquee`,
 * translateX 0 -> -50%) over two copies of the slides, `slides x 4s` long; the
 * duration travels as a custom property so the animation itself stays a class
 * and `motion-safe:` can switch it off. Each slide carries Swiper's 20px as a
 * right margin, so one copy is exactly half the track and the seam is invisible.
 *
 * Where slides differ in width Swiper's speed varies slightly per slide; the
 * keyframe runs at the average speed.
 */
export default function MarqueeTrack({ children, className, slideClassName }) {
  const slides = Children.toArray(children);
  return (
    /* ref .swiper.marquee-swiper */
    <div className={cx('relative z-[1] overflow-hidden', className)}>
      {/* ref .swiper-wrapper */}
      <div
        className={
          'relative z-[1] flex w-max items-center hover:[animation-play-state:paused] ' +
          'motion-safe:animate-[impact-marquee_var(--marquee-duration)_linear_infinite]'
        }
        style={{ '--marquee-duration': `${slides.length * 4}s` }}
      >
        {[0, 1].map((copy) =>
          slides.map((slide, i) => (
            /* ref .swiper-slide + spaceBetween: 20 */
            <div
              key={`${copy}-${i}`}
              aria-hidden={copy === 1 || undefined}
              className={cx('relative mr-5 flex-none overflow-clip', slideClassName)}
            >
              {slide}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
