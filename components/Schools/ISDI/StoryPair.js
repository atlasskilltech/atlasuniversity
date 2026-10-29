import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION } from './Home/ui';

/**
 * The `.about-story-wrapper` pair — a 30% text column beside a
 * `calc(70% - 40px)` photograph.
 *
 *   section.section > .w-layout-blockcontainer.container >
 *     .about-story-wrapper > (.abt-cont > (h2.h2-tag.mrg32.isdi, .abt-text),
 *                             img.about-image-rect.isdi)
 *
 * Measured on production at 1440 / 768 / 390:
 *                          >=768px                        <=767px
 *   .about-story-wrapper   flex, space-between,           flex-flow: wrap, gap 0,
 *                          align-items: stretch, gap 32   font-size 18
 *   .abt-cont              `flex: none`, **width 30%**    width 100%, 16px
 *                          (372.6 at 1440 / 212.4 at 768), 18px
 *   h2.h2-tag.mrg32.isdi   44px/1.2 400 Poppins, mb32     36px (from 991), mb32 —
 *                                                         `.mrg32` is a compound
 *                                                         selector, so it survives
 *                                                         the <=767 `.h2-tag` rule
 *   .abt-text              inherits the page's 18px/1.5   16px/1.5 (from `.abt-cont`)
 *   .about-image-rect.isdi `flex: none`, **width          width auto, margin-top 40;
 *                          calc(70% - 40px)**, r16,       346 x 202.8 at 390, its own
 *                          object-fit cover, clipped      ratio under `max-width: 100%`
 *
 * The two percentage widths are the whole layout: 372.6 and 829.4 against a 1242
 * container, and because the row is `align-items: stretch` the photograph takes the
 * text column's height and `object-fit: cover` crops it. That is the same arithmetic
 * `Advantage/Location` records — but that section wraps the row in a `.common-wrapper`
 * under an `.icon-heading` and titles it with a `.about-title.isdi-blue` rather than
 * an `h2.h2-tag.mrg32.isdi`, so it keeps its own copy of the row.
 *
 * This file was `Startups/Story` until masters-progression turned out to author the
 * identical composition — same wrapper, same two percentage widths, the same
 * `h2.h2-tag.mrg32.isdi` over a bare `.abt-text`, and no `.common-wrapper`. Measured
 * on both references at 1440 / 768 / 390 before it was shared, and the startups page
 * re-verified afterwards. Only the copy and the photograph differ.
 */
/**
 * Three defaulted props, all added for /schools/isdi/life@atlas-isdi's YourDOST
 * pair and all no-ops on the two pages that came first:
 *
 *   bare           that pair sits INSIDE an existing `.section` (block 11 runs the
 *                  wellness tabs, the pair and the process cards together under one
 *                  heading), so it renders neither the section nor the container
 *   marginBottom   `.about-story-wrapper.mrgbtm` — margin-bottom 56
 *   imageRounded   its `img.about-image-rect` carries NO `.isdi`, so it takes no
 *                  16px radius. The only square one in the port.
 */
export default function Story({
  data, bare = false, marginBottom = false, imageRounded = true, block = 'story',
}) {
  const row = (
    <div className={cx(
      'flex items-stretch justify-between gap-8 max-md:flex-wrap max-md:gap-0',
      'max-md:text-[18px] max-md:leading-[1.5]',
      marginBottom && 'mb-14',
    )}
    >
          {/* ref .abt-cont */}
          <div className="w-[30%] flex-none text-left text-[18px] leading-[1.5] max-md:w-full max-md:text-base max-md:leading-[1.5]">
            {/* ref h2.h2-tag.mrg32.isdi */}
            <h2 className={cx(H2, H2_MB.mrg32)}>{withBreaks(data.heading)}</h2>
            {/* ref .abt-text — it declares nothing of its own, so it takes
                `.abt-cont`'s size and the page's #333 */}
            <div>{withBreaks(data.text)}</div>
          </div>

          {/* ref img.about-image-rect.isdi */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image.src}
            srcSet={data.image.srcSet}
            sizes={data.image.sizes}
            alt={data.image.alt}
            loading="lazy"
            decoding="async"
            className={cx(
              'w-[calc(70%-40px)] max-w-full flex-none overflow-hidden object-cover',
              'align-middle max-md:mt-10 max-md:w-auto',
              /* ref img.about-image-rect(.isdi) — the `.isdi` modifier is the radius */
              imageRounded && 'rounded-2xl',
            )}
          />
    </div>
  );

  if (bare) return row;
  return (
    /* ref section.section */
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>{row}</div>
    </section>
  );
}
