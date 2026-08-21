import SmartLink from '@/components/SmartLink';
import { cx } from '@/lib/cx';

/**
 * The reference's `.btn-primary` — the site's filled call-to-action pill.
 *
 * The same element on every page that uses it: the homepage hero
 * (`index.php:54-90`), "Your Future Begins Here." (`index.php:3533-3546`), and
 * the /campus-atlas hero and "Experience the ATLAS Campus in Person" banner
 * (`campus-atlas.php:27-30`, `campus-atlas.php:723-727`). Identical measured
 * cascade in all four places:
 *
 *                          >=768px                     <=767px
 *   a.btn-primary          h56, px24, gap12, r36,      h40
 *                          18px/500, line-height 1
 *     .btn-primary(atlas)  #02b3c3 on black
 *     .btn-primary(outline) transparent, 2px white border, white text
 *   .button-tx             16px/500                    12px
 *   .btn-pr-icon           16px natural                12px
 *
 * The anchor sets `line-height: 1`, which `.button-tx` inherits — hence the
 * arbitrary `text-[16px]` rather than `text-base`, whose bundled 1.5 would win
 * over an inherited value. Neither stylesheet declares a hover, focus or active
 * state for this button, so this component declares none either: a page never
 * passes it appearance, only content.
 */

/* ref .btn-primary */
const BASE =
  'flex flex-none items-center gap-3 px-6 rounded-[36px] ' +
  'text-lg font-medium leading-none no-underline';

/*
 * `.btn-primary` is 56px tall and drops to 40 at 767. `.btn-ca` — declared only
 * in /admissions/ug-admissions' own `<style>` block, for its hero's "Continue
 * Application" button — is the same pill in every other respect but drops at
 * **576** instead, and declares no `max-width`. Between 577 and 767 that leaves
 * it 16px taller than the `.btn-primary`s beside it, which is what the
 * reference paints.
 */
const VARIANTS = {
  // ref .btn-primary:where(.w-variant-9df390f6-abdb-218d-e8a6-500b981692ba)
  atlas: 'h-14 max-w-full text-black bg-atlas-teal max-md:h-10',
  // ref .btn-primary:where(.w-variant-edbe4a85-a762-b5b5-c583-585856b72378)
  outline: 'h-14 max-w-full text-white bg-transparent border-2 border-white max-md:h-10',
  // ref .btn-ca
  'atlas-576': 'h-14 text-black bg-atlas-teal max-576:h-10',
  /*
   * ref .btn-primary:where(.w-variant-6b63810f-e988-0cce-bafa-92afc0c78b1c) —
   * /programs/programs-list-integrated's only button shape. A 44px outline pill
   * rather than the 56px filled one: transparent, 1px solid black, black text.
   * All four instances on that page carry this class, even the one whose
   * `data-wf--button-primary--variant` reads "law" — the attribute is inert and
   * the class is what the sheet keys off.
   */
  'outline-medium':
    'h-11 max-w-full border border-solid border-black bg-transparent text-center text-black max-md:h-10',
};

/*
 * ref .button-tx. Every page's sheet drops the label to 12px at <=767, but they
 * do not agree on the base size: most declare `font-size: 16px`, and
 * /programs/ug-programs-atlas' sheet declares **no base rule at all**, so the
 * label there inherits the button's own 18px and the pill measures 20px wider.
 * `text-[18px]` is that inherited value written explicitly.
 */
const TEXT = {
  default: 'text-[16px] max-md:text-[12px]',
  inherit: 'text-[18px] max-md:text-[12px]',
};

export default function PrimaryButton({
  href,
  external,
  newTab,
  variant = 'atlas',
  textSize = 'default',
  icon,
  children,
  className,
  onClick,
  ...rest
}) {
  const classes = cx(BASE, VARIANTS[variant], className);
  const label = (
    <>
      <div className={TEXT[textSize]}>{children}</div>
      {/* ref .btn-pr-icon */}
      {icon && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={icon} alt="" width={16} height={16} className="max-md:w-3" />
      )}
    </>
  );

  /*
   * The reference authors every one of these as an `<a>`, but a few carry
   * `href="#"` and exist only to open a dialog — /programs/programs-list-integrated's
   * "Download Brochure" pair. Those render as a real `<button>`: it never
   * navigates, so an anchor would be the wrong control and would put a bare `#`
   * in the browser's status bar.
   */
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} {...rest}>
        {label}
      </button>
    );
  }

  return (
    <SmartLink
      href={href}
      external={external}
      newTab={newTab}
      className={classes}
      {...rest}
    >
      <div className={TEXT[textSize]}>{children}</div>
      {/* ref .btn-pr-icon */}
      {icon && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={icon} alt="" width={16} height={16} className="max-md:w-3" />
      )}
    </SmartLink>
  );
}
