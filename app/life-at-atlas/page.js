import { lifeContent } from '@/lib/lifeContent';

import LifeHero from '@/components/Life/LifeHero';
import SevenWonders from '@/components/Life/SevenWonders';
import VibesThatGoViral from '@/components/Life/VibesThatGoViral';
import IntercollegiateEvents from '@/components/Life/IntercollegiateEvents';
import SportsFacilities from '@/components/Life/SportsFacilities';
import StudentCouncil from '@/components/Life/StudentCouncil';
import CouncilMembers from '@/components/Life/CouncilMembers';
import CouncilEvents from '@/components/Life/CouncilEvents';
import BeyondCampus from '@/components/Life/BeyondCampus';
import StudentWelfare from '@/components/Life/StudentWelfare';
import WellnessTabs from '@/components/Life/WellnessTabs';
import YourDost from '@/components/Life/YourDost';
import SupportSystem from '@/components/Life/SupportSystem';
import ServiceLearning from '@/components/Life/ServiceLearning';
import LiveWhereYouLearn from '@/components/Campus/LiveWhereYouLearn';
import StudentFavourites from '@/components/Life/StudentFavourites';
import EmbracingIdentity from '@/components/Life/EmbracingIdentity';
import LifeBanner from '@/components/Life/LifeBanner';
import FAQ from '@/components/Home/FAQ';

/**
 * /life-at-atlas — port of `reference/life-at-atlas.php`.
 *
 * Sections in the reference's own order:
 *    1  hero .inner-header-wrapper.full-ht         LifeHero                78
 *    2  The 7 wonders of ATLAS                     SevenWonders           136
 *    3  Vibes that go viral                        VibesThatGoViral       237
 *    4  Intercollegiate events                     IntercollegiateEvents  328
 *    5  Win on and off the field                   SportsFacilities       386
 *    6  Student Council                            StudentCouncil         464
 *    7  The council members                        CouncilMembers         477
 *    8  Events organized by the Student Council    CouncilEvents          545
 *    9  Beyond campus, within reach                BeyondCampus           574
 *   10  Your Growth is Our Mission                 StudentWelfare         600
 *   11  Wellness is success                        WellnessTabs           672
 *   12  YourDOST - For your wellness               YourDost               713
 *   13  Your Support System, Away from Home        SupportSystem          742
 *   14  Service learning and SSR                   ServiceLearning        800
 *   15  Live Where You Learn                       LiveWhereYouLearn      878
 *   16  Student favourites                         StudentFavourites      953
 *   17  Embracing every identity                   EmbracingIdentity     1054
 *   18  Ready to live the ATLAS life?              LifeBanner            1061
 *   19  Questions? We can read your mind           FAQ                   1083
 *
 * ── What is shared, and why ───────────────────────────────────────────────
 *   FAQ                the include's <style> block is byte-identical to the
 *                      homepage's, so this is the site-wide accordion with
 *                      eight different questions and nothing else changed.
 *   PillTabs           "Beyond campus" is the same `.rounded-tabs-mint` widget
 *                      as /campus-atlas "Study in the Middle of Mumbai's
 *                      Momentum" — same five labels, same five map images.
 *   LiveWhereYouLearn  section 15 is that page's residences section verbatim:
 *                      same copy, cards, mosaic and image files. It takes this
 *                      page's `data` and `id`; only the video differs.
 *   Carousel           every `.common-swiper` and `.common-swiper-full`.
 *   ZoomSliderLg       sections 4 and 10 — the same 0.6/0.65/1 scale ladder
 *                      /campus-atlas uses for its studios strip, extracted.
 *   PortCardH          sections 5 and 16 — the `.port-card-h-wrap.atlas` card
 *                      /campus-atlas uses for "Food on Campus", extracted.
 *   SupportCard        sections 8 and 15.
 *   PrimaryButton      the banner's three buttons, `atlas` + `outline-white`.
 *
 * Everything else is this page's alone: the hero's four vertical photo
 * marquees, the `.square-card-atlas` clubs, the smaller `.zoom-slider`
 * (sections 3 and 14), the `.card-type-e` people carousels, the `.tertiary-tabs`
 * wellness panel and the YourDOST steps.
 *
 * ── Reference defects, and what was done about them ───────────────────────
 *  - `life-at-atlas.php:1078` is `<!--<?php include "assets/include/faq.php" ?>-->`.
 *    An HTML comment does not stop PHP, so the include still runs and fatals on
 *    a database handle this copy has none for — exactly as on about-us.php.
 *    Everything after it is missing locally: the FAQ, the footer, Bootstrap and
 *    the Swiper initialiser, so none of the reference's own sliders start. They
 *    were measured by injecting swiper-bundle and re-running the page's and
 *    footer.php's own initialisers verbatim.
 *  - `.square-card-atlas` is `width: 100%` inside a `width: auto` slide between
 *    569 and 767px and blows out to a whole viewport; it is given the container
 *    width there instead, as the homepage testimonials already are.
 *  - Several `.swiper` boxes are a full viewport tall around 360-480px cards.
 *    Same stray full-height rule skipped elsewhere in this rebuild.
 *  - Two inline scripts are no-ops upstream and are not ported — see
 *    `lib/lifeContent.js`.
 */
export const metadata = {
  title: lifeContent.meta.title,
  description: lifeContent.meta.description,
};

export default function LifeAtAtlasPage() {
  return (
    <>
      <LifeHero />
      <SevenWonders />
      <VibesThatGoViral />
      <IntercollegiateEvents />
      <SportsFacilities />
      <StudentCouncil />
      <CouncilMembers />
      <CouncilEvents />
      <BeyondCampus />
      <StudentWelfare />
      <WellnessTabs />
      <YourDost />
      <SupportSystem />
      <ServiceLearning />
      <LiveWhereYouLearn data={lifeContent.housing} id="student-housing" />
      <StudentFavourites />
      <EmbracingIdentity />
      <LifeBanner />
      <FAQ data={lifeContent.faq} />
    </>
  );
}
