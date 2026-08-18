import { lifeContent } from '@/lib/lifeContent';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Your Growth is Our Mission" — port of `life-at-atlas.php:600-671`
 * (`section#student-welfare.section > (.container > .h2-tag.mrg24,
 *   .atlas-blue-wrapper > .container > (.blue-desc-wrap > .blue-desc-text,
 *   .zoom-slider-wrap > .swiper.zoom-slider-lg > 3x .slider-card-wrapper))`).
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .blue-desc-wrap          row, space-between,         padding-top 40
 *                            align-start, padding-top 56 (column + gap 8 <=479)
 *   .blue-desc-text          24px/1.5, #fff              18px
 *   .zoom-slider-wrap        padding-top 56              same
 *   .slider-card-wrapper     800 x 475, radius 32/0,     width 100%
 *     (atlas variant)        clipped
 *   .slide-content-a         inset 0, column, justify    padding 0 20 20
 *                            end, #00263700 -> #040404cc,
 *                            padding 0 0 50 40
 *   .slide-title-a           32px, 500, #fff,            24px
 *                            line-height 0.5 with a
 *                            12px #5cbdca underline
 *   .slide-description-a     18px/1.5, max-width 70%,    14px, pt 8
 *                            padding-top 16
 *   .slide-image-a           100% x 100%, cover          same
 *
 * `.slide-title-a`'s `line-height: 0.5` plus a 12px bottom border is the
 * design, not a slip: the bar is what separates the title from the paragraph.
 *
 * The welfare cards carry `data-slider-card-a-bg` and a script that applies it
 * to `.slider-card-a` — a class none of them has — so the attribute is dead and
 * neither it nor its image is ported.
 */
export default function StudentWelfare() {
  const { welfare } = lifeContent;

  return (
    /* ref section#student-welfare.section */
    <section id="student-welfare" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg24 */}
        <h2 className={`mb-6 ${H2}`}>{welfare.heading}</h2>
      </div>

      {/* ref .atlas-blue-wrapper */}
      <div className="bg-atlas-footer pb-14 text-white max-md:pb-10">
        {/* ref .container */}
        <div className={CONTAINER}>
          {/* ref .blue-desc-wrap */}
          <div className="flex items-start justify-between pt-14 text-white max-md:pt-10 max-sm:flex-col max-sm:gap-2">
            {/* ref .blue-desc-text */}
            <div className="max-w-full flex-1 text-2xl text-white max-md:text-lg">
              {welfare.text}
            </div>
          </div>

          {/* ref .zoom-slider-wrap */}
          <div className="pt-14">
            <ZoomSliderLg label={welfare.heading}>
              {welfare.cards.map((card) => (
                /* ref .slider-card-wrapper (atlas variant) */
                <div
                  key={card.title}
                  className="relative block h-[475px] w-full items-end overflow-hidden rounded-tl-[32px] rounded-br-[32px]"
                >
                  {/* ref img.slide-image-a */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image.src}
                    srcSet={card.image.srcSet}
                    sizes="(max-width: 767px) 100vw, 800px"
                    alt={card.image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                  {/* ref .slide-content-a */}
                  <div className="absolute inset-0 z-[1] flex flex-col items-start justify-end bg-[linear-gradient(#00263700,#040404cc)] pb-[50px] pl-10 max-md:px-5 max-md:pb-5">
                    {/* ref .slide-title-a (atlas variant) */}
                    <div className="border-b-[12px] border-atlas-cyan text-[32px] font-medium leading-[0.5] text-white max-md:text-[24px]">
                      {card.title}
                    </div>
                    {/* ref .slide-description-a */}
                    <div className="max-w-[70%] pt-4 text-[18px] leading-[1.5] text-white max-md:pt-2 max-md:text-[14px]">
                      {card.text}
                    </div>
                  </div>
                </div>
              ))}
            </ZoomSliderLg>
          </div>
        </div>
      </div>
    </section>
  );
}
