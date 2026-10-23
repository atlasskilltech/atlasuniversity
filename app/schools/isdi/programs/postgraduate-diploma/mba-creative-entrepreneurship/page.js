import Hero from '@/components/Schools/ISDI/ProgramDetail/Hero';
import ProgramTabs from '@/components/Schools/ISDI/ProgramDetail/ProgramTabs';
import Curriculum from '@/components/Schools/ISDI/ProgramDetail/Curriculum';
import Admissions from '@/components/Schools/ISDI/ProgramDetail/Admissions';
import Eligibility from '@/components/Schools/ISDI/ProgramDetail/Eligibility';
import WhyStack from '@/components/Schools/ISDI/ProgramDetail/WhyStack';
import Execution from '@/components/Schools/ISDI/ProgramDetail/Execution';
import Projects from '@/components/Schools/ISDI/ProgramDetail/Projects';
import Voices from '@/components/Schools/ISDI/ProgramDetail/Voices';
import BrochureButton from '@/components/Schools/ISDI/ProgramDetail/BrochureButton';
import StatsBand from '@/components/Schools/ISDI/StatsBand';
import ReadyToBuild from '@/components/Schools/ISDI/Home/ReadyToBuild';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER } from '@/components/Schools/ISDI/Home/ui';
import FAQ from '@/components/Home/FAQ';
import {
  isdiPgdCreativeEntHero,
  isdiPgdCreativeEntBrochures,
  isdiPgdCreativeEntStats,
  isdiPgdCreativeEntProgram,
  isdiPgdCreativeEntAdmissions,
  isdiPgdCreativeEntEligibility,
  isdiPgdCreativeEntWhy,
  isdiPgdCreativeEntExecution,
  isdiPgdCreativeEntProjects,
  isdiPgdCreativeEntVoices,
  isdiPgdCreativeEntBanner,
  isdiPgdCreativeEntFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsPgdCreativeEntContent';

/*
 * ref postgraduate-diploma/mba-creative-entrepreneurship.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open Graph
 * and Twitter tags. Note header.php prints `$description` into `twitter:title` as well —
 * an upstream mix-up every ISDI page carries; Next writes the title there, which is what
 * the tag is for. The canonical is the request URL.
 */
/* the reference authors TWO spaces before the dash; transcribed as it renders */
const TITLE = 'Creative Entrepreneurship  – ATLAS ISDI';
const DESCRIPTION =
  'Explore communication design, branding, UI/UX, strategy and creative careers. Apply for admissions.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/postgraduate-diploma/mba-creative-entrepreneurship',
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
 * /schools/isdi/programs/postgraduate-diploma/mba-creative-entrepreneurship —
 * the MBA the Postgraduate Overview card links to, and the second postgraduate programme
 * page after M.Des Design Futures.
 *
 * The same twelve-block template, so every component is reused unchanged. The programme
 * is two years of two semesters, with no electives in any of them; its admissions band is
 * "Admissions — The Design Way" with four steps, its eligibility band has three groups,
 * its tab panes hold 13 / 19 / 13 cards and 6 people, its execution tabs 8 and 5 cards,
 * "Student Projects in Motion" is eight photographs, Student Voices has six cards, and its
 * FAQ is the database-driven include — the 24-question ISDI master set.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIPgdCreativeEntPage() {
  return (
    <main id="isdi-pgd-creative" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiPgdCreativeEntHero} brochures={isdiPgdCreativeEntBrochures} />
      <StatsBand data={isdiPgdCreativeEntStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiPgdCreativeEntProgram} />
          <Curriculum data={isdiPgdCreativeEntProgram.curriculum} brochures={isdiPgdCreativeEntBrochures} />
        </div>
      </section>

      <Admissions data={isdiPgdCreativeEntAdmissions} />
      <Eligibility data={isdiPgdCreativeEntEligibility} />
      <WhyStack data={isdiPgdCreativeEntWhy} />
      <Execution data={isdiPgdCreativeEntExecution} />
      <Projects data={isdiPgdCreativeEntProjects} />
      <Voices data={isdiPgdCreativeEntVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
      <ReadyToBuild
        data={isdiPgdCreativeEntBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiPgdCreativeEntBrochures[button.brochure]}
              label={button.label}
              variant={button.variant}
            />
          ) : (
            <PrimaryButton key={button.label} href={button.href} variant={button.variant}>
              {button.label}
            </PrimaryButton>
          )
        }
      />

      <MoreQuestions data={isdiAboutSearch} />
      {/*
        The site-wide `components/Home/FAQ`, as on every other ISDI page: its section
        carries ATLAS's 60 / 40 padding where ISDI's header.php sets 50 at every width,
        so the wrapper takes the 10px back out (and adds it below 768).
      */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiPgdCreativeEntFaq} />
      </div>
    </main>
  );
}
