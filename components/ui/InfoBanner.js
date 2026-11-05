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
/*
 * `skin="isme"` — ISME's `.info-banner-blue(.bg1)`: the same band on #193e90, square, full bleed in
 * its `.section`, and 60px of vertical padding at every width (the sheet's base rule comes after
 * its <=767 one). Several ISME banners author no `.info-banner-sub-text`, so the lead renders only
 * when there is one — every ATLAS banner has one, so nothing changes there.
 */
/* `containerClassName` — the inner `.container.blue-3`. Defaults to the Webflow 1366px container;
   the ISME partner-pathway pages load the Tailwind CDN, whose `.container` ladder (1280 / 1024 /
   768 / 640) is what their banner copy wraps against. */
const INNER = 'relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]';

/* `buttonTextSize` — PrimaryButton's label size ('default' 16px, 'inherit' 18px). `subWidth` — the
   sub-text's width rule; the ISME partner-pathway pages keep 55% down to 768 (their own base rule
   follows the sheet's <=991 one), every other page goes full width at <=991. */
const SUB_W = {
  default: 'w-[55%] max-lg:w-full',
  'keep-767': 'w-[55%] max-md:w-full',
};

/* `mobileAt="mcm"` — /schools/isme/global-business-pathway: the page's own <style> restates the band's
   base rules after the sheet, so they hold through the sheet's <=767 ones and the band only turns at the
   page's <=568 (title 22px / mb 14, buttons a left column at gap 10 / pt 10, 40px pills, 12px labels);
   between 569 and 767 the buttons stack (the sheet) but stay centred, 56px, gap 16, pt 24. */
const MCM = {
  title: 'm-0 max-w-[65%] text-[40px] font-medium leading-[1.2] text-white max-md:mb-4 max-mcm:mb-3.5 max-mcm:text-[22px]',
  sub: 'w-[55%] pt-3 text-2xl font-light leading-[1.4] text-white max-mcm:w-full max-mcm:pt-0 max-mcm:text-lg',
  btns: 'flex items-center gap-4 pt-6 max-md:flex-col max-mcm:items-start max-mcm:gap-2.5 max-mcm:pt-2.5',
};

export default function InfoBanner({
  banner, titleClassName, fullBleed = false, skin = 'atlas', containerClassName = INNER, buttonTextSize = 'default', subWidth = 'default', pad26 = false,
  mobileAt = 'md',
}) {
  const mcm = mobileAt === 'mcm';
  const isme = skin === 'isme';
  /* ref .info-banner-atlas / `.info-banner-atlas.no-radius` */
  const band = isme
    ? /* `pad26` — the ISME sheet's `.info-banner-blue` drops to py26 at <=767 (Entrepreneurship); the
         pathway landing pages keep 60 */
      pad26 ? 'relative overflow-hidden bg-[#193e90] py-[60px] max-md:py-[26px]' : 'relative overflow-hidden bg-[#193e90] py-[60px]'
    : cx(
/* `skin="law"` — ISME department-of-finance's `.info-banner-law`: this band exactly, on #193e90 */
skin === 'law' ? 'relative overflow-hidden bg-[#193e90] py-[60px] max-md:py-[26px]' : 'relative overflow-hidden bg-atlas-footer py-[60px] max-md:py-[26px]',
!fullBleed && 'rounded-tl-[32px] rounded-br-[32px]',
  );

  const inner = (
<div className={band}>
      {/* ref .container.blue-3 */}
      <div className={containerClassName}>
        {/* ref h2.info-banner-title */}
        <h2
          className={mcm ? MCM.title : cx(
            'm-0 max-w-[65%] text-[40px] font-medium leading-[1.2] text-white max-md:text-[22px]',
            titleClassName ?? 'max-md:mb-8',
          )}
        >
          {/* /admissions/pg-admissions authors a <br /> in its heading; no other
              page's contains one, so this is a no-op everywhere else */}
          {withBreaks(banner.heading)}
        </h2>

        {/* ref .info-banner-sub-text */}
        {(banner.subheading ?? banner.text) != null && (
        <div className={mcm ? MCM.sub : cx(SUB_W[subWidth] ?? SUB_W.default, 'pt-3 text-2xl font-light leading-[1.4] text-white max-md:pt-0 max-md:text-lg max-md:leading-[1.4]')}>
          {withBreaks(banner.subheading ?? banner.text)}
        </div>
        )}

        {/* ref .info-banner-sub-contact — only /advantages/atlas-career-services
            has one */}
        {banner.contact && (
          <div className="w-[55%] pt-8 text-[20px] font-light leading-[1.4] text-white max-md:w-3/4 max-md:pt-0 max-md:text-[18px]">
            {banner.contact}
          </div>
        )}

        {/* ref .info-banner-btns */}
        {/* `law` — department-of-finance's own <=767 rule: gap 10 and pt 10 from 767 down (not 8 / 16) */}
        <div
          className={
            mcm
              ? MCM.btns
              : skin === 'law'
                ? 'flex items-center gap-4 pt-6 max-md:flex-col max-md:items-start max-md:gap-2.5 max-md:pt-2.5'
                : 'flex items-center gap-4 pt-6 max-md:flex-col max-md:items-start max-md:gap-2 max-md:pt-4 max-sm:gap-2.5 max-sm:pt-2.5'
          }
        >
          {banner.buttons.map((button) => (
            <PrimaryButton
              key={button.label}
              href={button.href}
              variant={mcm ? `${button.variant === 'outline-white' ? 'outline' : button.variant}-mcm` : button.variant}
              icon={button.icon}
              textSize={mcm ? 'default-mcm' : buttonTextSize !== 'default' && button.variant === 'mint' ? `${buttonTextSize}-light` : buttonTextSize}
            >
              {button.label}
            </PrimaryButton>
          ))}
        </div>
      </div>

      {/* ref img.faq-image-blue */}
      {banner.image && (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={banner.image.src}
        srcSet={banner.image.srcSet}
        sizes={banner.image.sizes}
        alt={banner.image.alt}
        loading="lazy"
        className="absolute inset-y-0 right-0 z-0 h-full w-auto max-lg:hidden"
      />
      )}
    </div>
  );

  return (
    /* ref div.section / section.section */
    <section className={SECTION}>
      {/* the band is nested in a `.container` on every page but
          /admissions/integrated-admissions, where it is a direct child of
          `.section` and spans the viewport */}
      {fullBleed ? inner : <div className={CONTAINER}>{inner}</div>}
    </section>
  );
}
