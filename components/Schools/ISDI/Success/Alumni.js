import GridGallery from '@/components/ui/GridGallery';
import { cx } from '@/lib/cx';
import LogoStrip from '../LogoStrip';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from './ui';

/**
 * "Startups founded by ATLAS ISDI Alumni" (`success-snapshot/index.php`, block 12).
 *
 *   div.section > .w-layout-blockcontainer.container > (h2.h2-tag.mrg16.isdi,
 *     .sub-heading, .instagram-wrapper.mobile-vert-scroll.mar-0 > .grid-gallery >
 *       8 x .grid-card > (img.grid-image-card.isdi, .grid-txt-wrapper >
 *         (.grid-card-name.isdi, .title-txt-grid)), .slide-wrap > 8 x img.logo-img)
 *
 * The wall is the shared `ui/GridGallery` on its plain card — this one carries no
 * `.h2-tag`, so it keeps the gallery's own mt56 / mt40 and no bottom margin — and
 * the strip below it is the shared `../LogoStrip`, inside the container rather
 * than beside it.
 *
 *   .grid-card-name.isdi   20px/24 700 white (the base is the mint #07f6a0)
 *   .title-txt-grid        18px/32 500 white; 16px/24 at <=767
 */
export default function Alumni({ data }) {
  return (
    <div data-block="alumni" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB}>{data.lead}</div>

        {/* ref .instagram-wrapper.mobile-vert-scroll.mar-0 */}
        <div className="h-full w-auto overflow-scroll">
          <GridGallery
            cards={data.cards}
            /* ref img.grid-image-card.isdi — `border-radius: 16px`. All 24 of this
               page's gallery images carry `.isdi` and only `./Universities` was
               passing it, so these eight rendered square corners. The card is a
               declared height, so the gap moved nothing and no height diff, text
               diff or screenshot mean could see it; it was found by the shared
               `GridGallery` check once that started reporting each image's radius.
               Fixed 2026-10-27. */
            round16
            name="z-[3] text-[20px] font-bold leading-6 text-white"
            caption="z-[3] text-[18px] font-medium leading-8 text-white max-md:text-base max-md:leading-6"
          />
        </div>

        {/* ref .slide-wrap */}
        <LogoStrip logos={data.logos.map((l) => ({ ...l.image, spaced: l.spaced, sm: l.sm }))} />
      </div>
    </div>
  );
}
