import { campusContent } from '@/lib/campusContent';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "A campus built to learn, live & thrive" — port of
 * `campus-atlas.php:75-117` (`section#overview-campus.section > .container >
 * (h2.h2-tag, .grid-gallery-flex.sm.atlas > 3x .grid-column.sm >
 *  2x .inst-img-wrap)`).
 *
 * Six photographs in a clipped `32px 0` frame, each captioned over a scrim.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .grid-gallery-flex.sm    row, gap 2, align-start,     wrap, gap 2,
 *     .atlas                 radius 32/0, clipped         space-between
 *   .grid-column.sm          column, gap 2,               row, gap 16, stretch,
 *                            space-between                width 100%, h 250
 *                                                         (margin-top 24 <=479)
 *   .inst-img-wrap           intrinsic                    width 50%
 *   .insta-image-rect        object-cover                 width 300 (capped by
 *                                                         max-width), h 100%,
 *                                                         object-position
 *                                                         top left
 *   .inst-text-wrap          bottom half, #fff0 ->        same
 *                            #00000080, padding 0 30 30
 *   .inst-cont               24px/1.5, #fff               18px
 *
 * Above 768px the columns carry no width at all: they are flex items sized by
 * their photographs' intrinsic widths and shrunk proportionally to fit, and the
 * photographs keep their own aspect ratios, which is why the two images in a
 * column are different heights. That mechanism is reproduced rather than
 * approximated with thirds — the images are the reference's own files, so the
 * browser arrives at the reference's numbers on its own.
 */
export default function CampusOverview() {
  const { overview } = campusContent;

  return (
    /* ref section#overview-campus.section */
    <section id="overview-campus" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag */}
        <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{overview.heading}</h2>

        {/* ref .grid-gallery-flex.sm.atlas */}
        <div
          className="flex items-start gap-[2px] overflow-hidden rounded-tl-[32px] rounded-br-[32px]
                     max-md:flex-wrap max-md:justify-between"
        >
          {overview.columns.map((column, index) => (
            /* ref .grid-column.sm */
            <div
              key={column[0].label}
              className="flex flex-col items-start justify-between gap-[2px]
                         max-md:h-[250px] max-md:w-full max-md:flex-row max-md:items-stretch max-md:gap-4
                         max-sm:mt-6"
              /* the reference gives every column the same 24px top margin below
                 480px, including the first — reproduced, not tidied */
              data-column={index}
            >
              {column.map((item) => (
                /* ref .inst-img-wrap */
                <div key={item.label} className="relative max-md:w-1/2">
                  {/* ref img.insta-image-rect */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    loading="lazy"
                    className="object-cover max-md:h-full max-md:w-[300px] max-md:object-left-top"
                  />

                  {/* ref .inst-text-wrap */}
                  <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-start bg-gradient-to-b from-white/0 to-black/50 px-[30px] pb-[30px]">
                    {/* ref .inst-cont */}
                    <div className="text-2xl text-white max-md:text-lg">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
