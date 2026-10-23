import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';

/**
 * "Education Loans" — `assets/include/loans/education-loans.php`, a Webflow quick-stack:
 * `.education-loan-wrap > .w-layout-layout.quick-stack.isdi-curve` holding its
 * `.w-layout-cell`s as **rows of six** (logo, Loan Type, Amount, % Interest Rate, Tenure,
 * Contact details).
 *
 * The include mirrored in `reference/` holds four lenders; **production serves five** —
 * Avanse was added upstream between Tata Capital and HDFC, and it is the one cell on the
 * page with two contacts. The data follows production, which is what the page renders.
 *
 * The include's own `<style>` pins the grid: `grid-template-rows: auto …;
 * grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr`. The measured tracks are uneven
 * (202 / 179.3 x 4 / 322.7 at 1440) because the cells' content sizes them — a `1fr` is
 * `minmax(auto, 1fr)`, so each column's min-content floor wins where the copy is long.
 * Transcribing the `minmax` is what reproduces that.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   grid              6 columns at every width; the wrap around it scrolls
 *   cell              flex, centred; the logo cell is 202 wide and its image is
 *                     `max-width: 200px; padding: 0 20px` over `box-sizing: border-box`,
 *                     so the artwork occupies 160px and keeps its own ratio
 *   head              16px/1.5 Manrope 400, left-aligned
 *     (`.amount-head` and its siblings)
 *   value             14px/1.5 700 Manrope, left-aligned; the TOP MARGIN differs per field
 *                     and is what sets each cell's height — `.loan-type-desc` 16,
 *                     `.amount-type` / `.interest-type` / `.tenure-type` 53,
 *                     `.contact-name` 29 over a 9px bottom margin
 *   contact deets     **unstyled** — `.contact-deets` has no rule at all and the other four
 *                     are bare `<div>`s, so the line inherits the page's Poppins 16px/24.
 *                     It is NOT the 14/700 Manrope the values above use, and at 16px it
 *                     wraps to two lines, which is 6px of row height per lender.
 *
 * Every cell draws its own 1px borders — there is no border collapsing in a grid — and the
 * pattern is regular, measured off the live page:
 *   columns   1 indigo both sides · 2 indigo right-divider · 3 none ·
 *             4 faint both sides · 5 faint right · 6 indigo right
 *   rows      first top only · second top and bottom · every later row bottom only
 *             (upstream reuses one class for every row after the second)
 * `#18429f` is the frame, `rgba(0,0,0,.1)` the internal vertical rules.
 *
 * The contact e-mail addresses come from the include; production runs them through
 * Cloudflare's obfuscation and renders "[email protected]". Avanse's two are not in the
 * mirrored include at all, so they were decoded from production's own `data-cfemail`
 * attributes — a decode validated against the four addresses the include does carry.
 */
/* ref the per-column border pattern */
const COL = [
  /* c1 — the frame's left edge, and an indigo rule against the copy */
  'border-l border-r border-l-[#18429f] border-r-[#18429f]',
  /* c2 */ 'border-r border-r-black/10',
  /* c3 — the one column with no vertical rule of its own */ '',
  /* c4 */ 'border-l border-r border-x-black/10',
  /* c5 */ 'border-r border-r-black/10',
  /* c6 — the frame's right edge */ 'border-r border-r-[#18429f]',
];

/* the cells turn into centred columns at <=767 */
const CELL = 'flex items-center justify-start max-md:flex-col max-md:items-center max-md:justify-start';
/* `.amount-head` and `.contact-head` are Manrope */
const HEAD = 'text-left font-sans text-base leading-[1.5]';
/* every value line is Manrope 14/700 left-aligned */
const VALUE = 'text-left font-sans text-[14px] font-bold leading-[1.5]';
const GAP = { type: 'mt-4', wide: 'mt-[53px]', contact: 'mb-[9px] mt-[29px]', none: '' };

function Field({ head, text, gap = 'wide' }) {
  return (
    /* ref .loan-type / .amount / .interest / .tenure — `margin: 25px 0; padding: 0 20px` */
    <div className="my-[25px] px-5">
      {head && <div className={HEAD}>{head}</div>}
      <div className={cx(VALUE, GAP[gap])}>{withBreaks(text)}</div>
    </div>
  );
}

export default function EducationLoans({ data }) {
  const last = data.rows.length - 1;
  return (
    <div data-block="education-loan" id="education-loan" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB}>{withBreaks(data.sub)}</div>

        {/* ref .education-loan-wrap — a horizontal scroller at <=767, where it also
            bleeds 21px each side behind a 20px inset */}
        <div className="pt-[54px] max-md:overflow-x-auto max-md:pt-0 max-sm:-mx-[21px] max-sm:px-5">
          {/* ref .w-layout-layout.quick-stack.isdi-curve */}
          {/* the six columns hold at EVERY width — the grid never stacks; it is the wrap
              around it that scrolls */}
          {/* ref `.quick-stack { width: 100%; justify-content: left }` — the tracks are
              `minmax(auto, 1fr)`, so below 768 their min-content floors sum past the
              container and the wrap scrolls. `.quick-stack.isdi-curve` turns the clip off
              at <=479, which is why each corner cell carries its own radius too. */}
          <div className="grid w-full justify-start gap-0 overflow-hidden rounded-2xl [grid-template-columns:repeat(6,minmax(auto,1fr))] max-sm:overflow-visible">
            {data.rows.map((row, r) => (
              /* each row is six sibling cells in the same grid — a React fragment keeps
                 them as direct grid children, which a wrapper would not */
              <Row key={row.contact.people[0].name} row={row} r={r} last={last} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ row, r, last }) {
  /* ref the per-row horizontal borders: the first row draws only its top, the second draws
     both, and every row after it draws only its bottom */
  const edge = cx(
    (r === 0 || r === 1) && 'border-t border-t-[#18429f]',
    r >= 1 && 'border-b border-b-[#18429f]'
  );
  const cell = (i, extra) =>
    cx(CELL, COL[i], edge,
       r === 0 && i === 0 && 'rounded-tl-2xl',
       r === 0 && i === 5 && 'rounded-tr-2xl',
       r === last && i === 0 && 'rounded-bl-2xl',
       r === last && i === 5 && 'rounded-br-2xl',
       /* the reference's last row paints THIS cell's bottom border black rather than
          indigo — an upstream slip in `.cell-12`, 1px and reproduced as authored */
       r === last && i === 2 && 'border-b border-b-black',
       extra);

  return (
    <>
      {/* ref .w-layout-cell.cell.loan-cell-pad */}
      <div className={cell(0, 'justify-center')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={row.logo.src}
          width={row.logo.width}
          height={row.logo.height}
          alt={row.logo.alt}
          loading="lazy"
          decoding="async"
          /* ref .loan-image-logo — `max-width: 200px; padding: 0 20px` over Webflow's
             `box-sizing: border-box`, so the artwork fills 160px */
          className="box-border max-w-[200px] px-5 align-middle"
        />
      </div>
      <div className={cell(1)}>
        <Field head={row.type.head} text={row.type.text} gap="type" />
      </div>
      <div className={cell(2)}>
        <Field head={row.amount.head} text={row.amount.text} />
      </div>
      <div className={cell(3)}>
        <Field head={row.interest.head} text={row.interest.text} />
      </div>
      <div className={cell(4)}>
        <Field head={row.tenure.head} text={row.tenure.text} />
      </div>
      {/* ref .loan-contact — a head over one or two name/details pairs */}
      <div className={cell(5)}>
        <div className="my-[25px] px-5">
          <div className={HEAD}>{row.contact.head}</div>
          {row.contact.people.map((person) => (
            <div key={person.name}>
              <div className={cx(VALUE, GAP.contact)}>{person.name}</div>
              {/* ref .contact-deets and its three unclassed twins — no rule anywhere, so
                  this inherits the page's Poppins 16px/24 rather than the Manrope 14/700
                  every other value uses */}
              <div className="text-left">{withBreaks(person.deets)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
