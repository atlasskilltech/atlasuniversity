import withBreaks from '@/lib/withBreaks';

/**
 * `.card-type-electives.isdi` on its **image** variant — a photograph with a flat
 * scrim over its lower half and a caption in it. The ISDI homepage's "Choose Your
 * Minor" uses the *video* variant of the same class, which is a different card.
 *
 * Extracted from `ProgramsUg/Multidisciplinary` when /atlas-isdi-advantage's
 * "Choose Your Minor" turned out to use this one. Measured identical on both at
 * 1440 / 768 / 390:
 *                     >=768px                    <=767px          <=479px
 *   card              298 x 232, r16, clipped    auto width
 *   caption wrap      bottom half, flat #00000063, p24, centred    p12
 *   title             20px/1.5 white             18px/1.5         12px/1.5
 *
 * `card.title` is optional, and the distinction matters: an element the reference
 * OMITS is not an element it leaves empty. The fourteen cards in
 * /atlas-isdi-advantage/internationalisation's "Global Immersion" tabs author no
 * `.cd-txt-wrap-3` at all — just the photograph — so rendering the caption wrap
 * would paint a flat `#00000063` scrim over the lower half of every one of them.
 *
 * The fifth card of the Undergraduate Overview's "Human-Centered and Social Design"
 * is authored without an image, so the reference paints a 298 x 0 slide; rendering
 * the card imageless reproduces that, which is why `card.image` is optional.
 */
export default function MinorCard({ card }) {
  return (
    /* ref .card-type-electives.isdi */
    <div className="relative w-[298px] overflow-hidden rounded-2xl text-white max-md:w-auto">
      {card.title && (
        /* ref .cd-txt-wrap-3.isme-149 */
        <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-center bg-[linear-gradient(#00000063,#00000063)] p-6 max-md:p-3">
          {/* ref .cd-ta-text.isme-34 */}
          <div className="text-[20px] leading-[1.5] max-md:text-[18px] max-md:leading-[1.5] max-sm:text-[12px] max-sm:leading-[1.5]">
            {withBreaks(card.title)}
          </div>
        </div>
      )}
      {/* ref img.cd-ta-image.isme-143 — the fifth card of "Human-Centered and Social
          Design" is authored without one, so the reference paints a 298 x 0 slide
          (its caption is `height: 50%` of nothing, clipped away); rendering the card
          imageless reproduces that */}
      {card.image && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={card.image.src}
          width={card.image.width}
          height={card.image.height}
          alt={card.image.alt}
          loading="lazy"
          decoding="async"
          className="inline-block h-full w-full max-w-full object-cover align-middle"
        />
      )}
    </div>
  );
}
