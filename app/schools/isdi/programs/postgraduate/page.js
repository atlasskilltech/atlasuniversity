import Hero from '@/components/Schools/ISDI/ProgramsUg/Hero';
import WhyDesign from '@/components/Schools/ISDI/ProgramsUg/WhyDesign';
import Location from '@/components/Schools/ISDI/ProgramsUg/Location';
import Launch from '@/components/Schools/ISDI/ProgramsUg/Launch';
import LogoStrip from '@/components/Schools/ISDI/ProgramsUg/LogoStrip';
import World from '@/components/Schools/ISDI/ProgramsUg/World';
import Multidisciplinary from '@/components/Schools/ISDI/ProgramsUg/Multidisciplinary';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import { PostgraduatePane } from '@/components/Schools/ISDI/Home/Programs';
import { cx } from '@/lib/cx';
import { CONTAINER, SECTION, H2, H2_MB, SUB } from '@/components/Schools/ISDI/Home/ui';
import FAQ from '@/components/Home/FAQ';
import {
  isdiPgHero,
  isdiPgWhy,
  isdiPgLocation,
  isdiPgLaunch,
  isdiPgLogos,
  isdiPgWorld,
  isdiPgMinors,
  isdiPgFaq,
  isdiPgProgramsSection,
  isdiAboutSearch,
} from '@/lib/schools/isdi/programsPgContent';

/*
 * ref programs/postgraduate/index.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags exactly as on the other ISDI pages. header.php's canonical is
 * the request URL, which production prints in its trailing-slash form.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/isdi/programs/postgraduate/' },
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
 * /schools/isdi/programs/postgraduate — the ISDI header's
 * "Programs > Postgraduate Degree > Overview".
 *
 * The ISDI header and footer come from app/schools/isdi/layout.js. Blocks follow the
 * reference's order and each root carries `data-block`:
 *   hero, "Our Programs", "Why Design At ISDI?" + #1, #2, #3, the logo strip, #4, #5,
 *   "More questions?", FAQ.
 *
 * It is the Undergraduate Overview's shape with one block swapped: where that page
 * includes the PathFinder quiz, this one carries "Our Programs", which is the ISDI
 * homepage's Postgraduate tab — the same `PostgraduatePane` over the same two cards.
 * The reference renders no PathFinder here at all.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333).
 */
export default function ISDIPostgraduateProgramsPage() {
  return (
    <main id="isdi-pg" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiPgHero} />

      {/* ref div.head-wrap > .container > .t-title + .pg-program-wrapper */}
      <section data-block="programs" className={SECTION}>
        <div className={CONTAINER}>
          {/* ref .t-title — the lead sits ABOVE the heading here, and the heading's
              `.mrg24` is 24px at every width */}
          <div className={SUB}>{isdiPgProgramsSection.sub}</div>
          <h2 className={cx(H2, H2_MB.mrg24)}>{isdiPgProgramsSection.heading}</h2>
          <PostgraduatePane cards={isdiPgProgramsSection.cards} />
        </div>
      </section>

      <WhyDesign data={isdiPgWhy} />
      <Location data={isdiPgLocation} />
      <Launch data={isdiPgLaunch} />
      <LogoStrip logos={isdiPgLogos} />
      <World data={isdiPgWorld} />
      <Multidisciplinary data={isdiPgMinors} />
      <MoreQuestions data={isdiAboutSearch} />
      {/*
        The site-wide `components/Home/FAQ`, as on the ISDI homepage and About page:
        its section carries ATLAS's 60 / 40 padding where ISDI's header.php sets 50 at
        every width, so the wrapper takes the 10px back out (and adds it below 768).
      */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiPgFaq} />
      </div>
    </main>
  );
}
