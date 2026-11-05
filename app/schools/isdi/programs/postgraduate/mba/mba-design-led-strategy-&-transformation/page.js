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
  isdiMbaTransformationHero,
  isdiMbaTransformationBrochures,
  isdiMbaTransformationStats,
  isdiMbaTransformationProgram,
  isdiMbaTransformationAdmissions,
  isdiMbaTransformationEligibility,
  isdiMbaTransformationWhy,
  isdiMbaTransformationExecution,
  isdiMbaTransformationProjects,
  isdiMbaTransformationVoices,
  isdiMbaTransformationBanner,
  isdiMbaTransformationFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsMbaTransformationContent';

/*
 * ref mba-design-led-strategy-&-transformation.php `$title` / `$description`, transcribed as
 * authored — including the double space in the title. (header.php also prints `$description`
 * into `twitter:title`, an upstream mix-up every ISDI page carries; Next writes the title there.)
 */
const TITLE = 'Design Management and Strategy  – ATLAS ISDI';
const DESCRIPTION =
  'Explore communication design, branding, UI/UX, strategy and creative careers. Apply for admissions.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/postgraduate/mba/mba-design-led-strategy-&-transformation',
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
 * /schools/isdi/programs/postgraduate/mba/mba-design-led-strategy-&-transformation — the MBA
 * the header menu links as "Design Management and Strategy (2 Years)".
 *
 * ⚠ UPSTREAM DISCREPANCY, built on the user's instruction and flagged for confirmation (NOT
 * corrected or invented): the reference is a half-finished copy of the B.Tech Design Engineering
 * page — 96% identical — so it carries B.Tech content under an MBA title. The Duration reads
 * "4-Year Degree - B.Tech.", the curriculum is FOUR years / eight semesters, the eligibility is
 * Class-XII / Maths-based, the curriculum intro says "The B.Tech Design Engineering program…",
 * and the "Why" heading says "Why our Year 4 outpaces…". Production serves exactly this. The
 * available verified content is implemented as authored; the curriculum/duration/eligibility
 * inconsistency is documented in MIGRATION-ISDI.md as requiring confirmation. See the content
 * barrel for the full copy-paste map.
 *
 * The twelve-block programme-detail template, every component reused. `<main>` carries the ISDI
 * body type and must not clip, so the stack cards can stick.
 */
export default function ISDIMbaTransformationPage() {
  return (
    <main id="isdi-mba" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiMbaTransformationHero} brochures={isdiMbaTransformationBrochures} />
      <StatsBand data={isdiMbaTransformationStats} />

      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiMbaTransformationProgram} />
          <Curriculum data={isdiMbaTransformationProgram.curriculum} brochures={isdiMbaTransformationBrochures} />
        </div>
      </section>

      <Admissions data={isdiMbaTransformationAdmissions} />
      <Eligibility data={isdiMbaTransformationEligibility} />
      <WhyStack data={isdiMbaTransformationWhy} />
      <Execution data={isdiMbaTransformationExecution} />
      <Projects data={isdiMbaTransformationProjects} />
      <Voices data={isdiMbaTransformationVoices} />

      <ReadyToBuild
        data={isdiMbaTransformationBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiMbaTransformationBrochures[button.brochure]}
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
        <FAQ data={isdiMbaTransformationFaq} />
      </div>
    </main>
  );
}
