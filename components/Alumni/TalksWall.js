import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Alumni Talks" — `atlas-alumni-corner.php:79-104`:
 * `section.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading,
 *   .duplicate-grid-wrapper > .grid-gallery-flex.mrgtp > 4 x .grid-column.sm >
 *   2 x .grid-card-atlas > img.insta-image-rect)`.
 *
 * Not `Campus/HangoutZones`' wall: no caption, the cards are `.grid-card-atlas` (radius 32/0,
 * margin-bottom 24), the wrapper is `.duplicate-grid-wrapper` rather than the scrolling
 * `.instagram-wrapper.mobile-vert-scroll`, and the columns turn into rows at 767, not 540.
 *
 * Measured on production at 1440 / 991 / 767 / 540 / 479 / 390:
 *                        >=768                         <=767
 *   .grid-gallery-flex   row, nowrap, gap 24,          wrap, space-between, gap 0,
 *                        items start, margin-top 56    margin-top 0
 *   .grid-column.sm      column, space-between, gap 2, row, nowrap, gap 16, stretch,
 *                        items start; shrinks with its width 100%; margin-top 24 at <=479
 *                        photographs (292 each at 1440)
 *   .grid-card-atlas     the photograph's own size     flex none, 300 x 234
 *                        (292 x 520 …), margin-bottom 24 margin-bottom 16, photo cover at 0 0
 *
 * Below 768 each column is a row of two 300px cards plus a 16px gap — 616px — so wherever the
 * container is narrower than that (<=659px) the second card runs past it and the section's
 * `overflow: hidden` clips it, exactly as production renders. That is the reference's layout,
 * reproduced; the page itself does not overflow.
 *
 * `.h2-tag.isdi` is Poppins 400 and 36px from 991 down, as on the homepage's Thought Leadership.
 */
export default function TalksWall({ data }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16.isdi */}
        <h2 className={`mb-4 font-poppins font-normal max-lg:text-5xl max-lg:leading-[1.2] max-md:mb-2 ${H2}`}>{data.heading}</h2>
        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{data.sub}</div>
        {/* ref .duplicate-grid-wrapper > .grid-gallery-flex.mrgtp */}
        <div className="mt-14 flex flex-nowrap items-start gap-6 max-md:mt-0 max-md:flex-wrap max-md:justify-between max-md:gap-0">
          {data.columns.map((column, c) => (
            /* ref .grid-column.sm */
            <div
              key={c}
              className="flex flex-col items-start justify-between gap-[2px] max-md:w-full max-md:flex-row max-md:items-stretch max-md:gap-4 max-sm:mt-6"
            >
              {column.map((src) => (
                /* ref .grid-card-atlas */
                <div
                  key={src}
                  className="relative mb-6 overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:mb-4 max-md:h-[234px] max-md:w-[300px] max-md:flex-none"
                >
                  {/* ref img.insta-image-rect */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" className="block h-auto max-w-full object-cover max-md:h-full max-md:w-full max-md:object-left-top" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
