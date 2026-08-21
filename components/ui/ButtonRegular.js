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
    shell: 'h-[54px] bg-atlas-teal max-md:h-11 max-vsm:my-[18px]',
    text: 'text-[18px] leading-[1.5] max-md:text-[14px]',
  },
  'altas-med': {
    shell: 'h-11 bg-atlas-cyan text-[14px] font-medium leading-[1.5]',
    text: 'text-[14px] leading-[1.5]',
  },
};

export default function ButtonRegular({
  href,
  external,
  newTab,
  variant = 'atlas',
  children,
  className,
}) {
  const v = VARIANTS[variant] ?? VARIANTS.atlas;
  return (
    /* ref a.button-regular */
    <SmartLink
      href={href}
      external={external}
      newTab={newTab}
      className={cx(
        'flex max-w-full flex-none items-center justify-center gap-2.5 rounded-[27px]',
        'px-5 text-black no-underline',
        v.shell,
        className,
      )}
    >
      {/* ref .extra-space */}
      <div className="flex flex-none items-center justify-start gap-2.5 text-[14px] leading-[1.5]">
        {/* ref .button-text */}
        <div className={v.text}>{children}</div>
      </div>
    </SmartLink>
  );
}
