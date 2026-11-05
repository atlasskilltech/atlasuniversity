import Hero from '@/components/Hero/Hero';
import Awards from '@/components/Awards/Awards';
import CareerPrograms from '@/components/Programs/CareerPrograms';
import DesignLedPrograms from '@/components/Programs/DesignLedPrograms';
import FutureReadyBTech from '@/components/Programs/FutureReadyBTech';
import IndustryIntegrated from '@/components/Programs/IndustryIntegrated';
import AtlasImpact from '@/components/Impact/AtlasImpact';
import AboutAtlas from '@/components/About/AboutAtlas';
import MissionVision from '@/components/About/MissionVision';
import FourSchools from '@/components/About/FourSchools';
import LeadershipTeam from '@/components/Home/LeadershipTeam';
import AdvisoryBoard from '@/components/Home/AdvisoryBoard';
import AtlasNews from '@/components/Home/AtlasNews';
import CoreAdvantages from '@/components/Home/CoreAdvantages';
import Location from '@/components/Home/Location';
import CampusTour from '@/components/Home/CampusTour';
import IndustryOnCampus from '@/components/Home/IndustryOnCampus';
import ThinkInternational from '@/components/Home/ThinkInternational';
import AtlasSpotlight from '@/components/Home/AtlasSpotlight';
import ThoughtLeadership from '@/components/Home/ThoughtLeadership';
import ActionNeverStops from '@/components/Home/ActionNeverStops';
import Testimonials from '@/components/Home/Testimonials';
import FutureBeginsHere from '@/components/Home/FutureBeginsHere';
import FAQ from '@/components/Home/FAQ';

/**
 * Homepage — reference/index.php.
 *
 * Sections are added one at a time, in the order the reference declares them.
 *   1. Hero              .main-cover-section-isme    (done)
 *   2. Awards marquee    .awards.atlas               (done)
 *   3. Career-focused UG programs    index.php:248   (done)
 *   4. Design-led UG programs        index.php:623   (done)
 *   5. Future-ready B.Tech programs  index.php:952   (done)
 *   6. Industry-integrated PG        index.php:1146  (done)
 *   7. The ATLAS impact              index.php:1499  (done)
 *   8. About ATLAS                   index.php:1969  (done)
 *   9. Our mission / our vision      index.php:1980  (done)
 *  10. Four schools                  index.php:1994  (done)
 *  11. Leadership team               index.php:2054  (done)
 *  12. Advisory board                index.php:2099  (done)
 *  13. ATLAS news                    index.php:2256  (done)
 *  14. Core advantages               index.php:2470  (done)
 *  15. Location                      index.php:2535  (done)
 *  16. Campus / live & thrive        index.php:2548  (done)
 *  17. Industry on campus            index.php:2641  (done)
 *  18. Think international            index.php:2836  (done)
 *  19. ATLAS spotlight               index.php:2904  (done)
 *  20. Thought leadership            index.php:2966  (done)
 *  21. The Action never stops!        index.php:3061  (done)
 *   ...
 */
/*
 * `cache_duration = 900`. Every other section on this page is static content,
 * but "The Action never stops!" resolves the latest Instagram post at request
 * time — so the route is revalidated on the same 15-minute cadence rather than
 * being frozen into the build. `lib/instagram/latestPost.js` keeps its own
 * file-backed cache with the same TTL, so a revalidation that finds a fresh
 * entry costs nothing.
 */
export const revalidate = 900;

export default function Home() {
  return (
    <>
      <Hero />
      <Awards />
      <CareerPrograms />
      <DesignLedPrograms />
      <FutureReadyBTech />
      <IndustryIntegrated />
      <AtlasImpact />
      <AboutAtlas />
      <MissionVision />
      <FourSchools />
      <LeadershipTeam />
      <AdvisoryBoard />
      <AtlasNews />
      <CoreAdvantages />
      <Location />
      <CampusTour />
      <IndustryOnCampus />
      <ThinkInternational />
      <AtlasSpotlight />
      <ThoughtLeadership />
      <ActionNeverStops />
      <Testimonials />
      <FutureBeginsHere />
      <FAQ />
    </>
  );
}
