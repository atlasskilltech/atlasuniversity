import PrimaryButton from '@/components/ui/PrimaryButton';
import ButtonRegular from '@/components/ui/ButtonRegular';
import BrochureModal from '@/components/Programs/BrochureModal';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * `.program-list-wrapper` — port of
 * `programs-list-integrated.php:76-173`
 * (`div.section > .container > .program-list-wrapper > 2 x .program-list >
 *   (.list-title-wrap > (h3.h3-tag-bold.black.mrgbm0, .btn-flex > 3 buttons),
 *    .dates-fees-container-atlas > .df-container-atlas > 4 x .df-card)`).
 *
 * One block per programme: its name, a row of three buttons, and an
 * "Eligibility Criteria" strip.
 *
 * The strip's rows normally sit on the section, because most pages repeat one
 * strip verbatim under every entry. `/programs/ug/programs-list-design-ai-and-
 * technology` is the exception — its B.Tech entry adds a maths-and-physics
 * requirement its BBA entry does not — so an entry may carry its own
 * `eligibilityRows` and override the section's.
 *
 * ── Why the strip is here and not in `Admissions/KeyDates` ────────────────
 * It is the same `.dates-fees-container-atlas > .df-container-atlas > .df-card`
 * chassis, and the same measured values — but what it carries is different
 * enough that sharing would mean contorting both. `KeyDates` models an
 * admissions calendar: its lead cell pairs a programme name with a start date,
 * every other cell holds a `showDateCon()` value that may be the literal
 * "Closed", a tab may stack several strips or a static table, and the container
 * may be borderless. Here the lead cell is a bare label with no value, the
 * cells hold prose, and two of them carry `.df-card.top`. Kept separate on
 * purpose; the shared parts are the class strings, which are short.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                    <=767px
 *   .program-list-wrapper    flex column, gap 64
 *   .list-title-wrap         flex, gap 0, start/start,  **display: block**
 *                            margin-bottom 32
 *   h3.h3-tag-bold.black     32px/600, 1.2, #2b2b2b,    22px
 *     .mrgbm0                margin-bottom 0
 *   .btn-flex                flex, gap 16, start/start, flex 0 auto,
 *                            **margin-left: auto**      padding-top 24,
 *                                                       overflow auto
 *                                                       (<=479 also -21px
 *                                                        margins + 20px
 *                                                        padding either side)
 *   .df-container-atlas      border 1px #18429f, radius 32px 0, flex row,
 *                            clipped                    column, overflow auto
 *   .df-card                 flex 1, column, padding 25 padding 18px 25px
 *     .atlas-bg              #342b7c, white, w268,      width auto,
 *                            flex none, relative        sticky left 0
 *     .top                   justify-content: flex-start
 *   .df-text-2.atlas         18px/700
 *   .df-text-2.f14           14px, padding-bottom 12
 *   .df-text-1.f18           18px/700, 1.4, margin-bottom 4
 *   .image-8                 absolute, top 22, right -16   display: none
 *
 * `.btn-flex`'s `margin-left: auto` is what pushes the buttons to the right of
 * the heading; below 768 the wrap turns into a block, so the row simply falls
 * under the title.
 */

/* ref .df-container-atlas */
const DF_CONTAINER =
  'flex w-full overflow-hidden rounded-tl-[32px] rounded-br-[32px] border border-solid '
  + 'border-[#18429f] max-md:relative max-md:flex-col max-md:overflow-auto';

/* ref .df-card — the declared `border-right` has no border-style, so it paints
   nothing and is not reproduced */
const DF_CARD =
  'flex flex-1 flex-col items-start border-l border-solid border-l-black/10 '
  + 'p-[25px] max-md:py-[18px]';

/*
 * `.df-card` is `justify-content: space-around`, replaced by `flex-start` from
 * `@media (min-width: 1440px)` — except on a `.df-card.top`, which is
 * `flex-start` at every width. Kept out of DF_CARD because two justify
 * utilities in one class list are resolved by stylesheet order, not by the
 * order they are written.
 */
const DF_JUSTIFY = {
  default: 'justify-around 2xl:justify-start',
  top: 'justify-start',
};

/* ref .btn-flex */
const BTN_FLEX =
  'ml-auto flex items-start justify-start gap-4 max-md:ml-0 max-md:flex-none '
  + 'max-md:overflow-auto max-md:pt-6 max-sm:-mx-[21px] max-sm:px-5';

export default function ProgramList({ data }) {
  return (
    /* ref div.section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .program-list-wrapper */}
        <div className="flex flex-col gap-16">
          {data.entries.map((entry, i) => (
            /* ref .program-list */
            <div key={`${i}-${entry.title}`}>
              {/* ref .list-title-wrap */}
              <div className="mb-8 flex items-start justify-start gap-0 max-md:block">
                {/* ref h3.h3-tag-bold.black.mrgbm0 */}
                {/* the title may carry the reference's own `<br>` as a
                    newline — /programs/ug/programs-list-management-and-
                    entrepreneurship breaks one of its four, and the two pages
                    that came before it break none, so this is a no-op there */}
                <h3 className="m-0 w-auto flex-[0_auto] text-[32px] font-semibold leading-[1.2] text-[#2b2b2b] max-md:text-[22px]">
                  {withBreaks(entry.title)}
                </h3>

                {/* ref .btn-flex */}
                <div className={BTN_FLEX}>
                  {/*
                    ref a.btn-primary[data-id] — "Download Brochure" opens a
                    modal rather than following its `href="#"`.

                    /programs/programs-list-integrated gives each entry its own
                    popup (two `data-id`s, two overlays, two providers);
                    /programs/ug/ug-design-and-innovation points all seven
                    buttons at one shared `[data-id="download-brochure"]`
                    overlay. Both read the same way here.
                  */}
                  <BrochureModal brochure={entry.brochure ?? data.brochure} />

                  {/* ref a.btn-primary — "Explore Program" */}
                  <PrimaryButton href={entry.explore.href} variant="outline-medium">
                    {entry.explore.label}
                  </PrimaryButton>

                  {/* ref a.button-regular — "Apply Now" */}
                  <ButtonRegular href={entry.apply.href} variant="altas-med">
                    {entry.apply.label}
                  </ButtonRegular>
                </div>
              </div>

              {/* ref .dates-fees-container-atlas */}
              <div className="flex rounded-tl-[32px] rounded-br-[32px]">
                <div className={DF_CONTAINER}>
                  {/* ref .df-card.atlas-bg — the lead cell is a bare label
                      here, with no value under it */}
                  <div
                    className={cx(
                      DF_CARD,
                      DF_JUSTIFY.default,
                      'relative w-[268px] flex-none bg-[#342b7c] text-white',
                      'max-md:sticky max-md:left-0 max-md:w-auto',
                    )}
                  >
                    {/* ref .df-txt-wrap > .df-text-2.atlas */}
                    <div>
                      <div className="text-lg font-bold">{entry.eligibility.label}</div>
                    </div>

                    {/* ref img.image-8 — the polygon notch */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={entry.eligibility.arrow.src}
                      alt={entry.eligibility.arrow.alt}
                      loading="lazy"
                      className="absolute -right-4 top-[22px] flex-none max-md:hidden"
                    />
                  </div>

                  {(entry.eligibilityRows ?? data.eligibilityRows).map((row, j) => (
                    /* ref .df-card (+ .top) */
                    <div
                      key={`${j}-${row.label}`}
                      className={cx(DF_CARD, DF_JUSTIFY[row.top ? 'top' : 'default'])}
                    >
                      {/* ref .df-text-2.f14 */}
                      <div className="pb-3 text-sm">{row.label}</div>

                      {/*
                        ref .df-text-1.f18. A cell may hold more than one:
                        /programs/ug/programs-list-commerce-finance-and-economics
                        adds a mathematics requirement under every entry
                        criterion. `value` is the single-line shorthand the
                        three pages before it use.
                      */}
                      {(row.values ?? [row.value]).map((value, k) => (
                        <div key={`${k}-${value}`} className="mb-1 text-lg font-bold leading-[1.4]">
                          {withBreaks(value)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
