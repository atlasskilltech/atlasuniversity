import { CONTAINER, SECTION } from '../Home/ui';
import withBreaks from '@/lib/withBreaks';
import IconHeading from '../IconHeading';
import { BLUE_CLR_TEXT, COMMON_WRAPPER } from './ui';

/**
 * #8 "Skills for India 2050 (Indian Knowledge Systems)" — the shortest section on
 * the page (`atlas-isdi-advantage/the-isdi-advantage/index.php:1386-1401`).
 *
 *   section#future-skills.section >
 *     .icon-heading (its `.icon-main-title` carries id="tailored-pathways")
 *     .container > .common-wrapper >
 *       (.blue-clr-text, .center-image-full-wrap.mrgtp > img)
 *
 * No carousel, no blue wrapper, one line of copy over one photograph. The section's
 * own id is what the page's sticky menu links as "Future Skills".
 */
export default function FutureSkills({ data }) {
  return (
    /* ref section#future-skills.section */
    <section id="future-skills" data-block="future" className={SECTION}>
      <IconHeading num={data.icon.num} title={data.icon.title} titleId={data.icon.titleId} size="lg" />

      <div className={CONTAINER}>
        <div className={COMMON_WRAPPER}>
          {/* ref .blue-clr-text */}
          <div className={BLUE_CLR_TEXT}>{withBreaks(data.text)}</div>

          {/* ref .center-image-full-wrap.mrgtp */}
          <div className="relative mb-[5px] mt-14 overflow-hidden max-md:mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image.src}
              srcSet={data.image.srcSet}
              sizes={data.image.sizes}
              alt={data.image.alt}
              loading="lazy"
              decoding="async"
              className="w-full max-w-full align-middle"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
