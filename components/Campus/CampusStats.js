import { campusContent } from '@/lib/campusContent';

/**
 * The three figures directly under the hero — port of
 * `campus-atlas.php:37-48` (`.top-cards-wrapper.mrgbtm0 > 3x
 * .head-top-card.atlas-bg-{1,2,3}`).
 *
 * A full-bleed band with no container: the cards share the viewport width
 * equally (`flex: 1 1 0`) and each carries its own indigo shade plus a vector
 * graphic pinned to its right edge.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                        >=768px                      <=767px
 *   .top-cards-wrapper   row, space-between,          column, stretch
 *                        align-start, padding-bottom
 *                        0 (`.mrgbtm0`)
 *   .head-top-card       flex 1 1 0, h 208,           flex none, h auto,
 *                        padding-left 64,             padding 24 24 24 22
 *                        bg no-repeat, size auto,
 *                        position 100% 50%
 *                        (100% 0 on atlas-bg-3)
 *   .sm-text-isme        24px/1.2, #5cbdca, pb 16     18px
 *   .large-text          32px/1.2, 500, #fff          22px
 *
 * The colour + artwork pairs come from `.head-top-card.atlas-bg-1/2/3` in the
 * stylesheet, so they travel as data rather than as classes — Tailwind cannot
 * emit an arbitrary background-image utility it never sees as a literal.
 */
export default function CampusStats() {
  const { stats } = campusContent;

  return (
    /* ref .top-cards-wrapper.mrgbtm0 */
    <div className="flex items-start justify-between max-md:flex-col max-md:items-stretch">
      {stats.map((stat) => (
        /* ref .head-top-card.atlas-bg-* */
        <div
          key={stat.value}
          className="flex h-52 flex-1 basis-0 flex-col items-start justify-center bg-no-repeat pl-16 text-white
                     max-md:h-auto max-md:flex-none max-md:p-6 max-md:pl-[22px]"
          style={{
            backgroundColor: stat.background,
            backgroundImage: `url(${stat.image})`,
            backgroundPosition: stat.imagePosition,
            backgroundSize: 'auto',
          }}
        >
          {/* ref .sm-text-isme.atlas-blue */}
          <div className="pb-4 text-[24px] leading-[1.2] text-atlas-cyan max-md:text-[18px]">
            {stat.label}
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
