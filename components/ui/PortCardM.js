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
/*
 * `variant="ugdx"` — `.port-card-m-wrap-ugdx`, /centre_for_research "Our Objectives". Measured at
 * 1440 / 767 / 390 (the card does not change with width):
 *   .port-card-m-wrap-ugdx      295 x 480 (not 520), radius 32px 0, clipped
 *   .port-card-m-txt-wrap-ugdx  absolute bottom, #41418e, row, align-end, padding 24; the first card
 *                               adds `.custom-card-height` (the page's own <style>: height 134)
 *   .port-card-m-text-ugdx      24px/1.2 **300** white
 *   .port-card-m-posi-ugdx      16px/1.4 400 white, padding-top 10
 *   .port-card-m-arrow-ugdx     #011627 notch, 29 x 21 at its own size (no scale), 17px above the
 *                               bar and 30px in
 */
function PortCardMUgdx({ item }) {
  return (
    /* ref .port-card-m-wrap-ugdx */
    <div className="relative block h-[480px] w-[295px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-base text-white">
      {/* ref .port-card-m-txt-wrap-ugdx(.custom-card-height) */}
      {/* ref .pcm-tp-wrap > img.port-card-m-comp-logo — the School of Law / uGDX "Our Halls attract the
          Remarkable" cards carry the company mark top-left (padding 20 20 0, the logo at its own size);
          /centre_for_research's cards author none, so it renders only when the data has one */}
      {item.logo && (
        <div className="absolute inset-x-0 top-0 z-[1] flex items-center justify-between px-5 pt-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.logo} alt="" loading="lazy" className="block" />
        </div>
      )}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] flex w-full flex-row items-end p-6"
        /* `item.barColor` — the bar is #41418e on /centre_for_research and #011627 on the School of
           Law's homepage; the colour travels with the card so no two bg utilities meet */
        style={{ backgroundColor: item.barColor ?? '#41418e', ...(item.barHeight ? { height: item.barHeight } : null) }}
      >
        {/* ref .port-card-m-detail */}
        <div className="relative w-full flex-none">
          {/* ref .port-card-m-text-ugdx */}
          <div className="text-2xl font-light leading-[1.2] text-white">{withBreaks(item.name)}</div>
          {/* ref .port-card-m-posi-ugdx */}
          <div className="pt-2.5 text-base font-normal leading-[1.4] text-white">{withBreaks(item.position)}</div>
        </div>
        {/* ref .port-card-m-arrow-ugdx > .svg-icon-triangle */}
        <div className="absolute -top-[17px] left-[30px] h-[21px] w-[29px] text-[#011627]">
          <svg width="29" height="21" viewBox="0 0 29 21" fill="none" aria-hidden="true" className="block">
            <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
          </svg>
        </div>
      </div>
      {/* ref img.port-card-m-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image} alt={item.alt} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
    </div>
  );
}

export default function PortCardM({ item, variant = 'atlas' }) {
  if (variant === 'ugdx') return <PortCardMUgdx item={item} />;
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

      {/* ref .port-card-m-txt-wrap-atlas — the uGDX homepage pairs this card with `.port-card-m-txt-wrap-ugdx`
          (#011627), which travels as `item.barColor`; an inline colour, so no two bg utilities meet */}
      <div
        className="absolute inset-x-0 bottom-0 flex w-full flex-row items-end bg-[#41418e] p-6"
        style={item.barColor ? { backgroundColor: item.barColor } : undefined}
      >
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
        <div className="absolute -top-[19px] left-[30px] h-[21px] w-[29px] scale-[0.8] text-[#41418e]" style={item.barColor ? { color: item.barColor } : undefined}>
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
