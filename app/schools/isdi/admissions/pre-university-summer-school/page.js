import Hero from '@/components/Schools/ISDI/About/Hero';
import Stats from '@/components/Schools/ISDI/SummerSchool/Stats';
import WhatIs from '@/components/Schools/ISDI/SummerSchool/WhatIs';
import CreativeJourney from '@/components/Schools/ISDI/SummerSchool/CreativeJourney';
import WeekGrid from '@/components/Schools/ISDI/SummerSchool/WeekGrid';
import PeopleVoices from '@/components/Schools/ISDI/Home/PeopleVoices';
import WhyJoin from '@/components/Schools/ISDI/SummerSchool/WhyJoin';
import Highlights from '@/components/Schools/ISDI/SummerSchool/Highlights';
import DatesAndRegistration from '@/components/Schools/ISDI/ProgramDetail/Admissions';
import EnquiryForm from '@/components/Schools/ISDI/SummerSchool/EnquiryForm';
import FAQ from '@/components/Home/FAQ';
import {
  isdiAdmSummerSchoolHero,
  isdiAdmSummerSchoolStats,
  isdiAdmSummerSchoolWhatIs,
  isdiAdmSummerSchoolJourney,
  isdiAdmSummerSchoolWeek,
  isdiAdmSummerSchoolVoices,
  isdiAdmSummerSchoolWhyJoin,
  isdiAdmSummerSchoolHighlights,
  isdiAdmSummerSchoolDates,
  isdiAdmSummerSchoolForm,
  isdiAdmSummerSchoolBrochure,
  isdiAdmSummerSchoolFaq,
} from '@/lib/schools/isdi/admissionsSummerSchoolContent';

/*
 * ref pre-university-summer-school.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open Graph
 * and Twitter tags. Both are the ISDI template's **unedited placeholders** — the title is
 * the bare university name and the description is the contact page's "Get in touch with
 * Atlas Skilltech." Neither mentions the Summer School. Transcribed as authored rather
 * than invented; header.php prints `$description` into `twitter:title` as well, an upstream
 * mix-up every ISDI page carries, and Next writes the title there instead.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/admissions/pre-university-summer-school',
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
 * /schools/isdi/admissions/pre-university-summer-school — the ISDI header's
 * "Admissions > Pre-University Summer School", and the fifth and last ISDI Admissions
 * page.
 *
 * **It is not the Admissions template at all.** No `.course-cover-section` hero, no sticky
 * anchor menu, no Key Dates, Eligibility, Fee Structure, Scholarships or Education Loans,
 * and no "More questions?" panel — and `$body` is `body-isme`, not `body isdi-page`. It is
 * the Summer School PROGRAMME page with four blocks added, five shared blocks unchanged,
 * and two small content differences in the hero.
 *
 * Twelve top-level blocks, matching the reference's own `.main-wrapper` children:
 *
 *    1 hero            `.inner-header-wrapper`, 658px, background video, TWO buttons —
 *                      the second a brochure popup trigger the programme page comments out
 *    2 figures         four `.head-top-card`s; no "Next Batch" card
 *    3 What is ISDI Summer School?      | identical to the programme page,
 *    4 Your Creative Journey at ISDI    | compared on production and
 *    5 A Day in the Life                  <- NEW: the week grid
 *    6 Hear from Our Young Creators     | re-exported rather than
 *    7 Why Join ISDI-Parson Summer School? | transcribed twice
 *    8 Highlights of Your Summer School Journey
 *    9 Dates & Registration               <- NEW: a four-step `.gd-steps` band
 *   10 #smr-form                          <- NEW: a live NoPaperForms enquiry widget
 *   11 the brochure popup                 (a 0-height `w-embed`; `BrochureButton` owns it)
 *   12 FAQ                                <- NEW: nine Summer School questions
 *
 * **Nothing on this page is a database snapshot** — unlike the other four Admissions
 * pages it opens no `mysqli` connection and holds no generated dates.
 *
 * `<main>` carries the ISDI body type (Poppins 16px/24, #333); the week grid switches back
 * to Manrope, which is what `.week-grid-main` declares.
 */
export default function ISDIAdmissionsSummerSchoolPage() {
  return (
    <main id="isdi-adm-pss" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiAdmSummerSchoolHero} brochure={isdiAdmSummerSchoolBrochure} />
      <Stats data={isdiAdmSummerSchoolStats} />
      <WhatIs data={isdiAdmSummerSchoolWhatIs} />
      <CreativeJourney data={isdiAdmSummerSchoolJourney} />
      <WeekGrid data={isdiAdmSummerSchoolWeek} />
      <PeopleVoices data={isdiAdmSummerSchoolVoices} />
      <WhyJoin data={isdiAdmSummerSchoolWhyJoin} />
      <Highlights data={isdiAdmSummerSchoolHighlights} />
      {/* the `.gd-steps` band in its lead-and-button form, so it takes the
          `.isdi-guide-wrapper`'s 60px of top padding */}
      <DatesAndRegistration data={isdiAdmSummerSchoolDates} />
      <EnquiryForm data={isdiAdmSummerSchoolForm} />
      {/* `Home/FAQ` renders its own `id="faq"`, so this wrapper carries only the block
          marker — giving it the id too would put two `#faq` elements in the document */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiAdmSummerSchoolFaq} />
      </div>
    </main>
  );
}
