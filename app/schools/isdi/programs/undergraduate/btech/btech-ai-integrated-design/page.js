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
  isdiBtechAiDesignHero,
  isdiBtechAiDesignBrochures,
  isdiBtechAiDesignStats,
  isdiBtechAiDesignProgram,
  isdiBtechAiDesignAdmissions,
  isdiBtechAiDesignEligibility,
  isdiBtechAiDesignWhy,
  isdiBtechAiDesignExecution,
  isdiBtechAiDesignProjects,
  isdiBtechAiDesignVoices,
  isdiBtechAiDesignBanner,
  isdiBtechAiDesignFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsBtechAiDesignContent';

/*
 * ref b-des-in-strategic-design-&-innovation-management.php `$title` / `$description`, written
 * by reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. Unlike every B.Des page, this one carries **no marketing copy
 * at all**: `$title` and `$description` are both the bare programme name, with no
 * " – ATLAS ISDI" suffix and no sentence. Transcribed as authored rather than invented.
 * header.php's canonical is the request URL, which production prints unencoded.
 */
const TITLE = 'AI Engineering & Intelligent products';
const DESCRIPTION =
  'AI Engineering & Intelligent products';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/btech/btech-ai-integrated-design',
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
 * /schools/isdi/programs/undergraduate/btech/btech-ai-integrated-design —
 * the ISDI header's "Programs > Undergraduate Degree > B.Des > B.Des in Service &
 * Experience Design", and the eleventh of the twelve B.Des programme pages.
 *
 * The B.Des twelve-block template, in the same order, so every component is reused
 * unchanged. It shares the Design Engineering page's admissions band ("Admissions — The
 * **Technical** Way", four steps) and its three-group eligibility band, and adds one thing
 * no other page in the port has: **no electives anywhere in the curriculum**, so not one
 * semester opens a dropdown and the set's -48/-96px dropdown deviation does not apply
 * here. Its Year 4 has three semesters, its tab panes hold 6 / 5 / 31 cards and 14 people,
 * and its stack heading is its own. `$title` and `$description` are again the bare
 * programme name, this time "AI Engineering & Intelligent products" — which is not what
 * the menu calls it.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIBtechAiDesignPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBtechAiDesignHero} brochures={isdiBtechAiDesignBrochures} />
      <StatsBand data={isdiBtechAiDesignStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBtechAiDesignProgram} />
          <Curriculum data={isdiBtechAiDesignProgram.curriculum} brochures={isdiBtechAiDesignBrochures} />
        </div>
      </section>

      <Admissions data={isdiBtechAiDesignAdmissions} />
      <Eligibility data={isdiBtechAiDesignEligibility} />
      <WhyStack data={isdiBtechAiDesignWhy} />
      <Execution data={isdiBtechAiDesignExecution} />
      <Projects data={isdiBtechAiDesignProjects} />
      <Voices data={isdiBtechAiDesignVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
      <ReadyToBuild
        data={isdiBtechAiDesignBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiBtechAiDesignBrochures[button.brochure]}
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
        <FAQ data={isdiBtechAiDesignFaq} />
      </div>
    </main>
  );
}
