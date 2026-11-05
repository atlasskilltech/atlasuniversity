import Hero from '@/components/Schools/ISDI/ProgramsUg/Hero';
import WhyDesign from '@/components/Schools/ISDI/ProgramsUg/WhyDesign';
import Location from '@/components/Schools/ISDI/ProgramsUg/Location';
import Launch from '@/components/Schools/ISDI/ProgramsUg/Launch';
import LogoStrip from '@/components/Schools/ISDI/ProgramsUg/LogoStrip';
import World from '@/components/Schools/ISDI/ProgramsUg/World';
import Multidisciplinary from '@/components/Schools/ISDI/ProgramsUg/Multidisciplinary';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import { UndergraduatePane } from '@/components/Schools/ISDI/Home/Programs';
import { CONTAINER, SECTION } from '@/components/Schools/ISDI/Home/ui';
import FAQ from '@/components/Home/FAQ';
import {
  isdiUgHero,
  isdiUgWhy,
  isdiUgLocation,
  isdiUgLaunch,
  isdiUgLogos,
  isdiUgWorld,
  isdiUgMinors,
  isdiUgFaq,
  isdiPrograms,
  isdiPathfinder,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsUgContent';

/*
 * ref programs/undergraduate/index.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags exactly as on the other ISDI pages. header.php's canonical is
 * the request URL, which production prints in its trailing-slash form.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/' },
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
 * /schools/isdi/programs/undergraduate — the ISDI header's
 * "Programs > Undergraduate Degree > Overview".
 *
 * The ISDI header and footer come from app/schools/isdi/layout.js. Blocks follow the
 * reference's order and each root carries `data-block`:
 *   hero, the pathfinder include, "Why Design At ISDI?" + #1, #2, #3, the logo strip,
 *   #4, #5, "More questions?", FAQ.
 *
 * Block 1 is `assets/include/pathfinder.php` rendered bare (the homepage puts the same
 * include inside its Undergraduate tab), so it is that page's `UndergraduatePane` with
 * its data — heading, seven programme cards, the PathFinder card and the quiz.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333).
 */
export default function ISDIUndergraduateProgramsPage() {
  return (
    <main id="isdi-ug" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiUgHero} />

      {/* ref section.section > .container > assets/include/pathfinder.php */}
      <section data-block="pathfinder" className={SECTION}>
        <div className={CONTAINER}>
          <UndergraduatePane data={isdiPrograms.ug} pathfinder={isdiPathfinder} />
        </div>
      </section>

      <WhyDesign data={isdiUgWhy} />
      <Location data={isdiUgLocation} />
      <Launch data={isdiUgLaunch} />
      <LogoStrip logos={isdiUgLogos} />
      <World data={isdiUgWorld} />
      <Multidisciplinary data={isdiUgMinors} />
      <MoreQuestions data={isdiAboutSearch} />
      {/*
        The site-wide `components/Home/FAQ`, as on the ISDI homepage and About page:
        its section carries ATLAS's 60 / 40 padding where ISDI's header.php sets 50 at
        every width, so the wrapper takes the 10px back out (and adds it below 768).
      */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiUgFaq} />
      </div>
    </main>
  );
}
