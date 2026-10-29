import { cx } from '@/lib/cx';
import LogoStrip from '../LogoStrip';
import { CONTAINER, H2, H2_MB, SECTION, SUB_MRGBTM } from './ui';

/**
 * "Top Recruiters @ ATLAS ISDI" (`success-snapshot/index.php`, block 7).
 *
 *   section.section > (.container#w-node-… > (h2.h2-tag.mrg16.isdi,
 *     .sub-heading.mrgbtm.isdi), .slide-wrap > 26 x img.logo-img._50-r-m)
 *
 * The strip is the shared `../LogoStrip` — Webflow interaction `a-22` over a 5000px
 * flex row, so the 26 marks and their 200px margins overflow it and every one of
 * them shrinks proportionally. One mark also carries `.sm` (`width: 14%`).
 *
 * The container's `#w-node-…` id takes `grid-template-columns: 1fr 1fr 1fr 1fr` from
 * the sheet on a box whose `display` is block — inert, so no id is emitted.
 */
export default function Recruiters({ data }) {
  return (
    <section data-block="recruiters" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB_MRGBTM}>{data.lead}</div>
      </div>

      {/* ref .slide-wrap — a direct child of the section, whose own
          `overflow: hidden` is what clips the 5000px track */}
      <LogoStrip logos={data.logos.map((l) => ({ ...l.image, spaced: l.spaced, sm: l.sm }))} />
    </section>
  );
}
