'use client';

import { partners } from '@/lib/internationalisationContent';
import PillTabs from '@/components/ui/PillTabs';
import LogoGrid from '@/components/ui/LogoGrid';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Our Global Partnerships" — port of
 * `atlas-internationalisation.php:470-994`
 * (`section.section > .container > (.head-wrap.top > h2.h2-tag,
 *   .rounded-tabs-mint > (.tabs-menu-mint > 6 x a.tab-roundmint-tab-1.atlas,
 *    .tab-content-mint > 6 x .w-tab-pane > .logos-grid))`).
 *
 * Six region tabs over 141 partner marks — 67 distinct, because "All" repeats
 * every region's. The widget is the shared `PillTabs` on its `wide` spacing
 * (the plain `.tabs-menu-mint`: gap 48, bleed -73, padding 70), over the shared
 * `LogoGrid` on `size="wide"` — this page's inline `<style>` gives
 * `.grid-img-wrap` 265x100, and 180 wide with `padding: 0 10px` below 768px,
 * rather than the 215x85 every other page renders.
 *
 * `.tab-content-mint` is the base class: padding-top 56, 40 below 768px.
 *
 * The markup opens on "Tab 6", which is the first tab in document order (All);
 * the numbering is Webflow's, not an ordering.
 *
 * `.head-wrap.top` holds only the heading here — there is no second slot.
 */
export default function GlobalPartnerships() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around">
          {/* ref h2.h2-tag */}
          <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{partners.heading}</h2>
        </div>

        {/* ref .rounded-tabs-mint */}
        <PillTabs
          idPrefix="global-partnerships"
          label={partners.heading}
          spacing="wide"
          contentClassName="relative pt-14 text-lg max-md:pt-10"
          tabs={partners.tabs.map((tab) => ({
            label: tab.label,
            render: () => <LogoGrid logos={tab.logos} size="wide" />,
          }))}
        />
      </div>
    </section>
  );
}
