import { cx } from '@/lib/cx';

/**
 * `.patent-card` — an indigo text plate beside a photograph, used by
 * /success-stories-atlas "Patents & Copyrights" (`.atlas`) and by
 * /schools/isdi/atlas-isdi-advantage "Impact Driven Research & Innovation" (`.isdi`).
 *
 * Measured on both references at 1440 / 768 / 390, and **every inner part is
 * identical**: only the outer card's colour, radius and wash differ.
 *
 *                            >=768px                  <=767px
 *   .patent-card             801 x 478, row,          column, width auto,
 *                            space-between, px 30     height auto, pb 30
 *   .patent-card-content     352 x 377, #464397,      width 280 — and the
 *                            padding 36 27            **height stays 377**: the
 *                            <=767 rule overrides the width only
 *   .patent-holder           24px/32, 700, #07f6a0 —  inner <strong> 18px/27
 *                            but everything in it is the <strong>, which
 *                            overrides to white, so the mint never paints
 *   .patent-year             14px/20, 1px white rule, 12px
 *                            pt 10, pb 22, mb 25
 *   .patent-name-1           18px/1.4, mb 25          14px
 *   .patent-img              343 x 420, self-centre   280 x 250
 *
 *   variant   atlas                        isdi
 *   card      #41418e, radius 32px 0,      #00277d, radius 16, the base class's
 *             `background-image: none`     `vector-patent.png` wash at
 *             (so that file is not          `soft-light`
 *             downloaded for that page)
 *
 * The `<strong>` is given an explicit `font-bold`: the div is already 700 and
 * Preflight's relative `bolder` would resolve that to 900.
 */
const VARIANT = {
  atlas: 'rounded-tl-[32px] rounded-br-[32px] bg-[#41418e]',
  isdi: 'rounded-2xl bg-[#00277d] bg-[position:50%_50%] bg-no-repeat bg-blend-soft-light',
};

export default function PatentCard({ card, variant = 'atlas', wash }) {
  return (
    /* ref .patent-card.atlas / .patent-card.isdi */
    <div
      className={cx(
        'flex h-[478px] w-[801px] items-stretch justify-between px-[30px]',
        'max-md:h-auto max-md:w-auto max-md:flex-col max-md:pb-[30px]',
        VARIANT[variant]
      )}
      style={variant === 'isdi' && wash ? { backgroundImage: `url(${wash})` } : undefined}
    >
      {/* ref .patent-card-content */}
      <div className="h-[377px] w-[352px] bg-[#464397] px-[27px] py-9 text-white max-md:w-[280px]">
        {/* ref .patent-holder > strong — the div is mint and the <strong> inside it
            overrides that to white, so the title never paints mint on either page */}
        <div className="text-[24px] font-bold leading-8 text-[#07f6a0]">
          <strong className="font-bold text-white max-md:text-[18px] max-md:leading-[1.5]">
            {card.title}
          </strong>
          <br />
        </div>

        {/* ref .patent-year */}
        <div className="mb-[25px] border-b border-white pb-[22px] pt-2.5 text-[14px] leading-5 no-underline max-md:text-[12px]">
          {card.number}
        </div>

        {/* ref .patent-name-1 */}
        <div className="mb-[25px] text-[18px] leading-[1.4] max-md:text-[14px]">{card.holder}</div>
      </div>

      {/* ref img.patent-img */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        alt={card.image.alt}
        loading="lazy"
        decoding="async"
        className="h-[420px] w-[343px] self-center max-md:h-[250px] max-md:w-[280px]"
      />
    </div>
  );
}
