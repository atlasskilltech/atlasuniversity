'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import { SECTION, H2 } from '@/components/Home/SectionHead';
import { TW_CONTAINER } from './ui';

/* ref `.container` — Webflow's, under the Tailwind Play CDN's `.container` ladder (see ./ui) */
const CONTAINER = TW_CONTAINER;

/**
 * ref global-immersions.php:409-1188 "Global Experiences of ATLAS Students" —
 * `section.section > .container > (h2.h2-tag.mrg42, .rounded-tabs-mint.custom-sidetab-con >
 *  (.tabs-menu-mint.less-space, .tab-content-mint.atlas > N panes of
 *   .common-flex-16-wrap > M x .card-type-el-ugdx))`.
 *
 * A SIDE-tab set (not the horizontal `.rounded-tabs-mint` the other pages use): 16 city tabs
 * (London … NASA) stacked in a vertical menu on the left, the active city's cards on the right.
 * Measured cascade:
 *   `.custom-sidetab-con`  flex, gap 40            | block (stacked) at <=767
 *   `.tabs-menu-mint`      display BLOCK, max-content width (171.6px), the 16 tabs stacked with NO
 *                        gap (16 x 40 = 640px), each tab filling the menu's width; box 21px left of
 *                        the content edge, -61px right margin before the 40px gap (see the pane note
 *                        below) | flex row, gap 8, margin 0, auto-width tabs at <=767
 *   `.tab-content-mint`    flex 1, padding-left 8rem| padding-left 0, padding-top 20 at <=767
 *   `.tab-roundmint-tab-1` h40 px20 18px/1.2; current = bg #5cbdca r20 500 (as PillTabs)
 *   `.common-flex-16-wrap` flex-wrap, gap 16, justify-between
 *   `.card-type-el-ugdx`   298 x 295 (taller than the Electives 232), radius 32/0, flex none;
 *                          full width at <=767
 *   `.cd-ty-el-img`        object-fit CONTAIN over the card's black ground (not cover)
 *   `.cd-ty-el-text.isdi`  18px/1.2 500 white, in a lower-half scrim, pb 16 / pl 18
 */
export default function ExperienceTabs({ heading, tabs, idPrefix = 'gi-experience' }) {
  const [active, setActive] = useState(0);
  const cards = tabs[active]?.cards || [];

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg42 — the compound mrg42 keeps 42px at every width */}
        <h2 className={`mb-[42px] ${H2}`}>{heading}</h2>

        {/* ref .rounded-tabs-mint.custom-sidetab-con — flex gap-40, block at <=767 */}
        <div className="flex gap-10 max-md:block">
          {/* ref .tabs-menu-mint — vertical auto-width column; horizontal scroll row at <=767 */}
          <div
            role="tablist"
            aria-label={heading}
            className="-ml-[21px] -mr-[61px] flex w-fit flex-none flex-col items-stretch max-md:mx-0 max-md:w-full max-md:flex-row max-md:items-center max-md:gap-2 max-md:overflow-x-auto max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab, i) => (
              /* ref a.tab-roundmint-tab-1.atlas (+ .w--current) */
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cx(
                  'relative flex h-10 max-w-full flex-none items-center justify-start whitespace-nowrap px-5 text-left text-lg leading-[1.2] text-black transition-colors max-md:text-[16px]',
                  i === active ? 'rounded-[20px] bg-atlas-cyan font-medium' : 'bg-transparent font-normal',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ref .tab-content-mint.atlas — flex-1, padding-left 8rem (0 + pt-20 at <=767).
              Webflow's `.w-tabs::before/::after { content: " "; display: table }` clearfix are
              zero-width FLEX ITEMS in this flex container, so the 40px gap is spent three times:
              once before the menu (hence its -61 + 40 = -21px left offset) and once after the
              pane — the 40px right margin here. That is what makes the pane 602px at 1100 (one
              card per row) instead of 642 (two). Block container at <=767, so neither applies. */}
          <div className="mr-10 flex-1 pl-32 max-md:mr-0 max-md:pl-0 max-md:pt-5">
            {/* ref .common-flex-16-wrap — wrap, gap 16, justify-between */}
            <div className="flex flex-wrap justify-between gap-4 max-md:items-center max-md:justify-center">
              {cards.map((card, index) => (
                /* ref .card-type-el-ugdx — 298x295, radius 32/0 */
                <div
                  key={`${card.label}-${index}`}
                  className="relative h-[295px] w-[298px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] bg-black max-md:w-full"
                >
                  {/* ref img.cd-ty-el-img — object-contain */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image.src}
                    alt={card.image.alt || ''}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />

                  {/* ref .cd-ty-el-cont — lower-half scrim, pb 16 / pl 18 */}
                  <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-start bg-[linear-gradient(#ffffff00,#000000)] pb-4 pl-[18px] pr-8">
                    {/* ref .cd-ty-el-text.isdi — 18px */}
                    <div className="text-[18px] font-medium leading-[1.2] text-white">
                      {card.label}
                    </div>
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
