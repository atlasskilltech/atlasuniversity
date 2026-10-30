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
  isdiBtechSystemsHero,
  isdiBdesAccessoryBrochures,
  isdiBtechSystemsStats,
  isdiBtechSystemsProgram,
  isdiBtechSystemsAdmissions,
  isdiBtechDesignEngEligibility,
  isdiBtechSystemsWhy,
  isdiBdesCommunicationExecution,
  isdiBdesCommunicationProjects,
  isdiBdesCommunicationVoices,
  isdiBdesAccessoryBanner,
  isdiBdesCommunicationFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsBtechSystemsContent';

/*
 * ref systems-design-&-intelligent-manufacturing.php `$title` / `$description` — the bare programme name,
 * transcribed as authored (the B.Tech pages carry no " – ATLAS ISDI" suffix or sentence).
 */
const TITLE = 'Systems Design & Intelligent Manufacturing';
const DESCRIPTION = 'Systems Design & Intelligent Manufacturing';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/btech/systems-design-&-intelligent-manufacturing',
  },
  openGraph: {
    siteName: 'ATLAS SKILLTECH UNIVERSITY',
    title: TITLE,
    url: 'https://atlasuniversity.edu.in/',
    type: 'website',
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /schools/isdi/programs/undergraduate/btech/systems-design-&-intelligent-manufacturing — the 3rd B.Tech
 * programme page, NOT linked from the header menu (built on the user's scope decision to finish every ISDI
 * reference page). The twelve-block programme-detail template, every component reused as data. Eligibility
 * is the B.Tech Design Engineering page's; execution, projects, voices and FAQ the Communication Design
 * page's; the banner and brochures the Accessory page's (all verified byte-equivalent to production). The
 * hero, figures, programme tabs, curriculum and the "Why" stack are systems-specific.
 */
export default function ISDIBtechSystemsPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBtechSystemsHero} brochures={isdiBdesAccessoryBrochures} />
      <StatsBand data={isdiBtechSystemsStats} />

      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBtechSystemsProgram} />
          <Curriculum data={isdiBtechSystemsProgram.curriculum} brochures={isdiBdesAccessoryBrochures} />
        </div>
      </section>

      <Admissions data={isdiBtechSystemsAdmissions} />
      <Eligibility data={isdiBtechDesignEngEligibility} />
      <WhyStack data={isdiBtechSystemsWhy} />
      <Execution data={isdiBdesCommunicationExecution} />
      <Projects data={isdiBdesCommunicationProjects} />
      <Voices data={isdiBdesCommunicationVoices} />

      <ReadyToBuild
        data={isdiBdesAccessoryBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiBdesAccessoryBrochures[button.brochure]}
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
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiBdesCommunicationFaq} />
      </div>
    </main>
  );
}
