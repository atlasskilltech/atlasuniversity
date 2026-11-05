/**
 * Reserves the height the fixed header occupies: 48px utility bar + 156px logo
 * and menu bar on desktop, 80px logo bar on mobile.
 *
 * It is NOT rendered in the root layout. The reference lets full-bleed sections
 * (the homepage hero, school landing banners) start at y=0 so the translucent
 * header floats over them. Pages that open with ordinary content should render
 * this first instead.
 */
export default function HeaderSpacer() {
  return <div className="h-204 max-lg:h-20" aria-hidden="true" />;
}
