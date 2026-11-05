import Hero from '@/components/Schools/ISDI/About/Hero';
import StatsBand from '@/components/Schools/ISDI/StatsBand';
import Vision from '@/components/Schools/ISDI/Advantage/Vision';
import PeopleVoices from '@/components/Schools/ISDI/Home/PeopleVoices';
import PinkBanner from '@/components/Schools/ISDI/Home/PinkBanner';
import Faq from '@/components/Schools/ISDI/ParentsCorner/Faq';
import {
  GuidingGrowth,
  CardTypeECarousel,
  HeartOfAction,
  MotionSection,
  SliderSection,
  Upgrad,
  Careers,
  Recruiters,
} from '@/components/Schools/ISDI/ParentsCorner/Sections';
import {
  hero,
  figures,
  academic,
  guiding,
  family,
  heart,
  eats,
  culture,
  leisure,
  connected,
  upgrad,
  cost,
  careers,
  recruiters,
  testimonials,
  banner,
  faq,
} from '@/lib/schools/isdi/parentsCornerContent';

/*
 * ref reference/schools/isdi/parents-corner.php `$title` / `$description`,
 * transcribed as authored. Served at the slashless url on production (a flat
 * .php; the trailing slash 500s). It is the first link in the ISDI header's top
 * utility bar.
 */
const TITLE = 'ATLAS SkillTech University';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/parents-corner';

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
 * /schools/isdi/parents-corner — the ISDI header's "Parents Corner" (top utility
 * bar). Sixteen rendered blocks (the 17th, "Wellness & Support", is `.hide`):
 * hero, three figures, Academic Approach (vision), Guiding Growth, Meet your
 * campus family, Right in the heart of the action (map tabs + Corporate & Design
 * District slider), Eats & Hangouts, Culture & Heritage, Leisure & Lifestyle,
 * Connected & Convenient, Upgrad Spaces, Cost of living, Strong Careers,
 * recruiter marquee, In their own words, the pink banner, and the FAQ.
 */
export default function ParentsCornerPage() {
  return (
    <main id="isdi-parents-corner" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={hero} />
      <StatsBand data={figures} label="isme" value="normal" padBottom />
      <Vision data={academic} />
      <GuidingGrowth data={guiding} />
      <CardTypeECarousel data={family} />
      <HeartOfAction data={heart} />
      <MotionSection data={eats} />
      <SliderSection data={culture} />
      <MotionSection data={leisure} />
      <SliderSection data={connected} />
      <Upgrad data={upgrad} />
      <CardTypeECarousel data={cost} />
      <Careers data={careers} />
      <Recruiters data={recruiters} />
      <PeopleVoices data={testimonials} />
      <PinkBanner data={banner} block="banner" />
      <Faq data={faq} />
    </main>
  );
}
