import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { WeekStrip } from '../SummerSchool/WeekGrid';
import { CONTAINER, H2, H2_MB, SECTION } from '../Home/ui';

/**
 * "A glimpse into your ISDI life" — reference/schools/isdi/isdi-for-outstation.php:714-861.
 *
 *   section.section > .container-15 > (h2.h2-tag.mrg16.isdi, .sub-heading-3.mrgbtm32,
 *     .main-week-wrapper > 7 x .week-grid-main)
 *
 * The seven-column week strip is the shared `WeekStrip` (same cell shapes, heights,
 * artwork and blend modes as /schools/isdi/life@atlas-isdi and the Summer School
 * Admissions page), with this page's own design-studio schedule — its `days[]` were
 * read off production's live DOM because the cell backgrounds are CSS-painted. The
 * heading here is an `h2` + `.sub-heading-3.mrgbtm32`, not the `WeekGrid` default's
 * `.sub-heading-1`, so the strip is rendered directly.
 */
const SUB_3_MB32 =
  'pb-8 pr-[50px] text-[24px] font-light leading-[1.4] max-md:pr-0 max-md:text-[16px] max-md:leading-[1.5]';

export default function Glimpse({ data }) {
  return (
    <section data-block="week" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB_3_MB32}>{withBreaks(data.sub)}</div>
        <WeekStrip days={data.days} />
      </div>
    </section>
  );
}
