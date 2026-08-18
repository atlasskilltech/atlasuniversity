import { lifeContent } from '@/lib/lifeContent';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "The 7 wonders of ATLAS" — port of `life-at-atlas.php:136-236`
 * (`section#student-clubs.section.extraspace > (.container > .h2-tag.mrg24,
 *   .atlas-blue-wrapper > .container > (.common-wrapper > h3.h3-tag,
 *   .blue-desc-text, .swiper.common-swiper-full > 7x .square-card-atlas))`).
 *
 * The heading sits on the page; everything under it sits in a full-bleed indigo
 * band with its own container.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .section.extraspace      padding 120 / 60            40 / 40
 *   .h2-tag.mrg24            44px/1.2, margin-bottom 24  36px
 *   .atlas-blue-wrapper      #41418e, #fff,              padding-bottom 40
 *                            padding-bottom 56
 *   .common-wrapper          padding-top 56              40
 *   .h3-tag                  32px/1.2, 500, mb 32        22px
 *   .blue-desc-text          24px/1.5                    18px
 *   .common-swiper-full      padding-top 56              20
 *   .square-card-atlas       612 wide, radius 32/0,      width 100%
 *                            clipped
 *   .sq-content-a            bottom half, #18429f00 ->   padding 0 18 20
 *                            #000, flex align-end,
 *                            space-between,
 *                            padding 0 32 40
 *   .common-flex.center      row, wrap, align-center,    column-reverse,
 *                            space-between, gap 24       align-start
 *   .sq-title-a              40px/1.2, #fff              32px
 *   .sq-sb-title-a.white     24px/1.4, #fff              18px
 *   .sq-rt-img-a             66 x 66                     same
 *
 * ── One reference bug fixed ───────────────────────────────────────────────
 * `.square-card-atlas` is `width: 100%` below 768px inside a `width: auto`
 * `.swiper-slide`, so between 569 and 767px the percentage resolves against
 * nothing and the card measures a whole viewport — 767px inside a 723px
 * container, overflowing the page. (Below 569px `.common-swiper-full
 * .swiper-slide` becomes `width: 100%` itself and the pair works again.) The
 * card is given the container width explicitly instead, which is the same fix
 * the homepage testimonials already carry for the identical upstream bug.
 */
export default function SevenWonders() {
  const { clubs } = lifeContent;

  return (
    /* ref section#student-clubs.section.extraspace */
    <section id="student-clubs" className={`${SECTION} pt-[120px] max-md:pt-10`}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg24 */}
        <h2 className={`mb-6 ${H2}`}>{clubs.heading}</h2>
      </div>

      {/* ref .atlas-blue-wrapper */}
      <div className="bg-atlas-footer pb-14 text-white max-md:pb-10">
        {/* ref .container */}
        <div className={CONTAINER}>
          {/* ref .common-wrapper */}
          <div className="pt-14 max-md:pt-10">
            {/* ref h3.h3-tag */}
            <h3 className="mb-8 text-[32px] font-medium leading-[1.2] text-white max-md:text-[22px]">
              {clubs.subheading}
            </h3>
          </div>
          {/* ref .blue-desc-text */}
          <div className="max-w-full flex-1 text-2xl text-white max-md:text-lg">{clubs.text}</div>
        </div>

        {/* ref .swiper.common-swiper-full */}
        <Carousel className="pt-14 max-md:pt-5">
          {clubs.cards.map((card) => (
            /* ref .square-card-atlas */
            <div
              key={card.title}
              className="relative w-[612px] overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:w-[calc(100vw-44px)]"
            >
              {/* ref img.sq-image-a */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                srcSet={card.image.srcSet}
                sizes="(max-width: 767px) 100vw, 611px"
                alt={card.image.alt}
                loading="lazy"
                className="w-full"
              />

              {/* ref .sq-content-a */}
              <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-between bg-[linear-gradient(#18429f00,#000)] px-8 pb-10 max-md:px-[18px] max-md:pb-5">
                {/* ref .common-flex.center */}
                <div className="flex w-full flex-row flex-wrap items-center justify-between gap-6 max-md:flex-col-reverse max-md:flex-nowrap max-md:items-start">
                  {/* ref .sq-cont-wrp-a */}
                  <div>
                    {/* ref .sq-title-a */}
                    <div className="text-[40px] leading-[1.2] text-white max-md:text-[32px]">
                      {card.title}
                    </div>
                    {/* ref .sq-sb-title-a.white */}
                    <div className="text-[24px] leading-[1.4] text-white max-md:text-[18px]">
                      {card.subtitle.split('\n').map((line, i) => (
                        <span key={line}>
                          {i > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ref img.sq-rt-img-a */}
                  {card.logo && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={card.logo.src}
                      alt={card.logo.alt}
                      loading="lazy"
                      className="block h-[66px] w-[66px] flex-none"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
