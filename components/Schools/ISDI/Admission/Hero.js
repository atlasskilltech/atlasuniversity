import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';

/**
 * The ISDI Admissions hero — `.course-cover-section > (.course-hero-wrapper > .hero-text >
 * (h1.h1-tag, .course-duration-isme.isdi, .buttons-wrapper > .btn-primary),
 * img.inner-cover-image)`.
 *
 * A third hero shape on /schools/isdi, and not `ui/InnerPageHero`: that one's scrim covers
 * three quarters of the frame and ends at `#000c`, `Programs/ProgramHero`'s covers a half and
 * ends at `#000e`, and this one covers a half and ends at **`#0006`** — a much lighter wash —
 * over a photograph rather than a video.
 *
 * Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=992px                      <=991px        <=767px
 *   section           100vh, relative
 *   scrim             absolute, bottom, 50% tall,  pb32 pl32      + px22
 *                     `linear-gradient(#0000,#0006)`, pb64 pl64
 *   .hero-text        max-width 840
 *   h1                56px/1.2 white
 *   eyebrow           24px/1.5 300 white, pt4
 *     (`.course-duration-isme.isdi`)
 *   buttons           row, centred, gap 16, pt30; the `.btn-primary` pink pill
 *   image             fills the section, cover
 */
export default function Hero({ data }) {
  return (
    /* ref .course-cover-section */
    <section data-block="hero" className="relative block h-screen w-full">
      {/* ref .course-hero-wrapper */}
      <div className="absolute inset-x-0 bottom-0 flex h-1/2 flex-none items-end bg-[linear-gradient(#0000,#0006)] pb-16 pl-16 max-lg:pb-8 max-lg:pl-8 max-md:px-[22px]">
        {/* ref .hero-text */}
        <div className="max-w-[840px]">
          {/* ref h1.h1-tag */}
          <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
            {withBreaks(data.title)}
          </h1>
          {data.eyebrow && (
            /* ref .course-duration-isme.isdi */
            <div className="pt-1 text-[24px] font-light leading-[1.5] text-white max-md:text-[18px]">
              {data.eyebrow}
            </div>
          )}
          {data.buttons?.length > 0 && (
            /* ref .buttons-wrapper */
            <div className="flex items-center gap-4 pt-[30px]">
              {data.buttons.map((button) => (
                <PrimaryButton key={button.label} href={button.href} variant={button.variant}>
                  {button.label}
                </PrimaryButton>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ref img.inner-cover-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.image.src}
        srcSet={data.image.srcSet}
        sizes={data.image.sizes}
        width={data.image.width}
        height={data.image.height}
        alt={data.image.alt}
        fetchPriority="high"
        decoding="async"
        className="inline-block h-full w-full max-w-full object-cover align-middle"
      />
    </section>
  );
}
