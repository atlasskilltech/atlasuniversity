import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import CampusVisitButton from '@/components/Schools/ISME/CampusVisitButton';
import BrochureButton from '@/components/Schools/ISDI/ProgramDetail/BrochureButton';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * "Ready to Build a Business Degree That's Built for the Real World?" — `div.section >
 * .faq-banner` on its `blue` variant (`w-variant-3401ae25…`), the band the ISME homepage's
 * `PinkBanner tone="blue"` draws, but holding TWO buttons in `.faq-btn-slot` — the mint campus
 * visit pill and the outline-white brochure trigger — where the homepage's holds one.
 *
 * Rules, from the page's sheet:
 *   .faq-banner         #193e90, py60 (26 at <=767), relative
 *   h2.h2-tag.mrgtbm0.wht  40px/1.2 500 white, mb0 -> 18px/1.4 (<=767; the `.wht` compound
 *                       beats the <=479 36px of `.mrgtbm0`)
 *   .btn-wraper.padt24  block, pt24
 *   .faq-btn-slot       flex, gap 16, centred; a start-aligned column at <=767
 *   img.btn-pr-icon     the arrow, inverted on the mint pill; 12px at <=767
 *   img.faq-image       absolute, full height, pinned right, `object-fit: fill`; hidden <=767
 */
export default function Banner({ data, brochure }) {
  return (
    /* the Admissions pages author it as `section#scholarship`, the anchor menu's target */
    /* `.section.padtp0` (career services) — no top padding at any width, 60 below (it beats the <=767 rule) */
    <div data-block="banner" id={data.id ?? undefined} className={data.padtp0 ? 'block overflow-hidden pb-[60px] pt-0' : SECTION}>
      {/* `data.v3` — Non-Mumbai's `.faq-banner-3.blue-9`: a 350px minimum height between 480 and 767,
          where the photograph stays (absolute, bottom-right, 65% wide, its own ratio); hidden at <=479 */}
      <div className={cx('relative bg-[#193e90] py-[60px] max-md:py-[26px]', data.v3 && 'max-md:min-h-[350px] max-sm:min-h-0')}>
        <div className={CONTAINER}>
          <h2 className="relative m-0 text-[40px] font-medium leading-[1.2] text-white max-md:text-[18px] max-md:leading-[1.4]">
            {withBreaks(data.heading)}
          </h2>
          {data.sub && (
            /* ref .faq-sub-text — 24px/1.4 300 white, pt12 (16px at <=767); the single-programme
               pages' banner has it, the major/minor pages' does not */
            <div className="relative pt-3 text-[24px] font-light leading-[1.4] text-white max-md:text-[16px]">
              {withBreaks(data.sub)}
            </div>
          )}
          {/* ref .btn-wraper.padt24 > .faq-btn-slot */}
          <div className="mt-auto block pt-6">
            <div className="flex items-center justify-start gap-4 max-md:flex-col max-md:items-start">
              {data.buttons.map((b) =>
                b.brochure === 'campus-visit' ? (
                  /* `data-id="campus-visit"` (Parents Corner) — footer.php's campus-visit popup */
                  <CampusVisitButton
                    key={b.label}
                    label={b.label}
                    variant={b.variant}
                    icon={b.icon}
                    iconClassName={b.icon && b.variant === 'mint' ? 'invert' : undefined}
                  />
                ) : b.brochure && brochure ? (
                  <BrochureButton key={b.label} brochure={brochure} label={b.label} variant={b.variant} />
                ) : (
                  <PrimaryButton
                    key={b.label}
                    href={b.href}
                    variant={b.variant}
                    icon={b.icon}
                    iconClassName={b.icon && b.variant === 'mint' ? 'invert' : undefined}
                  >
                    {b.label}
                  </PrimaryButton>
                )
              )}
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.image.src}
          srcSet={data.image.srcSet}
          sizes={data.image.sizes}
          alt=""
          loading="lazy"
          decoding="async"
          className={
            data.v3
              ? 'absolute bottom-0 right-0 top-0 z-0 h-full w-auto max-w-full object-fill max-md:top-auto max-md:h-auto max-md:w-[65%] max-md:object-cover max-sm:hidden'
              : 'absolute bottom-0 right-0 top-0 z-0 h-full w-auto max-w-full object-fill max-md:hidden'
          }
        />
      </div>
    </div>
  );
}
