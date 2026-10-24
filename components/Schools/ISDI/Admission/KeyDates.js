import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, H2, H2_MB, SECTION } from '../Home/ui';

/**
 * "Key Dates & Deadlines" — `.dates-fees-container-atlas > .df-container-atlas >
 * .table-responsive > table.table.table-bordered`, with a `.buttons-wrapper` under it.
 *
 * The ATLAS Admissions pages' `components/Admissions/KeyDates` renders the same Bootstrap
 * table, but it also models tabbed panes, stacked blocks, date strips and a "Closed" state,
 * and it is keyed on that page's own `.df-container-atlas` frame. Here there is one table and
 * no tabs, so this is the table alone.
 *
 * **Most of this table's design is in the page's own inline `<style>`, not in `$css`** — the
 * same block `keydates-static/law.php` ships on /admissions/integrated-admissions. Reading
 * only the Webflow sheet and Bootstrap gets the border model, the padding and the wrapping
 * wrong. It declares, unconditionally:
 *
 *   .table-responsive            block, 100%, `overflow-x: auto`, radius `32px 0`
 *   .table-responsive > .table-bordered   border: 2px solid rgba(0,0,0,.15)
 *   .table-bordered td           border: 1px solid #dee2e6
 *   .table td                    padding: .75rem; vertical-align: middle;
 *                                white-space: nowrap; overflow: hidden; text-overflow: ellipsis
 *
 * and inside `@media (max-width: 1100px)` — the project's `max-tbl`, NOT a Webflow
 * breakpoint, and not 767:
 *
 *   .br                          display: block        (the two-line left cells)
 *   .header-table                font-size: 16px
 *   .table                       min-width: 900px      (`width: auto` loses to the inline
 *                                                       `width: 100.229%`)
 *   .table td                    white-space: normal; min-width: 150px
 *   .table                       border-collapse: separate !important;
 *                                border-spacing: 0 !important
 *
 * That last pair is what makes every row 1px taller below 1100: under `collapse` two
 * touching cells share one border, under `separate` each draws its own.
 *
 * The table carries inline `border-collapse: collapse; width: 100.229%; height: 461px`.
 * Only the collapse is overridden (by `!important`), so the width and the height both stand
 * at every width — and the height is a MINIMUM that really applies above 1100, where the
 * rows are single-line and sum to less than 461.
 *
 * Measured at 1920 / 1440 / 1280 / 1100 / 992 / 900 / 768 / 700 / 568 / 479 / 390 / 360:
 *                     >1100px                              <=1100px
 *   frame             `.table-responsive` radius `32px 0`, `overflow-x: auto`, and it holds
 *                     the button row and the include's two `<br>`s as well as the table
 *   table             100.229% x min 461, 2px rgba(0,0,0,.15),
 *                     Bootstrap's `margin-bottom: 1rem`, #212529
 *                     collapsed borders                    separate, spacing 0, min 900
 *   header row        `.header-table` #d20158, 24px/1.5     16px
 *                     white, p 20/14; its `<strong>` is a
 *                     flat 700 (Preflight's relative
 *                     `bolder` would make it 900 inside a
 *                     700 parent). Its `<td>` is authored
 *                     `padding: 0` inline — without it the
 *                     UA's `td { padding: 1px }` stands
 *   cell              p12, 1px #dee2e6 all round, middle,
 *                     nowrap + ellipsis                     wrap, min-width 150
 *   row               an inline `height` — 33px on most rows (below their content height, so
 *                     inert) and 64px on the two that carry a `<sup>` ordinal
 *   button row        centred, pt30
 *
 * Reference note: the "Learn More" button's href repeats the site path —
 * `…/schools/isdi/schools/isdi/admissions/undergraduate/b-des`. Production answers 200 on it,
 * but with the ATLAS **homepage**, not this page — a catch-all soft-404 (verified: the body is
 * the homepage's apart from its echoed canonical, and holds no "Key Dates"). So the button
 * upstream promises B.Des admissions and delivers the homepage. The doubled prefix is an
 * authoring slip — an absolute URL typed into a field the template already prefixes with
 * `$domain` — and the authored intent is this page, which is what the port links to. The
 * destination is recorded in `lib/.../key-dates.js` beside the href.
 *
 * Reference note, not reproduced because it paints nothing: at <=1100 the include also gives
 * `tr:nth-child(2) td:first-child` and `tr:nth-child(3) td:first-child`
 * `background-color: white; font-weight: bold`. Both cells are already white, and their text
 * is inside a `<b>`, so neither declaration changes a pixel.
 */
/* ref the include's trailing <script>, resolved at build time: grey for "Closed", green for
   "Applications Open" and for any `<day><suffix> <Month> <year>` */
const TONE = { green: 'text-[green]', grey: 'text-[grey]' };

/* a cell's inline content — plain text, and the `<sup>` ordinal markers ("11<sup>th</sup>") */
function Runs({ runs }) {
  return runs.map((run, i) =>
    typeof run === 'string' ? (
      <span key={`${i}-t`}>{withBreaks(run)}</span>
    ) : run.br ? (
      /* `<br class="br">` — the include's own `<style>` hides it above 1100 and shows it
         below, which is what makes those rows two lines tall once the table is at its
         900px scrolling width */
      <br key={`${i}-b`} className="hidden max-tbl:block" />
    ) : run.bold ? (
      /* `showDateCon()`'s literal `<b>Closed</b>`. Its parent is already 700 and
         Preflight's `b { font-weight: bolder }` is relative, so it would resolve to 900 —
         pinned to the flat 700 Webflow's normalize paints (measured on production). */
      <b key={`${i}-bo`} className="font-bold">
        {withBreaks(run.bold)}
      </b>
    ) : (
      /*
       * A bare `<sup>`. Webflow's normalize gives it `font-size: 75%; line-height: 0;
       * vertical-align: baseline; position: relative` — which is Preflight's rule exactly
       * (measured identical on both sides), so the ordinal must NOT be restyled. Restoring
       * the browser default with `align-super [line-height:normal]` raises the line box and
       * made every date row 1.41px tall.
       */
      <sup key={`${i}-s`}>{run.sup}</sup>
    )
  );
}

/*
 * A strip cell's value: the plain-string shorthand, or a run list.
 *
 * `showDateCon()` prints every ordinal inside a `<sup>` ("22<sup>nd</sup> Nov 2026") and a
 * null or past date as `<b>Closed</b>`, so a date is a run list. A flattened string is
 * ~4px wider at 18px/700, which is enough to wrap a cell one line early.
 */
function Value({ value }) {
  return Array.isArray(value) ? <Runs runs={value} /> : withBreaks(value);
}

/* a cell holds one or more `<b>` groups — "Applications Opened" is followed by a second,
   green one reading "(11th Sep 2026)", and the include's recolouring script tones each
   group on its own text */
function Groups({ cell }) {
  const groups = cell.groups ?? [{ runs: cell.runs, bold: cell.bold, tone: cell.tone }];
  return groups.map((g, i) =>
    g.bold ? (
      /* Preflight's `b { font-weight: bolder }` is relative, so it is pinned to the flat
         700 Webflow's normalize paints */
      <b key={`${i}-b`} className={cx('font-bold', TONE[g.tone])}>
        <Runs runs={g.runs} />
      </b>
    ) : (
      <Runs key={`${i}-r`} runs={g.runs} />
    )
  );
}

/*
 * ref `.table td` — the include's own rule, plus `.table-bordered td`'s 1px frame.
 * The PADDING is deliberately not in here: the header cell is authored `padding: 0` and
 * two padding utilities in one class list are resolved by stylesheet order, not by the
 * order they are written, so a `p-0` appended to a string holding `p-3` silently loses.
 */
const CELL =
  'border border-solid border-[#dee2e6] bg-white align-middle text-black ' +
  'overflow-hidden text-ellipsis whitespace-nowrap ' +
  'max-tbl:min-w-[150px] max-tbl:whitespace-normal';

/**
 * The second shape this block takes. The B.Des and B.Tech pages render a Bootstrap table
 * from `keydates/bdes*.php`; `keydates/mdes.php` renders a **date strip** instead —
 * `.dates-fees-container.isdi > .df-container-atlas > .df-card`s, the shape the ATLAS
 * Admissions pages use. Same block, same heading, different include.
 *
 * **The strip has a breakpoint of its own, and it is 768 INCLUSIVE.** `keydates/mdes.php`
 * ships its own `<style>` block, and that is the only place `.df-container-atlas` is
 * declared: it turns the row into a column at `@media (max-width: 768px)`, one pixel wider
 * than the `@media (max-width: 767px)` rules the Webflow sheet gives the cards inside it.
 * So at exactly 768 the container is already a column while every card still has its
 * desktop padding and width. Hence `max-768` in `tailwind.config.js` beside `max-md`
 * — reading the sheet alone and assuming 767 left the whole block 499px short at 768.
 *
 * Measured at 1920 / 1440 / 1280 / 1100 / 992 / 900 / 768 / 700 / 568 / 479 / 390 / 360:
 *                     >=769px                              <=768px        <=767px
 *   outer             flex, r16, clipped, pt0                             (pt32 at <=479)
 *     (`.dates-fees-container.isdi`)
 *   container         flex row, 1px #18429f, r32, clipped   column,
 *     (`.df-container-atlas`)                               overflow auto
 *   lead card         #342b7c, 268 wide, flex none,                        width auto (so
 *     (`.df-card.atlas-bg`)   relative                                     full), sticky
 *   card              `flex: 1` (basis 0%), p25,                           p 18/25
 *     (`.df-card`)    1px rgba(0,0,0,.1) LEFT border on every card, the lead included
 *                     (`border-right: 1px #0000001a` omits its style, so it paints
 *                     nothing — the trap `.port-card-m-posi-atlas` already records);
 *                     `align-items: flex-start`; `justify-content: space-around`,
 *                     replaced by `flex-start` from `@media (min-width: 1440px)`
 *   lead title        18px/27 700 white (`.df-text-2.atlas`)
 *   lead value        14px/21 400 white, pb12
 *   label             14px/21 400 #333, pb12 (`.df-text-2.f14`)
 *   value             18px/25.2 700 #333, mb4 (`.df-text-1.f18`)
 *
 * There is no button under this form — `keydates/mdes.php` authors none.
 */
/*
 * ref .df-card — shared by the lead and the date cards. `justify-around 2xl:justify-start`
 * is one string on purpose: two `justify-*` utilities in one class list are resolved by
 * stylesheet order, not by the order they are written, so the pair has to be written as the
 * base plus its min-width override (the call `components/Admissions/FeeStructure` already
 * makes for the same class).
 */
const DF_CARD =
  'flex flex-1 flex-col items-start justify-around p-[25px] 2xl:justify-start ' +
  'border-l border-solid border-black/10 max-md:py-[18px]';
function Strip({ strip, bare = false }) {
  return (
    /*
     * ref .dates-fees-container.isdi — the wrapper is what clips the strip's 32px corners
     * to 16 and what adds 32px of top padding at <=479.
     *
     * The MBA Admissions page's SECOND strip (`keydates/mba.php`) is authored without it,
     * directly in `.main-wrapper`, so it is full-bleed and keeps its own 32px radius.
     * `bare` drops the wrapper rather than restyling it.
     */
    <div className={bare ? 'flex' : 'flex overflow-hidden rounded-2xl max-sm:pt-8'}>
      {/* ref .df-container-atlas — the include's own `<style>`, column at <=768 */}
      <div className="flex w-full overflow-hidden rounded-[32px] border border-solid border-[#18429f] max-768:flex-col max-768:overflow-auto">
        {/* ref .df-card.atlas-bg — `flex: none; width: 268px` until the <=767 rule makes it
            `width: auto`, which stretches to the column's full width */}
        <div
          className={cx(
            DF_CARD,
            'relative w-[268px] flex-none bg-[#342b7c] text-white max-md:sticky max-md:left-0 max-md:w-auto'
          )}
        >
          {/* ref .df-text-2.atlas */}
          <div className="text-[18px] font-bold leading-[1.5]">{withBreaks(strip.lead.title)}</div>
          {/* ref .df-txt-wrap */}
          <div>
            {/* ref .df-text-2.f14 */}
            <div className="pb-3 text-[14px] leading-[1.5]">
              <Value value={strip.lead.value} />
            </div>
          </div>
          {strip.lead.image && (
            /* ref img.image-8 — `inset: 22px -16px auto auto`, so it paints outside the
               card's right edge and takes no flow height */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={strip.lead.image.src}
              width={strip.lead.image.width}
              height={strip.lead.image.height}
              alt={strip.lead.image.alt}
              loading="lazy"
              decoding="async"
              /* ref .image-8 — `position: absolute; inset: 22px -16px auto auto`, so it
                 paints outside the card's right edge and takes no flow height, and
                 `display: none` from `@media (max-width: 767px)` */
              className="absolute right-[-16px] top-[22px] max-w-full flex-none align-middle max-md:hidden"
            />
          )}
        </div>

        {strip.cards.map((card, i) => (
          /* ref .df-card */
          <div key={`${i}-${card.label}`} className={DF_CARD}>
            {/* ref .df-text-2.f14 */}
            <div className="pb-3 text-[14px] leading-[1.5]">{withBreaks(card.label)}</div>
            {/* ref .df-text-1.f18 — 18px on a 1.4 ratio, not the project's 1.5 */}
            <div className="mb-1 text-[18px] font-bold leading-[1.4]">
              <Value value={card.value} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KeyDates({ data, block = 'key-dates' }) {
  /*
   * The third form, and the only block on any Admissions page that is not a section.
   * `keydates/mba.php` is included directly in `.main-wrapper` on
   * /schools/isdi/admissions/postgraduate/mba — no `<section>`, no `.container`, no
   * heading and no id — so the strip is full-bleed and carries only the block marker.
   */
  if (data.bare) {
    return (
      <div data-block={block}>
        <Strip strip={data.strip} bare />
      </div>
    );
  }

  if (data.strip) {
    return (
      <section data-block={block} id="key-dates" className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={cx(H2, H2_MB.base)}>{data.heading}</h2>
          <Strip strip={data.strip} />
        </div>
      </section>
    );
  }

  return (
    <section data-block="key-dates" id="key-dates" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.base)}>{data.heading}</h2>

        {/* ref .dates-fees-container-atlas > .df-container-atlas */}
        <div>
          <div>
            {/* ref .table-responsive — `display: block; width: 100%; overflow-x: auto` and
                the `32px 0` radius, at EVERY width (the <=1100 rule only re-states the
                overflow and adds `position: relative`) */}
            <div className="relative block w-full overflow-x-auto rounded-[32px_0]">
              <table
                /*
                 * ref the table's own inline style. `border-collapse` is left to the
                 * classes because the include overrides it with `!important` below 1100;
                 * the width and the height are not overridden anywhere, and the height is
                 * a floor that really binds above 1100.
                 */
                style={{ width: '100.229%', height: '461px' }}
                className={cx(
                  'mb-4 border-2 border-solid border-black/15 text-[#212529]',
                  /* ref the inline `border-collapse: collapse`, replaced by
                     `separate !important` with zero spacing at <=1100 */
                  'border-collapse max-tbl:border-separate max-tbl:border-spacing-0',
                  /* ref `.table { min-width: 900px }` at <=1100 — its `width: auto`
                     companion loses to the inline width, so only the floor applies */
                  'max-tbl:min-w-[900px]'
                )}
              >
                <tbody>
                  {data.rows.map((row, i) => (
                    /* the reference authors an inline `height` on every row; it is a MINIMUM,
                       and it is what makes the two rows carrying an ordinal 65px rather than
                       50 — nothing in their content does */
                    <tr key={`${i}-row`} style={row.height ? { height: row.height } : undefined}>
                      {row.cells.map((cell, j) =>
                        cell.header ? (
                          /* ref td — authored `padding: 0` inline, which beats the
                             include's `.table td { padding: .75rem }` and the UA's own
                             `td { padding: 1px }` */
                          <td
                            key={`${j}-cell`}
                            colSpan={cell.colspan ?? undefined}
                            className={cx(CELL, 'p-0 text-center')}
                          >
                            {/* `.header-table` drops to 16px at `max-width: 1100px` — the
                                project's `max-tbl` breakpoint, not a Webflow one */}
                            <div className="bg-atlas-cta px-3.5 py-5 text-center text-[24px] leading-[1.5] text-white max-tbl:text-base">
                              <strong className="font-bold">{cell.text}</strong>
                            </div>
                          </td>
                        ) : (
                          <td
                            key={`${j}-cell`}
                            colSpan={cell.colspan ?? undefined}
                            className={cx(
                              CELL,
                              /* ref `.table td { padding: .75rem }` */
                              'p-3',
                              cell.align === 'center' && 'text-center',
                              cell.align === 'left' && 'text-left'
                            )}
                          >
                            <Groups cell={cell} />
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              {data.buttons?.length > 0 && (
                /*
                 * ref .buttons-wrapper — inside `.table-responsive`, not beside it. It
                 * declares no `justify-content`, so the row is LEFT-aligned, and its top
                 * padding steps 30 -> 24 (767) -> 14 (479) while the gap steps 16 -> 8 (991).
                 */
                <div className="flex items-center gap-4 pt-[30px] max-lg:gap-2 max-md:flex-col max-md:items-start max-md:justify-start max-md:pt-6 max-sm:gap-2 max-sm:pt-[14px]">
                  {data.buttons.map((button) => (
                    <PrimaryButton key={button.label} href={button.href} variant={button.variant ?? 'pink'}>
                      {button.label}
                    </PrimaryButton>
                  ))}
                </div>
              )}
              {/*
                ref the include's own `<br><br>` after the button row — 48px of real
                height. `keydates/bdes.php` authors them; `keydates/bdes-btech.php` does
                not (verified on production: 2 `<br>` after the button on B.Des, 0 on
                B.Tech), which is exactly 48px of block height. The flag defaults to
                rendering them so the B.Des page's data needs no change.
              */}
              {data.trailingBreaks !== false && (
                <>
                  <br />
                  <br />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
