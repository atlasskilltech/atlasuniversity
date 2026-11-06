import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Health Facilities" — `section#health-facility.section > .container > (h2.h2-tag,
 * .grid-gallery-flex.sm.atlas > 2 x .grid-column.sm > 2 x .inst-img-wrap)`. Measured:
 *
 *                       >=768px                       <=767px                  <=479px
 *   h2.h2-tag           margin-bottom 56              32
 *   .grid-gallery-flex  row, gap 2, radius 32 0,      wrap, space-between      same
 *                       clipped
 *   .grid-column        column, gap 2, half the row   row, gap 16, 100% x 250  + margin-top 24
 *   .insta-image-rect   full column width, own 4:3,   250 tall, cover, positioned
 *                       cover centred                 at 0 0 (top-left crop)
 *   .inst-text-wrap     the bottom half, transparent → rgba(0,0,0,.5) — painted even though its
 *                       caption is commented out upstream
 *
 * ── One reference defect, not reproduced ──────────────────────────────────
 * Below 768 the reference pins the photograph to `width: 300px` inside a cell that is wider than that
 * from ~660px up, so a 20px sliver of the gradient shows on white beside each photograph (320 vs 300
 * at 700px). Here the photograph fills its cell; at and below ~660px, where the cell is narrower than
 * 300 anyway, the two render identically.
 */
export default function HealthFacilities({ health }) {
  return (
    /* ref section#health-facility.section */
    <section id={health.id} className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag */}
        <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{health.heading}</h2>

        {/* ref .grid-gallery-flex.sm.atlas */}
        <div className="flex items-start gap-0.5 overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:flex-wrap max-md:justify-between">
          {health.columns.map((column, i) => (
            /* ref .grid-column.sm */
            <div
              key={i}
              className="flex min-w-0 flex-1 basis-0 flex-col items-start justify-between gap-0.5
                         max-md:h-[250px] max-md:w-full max-md:flex-none max-md:basis-auto max-md:flex-row max-md:items-stretch max-md:gap-4
                         max-sm:mt-6"
            >
              {column.map((src) => (
                /* ref .inst-img-wrap */
                <div key={src} className="relative w-full max-md:min-w-0 max-md:flex-1">
                  {/* ref img.insta-image-rect */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" className="w-full object-cover max-md:h-[250px] max-md:object-[0%_0%]" />
                  {/* ref .inst-text-wrap — empty, still painting its gradient */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 flex h-1/2 w-full items-end bg-[linear-gradient(rgba(255,255,255,0),rgba(0,0,0,0.5))]"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
