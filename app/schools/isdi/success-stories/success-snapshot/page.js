import Hero from '@/components/Schools/ISDI/About/Hero';
import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import StatsBand from '@/components/Schools/ISDI/StatsBand';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import FAQ from '@/components/Home/FAQ';
import OutcomesBook from '@/components/Schools/ISDI/Success/OutcomesBook';
import Beliefs from '@/components/Schools/ISDI/Success/Beliefs';
import Journey from '@/components/Schools/ISDI/Success/Journey';
import Placement from '@/components/Schools/ISDI/Success/Placement';
import Internships from '@/components/Schools/ISDI/Success/Internships';
import Recruiters from '@/components/Schools/ISDI/Success/Recruiters';
import Masters from '@/components/Schools/ISDI/Success/Masters';
import Universities from '@/components/Schools/ISDI/Success/Universities';
import Collaborations from '@/components/Schools/ISDI/Success/Collaborations';
import Startups from '@/components/Schools/ISDI/Success/Startups';
import Alumni from '@/components/Schools/ISDI/Success/Alumni';
import Research from '@/components/Schools/ISDI/Success/Research';
import Awards from '@/components/Schools/ISDI/Success/Awards';
import Support from '@/components/Schools/ISDI/Success/Support';
import Career from '@/components/Schools/ISDI/Success/Career';
import {
  hero,
  stats,
  menu,
  beliefs,
  journey,
  placement,
  internships,
  recruiters,
  masters,
  universities,
  collaborations,
  startups,
  alumni,
  research,
  awards,
  support,
  career,
  faq,
  search,
} from '@/lib/schools/isdi/successSnapshotContent';

/*
 * ref success-snapshot/index.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description,
 * Open Graph and Twitter tags. Unlike its neighbours in this rebuild, this page's
 * pair is edited rather than the ISDI template's placeholder.
 */
const TITLE = 'ISDI Success Stories & Placements 2024 – ATLAS ISDI';
const DESCRIPTION =
  'Curious about student success? Explore top placements, achievements, industry roles and inspiring journeys.';
const URL =
  'https://atlasuniversity.edu.in/schools/isdi/success-stories/success-snapshot/';

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
 * /schools/isdi/success-stories/success-snapshot — the first entry in the ISDI
 * menu's "Success Stories" column, and the target of eight of its links (the
 * Overview plus seven in-page anchors).
 *
 * Nineteen blocks in the reference's order: a photographic hero, a three-figure
 * band, the sticky anchor menu, "Beliefs that power our success", "The 4-Year
 * Journey to Success", "Placements & Internships", "Industry Internships", "Top
 * Recruiters @ ATLAS ISDI", "Master's Progressions", "Our students at universities
 * around the world", "Global University Collaborations", "Startups", "Startups
 * founded by ATLAS ISDI Alumni", "Impact Driven Research & Innovation", "Awards &
 * Recognitions", "Our Support System", "Our Career Support Services", "More
 * questions?" and the FAQ. Each root carries `data-block`.
 *
 * Upstream it is a directory with an `index.php`, so production 301s the slashless
 * path to the trailing slash; the header menu links the slashless form and Next
 * normalises the other way, so both resolve.
 */
export default function SuccessSnapshotPage() {
  return (
    <main id="isdi-success" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 — ref .inner-header-wrapper.full-ht, with the CRM widget's button
          between the heading and the lead */}
      <Hero
        data={hero}
        widget={<OutcomesBook label={hero.button.label} src={hero.button.src} />}
      />

      {/* 2 — ref .top-cards-wrapper.padbtm0 */}
      <StatsBand data={stats} label="isme-2" />

      {/* 3 — ref .sticky-menus.center */}
      <AnchorMenu links={menu} centered />

      {/* 4 — ref div#our-beliefs.section */}
      <Beliefs data={beliefs} />

      {/* 5 — ref section.section > .container (the 4-year journey) */}
      <Journey data={journey} />

      {/* 6-17 — the content sections, in the reference's order */}
      <Placement data={placement} />
      <Internships data={internships} />
      <Recruiters data={recruiters} />
      <Masters data={masters} />
      <Universities data={universities} />
      <Collaborations data={collaborations} />
      <Startups data={startups} />
      <Alumni data={alumni} />
      <Research data={research} />
      <Awards data={awards} />
      <Support data={support} />
      <Career data={career} />

      {/* 18 — ref section.section > .container > .search-ques-wrap */}
      <MoreQuestions data={search} />

      {/* 19 — ref assets/include/faq/isdi/success-stories.php */}
      <FAQ data={faq} />
    </main>
  );
}
