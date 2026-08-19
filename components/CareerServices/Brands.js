'use client';

import { careerServicesContent } from '@/lib/careerServicesContent';
import PillTabs from '@/components/ui/PillTabs';
import LogoGrid from '@/components/ui/LogoGrid';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Brands That Back Our Students" — port of
 * `atlas-career-services.php:36-259` (`section.section.extraspace > .container >
 * (h2.h2-tag, .rounded-tabs-mint > (.tabs-menu-mint, .tab-content-mint >
 *  6 panes of .logos-grid))`).
 *
 * Six sector tabs of recruiter logos — the same widget and the same six labels
 * as /success-stories' "Our Recruitment Partners" and /advantages' "Strongly
 * Industry Oriented", so it is the shared `PillTabs` on `wide` spacing (the
 * plain `.tabs-menu-mint`, not `.less-space`) over the shared `LogoGrid`.
 *
 * `.section.extraspace` is the one thing this section adds: `padding-top: 120px`
 * rather than the usual 60, dropping to 40 below 768px.
 */
export default function Brands() {
  const { brands } = careerServicesContent;

  return (
    /* ref section.section.extraspace */
    <section className="block overflow-hidden pb-[60px] pt-[120px] max-md:py-10">
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag */}
        <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{brands.heading}</h2>

        {/* ref .rounded-tabs-mint */}
        <PillTabs
          idPrefix="brands"
          label={brands.heading}
          spacing="wide"
          contentClassName="relative pt-14 text-lg max-md:pt-10"
          tabs={brands.tabs.map((tab) => ({
            label: tab.label,
            render: () => <LogoGrid logos={tab.logos} />,
          }))}
        />
      </div>
    </section>
  );
}
