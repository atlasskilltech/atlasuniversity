import withBreaks from '@/lib/withBreaks';

/**
 * `.placement-card.isdi` — a portrait with the employer's mark pinned to its
 * top-right corner and a coloured plate across the bottom.
 *
 * It is NOT `components/ui/PlacementCard` (`.placement-card-atlas`, the ATLAS
 * /success-stories "Placements" card): different class, different anatomy — this one
 * has a LinkedIn link, a course and a batch line — so it is this page's own.
 *
 * ── Measured on production at 1440 / 768 / 390 ────────────────────────────
 *                        >=768px                      <=767px
 *   .placement-card.isdi 398 x 542, r16, clipped       298 wide, and a flex COLUMN
 *   .p-card-img          full width x 414, clipped     `flex: 1`, so it fills
 *   .p-card-main-img     100% x 100% cover at 50% 0
 *   .p-company-img       absolute `inset: 5% 5% auto   width 100%, max-width 70
 *                        auto`, width 30%, z10
 *   .p-content-wrapper   absolute bottom, full width,  same
 *                        p 20/30, #0038b1 (`.isdi`)
 *                        or #ec1376 (`.isdi-pink`)
 *   .txt-block-linkedin  row, space-between, centred
 *   .p-card-name.isdi    28px/1.5 500 — **at every width**: the <=767 rule that
 *                        takes a plain `.p-card-name` to 22px is (0,1,0) against
 *                        this compound's (0,2,0)
 *   .placement-course    18px -> 16px
 *   .placement-batch     14px -> 12px
 */
export default function PlacementCard({ card }) {
  return (
    /* ref .placement-card.isdi */
    <div className="relative h-[542px] w-[398px] overflow-hidden rounded-2xl max-md:flex max-md:w-[298px] max-md:flex-col">
      {/* ref .p-card-img */}
      <div className="relative h-[414px] w-full overflow-hidden max-md:h-auto max-md:flex-1">
        {/* ref img.p-card-main-img */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.image.src}
          alt={card.image.alt}
          loading="lazy"
          decoding="async"
          className="inline-block h-full w-full max-w-none object-cover object-[50%_0%] align-middle"
        />
        {/* ref img.p-company-img */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.logo.src}
          alt={card.logo.alt}
          loading="lazy"
          decoding="async"
          className="absolute right-[5%] top-[5%] z-10 block w-[30%] max-w-none max-md:w-full max-md:max-w-[70px]"
        />
      </div>

      {/* ref .p-content-wrapper.isdi / .isdi-pink */}
      <div
        className="absolute inset-x-0 bottom-0 w-full px-[30px] py-5 text-white"
        style={{ backgroundColor: card.tone }}
      >
        {/* ref .txt-block-linkedin */}
        <div className="flex items-center justify-between">
          {/* ref .p-card-name(.isdi) */}
          <div className="text-[28px] font-medium leading-[1.5]">{card.name}</div>
          {/* the LinkedIn mark is optional — /schools/isdi/parents-corner's
              "Strong Careers" cards author `.txt-block-linkedin` with only the
              name and no anchor */}
          {card.linkedin && (
            <a href={card.linkedin.href} target="_blank" rel="noreferrer" className="inline-block max-w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.linkedin.icon.src}
                alt={card.linkedin.icon.alt}
                loading="lazy"
                decoding="async"
                className="inline-block max-w-full align-middle"
              />
            </a>
          )}
        </div>
        {/* ref .placement-course */}
        <div className="text-[18px] max-md:text-base">{withBreaks(card.course)}</div>
        {/* ref .placement-batch */}
        <div className="text-[14px] max-md:text-[12px]">{card.batch}</div>
      </div>
    </div>
  );
}
