import Hero from '@/components/Schools/ISDI/About/Hero';
import Stats from '@/components/Schools/ISDI/SummerSchool/Stats';
import WhatIs from '@/components/Schools/ISDI/SummerSchool/WhatIs';
import CreativeJourney from '@/components/Schools/ISDI/SummerSchool/CreativeJourney';
import WhyJoin from '@/components/Schools/ISDI/SummerSchool/WhyJoin';
import Highlights from '@/components/Schools/ISDI/SummerSchool/Highlights';
import PeopleVoices from '@/components/Schools/ISDI/Home/PeopleVoices';
import {
  isdiSummerSchoolHero,
  isdiSummerSchoolStats,
  isdiSummerSchoolWhatIs,
  isdiSummerSchoolJourney,
  isdiSummerSchoolVoices,
  isdiSummerSchoolWhyJoin,
  isdiSummerSchoolHighlights,
} from '@/lib/schools/isdi/programsSummerSchoolContent';

/*
 * ref pre-university-summer-school.php `$title` / `$description`, written by
 * reference/schools/isdi/assets/include/header.php into the title, description, Open Graph
 * and Twitter tags. header.php prints `$description` into `twitter:title` as well — an
 * upstream mix-up every ISDI page carries; Next writes the title there, which is what the tag
 * is for. The canonical is the request URL.
 */
const TITLE = 'ISDI Summer School for Creative Skills – ATLAS ISDI';
const DESCRIPTION =
  'Looking to upskill this summer? Explore design workshops, projects, creative tools and apply for summer programs.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://atlasuniversity.edu.in/schools/isdi/programs/pre-university-summer-school',
  },
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
 * /schools/isdi/programs/pre-university-summer-school — the ISDI header's "Programs >
 * Pre-University Summer School", and the last Programs entry in that menu.
 *
 * The only ISDI programme page that is not the twelve-block programme-detail template.
 * Seven blocks: the hero, four figures, "What is ISDI Summer School?", "Your Creative Journey
 * at ISDI", "Hear from Our Young Creators", "Why Join ISDI-Parson Summer School?" and
 * "Highlights of Your Summer School Journey". There is no FAQ, no "More questions?" panel and
 * no curriculum.
 *
 * Three of the seven are existing components driven by this page's data — the About page's
 * background-video `Hero` (at `.inner-header-wrapper`'s unmodified 658px, with a button row),
 * the homepage's `PeopleVoices` quote carousel, and the homepage's `.isdi-application` panel
 * through `ISDI/ApplicationPanel`. The other four are this page's own.
 *
 * Reference note, not reproduced: the page ships a `#npf-popup-overlay-brochure` widget whose
 * listener binds `[data-id="download-brochure"]`, and **no element on the page carries that
 * attribute** — the only `data-id`s are the header's own "Apply Now". It is an orphan, the
 * same call every other unbound popup in this rebuild got. The hero's "Apply Now" is a real
 * link to /summerdesign.
 *
 * `<main>` carries the ISDI body type (`body.isdi-page`: Poppins 16px/24, #333).
 */
export default function ISDISummerSchoolPage() {
  return (
    <main id="isdi-summer-school" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={isdiSummerSchoolHero} />
      <Stats data={isdiSummerSchoolStats} />
      <WhatIs data={isdiSummerSchoolWhatIs} />
      <CreativeJourney data={isdiSummerSchoolJourney} />
      <PeopleVoices data={isdiSummerSchoolVoices} />
      <WhyJoin data={isdiSummerSchoolWhyJoin} />
      <Highlights data={isdiSummerSchoolHighlights} />
    </main>
  );
}
