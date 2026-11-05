'use client';

import { lifeContent } from '@/lib/lifeContent';
import PillTabs from '@/components/ui/PillTabs';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Beyond campus, within reach" — port of `life-at-atlas.php:574-599`
 * (`section#life-in-mumbai.section > .container > (h2.h2-tag.mrg16,
 *   h2.sub-heading.mrgbtm32, .rounded-tabs-mint)`).
 *
 * The same Webflow tab widget, the same five labels and the same five maps as
 * /campus-atlas "Study in the Middle of Mumbai's Momentum", so it is the shared
 * `PillTabs` and the images are the ones that page already brought in locally.
 * Only the heading pair above it differs.
 *
 * `.sub-heading.mrgbtm32` is the plain sub-heading at weight 400 with a 32px
 * bottom padding — 20px below 992px, 16px below 768px.
 */
export default function BeyondCampus() {
  const { mumbai } = lifeContent;

  return (
    /* ref section#life-in-mumbai.section */
    <section id="life-in-mumbai" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{mumbai.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm32 — rendered as a <div>: the page already
            has an <h1> and this is not a heading */}
        <div className="mb-2.5 mt-5 pb-8 pr-[50px] text-2xl font-normal leading-[1.4] max-md:pb-5 max-md:pt-5 max-md:pr-0 max-md:text-base max-md:leading-[1.5] max-sm:pb-4">
          {mumbai.subheading}
        </div>

        {/* ref .rounded-tabs-mint > (.tabs-menu-mint.less-space,
            .tab-content-mint.padtp32) */}
        <PillTabs
          idPrefix="life-in-mumbai"
          label={mumbai.heading}
          contentClassName="relative pt-8 text-lg"
          tabs={mumbai.tabs.map((tab) => ({
            label: tab.label,
            render: () => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={tab.image.src}
                srcSet={tab.image.srcSet}
                sizes="(max-width: 1279px) 100vw, 1242px"
                alt={tab.image.alt}
                loading="lazy"
                className="w-full"
              />
            ),
          }))}
        />
      </div>
    </section>
  );
}
