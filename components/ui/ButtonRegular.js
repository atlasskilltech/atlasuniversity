import SmartLink from '@/components/SmartLink';
import { cx } from '@/lib/cx';

/**
 * `.button-regular` with the `atlas` variant — the pill next to the
 * "The council members" heading on /life-at-atlas (`life-at-atlas.php:483-497`),
 * and the third of the site's button shapes after `.btn-primary`
 * (`components/ui/PrimaryButton`) and `.secondary-btn`
 * (`components/ui/SecondaryButton`).
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                    <=767px
 *   .button-regular          h 54, padding 0 20,        h 44 (margin 18 0
 *   (atlas variant)          gap 10, radius 27,          below 541px)
 *                            #000 on #02b3c3, flex,
 *                            centred
 *   .extra-space             flex, gap 10, align        same
 *                            centre, 14px/1.5
 *   .button-text             18px/1.5                   14px
 *
 * `.extra-space` also holds a `<script>` that sets
 * `style.fontSize = getAttribute('data-font-size') + 'px'` on every
 * `.button-text`. The attribute is empty on this page, so the assignment is the
 * invalid string "px" and the size never moves off the stylesheet's — nothing
 * to port.
 *
 * No hover, focus or active rule exists for this variant in the page's
 * stylesheet, so this component declares none.
 */
/*
 * ref the two `.button-regular` variants the rebuild uses.
 *
 *   atlas      `w-variant-58b88113…` — h54 (44 at <=767), #000 on #02b3c3,
 *              and `.button-text` at the stylesheet's 18px (14 at <=767).
 *              /life-at-atlas.
 *   altas-med  `w-variant-9ad79873…` — h**44** at every width, #000 on
 *              #5cbdca, and `font-size: 14px; font-weight: 500` on the button
 *              itself. /programs/programs-list-integrated.
 *
 * On the `altas-med` page the `.button-text` really is 14px, but not because of
 * the stylesheet — `.button-text { font-size: 18px }` would win. It is the
 * `.code-button` script, which sets `style.fontSize = getAttribute(
 * 'data-font-size') + 'px'` inline, and there the attribute holds a real `14`.
 * On /life-at-atlas the same attribute is empty, so the assignment is the
 * invalid string "px" and nothing moves. Both outcomes are static, so both are
 * expressed as a class rather than as a DOM-walking effect.
 */
const VARIANTS = {
  atlas: {
    shell: 'rounded-[27px] h-[54px] bg-atlas-teal text-black max-md:h-11 max-vsm:my-[18px]',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  'altas-med': {
    shell: 'rounded-[27px] h-11 bg-atlas-cyan text-black text-[14px] font-medium leading-[1.5]',
    text: 'text-[14px] leading-[1.5]',
  },
  /*
   * ref .button-regular with no variant class (`data-wf--button-regular--variant="base"`)
   * on the ISDI sheet: the base rule, #ec1376 with white text, 54px (44 at
   * <=767), label 18px (the `.extra-space` 14px at <=767). The ISDI homepage's
   * "Become an ISDI-ian" beside "Beliefs that build changemakers".
   */
  pink: {
    shell: 'rounded-[27px] h-[54px] bg-isdi-pink text-white max-md:h-11',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  /*
   * ref .button-regular:where(.w-variant-fae6c071…) (`small-icon`) — the same
   * pill on #d20158. The ISDI homepage's "View More Student Outcomes".
   */
  'pink-cta': {
    shell: 'rounded-[27px] h-[54px] bg-atlas-cta text-white max-md:h-11',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  /*
   * ref .button-regular:where(.w-variant-aac1b208…) — h48 (44 at <=767),
   * transparent behind a 1px white border, radius 24 rather than the base 27.
   * Its label measures 16px/1.5 at every width (the variant's own 14px loses to
   * `.button-text:where(841ffd43…)`, which is the class the markup carries).
   * The B.Des pages' Fee Structure / Admissions Policy / Education Loans /
   * ATLAS Scholarships buttons, on the blue eligibility band.
   */
  /*
   * ref .button-regular:where(.w-variant-cbcb4c54-d448-eb7e-0aae-e30b2c1e2405) ("mint") — the
   * ISME pill: #07f6a0 with black text, h54 (44 at <=767), label 18px/1.5 (14 at <=767).
   * Measured on https://atlasuniversity.edu.in/schools/isme/ "Join ATLAS ISME".
   */
  mint: {
    shell: 'rounded-[27px] h-[54px] bg-atlas-mint text-black max-md:h-11',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  /*
   * ref .button-regular:where(.w-variant-7c596127-5cbb-7233-c9e9-d85d1af7c9d8) ("mint-medium") —
   * the ISME programme cards' "Explore Program": #07f6a0 with #2b2b2b text, h48 (44 at <=767),
   * label 14px/1.5 (its `data-font-size="14"`, applied by the `.code-button` script).
   */
  'mint-medium': {
    shell: 'rounded-[27px] h-12 bg-atlas-mint text-[#2b2b2b] max-md:h-11',
    text: 'text-[14px] leading-[1.5]',
  },
  /*
   * ref .button-regular:where(.w-variant-20b95a2a-0025-3355-eea1-1e6ba4acdf5c) — the ISME BBA
   * admissions steps' "Apply for July 2026 Intake": transparent behind a 1px white border, h48
   * (44 at <=767), the base r27, label 18px/1.5 (14 at <=767).
   */
  'isme-outline': {
    shell: 'rounded-[27px] h-12 border border-solid border-white bg-transparent text-white max-md:h-11',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  /*
   * ref .button-regular:where(.w-variant-dcfd40a9-8aa3-9e62-11db-661d88c9e88e) — the ISME BBA
   * eligibility band's Fee Structure / Admissions Policy / … buttons: the same outline with
   * `border-radius: 0`.
   */
  'isme-outline-square': {
    shell: 'rounded-none h-12 border border-solid border-white bg-transparent text-white max-md:h-11',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  /*
   * ref .button-regular:where(.w-variant-7c596127…) ("mint-medium") with an empty
   * `data-font-size` — the ISME article tag pills: the same h48 / 44 pill, label 18px/1.5 (14 at <=767).
   */
  'mint-medium-18': {
    shell: 'rounded-[27px] h-12 bg-atlas-mint text-[#2b2b2b] max-md:h-11',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  /*
   * ref .button-regular:where(.w-variant-6c0fb2f7-6238-b9c1-b139-367a99f8693b) — the School of Law's
   * pill: #cb5827 with white text, the base h54 (44 at <=767) and r27, label 18px/1.5 (14 at <=767).
   * /schools/law/program-page-law's "Apply for July 2027 Intake" and "View a Sample Paper".
   */
  law: {
    shell: 'rounded-[27px] h-[54px] bg-[#cb5827] text-white max-md:h-11',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  /* ref .button-regular:where(.w-variant-e8c5c160-aa46-6207-7fd0-6e9f5edd5d37) — uGDX's #eb1f3c pill:
     white text, the base h54 (44 at <=767), label 18px/1.5 (14 at <=767). Measured on /schools/ugdx. */
  ugdx: {
    shell: 'rounded-[27px] h-[54px] bg-[#eb1f3c] text-white max-md:h-11',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  /* ref .button-regular:where(.w-variant-c0b2aa09-4601-7814-b1e0-7bc64d038488) ("ugdx-hover") — the uGDX
     admissions steps' "Apply for July 2027 Intake": transparent behind a 1px white border, #eb1f3c on
     hover, the base h54 (44 at <=767) and r27. Its label is `data-font-size="14"` (pass `labelSize`). */
  'ugdx-hover': {
    shell: 'rounded-[27px] h-[54px] border border-solid border-white bg-transparent text-white hover:bg-[#eb1f3c] max-md:h-11',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  'isdi-outline-white': {
    shell: 'h-12 rounded-[24px] border border-solid border-white bg-transparent text-white max-md:h-11',
    text: 'text-[16px] leading-[1.5]',
  },
};

export default function ButtonRegular({
  href,
  external,
  newTab,
  variant = 'atlas',
  children,
  className,
  onClick,
  /* `.button-text[data-font-size]` written inline by the page's `.code-button` script — an
     inline size beats every breakpoint rule, so it is an inline style here too. Optional; no
     existing caller passes it. */
  labelSize,
  ...rest
}) {
  const v = VARIANTS[variant] ?? VARIANTS.atlas;
  /* the radius lives in each variant: two radius utilities in one class list are
     resolved by stylesheet order, not by the order they are written */
  const classes = cx(
    'flex max-w-full flex-none items-center justify-center gap-2.5 px-5 no-underline',
    v.shell,
    className,
  );
  /* ref .extra-space > .button-text */
  const label = (
    <div className="flex flex-none items-center justify-start gap-2.5 text-[14px] leading-[1.5]">
      <div className={v.text} style={labelSize ? { fontSize: `${labelSize}px` } : undefined}>
        {children}
      </div>
    </div>
  );

  /*
   * A few of these are authored `href="#"` and exist only to open a dialog — the
   * B.Des pages' "Download Curriculum". Those render as a real `<button>`, as
   * `PrimaryButton` already does, so they never navigate.
   */
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} {...rest}>
        {label}
      </button>
    );
  }

  return (
    /* ref a.button-regular */
    <SmartLink href={href} external={external} newTab={newTab} className={classes} {...rest}>
      {label}
    </SmartLink>
  );
}
