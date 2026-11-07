/* The Aarohan site frame: the template's self-hosted fonts, the body base (Open Sans 15px /
   1.75, #666 - style.css `body`), the year's header and footer. The inner wrapper is its own
   stacking context, as <body> is upstream, so the template's negative-z decorations (z-index
   -1 / -2) still paint above the page background. */
import { aarohanFonts } from '@/lib/aarohan/fonts';
import Header from './Header';
import Footer from './Footer';

export default function Shell({ site, year, children }) {
  return (
    <div className={aarohanFonts}>
      <div className="relative z-0 bg-white font-[AaOpen,sans-serif] text-[15px] font-normal leading-[1.75] text-[#666] antialiased">
        <Header site={site} year={year} />
        <main>{children}</main>
        <Footer site={site} />
      </div>
    </div>
  );
}
