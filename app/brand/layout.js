import BrandHeader from '@/components/Brand/chrome/BrandHeader';
import BrandFooter from '@/components/Brand/chrome/BrandFooter';

/**
 * /brand renders the Brand Kit's own chrome (reference/brand/components/header.html and
 * footer.html) in place of the ATLAS header and footer, which step aside on this route via
 * components/Schools/MainSiteOnly — the same mechanism /schools/*, /map and /contact-us use.
 */
export default function BrandLayout({ children }) {
  return (
    <div className="bg-brand-paper text-brand-ink">
      <BrandHeader />
      {children}
      <BrandFooter />
    </div>
  );
}
