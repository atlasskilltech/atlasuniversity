import Hero from '@/components/Schools/ISDI/About/Hero';
import StatsBand from '@/components/Schools/ISDI/StatsBand';
import StoryPair from '@/components/Schools/ISDI/StoryPair';
import StudentWall from '@/components/Schools/ISDI/StudentWall';
import { hero, stats, story, wall } from '@/lib/schools/isdi/mastersProgressionContent';

/*
 * ref masters-progression.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description,
 * Open Graph and Twitter tags.
 *
 * **They are another page's copy** — undergraduate-programme marketing on a Masters
 * Progression page. Transcribed as authored, the call every reference slip in this
 * rebuild has had; the two sibling pages in this column carry the ISDI template's
 * unedited placeholders instead, which is a different kind of wrong.
 *
 * The canonical is the SLASHLESS url, which is what production serves and what it
 * prints in its own `<link rel="canonical">`; the trailing slash answers 500 there.
 */
const TITLE = 'Design & Innovation Programs in Mumbai – ATLAS ISDI';
const DESCRIPTION =
  'Want a creative career? Explore product design, communication design, fashion '
  + 'design, interior design, UX and innovation-focused UG programs.';
const URL =
  'https://atlasuniversity.edu.in/schools/isdi/success-stories/masters-progression';

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
 * /schools/isdi/success-stories/masters-progression — the fourth and last entry in
 * the ISDI menu's "Success Stories" column, and the page that completes it.
 *
 *   1  `.inner-header-wrapper.full-ht`  a photographic hero, 100vh, with **no
 *                                       `.inner-cover-text`** — the h1 alone
 *   2  `.top-cards-wrapper`             three figures — bare, so its own
 *                                       `padding-bottom: 60px` stands; its label is
 *                                       `.sm-text-isme.isdi`, 24px dropping to 18
 *   3  `section.section`                "Guiding you to Masters Success" — the
 *                                       shared `StoryPair`
 *   4  `div.section`                    "From ATLAS ISDI to the World's Best
 *                                       Universities", 23 `.transfer-card.isdi`
 *
 * Not one shape on this page is new: four existing components take it as data, and
 * the two that were page-local became shared for it. No sticky menu, no carousel,
 * no marquee, no "More questions?" panel and no FAQ.
 *
 * It is a flat `.php` upstream, so production serves it at the slashless path and
 * 500s on the trailing slash; the header menu links the slashless form.
 */
export default function MastersProgressionPage() {
  return (
    <main id="isdi-masters" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 — ref .inner-header-wrapper.full-ht. `hero` carries no `text`, so
          `About/Hero` renders no `.inner-cover-text`: that box is a 430px flex item
          in a `gap: 100` row and an empty one would push the heading 530px left. */}
      <Hero data={hero} />

      {/* 2 — ref .top-cards-wrapper, with NO `.padbtm0` / `.mrgbtm0` */}
      <StatsBand data={stats} padBottom />

      {/* 3 — ref section.section > .container > .about-story-wrapper */}
      <StoryPair data={story} />

      {/* 4 — ref div.section > .container. `.h2-tag.mrg16.isdi` over a
          `.sub-heading.mrgbtm`, where placements authors the bare heading and no
          lead at all. */}
      <StudentWall data={wall} headingMargin="mrg16" />
    </main>
  );
}
