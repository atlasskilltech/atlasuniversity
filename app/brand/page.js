import BrandToastProvider from '@/components/Brand/BrandToast';
import BrandHero from '@/components/Brand/sections/BrandHero';
import BrandFamily from '@/components/Brand/sections/BrandFamily';
import ColorsSection from '@/components/Brand/sections/ColorsSection';
import PairingsSection from '@/components/Brand/sections/PairingsSection';
import InUseSection from '@/components/Brand/sections/InUseSection';
import LogoBrowser from '@/components/Brand/logos/LogoBrowser';
import BrandTools from '@/components/Brand/tools/BrandTools';
import { H2, LEAD, PAGE, SECTION_Y } from '@/components/Brand/ui/styles';
import { LOGO_GROUPS, PRODUCT_GROUPS } from '@/lib/brand/data';
import { expandGroups } from '@/lib/brand/utils';

/**
 * /brand — port of `reference/brand/` (index.html, text-converter.html, image-tools.html,
 * pdf-tools.html) as one page. Its chrome is the Brand Kit's own header and footer
 * (app/brand/layout.js), not the ATLAS site's:
 *
 *   hero + colour strip      BrandHero
 *   #family                  BrandFamily
 *   #logos                   LogoBrowser over LOGO_GROUPS (8 brands)
 *   #products                LogoBrowser over PRODUCT_GROUPS (8 teams & products)
 *   #colors / #pairings      ColorsSection / PairingsSection
 *   #in-use                  InUseSection
 *   #tools                   BrandTools — Text Converter, Image Tools, PDF Tools as tabs
 *
 * Every logo file is served from public/assets/brand/ with its original filename and bytes.
 */
export const metadata = {
  title: 'ATLAS Brand Kit: Logos and Colors',
  description:
    'Official logos, logo variations and brand colors for ATLAS SkillTech University, ISDI, ISME, uGDX, School of Law, ATLAS Edge and CDOE.',
  alternates: { canonical: '/brand' },
};

/* the logo tab strips stick directly under the 64px Brand Kit header (ref `sticky top-16`) */
const STICKY = 'top-16';

const schoolGroups = expandGroups(LOGO_GROUPS);
const productGroups = expandGroups(PRODUCT_GROUPS);

const strong = 'font-semibold text-brand-indigo';

export default function BrandPage() {
  return (
    <BrandToastProvider>
      <main className="bg-brand-paper text-brand-ink [font-feature-settings:'tnum'_1]">
        <BrandHero />
        <BrandFamily />

        <section id="logos" className="scroll-mt-20 border-0 border-y border-solid border-brand-line bg-white">
          <div className={`${PAGE} ${SECTION_Y}`}>
            <div className="max-w-2xl">
              <h2 className={H2}>Logos</h2>
              <p className={LEAD}>
                Choose a brand, then download the file you need. Use <strong className={strong}>SVG</strong> for web, <strong className={strong}>PNG</strong> for documents and slides, and{' '}
                <strong className={strong}>AI</strong> or <strong className={strong}>PDF</strong> for print. Select a preview to see it larger.
              </p>
            </div>
            <LogoBrowser groups={schoolGroups} sectionId="logos" stickyClass={`bg-white/95 ${STICKY}`} searchLabel="Search logos" />
          </div>
        </section>

        <section id="products" className="scroll-mt-20 border-0 border-b border-solid border-brand-line bg-brand-paper">
          <div className={`${PAGE} ${SECTION_Y}`}>
            <div className="max-w-2xl">
              <h2 className={H2}>Teams &amp; Products</h2>
              <p className={LEAD}>
                Logos for the ATLAS teams and software products. These share one identity — the ATLAS cube on the <strong className={strong}>brand green</strong> — and are kept separate from the
                school logos above. Each comes in an <strong className={strong}>on-green</strong> version and a <strong className={strong}>reversed</strong> (white) version for dark backgrounds.
                Select a preview to see it larger.
              </p>
            </div>
            <LogoBrowser groups={productGroups} sectionId="products" product stickyClass={`bg-brand-paper/95 ${STICKY}`} searchLabel="Search team and product logos" />
          </div>
        </section>

        <ColorsSection />
        <PairingsSection />
        <InUseSection />
        <BrandTools />
      </main>
    </BrandToastProvider>
  );
}
