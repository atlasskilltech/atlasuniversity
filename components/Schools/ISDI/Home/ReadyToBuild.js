import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, SECTION } from './ui';

/**
 * "Ready to Build What’s Next? Let’s Get Started." — port of
 * reference/schools/isdi/index.php:3734-3748.
 *
 *   div.section > .info-banner-blue.bg1.isdi > .container.blue-3
 *     > (h2.info-banner-title, .info-banner-sub-text, .info-banner-btns)
 *     + img.faq-image-blue
 *
 * The same band as `components/ui/InfoBanner` in every measured property but its
 * paint: ISDI's `.bg1.isdi` is full-bleed #de297b with square corners, where
 * the ATLAS banner is an indigo, `32px 0`-cornered card inside `.container`.
 * Shared components take no styling, so the ISDI band is its own component.
 *
 *                     >=992px                  768-991          <=767
 *   band              #de297b, py60                             py26
 *   title             40px/1.2, 500, white,    same             22px, mb32
 *                     max-width 65%
 *   lead              24px/1.4, 300, 55%, pt12 full width       18px, pt0
 *   buttons           row, gap 16, pt24        same             column, gap 8,
 *                                                               pt16 (10/10 <=479)
 *   photo             right edge, full height  display: none
 */
export default function ReadyToBuild({ data, renderButton }) {
  return (
    <div data-block="ready-to-build" className={SECTION}>
      {/* ref .info-banner-blue.bg1.isdi */}
      <div className="relative bg-[#de297b] py-[60px] max-md:py-[26px]">
        {/* ref .container.blue-3 */}
        <div className={CONTAINER}>
          <h2 className="m-0 max-w-[65%] text-[40px] font-medium leading-[1.2] text-white max-md:mb-8 max-md:text-[22px] max-md:leading-[1.2]">
            {withBreaks(data.heading)}
          </h2>
          {data.sub && (
            /* ref .info-banner-sub-text — the B.Des pages' banner authors none */
            <div className="w-[55%] pt-3 text-2xl font-light leading-[1.4] text-white max-lg:w-full max-md:pt-0 max-md:text-lg max-md:leading-[1.4]">
              {data.sub}
            </div>
          )}
          <div className="flex items-center gap-4 pt-6 max-md:flex-col max-md:items-start max-md:gap-2 max-md:pt-4 max-sm:gap-2.5 max-sm:pt-2.5">
            {data.buttons.map((button) =>
              /* a page may render a button itself — the B.Des banner's second one opens that
                 page's brochure popup rather than navigating */
              renderButton ? (
                renderButton(button)
              ) : (
                <PrimaryButton key={button.label} href={button.href} variant={button.variant}>
                  {button.label}
                </PrimaryButton>
              )
            )}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.image.src}
          srcSet={data.image.srcSet}
          sizes={`(max-width: ${data.image.width ?? 635}px) 100vw, ${data.image.width ?? 635}px`}
          width={data.image.width ?? 635}
          height={data.image.height ?? 408}
          alt={data.image.alt}
          loading="lazy"
          decoding="async"
          className="absolute bottom-0 right-0 top-0 z-0 h-full w-auto max-w-full object-fill align-middle max-lg:hidden"
        />
      </div>
    </div>
  );
}
