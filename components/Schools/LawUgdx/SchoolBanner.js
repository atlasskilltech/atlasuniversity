import PrimaryButton from '@/components/ui/PrimaryButton';
import OutcomesBook from '@/components/Schools/ISDI/Success/OutcomesBook';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * The School of Law / uGDX call-to-action bands — `.info-banner-law`, `.info-banner-law-2` and their
 * uGDX twins. The same chassis as `ui/InfoBanner` (`.container.blue-3` inside a clipped band, a 40px
 * title, a 24px lead, a button row) with three things that one does not have, so it is its own
 * component rather than a fourth skin there:
 *   - a `.duration-wrap-law` row ("5 Year | Full time") between the lead and the buttons;
 *   - a black 700 title on the sand band (`.info-banner-title-black`);
 *   - `img.faq-image-blue-sm`, which stays on screen below 768 (cropped into the corner), where
 *     `.faq-image-blue` disappears from 991 down.
 * Measured on production /schools/law at 1440 / 991 / 767 / 479 / 390:
 *
 *   .info-banner-law        #271f30, radius 32px 0, clipped, padding 60 0 (26 0 at <=767)
 *   .info-banner-law-2      #d7a579, square, the same padding; full bleed (no `.container` around it)
 *   .info-banner-title      40px/1.2 500 white, max-width 65%; 22px at <=767 with mb 16 (`.no-bar`,
 *                           14 at <=479) or 32 (`.info-banner-title-black`, 700 black)
 *   .info-banner-sub-text   55% wide (100% at <=991), pt 12, 24px/1.4 300; 18px, pt 0 at <=767
 *   .duration-wrap-law      flex, gap 8, centred, margin 32 0 64; `.du-text` 16px white (12px <=767)
 *   .info-banner-btns       row, gap 16, pt 24; a left column at <=767 (gap 8, pt 16; 10 / 10 <=479)
 *   img.faq-image-blue(.law) absolute, top/right/bottom 0, full height at its own ratio; hidden <=991
 *   img.faq-image-blue-sm   the same from 992 up; at <=767 cover-cropped 60% x 65% into the bottom
 *                           corner, 15% past the right edge; at <=479 75% wide, pinned to the top
 */
const BAND = {
  law: 'relative overflow-hidden bg-[#271f30] py-[60px] max-md:py-[26px] rounded-tl-[32px] rounded-br-[32px]',
  sand: 'relative overflow-hidden bg-[#d7a579] py-[60px] max-md:py-[26px]',
  /* `.info-banner-law.no-radius` (the Law admissions page's closing band) */
  lawSquare: 'relative overflow-hidden bg-[#271f30] py-[60px] max-md:py-[26px]',
  /* `.info-banner-ugdx` — #011627, radius 32px 0 */
  ugdx: 'relative overflow-hidden bg-[#011627] py-[60px] max-md:py-[26px] rounded-tl-[32px] rounded-br-[32px]',
  /* `.info-banner-ugdx.no-radius` (the uGDX admissions page's scholarship band) */
  ugdxSquare: 'relative overflow-hidden bg-[#011627] py-[60px] max-md:py-[26px]',
  /* `.info-banner-ugdx-1` (the uGDX programme pages' "Ready to Build What’s Next?") — #eb1f3c, square */
  ugdxRed: 'relative overflow-hidden bg-[#eb1f3c] py-[60px] max-md:py-[26px]',
};
const TITLE = {
  light: 'm-0 max-w-[65%] text-[40px] font-medium leading-[1.2] text-white max-md:mb-4 max-md:text-[22px] max-sm:mb-3.5',
  /* a plain `.info-banner-title` (no `.no-bar`) keeps the sheet's 32px bottom margin at <=767 — the uGDX
     programme pages' red band */
  lightBar: 'm-0 max-w-[65%] text-[40px] font-medium leading-[1.2] text-white max-md:mb-8 max-md:text-[22px]',
  black: 'm-0 max-w-[65%] text-[40px] font-bold leading-[1.2] text-black max-md:mb-8 max-md:text-[22px]',
};
const INNER = 'relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]';
const IMAGE = {
  side: 'absolute inset-y-0 right-0 z-0 h-full w-auto max-lg:hidden',
  sm: 'absolute bottom-0 right-0 top-0 z-0 h-full w-auto object-fill max-md:top-auto max-md:-right-[15%] max-md:h-[65%] max-md:w-[60%] max-md:object-cover max-sm:right-0 max-sm:top-0 max-sm:w-3/4',
};

/* `inline` — the band alone, for "Our Programs", which puts it under its own heading inside the
   section's container rather than in a section of its own */
export default function SchoolBanner({ banner, tone = 'law', fullBleed = false, title = 'light', image = 'side', block, inline = false }) {
  const inner = (
    <div className={BAND[tone]}>
      {/* ref .container.blue-3 */}
      <div className={INNER}>
        {/* `.info-banner-title.no-bar.ugdx` lifts the 65% cap to 100% at <=767 */}
        <h2 className={cx(TITLE[title], tone === 'ugdx' && 'max-md:max-w-full')}>{withBreaks(banner.heading)}</h2>
        {banner.text != null && (
          <div className="w-[55%] pt-3 text-2xl font-light leading-[1.4] text-white max-lg:w-full max-md:pt-0 max-md:text-lg max-md:leading-[1.4]">
            {withBreaks(banner.text)}
          </div>
        )}
        {banner.duration && (
          /* ref .duration-wrap-law > .du-text.vertical-space1-6 */
          <div className="mb-16 mt-8 flex items-center gap-2">
            {banner.duration.flatMap((d, i) => [
              i > 0 && <div key={`s${i}`} className="text-base text-white max-md:text-xs">|</div>,
              <div key={d} className="text-base text-white max-md:text-xs">{d}</div>,
            ])}
          </div>
        )}
        {/* ref .info-banner-btns */}
        <div className="flex items-center gap-4 pt-6 max-md:flex-col max-md:items-start max-md:gap-2 max-md:pt-4 max-sm:gap-2.5 max-sm:pt-2.5">
          {banner.buttons.map((button) => (button.widget ? (
            /* a CRM `data-atlas-mode="popup"` embed (uGDX NextGen Women in STEM) — the shared launch pill + dialog */
            <OutcomesBook key={button.label} label={button.label} src={button.widget.src} tone={button.widget.tone} width={button.widget.width} height={button.widget.height} />
          ) : (
            <PrimaryButton key={button.label} href={button.href} variant={button.variant} icon={button.icon}>
              {button.label}
            </PrimaryButton>
          )))}
        </div>
      </div>
      {banner.image && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={banner.image.src} srcSet={banner.image.srcSet} sizes={banner.image.sizes} alt="" loading="lazy" className={IMAGE[image]} />
      )}
    </div>
  );
  if (inline) return inner;
  return (
    <section data-block={block} className={SECTION}>
      {fullBleed ? inner : <div className={CONTAINER}>{inner}</div>}
    </section>
  );
}
