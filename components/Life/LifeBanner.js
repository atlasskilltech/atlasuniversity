import { lifeContent } from '@/lib/lifeContent';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * "Ready to live the ATLAS life?" — port of `life-at-atlas.php:1061-1077`
 * (`div.section > .container > .info-banner-atlas > (.container.blue-3 >
 *   (h2.info-banner-title, .info-banner-sub-text, .info-banner-btns >
 *   3x a.btn-primary), img.faq-image-blue)`).
 *
 * The same indigo band as /campus-atlas "Experience the ATLAS Campus in
 * Person" — inside `.container`, so it keeps its `32px 0` corners — with three
 * buttons rather than two: one `atlas` fill and two `outline-white`. Both
 * variants are already in the shared `PrimaryButton`. `.blue-3` adds nothing
 * the plain `.container` does not.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=992px          768-991px      <=767px
 *   div.section              padding 60       60             40
 *   .info-banner-atlas       padding 60       60             26
 *   .info-banner-title       40px/1.2, 500,   same           22px, mb 32
 *                            max-width 65%
 *   .info-banner-sub-text    24px/1.4, 300,   width 100%     18px, no top
 *                            padding-top 12                  padding
 *   .info-banner-btns        row, gap 16,     same           column, gap 8,
 *                            padding-top 24                  padding-top 16
 *                                                            (gap/pt 10 <=479)
 *   .faq-image-blue          right-aligned,   display: none  display: none
 *                            full height
 */
export default function LifeBanner() {
  const { banner } = lifeContent;

  return (
    /* ref div.section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .info-banner-atlas */}
        <div className="relative overflow-hidden rounded-tl-[32px] rounded-br-[32px] bg-atlas-footer py-[60px] max-md:py-[26px]">
          {/* ref .container.blue-3 */}
          <div className="relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]">
            {/* ref h2.info-banner-title */}
            <h2 className="m-0 max-w-[65%] text-[40px] font-medium leading-[1.2] text-white max-md:mb-8 max-md:text-[22px]">
              {banner.heading}
            </h2>

            {/* ref .info-banner-sub-text */}
            <div className="w-[55%] pt-3 text-2xl font-light leading-[1.4] text-white max-lg:w-full max-md:pt-0 max-md:text-lg max-md:leading-[1.4]">
              {banner.subheading.split('\n').map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </div>

            {/* ref .info-banner-btns */}
            <div className="flex items-center gap-4 pt-6 max-md:flex-col max-md:items-start max-md:gap-2 max-md:pt-4 max-sm:gap-2.5 max-sm:pt-2.5">
              {banner.buttons.map((button) => (
                <PrimaryButton key={button.label} href={button.href} variant={button.variant}>
                  {button.label}
                </PrimaryButton>
              ))}
            </div>
          </div>

          {/* ref img.faq-image-blue */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.image.src}
            alt={banner.image.alt}
            loading="lazy"
            className="absolute inset-y-0 right-0 z-0 h-full w-auto max-lg:hidden"
          />
        </div>
      </div>
    </div>
  );
}
