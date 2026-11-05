import { cx } from '@/lib/cx';
import { SUB_H2_MRGBTM } from '@/components/Home/SectionHead';
import { CONTAINER, H2, H2_MB } from '../Home/ui';
import CoreCards from '../CoreCards';

/**
 * "What is ISDI Summer School?" —
 *
 *   section.section.extraspace > .container > (h2.h2-tag.mrg16.isdi, h2.sub-heading.mrgbtm,
 *     .common-flex > 6 x .new-core-card > (img.core-image, .core-text-wrapper >
 *       (.n-core-num, .n-core-title)))
 *
 * A photograph with its caption laid over the bottom of it — no scrim, the artwork carries
 * its own dark lower half.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   section           `.extraspace`: 50/0/50/0 like every ISDI section
 *   lead              `h2.sub-heading.mrgbtm` — a `<h2>`, so Webflow's own
 *                     `h2 { margin: 20px 0 10px }` applies: `SUB_H2_MRGBTM`
 *   row               flex, wrap, gap 24, centred
 *   card              396 wide (a `width: 396%` clamped by `max-width: 396px` — the
 *                     reference's own typo), h355, r16, clipped
 *   image             100% x 100%; `object-fit: cover` only at <=479
 *   caption           absolute at the bottom, p 0/32/28/32
 *   number            24px/1.5 600 white
 *   title             24px/1.5 white
 */
export default function WhatIs({ data }) {
  return (
    <section data-block="what-is" className="block overflow-hidden py-[50px]">
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        {/*
          ref h2.sub-heading.mrgbtm — an `<h2>`, so it carries Webflow's own
          `h2 { margin: 20px 0 10px }`: the 20 collapses against the heading's 16 (4px of
          extra gap) and the 10 is added below, which is the 14px this section was short.
          Rendered as a div with those margins restated, as `SUB_H2_MRGBTM` does.
        */}
        <div className={SUB_H2_MRGBTM}>{data.sub}</div>

        {/* ref .common-flex > 6 x .new-core-card — the row /atlas-isdi-advantage
            opens with too, so it lives in `../CoreCards` and both pages render it */}
        <CoreCards cards={data.cards} />
      </div>
    </section>
  );
}
