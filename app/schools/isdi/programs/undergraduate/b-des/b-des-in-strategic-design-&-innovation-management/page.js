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
  isdiBdesStrategicHero,
  isdiBdesStrategicBrochures,
  isdiBdesStrategicStats,
  isdiBdesStrategicProgram,
  isdiBdesStrategicAdmissions,
  isdiBdesStrategicEligibility,
  isdiBdesStrategicWhy,
  isdiBdesStrategicExecution,
  isdiBdesStrategicProjects,
  isdiBdesStrategicVoices,
  isdiBdesStrategicBanner,
  isdiBdesStrategicFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsBdesStrategicContent';

/*
 * ref b-des-in-strategic-design-&-innovation-management.php `$title` / `$description`, written
 * by reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. This title carries a single space before the dash and names the
 * programme differently from the menu ("Strategic Design Management" against "Strategic
 * Design & Innovation Management"), and the description is this programme's own.
 * header.php's canonical is the request URL, which production prints unencoded.
 */
const TITLE = 'Strategic Design Management Course in Mumbai – ATLAS ISDI';
const DESCRIPTION =
  'Want to blend design with business strategy? Explore innovation, leadership, design management skills and apply today.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management',
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
 * /schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management —
 * the ISDI header's "Programs > Undergraduate Degree > B.Des > B.Des in Service &
 * Experience Design", and the eleventh of the twelve B.Des programme pages.
 *
 * The same twelve blocks in the same order as the other ten, so every component is
 * reused unchanged and only the data differs: four years of two semesters with electives
 * in both Year 1 semesters, 6 / 8 / 23 cards and 12 people in the tab panes, 8 and 6
 * execution cards, **eight** project photographs where the rest of the set has sixteen,
 * three Student Voices cards and seven FAQ items. Its stack heading is its own, its
 * "More questions?" block is the bare include and its stack is the `pro-bg-*` palette.
 *
 * It is also the only page of the set whose Student Voices cards carry neither a YouTube
 * link nor Webflow's play/pause control, and two of its three clips ship `.webm` only
 * because their `.mp4` siblings answer 403 from the CDN — which is what production plays.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIBdesStrategicPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBdesStrategicHero} brochures={isdiBdesStrategicBrochures} />
      <StatsBand data={isdiBdesStrategicStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBdesStrategicProgram} />
          <Curriculum data={isdiBdesStrategicProgram.curriculum} brochures={isdiBdesStrategicBrochures} />
        </div>
      </section>

      <Admissions data={isdiBdesStrategicAdmissions} />
      <Eligibility data={isdiBdesStrategicEligibility} />
      <WhyStack data={isdiBdesStrategicWhy} />
      <Execution data={isdiBdesStrategicExecution} />
      <Projects data={isdiBdesStrategicProjects} />
      <Voices data={isdiBdesStrategicVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
      <ReadyToBuild
        data={isdiBdesStrategicBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiBdesStrategicBrochures[button.brochure]}
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
        <FAQ data={isdiBdesStrategicFaq} />
      </div>
    </main>
  );
}
