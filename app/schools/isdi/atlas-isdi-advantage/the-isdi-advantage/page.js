import Hero from '@/components/Schools/ISDI/About/Hero';
import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import Overview from '@/components/Schools/ISDI/Advantage/Overview';
import Parsons from '@/components/Schools/ISDI/Advantage/Parsons';
import Location from '@/components/Schools/ISDI/Advantage/Location';
import IndustryConnect from '@/components/Schools/ISDI/Advantage/IndustryConnect';
import GlobalExposure from '@/components/Schools/ISDI/Advantage/GlobalExposure';
import Infrastructure from '@/components/Schools/ISDI/Advantage/Infrastructure';
import StudentWelfare from '@/components/Schools/ISDI/Advantage/StudentWelfare';
import CrossDisciplinary from '@/components/Schools/ISDI/Advantage/CrossDisciplinary';
import FutureSkills from '@/components/Schools/ISDI/Advantage/FutureSkills';
import Research from '@/components/Schools/ISDI/Advantage/Research';
import Publications from '@/components/Schools/ISDI/Advantage/Publications';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import FAQ from '@/components/Home/FAQ';
import {
  hero,
  menu,
  overview,
  vision,
  parsons,
  location,
  industry,
  globalExposure,
  infra,
  welfare,
  pathway,
  future,
  research,
  publications,
  search,
  faq,
} from '@/lib/schools/isdi/advantageContent';

/*
 * ref the-isdi-advantage/index.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. Both are the ISDI template's **unedited placeholders** — the
 * title is the bare university name and the description is the contact page's "Get in
 * touch with Atlas Skilltech." Neither mentions the ISDI Advantage. Transcribed as
 * authored rather than invented, the same call the Summer School Admissions page made.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL =
  'https://atlasuniversity.edu.in/schools/isdi/atlas-isdi-advantage/the-isdi-advantage/';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
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
 * /schools/isdi/atlas-isdi-advantage/the-isdi-advantage — the first of the ISDI menu's
 * "ATLAS ISDI Advantage" column, and a **fourth ISDI template**: a photographic hero,
 * the About page's sticky anchor menu, an overview pair, then nine numbered
 * `.icon-heading` sections, a publications carousel, "More questions?" and the FAQ.
 *
 * Production answers 301 on the slashless path and serves the page at the trailing
 * slash; Next normalises the other way, and both of the header menu's spellings
 * (with and without the slash) resolve here.
 *
 * Block order is the reference's own, and each root carries `data-block`.
 */
export default function TheIsdiAdvantagePage() {
  return (
    <main id="isdi-advantage" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 — ref div#overview.inner-header-wrapper.full-ht */}
      <Hero data={hero} />

      {/* 2 — ref .sticky-menus (no `.center`, so the bar is left-aligned) */}
      <AnchorMenu links={menu} centered={false} />

      {/* 3 — ref div#Isdi-adv-overview, which holds TWO `.section`s */}
      <Overview data={overview} vision={vision} />

      {/* 4-12 — the nine numbered sections */}
      <Parsons data={parsons} />
      <Location data={location} />
      <IndustryConnect data={industry} />
      <GlobalExposure data={globalExposure} />
      <Infrastructure data={infra} />
      <StudentWelfare data={welfare} />
      <CrossDisciplinary data={pathway} />
      <FutureSkills data={future} />
      <Research data={research} />

      {/* 13 — ref div.section (no id, no icon heading) */}
      <Publications data={publications} />

      {/* 14 — ref section.section > .container > .search-ques-wrap */}
      <MoreQuestions data={search} />

      {/* 15 — ref assets/include/faq/isdi/advantage/isdi-advantage.php */}
      <FAQ data={faq} />
    </main>
  );
}
