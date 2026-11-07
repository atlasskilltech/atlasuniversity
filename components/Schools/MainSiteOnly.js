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
 * `/map` steps it aside too: the interactive website map is a standalone,
 * full-viewport application with its own app bar (components/Map/MapExplorer),
 * not a content page, so it renders no site header or footer.
 *
 * `/contact-us` too: production serves it as a standalone document (a photo panel and the CRM
 * enquiry form, no site header or footer).
 *
 * `/brand` too: the Brand Kit is its own site in the reference (reference/brand/), with its own
 * header and footer (components/Brand/chrome, mounted by app/brand/layout.js).
 *
 * `usePathname` only — like `Header` and `PageLoader` — so every route still
 * prerenders static.
 */
/* The School of Law and uGDX are the exception among the schools: production serves them under the
   ATLAS header and footer (their header.php / footer.php are older copies of the ATLAS ones, and the
   rendered navigation and footer are link-for-link identical to the ATLAS homepage's — verified), so
   the ATLAS chrome stays on there. */
const ATLAS_CHROME_SCHOOLS = ['/schools/law', '/schools/ugdx'];

/* Standalone sites ported from reference/new pages/ — each ships its own header (and footer, where it
   has one) in the reference, never the ATLAS chrome: the Tim Cook and Convocation stories, the three
   Aarohan conference sites, the admissions landing pages and the Sensorium fashion-show site. Matched by
   whole path segment, so `/lp` does not catch `/library`. */
const STANDALONE = [
  '/timcook',
  '/convocation',
  '/aarohan23',
  '/aarohan2024',
  '/aarohan2025',
  '/lp',
  '/lp23',
  '/lp24',
  '/lp25',
  '/lp2022',
  '/sensorium',
];

export default function MainSiteOnly({ children }) {
  const pathname = usePathname();
  if (ATLAS_CHROME_SCHOOLS.some((p) => pathname === p || pathname?.startsWith(`${p}/`))) return children;
  if (pathname === '/schools' || pathname?.startsWith('/schools/')) return null;
  if (pathname === '/map' || pathname?.startsWith('/map/')) return null;
  if (pathname === '/contact-us') return null;
  if (pathname === '/brand' || pathname?.startsWith('/brand/')) return null;
  // The ATLAS Tech PDF Studio is a standalone application with its own header (components/PdfStudio):
  // the studio, its embeddable flipbook viewer and its bare print view all render without the site chrome.
  if (pathname === '/pdf-studio' || pathname?.startsWith('/pdf-studio/')) return null;
  if (STANDALONE.some((p) => pathname === p || pathname?.startsWith(`${p}/`))) return null;
  return children;
}
