/**
 * `.card-type-f` on its `atlas` variant — a photograph with a partner's logo
 * laid over its foot, and nothing else.
 *
 * Two pages, measured identical in every property:
 *   /advantages/atlas-career-services  "Career Connect"        12 cards, in a
 *                                                              `.zoom-slider`
 *   /advantages/atlas-industry-…       six `.common-swiper`s   37 cards
 *                                      plus three tab panes    18 cards
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 * The card does not move at any width:
 *   .card-type-f (atlas)  272 x 330, radius `32px 0`, clipped
 *   .cd-tyf-txt-wrap      lower 80% (264px), row, align-end, padding 24,
 *                         no gradient
 *   .cd-tyf-detail        width 100%, `flex: none`
 *   .cd-tyf-image         100% x 100%, cover
 *
 * `.card-type-f.swiper-slide { width: 282px }` never applies on either page:
 * the card sits *inside* a `.swiper-slide` rather than being one, so it keeps
 * its 272px.
 */
export default function CardTypeF({ card }) {
  return (
    /* ref .card-type-f (atlas variant) */
    <div className="relative h-[330px] w-[272px] overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-white">
      {/* ref img.cd-tyf-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes={card.image.sizes}
        alt={card.image.alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />

      {/* ref .cd-tyf-txt-wrap */}
      <div className="absolute inset-x-0 bottom-0 flex h-4/5 w-full flex-row items-end p-6">
        {/* ref .cd-tyf-detail */}
        <div className="w-full flex-none">
          {/* ref img.cd-tyf-logo-img */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.logo.src}
            srcSet={card.logo.srcSet}
            alt={card.logo.alt}
            loading="lazy"
            className="block"
          />
        </div>
      </div>
    </div>
  );
}
