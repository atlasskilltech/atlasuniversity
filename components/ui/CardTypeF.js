import { cx } from '@/lib/cx';

/**
 * `.card-type-f` — a photograph with, on one variant, a partner's logo laid over
 * its foot, and nothing else.
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
 * `.card-type-f.swiper-slide { width: 282px }` never applies on any of them:
 * the card sits *inside* a `.swiper-slide` rather than being one, so it keeps
 * its 272px.
 *
 * ── The `base` variant ────────────────────────────────────────────────────
 * /schools/isdi/atlas-isdi-advantage authors `data-wf--card-type-f--variant="base"`
 * in four carousels. Measured against the `atlas` cards at 1440 / 768 / 390, the
 * box, the text wrap (lower 80%, padding 24) and the image are identical and two
 * things differ: the corners are a plain **16px** rather than `32px 0`, and
 * `.cd-tyf-detail` is **empty** — no logo is authored at all, so the wrap is a
 * 272 x 264 box over a 224 x 0 child. It is still rendered: an empty element is
 * still a box, and this one is a flex child of the wrap.
 */
const VARIANT = {
  atlas: 'rounded-tl-[32px] rounded-br-[32px]',
  base: 'rounded-2xl',
};
export default function CardTypeF({ card, variant = 'atlas' }) {
  return (
    /* ref .card-type-f */
    <div className={cx('relative h-[330px] w-[272px] overflow-hidden text-white', VARIANT[variant])}>
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
        {/* ref .cd-tyf-detail — empty on the `base` variant, and still a box */}
        <div className="w-full flex-none">
          {card.logo && (
            /* ref img.cd-tyf-logo-img */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={card.logo.src}
              srcSet={card.logo.srcSet}
              alt={card.logo.alt}
              loading="lazy"
              className="block"
            />
          )}
        </div>
      </div>
    </div>
  );
}
