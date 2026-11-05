'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import LogoGrid from '@/components/ui/LogoGrid';
import MintTabStrip from '../Home/MintTabStrip';
import { CONTAINER, H2, H2_MB, SECTION, SUB_MRGBTM } from '../Home/ui';
import { Runs } from './ui';

/**
 * "Alliances that Power our Future"
 * (`atlas-isdi-advantage/industry-centric-approach.php`, block 4).
 *
 *   section.section > .container >
 *     (h2.h2-tag.mrg16.isdi, .sub-heading.mrgbtm,
 *      .rounded-tabs-mint > (.tabs-menu-mint > 6 x a.tab-roundmint-tab-1.isdi,
 *                            .tab-content-mint > 6 x .w-tab-pane > .logos-grid))
 *
 * The tab links carry the plain `.isdi` skin — white on #d20158 when current —
 * which is `MintTabStrip`'s default, and the strip is `.tabs-menu-mint` with no
 * `.less-space`, so `spacing="wide"`. All six panes hold sixteen cells.
 *
 * `.tab-content-mint` is pt56 (40 at <=767) and 18px/1.5, which the cells inherit.
 */
export default function Alliances({ data }) {
  const [active, setActive] = useState(0);

  return (
    /* ref section.section */
    <section data-block="alliances" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB_MRGBTM}>
          <Runs value={data.sub} />
        </div>

        {/* ref .rounded-tabs-mint */}
        <div className="relative">
          <MintTabStrip
            tabs={data.tabs.map((tab) => tab.label)}
            active={active}
            onChange={setActive}
            label={data.heading}
            idPrefix="alliances"
            spacing="wide"
          />

          {/* ref .tab-content-mint */}
          <div className="relative pt-14 text-[18px] leading-[1.5] max-md:pt-10">
            {data.tabs.map((tab, i) => (
              /* ref .w-tab-pane */
              <div
                key={tab.label}
                role="tabpanel"
                id={`alliances-panel-${i}`}
                aria-labelledby={`alliances-tab-${i}`}
                hidden={i !== active}
              >
                <LogoGrid logos={tab.logos} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
