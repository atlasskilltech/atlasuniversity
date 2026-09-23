'use client';

import { usePathname } from 'next/navigation';

/**
 * Renders its children everywhere except under `/schools/`.
 *
 * The ATLAS header and footer are mounted once in `app/layout.js`. Each school
 * is a separate site in the reference with its own header.php / footer.php, so
 * a school's layout (e.g. app/schools/isdi/layout.js) mounts its own chrome and
 * the ATLAS chrome must step aside on those routes.
 *
 * Why not a route group: an `app/(atlas)/` group would mean moving every
 * finished route, and the root layout is the only place that has to know. This
 * keeps the existing routes exactly where they are.
 *
 * `usePathname` only — like `Header` and `PageLoader` — so every route still
 * prerenders static.
 */
export default function MainSiteOnly({ children }) {
  const pathname = usePathname();
  if (pathname === '/schools' || pathname?.startsWith('/schools/')) return null;
  return children;
}
