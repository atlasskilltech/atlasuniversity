import Hero from '@/components/Schools/ISDI/About/Hero';
import StatsBand from '@/components/Schools/ISDI/StatsBand';
import StudentWall from '@/components/Schools/ISDI/StudentWall';
import { hero, stats, wall } from '@/lib/schools/isdi/placementsContent';

/*
 * ref placements.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description,
 * Open Graph and Twitter tags. Both are the ISDI template's **unedited
 * placeholders** — the bare university name and the contact page's "Get in touch
 * with Atlas Skilltech." Neither mentions the page. Transcribed as authored, the
 * same pair The ISDI Advantage and industry-centric-approach carry.
 *
 * The canonical is the SLASHLESS url, which is what production serves and what it
 * prints in its own `<link rel="canonical">`; the trailing slash answers 500 there.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/success-stories/placements';

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
 * /schools/isdi/success-stories/placements — the second entry in the ISDI menu's
 * "Success Stories" column, and the smallest page of the ISDI port: THREE blocks,
 * from 258 lines of PHP whose body is 21 repeats of one card.
 *
 *   1  `.inner-header-wrapper.full-ht`  photographic hero, 100vh
 *   2  `.top-cards-wrapper`             three figures — bare, so it keeps its own
 *                                      `padding-bottom: 60px`
 *   3  `div.section`                    "From ATLAS ISDI to the World's Best
 *                                      Companies" over the 21-card wall
 *
 * No sticky anchor menu, no carousel, no "More questions?" panel and **no FAQ** —
 * so it is the first ISDI page in this rebuild with no shared-FAQ bucket to carry.
 * Every block root carries `data-block`.
 *
 * It is a flat `.php` upstream, so production serves it at the slashless path and
 * 500s on the trailing slash; the header menu links the slashless form.
 */
export default function PlacementsPage() {
  return (
    <main id="isdi-placements" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 — ref .inner-header-wrapper.full-ht */}
      <Hero data={hero} />

      {/* 2 — ref .top-cards-wrapper, with NO `.padbtm0` / `.mrgbtm0`, so the
          band's own 60px of bottom padding stands */}
      <StatsBand data={stats} padBottom />

      {/* 3 — ref div.section > .container */}
      <StudentWall data={wall} />
    </main>
  );
}
