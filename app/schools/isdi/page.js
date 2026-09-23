import Hero from '@/components/Schools/ISDI/Home/Hero';
import Awards from '@/components/Schools/ISDI/Home/Awards';
import Outcomes from '@/components/Schools/ISDI/Home/Outcomes';
import ActionNeverStops from '@/components/Schools/ISDI/Home/ActionNeverStops';
import Beliefs from '@/components/Schools/ISDI/Home/Beliefs';
import Programs from '@/components/Schools/ISDI/Home/Programs';
import ChooseMinor from '@/components/Schools/ISDI/Home/ChooseMinor';
import Electives from '@/components/Schools/ISDI/Home/Electives';
import PinkBanner from '@/components/Schools/ISDI/Home/PinkBanner';
import Halls from '@/components/Schools/ISDI/Home/Halls';
import Motion from '@/components/Schools/ISDI/Home/Motion';
import IndustryVoices from '@/components/Schools/ISDI/Home/IndustryVoices';
import StatsStrip from '@/components/Schools/ISDI/Home/StatsStrip';
import AdvisoryBoard from '@/components/Schools/ISDI/Home/AdvisoryBoard';
import FutureInAction from '@/components/Schools/ISDI/Home/FutureInAction';
import International from '@/components/Schools/ISDI/Home/International';
import ReadyToBuild from '@/components/Schools/ISDI/Home/ReadyToBuild';
import PeopleVoices from '@/components/Schools/ISDI/Home/PeopleVoices';
import Research from '@/components/Schools/ISDI/Home/Research';
import GuideBanners from '@/components/Schools/ISDI/Home/GuideBanners';
import FAQ from '@/components/Home/FAQ';
import {
  isdiHero,
  isdiAwards,
  isdiOutcomes,
  isdiAction,
  isdiBeliefs,
  isdiPrograms,
  isdiPathfinder,
  isdiMinors,
  isdiElectives,
  isdiClassOf2025,
  isdiFaqBanner,
  isdiHalls,
  isdiMotion,
  isdiIndustry,
  isdiStats,
  isdiAdvisory,
  isdiFuture,
  isdiInternational,
  isdiReadyToBuild,
  isdiPeople,
  isdiResearch,
  isdiGuides,
  isdiFaq,
} from '@/lib/schools/isdi/homeContent';

/*
 * "The Action never stops!" reads the Instagram feed server-side, the same way
 * the ATLAS homepage does, so the page is revalidated on the same 15-minute
 * cadence instead of freezing the feed into the build.
 */
export const revalidate = 900;

/*
 * ref index.php `$title` / `$description`, as reference/schools/isdi/assets/include/
 * header.php writes them into its Open Graph and Twitter tags (`og:site_name`,
 * `og:url` of the site root and `og:type` as authored). The header's remote
 * `og:image` is left out, as the root layout does for the ATLAS pages; its first
 * `twitter:title`, which prints `$description` by mistake, is superseded by the
 * correct one it writes further down. `$keywords` is never output by header.php.
 */
const TITLE = 'ISDI School of Design & Innovation';
const DESCRIPTION =
  'Explore design programs, careers, studios, mentors and start your journey into innovation and creativity.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
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
 * /schools/isdi — reference/schools/isdi/index.php.
 *
 * The ISDI header and footer come from app/schools/isdi/layout.js. Sections are
 * rendered in the order index.php declares them; each section root carries
 * `data-block` so it can be diffed against the reference block for block.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333).
 */
export default function ISDIHomePage() {
  return (
    <main id="isdi-home" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiHero} />
      <Awards data={isdiAwards} />
      <Outcomes data={isdiOutcomes} />
      <ActionNeverStops data={isdiAction} />
      <Beliefs data={isdiBeliefs} />
      <Programs data={isdiPrograms} pathfinder={isdiPathfinder} />
      <ChooseMinor data={isdiMinors} />
      <Electives data={isdiElectives} />
      <PinkBanner block="class-of-2025" data={isdiClassOf2025} />
      <Halls data={isdiHalls} />
      <PinkBanner block="faq-banner" data={isdiFaqBanner} />
      <Motion data={isdiMotion} />
      <IndustryVoices data={isdiIndustry} />
      <StatsStrip data={isdiStats} />
      <AdvisoryBoard data={isdiAdvisory} />
      <FutureInAction data={isdiFuture} />
      <International data={isdiInternational} />
      <ReadyToBuild data={isdiReadyToBuild} />
      <PeopleVoices data={isdiPeople} />
      <Research data={isdiResearch} />
      <GuideBanners data={isdiGuides} />
      {/*
        The FAQ is the site-wide `components/Home/FAQ` (the ISDI include is the
        ATLAS homepage's include with its own questions and arrow). Its section
        carries ATLAS's `.section` padding, 60 / 40 below 768; ISDI's header.php
        sets `.isdi-page .section { padding: 50px 0 }` at every width. That is a
        page rule, not the FAQ's skin, so the wrapper takes the 10px back out
        (and adds it below 768) instead of the shared component growing a prop.
      */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiFaq} />
      </div>
    </main>
  );
}
