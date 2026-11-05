import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.slider-card-d` — the wide zoom-slider card: a photograph that fills the slide,
 * optionally captioned with a pink name plate over a blue role plate.
 *
 * Extracted from `Industry/Visits` when /schools/isdi/success-stories/success-snapshot
 * turned out to build its "Pre-placement talks" slider from the same card. Measured
 * on both references at 1440 / 768 / 390:
 *
 *   .slider-card-d            800 x 478, block, clipped; `width: 100%` at <=767
 *   img.slider-card-d-image   100% x 100% cover
 *   .slider-content-d         absolute at the card's bottom-left, column,
 *                             items-start, pb32, z1 — no gradient (the sheet puts
 *                             that on `.isme-2` and on a Webflow variant, neither
 *                             of which these carry)
 *   .slider-title-d.isdi      white on #ec1376, 18px/1 600, p 10/18
 *   .slider-title-sub-d       white on #0038b1 (`.isdi-blue`), 14px/1.2 500,
 *                             p 10/18, min-width 350
 *
 * **`.slider-card-b.isdi` is this card under another name.** The Events pages
 * author `.slider-card-b` where the earlier pages author `.slider-card-d`, and the
 * two declare the same box — 800 x 478, `display: block`, clipped, fluid at <=767
 * — over the same `width: 100%; height: 100%` cover image. It carries no caption
 * and its radius is on the CARD, not the image, hence `imageRounded`.
 *
 * **The radius is per card.** `.slider-card-d.isdi` is `border-radius: 16px`;
 * Visits' three cards carry that modifier and the Success Snapshot page's three do
 * not — there the base class's `border-radius: 0` stands and only the IMAGE carries
 * `.isdi`. Both paint the same, because the image fills the card, but the computed
 * value differs — hence `rounded`, which also governs the image's own corners.
 */
export default function SliderCardD({ slide, rounded = true, imageRounded = true }) {
  return (
    /* ref .slider-card-d(.isdi) */
    <div
      className={cx(
        'relative block h-[478px] w-full items-end overflow-hidden',
        rounded && 'rounded-2xl'
      )}
    >
      {/* ref img.slider-card-d-image(.isdi) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image.src}
        srcSet={slide.image.srcSet}
        sizes={slide.image.sizes}
        alt={slide.image.alt}
        loading="lazy"
        decoding="async"
        className={cx('h-full w-full object-cover', imageRounded && 'rounded-2xl')}
      />

      {slide.name && (
        /* ref .slider-content-d */
        <div className="absolute bottom-0 left-0 z-[1] flex flex-col items-start justify-start pb-8">
          {/* ref .slider-title-d.isdi */}
          <div className="block bg-[#ec1376] px-[18px] py-2.5 text-[18px] font-semibold leading-none text-white">
            {slide.name}
          </div>
          {/* ref .slider-title-sub-d.isdi-blue */}
          <div className="block min-w-[350px] bg-[#0038b1] px-[18px] py-2.5 text-[14px] font-medium leading-[1.2] text-white">
            {withBreaks(slide.role)}
          </div>
        </div>
      )}
    </div>
  );
}
