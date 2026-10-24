import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION } from '../Home/ui';
import IconHeading from '../IconHeading';
import { COMMON_WRAPPER } from './ui';

/**
 * #2 "Location" (`atlas-isdi-advantage/the-isdi-advantage/index.php:201-220`).
 *
 *   section#location.section > (.icon-heading,
 *     .container > .common-wrapper > .about-story-wrapper >
 *       (.abt-cont > (.about-title.isdi-blue, .abt-text), img))
 *
 * Read off the page's own sheet and confirmed by measurement at 1440 / 768 / 390:
 *                          >=768px                        <=767px
 *   .about-story-wrapper   flex, space-between,           flex-flow: wrap, gap 0,
 *                          align-items: stretch, gap 32   font-size 18
 *   .abt-cont              `flex: none`, **width 30%**,   width 100%, 16px
 *                          18px
 *   .about-image-rect.isdi `flex: none`, **width          width auto, margin-top 40
 *                          calc(70% - 40px)**, r16,
 *                          object-fit cover, clipped
 *   .about-title.isdi-blue 24px/1.5 #173a87, pb32         same
 *
 * The two percentage widths are the whole layout: at 1440 they are 372.6 and 829.4
 * against a 1242 container, and because the row is `align-items: stretch` the image
 * takes the text column's height and `object-fit: cover` crops it. Letting the image
 * size itself instead was +584px at 1440 — the text column collapsed to its
 * min-content and the photograph painted at its natural 1238x734.
 *
 * Both the title and the body carry authored `<br>`s — the body has two `<br><br>`
 * pairs, which are real blank lines — so both go through `withBreaks`.
 */
export default function Location({ data }) {
  return (
    /* ref section#location.section */
    <section id="location" data-block="location" className={SECTION}>
      <IconHeading num={data.icon.num} title={data.icon.title} titleId={data.icon.titleId} size="lg" />

      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          {/* ref .about-story-wrapper */}
          <div className="flex items-stretch justify-between gap-8 leading-[1.5] max-md:flex-wrap max-md:gap-0 max-md:text-[18px]">
            {/* ref .abt-cont */}
            <div className="w-[30%] flex-none text-[18px] leading-[1.5] max-md:w-full max-md:text-base max-md:leading-[1.5]">
              {/* ref .about-title.isdi-blue */}
              <div className="pb-8 text-[24px] leading-[1.5] text-[#173a87]">
                {withBreaks(data.title)}
              </div>
              {/* ref .abt-text */}
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
              className="w-[calc(70%-40px)] max-w-full flex-none overflow-hidden rounded-2xl object-cover align-middle max-md:mt-10 max-md:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
