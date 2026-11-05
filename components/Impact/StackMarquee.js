import { cx } from '@/lib/cx';

/**
 * The logo / portrait strip inside a stack card — port of
 * `.swiper-in-stack > .swiper.marquee-swiper` (reference/index.php:1822-1862,
 * 1889-1907, 1934-1949).
 *
 * ── The reference behaviour ───────────────────────────────────────────────
 * Every `.marquee-swiper` on the page is handed to one Swiper call
 * (assets/include/footer.php:294-305):
 *
 *     new Swiper('.marquee-swiper', {
 *       slidesPerView: 'auto', spaceBetween: 20, allowTouchMove: false,
 *       loop: true, speed: 4000,
 *       autoplay: {delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true},
 *     })
 *
 * plus `.marquee-swiper .swiper-wrapper {transition-timing-function: linear}`
 * and `.marquee-swiper:hover .swiper-wrapper {animation-play-state: paused}`
 * (assets/include/header.php:542-548).
 *
 * `delay: 0` + `speed: 4000` + linear easing is not a stepped carousel at all —
 * it is a constant-velocity marquee that covers exactly one slide pitch every
 * **4000 ms**. There is no drag (`allowTouchMove: false`), no pagination and no
 * navigation, so a CSS keyframe reproduces it 1:1 without shipping Swiper —
 * the same approach the awards band already uses.
 *
 * The track holds the authored slides twice and travels -50%, i.e. exactly one
 * set, so the seam is invisible. Each slide carries its own 20px right margin
 * (Swiper's `spaceBetween`) rather than the track carrying `gap`, because a
 * `gap` would leave one set 20px short of half the track and the loop would
 * visibly jump.
 *
 * Duration is therefore slideCount x 4s: 48s / 56s / 40s (see tailwind.config).
 */

/* ref .swiper-in-stack */
const VIEWPORT =
  'w-[204px] min-w-[200px] overflow-hidden max-md:w-full max-md:max-w-[200px]';

/* ref .swiper-slide + Swiper `spaceBetween: 20` */
const SLIDE = 'mr-5 flex-none';

function Item({ item, variant }) {
  if (variant === 'circle') {
    return (
      /* ref .stack-img-circle */
      <div className="flex h-[45px] w-[45px] flex-none items-center justify-center overflow-hidden rounded-full border-2 border-[#009fe0]">
        {/*
          ref .stack-circle-img — `width: 64px` on a 64x64 source, clamped by
          Webflow's `max-width: 100%` to the circle's 41px content box.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          width={64}
          height={64}
          loading="lazy"
          decoding="async"
          className="h-auto w-16 max-w-full object-fill"
        />
      </div>
    );
  }

  /* ref .swiper-slide > img — unstyled, so the 60x40 marks render 1:1 */
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt}
      width={60}
      height={40}
      loading="lazy"
      decoding="async"
      className="block"
    />
  );
}

export default function StackMarquee({ marquee }) {
  const { items, variant, duration } = marquee;

  return (
    <div className={VIEWPORT}>
      {/* ref .swiper-wrapper, driven by the 4s-per-slide keyframe */}
      <div
        className={cx(
          'flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none',
          duration,
        )}
      >
        {items.map((item, i) => (
          <div key={`${item.src}-${i}`} className={SLIDE}>
            <Item item={item} variant={variant} />
          </div>
        ))}

        {/* The seam copy — identical, and hidden from the a11y tree. */}
        {items.map((item, i) => (
          <div
            key={`${item.src}-${i}-loop`}
            aria-hidden="true"
            className={SLIDE}
          >
            <Item item={item} variant={variant} />
          </div>
        ))}
      </div>
    </div>
  );
}
