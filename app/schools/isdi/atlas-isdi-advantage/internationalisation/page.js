import Hero from '@/components/Schools/ISDI/About/Hero';
import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import StatsBand from '@/components/Schools/ISDI/StatsBand';
import Parsons from '@/components/Schools/ISDI/International/Parsons';
import Pathway from '@/components/Schools/ISDI/International/Pathway';
import Partnerships from '@/components/Schools/ISDI/International/Partnerships';
import Events from '@/components/Schools/ISDI/International/Events';
import Summer from '@/components/Schools/ISDI/International/Summer';
import Immersion from '@/components/Schools/ISDI/International/Immersion';
import Masters from '@/components/Schools/ISDI/International/Masters';
import GedFair from '@/components/Schools/ISDI/International/GedFair';
import Ged from '@/components/Schools/ISDI/International/Ged';
import LogoBand from '@/components/Schools/ISDI/International/LogoBand';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import FAQ from '@/components/Home/FAQ';
import {
  hero,
  menu,
  stats,
  parsons,
  pathway,
  partnerships,
  events,
  summer,
  immersion,
  masters,
  gedFair,
  ged,
  logos,
  search,
  faq,
} from '@/lib/schools/isdi/internationalisationContent';

/*
 * ref internationalisation/index.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open
 * Graph and Twitter tags. Both are the ISDI template's **unedited placeholders**, the
 * same pair /atlas-isdi-advantage/the-isdi-advantage carries — the title is the bare
 * university name and the description is the contact page's "Get in touch with Atlas
 * Skilltech." Neither mentions internationalisation. Transcribed as authored.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL =
  'https://atlasuniversity.edu.in/schools/isdi/atlas-isdi-advantage/internationalisation/';

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
 * /schools/isdi/atlas-isdi-advantage/internationalisation — the second entry in the
 * ISDI menu's "ATLAS ISDI Advantage" column.
 *
 * Fifteen blocks in the reference's order: a photographic hero, a three-figure band,
 * the sticky anchor menu, the Parsons panel, "With ATLAS Pathway…", "Our Global
 * Partnerships", five banded sections, a logo marquee, "More questions?" and the FAQ.
 * Each root carries `data-block`.
 *
 * Production answers 301 on the slashless path and serves the page at the trailing
 * slash; Next normalises the other way, and both of the header menu's spellings
 * resolve here.
 */
export default function InternationalisationPage() {
  return (
    <main id="isdi-internationalisation" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 — ref .inner-header-wrapper (no `.full-ht`; `id="overview"` is on its img) */}
      <Hero data={hero} />

      {/* 2 — ref .top-cards-wrapper.padbtm0 */}
      <StatsBand data={stats} label="isme-2" value="normal" />

      {/* 3 — ref .sticky-menus (no `.center`, so the bar is left-aligned) */}
      <AnchorMenu links={menu} centered={false} />

      {/* 4 — ref section.section > .container-15 */}
      <Parsons data={parsons} />

      {/* 5 — ref section#global-uni-partnership.section */}
      <Pathway data={pathway} />

      {/* 6 — ref section.section > .container > .rounded-tabs-mint */}
      <Partnerships data={partnerships} />

      {/* 7-12 — the five `.icon-heading` sections and the carousel that follows them */}
      <Events data={events} />
      <Summer data={summer} />
      <Immersion data={immersion} />
      <Masters data={masters} />
      <GedFair data={gedFair} />
      <Ged data={ged} />

      {/* 13 — ref .logos-swipers */}
      <LogoBand logos={logos} />

      {/* 14 — ref section.section > .container > .search-ques-wrap */}
      <MoreQuestions data={search} />

      {/* 15 — ref assets/include/faq/isdi/advantage/internationalisation.php */}
      <FAQ data={faq} />
    </main>
  );
}
