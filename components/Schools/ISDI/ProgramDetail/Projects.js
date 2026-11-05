import { cx } from '@/lib/cx';
import PhotoGallery from '../PhotoGallery';
import { CONTAINER, H2, H2_MB, SECTION, SUB_MRGBTM32 } from '../Home/ui';

/**
 * "Student Projects in Motion" — b-des/accessory-design-&-craft.php:2826-2891.
 *
 *   section.section > .container > h2.h2-tag.mrg16.isdi + .sub-heading.mrgbtm32
 *                                > .instagram-wrapper.mobile-vert-scroll.mar-0
 *                                  > .grid-gallery-flex > 4 x .grid-column
 *
 * The shared `PhotoGallery` wall, on its `isdi-2` caption: no pink plate, a 6px
 * #ec1376 rule under the name, 20px in from both edges and 20px up from the card's
 * bottom edge. `.mar-0` zeroes the wrapper's top margin, which the heading's own
 * `.mrgbtm32` already accounts for.
 */
export default function Projects({ data }) {
  return (
    <section data-block="projects" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB_MRGBTM32}>{data.sub}</div>
        <PhotoGallery columns={data.columns} />
      </div>
    </section>
  );
}
