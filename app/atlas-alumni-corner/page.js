import SuccessHero from '@/components/Success/SuccessHero';
import StatBand from '@/components/ui/StatBand';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import ChipSlideCard from '@/components/ui/ChipSlideCard';
import GridGallery from '@/components/ui/GridGallery';
import PlacementCard from '@/components/ui/PlacementCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import DropdownFaq from '@/components/ui/DropdownFaq';
import Carousel from '@/components/Carousel/Carousel';
import PortCardJ from '@/components/Schools/ISDI/ParentsCorner/PortCardJ';
import StoryPair from '@/components/Alumni/StoryPair';
import TalksWall from '@/components/Alumni/TalksWall';
import { CONTAINER, SECTION, H2, SUB_INNER, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';
import {
  hero, stats, connect, initiatives, talks, achievers, universities, sprect, mentors, circle, voices, faq, search,
} from '@/lib/alumniContent';

/* ref atlas-alumni-corner.php `$title` / `$description` / `$keywords` (the source's dash is
   mis-encoded; the intended en dash is used, with the two spaces before it as authored) */
const TITLE = 'Alumni Network & Success  – ATLAS SkillTech University';
const DESCRIPTION =
  'Connect with alumni stories, mentoring programs, career journeys and networking opportunities that support professional growth and lifelong connections.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/atlas-alumni-corner' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/* ref `.grid-card-name.atlas` (20px/24 700 #5cbdca) and `.title-txt-grid` (18px/32 500 #fff) /
   `.title-txt-grid3` (18px/27 700 #fff) — measured at 1440 / 390 */
const NAME = 'z-[3] text-[20px] font-bold leading-6 text-atlas-cyan';
const CAPTION = 'z-[3] text-[18px] font-medium leading-8 text-white';
const CAPTION3 = 'z-[3] text-[18px] font-bold leading-[27px] text-white';

/**
 * /atlas-alumni-corner — reference/atlas-alumni-corner.php (`$css =
 * "…691471a527c3cea8d9871293-7d8a6ee8f.css"`, `$body = "body-isme"`), in its order: hero ·
 * two figures · "The ATLAS Alumni Connect" · "Alumni-Led Initiatives & Activities" (zoom slider)
 * · "Alumni Talks" (photo wall) · "Alumni Achievers" · "Our alumni at universities around the
 * world" · "SPRECT: Super Connect" · "Your Mentors. Your Super Connect." · "What Makes the Alumni
 * Circle Matter" · "What Our Alumni Say" · FAQ (Webflow dropdowns + the blue "More questions?").
 */
export default function AlumniCornerPage() {
  return (
    <>
      <SuccessHero hero={hero} full={false} />

      {/* ref .top-cards-wrapper — no `.padbtm0` here, so its own padding-bottom 60 stands */}
      <div className="pb-[60px]">
        <StatBand data={stats} />
      </div>

      <StoryPair data={connect} />

      {/* ref section.section > .container > (h2.h2-tag.mrg16, .sub-heading.mrgbtm, .swiper.zoom-slider-lg) */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{initiatives.heading}</h2>
          <div className={SUB_INNER_MRGBTM}>{initiatives.sub}</div>
          <ZoomSliderLg label={initiatives.heading} dots="swiper">
            {initiatives.slides.map((slide) => (
              <ChipSlideCard key={slide.title} slide={slide} variant="c" />
            ))}
          </ZoomSliderLg>
        </div>
      </section>

      <TalksWall data={talks} />

      {/* ref div.section > .container > (.head-wrap > .tt-wrap > (h2.h2-tag.mrg16, .sub-heading),
          .grid-gallery.h2-tag) — `.h2-tag` on the gallery zeroes its bottom margin above 768 and
          the gallery's own 40 / 32 margins stand below */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch max-md:justify-start">
            {/* ref .tt-wrap — margin-bottom 20 at <=767, margin-right 20 at <=479 */}
            <div className="max-md:mb-5 max-sm:mr-5">
              <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{achievers.heading}</h2>
              <div className={SUB_INNER}>{achievers.sub}</div>
            </div>
          </div>
          <GridGallery cards={achievers.cards} variant="atlas" name={NAME} caption={CAPTION} margin="mt-14 max-md:mb-8 max-md:mt-10" />
        </div>
      </div>

      {/* ref section.section > .container > (h3.h2-tag.mrgtbm0, .grid-gallery.h2-tag) */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <h3 className={`mb-0 ${H2}`}>{universities.heading}</h3>
          <GridGallery cards={universities.cards} variant="atlas" wrap="row" caption={CAPTION3} margin="mt-14 max-md:mb-8 max-md:mt-10" />
        </div>
      </section>

      <StoryPair data={sprect} />

      {/* ref div.section > .container > (h2.h2-tag.mrgtbm0, .swiper.common-swiper) — the slider is a
          sibling of `.container` here because `Carousel` pads its own track by the container inset */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-0 ${H2}`}>{mentors.heading}</h2>
        </div>
        <Carousel className="pt-14 max-md:pt-10" bullets="inline">
          {mentors.cards.map((card) => (
            <PlacementCard key={card.name} card={card} />
          ))}
        </Carousel>
      </div>

      {/* ref section.section > .container > (h2.h2-tag.mrg16, .sub-heading, .social-act-wrapper) */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{circle.heading}</h2>
          <div className={SUB_INNER}>{circle.sub}</div>
          {/* ref .social-act-wrapper — row, gap 24, padding-top 56; a column at <=767 */}
          <div className="flex items-start justify-start gap-6 pt-14 max-md:flex-col">
            {circle.cards.map((card) => (
              <PortCardJ key={card.title} card={card} variant="atlas" />
            ))}
          </div>
        </div>
      </section>

      {/* ref section.section > .container > (h2.h2-tag.mrg16, .sub-heading,
          .testimonial-students-wrap > .swiper.common-swiper-full) */}
      <section className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{voices.heading}</h2>
          <div className={SUB_INNER}>{voices.sub}</div>
        </div>
        {/* ref `.testimonial-students-wrap > .swiper.common-swiper-full` — padding-top 56 → 20 */}
        <Carousel className="pt-14 max-md:pt-5" bullets="inline-overlay">
          {voices.cards.map((card) => (
            <TestimonialCard key={card.stname} card={card} />
          ))}
        </Carousel>
      </section>

      <DropdownFaq data={faq} search={search} />
    </>
  );
}
