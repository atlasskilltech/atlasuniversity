import Hero from '@/components/Schools/ISDI/About/Hero';
import StatsBand from '@/components/Schools/ISDI/StatsBand';
import StatsStrip from '@/components/Schools/ISDI/Home/StatsStrip';
import AdvisoryBoard from '@/components/Schools/ISDI/Home/AdvisoryBoard';
import ButtonRegular from '@/components/ui/ButtonRegular';
import BuiltAround from '@/components/Schools/ISDI/Industry/BuiltAround';
import Alliances from '@/components/Schools/ISDI/Industry/Alliances';
import BigNames from '@/components/Schools/ISDI/Industry/BigNames';
import Conclave from '@/components/Schools/ISDI/Industry/Conclave';
import Curriculum from '@/components/Schools/ISDI/Industry/Curriculum';
import Masterclasses from '@/components/Schools/ISDI/Industry/Masterclasses';
import Projects from '@/components/Schools/ISDI/Industry/Projects';
import Visits from '@/components/Schools/ISDI/Industry/Visits';
import Career from '@/components/Schools/ISDI/Industry/Career';
import Certifications from '@/components/Schools/ISDI/Industry/Certifications';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import FAQ from '@/components/Home/FAQ';
import {
  hero,
  stats,
  builtAround,
  alliances,
  figures,
  advisory,
  bigNames,
  conclave,
  curriculum,
  masterclasses,
  projects,
  visits,
  career,
  certifications,
  search,
  faq,
} from '@/lib/schools/isdi/industryApproachContent';

/*
 * ref industry-centric-approach.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description,
 * Open Graph and Twitter tags. Both are the ISDI template's **unedited
 * placeholders**, the same pair its two siblings in this column carry — the title
 * is the bare university name and the description is the contact page's "Get in
 * touch with Atlas Skilltech." Neither mentions the page. Transcribed as authored.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL =
  'https://atlasuniversity.edu.in/schools/isdi/atlas-isdi-advantage/industry-centric-approach';

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
 * /schools/isdi/atlas-isdi-advantage/industry-centric-approach — the third entry
 * in the ISDI menu's "ATLAS ISDI Advantage" column.
 *
 * Sixteen blocks in the reference's order: a photographic hero, a three-figure
 * band, "Built Around You", "Alliances that Power our Future", a figures strip
 * with a logo marquee, the Advisory Board, "Big Names. Bigger Learnings.", the
 * ATLAS HR Conclave, six `.icon-heading` sections, "More questions?" and the FAQ.
 * Each root carries `data-block`.
 *
 * **This page is served at the slashless URL.** It is a flat `.php` file upstream,
 * not a directory with an `index.php`, so production answers 500 on the trailing
 * slash where its two siblings 301 to it.
 */
export default function IndustryCentricApproachPage() {
  return (
    <main id="isdi-industry" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 — ref .inner-header-wrapper._100vh (which is 78vh, not 100) */}
      <Hero data={hero} />

      {/* 2 — ref .top-cards-wrapper.padbtm0 */}
      <StatsBand data={stats} label="isme-2" />

      {/* 3 — ref section.section > .container (the four-cell mosaic) */}
      <BuiltAround data={builtAround} />

      {/* 4 — ref section.section > .container > .rounded-tabs-mint */}
      <Alliances data={alliances} />

      {/* 5 — ref div.section > (.strip-container-isdi, .slide-wrap.extra-padding) */}
      <StatsStrip data={figures} block="figures" />

      {/* 6 — ref section.section > .testimonial-wrap */}
      {/* the reference authors `data-wf--card-type-d--variant="isdi"` — the colour
          portrait under a gradient scrim, NOT the About page's `isdi-black` card
          (grayscale under `overlay-blk.png`, with a pink name label) */}
      <AdvisoryBoard data={advisory} block="advisory" />

      {/* 7-14 — the icon-heading sections, with the HR Conclave between 7 and 9 */}
      <BigNames data={bigNames} />
      <Conclave data={conclave} />
      <Curriculum data={curriculum} />
      <Masterclasses data={masterclasses} />
      <Projects data={projects} />
      <Visits data={visits} />
      <Career
        data={career}
        button={
          <ButtonRegular href={career.icon.button.href} variant="pink-cta">
            {career.icon.button.label}
          </ButtonRegular>
        }
      />
      <Certifications
        data={certifications}
        button={
          <ButtonRegular href={certifications.icon.button.href} variant="pink-cta">
            {certifications.icon.button.label}
          </ButtonRegular>
        }
      />

      {/* 15 — ref section.section > .container > .search-ques-wrap */}
      <MoreQuestions data={search} />

      {/* 16 — ref assets/include/faq/isdi/advantage/industry-centric-approach.php */}
      <FAQ data={faq} />
    </main>
  );
}
