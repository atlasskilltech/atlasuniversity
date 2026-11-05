'use client';

import { advantagesContent } from '@/lib/advantagesContent';
import PillTabs from '@/components/ui/PillTabs';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Be in the Middle of Mumbai - and Ahead of the Curve" — port of
 * `atlas-advantages.php:170-192` (`section.section > .container >
 * (h2.h2-tag.mrg16, h2.sub-heading.mrgbtm, .rounded-tabs-mint >
 *  (.tabs-menu-mint.less-space, .tab-content-mint.padtp32 > 4 x img))`).
 *
 * Four sector tabs, each panel a single full-width map. The widget is the
 * shared `PillTabs` on its default `less` spacing — this page's first two tab
 * sets carry `.less-space`, and only the "Strongly Industry Oriented" set uses
 * the plain wide strip.
 *
 * `.tab-content-mint.padtp32` is padding-top 32 rather than the base 56.
 */
export default function MumbaiTabs() {
  const { mumbai } = advantagesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{mumbai.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm — rendered as a <div>: it is a lead, not a
            heading, and the page already has its <h1> */}
        <div className={SUB_H2_MRGBTM}>{mumbai.subheading}</div>

        {/* ref .rounded-tabs-mint */}
        <PillTabs
          idPrefix="mumbai"
          label={mumbai.heading}
          contentClassName="relative pt-8 text-lg"
          tabs={mumbai.tabs.map((tab) => ({
            label: tab.label,
            render: () => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={tab.image.src}
                srcSet={tab.image.srcSet}
                sizes={tab.image.sizes ?? '(max-width: 1242px) 100vw, 1242px'}
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
