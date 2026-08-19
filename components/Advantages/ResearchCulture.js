import { advantagesContent } from '@/lib/advantagesContent';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';

/**
 * "A Culture of Inquiry and Innovation" — port of
 * `atlas-advantages.php:1046-1062` (`section.section > .container >
 * (h2.h2-tag.mrg16, h2.sub-heading.mrgbtm32, .about-story-wrapper-ugdx >
 *  (.abt-cont-ugdx-1 > (.abt-text, .common-wrapper > .btn-wraper.hide),
 *   div > img.about-image-atlas))`).
 *
 * A 50/50 split of copy and photograph, vertically centred.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                <=767px
 *   .about-story-wrapper-ugdx  row, space-between,    wrap, gap 0, 18px
 *                              align-centre, gap 32,
 *                              overflow visible
 *   .abt-cont-ugdx-1           width 50%, 18px        width 100%, 16px
 *   .about-image-atlas         100% x 100%, cover,    width auto, radius
 *                              inline-block                32/0, clipped,
 *                                                          margin-top 40
 *
 * ── The button that is not there ──────────────────────────────────────────
 * The markup carries an "Explore Center of Research" `.btn-primary` inside
 * `.btn-wraper.hide`, and `.btn-wraper.hide { display: none }` — so it never
 * renders, its `href` is `#`, and it is not ported. (Verified on the live
 * reference: computed `display: none`, box 0x0.)
 */
export default function ResearchCulture() {
  const { research } = advantagesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{research.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm32 — a lead, not a heading */}
        <div className={SUB_H2_MRGBTM32}>
          {research.subheading}
        </div>

        {/* ref .about-story-wrapper-ugdx */}
        <div className="flex items-center justify-between gap-8 overflow-visible max-md:flex-wrap max-md:gap-0 max-md:text-[18px]">
          {/* ref .abt-cont-ugdx-1 */}
          <div className="w-1/2 flex-none text-[18px] max-md:w-full max-md:text-base">
            {/* ref .abt-text */}
            <div>{withBreaks(research.text)}</div>
          </div>

          {/* ref div > img.about-image-atlas */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={research.image.src}
              srcSet={research.image.srcSet}
              sizes={research.image.sizes}
              alt={research.image.alt}
              loading="lazy"
              className="inline-block h-full w-full flex-none align-super object-cover
                         max-md:mt-10 max-md:w-auto max-md:overflow-hidden
                         max-md:rounded-tl-[32px] max-md:rounded-br-[32px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
