import { successContent } from '@/lib/successContent';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Beliefs that power our success" — port of
 * `success-stories-atlas.php:36-100` (`div#our-beliefs.section > .container >
 * (h1.h2-tag, .swiper.common-swiper.mrgtp0 > 8 x .atlas-card-type-b)`).
 *
 * Eight photo cards, each with its caption sitting over the bottom-left of the
 * image. The same `.common-swiper` initialiser as every other slider on the
 * site, so it is the shared `Carousel`; `.mrgtp0` only removes the padding a
 * `.common-swiper-full` would have had, which `Carousel` never adds.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                          >=768px                     <=767px
 *   .atlas-card-type-b     396 x 500, radius 32px 0,   width 100% (of the
 *                          clipped                     auto-width slide, so
 *                                                      still 396)
 *   .at-cd-ty-b-wrap       inset auto 0 0, full box,   padding 24
 *                          column, justify-end,
 *                          padding 24 50 24 24, z 11
 *   .at-cd-ty-b-text       28px/1.5, 500, #fff         20px
 *   .at-cd-ty-b-image      100% x 100%, cover
 *
 * The heading is an `<h1>` in the reference. Rendered as `<h2>` here: the page
 * already has the hero's `<h1>` and a second one would be a document-outline
 * bug, not a design property — nothing in the stylesheet keys off the tag.
 */

export default function Beliefs() {
  const { beliefs } = successContent;

  return (
    /* ref div#our-beliefs.section */
    <div id="our-beliefs" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h1.h2-tag */}
        <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{beliefs.heading}</h2>
      </div>

      {/* ref .swiper.common-swiper.mrgtp0 — a sibling of .container, so the
          track bleeds to the viewport edge the way `overflow: visible` does */}
      <Carousel>
        {beliefs.cards.map((card) => (
          /* ref .atlas-card-type-b */
          <div
            key={card.image.src}
            className="relative h-[500px] w-[396px] overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-white"
          >
            {/* ref img.at-cd-ty-b-image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.src}
              alt={card.image.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />

            {/* ref .at-cd-ty-b-wrap */}
            <div className="absolute inset-x-0 bottom-0 z-[11] flex h-full w-full flex-col items-start justify-end p-6 pr-[50px] max-md:pr-6">
              {/* ref .at-cd-ty-b-text */}
              <div className="text-[28px] font-medium leading-[1.5] max-md:text-[20px]">
                {withBreaks(card.text)}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
