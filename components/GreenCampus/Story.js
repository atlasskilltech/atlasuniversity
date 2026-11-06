import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "The Story Behind ATLAS" — `section.section > .container > (h2.h2-tag.mrg32,
 * .about-story-wrapper > (.abt-cont > .abt-text, .about-image-wrap-atlas > img.about-image-atlas))`.
 *
 * The /about-us section of the same name puts a YouTube embed where this page puts a photograph, and
 * the page's own `<style>` re-declares the row, so it is this page's own component. Measured:
 *
 *                            >=768px                          <=767px
 *   .about-story-wrapper     flex, space-between, stretch,    wrap
 *                            gap 32
 *   .abt-cont                30%, flex none, 18px/1.5         100%, 16px/1.5
 *   .about-image-wrap-atlas  the rest of the row              100%
 *   img.about-image-atlas    its own ratio, square corners    margin-top 40, radius 32 0
 *
 * The photograph is NOT stretched: at 768 the copy is taller (459) and the image keeps its 463x273,
 * at 1440 the image is taller (493) and the copy column stretches to it.
 */
export default function Story({ story }) {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg32 */}
        <h2 className={`mb-8 ${H2}`}>{story.heading}</h2>

        {/* ref .about-story-wrapper */}
        <div className="flex items-stretch justify-between gap-8 max-md:flex-wrap">
          {/* ref .abt-cont > .abt-text */}
          <div className="w-[30%] flex-none text-left text-lg leading-[1.5] max-md:w-full max-md:text-base">
            {withBreaks(story.text)}
          </div>

          {/* ref .about-image-wrap-atlas */}
          <div className="min-w-0 flex-1 max-md:w-full max-md:flex-none">
            {/* ref img.about-image-atlas */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={story.image.src}
              srcSet={story.image.srcSet}
              sizes={story.image.sizes}
              alt={story.image.alt}
              loading="lazy"
              className="w-full max-md:mt-10 max-md:rounded-tl-[32px] max-md:rounded-br-[32px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
