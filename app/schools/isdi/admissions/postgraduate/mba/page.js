import Hero from '@/components/Schools/ISDI/Admission/Hero';
import KeyDates from '@/components/Schools/ISDI/Admission/KeyDates';
import Eligibility from '@/components/Schools/ISDI/Admission/Eligibility';
import FeeStructure from '@/components/Schools/ISDI/Admission/FeeStructure';
import Scholarships from '@/components/Schools/ISDI/Admission/Scholarships';
import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import HowToApply from '@/components/Schools/ISDI/ProgramDetail/Admissions';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import FAQ from '@/components/Home/FAQ';
import {
  isdiAdmMbaHero,
  isdiAdmMbaMenu,
  isdiAdmMbaHowToApply,
  isdiAdmMbaKeyDates,
  isdiAdmMbaEligibility,
  isdiAdmMbaFees,
  isdiAdmMbaScholarships,
  isdiAdmMbaSecondStrip,
  isdiAdmMbaFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/admissionsMbaContent';

/*
 * ref mba.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open Graph
 * and Twitter tags. The title is authored with TWO spaces before the dash and names the
 * university rather than the school, unlike the other four Admissions pages; emitted
 * byte-for-byte. header.php prints `$description` into `twitter:title` as well — an
 * upstream mix-up every ISDI page carries; Next writes the title there, which is what the
 * tag is for. The canonical is the request URL.
 */
const TITLE = 'MBA & Postgraduate Admissions  – ATLAS SkillTech University';
const DESCRIPTION =
  'Explore MBA and postgraduate admissions, eligibility, specialisations, application steps and deadlines for management and design leadership programs.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://atlasuniversity.edu.in/schools/isdi/admissions/postgraduate/mba',
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
 * /schools/isdi/admissions/postgraduate/mba — the ISDI header's
 * "Admissions > Postgraduate Degree > MBA", and the fourth of the five ISDI Admissions
 * pages.
 *
 * Ten blocks again, but **the block list is not the M.Des page's**. Where that page closes
 * with the Education Loans grid, this one closes with a SECOND date strip — and that is
 * the whole reason the two differ structurally:
 *
 *   Key Dates    `keydates/mba-dmst.php`, admission cycle 7 — the MBA DMST strip
 *   Eligibility  two `.ln-bd-txt` blocks inside a `.list-text-wrap`, no dropdowns
 *   (8th block)  `keydates/mba.php`, admission cycle 8 — the MBA strip, authored BARE:
 *                no section, no container, no heading and no id, so it is full-bleed
 *   FAQ          `faq/isdi/admissions/pg-mba.php`, eight MBA-specific questions
 *
 * **There is no Education Loans section on this page at all**, and the sticky menu still
 * links "Financial Assistance" to `#education-loan` — an id nothing on the page carries
 * (verified on production). The menu is transcribed as authored; see
 * `lib/schools/isdi/admissionsMbaContent.js`.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333).
 */
export default function ISDIAdmissionsMbaPage() {
  return (
    <main id="isdi-adm-mba" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiAdmMbaHero} />
      {/* this page's bar is the bare `.sticky-menus`, so it is left-aligned */}
      <AnchorMenu links={isdiAdmMbaMenu} centered={false} />
      <HowToApply data={isdiAdmMbaHowToApply} />
      <KeyDates data={isdiAdmMbaKeyDates} />
      <Eligibility data={isdiAdmMbaEligibility} />
      <FeeStructure data={isdiAdmMbaFees} />
      {/* the scholarship lead is the bare `.sub-heading`, not `.mrgbtm-0`, so it keeps its
          20px bottom padding below 480 */}
      <Scholarships data={isdiAdmMbaScholarships} subSpacing="base" />
      {/* ref `keydates/mba.php` — the bare strip, a direct child of `.main-wrapper` */}
      <KeyDates data={isdiAdmMbaSecondStrip} block="mba-dates" />

      {/* `MoreQuestions` carries its own `data-block="search"` */}
      <MoreQuestions data={isdiAboutSearch} />
      {/* `Home/FAQ` renders its own `id="faq"`, so this wrapper carries only the block
          marker — giving it the id too would put two `#faq` elements in the document */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiAdmMbaFaq} />
      </div>
    </main>
  );
}
