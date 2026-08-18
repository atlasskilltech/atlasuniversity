import { lifeContent } from '@/lib/lifeContent';
import ZoomSlider from '@/components/Life/ZoomSlider';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Vibes that go viral" — port of `life-at-atlas.php:237-327`
 * (`section#fest-culture.section > (.container > (.h2-tag.mrg16,
 *   .black-desc-text), .motion-card-wrapper > .swiper.zoom-slider >
 *   10x .port-card-b)`).
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .black-desc-text         24px/1.5, #000, flex 1      18px
 *   .motion-card-wrapper     margin-top 56               20
 *   .port-card-b (atlas)     340 x 480, radius 32/0, clipped, line-height 0 —
 *                            unchanged at every width: the card sits INSIDE the
 *                            slide, so the `.port-card-b.swiper-slide` rule that
 *                            shrinks the community cards never matches it
 *   .port-card-img-b         100% x 100%, cover          same
 *   .port-card-wrap-b        pinned to the bottom,       same
 *                            padding 32
 *   .card-text-b (atlas)     24px/1.2, 500, #00abbb      same
 *   .card-sub-text-b         18px/1.2, 300, #fff, pt 14  same
 *
 * The strip is a sibling of `.container`, so it spans the viewport; the
 * section's own `overflow: hidden` clips it.
 */
export default function VibesThatGoViral() {
  const { fest } = lifeContent;

  return (
    /* ref section#fest-culture.section */
    <section id="fest-culture" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{fest.heading}</h2>
        {/* ref .black-desc-text */}
        <div className="max-w-full flex-1 text-2xl text-black max-md:text-lg">{fest.text}</div>
      </div>

      {/* ref .motion-card-wrapper */}
      <div className="mt-14 max-md:mt-5">
        <ZoomSlider label={fest.heading}>
          {fest.cards.map((card) => (
            /* ref .port-card-b (atlas variant) */
            <div
              key={card.title}
              className="relative h-[480px] w-[340px] overflow-hidden rounded-tl-[32px] rounded-br-[32px] leading-[0]"
            >
              {/* ref img.port-card-img-b */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                alt={card.image.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />

              {/* ref .port-card-wrap-b */}
              <div className="absolute inset-x-0 bottom-0 p-8">
                {/* ref .card-text-b (atlas variant) */}
                <div className="text-[24px] font-medium leading-[1.2] text-[#00abbb]">
                  {card.title}
                </div>
                {/* ref .card-sub-text-b */}
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
