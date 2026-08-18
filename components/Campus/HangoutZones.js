import { campusContent } from '@/lib/campusContent';
import { cx } from '@/lib/cx';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Hangout zones" — port of `campus-atlas.php:470-515`
 * (`section.section > .container > (.head-wrap > .tt-wrap,
 *   .instagram-wrapper.mobile-vert-scroll > .grid-gallery-flex >
 *   4x .grid-column > 2x .img-wrap)`).
 *
 * Eight captioned photographs that go through three layouts:
 *
 *                       >=768px              541-767px          <=540px
 *   .grid-gallery-flex  row, nowrap,         wrap, gap 0,       row, nowrap,
 *                       gap 24, align-start  space-between      column-gap 24,
 *                                                                stretch
 *   .grid-column        column, gap 24,      width 48%,         row, width auto
 *                       space-between        column-gap 0       (margin-top 24
 *                                                                below 480)
 *   .img-wrap           intrinsic            300 wide           320 x 400,
 *                                                                min-width 320
 *   .insta-image-rect   object-cover         width 300,         width 300,
 *                       50% 50%              object top left    height 100%
 *   .insta-text-atlas   18px/1.5, 600,       14px/1.2,          same
 *                       padding 8 16,        padding 4 16,
 *                       bottom 32            bottom 8
 *
 * The <=540px layout is `.mobile-vert-scroll` from `header.php:479-533` — the
 * fourth of the reference's five breakpoints — which turns the whole block into
 * a horizontal scroller of eight 320px tiles.
 *
 * `.insta-text-atlas.mrgbt16` sits at `bottom: 16px`, and because it is a
 * two-class selector it keeps that value below 768px where the one-class rule
 * would otherwise drop the rest to 8px. Three of the eight tiles carry it.
 *
 * ── One reference behaviour not reproduced ────────────────────────────────
 * `.instagram-wrapper` is `height: 100%` + `overflow: scroll`, so the block is
 * a full viewport tall regardless of its contents: ~255px of dead space above
 * 768px, and a vertically scrolling 1000px window over 1561px of tiles between
 * 541 and 767px. Same stray full-height rule skipped elsewhere in this rebuild;
 * the wrapper here is as tall as its tiles and scrolls horizontally only where
 * the reference means it to.
 */
export default function HangoutZones() {
  const { hangout } = campusContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap > .tt-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch max-md:justify-start">
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2#sports-facilities.h2-tag.mrg16 */}
            <h2 id="sports-facilities" className={`mb-4 max-md:mb-2 ${H2}`}>
              {hangout.heading}
            </h2>
            {/* ref .sub-heading */}
            <div className={SUB_INNER}>{hangout.subheading}</div>
          </div>
        </div>

        {/* ref .instagram-wrapper.mobile-vert-scroll */}
        <div className="mt-14 max-md:mt-8 max-vsm:overflow-x-auto">
          {/* ref .grid-gallery-flex */}
          <div
            className="flex flex-nowrap items-start gap-6
                       max-md:flex-wrap max-md:justify-between max-md:gap-0
                       max-vsm:flex-nowrap max-vsm:items-stretch max-vsm:justify-between max-vsm:gap-x-6"
          >
            {hangout.columns.map((column) => (
              /* ref .grid-column */
              <div
                key={column[0].label}
                className="flex flex-col items-start justify-between gap-6
                           max-md:w-[48%] max-md:gap-x-0
                           max-vsm:w-auto max-vsm:flex-row
                           max-sm:mt-6"
              >
                {column.map((tile) => (
                  /* ref .img-wrap */
                  <div
                    key={tile.label}
                    className="relative max-vsm:h-[400px] max-vsm:min-w-[320px]"
                  >
                    {/* ref img.insta-image-rect */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tile.image.src}
                      alt={tile.image.alt}
                      loading="lazy"
                      className="object-cover max-md:h-full max-md:w-[300px] max-md:object-left-top"
                    />

                    {/* ref .insta-text-atlas (+ .mrgbt16) */}
                    <div
                      className={cx(
                        'absolute left-0 bg-atlas-footer px-4 py-2 text-[18px] font-semibold leading-[1.5] text-white',
                        'max-md:py-1 max-md:text-[14px] max-md:leading-[1.2]',
                        tile.tight ? 'bottom-4' : 'bottom-8 max-md:bottom-2',
                      )}
                    >
                      {tile.label}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
