import withBreaks from '@/lib/withBreaks';

/**
 * `.port-card-m-wrap-atlas` (base, no `…v2`) — a photograph filling a 295x520
 * card with an indigo bar across its lower edge, notched by a small triangle.
 *
 * Three instances, measured identical in every property:
 *   homepage                            "Industry on Campus"   10 cards, logo
 *   /advantages/atlas-enterprenurship   "More Than a Degree"    6 cards, no logo
 *   /advantages/atlas-enterprenurship   "8 Steps of IPR…"       8 cards, no logo
 *
 * The homepage's cards add `.pcm-tp-wrap-atlas`, a top strip holding the
 * company's logo; the two entrepreneurship carousels have none. That is the
 * only structural difference, so the strip is rendered only when a `logo` is
 * given.
 *
 * ── Measured cascade — the card does not change with width ────────────────
 *   .port-card-m-wrap-atlas   295 x 520, radius 32px 0, clipped, block
 *   .port-card-m-image-atlas  100% x 100%, cover
 *   .port-card-m-txt-wrap-    absolute bottom, #41418e, row, align-end,
 *     atlas                   padding 24
 *   .port-card-m-text-atlas   24px/1.2, 600, #fff, no text-transform
 *   .port-card-m-posi-atlas   14px/1.4, 400, #fff, padding-top 10
 *   .port-card-m-arrow-atlas  absolute -19 / left 30, 29x21, scale(0.8),
 *                             colour #41418e
 *
 * `.port-card-m-posi-atlas` declares `border-top: 0.5px #e8e8e8` — a width and
 * a colour but no border-*style* — so it computes to `none` / 0px and paints
 * nothing. No border class here.
 *
 * The notch's `fill="currentColor"` resolves to `.port-card-m-arrow-atlas`'s
 * own `#41418e`, so it matches the bar.
 */
export default function PortCardM({ item }) {
  return (
    /* ref .port-card-m-wrap-atlas (base, no v2) */
    <div className="relative block h-[520px] w-[295px] flex-none items-end justify-center overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-base text-white">
      {item.logo && (
        /* ref .pcm-tp-wrap-atlas — top strip, logo pushed right */
        <div className="absolute inset-x-0 top-0 flex items-center justify-end px-5 pt-5">
          {/* ref .port-card-m-comp-logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.logo}
            alt={item.logoAlt}
            loading="lazy"
            decoding="async"
            className="flex-none"
          />
        </div>
      )}

      {/* ref .port-card-m-txt-wrap-atlas */}
      <div className="absolute inset-x-0 bottom-0 flex w-full flex-row items-end bg-[#41418e] p-6">
        {/* ref .port-card-m-detail-atlas */}
        <div className="relative w-full flex-none">
          {/* ref .port-card-m-text-atlas */}
          <div className="mb-0 text-2xl font-semibold normal-case leading-[1.2] text-white">
            {withBreaks(item.name)}
          </div>
          {/* ref .port-card-m-posi-atlas */}
          <div className="pt-2.5 text-sm font-normal leading-[1.4] text-white">
            {withBreaks(item.position)}
          </div>
        </div>

        {/* ref .port-card-m-arrow-atlas */}
        <div className="absolute -top-[19px] left-[30px] h-[21px] w-[29px] scale-[0.8] text-[#41418e]">
          <svg width="29" height="21" viewBox="0 0 29 21" fill="none" aria-hidden="true" className="block">
            <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* ref .port-card-m-image-atlas */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        srcSet={item.srcSet}
        sizes={item.sizes}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="mx-auto block h-full w-full object-cover"
      />
    </div>
  );
}
