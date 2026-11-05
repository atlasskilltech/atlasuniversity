import withBreaks from '@/lib/withBreaks';
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
/*
 * `skin="isme"` — the ISME career-services "Students at work" card, `.port-card-h-wrap` without
 * `.atlas` (measured at 1440 / 768 / 390, identical at every width): square corners, a #072058
 * `.port-card-h-txt-wrap` plate, the name `.port-card-h-text.mint` in #07f6a0, and an unscaled
 * 29x21 notch 20px above the plate (`.port-card-h-arrow`, not `.port-card-m-arrow-atlas`).
 */
const SKIN = {
  atlas: { card: 'rounded-tl-[32px] rounded-br-[32px]', plate: 'bg-atlas-footer', title: 'text-white', arrow: '-top-[19px] scale-[0.8] text-atlas-footer' },
  isme: { card: '', plate: 'bg-[#072058]', title: 'text-atlas-mint', arrow: '-top-5 text-[#072058]' },
  /* `skin="isme2"` — ISME Non-Mumbai's `.port-card-h-wrap-2`: the same card with the colours swapped —
     the title white, the `.port-card-h-distance-2` line #07f6a0 and 700 (measured at 1440 / 390) */
  isme2: { card: '', plate: 'bg-[#072058]', title: 'text-white', arrow: '-top-5 text-[#072058]', place: 'font-bold text-atlas-mint' },
};

export default function PortCardH({ item, skin = 'atlas' }) {
  const sk = SKIN[skin] ?? SKIN.atlas;
  return (
    /* ref .port-card-h-wrap.atlas */
    <div className={`relative block h-[519px] w-[295px] flex-none items-end justify-center overflow-hidden text-white ${sk.card}`}>
      {/* ref img.port-card-h-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image.src}
        alt={item.image.alt}
        loading="lazy"
        className="mx-auto block w-full object-cover"
      />

      {/* ref .port-card-atlas-wrap */}
      <div className={`absolute inset-x-0 bottom-0 flex w-full flex-row items-end p-6 ${sk.plate}`}>
        {/* ref .port-card-h-detail */}
        <div className="relative w-full flex-none">
          {/* ref .port-card-h-text */}
          <div className={`text-[24px] font-normal leading-[1.2] ${sk.title}`}>{withBreaks(item.title)}</div>
          {/* ref .port-card-h-distance.white */}
          <div className={`pt-2.5 text-[18px] leading-[1.2] ${sk.place ?? 'font-normal text-white'}`}>
            {/* ISME Campus authors a <br> here ("Collaborative <br />Spaces"); a no-op elsewhere */}
            {withBreaks(item.place)}
          </div>
        </div>

        {/* ref .port-card-m-arrow-atlas > .svg-icon-triangle */}
        <div className={`absolute left-[30px] h-[21px] w-[29px] ${sk.arrow}`}>
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
