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
  isdiBdesCommunicationHero,
  isdiBdesCommunicationBrochures,
  isdiBdesCommunicationStats,
  isdiBdesCommunicationProgram,
  isdiBdesCommunicationAdmissions,
  isdiBdesCommunicationEligibility,
  isdiBdesCommunicationWhy,
  isdiBdesCommunicationExecution,
  isdiBdesCommunicationProjects,
  isdiBdesCommunicationVoices,
  isdiBdesCommunicationBanner,
  isdiBdesCommunicationFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsBdesCommunicationContent';

/*
 * ref b-des-in-communication-design-&-new-media.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. The title carries two spaces before the dash, as authored,
 * and the description is the page's own marketing line rather than the site default.
 * header.php's canonical is the request URL, which production prints unencoded.
 */
const TITLE = 'Communication Design Course in Mumbai  – ATLAS ISDI';
const DESCRIPTION =
  'Explore communication design, branding, UI/UX, strategy and creative careers. Apply for admissions.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-communication-design-&-new-media',
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
 * /schools/isdi/programs/undergraduate/b-des/b-des-in-communication-design-&-new-media —
 * the ISDI header's "Programs > Undergraduate Degree > B.Des > B.Des in Communication
 * Design & New Media", and the third of the seven B.Des programme pages.
 *
 * The same twelve blocks in the same order as the other two, so every component is
 * reused unchanged and only the data differs: four years of two semesters (electives in
 * Years 1 and 3), 6 / 7 / 31 cards and 14 people in the tab panes, nine cards per
 * execution tab, four Student Voices cards and seven FAQ items. Its "More questions?"
 * block is the bare include, as on the Accessory page.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIBdesCommunicationPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBdesCommunicationHero} brochures={isdiBdesCommunicationBrochures} />
      <StatsBand data={isdiBdesCommunicationStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBdesCommunicationProgram} />
          <Curriculum data={isdiBdesCommunicationProgram.curriculum} brochures={isdiBdesCommunicationBrochures} />
        </div>
      </section>

      <Admissions data={isdiBdesCommunicationAdmissions} />
      <Eligibility data={isdiBdesCommunicationEligibility} />
      <WhyStack data={isdiBdesCommunicationWhy} />
      <Execution data={isdiBdesCommunicationExecution} />
      <Projects data={isdiBdesCommunicationProjects} />
      <Voices data={isdiBdesCommunicationVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
      <ReadyToBuild
        data={isdiBdesCommunicationBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiBdesCommunicationBrochures[button.brochure]}
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
        <FAQ data={isdiBdesCommunicationFaq} />
      </div>
    </main>
  );
}
