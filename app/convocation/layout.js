import { convocationFontClassName } from '@/lib/convocation/fonts';

/**
 * /convocation — a standalone story page (reference/new pages/convocation.zip). It renders none of
 * the ATLAS chrome (components/Schools/MainSiteOnly steps aside for this prefix); the page carries its
 * own header, menu and footer. This layout only loads the page's self-hosted fonts.
 */
export default function ConvocationLayout({ children }) {
  return <div className={convocationFontClassName}>{children}</div>;
}
