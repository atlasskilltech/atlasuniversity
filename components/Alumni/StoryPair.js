import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * `section.section > .container > .about-story-wrapper > (.abt-cont > (h2.h2-tag.mrg32,
 * .abt-text), img.about-image-rect.atlas)` — /atlas-alumni-corner "The ATLAS Alumni Connect"
 * (`atlas-alumni-corner.php:31-40`) and "SPRECT: Super Connect" (`:213-222`).
 *
 * The 30% / calc(70% - 40px) pair `Life/YourDost` and ISDI's `StoryPair` render, here with the
 * `.atlas` image: radius 32px 0 at every width. `Life/YourDost` carries a process strip under the
 * pair and ISDI's version sets the ISDI heading face, so this page keeps its own two-line copy.
 *
 * Measured on production at 1440 / 991 / 768 / 479 / 390:
 *   .about-story-wrapper   flex, space-between, align-items stretch, gap 32 → wrap, gap 0,
 *                          18px at <=767
 *   .abt-cont              flex none, width 30% (372.6 at 1440), 18px/1.5 → 100%, 16px/1.5
 *   h2.h2-tag.mrg32        44px/1.2 500, mb 32 → 36px at <=767 (the compound margin holds)
 *   img                    flex none, calc(70% - 40px), cover, stretched to the copy's height
 *                          → width auto (its own ratio under max-width 100%), margin-top 40
 */
export default function StoryPair({ data }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .about-story-wrapper */}
        <div className="flex items-stretch justify-between gap-8 max-md:flex-wrap max-md:gap-0 max-md:text-[18px] max-md:leading-[1.5]">
          {/* ref .abt-cont */}
          <div className="w-[30%] flex-none text-[18px] leading-[1.5] max-md:w-full max-md:text-base">
            {/* ref h2.h2-tag.mrg32 */}
            <h2 className={`mb-8 ${H2}`}>{withBreaks(data.heading)}</h2>
            {/* ref .abt-text */}
            <div>{data.text}</div>
          </div>
          {/* ref img.about-image-rect.atlas */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image.src}
            srcSet={data.image.srcSet}
            sizes={data.image.sizes}
            alt={data.image.alt}
            loading="lazy"
            className="block w-[calc(70%-40px)] max-w-full flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] object-cover max-md:mt-10 max-md:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
