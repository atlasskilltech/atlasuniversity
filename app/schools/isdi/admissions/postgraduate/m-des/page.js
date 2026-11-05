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
  isdiAdmMdesHero,
  isdiAdmMdesMenu,
  isdiAdmMdesHowToApply,
  isdiAdmMdesKeyDates,
  isdiAdmMdesEligibility,
  isdiAdmMdesFees,
  isdiAdmMdesScholarships,
  isdiAdmMdesLoans,
  isdiAdmMdesFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/admissionsMdesContent';

/*
 * ref m-des.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open Graph
 * and Twitter tags. header.php prints `$description` into `twitter:title` as well — an
 * upstream mix-up every ISDI page carries; Next writes the title there, which is what the tag
 * is for. The canonical is the request URL.
 */
const TITLE = "Master's in Design Admissions – ATLAS ISDI";
const DESCRIPTION =
  'Planning your M.Des? Explore postgraduate design courses, eligibility, portfolio needs and apply to boost your design career.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://atlasuniversity.edu.in/schools/isdi/admissions/postgraduate/m-des',
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
 * /schools/isdi/admissions/postgraduate/m-des — the ISDI header's
 * "Admissions > Postgraduate Degree > M.Des", and the third of the five ISDI Admissions
 * pages.
 *
 * The same ten blocks in the same order as B.Des and B.Tech, but the first of the three
 * with its own `$css`, and three of the blocks are genuinely different shapes rather than
 * different copy:
 *
 *   Key Dates    a `.df-container-atlas` date STRIP of six cards, from `keydates/mdes.php`
 *                — not the Bootstrap table the two undergraduate includes render, and with
 *                no button under it
 *   Eligibility  two `.ln-bd-txt` rich-text blocks — no dropdowns at all
 *   FAQ          `faq/isdi/admissions/pg-mdes.php`, nine questions written for the M.Des
 *
 * The rest is data: the hero names M.Des, "Here's how to apply" keeps five steps but swaps
 * the last two tones and puts `jigsaw.png` on both, and the fee card reads 2 Years / 1500 /
 * 50,000 / 6,06,400 over a brochure at `/mdes/feestructure`.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333).
 */
export default function ISDIAdmissionsMdesPage() {
  return (
    <main id="isdi-adm-mdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiAdmMdesHero} />
      {/* this page's bar is the bare `.sticky-menus`, so it is left-aligned */}
      <AnchorMenu links={isdiAdmMdesMenu} centered={false} />
      <HowToApply data={isdiAdmMdesHowToApply} />
      <KeyDates data={isdiAdmMdesKeyDates} />
      <Eligibility data={isdiAdmMdesEligibility} />
      <FeeStructure data={isdiAdmMdesFees} />
      {/* the scholarship lead is the bare `.sub-heading` here, not `.mrgbtm-0`, so it keeps
          its 20px bottom padding below 480 — measured 0 vs 20 at 479 and 390 */}
      <Scholarships data={isdiAdmMdesScholarships} subSpacing="base" />
      <EducationLoans data={isdiAdmMdesLoans} />

      {/* `MoreQuestions` carries its own `data-block="search"` */}
      <MoreQuestions data={isdiAboutSearch} />
      {/* `Home/FAQ` renders its own `id="faq"`, so this wrapper carries only the block
          marker — giving it the id too would put two `#faq` elements in the document */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiAdmMdesFaq} />
      </div>
    </main>
  );
}
