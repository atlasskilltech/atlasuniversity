import { cx } from '@/lib/cx';
import ButtonRegular from '@/components/ui/ButtonRegular';
import { MobileIcoButton } from '@/components/Schools/ISME/Bba/Guide';
import withBreaks from '@/lib/withBreaks';
import { H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * ISME `.head-wrap(.top) > (.tt-wrap > (h2.h2-tag.mrg16, .sub-heading), a.button-regular)` — the
 * heading row most ISME sections open with. Same chassis as the ISDI one
 * (`Schools/ISDI/Admission/HeadWrap`), but the ISME sheet's `.h2-tag` is the ATLAS one —
 * 44px/1.2 weight 500 down to 768, 36px below — where ISDI's is 400 and turns at 991, so it
 * is its own small component. Measured on https://atlasuniversity.edu.in/schools/isme/:
 *
 *   row     flex, space-between; `.top` aligns start; at <=767 a stretched column, gap 16,
 *           margin-bottom by modifier (see MARGIN)
 *   tt-wrap margin-bottom 20 at <=767, margin-right 20 at <=479
 *   h2      mb 16 (8 at <=767) with a lead, none without
 *   lead    `.sub-heading` — 24/1.4 300, pr 50; 16/1.5 with 20px vertical padding at <=767
 */
const ALIGN = {
  top: 'items-start max-md:gap-4',
  base: 'items-end',
};
/* the row's bottom margin, by modifier — a prop rather than a className so two margin utilities
   never meet in one class list (stylesheet order would decide between them):
     top        `.head-wrap.top`          16 at <=767
     base       `.head-wrap`              none
     mrgbtm     `.head-wrap.mrgbtm`       56, 20 at <=767
     mobileGap  `.head-wrap.mobile-gap`   none at 480-767, 20 at <=479 */
const MARGIN = {
  top: 'max-md:mb-4',
  base: '',
  mrgbtm: 'mb-14 max-md:mb-5',
  mobileGap: 'max-sm:mb-5',
};

/* `headingMb` — the h2's own modifier when it differs from the lead rule (`.mrg16` with no lead) */
/* `subClass` — the lead's own modifier when it carries one (`.sub-heading.mrgbtm`) */
export default function HeadWrap({ heading, sub, button, align = 'top', margin, className, headingMb, subClass }) {
  return (
    <div
      className={cx(
        'flex justify-between max-md:flex-col max-md:items-stretch',
        ALIGN[align],
        MARGIN[margin ?? align],
        className,
      )}
    >
      <div className="max-md:mb-5 max-sm:mr-5">
        <h2 className={cx(H2, headingMb ?? (sub ? 'mb-4 max-md:mb-2' : 'mb-0'))}>{withBreaks(heading)}</h2>
        {sub && <div className={subClass ?? SUB_INNER}>{withBreaks(sub)}</div>}
      </div>
      {/* `.mobile-ico-button > a.button-regular` — the pill that becomes a 38px arrow circle at <=540 */}
      {button?.mobileIco && <MobileIcoButton button={button} />}
      {button && !button.mobileIco && (
        <ButtonRegular href={button.href} variant={button.variant ?? 'mint'} newTab={button.newTab}>
          {button.label}
        </ButtonRegular>
      )}
    </div>
  );
}
