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
  'flex flex-none items-center gap-3 h-14 max-w-full px-6 rounded-[36px] ' +
  'text-lg font-medium leading-none no-underline max-md:h-10';

const VARIANTS = {
  // ref .btn-primary:where(.w-variant-9df390f6-abdb-218d-e8a6-500b981692ba)
  atlas: 'text-black bg-atlas-teal',
  // ref .btn-primary:where(.w-variant-edbe4a85-a762-b5b5-c583-585856b72378)
  outline: 'text-white bg-transparent border-2 border-white',
};

/* ref .button-tx */
const TEXT = 'text-[16px] max-md:text-[12px]';

export default function PrimaryButton({
  href,
  external,
  newTab,
  variant = 'atlas',
  icon,
  children,
  className,
}) {
  return (
    <SmartLink
      href={href}
      external={external}
      newTab={newTab}
      className={cx(BASE, VARIANTS[variant], className)}
    >
      <div className={TEXT}>{children}</div>
      {/* ref .btn-pr-icon */}
      {icon && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={icon} alt="" width={16} height={16} className="max-md:w-3" />
      )}
    </SmartLink>
  );
}
