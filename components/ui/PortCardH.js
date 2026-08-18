/**
 * `.port-card-h-wrap.atlas` — a 295x519 photo card with an indigo caption bar
 * pinned across its foot and a small notch pointing up out of it.
 *
 * Three uses, all inside a `.common-swiper`, all measured identical:
 *   /campus-atlas  "Food on Campus"        `campus-atlas.php:516-616`
 *   /life-at-atlas "Win on and off the field" `life-at-atlas.php:386-463`
 *   /life-at-atlas "Student favourites"    `life-at-atlas.php:953-1053`
 *
 * ── Measured cascade — the card does not change with width ────────────────
 *   .port-card-h-wrap.atlas   295 x 519, radius 32/0, clipped
 *   .port-card-h-image        width 100%, height auto, object-cover — the
 *                             photos are authored at exactly 295x519
 *   .port-card-atlas-wrap     pinned to the bottom, #41418e, padding 24, row,
 *                             align-end
 *   .port-card-h-text         24px/1.2, 400, #fff
 *   .port-card-h-distance     `.white` -> 18px/1.2, 400, #fff, padding-top 10
 *   .port-card-m-arrow-atlas  29x21 notch at top:-19 left:30, scale(.8),
 *                             `currentColor` resolving to its own #41418e
 */
export default function PortCardH({ item }) {
  return (
    /* ref .port-card-h-wrap.atlas */
    <div className="relative block h-[519px] w-[295px] flex-none items-end justify-center overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-white">
      {/* ref img.port-card-h-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image.src}
        alt={item.image.alt}
        loading="lazy"
        className="mx-auto block w-full object-cover"
      />

      {/* ref .port-card-atlas-wrap */}
      <div className="absolute inset-x-0 bottom-0 flex w-full flex-row items-end bg-atlas-footer p-6">
        {/* ref .port-card-h-detail */}
        <div className="relative w-full flex-none">
          {/* ref .port-card-h-text */}
          <div className="text-[24px] font-normal leading-[1.2] text-white">{item.title}</div>
          {/* ref .port-card-h-distance.white */}
          <div className="pt-2.5 text-[18px] font-normal leading-[1.2] text-white">
            {item.place}
          </div>
        </div>

        {/* ref .port-card-m-arrow-atlas > .svg-icon-triangle */}
        <div className="absolute -top-[19px] left-[30px] h-[21px] w-[29px] scale-[0.8] text-atlas-footer">
          <svg
            width="29"
            height="21"
            viewBox="0 0 29 21"
            fill="none"
            aria-hidden="true"
            className="block"
          >
            <path
              d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
