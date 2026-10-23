import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION } from '../Home/ui';
import HeadWrap from './HeadWrap';

/**
 * "Fee Structure" — `.head-wrap.top` over
 * `.dates-fees-container.isdi > .df-container.isdi.mrg-mo-top > 4 x .df-card`.
 *
 * The ATLAS Admissions pages use the same `.df-card` strip, but through
 * `components/Admissions/KeyDates`, which models tabs, stacked blocks and a "Closed" state
 * and keys its cards off `showDateCon()` output. Here it is four plain cards, the first of
 * them the coloured lead, so the strip is this page's own.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   strip             row, r16, clipped                    column
 *   lead card         flex none, #ec1376, p25, column;     full width
 *     (`.blue.isdi-pink`) its `.df-text-2.bld` is 600 with a flat-bold `<strong>`,
 *                     then `.df-txt-wrap > (.df-text-1 14/700, .df-text-3 14/400)`
 *                     and a small `img.image-8` pinned beside it
 *   card              flex 1 1 0, p25; `.df-text-2` 16/1.5 then `.df-text-1` 14/700
 *                     whose `<strong>.fee-dates` is 600
 *
 * Every `<strong>` is given an explicit weight: Preflight's `bolder` is relative, so inside
 * a 600 or 700 parent it would resolve to 900 where the reference paints Webflow's flat bold.
 */
export default function FeeStructure({ data }) {
  return (
    <section data-block="fee-structure" id="fee-structure" className={cx(SECTION, 'overflow-hidden')}>
      <div className={CONTAINER}>
        <HeadWrap
          heading={data.heading}
          sub={data.sub}
          subSpacing="mrgbtm32"
          button={data.button}
          align="top"
        />

        {/* ref .dates-fees-container.isdi > .df-container.isdi.mrg-mo-top */}
        <div className="flex overflow-hidden rounded-2xl">
          {/* ref .df-container.isdi.mrg-mo-top — 20px of top margin once it stacks */}
          <div className="flex w-full rounded-2xl max-md:mt-5 max-md:flex-col">
            {data.cards.map((card, i) => (
              /* ref .df-card(.blue.isdi-pink) */
              <div
                key={`${i}-${card.lead}`}
                className={cx(
                  'relative flex flex-col items-start p-[25px] max-md:py-[18px]',
                  /* `.df-card` is `flex: 1; justify-content: space-around`, replaced by
                     `flex-start` from `@media (min-width: 1440px)`; two justify utilities in
                     one list are resolved by stylesheet order, so the 2xl variant carries it */
                  'justify-around 2xl:justify-start',
                  card.lead4Colour
                    /* ref `.df-card.blue` — `flex: none; width: 148px`, which its own
                       `.isdi-pink` rule relaxes to auto at <=767 and to 100% at <=479 */
                    ? 'w-[148px] flex-none bg-isdi-pink text-white max-md:w-auto max-sm:w-full'
                    : 'flex-1 basis-0 max-md:basis-auto'
                )}
                style={card.background ? { backgroundColor: card.background } : undefined}
              >
                {/* ref .df-text-2(.bld) */}
                <div className={cx(card.leadStrong && 'font-semibold')}>
                  {card.leadStrong ? <strong className="font-bold">{withBreaks(card.lead)}</strong> : card.lead}
                </div>

                {/* ref .df-txt-wrap where the lead card wraps its lines, else the lines alone */}
                <div>
                  {card.lines.map((line, j) => (
                    /* ref .df-text-1 */
                    /* the lead card's `.df-text-1` ends with a `<br>`, which as a block's
                       last child paints no line — so it is not rendered */
                    <div key={`${j}-line`} className="text-[14px] font-bold leading-[1.5]">
                      <strong className={card.leadStrong ? 'font-bold' : 'font-semibold'}>
                        {withBreaks(line)}
                      </strong>
                    </div>
                  ))}
                  {card.note && (
                    /* ref .df-text-3 — it opens with its own `<br>`, which is a real blank
                       line of card height */
                    <div className="text-[14px] leading-[1.5]">
                      {card.noteBreak && <br />}
                      {withBreaks(card.note)}
                    </div>
                  )}
                </div>

                {card.image && (
                  /* ref img.image-8 */
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={card.image.src}
                    width={card.image.width}
                    height={card.image.height}
                    alt={card.image.alt}
                    loading="lazy"
                    decoding="async"
                    /* ref .image-8 — `position: absolute; inset: 22px -16px auto auto`, so
                       it paints outside the card's right edge and takes no flow height */
                    className="absolute right-[-16px] top-[22px] max-w-full flex-none align-middle"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
