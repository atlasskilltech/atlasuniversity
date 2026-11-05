import Hero from '@/components/Schools/ISDI/Admission/Hero';
import KeyDates from '@/components/Schools/ISDI/Admission/KeyDates';
import Eligibility from '@/components/Schools/ISDI/Admission/Eligibility';
import FeeStructure from '@/components/Schools/ISDI/Admission/FeeStructure';
import Scholarships from '@/components/Schools/ISDI/Admission/Scholarships';
import EducationLoans from '@/components/Schools/ISDI/Admission/EducationLoans';
import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import HowToApply from '@/components/Schools/ISDI/ProgramDetail/Admissions';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import FAQ from '@/components/Home/FAQ';
import {
  isdiAdmBdesHero,
  isdiAdmBdesMenu,
  isdiAdmBdesHowToApply,
  isdiAdmBdesKeyDates,
  isdiAdmBdesEligibility,
  isdiAdmBdesFees,
  isdiAdmBdesScholarships,
  isdiAdmBdesLoans,
  isdiAdmBdesFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/admissionsBdesContent';

/*
 * ref b-des.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open Graph
 * and Twitter tags. header.php prints `$description` into `twitter:title` as well — an
 * upstream mix-up every ISDI page carries; Next writes the title there, which is what the tag
 * is for. The canonical is the request URL.
 */
const TITLE = 'B.Des Admissions – ATLAS ISDI';
const DESCRIPTION =
  'Applying for B.Des? Explore specializations, eligibility, portfolio tips and start your design career today.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://atlasuniversity.edu.in/schools/isdi/admissions/undergraduate/b-des',
  },
  openGraph: {
    siteName: 'ATLAS SKILLTECH UNIVERSITY',
    title: TITLE,
    url: 'https://atlasuniversity.edu.in/',
    type: 'website',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * /schools/isdi/admissions/undergraduate/b-des — the ISDI header's
 * "Admissions > Undergraduate Degree > B.Des", and the first of the five ISDI Admissions
 * pages.
 *
 * A third ISDI template. Ten blocks: the `.course-cover-section` hero, the sticky anchor
 * menu, then six sections each with an `id` the menu scrolls to (How to Apply, Key Dates,
 * Eligibility, Fee Structure, ATLAS Scholarships, Education Loans), the "More questions?"
 * panel and the FAQ.
 *
 * Four of the ten are existing components driven by this page's data: `About/AnchorMenu`,
 * `ProgramDetail/Admissions` (the `.gd-steps` band, whose lead and button are optional now
 * because this page authors neither), `About/MoreQuestions` and the site-wide `FAQ`.
 *
 * Reference note: the reference gives **both** the "More questions?" panel and the FAQ
 * `id="faq"`. Only the FAQ keeps it, so the menu's "FAQs" link scrolls to the accordion
 * rather than to the panel above it — which is what production does, since a duplicate id
 * resolves to the first match and the panel is not what the link is for.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333).
 */
export default function ISDIAdmissionsBdesPage() {
  return (
    <main id="isdi-adm-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiAdmBdesHero} />
      {/* this page's bar is the bare `.sticky-menus`, so it is left-aligned */}
      <AnchorMenu links={isdiAdmBdesMenu} centered={false} />
      <HowToApply data={isdiAdmBdesHowToApply} />
      <KeyDates data={isdiAdmBdesKeyDates} />
      <Eligibility data={isdiAdmBdesEligibility} />
      <FeeStructure data={isdiAdmBdesFees} />
      <Scholarships data={isdiAdmBdesScholarships} />
      <EducationLoans data={isdiAdmBdesLoans} />

      {/* `MoreQuestions` carries its own `data-block="search"` */}
      <MoreQuestions data={isdiAboutSearch} />
      {/* `Home/FAQ` renders its own `id="faq"` on the <section> it owns, so this wrapper
          carries only the block marker — giving it the id too put two `#faq` elements in
          the document and made the menu's "FAQs" link ambiguous */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiAdmBdesFaq} />
      </div>
    </main>
  );
}
