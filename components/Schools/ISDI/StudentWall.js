import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import TransferCard from './TransferCard';
import { CONTAINER, H2, H2_MB, SECTION, SUB_MRGBTM } from './Home/ui';

/**
 * The `.transfer-card-wrapper` wall — a heading over a centred, wrapping row of
 * `.transfer-card.isdi`. Two pages in the Success Stories column are built on it:
 *
 *   placements.php            "From ATLAS ISDI to the World's Best Companies",
 *                             21 cards, heading only
 *   masters-progression.php   "From ATLAS ISDI to the World's Best Universities",
 *                             23 cards, `.h2-tag.mrg16` over a `.sub-heading.mrgbtm`
 *
 * Moved here out of `Placements/` when the second one turned out to be the same
 * wall — the call `LogoStrip` already records. `lead` and `headingMargin` are both
 * optional and both default to the placements form, so that page is unchanged.
 *
 *   div.section > .container >
 *     (h2.h2-tag.isdi, .transfer-card-wrapper > 21 x .transfer-card.isdi)
 *
 * ── Measured on production at 1440 / 1280 / 991 / 768 / 479 / 390 ─────────
 *   .section                 50px top and bottom at EVERY width — the sheet says
 *                            60 / 40 (<=767) and header.php's
 *                            `.isdi-page .section { padding: 50px 0 }` beats both
 *   .container               1366 max-w, 62 / 30 (<=991) / 22 (<=767)
 *   h2.h2-tag.isdi           Poppins 44px/1.2 400 #1a1a1a, mb56; 36px from 991
 *                            down and mb32 from 767
 *   .transfer-card-wrapper   wrapping flex row, gap 32, centred on both axes,
 *                            weight 500 — no padding of its own at any width
 *   .transfer-card.isdi      the shared `../TransferCard`: 282x388 r17 at every
 *                            width, so the column count falls out of the
 *                            arithmetic (4 at 1440 down to 1 at 390)
 *
 * **Every mark on both pages paints at its intrinsic size**, so the wall passes
 * `logoKind="bare"` and the card's own `max-w-full` is the only constraint — but the
 * two pages get there by different routes, which is the whole reason `logoKind`
 * names a class rather than being inferred:
 *
 *   placements              the mark is a bare `<img>` with NO class, and the page's
 *                           sheets declare neither `.transf-un-logo` nor `.big-logo`
 *                           (104x50 on thirteen, 175x50 on seven, 50x50 on EY)
 *   masters-progression     every mark DOES carry `img.transf-un-logo` — and that
 *                           class occurs 0 times in all three of that page's sheets
 *                           and its inline `<style>`, so it paints intrinsic too
 *                           (104x50 on seven, 175x50 on sixteen)
 *
 * Only /atlas-isdi-advantage/internationalisation's own sheet fixes the class at
 * 140x36. **The page decides, not the class** — read the sheet, not the attribute.
 *
 * `.transfer-card-wrapper` is authored inline in `International/Masters` as well —
 * one short class string, not a shape, so it is left in both rather than extracted
 * into a shared component that would touch a finished page for no measured gain
 * (the call `KeyDates` and the eligibility strip already record).
 */
export default function StudentWall({ data, headingMargin = 'base' }) {
  return (
    <div data-block="wall" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag(.mrg16).isdi — placements authors the bare class (mb56 /
            32 at <=767); masters-progression authors `.mrg16` (16 / 8) */}
        <h2 className={cx(H2, H2_MB[headingMargin] ?? H2_MB.base)}>{data.heading}</h2>

        {data.lead && (
          /* ref .sub-heading.mrgbtm — masters-progression only: pb56, 20 from 991,
             then pb0 + mb20 at <=767 and pb20 again at <=479. Measured on that
             reference at all twelve widths. */
          <div className={SUB_MRGBTM}>{withBreaks(data.lead)}</div>
        )}

        {/* ref .transfer-card-wrapper */}
        <div className="flex flex-wrap items-center justify-center gap-8 font-medium">
          {data.people.map((person, i) => (
            /* both pages repeat a mark across cards (`tira.jpg` on placements;
               `ual-central-saint-martins.jpg` on three of masters-progression's and
               `royal-college-of-art.jpg` on another three) and neither repeats a
               NAME — but the key is index-qualified anyway, the call five earlier
               duplicate-key bugs in this rebuild have already paid for */
            <TransferCard key={`${i}-${person.name}`} person={person} logoKind="bare" />
          ))}
        </div>
      </div>
    </div>
  );
}
