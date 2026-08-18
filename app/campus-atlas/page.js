import { campusContent } from '@/lib/campusContent';

import CampusHero from '@/components/Campus/CampusHero';
import StatBand from '@/components/ui/StatBand';
import StudyInMumbai from '@/components/Campus/StudyInMumbai';
import CampusOverview from '@/components/Campus/CampusOverview';
import HolisticLearning from '@/components/Campus/HolisticLearning';
import StartupIncubators from '@/components/Campus/StartupIncubators';
import LiveWhereYouLearn from '@/components/Campus/LiveWhereYouLearn';
import LibraryResources from '@/components/Campus/LibraryResources';
import StudiosLabs from '@/components/Campus/StudiosLabs';
import HangoutZones from '@/components/Campus/HangoutZones';
import FoodOnCampus from '@/components/Campus/FoodOnCampus';
import GreenCampus from '@/components/Campus/GreenCampus';
import CampusVisitBanner from '@/components/Campus/CampusVisitBanner';
import FAQ from '@/components/Home/FAQ';

/**
 * /campus-atlas — port of `reference/campus-atlas.php`.
 *
 * Sections in the reference's own order:
 *    1  hero .inner-header-wrapper.full-ht         CampusHero          25
 *    2  three figures .top-cards-wrapper           StatBand            37
 *    3  Study in the Middle of Mumbai's Momentum   StudyInMumbai       49
 *    4  A campus built to learn, live & thrive     CampusOverview      75
 *    5  Purpose-Built for Holistic Learning        HolisticLearning   118
 *    6  Startup Incubators                         StartupIncubators  222
 *    7  Live Where You Learn                       LiveWhereYouLearn  250
 *    8  Fueling learning with the right resources  LibraryResources   329
 *    9  Studios, Labs, and Classrooms              StudiosLabs        394
 *   10  Hangout zones                              HangoutZones       470
 *   11  Food on Campus                             FoodOnCampus       516
 *   12  Live where you learn. Grow where you stay. GreenCampus        617
 *   13  Experience the ATLAS Campus in Person      CampusVisitBanner  719
 *   14  Questions? We can read your mind           FAQ                736
 *
 * ── What is shared, and why ───────────────────────────────────────────────
 *   FAQ             the campus include's <style> block is byte-identical to
 *                   the homepage's, so this is the site-wide accordion with
 *                   ten different questions and nothing else changed.
 *   PillTabs        `#campus-learn`'s strip is the same `.rounded-tabs-mint`
 *                   widget as the homepage testimonials and About's
 *                   Recognition, measured identical.
 *   Carousel        "Food on Campus" is a plain `.common-swiper`.
 *   ContentCardB    `.card-content-b` — the About page's "Shaping a Viksit
 *                   Bharat" rows, used three times here.
 *   PrimaryButton   `.btn-primary`, shared with the homepage hero and banner.
 *   SupportCard     `.career-sup-card.ugdx`, used twice on this page only, so
 *                   it lives under components/Campus/.
 *
 * The zoom carousel and the hangout scroller are this page's alone and are not
 * generalised: the first is a scale ladder around a current slide, the second a
 * gallery with three different layouts, and neither matches an existing
 * component's mechanism.
 *
 * ── Reference defects not reproduced (each is recorded where it applies) ───
 *  - `id="campus-spaces"` is authored on four separate sections; kept on the
 *    first only, because duplicate ids are invalid.
 *  - Several `.swiper` and `.instagram-wrapper` boxes are a full viewport tall
 *    while their contents are 400-520px, leaving hundreds of pixels of dead
 *    space. Same stray full-height rule skipped elsewhere in this rebuild.
 *  - The studios slider collapses to zero width between 569 and 767px; here it
 *    goes full width at 767px, as its own CSS intends.
 *  - The banner's "Schedule a visit" opens a NoPaperForms widget from
 *    `widgets.in5.nopaperforms.com`; it links to /campusvisit instead.
 */
export const metadata = {
  title: campusContent.meta.title,
  description: campusContent.meta.description,
};

export default function CampusAtlasPage() {
  return (
    <>
      <CampusHero />
      <StatBand data={campusContent.stats} />
      <StudyInMumbai />
      <CampusOverview />
      <HolisticLearning />
      <StartupIncubators />
      <LiveWhereYouLearn />
      <LibraryResources />
      <StudiosLabs />
      <HangoutZones />
      <FoodOnCampus />
      <GreenCampus />
      <CampusVisitBanner />
      <FAQ data={campusContent.faq} />
    </>
  );
}
