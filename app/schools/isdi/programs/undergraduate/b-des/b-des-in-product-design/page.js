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
  isdiBdesProductHero,
  isdiBdesProductBrochures,
  isdiBdesProductStats,
  isdiBdesProductProgram,
  isdiBdesProductAdmissions,
  isdiBdesProductEligibility,
  isdiBdesProductWhy,
  isdiBdesProductExecution,
  isdiBdesProductProjects,
  isdiBdesProductVoices,
  isdiBdesProductBanner,
  isdiBdesProductFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsBdesProductContent';

/*
 * ref b-des-in-product-design.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. This title carries a single space before the dash where most
 * of the set carries two, and the description is this programme's own rather than a
 * neighbour's. header.php's canonical is the request URL.
 */
const TITLE = 'Product Design Course in Mumbai – ATLAS ISDI';
const DESCRIPTION =
  'Want to build products people love? Learn design thinking, prototyping, materials and start your career in product design. Apply now.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-product-design',
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
 * /schools/isdi/programs/undergraduate/b-des/b-des-in-product-design — the ISDI header's
 * "Programs > Undergraduate Degree > B.Des > B.Des in Product Design", and the tenth of
 * the twelve B.Des programme pages.
 *
 * The same twelve blocks in the same order as the other nine, so every component is
 * reused unchanged and only the data differs: four years of two semesters with electives
 * in **both** Year 1 semesters, 8 / 7 / 18 cards and 21 people in the tab panes, 9 and 6
 * execution cards, three Student Voices cards and seven FAQ items. Its stack heading is
 * its own ("Why Product Design: Creative Engineering at ISDI x Parsons") rather than one
 * of the set's copy-pastes, its "More questions?" block is the bare include and its
 * stack is the `pro-bg-*` palette.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIBdesProductPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBdesProductHero} brochures={isdiBdesProductBrochures} />
      <StatsBand data={isdiBdesProductStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBdesProductProgram} />
          <Curriculum data={isdiBdesProductProgram.curriculum} brochures={isdiBdesProductBrochures} />
        </div>
      </section>

      <Admissions data={isdiBdesProductAdmissions} />
      <Eligibility data={isdiBdesProductEligibility} />
      <WhyStack data={isdiBdesProductWhy} />
      <Execution data={isdiBdesProductExecution} />
      <Projects data={isdiBdesProductProjects} />
      <Voices data={isdiBdesProductVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
      <ReadyToBuild
        data={isdiBdesProductBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiBdesProductBrochures[button.brochure]}
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
        <FAQ data={isdiBdesProductFaq} />
      </div>
    </main>
  );
}
