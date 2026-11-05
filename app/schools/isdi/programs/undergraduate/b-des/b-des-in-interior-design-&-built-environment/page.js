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
  isdiBdesInteriorHero,
  isdiBdesInteriorBrochures,
  isdiBdesInteriorStats,
  isdiBdesInteriorProgram,
  isdiBdesInteriorAdmissions,
  isdiBdesInteriorEligibility,
  isdiBdesInteriorWhy,
  isdiBdesInteriorExecution,
  isdiBdesInteriorProjects,
  isdiBdesInteriorVoices,
  isdiBdesInteriorBanner,
  isdiBdesInteriorFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsBdesInteriorContent';

/*
 * ref health-care-design.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. The title carries two spaces before the dash, as authored,
 * and the description is the page's own marketing line rather than the site default.
 * header.php's canonical is the request URL, which production prints unencoded.
 */
const TITLE = 'Interior Design Course in Mumbai  – ATLAS ISDI';
const DESCRIPTION =
  'Passionate about interiors? Explore design concepts, spaces, materials and start your creative journey.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment',
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
 * /schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment
 * — the ISDI header's "Programs > Undergraduate Degree > B.Des > B.Des in Interior
 * Design & Built Environment", and the eighth of the twelve B.Des programme pages.
 *
 * The same twelve blocks in the same order as the other seven, so every component is
 * reused unchanged and only the data differs: four years of two semesters (electives in
 * Years 1 and 3), 8 and 6 execution cards, two Student Voices cards and six FAQ items.
 * Its "More questions?" block is the bare include and its stack is the `pro-bg-*`
 * palette, as on the Accessory page.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIBdesInteriorPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBdesInteriorHero} brochures={isdiBdesInteriorBrochures} />
      <StatsBand data={isdiBdesInteriorStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBdesInteriorProgram} />
          <Curriculum data={isdiBdesInteriorProgram.curriculum} brochures={isdiBdesInteriorBrochures} />
        </div>
      </section>

      <Admissions data={isdiBdesInteriorAdmissions} />
      <Eligibility data={isdiBdesInteriorEligibility} />
      <WhyStack data={isdiBdesInteriorWhy} />
      <Execution data={isdiBdesInteriorExecution} />
      <Projects data={isdiBdesInteriorProjects} />
      <Voices data={isdiBdesInteriorVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
      <ReadyToBuild
        data={isdiBdesInteriorBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiBdesInteriorBrochures[button.brochure]}
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
        <FAQ data={isdiBdesInteriorFaq} />
      </div>
    </main>
  );
}
