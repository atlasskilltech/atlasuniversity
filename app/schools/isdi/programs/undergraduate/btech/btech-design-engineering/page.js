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
  isdiBtechDesignEngHero,
  isdiBtechDesignEngBrochures,
  isdiBtechDesignEngStats,
  isdiBtechDesignEngProgram,
  isdiBtechDesignEngAdmissions,
  isdiBtechDesignEngEligibility,
  isdiBtechDesignEngWhy,
  isdiBtechDesignEngExecution,
  isdiBtechDesignEngProjects,
  isdiBtechDesignEngVoices,
  isdiBtechDesignEngBanner,
  isdiBtechDesignEngFaq,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsBtechDesignEngContent';

/*
 * ref b-des-in-strategic-design-&-innovation-management.php `$title` / `$description`, written
 * by reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. Unlike every B.Des page, this one carries **no marketing copy
 * at all**: `$title` and `$description` are both the bare programme name, with no
 * " – ATLAS ISDI" suffix and no sentence. Transcribed as authored rather than invented.
 * header.php's canonical is the request URL, which production prints unencoded.
 */
const TITLE = 'Design Engineering';
const DESCRIPTION =
  'Design Engineering';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical:
      'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/btech/btech-design-engineering',
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
 * /schools/isdi/programs/undergraduate/btech/btech-design-engineering —
 * the ISDI header's "Programs > Undergraduate Degree > B.Des > B.Des in Service &
 * Experience Design", and the eleventh of the twelve B.Des programme pages.
 *
 * The B.Des twelve-block template, in the same order, so every component is reused
 * unchanged. Three things are this page's own and all three are data: the admissions
 * band is headed "Admissions — The **Technical** Way" and has **four** steps rather than
 * five; the eligibility band has **three** groups, whose IB entry authors four
 * `.el-subdesc` paragraphs with `<br>`s between them (the B.Des pages author one); and
 * the tab panes hold 6 / 6 / 31 cards and 14 people. Its stack heading is the Accessory
 * page's copy-paste, its "More questions?" block is the bare include and its stack is the
 * `pro-bg-*` palette.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333) and
 * must not clip, so the stack cards can stick.
 */
export default function ISDIBtechDesignEngPage() {
  return (
    <main id="isdi-bdes" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiBtechDesignEngHero} brochures={isdiBtechDesignEngBrochures} />
      <StatsBand data={isdiBtechDesignEngStats} />

      {/* ref section.section.extraspace — the tab set and the curriculum share one section */}
      <section data-block="program" className="block overflow-hidden py-[50px]">
        <div className={CONTAINER}>
          <ProgramTabs data={isdiBtechDesignEngProgram} />
          <Curriculum data={isdiBtechDesignEngProgram.curriculum} brochures={isdiBtechDesignEngBrochures} />
        </div>
      </section>

      <Admissions data={isdiBtechDesignEngAdmissions} />
      <Eligibility data={isdiBtechDesignEngEligibility} />
      <WhyStack data={isdiBtechDesignEngWhy} />
      <Execution data={isdiBtechDesignEngExecution} />
      <Projects data={isdiBtechDesignEngProjects} />
      <Voices data={isdiBtechDesignEngVoices} />

      {/*
        The ISDI homepage's closing band, with this page's copy and no lead. Its second
        button opens the hero's brochure popup rather than navigating, so the page
        renders the buttons itself.
      */}
      <ReadyToBuild
        data={isdiBtechDesignEngBanner}
        renderButton={(button) =>
          button.brochure ? (
            <BrochureButton
              key={button.label}
              brochure={isdiBtechDesignEngBrochures[button.brochure]}
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
        <FAQ data={isdiBtechDesignEngFaq} />
      </div>
    </main>
  );
}
