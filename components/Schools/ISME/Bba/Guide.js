import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ButtonRegular from '@/components/ui/ButtonRegular';
import { CONTAINER, H2, SECTION, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Your guide to joining ATLAS BBA" — `section.section > .container > (.head-wrap > (.tt-wrap,
 * a.button-regular), .guide-steps-wrapper > N x .gd-steps + .mob-vert-line)`.
 *
 * The ISDI programme pages carry the same band (`ProgramDetail/Admissions`) on their own skin;
 * the ISME sheet differs in the step tones, the number colour, the title weight, the image (not
 * rounded, not capped at 50%) and the outline pill, so it is drawn here.
 *
 * Rules, from the page's sheet:
 *   .head-wrap            row, space-between, bottom-aligned; a stretched column at <=767
 *   .tt-wrap              mb20 (<=767), mr20 (<=479)
 *   a.button-regular      the mint pill (`Know more`)
 *   .guide-steps-wrapper  flex, pt60; at <=767 a 32px-gap column, mt40, pt0, relative
 *   .gd-steps             flex 1, p32, 24px/1.5 white, clipped; flex none at <=767
 *     tones               tbg1 #08225e (min-height 426, auto at <=767), tbg2 #193e90,
 *                         tbg3 #264fbd (the base), tbg4 #123582
 *     .tb-num-mt          mint 600
 *     .tb-title-mt        600 pb16 -> 18px 300 (<=767)
 *     a.button-regular    the transparent white-outline pill (`isme-outline`)
 *     img.tb-image        absolute bottom-right, behind the copy, natural size up to 100%
 *   .mob-vert-line        a 16px #193e90 rail behind the stack at 49.5%, <=767 only
 */
/*
 * `.mobile-ico-button > a.button-regular` (the B.Sc pages, the career-services headings) — a block
 * wrapper, so the pill fills the column at <=767; at <=540 the ISME header's inline <style> makes it
 * a 38px mint circle with the arrow centred and the label hidden.
 */
/* `circleAt="768"` — imarticus29012026's own <style> turns the pill into the 38px arrow circle from 768 down
   (the shared rule is header.php's <=540) */
export function MobileIcoButton({ button, circleAt }) {
  return (
    <div className="block">
      <ButtonRegular
        href={button.href}
        variant="mint"
        newTab={button.target === '_blank'}
        labelSize={button.fontSize}
        aria-label={button.label}
        className={
          circleAt === '768'
            ? "max-768:h-[38px] max-768:w-[38px] max-768:rounded-full max-768:bg-[url('/assets/images/international/think/arrow-top-rt-blk.svg')] max-768:bg-center max-768:bg-no-repeat max-768:p-0"
            : "max-vsm:h-[38px] max-vsm:w-[38px] max-vsm:rounded-full max-vsm:bg-[url('/assets/images/international/think/arrow-top-rt-blk.svg')] max-vsm:bg-center max-vsm:bg-no-repeat max-vsm:p-0"
        }
      >
        <span className={circleAt === '768' ? 'max-768:hidden' : 'max-vsm:hidden'}>{button.label}</span>
      </ButtonRegular>
    </div>
  );
}

const TONE = { tbg1: 'bg-[#08225e]', tbg2: 'bg-[#193e90]', tbg3: 'bg-[#264fbd]', tbg4: 'bg-[#123582]' };

/*
 * The ISME Admissions pages' "Here's how to apply" is this band with a bare heading
 * (`data.bare`: `section(.extraspace)#how-to-apply > .container > (h2.h2-tag(.mrg32),
 * .guide-steps-wrapper(.mrgtp-24|.mrgtp0))`), no lead and no button:
 *   section.extraspace     pt120 pb60 (40 / 40 at <=767)
 *   h2.h2-tag(.mrg32)      mb56 -> 32 at <=767 (32 at every width with .mrg32)
 *   .mrgtp-24              pt24, and the <=767 mt40 cancelled to 0
 *   .mrgtp0                pt0 (mt40 at <=767 still applies)
 */
const WRAP = {
  default: 'pt-[60px] max-md:mt-10',
  'mrgtp-24': 'pt-6 max-md:mt-0',
  mrgtp0: 'pt-0 max-md:mt-10',
};

export default function Guide({ data }) {
  const wrap = WRAP[(data.wrapMods ?? []).find((m) => WRAP[m])] ?? WRAP.default;
  return (
    <section
      data-block="admissions"
      id={data.id ?? undefined}
      className={data.extraspace ? 'block overflow-hidden pb-[60px] pt-[120px] max-md:py-10' : SECTION}
    >
      <div className={CONTAINER}>
        {data.bare ? (
          <h2 className={cx(H2, data.headingMods?.includes('mrg32') ? 'mb-8' : 'mb-14 max-md:mb-8')}>{withBreaks(data.heading)}</h2>
        ) : (
        /* ref .head-wrap */
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          {/* ref .tt-wrap */}
          <div className="flex-[0_1_auto] max-md:mb-5 max-sm:mr-5">
            <h2 className={cx(H2, 'mb-4 max-md:mb-2')}>{withBreaks(data.heading)}</h2>
            {data.sub && <div className={SUB_INNER}>{withBreaks(data.sub)}</div>}
          </div>
          {data.button && !data.button.mobileIco && (
            <ButtonRegular href={data.button.href} variant="mint" newTab={data.button.target === '_blank'} labelSize={data.button.fontSize}>
              {data.button.label}
            </ButtonRegular>
          )}
          {data.button?.mobileIco && <MobileIcoButton button={data.button} />}
        </div>
        )}

        {/* ref .guide-steps-wrapper */}
        <div className={cx('flex max-md:relative max-md:flex-col max-md:gap-8 max-md:pt-0', wrap)}>
          {data.steps.map((step, i) => (
            /* ref .gd-steps.tbgN */
            <div
              key={`${i}-${step.num}`}
              className={cx(
                'relative flex-1 basis-0 overflow-hidden p-8 text-[24px] leading-[1.5] text-white max-md:flex-none',
                TONE[step.tone] ?? TONE.tbg3,
                step.tone === 'tbg1' && 'min-h-[426px] max-md:min-h-0'
              )}
            >
              {/* ref .gd-cont-wrap */}
              <div className="relative z-[1] flex flex-col items-start">
                <div className="font-semibold text-atlas-mint">{step.num}</div>
                <div className="pb-4 font-semibold leading-[1.5] max-md:text-[18px] max-md:font-light">{withBreaks(step.title)}</div>
                {step.link && (
                  <ButtonRegular href={step.link.href} variant="isme-outline" newTab={step.link.target === '_blank'} labelSize={step.link.fontSize}>
                    {step.link.label}
                  </ButtonRegular>
                )}
              </div>
              {step.image && (
                /* ref img.tb-image */
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={step.image.src}
                  alt={step.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute bottom-0 right-0 z-0 m-0 block max-w-full"
                />
              )}
            </div>
          ))}
          {/* ref .mob-vert-line */}
          <div aria-hidden className="absolute left-[49.5%] top-0 -z-[1] hidden h-full w-4 bg-[#193e90] max-md:block" />
        </div>
      </div>
    </section>
  );
}
