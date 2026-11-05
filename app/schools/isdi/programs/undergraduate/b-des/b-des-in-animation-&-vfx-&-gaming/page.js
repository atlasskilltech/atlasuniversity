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
  isdiBdesAnimationHero,
  isdiBdesAnimationBrochures,
  isdiBdesAnimationStats,
  isdiBdesAnimationProgram,
  isdiBdesAnimationAdmissions,
  isdiBdesAnimationEligibility,
  isdiBdesAnimationWhy,
  isdiBdesAnimationExecution,
  isdiBdesAnimationProjects,
  isdiBdesAnimationVoices,
  isdiBdesAnimationBanner,
  isdiBdesAnimationFaq,
  isdiBdesAnimationSearch,
} from '@/lib/schools/isdi/programsBdesAnimationContent';

/*
 * ref b-des-in-animation-&-vfx-&-gaming.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. The title carries two spaces before the dash, as authored,
 * and the description is the page's own marketing line rather than the site default.
 * header.php's canonical is the request URL, which production prints unencoded.
 */
const TITLE = 'Animation & VFX Course in Mumbai  – ATLAS ISDI';
const DESCRIPTION =
  'Love animation? Explore 3D, VFX, design tools, studios and build a creative media career. Apply now.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming',
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
 * /schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming — the
 * ISDI header's "Programs > Undergraduate Degree > B.Des > B.Des in Animation, VFX &
 * Gaming", and the second of the seven B.Des programme pages.
 *
 * The same twelve blocks in the same order as
 * .../b-des/accessory-design-&-craft, so every component is reused unchanged and only
 * the data differs. Three content-shaped differences, all carried by the data:
 * four years of two semesters each (electives only in Year 1), one Student Voices card
 * whose `.st-course` the reference omits entirely, and nine FAQ items.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIBdesAnimationPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBdesAnimationHero} brochures={isdiBdesAnimationBrochures} />
      <StatsBand data={isdiBdesAnimationStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBdesAnimationProgram} />
          <Curriculum data={isdiBdesAnimationProgram.curriculum} brochures={isdiBdesAnimationBrochures} />
        </div>
      </section>

      <Admissions data={isdiBdesAnimationAdmissions} />
      <Eligibility data={isdiBdesAnimationEligibility} />
      <WhyStack data={isdiBdesAnimationWhy} />
      <Execution data={isdiBdesAnimationExecution} />
      <Projects data={isdiBdesAnimationProjects} />
      <Voices data={isdiBdesAnimationVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
      <ReadyToBuild
        data={isdiBdesAnimationBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiBdesAnimationBrochures[button.brochure]}
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

      <MoreQuestions data={isdiBdesAnimationSearch} />
      {/*
        The site-wide `components/Home/FAQ`, as on every other ISDI page: its section
        carries ATLAS's 60 / 40 padding where ISDI's header.php sets 50 at every width,
        so the wrapper takes the 10px back out (and adds it below 768).
      */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiBdesAnimationFaq} />
      </div>
    </main>
  );
}
