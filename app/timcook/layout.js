import { timcookFontClassName } from '@/lib/timcook/fonts';

/**
 * /timcook — a standalone story page (reference/new pages/timcook.zip). It renders none of the
 * ATLAS chrome (components/Schools/MainSiteOnly steps aside for this prefix); the page carries its
 * own header, mobile menu and footer. This layout only loads the page's self-hosted fonts.
 */
export default function TimCookLayout({ children }) {
  return <div className={timcookFontClassName}>{children}</div>;
}
