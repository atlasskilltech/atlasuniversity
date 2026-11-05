import CourseCoverHero from '@/components/ui/CourseCoverHero';
import { AdmissionKeyDates, AdmissionEligibility, FeeStrip, UgdxSteps } from '@/components/Schools/LawUgdx/Admission';
import SchoolBanner from '@/components/Schools/LawUgdx/SchoolBanner';
import WebflowFaq from '@/components/Schools/LawUgdx/WebflowFaq';
import { moreQuestions } from '@/lib/schools/lawUgdxCommon';
import { meta, hero, howToApply, keyDates, eligibility, fees, banner, faq } from '@/lib/schools/ugdx/admissionsContent';

export const metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/ugdx/admissions/ugdx-admissions' },
};

/**
 * /schools/ugdx/admissions/ugdx-admissions — reference/ugdx/admissions/ugdx-admissions.php, the B.Tech
 * admissions page, under the ATLAS header and footer as production serves it. Seven blocks in the
 * reference's order. The key dates (keydates/btech.php, database-driven) and the fee strip are a dated
 * snapshot of production (lib/schools/ugdx/admissionsContent.js). The FAQ is the page's own inline
 * Webflow list with the "More questions?" panel inside it, so it is `WebflowFaq`, not the shared
 * Bootstrap `Home/FAQ`.
 */
export default function UgdxAdmissionsPage() {
  return (
    <>
      <div data-block="hero">
        <CourseCoverHero hero={hero} size="screen" />
      </div>
      <UgdxSteps data={howToApply} />
      <AdmissionKeyDates data={keyDates} />
      <AdmissionEligibility data={eligibility} tone="ugdx" />
      <FeeStrip data={fees} tone="ugdx" />
      <div id="scholarship">
        <SchoolBanner block="scholarship" banner={banner} tone="ugdxSquare" fullBleed />
      </div>
      <WebflowFaq data={faq} search={moreQuestions} searchVariant="ugdx" />
    </>
  );
}
