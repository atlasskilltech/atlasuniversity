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
      <div className={v.text}>{children}</div>
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
