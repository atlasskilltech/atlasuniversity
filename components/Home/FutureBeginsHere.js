import { futureBeginsHere } from '@/lib/homeContent';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { SECTION } from '@/components/Home/SectionHead';

/**
 * "Your Future Begins Here." — port of index.php:3533-3546.
 *
 *   div.section > .info-banner-atlas.no-radius >
 *     .container.blue-3 > (h2.info-banner-title.no-bar,
 *                          .info-banner-sub-text.mobile,
 *                          .info-banner-btns > 2x a.btn-primary)
 *     img.faq-image-blue.atlas.hide-in-mobile
 *
 * The band is full-bleed — the section wrapper has no container of its own, so
 * `.info-banner-atlas` spans the viewport and only the copy sits in a normal
 * 1366px container. `.no-radius` cancels the 32px corners the banner would
 * otherwise carry.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=992px          768-991px        <=767px
 *   div.section              padding 60       60               40
 *   .info-banner-atlas       padding 60       60               26
 *   .info-banner-title       40px/1.2, 500, max-width 65%      22px, mb 16
 *                            margin-bottom 0                   (mb 14 <=479)
 *   .info-banner-sub-text    24px/1.4, 300    same, width      18px, no top
 *                            width 55%,       100%             padding
 *                            padding-top 12
 *   .info-banner-btns        row, gap 16, padding-top 24       column, gap 8,
 *                                                              padding-top 16
 *                                                              (gap 10 <=479)
 *   .btn-primary (atlas)     h56, px24, gap12, r36, #02b3c3    h40
 *   .button-tx               16px/500                          12px
 *   .btn-pr-icon             16px natural                      12px
 *   .faq-image-blue          right-aligned, full height,       display: none
 *                            intrinsic 1439x904 -> 521 wide
 *
 * Below 992px the photograph is `display: none` in the reference, so only the
 * `desk.webp` source is ever painted; `mob.webp` exists in the srcset but the
 * element is hidden at every width that would pick it. It is copied and left in
 * the srcset so the markup keeps the reference's own source set.
 */
export default function FutureBeginsHere() {
  const { heading, subheading, buttons, icon, image, imageMobile, alt } = futureBeginsHere;

  return (
    /* ref div.section */
    <div className={SECTION}>
      {/* ref .info-banner-atlas.no-radius */}
      <div className="relative overflow-hidden bg-atlas-footer py-[60px] max-md:py-[26px]">
        {/* ref .container.blue-3 */}
        <div className="relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]">
          {/* ref h2.info-banner-title.no-bar */}
          <h2 className="m-0 max-w-[65%] text-[40px] font-medium leading-[1.2] text-white max-md:mb-4 max-md:text-[22px] max-sm:mb-[14px]">
            {heading}
          </h2>

          {/* ref .info-banner-sub-text.mobile */}
          <div className="w-[55%] pt-3 text-2xl font-light leading-[1.4] text-white max-lg:w-full max-md:pt-0 max-md:text-lg max-md:leading-[1.4] max-sm:w-auto max-sm:max-w-full">
            {subheading}
          </div>

          {/* ref .info-banner-btns */}
          <div className="flex items-center gap-4 pt-6 max-md:flex-col max-md:items-start max-md:gap-2 max-md:pt-4 max-sm:gap-2.5 max-sm:pt-2.5">
            {buttons.map((button) => (
              /* ref a.btn-primary (atlas variant) — the shared button owns its
                 own look; this section only supplies the label and the icon */
              <PrimaryButton key={button.label} href={button.href} icon={icon}>
                {button.label}
              </PrimaryButton>
            ))}
          </div>
        </div>

        {/* ref img.faq-image-blue.atlas.hide-in-mobile */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          srcSet={`${imageMobile} 500w, ${image} 654w`}
          sizes="100vw"
          alt={alt}
          loading="lazy"
          className="absolute inset-y-0 right-0 z-0 h-full w-auto max-w-none max-lg:hidden"
        />
      </div>
    </div>
  );
}
