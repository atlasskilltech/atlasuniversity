import { lifeContent } from '@/lib/lifeContent';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Student Council" — port of `life-at-atlas.php:464-476`
 * (`section#student-council.section > (.container > .h2-tag.mrg24,
 *   .atlas-blue-wrapper > .container > (.blue-desc-wrap > .blue-desc-text.f18,
 *   .center-image-full-wrap.mrgtp > img.center-image-full))`).
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                   <=767px
 *   .atlas-blue-wrapper        #41418e, padding-bottom 56  40
 *   .blue-desc-wrap            row, space-between,       padding-top 40
 *                              align-start, pt 56        (column + gap 8 <=479)
 *   .blue-desc-text.f18        18px/1.8, #fff            same
 *   .center-image-full-wrap    margin 56 top / 5 bottom, margin-top 40
 *     .mrgtp                   clipped
 *   .center-image-full         width 100%, block         object-contain
 */
export default function StudentCouncil() {
  const { council } = lifeContent;

  return (
    /* ref section#student-council.section */
    <section id="student-council" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg24 */}
        <h2 className={`mb-6 ${H2}`}>{council.heading}</h2>
      </div>

      {/* ref .atlas-blue-wrapper */}
      <div className="bg-atlas-footer pb-14 text-white max-md:pb-10">
        {/* ref .container */}
        <div className={CONTAINER}>
          {/* ref .blue-desc-wrap */}
          <div className="flex items-start justify-between pt-14 text-white max-md:pt-10 max-sm:flex-col max-sm:gap-2">
            {/* ref .blue-desc-text.f18 */}
            <div className="max-w-full flex-1 text-[18px] leading-[1.8] text-white">
              {council.text}
            </div>
          </div>

          {/* ref .center-image-full-wrap.mrgtp */}
          <div className="relative mb-[5px] mt-14 overflow-hidden max-md:mt-10">
            {/* ref img.center-image-full */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={council.image.src}
              srcSet={council.image.srcSet}
              sizes="(max-width: 1279px) 100vw, 1238px"
              alt={council.image.alt}
              loading="lazy"
              className="relative block w-full max-md:h-auto max-md:object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
