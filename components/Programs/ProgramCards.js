import SecondaryButton from '@/components/ui/SecondaryButton';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';

/**
 * "Find the Program That Fits Your Ambition" — port of
 * `ug-programs-atlas.php:78-223`
 * (`div.section > .container > (h2.h2-tag.mrg16, h2.sub-heading.mrgbtm32,
 *   .common-flex-16-wrap > 6 x .pg-card-ugdx > .program-card-a >
 *     (img.pg-image-atlas-pro, .pg-details-atlas > (h3.pg-title-atlas,
 *      .course-txt, .pg-cont > (.pg-title-sm, .pg-list-wrap-sm), .btn-wraper)))`).
 *
 * Six discipline cards: a photograph, a title, a short lead, a "Key areas:" row
 * of three labels separated by small white squares, and a pill linking to that
 * discipline's own programme list. `data`-driven because
 * `pg-programs-atlas.php` and `programs-list-integrated.php` carry the same
 * block with their own cards.
 *
 * ── The grid is flex-wrap, not a breakpoint ───────────────────────────────
 * `.common-flex-16-wrap` is `flex-wrap: wrap; gap: 16px` over a **fixed-width**
 * card, so the column count falls out of the arithmetic rather than a media
 * query: two 544px cards plus the 16px gap need 1104px, which the container
 * only has at 1280 and up. At 1100 the container is 976 and the cards go
 * one-up on their own. The one thing that *is* a media query is the alignment,
 * which centres the row at <=767.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px            <=767px          <=479px
 *   .common-flex-16-wrap     wrap, gap 16,      justify/align
 *                            start              centre
 *   .pg-card-ugdx            544 wide,          400 wide         350 wide
 *                            radius 32px 0, clipped
 *   .program-card-a          flex column, #2c57b7, white,
 *                            relative, clipped  min-height 310
 *   .pg-image-atlas-pro      100% x 234,        100% x 150
 *                            object-cover, min-height matching
 *   .pg-details-atlas        flex column, #2c2c79, padding 32     padding 24
 *   h3.pg-title-atlas        24px/700, mb 8     20px
 *   .course-txt              16px, mb 32        mb 20            14px
 *   .pg-cont                 mb 32
 *   .pg-title-sm             16px/600, pb 14    14px
 *   .pg-list-wrap-sm         flex wrap, gap 8, align centre
 *   .pg-list                 16px               12px             14px
 *   .rect-white              6x6 white square, no radius
 *   .btn-wraper              margin-top auto — the pill is pinned to the
 *                            bottom of the column, which is why cards of
 *                            different copy length still line their buttons up
 *
 * `.program-card-a`'s own `#2c57b7` is only visible behind the image; the
 * details panel below it paints `#2c2c79` over the rest. Both are declared and
 * both are reproduced.
 */
export default function ProgramCards({ data }) {
  return (
    /* ref div.section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{data.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm32 — an <h2> upstream, so it carries
            Webflow's base `margin: 20px 0 10px`, which SUB_H2_MRGBTM32
            restates on a <div> */}
        <div className={SUB_H2_MRGBTM32}>{data.subheading}</div>

        {/* ref .common-flex-16-wrap */}
        <div className="flex flex-wrap items-start justify-start gap-4 max-md:items-center max-md:justify-center">
          {data.cards.map((card, i) => (
            /* ref .pg-card-ugdx */
            <div
              key={`${i}-${card.title}`}
              className="h-[745px] max-h-[745px] w-full max-w-[544px] overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:h-[625px] max-md:max-h-[580px] max-md:max-w-[400px] max-sm:h-[690px] max-sm:max-h-[692px] max-sm:max-w-[350px]"
            >
              {/* ref .program-card-a */}
              <div className="relative flex h-full w-full flex-none flex-col items-start justify-start gap-0 overflow-hidden bg-[#2c57b7] text-white max-md:min-h-[310px]">
                {/* ref img.pg-image-atlas-pro */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image.src}
                  srcSet={card.image.srcSet}
                  sizes="(max-width: 767px) 100vw, 610.9722290039062px"
                  alt={card.image.alt}
                  loading="lazy"
                  className="h-full max-h-[234px] min-h-[234px] w-full object-cover align-baseline max-md:max-h-[150px] max-md:min-h-[150px]"
                />

                {/* ref .pg-details-atlas */}
                <div className="flex w-full flex-1 flex-col items-start justify-start bg-[#2c2c79] p-8 max-md:p-6">
                  {/*
                    ref h3.pg-title-atlas. One card on /programs/pg-programs-atlas
                    wraps its title in a `<strong>`; the heading is already
                    `font-weight: 700` and Webflow's normalize gives `strong` a
                    flat `bold`, so the reference paints 700. Preflight's
                    `strong { font-weight: bolder }` would resolve that against
                    the 700 parent and render **900**, so the explicit
                    `font-bold` is required.
                  */}
                  <h3 className="mb-2 w-auto flex-none text-2xl font-bold leading-[1.2] text-white max-md:text-xl max-md:leading-[1.2]">
                    {card.titleStrong ? (
                      <strong className="font-bold">{withBreaks(card.title)}</strong>
                    ) : (
                      withBreaks(card.title)
                    )}
                  </h3>

                  {/* ref .course-txt — some cards carry an authored <br /> */}
                  <div className="mb-8 text-base leading-[1.5] text-white max-md:mb-5 max-sm:text-sm">
                    {withBreaks(card.text)}
                  </div>

                  {/* ref .pg-cont */}
                  <div className="mb-8">
                    {/* ref .pg-title-sm */}
                    <div className="pb-[14px] text-base font-semibold leading-[1.2] text-white max-md:text-sm max-md:leading-[1.2]">
                      {data.areasLabel}
                    </div>

                    {/* ref .pg-list-wrap-sm */}
                    <div className="flex flex-wrap items-center justify-start gap-2">
                      {card.areas.flatMap((area, j) => [
                        /* ref .rect-white — a 6x6 square between each pair.
                           Emitted as a flat sibling, because both it and the
                           label are flex children of the same `gap: 8px` row. */
                        ...(j > 0
                          ? [<div key={`rect-${j}`} className="h-1.5 w-1.5 bg-white" />]
                          : []),
                        /* ref .pg-list */
                        <div
                          key={`area-${j}-${area}`}
                          className="text-base leading-[1.5] text-white max-md:text-xs max-sm:text-sm"
                        >
                          {area}
                        </div>,
                      ])}

                      {/*
                        ref the three empty `<div class="pg-list"></div>` each
                        list ends with. They are zero-height, but they are still
                        flex children of a `gap: 8px` row, so they are rendered
                        rather than filtered out — the same call `GridGallery`
                        and the testimonial `.stname` already make.
                      */}
                      {Array.from({ length: data.emptyAreas ?? 0 }, (unused, j) => (
                        <div key={`empty-${j}`} />
                      ))}
                    </div>
                  </div>

                  {/* ref .btn-wraper — `display: inline-block`, so it shrinks to
                      the pill, and `margin-top: auto` pins it to the bottom of
                      the column */}
                  <div className="mt-auto inline-block">
                    <SecondaryButton href={card.button.href} variant="atlas">
                      {card.button.label}
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
