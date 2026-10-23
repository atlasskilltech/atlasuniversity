import { cx } from '@/lib/cx';
import ButtonRegular from '@/components/ui/ButtonRegular';
import { H2, H2_MB, SUB } from '../Home/ui';

/**
 * `.head-wrap > (.tt-wrap > (h2.h2-tag, .sub-heading), a.button-regular)` — the heading row
 * three of this page's sections share, each with a `.button-regular` pill pushed to the right.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   row               flex, space-between; `.mrgbtm32` and  column, stretched;
 *                     the bare form bottom-align, `.top`    `.mrgbtm32` and `.mrgbtm`
 *                     top-aligns with a 16px gap and        add margin-bottom 20
 *                     margin-bottom 16
 *   button            `ui/ButtonRegular` — r27, h54 (44 at <=767), px20, 18px/1.5 white.
 *                     The pill is #d20158 on Eligibility and Scholarships (`pink-cta`) and
 *                     #ec1376 on Fee Structure (`pink`), so the tone travels with the button
 *
 * The lead is the ISDI `.sub-heading`; `.mrgbtm32` on it is 32px of bottom padding and
 * `.mrgbtm-0` is none, so the variant travels as `subSpacing`.
 */
const ALIGN = {
  /* ref .head-wrap */
  base: 'items-end',
  /* ref .head-wrap.mrgbtm32 */
  mrgbtm32: 'mb-8 items-end max-md:mb-5 max-md:flex-col max-md:items-stretch max-md:justify-start',
  /* ref .head-wrap.top — `align-items: flex-start` and no margin above 768; the 16px gap
     and `margin-bottom: 16px` belong to its <=767 rule only */
  top: 'items-start max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4',
};

const SUB_SPACING = {
  /* ref .sub-heading.mrgbtm32 — 32, then the `.sub-heading` mobile padding of 20/0/20
     and 20/0/16 at <=479 */
  mrgbtm32: 'pb-8 max-md:pb-5 max-sm:pb-4',
  /* ref .sub-heading.mrgbtm-0 — none, and none again at <=479 */
  none: 'pb-0 max-md:pb-5 max-sm:pb-0',
};

export default function HeadWrap({ heading, sub, subSpacing, button, align = 'base' }) {
  return (
    /* ref .head-wrap */
    <div
      className={cx(
        'flex justify-between max-md:flex-col max-md:items-stretch',
        ALIGN[align] ?? ALIGN.base
      )}
    >
      {/* ref .tt-wrap — margin-bottom 20 once the row stacks, plus a 20px right margin
          at <=479 */}
      <div className="max-md:mb-5 max-sm:mr-5">
        {/* ref h2.h2-tag.mrg16 where there is a lead, h2.h2-tag.mrgtbm0 where there is not */}
        <h2 className={cx(H2, sub ? H2_MB.mrg16 : H2_MB.mrgtbm0)}>{heading}</h2>
        {sub && <div className={cx(SUB, SUB_SPACING[subSpacing] ?? '')}>{sub}</div>}
      </div>
      {button && (
        /* ref a.button-regular — Eligibility's "View Admission Policy" and Fee Structure's
           "View Fee Structure" carry `target="_blank"`; Scholarships' does not, so the flag
           travels with the button rather than being assumed */
        <ButtonRegular
          href={button.href}
          variant={button.variant ?? 'pink-cta'}
          newTab={button.newTab}
        >
          {button.label}
        </ButtonRegular>
      )}
    </div>
  );
}
