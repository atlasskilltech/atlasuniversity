/**
 * `.slider-card-e-ugdx > .slider-card-e-cont` — the wide speaker card carried
 * by `ZoomSliderLg`: a photograph with the speaker's name and organisation over
 * a dark gradient across its lower half.
 *
 * Two instances:
 *   /advantages/atlas-career-services  "Pre-Placement Talks"            7
 *   /advantages/atlas-industry-…       "Industry Expert-Led Masterclasses"  10
 *
 * They differ in one element: the masterclass cards add an `img.comp-image`,
 * the speaker's employer logo, pinned to the card's top-right — so `card.logo`
 * is optional.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                   <=767px
 *   .slider-card-e-ugdx      800 x 478, radius 32/0    width 100%
 *   .slider-card-e-cont      bottom half, #00263700    padding 0 16 24
 *                            14% -> #040404e6,
 *                            padding 0 40 50
 *   .slide-cd-atlas          32px/1, 600, #fff         24px
 *   .slide-cd-e-desc         24px/400, #fff, pt 10     18px
 *   .comp-image              absolute top 20 right 24, natural size (136x56
 *                            on the widest of the ten), at every width
 *
 * `.comp-image` declares `inset: 20px 24px 0% auto`, but a replaced element
 * with `height: auto` is over-constrained by top + bottom, so `bottom` is
 * dropped and the logo keeps its intrinsic height.
 *
 * `.slide-cd-e-desc` is empty on all seven Pre-Placement cards and is still a
 * real box — its 10px top padding applies — so it is rendered either way.
 *
 * The sibling with the cyan chip label instead of plain white text
 * (`.slider-card-e-atlas-2` + `.slide-cd-atlas-2`) is a different card and
 * lives in `components/ui/ChipSlideCard`.
 */
export default function SpeakerSlideCard({ slide }) {
  return (
    /* ref .slider-card-e-ugdx */
    <div className="relative block h-[478px] w-full items-end overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
      {/* ref img.slide-card-e-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image.src}
        srcSet={slide.image.srcSet}
        sizes={slide.image.sizes}
        alt={slide.image.alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />

      {/* ref img.comp-image — only the masterclass cards carry one */}
      {slide.logo && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={slide.logo.src}
          srcSet={slide.logo.srcSet}
          alt={slide.logo.alt}
          loading="lazy"
          className="absolute right-6 top-5"
        />
      )}

      {/* ref .slider-card-e-cont */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 flex-col items-start justify-end bg-[linear-gradient(#00263700_14%,#040404e6)] px-10 pb-[50px] max-md:px-4 max-md:pb-6">
        {/* ref .slide-cd-e-flex */}
        <div className="flex w-full flex-none items-center justify-between">
          {/* ref .slide-cd-e-lt — a block, so as a flex item it shrinks to its
              content */}
          <div className="block">
            {/* ref .slide-cd-atlas */}
            <div className="text-[32px] font-semibold leading-none text-white max-md:text-[24px]">
              {slide.title}
            </div>
            {/* ref .slide-cd-e-desc */}
            <div className="pt-2.5 text-[24px] font-normal text-white max-md:text-[18px]">
              {slide.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
