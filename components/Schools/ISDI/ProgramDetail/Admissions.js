import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ButtonRegular from '@/components/ui/ButtonRegular';
import SecondaryButton from '@/components/ui/SecondaryButton';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';

/**
 * "Admissions — The Design Way" — b-des/accessory-design-&-craft.php:2291-2349.
 *
 *   section.section > .container > .head-wrap > .tt-wrap (h2 + lead)
 *                                             > a.button-regular
 *                                > .isdi-guide-wrapper > .guide-steps-wrapper-isdi
 *                                    > 5 x .gd-steps > .gd-cont-wrap + img.tb-image
 *                                    > .mob-vert-line
 *
 * ── Measured at 1440 / 1280 / 991 / 767 / 479 / 390 ─────────────────────────
 *   .head-wrap       row, space-between, bottom-aligned; a stretched column at
 *                    <=767 (the lead 20px above and below, the button full width)
 *   .isdi-guide-…    pt60 — dropped entirely at <=767
 *   wrapper          one clipped r16 row of five equal columns; at <=767 a
 *                    32px-gap column with 40px above it (20 at <=479), and each
 *                    step keeps its own corners
 *   .gd-steps        flex 1, padding 32, 24px/1.5 white. The first is 260 tall
 *                    (180 at <=479) and the rest take their content's height;
 *                    below 768 every one is content-height.
 *     colours        01 #173a87 · 02 #0a46ca · 03 #193e90 · 04 #0f2d6f ·
 *                    05 #1a53ef  (`.tbg1/2/3` x `.isdi`/`.isdi-blue-5`)
 *     .tb-num-mt     24px/1.5 400 white
 *     .tb-title-mt   24px/1.5 500, pb16 — 18px/1.5 at <=767
 *     .secondary-btn the pink pill, on step 01 only
 *     img.tb-image   absolute in the bottom-right corner, max-width 50%, r16,
 *                    behind the text (z0 against the content's z1)
 *   .mob-vert-line   a 16px #193e90 rail behind the stack at 49.5%, below 768
 *                    only — the spine the steps sit on
 */

/* ref .gd-steps.tbgN(.isdi|.isdi-blue-5) — colour only; the shape is shared */
const STEP_TONE = ['bg-[#173a87]', 'bg-[#0a46ca]', 'bg-[#193e90]', 'bg-[#0f2d6f]', 'bg-[#1a53ef]'];

export default function Admissions({ data }) {
  return (
    <section data-block="admissions" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mb-5 max-sm:mr-5">
            <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
            {/* `.sub-heading.mrgbtm-0` (the Communication Design page) drops the lead's
                bottom padding at <=479 */}
            <div className={cx(SUB, data.subFlush && 'max-sm:pb-0')}>{data.sub}</div>
          </div>
          <ButtonRegular href={data.button.href} variant="pink-cta">
            {data.button.label}
          </ButtonRegular>
        </div>

        {/* ref .isdi-guide-wrapper */}
        <div className="pt-[60px] max-md:pt-0">
          {/* ref .guide-steps-wrapper-isdi */}
          <div className="relative flex overflow-hidden rounded-2xl max-md:mt-10 max-md:flex-col max-md:gap-8 max-sm:mt-5">
            {data.steps.map((step, i) => (
              /* ref .gd-steps */
              <div
                key={step.num}
                style={step.tone ? { backgroundColor: step.tone } : undefined}
                className={cx(
                  'relative flex-1 overflow-hidden p-8 text-[24px] leading-[1.5] text-white max-md:flex-none',
                  /* the colour belongs to the card's own `.tbgN(.isdi|.isdi-blue-5)` classes.
                     Every B.Des page ships the five in this order so the index matched, but
                     B.Tech Design Engineering has four steps and omits `tbg2.isdi-blue-5`,
                     which left its last step navy instead of #1a53ef. `step.tone` carries the
                     measured colour where the data has it; the index stays as the fallback so
                     no finished page moves. */
                  !step.tone && (STEP_TONE[i] ?? STEP_TONE[0]),
                  /* `.gd-steps.tbg1.isdi-blue-5 { min-height: 260px }` is a compound
                     selector, so it survives the <=767 rule that sets `min-height: auto`
                     on `.gd-steps.tbg1`; only the <=479 rule (equally compound) lowers it */
                  i === 0 && 'min-h-[260px] max-sm:min-h-[180px]'
                )}
              >
                {/* ref .gd-cont-wrap */}
                <div className="relative z-[1] flex flex-col items-start">
                  {/* ref .tb-num-mt.isdi */}
                  <div className="font-normal">{step.num}</div>
                  {/* ref .tb-title-mt.isdi */}
                  <div className="pb-4 font-medium max-md:text-[18px] max-md:leading-[1.5]">
                    {withBreaks(step.title)}
                  </div>
                  {step.link && (
                    <SecondaryButton href={step.link.href} variant="isdi-pink">
                      {step.link.label}
                    </SecondaryButton>
                  )}
                </div>

                {/* ref img.tb-image.isdi */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image.src}
                  width={step.image.width}
                  height={step.image.height}
                  alt={step.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute bottom-0 right-0 z-0 m-0 block max-w-[50%] rounded-2xl align-middle"
                />
              </div>
            ))}

            {/* ref .mob-vert-line */}
            <div aria-hidden className="absolute bottom-0 left-[49.5%] top-0 -z-[1] hidden w-4 bg-[#193e90] max-md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
