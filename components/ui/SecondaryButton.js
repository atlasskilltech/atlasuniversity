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
/* the colour lives in each variant: two background utilities in one class list are
   resolved by stylesheet order, not by the order they are written */
const BASE =
  'block flex-none rounded-3xl px-4 py-2.5 no-underline ' +
  'max-md:flex max-md:h-auto max-md:items-center max-md:justify-center max-md:text-left max-md:text-sm';

const VARIANTS = {
  /* ref :where(.w-variant-25d04a90-3822-0d33-318d-11d2b1182066) */
  atlas: 'bg-atlas-cyan text-xs font-bold text-black',
  /* ref :where(.w-variant-cd63ac8f-e9d1-28e5-65be-c92638a85e3d) */
  'ugdx-med': 'bg-atlas-cyan text-base font-semibold text-black',
  /*
   * ref the bare `.secondary-btn` on the ISDI sheet (`…--variant="pink"`, which
   * carries no variant class of its own): #d20158 with white text, 12px/600 and
   * 14px at <=767 like every other. The B.Des pages' "Apply for July 2027 Intake",
   * inside the first admissions step.
   */
  'isdi-pink': 'bg-atlas-cta text-xs font-semibold text-white',
  /* ref :where(.w-variant-b6660a09-057f-2e2a-0429-adb432a01cff) — ISME's "View more" beside an About
     section heading: #07f6a0 / black 12px/600, 38px tall (14px, 41 tall at <=767). Measured at
     1440 / 768 / 390. */
  'isme-mint': 'bg-atlas-mint text-xs font-semibold text-black',
  /* ref :where(.w-variant-bff4a6fe-8ba7-8999-ff5e-ea8f27db7116) — the uGDX programme cards' "Explore
     Program": #eb1f3c / white 16px 500 (14px at <=767 like every other) */
  'ugdx-red': 'bg-[#eb1f3c] text-base font-medium text-white',
};

/*
 * ref `…--variant="responsive-mint"` (ISME, e.g. "Know More" under About Northeastern University):
 * a BLOCK that fills its column, #07f6a0 / black 12px/18 600, p 10/16, r24; at <=767 a 32px-tall
 * flex pill on WHITE with a 12px line box. It keeps 12px where every other variant steps to 14, so it
 * carries its own base string rather than fighting BASE's `max-md:text-sm`. Measured at 1440/768/390.
 */
const ISME_RESPONSIVE_MINT =
  'block w-full flex-none rounded-3xl bg-atlas-mint px-4 py-2.5 text-xs font-semibold leading-[18px] text-black no-underline ' +
  'max-md:flex max-md:items-center max-md:bg-white max-md:leading-3';

export default function SecondaryButton({ href, variant = 'ugdx-med', className, children }) {
  if (variant === 'responsive-mint') {
    return (
      <SmartLink href={href} className={cx(ISME_RESPONSIVE_MINT, className)}>
        {children}
      </SmartLink>
    );
  }
  return (
    <SmartLink href={href} className={cx(BASE, VARIANTS[variant] ?? VARIANTS['ugdx-med'], className)}>
      {children}
    </SmartLink>
  );
}
