import { location } from '@/lib/homeContent';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Location" — port of reference/index.php:2535-2546.
 *
 * Structurally the same block as About ATLAS
 * (`section.section > .container > .about-story-wrapper >
 *   (.abt-cont, .about-image-wrap-atlas)`), with two differences:
 *
 *   - the h2 has no `mrg*` modifier, so it keeps `.h2-tag`'s base 56px bottom
 *     margin instead of About's 32px
 *   - a `.about-title-sub-atlas` (24px, `#000`, 32px below) sits between the
 *     heading and the body copy
 *
 * Same load-bearing details as About: `.about-story-wrapper` gains
 * `font-size: 18px` at <=767px because the image is on a line box there, and
 * the image is `display: block` rather than upstream's
 * `inline-block; vertical-align: super` — see AboutAtlas for why.
 */
export default function Location() {
  const { heading, subtitle, paragraphs, image, alt } = location;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .w-layout-blockcontainer.container.w-container */}
      <div className={CONTAINER}>
        {/* ref .about-story-wrapper */}
        <div className="flex items-stretch justify-between gap-8 overflow-visible max-md:flex-wrap max-md:gap-0 max-md:text-lg">
          {/* ref .abt-cont */}
          <div className="w-[30%] flex-none text-left text-lg max-md:w-full max-md:text-base">
            {/* ref .h2-tag — no `mrg*` modifier, so the base 56px margin applies,
                dropping to the max-767 rule's 32px */}
            <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{heading}</h2>

            {/* ref .about-title-sub-atlas */}
            <div className="pb-8 text-2xl text-black">{subtitle}</div>

            {/* ref .abt-text — one element upstream, paragraphs split by a
                doubled <br /> */}
            <div className="text-[#333]">
              {paragraphs.map((text, i) => (
                <span key={text.slice(0, 24)}>
                  {i > 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* ref .about-image-wrap-atlas */}
          <div className="relative w-[calc(70%-40px)] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:w-full">
            {/* ref .about-image-atlas */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="block h-full w-full flex-none object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
