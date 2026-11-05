'use client';

import { campusContent } from '@/lib/campusContent';
import PillTabs from '@/components/ui/PillTabs';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Study in the Middle of Mumbai's Momentum" — port of
 * `campus-atlas.php:49-76` (`section#campus-learn.section.extraspace >
 * .container > (h2.h2-tag.mrg16, h2.sub-heading.mrgbtm, .rounded-tabs-mint)`).
 *
 * Five tabs over one map each. The strip is the same Webflow widget the
 * homepage testimonials and the About page's Recognition use, so it comes from
 * the shared `PillTabs` untouched — measured identical here: 40px tall pills,
 * 20px inset, 18px/500 with a `#5cbdca` fill on the current one, 16px below
 * 768px, the strip bleeding 61px past the container and scrolling horizontally.
 *
 * ── What this section adds ────────────────────────────────────────────────
 *   .section.extraspace     padding-top 120 (>=768px), 40 below; bottom 60/40
 *   .tab-content-mint       `.padtp32` -> padding-top 32 at every width
 *   h2.sub-heading.mrgbtm   an <h2> upstream, so it also carries Webflow's
 *                           default h2 margins (20 top / 10 bottom) above
 *                           768px. Rendered as a <div> here — the page already
 *                           has an <h1> and this is not a heading — with those
 *                           margins reproduced explicitly.
 */
export default function StudyInMumbai() {
  const { learn } = campusContent;

  return (
    /* ref section#campus-learn.section.extraspace */
    <section id="campus-learn" className={`${SECTION} pt-[120px] max-md:pt-10`}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{learn.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm */}
        <div className={`mb-2.5 mt-5 max-md:mt-0 ${SUB_INNER_MRGBTM}`}>{learn.subheading}</div>

        {/* ref .rounded-tabs-mint > (.tabs-menu-mint.less-space, .tab-content-mint.padtp32) */}
        <PillTabs
          idPrefix="campus-learn"
          label={learn.heading}
          contentClassName="relative pt-8 text-lg"
          tabs={learn.tabs.map((tab) => ({
            label: tab.label,
            render: () => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={tab.image.src}
                srcSet={tab.image.srcSet}
                sizes="(max-width: 1242px) 100vw, 1242px"
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
