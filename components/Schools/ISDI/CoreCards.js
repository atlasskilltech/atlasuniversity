import withBreaks from '@/lib/withBreaks';

/**
 * `.common-flex > N x .new-core-card` — a photograph with its caption laid over the
 * bottom of it, no scrim: the artwork carries its own dark lower half.
 *
 *   .common-flex > .new-core-card > (img.core-image,
 *     .core-text-wrapper > (.n-core-num, .n-core-title))
 *
 * Extracted from `SummerSchool/WhatIs` when /atlas-isdi-advantage turned out to open
 * with the same row. Measured identical on both pages at 1440 / 768 / 390:
 *   row       flex, wrap, gap 24, justify-start, items-center
 *   card      396 wide (a `width: 396%` clamped by `max-width: 396px` — the
 *             reference's own typo), h355, r16, clipped; fills the container at 390
 *   image     100% x 100%; `object-fit: cover` only at <=479
 *   caption   absolute at the bottom, p 0/32/28/32
 *   number    `.n-core-num` 24px/1.5 600 white
 *   title     `.n-core-title` 24px/1.5 400 white
 *
 * The two pages differ only in what sits above the row and in how many cards there
 * are (6 on the Summer School pages, 9 here), so this takes `cards` and nothing else.
 */
export default function CoreCards({ cards }) {
  return (
    /* ref .common-flex */
    <div className="flex flex-wrap items-center justify-start gap-6 text-white">
      {cards.map((card, i) => (
        /* ref .new-core-card */
        <div
          key={`${i}-${card.title}`}
          className="relative h-[355px] w-full max-w-[396px] overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image.src}
            srcSet={card.image.srcSet}
            sizes={card.image.sizes}
            width={card.image.width}
            height={card.image.height}
            alt={card.image.alt}
            loading="lazy"
            decoding="async"
            className="inline-block h-full w-full max-w-full align-middle max-sm:object-cover"
          />
          {/* ref .core-text-wrapper */}
          <div className="absolute inset-x-0 bottom-0 px-8 pb-7">
            {/* ref .n-core-num */}
            <div className="text-[24px] font-semibold text-white">{card.number}</div>
            {/* ref .n-core-title */}
            <div className="text-[24px] text-white">{withBreaks(card.title)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
