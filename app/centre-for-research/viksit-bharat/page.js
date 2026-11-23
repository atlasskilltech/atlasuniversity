import InnerPageHero from '@/components/ui/InnerPageHero';
import ShapingViksitBharat from '@/components/About/ShapingViksitBharat';
import ViksitSlider from '@/components/IndustryPartnership/ViksitSlider';
import AboutStory from '@/components/Partnership/AboutStory';
import { TextSection, ListSection, PhotoRow } from '@/components/CentreForResearch/Blocks';
import { viksitPage, viksitConference as vc } from '@/lib/centreForResearchContent';

const TITLE = 'VIKSIT Bharat – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = viksitPage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/viksit-bharat' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/viksit-bharat — the "VIKSIT Bharat" card of /centre-for-research's "Research and
 * Innovation". The National Conference write-up (content supplied by ATLAS, 2026-11-23), then About Us's "Shaping a Viksit Bharat,
 * Together" and /atlas-industry-partnership's "Driving India's Vision of Viksit Bharat Together".
 */
export default function CentreForResearchViksitPage() {
  return (
    <>
      <InnerPageHero hero={viksitPage.hero} />
      {/* the National Conference write-up (content supplied 2026-11-23) */}
      <TextSection heading={vc.heading}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={vc.photo.src} alt={vc.photo.alt} className="mx-auto mt-8 block h-auto w-full max-w-[549px] rounded-tl-[32px] rounded-br-[32px]" />
      </TextSection>
      <AboutStory
        story={{ heading: vc.about.heading, text: vc.about.text, image: vc.about.image }}
        container="webflow"
        spacer={false}
        headingMargin={32}
        photoClip
      />
      <ListSection heading={vc.themes.heading} lead={vc.themes.lead} items={vc.themes.items} />
      <TextSection heading={vc.impact.heading} paragraphs={vc.impact.paragraphs}>
        <PhotoRow photos={vc.impact.photos} />
      </TextSection>
      <TextSection heading={vc.acknowledgement.heading} paragraphs={vc.acknowledgement.paragraphs} columns={1} />
      <ShapingViksitBharat />
      <ViksitSlider />
    </>
  );
}
