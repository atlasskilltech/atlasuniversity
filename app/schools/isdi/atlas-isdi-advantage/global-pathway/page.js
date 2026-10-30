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
} from '@/lib/schools/isdi/globalPathwayContent';

/*
 * ref global-pathway/index.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php. Both are the ISDI template's
 * unedited placeholders — the bare university name and the contact page's "Get in
 * touch with Atlas Skilltech." — the same pair /atlas-isdi-advantage/internationalisation
 * and /the-isdi-advantage carry. Transcribed as authored.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/atlas-isdi-advantage/global-pathway';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
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
 * /schools/isdi/atlas-isdi-advantage/global-pathway — the "Global Pathway" hub of the
 * ISDI "ATLAS ISDI Advantage" cluster. It shares internationalisation's stylesheet and
 * its exact fourteen-block structure and component set, so its matching blocks re-use
 * (and its content module re-exports) internationalisation's; only the hero, the three
 * figures, the Pathway image, the Events heading + testimonials, the Summer gallery and
 * the Masters progressor cards differ. It ends with the "More questions?" search panel
 * (its `.view-more-faq` row is `display: none`) and the generic faq.php FAQ (master 1,
 * 24 items), which fatals on the missing DB locally and was found by production measurement.
 *
 * Served at the trailing-slash url on production (a directory with an index.php; the
 * slashless path 301s). Not linked from the ISDI header navigation; built as part of
 * the partner-university landing-page cluster.
 */
export default function GlobalPathwayPage() {
  return (
    <main id="isdi-global-pathway" className="font-poppins-isdi text-base text-[#333]">
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

      {/* 7-12 — the icon-heading sections and the carousels that follow them */}
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

      {/* 15 — ref `$arrow = "isdi-down-arrow.svg"; include faq.php` (FAQ master 1, 24 items) */}
      <FAQ data={faq} />
    </main>
  );
}
