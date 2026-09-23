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
  isdiBdesAccessoryHero,
  isdiBdesAccessoryBrochures,
  isdiBdesAccessoryStats,
  isdiBdesAccessoryProgram,
  isdiBdesAccessoryAdmissions,
  isdiBdesEligibility,
  isdiBdesAccessoryWhy,
  isdiBdesAccessoryExecution,
  isdiBdesAccessoryProjects,
  isdiBdesAccessoryVoices,
  isdiBdesAccessoryBanner,
  isdiBdesAccessoryFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsBdesAccessoryContent';

/*
 * ref b-des/accessory-&-craft.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. This page is the first ISDI one to set them to something
 * other than the site default: the title carries the suffix, the description is the
 * bare programme name, and `og:title` / `twitter:title` keep the suffix while
 * `twitter:title`'s short form appears only in the WordPress block above it.
 * header.php's canonical is the request URL, which production prints unencoded.
 */
const TITLE = 'Accessory Design & Craft – ATLAS ISDI';
const DESCRIPTION = 'Accessory Design & Craft';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft',
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
 * /schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft — the ISDI
 * header's "Programs > Undergraduate Degree > B.Des > Accessory Design & Craft".
 *
 * The ISDI header and footer come from app/schools/isdi/layout.js. Blocks follow the
 * reference's order and each root carries `data-block`:
 *   hero (a 3-slide ring carousel), the three figures, the programme tab set and the
 *   curriculum below it (one `section.section.extraspace`), Admissions, Eligibility,
 *   the "Why …" sticky stack, "Where concepts meet execution", "Student Projects in
 *   Motion", "Student Voices", the closing band, "More questions?", FAQ.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIBdesAccessoryPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBdesAccessoryHero} brochures={isdiBdesAccessoryBrochures} />
      <StatsBand data={isdiBdesAccessoryStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBdesAccessoryProgram} />
          <Curriculum data={isdiBdesAccessoryProgram.curriculum} brochures={isdiBdesAccessoryBrochures} />
        </div>
      </section>

      <Admissions data={isdiBdesAccessoryAdmissions} />
      <Eligibility data={isdiBdesEligibility} />
      <WhyStack data={isdiBdesAccessoryWhy} />
      <Execution data={isdiBdesAccessoryExecution} />
      <Projects data={isdiBdesAccessoryProjects} />
      <Voices data={isdiBdesAccessoryVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
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
      {/*
        The site-wide `components/Home/FAQ`, as on every other ISDI page: its section
        carries ATLAS's 60 / 40 padding where ISDI's header.php sets 50 at every width,
        so the wrapper takes the 10px back out (and adds it below 768).
      */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiBdesAccessoryFaq} />
      </div>
    </main>
  );
}
