import InnerPageHero from '@/components/ui/InnerPageHero';
import DocumentLinks from '@/components/Statutory/DocumentLinks';
import { hero, links } from '@/lib/examinationContent';

/* ref examination.php `$title` / `$description` / `$keywords` */
const TITLE = 'Exam Timetables & Guidelines  – ATLAS SkillTech University';
const DESCRIPTION =
  'Find exam timetables, important dates, instructions, grading policies and resources to help students prepare effectively for assessments and exams.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/examination' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /examination — reference/examination.php: the inner hero (title only) over the bulleted document
 * list, `components/Statutory/DocumentLinks` (extracted from this page, unchanged, when /nirf turned
 * out to repeat it — its header records the measurements).
 */
export default function ExaminationPage() {
  return (
    <>
      <InnerPageHero hero={hero} />
      <DocumentLinks links={links} />
    </>
  );
}
