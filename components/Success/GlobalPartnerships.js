'use client';

import { successContent } from '@/lib/successContent';
import PillTabs from '@/components/ui/PillTabs';
import LogoGrid from '@/components/ui/LogoGrid';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Our Global Partnerships" — port of `success-stories-atlas.php:832-1065`
 * (`section.section > .container > (.head-wrap.top > (h2.h2-tag,
 *   a.btn-primary), .rounded-tabs-mint > 5 tabs of .logos-grid)`).
 *
 * The same widget as "Our Recruitment Partners" — shared `PillTabs` on the
 * `wide` spacing over the shared `LogoGrid` — with a "Know More" call to
 * action on the heading row.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                     >=768px                  <=767px            <=479px
 *   .head-wrap.top    row, space-between,      + margin-bottom    justify
 *                     align-start              16, align-stretch  space-around
 */
export default function GlobalPartnerships() {
  const { partners } = successContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        {/* `.head-wrap.top` at <=767 keeps `.head-wrap`'s `flex-flow: column`
            — it overrides only justify/align — so the heading goes full width
            with the button beneath it */}
        <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around">
          {/* ref h2.h2-tag */}
          <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{partners.heading}</h2>

          {/* ref a.btn-primary */}
          <PrimaryButton href={partners.button.href}>{partners.button.label}</PrimaryButton>
        </div>

        {/* ref .rounded-tabs-mint */}
        <PillTabs
          idPrefix="global-partnerships"
          label={partners.heading}
          spacing="wide"
          contentClassName="relative pt-14 text-lg max-md:pt-10"
          tabs={partners.tabs.map((tab) => ({
            label: tab.label,
            render: () => <LogoGrid logos={tab.logos} />,
          }))}
        />
      </div>
    </section>
  );
}
