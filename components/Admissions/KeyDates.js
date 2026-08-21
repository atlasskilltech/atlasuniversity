'use client';

import { useState } from 'react';
import { keyDates } from '@/lib/integratedAdmissionsContent';
import { cx } from '@/lib/cx';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { PillTabStrip } from '@/components/ui/PillTabs';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Key Dates & Deadlines" — port of `integrated-admissions.php:161-309`
 * (`section.section > .container > (h2.h2-tag, .rounded-tabs-mint >
 *   (.tabs-menu-mint.less-space, .tab-content-mint.atlas > 2 x .w-tab-pane))`).
 *
 * Two tabs over the same `.rounded-tabs-mint` widget the homepage testimonials
 * use, so the strip is the shared `PillTabStrip`. The panes are different
 * shapes: uGDX shows a six-cell date strip built from the database, ATLAS
 * School of Law a hand-authored HTML table.
 *
 * **The Law tab is the one that opens.** `data-current="Tab 5"` and the second
 * link carries `w--current`, so `initialTab` is 1, not 0.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                    <=767px
 *   h2.h2-tag (no modifier)    44px/500, margin-bottom 56  36px, mb 32
 *   .tab-content-mint.atlas    padding-top 42             padding-top 20
 *   .df-container-atlas        border 1px #18429f,        flex column,
 *                              radius 32px 0, flex row,   overflow auto
 *                              clipped
 *   .df-card                   flex 1, column, padding    padding 18px 25px
 *                              25, align-start
 *   .df-card.atlas-bg          #342b7c, white, flex none, width auto,
 *                              width 268                  sticky left 0
 *   .df-text-2.atlas           18px/700
 *   .df-text-2.f14             14px, padding-bottom 12
 *   .df-text-1.f18             18px/700, line-height 1.4, margin-bottom 4
 *   .image-8 (the arrow)       absolute, top 22, right    display: none
 *                              -16
 *   .buttons-wrapper           row, padding-top 30        column, pt 24
 *                                                         (14 at <=479)
 *
 * `.df-card` is `justify-content: space-around` in the stylesheet and
 * `flex-start` from `@media (min-width: 1440px)`, but `keydates/btech.php`
 * ships its own `<style>` block setting `space-between`, and that block sits
 * after the stylesheet in the document, so `space-between` is what every width
 * computes. Measured, not inferred.
 *
 * ── Deviation: the reference nests `.df-container-atlas` inside itself ─────
 * `integrated-admissions.php:181` opens a `.df-container-atlas` and then
 * includes `keydates/btech.php`, whose first element is *another*
 * `.df-container-atlas`. Both carry `border: 1px solid #18429f` and the
 * `32px 0` radius, so the reference paints two concentric borders 1px apart
 * and loses 2px of inner width (measured 1242 outer, 1240 inner). The Law tab
 * has one wrapper. This renders one wrapper per tab, which is what the markup
 * intends and what the Law tab already does.
 *
 * ── The Law table ─────────────────────────────────────────────────────────
 * `keydates/keydates-static/law.php` is static HTML with its own `<style>`,
 * embedded twice — once by the page at `integrated-admissions.php:196` and once
 * by the include itself, byte-identical. The header cell's `#d20158` is
 * overridden by an inline `background-color: #CC5500` on the element.
 *
 * `<br class="br">` is `display: none` above 1100px and `display: block` at or
 * below, which is the include's own breakpoint and the reason the project's
 * `max-tbl` screen exists. Below 1100 the table also goes `min-width: 900px` inside
 * an `overflow-x: auto` frame, cells unset `white-space: nowrap`, take a 150px
 * floor, and the first cell of rows 2 and 3 turns bold.
 *
 * The include's trailing `<script>` recolours any `td b` whose text matches
 * `<day><suffix> <Month> <year>` green. That is deterministic over static copy,
 * so the one cell it hits carries the colour in the markup rather than shipping
 * a DOM-walking effect.
 */

/* ref .df-container-atlas */
const DF_CONTAINER =
  'flex w-full overflow-hidden rounded-tl-[32px] rounded-br-[32px] border border-solid '
  + 'border-[#18429f] max-md:relative max-md:flex-col max-md:overflow-auto';

/*
 * ref .df-card — the border-right the stylesheet declares has no border-style,
 * so it paints nothing and is not reproduced.
 *
 * The stylesheet gives it `justify-content: space-around`, replaced by
 * `flex-start` from `@media (min-width: 1440px)`. `keydates/btech.php` — and
 * only that one include — ships its own `<style>` setting `space-between`,
 * which sits after the stylesheet in the document and therefore wins at every
 * width. So /admissions/integrated-admissions is `space-between` throughout and
 * /admissions/pg-admissions follows the stylesheet.
 */
const DF_CARD =
  'flex flex-1 flex-col items-start border-l border-solid border-l-black/10 '
  + 'p-[25px] max-md:py-[18px]';

const DF_JUSTIFY = {
  /* the stylesheet's own cascade */
  default: 'justify-around 2xl:justify-start',
  /* keydates/btech.php's inline override */
  between: 'justify-between',
};

/*
 * ref .buttons-wrapper. /admissions/ug-admissions re-declares the class in its
 * own `<style>` block, and that reaches every wrapper on the page — these
 * included: the gap stays 16 at all widths and the alignment and padding turn
 * at 576 rather than 767/479. Same two shapes `InnerPageHero` carries.
 */
const BUTTONS = {
  default:
    'flex items-center gap-4 pt-[30px] max-lg:gap-2 max-md:flex-col max-md:items-start '
    + 'max-md:justify-start max-md:pt-6 max-sm:pt-[14px]',
  '576':
    'flex items-center gap-4 pt-[30px] max-md:flex-col max-md:justify-start '
    + 'max-576:items-start max-576:pt-6',
};

/*
 * ref .df-text-2.f14 / .df-text-1.f18 — one `showDateCon()` return value. The
 * function formats a live date as `<day><sup><suffix></sup> <month> <year>` and
 * returns the literal `<b>Closed</b>` for a null or past one.
 *
 * The `<b>` needs an explicit `font-bold`: `.df-text-1` is already `font-weight:
 * 700`, and Preflight declares `b { font-weight: bolder }`, which the spec
 * resolves against the parent — 700 becomes 900. Webflow's normalize declares a
 * flat `bold`, so 700 is what the reference paints.
 */
function DateValue({ value, className }) {
  return (
    <div className={className}>
      {value.closed ? (
        <b className="font-bold">Closed</b>
      ) : (
        <>
          {value.day}
          <sup>{value.suffix}</sup> {value.rest}
        </>
      )}
    </div>
  );
}

/*
 * ref .dates-fees-container-atlas > .df-container-atlas > six `.df-card`s.
 *
 * A tab can hold more than one: /admissions/pg-admissions' ISDI pane stacks the
 * M.Des strip and the MBA DMST strip, each with its own button, and marks the
 * second `.mrgtp` — `padding-top: 56px; display: block`, which is what
 * `block.spaced` selects.
 */
function DateStrip({ block }) {
  const tab = block;
  const JUSTIFY = DF_JUSTIFY[block.justify ?? 'default'];
  return (
    /* ref .dates-fees-container-atlas (+ .mrgtp) */
    <div className={cx(block.spaced ? 'block pt-14' : 'flex', 'rounded-tl-[32px] rounded-br-[32px]')}>
      <div className={DF_CONTAINER}>
        {/* ref .df-card.atlas-bg */}
        <div className={cx(DF_CARD, JUSTIFY, 'relative w-[268px] flex-none bg-[#342b7c] text-white max-md:sticky max-md:left-0 max-md:w-auto')}>
          {/* ref .df-text-2.atlas */}
          <div className="text-lg font-bold">
            {tab.lead.title.map((line, i) => (
              <span key={`${i}-${line}`}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </div>

          {/* ref .df-txt-wrap > .df-text-2.f14 — `.f14` carries
              `padding-bottom: 12px` here exactly as it does on the other five
              cards */}
          <div>
            <DateValue value={tab.lead.value} className="pb-3 text-sm" />
          </div>

          {/* ref img.image-8 — the polygon notch pointing into the next cell */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tab.lead.arrow.src}
            alt={tab.lead.arrow.alt}
            loading="lazy"
            className="absolute -right-4 top-[22px] flex-none max-md:hidden"
          />
        </div>

        {tab.cards.map((card, i) => (
          /* ref .df-card */
          <div key={`${i}-${card.label.join(' ')}`} className={cx(DF_CARD, JUSTIFY)}>
            {/* ref .df-text-2.f14 */}
            <div className="pb-3 text-sm">
              {card.label.map((line, j) => (
                <span key={`${j}-${line}`}>
                  {j > 0 && <br />}
                  {line}
                </span>
              ))}
            </div>
            {/* ref .df-text-1.f18 */}
            <DateValue value={card.value} className="mb-1 text-lg font-bold leading-[1.4]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/*
 * ref one `<b>` inside a `.table` cell. The value is either a literal word
 * ("Closed", "Applications Open") or a `<day><sup><suffix></sup> <month>
 * <year>` date, and the include's trailing `<script>` recolours it green when
 * it reads "Open", "Applications Open" or a full date. Deterministic over
 * static copy, so the colour travels in the data rather than as a DOM walk.
 */
function CellValue({ value }) {
  return (
    <b className={cx('font-bold', value.green && 'text-[green]')}>
      {value.text ?? (
        <>
          {value.day}
          <sup>{value.suffix}</sup> {value.rest}
        </>
      )}
    </b>
  );
}

/*
 * ref .table.table-bordered from the `keydates/keydates-static/*` includes.
 *
 * /admissions/ug-admissions authors `style="border: none"` on the enclosing
 * `.df-container-atlas` for all four of its tables, so the indigo frame is
 * dropped there; /admissions/integrated-admissions authors no such style and
 * keeps it. That is `block.borderless`.
 */
function KeyDatesTable({ block }) {
  const { table } = block;
  /*
   * ref .table td, .table th, plus Bootstrap 5.3's own
   * `.table > :not(caption) > * > *`, which paints every cell
   * `--bs-table-color` (#000) on `--bs-table-bg` (#fff) — the reference loads
   * the CDN bundle in header.php, so those are part of what it renders.
   */
  const cell =
    'border border-solid border-[#dee2e6] overflow-hidden text-ellipsis whitespace-nowrap '
    + 'bg-white align-middle text-black max-tbl:min-w-[150px] max-tbl:whitespace-normal';
  /* `.table td` is `padding: .75rem`; the caption cell zeroes it inline. Kept
     out of `cell` because two padding utilities in one class list are resolved
     by stylesheet order, not by the order they are written. */
  const cellPad = 'p-3';

  return (
    /* ref .dates-fees-container-atlas (+ .mrgtp) > .df-container-atlas */
    <div className={cx(block.spaced ? 'block pt-14' : 'flex', 'rounded-tl-[32px] rounded-br-[32px]')}>
      <div className={cx(DF_CONTAINER, block.borderless && 'border-none')}>
        {/* ref .table-responsive */}
        <div className="block w-full overflow-x-auto [-webkit-overflow-scrolling:touch] max-tbl:relative">
          {/*
            ref table.table.table-bordered, authored inline as
            `border-collapse: collapse; width: 100.229%; margin: 0`.

            Below 1100px the include declares `width: auto; min-width: 900px;
            border-collapse: separate !important; border-spacing: 0 !important`
            — and only the last two carry `!important`, so **the inline width
            keeps winning** and the table stays 100.229% of its parent at every
            width. Verified at 1101/1100/1099: the reference measures 975/974/973,
            never the 900px floor. Reproduced by leaving the width inline, which
            is exactly the specificity the reference has.
          */}
          {/* `margin` is authored inline on /admissions/integrated-admissions'
              law table (`margin: 0`) and on none of /admissions/ug-admissions'
              four, which therefore keep Bootstrap's own
              `.table { margin-bottom: 1rem }` */}
          <table
            style={{ width: '100.229%', height: table.height, margin: table.margin }}
            className="mb-4 max-w-full border-collapse border-2 border-solid border-black/15 align-top text-[#212529] max-tbl:min-w-[900px] max-tbl:border-separate max-tbl:[border-spacing:0]"
          >
            <tbody>
              {/* ref tr > td[colspan=4] > .header-table — the cell matches
                  `.table td` like any other, so it keeps the border and the
                  inherited `white-space: nowrap`; only its padding is zeroed
                  by the authored inline style */}
              <tr style={{ height: table.rowHeights.caption }}>
                {/* `padding: 0` is authored inline upstream; without it the
                    cell keeps the UA default `padding: 1px` and the row is
                    2px tall too many */}
                <td className={cx(cell, 'p-0 text-center')} colSpan={table.colSpan ?? 4}>
                  <div
                    style={{ backgroundColor: table.headerColor }}
                    className="w-full px-[14px] py-5 text-2xl text-white max-tbl:text-base"
                  >
                    <strong className="font-bold">{table.caption}</strong>
                  </div>
                </td>
              </tr>

              {/* ref the column-header row — <b> in plain <td>s, not <th>s */}
              <tr style={{ height: table.rowHeights.columns }}>
                {table.columns.map((column, i) => (
                  <td
                    key={column}
                    className={cx(cell, cellPad, i === 0 ? 'text-left' : 'text-center', 'max-tbl:font-bold')}
                  >
                    <b className="font-bold">{column}</b>
                  </td>
                ))}
              </tr>

              {table.rows.map((row, i) => (
                <tr key={`${i}-${row.label.join(' ')}`} style={{ height: row.height }}>
                  <td className={cx(cell, cellPad, 'text-left', i === 0 && 'max-tbl:font-bold')}>
                    <b className="font-bold">
                      {row.label.map((line, j) => (
                        <span key={`${j}-${line}`}>
                          {/* ref br.br — hidden above 1100px */}
                          {j > 0 && <br className="hidden max-tbl:block" />}
                          {line}
                        </span>
                      ))}
                    </b>
                    {row.note && (
                      <>
                        {' '}
                        <CellValue value={{ ...row.note, green: true }} />
                      </>
                    )}
                  </td>
                  <td className={cx(cell, cellPad, 'text-center')}>
                    <CellValue value={row.value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function KeyDates({ data = keyDates }) {
  const [active, setActive] = useState(data.initialTab ?? 0);
  const tab = data.tabs[active];

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag — no `mrg` modifier, so the base 56px stands */}
        <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{data.heading}</h2>

        {/* ref .rounded-tabs-mint */}
        <div className="relative">
          <PillTabStrip
            tabs={data.tabs}
            active={active}
            onChange={setActive}
            label={data.heading}
            idPrefix="key-dates"
          />

          {/* ref .tab-content-mint.atlas */}
          <div
            role="tabpanel"
            id={`key-dates-panel-${active}`}
            aria-labelledby={`key-dates-tab-${active}`}
            /*
              `.tab-content-mint` sets `font-size: 18px`, which the table cells
              inherit — they declare no size of their own. Panes that also carry
              Webflow's `tab-pane-tab-N` class take `font-size: 16px` at <=767
              from the sheet, and the references are not consistent about which
              panes have it: /admissions/integrated-admissions' two Key Dates
              panes are bare `w-tab-pane`, /admissions/pg-admissions' two are
              numbered, and /admissions/ug-admissions numbers its first two and
              not its last two. Hence `tab.paneNumbered`.
            */
            className="relative pt-[42px] text-lg max-md:pt-5"
          >
            {/* ref the `.w-tab-pane` inside it */}
            <div className={cx(tab.paneNumbered && 'max-md:text-base')}>
            {tab.blocks.map((block, i) => (
              <div key={`${i}-${block.kind === 'table' ? block.table.caption : block.lead.title.join(' ')}`}>
                {block.kind === 'table' ? (
                  <KeyDatesTable block={block} />
                ) : (
                  <DateStrip block={block} />
                )}

                {/* ref .buttons-wrapper */}
                <div className={BUTTONS[data.buttonWrap ?? 'default']}>
                  <PrimaryButton href={block.button.href}>{block.button.label}</PrimaryButton>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
