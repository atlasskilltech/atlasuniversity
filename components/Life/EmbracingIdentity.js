import { lifeContent } from '@/lib/lifeContent';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Embracing every identity" — port of `life-at-atlas.php:1054-1060`
 * (`section#our-moto.section > .container > (h2.h2-tag.mrg16, .sub-heading,
 *   .center-image-full-wrap.mrgtp > img.center-image-full)`).
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                   <=767px
 *   .center-image-full-wrap    margin 56 top / 5 bottom, margin-top 40
 *     .mrgtp                   clipped
 *   .center-image-full         width 100%, block         object-contain
 */
export default function EmbracingIdentity() {
  const { moto } = lifeContent;

  return (
    /* ref section#our-moto.section */
    <section id="our-moto" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{moto.heading}</h2>
        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{moto.subheading}</div>

        {/* ref .center-image-full-wrap.mrgtp */}
        <div className="relative mb-[5px] mt-14 overflow-hidden max-md:mt-10">
          {/* ref img.center-image-full */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={moto.image.src}
            srcSet={moto.image.srcSet}
            sizes="100vw"
            alt={moto.image.alt}
            loading="lazy"
            className="relative block w-full max-md:h-auto max-md:object-contain"
          />
        </div>
      </div>
    </section>
  );
}
