import PrimaryButton from '@/components/ui/PrimaryButton';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import { cx } from '@/lib/cx';

/**
 * `.info-banner-atlas` — the indigo call-to-action band that closes several
 * pages: a heading, a lead, optionally a contact line, and a row of buttons,
 * with a photograph bled off the right edge behind them.
 *
 * Three instances, measured identical in the band, the inner container, the
 * heading, the lead, the button row and the image:
 *   /campus-atlas                      "Experience the ATLAS Campus in Person"
 *   /life-at-atlas                     "Ready to live the ATLAS life?"
 *   /advantages/atlas-career-services  "Collaborate with us"
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=992px          768-991px      <=767px
 *   .info-banner-atlas       #41418e, radius 32/0, clipped,
 *                            padding 60 0                    26 0
 *   .info-banner-title       40px/1.2, 500,   same           22px, mb 32
 *                            max-width 65%,                  (mb 16 with
 *                            margin 0                        `.no-bar`,
 *                                                            14 <=479)
 *   .info-banner-sub-text    24px/1.4, 300,   width 100%     18px, no top
 *                            width 55%, pt 12                padding
 *   .info-banner-sub-contact 20px/1.4, 300,   same           18px, width 75%,
 *                            width 55%, pt 32                no top padding
 *   .info-banner-btns        row, gap 16,     same           column, gap 8,
 *                            padding-top 24                  padding-top 16
 *                                                            (gap/pt 10 <=479)
 *   .faq-image-blue          right-aligned,   display: none  display: none
 *                            full height
 *
 * `.container.blue-3` adds nothing the plain `.container` does not.
 */
export default function InfoBanner({ banner, titleClassName }) {
  return (
    /* ref div.section / section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .info-banner-atlas */}
        <div className="relative overflow-hidden rounded-tl-[32px] rounded-br-[32px] bg-atlas-footer py-[60px] max-md:py-[26px]">
          {/* ref .container.blue-3 */}
          <div className="relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]">
            {/* ref h2.info-banner-title */}
            <h2
              className={cx(
                'm-0 max-w-[65%] text-[40px] font-medium leading-[1.2] text-white max-md:text-[22px]',
                titleClassName ?? 'max-md:mb-8',
              )}
            >
              {banner.heading}
            </h2>

            {/* ref .info-banner-sub-text */}
            <div className="w-[55%] pt-3 text-2xl font-light leading-[1.4] text-white max-lg:w-full max-md:pt-0 max-md:text-lg max-md:leading-[1.4]">
              {withBreaks(banner.subheading ?? banner.text)}
            </div>

            {/* ref .info-banner-sub-contact — only /advantages/atlas-career-services
                has one */}
            {banner.contact && (
              <div className="w-[55%] pt-8 text-[20px] font-light leading-[1.4] text-white max-md:w-3/4 max-md:pt-0 max-md:text-[18px]">
                {banner.contact}
              </div>
            )}

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
            srcSet={banner.image.srcSet}
            sizes={banner.image.sizes}
            alt={banner.image.alt}
            loading="lazy"
            className="absolute inset-y-0 right-0 z-0 h-full w-auto max-lg:hidden"
          />
        </div>
      </div>
    </section>
  );
}
