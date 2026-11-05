'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import LogoGrid from '@/components/ui/LogoGrid';
import MintTabStrip from '../Home/MintTabStrip';
import { CONTAINER, H2, H2_MB, SECTION, SUB_MRGBTM } from './ui';

/**
 * "Global University Collaborations" (`success-snapshot/index.php`, block 10).
 *
 *   div#w-node-….section > .container#w-node-… > (h2.h2-tag.mrg16.isdi,
 *     .sub-heading.mrgbtm, .rounded-tabs-mint > (.tabs-menu-mint > 5 x
 *       a.tab-roundmint-tab-1.isdi, .tab-content-mint > 5 x .w-tab-pane >
 *         .w-layout-layout.logos-grid > N x .cell-company))
 *
 * The strip is the shared `MintTabStrip` on its default `isdi` skin (black idle,
 * white on #d20158 current) and its `wide` spacing — the bare `.tabs-menu-mint`,
 * with no `.less-space`. The panels are the shared `ui/LogoGrid` on its default
 * cell (215x85, 150 and auto-height at <=767); all five `#w-node-…` rules give
 * four columns above 767 and two below, so none of them needs the `cols` prop.
 *
 * Webflow opens on the pane its LINK marks current, which is "Tab 4" — the first
 * in source order here, so the two agree.
 *
 * The section and its container carry `#w-node-…` ids whose only rule is
 * `grid-template-columns` on a block box. Inert, so no id is emitted.
 */
export default function Collaborations({ data }) {
  const [active, setActive] = useState(0);

  return (
    <div data-block="collaborations" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB_MRGBTM}>{data.lead}</div>

        {/* ref .rounded-tabs-mint */}
        <div>
          <MintTabStrip
            tabs={data.tabs.map((t) => t.label)}
            active={active}
            onChange={setActive}
            spacing="wide"
            label={data.heading}
            idPrefix="collaborations"
          />
          {/* ref .tab-content-mint — pt56, 18px, and pt40 at <=767 */}
          <div
            role="tabpanel"
            id={`collaborations-panel-${active}`}
            aria-labelledby={`collaborations-tab-${active}`}
            className="pt-14 text-[18px] max-md:pt-10"
          >
            <LogoGrid logos={data.tabs[active].logos} />
          </div>
        </div>
      </div>
    </div>
  );
}
