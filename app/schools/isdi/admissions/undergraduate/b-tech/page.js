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
  isdiAdmBtechHero,
  isdiAdmBtechMenu,
  isdiAdmBtechHowToApply,
  isdiAdmBtechKeyDates,
  isdiAdmBtechEligibility,
  isdiAdmBtechFees,
  isdiAdmBtechScholarships,
  isdiAdmBtechLoans,
  isdiAdmBtechFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/admissionsBtechContent';

/*
 * ref b-tech.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open Graph
 * and Twitter tags. header.php prints `$description` into `twitter:title` as well — an
 * upstream mix-up every ISDI page carries; Next writes the title there, which is what the tag
 * is for. The canonical is the request URL.
 *
 * `$description` still says "portfolio tips" and "design career" on a B.Tech page, where the
 * admissions band now reads "Technical Aptitude Test" and has no portfolio step at all.
 * Transcribed as authored.
 */
const TITLE = 'B.Tech Admissions – ATLAS ISDI';
const DESCRIPTION =
  'Applying for B.Tech? Explore specializations, eligibility, portfolio tips and start your design career today.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://atlasuniversity.edu.in/schools/isdi/admissions/undergraduate/b-tech',
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
 * /schools/isdi/admissions/undergraduate/b-tech — the ISDI header's
 * "Admissions > Undergraduate Degree > B.Tech", and the second of the five ISDI Admissions
 * pages.
 *
 * The same ten-block template as the B.Des Admissions page, so every component took it as
 * data and nothing new was written for it. Four blocks are literally that page's — the
 * anchor menu, the scholarship band, Education Loans and the FAQ are byte-identical on both
 * references, so they are re-exported rather than transcribed twice.
 *
 * What differs is content: the hero names B.Tech, "Here's how to apply" has **four** steps
 * rather than five (the reference comments the fifth out and re-labels the rest), the Key
 * Dates caption and its fourth row name the Technical Aptitude Test, all three eligibility
 * bodies are B.Tech's own — the first on this template to carry lists — and the Fee
 * Structure brochure is `/fee-structure/isdi-btech/`.
 *
 * Reference note: the Key Dates button's href repeats the site path
 * (`…/schools/isdi/schools/isdi/admissions/undergraduate/b-tech`). Production answers 200 on
 * it with the ATLAS **homepage** — a catch-all soft-404, verified — so the button upstream
 * promises B.Tech admissions and delivers the homepage. The authored intent is this page,
 * which is what the port links to; the destination is recorded beside the href.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333).
 */
export default function ISDIAdmissionsBtechPage() {
  return (
    <main id="isdi-adm-btech" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiAdmBtechHero} />
      {/* this page's bar is the bare `.sticky-menus`, so it is left-aligned */}
      <AnchorMenu links={isdiAdmBtechMenu} centered={false} />
      <HowToApply data={isdiAdmBtechHowToApply} />
      <KeyDates data={isdiAdmBtechKeyDates} />
      <Eligibility data={isdiAdmBtechEligibility} />
      <FeeStructure data={isdiAdmBtechFees} />
      <Scholarships data={isdiAdmBtechScholarships} />
      <EducationLoans data={isdiAdmBtechLoans} />

      {/* `MoreQuestions` carries its own `data-block="search"` */}
      <MoreQuestions data={isdiAboutSearch} />
      {/* `Home/FAQ` renders its own `id="faq"`, so this wrapper carries only the block
          marker — giving it the id too would put two `#faq` elements in the document */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiAdmBtechFaq} />
      </div>
    </main>
  );
}
