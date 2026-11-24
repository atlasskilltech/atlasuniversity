import InnerPageHero from '@/components/ui/InnerPageHero';
import Relations from '@/components/IndustryPartnership/Relations';
import InfoBanner from '@/components/ui/InfoBanner';
import { banner } from '@/lib/industryPartnershipContent';
import { consultancyPage } from '@/lib/centreForResearchContent';

const TITLE = 'Consultancy Services – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = consultancyPage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/consultancy-services' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/consultancy-services — the "Consultancy Services" card of /centre-for-research's
 * "Research and Innovation". The site has no dedicated content for it; the page is the card's
 * description plus /atlas-industry-partnership's "Industry Partnerships and MoU's" section and its
 * "Get in touch" banner, both unchanged.
 */
export default function CentreForResearchConsultancyPage() {
  return (
    <>
      <InnerPageHero hero={consultancyPage.hero} />
      <Relations />
      <InfoBanner
        banner={{
          ...banner,
          contact: (
            <>
              <strong className="font-bold">{banner.contact.split(':')[0]}:</strong>
              {banner.contact.slice(banner.contact.indexOf(':') + 1)}
            </>
          ),
        }}
        titleClassName="max-md:mb-4 max-sm:mb-[14px]"
      />
    </>
  );
}
