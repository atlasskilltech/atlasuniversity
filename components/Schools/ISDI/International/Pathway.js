import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';
import { COMMON_WRAPPER, Runs } from './ui';

/**
 * "With ATLAS Pathway, the world is within your reach"
 * (`atlas-isdi-advantage/internationalisation/index.php:144-165`).
 *
 *   section#global-uni-partnership.section > .container-15 > .common-wrapper >
 *     (h2.h2-tag.mrg16.isdi, .sub-heading,
 *      .center-image-full-wrap.mrgtp > img.center-image-full)
 *
 * The frame has no `.isdi` here, so it is square-cornered — and the world map inside
 * it is `width: 100%`, which is why it is 737px tall at 1440 against the YouTube
 * frames' 698.
 *
 * **The reference authors a `.slide-wrap` logo strip under the wrapper and comments
 * it out line by line** (`:153-163`) — the same ten marks the page's own
 * `.logos-swipers` band renders further down. Dead markup; not ported.
 *
 * **The map's `srcset` names one file at four widths.** The reference points all
 * four candidates (500w / 800w / 1080w / 1236w) at the same `65-plus.webp`, so the
 * descriptors do nothing. Transcribed as authored.
 */
export default function Pathway({ data }) {
  return (
    /* ref section#global-uni-partnership.section */
    <section id="global-uni-partnership" data-block="pathway" className={SECTION}>
      {/* ref .container-15 */}
      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
          <div className={SUB}>
            <Runs value={data.sub} />
          </div>

          {/* ref .center-image-full-wrap.mrgtp */}
          <div className="relative mb-[5px] mt-14 overflow-hidden max-md:mt-10">
            {/* ref img.center-image-full */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image.src}
              srcSet={data.image.srcSet}
              sizes={data.image.sizes}
              alt={data.image.alt}
              loading="lazy"
              decoding="async"
              className="relative block w-full max-w-full max-md:h-auto max-md:object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
