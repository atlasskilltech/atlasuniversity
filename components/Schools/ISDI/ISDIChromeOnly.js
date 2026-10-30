'use client';

import { usePathname } from 'next/navigation';

/**
 * Renders its children (the ISDI header / footer) on every ISDI route EXCEPT
 * the bare standalone pages that the reference does not wrap in header.php.
 *
 * `reference/schools/isdi/celebrating-13-years-isdi-and-parsons/index.php` is a
 * self-contained `<!doctype html>` page — just Bootstrap and one full-width SVG,
 * no ISDI chrome — and production serves it exactly that way. It still lives at
 * `/schools/isdi/*`, so `app/schools/isdi/layout.js` would otherwise mount the
 * ISDI header and footer around it. This guard steps the chrome aside there, the
 * same way `components/Schools/MainSiteOnly` steps the ATLAS chrome aside on
 * `/schools/*`.
 *
 * `usePathname` only — like `MainSiteOnly` and `Header` — so every route still
 * prerenders static.
 */
const BARE = ['/schools/isdi/celebrating-13-years-isdi-and-parsons'];

export default function ISDIChromeOnly({ children }) {
  const pathname = usePathname();
  if (BARE.includes(pathname)) return null;
  return children;
}
