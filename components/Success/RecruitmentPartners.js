'use client';

import { successContent } from '@/lib/successContent';
import PillTabs from '@/components/ui/PillTabs';
import LogoGrid from '@/components/ui/LogoGrid';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Our Recruitment Partners" — port of `success-stories-atlas.php:358-581`
 * (`section.section > .container > (h2.h2-tag, .rounded-tabs-mint >
 *   (.tabs-menu-mint > 6 x a.tab-roundmint-tab-1.atlas, .tab-content-mint >
 *    6 x .w-tab-pane > .logos-grid))`).
 *
 * Six sector tabs over a grid of recruiter logos. The widget is the shared
 * `PillTabs`, on its `wide` spacing: this page uses the plain
 * `.tabs-menu-mint` (gap 48, bleed -73, padding 70) rather than the
 * `.less-space` modifier every earlier page used.
 *
 * `.tab-content-mint` here is the base class — padding-top 56, dropping to 40
 * below 768px — not the `.atlas` variant.
 *
 * The reference's markup opens on "Tab 4", which is the first tab in document
 * order (Technology); the numbering is Webflow's, not an ordering.
 */
export default function RecruitmentPartners() {
  const { recruiters } = successContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag */}
        <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{recruiters.heading}</h2>

        {/* ref .rounded-tabs-mint */}
        <PillTabs
          idPrefix="recruitment-partners"
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
