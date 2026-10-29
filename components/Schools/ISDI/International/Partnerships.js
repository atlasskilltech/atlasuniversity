'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import LogoGrid from '@/components/ui/LogoGrid';
import MintTabStrip from '../Home/MintTabStrip';
import { CONTAINER, H2_MB, H2_PLAIN, SECTION } from '../Home/ui';

/**
 * "Our Global Partnerships"
 * (`atlas-isdi-advantage/internationalisation/index.php:184-495`).
 *
 *   section.section > .container >
 *     (.head-wrap.top > h2.h2-tag,
 *      .rounded-tabs-mint > (.tabs-menu-mint > 5 x a.tab-roundmint-tab-1.atlas,
 *                            .tab-content-mint > 5 x .w-tab-pane > .logos-grid))
 *
 * Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390:
 *   .head-wrap.top    row, space-between, top-aligned; a stretched column with a
 *                     16px gap and mb16 at <=767, `space-around` at <=479
 *   h2.h2-tag         44px/1.2 **500** #1a1a1a (no `.isdi`, so it keeps the Manrope
 *                     weight and waits until 767 to drop to 36px), mb56 -> 32
 *   .tabs-menu-mint   the bare strip: gap 48, -73 bleed, px70 — `spacing="wide"`
 *   a.…atlas          #000 idle, **#000 on #5cbdca** current — `skin="atlas"`
 *   .tab-content-mint pt56 (40 at <=767)
 *
 * **The strip's `data-current` is "Tab 4", which is its FIRST link.** Webflow tabs
 * follow the current link rather than the pane order, so the United Kingdom pane
 * opens — verified in the browser on production, where link 0 carries `w--current`.
 *
 * The five panes hold 32 / 16 / 8 / 4 / 8 cells, and six of those cells are
 * authored with no logo in them at all; `LogoGrid` renders each as the plain white
 * box the reference paints. Only the first pane's grid drops to two columns, and at
 * 576 rather than 767 — see that component for the measurement.
 */
export default function Partnerships({ data }) {
  const [active, setActive] = useState(0);

  return (
    /* ref section.section */
    <section data-block="partnerships" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around">
          <h2 className={cx(H2_PLAIN, H2_MB.base)}>{data.heading}</h2>
        </div>

        {/* ref .rounded-tabs-mint */}
        <div className="relative">
          <MintTabStrip
            tabs={data.tabs.map((tab) => tab.label)}
            active={active}
            onChange={setActive}
            label={data.heading}
            idPrefix="global-partnerships"
            spacing="wide"
            skin="atlas"
          />

          {/* ref .tab-content-mint — pt56 (40 at <=767) and **18px/1.5**, which the
              cells inherit */}
          <div className="relative pt-14 text-[18px] leading-[1.5] max-md:pt-10">
            {data.tabs.map((tab, i) => (
              /* ref .w-tab-pane */
              <div
                key={tab.label}
                role="tabpanel"
                id={`global-partnerships-panel-${i}`}
                aria-labelledby={`global-partnerships-tab-${i}`}
                hidden={i !== active}
              >
                <LogoGrid logos={tab.logos} size="sm576" cols={i === 0 ? 'sm576' : 'fixed'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
