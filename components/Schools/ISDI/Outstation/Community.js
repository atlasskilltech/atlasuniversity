import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION } from '../Home/ui';

/**
 * "Where students become a community" —
 * reference/schools/isdi/isdi-for-outstation.php:594-607.
 *
 *   section.section > .container-15 > (h2.h2-tag.mrg16.isdi, .sub-heading-3,
 *     .instagram-wrapper > .grid-gallery-flex > 4 x .grid-column > 4 x img.insta-image-rect.isdi)
 *
 *   .instagram-wrapper  mt56 (32 <=767)
 *   .grid-gallery-flex  flex row, gap 24; wraps `space-between` with gap 0 at <=767
 *   .grid-column        flex column, gap 24, space-between; width 48% at <=767, mt24 at <=479
 *   .insta-image-rect.isdi  w-full, natural aspect, object-cover, r16 (the generic `.isdi`)
 *
 * Not `../PhotoGallery`: that is `.insta-image` with captions and two photos a
 * column; this is four plain `.insta-image-rect` photographs a column. The
 * `.instagram-wrapper`'s `overflow: scroll` is not reproduced — the grid wraps at
 * <=767 and never overflows, so the scrollbars it would paint are the documented
 * `PhotoGallery` deviation.
 */
const SUB_3 =
  'pr-[50px] text-[24px] font-light leading-[1.4] max-md:pr-0 max-md:pb-5 max-md:text-[16px] max-md:leading-[1.5]';

export default function Community({ data }) {
  return (
    <section data-block="community" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB_3}>{withBreaks(data.sub)}</div>
        {/* ref .instagram-wrapper */}
        <div className="mt-14 max-md:mt-8">
          {/* ref .grid-gallery-flex */}
          <div className="flex gap-6 max-md:flex-wrap max-md:justify-between max-md:gap-0">
            {data.columns.map((col, ci) => (
              /* ref .grid-column */
              <div
                key={ci}
                className="flex flex-1 flex-col items-start justify-between gap-6 max-md:w-[48%] max-md:flex-none max-sm:mt-6"
              >
                {col.map((card, i) => (
                  /* ref img.insta-image-rect.isdi — at the photograph's own width (capped
                     to the column), left-aligned: the column is `align-items: flex-start`,
                     so a photo narrower than its column is NOT stretched (above 768 the
                     columns shrink to ~294 and the photo fills them; at <=767 the 48%
                     column is wider than the photo, which stays at its natural width) */
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={i}
                    src={card.image.src}
                    alt={card.image.alt || ''}
                    loading="lazy"
                    /* at <=767 `.insta-image-rect` is a fixed `width: 300px` (capped to
                       the column by `max-width: 100%`), object-cover pinned top-left */
                    className="h-auto max-w-full rounded-2xl align-middle max-md:w-[300px] max-md:object-cover max-md:object-left-top"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
