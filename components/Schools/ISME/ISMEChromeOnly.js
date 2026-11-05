'use client';

import { usePathname } from 'next/navigation';

/**
 * Renders its children (the ISME header / footer) on every ISME route EXCEPT the pages the
 * reference does not wrap in ISME's own header.php / footer.php:
 *
 *   /schools/isme/note   `reference/schools/isme/note.php` includes the ATLAS root header.php and
 *                        footer.php (`../../assets/include/…`), so production serves it in the ATLAS
 *                        chrome; the page renders that chrome itself.
 *
 *   /schools/isme/life@atlas-isme/test   `part="footer"` only: the unlinked draft carries the ISME
 *                        header but production serves it with no footer.
 *
 * The mirror of `components/Schools/ISDI/ISDIChromeOnly`. `usePathname` only, so every route still
 * prerenders static.
 */
const NOT_ISME = ['/schools/isme/note'];
const NO_FOOTER = ['/schools/isme/life@atlas-isme/test'];

export default function ISMEChromeOnly({ children, part }) {
  const pathname = usePathname();
  if (NOT_ISME.includes(pathname)) return null;
  if (part === 'footer' && NO_FOOTER.includes(decodeURIComponent(pathname))) return null;
  return children;
}
