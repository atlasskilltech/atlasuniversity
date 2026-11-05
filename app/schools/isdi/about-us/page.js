import Hero from '@/components/Schools/ISDI/About/Hero';
import StatsBand from '@/components/Schools/ISDI/StatsBand';
import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import MissionVision from '@/components/Schools/ISDI/About/MissionVision';
import OurStory from '@/components/Schools/ISDI/About/OurStory';
import ShapingViksitBharat from '@/components/Schools/ISDI/About/ShapingViksitBharat';
import Recognition from '@/components/Schools/ISDI/About/Recognition';
import Leadership from '@/components/Schools/ISDI/About/Leadership';
import ManagementTeam from '@/components/Schools/ISDI/About/ManagementTeam';
import Location from '@/components/Schools/ISDI/About/Location';
import ThoughtLeadership from '@/components/Schools/ISDI/About/ThoughtLeadership';
import AtlasTimes from '@/components/Schools/ISDI/About/AtlasTimes';
import PressCoverage from '@/components/Schools/ISDI/About/PressCoverage';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import AdvisoryBoard from '@/components/Schools/ISDI/Home/AdvisoryBoard';
import FAQ from '@/components/Home/FAQ';
import {
  isdiAboutHero,
  isdiAboutStats,
  isdiAboutMenu,
  isdiAboutBeliefs,
  isdiAboutStory,
  isdiAboutShaping,
  isdiAboutRecognition,
  isdiAboutLeadership,
  isdiAboutAtlasAdvisory,
  isdiAboutIsdiAdvisory,
  isdiAboutManagement,
  isdiAboutLocation,
  isdiAboutThought,
  isdiAboutTimes,
  isdiAboutPress,
  isdiAboutSearch,
  isdiAboutFaq,
} from '@/lib/schools/isdi/aboutContent';

/*
 * ref about-us/index.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description,
 * Open Graph and Twitter tags exactly as on the ISDI homepage (`og:site_name`,
 * `og:url` of the site root, `og:type`; no remote `og:image`). header.php's
 * canonical is the request URL, which production prints as the trailing-slash form.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/isdi/about-us/' },
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
 * /schools/isdi/about-us — reference/schools/isdi/about-us/index.php, the target of
 * the ISDI header's "About Us" menu (Overview, Our Story, Leadership Team,
 * Location, ATLAS Times, Press Coverage).
 *
 * The ISDI header and footer come from app/schools/isdi/layout.js. Blocks follow
 * the reference's order; each root carries `data-block`. The reference's two
 * wrappers are kept for their ids — `#our-mission` (Our Story, Shaping a Viksit
 * Bharat, Recognition) and `#our-leadership` (Leadership Team, both advisory
 * boards, Our Management Team) — because the sticky menu's scroll-spy measures
 * `#our-leadership` as the whole of that group.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333),
 * and must not clip, so the menu can stick.
 */
export default function ISDIAboutPage() {
  return (
    <main id="isdi-about" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiAboutHero} />
      <StatsBand data={isdiAboutStats} />
      <AnchorMenu links={isdiAboutMenu} />
      <MissionVision data={isdiAboutBeliefs} />

      {/* ref div#our-mission.our-mission */}
      <div id="our-mission">
        <OurStory data={isdiAboutStory} />
        <ShapingViksitBharat data={isdiAboutShaping} />
        <Recognition data={isdiAboutRecognition} />
      </div>

      {/* ref div#our-leadership.our-leadership */}
      <div id="our-leadership">
        <Leadership data={isdiAboutLeadership} />
        <AdvisoryBoard block="atlas-advisory" data={isdiAboutAtlasAdvisory} />
        <AdvisoryBoard block="isdi-advisory" variant="isdi-black" data={isdiAboutIsdiAdvisory} />
        <ManagementTeam data={isdiAboutManagement} />
      </div>

      <Location data={isdiAboutLocation} />
      <ThoughtLeadership data={isdiAboutThought} />
      <AtlasTimes data={isdiAboutTimes} />
      <PressCoverage data={isdiAboutPress} />
      <MoreQuestions data={isdiAboutSearch} />
      {/*
        The site-wide `components/Home/FAQ`, as on the ISDI homepage: its section
        carries ATLAS's 60 / 40 padding where ISDI's header.php sets 50 at every
        width, so the wrapper takes the 10px back out (and adds it below 768).
      */}
      <div data-block="faq" className="-my-2.5 max-md:my-2.5">
        <FAQ data={isdiAboutFaq} />
      </div>
    </main>
  );
}
