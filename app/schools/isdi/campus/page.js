import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import ReadyToBuild from '@/components/Schools/ISDI/Home/ReadyToBuild';
import StatsBand from '@/components/Schools/ISDI/StatsBand';
import FAQ from '@/components/Home/FAQ';
import Hero from '@/components/Schools/ISDI/Campus/Hero';
import Favourites from '@/components/Schools/ISDI/Life/Favourites';
import { Housing } from '@/components/Schools/ISDI/Life/Sections';
import {
  Green, Hangout, Learn, Location, Spaces,
} from '@/components/Schools/ISDI/Campus/Sections';
import {
  banner, faq, food, green, hangout, hero, housing, learn, location, menu, search,
  spaces, stats,
} from '@/lib/schools/isdi/campusContent';

/*
 * ref campus/index.php `$title` / `$description` — a campus-specific pair (unlike the
 * Events pages' placeholders), transcribed as authored. The canonical is the
 * SLASHLESS url: production serves it there and the menu links the slashless form.
 */
const TITLE = 'ISDI Campus Experience – ATLAS ISDI';
const DESCRIPTION = 'Explore modern studios, labs, creative spaces and campus life that fuels innovation and collaboration. Discover your space.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/campus';

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
 * /schools/isdi/campus — the ISDI header's "Campus" column, whose five entries point
 * at anchors on this one page. Thirteen blocks:
 *
 *    1  `.swiperprogress.swiper-30`  a four-slide background-VIDEO ring hero (56px)
 *    2  `.top-cards-wrapper.mrgbtm0` two figures
 *    3  `.sticky-menus.center`       the anchor bar
 *    4  `#campus-location`           "Beyond campus, within reach" (7 map tabs)
 *    5  `#campus-learn`              "A campus built to learn, live & thrive"
 *    6  `#campus-spaces`             "From brainstorms to chill zones" (4 cards)
 *    7  —                            "Hangout zones" (8 photos)
 *    8  —                            "Food on Campus" (5 PortCardH cards)
 *    9  `#campus-housing`            "Stay where you belong" (YouTube + mosaic)
 *   10  `#campus-green`              "Powered by purpose…" (4 cards)
 *   11  —                            "Ready to live the ISDI life?" banner
 *   12  —                            "More questions?"
 *   13  `#faq`                       24 questions (master 1)
 *
 * Almost everything is a reused component: the hero rings are the shared `RingSwiper`
 * (`ringSize={56}`), `#campus-housing` is `Life/Housing` (its `id` now overridable),
 * "Food on Campus" is `Life/Favourites`, the cards are `ui/ContentCardB`, the learn
 * grid is `ui/PhotoColumns` (`rounded="isdi"`), and the banner is `Home/ReadyToBuild`.
 */
export default function CampusPage() {
  return (
    <main id="isdi-campus" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 */}
      <Hero data={hero} />
      {/* 2 — ref .top-cards-wrapper.mrgbtm0 (large-text.isdi is weight 400) */}
      <StatsBand data={stats} block="campus-stats" value="normal" />
      {/* 3 — ref .sticky-menus.center */}
      <AnchorMenu links={menu} />
      {/* 4 */}
      <Location data={location} />
      {/* 5 */}
      <Learn data={learn} />
      {/* 6 */}
      <Spaces data={spaces} />
      {/* 7 */}
      <Hangout data={hangout} />
      {/* 8 — ref "Food on Campus" = the Student-favourites PortCardH carousel.
          Favourites reads the `.port-card-h-distance` line from `card.note`; the
          campus food data names it `distance` ("Building 1", "Building 2", …). */}
      <Favourites
        data={{
          heading: food.heading,
          lead: food.sub,
          cards: food.cards.map((c) => ({ ...c, note: c.distance })),
        }}
        /* ref: the campus food carousel's lead->card gap is 56 down to 768 and
           60 at <=479 — NOT life's 56 -> 40 (<=767) `.common-swiper` reduction */
        carouselClassName="pt-14 max-sm:pt-[60px]"
      />
      {/* 9 — ref #campus-housing = Life/Housing, reshaped icon + overridden id */}
      <Housing
        data={{ ...housing, icon: { image: { src: housing.icon }, title: housing.title } }}
        id="campus-housing"
        block="campus-housing"
      />
      {/* 10 */}
      <Green data={green} />
      {/* 11 — ref .info-banner-blue.bg1.isdi (pink #de297b) */}
      <ReadyToBuild data={banner} />
      {/* 12 */}
      <MoreQuestions data={search} />
      {/* 13 */}
      <FAQ data={faq} />
    </main>
  );
}
