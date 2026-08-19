'use client';

import { recruiters } from '@/lib/industryContent';
import PillTabs from '@/components/ui/PillTabs';
import LogoGrid from '@/components/ui/LogoGrid';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Our Recruitment Partners" — port of
 * `atlas-industry-centric-approach.php:106-329`
 * (`section.section > .container > (h2.h2-tag, .rounded-tabs-mint >
 *   (.tabs-menu-mint > 6 x a.tab-roundmint-tab-1.atlas, .tab-content-mint >
 *    6 x .w-tab-pane > .logos-grid))`).
 *
 * The same widget /success-stories-atlas carries, with this page's six sectors
 * and 41 marks: the shared `PillTabs` on its `wide` spacing (the plain
 * `.tabs-menu-mint` — gap 48, bleed -73, padding 70 — not `.less-space`), over
 * the shared `LogoGrid`.
 *
 * `.tab-content-mint` is the base class here too: padding-top 56, 40 below
 * 768px.
 *
 * The markup opens on "Tab 4", which is the first tab in document order
 * (Technology); the numbering is Webflow's, not an ordering.
 */
export default function RecruitmentPartners() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag */}
        <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{recruiters.heading}</h2>

        {/* ref .rounded-tabs-mint */}
        <PillTabs
          idPrefix="industry-recruiters"
          label={recruiters.heading}
          spacing="wide"
          contentClassName="relative pt-14 text-lg max-md:pt-10"
          tabs={recruiters.tabs.map((tab) => ({
            label: tab.label,
            render: () => <LogoGrid logos={tab.logos} />,
          }))}
        />
      </div>
    </section>
  );
}
