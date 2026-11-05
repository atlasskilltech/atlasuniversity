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
  isdiBdesBehaviouralHero,
  isdiBdesAccessoryBrochures,
  isdiBdesBehaviouralStats,
  isdiBdesBehaviouralProgram,
  isdiBdesBehaviouralAdmissions,
  isdiBdesEligibility,
  isdiBdesAccessoryWhy,
  isdiBdesCommunicationExecution,
  isdiBdesCommunicationProjects,
  isdiBdesCommunicationVoices,
  isdiBdesAccessoryBanner,
  isdiBdesCommunicationFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsBdesBehaviouralContent';

/*
 * ref behavioural-design-&-ai.php `$title` / `$description` — the bare strings
 * "Behavioural Design & AI" (no " – ATLAS ISDI" suffix, no sentence), transcribed as authored.
 */
const TITLE = 'Behavioural Design & AI – ATLAS ISDI';
const DESCRIPTION = 'Behavioural Design & AI';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/behavioural-design-&-ai',
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
 * /schools/isdi/programs/undergraduate/b-des/behavioural-design-&-ai — the 13th B.Des programme page,
 * NOT linked from the header menu (built on the user's scope decision to finish every ISDI reference
 * page). The twelve-block B.Des programme-detail template, so every component is reused as data. The
 * sticky "Why" stack, eligibility, closing banner and brochures are the Accessory page's; execution,
 * projects, voices and FAQ the Communication Design page's (verified byte-equivalent to production).
 */
export default function ISDIBdesBehaviouralPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBdesBehaviouralHero} brochures={isdiBdesAccessoryBrochures} />
      <StatsBand data={isdiBdesBehaviouralStats} />

      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBdesBehaviouralProgram} />
          <Curriculum data={isdiBdesBehaviouralProgram.curriculum} brochures={isdiBdesAccessoryBrochures} />
        </div>
      </section>

      <Admissions data={isdiBdesBehaviouralAdmissions} />
      <Eligibility data={isdiBdesEligibility} />
      <WhyStack data={isdiBdesAccessoryWhy} />
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
