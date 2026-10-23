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
  isdiMdesFuturesHero,
  isdiMdesFuturesBrochures,
  isdiMdesFuturesStats,
  isdiMdesFuturesProgram,
  isdiMdesFuturesAdmissions,
  isdiMdesFuturesEligibility,
  isdiMdesFuturesWhy,
  isdiMdesFuturesExecution,
  isdiMdesFuturesProjects,
  isdiMdesFuturesVoices,
  isdiMdesFuturesBanner,
  isdiMdesFuturesFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsMdesFuturesContent';

/*
 * ref b-des-in-strategic-design-&-innovation-management.php `$title` / `$description`, written
 * by reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. Unlike every B.Des page, this one carries **no marketing copy
 * at all**: `$title` and `$description` are both the bare programme name, with no
 * " – ATLAS ISDI" suffix and no sentence. Transcribed as authored rather than invented.
 * header.php's canonical is the request URL, which production prints unencoded.
 */
const TITLE = 'Design Futures Program in Mumbai – ATLAS ISDI';
const DESCRIPTION =
  'Want to shape future trends? Learn speculative design, innovation thinking and future-focused skills. Apply today.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/postgraduate/mdes/design-futures-2-years',
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
 * /schools/isdi/programs/postgraduate/mdes/design-futures-2-years —
 * the ISDI header's "Programs > Undergraduate Degree > B.Des > B.Des in Service &
 * Experience Design", and the eleventh of the twelve B.Des programme pages.
 *
 * The same twelve-block template the undergraduate programme pages use, so every
 * component is reused unchanged. What differs is the programme: **two years, not four** —
 * Year 1 of two semesters (electives in both) and Year 2 of one. Its admissions band is
 * "Admissions — The Design Way" with four steps, its eligibility band has three groups,
 * its tab panes hold 13 / 15 / 12 cards and 6 people, its execution tabs 8 and 5 cards,
 * and "Student Projects in Motion" is eight photographs rather than sixteen. Its FAQ is
 * the database-driven include, so it is the 24-question ISDI master set rather than a
 * page-specific one.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIMdesFuturesPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiMdesFuturesHero} brochures={isdiMdesFuturesBrochures} />
      <StatsBand data={isdiMdesFuturesStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiMdesFuturesProgram} />
          <Curriculum data={isdiMdesFuturesProgram.curriculum} brochures={isdiMdesFuturesBrochures} />
        </div>
      </section>

      <Admissions data={isdiMdesFuturesAdmissions} />
      <Eligibility data={isdiMdesFuturesEligibility} />
      <WhyStack data={isdiMdesFuturesWhy} />
      <Execution data={isdiMdesFuturesExecution} />
      <Projects data={isdiMdesFuturesProjects} />
      <Voices data={isdiMdesFuturesVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
      <ReadyToBuild
        data={isdiMdesFuturesBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiMdesFuturesBrochures[button.brochure]}
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
        <FAQ data={isdiMdesFuturesFaq} />
      </div>
    </main>
  );
}
