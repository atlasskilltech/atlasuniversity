import { lifeContent } from '@/lib/lifeContent';
import ZoomSlider from '@/components/Life/ZoomSlider';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Service learning and SSR" — port of `life-at-atlas.php:800-877`
 * (`section#community-services.section > (.container > (.h2-tag.mrg16,
 *   .sub-heading), .motion-card-wrapper > .swiper.zoom-slider >
 *   11x .motion-card.width-motion)`).
 *
 * The same `.zoom-slider` as "Vibes that go viral" on a slightly different
 * card: `.motion-card` rather than `.port-card-b`, whose caption is `#5cbdca`
 * on no background instead of `#00abbb`.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .motion-card.width-motion 340 x 480, radius 16,       305 x 430
 *     (atlas variant)         clipped, line-height 0
 *                             — the variant asks for `32px 0` but does so from
 *                             inside `:where()`, so the plain three-class rule
 *                             that follows it wins with 16px
 *   .card-image              100% x 100%, cover          same
 *   .mc-text-wrap            pinned to the bottom,       same
 *                            padding 32
 *   .card-text (atlas)       24px/1.2, 500, #5cbdca,     same
 *                            transparent, padding 4 10
 *                            0, padding-left 0
 *   .card-sub-text           18px/1.2, 300, #fff, pt 14  same
 */
export default function ServiceLearning() {
  const { community } = lifeContent;

  return (
    /* ref section#community-services.section */
    <section id="community-services" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{community.heading}</h2>
        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{community.subheading}</div>
      </div>

      {/* ref .motion-card-wrapper */}
      <div className="mt-14 max-md:mt-5">
        <ZoomSlider label={community.heading}>
          {community.cards.map((card) => (
            /* ref .motion-card.swiper-slide.width-motion (atlas variant) */
            <div
              key={card.title}
              className="relative h-[480px] w-[340px] overflow-hidden rounded-2xl leading-[0] max-md:h-[430px] max-md:w-[305px]"
            >
              {/* ref img.card-image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                alt={card.image.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />

              {/* ref .mc-text-wrap */}
              <div className="absolute inset-x-0 bottom-0 p-8">
                {/* ref .card-text (atlas variant) */}
                <div className="block py-1 pr-2.5 text-[24px] font-medium leading-[1.2] text-atlas-cyan">
                  {card.title}
                </div>
                {/* ref .card-sub-text */}
                {card.subtitle && (
                  <div className="pt-3.5 text-[18px] font-light leading-[1.2] text-white">
                    {card.subtitle}
                  </div>
                )}
              </div>
            </div>
          ))}
        </ZoomSlider>
      </div>
    </section>
  );
}
