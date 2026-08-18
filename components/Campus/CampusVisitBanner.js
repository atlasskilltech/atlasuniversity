import { campusContent } from '@/lib/campusContent';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * "Experience the ATLAS Campus in Person" — port of
 * `campus-atlas.php:719-733` (`div.section > .container > .info-banner-atlas >
 * (.container > (h2.info-banner-title, .info-banner-sub-text,
 *  .info-banner-btns > 2x a.btn-primary), img.faq-image-blue)`).
 *
 * The same indigo band as the homepage's "Your Future Begins Here.", with one
 * structural difference: there it carries `.no-radius` and sits outside any
 * container, so it bleeds to the viewport edge; here it sits inside
 * `.container` and keeps its `32px 0` corners.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=992px          768-991px      <=767px
 *   div.section              padding 60       60             40
 *   .info-banner-atlas       padding 60       60             26
 *   .info-banner-title       40px/1.2, 500,   same           22px, mb 32
 *                            max-width 65%,
 *                            mb 0
 *   .info-banner-sub-text    24px/1.4, 300,   width 100%     18px, no top
 *                            width 55%,                      padding
 *                            padding-top 12
 *   .info-banner-btns        row, gap 16,     same           column, gap 8,
 *                            padding-top 24                  padding-top 16
 *                                                            (gap/pt 10 <=479)
 *   .faq-image-blue          right-aligned,   display: none  display: none
 *                            full height,
 *                            590x411 natural
 *
 * The second button is `href="#"` upstream and opens a NoPaperForms widget; it
 * points at `/campusvisit` here — see `lib/campusContent.js`.
 */
export default function CampusVisitBanner() {
  const { banner } = campusContent;

  return (
    /* ref div.section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .info-banner-atlas */}
        <div className="relative overflow-hidden rounded-tl-[32px] rounded-br-[32px] bg-atlas-footer py-[60px] max-md:py-[26px]">
          {/* ref .container */}
          <div className="relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]">
            {/* ref h2.info-banner-title */}
            <h2 className="m-0 max-w-[65%] text-[40px] font-medium leading-[1.2] text-white max-md:mb-8 max-md:text-[22px]">
              {banner.heading}
            </h2>

            {/* ref .info-banner-sub-text */}
            <div className="w-[55%] pt-3 text-2xl font-light leading-[1.4] text-white max-lg:w-full max-md:pt-0 max-md:text-lg max-md:leading-[1.4]">
              {banner.subheading}
            </div>

            {/* ref .info-banner-btns */}
            <div className="flex items-center gap-4 pt-6 max-md:flex-col max-md:items-start max-md:gap-2 max-md:pt-4 max-sm:gap-2.5 max-sm:pt-2.5">
              {banner.buttons.map((button) => (
                <PrimaryButton key={button.label} href={button.href}>
                  {button.label}
                </PrimaryButton>
              ))}
            </div>
          </div>

          {/* ref img.faq-image-blue */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.image.src}
            srcSet={banner.image.srcSet}
            sizes="(max-width: 590px) 100vw, 590px"
            alt={banner.image.alt}
            loading="lazy"
            className="absolute inset-y-0 right-0 z-0 h-full w-auto max-lg:hidden"
          />
        </div>
      </div>
    </div>
  );
}
