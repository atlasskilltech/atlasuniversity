'use client';

import { advantagesContent } from '@/lib/advantagesContent';
import SectionHeadWithButton from '@/components/Advantages/SectionHeadWithButton';
import PillTabs from '@/components/ui/PillTabs';
import LogoGrid from '@/components/ui/LogoGrid';
import GridGallery from '@/components/ui/GridGallery';
import { COMMON_WRAPPER } from '@/components/ui/ContentCardB';
import { CONTAINER, SECTION, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Strongly Industry Oriented" — port of `atlas-advantages.php:664-949`
 * (`section.section > .container > (.head-wrap.top, .sub-heading.mrgbtm,
 *   .rounded-tabs-mint > 6 panes of .logos-grid,
 *   .common-wrapper > .instagram-wrapper.mobile-vert-scroll.mar-0 >
 *   .grid-gallery > 8 x .grid-card-atlas)`).
 *
 * Six sector tabs of recruiter logos, then a masonry photo wall — all three
 * pieces already exist:
 *
 *   PillTabs      on `wide` spacing: this set carries the plain
 *                 `.tabs-menu-mint` (gap 48 / bleed -73 / padding 70), unlike
 *                 the two `.less-space` sets earlier on the page.
 *   LogoGrid      `.logos-grid`, measured identical to /success-stories'.
 *   GridGallery   `.grid-gallery`, measured identical; these cards carry no
 *                 `.round` on the image, so the corners stay square.
 *
 * `.instagram-wrapper.mobile-vert-scroll.mar-0` wraps the gallery with
 * `margin-top: 0` and `overflow: scroll`. Its `height: 100%` resolves to `auto`
 * against an auto-height ancestor, so the box is as tall as the wall and the
 * scroll never engages; the wrapper contributes nothing but its zeroed margin
 * here. (It measures a full viewport tall in the *local* reference only, which
 * parses in quirks mode — see CLAUDE.md.)
 */
export default function IndustryOriented() {
  const { industry } = advantagesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <SectionHeadWithButton heading={industry.heading} button={industry.button} />

        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{industry.subheading}</div>

        {/* ref .rounded-tabs-mint */}
        <PillTabs
          idPrefix="industry"
          label={industry.heading}
          spacing="wide"
          contentClassName="relative pt-14 text-lg max-md:pt-10"
          tabs={industry.tabs.map((tab) => ({
            label: tab.label,
            render: () => <LogoGrid logos={tab.logos} />,
          }))}
        />

        {/* ref .common-wrapper > .instagram-wrapper.mobile-vert-scroll.mar-0 */}
        <div className={COMMON_WRAPPER}>
          <GridGallery
            cards={industry.gallery}
            variant="atlas"
            className="mt-0"
            name="z-[3] text-[24px] font-bold leading-6 text-atlas-cyan max-md:text-[20px]"
            caption="z-[3] text-[18px] font-medium leading-8 text-white max-md:text-[16px] max-md:leading-6"
          />
        </div>
      </div>
    </section>
  );
}
