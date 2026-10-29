import withBreaks from '@/lib/withBreaks';

/**
 * `.motion-card.swiper-slide.width-motion` in its **isdi** variant
 * (`data-wf--portrait-card-b--variant="isdi"`) — a portrait photograph with a
 * pink title plate pinned to the bottom.
 *
 * Extracted from `Home/Motion` ("ISDI in Motion") when /schools/isdi/life@atlas-isdi
 * turned out to render the same card in two of its sections ("Vibes that go viral"
 * and "Service learning and SSR"). Measured identical on both references at
 * 1440 / 768 / 390 before it was shared, and the ISDI homepage re-verified after.
 *
 *   .motion-card…width-motion  340 x 480, r16, clipped, `line-height: 0`
 *                              305 x 430 at <=767
 *   .mc-text-wrap              absolute, bottom 0, padding 32
 *   .card-text                 INLINE-BLOCK #ec1376 plate, white 24px/1.2 500,
 *                              padding 4/10 — the plate is the text's own box, so
 *                              it is only as wide as the title
 *   .card-sub-text             18px/1.2 300 white, padding-top 14
 *
 * `image.width` / `image.height` are optional: the ISDI homepage authors 340x480
 * on its `<img>` and this page authors neither. Both are inert against the
 * `h-full w-full` classes, but they are what the reference has.
 *
 * `title` is optional too. /schools/isdi/events/immersions-&-experiences authors
 * the `.mc-text-wrap` EMPTY on all thirteen of its cards — no `.card-text` plate
 * at all — and the wrap is still rendered, because it is absolutely positioned
 * over the photograph and is what the reference has. Every earlier consumer
 * passes a title, so this is a no-op there.
 *
 * `subtitle` is optional and the homepage's cards author none, so it is a no-op
 * there. On this page it is authored on all twelve "Vibes" cards and on NONE of
 * the nineteen "Service learning" ones — and two of the twelve hold only a
 * zero-width non-joiner, which is an EMPTY line that still takes its own 14px of
 * padding and ~22px of line box. `''` renders that empty box; `null` omits it.
 */
export default function MotionCard({ card }) {
  return (
    /* ref .motion-card.swiper-slide.width-motion (isdi) */
    <div className="relative h-[480px] w-[340px] overflow-hidden rounded-2xl leading-[0] max-md:h-[430px] max-md:w-[305px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        width={card.image.width}
        height={card.image.height}
        alt={card.image.alt}
        loading="lazy"
        decoding="async"
        className="inline-block h-full w-full max-w-full object-cover align-middle"
      />
      {/* ref .mc-text-wrap — authored EMPTY on the Events pages, and still a box */}
      <div className="absolute inset-x-0 bottom-0 p-8">
        {card.title != null && (
          /* ref .card-text (isdi) */
          <div className="inline-block bg-[#ec1376] px-2.5 py-1 text-[24px] font-medium leading-[1.2] text-white">
            {withBreaks(card.title)}
          </div>
        )}
        {card.subtitle != null && (
          /* ref .card-sub-text */
          <div className="pt-3.5 text-[18px] font-light leading-[1.2] text-white">
            {withBreaks(card.subtitle)}
          </div>
        )}
      </div>
    </div>
  );
}
