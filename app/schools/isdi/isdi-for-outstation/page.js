import Hero from '@/components/Schools/ISDI/About/Hero';
import PeopleVoices from '@/components/Schools/ISDI/Home/PeopleVoices';
import Faq from '@/components/Schools/ISDI/ParentsCorner/Faq';
import {
  HeartOfAction,
  MotionSection,
  SliderSection,
  Upgrad,
  CardTypeECarousel,
} from '@/components/Schools/ISDI/ParentsCorner/Sections';
import SurviveThrive from '@/components/Schools/ISDI/Outstation/SurviveThrive';
import Community from '@/components/Schools/ISDI/Outstation/Community';
import Glimpse from '@/components/Schools/ISDI/Outstation/Glimpse';
import Banner from '@/components/Schools/ISDI/Outstation/Banner';
import {
  hero,
  heart,
  eats,
  culture,
  leisure,
  connected,
  survive,
  community,
  upgrad,
  cost,
  glimpse,
  banner,
  testimonials,
  faq,
} from '@/lib/schools/isdi/isdiOutstationContent';

/*
 * ref reference/schools/isdi/isdi-for-outstation.php `$title` / `$description`,
 * transcribed as authored. Served at the slashless url on production (a flat .php;
 * the trailing slash 500s). It is the second link in the ISDI header's top utility bar.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/isdi-for-outstation';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
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
 * /schools/isdi/isdi-for-outstation — the ISDI header's "ISDI For Outstation" (top
 * utility bar). Fourteen blocks: a 100vh image hero, Right in the heart of the action
 * (map tabs + Corporate & Design District slider), Eats & Hangouts, Culture & Heritage,
 * Leisure & Lifestyle, Connected & Convenient, Survive and Thrive (a core-isdi-card
 * marquee), Where students become a community (a photo grid), Upgrad Spaces, Cost of
 * living, A glimpse into your ISDI life (the week grid), the blue banner, Through the
 * eyes of outstation students, and the FAQ. Most sections reuse the Parents Corner
 * components (the two pages share the Mumbai / student-living blocks verbatim).
 */
export default function IsdiForOutstationPage() {
  return (
    <main id="isdi-for-outstation" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={hero} />
      <HeartOfAction data={heart} />
      <MotionSection data={eats} />
      <SliderSection data={culture} />
      <MotionSection data={leisure} />
      <SliderSection data={connected} />
      <SurviveThrive data={survive} />
      <Community data={community} />
      <Upgrad data={upgrad} />
      <CardTypeECarousel data={cost} />
      <Glimpse data={glimpse} />
      <Banner data={banner} />
      <PeopleVoices data={testimonials} />
      <Faq data={faq} />
    </main>
  );
}
