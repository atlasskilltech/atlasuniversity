'use client';

import { advantagesContent } from '@/lib/advantagesContent';
import PillTabs from '@/components/ui/PillTabs';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';

/**
 * "ATLAS Electives: Design Your Own Learning Journey" — port of
 * `atlas-advantages.php:279-479` (`section.section > .container >
 * (h2.h2-tag.mrg16, h2.sub-heading.mrgbtm32, .rounded-tabs-mint >
 *  (.tabs-menu-mint.less-space, .tab-content-mint.atlas > 5 panes of
 *   .common-flex-16-wrap > N x .card-type-el-ugdx))`).
 *
 * Five subject tabs over a wrapping row of elective cards: a photograph with
 * the course title laid across a scrim on its lower half.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                          >=768px                  <=767px
 *   .common-flex-16-wrap   wrap, flex-start, gap 16 justify + align centre
 *   .card-type-el-ugdx     298 x 232, radius 32/0,  width 100%
 *                          clipped, flex none
 *   .cd-ty-el-cont         absolute lower half,     same
 *                          #fff0 -> #000,
 *                          padding 0 32 32,
 *                          align-end
 *   .cd-ty-el-text.isdi    20px/1.2, 500, #fff      same
 *   .cd-ty-el-img          100% x 100%, cover       same
 *   .tab-content-mint      padding-top 42           20
 *     .atlas
 *
 * The card going full width below 768px comes from a compound rule,
 * `.slider-card-e-ugdx, .card-type-el-ugdx { width: 100% }` — invisible to a
 * grep anchored on this class, and the reason the row reads as one card per
 * line on mobile rather than a 298px grid.
 *
 * /advantages/atlas-multidisciplinary repeats this section with the same five
 * tab labels and a different card set — 8 per tab rather than 8/8/8/4/4 —
 * hence `data`, which defaults to /advantages/atlas-advantages'. Eleven of its
 * forty titles carry an authored `<br>`; none of /advantages/atlas-advantages'
 * thirty-two do, so `withBreaks` is a no-op there.
 */
export default function Electives({ data = advantagesContent.electives, idPrefix = 'electives' }) {
  const electives = data;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{electives.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm32 — a lead, not a heading */}
        <div className={SUB_H2_MRGBTM32}>
          {electives.subheading}
        </div>

        {/* ref .rounded-tabs-mint */}
        <PillTabs
          idPrefix={idPrefix}
          label={electives.heading}
          /* `.tab-content-mint.atlas` is 18px at every width; the drop to 16px
             below 768 comes from `.tab-pane-tab-1`, i.e. the pane inside it */
          contentClassName="relative pt-[42px] text-lg max-md:pt-5 max-md:text-[16px]"
          tabs={electives.tabs.map((tab) => ({
            label: tab.label,
            render: () => (
              /* ref .common-flex-16-wrap */
              <div className="flex flex-wrap items-start justify-start gap-4 max-md:items-center max-md:justify-center">
                {tab.cards.map((card, index) => (
                  /* ref .card-type-el-ugdx — the index is part of the key
                     because /advantages/atlas-multidisciplinary repeats a card
                     title within one tab ("Graphic Design" three times in
                     "Business & Finance"). The list is static and never
                     reordered, so the index is stable. */
                  <div
                    key={`${card.title}-${index}`}
                    className="relative h-[232px] w-[298px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:w-full"
                  >
                    {/* ref img.cd-ty-el-img */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image.src}
                      srcSet={card.image.srcSet}
                      sizes={card.image.sizes}
                      alt={card.image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />

                    {/* ref .cd-ty-el-cont */}
                    <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-start bg-[linear-gradient(#ffffff00,#000000)] px-8 pb-8">
                      {/* ref .cd-ty-el-text.isdi */}
                      <div className="text-[20px] font-medium leading-[1.2] text-white">
                        {withBreaks(card.title)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
}
