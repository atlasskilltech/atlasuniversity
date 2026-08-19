import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';

/**
 * `.top-cards-wrapper > N x .head-top-card` — the full-bleed band of figures
 * that sits directly under an inner page's hero.
 *
 * Four instances:
 *   /campus-atlas                       `.mrgbtm0`  3 cards
 *   /success-stories-atlas              `.padbtm0`  3 cards
 *   /success-stories-atlas              `.mrgbtm0`  2 cards (inside
 *                                       `.wrap-patent.nobg`)
 *   /advantages/atlas-internationalisation `.padbtm0` 6 cards, `variant="figure"`
 *
 * `.padbtm0` and `.mrgbtm0` are the same declaration (`padding-bottom: 0`), and
 * `.wrap-patent.nobg` is a transparent wrapper, so none of them changes the
 * band. The cards share the viewport width equally (`flex: 1 1 0`), each with
 * its own indigo shade and a vector graphic pinned to its right edge.
 *
 * ── Measured cascade — `default` ──────────────────────────────────────────
 *                        >=768px                      <=767px
 *   .top-cards-wrapper   row, space-between,          column, stretch
 *                        align-start, padding-bottom 0
 *   .head-top-card       flex 1 1 0, h 208,           flex none, h auto,
 *                        padding-left 64,             padding 24 24 24 22
 *                        bg no-repeat, size auto
 *   .sm-text-isme        24px/1.2, pb 16              18px
 *   .large-text          32px/1.2, 500, #fff          22px
 *
 * ── `figure` ──────────────────────────────────────────────────────────────
 * /advantages/atlas-internationalisation's own `<style>` block re-sizes both
 * lines and re-aligns the card, and its markup puts the *number* in the first
 * slot and the caption in the second — the inverse of every other page. So the
 * first slot is 36px and the second 20px there, and the card centres its
 * content instead of ranging it left:
 *
 *   .head-top-card       align-items center, padding 0 10 (24 0 at <=767)
 *   .sm-text-isme        36px/1.2, pb 16    <- the figure
 *   .large-text          20px/1.2, 500, centred  <- the caption
 *
 * The two slots stay `label` then `value` whichever way round a page fills
 * them; only the type scale is a variant.
 *
 * ── One reference defect, not reproduced ──────────────────────────────────
 * At exactly 768px the six-card band overflows the viewport by 63px: the cards
 * are `flex: 1 1 0` but `min-width: auto` floors each at its longest word, and
 * 6 x 141px does not fit 768px. `min-w-0` lets the declared `flex: 1` actually
 * shrink, which is plainly what the rule intends; nothing changes at any other
 * width, where the cards divide the row evenly well above their min-content.
 *
 * Colour, artwork and artwork position come from the stylesheet's
 * `.head-top-card.atlas-bg-1/2/3`, and the label colour from the card's own
 * `.sm-text-isme` modifier (`.atlas-blue` #5cbdca on /campus-atlas, `.white`
 * on /success-stories-atlas). All four travel as data: Tailwind cannot emit an
 * arbitrary background-image utility it never sees as a literal, and a page
 * that passes content must not have to pass classes.
 */

/* whole literal strings — the Tailwind scanner reads source text */
const CARD = {
  default: 'flex h-52 min-w-0 flex-1 basis-0 flex-col items-start justify-center bg-no-repeat pl-16 '
         + 'text-white max-md:h-auto max-md:flex-none max-md:p-6 max-md:pl-[22px]',
  figure: 'flex h-52 min-w-0 flex-1 basis-0 flex-col items-center justify-center bg-no-repeat px-2.5 '
        + 'text-white max-md:h-auto max-md:flex-none max-md:py-6',
};

const TOP = {
  default: 'pb-4 text-[24px] leading-[1.2] max-md:text-[18px]',
  figure: 'pb-4 text-[36px] leading-[1.2]',
};

const BOTTOM = {
  default: 'text-[32px] font-medium leading-[1.2] max-md:text-[22px]',
  figure: 'text-center text-[20px] font-medium leading-[1.2]',
};

export default function StatBand({ data, variant = 'default' }) {
  return (
    /* ref .top-cards-wrapper */
    <div className="flex items-start justify-between max-md:flex-col max-md:items-stretch">
      {data.map((stat) => (
        /* ref .head-top-card.atlas-bg-* */
        <div
          key={stat.label + stat.value}
          className={CARD[variant]}
          style={{
            backgroundColor: stat.background,
            backgroundImage: `url(${stat.image})`,
            backgroundPosition: stat.imagePosition,
            backgroundSize: 'auto',
          }}
        >
          {/* ref .sm-text-isme */}
          <div className={cx(TOP[variant])} style={{ color: stat.labelColor ?? '#5cbdca' }}>
            {withBreaks(stat.label)}
          </div>

          {/* ref .large-text */}
          <div className={BOTTOM[variant]}>{withBreaks(stat.value)}</div>
        </div>
      ))}
    </div>
  );
}
