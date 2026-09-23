import { cx } from '@/lib/cx';
import ZoomSlider from '@/components/Life/ZoomSlider';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from './ui';

/**
 * "ISDI in Motion" — port of reference/schools/isdi/index.php:3024-3127.
 *
 *   div.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading)
 *               > .motion-card-wrapper > .swiper.zoom-slider > 17 x .motion-card
 *
 * The slider is the ATLAS `.zoom-slider` — same Swiper options in ISDI's
 * footer.php and a byte-identical "Zoom Slider Small" block in its header.php —
 * so it reuses `components/Life/ZoomSlider` unchanged.
 *
 * Card (`data-wf--portrait-card-b--variant="isdi"`), measured:
 *                     >=768px                         <=767px
 *   .motion-card      340 x 480, r16, clipped         305 x 430
 *   .mc-text-wrap     pinned bottom, p32               same
 *   .card-text        inline-block, #ec1376, white,    same
 *                     24px/1.2, 500, p4/10
 *
 * One commented-out "Studio Day" card in the markup is not rendered; the
 * remaining cards (duplicates included) keep their authored order.
 */
export default function Motion({ data }) {
  return (
    <div data-block="motion" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB}>{data.sub}</div>
      </div>

      {/* ref .motion-card-wrapper */}
      <div className="mt-14 max-md:mt-5">
        <ZoomSlider label={data.heading}>
          {data.cards.map((card, i) => (
            /* ref .motion-card.swiper-slide.width-motion (isdi variant) */
            <div
              key={i}
              className="relative h-[480px] w-[340px] overflow-hidden rounded-2xl leading-[0] max-md:h-[430px] max-md:w-[305px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                width={340}
                height={480}
                alt={card.alt}
                loading="lazy"
                decoding="async"
                className="inline-block h-full w-full max-w-full object-cover align-middle"
              />
              {/* ref .mc-text-wrap */}
              <div className="absolute inset-x-0 bottom-0 p-8">
                {/* ref .card-text (isdi variant) */}
                <div className="inline-block bg-[#ec1376] px-2.5 py-1 text-[24px] font-medium leading-[1.2] text-white">
                  {card.title}
                </div>
              </div>
            </div>
          ))}
        </ZoomSlider>
      </div>
    </div>
  );
}
