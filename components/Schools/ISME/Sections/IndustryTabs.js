'use client';

import { useState } from 'react';
import Carousel from '@/components/Carousel/Carousel';
import PillTabs, { PillTabStrip } from '@/components/ui/PillTabs';
import LogoGrid from '@/components/ui/LogoGrid';
import TertiaryTabStrip from '@/components/ui/TertiaryTabStrip';
import CardTypeF from '@/components/ui/CardTypeF';
import { CONTAINER } from '@/components/Home/SectionHead';

/**
 * The two tabbed widgets of the ISME industry-centric page — the ATLAS
 * /advantages/atlas-industry-centric-approach sections under the ISME sheet (components/Industry/
 * RecruitmentPartners, IndustryEvents), driven by the ISME section data.
 */

/* `.rounded-tabs-mint` (plain `.tabs-menu-mint`: gap 48, -73 bleed, px70) over `.tab-content-mint`
   (pt56 / 40) holding a `.logos-grid` per tab */
export function LogoTabs({ item, label }) {
  /* department-of-finance authors the widget with no menu: only the active pane, no strip */
  if (item.noMenu)
    return (
      <div className={item.pad56 ? 'relative pt-14 text-lg' : 'relative pt-14 text-lg max-md:pt-10'}>
        <LogoGrid logos={item.tabs[0].logos} size={item.cellSize} />
      </div>
    );
  return (
    <PillTabs
      idPrefix="isme-recruiters"
      label={label}
      spacing="wide"
      tone="mint"
      contentClassName="relative pt-14 text-lg max-md:pt-10"
      tabs={item.tabs.map((tab) => ({
        label: tab.label,
        render: () => <LogoGrid logos={tab.logos} size={item.cellSize} />,
      }))}
    />
  );
}

/* `.tertiary-tabs.mrgtp` (mt56) whose panes each hold a `.swiper.common-swiper.mrgtp-32` of
   `.card-type-f` cards. Production opens on the tab marked `w--current` — on this page "2024", the
   second. The carousel is a sibling of `.container` so the track bleeds (`.tertiary-tabs-content`
   sits 4px up). */
/* `panes` — each tab's carousel rendered by the server (9 Core Advantages' `.port-card-m` panes on
   `.mrgtp-little`); without it the industry page's `.card-type-f` carousel is drawn here. The strip's
   56px top margin is `.tertiary-tabs.mrgtp`, which 9 Core Advantages does not carry. */
export function YearSwipers({ item, label, panes }) {
  const [active, setActive] = useState(item.current ?? 0);
  const pane = item.tabs[active];
  return (
    <>
      <div className={CONTAINER}>
        <div className={(item.mods || ['mrgtp']).includes('mrgtp') ? 'relative mt-14' : 'relative'}>
          <TertiaryTabStrip tabs={item.tabs} active={active} onSelect={setActive} label={label} idPrefix="isme-years" bar="black" />
        </div>
      </div>
      <div className="relative -top-1" role="tabpanel" id={`isme-years-panel-${active}`} aria-labelledby={`isme-years-tab-${active}`}>
        {panes ? (
          panes[active]
        ) : (
          <Carousel key={active} autoplay={false} arrowStyle="isme" bullets="inline" className="pt-8">
            {pane.cards.map((card, i) => (
              <CardTypeF key={`${active}-${i}`} card={card} variant="isme" />
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
}

/* `.rounded-tabs-mint` whose panes each hold a bleeding slider (9 Core Advantages' Global Immersions):
   the strip sits in the container, the active pane's slider beside it. `tabs` is `[{ label, content }]`,
   the content rendered by the server and only the active one mounted. */
export function TabPanes({ tabs, label, idPrefix, contentClassName, bare = false, tone = 'mint' }) {
  const [active, setActive] = useState(0);
  return (
    <div className="relative">
      {/* `bare` — the widget already sits in the container (the electives grid) */}
      <div className={bare ? undefined : CONTAINER}>
        <PillTabStrip tabs={tabs} active={active} onChange={setActive} label={label} idPrefix={idPrefix} tone={tone} />
      </div>
      <div className={contentClassName} role="tabpanel" id={`${idPrefix}-panel-${active}`} aria-labelledby={`${idPrefix}-tab-${active}`}>
        {tabs[active].content}
      </div>
    </div>
  );
}
