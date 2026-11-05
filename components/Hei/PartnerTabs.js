'use client';

import PillTabs from '@/components/ui/PillTabs';
import LogoGrid from '@/components/ui/LogoGrid';

/**
 * The partner-university tabs — `.rounded-tabs-mint > (.tabs-menu-mint > 5 x
 * a.tab-roundmint-tab-1.atlas, .tab-content-mint > .w-tab-pane > .logos-grid)`. The marks are
 * /success-stories-atlas' files (reused, byte-identical); this page adds their `alt` text and pads
 * Europe, Australia and "Other Global Partners" to 16 cells with empty ones, so it keeps its own
 * data. A client component because `PillTabs` takes render functions.
 */
export default function PartnerTabs({ tabs }) {
  return (
    <PillTabs
      idPrefix="hei-partners"
      label="Partner universities by region"
      contentClassName="relative pt-14 text-lg max-md:pt-10"
      tabs={tabs.map((tab) => ({
        label: tab.label,
        render: () => <LogoGrid logos={tab.logos} />,
      }))}
    />
  );
}
