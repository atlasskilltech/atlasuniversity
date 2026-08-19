import { map } from '@/lib/internationalisationContent';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "With ATLAS, the world is within your reach" — port of
 * `atlas-internationalisation.php:464-469`
 * (`section.section > .container > (h2.h2-tag.mrg16,
 *   .center-image-full-wrap.mrgtp > img.center-image-full)`).
 *
 * A heading over a full-width world map.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                                 >=768px             <=767px
 *   .center-image-full-wrap.mrgtp margin 56 0 5,      margin-top 40
 *                                 no radius, clipped
 *   .center-image-full            100% wide, relative object-fit contain,
 *                                                     height auto
 *
 * The image keeps its own ratio at every width — the wrapper has no height of
 * its own. Its `srcset` names `65-plus.webp` twice, at 1080w and 1237w; that is
 * the reference's own markup and is transcribed as written.
 */
export default function WorldMap() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{map.heading}</h2>

        {/* ref .center-image-full-wrap.mrgtp */}
        <div className="relative mb-[5px] mt-14 overflow-hidden max-md:mt-10">
          {/* ref img.center-image-full */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={map.image.src}
            srcSet={map.image.srcSet}
            sizes={map.image.sizes}
            alt={map.image.alt}
            loading="lazy"
            className="relative block w-full max-md:h-auto max-md:object-contain"
          />
        </div>
      </div>
    </section>
  );
}
