import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import MoreQuestions from '@/components/Schools/ISDI/About/MoreQuestions';
import ReadyToBuild from '@/components/Schools/ISDI/Home/ReadyToBuild';
import FAQ from '@/components/Home/FAQ';
import Hero from '@/components/Schools/ISDI/Life/Hero';
import { Mumbai, Wellness } from '@/components/Schools/ISDI/Life/Tabs';
import {
  ByStudents, Clubs, Council, Housing, Intercollegiate, MotionBand, Moto, People,
  Sports, Week, Welfare,
} from '@/components/Schools/ISDI/Life/Sections';
import {
  banner, byStudents, clubs, community, council, faq, favourites, fest, hero,
  housing, intercollegiate, members, menu, moto, mumbai, search, sports, support,
  week, welfare, wellness,
} from '@/lib/schools/isdi/lifeAtIsdiContent';
import Favourites from '@/components/Schools/ISDI/Life/Favourites';

/*
 * ref life@atlas-isdi/index.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description,
 * Open Graph and Twitter tags. Both are the ISDI template's unedited
 * placeholders. Transcribed as authored.
 *
 * The canonical is the TRAILING-SLASH url: this page is a directory with an
 * `index.php`, so production 301s the slashless path to it — the opposite of the
 * three flat `.php` pages in the Success Stories column.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/life@atlas-isdi/';

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
 * /schools/isdi/life@atlas-isdi — the ISDI menu's "Life@ATLAS ISDI" column, whose
 * nine entries point at seven in-page anchors on this one page.
 *
 * TWENTY-ONE blocks, the largest page in the ISDI port after the homepage:
 *
 *    1  `.inner-header-wrapper.full-ht`  a 100vh stage of four photo columns
 *    2  `.sticky-menus`                  the anchor bar
 *    3  `#student-clubs`                 "The 7 wonders of ATLAS ISDI"
 *    4  `#fest-culture`                  "Vibes that go viral"
 *    5  `#intercollegiate-events`        "Here's to winning it all"
 *    6  `#sports`                        "Win on and off the field"
 *    7  `#student-council`               "Student Council"
 *    8  —                                "The Council Members"
 *    9  —                                "By students, for students"
 *   10  `#student-welfare`               "Your growth is our mission"
 *   11  —                                "Wellness is success" + YourDOST + steps
 *   12  —                                "Your Support System, Away from Home"
 *   13  `#community-services`            "Service learning and SSR"
 *   14  `#student-housing`               "Stay where you belong"
 *   15  `#life-in-mumbai`                "Beyond campus, within reach"
 *   16  —                                "Student favourites"
 *   17  `#campus-week`                   "A week in the life of an ISDI-ian"
 *   18  `#our-moto`                      "Embracing Every Identity"
 *   19  —                                the closing banner
 *   20  —                                "More questions?"
 *   21  `#faq`                           eight questions
 *
 * Only ONE card shape on it is new (`.port-card-f-wrap.isdi`, the Sports card);
 * everything else is an existing component taking this page's data.
 */
export default function LifeAtIsdiPage() {
  return (
    <main id="isdi-life" className="font-poppins-isdi text-base text-[#333]">
      {/* 1 */}
      <Hero data={hero} />

      {/* 2 — ref .sticky-menus, the bare class, so it is LEFT-aligned */}
      <AnchorMenu links={menu} centered={false} />

      {/* 3 */}
      <Clubs data={clubs} />
      {/* 4 */}
      <MotionBand data={fest} id="fest-culture" block="fest" />
      {/* 5 */}
      <Intercollegiate data={intercollegiate} />
      {/* 6 */}
      <Sports data={sports} />
      {/* 7 */}
      <Council data={council} />
      {/* 8 — ref .head-wrap.top > .tt-wrap, which the sibling at 12 does not have */}
      <People data={members} block="members" headWrap />
      {/* 9 */}
      <ByStudents data={byStudents} />
      {/* 10 */}
      <Welfare data={welfare} />
      {/* 11 */}
      <Wellness data={wellness} />
      {/* 12 */}
      <People data={support} block="support" />
      {/* 13 */}
      <MotionBand data={community} id="community-services" block="community" />
      {/* 14 */}
      <Housing data={housing} />
      {/* 15 */}
      <Mumbai data={mumbai} />
      {/* 16 */}
      <Favourites data={favourites} />
      {/* 17 — `SummerSchool/WeekGrid`'s strip under this page's own icon heading;
          the same grid cell for cell, and its artwork is that page's own files */}
      <Week data={week} />
      {/* 18 */}
      <Moto data={moto} />
      {/* 19 */}
      <ReadyToBuild data={banner} tone="blue" />
      {/* 20 */}
      <MoreQuestions data={search} />
      {/* 21 */}
      <FAQ data={faq} />
    </main>
  );
}
