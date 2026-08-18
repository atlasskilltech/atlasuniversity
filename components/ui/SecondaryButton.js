import SmartLink from '@/components/SmartLink';
import { cx } from '@/lib/cx';

/**
 * The reference's `.secondary-btn` — the single source of truth for this pill.
 *
 * It appears on both pages (8 times in index.php, 6 in about-us.php) and used to
 * be inlined separately in four homepage sections plus the About page. The class
 * string below is the homepage's already-verified one, so consolidating changed
 * nothing there.
 *
 * ── Measured ──────────────────────────────────────────────────────────────
 *                              >=768px                      <=767px
 *   base                       block, r24, padding 10/16,   flex, centred,
 *                              #5cbdca, black, no underline height auto, 14px,
 *                                                           text-left
 *   `atlas`   (25d04a90…)      12px/700  -> 38px tall       14px
 *   `ugdx-med`(cd63ac8f…)      16px/600  -> 44px tall       14px
 *
 * **No hover, focus or active styling.** Neither stylesheet defines any state
 * rule for `.secondary-btn`, so the pill is deliberately inert — adding a hover
 * fade here would make the shared button behave differently from the rest of the
 * site.
 */

/* ref .secondary-btn */
const BASE =
  'block flex-none rounded-3xl bg-atlas-cyan px-4 py-2.5 text-black no-underline ' +
  'max-md:flex max-md:h-auto max-md:items-center max-md:justify-center max-md:text-left max-md:text-sm';

const VARIANTS = {
  /* ref :where(.w-variant-25d04a90-3822-0d33-318d-11d2b1182066) */
  atlas: 'text-xs font-bold',
  /* ref :where(.w-variant-cd63ac8f-e9d1-28e5-65be-c92638a85e3d) */
  'ugdx-med': 'text-base font-semibold',
};

export default function SecondaryButton({ href, variant = 'ugdx-med', className, children }) {
  return (
    <SmartLink href={href} className={cx(BASE, VARIANTS[variant] ?? VARIANTS['ugdx-med'], className)}>
      {children}
    </SmartLink>
  );
}
