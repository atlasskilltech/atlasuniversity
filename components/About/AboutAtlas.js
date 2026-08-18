import { aboutAtlas } from '@/lib/homeContent';

/**
 * "About ATLAS" — port of reference/index.php:1969-1979
 * (`section.section > .w-layout-blockcontainer.container.w-container >
 *   .about-story-wrapper > (.abt-cont, .about-image-wrap-atlas)`).
 *
 * Static: no links, no buttons, no JavaScript.
 *
 * ── Measured off the reference ────────────────────────────────────────────
 *                          >=768px                    <=767px
 *   section                60px padding               40px
 *   container              1366 max-w, 62/30px inset  22px
 *   .about-story-wrapper   flex row, gap 32,          flex-wrap: wrap, gap 0,
 *                          space-between, stretch     font-size 18 -> 16
 *   .abt-cont              flex-none, width 30%       width 100%
 *   .h2-tag.mrg32          44px/1.2, mb 32            36px, mb 32
 *   .abt-text              inherits 18px/1.5          16px/1.5
 *   .about-image-wrap      calc(70% - 40px),          width 100%
 *                          radius 32px 0, clipped
 *   .about-image-atlas     cover, 100% x 100%,
 *                          inline-block, align super
 *
 * 30% + calc(70% - 40px) + a 32px gap leaves 8px over, which
 * `justify-content: space-between` pushes into the gap — so the visible gutter
 * is 40px, not 32px. Reproduced by keeping the same declarations rather than
 * hard-coding the result.
 */
export default function AboutAtlas() {
  const { heading, paragraphs, image } = aboutAtlas;

  return (
    /* ref section.section */
    <section className="block overflow-hidden py-[60px] max-md:py-10">
      {/* ref .w-layout-blockcontainer.container.w-container */}
      <div className="relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]">
        {/*
          ref .about-story-wrapper. The `font-size: 18px` its max-767 rule adds
          is load-bearing, not decoration: the image is `inline-block` with
          `vertical-align: super`, so once the wrapper wraps, the line-box strut
          of THIS element sets the image's laid-out height (348.5px at 568px,
          vs 320.8px if the strut stayed at the body's 16px).
        */}
        <div className="flex items-stretch justify-between gap-8 overflow-visible max-md:flex-wrap max-md:gap-0 max-md:text-lg">
          {/* ref .abt-cont */}
          <div className="w-[30%] flex-none text-left text-lg max-md:w-full max-md:text-base">
            {/* ref .h2-tag.mrg32 */}
            <h2 className="mb-8 text-6xl font-medium text-[#1a1a1a] max-md:text-5xl max-md:leading-[1.2]">
              {heading}
            </h2>

            {/*
              ref .abt-text — one element upstream, with the two paragraphs
              separated by a doubled <br />. Rendered the same way so the
              blank line keeps the text block's exact height.
            */}
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
            {/*
              ref .about-image-atlas — `object-fit: cover; width: 100%;
              height: 100%`, with the reference's own `sizes="100vw"` and
              w-descriptors kept verbatim so the browser resolves to the same
              file at the same widths.

              One declaration is deliberately changed: upstream the image is
              `display: inline-block; vertical-align: super`, which puts it on a
              line box inside its clipping wrapper. Because `height: 100%` has
              no definite parent height to resolve against, that combination
              lands on a Chrome fallback that adds a font-metric-dependent band
              of empty space under the image — 0px at >=768px but ~40px below,
              inside `overflow: hidden`, where nothing is drawn. `block` gives
              the reference's exact desktop box (488.05px at 1440px) and drops
              only that invisible band on mobile; the visible crop is identical
              either way because `object-fit: cover` fills whatever box it gets.
            */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={image.sizes}
              alt={image.alt}
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
