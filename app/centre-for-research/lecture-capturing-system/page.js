import InnerPageHero from '@/components/ui/InnerPageHero';
import { LibraryEContent } from '@/components/Library/Sections';
import { eContent } from '@/lib/libraryContent';
import { lecturePage } from '@/lib/centreForResearchContent';

const TITLE = 'Lecture Capturing System – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = lecturePage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/lecture-capturing-system' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/lecture-capturing-system — the "Lecture Capturing System" card of
 * /centre-for-research's "Research and Innovation". The site has no dedicated content for it; the page
 * is the card's description plus /library's "ATLAS E-Content" section (the E-Content system and its
 * Swayam courses, "supported by our specialized lecture capturing technology"), rendered unchanged
 * inside the Library page's own type wrapper.
 */
export default function CentreForResearchLecturePage() {
  return (
    <>
      <InnerPageHero hero={lecturePage.hero} />
      <div data-lib-root className="mx-auto max-w-[1920px] pt-[60px] max-md:pt-10 font-poppins-library text-[16px] leading-[1.5] text-[#212529]">
        <LibraryEContent data={eContent} />
      </div>
    </>
  );
}
