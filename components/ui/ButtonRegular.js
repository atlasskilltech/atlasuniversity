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
export default function ButtonRegular({ href, external, newTab, children, className }) {
  return (
    /* ref a.button-regular (atlas variant) */
    <SmartLink
      href={href}
      external={external}
      newTab={newTab}
      className={cx(
        'flex h-[54px] max-w-full flex-none items-center justify-center gap-2.5 rounded-[27px]',
        'bg-atlas-teal px-5 text-black no-underline max-md:h-11 max-vsm:my-[18px]',
        className,
      )}
    >
      {/* ref .extra-space */}
      <div className="flex flex-none items-center justify-start gap-2.5 text-[14px] leading-[1.5]">
        {/* ref .button-text */}
        <div className="text-[18px] leading-[1.5] max-md:text-[14px]">{children}</div>
      </div>
    </SmartLink>
  );
}
