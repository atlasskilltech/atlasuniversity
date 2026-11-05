import ISMEHeader from '@/components/Schools/ISME/Header/ISMEHeader';
import ISMEFooter from '@/components/Schools/ISME/Footer/ISMEFooter';
import HeadingBars from '@/components/Schools/ISME/HeadingBars';
import ISMEChromeOnly from '@/components/Schools/ISME/ISMEChromeOnly';

// ref reference/schools/isme/index.php — $title / $description
export const metadata = {
  title: 'ATLAS ISME School of Management & Business',
  description:
    'Explore management programs, specializations, analytics, finance, marketing, industry exposure and future-ready business careers.',
};

/**
 * Every ISME page shares reference/schools/isme/assets/include/header.php and footer.php, so
 * both are mounted once here. The ATLAS chrome steps aside on /schools/*
 * (components/Schools/MainSiteOnly).
 */
export default function ISMELayout({ children }) {
  return (
    /* `display: contents` — no box, so the fixed header and every sticky element keep their own
       containing blocks; it only sets the font: ISME's header.php loads Manrope 300-700, so the
       ISME family (with true 400 and 600 faces — see globals.css) replaces the ATLAS one */
    <div className="contents font-sans [--font-manrope:'Manrope_ISME']">
      {/* the few pages the reference does not wrap in ISME's chrome — see ISMEChromeOnly */}
      <ISMEChromeOnly>
        <ISMEHeader />
      </ISMEChromeOnly>
      {/* every ISME page loads the Tailwind Play CDN, whose `.container` ladder
          the shared CONTAINER follows inside this attribute (components/Home/SectionHead) */}
      <div data-tw-container="">{children}</div>
      <ISMEChromeOnly part="footer">
        <ISMEFooter />
        <HeadingBars />
      </ISMEChromeOnly>
    </div>
  );
}
