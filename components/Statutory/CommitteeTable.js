import { H2 } from '@/components/Home/SectionHead';

/**
 * `.education-loan-wrap > (.h2-tag.mrg24 | .h2-tag.mrg16)? > .w-layout-layout.quick-stack-N` — the
 * committee tables of /anti-ragging-committee, /internal-complaint-committee and
 * /women-development-cell. Each is a Webflow quick stack of `.cell-table` cells, the first row
 * `.head`. Measured on production at 1440 / 991 / 767 / 479 / 390 (identical on all three):
 *
 *   .education-loan-wrap   padding-top 54 → 0 at <=767, where it becomes the horizontal scroller
 *                          (`overflow-x: auto`); at <=479 it bleeds 21px past the container on
 *                          both sides and pads 20 back in
 *   .h2-tag.mrg24          44px/1.2 500 #1a1a1a, mb 24 at every width (a compound selector, so it
 *                          survives the `.h2-tag` 32px rule); 36px at <=767
 *   .h2-tag.mrg16          the same, mb 16 → 8 at <=767
 *   .w-layout-layout       grid, padding 20, no gaps, `justify-content: center`, columns 1fr 4fr
 *                          4fr (133.5 / 534.2 / 534.2 at 1440). Each track keeps its min-content
 *                          floor, so below ~480 the grid overflows and the wrap scrolls — as on
 *                          production.
 *   .cell-table            flex column, centred both ways, 1px solid #000 on all four sides
 *                          (adjacent cells therefore draw a 2px line); `.head` #625dbf, white
 *   .loan-type             margin 25 0, padding 0 20
 *   .loan-type-desc        14px/1.5 700, margin-top 16, left-aligned
 */
const HEAD_MARGIN = { mrg24: 'mb-6', mrg16: 'mb-4 max-md:mb-2' };

function Cell({ head, children }) {
  return (
    <div className={`flex flex-col items-center justify-center border border-solid border-black ${head ? 'bg-[#625dbf] text-white' : ''}`}>
      {/* ref .loan-type */}
      <div className="my-[25px] px-5">
        {/* ref .loan-type-desc */}
        <div className="mt-4 text-left text-sm font-bold">{children}</div>
      </div>
    </div>
  );
}

export default function CommitteeTable({ heading, headingMargin = 'mrg24', head, rows }) {
  return (
    <div className="pt-[54px] max-md:overflow-x-auto max-md:pt-0 max-sm:-mx-[21px] max-sm:px-5">
      {heading && <h2 className={`${HEAD_MARGIN[headingMargin]} ${H2}`}>{heading}</h2>}
      <div className="grid grid-cols-[1fr_4fr_4fr] justify-center gap-0 p-5">
        {head.map((label) => (
          <Cell key={label} head>
            {label}
          </Cell>
        ))}
        {rows.map((row, r) => row.map((value, c) => <Cell key={`${r}-${c}`}>{value}</Cell>))}
      </div>
    </div>
  );
}
