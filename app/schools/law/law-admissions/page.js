import CourseCoverHero from '@/components/ui/CourseCoverHero';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import { GuideSteps } from '@/components/Schools/LawUgdx/Program';
import { AdmissionKeyDates, AdmissionEligibility, FeeStrip } from '@/components/Schools/LawUgdx/Admission';
import SchoolBanner from '@/components/Schools/LawUgdx/SchoolBanner';
import { moreQuestions } from '@/lib/schools/lawUgdxCommon';
import { meta, hero, howToApply, keyDates, eligibility, fees, banner, faq } from '@/lib/schools/law/admissionsContent';
import { withKeyDates } from '@/lib/keydates/store';

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/law/law-admissions' },
};

/**
 * /schools/law/law-admissions — reference/law/law-admissions.php, the BBA LL.B. admissions page, under
 * the ATLAS header and footer as production serves it. Eight blocks in the reference's order. The key
 * dates and the fee strip are a dated snapshot of production (lib/schools/law/admissionsContent.js):
 * the mirror's key-dates include is a cycle behind.
 */
/* Key dates come from the admin (/admin/keydates): re-checked at most every 60 s (lib/keydates/store) */
export const revalidate = 60;

export default async function LawAdmissionsPage() {
  const kd = await withKeyDates('law-admissions', keyDates);
  return (
    <>
      <div data-block="hero">
        <CourseCoverHero hero={hero} size="screen" />
      </div>
      <GuideSteps data={howToApply} tone="law" block="how-to-apply" id="how-to-apply" extraspace />
      <AdmissionKeyDates data={kd} />
      <AdmissionEligibility data={eligibility} tone="law" />
      <FeeStrip data={fees} tone="law" />
      <div id="scholarship">
        <SchoolBanner block="scholarship" banner={banner} tone="lawSquare" image="sm" fullBleed />
      </div>
      <div data-block="search" className={SECTION}>
        <div className={CONTAINER}>
          <div className="pt-10">
            <SearchQuestion data={moreQuestions} variant="law" />
          </div>
        </div>
      </div>
      <div data-block="faq">
        <FAQ data={faq} />
      </div>
    </>
  );
}
