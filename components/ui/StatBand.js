import withBreaks from '@/lib/withBreaks';

/**
 * `.top-cards-wrapper > N x .head-top-card` — the full-bleed band of figures
 * that sits directly under an inner page's hero.
 *
 * Three instances so far, measured identical in every property:
 *   /campus-atlas          `.top-cards-wrapper.mrgbtm0`  3 cards
 *   /success-stories-atlas `.top-cards-wrapper.padbtm0`  3 cards
 *   /success-stories-atlas `.wrap-patent.nobg > .top-cards-wrapper.mrgbtm0`
 *                                                        2 cards
 * `.padbtm0` and `.mrgbtm0` are the same declaration (`padding-bottom: 0`), and
 * `.wrap-patent.nobg` is a transparent wrapper, so none of them changes the
 * band. The cards share the viewport width equally (`flex: 1 1 0`), each with
 * its own indigo shade and a vector graphic pinned to its right edge.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                        >=768px                      <=767px
 *   .top-cards-wrapper   row, space-between,          column, stretch
 *                        align-start, padding-bottom 0
 *   .head-top-card       flex 1 1 0, h 208,           flex none, h auto,
 *                        padding-left 64,             padding 24 24 24 22
 *                        bg no-repeat, size auto
 *   .sm-text-isme        24px/1.2, pb 16              18px
 *   .large-text          32px/1.2, 500, #fff          22px
 *
 * Colour, artwork and artwork position come from the stylesheet's
 * `.head-top-card.atlas-bg-1/2/3`, and the label colour from the card's own
 * `.sm-text-isme` modifier (`.atlas-blue` #5cbdca on /campus-atlas, `.white`
 * on /success-stories-atlas). All four travel as data: Tailwind cannot emit an
 * arbitrary background-image utility it never sees as a literal, and a page
 * that passes content must not have to pass classes.
 */

export default function StatBand({ data }) {
  return (
    /* ref .top-cards-wrapper */
    <div className="flex items-start justify-between max-md:flex-col max-md:items-stretch">
      {data.map((stat) => (
        /* ref .head-top-card.atlas-bg-* */
        <div
          key={stat.label + stat.value}
          className="flex h-52 flex-1 basis-0 flex-col items-start justify-center bg-no-repeat pl-16 text-white
                     max-md:h-auto max-md:flex-none max-md:p-6 max-md:pl-[22px]"
          style={{
            backgroundColor: stat.background,
            backgroundImage: `url(${stat.image})`,
            backgroundPosition: stat.imagePosition,
            backgroundSize: 'auto',
          }}
        >
          {/* ref .sm-text-isme */}
          <div
            className="pb-4 text-[24px] leading-[1.2] max-md:text-[18px]"
            style={{ color: stat.labelColor ?? '#5cbdca' }}
          >
            {withBreaks(stat.label)}
          </div>

          {/* ref .large-text */}
          <div className="text-[32px] font-medium leading-[1.2] max-md:text-[22px]">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
