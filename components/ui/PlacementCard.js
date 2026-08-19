import { cx } from '@/lib/cx';

/**
 * The placement card — a portrait with the employer's logo pinned to its
 * top-right and an indigo plate across the bottom carrying the name, course and
 * batch.
 *
 * Two instances, differing in two declarations only:
 *   /success-stories-atlas          `.placement-card.atlas`       11 cards
 *   /advantages/atlas-industry-…    `.placement-card-atlas`        5 cards
 *
 *   card background   `.atlas` leaves it transparent; `-atlas` paints #41418e,
 *                     which shows below 768px where the card is a column and
 *                     the photograph no longer fills it.
 *   logo width        30% on /success-stories, 20% here.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                          >=768px                    <=767px
 *   card                   398 x 542, radius 32px 0,  298 wide, column flex
 *                          clipped
 *   .p-card-img            100% x 414, clipped        flex 1
 *   .p-card-main-img       cover, object-position     unchanged
 *                          50% 0
 *   .p-company-img(-atlas) absolute top 5% right 5%   max-width 70
 *   .p-content-wrapper     absolute bottom, #41418e,  unchanged
 *                          padding 20 30
 *   .p-card-name           32px, 500, #fff            22px
 *   .placement-course      18px, #fff                 16px
 *   .placement-batch       14px, #fff                 12px
 *
 * The card keeps its 542px height below 768px while `.p-card-img` becomes
 * `flex: 1`, so the photograph absorbs whatever the text plate leaves.
 */
export default function PlacementCard({ card, logoWidth = '30%', filled = false }) {
  return (
    /* ref .placement-card.atlas / .placement-card-atlas */
    <div
      className={cx(
        'relative h-[542px] w-[398px] overflow-hidden rounded-tl-[32px] rounded-br-[32px]',
        'max-md:flex max-md:w-[298px] max-md:flex-col',
        filled && 'bg-[#41418e]',
      )}
    >
      {/* ref .p-card-img */}
      <div className="relative h-[414px] w-full overflow-hidden max-md:h-auto max-md:flex-1">
        {/* ref img.p-card-main-img */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.image.src}
          srcSet={card.image.srcSet}
          sizes={card.image.sizes ?? '(max-width: 767px) 100vw, (max-width: 991px) 95vw, 939.9609375px'}
          alt={card.image.alt}
          loading="lazy"
          className="inline-block h-full w-full object-cover object-[50%_0%]"
        />

        {/* ref img.p-company-img(-atlas) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.logo.src}
          srcSet={card.logo.srcSet}
          alt={card.logo.alt}
          loading="lazy"
          /* the width is the only thing that differs between the two pages, so
             it travels as a custom property and the *property* stays in a
             class — an inline `width` would beat the <=767 rule as well */
          style={{ '--p-logo-w': logoWidth }}
          className="absolute right-[5%] top-[5%] z-10 block w-[var(--p-logo-w)] max-w-none max-md:w-full max-md:max-w-[70px]"
        />
      </div>

      {/* ref .p-content-wrapper.atlas / .p-content-wrapper-atlas */}
      <div className="absolute inset-x-0 bottom-0 w-full bg-[#41418e] px-[30px] py-5">
        {/* ref .txt-block-linkedin */}
        <div className="flex items-center justify-between">
          {/* ref .p-card-name */}
          <div className="text-[32px] font-medium text-white max-md:text-[22px]">{card.name}</div>
        </div>

        {/* ref .placement-course */}
        <div className="text-[18px] text-white max-md:text-[16px]">{card.course}</div>

        {/* ref .placement-batch — /advantages/atlas-industry-centric-approach
            authors no batch element at all, so it is omitted rather than
            rendered empty */}
        {card.batch != null && (
          <div className="text-[14px] text-white max-md:text-[12px]">{card.batch}</div>
        )}
      </div>
    </div>
  );
}
