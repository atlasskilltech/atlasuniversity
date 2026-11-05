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
 * ── `figureSm` ────────────────────────────────────────────────────────────
 * /advantages/partnership/international-summerschool (the /life-at-atlas sheet): `figure` from 768
 * up, but below 768 the sheet's own mobile rules win — figure 18px, caption 22px, padding
 * 24 24 24 22 — while the card stays centred. Measured at 1440 / 768 / 390.
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

/*
 * ── `stack992` ─────────────────────────────────────────────────────────────
 * /centre_for_research restyles the band in its own <style>: `default` from 993 up, but the
 * band turns into a column at `@media (max-width: 992px)` — inclusive, 992 is already stacked — and
 * the mobile card (padding 24 24 24 22, 18 / 22px type) applies from there. Measured at 1440 / 992 / 991 / 390.
 */
/* whole literal strings — the Tailwind scanner reads source text */
const WRAP = {
  default: 'flex items-start justify-between max-md:flex-col max-md:items-stretch',
  figure: 'flex items-start justify-between max-md:flex-col max-md:items-stretch',
  figureSm: 'flex items-start justify-between max-md:flex-col max-md:items-stretch',
  stack992: 'flex items-start justify-between [@media(max-width:992px)]:flex-col [@media(max-width:992px)]:items-stretch',
};

const CARD = {
  /* no `min-w-0`: the cards keep `min-width: auto`, so at 1100 "International Collaborations"
     floors its card at 229.6px and the other four share the rest (217.6 each) — measured */
  stack992: 'flex h-52 flex-1 basis-0 flex-col items-start justify-center bg-no-repeat pl-16 text-white '
          + '[@media(max-width:992px)]:h-auto [@media(max-width:992px)]:flex-none [@media(max-width:992px)]:p-6 [@media(max-width:992px)]:pl-[22px]',
  default: 'flex h-52 min-w-0 flex-1 basis-0 flex-col items-start justify-center bg-no-repeat pl-16 '
         + 'text-white max-md:h-auto max-md:flex-none max-md:p-6 max-md:pl-[22px]',
  figure: 'flex h-52 min-w-0 flex-1 basis-0 flex-col items-center justify-center bg-no-repeat px-2.5 '
        + 'text-white max-md:h-auto max-md:flex-none max-md:py-6',
  /* no `min-w-0`: here the cards keep `min-width: auto`, so at 768 "Multidisciplinary" floors its card
     at 174px and the other four take 148.5 — measured */
  figureSm: 'flex h-52 flex-1 basis-0 flex-col items-center justify-center bg-no-repeat px-2.5 '
          + 'text-white max-md:h-auto max-md:flex-none max-md:p-6 max-md:pl-[22px]',
};

const TOP = {
  stack992: 'pb-4 text-[24px] leading-[1.2] [@media(max-width:992px)]:text-[18px]',
  default: 'pb-4 text-[24px] leading-[1.2] max-md:text-[18px]',
  figure: 'pb-4 text-[36px] leading-[1.2]',
  figureSm: 'pb-4 text-[36px] leading-[1.2] max-md:text-[18px]',
};

const BOTTOM = {
  stack992: 'text-[32px] font-medium leading-[1.2] [@media(max-width:992px)]:text-[22px]',
  default: 'text-[32px] font-medium leading-[1.2] max-md:text-[22px]',
  figure: 'text-center text-[20px] font-medium leading-[1.2]',
  figureSm: 'text-center text-[20px] font-medium leading-[1.2] max-md:text-[22px]',
};

/* ISME Global Business Pathway — its sheet ends with `.large-text { font-size: 20px }`, which wins at
   every width (measured 20px/24 at 1440 / 768 / 390) */
const VALUE_20 = 'text-[20px] font-medium leading-[1.2]';

/* ISME `.sm-text-isme-2` (Summer School) — the default label, but 24px at every width */
const TOP_FIXED = 'pb-4 text-[24px] leading-[1.2]';

/* `defaultAuto` — the default band with the cards' own `min-width: auto` (ISME: `.head-top-card` never
   declares `min-width: 0`, so a long word floors its card — measured 193/185/185/205 at 768 on
   /schools/isme/global-business-pathway, where `min-w-0` overflowed the viewport by 15px) */
WRAP.defaultAuto = WRAP.default;
CARD.defaultAuto = CARD.default.replace('min-w-0 ', '');
TOP.defaultAuto = TOP.default;
BOTTOM.defaultAuto = BOTTOM.default;
/* `defaultAutoLp` — the ISME partner-pathway pages' band: their own <style> gives every card
   `margin-top: 40px` at <=576 and the `.mg-top15` ones after the first 15px.
   Reference defect, fixed: between 768 and ~860 the four `min-width: auto` cards cannot fit their
   longest 32px words side by side, so production's page scrolls sideways (scrollWidth 857 at 768).
   The band clips instead — the same frame production paints, without the horizontal scroll. */
WRAP.defaultAutoLp = cx(WRAP.default, 'overflow-x-clip max-lp:[&>*:first-child]:mt-10 max-lp:[&>*+*]:mt-[15px]');
CARD.defaultAutoLp = CARD.defaultAuto;
TOP.defaultAutoLp = TOP.default;
BOTTOM.defaultAutoLp = BOTTOM.default;

export default function StatBand({ data, variant = 'default' }) {
  return (
    /* ref .top-cards-wrapper */
    <div className={WRAP[variant]}>
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
          <div className={cx(stat.labelFixed ? TOP_FIXED : TOP[variant])} style={{ color: stat.labelColor ?? '#5cbdca' }}>
            {withBreaks(stat.label)}
          </div>

          {stat.small != null ? (
            /* ref .small-text — ISME Job Openings' cards carry a sentence in place of a figure:
               18px/1.5 400 white (measured at 1440 / 390). Absent everywhere else. */
            <div className="text-[18px] leading-[1.5] text-white">{withBreaks(stat.small)}</div>
          ) : (
            /* ref .large-text */
            <div className={stat.valueSize === 20 ? VALUE_20 : BOTTOM[variant]}>{withBreaks(stat.value)}</div>
          )}

          {stat.note != null && (
            /* ref .s-text — the ISME programme pages' third line: 16/1.2 300, pt16 (14 at <=767).
               Absent on every page that came before them. An authored-but-empty `.s-text` (the
               ISME single-programme pages' Duration card) is still its 16px of padding, so an
               empty string renders the box and only a missing note renders nothing. */
            <div className="pt-4 text-base font-light leading-[1.2] max-md:text-[14px]">{withBreaks(stat.note)}</div>
          )}
        </div>
      ))}
    </div>
  );
}
