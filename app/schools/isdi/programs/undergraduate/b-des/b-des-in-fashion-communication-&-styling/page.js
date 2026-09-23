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
  isdiBdesFashionCommHero,
  isdiBdesFashionCommBrochures,
  isdiBdesFashionCommStats,
  isdiBdesFashionCommProgram,
  isdiBdesFashionCommAdmissions,
  isdiBdesFashionCommEligibility,
  isdiBdesFashionCommWhy,
  isdiBdesFashionCommExecution,
  isdiBdesFashionCommProjects,
  isdiBdesFashionCommVoices,
  isdiBdesFashionCommBanner,
  isdiBdesFashionCommFaq,
  isdiBdesFashionCommSearch,
} from '@/lib/schools/isdi/programsBdesFashionCommContent';

/*
 * ref fashion-brand-management.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. The title carries two spaces before the dash, as authored,
 * and both are this page's own (unlike the Fashion Brand Management page, whose
 * description is the Communication Design page's).
 * header.php's canonical is the request URL, which production prints unencoded.
 */
const TITLE = 'Fashion Styling Course in Mumbai – ATLAS ISDI';
const DESCRIPTION =
  'Interested in fashion styling? Learn visual styling, fashion media, branding and build creative careers.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling',
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
 * /schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling —
 * the ISDI header's "Programs > Undergraduate Degree > B.Des > B.Des in Fashion
 * Communication & Styling", and the fifth of the seven B.Des programme pages.
 *
 * The same twelve blocks in the same order as the other four, so every component is
 * reused unchanged and only the data differs: four years of two semesters (electives in
 * Year 1 only), 8 / 7 / 16 cards and 14 people in the tab panes, 5 and 6 execution
 * cards, three Student Voices cards and seven FAQ items. Its "More questions?" block
 * carries the `h2` heading above the panel, as the Animation page's does.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIBdesFashionCommPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBdesFashionCommHero} brochures={isdiBdesFashionCommBrochures} />
      <StatsBand data={isdiBdesFashionCommStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBdesFashionCommProgram} />
          <Curriculum data={isdiBdesFashionCommProgram.curriculum} brochures={isdiBdesFashionCommBrochures} />
        </div>
      </section>

      <Admissions data={isdiBdesFashionCommAdmissions} />
      <Eligibility data={isdiBdesFashionCommEligibility} />
      <WhyStack data={isdiBdesFashionCommWhy} />
      <Execution data={isdiBdesFashionCommExecution} />
      <Projects data={isdiBdesFashionCommProjects} />
      <Voices data={isdiBdesFashionCommVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
      <ReadyToBuild
        data={isdiBdesFashionCommBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiBdesFashionCommBrochures[button.brochure]}
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

      <MoreQuestions data={isdiBdesFashionCommSearch} />
      {/*
        The site-wide `components/Home/FAQ`, as on every other ISDI page: its section
        carries ATLAS's 60 / 40 padding where ISDI's header.php sets 50 at every width,
        so the wrapper takes the 10px back out (and adds it below 768).
      */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiBdesFashionCommFaq} />
      </div>
    </main>
  );
}
