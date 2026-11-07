import { lpFontClassName } from '@/lib/landing/lp2027/fonts';

/*
 * /lp/* — the 2027 admissions landing pages (reference/new pages/lp.zip). Each page ships its own header
 * and footer; the ATLAS chrome is already stepped aside for /lp by components/Schools/MainSiteOnly. This
 * layout only registers the self-hosted web fonts the pages use (lib/landing/lp2027/fonts.js).
 */
export default function LpLayout({ children }) {
  return <div className={lpFontClassName}>{children}</div>;
}
