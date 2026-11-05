import withBreaks from '@/lib/withBreaks';

/**
 * `.slider-card-e-ugdx > .slider-card-e-atlas-2` — a full-bleed photograph with
 * a cyan chip label sitting over its lower edge, carried by `ZoomSliderLg`.
 *
 * Three instances, measured identical in every property:
 *   /campus-atlas                      "Studios, Labs, and Classrooms"      6
 *   /advantages/atlas-enterprenurship  "Our Teaching Pedagogy: The 3H…"     7
 *   /advantages/atlas-enterprenurship  "Learning Through Entrepreneurial…"  4
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                   <=767px
 *   .slider-card-e-ugdx      800 x 478, radius 32/0    width 100%
 *   .slider-card-e-atlas-2   bottom half, #00263700    padding 0 16 24
 *                            14% -> #040404e6,
 *                            padding 0 40 50 0
 *   .slide-cd-atlas-2        24px/1, 600, #072058 on   same
 *                            #5cbdca, padding 8 15
 *
 * Note the asymmetric padding: `0 40 50 0` — no left inset, so the chip sits
 * flush against the card's left edge above 768px.
 *
 * ── Two label quirks ──────────────────────────────────────────────────────
 * `bold` wraps the label in `<strong>`, which seven of the eleven chips on
 * /advantages/atlas-enterprenurship do; that lifts the weight from the class's
 * 600 to 700. The four in "Learning Through Entrepreneurial Action" and all six
 * on /campus-atlas are plain. Three labels also carry a `<br>`.
 *
 * The sibling with the plain white title rather than a chip
 * (`.slider-card-e-cont` + `.slide-cd-atlas`) is a different card and lives in
 * `components/CareerServices/PrePlacement`.
 */
/*
 * `variant="c"` — `.slider-card-c-atlas > (img.slide-card-c-image, .slider-content-c >
 * .slide-cd-atlas-2)`, /atlas-alumni-corner "Alumni-Led Initiatives & Activities". The same
 * 800 x 478 card at radius 32/0 and the same chip, but no scrim at all: `.slider-content-c` is an
 * absolutely-placed flex row pinned bottom-left with `padding-bottom: 32px`, so it shrinks to its
 * chip (456.8px for the longest label at 1440) and, where the card is narrower than that (346px
 * at 390), wraps the chip onto a second line. Measured at 1440 / 767 / 390.
 */
export default function ChipSlideCard({ slide, variant = 'e' }) {
  if (variant === 'c') {
    return (
      /* ref .slider-card-c-atlas */
      <div className="relative block h-[478px] w-full overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
        {/* ref img.slide-card-c-image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.image.src}
          srcSet={slide.image.srcSet}
          sizes={slide.image.sizes}
          alt={slide.image.alt}
          loading="lazy"
          className="inline-block h-full w-full object-cover"
        />
        {/* ref .slider-content-c */}
        <div className="absolute bottom-0 left-0 flex items-end pb-8">
          {/* ref .slide-cd-atlas-2 */}
          <div className="bg-atlas-cyan px-[15px] py-2 text-[24px] font-semibold leading-none text-[#072058]">
            {withBreaks(slide.title)}
          </div>
        </div>
      </div>
    );
  }
  return (
    /* ref .slider-card-e-ugdx */
    <div className="relative block h-[478px] w-full items-end overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
      {/* ref img.slide-card-e-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image.src}
        srcSet={slide.image.srcSet}
        sizes={slide.image.sizes ?? '(max-width: 790px) 100vw, 790px'}
        alt={slide.image.alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />

      {/* ref .slider-card-e-atlas-2 */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 flex-col items-start justify-end bg-[linear-gradient(#00263700_14%,#040404e6)] pb-[50px] pr-10 max-md:px-4 max-md:pb-6">
        {/* ref .slide-cd-e-flex */}
        <div className="flex w-full items-center justify-between">
          {/* ref .slide-cd-e-lt — a block, so as a flex item it shrinks to its
              text */}
          <div>
            {/* ref .slide-cd-atlas-2 */}
            <div className="bg-atlas-cyan px-[15px] py-2 text-[24px] font-semibold leading-none text-[#072058]">
              {slide.bold
                ? /* explicit 700: Preflight declares `strong { font-weight: bolder }`,
                     which against this chip's 600 resolves to 900, where the
                     reference's normalize gives a flat `bold` = 700 */
                  <strong className="font-bold">{withBreaks(slide.title)}</strong>
                : withBreaks(slide.title)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
