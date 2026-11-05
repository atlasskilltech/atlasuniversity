import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, SECTION, SUB_INNER } from '@/components/Home/SectionHead';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';

/**
 * ISME Admissions "Fee Structure" — `section#fee-(structure|bsc|mba) > .container > (h2.h2-tag.mrg16,
 * .sub-heading.mrgbtm32, .dates-fees-container > .df-container > (.df-card.blue-lg, N x .df-card))`.
 *
 * The ISDI fee strip (`ISDI/Admission/FeeStructure`) is a different card set on a different sheet —
 * a 148px pink lead, rounded frame, every value bold — so the ISME one is drawn here.
 *
 * Rules, from the page's sheet (measured at 1440 / 390):
 *   .df-container        1px #18429f frame, flex; scrolls (relative, overflow auto) at <=767 and
 *                        becomes a column at <=479
 *   .df-card             `flex: 1` (basis 0%), column, p25 (py18 at <=767), 1px rgba(0,0,0,.1) LEFT
 *                        border (the right one omits its style, so it paints nothing);
 *                        `justify-content: space-around`, `flex-start` from 1440
 *   .df-card.blue-lg     #18429f white, flex none, 268 wide, relative; 168 and sticky at left 0 at
 *                        <=767; full width at <=479
 *     .df-text-2.bld     16px/24 600; `.padtp` adds pt8
 *     .df-text-3         14px/21 — it opens with an authored `<br>` on some pages (a real blank line)
 *     img.image-8        absolute at 22 / -16 (outside the card's right edge), hidden at <=767
 *   .df-card .df-text-2  16px/24 400 #333; `.df-text-1` 14px/21 700
 */
function Runs({ runs }) {
  if (runs == null) return null;
  if (typeof runs === 'string') return withBreaks(runs);
  return runs.map((r, i) =>
    typeof r === 'string' ? (
      <span key={i}>{withBreaks(r)}</span>
    ) : r.sup ? (
      <sup key={i}>{r.sup}</sup>
    ) : r.br ? (
      <br key={i} />
    ) : null
  );
}

/* the flex shorthand is per card (`flex-1 basis-0` vs the lead's `flex-none`): two flex utilities in
   one class list are resolved by stylesheet order, not by the order they are written */
const CARD =
  'flex flex-col items-start justify-around border-0 border-l border-solid border-black/10 p-[25px] 2xl:justify-start max-md:py-[18px]';

export default function Fees({ data }) {
  return (
    <section data-block="fee-structure" id={data.id ?? undefined} className={SECTION}>
      <div className={CONTAINER}>
        {data.button ? (
          /* Scholarships: `.head-wrap.mrgbtm` — the heading (`.mrgtbm0`) beside a mint `.button-regular` */
          <HeadWrap heading={data.heading} button={data.button} align="base" margin="mrgbtm" headingMb="mb-0" />
        ) : (
          <h2 className={cx(H2, 'mb-4 max-md:mb-2')}>{data.heading}</h2>
        )}
        {data.sub && <div className={cx(SUB_INNER, 'pb-8 font-normal max-md:pb-5 max-sm:pb-4')}>{withBreaks(data.sub)}</div>}
        {/* ref .dates-fees-container */}
        <div className="flex pt-0">
          {/* ref .df-container */}
          <div className="flex h-auto w-full border border-solid border-[#18429f] max-md:relative max-md:overflow-auto max-sm:flex-col">
            {data.cards.map((card, i) =>
              card.lead ? (
                /* ref .df-card.blue-lg */
                <div
                  key={i}
                  className={cx(
                    CARD,
                    'relative w-[268px] flex-none bg-[#18429f] text-white max-md:sticky max-md:left-0 max-md:w-[168px] max-sm:w-full'
                  )}
                >
                  {/* ref .df-txt-wrap */}
                  <div>
                    <div className="font-semibold">
                      <Runs runs={card.title} />
                    </div>
                    {card.value && (
                      <div className="pt-2 font-semibold">
                        <Runs runs={card.value} />
                      </div>
                    )}
                  </div>
                  {card.note && (
                    /* ref .df-text-3 */
                    <div className="text-[14px] leading-[1.5]">
                      <Runs runs={card.note} />
                    </div>
                  )}
                  {card.image && (
                    /* ref img.image-8 */
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={card.image.src}
                      alt={card.image.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute right-[-16px] top-[22px] max-w-full flex-none align-middle max-md:hidden"
                    />
                  )}
                </div>
              ) : card.blue ? (
                /* ref .df-card.blue (Scholarships) — a declared 148px, flex none, #18429f, the label 600 white (so
                   "Current Cycle" wraps); sticky at <=767, full width at <=479 */
                <div key={i} className={cx(CARD, 'relative w-[148px] flex-none bg-[#18429f] text-white max-md:sticky max-md:left-0 max-sm:w-full')}>
                  <div className="font-semibold">
                    <Runs runs={card.label} />
                  </div>
                  {card.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={card.image.src} alt={card.image.alt || ''} loading="lazy" decoding="async" className="absolute right-[-16px] top-[22px] max-w-full flex-none align-middle max-md:hidden" />
                  )}
                </div>
              ) : (
                /* ref .df-card */
                <div key={i} className={cx(CARD, 'flex-1 basis-0')}>
                  <div className="font-normal text-[#333]">
                    <Runs runs={card.label} />
                  </div>
                  <div className="text-[14px] font-bold leading-[1.5] text-[#333]">
                    <Runs runs={card.value} />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
