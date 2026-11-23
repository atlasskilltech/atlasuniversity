import InnerPageHero from '@/components/ui/InnerPageHero';
import AboutStory from '@/components/Partnership/AboutStory';
import CareerSupportCard from '@/components/ui/CareerSupportCard';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';
import { srdcPage } from '@/lib/centreForResearchContent';

const TITLE = 'SRDC – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION =
  'The Student Research and Development Cell (SRDC) of ATLAS SkillTech University builds a research culture through webinars, workshops, conferences and the AAROHAN summits.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/srdc' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/srdc — the "SRDC" card of /centre-for-research's "Research and Innovation".
 * Built from content the site already has (the Aarohan pages' SRDC copy and summit names) in
 * /centre-for-research's own components: hero, About story, and the same research card row,
 * here linking to the three AAROHAN summits.
 */
export default function CentreForResearchSrdcPage() {
  const { hero, about, summits } = srdcPage;
  return (
    <>
      <InnerPageHero hero={hero} />

      <AboutStory
        story={{ heading: about.heading, text: about.text, image: about.image }}
        container="webflow"
        spacer={false}
        headingMargin={32}
        photoClip
      />

      <div className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-0 ${H2}`}>{summits.heading}</h2>
          <div className="flex flex-wrap items-start justify-center gap-[22px] pt-14 max-md:pt-10">
            {summits.cards.map((card) => (
              <CareerSupportCard key={card.title} card={card} titleVariant="poppins" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
